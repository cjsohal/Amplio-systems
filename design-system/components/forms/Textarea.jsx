import React from 'react';
import { fieldLabelStyle, fieldHintStyle } from './Input.jsx';

export function Textarea({ label, hint, error, rows = 4, disabled, required, value, onChange, placeholder, id, style, ...rest }) {
  const [focused, setFocused] = React.useState(false);
  const invalid = !!error;
  const fieldId = id || 'amplio-textarea';
  return (
    <div style={{ ...style }}>
      {label && <label htmlFor={fieldId} style={fieldLabelStyle}>{label}{required && <span style={{ color: 'var(--amplio-green)' }}> *</span>}</label>}
      <textarea
        id={fieldId} rows={rows} value={value} onChange={onChange} placeholder={placeholder}
        disabled={disabled} required={required}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{
          width: '100%', resize: 'vertical', display: 'block',
          background: disabled ? 'var(--neutral-100)' : 'var(--surface-card)',
          border: `1px solid ${invalid ? 'var(--clay-600)' : focused ? 'var(--amplio-green)' : 'var(--border-default)'}`,
          borderRadius: 'var(--radius-field)', padding: '12px 14px',
          boxShadow: focused ? 'var(--ring-focus)' : 'var(--shadow-inset-field)',
          fontFamily: 'var(--font-body)', fontSize: 'var(--text-base)',
          lineHeight: 'var(--leading-normal)', color: 'var(--text-heading)',
          outline: 'none', transition: 'var(--transition-control)',
        }}
        {...rest}
      />
      {(error || hint) && <div style={fieldHintStyle(invalid)}>{error || hint}</div>}
    </div>
  );
}
