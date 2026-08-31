import React from 'react';

export function StatBlock({ value, label, tone = 'default', align = 'left', style }) {
  const inverse = tone === 'inverse';
  return (
    <div style={{ textAlign: align, ...style }}>
      <div style={{
        fontFamily: 'var(--font-display)', fontWeight: 'var(--weight-display)',
        fontSize: 'clamp(38px, 4vw, 60px)', lineHeight: 1,
        color: inverse ? 'var(--text-inverse)' : 'var(--text-brand)',
      }}>{value}</div>
      <div style={{
        fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)',
        lineHeight: 'var(--leading-normal)', marginTop: 'var(--space-3)',
        color: inverse ? 'var(--text-inverse-muted)' : 'var(--text-body)',
      }}>{label}</div>
    </div>
  );
}
