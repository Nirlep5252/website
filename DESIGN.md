---
name: nirlep.dev
description: Personal portfolio of Nirlep Gohil — a cozy cat café for a developer's work and writing.
colors:
  ginger: "oklch(0.70 0.16 58)"
  ginger-deep: "oklch(0.56 0.16 50)"
  ginger-soft: "oklch(0.95 0.035 65)"
  herb: "oklch(0.55 0.13 140)"
  herb-deep: "oklch(0.46 0.12 142)"
  herb-soft: "oklch(0.95 0.03 140)"
  ink: "oklch(0.26 0.03 55)"
  ink-strong: "oklch(0.20 0.03 50)"
  muted: "oklch(0.50 0.025 55)"
  faint: "oklch(0.64 0.02 58)"
  bg: "oklch(1 0 0)"
  surface: "oklch(0.975 0.012 70)"
  surface-warm: "oklch(0.955 0.022 68)"
  border: "oklch(0.91 0.012 65)"
  border-strong: "oklch(0.84 0.02 62)"
typography:
  display:
    fontFamily: "Kreon, Georgia, serif"
    fontSize: "clamp(2.75rem, 6vw, 5.5rem)"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Kreon, Georgia, serif"
    fontSize: "clamp(2rem, 4vw, 3rem)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.015em"
  title:
    fontFamily: "Kreon, Georgia, serif"
    fontSize: "clamp(1.25rem, 2vw, 1.5rem)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "0"
  label:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "0.01em"
  code:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0"
rounded:
  sm: "8px"
  md: "14px"
  lg: "18px"
  pill: "999px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "20px"
  lg: "32px"
  xl: "56px"
  xxl: "96px"
components:
  button-primary:
    backgroundColor: "{colors.ginger-deep}"
    textColor: "{colors.bg}"
    rounded: "{rounded.pill}"
    padding: "14px 28px"
  button-primary-hover:
    backgroundColor: "{colors.ink-strong}"
    textColor: "{colors.bg}"
  button-secondary:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "14px 28px"
  link:
    textColor: "{colors.herb-deep}"
  chip:
    backgroundColor: "{colors.herb-soft}"
    textColor: "{colors.herb-deep}"
    rounded: "{rounded.pill}"
    padding: "4px 12px"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "24px"
  input:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "12px 16px"
---

# Design System: nirlep.dev

## 1. Overview

**Creative North Star: "The Cozy Cat Café"**

nirlep.dev is a warm little café that happens to love cats and code. You're welcomed in, handed something warm, and invited to stay a while: read a post, browse some work, watch the resident ginger cat stretch and blink at you from the corner. The personality is playful and witty with a soft, social warmth, and underneath it all is real craft. A café you trust is not sloppy; the espresso is dialed in even though the room is cozy.

The whole system grows from one feline character. A signature ginger cat is the face of the brand: it watches the cursor, naps in empty states, and pads into 404s and loading moments. Warmth is carried by that character, by a burnt-ginger primary, by a deep warm-brown ink, and by friendly rounded type, never by a tinted "cream" background. The reading surface is honest white so that long posts and code stay crisp; the coziness lives in the brand colors, the soft corners, and the cat.

This system explicitly rejects the look it replaces and its neighbors. No near-black background with emerald/cyan neon glow, floating particles, or animated gradient hero text (the old "generic dark developer portfolio"). No soulless, personality-free SaaS template that could belong to anyone. No childish clip-art: cheap cartoon-cat stickers, Comic Sans energy, or hand-drawn "doodle" SVGs. And no cold editorial-magazine costume (high-contrast Didone display, italic drop caps, broadsheet rules). The cat must always read as crafted, not cute-by-accident.

**Key Characteristics:**
- Warm, light, and unmistakably feline: ginger leads, herb-green answers, on honest white.
- One reactive mascot carries the personality; cat references are concentrated in the character, not sprinkled everywhere.
- Soft corners, gentle warm shadows, generous rhythm. Friendly, never childish.
- Charm never costs clarity: posts stay at 4.5:1+ contrast and 65–75ch line length.
- Delight rewards the curious (hover reactions, empty-state naps, hidden moments) without gating the basics.

