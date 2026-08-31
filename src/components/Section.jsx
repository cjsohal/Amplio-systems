import React from 'react';

const TONE_BG = { page: 'transparent', card: 'var(--surface-card)', sage: 'var(--surface-sage)', ink: 'var(--surface-ink)' };

export default function Section({ children, tone = 'page', tight = false, style, id }) {
  return (
    <section id={id} style={{ background: TONE_BG[tone], padding: `${tight ? 'var(--section-y-tight)' : 'var(--section-y)'} var(--space-8)`, ...style }}>
      <div style={{ maxWidth: 'var(--container-xl)', margin: '0 auto' }}>{children}</div>
    </section>
  );
}
