import React from 'react';
import { Button } from '../core/Button.jsx';
import { Eyebrow } from './Eyebrow.jsx';
import { assetBase } from '../core/Logo.jsx';

export function CTABanner({
  eyebrow, title, description, primaryLabel = 'Book a discovery call', primaryHref, primaryProps,
  secondaryLabel, secondaryHref, tone = 'brand', style,
}) {
  const onDark = tone === 'brand' || tone === 'ink';
  return (
    <section style={{
      position: 'relative', overflow: 'hidden',
      borderRadius: 'var(--radius-2xl)',
      background: tone === 'brand' ? 'var(--gradient-hero)' : tone === 'ink' ? 'var(--surface-ink)' : 'var(--surface-sage)',
      padding: 'clamp(32px, 5vw, 72px)', ...style,
    }}>
      <img src={`${assetBase()}/${onDark ? 'mark-light.svg' : 'mark.svg'}`} alt="" aria-hidden="true"
        style={{ position: 'absolute', right: '-6%', top: '-38%', width: 'min(420px, 46%)', opacity: onDark ? 0.16 : 0.12, pointerEvents: 'none' }} />
      <div style={{ position: 'relative', maxWidth: 640 }}>
        {eyebrow && <Eyebrow tone={onDark ? 'inverse' : 'brand'} style={{ marginBottom: 'var(--space-4)' }}>{eyebrow}</Eyebrow>}
        <h2 style={{
          fontFamily: 'var(--font-display)', fontWeight: 'var(--weight-display)',
          fontSize: 'clamp(28px, 3.6vw, 46px)', lineHeight: 'var(--leading-snug)',
          color: onDark ? 'var(--text-inverse)' : 'var(--text-heading)', margin: 0,
        }}>{title}</h2>
        {description && (
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: 'var(--text-md)',
            lineHeight: 'var(--leading-relaxed)', margin: 'var(--space-5) 0 0', maxWidth: 520,
            color: onDark ? 'var(--text-inverse-muted)' : 'var(--text-body)',
          }}>{description}</p>
        )}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)', marginTop: 'var(--space-8)' }}>
          <Button variant={onDark ? 'inverse' : 'primary'} size="lg" iconRight="arrow-right" href={primaryHref} {...primaryProps}>{primaryLabel}</Button>
          {secondaryLabel && (
            <Button variant="ghost" size="lg" href={secondaryHref}
              style={onDark ? { color: 'var(--warm-cream)', border: '1px solid var(--alpha-cream-24)' } : undefined}>
              {secondaryLabel}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
