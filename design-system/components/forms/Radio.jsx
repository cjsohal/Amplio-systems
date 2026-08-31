import React from 'react';

export function Radio({ label, description, checked = false, onChange, name, value, disabled, style, ...rest }) {
  return (
    <label style={{ display: 'flex', gap: 12, alignItems: 'flex-start', cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.55 : 1, ...style }}>
      <span style={{
        width: 20, height: 20, flex: 'none', marginTop: 2, borderRadius: '50%',
        display: 'grid', placeItems: 'center', background: 'var(--surface-card)',
        border: `1px solid ${checked ? 'var(--amplio-green)' : 'var(--border-strong)'}`,
        transition: 'var(--transition-control)',
      }}>
        {checked && <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--amplio-green)' }} />}
      </span>
      <input type="radio" name={name} value={value} checked={checked} disabled={disabled}
        onChange={() => onChange && onChange(value)}
        style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }} {...rest} />
      <span>
        <span style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--text-heading)', lineHeight: 1.5 }}>{label}</span>
        {description && <span style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginTop: 2 }}>{description}</span>}
      </span>
    </label>
  );
}

export function RadioGroup({ legend, children, style }) {
  return (
    <fieldset style={{ border: 0, padding: 0, margin: 0, display: 'grid', gap: 12, ...style }}>
      {legend && <legend style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-bold)', color: 'var(--text-heading)', padding: 0, marginBottom: 4 }}>{legend}</legend>}
      {children}
    </fieldset>
  );
}
