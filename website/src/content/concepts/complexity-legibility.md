---
title: Complexity Made Legible
slug: complexity-legibility
origin: rich-hickey
lenses:
  - legibility-design
  - signal-discrimination
  - first-principles-reduction
  - information-entropy
tagline: Complexity doesn't have to be hidden. It can be revealed at the right resolution.
---

The instinct when facing complexity is to hide it — to present the user with a clean surface and handle the mess behind the scenes. This works, up to a point. But hidden complexity doesn't disappear. It accumulates. It resurfaces as unexpected behavior, unmaintainable systems, and users who can't reason about why things work the way they do.

The alternative is not to expose all complexity indiscriminately, but to make the right complexity legible at the right resolution. A weather map is more complex than reality, but more legible: the abstraction reveals structure (fronts, pressure systems, temperature gradients) that raw atmospheric data wouldn't. A musical score is more complex than sound but reveals structure you can't hear — the relationships between instruments, the progression of harmony over time. The complexity is not hidden; it's represented at the resolution where the right things become visible.

Rich Hickey's work on simplicity makes the theoretical foundation precise. *Simple* means one thing, one role, one concern — the opposite of *complex* (interleaved, braided). *Easy* means near to hand, familiar — the opposite of *hard*. The failure mode of most software is optimizing for easy (familiar, requiring little effort) at the expense of simple (decomplected, one thing at a time). This produces systems that are easy to start using and impossible to understand fully — because their essential complexity has been entangled with accidental complexity, and no representation separates them.

Legibility is the design practice of making essential complexity visible while eliminating or containing accidental complexity.

## Where it shows up

- **API design:** does the interface reveal the essential complexity of the domain or add accidental complexity of its own?
- **Dashboard design:** does the representation make the right things visible at the right resolution?
- **Error messages:** do they expose the right level of complexity for the user to act?
- **System observability:** can operators understand what the system is doing and why?

## The test

Remove one layer of abstraction. Does the system become more understandable or less? If less, the abstraction is earning its place. If more, you've been using complexity to hide complexity.
