# Amplio Systems — Design System

**Automate the mundane. Amplify what matters.**

Amplio Systems Ltd is an AI automation agency for small service businesses — life coaches,
chiropractors, consultants, practitioners. *Amplio* is Latin for "to enlarge, extend, multiply".
The company systemises the mundane, energy-draining tasks in a small practice so the owner can
get back to the work only they can do.

The brand's whole job is to feel **unlike** a typical AI agency: organic rather than mechanical,
expansion rather than acceleration, human-first, integrity-led, simple. Every decision in this
system ladders back to that.

- **Audience:** owner-operators of small service practices. Their time *is* the product, so admin
  is the most expensive thing in the business.
- **Promise:** "We systemize the mundane tasks that drain energy, creating room for our clients to
  focus on creativity, growth, and what truly matters in their business."
- **Clients should feel:** reassured · confident · inspired · relaxed.
- **Core values, in priority order:** 01 Integrity · 02 Simplicity · 03 Brave · 04 Fun.
  When two pull against each other, the higher one wins.

---

## Sources this system was built from

| Source | What it gave us | Access |
|---|---|---|
| `uploads/amplio_systems_brand_brief.pdf` | Strategy, audience, values, colour and type direction, competitor no-go list | Supplied by the client |
| `uploads/amplio_systems_brand_guidelines.pdf` (v1.0, July 2026) | The **approved** colour palette with hex/RGB/CMYK, logo rules, clear space, minimum sizes, voice | Supplied by the client |
| `uploads/Amplio Systems Ltd logo.png` | The real primary lockup — the source of truth for the mark and wordmark | Supplied by the client |
| `uploads/Amplio Systems Ltd logo favicon.png` | The standalone ripple mark | Supplied by the client |
| https://github.com/cjsohal/Amplio-systems | **Empty — no commits on any branch.** Nothing could be read from it. | Public repo; explore it yourself if it has since been populated |
| https://ampliosystemsltd.com/ | Live site, still running theme **placeholder** copy. Not used as a design source. | Public |
| `Amplio-systems/` mounted folder | Attached but listed **zero files**. | — |

> **Read this before extending the system.** Because the repository and the live site contained
> no product design, everything below the token layer is a *construction from the brand
> foundations*, not a recreation of an existing product. The colour palette, type direction, logo
> rules and voice are the client's approved values and should be treated as fixed. Layout,
> components and the website kit are proposals — good ones, consistent with the brief, but not
> yet blessed by the client. **If the repository is later populated, explore
> https://github.com/cjsohal/Amplio-systems and re-derive the UI kit from real code rather than
> from this file.**

---

## Content fundamentals

### Voice, in the brand's own words
- **Conversational, not salesy** — like a trusted advisor, not a pitch.
- **Clear and jargon-free** — simplicity in language matches simplicity in values.
- **Encouraging and optimistic** — focused on possibility, not problems.
- **Honest and direct** — no hype, no empty promises.

### Approved key messages (use verbatim where you can)
- "We handle the tedious so you can focus on the meaningful."
- "Automation that feels human."
- "More time for what matters."
- "Simple systems, powerful results."

### Mechanics
| Question | Answer |
|---|---|
| **I or you?** | **We** for Amplio, **you** for the reader. Never "our clients" when talking *to* a client. |
| **Casing** | Sentence case everywhere — headings, buttons, labels, nav. Title Case only in the wordmark and legal names. UPPERCASE only in the wide-tracked eyebrow device. |
| **Punctuation** | Headlines take no full stop. Em dashes are allowed but sparingly; the brand's rhythm comes from short sentences, not dashes. Serial commas, British spelling ("systemise", "colour"). |
| **Emoji** | **Never.** Not in UI, not in marketing, not in email. The warmth comes from the writing and the ripple mark. |
| **Exclamation marks** | Effectively never. Calm confidence, not enthusiasm. |
| **Numbers** | Only real, attributable ones, and always say what they cover ("Average admin time returned per week across our first cohort"). No invented percentages, no "10x". |
| **Jargon** | No "leverage", "synergy", "AI-powered", "seamless", "revolutionary", "game-changer", "unlock your potential". Say the actual thing: "invoices that chase themselves". |
| **Pressure tactics** | Banned. No countdowns, no "limited spots", no "don't miss out". Invitations only: "Let's find the hour you've been losing every day." |
| **Naming the reader's problem** | Name it plainly and without judgement: "the check-in you meant to send three weeks ago". Never imply they are disorganised. |

