# Creative Technologist Agent

**A pattern language for thinking like a creative technologist — packaged as a Claude agent with 19 composable mental models.**

> *A creative technologist sees affordances where others see limitations. A headphone jack becomes a card reader. A rubber-band scroll becomes a refresh trigger. A QR code becomes a payment protocol.*

---

> ### ⚠️ Status: Experimental
>
> This is a **working experiment**, not a finished product. The agent and the 19 skills are being actively tested, refined, and reshaped through real use. Expect the pattern language to evolve — skills will be sharpened, renamed, merged, or split as we learn what actually works in practice.
>
> If you use it: try it, break it, and tell us what happened. Issues, pull requests, and field reports ("I used skill X for Y and it produced Z") are the fuel this project runs on. What's here today is the current best version of an ongoing inquiry, not a final answer.

---

## What this is

Nineteen carefully-tuned mental models (the `skills/` directory), plus an agent that knows how to compose them. The agent operates in two modes:

- **Design mode** (pre-implementation) — frames ambiguous briefs, surfaces tradeoffs, recommends an approach before code is written.
- **Critique mode** (post-implementation) — audits shipped artifacts against design principles, names what's working and what isn't, prescribes ranked fixes.

Same lens, before and after. The continuity across phases is the whole point: what you decided during design becomes the rubric during critique.

This is not a coding agent. It doesn't write implementations, and it doesn't produce the working artifacts of strategy either — no roadmaps, no wireframes, no system diagrams. It shapes the *thinking* those artifacts encode.

It sits at the **center** of a strategic thinking cluster, not at the top — with empirical peers upstream and craft-level roles downstream:

```
UX/UI Researcher  ←→  Creative Technologist  ←→  Data Analyst
                              ↓
          Product Manager  ←  CT  →  Software Architect
                      ↓    ↓    ↓
                Product UI/UX Designer
                         ↓
                 implementation agents
```

**Upstream peers** (empirical sources the agent pulls from when skills call for it):

- **UX/UI Researcher** — qualitative grounding: user interviews, usability findings, journey observations
- **Data Analyst** — quantitative grounding: metrics, cohorts, funnels, performance signatures, historical patterns

**Downstream roles** (who it hands framing to):

- **Product Manager** — for product, feature, and business framing
- **Software Architect** — for system, data, and architectural framing
- **Product UI/UX Designer** — for experience, interface, and interaction framing

The agent is **tool-poor by design**: it doesn't query databases, run studies, or write code. It requests empirical inputs from peers and interprets what comes back. Role-level agents translate its framing into actionable artifacts; implementation agents (`python-pro`, `swift-expert`, `react-specialist`, etc.) build from those.

---

## Why it exists

Most AI coding agents are tactical — fix this bug, add this feature, refactor this file. They're excellent at execution but silent during the moments that matter most: *what should we build?*, *is this the right representation?*, *what are we implicitly trading away?*

Those moments are where software either gets its soul or loses it. They're also where the costliest mistakes get locked in — the ones you can't refactor your way out of later.

This agent targets those moments specifically. It's built on the premise that the difference between good and great software is rarely tactical. It's the accumulated weight of a hundred small design decisions made with or without a framework for thinking clearly about them.

The 19 skills are that framework.

---

## The 19 skills

Each skill is a pattern in the Christopher Alexander sense: a named (context → problem → solution) trio that can be composed with others. The power isn't in individual patterns — it's in the language they form together.

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

Each skill file follows the same structure: `Model` (named concepts), `Apply` (actionable checklists), `Anti-Patterns` (named failure modes), `Connections` (related skills). They're optimized for agent consumption — dense, named, non-redundant.

---

## How it works

The agent follows a five-step method for every request:

```
Frame → Select → Ground (if needed) → Apply → Synthesize
```

1. **Frame** — name the real problem, not the surface request.
2. **Select** — pick 2–4 skills that fit. More than 4 usually means the framing isn't tight enough.
3. **Ground** — *optional.* If the stakes warrant it and the selected skills call for empirical input, request targeted data from UX/UI Researcher or Data Analyst. Otherwise skip this step and run the skills from principles.
4. **Apply** — run the selected skills' Apply checklists out loud, briefly.
5. **Synthesize** — converge to a single recommendation (design) or a ranked list of findings with fixes (critique).

**When the agent asks for grounding.** Not every response is grounded. The agent decides by stakes and phase:

