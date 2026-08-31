import React from 'react';
import { Icon } from './Icon.jsx';

/* Hover/press are driven by React state below (needed for the design-system specimen pages,
   which are always interactive). A `.amplio-btn--<variant>` class is also applied so the same
   hover/press/lift states work with zero JS on statically-rendered marketing pages — see
   design-system/tokens/interactions.css. Both mechanisms produce the same visual result and
   never conflict: the inline style (JS) simply wins when this component is hydrated. */
const BUTTON_SIZES = {
  sm: { padding: '8px 16px', fontSize: 'var(--text-sm)', gap: 6, icon: 16, minHeight: 36 },
  md: { padding: '12px 24px', fontSize: 'var(--text-sm)', gap: 8, icon: 18, minHeight: 44 },
  lg: { padding: '16px 32px', fontSize: 'var(--text-md)', gap: 10, icon: 20, minHeight: 54 },
};

const BUTTON_VARIANTS = {
  primary: {
    background: 'var(--action-primary-bg)', color: 'var(--action-primary-fg)',
    border: '1px solid transparent',
    hover: { background: 'var(--action-primary-bg-hover)', boxShadow: 'var(--shadow-brand)' },
    active: { background: 'var(--action-primary-bg-active)' },
  },
  secondary: {
    background: 'var(--action-secondary-bg)', color: 'var(--action-secondary-fg)',
    border: '1px solid var(--action-secondary-border)',
    hover: { background: 'var(--action-secondary-bg-hover)', borderColor: 'var(--amplio-green)' },
    active: { background: 'var(--green-100)' },
  },
  ghost: {
    background: 'transparent', color: 'var(--action-ghost-fg)', border: '1px solid transparent',
    hover: { background: 'var(--action-ghost-bg-hover)' },
    active: { background: 'var(--alpha-ink-08)' },
  },
  inverse: {
    background: 'var(--warm-cream)', color: 'var(--deep-fern)', border: '1px solid transparent',
    hover: { background: '#fff' }, active: { background: 'var(--green-50)' },
  },
  danger: {
    background: 'var(--clay-600)', color: '#fff', border: '1px solid transparent',
    hover: { background: '#8E3527' }, active: { background: '#7A2D21' },
  },
};

export function Button({
  children, variant = 'primary', size = 'md', iconLeft, iconRight,
  disabled = false, loading = false, fullWidth = false, href, type = 'button', style, ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const s = BUTTON_SIZES[size] || BUTTON_SIZES.md;
  const v = BUTTON_VARIANTS[variant] || BUTTON_VARIANTS.primary;
  const off = disabled || loading;

  const css = {
    display: fullWidth ? 'flex' : 'inline-flex', width: fullWidth ? '100%' : undefined,
    alignItems: 'center', justifyContent: 'center', gap: s.gap,
    fontFamily: 'var(--font-body)', fontWeight: 'var(--weight-bold)',
    fontSize: s.fontSize, lineHeight: 1, letterSpacing: '0.01em',
    padding: s.padding, minHeight: s.minHeight,
    borderRadius: 'var(--radius-control)', cursor: off ? 'not-allowed' : 'pointer',
    textDecoration: 'none', transition: 'var(--transition-control)',
    background: v.background, color: v.color, border: v.border,
    ...(hover && !off ? v.hover : null),
    ...(press && !off ? { ...v.active, transform: 'var(--press-scale)', boxShadow: 'none' } : null),
    ...(hover && !off && variant === 'primary' && !press ? { transform: 'var(--lift-hover)' } : null),
    ...(off ? { background: 'var(--action-disabled-bg)', color: 'var(--action-disabled-fg)', borderColor: 'transparent', boxShadow: 'none', transform: 'none' } : null),
    ...style,
  };

  const inner = (
    <>
      {loading ? <Icon name="loader-circle" size={s.icon} style={{ animation: 'amplio-spin 900ms linear infinite' }} /> : iconLeft ? <Icon name={iconLeft} size={s.icon} /> : null}
      <span>{children}</span>
      {iconRight && !loading ? <Icon name={iconRight} size={s.icon} /> : null}
    </>
  );

  const handlers = {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => { setHover(false); setPress(false); },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false),
  };

  const className = `amplio-btn amplio-btn--${variant}`;

  if (href && !off) return <a href={href} className={className} style={css} {...handlers} {...rest}>{inner}</a>;
  return <button type={type} disabled={off} className={className} style={css} {...handlers} {...rest}>{inner}</button>;
}
