import React from 'react';

/* A field real visitors never see or tab to, but form-filling bots tend to populate. The Worker
   treats any non-empty `hp_website` as a bot and silently drops the submission (see
   worker/index.js). Positioned off-screen rather than `display: none`, since some bots skip
   fields they can tell are hidden that way. */
export default function Honeypot({ value, onChange }) {
  return (
    <div aria-hidden="true" style={{ position: 'absolute', left: '-10000px', top: 'auto', width: 1, height: 1, overflow: 'hidden' }}>
      <label>
        Leave this field empty
        <input type="text" name="hp_website" tabIndex={-1} autoComplete="off" value={value} onChange={onChange} />
      </label>
    </div>
  );
}
