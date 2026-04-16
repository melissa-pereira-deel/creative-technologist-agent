---
name: Legibility Design
description: "Make complex systems comprehensible without destroying their essential complexity — multi-resolution design. Trigger on: 'how should we display this?', 'this is too complex', 'users don't understand', 'what's the right level of detail?', dashboards, scoring systems, data visualization, information architecture design."
---

# Legibility Design

Legibility ≠ simplification. Simplification removes complexity. Legibility preserves complexity while making it navigable. Complex systems are valuable BECAUSE they're complex — your job is to make that complexity legible at multiple resolutions without losing the nuance that matters.

**The Legibility Paradox** (Scott) — making a system legible risks destroying the illegible complexity that makes it work. A forest reduced to "board-feet of lumber" loses its ecology. Every act of legibility is a trade-off: what are you gaining? What are you losing?

## Model

**Multi-Resolution Design** — the same information should work at three zoom levels:

| Resolution | Time | What the user needs |
|---|---|---|
| Glance | 1 second | Is this good or bad? Does it need my attention? |
| Study | 30 seconds | Key dimensions, context, relationships |
| Analysis | 5+ minutes | Raw data, methodology, edge cases, drill-downs |

If your design only works at one resolution, it fails. A dashboard requiring 5 minutes to understand is bad design. An analysis with no way to glance is dangerous design.

**Escape Hatches** — every legibility layer needs a path to the underlying complexity. A score of 7/9 should let you click through to see which 7 passed and which 2 failed. Without escape hatches, you're oversimplifying.

**Appropriate Precision** — display to the precision that matters for the user's decision, no more. "Revenue growth: 15%" not "15.3847%". The right precision depends on what difference would actually change the user's action.

**Visual Grammar** — consistent visual patterns the user learns once and applies everywhere: color always means the same thing, position always means the same thing, size always means the same thing. When visual grammar is inconsistent, the user's mental model breaks on every new screen.

**Narrative Legibility** — numbers tell you WHAT happened; narratives tell you WHY. Some systems are best made legible through narrative, not metrics.

**Confidence Communication** — making uncertainty visible IS an act of legibility. "72% confident" is more legible than "Predicted: yes". False precision is worse than approximate truth.

## Apply

**Resolution Test** — for any screen or feature:
1. Can a user get value in 1 second? What's the headline?
2. Can they understand key dimensions in 30 seconds?
3. Can they drill into details and methodology in 5+ minutes?
If any resolution fails, redesign.

**Escape Hatch Audit** — for every visualization, score, or summary:
1. Can the user see the underlying data?
2. Can they change the filters or parameters?
3. Can they understand the calculation?
4. Can they find the source?
Any "no" — add an escape hatch.

**Visual Grammar Check** — list every color, icon, position, and size convention. For each, verify it means the same thing on 5 different screens. Document inconsistencies; fix systematically.

**"What Decision Does This Inform?" Test** — for every piece of information displayed, name the decision it enables:
- "Is my alert volume high?" → Decision: adjust thresholds
- "Is this market growing?" → Decision: invest or divest
If you can't name a decision, the information may not need to be there.

**Precision Calibration** — for every number:
1. What's the smallest difference that would change this user's decision?
2. Display to that precision, no more.

**Workflow: Building a Legible Interface:**
1. Identify what's genuinely complex — what nuance matters?
2. Define the resolutions — which decisions need glance / study / analysis?
3. Design glance layer — one number, one color, one icon
4. Design study layer — 3–5 dimensions and their relationships
5. Design analysis layer — raw data, filters, drill-downs, escape hatches
6. Check visual grammar — consistent across all screens?
7. Calibrate precision — per number, what difference matters?
8. Add narrative — where does the user need context, not just data?
9. Make uncertainty visible — where do confidence intervals belong?

## Anti-Patterns

**Oversimplification** — single number without escape hatches; "your company is a 6/10" with no way to understand why.

**Decoration disguised as information** — chartjunk, unnecessary 3D effects, icons that don't communicate; if it doesn't inform a decision, remove it.

**Information homogeneity** — everything at the same visual weight; when nothing stands out, nothing gets attention.

**False precision** — 8 decimal places on an estimate; exact percentages on uncertain predictions; misleading worse than helpful.

**Inconsistent visual grammar** — colors and icons meaning different things on different screens; breaks the user's mental model.

## Connections

- **Signal Discrimination** — determines what to make legible; legibility design determines how to show it
- **Information Entropy** — multi-resolution design is a compression strategy; different users need different compression ratios
- **Progressive Expertise** — what's legible for an expert is noise for a beginner; layer the resolutions accordingly
- **Tools for Thought** — legibility enables amplification; the right representation enables new thoughts
