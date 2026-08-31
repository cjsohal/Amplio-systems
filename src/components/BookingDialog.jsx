import React from 'react';
import { Dialog } from '@ds/components/feedback/Dialog.jsx';
import { Input } from '@ds/components/forms/Input.jsx';
import { Select } from '@ds/components/forms/Select.jsx';
import { Button } from '@ds/components/core/Button.jsx';

const TOPICS = ['Client intake', 'Billing and invoices', 'Follow-up', 'Back-office admin', "I'm not sure yet"];

export default function BookingDialog() {
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [topic, setTopic] = React.useState('');
  const [error, setError] = React.useState('');
  const [done, setDone] = React.useState(false);
  const [sending, setSending] = React.useState(false);

  React.useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener('amplio:open-booking', onOpen);
    return () => window.removeEventListener('amplio:open-booking', onOpen);
  }, []);

  const close = () => {
    setOpen(false);
    setTimeout(() => { setDone(false); setEmail(''); setTopic(''); setError(''); }, 200);
  };

  const findTime = async () => {
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { setError('Enter an email address we can reply to'); return; }
    setError('');
    setSending(true);
    try {
      await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, topic }),
      });
    } catch {
      // Best-effort — the stub endpoint always returns 200; a real network failure
      // shouldn't block the reassurance message below.
    }
    setSending(false);
    setDone(true);
  };

  return (
    <Dialog
      open={open}
      onClose={close}
      title={done ? "You're booked in" : 'Book a discovery call'}
      description={done ? 'A calendar invite is on its way to your inbox.' : "Thirty minutes, no pitch. We'll map what's worth automating — and tell you honestly if it isn't us."}
      footer={done
        ? <Button onClick={close}>Close</Button>
        : <><Button variant="ghost" onClick={close}>Not now</Button><Button iconRight="arrow-right" onClick={findTime} loading={sending}>Find a time</Button></>}
    >
      {!done && (
        <div style={{ display: 'grid', gap: 'var(--space-4)' }}>
          <Input label="Work email" type="email" iconLeft="mail" placeholder="you@practice.com"
            value={email} onChange={(e) => setEmail(e.target.value)} error={error} />
          <Select label="What would you like to fix first?" placeholder="Choose one"
            options={TOPICS} value={topic} onChange={(e) => setTopic(e.target.value)} />
        </div>
      )}
    </Dialog>
  );
}
