# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio and blog site (nirlep.dev) built with Next.js 16 App Router (Cache Components), React 19, TypeScript, and Tailwind CSS 3. Uses Bun as the package manager.

## Commands

```bash
bun run dev      # Dev server with Turbopack
bun run build    # Production build
bun run start    # Start production server
bun run lint     # ESLint
```

No test framework is configured.

## Architecture

### Routing & Pages

Next.js App Router in `src/app/`. Key routes:
- `/` — Home: shader hero on the field, then paper sections (About, Selected work, Recent writing)
- `/posts` — Blog listing (poster cards); `/posts/[slug]` — Individual post on paper with a seeded poster header
- `/projects` — Project showcase (data in `src/lib/projects.ts`)
- `/adventures` — Adventures hub; `/adventures/cses/[category]/[problem]` — CSES solutions
- `/freelance` — Freelance landing page (own hero on the field, rest on paper)

Pages with filesystem data use `"use cache"` (Cache Components). Never call `new Date()` / `Date.now()` in server components — use `<Year />` from `src/components/Year.tsx`.

### Content System

MDX files live in `src/content/`:
- `posts/` — Blog posts with YAML frontmatter (title, date, description, tags)
- `cses/` — Competitive programming solutions organized by category

Content is read from the filesystem via `src/lib/mdx.ts` (posts) and `src/lib/cses.ts` (CSES solutions). Blog posts are rendered with `next-mdx-remote/rsc`. Dynamic routes use `generateStaticParams()`.

Site-wide constants (email, socials, handle) live in `src/lib/site.ts`.

## Design system — EMULSION

The visual identity is "light exposed onto grainy film": one WebGL2 shader field, one colormap, two surfaces, one accent, a pixel-glyph cat mark. Keep it that disciplined.

### Engine (`src/lib/emulsion/`)
- `shaders.ts` — GLSL ES 3.00 fragment shader: domain-warped fbm ↔ seeded "sheet" composition → heat → dither (Bayer 8×8 default; stipple/halftone/IGN available) → N-level quantise → LUT → film grain → vignette → develop reveal. Also pointer heat, a "dark zone" rect for headline legibility, and an object-texture slot.
- `lut.ts` — palette stops (warm: near-black → indigo → violet → pink → cream; cool: moss → chartreuse → cream, blended in rarely by a mask field), UI tokens, `seedFromString`.
- `renderer.ts` — `EmulsionRenderer` (raw WebGL2, no three.js), `FieldParams`, `DEFAULT_PARAMS` (user-approved), `HERO_PARAMS`, `POSTER_PARAMS`, `BACKDROP_PARAMS`, `renderPoster()` (shared offscreen renderer, cached PNG data URLs).

### Components (`src/components/emulsion/`)
- `EmulsionField` — live field. DPR cap + half-res integer upscale (crisp dither on any DPR), pauses offscreen, reduced-motion → static frame, no-WebGL2 → CSS gradient + SVG grain fallback. Use only for heroes/ornaments, never as a page-wide backdrop under lists.
- `Poster` — seeded static poster (`seed` = slug/title). Renders at exactly the element's device size ÷ `chunk` (integer) so the Bayer pattern never moirés. Every card gets one; posts and projects share the same shader.
- `Develop` — reveal primitive: content resolves out of grain via stepped CSS mask frames (imperative, no per-frame React renders). Use it instead of fade-ins.
- `CatMark` — 20×21 bitmap pixel cat (`solid` + `wink` hover). Nav brand, favicon (`src/app/icon.svg`, transparent, dark-mode aware; regenerate with `bun run scripts/favicon.ts`), footer/OG ornament. Never the subject.
- `Ornament` — the mark pushed through the field (footer band, OG image).

### Surfaces & tokens (`src/app/globals.css`, `tailwind.config.ts`)
- Two surfaces: `surface-ink` (#0b0a0e — heroes, footer, code) and `surface-paper` (#f3efe4 — everything you read). Lists/posts/projects/adventures are paper.
- Colours: `ink`, `paper` (+ `-2`/`-3` tints), `signal` (#b7de5e — the *only* accent; links/hover on ink, never body text on paper), `indigo` (links on paper), `violet`, `pink`, `cream` (LUT colours — canvas/code only). No emerald, no zinc, no gradients in CSS.
- Type: Geist (`font-sans`) + Geist Mono (`font-mono`) via the `geist` package. Primitives: `.display` (headline), `.eyebrow` (mono label with square bullet), `.meta` (mono 11px uppercase), `.lede` (mono body).
- Primitives: `.btn-solid`/`.btn-ghost` (on ink), `.btn-ink`/`.btn-outline` (on paper), `.card`/`.card-ink`, `.chip`/`.chip-ink`, `.hairline`/`.hairline-ink`, `.link`, `.code-block` (ink code with LUT syntax colours; used by `CodeBlock` and `CodeTabs`).
- Layout: `mx-auto max-w-[1120px] px-5 sm:px-8`; page top padding `pt-36` under the fixed ivory nav pill; section header = eyebrow + display h2 (+ lede).
- Prose: `@tailwindcss/typography` configured for paper (`prose` only — never `prose-invert`).

### Path Alias

`@/*` maps to `./src/*` (configured in tsconfig.json).

### Analytics

Umami analytics script is embedded in the root layout (`src/app/layout.tsx`).
