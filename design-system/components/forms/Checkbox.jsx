import React from 'react';
import { Icon } from '../core/Icon.jsx';

export function Checkbox({ label, description, checked = false, onChange, disabled, style, ...rest }) {
  return (
    <label style={{ display: 'flex', gap: 12, alignItems: 'flex-start', cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.55 : 1, ...style }}>
      <span
        onClick={() => !disabled && onChange && onChange(!checked)}
        style={{
          width: 20, height: 20, flex: 'none', marginTop: 2, display: 'grid', placeItems: 'center',
          borderRadius: 'var(--radius-xs)',
          background: checked ? 'var(--amplio-green)' : 'var(--surface-card)',
          border: `1px solid ${checked ? 'var(--amplio-green)' : 'var(--border-strong)'}`,
          color: '#fff', transition: 'var(--transition-control)',
        }}
      >
        {checked && <Icon name="check" size={14} />}
      </span>
      <input type="checkbox" checked={checked} disabled={disabled}
        onChange={(e) => onChange && onChange(e.target.checked)}
        style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }} {...rest} />
      <span>
        <span style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--text-heading)', lineHeight: 1.5 }}>{label}</span>
        {description && <span style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginTop: 2 }}>{description}</span>}
      </span>
    </label>
  );
}
