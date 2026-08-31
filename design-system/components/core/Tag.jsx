import React from 'react';
import { Icon } from './Icon.jsx';

export function Tag({ children, onRemove, selected = false, onClick, style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  const interactive = !!onClick;
  return (
    <span
      onClick={onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      role={interactive ? 'button' : undefined} tabIndex={interactive ? 0 : undefined}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        background: selected ? 'var(--sage-mist)' : hover && interactive ? 'var(--green-50)' : 'var(--surface-card)',
        color: selected ? 'var(--deep-fern)' : 'var(--charcoal)',
        border: `1px solid ${selected ? 'var(--green-300)' : 'var(--border-subtle)'}`,
        borderRadius: 'var(--radius-pill)', padding: '6px 14px',
        fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', lineHeight: 1.4,
        cursor: interactive ? 'pointer' : 'default', transition: 'var(--transition-control)', ...style,
      }}
      {...rest}
    >
      {children}
      {onRemove && (
        <span onClick={(e) => { e.stopPropagation(); onRemove(); }}
          style={{ display: 'grid', placeItems: 'center', cursor: 'pointer', opacity: 0.6 }}>
          <Icon name="x" size={14} />
        </span>
      )}
    </span>
  );
}
