import React from 'react';
import { Icon } from '../core/Icon.jsx';

export function Testimonial({ quote, name, role, tone = 'default', style }) {
  const inverse = tone === 'inverse';
  return (
    <figure style={{ margin: 0, ...style }}>
      <Icon name="quote" size={28} style={{ color: inverse ? 'var(--alpha-cream-24)' : 'var(--green-300)', marginBottom: 'var(--space-4)' }} />
      <blockquote style={{
        margin: 0, fontFamily: 'var(--font-display)', fontWeight: 'var(--weight-display)',
        fontSize: 'clamp(20px, 2vw, 28px)', lineHeight: 'var(--leading-snug)',
        color: inverse ? 'var(--text-inverse)' : 'var(--text-heading)', textWrap: 'pretty',
      }}>{quote}</blockquote>
      {(name || role) && (
        <figcaption style={{ marginTop: 'var(--space-6)', display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ width: 28, height: 1, background: inverse ? 'var(--alpha-cream-24)' : 'var(--green-300)', flex: 'none' }} />
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)' }}>
            <strong style={{ color: inverse ? 'var(--text-inverse)' : 'var(--text-heading)', fontWeight: 'var(--weight-bold)' }}>{name}</strong>
            {role && <span style={{ color: inverse ? 'var(--text-inverse-muted)' : 'var(--text-muted)' }}>{name ? ' · ' : ''}{role}</span>}
          </span>
        </figcaption>
      )}
    </figure>
  );
}
