import React from 'react';
import { Card } from '@ds/components/core/Card.jsx';
import { Icon } from '@ds/components/core/Icon.jsx';
import Stars from './Stars.jsx';

export default function ProfileCard({ rating, count, recency, verdict, tone }) {
  const weak = tone === 'weak';
  return (
    <Card variant={weak ? 'outlined' : 'raised'} padding="lg" style={{ height: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', lineHeight: 1, color: 'var(--text-heading)' }}>{rating}</span>
        <Stars rating={rating} size={16} />
      </div>
      <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--text-body)', marginTop: 10 }}>
        {count} reviews
      </div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 14, paddingTop: 14, borderTop: '1px solid var(--border-subtle)' }}>
        <Icon name="clock" size={16} style={{ color: weak ? 'var(--text-subtle)' : 'var(--amplio-green)' }} />
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--text-body)' }}>{recency}</span>
      </div>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-relaxed)', color: weak ? 'var(--text-muted)' : 'var(--text-brand)', margin: '18px 0 0', maxWidth: 'none' }}>
        {verdict}
      </p>
    </Card>
  );
}
