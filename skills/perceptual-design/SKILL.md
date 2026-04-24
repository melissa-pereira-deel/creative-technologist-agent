---
name: Perceptual Design
description: "How humans see, group, and interpret visual information — the physics of visual communication. Trigger on: layout decisions, 'how should we show this?', 'this dashboard is cluttered', 'which chart type?', color choices, typography decisions, data visualization, 'this doesn't look right', visual hierarchy, accessibility review, motion/animation design, responsive layout, icon design, empty states."
---

# Perceptual Design

Humans don't read interfaces — they scan, group, and interpret visual patterns before conscious thought engages. Designing against these patterns fights the user every time.

## Gestalt Principles

Properties of human visual perception, not design preferences:

- **Proximity**: elements close together are perceived as a group. Spacing IS grouping — you don't need borders if spacing is intentional
- **Similarity**: elements that look alike are perceived as related. Consistent button styles create "clickable" as a visual category
- **Continuity**: the eye follows lines and curves. Alignment creates invisible structure
- **Closure**: the brain completes incomplete shapes. Negative space can communicate (FedEx arrow, progress rings)
- **Figure-Ground**: foreground separates from background automatically. Ambiguous figure-ground creates confusion
- **Common Region**: elements inside the same boundary are grouped. Cards work because enclosure creates relationship
- **Common Fate**: elements moving together are perceived as grouped. Unsynchronized animation creates chaos
- **Prägnanz**: the brain prefers the simplest interpretation. Clean layouts feel "right"

## Color

- Hue encodes category (red = error, green = success — cultural, not universal)
- Lightness/saturation encode emphasis (saturated draws attention, desaturated recedes)
- Contrast ratio ≥ 4.5:1 for text (WCAG AA), ≥ 7:1 for AAA
- ~8% of males have color vision deficiency — never use color as the sole differentiator
- Color spaces: sRGB (web standard), Display P3 (modern screens, wider gamut)

## Typography

- Size creates priority: display > heading > body > caption
- Line length: 45–75 characters optimal
- Line height: 1.4–1.6 for body
- Minimum 16px for body text on web (smaller causes zoom on mobile)
- Modular scale (1.25, 1.333, 1.5) for harmonious size relationships

## Visual Hierarchy

- Priority: Size > Contrast > Color > Position > Whitespace
- F-pattern: text-heavy pages scanned left-to-right, top-to-bottom with decreasing attention
- Z-pattern: minimal pages scanned top-left → top-right → bottom-left → bottom-right
- Isolation creates importance — a single element with whitespace around it commands attention

## Data Visualization Encoding

| Data type | Best encoding | Avoid |
|-----------|--------------|-------|
| Quantitative comparison | Position (x/y axis), Length (bar height) | Angle (pie charts — humans misjudge angles) |
| Categorical | Color hue | Quantitative on hue (misleading) |
| Sequential quantitative | Color saturation/lightness | Hue changes for ordered data |
| Magnitude difference | Length | Size/area (humans underestimate area differences) |

Rule: match visual variable to data type. When the chart requires explanation to reveal its insight, it's the wrong chart type.

## Motion

- Duration: 100–300ms for UI transitions. Shorter = imperceptible. Longer = sluggish
- Easing: ease-out for entrances, ease-in for exits, ease-in-out for state changes
- Informational animation: shows spatial relationship, what changed, where something came from. Worth the time cost
- Decorative animation: purely aesthetic. Cut it — every 200ms is 200ms the user spends watching, not working
- Respect `prefers-reduced-motion` — some users experience motion sickness

## Accessibility

- Semantic HTML conveys structure to screen readers (headings, landmarks, lists)
- Keyboard navigation: every interactive element must be reachable without a mouse
- Touch targets: ≥ 44×44px (Apple), ≥ 48×48dp (Android)
- Alt text: describe function, not appearance ("Submit form" not "blue button")
- ARIA: use when HTML semantics are insufficient, not as a replacement

## Decisions

- **Layout structure**: Proximity + Common Region for grouping. Space between groups > space within groups. If you need borders to show grouping, your spacing is wrong
- **Chart type**: comparison → bar. Trend → line. Part-of-whole → stacked bar (not pie). Correlation → scatter. Distribution → histogram
- **Color palette**: neutral base + one primary action color + semantic colors (error, warning, success). Limit to 5–7. Every additional color reduces signal value of existing ones
- **Type system**: 4–6 levels (display, h1, h2, body, caption, overline). Modular scale. Two font families maximum
- **Animation decision**: "Does this teach the user something about system state or spatial model?" Yes → keep, tune duration. No → cut

## Traps

- **Decoration over communication** — colors, fonts, and layouts chosen for aesthetics without considering what they communicate
- **Chart vanity** — radar charts, 3D bars, donut-within-donut when a bar chart communicates more clearly
- **Color-only encoding** — color as the sole differentiator for states or categories (fails for color-blind users)
- **Alignment neglect** — "close enough" elements. The eye detects sub-pixel misalignment and reads it as disorder (Prägnanz violation)
- **Motion for delight** — animation because it "feels polished" without adding information

## Connections

- **Signal Discrimination** — visual hierarchy IS signal discrimination: what's emphasized (signal) vs. subdued (noise)
- **Legibility Design** — Gestalt principles explain HOW to make complex systems legible at different resolutions
- **Tools for Thought** — the right data visualization augments cognition; the wrong one obscures understanding
- **Performance as Experience** — animation duration and rendering performance directly affect perceived quality
- **Coherence Design** — visual consistency is the surface expression of coherence; Gestalt explains why inconsistency feels wrong
