# Atlas — Project Backlog
*A cabinet of curiosities for creative technologists*

---

## Vision

Atlas is a reference library — not a blog, not a portfolio, not a wiki. Its purpose is to give creative technologists a vocabulary: named, composable ideas from across architecture, systems thinking, computer science, design, and complexity theory that can be applied to the moment before a line of code is written.

The site should feel like a very good bookshelf: curated, confident, unhurried. Every page should reward careful reading and invite further exploration.

---

## Tracks

### 🗣 Content — Thinkers

The 9 thinkers currently on the site have strong editorial profiles. The next phase enriches each with:
- A **Signature Moment** — one specific, vivid scene that encapsulates the thinker
- **Books to read** — 2–4 titles with editorial descriptions (not just titles)
- **Talks to watch** — 1–3 talks with descriptions and platforms
- **Portrait** — credited, CC-licensed photograph (see Portrait Sourcing below)
- **Website / archive** — official site or best available archive

| Thinker | Signature Moment | Books | Talks | Portrait | Website | Status |
|---|---|---|---|---|---|---|
| Christopher Alexander | ✅ | ✅ | ✅ | ⬜ | ✅ | Done in sprint |
| Donella Meadows | ✅ | ✅ | ✅ | ⬜ | ✅ | Done in sprint |
| Doug Engelbart | ✅ | ✅ | ✅ | ⬜ | ✅ | Done in sprint |
| Muriel Cooper | ✅ | ✅ | ✅ | ⬜ | ✅ | Done in sprint |
| Neri Oxman | ✅ | ✅ | ✅ | ⬜ | ✅ | Done in sprint |
| Rich Hickey | ✅ | ✅ | ✅ | ⬜ | ✅ | Done in sprint |
| Stafford Beer | ✅ | ✅ | ✅ | ⬜ | ✅ | Done in sprint |
| Steven Johnson | ✅ | ✅ | ✅ | ⬜ | ✅ | Done in sprint |
| Stewart Brand | ✅ | ✅ | ✅ | ⬜ | ✅ | Done in sprint |

