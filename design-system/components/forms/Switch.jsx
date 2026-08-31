import React from 'react';

export function Switch({ label, description, checked = false, onChange, disabled, style, ...rest }) {
  return (
    <label style={{ display: 'flex', gap: 14, alignItems: 'center', justifyContent: 'space-between', cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.55 : 1, ...style }}>
      <span>
        {label && <span style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-bold)', color: 'var(--text-heading)' }}>{label}</span>}
        {description && <span style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginTop: 2 }}>{description}</span>}
      </span>
      <span
        onClick={() => !disabled && onChange && onChange(!checked)}
        style={{
          width: 46, height: 26, flex: 'none', borderRadius: 'var(--radius-pill)',
          background: checked ? 'var(--amplio-green)' : 'var(--neutral-300)',
          padding: 3, display: 'flex', transition: 'var(--transition-control)',
        }}
      >
        <span style={{
          width: 20, height: 20, borderRadius: '50%', background: '#fff',
          boxShadow: 'var(--shadow-xs)',
          transform: checked ? 'translateX(20px)' : 'translateX(0)',
          transition: `transform var(--duration-normal) var(--ease-out-soft)`,
        }} />
      </span>
      <input type="checkbox" role="switch" checked={checked} disabled={disabled}
        onChange={(e) => onChange && onChange(e.target.checked)}
        style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }} {...rest} />
    </label>
  );
}
