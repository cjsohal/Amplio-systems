import React from 'react';
import { Tabs } from '@ds/components/navigation/Tabs.jsx';
import { Card } from '@ds/components/core/Card.jsx';
import { Icon } from '@ds/components/core/Icon.jsx';
import { Badge } from '@ds/components/core/Badge.jsx';
import { Button } from '@ds/components/core/Button.jsx';
import { Eyebrow } from '@ds/components/marketing/Eyebrow.jsx';

const SERVICE_TABS = [
  { id: 'intake', label: 'Client intake', icon: 'inbox' },
  { id: 'billing', label: 'Billing', icon: 'file-text' },
  { id: 'followup', label: 'Follow-up', icon: 'repeat' },
  { id: 'admin', label: 'Back office', icon: 'list-checks' },
];

const SERVICE_DETAIL = {
  intake: {
    title: 'Every enquiry answered before it goes cold',
    body: 'Most practices lose work in the gap between someone getting in touch and someone replying. We close that gap without adding a receptionist.',
    points: ['Instant, human-sounding reply to every enquiry', 'Qualifying questions asked automatically', 'Booking straight into your real calendar', 'Reminders that cut no-shows', 'A weekly summary of who came in and from where'],
    outcome: 'Typical result: same-day response on every enquiry, and roughly four hours a week back.',
  },
  billing: {
    title: 'Money that arrives without you asking twice',
    body: "Invoicing is the task most people put off, and the one that costs most when they do. We make it something that has already happened.",
    points: ['Invoices raised from completed sessions', 'Polite, escalating reminders you never have to write', 'Payment reconciliation into your accounts tool', 'Monthly figures ready for your accountant', 'Nothing sent in your name that you have not approved'],
    outcome: 'Typical result: payment terms met more often, and no Sunday-evening invoicing.',
  },
  followup: {
    title: 'The check-in you meant to send, sent',
    body: 'Follow-up is where relationships and repeat work live, and it is the first thing to slip in a busy week. This runs whether your week is busy or not.',
    points: ['Post-session notes and next steps sent automatically', 'Re-engagement for clients who have gone quiet', 'Review and referral requests at the right moment', 'Seasonal or programme-based check-in sequences', 'Everything written in your voice, approved once'],
    outcome: 'Typical result: more repeat bookings from clients you already have.',
  },
  admin: {
    title: 'The work nobody sees, quietly done',
    body: 'The small tasks that are individually trivial and collectively exhausting: filing, reminders, records, handovers.',
    points: ['Notes and documents filed where you will find them', 'Reminders set from what was actually agreed', 'Client records kept current across your tools', 'Onboarding and offboarding checklists that run themselves', 'Documented systems you could hand to a new hire'],
    outcome: 'Typical result: a practice that keeps running the week you are away.',
  },
};

export default function ServiceTabs() {
  const [tab, setTab] = React.useState('intake');
  const d = SERVICE_DETAIL[tab];
  return (
    <>
      <Tabs tabs={SERVICE_TABS} value={tab} onChange={setTab} />
      <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: 'var(--space-16)', marginTop: 'var(--space-12)', alignItems: 'start' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px,3vw,38px)', lineHeight: 'var(--leading-snug)', color: 'var(--text-heading)', margin: 0 }}>{d.title}</h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-md)', lineHeight: 'var(--leading-relaxed)', color: 'var(--text-body)', margin: 'var(--space-5) 0 0' }}>{d.body}</p>
          <div style={{ display: 'grid', gap: 'var(--space-4)', marginTop: 'var(--space-8)' }}>
            {d.points.map((p) => (
              <div key={p} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <Icon name="check" size={18} style={{ color: 'var(--amplio-green)', marginTop: 3 }} />
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-base)', lineHeight: 'var(--leading-normal)', color: 'var(--text-body)' }}>{p}</span>
              </div>
            ))}
          </div>
        </div>
        <Card variant="sage" padding="lg">
          <Eyebrow style={{ marginBottom: 'var(--space-4)' }}>What it's worth</Eyebrow>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', lineHeight: 'var(--leading-snug)', color: 'var(--text-heading)', margin: 0 }}>{d.outcome}</p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', margin: 'var(--space-6) 0' }}>
            <Badge tone="neutral" icon="clock">3 weeks</Badge>
            <Badge tone="neutral" icon="plug">Your existing tools</Badge>
            <Badge tone="neutral" icon="shield-check">Documented handover</Badge>
          </div>
          <Button fullWidth iconRight="arrow-right" data-open-booking>Talk about this one</Button>
        </Card>
      </div>
    </>
  );
}
