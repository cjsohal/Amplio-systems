import React from 'react';
import { Icon } from '@ds/components/core/Icon.jsx';

const KEY_INSIGHTS = [
  'High rental demand in 2–3 bed properties',
  'Strong alignment with local plan priorities',
  'Good access to transport and services',
];

/* The map is passed in as `children` from the .astro page — <AtlasDashboard><MapPanel
   client:only="react" .../></AtlasDashboard> — rather than imported and rendered directly in
   this file. Astro only knows how to attach a client directive, and skip server-rendering, for
   a framework component written as a *direct child* of another component's tag in an .astro
   template; a component passed through a named prop (e.g. mapPanel={<MapPanel .../>}) compiles
   to an Astro-internal chunk object instead of a real React element, which breaks server
   rendering of the parent (AtlasDashboard, here) entirely. */
export default function AtlasDashboard({ children }) {
  return (
    <div style={{ background: 'var(--surface-card)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-xl)', overflow: 'hidden', display: 'grid', gridTemplateColumns: '52px 1fr' }}>
      <div style={{ background: 'var(--neutral-100)', borderRight: '1px solid var(--border-subtle)', padding: '16px 0', display: 'grid', gap: 18, justifyContent: 'center', alignContent: 'start', color: 'var(--text-subtle)' }}>
        {['workflow', 'search', 'map-pin', 'file-text', 'trending-up', 'list-checks', 'users', 'bell', 'settings'].map((n) => <Icon key={n} name={n} size={17} />)}
      </div>
      <div style={{ padding: 'var(--space-6)' }}>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-bold)', color: 'var(--text-heading)' }}>Opportunity overview</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginTop: 14 }}>
          {[['Overall score', '85', 'High potential'], ['Homes needed', '1,240', 'Over 10 years'], ['Affordable need', '68%', 'of total need']].map(([k, v, s]) => (
            <div key={k} style={{ border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: 12 }}>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 10, color: 'var(--text-muted)' }}>{k}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', lineHeight: 1.1, color: 'var(--text-heading)', marginTop: 4 }}>{v}</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 10, color: 'var(--deep-fern)', marginTop: 2 }}>{s}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 12 }}>
          <div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', fontWeight: 'var(--weight-bold)', color: 'var(--text-heading)', marginBottom: 8 }}>Key insights</div>
            <div style={{ display: 'grid', gap: 7 }}>
              {KEY_INSIGHTS.map((t) => (
                <div key={t} style={{ display: 'flex', gap: 7, alignItems: 'flex-start' }}>
                  <Icon name="circle-check" size={13} style={{ color: 'var(--amplio-green)', marginTop: 2 }} />
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, lineHeight: 1.45, color: 'var(--text-body)' }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
