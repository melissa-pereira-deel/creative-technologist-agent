---
name: Signal Discrimination
description: "Distinguish signal from noise — know what to REMOVE. Trigger on: designing dashboards or reports, 'this feels cluttered', 'what metrics matter?', 'should we add this feature?', 'what should we show the user?', feature list reviews, data visualization, any interface that feels overwhelming."
---

# Signal Discrimination

Every element is either **signal** (helps the user decide or act) or **noise** (distracts or slows them). The creative technologist's job is subtraction — delete everything that fails to earn its place.

## Model

**Signal-to-Noise Ratio** — the ratio between useful and distracting elements determines experience quality. Google's 1998 homepage: one field, one button. Competitors had more features. Google had more value.

**The Shazam Principle** — Avery Wang's algorithm identifies the most salient spectral peaks and discards everything else. It works *because* of what it excludes. Apply this to dashboards: 3–5 metrics that drive decisions beats 47 metrics that document everything.

**Information Density vs. Overload** — these are different problems. High density = much meaning per pixel (Piotroski F-Score: 9 criteria → one 0–9 number). Overload = more than the user can process. Goal: high density without overload. Achieve it through hierarchy and progressive disclosure.

**The Paradox of Choice** — too many options produce worse decisions and lower satisfaction. Curation is a feature. Saying no to options is saying yes to clarity.

## Apply

**Subtraction Audit** — for each element in a design or feature list:
1. Does this increase the user's ability to decide or act? If "maybe" or "no" — mark for removal.
2. Can you articulate the decision it enables in one sentence? If not — remove it.
3. Has this metric been referenced in an actual decision in the last 3 months? If not — delete it.

**Three-Resolution Test** — information must work at three scales:
- **1 second**: What's the status? Up or down?
- **30 seconds**: What's the detail? What drove it?
- **5 minutes**: What's the history and edge cases?

If it fails the 1-second test, you have a legibility problem. Make the signal obvious; hide the details.

**Signal Hierarchy** — rank by decision-relevance:
- Tier 1: what the user must know to make the primary decision → prominent, large, unavoidable
- Tier 2: context that increases confidence → visible but not dominant
- Tier 3: interesting but optional → hidden or on demand

**The "Explain to a Stranger" Test** — if you can't explain why an element exists in one sentence, it probably shouldn't. "It might be useful someday" is a red flag. Design for the primary user and primary decision.

## Anti-Patterns

**Dashboard Creep** — metrics accumulate because they're available, not because they're useful. Audit quarterly; delete anything not referenced in decisions.

**Feature Accumulation Without Retirement** — every release adds, nothing gets removed. For every new feature, require removal of an old one.

**"Just in Case" Features** — adding something because a competitor has it or someone might want it someday. Creates optionality that paralyzes users. Rule: say no until someone has asked three times.

**Data-Ink Ratio Violations** (Tufte) — gradients, drop shadows, 3D effects decorating 10% of pixels while 90% is decoration. Maximize pixels devoted to data.

## Connections

- **Legibility Design** — signal discrimination determines what to show; legibility design determines how to show it
- **Tools for Thought** — amplify signal, automate noise away
- **Progressive Expertise** — what's signal for an expert is noise for a beginner; layer accordingly
- **Coherence Design** — every remaining element should strengthen the whole
