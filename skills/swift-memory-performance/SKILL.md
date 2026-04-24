---
name: Swift Memory & Performance
description: "Writing Swift that doesn't fight the runtime — value types, ARC avoidance, stack allocation, generics over existentials. Trigger on: 'Swift is slow', retain cycle, ARC overhead, 'struct vs class', copy-on-write, 'too many allocations', existential container, protocol witness table, generic specialization, withUnsafeBufferPointer, 'heap allocation in hot path', memory layout, @inlinable, whole module optimization."
---

# Swift Memory & Performance

## Value Types vs Reference Types

- **Structs**: stack-allocated when local (no ARC), CoW for stdlib collections, inlined by optimizer. Structs ≤ 16 bytes fit in CPU registers — free to pass. Default choice for hot path data
- **Classes**: heap-allocated (malloc + free), ARC on every copy/destroy (atomic retain/release), pointer indirection on access. 16 bytes overhead per instance (isa + refcount)
- **Rule**: structs for frequently created/destroyed data; classes for long-lived shared state. A struct containing a class reference still incurs ARC

## ARC Overhead

Every assign, pass, return, or capture of a class reference = atomic increment/decrement. Atomics are ~10–100× slower than regular increments.

Mitigation:
- `unowned`: no retain, crashes if accessed after dealloc. Use when lifetime is guaranteed (parent → child where child can't outlive parent)
- `weak`: zeroing reference. Use when lifetime is uncertain
- `Unmanaged`: no ARC — manual retain/release. Use at C interop boundaries only

The compiler eliminates redundant retain/release pairs but can't always prove safety across function boundaries.

## Stack vs Heap

- **Stack**: bump a pointer (< 1ns alloc/dealloc). No fragmentation, no thread sync
- **Heap**: `malloc` acquires a lock, searches free lists (~100ns+). Same overhead for dealloc
- Structs are stack-allocated when the compiler can prove local lifetime. Structs that escape (closures, existential containers) are heap-allocated
- Inspect with `-emit-sil`: `alloc_stack` = stack, `alloc_ref` = heap

## Generics vs Existentials

- **Generics** (`func process<T: AudioBuffer>(buffer: T)`): monomorphized per concrete type at compile time. Direct dispatch, no boxing, full inlining. Same performance as writing the concrete type
- **Existentials** (`func process(buffer: any AudioBuffer)`): runtime dispatch via protocol witness table. Values stored in 24-byte inline container; values > 24 bytes heap-allocated. Every method call = indirection
- **Rule**: generics in hot paths (loops, per-frame, per-buffer). Existentials at API boundaries where flexibility matters more than performance

## Copy-on-Write (CoW)

Stdlib collections (Array, Dictionary, Set, String) copy on mutation when shared, not on assignment:
- Assignment copies the reference. Mutation checks uniqueness — if unique, mutate in place; if shared, copy then mutate
- **Trap**: `let backup = array` before a mutating loop forces a copy on every mutation
- Custom CoW: use `isKnownUniquelyReferenced()` on class-backed storage

## Unsafe Pointers

- `UnsafeBufferPointer<T>`: typed view over contiguous memory. No bounds checking, no ARC, no copying
- `withUnsafeBufferPointer { }` on Array: access underlying storage without copying. Essential for Accelerate/vDSP integration
- `UnsafeMutableRawPointer`: untyped memory for C API interop (CoreAudio's `AudioBufferList`)
- Use only in proven hot paths — unsafe code bypasses all compiler safety checks

## Compiler Optimizations

- **WMO (`-wmo`)**: cross-function inlining and generic specialization across files. Always on in release builds
- **`@inlinable`**: exposes function body across modules for inlining. Use for small, hot framework functions
- **`@frozen`**: promises struct layout won't change — enables direct field access across modules
- **`final`**: eliminates vtable lookup → direct call. Mark classes `final` unless inheritance is required

## Decisions

- **Struct vs class**: struct by default. Class when: shared mutable state is needed, identity (`===`) matters, or inheritance is required. If a struct has > 4 stored class properties, ARC overhead may exceed a single class reference
- **When to use unsafe pointers**: C API interop (CoreAudio, Accelerate), large contiguous hot-loop buffers. Only after profiling proves safe abstractions are the bottleneck
- **Generic vs existential**: generic for anything in a loop or per-frame. Existential for storage types, dependency injection, plugin interfaces
- **ARC mitigation order**: prefer structs → audit with Instruments Allocations → use `unowned` for guaranteed-lifetime refs → `Unmanaged` only at C boundaries

## Traps

- **Existentials in hot paths** — `any Protocol` per-frame: witness table indirection + potential heap allocation for values > 24 bytes. Use generics or concrete types
- **Hidden heap allocations** — closures in tight loops allocate context on every iteration. String interpolation (`"\(x)"`) also allocates. Use `withoutActuallyEscaping` or restructure
- **Class references in structs** — a struct with 3 class properties = 6 atomic ops per copy. Consider replacing with value types or indices into a shared store
- **Missing `final`** — classes without `final` use vtable dispatch even when never subclassed. Add `final` to guarantee direct dispatch
- **Premature unsafe** — reaching for `UnsafePointer` before profiling. Unsafe code is hard to maintain and often not faster than optimized safe code

## Connections

- **Data-Oriented Design** — Swift structs in arrays are contiguous (DOD-friendly); class arrays are pointer arrays (DOD-hostile). Value types enable DOD
- **Hardware-Aware Computing** — stack allocation exploits CPU cache; 16-byte struct fits in registers; memory hierarchy explains why value types are faster
- **Real-Time Audio Engineering** — audio render callbacks require zero allocation; value types and unsafe pointers are essential for RT-safe code
- **Performance Measurement** — Instruments Allocations reveals heap traffic; `-emit-sil` reveals stack vs heap; measurement proves whether unsafe is necessary
