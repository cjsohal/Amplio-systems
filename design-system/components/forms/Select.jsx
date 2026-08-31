import React from 'react';
import { Icon } from '../core/Icon.jsx';
import { fieldLabelStyle, fieldHintStyle } from './Input.jsx';

export function Select({ label, hint, error, options = [], value, onChange, disabled, required, placeholder, id, style, ...rest }) {
  const [focused, setFocused] = React.useState(false);
  const invalid = !!error;
  const fieldId = id || 'amplio-select';
  return (
    <div style={{ ...style }}>
      {label && <label htmlFor={fieldId} style={fieldLabelStyle}>{label}{required && <span style={{ color: 'var(--amplio-green)' }}> *</span>}</label>}
      <div style={{ position: 'relative' }}>
        <select
          id={fieldId} value={value} onChange={onChange} disabled={disabled} required={required}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          style={{
            width: '100%', appearance: 'none', WebkitAppearance: 'none',
            background: disabled ? 'var(--neutral-100)' : 'var(--surface-card)',
            border: `1px solid ${invalid ? 'var(--clay-600)' : focused ? 'var(--amplio-green)' : 'var(--border-default)'}`,
            borderRadius: 'var(--radius-field)', padding: '13px 44px 13px 14px', minHeight: 46,
            boxShadow: focused ? 'var(--ring-focus)' : 'var(--shadow-inset-field)',
            fontFamily: 'var(--font-body)', fontSize: 'var(--text-base)',
            color: value ? 'var(--text-heading)' : 'var(--text-muted)',
            outline: 'none', cursor: disabled ? 'not-allowed' : 'pointer',
            transition: 'var(--transition-control)',
          }}
          {...rest}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((o) => {
            const opt = typeof o === 'string' ? { value: o, label: o } : o;
            return <option key={opt.value} value={opt.value}>{opt.label}</option>;
          })}
        </select>
        <Icon name="chevron-down" size={18} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
      </div>
      {(error || hint) && <div style={fieldHintStyle(invalid)}>{error || hint}</div>}
    </div>
  );
}
