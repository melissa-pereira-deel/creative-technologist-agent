# Creative Technologist Agent

Most AI agents are excellent at execution. Write this. Fix that. Refactor the other.

None of them sit with you in the moments that actually determine whether software is good — the ones before the code is written, and the ones after it ships.

*Should we build this? Is this the right way to represent it? What are we trading away that we haven't named? Why does this feel off even though it works?*

There's a rare kind of person who asks these questions fluently: someone with enough technical depth to understand what's truly possible, enough intuition about human behavior to know what people will actually do, and enough craft to feel the difference between something that works and something that's *right*. They look at a headphone jack and see a card reader. At a rubber-band scroll and see a pull-to-refresh. At a factory QR code and see a payment protocol.

They're called creative technologists. Most teams don't have one.

This is an AI agent built around how they think — 19 ways of seeing problems, packaged for [Claude Code](https://docs.anthropic.com/claude-code). Before you build. After you ship. Same lens, both directions.

---

> **⚠️ Status: Experimental**
>
> This is a working experiment, not a finished product. The agent and its 19 skills are actively tested, refined, and reshaped through real use. Expect things to evolve — skills will be sharpened, renamed, merged, or split as we learn what actually works in practice.
>
> If you use it: try it, break it, tell us what happened. Issues, pull requests, and field reports ("I used skill X for Y and it produced Z") are the fuel this project runs on.

---

## Two modes, one lens

The agent operates in two modes — and the continuity between them is the point.

**Design mode** — before you build. You have a brief, a problem, an idea, a decision to make. The agent frames what's actually at stake, surfaces the tradeoffs you haven't named yet, and hands a clear recommendation to the people who will make it real.

**Critique mode** — after you ship. You have a feature, a dashboard, an architecture, a flow. The agent audits it against the same principles it would have used to design it. Findings ranked by severity. Concrete fixes. Same lens as the design conversation you had three months ago.

There's also a **branch-point mode** for mid-work gut checks: *A or B? Under 150 words. Go.*

---

## Who it works with

This agent doesn't work alone. It sits at the center of a strategic thinking cluster — with empirical peers it can pull from when needed, and craft-level roles it hands framing to.

```
UX/UI Researcher  ←→  Creative Technologist  ←→  Data Analyst
                              ↓
          Product Manager  ←  CT  →  Software Architect
                         ↓   ↓   ↓
                    Product UI/UX Designer
                              ↓
                      implementation agents
```

**Upstream** — when a skill calls for grounding, the agent requests targeted input (not "tell me everything about users," but "Signal Discrimination needs to know what's actually correlated with retention"):
- **UX/UI Researcher** — user interviews, usability findings, journey observations
- **Data Analyst** — metrics, cohorts, funnels, performance signatures

**Downstream** — the agent shapes thinking, then hands it to the people whose craft turns thinking into artifacts:
- **Product Manager** — product, feature, and business framing
- **Software Architect** — system, data, and architectural framing
- **Product UI/UX Designer** — experience, interface, and interaction framing

The agent is **tool-poor by design.** It doesn't query databases, run studies, or write code. Staying tool-poor protects its stance — a thinking partner that reaches for data directly stops being a thinking partner and becomes a dashboard.

---

## The 19 skills

The skills are 19 ways of seeing problems that most people solve by instinct alone — named, defined, and made available to apply deliberately. Each one has a core question, a model, actionable checklists, named failure modes, and connections to the others. They're tuned for agent use: dense, no fluff.

The power isn't in any single skill. It's in what they become when used together.

| Skill | Core question |
|---|---|
| [Adjacent Possible](skills/adjacent-possible/SKILL.md) | What becomes possible *next* given what exists now? |
| [Analogical Reasoning](skills/analogical-reasoning/SKILL.md) | What does this problem *structurally resemble* in another domain? |
| [Coherence Design](skills/coherence-design/SKILL.md) | Do the parts feel like they belong together? |
| [Constraint Propagation](skills/constraint-propagation/SKILL.md) | How does one decision ripple through every other? |
| [Deep Deliberation](skills/deep-deliberation/SKILL.md) | Have I thought long enough before acting? |
| [Economic Model Design](skills/economic-model-design/SKILL.md) | Where does the money flow and whose incentives does it shape? |
| [Evolutionary Design](skills/evolutionary-design/SKILL.md) | What's the fitness landscape and how will this design adapt? |
| [First-Principles Reduction](skills/first-principles-reduction/SKILL.md) | What's essential vs. accidental in this system? |
| [Game Structure](skills/game-structure/SKILL.md) | Is this a positive-sum or zero-sum game and for whom? |
| [Information Entropy](skills/information-entropy/SKILL.md) | Where is entropy accumulating and where must it be managed? |
| [Legibility Design](skills/legibility-design/SKILL.md) | Is the right information visible at the right resolution? |
| [Mechanism Design](skills/mechanism-design/SKILL.md) | Does the structure of the rules produce the behavior we want? |
| [Network Dynamics](skills/network-dynamics/SKILL.md) | What phase is this network in and what does it need to advance? |
| [Performance as Experience](skills/performance-as-experience/SKILL.md) | Which perceptual thresholds does speed let us cross? |
| [Progressive Expertise](skills/progressive-expertise/SKILL.md) | Does the product grow with the user's understanding? |
| [Signal Discrimination](skills/signal-discrimination/SKILL.md) | What's signal, what's noise, and how do I tell? |
| [Temporal Reasoning](skills/temporal-reasoning/SKILL.md) | Where are we in the cycle and which layer is changing? |
| [Tools for Thought](skills/tools-for-thought/SKILL.md) | Does this automate a task or amplify understanding? |
| [Trust Architecture](skills/trust-architecture/SKILL.md) | Can a skeptical user verify the claim or must they trust us? |

---

## Install

```bash
git clone https://github.com/melissa-pereira-deel/creative-technologist-agent.git
cd creative-technologist-agent

cp creative-technologist.md ~/.claude/agents/
cp -r skills ~/.claude/skills/creative-technologist-skills
```

Symlink if you want updates to flow automatically:

```bash
ln -s "$(pwd)/creative-technologist.md" ~/.claude/agents/creative-technologist.md
ln -s "$(pwd)/skills" ~/.claude/skills/creative-technologist-skills
```

Restart your Claude Code session. The agent is invokable.

---

## See it in action

**Design mode**

```
Use the creative-technologist agent. We're designing a dashboard for
long-term investors. What should we show, and how?
```

The agent frames the real question (not "what charts?" but "what decision are we supporting?"), selects 2–4 relevant skills, runs their checklists, and returns approaches with tradeoffs, a recommendation, and open questions to resolve before building.

**Critique mode**

```
Use the creative-technologist agent to review src/views/Dashboard.tsx.
Does it do what we decided?
```

The agent reads the artifact, returns findings ranked by severity (foundational / structural / surface), each with the skill lens that surfaced it, a file:line reference, and a concrete fix.

**Branch-point mode**

```
Creative-technologist, quick gut check: A or B for the empty state?
```

Under 150 words. The single lens that discriminates A from B. A recommendation. A reversibility note.

---

## The method

Every response follows the same five steps:

```
Frame → Select → Ground (if needed) → Apply → Synthesize
```

1. **Frame** — name the real problem, not the surface request.
2. **Select** — pick 2–4 skills. More than 4 usually means the framing isn't tight enough.
3. **Ground** — *optional.* If stakes are high and the selected skills need empirical data, request it from UX Researcher or Data Analyst. Skip for gut checks and exploratory work.
4. **Apply** — run the selected skills' checklists out loud, briefly.
5. **Synthesize** — one recommendation (design) or ranked findings with fixes (critique).

Most problems activate 2–4 skills together. Common bundles:

| Problem type | Typical skills |
|---|---|
| Dashboard / data product | Legibility · Signal Discrimination · Tools for Thought · Progressive Expertise |
| New feature framing | First-Principles Reduction · Adjacent Possible · Economic Model Design |
| System architecture | Constraint Propagation · Coherence Design · Temporal Reasoning · Evolutionary Design |
| Marketplace / social | Mechanism Design · Game Structure · Network Dynamics · Trust Architecture |
| AI / recommendation | Trust Architecture · Signal Discrimination · Tools for Thought · Deep Deliberation |
| Pricing / business model | Economic Model Design · Game Structure · Trust Architecture |
| Onboarding | Progressive Expertise · Tools for Thought · Legibility Design |
| Performance audit | Performance as Experience · Signal Discrimination · Information Entropy |

Full tables including critique-mode variants are in [creative-technologist.md](creative-technologist.md).

---

## Philosophy

**19 ways of seeing, not 19 rules to follow.** The goal is fluency, not compliance — to feel when a Performance question is really a Signal question in disguise, or when Trust Architecture and Incentive Alignment are the same problem wearing different names.

**Named thinking beats unnamed instinct.** Experts make good decisions using patterns they can't always articulate. Naming those patterns — "pace layering," "expertise reversal effect," "adjacent possible" — makes them transferable, teachable, and available when the expert isn't in the room.

**Same lens before and after.** The design principle that guided what you built becomes the audit criterion for what you shipped. That continuity is the reason this is one agent instead of two.

**Simple experience, proportional to technical complexity.** When something feels effortless, expect enormous complexity underneath. When it feels complicated, the technical core is probably underdeveloped.

**Grounding sharpens thinking; it doesn't replace it.** When data and the skills disagree, the agent doesn't automatically defer to data. It names the conflict, uses the skills to diagnose it, and articulates why it's overriding (or accepting) what the numbers say.

---

## Contributing

This project grows by adding ways of seeing, sharpening the ones that exist, and learning from how they perform in practice.

### What belongs here

- **New skills** — ways of seeing that aren't yet named. Must apply across domains (not "React patterns" or "SQL optimization" — those belong in other agents). Must be composable with the existing 19.
- **Improvements to existing skills** — tighter language, corrected mistakes, checklist items from real use.
- **New composition bundles** — problem types with their natural skill groupings.
- **Field reports** — anonymized examples of the agent in action, especially non-obvious skill combinations that produced something useful.
- **Translations** — parallel-language versions of any skill file.

### What doesn't belong

- Domain-specific skills. Principle-level thinking is domain-agnostic; if it only applies to one stack or industry, it's not ready yet.
- Skills that overlap heavily with existing ones. If your proposed skill is ~40% another skill with different framing, sharpen the existing one instead.
- Bloated Apply checklists. Density is a feature — agent tokens are finite.

### Adding a new skill

1. Read [skills/signal-discrimination/SKILL.md](skills/signal-discrimination/SKILL.md) — the canonical template.
2. Create `skills/<skill-name>/SKILL.md` with: frontmatter (`name`, `description` with `Trigger on:` phrase list), 2-sentence opening, `## Model`, `## Apply`, `## Anti-Patterns`, `## Connections`. Under ~100 lines total.
3. Check your triggers against the existing 19 for overlap.
4. Add your skill to the table above and at least one composition bundle in [creative-technologist.md](creative-technologist.md).
5. Open a pull request. Make the case: *what this names that wasn't nameable before*, and one example of the Apply checklist in use.

### Style rules

- Density over length. If removing a sentence loses nothing, remove it.
- Named concepts over descriptions. "Nelson's Trap" beats "the pattern where adding a feature reduces usability."
- No product-specific examples. No motivational closers.
- Apply checklists are the highest-value section. Keep them actionable and specific.

---

## Shoulders of giants

- **Christopher Alexander** — *A Pattern Language* (1977). Named, composable design solutions. The structural inspiration for this entire project.
- **Doug Engelbart** — *Augmenting Human Intellect* (1962). Tools that make users smarter, not just faster.
- **Muriel Cooper** — Information Landscapes (MIT, 1994). Information has geography.
- **Stafford Beer** — Cybersyn and the Viable System Model (1971–1973). Variety reduction as design.
- **Rich Hickey** — *Hammock Driven Development* (2010) and *Simple Made Easy* (2011). Slow thinking as a superpower.
- **Stewart Brand** — *How Buildings Learn* (1994). Pace layering.
- **Donella Meadows** — *Thinking in Systems* (2008). Stocks, flows, leverage points.
- **Steven Johnson** — *Where Good Ideas Come From* (2010). The adjacent possible.
- **Neri Oxman** — Material Ecology and the Krebs Cycle of Creativity. Antidisciplinary as a method.

---

## License

MIT. See [LICENSE](LICENSE).

---

Created by Melissa de Britto. Open-sourced because ideas compound when shared.

If this agent helps you think more clearly — or if a skill needs sharpening — open an issue or a pull request. That's how a living vocabulary grows.
