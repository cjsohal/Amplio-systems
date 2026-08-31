import React from 'react';

/* The wide-tracked uppercase label from the brand book ("V I S U A L  I D E N T I T Y").
   The single most recognisable typographic device in the system. */
export function Eyebrow({ children, tone = 'brand', as = 'span', style, ...rest }) {
  const Tag = as;
  const colour = {
    brand: 'var(--green-600)',
    muted: 'var(--text-muted)',
    inverse: 'var(--alpha-cream-72)',
  }[tone] || 'var(--green-600)';
  return (
    <Tag style={{
      display: 'block', fontFamily: 'var(--font-body)', fontSize: 'var(--text-2xs)',
      fontWeight: 'var(--weight-bold)', letterSpacing: 'var(--tracking-eyebrow)',
      textTransform: 'uppercase', color: colour, lineHeight: 1.4, ...style,
    }} {...rest}>{children}</Tag>
  );
}
