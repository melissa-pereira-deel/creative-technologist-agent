# Skill Structure Algorithm

A skill is a behavioral modification delivered in the minimum viable format. Every line must earn its place. The agent doesn't need a textbook — it needs changed behavior.

## Principle: Maximize Behavioral Change Per Token

A skill competes for context window space with the user's prompt, conversation history, and other loaded skills. Noise in a skill dilutes signal everywhere else. The question for every paragraph: "If I delete this, does the agent make different decisions?" If no — delete it.

---

## Step 1 — Define the Behavioral Delta

Before writing anything: what specific decisions will the agent make differently with this skill loaded?

- List 3-5 concrete behavioral changes
- If you can't articulate them, the skill doesn't need to exist — the knowledge belongs inside an existing skill or as a reference
- Example: "With this skill loaded, the agent will question requirements before optimizing, identify when automation is premature, and apply a strict five-step sequence to any improvement proposal"

If the delta is weak ("the agent will know more about X"), it's a reference document, not a skill.

## Step 2 — Define the Trigger Boundary

What situations activate this skill? Write the YAML description first — it forces clarity about purpose.

Rules:
- List specific phrases users might say (in quotes)
- List specific situations, symptoms, and problem types
- Be narrow enough to avoid false positives, broad enough to catch real use cases
- Use "Trigger on:" followed by a comma-separated list
- Start with a one-sentence summary of what the skill does

Format:
```yaml
description: "One-sentence summary of what the skill does. Trigger on: 'exact phrase 1', 'exact phrase 2', situation type, symptom, problem type."
```

Test: if two skills trigger on the same situations, they should be one skill or their boundaries need sharpening.

## Step 3 — Write the Opening Hook (2-3 lines)

Not a definition — an insight. Create cognitive tension that makes the rest feel necessary.

Good: `"Possibly the most common error of a smart engineer is to optimize a thing that should not exist." — Elon Musk`

Bad: `"First-Principles Reduction is a five-step methodology for systematically improving systems and processes."`

The hook should reframe how the agent thinks about the domain. A quote, a counterintuitive claim, or a compressed insight that the rest of the skill unpacks.

## Step 4 — Structure the Body

### For thinking-mode skills (mental models, reasoning frameworks):

```
## Model
Core concept stated once, clearly. The "lens" this skill provides.
Not a history lesson — just the reframing.

## Apply
Operational questions, decision frameworks, step-by-step procedures.
This is where behavior changes. Use bullet lists of questions to ask.
Questions are more generative than rules — they work across contexts.

## Anti-Patterns
What wrong looks like. Often more instructive than what right looks like.
One bold term + one-line explanation per anti-pattern.

## Connections
3-7 other skills with one-line explanations of HOW they connect.
Format: **Skill Name** — how the connection works
```

### For knowledge-domain skills (technical foundations):

```
## Concepts
What exists, how it works — just enough to reason about trade-offs.
Not encyclopedic — focused on what informs decisions.

## Decisions
When to use X vs. Y. Stated as decision frameworks.
"Use X when [condition]. Use Y when [opposite condition]. The trade-off is [what you gain vs. lose]."

## Constraints
What each choice enables and prevents.
These are the propagation effects — what changes downstream of this choice.

## Traps
Common misunderstandings that lead to bad decisions.
One bold term + one-line explanation per trap.

## Connections
Which thinking-mode skills this knowledge activates.
Format: **Skill Name** — how this knowledge makes that skill actionable
```

## Step 5 — Apply the Density Test

Read every paragraph. For each:
- "If I delete this, does the agent's behavior change?" → No? Delete it.
- "Is this restating something already said above?" → Yes? Delete it.
- "Is this explaining why the skill is important?" → The skill should demonstrate importance through usefulness, not argue for it. Delete it.
- "Is this a thought experiment?" → Does it teach something the Apply section didn't? If not, delete it. If yes, keep it short.

Specific things to cut:
- History of the concept (unless the history IS the insight)
- Justifications for why the skill exists
- Long-form examples that repeat what the Apply section already says
- "When to Use This Skill" sections (the YAML description handles this)
- Redundant recognition patterns (the YAML description handles this too)

## Step 6 — Calibrate Length

Target ranges:
- **Thinking-mode skills**: 80-150 lines
- **Knowledge-domain skills**: 60-120 lines per skill (knowledge is denser — decisions, not deliberation)

If a skill exceeds its range, the density test wasn't applied aggressively enough. Go back to Step 5.

If a skill is below 40 lines, it's probably a section of another skill, not a standalone skill.

## Step 7 — Validate Connections

Each skill should reference 3-7 other skills in the Connections section.

Rules:
- Don't just name the skill — explain HOW the connection works in one line
- Connections should be actionable: "when you're applying X, you should also consider Y because Z"
- If a skill has no connections, it's either too narrow or not part of this system
- If a skill connects to everything, it's probably too broad

---

## Decision: Standalone Skill vs. Section of Existing Skill

A topic deserves its own skill when:
- It has a unique trigger boundary (activates in situations no other skill covers)
- It produces a distinct behavioral delta (changes decisions in ways no other skill does)
- It's substantial enough for 60+ lines of actionable content

A topic belongs inside an existing skill when:
- It shares a trigger boundary with an existing skill
- Its behavioral delta overlaps with an existing skill's
- It's a supporting concept, not a primary framework

A topic is just reference material when:
- It informs but doesn't change decisions
- It's factual knowledge without decision frameworks
- It's useful context but doesn't need to be in the agent's active context window

---

## Quality Checklist

Before finalizing a skill:

- [ ] Can I state the behavioral delta in one sentence?
- [ ] Does the YAML description trigger on the right situations?
- [ ] Does the opening hook reframe the agent's thinking?
- [ ] Does every paragraph in the body change behavior?
- [ ] Are operational questions/frameworks actionable, not abstract?
- [ ] Do anti-patterns show what wrong looks like?
- [ ] Do connections explain HOW skills relate, not just THAT they relate?
- [ ] Is the skill within its target length range?
- [ ] Would I want this loaded into my context window? Or would I rather have the tokens back?

The last question is the real test.
