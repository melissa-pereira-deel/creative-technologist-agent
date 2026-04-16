---
title: The Pattern Language
slug: pattern-language
origin: christopher-alexander
lenses:
  - coherence-design
  - constraint-propagation
  - mechanism-design
  - progressive-expertise
tagline: Named, composable solutions that form a vocabulary greater than any individual solution.
---

A pattern language is a system of named design solutions, each expressed as a (context → problem → solution) trio, composable with others to produce coherent wholes. The term comes from Christopher Alexander's *A Pattern Language* (1977), which documented 253 such patterns for built environments — from the scale of cities ("Web of Public Transportation") down to the scale of rooms ("Light on Two Sides of Every Room").

The power of a pattern language isn't in any single pattern. It's in the combinatorial space the language opens. Once you have names for recurring problems and their solutions, you can have conversations, make decisions, train practitioners, and build on precedent in ways that are impossible with only tacit knowledge and instinct.

Software adopted Alexander's idea directly. Ward Cunningham and Kent Beck introduced design patterns to programming in 1987 after reading Alexander. The Gang of Four book (1994) — Factory, Observer, Singleton — is Alexander translated into code. The wiki was invented by Cunningham specifically to document patterns collaboratively. Every design system, every component library, every architectural pattern catalogue is a pattern language in Alexander's sense.

This entire project — 19 named lenses, each expressing a recurring problem and its best-known solution — is a pattern language for a specific kind of practitioner.

## Where it shows up

- **Design systems:** component libraries as named solutions to recurring interface problems
- **Software architecture:** patterns as a shared vocabulary for system-level decisions
- **Team communication:** named patterns allow imprecise intuitions to become precise conversations
- **Learning and transfer:** patterns are how tacit craft knowledge gets transmitted

## The key property

A pattern language isn't complete — it's *alive.* New patterns can be added as new recurring problems are recognized and solved. Old patterns can be revised as the context changes. The language grows with the practice.
