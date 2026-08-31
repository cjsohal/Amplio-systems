import React from 'react';
import { Icon } from '../core/Icon.jsx';

const ALERT_TONES = {
  success: { fg: 'var(--feedback-success-fg)', bg: 'var(--feedback-success-bg)', bd: 'var(--feedback-success-border)', icon: 'circle-check' },
  warning: { fg: 'var(--feedback-warning-fg)', bg: 'var(--feedback-warning-bg)', bd: 'var(--feedback-warning-border)', icon: 'triangle-alert' },
  info: { fg: 'var(--feedback-info-fg)', bg: 'var(--feedback-info-bg)', bd: 'var(--feedback-info-border)', icon: 'info' },
  danger: { fg: 'var(--feedback-danger-fg)', bg: 'var(--feedback-danger-bg)', bd: 'var(--feedback-danger-border)', icon: 'circle-alert' },
};

export function Alert({ tone = 'info', title, children, onDismiss, style, ...rest }) {
  const t = ALERT_TONES[tone] || ALERT_TONES.info;
  return (
    <div role="status" style={{
      display: 'flex', gap: 12, alignItems: 'flex-start',
      background: t.bg, border: `1px solid ${t.bd}`, borderRadius: 'var(--radius-md)',
      padding: 'var(--space-4)', ...style,
    }} {...rest}>
      <Icon name={t.icon} size={20} style={{ color: t.fg, marginTop: 1 }} />
      <div style={{ flex: 1 }}>
        {title && <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-bold)', color: t.fg, marginBottom: children ? 4 : 0 }}>{title}</div>}
        {children && <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--text-body)', lineHeight: 'var(--leading-normal)' }}>{children}</div>}
      </div>
      {onDismiss && (
        <span onClick={onDismiss} style={{ cursor: 'pointer', color: t.fg, opacity: 0.6, display: 'grid' }}>
          <Icon name="x" size={16} />
        </span>
      )}
    </div>
  );
}
