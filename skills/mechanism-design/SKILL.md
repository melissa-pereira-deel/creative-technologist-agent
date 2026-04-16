---
name: Mechanism Design
description: "Design rules so that self-interested participants produce collectively desirable outcomes — game theory in reverse. Trigger on: 'how do we incentivize...', 'users are gaming the system', 'metrics look good but product isn't improving', pricing tiers, reputation systems, marketplaces, moderation rules, free-rider problems, token economics."
---

# Mechanism Design

Game theory asks: "Given these rules, how will rational agents behave?" Mechanism design inverts it: "Given the behavior I want, what rules produce it?" Nobel Prize 2007 (Hurwicz, Maskin, Myerson). Used to design Bitcoin, eBay's reputation system, Vickrey auctions, and most successful marketplace pricing.

## Model

**Incentive Compatibility** — a mechanism is incentive-compatible when participants' best strategy IS the behavior you want. Not because you force them, but because the rules make it their most rational choice. Bitcoin: miners' best strategy is honest validation because attacking the chain costs more than cooperating earns. You don't need enforcement; you've aligned incentives.

**Revelation Principle** — if you design incentives right, people will reveal their true preferences without being forced. Pricing tiers: users self-select into tiers that match their true valuation. A/B testing: behavior reveals preferences more honestly than surveys.

**Individual Rationality** — participation must be voluntary and beneficial. If agents can opt out, your mechanism must make participation more attractive than non-participation. Violate this and the mechanism collapses.

**Budget Balance** — the mechanism shouldn't require infinite external subsidies. If it does, know exactly how much, for how long, and when equilibrium is reached.

**Goodhart's Law** — "when a measure becomes a target, it ceases to be a good measure." Once users know how they're being measured, they optimize for measurement, not the underlying goal. The mechanism must be robust to optimization.

## Apply

**Incentive Audit** — for any system with multiple participants:
1. Who are the agents?
2. What does each want? (Their actual utility function: money, status, time, impact, ease)
3. What behavior do you want from each agent? (Be specific)
4. Does the current mechanism make desired behavior each agent's best strategy?
5. Where are the misalignments?

**Misalignment Detector — Three Failure Modes:**

*Metric Gaming* — reward lines of code → verbose code; close tickets → tickets closed without solving; optimize engagement → infinite scroll. Fix: measure the actual goal, or make gaming the metric unprofitable.

*Adverse Selection* — your mechanism attracts the wrong participants (insurance priced for average risk drives out low-risk buyers). Fix: screening or self-selection tiers that filter for the right participants.

*Moral Hazard* — mechanism reduces consequences for bad behavior (always refund buyers → sellers reduce quality effort). Fix: align consequences with the agent who controls the outcome.

**Mechanism Design Canvas:**
1. Define the desired outcome (specific, not "increase engagement")
2. Identify agents and their self-interest (rational, not altruistic)
3. Design rules so self-interested behavior produces desired outcome — use rewards more than punishments; punishment creates evasion, reward creates alignment
4. Stress-test for exploitation — what's the cheapest exploit? Assume adversarial creative users.
5. Iterate — pilot, measure actual behavior, close exploits without destroying core value

**Ethics Check — before deploying:**
- Is every participant better off participating than not? (If no: you're forcing participation through lock-in or information asymmetry)
- Does any participant lose without realizing it? (If yes: manipulation, not mechanism design)
- Would participants still want to engage if they fully understood how the mechanism works?
- Does the mechanism still function when participants become sophisticated? (Fragile mechanisms break when users learn the rules)

**Pricing Tiers as Mechanism** — self-selection reveals true valuation without asking. The free tier must be useful enough to demonstrate value, limited enough that high-value users self-select up. The limit should feel natural (Dropbox: ran out of space), not punitive (Figma: watermark on exports).

## Anti-Patterns

**Designing for altruistic users** — participants are rational and self-interested. Design for that reality.

**Punishing instead of rewarding** — punishment creates evasion and resentment; reward creates alignment.

**Optimizing a single metric without considering gaming** — always measure multiple dimensions or the actual outcome.

**Assuming users won't find exploits** — they always will. Beta test with adversarial users.

**Conflating mechanism design with manipulation** — the ethical line is transparency. Mechanism design: participants understand the rules. Manipulation: rules are hidden.

**Ignoring launch order for two-sided marketplaces** — chicken-and-egg. Identify the scarce side and heavily incentivize it first.

## Connections

- **Trust Architecture** — well-designed mechanisms build structural trust; reputation systems ARE the trust mechanism
- **Game Structure** — mechanism design implements the desired game type; want positive-sum? Design so everyone wins by cooperating
- **Network Dynamics** — mechanisms must adapt as networks grow; what works at 100 users fails at 100K
- **Evolutionary Design** — users evolve strategies in response to mechanisms; plan for iteration
- **Economic Model Design** — pricing mechanism is incentive alignment applied to revenue
