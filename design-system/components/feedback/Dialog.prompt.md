A focused, interrupting task — booking a call, confirming a destructive action.

```jsx
<Dialog open={open} onClose={close} title="Book a discovery call"
  description="Thirty minutes, no pitch. We'll map what's worth automating."
  footer={<><Button variant="ghost" onClick={close}>Not now</Button><Button iconRight="arrow-right">Find a time</Button></>}>
  <Input label="Work email" />
</Dialog>
```

Requires `@keyframes amplio-fade` and `amplio-rise` on the page (the UI kit provides them).