## 2. Colors

A toasty, light palette: a burnt-ginger cat warming itself next to a leafy green plant, on a clean white wall. Ginger is the brand; herb-green is its companion; every neutral leans a few degrees warm so white never reads clinical.

### Primary
- **Ginger** (`oklch(0.70 0.16 58)`): the cat, the brand. Used for the mascot, key highlights, focus glows, active states, and decorative warmth. This is the recognizable "nirlep orange." It is a *fill and accent* color, not a text-on-white color (too light to read as text).
- **Burnt Ginger** (`oklch(0.56 0.16 50)`): the deeper, text-safe ginger. Used for primary button fills (with white text), ginger text on white, and any place ginger must carry or sit behind small type.
- **Ginger Soft** (`oklch(0.95 0.035 65)`): a pale ginger wash for selection highlight, ginger-tinted callouts, and warm hover beds.

### Secondary
- **Herb** (`oklch(0.55 0.13 140)`): leafy green, the plant on the café table. The companion accent for tags, badges, success/positive states, and decorative rules. White text reads on it only at large/bold sizes; for small type on a green fill, use Herb Deep.
- **Herb Deep** (`oklch(0.46 0.12 142)`): the link color. Deep enough to clear 4.5:1 on white. Used for inline links and green text that must be readable.
- **Herb Soft** (`oklch(0.95 0.03 140)`): pale green wash for chip backgrounds and quiet positive surfaces.

### Neutral
- **Ink** (`oklch(0.26 0.03 55)`): body text. A deep warm brown, not black, so the page feels lit by a lamp rather than a fluorescent tube. ~13:1 on white.
- **Ink Strong** (`oklch(0.20 0.03 50)`): display headings and the primary-button hover fill. The darkest warm brown.
- **Muted** (`oklch(0.50 0.025 55)`): secondary text, captions, metadata. ~4.8:1 on white, so it stays body-legible.
- **Faint** (`oklch(0.64 0.02 58)`): the quietest labels and decorative text only. Never body copy; it does not clear 4.5:1.
- **Background** (`oklch(1 0 0)`): pure white. The reading wall. Honest and crisp.
- **Surface** (`oklch(0.975 0.012 70)`): the faintly-warm panel for cards and sections, one half-step off the wall.
- **Surface Warm** (`oklch(0.955 0.022 68)`): the cozy wash for feature sections and the hero bed. The warmest neutral, clearly the brand's own ginger tint, used in bands, not as the global background.
- **Border** (`oklch(0.91 0.012 65)`): hairline dividers and quiet card edges.
- **Border Strong** (`oklch(0.84 0.02 62)`): hover borders and the base for focus rings.

### Named Rules
**The Honest-Wall Rule.** The page background is pure white (`oklch(1 0 0)`), never a warm-cream tint. Warmth is the cat's job, not the wall's. Cream, sand, parchment, beige body backgrounds are forbidden; they are the 2026 AI tell.

**The White-on-Warm Rule.** Text sitting on any saturated ginger or herb fill is white (or `bg`), never dark. Saturated warm colors read brighter than their luminance (Helmholtz-Kohlrausch), so dark text on them looks muddy. Dark text is allowed only on the pale `*-soft` washes.

**The One Cat Rule.** Ginger is concentrated: the mascot and a small set of brand moments. It should never blanket the screen. Its warmth works because it is the thing your eye goes to.

## 3. Typography

**Display Font:** Kreon (with Georgia, serif fallback)
**Body Font:** Hanken Grotesk (with system-ui, sans-serif fallback)
**Code Font:** JetBrains Mono (with ui-monospace, monospace fallback)

**Character:** Kreon is a rounded slab serif: it reads like the hand-painted sign over a café door, warm and friendly with enough weight to feel substantial. Hanken Grotesk is a humanist sans, soft and highly legible, the comfortable voice for body and UI. The pairing contrasts on a real axis (rounded slab serif vs. humanist sans), so it reads as a deliberate duet, not two similar fonts competing. JetBrains Mono earns its place: this is a developer's site with real code in posts and CSES solutions, so mono is functional, not costume.

