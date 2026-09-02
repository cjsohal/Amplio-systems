import React from 'react';
import { Logo } from '@ds/components/core/Logo.jsx';
import { Button } from '@ds/components/core/Button.jsx';
import { IconButton } from '@ds/components/core/IconButton.jsx';
import { Icon } from '@ds/components/core/Icon.jsx';
import { BOOKING_URL } from '@data/site.js';

export const NAV = [
  { href: '/about/', label: 'About Us' },
  {
    href: '/ai-automation/', label: 'AI Automation', children: [
      { href: '/ai-automation/ai-powered-reviews/', label: 'AI Powered Reviews', description: 'Google reviews on autopilot' },
      { href: '/ai-automation/ai-voice-receptionist/', label: 'AI Voice Receptionist', description: 'Enquiries answered 24/7' },
      { href: '/ai-automation/ai-seo/', label: 'AI SEO', description: 'Visibility in search and in LLMs' },
      { href: '/ai-automation/ai-strategy/', label: 'AI Strategy', description: 'A roadmap before the tools' },
    ],
  },
  { href: '/atlas/', label: 'Atlas' },
  { href: '/contact/', label: 'Contact' },
];

function isActive(n, page) {
  return page === n.href || (n.children || []).some((c) => c.href === page);
}

function NavItem({ n, page }) {
  const [open, setOpen] = React.useState(false);
  const active = isActive(n, page);

  const linkStyle = {
    display: 'inline-flex', alignItems: 'center', gap: 5,
    fontFamily: 'var(--font-body)', fontSize: 'var(--text-base)',
    fontWeight: 'var(--weight-regular)',
    color: 'var(--deep-fern)', textDecoration: 'none',
    borderBottom: `2px solid ${active ? 'var(--amplio-green)' : 'transparent'}`,
    paddingBottom: 3,
  };

  if (!n.children) {
    return <a href={n.href} style={linkStyle}>{n.label}</a>;
  }

  return (
    <span
      style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: 2 }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false); }}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          // Close, then blur whatever's focused inside this group — refocusing the
          // trigger link itself would re-fire onFocus below and immediately reopen it.
          setOpen(false);
          if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
        }
      }}
    >
      <a href={n.href} style={linkStyle}>{n.label}</a>
      <button
        type="button" aria-label={`${open ? 'Close' : 'Open'} ${n.label} menu`} aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        style={{
          display: 'inline-flex', alignItems: 'center', background: 'transparent', border: 0,
          padding: 4, margin: 0, cursor: 'pointer', color: 'var(--deep-fern)', opacity: 0.7,
        }}
      >
        <Icon name="chevron-down" size={15} style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform var(--duration-fast) var(--ease-out-soft)' }} />
      </button>
      {open && (
        <div style={{ position: 'absolute', top: '100%', left: -14, paddingTop: 14, zIndex: 60 }}>
          <div style={{
            background: 'var(--surface-card)', borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-lg)', border: '1px solid var(--border-subtle)',
            padding: 'var(--space-2)', minWidth: 260,
          }}>
            {n.children.map((c) => (
              <a key={c.href} href={c.href}
                style={{
                  display: 'block', padding: '10px 14px', borderRadius: 'var(--radius-md)',
                  textDecoration: 'none',
                  background: c.href === page ? 'var(--green-50)' : 'transparent',
                }}>
                <span style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-bold)', color: 'var(--text-heading)' }}>{c.label}</span>
                {c.description && <span style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginTop: 2 }}>{c.description}</span>}
              </a>
            ))}
          </div>
        </div>
      )}
    </span>
  );
}

export default function SiteHeader({ page }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: 'var(--neutral-0)',
      borderBottom: `1px solid ${scrolled ? 'var(--border-subtle)' : 'var(--neutral-100)'}`,
      boxShadow: scrolled ? 'var(--shadow-sm)' : 'none',
      transition: 'border-color var(--duration-normal) var(--ease-out-soft), box-shadow var(--duration-normal) var(--ease-out-soft)',
    }}>
      <div style={{
        maxWidth: 'var(--container-xl)', margin: '0 auto', padding: '14px var(--space-8)',
        display: 'flex', alignItems: 'center', gap: 'var(--space-12)',
      }}>
        <a href="/" style={{ lineHeight: 0, flex: 'none' }}>
          <Logo height={40} />
        </a>
        <nav className="site-nav" style={{ gap: 'var(--space-10)' }}>
          {NAV.map((n) => <NavItem key={n.href} n={n} page={page} />)}
        </nav>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <Button size="sm" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">Get in touch</Button>
          <span className="site-burger">
            <IconButton icon={mobileOpen ? 'x' : 'menu'} label="Menu" onClick={() => setMobileOpen((o) => !o)} />
          </span>
        </div>
      </div>
      {mobileOpen && (
        <div style={{ borderTop: '1px solid var(--border-subtle)', background: 'var(--surface-card)', padding: 'var(--space-4) var(--space-8)', display: 'grid', gap: 'var(--space-4)' }}>
          {NAV.map((n) => (
            <React.Fragment key={n.href}>
              <a href={n.href} onClick={() => setMobileOpen(false)}
                style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-md)', color: 'var(--text-heading)', textDecoration: 'none' }}>{n.label}</a>
              {(n.children || []).map((c) => (
                <a key={c.href} href={c.href} onClick={() => setMobileOpen(false)}
                  style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--text-body)', textDecoration: 'none', paddingLeft: 'var(--space-5)' }}>{c.label}</a>
              ))}
            </React.Fragment>
          ))}
        </div>
      )}
    </header>
  );
}
