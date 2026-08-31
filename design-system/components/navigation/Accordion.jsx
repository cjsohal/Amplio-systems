import React from 'react';
import { Icon } from '../core/Icon.jsx';

export function Accordion({ items = [], allowMultiple = false, defaultOpen = [], style }) {
  const [open, setOpen] = React.useState(defaultOpen);
  const toggle = (id) => setOpen((prev) =>
    prev.includes(id) ? prev.filter((x) => x !== id) : allowMultiple ? [...prev, id] : [id]);
  return (
    <div style={{ borderTop: '1px solid var(--border-subtle)', ...style }}>
      {items.map((it) => {
        const on = open.includes(it.id);
        return (
          <div key={it.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
            <button onClick={() => toggle(it.id)} aria-expanded={on}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                gap: 20, background: 'transparent', border: 0, cursor: 'pointer',
                padding: '22px 0', textAlign: 'left',
                fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)',
                color: on ? 'var(--text-brand)' : 'var(--text-heading)',
                transition: 'var(--transition-control)',
              }}>
              <span>{it.question}</span>
              <Icon name="chevron-down" size={20} style={{
                color: 'var(--amplio-green)', flex: 'none',
                transform: on ? 'rotate(180deg)' : 'rotate(0)',
                transition: `transform var(--duration-normal) var(--ease-out-soft)`,
              }} />
            </button>
            <div style={{
              display: 'grid', gridTemplateRows: on ? '1fr' : '0fr',
              transition: `grid-template-rows var(--duration-normal) var(--ease-out-soft)`,
            }}>
              <div style={{ overflow: 'hidden' }}>
                <div style={{
                  fontFamily: 'var(--font-body)', fontSize: 'var(--text-base)',
                  lineHeight: 'var(--leading-relaxed)', color: 'var(--text-body)',
                  paddingBottom: 24, maxWidth: 'var(--measure)',
                }}>{it.answer}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