### Voice in practice — the same idea, three ways
| Context | Copy |
|---|---|
| Headline | *Systems that quietly hold your business together* |
| Feature card | *Invoices that chase themselves — sent on time, followed up politely, reconciled quietly.* |
| Error state | *We couldn't reach your calendar. Reconnect it and we'll pick up where we left off.* (the system takes the blame, never the reader) |

### Vibe, in one line
A trusted, slightly understated advisor with good taste — Scandinavian calm with warm organic
edges. Confident enough not to shout.

---

## Visual foundations

### Colour
Green leads; **every other colour supports it**. The approved palette is eight values
(`tokens/colors.css`); the scales around them are derived for UI states and are explicitly
labelled as such — never present a derived value to the client as a brand colour.

| Role | Value |
|---|---|
| Amplio Green — primary, sampled from the logo | `#6FA84A` |
| Deep Fern — shade, hover and depth | `#45732C` |
| Sage Mist — tint, soft fills | `#DCEACB` |
| Terracotta Bloom — organic complement | `#C97C56` |
| Calm Sky — secondary accent, sparingly | `#5BA9D6` |
| Warm Cream — backgrounds | `#FAF7F0` |
| Charcoal — body text | `#55534C` |
| Ink — headings, never pure black | `#2B2A27` |

There is no black and no pure white background in the system: pages sit on Warm Cream, cards on
white. `--clay-600` (`#A8412F`) is the **only** derived red, reserved for destructive states.

### Backgrounds and imagery
Backgrounds are flat colour — Warm Cream, white, Sage Mist, or Ink. **Gradients are restricted by
the guidelines to hero sections and special graphics** (`--gradient-hero`), and every asset must
also work as flat colour. There are no repeating patterns, no textures, no grain, no circuit
motifs (explicitly banned by the brief), no robot or AI imagery.

The one recurring background device is the **ripple motif**: the logo mark itself, oversized,
bled off a corner at 12–16% opacity. Use it on heroes and CTA banners, never behind body copy.

No photography or video was supplied. Where the new site's brief calls for a video hero, the kit
carries a **labelled empty media slot** rather than a stand-in — do the same rather than
substituting stock imagery. When real imagery arrives it should read warm and natural: daylight,
soft contrast, real practitioners in real rooms. Never cool-blue tech photography, never
black-and-white, never heavy grain.

### Type
- **Display / wordmark:** `--font-display` → **Marcellus**, one weight (400).
- **Body / UI:** `--font-body` → **Lato** (300/400/700/900 + italic), exactly as specified.
- Display type never runs below 20px; anything a user reads in order to *do* something is Lato.
- The **eyebrow** — 11px Lato Bold, uppercase, `letter-spacing: 0.22em` — is the single most
  recognisable typographic device in the system. Almost every section opens with one.
- Body copy is capped at `--measure` (68ch) and set at `--leading-relaxed` (1.65).

> **Font substitution — flagged.** The supplied wordmark is set in **Optima** (Hermann Zapf, 1958),
> a flared humanist sans. Optima is a paid Linotype licence and has no true open equivalent, so
> the system ships **Marcellus** — classical Roman-inscriptional letterforms with flared strokes,
> the closest freely-licensed match in spirit. The brand guidelines document instead recommended
> Palatino/Cormorant Garamond; the client directed us to match the actual logo, so the flared
> humanist direction wins. Marcellus has only one weight — never faux-bold it.
> **If Amplio licenses Optima (or another flared humanist sans), send us the files and we will
> swap `--font-display` in one place.** Both families, web and desktop, are in `assets/fonts/`.

### Space and layout
4px base scale. The brief asks for "spacious, breathing layouts that embody making room", so
section rhythm is deliberately generous: `--section-y` is **128px**, tight sections 80px.
Content maxes out at `--container-xl` (1280px) with 32px page gutters. The header is the only
fixed element — sticky, transparent until scroll, then Warm Cream at 88% with a 14px backdrop
blur and a hairline bottom border.

### Corners, borders, shadows
Nothing is a hard 0px corner except full-bleed media edges — "Organic > Geometric, Flowing >
Angular". Buttons and badges are fully round (`--radius-pill`); cards 16px; fields 10px;
checkboxes 4px (the one square-ish family). `--radius-leaf` is the asymmetric petal corner used
on 46–52px icon tiles.

