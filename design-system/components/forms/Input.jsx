import React from 'react';
import { Icon } from '../core/Icon.jsx';

export const fieldShellStyle = (focused, invalid, disabled) => ({
  display: 'flex', alignItems: 'center', gap: 10,
  background: disabled ? 'var(--neutral-100)' : 'var(--surface-card)',
  border: `1px solid ${invalid ? 'var(--clay-600)' : focused ? 'var(--amplio-green)' : 'var(--border-default)'}`,
  borderRadius: 'var(--radius-field)', padding: '0 14px', minHeight: 46,
  boxShadow: focused ? 'var(--ring-focus)' : 'var(--shadow-inset-field)',
  transition: 'var(--transition-control)',
});

export const fieldLabelStyle = {
  display: 'block', fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)',
  fontWeight: 'var(--weight-bold)', color: 'var(--text-heading)', marginBottom: 6,
};

export const fieldHintStyle = (invalid) => ({
  fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)',
  color: invalid ? 'var(--clay-600)' : 'var(--text-muted)', marginTop: 6,
});

export function Input({
  label, hint, error, iconLeft, iconRight, disabled, required,
  value, onChange, placeholder, type = 'text', id, style, ...rest
}) {
  const [focused, setFocused] = React.useState(false);
  const invalid = !!error;
  const inputId = id || `amplio-input-${label ? label.replace(/\s+/g, '-').toLowerCase() : 'field'}`;
  return (
    <div style={{ ...style }}>
      {label && (
        <label htmlFor={inputId} style={fieldLabelStyle}>
          {label}{required && <span style={{ color: 'var(--amplio-green)' }}> *</span>}
        </label>
      )}
      <div style={fieldShellStyle(focused, invalid, disabled)}>
        {iconLeft && <Icon name={iconLeft} size={18} style={{ color: 'var(--text-muted)' }} />}
        <input
          id={inputId} type={type} value={value} onChange={onChange}
          placeholder={placeholder} disabled={disabled} required={required}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          style={{
            flex: 1, border: 0, outline: 'none', background: 'transparent',
            fontFamily: 'var(--font-body)', fontSize: 'var(--text-base)',
            color: 'var(--text-heading)', padding: '12px 0', minWidth: 0,
          }}
          {...rest}
        />
        {iconRight && <Icon name={iconRight} size={18} style={{ color: 'var(--text-muted)' }} />}
      </div>
      {(error || hint) && <div style={fieldHintStyle(invalid)}>{error || hint}</div>}
    </div>
  );
}
