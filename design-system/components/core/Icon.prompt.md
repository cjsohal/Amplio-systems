Renders one Lucide glyph in the current text colour; use it anywhere an icon is needed instead of inlining SVG.

```jsx
<Icon name="arrow-right" size={20} />
```

- `name` is a file stem from `/assets/icons` (49 glyphs; see that folder's README).
- Colour comes from `currentColor`, so set colour on the parent.
- If your page is not at the project root, set `window.AMPLIO_ICON_BASE` before first render.
