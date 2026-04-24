---
name: Concurrency & Parallelism
description: "Coordinating work across threads safely — Swift concurrency, GCD, actors, race conditions, deadlocks, lock-free patterns. Trigger on: 'race condition', 'deadlock', 'data race', async/await, actor, DispatchQueue, 'thread safety', 'main thread', 'background thread', Sendable, TaskGroup, structured concurrency, 'priority inversion', 'concurrent access', 'thread sanitizer', mutex, semaphore, 'this crashes randomly'."
---

# Concurrency & Parallelism

Make invalid states unrepresentable, not just unlikely. Concurrency bugs are non-deterministic — a race condition can pass 10,000 tests and crash in production.

## Swift Concurrency Model

- **async/await**: `await` marks suspension points. Function resumes on any thread unless actor-isolated
- **Tasks**: `Task { }` = unstructured (fire-and-forget). `TaskGroup` = structured (parent waits, cancellation propagates). Prefer structured — unstructured tasks are the `goto` of concurrency
- **Actors**: reference types with serialized access. One task at a time, no data races by construction. `await actor.method()` suspends until actor is available
- **@MainActor**: guarantees main thread execution. All UI updates must be `@MainActor`. Mark view models `@MainActor` when they drive UI state
- **Sendable**: compile-time proof safe to share across concurrency domains. Value types implicitly Sendable. Classes: `final class` with `let` properties only, or `@unchecked Sendable` (you assume responsibility)

## Grand Central Dispatch

- `DispatchQueue.main`: serial, for UI. Never block it
- `DispatchQueue.global(qos:)`: concurrent background work. QoS determines thread priority
- Serial queues: mutual exclusion by serialization. Deadlock: `sync` dispatch to own queue
- `.async` enqueues and returns immediately. `.sync` blocks the caller — almost never use it

## Race Conditions

- **Symptoms**: random crashes, corrupted data, values that "can't happen," heisenbugs that disappear under debugger
- **Detection**: Thread Sanitizer (TSan) — catches data races at runtime. Enable in scheme diagnostics. Run test suite with TSan in CI
- **Prevention** (ranked): immutability > actors (compiler-enforced) > serial queues (runtime) > locks (manual, error-prone)

## Deadlocks

- Classic: Thread A holds Lock 1, waits for Lock 2. Thread B holds Lock 2, waits for Lock 1
- GCD: `DispatchQueue.main.sync { }` from main thread — dispatches to own queue and waits for itself
- Actor: actor A awaits actor B which awaits actor A. Swift actors are NOT re-entrant
- Prevention: acquire locks in consistent order, never sync-dispatch to potentially-current queue, minimize cross-actor calls

## Priority Inversion

- RT audio thread needs data from a lock held by a background thread. OS won't schedule the low-priority thread — audio starves
- `os_unfair_lock` supports priority inheritance; `NSLock` does not
- Real fix: lock-free communication (ring buffers, atomics). The RT thread should NEVER wait on any lock

## Lock-Free Patterns

- `OSAtomicCompareAndSwap`, `AtomicInteger` (swift-atomics): single-value atomics for flags, counters, simple state machines
- Lock-free ring buffer: one writer, one reader, atomic head/tail pointers. Correct pattern for audio thread ↔ processing thread
- Lock-free is harder to reason about than locks. Use only when locks are unacceptable (real-time threads) or maximum throughput on simple operations is required

## Cancellation

- `Task.isCancelled` / `Task.checkCancellation()` — tasks must check and respond
- Long-running work: check every loop iteration or chunk
- Cancellation propagates through structured concurrency: cancelling parent cancels all children
- `withTaskCancellationHandler { }` for cleanup when awaiting non-Swift async work

## Decisions

- **Actor vs GCD serial queue**: actor for new code (compiler checks, structured). GCD when wrapping callback-based code or when precise QoS control is needed. Don't mix — one concurrency model per subsystem
- **Structured vs unstructured tasks**: structured (`TaskGroup`, `async let`) when parent needs results or cancellation propagation. Unstructured for fire-and-forget that must outlive calling scope
- **Lock-free vs locks**: lock-free only for real-time threads or hot contention points where profiling proves locks are the bottleneck
- **Main actor isolation**: isolate view models and UI state to `@MainActor`. Keep computation and I/O off main actor — use `Task.detached` or nonisolated methods

## Traps

- **Blocking the main thread** — synchronous network calls, heavy computation, or lock waits from the main queue. Frozen UI, watchdog kill after 20s on iOS
- **Actor overload** — one actor handling too much serializes everything. Split actors by responsibility
- **Unstructured task leaks** — `Task { }` with no handle = no cancellation. Store handles and cancel on deinit/dismissal
- **Hidden concurrency in callbacks** — CoreAudio, URLSession, and many frameworks call back on arbitrary threads. Touching `@MainActor` state without dispatching causes data races
- **TSan-free testing** — data races are silent until they crash. Run TSan in CI

## Connections

- **Real-Time Audio Engineering** — the audio render thread is the canonical case for priority inversion and lock-free requirements; concurrency knowledge explains WHY the RT thread rules exist
- **Swift Memory & Performance** — ARC atomic refcounting IS a concurrency primitive; actors serialize access because class copies require atomic increments
- **Hardware-Aware Computing** — QoS maps to P-cores vs E-cores; false sharing is a concurrency × cache interaction; thread scheduling is hardware-aware
- **Performance Measurement** — System Trace in Instruments shows thread scheduling, context switches, and priority inversions
