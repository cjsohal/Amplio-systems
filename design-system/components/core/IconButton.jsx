import React from 'react';
import { Icon } from './Icon.jsx';

const ICONBTN_SIZES = { sm: { box: 32, icon: 16 }, md: { box: 44, icon: 20 }, lg: { box: 52, icon: 24 } };

export function IconButton({ icon, label, variant = 'ghost', size = 'md', disabled, style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  const s = ICONBTN_SIZES[size] || ICONBTN_SIZES.md;
  const palette = {
    ghost: { background: 'transparent', color: 'var(--action-ghost-fg)', hover: 'var(--action-ghost-bg-hover)' },
    solid: { background: 'var(--action-primary-bg)', color: '#fff', hover: 'var(--green-600)' },
    outline: { background: 'transparent', color: 'var(--action-secondary-fg)', hover: 'var(--green-50)', border: '1px solid var(--action-secondary-border)' },
    inverse: { background: 'var(--alpha-cream-12)', color: 'var(--warm-cream)', hover: 'var(--alpha-cream-24)' },
  }[variant] || {};
  return (
    <button
      type="button" aria-label={label} title={label} disabled={disabled}
      className={`amplio-iconbtn amplio-iconbtn--${variant}`}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        width: s.box, height: s.box, display: 'inline-grid', placeItems: 'center',
        borderRadius: 'var(--radius-circle)', border: palette.border || '1px solid transparent',
        background: hover && !disabled ? palette.hover : palette.background,
        color: disabled ? 'var(--action-disabled-fg)' : palette.color,
        cursor: disabled ? 'not-allowed' : 'pointer', transition: 'var(--transition-control)',
        ...style,
      }}
      {...rest}
    >
      <Icon name={icon} size={s.icon} />
    </button>
  );
}
