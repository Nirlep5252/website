# Freelance Page Implementation Plan

**Goal:** Build a `/freelance` landing page with hero, services, process, pricing, and CTA sections.

**Architecture:** Single scrolling page at `src/app/freelance/page.tsx` composed of 5 client components in `src/app/freelance/components/`. All content hardcoded, no data fetching. No navbar changes — standalone page accessed via direct URL only.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 3, Framer Motion 11, lucide-react

---

## Existing Patterns Reference

Before implementing, understand these existing codebase conventions:

- **Page layout:** `<main className="min-h-screen pt-24 pb-16 px-4"><div className="max-w-6xl mx-auto">` (see `src/app/projects/page.tsx:70-71`)
- **Section spacing:** `py-32 px-4` with `max-w-6xl mx-auto` (see `src/app/components/sections/ConnectSection.tsx:42-43`)
- **Section headers:** Mono emerald label (`text-emerald-500 font-mono text-sm`) + large heading (`text-3xl md:text-4xl font-bold text-zinc-100`) (see `AboutSection.tsx:43-48`)
- **Framer Motion pattern:** `initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} viewport={{ once: true }}` (used in all sections)
- **Card borders:** `border border-zinc-800` with hover `hover:border-emerald-500/30` (see `AboutSection.tsx:100`)
- **Buttons:** Solid = `px-8 py-4 bg-zinc-100 text-zinc-900 font-medium rounded-full` / Ghost = `px-8 py-4 text-zinc-400 font-medium rounded-full border border-zinc-800` (see `HeroSection.tsx:97-108`)
- **Color system:** emerald accent `#10b981`, backgrounds `#0a0a0a`/`#111111`/`#1a1a1a`, text `zinc-100` through `zinc-700`
- **Icons:** `lucide-react` throughout
- **Motion Link pattern:** `const MotionLink = motion.create(Link)` (see `HeroSection.tsx:8`)

---

### Task 1: Create the page shell and FreelanceHero component

**Files to create:**
- `src/app/freelance/page.tsx` — Server component that imports and renders all sections. Unlike other pages, the hero handles its own padding since it's full-height, so omit `pt-24` from the main element.
- `src/app/freelance/components/FreelanceHero.tsx` — Client component matching the style of `HeroSection.tsx` but simpler (no floating particles).

**FreelanceHero requirements:**
- Full-viewport height, centered content
- Emerald glow effect behind text (same as `HeroSection.tsx:60`)
- Mono label: `// freelance` in emerald
- Large gradient heading using `hero-gradient-text` class: "Let's Build" (gradient) + "Something Together" (zinc-100), split across two lines
- Subtext: "Full-stack developer available for freelance projects — from landing pages to full-blown SaaS apps."
- Two buttons: "View My Work" (solid white, links to /projects) and "Book a Call" (ghost with Calendar icon, links to `https://calendar.app.google/SUgGEw1nzd7vvA188`, opens in new tab)
- Framer Motion fade-in/scale animations matching HeroSection patterns

**Verify:** Navigate to `http://localhost:3000/freelance` — hero should render with gradient text, buttons, and glow effect.

---

### Task 2: Create ServicesSection component

**Files to create:**
- `src/app/freelance/components/ServicesSection.tsx` — Client component

**Update:** Add import to `page.tsx`, render below hero.

**Requirements:**
- Section header: `// services` mono label + "What I Can Build For You" heading
- 6 service cards in a responsive grid (`sm:grid-cols-2 lg:grid-cols-3`)
- Each card has: a lucide icon, title (zinc-100), short description (zinc-400)
- Card styling: `border border-zinc-800 rounded-xl` with hover border going emerald and background shifting
- Icon changes color on card hover (zinc-600 → emerald-500)
- Staggered `whileInView` animations with incremental delay per card

**The 6 services:**
1. Landing Pages (Globe icon) — Single-page marketing sites, product launches, and event pages.
2. Static Websites (FileText icon) — Multi-page sites, portfolios, and documentation sites.
3. Full-Stack Web Apps (Server icon) — Interactive apps with auth, databases, and APIs.
4. SaaS Applications (Layers icon) — Subscription-based products, dashboards, and user management.
5. Custom Tools (Wrench icon) — Discord bots, CLI tools, automation scripts, and internal tools.
6. Consulting (MessageSquare icon) — Architecture reviews, tech stack advice, and code audits.

**Verify:** Scroll past hero — 6 cards in 3-column grid with hover effects.

---

### Task 3: Create ProcessSection component

**Files to create:**
- `src/app/freelance/components/ProcessSection.tsx` — Client component

**Update:** Add import to `page.tsx`, render below services.

**Requirements:**
- Section header: `// process` mono label + "How It Works" heading
- 4 numbered steps in a vertical list with border separators (`border-b border-zinc-800`)
- Each step: large mono number in emerald (matching the 01/02/03 pattern from `AboutSection.tsx:102-103`) + title (zinc-100) + description (zinc-400)
- Subtle vertical connecting line on desktop (`hidden md:block`)
- Staggered `whileInView` animations

