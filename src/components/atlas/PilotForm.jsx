import React from 'react';
import { Input } from '@ds/components/forms/Input.jsx';
import { Textarea } from '@ds/components/forms/Textarea.jsx';
import { Select } from '@ds/components/forms/Select.jsx';
import { Radio, RadioGroup } from '@ds/components/forms/Radio.jsx';
import { Checkbox } from '@ds/components/forms/Checkbox.jsx';
import { Button } from '@ds/components/core/Button.jsx';
import { Alert } from '@ds/components/feedback/Alert.jsx';
import { Badge } from '@ds/components/core/Badge.jsx';
import { Eyebrow } from '@ds/components/marketing/Eyebrow.jsx';

const ORG_TYPES = [
  { value: 'ha', label: 'Housing Association', description: 'The focus of our first pilot cohort.' },
  { value: 'la', label: 'Local Authority', description: 'Welcome to apply — a later phase.' },
  { value: 'other', label: 'Other', description: 'Developer, consultancy, ALMO, or something else.' },
];

const HOME_BANDS = [
  'Fewer than 500',
  '500 – 2,000',
  '2,001 – 5,000',
  '5,001 – 10,000',
  '10,001 – 25,000',
  'More than 25,000',
];

const DECISION_HELP = [
  'Where to build next',
  'Which sites to prioritise',
  'Whether a scheme stacks up',
  'Understanding local housing need',
  'Reporting impact to our board',
  'Not sure yet',
];

export default function PilotForm() {
  const [f, setF] = React.useState({
    org: '', orgType: '', orgTypeOther: '', name: '', position: '', email: '', phone: '',
    homes: '', region: '', focus: '', notes: '', consent: false,
  });
  const [errors, setErrors] = React.useState({});
  const [sent, setSent] = React.useState(false);
  const [sending, setSending] = React.useState(false);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    const next = {};
    if (!f.org.trim()) next.org = 'We need the organisation name';
    if (!f.orgType) next.orgType = 'Choose the closest match';
    if (!f.name.trim()) next.name = 'We need your name';
    if (!f.position.trim()) next.position = 'Your role helps us pitch the first conversation right';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.email)) next.email = 'Enter an email address we can reply to';
    if (!f.homes) next.homes = 'Pick the closest range';
    setErrors(next);
    if (Object.keys(next).length !== 0) return;

    setSending(true);
    try {
      await fetch('/api/pilot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(f),
      });
    } catch {
      // Best-effort — see the TODO in functions/api/pilot.js.
    }
    setSending(false);
    setSent(true);
  };

  const laterPhase = f.orgType === 'la' || f.orgType === 'other';

  if (sent) {
    return (
      <div style={{ display: 'grid', gap: 'var(--space-6)' }}>
        <Alert tone="success" title="Application received">
          Thanks — that's with us. We read every application ourselves and reply from a real address.
        </Alert>
        {laterPhase && (
          <Alert tone="info" title="One thing to flag">
            Our first cohort is housing associations, so we may not come back to you straight
            away. We'll keep your details for the next phase.
          </Alert>
        )}
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--text-body)', margin: 0 }}>
          In the meantime, the Atlas page walks through what the platform is designed to answer.
        </p>
        <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
          <Button variant="secondary" href="/atlas/">Back to Atlas</Button>
          <Button variant="ghost" iconLeft="arrow-left" onClick={() => setSent(false)}>Edit application</Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate style={{ display: 'grid', gap: 'var(--space-6)' }}>
      <div>
        <Eyebrow style={{ marginBottom: 'var(--space-4)' }}>Your organisation</Eyebrow>
        <div style={{ display: 'grid', gap: 'var(--space-5)' }}>
          <Input label="Organisation name" required placeholder="e.g. Northampton Partnership Homes"
            value={f.org} onChange={set('org')} error={errors.org} />

          <div>
            <RadioGroup legend="What kind of organisation are you?">
              {ORG_TYPES.map((t) => (
                <Radio key={t.value} name="orgType" value={t.value} label={t.label} description={t.description}
                  checked={f.orgType === t.value} onChange={(v) => setF({ ...f, orgType: v })} />
              ))}
            </RadioGroup>
            {errors.orgType && (
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'var(--clay-600)', marginTop: 6 }}>{errors.orgType}</div>
            )}
            {f.orgType === 'other' && (
              <Input style={{ marginTop: 'var(--space-4)' }} label="Tell us what kind"
                placeholder="Developer, ALMO, consultancy…" value={f.orgTypeOther} onChange={set('orgTypeOther')} />
            )}
            {laterPhase && (
              <Alert tone="info" style={{ marginTop: 'var(--space-4)' }}
                title="Housing associations first">
                You're welcome to apply. We'll hold your details for the next phase rather than
                promise a place in this one.
              </Alert>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-5)' }}>
            <Select label="Homes owned or managed" required placeholder="Choose a range"
              options={HOME_BANDS} value={f.homes} onChange={set('homes')} error={errors.homes} />
            <Input label="Where do you operate?" placeholder="e.g. East Midlands"
              value={f.region} onChange={set('region')} />
          </div>
        </div>
      </div>

      <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: 'var(--space-6)' }}>
        <Eyebrow style={{ marginBottom: 'var(--space-4)' }}>About you</Eyebrow>
        <div style={{ display: 'grid', gap: 'var(--space-5)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-5)' }}>
            <Input label="Your name" required placeholder="Priya Raman"
              value={f.name} onChange={set('name')} error={errors.name} />
            <Input label="Your position" required placeholder="Director of Development"
              value={f.position} onChange={set('position')} error={errors.position} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-5)' }}>
            <Input label="Work email" type="email" required iconLeft="mail" placeholder="you@organisation.org.uk"
              value={f.email} onChange={set('email')} error={errors.email} />
            <Input label="Phone" iconLeft="phone" hint="Optional" placeholder="Optional"
              value={f.phone} onChange={set('phone')} />
          </div>
        </div>
      </div>

      <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: 'var(--space-6)' }}>
        <Eyebrow style={{ marginBottom: 'var(--space-4)' }}>What you need</Eyebrow>
        <div style={{ display: 'grid', gap: 'var(--space-5)' }}>
          <Select label="What would you most want Atlas to help you decide?" placeholder="Choose the closest"
            options={DECISION_HELP} value={f.focus} onChange={set('focus')} />
          <Textarea label="Anything else we should know?" rows={4}
            placeholder="The decision you're wrestling with right now, or what would make this worth your time."
            value={f.notes} onChange={set('notes')} />
        </div>
      </div>

      <Checkbox label="Happy for us to contact you about the Atlas pilot"
        description="Nothing else, and nothing shared with anyone else."
        checked={f.consent} onChange={(v) => setF({ ...f, consent: v })} />

      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
        <Button type="submit" size="lg" iconRight="send" loading={sending}>Submit application</Button>
        <Badge tone="neutral" icon="shield-check">No commitment either way</Badge>
      </div>
    </form>
  );
}
