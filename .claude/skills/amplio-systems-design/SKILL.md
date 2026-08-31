---
name: amplio-systems-design
description: Use this skill to generate well-branded interfaces and assets for Amplio Systems, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

The actual design system lives at [`design-system/`](../../../design-system/) in the repo root —
this file is just a pointer so Claude Code discovers it as a skill.

Start with [`design-system/readme.md`](../../../design-system/readme.md) — it carries the brand
voice, colour, type and spacing rules, and an index of everything else: `tokens/` (219 CSS custom
properties), `assets/` (logos, icons, fonts), `components/` (24 real React components, each with a
`.d.ts` prop contract and a `.prompt.md`), and `guidelines/` (foundation specimens).

The live site (`src/`) imports `design-system/components/**` directly and links
`design-system/styles.css` — treat that directory as the source of truth, not a copy to retype
from. `public/assets/` is a served duplicate of `design-system/assets/` for the built site; if you
add or change an asset, update both.

If creating visual artifacts (slides, mocks, throwaway prototypes), copy assets out and build
static HTML files for the user to view. If working on production code in this repo, import from
`design-system/` directly rather than recreating tokens or components.

If the user invokes this skill without other guidance, ask what they want to build or design, ask
a few clarifying questions, and act as an expert designer who outputs HTML artifacts _or_
production code depending on the need.