**The 4 steps:**
1. **01 — Discovery:** "Tell me about your project — what you need, your timeline, and your budget. We'll hop on a quick call or chat over email."
2. **02 — Proposal:** "I'll put together a clear scope, timeline, and quote. No surprises — you'll know exactly what you're getting."
3. **03 — Build:** "I get to work. You'll get regular updates and can give feedback along the way."
4. **04 — Deliver:** "Final product, deployed and handed off. I'll make sure everything runs smoothly."

**Verify:** 4 numbered steps in a clean vertical list with emerald numbers and border separators.

---

### Task 4: Create PricingSection component

**Files to create:**
- `src/app/freelance/components/PricingSection.tsx` — Client component

**Update:** Add import to `page.tsx`, render below process.

**Requirements:**
- Section header: `// pricing` mono label + "Pricing" heading
- 4 tier cards in a responsive grid (`sm:grid-cols-2 lg:grid-cols-4`)
- All cards equal styling (no highlighted/featured tier)
- Each card contains: tier name (zinc-100 bold), price in emerald ("Starting at $X"), short description (zinc-500), bullet list with Check icons (emerald), and a "Get Started" button that links to `#contact`
- Card styling matches existing pattern: `border border-zinc-800 rounded-xl` with emerald hover
- Cards use `flex flex-col` so the "Get Started" button stays at the bottom regardless of content height
- Staggered `whileInView` animations

**The 4 tiers:**
1. **Landing Page** — Starting at $200 — "Perfect for product launches and marketing campaigns." — Features: Single page design & development, Mobile responsive, Contact form or CTA integration, Fast turnaround (~1 week)
2. **Static Website** — Starting at $500 — "For businesses that need a complete web presence." — Features: Multi-page site (up to 5 pages), Mobile responsive, SEO basics, CMS integration optional, Delivery in ~2 weeks
3. **Full-Stack App** — Starting at $1,500 — "Custom web applications with full backend support." — Features: Custom web application, Auth/database/APIs, Admin dashboard, Deployment & hosting setup, Delivery in ~4–6 weeks
4. **Enterprise / Custom** — Starting at $3,000 — "Complex projects requiring scalable solutions." — Features: SaaS/complex apps/custom tools, Scalable architecture, Third-party integrations, Ongoing support available, Timeline scoped per project

**Verify:** 4 pricing cards in a row on desktop, 2x2 on tablet, stacked on mobile. "Get Started" scrolls to CTA.

---

### Task 5: Create CTASection component and finalize page

**Files to create:**
- `src/app/freelance/components/CTASection.tsx` — Client component

**Update:** Add import to `page.tsx` as the final section.

**Requirements:**
- Section has `id="contact"` so pricing "Get Started" buttons can scroll to it
- Subtle emerald/cyan glow effect behind content (similar to hero but smaller)
- Section header: `// contact` mono label + "Ready to Get Started?" heading + "Have a project in mind? Let's talk about it." subtext
- Two buttons side by side, centered:
  - "Book a Call" (solid **emerald** button, not white — this is the primary CTA) with Calendar icon → `https://calendar.app.google/SUgGEw1nzd7vvA188` (new tab)
  - "Send an Email" (ghost button) with Mail icon → `mailto:hello@nirlep.dev`
- Below buttons: small muted link "Or check out my previous work →" linking to /projects
- Centered layout with generous vertical padding
- Framer Motion fade-in animations

**Full page verification checklist:**
1. Hero loads with gradient text, subtext, two buttons
2. Scrolling reveals services grid (6 cards, 3 columns on desktop)
3. Process section shows 4 numbered steps
4. Pricing shows 4 tier cards with features and "Get Started" buttons
5. CTA section at bottom with emerald "Book a Call" and ghost "Send an Email"
6. "Get Started" buttons in pricing cards scroll to the CTA section
7. All animations trigger on scroll (whileInView)
8. Page is mobile responsive (cards stack, text scales)
9. Hover effects work on all cards and buttons
10. External links (Calendar, email) work correctly

---

## Summary

| Task | Component | New Files |
|------|-----------|-----------|
| 1 | Page shell + FreelanceHero | `page.tsx`, `FreelanceHero.tsx` |
| 2 | ServicesSection | `ServicesSection.tsx` |
| 3 | ProcessSection | `ProcessSection.tsx` |
| 4 | PricingSection | `PricingSection.tsx` |
| 5 | CTASection + final assembly | `CTASection.tsx` |

Total: 6 new files, 0 modified existing files.

## Contact Details

- Email: hello@nirlep.dev
- Booking: https://calendar.app.google/SUgGEw1nzd7vvA188
- Projects link: /projects
