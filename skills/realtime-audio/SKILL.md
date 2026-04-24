---
name: Real-Time Audio Engineering
description: "Building audio pipelines that never glitch — CoreAudio, AVAudioEngine, real-time thread constraints, DSP via Accelerate. Trigger on: audio capture, microphone input, 'audio glitches', buffer underrun, 'latency is too high', ring buffer, audio processing pipeline, noise reduction, Voice Activity Detection, sample rate, audio format, 'real-time thread', AVAudioEngine setup, audio tap, audio routing on macOS."
---

# Real-Time Audio Engineering

## CoreAudio Stack

Choose from highest to lowest level:
- **AVAudioEngine**: node graph (source → processing → output). Install taps, connect nodes, process buffers. Start here
- **Audio Units (AUAudioUnit)**: custom DSP, inter-app audio, complex routing. Use when AVAudioEngine's node model is too restrictive
- **Core Audio (C API)**: AudioDeviceID, AudioBufferList, IOProcs. Maximum control. Use only when Audio Units aren't enough

## Real-Time Thread Contract

The audio render callback runs on a real-time priority thread. Violating any rule causes audible glitches:
- **No heap allocation** — `malloc`, `new`, `Array.append`, string concatenation. Pre-allocate everything at setup
- **No locking** — `NSLock`, `DispatchSemaphore`, `pthread_mutex` risk priority inversion. Lock-free structures only
- **No blocking I/O** — no disk reads, network calls, database queries. All data must be in memory before callback fires
- **No Objective-C messaging** — `objc_msgSend` can trigger autorelease pools or locks. Use Swift value types or C
- **No `async/await`** — suspension points break real-time guarantees

## Ring Buffers

Pass data between threads via circular buffer (one writer, one reader, atomic pointers — lock-free by design). Use `TPCircularBuffer` or `AVAudioPCMBuffer` with manual management. Size for 2–4× your processing buffer to handle scheduling jitter.

## Buffer Sizes (44.1kHz)

| Samples | Latency | Use case |
|---------|---------|----------|
| 64 | ~1.5ms | Live monitoring |
| 128 | ~2.9ms | Real-time processing |
| 256 | ~5.8ms | Most real-time apps |
| 512 | ~11.6ms | Transcription, analysis |
| 1024 | ~23.2ms | Recording, non-interactive |

Smaller buffers = lower latency but less processing time before the deadline.

## DSP via Accelerate (vDSP)

- `vDSP.FFT`: vectorized FFT for spectral analysis, mel spectrogram
- `vDSP.multiply`, `vDSP.add`: element-wise ops, 4–8× faster than scalar loops
- `vDSP.windowing`: Hann/Hamming window for FFT preprocessing
- `vDSP.convertElements`: Int16 ↔ Float32 format conversion

Always prefer Accelerate over hand-written loops — it dispatches to optimal SIMD paths per hardware generation.

## Voice Activity Detection (VAD)

- **Energy-based**: RMS per frame vs noise floor. Near-zero CPU, some false triggers
- **Spectral-based**: speech formant shape. More accurate, higher CPU
- **ML-based**: per-frame neural net. Most accurate, costs inference per frame

**Strategy**: energy gate first, ML gate only when energy threshold exceeded. Gate all expensive processing on VAD — never run DSP/inference on silent frames.

## Audio Formats

- Sample rate: 16kHz (speech/STT models), 44.1kHz (CD), 48kHz (video)
- Bit depth: 16-bit (standard output), 32-bit float (internal processing — avoids clipping)
- Channels: mono for speech, stereo for music/spatial
- Convert to the model's expected format once at capture, not repeatedly in the pipeline

## Decisions

- **API level**: AVAudioEngine first; Audio Units for custom DSP; C API only for device-level control
- **Buffer size**: 512 samples for transcription (~11.6ms latency, comfortable processing window)
- **DSP placement**: latency-critical ops (noise gate, gain) on render callback; compute-heavy ops (FFT, ML inference) on separate thread via ring buffer. Never put ML inference on the audio thread
- **VAD**: energy as first gate, ML as second gate

## Traps

- **Allocating on the audio thread** — any string formatting, array append, or object creation. Find with Instruments Allocations filtered to the RT thread
- **Locking on the audio thread** — any lock or dispatch sync with main thread. Use ring buffers
- **Missing format conversion** — feeding 44.1kHz stereo to a 16kHz mono model. Convert once at capture
- **Wrong ring buffer size** — too small drops data; too large wastes memory. Target 2–4× processing buffer
- **Processing silence** — running full DSP/ML on every frame. Always gate with VAD

## Connections

- **Performance as Experience** — audio latency thresholds are stricter than visual: 10ms audio delay is perceptible, 50ms visual delay is not
- **Hardware-Aware Computing** — Accelerate/vDSP leverages SIMD; compute path selection determines DSP throughput
- **Signal Discrimination** — VAD is literal signal/noise discrimination
- **Performance Measurement** — Audio System Trace in Instruments profiles the real-time thread; signposts bracket audio processing
- **Data-Oriented Design** — audio buffers are the canonical SoA case: contiguous float arrays processed by vDSP
