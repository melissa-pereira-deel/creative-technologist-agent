---
name: On-Device ML Optimization
description: "Shipping ML models that run fast and fit on device — CoreML, MLX, quantization, Neural Engine constraints. Trigger on: 'model is too slow', 'model is too large', CoreML conversion, quantization, 'Neural Engine', on-device inference, 'battery drain from ML', model profiling, INT8, FP16, weight palettization, compute unit selection, streaming inference, MLX, 'model won't fit', ONNX to CoreML."
---

# On-Device ML Optimization

## CoreML Pipeline

Train (PyTorch/TF) → export (ONNX/TorchScript) → convert (`coremltools`) → optimize (quantize/palettize) → integrate (Xcode)

- `coremltools.convert()` handles PyTorch, TF, ONNX, JAX. Specify `compute_units` at conversion: `.all`, `.cpuAndGPU`, `.cpuOnly`
- `MLModel.predict()` is synchronous. For streaming: use `MLModel.prediction(from:)` with pre-allocated `MLFeatureProvider` to avoid per-call allocation
- CoreML compiles models at first load (`.mlmodelc`). Cache the compiled model — recompilation on every launch wastes seconds

## CoreML vs MLX

- **CoreML**: ship in apps. Neural Engine access, optimized runtime, battery efficient
- **MLX**: development, research, Mac-only tools. NumPy-like API, lazy evaluation, unified memory (no CPU↔GPU copies). Use for prototyping, open-source model inference, LoRA fine-tuning on device

## Quantization

| Level | Size reduction | Accuracy loss | When to use |
|-------|---------------|---------------|-------------|
| FP32 → FP16 | 2× | Negligible | Always |
| FP16 → INT8 (PTQ) | 2× more (4× total) | Varies — measure first | Size is bottleneck |
| 4-bit palettization | 8× | Often < 1% on large models | LLMs, maximum compression |

- **PTQ (post-training quantization)**: fast, no retraining. Start here
- **QAT (quantization-aware training)**: higher accuracy, requires training infrastructure

## Neural Engine Constraints

Apple's NPU (15.8–38+ TOPS depending on chip) is fast but rigid:
- Fixed computation graph: no dynamic shapes, no data-dependent control flow, no in-place mutations
- Not all ops run on Neural Engine — unsupported ops fall back to CPU/GPU, creating pipeline stalls
- Optimized for batch size 1 (single-sample inference)
- Sometimes `.cpuAndGPU` is faster than `.all` due to fallback overhead — always profile, don't assume

## Streaming Inference

For continuous processing (e.g., transcription):
- Chunk audio into fixed windows (30s for Whisper). Overlap by 2–5s to avoid cutting words at boundaries
- Double-buffer: while model processes chunk N, capture chunk N+1. Never block capture waiting for inference
- KV cache: for autoregressive models, cache key-value state between chunks to avoid recomputing context
- Inference on a dedicated queue — never on main thread (blocks UI) or audio thread (breaks real-time contract)

## Model Profiling

Measure before optimizing. Track: inference latency (p50, p95), dirty memory, energy impact, model load time.
- **Instruments → CoreML template**: per-layer compute unit assignment, inference timing — shows Neural Engine vs GPU vs CPU fallback
- **`os_signpost`**: bracket inference calls for custom timeline visualization
- **Benchmark all `MLComputeUnits`** on target hardware — results vary by model architecture and device generation

## Decisions

- **CoreML vs MLX**: CoreML for production apps; MLX for local development/research
- **Quantization level**: FP16 always. INT8 when size is the bottleneck and accuracy is verified on your eval set. 4-bit for LLMs needing maximum compression
- **Compute units**: start `.all`; restrict if Neural Engine fallbacks hurt. Speech models often run fastest on `.cpuAndGPU` (recurrent layers)
- **Streaming window**: 30s + 3s overlap for transcription accuracy. 5–10s for real-time captioning (lower accuracy)

## Traps

- **Assuming Neural Engine is fastest** — profile all compute unit settings. Fallback overhead makes CPU/GPU faster for some architectures
- **Per-call allocation** — new `MLMultiArray` or `MLFeatureProvider` per inference. Pre-allocate and reuse
- **Ignoring model load time** — 5ms inference doesn't matter if load takes 3s. Preload at launch, cache `.mlmodelc`
- **Dynamic shapes** — variable-length inputs force CPU fallback for shape-dependent ops. Use fixed shapes with padding
- **Quantizing blindly** — INT8 without measuring accuracy on your eval set. Loss varies dramatically by architecture

## Connections

- **Real-Time Audio Engineering** — audio pipeline feeds ML pipeline; buffer sizes and threading must be coordinated
- **Hardware-Aware Computing** — Neural Engine, GPU, CPU trade-offs are hardware decisions; compute unit selection is hardware-aware optimization
- **Performance Measurement** — CoreML Instruments template is the profiling tool; same methodology (budget → measure → optimize)
- **Data-Oriented Design** — ML input tensors need contiguous memory; feature extraction should produce SIMD-friendly buffers
