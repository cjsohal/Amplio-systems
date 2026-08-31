import React from 'react';

export function Tooltip({ label, placement = 'top', children, style }) {
  const [open, setOpen] = React.useState(false);
  const pos = {
    top: { bottom: '100%', left: '50%', transform: 'translate(-50%,-8px)' },
    bottom: { top: '100%', left: '50%', transform: 'translate(-50%,8px)' },
    left: { right: '100%', top: '50%', transform: 'translate(-8px,-50%)' },
    right: { left: '100%', top: '50%', transform: 'translate(8px,-50%)' },
  }[placement];
  return (
    <span
      onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)} onBlur={() => setOpen(false)}
      style={{ position: 'relative', display: 'inline-flex', ...style }}
    >
      {children}
      <span role="tooltip" style={{
        position: 'absolute', ...pos, zIndex: 40, whiteSpace: 'nowrap',
        background: 'var(--surface-ink)', color: 'var(--text-inverse)',
        fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', lineHeight: 1.4,
        padding: '7px 11px', borderRadius: 'var(--radius-sm)', boxShadow: 'var(--shadow-md)',
        opacity: open ? 1 : 0, pointerEvents: 'none',
        transition: `opacity var(--duration-fast) var(--ease-out-soft)`,
      }}>{label}</span>
    </span>
  );
}
