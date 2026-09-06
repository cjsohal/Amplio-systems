# Amplio Systems — website

Marketing site for Amplio Systems Ltd, built with [Astro](https://astro.build) + React islands,
on top of the Amplio design system in [`design-system/`](design-system/). Deploys to Cloudflare
Workers (Cloudflare's Git integration now provisions static sites as a Workers project — using
`wrangler deploy` — rather than the older Pages product).

## Stack

- **Astro** (static output — ships zero JS by default)
- **React** islands for the interactive pieces only: the header dropdown/mobile nav, tabs,
  accordions, the contact/pilot forms, and the Atlas map
- **A small Cloudflare Worker** (`worker/index.js`) that serves the static build and handles the
  contact/pilot form endpoints — see [`wrangler.jsonc`](wrangler.jsonc)

## Local development

```bash
npm install
npm run dev        # Astro dev server, http://localhost:4321
npm run build      # static output to dist/
npm run preview    # serve the built output locally (Astro's own preview, no Worker)
npm run cf:dev      # build, then run the actual Worker locally via `wrangler dev` — the only
                     # way to test /api/contact and /api/pilot locally
```

`npm run dev` is fastest for day-to-day page work, but it doesn't run `worker/index.js` — calls
to `/api/contact` and `/api/pilot` will 404 (the forms handle this gracefully and still show
their success state). Use `npm run cf:dev` when you need those routes to actually respond.

## Where things live

| Path | What |
|---|---|
| `design-system/` | The design system as handed off — tokens, assets, React components, brand readme. Source of truth; imported directly (via the `@ds` alias), not retyped. |
| `public/assets/` | A served copy of `design-system/assets/` (minus the desktop TTFs, which are for design tools, not the browser). Update both if you add or change an asset. |
| `src/pages/` | One file per route, matching the table in `design-system/HANDOFF.md`. |
| `src/components/` | Site-specific components: chrome (header/footer), and page-specific pieces (services tabs, Atlas map/dashboard, forms). |
| `src/data/servicePages.js` | The shared data object behind the three AI Automation sub-pages, so they can't structurally drift apart. |
| `src/data/site.js` | Site-wide constants — currently just `BOOKING_URL`, the external booking page every "Book a discovery call" link points to. |
| `src/components/seo/` | `FaqSchema.astro` / `ServiceSchema.astro` — JSON-LD components, see "SEO and structured data" below. |
| `worker/index.js` + `wrangler.jsonc` | The Cloudflare Worker that serves the static build and the contact/pilot form endpoints — currently stubs, see below. |
| `.claude/skills/amplio-systems-design/` | A pointer so Claude Code picks up the design system as a skill in future sessions on this repo. |

## Deliberate adaptations from the handed-off design system

The design system bundle says its components should be "copied in, not rewritten." The following
are the exceptions, each small and additive:

- **`Icon`/`Logo` asset paths.** The originals resolve icon/asset URLs from a `window.AMPLIO_*`
  global, set once before first render. Astro prerenders pages in Node, where `window` doesn't
  exist, so that trick can't reach the baked HTML — exactly the case the design system's own
  `readme.md` flags as "the one place worth adapting." The defaults now point straight at
  `/assets/...`, where `public/assets/` is served.
- **`Button`, `Card`, `IconButton` hover/press.** These drive hover and press entirely through
  React `useState` + inline styles — fine for the always-hydrated design-system specimen pages,
  but it means a statically-rendered (non-hydrated) button would have no hover feedback at all,
  which is most buttons on this site by design (Astro ships zero JS by default). Each now also
  carries a stable class name (`amplio-btn--<variant>`, `amplio-card--interactive`,
  `amplio-iconbtn--<variant>`); `design-system/tokens/interactions.css` gives that class the same
  hover/press values the JS already used, so the interaction spec in `HANDOFF.md` holds with zero
  JS. The original JS behaviour is untouched and still runs identically wherever a component is
  hydrated.
- **`CTABanner` `primaryProps`.** Its primary button only took an `href`; every "Book a discovery
  call" instance also needs `target="_blank" rel="noopener noreferrer"` since it links out to the
  external booking page (`BOOKING_URL`). `primaryProps` is a plain pass-through prop spread onto
  the button for exactly that, nothing else changed.
- **`Dialog` close button.** `<IconButton icon="x" label="Close" />` had no `onClick` — the X did
  nothing. Wired to `onClose`. (The design system's `Dialog` component itself is currently unused
  on this site — it was originally used for a booking dialog, since replaced by a direct link to
  `BOOKING_URL`, see below — but the fix stands as a correction to the component itself.)
- **`Checkbox` double-toggle race.** The visible box had its own `onClick` *and* sat inside a
  `<label>`, which natively forwards clicks to the wrapped (visually hidden) `<input>`. A single
  click on the box fired both paths, and depending on render timing they could disagree and cancel
  each other out — the box specifically (not the label text) would then fail to toggle. Removed the
  redundant `onClick`; the native label-forwarding is now the only path, so a click anywhere in the
  label toggles reliably. Also added `required` (asterisk on the label, matching `Input`) since the
  pilot form's consent checkbox needed one.
- **`Tabs` overflow.** The tab row was `display: flex` with no wrap and no scroll — fine for the
  specimen pages' short labels, but `ServiceTabs` on `/ai-automation/` has four tabs with icon +
  label that don't fit a phone-width viewport, and would otherwise silently overflow the page.
  Added `overflow-x: auto` (with `-webkit-overflow-scrolling: touch`) to the tablist and
  `flex: none` + `white-space: nowrap` to each tab button, so the row scrolls horizontally instead
  — a standard mobile tab-bar pattern — rather than wrapping or squeezing labels.
- **Atlas map.** Rebuilt against the `leaflet` npm package instead of the prototype's CDN
  `<script>` + `window.L` global (same behaviour: Northampton, interaction disabled, OSM
  attribution kept). Leaflet touches `window` at import time, which breaks Astro's Node
  prerendering even for `client:visible`, so it's `client:only="react"`.
- **Worker instead of Pages Functions.** `HANDOFF.md` suggested "Cloudflare Pages Functions"
  (`functions/api/*.js`, file-based routing) for form submission — correct for the Pages product
  at the time, but Cloudflare's Git integration now provisions a **Workers** project instead
  (`wrangler deploy`), which doesn't honour that convention. `worker/index.js` + `wrangler.jsonc`
  is the direct equivalent: one script serves the static build via the `ASSETS` binding and
  handles the same three routes.
- **`client:load` over `client:visible` for Accordion/Tabs.** `client:visible` uses
  `IntersectionObserver` against `<astro-island>`, which renders `display: contents` — a couple of
  browser engines report a zero-size bounding box for that, so the observer's callback never
  fires and the component never hydrates. `client:load` sidesteps it; these components are small
  enough that the JS-cost difference isn't worth the risk of a Which-browser-dependent dead FAQ
  accordion.

## Responsive layout

Most pages lay out sections with a fixed-ratio CSS grid set inline (e.g.
`gridTemplateColumns: '0.8fr 1.2fr'`) — fine on desktop, but with nothing to make it reflow, so
every one of them would otherwise stay two- (or three-, or four-) column at phone widths. Since
most traffic here is expected to be mobile, every such grid across the site now carries a class
from a small shared set defined in `src/layouts/BaseLayout.astro`'s global `<style>` block:

- `.grid-stack-md` — collapses to one column at 820px (matches the header's own nav→burger
  breakpoint), for the section-level "text next to image/form/card" layouts.
- `.grid-stack-sm` — same, at 540px, for tighter groupings that only need to give way on an
  actual phone (form field pairs, a dashboard's internal panels) rather than a tablet.
- `.divider-cols` / `.divider-cols-inverse` — for a row of items separated by a left border
  (e.g. Atlas's "challenge" pillars); stacked to one column, the divider moves from each item's
  left edge to its top edge instead of leaving a stray vertical line. The `-inverse` variant uses
  `--border-inverse` for dark (`tone="ink"`) sections.
- `.text-center-mobile` — re-centres a paragraph that's deliberately right- or left-aligned
  against a two-column layout, which reads oddly once that layout stacks to one column.

These are `!important` because they're overriding an inline style, which otherwise wins over
anything in an external stylesheet regardless of selector — the same trick the pre-existing
`.about-hero-grid` and `.footer-grid` rules already used before this pass. A `repeat(N,1fr)` grid
of same-shaped, undivided items (feature cards, testimonials, a stat row with no per-item border)
uses `repeat(auto-fit,minmax(<px>,1fr))` instead, which reflows on its own without a breakpoint.

Two spots don't just reflow — the layout genuinely renders differently by viewport, because
forcing the desktop version to stack doesn't work:

- **Atlas hero photo.** On desktop it's an absolutely-positioned full-bleed background behind
  the heading, cropped so its left-edge fade sits under the text. Once the text column stacks
  above/below the (now much taller) section, "cover" sizing would zoom the same image to fill
  that height and lose the fade entirely — see `.atlas-hero-photo` in `src/pages/atlas/index.astro`.
  Below 820px it switches to `position: static` with a fixed height instead, rendering as a plain
  banner image above the copy rather than a backdrop behind it.
- **`ServiceTabs` tab bar.** Four tabs with icon + label don't fit a phone width no matter how
  much they reflow. Rather than wrap or shrink the labels, the tab list scrolls horizontally
  below its own breakpoint — see the `Tabs` adaptation above.

## SEO and structured data

`astro.config.mjs` sets `site: 'https://ampliosystemsltd.com'` — required for the canonical URLs,
Open Graph/Twitter image URLs, and the `@astrojs/sitemap` integration (auto-generates
`sitemap-index.xml` + `sitemap-0.xml` at build time from `src/pages/`) to resolve absolute URLs.
`public/robots.txt` points at it.

`BaseLayout.astro` renders, on every page: a canonical `<link>`, Open Graph + Twitter Card tags
(falls back to `/assets/logo-lockup.png` for `og:image`/`twitter:image` unless a page passes its
own `image` prop — no page does yet, since there's no purpose-built 1200×630 social card image;
worth commissioning one), and sitewide `Organization` + `WebSite` JSON-LD.

Two more JSON-LD components live in `src/components/seo/`, dropped into specific pages rather than
the layout since they only apply where the content actually exists:

- **`FaqSchema.astro`** — takes the same `{question, answer}` array already passed to `<Accordion>`
  and emits `FAQPage` JSON-LD, so search/answer engines (Google AI Overviews, ChatGPT search,
  Perplexity) can quote the answer directly. Used on the homepage, `/ai-automation/*` service
  pages, and AI Powered Reviews — every page with a real FAQ accordion.
- **`ServiceSchema.astro`** — one `Service` entity per AI-automation offering (name, description,
  provider). AI Powered Reviews also passes `price`, read from the page's own `LAUNCH_OFFER`
  logic so the schema can't drift from the number actually shown on the page.

Atlas deliberately gets neither `Service`/`Offer` schema beyond the sitewide `Organization` — it's
explicitly "concept stage" on the page itself, and marking it up as an available, purchasable
product would misrepresent that (and risks a structured-data policy issue with Google, which
checks that markup matches visible page content).

`public/llms.txt` is a plain-text summary of the business and its pages, in the informal but
increasingly-recognised `llms.txt` convention some AI crawlers look for — a curated equivalent of
the sitemap, aimed at answer engines rather than search indexers.

## Forms and "Book a discovery call"

Every "Book a discovery call" / "Get in touch" / "Talk about this one" link across the site opens
`BOOKING_URL` (from `src/data/site.js`, currently `https://bookme.name/cjsohal/`) in a new tab —
plain links, no JS, no in-page dialog. To point bookings somewhere else, change that one constant.

The contact form and the Atlas pilot form are unrelated to booking — they `fetch()` a route on the
Worker (`/api/contact`, `/api/pilot`) on submit. Each route validates the payload shape, then emails
the submission to `info@ampliosystemsltd.com` via [Resend](https://resend.com), with `reply_to` set
to the submitter's address so a reply goes straight to them. This needs a `RESEND_API_KEY` secret
on the Worker (`wrangler secret put RESEND_API_KEY`, or Cloudflare dashboard → this project →
Settings → Variables and secrets) — never committed to the repo. Without that secret set, both
routes return a `502` and the forms show an inline error asking the user to email directly or
retry.

## Deploying

Cloudflare's Git integration (Workers & Pages → Create → connect this repo) builds and deploys
automatically on every push to `main` — no dashboard build-output-directory field to set, because
`wrangler.jsonc` already declares `assets.directory` (`./dist/`) and `main` (`./worker/index.js`).
The dashboard's build command should be `npm run build`; the deploy command Cloudflare fills in
by default, `npx wrangler deploy`, is correct as-is and needs no changes.

## Known gaps (carried over from the design system handoff)

These were already flagged in `design-system/HANDOFF.md` and still apply:

1. Hero video footage and all photography — labelled empty slots, not stock imagery.
2. Atlas sub-brand vector logo (raster only today).
3. Every statistic, quote and client name in the copy is illustrative placeholder — must be
   replaced with real, attributable figures before launch.
4. `LAUNCH_OFFER` in `src/pages/ai-automation/ai-powered-reviews/index.astro` ends
   30 September 2026 — set it to `null` when it lapses so the page reverts to £200/month.
5. Atlas "Explore the platform" / "Learn how it works" links to the platform section on the same
   page (`#platform`) — there's no separate platform UI page yet.
6. Form submission needs the `RESEND_API_KEY` Worker secret set before it will actually send —
   see "Forms and 'Book a discovery call'" above.