- **Pure** (no grounding) — branch-point gut checks and early exploratory framing where data doesn't exist or would slow thinking
- **Selective** — routine design and critique: ground the skills that need it (Signal Discrimination, Performance as Experience, Temporal Reasoning, Trust Architecture audit), run others from principles
- **Grounded** — high-stakes critique, post-mortems, major design decisions

The agent is **permitted to override empirical findings** when the skills justify it — but it must articulate why. Data can anchor bad framings as hard as it anchors good ones, and part of the agent's value is resisting purely metric-driven thinking.

Most problems activate 2–4 skills together. The agent ships with composition tables for common problem types:

| Problem type | Typical skills |
|---|---|
| Dashboard / data product | Legibility · Signal Discrimination · Tools for Thought · Progressive Expertise |
| New feature framing | First-Principles Reduction · Adjacent Possible · Economic Model Design |
| System architecture | Constraint Propagation · Coherence Design · Temporal Reasoning · Evolutionary Design |
| Marketplace / social product | Mechanism Design · Game Structure · Network Dynamics · Trust Architecture |
| AI / recommendation feature | Trust Architecture · Signal Discrimination · Tools for Thought · Deep Deliberation |
| Pricing / business model | Economic Model Design · Game Structure · Trust Architecture |
| Onboarding / complex product | Progressive Expertise · Tools for Thought · Legibility Design |
| Performance audit | Performance as Experience · Signal Discrimination · Information Entropy |

Full bundle tables (including critique-mode variants) are in [creative-technologist.md](creative-technologist.md).

---

## Install

