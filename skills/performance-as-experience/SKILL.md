---
name: Performance as Experience
description: "Speed and responsiveness are design dimensions, not optimizations. Trigger on: 'it feels slow', 'how do we make this faster?', 'should we add this animation?', loading times, framerate issues, real-time features, 'users aren't engaging', frontend architecture decisions, library choices."
---

# Performance as Experience

John Carmack built Doom on hardware that shouldn't have been able to render 3D. His response wasn't "wait for better hardware" — it was to invent rendering techniques that made the impossible possible. Performance isn't what you do after the product works. It's what MAKES the product work.

## Model

**Perceptual Thresholds** — human perception has hard boundaries. Crossing them changes the nature of the experience qualitatively, not just quantitatively:

| Threshold | Meaning |
|---|---|
| 0–16ms | Direct manipulation — object feels attached to finger/cursor; user manipulates objects, not commands |
| ~50ms | Instantaneous — action feels complete before attention can shift |
| 100ms | Instant boundary — result feels "already there"; above this, user perceives computation |
| 300ms | Responsive — user notices delay but maintains context |
| 1 second | Flow boundary — user's attention starts to wander; context erodes |
| 10 seconds | Attention loss — user has mentally left |

**Performance is Non-Linear** — the difference between 50ms and 100ms is larger than between 100ms and 200ms because it crosses a perceptual threshold. Optimize threshold crossings, not linear improvement.

**Speed Changes What's Possible** — when an action is instant, users explore casually and frequently. When it takes 3 seconds, they plan before acting and avoid exploration. Git was designed for <3 second patches (vs. 30s elsewhere) — not for efficiency, but because sub-3s enabled a completely different workflow. Speed isn't the same experience faster; it's a different experience.

**Perceived vs. Actual Performance** — users don't measure milliseconds; they perceive responsiveness. Techniques that improve perceived performance:
- Optimistic updates (show result immediately, reconcile later)
- Skeleton screens (show layout shape before content)
- Progressive loading (structure first, content fills in)
- Immediate visual feedback (button animation before server response)
- Progress indication (for unavoidable waits)

**Performance Budget** — every feature, library, font, image, and animation has a cost. Before adding anything, know its cost and decide if it's worth the budget. A 200KB library adding a minor interaction may not be worth 500ms of load time.

**Performance as Trust Signal** — fast products feel competent. Slow products feel unreliable. Users unconsciously trust fast software more.

## Apply

**Threshold Audit** — for each key user action:
1. How long does it take? (Measure, don't guess)
2. Which perceptual threshold does it fall in?
3. Which threshold SHOULD it be in? (Direct manipulation needs <16ms; navigation needs <300ms; data fetch needs <1s)
4. What's the gap?

**Performance Budget** — establish and track:
- Time to Interactive (TTI): how long before user can act?
- First Contentful Paint (FCP): how long before user sees anything?
- Interaction latency: how long between action and visible result?
- Animation framerate: consistently 60fps?

**Perceived Performance Toolkit** — when actual performance can't be improved:
- Can you show an optimistic result?
- Can you show progress?
- Can you show structure first?
- Can you front-load the most important content?
- Can you preload what the user will likely need next?

**"Speed Enables" Analysis** — before accepting a slow implementation:
- What behaviors does current speed prevent? (Would users explore more? Use it more frequently?)
- What becomes possible at the next threshold?
- Is speed improvement worth prioritizing over the next feature? (Often yes — speed improves ALL features simultaneously)

**Animation Audit** — for each animation: is it informational (shows where something came from, indicates state change) or decorative? Informational animations are investments. Decorative animations are costs.

## Anti-Patterns

**"We'll optimize later"** — performance debt compounds; harder to retrofit than build in

**Measuring server-side metrics instead of user-perceived latency** — server says 50ms; user experiences 800ms with network and rendering

**Testing only on fast hardware and fast networks** — your MacBook Pro is not your user's device

**Adding libraries without accounting for performance cost** — bundle size is latency

**Decorative animations consuming the performance budget** — 400ms for a transition that teaches the user nothing

**"Users will tolerate slowness because the feature is valuable"** — they won't; they'll just use it less

## Connections

- **Trust Architecture** — performance IS a trust signal; slow products feel unreliable
- **Constraint Propagation** — performance budget constraints propagate through all design decisions
- **Signal Discrimination** — every millisecond should be spent on signal, not decorative noise
- **Economic Model Design** — performance requirements constrain infrastructure costs, which constrain the business model
