---
title: Pace Layering
slug: pace-layering
origin: stewart-brand
lenses:
  - temporal-reasoning
  - evolutionary-design
  - constraint-propagation
  - information-entropy
tagline: Different parts of every system change at different speeds. Confusing them causes damage.
---

A building has layers that change at radically different rates. The site might persist for centuries. The structure for decades. The skin — the façade — for perhaps twenty years. The services (plumbing, wiring, HVAC) for fifteen. The interior layout for five to ten. The furniture for years. The occupants' stuff for days. Stewart Brand observed this pattern in *How Buildings Learn* (1994) and found the same structure in civilization itself: fashion changes faster than commerce, commerce faster than infrastructure, infrastructure faster than governance, governance faster than culture, culture faster than nature.

The layers don't just coexist — they interact. The fast layers provide responsiveness, novelty, and continuous adaptation. The slow layers provide memory, stability, and identity. Each layer needs the freedom to change at its own rate. When a fast layer moves too slowly, it becomes rigid and brittle. When a slow layer changes too quickly, it destabilizes everything built on top of it.

The practical failure mode is layer confusion: solving a fast-layer problem by changing a slow-layer element, or neglecting a fast-layer problem because the slow layers seem fine. Rebuilding your database schema to fix a UI inconsistency is a pace-layering error. Refusing to iterate on features because the architecture is under review is another.

## Where it shows up

- **Software architecture:** what should be hard to change (core data models, protocols) vs. easy (UI, content, configuration)?
- **Product strategy:** what must stay stable for users to trust the product while everything else evolves?
- **Organizational design:** which decisions belong to which cadence of review?
- **Technical debt:** accumulation is often a symptom of slow and fast layers getting tangled.

## The related lens

[Temporal Reasoning →](../lenses/temporal-reasoning) uses pace layering as its primary diagnostic framework.