**Portrait Sourcing (P1)**
All portraits should come from Wikipedia Commons (CC-BY or CC-BY-SA). Steps:
1. Download image from Commons (link noted in each thinker's frontmatter)
2. Save to `website/public/images/thinkers/<slug>.jpg` at 600×600px
3. Add attribution line in `portrait_credit` frontmatter field
4. Render credit below portrait in template

Recommended sources per thinker:
- Alexander: Wikimedia Commons — several photos, 1963–2000s
- Meadows: Donella Meadows Institute archives (donellameadows.org)
- Engelbart: Wikipedia Commons — famous 1968 NLS demo photo
- Cooper: MIT Media Lab archives (limited; contact MIT for permission)
- Oxman: Wikipedia Commons, multiple CC-BY photos
- Hickey: Strange Loop conference archive (CC photos)
- Beer: Wikipedia Commons — several historical photos
- Johnson: Wikipedia Commons — CC-BY author photo
- Brand: Wikipedia Commons — multiple CC-BY photos

---

### 🗣 Content — New Thinkers (P1)

Candidates for the next cohort. Each must satisfy: *did they change how you think about making things?*

| Candidate | Field | Key Idea | Connection to Existing |
|---|---|---|---|
| **Alan Kay** | Computer scientist, Xerox PARC | "The best way to predict the future is to invent it." Objects, Smalltalk, the vision of the Dynabook | Extends Engelbart; influenced Hickey |
| **Elinor Ostrom** | Political economist | Governing the commons without privatization or state control; polycentricity | Extends Beer's viable systems |
| **Ivan Illich** | Philosopher, social critic | Tools for conviviality — tools that enhance human agency vs. tools that create dependency | Deepens Engelbart's augmentation |
| **Jane Jacobs** | Urbanist, writer | "Eyes on the street" — cities as complex adaptive systems, not machines | Complements Alexander; connects to Johnson |
| **Claude Shannon** | Mathematician | Information theory — the bit, channel capacity, noise vs. signal | Foundation for many existing concepts |
| **Paul Saffo** | Futurist, forecaster | "Strong opinions, weakly held" — the forecasting discipline | Extends Brand's pace layering |
| **Bret Victor** | Interface designer | "Learnable programming" — tools that make thinking visible | The living heir of Engelbart + Cooper |
| **W. Edwards Deming** | Quality theorist | Systems thinking applied to organizations; variation vs. common cause | Complements Beer and Meadows |

---

### 🗣 Content — Concepts (P1)

10 concepts are currently stubs with minimal content. Each needs:
- Opening narrative (2–3 paragraphs, editorial voice)
- "Why it matters" framing for creative technologists
- 2–3 practical applications
- Cross-links to related thinkers and lenses

| Concept | Current State | Priority |
|---|---|---|
| The Pattern Language | Good content (Alexander's) | P1 — add applications |
| The Adjacent Possible | Good content (Johnson's) | P1 — add applications |
| Pace Layering | Good content (Brand's) | P1 — add applications |
| Complexity Made Legible | Good content (Hickey's) | P1 — add applications |
| Antidisciplinary Thinking | Good content (Oxman's) | P1 — add applications |
| Information as Landscape | Good content (Cooper's) | P1 — add applications |
| Amplification vs. Automation | Good content (Engelbart's) | P1 — add applications |
| Viable System | Good content (Beer's) | P1 — add applications |
| Systems Thinking | Good content (Meadows's) | P1 — add applications |
| The Viable System | Duplicate — consolidate with above | P0 — fix |

---

### 🗣 Content — Lenses (P1)

19 lenses have a title, question, description, and connections. Each needs:
- A practical "how to use this" paragraph
- 2–3 worked examples (specific scenarios from creative technology practice)
- The key question operationalized (what does this lens actually reveal?)

Priority lenses to enrich first:
1. **Tools for Thought** — most central to the project's thesis
2. **Progressive Expertise** — highly applicable to product design
3. **First Principles Reduction** — widely used but rarely formalized
4. **Deep Deliberation** — counterintuitive in a "move fast" culture
5. **Evolutionary Design** — critical for long-lived software

---

### 🗣 Content — New Sections (P2)

| Section | Purpose | Notes |
|---|---|---|
| **Essays** | Long-form editorial pieces applying multiple concepts to a real problem | E.g., "Why your roadmap is a pace layering problem" |
| **Reading List** | Curated books by theme, not thinker | Cross-reference the books already cited across profiles |
| **Glossary** | Quick definitions of technical terms used across the site | Good for SEO and accessibility |
| **Quotes** | A standalone quotes page pulling from all thinker profiles | Beautiful typographic treatment |

---

### 🎨 Design (P1–P2)

| Item | Description | Priority |
|---|---|---|
| **Portrait treatment** | Thinker portrait: grayscale on load, color on hover, with name/dates overlay | P1 |
| **Book card component** | Cover thumbnail (from OpenLibrary API?) + title/year/description | P2 |
| **Talk card component** | Platform icon + title/year + watch link | P1 |
| **"Reading" indicator** | Estimated read time on concept and thinker pages | P2 |
| **Related items sidebar** | On concept/lens detail pages, a sidebar showing related thinkers | P2 |
| **Dark mode** | Token-level dark mode using `prefers-color-scheme` | P2 |
| **Mobile nav** | Hamburger or bottom nav for small screens | P1 |
| **Hero refinement** | Homepage hero could use a subtle texture or grid overlay | P2 |
| **Pull quote animation** | Entrance animation on pull quotes (fade up) | P2 |

---

### ⚙️ Features (P1–P2)

| Item | Description | Priority |
|---|---|---|
| **Search** | Full-text search across thinkers, concepts, lenses (Pagefind or Fuse.js) | P1 |
| **Filter by lens** | On thinkers/concepts index, filter cards by shared lens | P1 |
| **Connections graph** | Visual network graph showing how thinkers/concepts/lenses relate | P2 |
| **"Start here" guide** | Onboarding path for new visitors — what to read first | P2 |
| **Bookmarks** | Save-to-favorites using localStorage | P2 |
| **RSS / newsletter** | Subscribe to new content additions | P3 |
| **Print styles** | Clean print CSS for concept pages (reading offline) | P2 |

---

### 🔧 Technical (P0–P2)

| Item | Description | Priority |
|---|---|---|
| **Astro Content Collections** | Migrate from `Astro.glob()` to typed Content Collections API for better validation | P1 |
| **OG images** | Dynamic Open Graph images per page for social sharing | P1 |
| **Sitemap** | Auto-generated sitemap.xml via `@astrojs/sitemap` | P1 |
| **SEO meta** | Per-page title, description, canonical URL | P1 |
| **Image optimization** | Use Astro's `<Image>` component for portrait images | P1 |
| **404 page** | Branded 404 page | P1 |
| **Lighthouse audit** | Run Lighthouse; target 95+ performance, 100 accessibility | P1 |
| **Fonts preload** | Add `<link rel="preload">` for above-fold fonts | P1 |

---

## Sprint 1 — In Progress

**Goal:** Enrich all 9 thinker profiles. Add books, talks, website, signature moment. Update template to render new content.

**Definition of done:**
- Each thinker has ≥ 2 books with editorial descriptions
- Each thinker has ≥ 1 talk with description and where-to-find
- Each thinker has a signature moment paragraph
- Template renders new sections cleanly
- Portrait placeholders noted with CC source for download

---

## Completed

- [x] Scaffold Astro site structure (pages, layouts, components)
- [x] 9 thinker profiles with editorial prose
- [x] 10 concept profiles with editorial prose
- [x] 19 lenses with descriptions and connections
- [x] Font system: PP Neue Corp + PP Neue Montreal + PP Neue Montreal Mono
- [x] Color palette: PP-inspired light gray + ochre accent
- [x] Design tokens: color, type, space, radius, border, transition
- [x] Component styles: nav, cards, pull quote, connection tags, page header, footer
- [x] Rounded card aesthetic matching pangrampangram.com

---

*Last updated: 2026-04-16*
