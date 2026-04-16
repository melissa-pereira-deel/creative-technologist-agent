---
name: Economic Model Design
description: "Treat business model and pricing as design inputs that shape everything downstream. Trigger on: 'how should we price this?', 'what's the business model?', 'subscription vs one-time?', 'should we offer a free tier?', 'can we afford to...?', unit economics, go-to-market, competitive positioning, or any decision where how the product makes money affects what it can be."
---

# Economic Model Design

Most people think backwards: "We built X, now how do we make money?" The creative technologist inverts: "How do we make money? Now let's build X." The pricing model propagates through architecture, features, UX, and team structure. Change the model and every downstream decision changes.

## Model

**Constraint Propagation by Model Type:**

*Subscription* → needs feature cadence, retention analytics, habit formation, growth team; architecture requires server-side statefulness and behavioral logging

*One-Time Purchase* → no churn problem, can optimize for usefulness not addiction, small team, on-device is viable, no ongoing server costs

*Transaction Fee* → developer experience is core, API-first architecture, SDK libraries; incentives align with merchant success (Stripe model)

*Free with Ads* → engagement > value delivered, behavioral analytics, infinite scroll, notifications; incentives structurally misalign with user wellbeing

**Incentive Alignment Test** — does the business model reward the same behaviors the user values? Stripe charges per transaction → wants merchants to succeed → obsesses over developer experience. Ad-supported social → wants your attention → optimizes for doomscrolling. Misaligned incentives eventually betray the user; the user feels it; trust disappears.

**Unit Economics as Constraint** — high marginal cost per user (GPU inference, human review) forces per-user or per-usage pricing. Near-zero marginal cost (static files, client-side compute) enables freemium. Know the cost cliff: where does your infrastructure cost jump by 10x as you scale from 1K → 10K → 100K users?

**Convexity Test** — does your model benefit from uncertainty, or break under it?
- Convex (antifragile): on-device processing benefits from privacy regulation; open source benefits from enterprise adoption
- Concave (fragile): ad-dependent breaks under ad-blocker adoption; venture-dependent breaks under funding drought

**Pricing as Positioning** — $39 one-time signals "quality tool, developer confident you won't need support." $9/month signals "casual use, competitive market." $999/month signals "enterprise, dedicated support." The price IS the brand.

## Apply

**Incentive Map** — for your business model:
1. What behavior does it reward?
2. What behavior does it punish?
3. Does it reward the same behaviors the user values?
4. Where is the misalignment?

**Propagation Chain** — trace the constraint cascade:
```
Pricing model → Cost structure → Architecture decisions → Feature possibilities → User experience
```
What changes if you flip the pricing model? The entire chain inverts.

**"Who Pays and Why?" Test** — for every revenue stream:
- Who is paying? (User? Advertiser? Investor?)
- What are they paying for?
- Is their incentive aligned with the end user's interest?
If not aligned, you have a timer on user trust.

**Unit Economics Sketch** — map costs at different scales: 100, 1K, 10K, 100K users. Where are the fixed costs? Where do costs scale? Where are the cliffs? Map this before designing architecture.

**Convexity Audit** — list 5 environmental changes that could affect you: regulation, new technology, competition, market shift, user behavior change. For each: does your economic model benefit, stay neutral, or break?

## Anti-Patterns

**"We'll figure out monetization later"** — the model shapes the product. Deciding later means redesigning later.

**Misaligned incentives disguised as user benefit** — "it's free!" often means "you're the product." Acknowledge the trade-off.

**Pricing based on cost, not value** — cost-plus pricing ignores willingness-to-pay and competitive positioning.

**Copying a competitor's model without understanding why** — their model works because of their specific constraints. Inherit their model and you inherit their constraints.

**Optimizing for revenue while ignoring incentive alignment** — revenue is a lagging indicator of incentive alignment. Optimize alignment first.

## Connections

- **Constraint Propagation** — pricing model is one of the highest-leverage constraints in the system
- **Game Structure** — business model determines whether your game with users is positive-sum or extractive
- **Trust Architecture** — misaligned incentives corrode trust; aligned incentives build structural trustworthiness
- **Network Dynamics** — platform pricing requires subsidizing the scarce side; who pays is not who benefits
- **Adjacent Possible** — business model constrains (and enables) what features are adjacent
