import React from 'react';
import { Input } from '@ds/components/forms/Input.jsx';
import { Textarea } from '@ds/components/forms/Textarea.jsx';
import { Select } from '@ds/components/forms/Select.jsx';
import { Checkbox } from '@ds/components/forms/Checkbox.jsx';
import { Button } from '@ds/components/core/Button.jsx';
import { Alert } from '@ds/components/feedback/Alert.jsx';
import { Badge } from '@ds/components/core/Badge.jsx';

export default function ContactForm() {
  const [form, setForm] = React.useState({ name: '', email: '', practice: '', message: '', consent: false });
  const [error, setError] = React.useState('');
  const [sent, setSent] = React.useState(false);
  const [sending, setSending] = React.useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) { setError('Enter an email address we can reply to'); return; }
    setError('');
    setSending(true);
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
    } catch {
      // Best-effort — see the TODO in functions/api/contact.js.
    }
    setSending(false);
    setSent(true);
  };

  if (sent) {
    return (
      <div style={{ display: 'grid', gap: 'var(--space-6)' }}>
        <Alert tone="success" title="Thanks — that's with us">We'll reply from a real address, usually the same working day.</Alert>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--text-body)', margin: 0 }}>
          In the meantime, the services page walks through what the first three weeks look like.
        </p>
        <Button variant="ghost" iconLeft="arrow-left" onClick={() => setSent(false)} style={{ justifySelf: 'start' }}>Send another</Button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate style={{ display: 'grid', gap: 'var(--space-5)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-5)' }}>
        <Input label="Your name" placeholder="Priya Raman" value={form.name} onChange={set('name')} />
        <Input label="Work email" type="email" iconLeft="mail" placeholder="you@practice.com" required
          value={form.email} onChange={set('email')} error={error} />
      </div>
      <Select label="What kind of practice do you run?" placeholder="Choose one" value={form.practice} onChange={set('practice')}
        options={['Coaching', 'Chiropractic', 'Consulting', 'Other practitioner', 'Something else']} />
      <Textarea label="What's draining your time right now?" rows={5}
        placeholder="Chasing invoices, rescheduling clients, writing the same email twice a day…"
        value={form.message} onChange={set('message')} />
      <Checkbox label="Send me the monthly automation note" description="One email a month. Unsubscribe any time."
        checked={form.consent} onChange={(v) => setForm({ ...form, consent: v })} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
        <Button type="submit" size="lg" iconRight="send" loading={sending}>Send it over</Button>
        <Badge tone="neutral" icon="shield-check">We never share your details</Badge>
      </div>
    </form>
  );
}
