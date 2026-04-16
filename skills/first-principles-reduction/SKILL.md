---
name: First-Principles Reduction
description: "Question, delete, and simplify BEFORE optimizing or automating — Musk's Algorithm in strict sequence. Trigger on: 'let's automate this', 'we need to optimize', 'this is too complex', 'how do we scale this?', feature bloat, process overhead, any instinct to improve something that might not need to exist."
---

# First-Principles Reduction

"Possibly the most common error of a smart engineer is to optimize a thing that should not exist." — Elon Musk

Five steps, in mandatory sequence. Each must complete before the next. The most common mistake: doing them in reverse.

## Model

**The Five Steps:**
1. Question the requirements
2. Delete the part or process
3. Simplify and optimize
4. Accelerate cycle time
5. Automate

**Why the order is non-negotiable:**
- Automating before deleting = you've automated waste; now it's permanent
- Optimizing before questioning = engineering effort polishing something nobody needs
- Accelerating before simplifying = "if you're digging your grave, don't dig faster"
- Simplifying before deleting = making an unnecessary thing elegant

**Core inversion** — adding feels productive, deleting feels destructive. Optimizing feels intelligent, questioning feels ignorant. Automating feels modern, manual feels primitive. The algorithm inverts every one of these instincts.

## Apply

**Step 1 — Question Every Requirement:**
- Attach a person's name to every requirement (not a department — a person)
- "What happens if we remove this requirement entirely?"
- "Is this based on current reality or historical assumption?"
- "Would this survive if we were starting from scratch today?"
- Requirements from smart/senior people are the most dangerous because they go unquestioned. Question anyway.

**Step 2 — Delete the Part or Process:**
- For each component, feature, or process step: "What breaks if we remove this?"
- If the answer is "nothing" or "we'd handle one edge case differently" — delete it
- Track deletions. If you never add anything back, you weren't aggressive enough (10% rule: you should occasionally delete too much and restore a small fraction)
- The default is deletion. Keeping something requires justification; removing requires only absence of justification.

**Step 3 — Simplify and Optimize:**
- Only after questioning and deleting do you simplify what remains
- For each remaining component: "Can this be expressed with fewer parts?"
- Reduce interfaces, parameters, configuration options, abstraction layers that don't earn their complexity
- "Is this simple (low complexity, independent parts), or merely easy (familiar but entangled)?"

**Step 4 — Accelerate Cycle Time:**
- Only accelerate a simplified, reduced system
- Identify the critical path (what determines end-to-end cycle time?)
- Remove wait states and handoffs
- Reduce batch sizes (smaller batches = faster feedback)

**Step 5 — Automate:**
- Only automate what has survived Steps 1–4
- Automation crystallizes a process — once automated, it runs without questioning
- Automate the thing, not a workaround for the thing
- Ensure automated processes can be deleted or modified (avoid automation lock-in)

**Sequence Diagnostic** — for any proposed improvement, identify which step it represents. If it's at Step N but Steps 1 through N-1 haven't been performed — stop and go back.

**Inversion Test** — for any system you're about to improve:
- Write what you want to do (optimize, automate, etc.)
- Invert: what could you DELETE instead?
- Invert again: what REQUIREMENT could you question?
- If the inversion reveals a simpler path, take it.

## Anti-Patterns

**Premature automation** — the most common mistake; automating a process nobody questioned

**Optimization worship** — making something faster/cleaner that shouldn't exist

**Addition bias** — responding to every problem by adding something rather than removing something

**Requirement inertia** — "we've always needed this" (requirements have expiration dates)

**Sunk cost preservation** — "we spent 6 months building this, we can't remove it" (ignore what it cost to build; ask what it costs to keep)

**Selective application** — applying only the steps you enjoy; engineers love Step 3 and skip Steps 1–2

## Connections

- **Signal Discrimination** — Step 2 (deletion) IS signal discrimination applied to components and processes
- **Deep Deliberation** — Step 1 (questioning requirements) demands deliberation before action
- **Constraint Propagation** — each deletion propagates; trace effects before and after
- **Coherence Design** — the algorithm produces coherence by removing elements that don't strengthen the whole
- **Tools for Thought** — Step 5 (automate) raises the amplification vs. automation question: should this be automated or should users retain understanding?
