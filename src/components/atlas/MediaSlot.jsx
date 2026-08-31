import React from 'react';

export default function MediaSlot({ label, height, radius = 'var(--radius-lg)', tone = 'light', align = 'center', labelMaxWidth, style }) {
  const dark = tone === 'dark';
  return (
    <div aria-hidden="true" style={{
      height, borderRadius: radius, display: 'grid', placeItems: align,
      padding: align === 'center' ? 0 : 20,
      background: dark ? 'var(--alpha-cream-12)' : 'var(--neutral-100)',
      border: `1px dashed ${dark ? 'var(--alpha-cream-24)' : 'var(--border-default)'}`,
      ...style,
    }}>
      <span style={{
        fontFamily: 'var(--font-body)', fontSize: 'var(--text-2xs)',
        letterSpacing: 'var(--tracking-eyebrow)', textTransform: 'uppercase',
        color: dark ? 'var(--alpha-cream-72)' : 'var(--text-subtle)', textAlign: 'center',
        padding: align === 'center' ? 12 : 0, maxWidth: labelMaxWidth,
      }}>{label}</span>
    </div>
  );
}