### Hierarchy
- **Display** (Kreon 700, `clamp(2.75rem, 6vw, 5.5rem)`, line-height 1.02, letter-spacing -0.02em): hero headline and page titles. `text-wrap: balance`. Caps at 5.5rem; this brand smiles, it does not shout.
- **Headline** (Kreon 600, `clamp(2rem, 4vw, 3rem)`, line-height 1.1, -0.015em): section headings.
- **Title** (Kreon 600, `clamp(1.25rem, 2vw, 1.5rem)`, line-height 1.2): card and post titles.
- **Body** (Hanken Grotesk 400, 1.0625rem / 17px, line-height 1.65): all prose. Max line length 65–75ch. `text-wrap: pretty` on long prose.
- **Lead** (Hanken Grotesk 400, 1.25rem, line-height 1.6): taglines and intro paragraphs.
- **Label** (Hanken Grotesk 600, 0.8125rem, letter-spacing 0.01em, sentence case): metadata, small UI labels, tags. Not all-caps tracked eyebrows.
- **Code** (JetBrains Mono 400, 0.9375rem, line-height 1.6): inline code and code blocks.

### Named Rules
**The No-Eyebrow Rule.** No tiny uppercase tracked kicker above section headings, and no `01 / 02 / 03` numbered markers as default scaffolding. Numbers appear only where a section genuinely is an ordered sequence. Sections lead with their Kreon headline.

**The Quiet-Caps Rule.** Uppercase is reserved for short labels (≤4 words) and badges. Body copy and headings are sentence case. The warmth dies in all-caps.

## 4. Elevation

This is a light, flat-by-default system with soft, warm shadows used as a *response*, not as decoration. Surfaces rest on the page with a hairline border or a faint tonal step (Surface vs. Background); they lift with a warm shadow on hover, focus, or when something is genuinely floating (the mascot, popovers, the sticky nav once scrolled). Shadows are tinted warm brown, never neutral gray, so depth feels lamplit.

### Shadow Vocabulary
- **Rest** (`box-shadow: 0 1px 2px oklch(0.40 0.03 55 / 0.05)`): barely-there grounding for resting cards. Often a hairline border instead.
- **Lift** (`box-shadow: 0 10px 28px oklch(0.40 0.03 55 / 0.10)`): hover/active elevation for cards and interactive surfaces.
- **Float** (`box-shadow: 0 18px 44px oklch(0.35 0.04 50 / 0.14)`): the mascot, popovers, dropdowns, modals; things that hover above the room.
- **Focus ring** (`box-shadow: 0 0 0 3px oklch(0.70 0.16 58 / 0.35)`): the ginger focus glow on interactive elements.

### Named Rules
**The Flat-By-Default Rule.** Surfaces are flat at rest. Shadow appears as feedback (hover, focus, drag, float), then settles back. A page full of resting drop-shadows reads as a 2014 app.

**The One-Depth-Cue Rule.** A given element uses a hairline border *or* a soft shadow, never a 1px border plus a wide drop-shadow together (the "ghost-card" tell). Pick the cue that fits the surface.

## 5. Components

### Buttons
- **Shape:** full pill (`999px`). Friendly café affordance.
- **Primary:** Burnt Ginger fill (`oklch(0.56 0.16 50)`) with white text, padding 14px 28px, Hanken Grotesk 600. The confident "order something" button.
- **Hover / Focus:** fill deepens to Ink Strong (`oklch(0.20 0.03 50)`), a gentle lift shadow, and a subtle scale (1.02) with ease-out; ginger focus ring on `:focus-visible`. Reduced-motion: color/shadow only, no scale.
- **Secondary:** white fill, Ink text, 1px Border that warms to Border Strong on hover. No shadow at rest (One-Depth-Cue).
- **Ghost / Tertiary:** no fill or border; Ink text with an animated herb-green underline on hover, for low-emphasis inline actions.

