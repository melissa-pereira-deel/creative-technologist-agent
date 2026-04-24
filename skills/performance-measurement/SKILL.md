---
name: Performance Measurement
description: "Carmack's discipline: never optimize without measuring. Instruments, signposts, budgets, thermal management, profiling methodology. Trigger on: 'it feels slow', 'where is the bottleneck?', profiling, Instruments, 'CPU usage is high', 'memory leak', frame drops, 'battery drain', thermal throttling, performance budget, 'how do I measure?', Time Profiler, Allocations, os_signpost, MetricKit."
---

# Performance Measurement

Never optimize without measuring. The bottleneck is almost never where intuition points.

## Performance Budgets

Define budgets before optimizing:
- Total budget = 1 / target_fps (16.67ms at 60fps, 100ms for "instant" response)
- Decompose: audio capture (< 1ms) → preprocessing (< 2ms) → inference (< 50ms) → UI update (< 5ms)
- Optimize the component that exceeds its budget — not the one you know how to optimize

## Instruments Templates

| Symptom | Template | What to look for |
|---------|----------|-----------------|
| "It's slow" | Time Profiler | Heaviest stack trace view, call tree sorted by cost |
| Memory growing | Allocations | Growth patterns (leak), transient spikes, zombie objects |
| Reference cycles | Leaks | Retain cycle graph |
| Audio glitch | System Trace | Thread scheduling, context switches, priority inversions |
| Model slow | CoreML | Per-layer compute unit assignment, Neural Engine vs GPU vs CPU fallback |
| GPU issues | Metal System Trace | Pipeline utilization, shader execution time |
| Battery drain | Energy Log | CPU/GPU/network energy impact over time |

When unsure: Time Profiler first.

## os_signpost

Custom instrumentation points for Instruments timeline:
- `os_signpost(.begin)` / `os_signpost(.end)` bracket regions of interest
- Zero cost when Instruments is not attached (compiled out in release)
- Use for: inference calls, buffer processing, feature extraction — anything measured repeatedly
- Prefer over `print(Date())`: signposts use `mach_absolute_time` (nanosecond precision, monotonic)

## MetricKit (Production Data)

- `MXAppLaunchMetric`: launch time distribution across real users
- `MXCPUMetric`: CPU time per foreground/background session
- `MXMemoryMetric`: peak memory, suspended memory
- `MXDiskIOMetric`: read/write volume

Reports delivered daily as histograms. Use to identify issues that don't reproduce in the lab.

## Thermal Management

- `ProcessInfo.thermalState`: `.nominal` → `.fair` → `.serious` → `.critical`
- At `.serious`: reduce work (lower inference frequency, skip non-essential processing)
- At `.critical`: OS throttles regardless — proactive reduction gives better results than the system's forced throttle
- Test: Xcode → Developer menu → Simulate Thermal Pressure

## Measurement Methodology

- **Isolate**: change one variable, measure one variable
- **Warm up**: discard first N runs — cold caches, JIT, model loading skew results
- **Aggregate**: 100+ samples; report p50 and p95, not averages
- **Target hardware**: profile on the lowest-spec device you support
- **Release builds only**: debug disables optimizations — never profile debug and trust the numbers

## Decisions

- **When to profile**: before optimization (baseline), after each change (verify), before release (regression), when users report issues
- **Lab vs production**: Instruments for deep investigation of your usage pattern. MetricKit for real-world distribution. Use both
- **Optimization threshold**: don't touch what's within budget. A 2ms function in a 50ms budget is not worth optimizing even at 10×

## Traps

- **Profiling debug builds** — debug has no compiler optimizations, slower allocators. Profile release only
- **Averages over percentiles** — p50=10ms, p99=500ms means 1% of users see 50× worse performance. Measure p95/p99
- **Premature optimization** — optimizing before measuring guarantees optimizing the wrong thing
- **Wrong timer** — `Date()` has millisecond precision and clock adjustments. Use `mach_absolute_time` or `ContinuousClock` (nanosecond, monotonic)
- **One-shot benchmarks** — single measurement has 10–50% variance from cache state, thermal, and system load. Always aggregate

## Connections

- **Hardware-Aware Computing** — measurement reveals which hardware unit is the bottleneck; hardware awareness dictates the fix
- **Real-Time Audio Engineering** — System Trace diagnoses audio glitches; signposts bracket audio processing
- **On-Device ML Optimization** — CoreML template profiles model inference; measurement determines acceptable quantization level
- **First-Principles Reduction** — measurement questions assumptions: "is this actually slow?"
