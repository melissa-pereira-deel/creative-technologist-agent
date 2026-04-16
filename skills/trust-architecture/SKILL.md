---
name: Trust Architecture
description: "Design systems that create, sustain, and communicate trustworthiness. Trigger on: privacy architecture, data handling decisions, scoring systems, recommendation engines, AI outputs, transparency features, 'how do we build trust?', 'will users trust this?', 'how do we communicate uncertainty?', 'what happens when we're wrong?'"
---

# Trust Architecture

Trust is not a feature you add — it's a property that emerges from how the entire system is designed. Easy to destroy, slow to build. Must be deliberate, not accidental.

## Model

**Four Trust Layers** — each can fail independently:

1. *Technical Trust* — does the system work correctly and reliably? (Availability, performance, consistency) — repeated failures erode all other layers

2. *Epistemic Trust* — does the system tell the truth and acknowledge uncertainty? (Accuracy, honesty about limitations, visible methodology) — intentional deception when discovered is catastrophic and slow to recover

3. *Intentional Trust* — are the system's incentives aligned with mine? (No hidden monetization, conflicts of interest visible) — misalignment creates permanent skepticism once recognized

4. *Social Trust* — do people I respect trust this system? (Organization reputation, community consensus, track record) — can override good technical design if the builder is known to be untrustworthy

**Trust Signals vs. Trust Theater:**
- *Theater*: padlock icon on insecure connection; "secure" badge with opaque verification process; privacy policy in unreadable legalese
- *Signals*: on-device processing (genuinely keeps data local); visible confidence intervals; edit history you can audit; published methodology that can be challenged; documentation demonstrating deep competence

**Test**: can a skeptical user verify the claim? If verification requires trusting the company to tell the truth, it's theater.

**Incentive Alignment** — design so that cheating costs more than honesty. Bitcoin: attacking the chain costs more in electricity than cooperating earns. eBay: negative review destroys future sales. The architecture makes dishonesty structurally irrational.

**Trust Recovery Hierarchy:**
- Fastest: technical failures (outage, bug) → "we fixed it" → restored
- Slower: accidental epistemic failures → "we found it, here's what changed" → partially restored
- Very slow: intentional deception, hidden incentive misalignment, foundational false claims

## Apply

**Trust Audit** — for any product, evaluate each layer:

| Layer | Question | Risk if Failed |
|---|---|---|
| Technical | Reliable and consistent? | Single failures erode everything |
| Epistemic | Transparent about uncertainty and limitations? | Discovered deception = catastrophic |
| Intentional | Incentives aligned with user? | Permanent skepticism |
| Social | Reputation credible? | Cascades to all other layers |

**"Why Should I Believe You?" Test** — for any claim the product makes:
- What evidence does the user have that this is true?
- Can they verify it themselves?
- If the answer is "they just have to trust us" — that's a trust gap. Close it.

**Trust Communication Checklist** — does the product communicate:
- [ ] What it does with data? (Collection, storage, use)
- [ ] What it doesn't know? (Gaps, limitations)
- [ ] When it's uncertain? (Confidence levels, not just point estimates)
- [ ] What its failure modes are?
- [ ] How to verify its claims? (Methodology, external validation)
- [ ] Who built it and why? (Team, incentive structure)

**Observer Effect** — be radically transparent about what you observe, why, and how:
- What you observe
- Why you observe it
- Who sees it
- How you use it
- What you don't observe

Users tolerate observation far better when it's transparent and their incentives align with why it's happening.

**Incentive Alignment Map** — draw:
1. What each stakeholder wants
2. How the system rewards them
3. Where incentives conflict
4. What happens if conflicts persist
Then redesign to eliminate conflicts or make them visible.

**Recovery Checklist** — when trust is violated:
1. Acknowledge: name the failure, don't minimize
2. Explain: what happened and why; own it
3. Remediate: what fixes this specific instance
4. Prevent: what structural changes prevent recurrence
5. Communicate: make the prevention visible to users

## Anti-Patterns

**Trust theater without substance** — security badges on insecure sites; privacy claims without architecture to back them

**Hiding uncertainty to appear competent** — scores without confidence levels; predictions without probability ranges

**Misaligned incentives disguised as aligned** — "free" products that monetize personal data with opaque terms

**Over-promising and under-delivering** — the fastest path to trust destruction

**Dark patterns** — exploiting goodwill for conversion; mechanism design with hidden incentives

**Asymmetric transparency** — company sees everything about users; users see nothing about the company

## Connections

- **Mechanism Design** — well-designed mechanisms build structural trust; the reputation system IS the trust mechanism
- **Game Structure** — positive-sum games build trust; negative-sum games destroy it
- **Economic Model Design** — incentive alignment (or misalignment) is the foundation of intentional trust
- **Performance as Experience** — performance is a trust signal; slow products feel unreliable
- **Coherence Design** — coherent products are more trustworthy; consistency is a prerequisite for trust
