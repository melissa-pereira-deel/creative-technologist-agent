---
name: Analogical Reasoning
description: "Solve problems by finding structural parallels in other domains. Trigger on: 'I'm stuck on...', 'is there a better way?', architecture decisions, brainstorming, or any problem where the answer may exist in an adjacent domain."
---

# Analogical Reasoning

The key is structure-first, not surface-first. Shazam wasn't invented by thinking about "music identification" — it was invented by thinking about "stable-yet-unique fingerprinting under noisy conditions" and finding that biometric fingerprinting had already solved it. Same structure, different domain.

## Model

**Surface-First (wrong):** "My problem is music identification. What else identifies things?"

**Structure-First (right):** "My problem requires a stable fingerprint across variations (volume, quality) that's unique among millions. What other domains need stable-yet-unique identifiers under noise?"

**Examples:**
- *Square Reader* — problem structure: convert analog signal to digital reliably on a phone. Solution: audio ADC already does this. The headphone jack became a card reader.
- *PageRank* — problem structure: measure authority in a citation network. Solution: academic citation analysis already solved this.
- *Wii controllers* — problem structure: make gaming accessible to non-gamers. Solution: don't abstract motion; make the controller BE a tennis racket.

**Inversion** — instead of "what is my problem like?", ask "what problem is my solution like?" Easier to recognize a solution than a structure.

## Apply

**Map the Constraint Structure** (5 min):
- What are the 3 core constraints?
- What are you optimizing for? (identification, ranking, prediction, compression, routing)
- What can't change? (hardware, user behavior, regulations, costs)
- Write it in one sentence.

**Domain Inventory Search** (10 min) — for each domain, ask "how does this solve my structure?":
- Biology (immune systems, evolution, swarm behavior)
- Manufacturing (assembly lines, quality control, inventory)
- Economics (markets, pricing, incentives)
- Sports (strategy, role specialization, positioning)
- Urban planning (traffic flow, resource allocation)
- History (organizational structures, power dynamics)

**Filter for Structural Match** — remove surface-only analogies. Keep only those where constraints are genuinely parallel. You should have 2–4.

**Extract, Don't Copy** — bad: "Netflix recommends shows, so we should use Netflix's algorithm." Good: "Netflix separates candidate generation from ranking, optimizes for implicit signals, not explicit ratings — can these principles apply here?"

**Three-Step Transfer:**
1. Identify the principle (why does the source solution work?)
2. Translate to your constraints (what's equivalent in your domain?)
3. Test independently (analogy is inspiration, not proof)

**Analogy Validation:**
- Are the core constraints actually parallel, or just superficially similar?
- Where does the analogy break? (Every analogy breaks somewhere — find it before it breaks you)
- Is this generative (suggests new ideas) or descriptive (just restates what you know)?

## Anti-Patterns

**Surface analogies** — "we're like Uber for X" without structural mapping. Borrows branding, not insight.

**Untested transfer** — shipping the imported solution without domain-specific validation.

**Descriptive analogies** — using an analogy to confirm what you already knew instead of generating new options.

**Ignoring where it breaks** — every analogy has a failure boundary; finding it early is the discipline.

## Connections

- **First-Principles Reduction** — analogical reasoning and first-principles are complementary: strip to structure (first principles), then search for that structure elsewhere (analogy)
- **Evolutionary Design** — analogies are a source of high-quality variation before selection
- **Deep Deliberation** — the background mind is better at analogical search than the waking mind; load the problem, step away
- **Adjacent Possible** — cross-domain analogies often reveal new adjacent possibilities invisible from inside one domain
