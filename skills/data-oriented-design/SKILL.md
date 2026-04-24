---
name: Data-Oriented Design
description: "Structuring data for the hardware, not the programmer — cache-friendly layouts, SoA vs AoS, hot/cold splitting. Trigger on: 'cache miss', SoA, AoS, 'struct of arrays', data layout, 'memory layout for performance', cache line, 'processing large arrays', hot/cold split, contiguous memory, 'object graph is slow', Entity Component System, ECS, batch processing, 'how to make this loop faster'."
---

# Data-Oriented Design

When processing large collections, data layout matters more than code organization. A cache miss costs ~100× a cache hit. Layout determines hit rate.

## AoS vs SoA

**Array of Structs (AoS)**: `[Entity(pos, vel, health, name)]` — each entity's fields are contiguous.
**Struct of Arrays (SoA)**: `positions: [Float], velocities: [Float], healths: [Float]` — each field in its own contiguous array.

**The key question**: do you process all fields of one entity, or one field of all entities? Audio, ML, and physics almost always process one field across all items → **SoA wins**.

## Cache Line Utilization

Memory moves in 64-byte cache lines:
- **AoS with 128-byte entities**: accessing one `Float` field loads 64 bytes, uses 4. Cache utilization: ~3%
- **SoA with `[Float]`**: accessing one element loads 64 bytes = 16 floats, all processed. Cache utilization: ~100%

30× fewer cache misses for the same logical operation. This is the primary reason DOD game engines outperform OOP designs.

## Hot/Cold Splitting

Separate frequently accessed data from rarely accessed data:
- **Hot**: position, velocity, audio samples, ML features — every frame. Keep small and contiguous
- **Cold**: name, description, configuration — occasional. Can be larger, stored separately

Example: 128-byte struct where 16 bytes are hot → every cache line load wastes 75% on cold data. Split into 16-byte hot + 112-byte cold struct → hot loop runs ~4× faster.

## Contiguous Memory

Arrays over linked structures:
- Array: elements adjacent in memory. Sequential access = hardware prefetcher predicts next cache lines. Throughput: billions of elements/second
- Linked list/tree/graph: elements scattered across heap. Each node = potential cache miss (~100ns). Pointer chasing defeats the prefetcher
- Even when O(log n) favors trees, arrays win for n < ~10,000 because cache effects dominate algorithmic complexity at practical data sizes

## SIMD-Friendly Layout

- SoA enables SIMD: `vDSP.multiply(positions, velocities, &results)` processes 4–8 floats per instruction
- AoS blocks SIMD: interleaved fields can't load into SIMD registers without gather operations (expensive)
- Accelerate requires contiguous arrays of homogeneous type — this IS SoA. If you use Accelerate, you're already doing DOD
- Alignment for best performance: 16-byte (SSE) or 32-byte (AVX). Use `UnsafeMutableRawPointer.allocate(byteCount:alignment:)` for manual alignment

## Entity Component System (ECS)

DOD applied to architecture:
- **Entity**: integer ID — no data, no behavior
- **Component**: pure data (position, velocity, health) — each in a separate array (SoA by design)
- **System**: logic that iterates component arrays

For audio/ML: frames = entities, processing stages = systems, features (energy, spectral data, VAD state) = components. ECS enforces DOD structurally without requiring a formal framework.

## Batch Processing

Process many items at once instead of one at a time. Amortizes call overhead, enables SIMD, improves cache utilization:
- Instead of: `for sample in buffer { process(sample) }` — use: `vDSP.multiply(buffer, gain, &output)`
- Batch size: larger = better throughput, higher latency. Match to your latency budget

## Decisions

- **AoS vs SoA**: SoA for processing few fields across many entities (audio, physics, ML). AoS for processing all fields of one entity (serialization, display). Hybrid: SoA for hot paths, AoS for cold storage
- **When to apply DOD**: L1/L2 cache miss ratio > 5%, processing > 1000 elements/frame, SIMD applies but layout prevents it. Don't restructure rarely-called code
- **Contiguous vs graph**: arrays for homogeneous bulk-processed collections. Graphs/trees only when the algorithm fundamentally requires them — and even then, prefer flat array-backed implementations
- **ECS**: for many entities with combinatorial component sets processed in bulk. Not worth the overhead below ~1000 entities

## Traps

- **Over-engineering** — applying SoA to data accessed 10 times/second. DOD matters in hot loops on thousands of items, not everywhere
- **Skipping measurement** — assuming SoA is faster without profiling. If data is already L1-resident or the loop is compute-bound, layout changes show no improvement. Measure cache miss rate first
- **Random-index SoA** — using SoA but accessing elements via hash map lookups or random indices. Sequential access is what makes SoA fast; random access defeats it
- **Premature ECS** — full ECS framework for 50 entities. Framework overhead exceeds benefit below ~1000 entities
- **Cold fields in SoA** — including cold fields in hot arrays. Split first, then convert hot arrays to SoA

## Connections

- **Hardware-Aware Computing** — DOD is the direct application of cache hierarchy knowledge; cache line size determines optimal struct layout; SIMD width determines optimal batch size
- **Swift Memory & Performance** — Swift structs in arrays are contiguous (DOD-friendly); class arrays are pointer arrays (DOD-hostile). Value types enable DOD
- **Real-Time Audio Engineering** — audio buffers ARE SoA: contiguous float arrays processed by vDSP. The entire audio pipeline is DOD by necessity
- **Performance Measurement** — Instruments cache miss counters prove whether DOD restructuring is warranted
