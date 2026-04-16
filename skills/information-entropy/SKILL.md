---
name: Information Entropy
description: "Apply physics of order and disorder to product, codebase, and communication health. Trigger on: 'this is getting messy', 'the codebase is hard to maintain', 'this presentation doesn't land', tech debt assessment, feature bloat, design system drift, 'what should we cut?', auditing system health."
---

# Information Entropy

In closed systems, disorder always increases. You cannot decrease entropy without expending energy. A codebase left alone becomes harder to navigate. A product without editorial constraints accumulates features. A design system ignored drifts into inconsistency. These are not failures — they are physics. The question is not whether to fight entropy, but where and how much.

Shannon: information is surprise — the reduction of uncertainty. A message that tells you what you already know carries zero information. A completely random message has maximum entropy but zero meaning. Useful information lives in the sweet spot: surprising enough to shift understanding, structured enough to be interpretable.

## Model

**Entropy accumulation symptoms:**
- Codebase getting harder to maintain → tech debt is accumulated entropy
- Dashboard overwhelms the user → poor signal-to-noise ratio
- Product's feature set incoherent → feature entropy
- "Feels messy or hard to use" → entropy is the diagnosis
- Design system diverging from implementation → structural entropy

**Information density vs. overload** — density = much meaning per pixel (Piotroski F-Score: 9 criteria → one 0–9 number). Overload = more than the user can process. They're different problems. Goal: high density without overload, through hierarchy and progressive disclosure.

**Entropy resistance mechanisms** — automated tests resist code entropy. Design tokens resist visual entropy. Linters resist style entropy. Templates resist document entropy. If the answer to "what detects drift?" is "we rely on developers being careful" — entropy will accumulate.

## Apply

**Entropy Audit** — for any system (product, codebase, document, org):
1. Where is order being maintained? (What effort keeps this organized: tests, linters, reviews, refactoring)
2. Where has entropy accumulated? Name specific components, features, files.
3. What is the entropy budget? How much energy can this system afford for maintenance?
4. Where should you consciously let entropy increase? Not everything needs perfect order — decide what can be messy.

**Information Density Design:**
- Every pixel should carry maximum meaning (Tufte's data-ink ratio)
- Redundancy is acceptable only when it serves error correction (confirm destructive actions; use color + shape + text for accessibility)
- Ask the minimum question: "What is the smallest representation that preserves all decision-relevant information?"

**Entropy Resistance Design:**
- Automated tests → code behavior
- Design tokens → visual consistency
- Templates → document structure
- Linters and formatters → style consistency
- Clear naming conventions and folder structure → navigational entropy

**Compression Test** — for any communication (presentation, dashboard, report, email):
1. Extract the signal: what's the essential information?
2. Identify redundancy: what's repeated? What can be implied?
3. Spot noise: what's actively harmful to comprehension?
4. Find maximum compression: remove everything except signal. If you can't remove something without losing meaning, it's signal.

## Anti-Patterns

**Confusing data quantity with information quality** — 50 metrics is not more informative than 5. It's higher entropy and lower usability.

**Neglecting maintenance as "non-productive work"** — maintenance is entropy resistance. Without it, productive work becomes impossible.

**Assuming order is the default state** — disorder is the default. Order is the achievement. It requires energy to create and maintain.

**Over-ordering where disorder is acceptable** — not every system needs perfect order. Spending energy on low-consequence areas means less for high-consequence ones.

**Treating "getting messy" as an emergency instead of a diagnosis** — messiness is entropy accumulation. Fix the conditions that allow it, not just the symptom.

## Connections

- **Signal Discrimination** — entropy explains why subtraction is necessary; noise increases naturally, signal requires active protection
- **Legibility Design** — multi-resolution design is a compression strategy; different users need different compression ratios
- **Temporal Reasoning** — entropy accumulates over time; maintenance is a temporal problem, not a static one
- **Constraint Propagation** — entropy resistance mechanisms (tests, tokens, linters) are constraints that maintain order without constant human vigilance
