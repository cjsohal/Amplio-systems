import React from 'react';
import { Eyebrow } from './Eyebrow.jsx';

export function SectionHeading({
  eyebrow, title, description, align = 'left', tone = 'default', level = 2, maxWidth = 660, style,
}) {
  const H = `h${level}`;
  const inverse = tone === 'inverse';
  return (
    <div style={{
      textAlign: align, maxWidth,
      marginLeft: align === 'center' ? 'auto' : undefined,
      marginRight: align === 'center' ? 'auto' : undefined, ...style,
    }}>
      {eyebrow && <Eyebrow tone={inverse ? 'inverse' : 'brand'} style={{ marginBottom: 'var(--space-4)' }}>{eyebrow}</Eyebrow>}
      {title && (
        <H style={{
          fontFamily: 'var(--font-display)', fontWeight: 'var(--weight-display)',
          fontSize: 'clamp(28px, 3.4vw, 44px)', lineHeight: 'var(--leading-snug)',
          color: inverse ? 'var(--text-inverse)' : 'var(--text-heading)',
          margin: 0, textWrap: 'pretty',
        }}>{title}</H>
      )}
      {description && (
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: 'var(--text-md)',
          lineHeight: 'var(--leading-relaxed)',
          color: inverse ? 'var(--text-inverse-muted)' : 'var(--text-body)',
          margin: 'var(--space-4) 0 0',
          maxWidth: 'none',
          marginLeft: align === 'center' ? 'auto' : undefined,
          marginRight: align === 'center' ? 'auto' : undefined,
        }}>{description}</p>
      )}
    </div>
  );
}