### Chips / Tags
- **Style:** pill, Herb Soft background with Herb Deep text for topic/positive tags; Ginger Soft + Burnt Ginger for "featured"/brand tags. No border.
- **State:** selected filter chips invert to a solid Herb (white text); unselected stay soft.

### Cards / Containers
- **Corner Style:** 14px (`rounded.md`); large feature containers and images may go to 18px (`rounded.lg`). Never above 18px; over-rounding reads as a tell.
- **Background:** Surface (`oklch(0.975 0.012 70)`) on the white page; Surface Warm for cozy feature beds.
- **Shadow Strategy:** Rest (or hairline border) at rest, Lift on hover. One cue, not both.
- **Border:** optional hairline Border; drop it when using a shadow.
- **Internal Padding:** 24px (`spacing.lg`-ish) default; 20px on dense cards.

### Inputs / Fields
- **Style:** white fill, 1px Border, 8px radius (`rounded.sm`), Ink text, Muted placeholder (still ≥4.5:1; never faint gray).
- **Focus:** border shifts to Ginger and the ginger focus ring appears; no layout shift.
- **Error / Disabled:** error border + helper text in a deep readable red-brown; disabled drops to Surface fill with Muted text.

### Navigation
- **Style:** transparent over the hero, settling to a white bar with a hairline bottom Border and Float-lite shadow once scrolled.
- **Typography:** Hanken Grotesk 600 links in Ink; active route in Burnt Ginger.
- **States:** hover grows a herb-green underline; active route carries a small ginger paw-dot marker.
- **Mobile:** a sheet/menu; the mascot may peek at the toggle.

### The Mascot (signature component)
- **Character:** one ginger tabby, clean and geometric (crafted vector, not a sketchy doodle), colored from Ginger with Ink features. Consistent across the site so it reads as a single character.
- **Where it appears:** idle near the hero (watches the cursor, blinks, occasional tail-flick); naps in empty states; stretches in loading; curls up in the 404; peeks at the nav toggle on mobile.
- **Motion:** small, ease-out, looping idles. Reactions are quick and warm, never frantic.
- **Accessibility:** decorative, so `aria-hidden="true"`; it never adds screen-reader noise and never conveys information by itself. All idle/reaction motion is disabled under `prefers-reduced-motion: reduce` (the cat simply rests).

## 6. Do's and Don'ts

### Do:
- **Do** keep the page background pure white (`oklch(1 0 0)`) and carry warmth through Ginger, Ink, soft shadows, rounded shapes, and the cat.
- **Do** put white text on saturated ginger/herb fills; reserve dark text for the pale `*-soft` washes.
- **Do** concentrate cat personality in the one mascot; let copy be cat-flavored but always clear.
- **Do** cap body text at 65–75ch and keep all body/placeholder text ≥4.5:1.
- **Do** use full-pill buttons, 14–18px card corners, and soft warm-brown shadows that appear on interaction.
- **Do** give every animation a `prefers-reduced-motion: reduce` fallback; the mascot rests, reveals become instant or crossfade.

### Don't:
- **Don't** rebuild the "generic dark developer portfolio": near-black background, emerald/cyan neon glow, floating particles, or animated gradient hero text. This is the anti-reference.
- **Don't** ship a soulless, personality-free SaaS template, hero-metric stat grids, or endless identical icon-cards.
- **Don't** use childish clip-art: cheap cartoon-cat stickers, Comic Sans, or hand-drawn/`feTurbulence` "doodle" SVGs. Crafted, not clip-art.
- **Don't** slip into editorial-magazine costume: high-contrast Didone display, italic drop caps, ruled broadsheet columns.
- **Don't** use a warm-cream/sand/beige body background (the 2026 AI tell), gradient text (`background-clip: text`), decorative glassmorphism, or colored side-stripe borders (`border-left > 1px`).
- **Don't** put a 1px border and a wide (≥16px) drop-shadow on the same element, round cards past 18px, or set display letter-spacing tighter than -0.04em.
- **Don't** stack a tiny uppercase tracked eyebrow or `01/02/03` marker above every section.
