The brand's call to action — pill-shaped, green-filled, with a 2px hover lift.

```jsx
<Button variant="primary" size="lg" iconRight="arrow-right">Book a discovery call</Button>
<Button variant="secondary">See how it works</Button>
```

- One `primary` per view; pair it with a `secondary` or `ghost`.
- Use `inverse` on green or ink backgrounds.
- Labels are sentence case and verb-led ("Book a call", not "SUBMIT" or "Click here").
- `loading` swaps the left icon for a spinner; add `@keyframes amplio-spin` to the page or use the kit's global styles.
