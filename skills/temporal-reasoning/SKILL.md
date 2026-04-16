---
name: Temporal Reasoning
description: "Think in trajectories, cycles, and phases rather than static snapshots. Trigger on: 'what's the trend?', 'where are we in the cycle?', 'is this the right time?', 'when should we...?', trend analysis, product roadmap sequencing, market timing, adoption curves, data interpretation needing temporal context."
---

# Temporal Reasoning

Most people think in snapshots — the current state of things. The creative technologist thinks in trajectories — where things came from, where they're going, and how the same data means entirely different things at different points in a cycle.

Time is not metadata. It's a fundamental dimension of every problem.

## Model

**Cyclical vs. Linear Time** — the world is more cyclical than we admit. Markets cycle through expansion and contraction. Technologies cycle through hype → disillusionment → enlightenment → plateau. Linear extrapolation of cyclical data guarantees you'll miss the turn. Same signal, different meaning depending on cycle position: flat metrics during a boom = failure; flat during a crash = victory.

**Phase-Dependent Meaning** — data is context-dependent. User engagement up 20% in month 1 = traction. Up 20% in month 12 = saturation or cannibalization. Down 10% in month 1 = worry. Down 10% in month 12 = expected churn. The number is the same; the meaning is temporal.

**Pace Layering** (Stewart Brand) — different parts of every system change at different speeds:
- *Slow layers* (years/decades): business model, values, core architecture, fundamental principles
- *Medium layers* (months/years): features, product strategy, brand positioning, team structure
- *Fast layers* (weeks): UI, content, bug fixes, tactical adjustments

Confusing layers causes structural damage. Changing the foundation to solve a surface problem destabilizes everything. Ignoring the foundation and tweaking the surface forever creates architectural and cultural debt.

**Leading vs. Lagging Indicators:**
- *Leading* (predict): booking rate predicts revenue; signup velocity predicts DAU growth; developer sentiment predicts platform adoption
- *Lagging* (confirm): revenue confirms bookings; DAU confirms signups

Lagging indicators feel more objective but are useless for decision-making — by the time you see them, it's too late to change course. Build decisions on leading indicators; use lagging to calibrate.

**Stocks and Flows** (Forrester) — stocks accumulate over time (reserves, reputation, trust, technical debt); flows change stocks (acquisition, churn, burn rate). Delays disconnect cause from effect: a culture change takes 6 months to show in retention. Feedback loops amplify or dampen: better product → more users → better unit economics → better product.

**Hysteresis** — history creates the present. Two systems at the same state behave differently because of different paths to get there. A team that hypergrew operates differently than one that grew steadily — same size now, completely different dynamics. You can't predict behavior from state alone; you need history.

## Apply

**Cycle Map** — for any system:
1. What cycles exist? (Markets, products, user behavior, technology adoption, seasons)
2. How long is each cycle?
3. Where are we now? (Early, mid, late, turning?)
4. What typically happens next based on the pattern?
5. What breaks if you treat this as linear when it's cyclical?

**Pace Layer Audit** — for any product or org:
1. Identify layers: what changes fast / medium / slow in your context?
2. For each layer: how often does it actually change? How often should it?
3. Look for mismatches — fast layers changing slowly = opportunity cost; slow layers changing fast = structural risk.
4. Protect the slow layers; let the surface move.

**Temporal Signal Analysis** — for any metric or data point:
1. Snapshot or trend? (One point vs. multiple points forming a line)
2. Cycle or trajectory? (Oscillating vs. directional over time)
3. Leading or lagging? (Predicts vs. confirms)
4. What's the right time horizon for this signal?

**"Same Data, Different Time" Test** — before any decision:
- Would this data mean the same thing 6 months ago? 6 months from now?
- If not, you need temporal context. Adjust the decision accordingly.

## Anti-Patterns

**Snapshot thinking** — making decisions based on current state without trajectory. "We're growing 10% monthly, so we'll hire 10% more next month" — ignoring that you might hit maturity in Q3.

**Linear extrapolation of cyclical data** — "stocks up 3 months in a row, so they'll be up next month." Cycles turn.

**Ignoring pace layers** — redesigning architecture to fix a UI lag. Solved the surface symptom; created new problems in the foundation.

**Recency bias** — overweighting recent data and ignoring historical patterns. One anomalous week ≠ new normal.

**Confusing stocks and flows** — "revenue is down 20% this month" = flow signal. Your revenue base (stock) might still be healthy. Different problem, different intervention.

**Treating leading indicators as lagging** — using DAU as primary decision metric when booking velocity is more predictive.

**Ignoring system delays** — expecting changes to show up immediately. Culture changes take months. Marketing changes take weeks. Measure at the right time horizon.

## Connections

- **Adjacent Possible** — the adjacent possible changes over time; pace layers determine when new possibilities emerge
- **Evolutionary Design** — landscapes shift at different speeds; know whether you're in a stable phase or punctuated equilibrium
- **Network Dynamics** — networks have phases (cold start, critical mass, scale, maturity, decline); strategy must match phase
- **Information Entropy** — entropy accumulates over time; maintenance is a temporal problem
- **Economic Model Design** — business models have different convexity to different kinds of temporal change