The agent runs on [Claude Code](https://docs.anthropic.com/claude-code) (or any system that reads Claude sub-agents from `~/.claude/agents/`).

```bash
# Clone this repository
git clone https://github.com/melissa-pereira-deel/creative-technologist-agent.git
cd creative-technologist-agent

# Copy the agent definition into Claude's agent directory
cp creative-technologist.md ~/.claude/agents/

# Copy the skills so the agent can reference them
cp -r skills ~/.claude/skills/creative-technologist-skills
```

Or symlink if you want updates to flow automatically:

```bash
ln -s "$(pwd)/creative-technologist.md" ~/.claude/agents/creative-technologist.md
ln -s "$(pwd)/skills" ~/.claude/skills/creative-technologist-skills
```

Restart your Claude Code session. The agent is now invokable.

---

## Usage

### Design mode (pre-implementation)

```
> Use the creative-technologist agent. We're designing a portfolio dashboard
  for long-term investors. What should we show, and how?
```

The agent will frame the real problem, pull in the relevant skills (Legibility, Signal Discrimination, Tools for Thought, Progressive Expertise), run their Apply checklists, and return 2–3 viable approaches with tradeoffs, a recommendation, and open questions.

### Critique mode (post-implementation)

```
> Use the creative-technologist agent to review the dashboard at
  src/views/PortfolioDashboard.tsx. Does it do what we decided?
```

The agent switches to critique mode, reads the artifact, and returns findings ranked by severity (foundational / structural / surface), each with a skill lens, a file:line reference, and a concrete fix.

### Branch-point mode (mid-work)

```
> Creative-technologist, quick gut check: A or B for the empty state?
```

Compressed design mode — under 150 words, names the single skill lens that discriminates A from B, gives a recommendation with a reversibility note.

---

## Philosophy

**Skills are a language, not a library.** The goal isn't to collect skills and apply them one at a time. It's to develop fluency in the language — to feel when Trust Architecture is actually about Incentive Alignment, or when a Performance question is really a Signal question in disguise.

**Named patterns compress insight.** "Nelson's Trap," "adjacent possible," "pace layering," "expertise reversal effect." Each name is a compressed paragraph. The agent uses names, not paraphrases.

**The skills are domain-agnostic.** These models apply equally to consumer apps, developer tools, financial software, hardware products, protocols, and marketplaces. If you find yourself writing a domain-specific skill, reconsider — it probably belongs one level deeper.

**Same lens before and after.** A design decision made with a skill is a critique rubric using the same skill. This continuity is what makes one agent better than two.

**Simple experience, proportional to technical complexity.** When the experience feels effortless, expect enormous complexity underneath. When it feels complicated, the technical core is probably underdeveloped.

---

## Contributing

Contributions are welcome. This project grows by adding patterns, sharpening existing ones, and expanding the composition logic.

### What kinds of contributions fit

- **New skills** — additional mental models that belong in the pattern language. Must be domain-agnostic, named, and composable with existing skills.
- **Improvements to existing skills** — tightening language, correcting mistakes, adding Apply checklist items drawn from real use.
- **New composition bundles** — problem types with their typical skill activations.
- **Examples of use** — anonymized transcripts of the agent in action, especially ones where a non-obvious skill bundle produced a useful framing.
- **Translations** — parallel-language versions of skills are welcome.

### What kinds of contributions don't fit

- Domain-specific skills (e.g., "React Hooks Best Practices"). The skills are principle-level. Domain patterns belong in other agents.
- Skills that duplicate existing ones with different framing. If a proposed skill overlaps more than ~40% with an existing one, fold improvements into the existing one instead.
- Expanding the `Apply` checklists past the point of usefulness. The skills are deliberately terse — agent tokens are scarce.

### How to add a new skill

1. Read [skills/signal-discrimination/SKILL.md](skills/signal-discrimination/SKILL.md) — it's the canonical template.
2. Create `skills/<your-skill-name>/SKILL.md` following the same structure: frontmatter (`name`, `description`), opening (2 sentences max), `## Model`, `## Apply`, `## Anti-Patterns`, `## Connections`.
3. The frontmatter `description` must be *specific*: a one-line purpose followed by `Trigger on:` plus a comma-separated list of phrases that should activate the skill.
4. Run your skill's triggers against the existing 19 to check for overlap. If you find significant overlap, propose an edit to the existing skill rather than a new file.
5. Add your skill to the table in this README and to at least one composition bundle in [creative-technologist.md](creative-technologist.md).
6. Open a pull request with a brief rationale: *why this pattern belongs in the language*, *what it names that wasn't nameable before*, and an example of its Apply checklist in use.

### Style guide for skill files

- **Density over length.** If removing a sentence doesn't lose information, remove it.
- **Named concepts over generic descriptions.** Prefer "Nelson's Trap" to "the pattern where adding a feature reduces usability."
- **Apply checklists are the highest-value section.** Keep them actionable, numbered, and specific.
- **No product-specific examples.** The skills must be domain-agnostic.
- **No motivational closers.** Skip "Remember..." and "Key insight..." sections.
- **Under ~100 lines total.** The skills are optimized for agent consumption.

### Contribution workflow

1. Fork this repository.
2. Create a feature branch: `git checkout -b skill/<your-skill-name>` or `improve/<existing-skill-name>`.
3. Make your changes.
4. Open a pull request. Describe what the change adds and why.
5. Expect discussion — the bar for adding a new skill to the language is high, but existing skills improve frequently.

---

## Inspirations

This work stands on the shoulders of thinkers whose ideas shaped the pattern language:

- **Christopher Alexander** — *A Pattern Language* (1977). The original source of "pattern as context-problem-solution." The architectural basis for everything here.
- **Muriel Cooper** — Information Landscapes (MIT, 1994). Information has geography.
- **Stafford Beer** — Cybersyn and the Viable System Model (1971–1973). Variety management as design.
- **Doug Engelbart** — *Augmenting Human Intellect* (1962). Tools that make users smarter, not just faster.
- **Stewart Brand** — *How Buildings Learn* (1994). Pace layering.
- **Rich Hickey** — *Hammock Driven Development* (2010) and *Simple Made Easy* (2011). Slow thinking as a superpower.
- **Donella Meadows** — *Thinking in Systems* (2008). Stocks, flows, leverage points.
- **Steven Johnson** — *Where Good Ideas Come From* (2010). The adjacent possible.
- **Neri Oxman** — Material Ecology and the Krebs Cycle of Creativity. Antidisciplinary as a method.

---

## Project structure

```
.
├── README.md                   — this file
├── creative-technologist.md    — the agent definition
└── skills/                     — 19 mental models
    ├── adjacent-possible/SKILL.md
    ├── analogical-reasoning/SKILL.md
    └── ... (17 more)
```

---

## License

MIT. See [LICENSE](LICENSE).

---

## Credits

Created by Melissa de Britto. Open-sourced in the spirit of pattern languages: ideas that compound when shared.

If this agent helps you think more clearly — or if a skill needs sharpening — open an issue or a pull request. That's how a language grows.
