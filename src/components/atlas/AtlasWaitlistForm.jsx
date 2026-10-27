import React from 'react';
import { Input } from '@ds/components/forms/Input.jsx';
import { Select } from '@ds/components/forms/Select.jsx';
import { Checkbox } from '@ds/components/forms/Checkbox.jsx';
import { Button } from '@ds/components/core/Button.jsx';
import { Alert } from '@ds/components/feedback/Alert.jsx';
import Honeypot from '@components/Honeypot.jsx';
import { trackLead } from '@/lib/track.js';

const ORG_TYPES = ['Housing association', 'Local authority', 'Developer', 'Consultancy or advisor', 'Other'];

/* Short on purpose: it's filled in on a phone, standing up, at an event. Name, work email and
   organisation are all we need to follow up. A `?src=` tag on the shared link (e.g.
   /atlas/waitlist/?src=conference) is passed along so sign-ups from different events can be
   told apart. */
export default function AtlasWaitlistForm() {
  const [f, setF] = React.useState({
    name: '', email: '', org: '', orgType: '', position: '', consent: false, marketingConsent: false, hp_website: '', src: '',
  });
  const [errors, setErrors] = React.useState({});
  const [sent, setSent] = React.useState(false);
  const [sending, setSending] = React.useState(false);
  const [sendError, setSendError] = React.useState(false);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  React.useEffect(() => {
    try {
      const src = new URLSearchParams(window.location.search).get('src') || '';
      if (src) setF((cur) => ({ ...cur, src: src.slice(0, 60) }));
    } catch {}
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    const next = {};
    if (!f.name.trim()) next.name = 'We need your name';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.email)) next.email = 'Enter an email address we can reach you on';
    if (!f.org.trim()) next.org = 'We need your organisation';
    if (!f.consent) next.consent = 'Please confirm you’re happy for us to contact you about Atlas';
    setErrors(next);
    if (Object.keys(next).length !== 0) return;

    setSending(true);
    setSendError(false);
    try {
      const res = await fetch('/api/atlas-waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(f),
      });
      if (!res.ok) throw new Error('request failed');
      trackLead('atlas-waitlist');
      setSent(true);
    } catch {
      setSendError(true);
    }
    setSending(false);
  };

  if (sent) {
    return (
      <div style={{ display: 'grid', gap: 'var(--space-5)' }}>
        <Alert tone="success" title="You’re on the list">
          Thanks, {f.name.trim().split(' ')[0]} — we’ll be in touch about Atlas.
        </Alert>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--text-body)', margin: 0 }}>
          In the meantime, the Atlas page shows what the platform is designed to help you decide.
        </p>
        <div><Button variant="secondary" href="/atlas/">See what Atlas does</Button></div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate style={{ display: 'grid', gap: 'var(--space-5)' }}>
      <Input label="Your name" required autoComplete="name" value={f.name} onChange={set('name')} error={errors.name} />
      <Input label="Work email" type="email" required iconLeft="mail" autoComplete="email" placeholder="you@organisation.org.uk"
        value={f.email} onChange={set('email')} error={errors.email} />
      <Input label="Organisation" required autoComplete="organization" value={f.org} onChange={set('org')} error={errors.org} />
      <div className="grid-stack-sm" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-5)' }}>
        <Select label="Type of organisation" placeholder="Choose one" options={ORG_TYPES} value={f.orgType} onChange={set('orgType')} />
        <Input label="Your role" hint="Optional" placeholder="Optional" autoComplete="organization-title" value={f.position} onChange={set('position')} />
      </div>

      <div style={{ display: 'grid', gap: 'var(--space-3)' }}>
        <Checkbox label="Happy for us to contact you about Atlas" required
          checked={f.consent} onChange={(v) => setF({ ...f, consent: v })} />
        {errors.consent && (
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'var(--clay-600)' }}>{errors.consent}</div>
        )}
        <Checkbox label="Happy to hear about other Amplio products and services"
          checked={f.marketingConsent} onChange={(v) => setF({ ...f, marketingConsent: v })} />
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)', margin: 0 }}>
          We’ll never share your details with a third party. <a href="/privacy/">Read our privacy notice</a>.
        </p>
        <Honeypot value={f.hp_website} onChange={set('hp_website')} />
      </div>

      {sendError && (
        <Alert tone="danger" title="That didn’t send">
          Something went wrong on our end. Please try again, or email{' '}
          <a href="mailto:info@ampliosystemsltd.com">info@ampliosystemsltd.com</a>.
        </Alert>
      )}

      <div><Button type="submit" size="lg" iconRight="send" loading={sending}>Join the waitlist</Button></div>
    </form>
  );
}
