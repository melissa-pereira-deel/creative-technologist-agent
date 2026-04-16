---
name: Tools for Thought
description: "Design products that amplify human cognition — make users SMARTER, not just faster. Trigger on: 'how should we show this?', 'should we automate this?', 'users aren't learning from the tool', 'what's the right level of automation?', dashboard design, decision support, recommendation systems, any feature where automation vs. amplification matters."
---

# Tools for Thought

Doug Engelbart's 1962 paper was titled "Augmenting Human Intellect" — not automating human tasks. A calculator automates arithmetic; a spreadsheet augments reasoning. After using a calculator, you're the same. After using a spreadsheet deeply, you think differently about relationships between numbers. The highest aspiration: build tools that leave users smarter than they were before.

## Model

**Automation vs. Amplification:**
- *Automation*: "The tool did this for you" — saves time, user remains unchanged
- *Amplification*: "The tool helped you see/think/understand something new" — user's thinking depth increases

**Test**: after 100 uses of this feature, will the user understand their domain better? Or just have completed tasks?

**Bicycle for the Mind** (Jobs, channeling Kay) — a bicycle doesn't move your legs for you; it amplifies locomotion by 3–4x. The best software doesn't think for you; it makes your thinking dramatically more effective.

**Representation Matters** — how information is represented changes what you can think about it. A bar chart makes comparison easy; a scatter plot makes correlations visible; a line chart makes trends apparent. Choosing the right representation is choosing what thoughts to enable.

**Externalized Cognition** — the mind holds ~4 items in working memory under real conditions. Tools that externalize cognitive work (show relationships visually, track dependencies, maintain context) effectively expand working memory without replacing thought.

**Feedback Loop of Understanding** — tools for thought create a virtuous cycle: tool reveals something → user understands more deeply → user asks better questions → tool reveals more. Automation creates dependency: tool does more → user does less → user understands less → user depends more.

**Transferable Mental Models** — the best tools teach models that transfer beyond the tool. Learning Git teaches you about branching and version history as concepts — applicable to documents, designs, decisions — not just Git commands.

**Constructionism** (Papert) — people learn best by building. A tool that lets users construct (build a portfolio, compose a workflow, assemble a report) teaches more than one that presents (shows a dashboard, generates a report). The act of construction IS the learning.

## Apply

**Amplification Audit** — for each feature:
- Does this automate a task or amplify understanding?
- After 100 uses, will the user understand their domain better?
- Could this be redesigned to show WHY, not just WHAT?
- Is the user learning or just consuming?

**Representation Choice** — for any data or information:
1. What decision does this inform?
2. What insight do you want the user to have?
3. Which representation makes that insight visible? (Table? Chart? Map? Comparison? Timeline? Score?)
4. Can the user interact with the representation to explore alternatives?
5. Does the representation teach a transferable model?

**Feedback Loop Design** — for key interactions:
- How quickly does the user see the result of their action? (Immediate feedback amplifies; delayed feedback disconnects)
- Does the result teach something? (Not just "done" but "here's what changed and why")
- Can the user iterate? (Try different inputs, see different outputs, build understanding through exploration)

**Construction Opportunity** — for features that currently present information:
- Could the user construct something instead of consuming something?
- Could they build their own watchlist / template / workflow instead of using a preset?
- Does the act of construction itself teach the domain?

**The Engelbart Test** — for the product as a whole:
- After a year of use, would users make better decisions in this domain — even without the tool?
- Does the tool reveal structure and pattern the human mind alone couldn't see?
- Or does it just save time on tasks users already knew how to do?

## Anti-Patterns

**Full automation when partial automation + user insight is more valuable** — showing results without showing reasoning

**Making users dependent rather than capable** — "the tool knows best" instead of "the tool helps you know"

**Static presentation when interactive exploration is possible** — a frozen chart teaches less than one you can explore

**Premade templates when user construction would teach more** — templates as endpoints, not starting points

**Complexity hidden instead of complexity made legible** — black-box outputs that don't teach the domain

## Connections

- **Legibility Design** — makes complex systems visible for amplification; the right representation enables new thoughts
- **Progressive Expertise** — tools for thought should grow with the user's understanding; amplification deepens over time
- **Signal Discrimination** — choose what to amplify (signal) vs. what to automate away (noise)
- **Deep Deliberation** — the tool should support deliberation, not replace it
- **First-Principles Reduction** — Step 5 (automate) should pass the amplification test first: should this be automated or should users retain the understanding?
