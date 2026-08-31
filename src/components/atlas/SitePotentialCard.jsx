import React from 'react';
import { Card } from '@ds/components/core/Card.jsx';
import { Badge } from '@ds/components/core/Badge.jsx';
import { Icon } from '@ds/components/core/Icon.jsx';

const SCORE_ROWS = [
  ['Housing need', 'Strong', 0.92],
  ['Affordability fit', 'High', 0.8],
  ['Market demand', 'Strong', 0.88],
  ['Sustainability', 'High', 0.76],
  ['Connectivity', 'Strong', 0.9],
];

export default function SitePotentialCard() {
  return (
    <Card variant="raised" padding="md" style={{ width: 300, boxShadow: 'var(--shadow-xl)' }}>
      <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>Site potential</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 6 }}>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-4xl)', lineHeight: 1, color: 'var(--text-heading)' }}>85</span>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>/100</span>
        <span style={{ marginLeft: 'auto' }}><Badge tone="success">High potential</Badge></span>
      </div>
      <div style={{ display: 'grid', gap: 10, margin: '18px 0 0', paddingTop: 16, borderTop: '1px solid var(--border-subtle)' }}>
        {SCORE_ROWS.map(([label, rating, pct]) => (
          <div key={label} style={{ display: 'grid', gridTemplateColumns: '1fr 90px', gap: 10, alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'var(--text-body)' }}>{label}</span>
            <span>
              <span style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 'var(--weight-bold)', color: 'var(--deep-fern)', textAlign: 'right' }}>{rating}</span>
              <span style={{ display: 'block', height: 3, borderRadius: 'var(--radius-pill)', background: 'var(--neutral-200)', marginTop: 3 }}>
                <span style={{ display: 'block', height: 3, width: `${pct * 100}%`, borderRadius: 'var(--radius-pill)', background: 'var(--amplio-green)' }} />
              </span>
            </span>
          </div>
        ))}
      </div>
      <a href="#platform" style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 16, paddingTop: 14, borderTop: '1px solid var(--border-subtle)', fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'var(--text-link)', textDecoration: 'none' }}>
        View full analysis <Icon name="arrow-right" size={14} />
      </a>
    </Card>
  );
}
