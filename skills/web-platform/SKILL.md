---
name: Web Platform Internals
description: "How browsers actually work — rendering pipeline, event loop, hydration, layout engines, performance. Trigger on: 'why is the page slow?', 'layout shift', CLS, LCP, FCP, 'reflow', 'repaint', event loop, 'blocking the main thread', Web Worker, hydration, 'server components', streaming SSR, 'bundle size', 'first load', 'Core Web Vitals', requestAnimationFrame, IntersectionObserver, Service Worker, 'this works in dev but not production'."
---

# Web Platform Internals

## Rendering Pipeline

**Parse → Style → Layout → Paint → Composite**

Each stage can be re-triggered by changes:
- Modifying `width` → triggers Layout + Paint + Composite (expensive)
- Modifying `transform` → triggers Composite only (GPU-accelerated, no main thread)
- **Reflow** (Layout): recalculating positions/sizes. Cascades through children. Triggered by reading `.offsetHeight` after writing `.style.width` (forced synchronous layout)
- **Repaint**: redrawing pixels without layout change. Cheaper but significant for large areas
- **Composite-only properties**: `transform`, `opacity`, `filter`. Animations should ONLY use these

## Event Loop

Single main thread runs JavaScript, DOM manipulation, layout, paint, and event handlers.

- **Microtasks** (Promises, `queueMicrotask`): run after current script, before next macrotask. A promise chain that never yields blocks rendering
- **Macrotasks** (`setTimeout`, events, `fetch` callbacks): one per cycle, with rendering between them
- **requestAnimationFrame**: runs before paint, aligned to display refresh (60Hz = 16.67ms). Never use `setTimeout(fn, 16)` — it drifts and misaligns
- Long task = any JS execution > 50ms. Blocks rendering, input, scrolling. Break with `setTimeout(fn, 0)` or `scheduler.yield()`

## Hydration & Server Rendering

- **SSR**: server renders HTML → fast FCP → JS loads → hydration attaches event handlers. The gap between visible and interactive is the hydration cost
- **Streaming SSR**: server sends HTML in chunks as data resolves (`renderToPipeableStream`). Progressive display, no blank screen
- **React Server Components (RSC)**: components run on server, send rendered output (not JS) to client. Zero bundle size for server components. Next.js App Router uses RSC by default
- **Selective hydration**: `<Suspense>` wraps low-priority sections — React 18 hydrates interactive islands first
- **Resumability** (Qwik): serialize event handlers into HTML, lazy-load on first interaction. Zero hydration cost. Emerging, not yet mainstream

## Core Web Vitals

| Metric | Meaning | Target | Fix |
|--------|---------|--------|-----|
| **LCP** | Largest Contentful Paint — time until biggest visible element renders | < 2.5s | Preload hero image, inline critical CSS, SSR above-fold |
| **CLS** | Cumulative Layout Shift — visual stability | < 0.1 | Explicit `width`/`height` on images, reserve space for dynamic content |
| **INP** | Interaction to Next Paint — responsiveness | < 200ms | Break long tasks, reduce main thread work, defer non-critical JS |

## CSS Layout Engines

- **Flexbox**: 1D (row OR column). Toolbars, card rows, centering, spacing distribution
- **Grid**: 2D (rows AND columns). Page layouts, dashboards, anything needing both axes. `grid-template-areas` for named regions
- **Flow**: default. Still correct for prose content, simple top-to-bottom layouts
- Performance: deeply nested flex-in-grid-in-flex creates recalculation overhead. Flatten when possible. `position: absolute` for overlays and tooltips, not layout

## Web Workers

- Separate thread, own event loop, no DOM access. Communication via `postMessage` (structured clone — copies, doesn't share)
- `SharedArrayBuffer` + `Atomics`: shared memory between threads. Requires cross-origin isolation headers (`COOP`/`COEP`)
- Use for: heavy computation (data processing, WASM), large JSON parsing, audio processing (`AudioWorklet` — web's RT audio thread)
- `Comlink`: wraps `postMessage` into a proxy API — Workers feel like normal async function calls
- Don't use for simple fetch calls (already off main thread) or small computations (postMessage overhead exceeds savings)

## Bundle & Loading Performance

- **Code splitting**: `dynamic import()` on demand. Route-based minimum; component-level for heavy dependencies (charts, editors)
- **Tree shaking**: bundler removes unused exports. Works with ES modules only. `import lodash` ships everything; `import { debounce } from 'lodash-es'` ships only debounce
- **Resource hints**: `<link rel="preload">` for critical resources, `rel="prefetch">` for next-page resources, `rel="preconnect"` for third-party domains

## Decisions

- **SSR vs CSR vs SSG**: SSR for dynamic content needing SEO and fast FCP. CSR for authenticated dashboards (SEO irrelevant). SSG for infrequently changing content. ISR bridges SSG and SSR — static with background revalidation
- **Server vs Client Components**: server by default (zero JS shipped). Add `'use client'` only for event handlers, useState/useEffect, or browser-only APIs
- **Web Workers**: when computation > 50ms on main thread. When processing doesn't need DOM. For large payload parsing (JSON > 1MB)
- **Layout engine**: Grid for page-level, Flexbox for component-level, Flow for prose. This covers 95% of cases

## Traps

- **Hydration mismatch** — server HTML differs from client render. React throws errors and re-renders the tree. Common causes: `Date.now()`, `Math.random()`, window-dependent code in render. Use `useEffect` for client-only values
- **Layout thrashing** — reading `.offsetHeight` or `.getBoundingClientRect()` between DOM writes. Each read forces synchronous layout. Batch reads then writes; or use `ResizeObserver`
- **Blocking the event loop** — synchronous work > 50ms: large `JSON.parse`, complex regex, deep traversal. Move to Web Worker or chunk with `scheduler.yield()`
- **Over-fetching in client components** — `useEffect` + fetch for data a Server Component could fetch (no JS, no loading state, no waterfall)
- **Giant bundles** — 200KB charting library for one chart. Lazy-load with `dynamic(() => import())`. Check with `@next/bundle-analyzer`

## Connections

- **Performance as Experience** — Core Web Vitals ARE perceptual performance metrics; Doherty Threshold (400ms) maps to INP target (200ms)
- **Interaction Laws** — Doherty Threshold explains CWV targets; Fitts's Law governs touch targets on mobile web; Hick's Law informs navigation structure
- **Data Systems** — RSC data fetching connects server-side data access to rendering; ISR and SWR bridge data freshness with performance
- **Systems Architecture** — SSR/RSC is a client-server architecture decision; edge functions (Vercel, Cloudflare) are deployment topology decisions
