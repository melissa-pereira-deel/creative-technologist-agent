---
name: Interaction Laws
description: "Empirically validated laws governing how humans interact with interfaces — the physics of UX. Trigger on: button sizing, 'too many options', 'this feels slow', 'users aren't clicking', navigation structure, response time targets, 'how many items in this menu?', form design, onboarding flow, checkout optimization, modal vs inline, touch target sizing, decision fatigue, any discussion of interaction quality."
---

# Interaction Laws

Empirically measured relationships between human cognition, motor control, and interface design. Ignoring them produces interfaces that feel wrong for reasons nobody can articulate.

## The Laws

**Fitts's Law** — time to reach a target = f(distance / size). Larger and closer targets are faster.
- Frequently used actions: large, close to resting cursor/thumb
- Screen edges are infinitely large (cursor stops at edge) — macOS menu bar exploits this
- Mobile thumb zone: bottom-center is easiest; top corners are hardest

**Hick's Law** — decision time T = b × log₂(n + 1). Reducing 10 options to 5 cuts decision time nearly in half.
- Progressive disclosure: essential options first, advanced on demand
- Categorization reduces effective count: 20 items in 4 groups of 5 = deciding among 4, then 5
- Why Google's homepage converts and Yahoo's 2004 portal didn't

**Miller's Law** — working memory holds ~4 items under real conditions (originally 7±2, narrowed by modern research).
- Chunk: phone numbers (555-123-4567), credit cards (4 groups of 4)
- Limit top-level navigation to 5–7 items
- If users must hold > 4 things simultaneously, externalize some to the interface

**Jakob's Law** — users spend most time on OTHER products. They expect yours to work the same.
- Follow platform conventions: iOS patterns on iOS, Material on Android
- Innovation in interaction patterns has a learning cost. The benefit must exceed it

**Doherty Threshold** — productivity soars when response time is < 400ms. User and computer enter a conversational rhythm.
- < 100ms: instant (no perceived delay)
- > 1s: breaks flow
- > 10s: loses attention

**Weber-Fechner Law** — perceived change is proportional to *relative* change. 100ms off a 200ms response (50%) is noticeable. 100ms off 5s (2%) is imperceptible.
- Optimize where relative improvement is largest — usually the fastest operations
- Progress bars: logarithmic for perceived accuracy (linear bars feel like they stall at the end)

**Tesler's Law** — every system has inherent complexity that cannot be removed, only moved.
- "Simplifying" a feature usually moves complexity to the backend, not eliminates it
- The question: who should bear the complexity — user or system?

**Postel's Law** — be conservative in what you send, liberal in what you accept.
- Accept varied inputs: date formats, phone formats, partial addresses
- Output consistently: standardized formats, predictable responses

**Von Restorff Effect** — visually distinctive items are more noticeable and memorable.
- CTAs should contrast with surroundings. If everything is highlighted, nothing stands out

**Peak-End Rule** — people judge experiences by two moments: the peak (most intense) and the end.
- Invest in the emotional peak (the "aha" moment)
- Ensure the final interaction is positive — a poor ending taints the entire experience

**Aesthetic-Usability Effect** — users perceive beautiful interfaces as more usable than they actually are.
- Visual polish creates goodwill, making users more tolerant of minor usability issues
- NOT an excuse for poor usability — a multiplier on existing usability

## Decisions

- **Button/target sizing**: primary actions ≥ 44×44px (touch), prominent position in thumb zone. Destructive actions: small, away from primary, require confirmation
- **Option count**: > 7 options → add categorization or search. > 15 settings → progressive disclosure (basic/advanced)
- **Response time budget**: < 100ms for button presses and toggles. < 400ms for in-page content. < 1s for page transitions. Longer → progress indicator
- **Convention vs innovation**: default to convention (Jakob's Law). Only innovate when interaction is core to product identity AND benefit clearly exceeds learning cost
- **Complexity placement**: prefer system complexity over user complexity. If the system can infer, calculate, or look up something, don't ask the user to provide it

## Traps

- **Fitts's Law violation** — tiny touch targets, critical actions far from natural resting position, hamburger menus hiding primary navigation
- **Choice overload** — presenting all options simultaneously; "powerful" settings pages that paralyze
- **Novelty bias** — custom navigation patterns that violate Jakob's Law without sufficient justification
- **Ignoring the end** — investing in onboarding, neglecting completion states (Peak-End Rule: the last thing colors the entire memory)
- **Complexity displacement** — claiming "we simplified it" when complexity was just moved to a different screen

## Connections

- **Performance as Experience** — Doherty Threshold is the scientific basis for performance budgets; Weber-Fechner explains why perceived performance is non-linear
- **Progressive Expertise** — Hick's Law explains why progressive disclosure works: fewer choices for beginners, full options for experts
- **Signal Discrimination** — Von Restorff Effect IS visual signal: isolation creates emphasis, but too much creates noise
- **Tools for Thought** — Miller's Law explains why externalized cognition is necessary: working memory is limited, the tool must extend it
- **Perceptual Design** — these laws govern interaction; Gestalt governs visual structure. Good visual grouping (Gestalt) reduces effective choice count (Hick's)
