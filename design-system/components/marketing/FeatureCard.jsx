import React from 'react';
import { Card } from '../core/Card.jsx';
import { Icon } from '../core/Icon.jsx';

export function FeatureCard({ icon, title, children, href, onClick, tone = 'raised', style, ...rest }) {
  return (
    <Card variant={tone} padding="lg" interactive={!!href || !!onClick} href={href} onClick={onClick}
      style={{ height: '100%', cursor: onClick && !href ? 'pointer' : undefined, ...style }} {...rest}>
      {icon && (
        <span style={{
          width: 52, height: 52, borderRadius: 'var(--radius-leaf)', display: 'grid', placeItems: 'center',
          background: tone === 'ink' || tone === 'brand' ? 'var(--alpha-cream-12)' : 'var(--sage-mist)',
          color: tone === 'ink' || tone === 'brand' ? 'var(--warm-cream)' : 'var(--deep-fern)',
          marginBottom: 'var(--space-6)',
        }}>
          <Icon name={icon} size={24} />
        </span>
      )}
      <h3 style={{
        fontFamily: 'var(--font-display)', fontWeight: 'var(--weight-display)',
        fontSize: 'var(--text-xl)', lineHeight: 'var(--leading-snug)',
        color: tone === 'ink' || tone === 'brand' ? 'var(--text-inverse)' : 'var(--text-heading)',
        margin: '0 0 var(--space-3)',
      }}>{title}</h3>
      <div style={{
        fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)',
        lineHeight: 'var(--leading-relaxed)',
        color: tone === 'ink' || tone === 'brand' ? 'var(--text-inverse-muted)' : 'var(--text-body)',
      }}>{children}</div>
    </Card>
  );
}
