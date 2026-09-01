# Amplio Systems — website

Marketing site for Amplio Systems Ltd, built with [Astro](https://astro.build) + React islands,
on top of the Amplio design system in [`design-system/`](design-system/). Deploys to Cloudflare
Workers (Cloudflare's Git integration now provisions static sites as a Workers project — using
`wrangler deploy` — rather than the older Pages product).

## Stack

- **Astro** (static output — ships zero JS by default)
- **React** islands for the interactive pieces only: the header dropdown/mobile nav, the booking
  dialog, tabs, accordions, the contact/pilot forms, and the Atlas map
- **A small Cloudflare Worker** (`worker/index.js`) that serves the static build and handles the
  three form endpoints — see [`wrangler.jsonc`](wrangler.jsonc)

## Local development

```bash
npm install
npm run dev        # Astro dev server, http://localhost:4321
npm run build      # static output to dist/
npm run preview    # serve the built output locally (Astro's own preview, no Worker)
npm run cf:dev      # build, then run the actual Worker locally via `wrangler dev` — the only
                     # way to test /api/contact, /api/pilot, /api/booking locally
```

`npm run dev` is fastest for day-to-day page work, but it doesn't run `worker/index.js` — calls
to `/api/contact`, `/api/pilot`, `/api/booking` will 404 (the forms handle this gracefully and
still show their success state). Use `npm run cf:dev` when you need those routes to actually
respond.

## Where things live

| Path | What |
|---|---|
| `design-system/` | The design system as handed off — tokens, assets, React components, brand readme. Source of truth; imported directly (via the `@ds` alias), not retyped. |
| `public/assets/` | A served copy of `design-system/assets/` (minus the desktop TTFs, which are for design tools, not the browser). Update both if you add or change an asset. |
| `src/pages/` | One file per route, matching the table in `design-system/HANDOFF.md`. |
| `src/components/` | Site-specific components: chrome (header/footer/booking dialog), and page-specific pieces (services tabs, Atlas map/dashboard, forms). |
| `src/data/servicePages.js` | The shared data object behind the three AI Automation sub-pages, so they can't structurally drift apart. |
| `worker/index.js` + `wrangler.jsonc` | The Cloudflare Worker that serves the static build and the three form endpoints — currently stubs, see below. |
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
- **`CTABanner` `primaryProps`.** Its primary button only took an `href`. "Book a discovery call"
  is its default label on most pages' closing section, and needs to open the booking dialog like
  every other instance of that button — `primaryProps` is a plain pass-through prop (e.g.
  `{ 'data-open-booking': true }`) spread onto the button, nothing else changed.
- **`Dialog` close button.** `<IconButton icon="x" label="Close" />` had no `onClick` — the X did
  nothing. Wired to `onClose`.
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

## Forms and the booking dialog

The contact form, the Atlas pilot form, and the "Book a discovery call" dialog all `fetch()` a
route on the Worker (`/api/contact`, `/api/pilot`, `/api/booking`) on submit. Right now each route
only validates the payload shape and returns `200` — **nothing is actually sent or stored
anywhere yet.** `worker/index.js` has a `// TODO` showing where to add real delivery (e.g.
[Resend](https://resend.com)); wiring that in needs an API key added as a secret on the Worker
(Cloudflare dashboard → this project → Settings → Variables and secrets), not committed to the
repo.

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
6. Form submission endpoints are stubs — see above.
