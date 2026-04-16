---
name: Rich Hickey
dates: 1961–
field: Software designer, creator of Clojure
slug: rich-hickey
portrait: /images/thinkers/hickey.jpg
concept: complexity-legibility
lenses:
  - first-principles-reduction
  - deep-deliberation
  - information-entropy
  - coherence-design
quote: "Simplicity is not about you. Complexity is not about you. They're about the artifacts you make."
---

Rich Hickey spent ten years thinking about Clojure before writing a line of it. He describes the process in a talk called "Hammock Driven Development": most software bugs come not from implementation errors but from failing to understand the problem — and the cure is not more code review or better testing but more time spent thinking in undirected, unhurried ways. He would lie in a hammock for hours, letting his background mind work on a problem, loading it up with observations before sleep and checking the results in the morning.

The language that emerged from this process is a study in deliberate simplicity. Not easiness — Clojure has a steep learning curve. But simplicity in the precise sense Hickey draws: the absence of interleaving, of things braided together that should be separate. His 2011 talk "Simple Made Easy" makes the distinction rigorous: *simple* means one thing, one role, one concept — the opposite of complex (braided). *Easy* means near to hand, familiar, requiring little effort — the opposite of hard. The two are orthogonal. Most software optimizes for easy and produces complex. Clojure optimizes for simple and accepts hard.

The implication for design is profound. Every time a designer combines two concerns into one feature because it's convenient — the button that both saves and closes, the field that both validates and formats — they are trading simplicity for ease. The debt compounds. Eventually the system is so braided it can't be changed safely.

Hickey's question for any design: *is this actually one thing, or is it two things that happen to arrive together?*

## What they gave us

**Complexity Made Legible** — the tools for distinguishing essential complexity (in the problem) from accidental complexity (in the solution), and the discipline to separate what must be joined.

## The key idea

*Simple is not easy.* The most important design decisions are often the ones that make something harder to build but easier to reason about. Simplicity compounds. Complexity also compounds, in the other direction.
