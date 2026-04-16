---
name: Evolutionary Design
description: "Apply variation → selection → retention to product decisions under uncertainty. Trigger on: brainstorming directions, 'should we pivot?', 'users are doing something unexpected', 'our improvements are plateauing', market shifts, A/B testing, high uncertainty about the right path."
---

# Evolutionary Design

Evolution has no plan, no designer, no foresight — and it produced everything from bacteria to the human brain. Three steps: generate variation, select against reality, retain what works. The power: it works under uncertainty. You don't predict the future; you generate enough variation that something survives whatever future arrives.

## Model

**Fitness Landscape** — every possible product configuration is a point on a terrain; height = performance. Most optimization techniques find the nearest peak, which may not be the highest. Evolution escapes local optima through variation that sometimes moves downhill temporarily to reach a higher peak.

**Exaptation** — features used for one purpose get co-opted for another. Twitter's @ mention evolved as user convention, then was formalized. The hashtag was invented by a user, not by Twitter. Watch for users repurposing features — they've found a peak on the landscape you didn't see.

**Co-evolution** — your product changes what users do, which changes what the product needs to be. Users are not static; they evolve in response to your product.

**Punctuated Equilibrium** — evolution is not gradual and constant. Long stability, then rapid shifts. A new platform (iPhone 2007, web 1995, AI 2023) creates a burst of diverse experimentation, then selection winnows.

**Selection Pressure and Diversity** — strong selection pressure reduces variety (efficient but fragile). Multiple bets are less efficient but more resilient to landscape shifts.

**Niche Construction** — organisms modify their environment. Slack didn't just fill a communication need — it created the category of "workplace chat" and changed what people expect. You don't just find a market; you construct one.

## Apply

**Variation Generator** — before selecting a direction:
- Have you generated at least 5 genuinely different approaches? (Not 5 variations of the same idea)
- Do they vary along meaningful dimensions? (Scope, audience, technology, model)
- Have you included at least one "mutation" — an approach that seems weird or unlikely?
- Push past the first 3–5 ideas; those are the obvious ones everyone would have.

**Selection Environment** — design how selection happens:
- Ship small experiments to real users (market selects; your meetings don't)
- Define what "fitness" means BEFORE testing (what metric defines success?)
- Time-box experiments (set a deadline; open-ended exploration isn't selection)
- Distinguish early negative signal (kill it) from normal adoption curve (give it time)

**Retention System** — preserve what you learn:
- Document WHY something worked, not just THAT it worked
- Build on successful variations; don't restart from zero each cycle
- Beware "success amnesia" — forgetting the failed variations that made the winner possible

**Fitness Landscape Check** — periodically:
- Are we on a local optimum? (Good but can't improve incrementally)
- Has the landscape shifted? (What was fit 2 years ago may not be fit today)
- Are we investing enough in exploration (finding new peaks) vs. exploitation (climbing current peak)?

**Exaptation Signal** — when users do something unexpected:
- How deeply are they doing it? Is it a core behavior or a one-time thing?
- Does it align with long-term vision?
- If strong signal: run a small experiment in that direction. Don't ignore it; don't immediately pivot.

## Anti-Patterns

**Premature convergence** — selecting a direction before generating enough variation. Choosing the first reasonable option.

**Local optimum addiction** — refusing to change what's working incrementally even when the landscape has shifted. Metric still going up ≠ heading the right direction.

**Ignoring exaptation** — dismissing unexpected user behaviors as edge cases. Users show you a path; you ignore it because it wasn't in the plan.

**Planning instead of evolving** — believing you can predict the right product without testing. Building the full vision before shipping anything.

**Monoculture** — everything on one approach, one market, one technology. Efficient on a stable landscape; catastrophically fragile when it shifts.

## Connections

- **Adjacent Possible** — each step is a variation that expands what's possible next
- **Deep Deliberation** — deliberation generates high-quality variation, not random variation
- **Constraint Propagation** — each variation changes the constraint surface; trace the effects
- **Temporal Reasoning** — landscapes shift at different speeds; pace layers determine when to explore vs. exploit
- **Signal Discrimination** — recognizing exaptation requires distinguishing signal (user behavior) from noise (edge cases)
