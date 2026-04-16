# Creative Technologist — Atlas Website

An editorial-style atlas of the thinkers, concepts, and principles behind the Creative Technologist Agent project. A cabinet of curiosities for designers and technologists.

## What's here

```
src/content/
├── about.md              — the manifesto
├── home.md               — home page copy
├── thinkers/             — 9 thinker profiles (fully written)
├── concepts/             — 10 foundational concepts (fully written)
└── lenses/               — 19 skill files (symlink from ../skills/)

src/styles/
├── tokens.css            — all design tokens (color, type, space)
├── typography.css        — type system + font imports
├── components.css        — component-level styles
└── global.css            — reset + layout primitives

src/layouts/              — page shell templates
src/components/           — reusable UI components
src/pages/                — route files
```

## Design language (quick reference)

**Fonts:** Playfair Display (serif, display/headlines) + Inter (sans, body) + JetBrains Mono (mono, code/skills)

**Colors:** `--color-paper` (#F7F3EC), `--color-ink` (#1C1917), `--color-ochre` (#C07B2B) as accent, `--color-muted` (#6B6560) for secondary text

**Principles:** no shadows, no gradients, no rounded buttons — structure through typography and ruled lines. Images used sparingly; grayscale by default, color on hover.

## Tech stack

Built with [Astro](https://astro.build) — content-first static site generator, markdown collections, zero JS by default.

```bash
npm install
npm run dev       # localhost:4321
npm run build     # output to dist/
```

## Content types

Each content file uses YAML frontmatter for structured fields + markdown for prose.

**Thinker fields:** `name`, `dates`, `field`, `slug`, `portrait`, `concept` (slug), `lenses` (array of slugs), `quote`

**Concept fields:** `title`, `slug`, `origin` (thinker slug), `lenses` (array), `tagline`

**Lens fields:** mirrors the structure in `skills/` — the website can pull directly from the agent's skill files.

## Pages

| Route | Description |
|---|---|
| `/` | Home — manifesto opening + three entry points |
| `/about` | What is a creative technologist? Full manifesto. |
| `/lenses` | Index of all 19 lenses |
| `/lenses/[slug]` | Individual lens — model, anti-patterns, connections |
| `/thinkers` | Index of all 9 thinkers |
| `/thinkers/[slug]` | Individual thinker — profile, key quote, shaped lenses |
| `/concepts` | Index of all 10 concepts |
| `/concepts/[slug]` | Individual concept — definition, origin, related lenses |

## Contributing

Content contributions follow the same principles as the agent:
- Thinker profiles: grounded in primary sources, not Wikipedia summaries
- Concept definitions: precise, not encyclopedic; connected to the lenses that apply them
- No product-specific examples in concept or thinker files
