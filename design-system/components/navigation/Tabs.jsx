import React from 'react';
import { Icon } from '../core/Icon.jsx';

export function Tabs({ tabs = [], value, onChange, variant = 'underline', style }) {
  const active = value ?? (tabs[0] && tabs[0].id);
  const isPill = variant === 'pill';
  return (
    <div role="tablist" style={{
      display: 'flex', gap: isPill ? 6 : 28,
      borderBottom: isPill ? 'none' : '1px solid var(--border-subtle)',
      background: isPill ? 'var(--surface-subtle)' : 'transparent',
      padding: isPill ? 5 : 0, borderRadius: isPill ? 'var(--radius-pill)' : 0,
      ...style,
    }}>
      {tabs.map((t) => {
        const on = t.id === active;
        return (
          <button key={t.id} role="tab" aria-selected={on} onClick={() => onChange && onChange(t.id)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, cursor: 'pointer',
              fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)',
              fontWeight: on ? 'var(--weight-bold)' : 'var(--weight-regular)',
              color: on ? (isPill ? 'var(--deep-fern)' : 'var(--text-heading)') : 'var(--text-muted)',
              background: isPill ? (on ? 'var(--surface-card)' : 'transparent') : 'transparent',
              border: 0, padding: isPill ? '9px 18px' : '0 0 14px',
              borderRadius: isPill ? 'var(--radius-pill)' : 0,
              boxShadow: isPill && on ? 'var(--shadow-xs)' : 'none',
              borderBottom: isPill ? 'none' : `2px solid ${on ? 'var(--amplio-green)' : 'transparent'}`,
              marginBottom: isPill ? 0 : -1, transition: 'var(--transition-control)',
            }}>
            {t.icon && <Icon name={t.icon} size={16} />}
            {t.label}
          </button>
        );
      })}
    </div>
  );
}
