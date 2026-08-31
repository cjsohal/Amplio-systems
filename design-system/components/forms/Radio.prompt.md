Exclusive choice among 2–4 visible options; above that use Select.

```jsx
<RadioGroup legend="How soon do you want to start?">
  <Radio name="when" value="now" label="In the next month" checked={v==='now'} onChange={setV} />
  <Radio name="when" value="quarter" label="This quarter" checked={v==='quarter'} onChange={setV} />
</RadioGroup>
```