Borders are 1px, warm neutral, and used *instead of* shadow rather than with it. Shadows are
warm and ink-tinted (`rgba(43,42,39,·)`), never black, never hard: a default card is
`--shadow-md` with no border. Don't nest shadows — a card inside a card switches to
`outlined` or `sage`. The logo never takes a shadow.

Transparency and blur are used in exactly two places: the sticky header (cream at 88% + blur) and
the dialog scrim (ink at 64% + blur). Media overlays use `--gradient-scrim` for text
protection; there are no frosted "glass cards".

### Motion, hover, press, focus
Calm confidence with subtle dynamism. Everything eases **out**; nothing bounces, springs or
overshoots. Durations: 140ms controls, 220ms surfaces, 700ms reveals.

| State | Treatment |
|---|---|
| Hover, filled | Darkens one step (`--green-600`) and lifts `translateY(-2px)` with `--shadow-brand` |
| Hover, outlined / ghost | Fills with the lightest tint (`--green-50` / `--alpha-ink-04`); border darkens to Amplio Green |
| Press | Settles to `scale(0.985)` and the darkest step (`--deep-fern`); shadow drops. Never grows. |
| Focus | 2px Amplio Green outline at 2px offset; fields also take a 3px green glow ring |
| Disabled | Flat `--neutral-200` on `--neutral-400` — greyed, never faded-green |
| Entrances | Fade + 12px rise on `--ease-entrance` |
| Tooltips | Opacity only |

`prefers-reduced-motion` is honoured globally in `tokens/base.css`.

---

## Iconography

