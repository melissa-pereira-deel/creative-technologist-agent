---
name: Hardware-Aware Computing
description: "Writing software that exploits hardware topology — Apple Silicon unified memory, Neural Engine, Metal GPU, CPU SIMD, cache hierarchy. Trigger on: 'Apple Silicon', 'M1/M2/M3/M4', 'Neural Engine', 'GPU vs CPU', 'unified memory', Metal compute, Accelerate framework, SIMD, AMX, cache miss, 'which compute unit?', 'should this run on GPU?', hardware bottleneck, bandwidth vs compute bound."
---

# Hardware-Aware Computing

## Apple Silicon Architecture

Heterogeneous SoC — CPU, GPU, Neural Engine, and memory share unified architecture:

- **CPU**: P-cores (high clock, wide execution) + E-cores (low power). OS routes via QoS: `.userInteractive` → P-cores, `.background` → E-cores. Set QoS correctly; don't fight the scheduler
- **GPU**: thousands of cores for massively parallel workloads (image processing, matrix math, particle systems). Zero-copy access via unified memory
- **Neural Engine**: 15.8 TOPS (M1) to 38+ TOPS (M4). Fixed-function matrix multiply. Fastest for supported ML ops; no dynamic control flow, limited operator set
- **AMX**: matrix coprocessor, CPU-side. Accelerate/BLAS/vDSP dispatch to it automatically — never target directly
- **Unified Memory**: CPU, GPU, and Neural Engine share the same physical RAM. No PCIe copies. One allocation is accessible by all compute units — Apple Silicon's key architectural advantage

## Memory Hierarchy (M-series, approximate)

| Level | Latency | Size |
|-------|---------|------|
| Register | < 1ns | — |
| L1 cache | ~1ns | 128KB/P-core (64KB instruction + 64KB data) |
| L2 cache | ~4ns | 16–32MB shared across P-core cluster |
| DRAM | ~100ns | 8–192GB |
| SSD | ~100μs | — |

Each level is ~10–100× slower than the previous. Keep hot data in cache.

## Cache Line Awareness

Memory moves in 64-byte cache lines, not individual bytes:
- Accessing one byte loads the entire 64-byte line containing it
- Structs spanning cache line boundaries cause two loads instead of one
- AoS where you read one field per item wastes bandwidth on unused fields — use SoA
- **False sharing**: two threads writing different fields in the same cache line invalidate each other's caches, serializing parallel work

## Compute-Bound vs Memory-Bound

- **Compute-bound**: ALU is the bottleneck. Fix with SIMD, GPU, or Accelerate. More compute helps
- **Memory-bound**: waiting for data from DRAM. Fix with data locality, smaller types, prefetching. More compute shows zero improvement
- Most real-world code is memory-bound. Measure before assuming which type you have

## Metal Compute

GPU compute shaders (Metal Shading Language — C++ subset) for non-graphics parallel workloads:
- Use for: image/audio processing on large buffers, parallel search/filter, custom ML ops
- `MTLBuffer` with `.storageModeShared`: zero-copy CPU↔GPU (unified memory — no copy needed)
- Thread hierarchy: threads → threadgroups → grid. Match threadgroup size to hardware (32 or 64 threads/SIMD group)
- Dispatch overhead: command buffer setup + shader compilation + GPU wake-up. For < 10K elements, CPU is often faster

## Accelerate Framework

SIMD-optimized library — dispatches to optimal hardware path (SIMD, AMX, NEON) automatically:
- **vDSP**: signal processing (FFT, convolution, windowing, element-wise ops)
- **BLAS/LAPACK**: linear algebra (matrix multiply, decomposition). Uses AMX automatically
- **vImage**: image processing (convolution, histogram, format conversion)

Always prefer Accelerate over hand-written loops.

## Decisions

- **CPU vs GPU vs Neural Engine**: CPU for sequential logic, small data, complex branching. GPU for massively parallel uniform operations on large data. Neural Engine for supported ML models. Profile all three — the "obvious" choice is often wrong
- **When Metal compute**: > 10K uniform elements, data-parallel operation, CPU is measured compute-bound. Avoid for small arrays, irregular access, or heavy branching
- **QoS**: `.userInteractive` (audio render, UI) · `.userInitiated` (user-triggered inference) · `.utility` (background model loading) · `.background` (pre-caching, analytics). Wrong QoS = wrong cores = wrong performance
- **Buffer allocation**: CPU/GPU shared buffers via `MTLBuffer` with `.storageModeShared`. CPU-only: standard allocation. Pre-allocate at setup, reuse at runtime

## Traps

- **Copying CPU↔GPU buffers** — unnecessary on Apple Silicon. Use shared buffers; it's the same physical memory
- **Assuming Neural Engine is fastest** — fallback overhead for unsupported ops can make CPU/GPU faster. Profile all `MLComputeUnits` settings
- **Fighting the scheduler** — `DISPATCH_QUEUE_PRIORITY_HIGH` instead of QoS, or manual core pinning. The OS knows thermal state and core availability better than your code
- **Ignoring cache effects** — optimizing algorithmic complexity while leaving cache-hostile access patterns. A cache-friendly O(n²) can outperform cache-hostile O(n log n) at practical data sizes
- **Over-dispatching to GPU** — many small dispatches instead of batching. Each dispatch has command buffer encoding + GPU wake-up overhead. Batch to amortize

## Connections

- **Data-Oriented Design** — cache-friendly data layout IS hardware-aware design; SoA vs AoS decisions are driven by cache line size and access patterns
- **Performance Measurement** — compute-bound vs memory-bound requires measurement; Instruments reveals which hardware unit is the bottleneck
- **On-Device ML Optimization** — compute unit selection for CoreML models is hardware-aware optimization
- **Real-Time Audio Engineering** — Accelerate/vDSP IS hardware-aware audio processing; dispatches to optimal SIMD paths automatically
