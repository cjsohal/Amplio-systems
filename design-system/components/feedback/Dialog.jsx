import React from 'react';
import { IconButton } from '../core/IconButton.jsx';

export function Dialog({ open, title, description, children, footer, onClose, width = 520, style }) {
  if (!open) return null;
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 100, display: 'grid', placeItems: 'center',
        padding: 'var(--space-6)', background: 'var(--surface-scrim)',
        backdropFilter: 'var(--blur-glass)', WebkitBackdropFilter: 'var(--blur-glass)',
        animation: `amplio-fade var(--duration-normal) var(--ease-out-soft)`,
      }}
    >
      <div
        role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: width, background: 'var(--surface-card)',
          borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-xl)',
          padding: 'var(--space-8)', position: 'relative',
          animation: `amplio-rise var(--duration-normal) var(--ease-entrance)`, ...style,
        }}
      >
        {onClose && (
          <div style={{ position: 'absolute', top: 14, right: 14 }}>
            <IconButton icon="x" label="Close" size="sm" onClick={onClose} />
          </div>
        )}
        {title && <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', color: 'var(--text-heading)', margin: '0 0 8px', paddingRight: 32 }}>{title}</h2>}
        {description && <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--text-body)', margin: '0 0 20px', maxWidth: 'none' }}>{description}</p>}
        {children}
        {footer && <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', marginTop: 'var(--space-6)' }}>{footer}</div>}
      </div>
    </div>
  );
}
