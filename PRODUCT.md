# Product

## Register

brand

## Users

The site is **nirlep.dev**, the personal portfolio and blog of Nirlep Gohil, a full-stack developer and competitive programmer (GitHub `nirlep5252`, X `@nirlep_5252_`).

Who lands here, and why:
- **Fellow developers & the open-source community** — arriving from GitHub, X, or a shared blog link. They want to read posts, browse projects, and see how Nirlep thinks.
- **Recruiters & hiring managers** — scanning for credibility and signal. They need to grasp competence quickly and walk away with a clear, favorable impression.
- **Potential freelance clients** — landing on `/freelance`. They want proof of skill and an easy way to start a conversation.
- **Curious visitors & friends** — there for the experience. They should smile, poke around, and want to show someone.

Across all of them the job is the same: *understand who Nirlep is, enjoy the visit, explore the work (projects, writing, CSES solutions), and have an obvious path to follow or reach out.*

## Product Purpose

A personal portfolio + blog that doubles as a piece of self-expression. It exists to make Nirlep's personality unmistakable while showcasing his work: projects, blog posts, CSES competitive-programming solutions, and freelance services.

The redesign's organizing idea: **Nirlep is an extreme cat lover, so a signature cat character is the face of the brand** — a mascot that recurs and reacts across the site (watches the cursor, naps in empty states, shows up in 404s and loading). Personality is *felt through a character*, not bolted on as decoration.

Primary goal is **personal expression**: memorable beats safe. Success is a visitor who remembers the site, comes away certain that Nirlep is both fun and genuinely good at what he builds, and finds it easy to explore further or get in touch.

## Brand Personality

Playful, witty, cozy, warm — with real craft underneath. Think a friend who's sharp at their job and doesn't take themselves too seriously.

- **Voice:** friendly and a little cheeky. Cat-flavored copy is welcome (puns, the occasional purr) but it never costs clarity. A heading still tells you what the section is.
- **Face:** one signature cat mascot is the brand. It has a consistent character and reacts to the visitor. It earns its presence in the moments that are usually dead (empty states, errors, loading) rather than sitting as a static logo.
- **Tone balance:** clearly cat-themed yet sharp. Charm and authority coexist; the cuteness reads as deliberate and well-made, never amateur.
- **Emotional goals:** delight, warmth, and quiet confidence. The takeaway feeling: "this person is fun *and* good."

## Anti-references

- **Generic dark developer portfolio** — the current site: near-black background, emerald/cyan neon glow, floating particles, animated gradient hero text. This is the thing the redesign is explicitly escaping. Do not reach back for it.
- **Corporate / sterile SaaS template** — soulless, personality-free, could be anyone's. No hero-metric grids, no identical icon-card rows.
- **Childish clip-art kitsch** — Comic Sans energy, cheap cartoon-cat stickers, sticker-bomb layouts, hand-drawn "doodle"/sketchy SVG. Cute but amateur. The cat must read as *crafted*, not clip-art.
- **Editorial-magazine reflex** — display-serif + italic + drop caps + broadsheet grid. A saturated AI lane and the wrong register for this brand.

## Design Principles

1. **Character carries the brand.** The signature cat is the throughline. Personality is delivered through one consistent, reactive character, not scattered cat imagery. If a touch doesn't strengthen the character or the mood around it, cut it.
2. **Charm never costs clarity.** Playful and cozy, but every post stays readable and every project scannable. When delight and legibility conflict, legibility wins. The theme serves the content.
3. **Crafted, not clip-art.** Cuteness comes from precise typography, cohesive illustration, and well-tuned motion — never cheap stickers or doodles. Delight is a product of craft.
4. **Reward exploration.** Micro-interactions, easter eggs, and small surprises pay off the curious. The site should make someone smile and want to show a friend, without gating the basics behind discovery.
5. **Unmistakably mine.** Memorable over conventional. The end result should feel like Nirlep specifically, never like a theme dropped on a template.

## Accessibility & Inclusion

Baseline target (motion-forward design makes these load-bearing):
- **WCAG AA contrast** — body text ≥4.5:1, large text ≥3:1, including placeholder and muted copy on tinted backgrounds.
- **Reduced motion** — every playful animation (mascot reactions, reveals, hovers) has a `prefers-reduced-motion: reduce` alternative (crossfade or instant). Content is never gated behind a class-triggered transition.
- **Keyboard & screen reader** — everything focusable and operable by keyboard; meaningful alt text and labels; the mascot is decorative/`aria-hidden` so it never adds screen-reader noise.
- **Not hue-alone** — meaning is paired with text, icon, or shape, not carried by color alone.