- **Set:** [Lucide](https://lucide.dev) (ISC licence), 49 glyphs vendored into
  `assets/icons/` — 24×24 viewBox, single 2px stroke, round caps and joins, never filled.
- **Substitution — flagged.** The sources contain **no icon set of Amplio's own**. Lucide was
  chosen because its round-capped humanist strokes read warm rather than mechanical, which is what
  the brief asks for. If a bespoke set is commissioned, replace the folder and the `Icon`
  component keeps working unchanged.
- **Colour:** always `currentColor`. The `Icon` component paints glyphs with a CSS mask so they
  inherit text colour — never hard-code an icon colour, never recolour the SVG files.
- **Sizes:** 16 inline · 18–20 in buttons and fields · 24 default · 32–40 as feature marks.
- **Feature marks** sit in a 46–52px `--radius-leaf` tile: Sage Mist fill with Deep Fern glyph on
  light surfaces, `--alpha-cream-12` with cream glyph on dark.
- **Never** mix a second icon family into one view. **Never** use emoji as an icon. **Never** use
  a Unicode character (→, ✓, ★) where a glyph exists — use `arrow-right`, `check`, `star`.
- **Never** hand-roll an SVG for a brand shape. The only brand artwork is the supplied logo and
  its mechanical recolours in `assets/`.

### Logo assets
**SVG is the master format.** The client supplied a vector lockup (`uploads/Logo.svg`,
viewBox 2835×1154, two shape groups: `.cls-1` the mark, `.cls-2` the wordmark). The source
carried no fills, so brand colours were applied via a `<style>` block and the mark and wordmark
were split into their own files by retargeting the viewBox to each group's measured bounds — no
geometry was redrawn or edited.

Vector set: `logo-lockup.svg` (+ `-light`, `-ink`), `wordmark.svg`,
`mark.svg` (+ `-light`, `-ink`, `-cream`). The matching `.png` files are retained for HTML email,
which cannot rely on SVG. The `Logo` component now serves SVG for every Amplio variant.

**Wordmark colour — decided.** The supplied artwork filled the wordmark with `#4D4E4F`, a *cool*
grey that appears nowhere in the palette. At the client's discretion the primary lockup now uses
brand **Ink `#2B2A27`** instead: it keeps the system to its eight approved colours, and a cool grey
sitting on Warm Cream worked against the warmth the brand is built on. The shift between two dark
neutrals is small in use. The as-supplied version is preserved as
`assets/logo-lockup-artwork-grey.svg` if it is ever needed for matching legacy material.

The `.png` fallbacks have been **re-rendered from the corrected vectors**, so both formats now
carry the Ink wordmark and match exactly. Lockups render at 1600px wide, the wordmark at 1000px,
the mark at 640px — ample for email and for any raster-only context.

An **EPS** version exists client-side but would not upload; add it to `assets/` for print
suppliers when it can be transferred.
The **Atlas sub-brand** lockup (a pin containing a home and pathway rings, alongside an "Atlas"
wordmark) was supplied separately as `uploads/Amplio Atlas logo.png`. It was background-keyed,
trimmed and recoloured mechanically into `assets/atlas-logo.png` (+ `-light`, `-ink`) and is
available as `Logo` variants `atlas-colour` / `atlas-light` / `atlas-ink`. Atlas is a product
of Amplio Systems: its lockup belongs on Atlas surfaces only, never as a substitute for the
Amplio logo in a site header or footer.

The **Atlas sub-brand remains raster only** — a vector master for it is now the highest-value
missing asset.

---

## Index

### Root
| File | What it is |
|---|---|
| `styles.css` | **The one file consumers link.** `@import` lines only. |
| `readme.md` | This document. |
| `SKILL.md` | Agent-Skills front matter, for using this system in Claude Code. |
| `thumbnail.html` | Homepage tile for the system. |
| `github.md` | Source-repository association and last-sync record. |
| `research/brand-source-text.md` | Full extracted text of both supplied brand PDFs. |

### `tokens/` — 219 custom properties
`colors.css` · `typography.css` · `spacing.css` · `radius.css` · `elevation.css` ·
`motion.css` · `semantic.css` (aliases — reach for these in product code) · `base.css` (element resets)

### `assets/`
`logo-lockup*.png`, `wordmark.png`, `mark*.png` · `icons/` (49 Lucide SVGs + README) ·
`fonts/` (self-hosted woff2 + `fonts.css`) · `fonts/desktop/` (**Marcellus and Lato TTFs with
their OFL licences — download these for Word, Canva, Figma and print**)

### `components/` — 24 components in 5 groups

**`core/`** — `Button` · `IconButton` · `Icon` · `Logo` · `Badge` · `Tag` · `Card`

**`forms/`** — `Input` · `Textarea` · `Select` · `Checkbox` · `Radio` (+ `RadioGroup`) · `Switch`

**`feedback/`** — `Alert` · `Tooltip` · `Dialog`

**`navigation/`** — `Tabs` · `Accordion`

**`marketing/`** — `Eyebrow` · `SectionHeading` · `FeatureCard` · `StatBlock` · `Testimonial` · `CTABanner`

Each component directory holds `<Name>.jsx`, `<Name>.d.ts` (props contract) and
`<Name>.prompt.md` (what & when, a usage example, variants), plus one `*.card.html` specimen.

**Intentional additions.** No source defined a component inventory, so the standard set above was
authored from scratch. Two groups go beyond a generic library and are called out deliberately:
the `marketing/` group (`Eyebrow`, `SectionHeading`, `FeatureCard`, `StatBlock`,
`Testimonial`, `CTABanner`) exists because the brand's primary surface is a marketing site and
its signature devices are typographic; and `Icon` / `Logo` exist as wrappers so that glyph
lookup and approved-logo-variant enforcement live in one place. Deliberately **not** built, for
want of a source: Toast, Avatar, Breadcrumb, Table, Pagination, DatePicker, Menu.

### `guidelines/` — 27 foundation specimen cards
Grouped in the Design System tab as **Brand** (6), **Colors** (8), **Type** (6), **Spacing** (7).

### `ui_kits/website/` — marketing website
Four click-through screens (home, services, about, contact) composed entirely from the components
above. See `ui_kits/website/README.md` for the fidelity caveat and the list of working
interactions.

---

## Known gaps — what we need from the client

1. **A vector master for the Atlas sub-brand.** The Amplio lockup is now vector; Atlas is not. Also the Amplio **EPS**, which failed to upload.
2. **Font licence decision** — confirm Marcellus, or supply Optima / another flared humanist sans.
3. **Photography and hero video.** Nothing was supplied; the kit leaves labelled empty slots.
4. **Real testimonials and real numbers.** Every quote and statistic in the kit is illustrative
   placeholder and must be replaced before anything ships.
5. **Product surfaces.** If Amplio builds a client portal or dashboard, that is a second UI kit;
   nothing in the sources describes one.
