---
name: Constraint Propagation
description: "Trace how a single design decision ripples through an entire system. Trigger on: any proposal to change something — 'should we add...', 'what if we change...', 'let's switch to...', trade-off evaluation, architecture decisions, policy changes."
---

# Constraint Propagation

Constraints are generative, not purely limiting. When Square decided card readers must fit in a shirt pocket, that constraint forced the headphone jack design, required frictionless registration, necessitated cloud reconciliation, and enabled the business model. One constraint pulled every other thread taut.

The creative technologist traces propagation paths BEFORE committing, not after discovering consequences.

## Model

**First-Order Effects** — direct, immediate consequences of the constraint.

**Second-Order Effects** — consequences of the consequences. Usually where the real cost or opportunity lives.

**Third-Order Effects** — how second-order changes reshape identity, market position, or user behavior.

**Reversibility** — which effects are baked in vs. changeable later? Architecture decisions and user expectations are often irreversible. UI elements are not.

**Constraints as Features** — GDPR compliance forces privacy architecture, which becomes a marketing advantage. The discipline: find the generative power in constraints you inherit.

## Apply

**Five-Part Propagation Analysis** — for any proposed change:

1. **Name the constraint explicitly** — "users never log in" (auth constraint), "audio processed on-device" (location constraint), "$39 one-time" (pricing constraint). Vague constraints won't propagate clearly.

2. **First-order effects** — what breaks, what becomes possible, what needs redesign immediately? Be specific per domain: UX, infrastructure, legal, cost.

3. **Second-order effects** — what problems or opportunities emerge FROM the first-order effects? This is usually where the real consequence lives.

4. **Third-order effects** — how do second-order changes reshape the system's identity, competitive position, or user behavior?

5. **Reversibility analysis** — for each propagated effect: reversible (feature flags, UI, some positioning) or irreversible (architecture, user expectations, market narrative, network effects)? Irreversible decisions warrant more scrutiny.

**The Pull One Thread Test** — shortcut for quick evaluation:
1. State the constraint.
2. Pull one thread: "what breaks first?"
3. Follow that thread: "what does that force?"
4. Ask: "Are we okay with that outcome?" If no, the constraint is wrong.

**Pattern: New Feature Proposal** — don't evaluate the feature in isolation. Ask: "What constraint does this add?" Walk through first- and second-order effects. Highlight the second-order most likely to surprise.

**Pattern: Architectural Choice** — identify the constraint that technology *enforces* (TypeScript enforces type safety, microservices enforce distributed complexity). List what becomes possible because of that constraint; list what becomes harder.

**Pattern: Policy Change** — state the constraint clearly, run the analysis, surface the highest-impact second-order effect, ask: "Is this the real cost you want to pay?"

## Anti-Patterns

**Evaluating in isolation** — "this feature takes 2 sprints" instead of tracing how the complexity constraint propagates through maintenance burden, testing, security, and onboarding.

**Forgetting reversibility** — treating all decisions as equally undoable. Irreversible decisions deserve more scrutiny up front.

**Assuming independence** — "we'll just add this one thing to the UI." Everything connects.

**Ignoring generative power** — treating every constraint as a burden. Constraints that force good architecture often become competitive advantages.

**Propagation without triage** — listing 15 second-order effects without identifying which one is the deal-breaker. Most effects you can adapt to; one or two determine viability.

## Connections

- **Adjacent Possible** — building X propagates into making Y and Z possible; trace the unlocks
- **Economic Model Design** — pricing model is a constraint that propagates through architecture, features, and team structure
- **First-Principles Reduction** — each deletion in the reduction process propagates; trace before removing
- **Deep Deliberation** — understanding the problem space IS understanding how constraints propagate
- **Coherence Design** — strong product identity propagates as a constraint that tells you what fits
