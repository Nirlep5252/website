# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio and blog site (nirlep.dev) built with Next.js 15 App Router, React 19, TypeScript, and Tailwind CSS. Uses Bun as the package manager.

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
- `/` — Home page with hero, about, skills, connect sections
- `/posts` — Blog listing; `/posts/[slug]` — Individual blog post
- `/projects` — Project showcase
- `/adventures` — Adventures hub; `/adventures/cses/[category]/[problem]` — CSES solutions

### Content System

MDX files live in `src/content/`:
- `posts/` — Blog posts with YAML frontmatter (title, date, description, tags)
- `cses/` — Competitive programming solutions organized by category

Content is read from the filesystem via `src/lib/mdx.ts` (posts) and `src/lib/cses.ts` (CSES solutions). Blog posts are rendered with `next-mdx-remote/rsc`. Dynamic routes use `generateStaticParams()` for static generation.

### Component Organization

- `src/app/components/sections/` — Home page sections (HeroSection, AboutSection, etc.)
- `src/app/components/ui/` — Reusable UI primitives (CodeBlock, BlogPostCard, SkillCard, etc.)
- `src/app/components/` — App-level components (Navbar, AnimatedCursor, MDXComponents)
- `src/components/` — Shared components used across multiple pages (PostsList, AnimatedHeader, etc.)

### Server vs Client Components

Pages are async server components that fetch data. Interactive components are marked with `"use client"` — this includes animations (Framer Motion), the custom cursor, and navigation.

### Styling

Tailwind CSS with a dark-only theme. Custom design tokens defined in `tailwind.config.ts`:
- Emerald accent (`#10b981`), dark backgrounds (`#0a0a0a`, `#111111`, `#1a1a1a`)
- Fonts: Inter (sans), JetBrains Mono (mono)
- `@tailwindcss/typography` plugin for prose/MDX content styling

Global effects (dot-grid background, grain texture, glow effects, custom scrollbar) are in `src/app/globals.css`.

### Animations

Framer Motion is the animation library. Patterns used throughout:
- Staggered children with `staggerChildren` in parent variants
- `whileInView` for scroll-triggered animations
- Spring physics (`damping`, `stiffness`) for natural motion

### Path Alias

`@/*` maps to `./src/*` (configured in tsconfig.json).

### Analytics

Umami analytics script is embedded in the root layout (`src/app/layout.tsx`).
