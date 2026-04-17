---
name: Rich Hickey
dates: 1961–
field: Software designer, creator of Clojure
slug: rich-hickey
portrait: /images/thinkers/rich-hickey.jpg
portrait_credit: "Photo: Strange Loop Conference — CC BY 2.0"
concept: complexity-legibility
lenses:
  - first-principles-reduction
  - deep-deliberation
  - information-entropy
  - coherence-design
quote: "Simplicity is not about you. Complexity is not about you. They're about the artifacts you make."
website: https://clojure.org
books:
  - title: "Programming Clojure"
    year: 2008
    description: "Not written by Hickey but the primary way to understand the language he designed. Clojure's design decisions — immutable data, emphasis on values over state, explicit time — are arguments made in code. Reading Clojure seriously is reading Hickey's theory of software."
  - title: "The Joy of Clojure"
    year: 2011
    description: "A deeper engagement with the philosophy behind Clojure's design. The book asks why Clojure makes certain choices, and the answers are Hickey's arguments about simplicity, state, and the nature of programs over time."
talks:
  - title: "Simple Made Easy"
    year: 2011
    platform: "Strange Loop Conference — YouTube / InfoQ"
    description: "The talk that earned Hickey a permanent place in the canon of software thinking. He distinguishes 'simple' (one thing, no interleaving) from 'easy' (near to hand, familiar). Most software optimizes for easy and produces complex. The implications cascade through every design decision you make."
  - title: "Hammock Driven Development"
    year: 2010
    platform: "Strange Loop Conference — YouTube"
    description: "On the virtue of thinking before coding. Most software bugs, Hickey argues, come not from bad implementation but from failing to understand the problem. The talk is about how to use your background mind — including sleep — as a design tool. Quietly radical."
  - title: "Are We There Yet?"
    year: 2009
    platform: "JVM Language Summit — InfoQ"
    description: "A philosophical reckoning with state, time, and identity in object-oriented programming. Hickey draws on Whitehead and process philosophy to argue that OOP conflates things that should be kept separate. Harder than Simple Made Easy, more fundamental."
---

Rich Hickey spent ten years thinking about Clojure before writing a line of it. He describes the process in a talk called "Hammock Driven Development": most software bugs come not from implementation errors but from failing to understand the problem — and the cure is not more code review or better testing but more time spent thinking in undirected, unhurried ways. He would lie in a hammock for hours, letting his background mind work on a problem, loading it up with observations before sleep and checking the results in the morning.

The language that emerged from this process is a study in deliberate simplicity. Not easiness — Clojure has a steep learning curve. But simplicity in the precise sense Hickey draws: the absence of interleaving, of things braided together that should be separate. His 2011 talk "Simple Made Easy" makes the distinction rigorous: *simple* means one thing, one role, one concept — the opposite of complex (braided). *Easy* means near to hand, familiar, requiring little effort — the opposite of hard. The two are orthogonal. Most software optimizes for easy and produces complex. Clojure optimizes for simple and accepts hard.

The implication for design is profound. Every time a designer combines two concerns into one feature because it's convenient — the button that both saves and closes, the field that both validates and formats — they are trading simplicity for ease. The debt compounds. Eventually the system is so braided it can't be changed safely.

Hickey's question for any design: *is this actually one thing, or is it two things that happen to arrive together?*

## Signature moment

When Hickey released Clojure in 2007, he was an independent consultant who had been quietly building the language for years, funded entirely by contract work. He announced it on a mailing list with no fanfare. There was no company, no funding, no launch event. Just a language and a set of ideas about what was wrong with everything else.

The ideas landed. Within a few years, Clojure had attracted a community unusual for a programming language: not hobbyists and academics primarily, but working programmers who had been frustrated for years by the same things Hickey was frustrated by. His talks were passed around engineering departments like contraband. The vocabulary he introduced — simple vs. easy, essential vs. accidental complexity, value vs. state — migrated out of the Clojure community and into mainstream engineering conversations. You now hear these distinctions in system design interviews, architecture reviews, and product retrospectives, made by people who have never written a line of Clojure and may not know where the vocabulary came from.

## What they gave us

**Complexity Made Legible** — the tools for distinguishing essential complexity (in the problem) from accidental complexity (in the solution), and the discipline to separate what must be joined.

## The key idea

*Simple is not easy.* The most important design decisions are often the ones that make something harder to build but easier to reason about. Simplicity compounds. Complexity also compounds, in the other direction.
