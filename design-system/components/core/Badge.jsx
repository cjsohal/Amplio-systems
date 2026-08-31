import React from 'react';
import { Icon } from './Icon.jsx';

const BADGE_TONES = {
  brand: { bg: 'var(--green-50)', fg: 'var(--green-700)', bd: 'var(--green-200)' },
  neutral: { bg: 'var(--neutral-100)', fg: 'var(--charcoal)', bd: 'var(--neutral-200)' },
  success: { bg: 'var(--feedback-success-bg)', fg: 'var(--feedback-success-fg)', bd: 'var(--feedback-success-border)' },
  warning: { bg: 'var(--feedback-warning-bg)', fg: 'var(--feedback-warning-fg)', bd: 'var(--feedback-warning-border)' },
  info: { bg: 'var(--feedback-info-bg)', fg: 'var(--feedback-info-fg)', bd: 'var(--feedback-info-border)' },
  danger: { bg: 'var(--feedback-danger-bg)', fg: 'var(--feedback-danger-fg)', bd: 'var(--feedback-danger-border)' },
  solid: { bg: 'var(--amplio-green)', fg: '#fff', bd: 'transparent' },
};

export function Badge({ children, tone = 'brand', icon, dot = false, style, ...rest }) {
  const t = BADGE_TONES[tone] || BADGE_TONES.brand;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      background: t.bg, color: t.fg, border: `1px solid ${t.bd}`,
      borderRadius: 'var(--radius-pill)', padding: '4px 12px',
      fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', fontWeight: 'var(--weight-bold)',
      letterSpacing: '0.02em', lineHeight: 1.6, whiteSpace: 'nowrap', ...style,
    }} {...rest}>
      {dot && <span style={{ width: 6, height: 6, borderRadius: '50%', background: t.fg, flex: 'none' }} />}
      {icon && <Icon name={icon} size={14} />}
      {children}
    </span>
  );
}
