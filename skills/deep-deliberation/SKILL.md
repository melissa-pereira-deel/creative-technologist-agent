---
name: Deep Deliberation
description: "Sustained problem-contemplation before jumping to solutions — Hickey's Hammock Driven Development. Trigger on: 'I'm not sure what the right approach is', 'we keep going back and forth', 'should we just start and see?', team stuck in solution-debate, irreversible decisions, novel problems, or when you're confused about WHAT you're solving before HOW."
---

# Deep Deliberation

Rich Hickey: the most expensive bugs come not from coding errors but from misunderstanding the problem. The pressure to ship makes deliberation feel like laziness — but your most valuable work often happens before any tool is touched.

## Model

**Two Minds:**
- *Waking mind* — focused, sequential, good at executing known procedures
- *Background mind* — diffuse, associative, parallel, good at novel connections

Use the waking mind to clearly define the problem, list constraints, and identify what you don't know. Then assign the problem to your background mind by stepping away. The background mind processes while you're doing something else — walking, sleeping, working on something else.

**Problem Understanding vs. Solution Generation** — most processes jump straight to solutions. Hickey: spend at least as long understanding the problem as you plan to spend solving it.

**Loading the Problem** — the background mind only works on problems you've thoroughly loaded. A vague sense that "something needs improving" won't trigger insight. A clearly articulated problem with specific constraints and known attempted approaches will.

**Simple vs. Easy** — simple: low complexity, parts are independent. Easy: familiar, convenient, but entangled. Easy solutions feel good now and create problems later. This distinction is the output of deliberation.

**When NOT to deliberate** — well-understood problems with known solutions need execution. Signals deliberation IS needed: the problem is novel, stakes are high, previous attempts have failed, the problem keeps shifting, you feel confused about what you're actually solving.

## Apply

**Problem Statement Practice** — before proposing any solution, write:
- What is the actual problem? (Not the symptom)
- Who has it? (Specific)
- Why does it exist? (Root cause, not surface)
- What have we tried? What worked partially? What failed?
- What would a good solution look like? (Properties, not implementation)
- What constraints exist?
- What do we NOT know? (Most important — explicit ignorance)

If you can't fill this out clearly, you're not ready to solve the problem.

**Background Mind Assignment** — after loading the problem:
- State open questions explicitly: "I need to figure out X, Y, Z"
- Step away. Do something else.
- When an idea surfaces, evaluate it critically — don't accept the first one
- The best solutions often come after dismissing the first 2–3 ideas

**Deliberation Timer** — size to decision magnitude:
- Small (this week's feature): 30 min focused + overnight
- Medium (this quarter's architecture): 2–3 days intermittent
- Large (product direction, business model): 1–2 weeks background processing

**Procrastination vs. Deliberation Test:**
- Procrastination: avoiding the problem, feeling dread, generating nothing
- Deliberation: actively curious, mind returning to it, writing notes, generating questions

**Decision Readiness Check** — before committing:
- Can you explain the problem clearly to someone else?
- Can you explain WHY this solution, not just WHAT it is?
- Can you articulate the trade-offs?
- Do you feel confident, or just tired of thinking? (Fatigue ≠ clarity)

## Anti-Patterns

**"Move fast and break things" on novel problems** — speed without understanding = expensive mistakes paid later.

**"Let's just try something"** as escape from discomfort of not knowing.

**Infinite deliberation** — diminishing returns exist; recognize when you have enough clarity to act.

**Group deliberation without individual thinking** — committees produce mediocre compromise, not insight. Individual deliberation first, group synthesis second.

**Confusing activity with progress** — coding all day can feel productive while building the wrong thing.

## Connections

- **All other skills** benefit from deliberation — applying any framework without understanding the problem first produces wrong answers
- **Evolutionary Design** — deliberation generates high-quality variation, not random variation
- **Constraint Propagation** — understanding the problem space IS understanding how constraints propagate
- **Adjacent Possible** — deliberation helps you see what's actually adjacent vs. what you wish were adjacent
- **Coherence Design** — deliberation reveals whether a proposed addition strengthens or weakens the whole
