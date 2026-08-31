import React from 'react';

/* See the note in Button.jsx — `amplio-card--interactive` gives the hover lift with zero JS
   on statically-rendered pages; the JS hover state below still drives it when hydrated. */
const CARD_PADDING = { none: 0, sm: 'var(--space-4)', md: 'var(--space-6)', lg: 'var(--space-8)' };

const CARD_VARIANTS = {
  raised: { background: 'var(--surface-card)', border: '1px solid transparent', boxShadow: 'var(--shadow-md)' },
  outlined: { background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', boxShadow: 'none' },
  sage: { background: 'var(--surface-sage)', border: '1px solid transparent', boxShadow: 'none' },
  ink: { background: 'var(--surface-ink)', border: '1px solid transparent', boxShadow: 'none', color: 'var(--text-inverse)' },
  brand: { background: 'var(--gradient-hero)', border: '1px solid transparent', boxShadow: 'none', color: 'var(--text-inverse)' },
};

export function Card({ children, variant = 'raised', padding = 'md', interactive = false, as = 'div', href, style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  const v = CARD_VARIANTS[variant] || CARD_VARIANTS.raised;
  const Tag = href ? 'a' : as;
  return (
    <Tag
      href={href}
      className={interactive ? 'amplio-card--interactive' : undefined}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        display: 'block', borderRadius: 'var(--radius-card)', padding: CARD_PADDING[padding],
        transition: 'var(--transition-control)', textDecoration: 'none', ...v,
        ...(interactive && hover ? { transform: 'var(--lift-hover)', boxShadow: 'var(--shadow-lg)' } : null),
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
