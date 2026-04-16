---
name: Progressive Expertise Design
description: "Design for users in motion between knowledge states, not static at one level. Trigger on: onboarding design, 'this is too complex for beginners', 'experts find this too simple', feature discovery, progressive disclosure, learning paths, expertise-level interface design."
---

# Progressive Expertise Design

Most products treat users as static: "the beginner" or "the expert." Reality is different. Your user was confused yesterday, understands today, and will be bored by the same explanation tomorrow. Design for motion, not position.

## Model

**The Expertise Gradient** — users exist on a continuous spectrum, not in discrete buckets. Expertise is not monolithic — someone can be advanced in one domain and novice in another simultaneously. Don't design "beginner mode" and "expert mode"; design a continuous gradient.

**Progressive Disclosure** — show complexity only when the user is ready. Strip the interface to essentials first. Reveal advanced capabilities on demand. But disclosure is the surface; the deeper principle is that the product adapts to the user's changing readiness.

**Scaffolding and Fading** (Vygotsky) — scaffolding is temporary structure helping users accomplish slightly more than they could alone. Training wheels. Tooltips that explain once, then disappear. The key: scaffolding MUST fade. If it never disappears, it becomes a permanent crutch that slows advancing users.

**Adjacent Possible of Knowledge** — users can only learn what's adjacent to what they already know. Design the learning path through conceptual dependencies, not difficulty ratings.

**Transferable Mental Models** — the best products teach models that transfer beyond the product itself. Teaching "what the Piotroski F-Score is" creates lasting value; teaching "which button to click" does not.

**Expertise Reversal Effect** — what scaffolds a beginner frustrates an expert. Detailed explanations slow experienced users. The product must detect (or allow users to signal) their level and adapt.

**Constructionism** (Papert) — people learn best by building, not reading. Create opportunities for users to construct understanding through exploration, not passive consumption.

## Apply

**Expertise Journey Map** — for each core concept:
1. Novice state: minimal viable explanation; what can be deferred?
2. Intermediate state: what gaps exist? What patterns should emerge?
3. Expert state: what mastery looks like; what customization do experts use?
4. Transition signals: what behavior indicates readiness to advance?

**"First Aha" Design:**
- Identify the single most important conceptual breakthrough your user needs
- Everything in early onboarding should accelerate toward that moment
- Define it in one sentence. Does your onboarding reach it in the first 5 minutes?

**Scaffolding Inventory** — list every support structure (tooltips, guided flows, defaults, templates, example data):
- When should it appear?
- When should it fade?
- What behavior signals the user has outgrown it?
- What happens after it fades?
Remove structures that never fade — they become cognitive debris.

**"Teach the Model" Test:**
- ❌ "Click the Screener button to filter stocks" (product-specific fact)
- ✓ "Screeners apply logical conditions to partition a dataset" (transferable model)
Prefer the model. When you must teach facts, embed them in models.

**Escape Routes** — always provide advanced users a way past scaffolding:
- Skip tutorials on first run
- Keyboard shortcuts alongside visual guidance
- Toggles for detailed explanations
- Workspace customization for power users

**Complexity Budget** — novice: ~5 concepts simultaneously. Intermediate: ~12. Experts prefer maximum density. Map feature discovery to cognitive load. If at budget, something must hide or fade.

## Anti-Patterns

**The Wizard Hat Problem** — binary "beginner/expert" toggle instead of a gradient; creates jarring transitions and forces premature self-classification.

**Permanent Training Wheels** — scaffolding that never fades; creates dependency instead of advancement.

**Documentation as Design Substitute** — if users need to read a manual, progressive disclosure failed; the interface should teach.

**The Expertise Cliff** — easy to start but no depth (bores experts) OR deep but impossible to start (excludes novices).

**Uniform Expertise Assumption** — treating users as either "beginner at everything" or "expert at everything."

**Premature Complexity** — showing advanced features to novices "in case they need them"; cognitive load without benefit.

## Connections

- **Tools for Thought** — progressive expertise is a precondition for amplification; users must build understanding to use a tool as amplification
- **Signal Discrimination** — what's signal for an expert is noise for a beginner; calibrate per expertise level
- **Legibility Design** — different resolutions serve different expertise levels; study-level for beginners, analysis-level for experts
- **Adjacent Possible** — knowledge accumulates through adjacency; design learning paths through conceptual dependencies
- **Coherence Design** — the product should feel coherent at each expertise level, not just for one level
