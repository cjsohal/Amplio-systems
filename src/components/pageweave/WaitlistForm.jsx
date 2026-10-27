import React from 'react';
import { Input } from '@ds/components/forms/Input.jsx';
import { Checkbox } from '@ds/components/forms/Checkbox.jsx';
import { Button } from '@ds/components/core/Button.jsx';
import { Alert } from '@ds/components/feedback/Alert.jsx';
import { Icon } from '@ds/components/core/Icon.jsx';
import Honeypot from '@components/Honeypot.jsx';
import { SURVEY } from '@data/pageweaveSurvey.js';
import { trackLead } from '@/lib/track.js';

// Campaign tags carried from the ad click into the notification email, so each sign-up can be
// traced to the ad that earned it. Only these keys are read; the Worker caps their length again.
const TRACKING_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid'];

function readTracking() {
  try {
    const params = new URLSearchParams(window.location.search);
    const out = {};
    for (const k of TRACKING_KEYS) {
      const v = params.get(k);
      if (v) out[k] = v.slice(0, 200);
    }
    return out;
  } catch {
    return {};
  }
}

const DETAILS_STEP = SURVEY.length; // five questions (steps 0-4), then the contact details

const headingStyle = {
  fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'var(--text-xl)',
  lineHeight: 'var(--leading-snug)', color: 'var(--text-heading)', margin: 0, outline: 'none',
};
const mutedStyle = {
  fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)',
  margin: 0, lineHeight: 'var(--leading-normal)',
};

// The selectable answer. A real radio input (keyboard and screen-reader friendly) wrapped in a
// styled label; `.pw-opt` rules in the <style> below give it the Amplio hover and focus states.
function Option({ name, value, checked, onChange, onPick }) {
  return (
    <label className={`pw-opt${checked ? ' is-checked' : ''}`}>
      <input type="radio" name={name} value={value} checked={checked}
        onChange={() => onChange(value)}
        // A mouse or touch click carries detail >= 1; the click a keyboard arrow-key press
        // synthesises carries 0. Only the former auto-advances, so arrow keys can still browse.
        onClick={(e) => { if (e.detail > 0) onPick(value); }} />
      <span>{value}</span>
      {checked && <Icon name="check" size={16} />}
    </label>
  );
}

export default function WaitlistForm() {
  const [step, setStep] = React.useState(0);
  const [a, setA] = React.useState({}); // survey answers by key, plus `${key}Other` free text
  const [f, setF] = React.useState({ name: '', email: '', company: '', consent: false, marketingConsent: false, hp_website: '' });
  const [errors, setErrors] = React.useState({});
  const [sent, setSent] = React.useState(false);
  const [sending, setSending] = React.useState(false);
  const [sendError, setSendError] = React.useState(false);
  const headingRef = React.useRef(null);
  const advanceTimer = React.useRef(null);
  const mounted = React.useRef(false);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  // Move focus to the new step's heading so keyboard and screen-reader users land in the right
  // place. Skipped on first render so the page doesn't steal focus on load.
  React.useEffect(() => {
    if (mounted.current && headingRef.current) headingRef.current.focus();
    mounted.current = true;
  }, [step, sent]);
  React.useEffect(() => () => clearTimeout(advanceTimer.current), []);

  const q = SURVEY[step];
  const answered = q ? !!a[q.key] : false;
  const otherOpen = q && q.other && a[q.key] === 'Other';

  const choose = (value) => setA((prev) => ({ ...prev, [q.key]: value }));
  const go = (n) => { clearTimeout(advanceTimer.current); setStep(n); };
  const pick = (value) => {
    if (q.other && value === 'Other') return; // wait: they may want to add a few words
    clearTimeout(advanceTimer.current);
    advanceTimer.current = setTimeout(() => go(step + 1), 220);
  };

  const submit = async (e) => {
    e.preventDefault();
    const next = {};
    if (!f.name.trim()) next.name = 'We need a name to address you by';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.email)) next.email = 'Enter an email address we can reach you on';
    if (!f.consent) next.consent = 'Please confirm you’re happy for us to get in touch';
    setErrors(next);
    if (Object.keys(next).length !== 0) return;

    setSending(true);
    setSendError(false);
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...a, ...f, ...readTracking() }),
      });
      if (!res.ok) throw new Error('request failed');
      trackLead('pageweave-waitlist');
      setSent(true);
      // Meta Pixel "Lead" event, if the pixel has been added to the page. A no-op otherwise.
      if (typeof window.fbq === 'function') window.fbq('track', 'Lead');
    } catch {
      setSendError(true);
    }
    setSending(false);
  };

  const styles = (
    <style>{`
      .pw-opt{display:flex;align-items:center;gap:12px;min-height:46px;padding:10px 14px;box-sizing:border-box;
        background:var(--surface-card);border:1px solid var(--border-default);border-radius:var(--radius-field);
        font-family:var(--font-body);font-size:var(--text-base);color:var(--text-heading);cursor:pointer;
        position:relative;transition:var(--transition-control)}
      .pw-opt span{flex:1}
      .pw-opt input{position:absolute;opacity:0;width:1px;height:1px;margin:0}
      .pw-opt:hover{background:var(--green-50);border-color:var(--amplio-green)}
      .pw-opt:focus-within{border-color:var(--amplio-green);box-shadow:var(--ring-focus)}
      .pw-opt.is-checked{background:var(--green-50);border-color:var(--amplio-green);color:var(--deep-fern);font-weight:var(--weight-bold)}
      .pw-seg{height:4px;flex:1;border-radius:2px;background:var(--neutral-100)}
      .pw-seg.on{background:var(--amplio-green)}
    `}</style>
  );

  if (sent) {
    const keen = a.testing === 'Yes' || a.testing === 'Possibly';
    return (
      <div role="status" style={{ display: 'grid', gap: 'var(--space-5)', textAlign: 'left' }}>
        <span style={{ width: 52, height: 52, borderRadius: 'var(--radius-leaf)', background: 'var(--sage-mist)', color: 'var(--deep-fern)', display: 'grid', placeItems: 'center' }}>
          <Icon name="check" size={26} />
        </span>
        <h2 ref={headingRef} tabIndex={-1} style={{ ...headingStyle, fontSize: 'var(--text-2xl)' }}>You’re on the list</h2>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-base)', lineHeight: 'var(--leading-relaxed)', color: 'var(--text-body)', margin: 0 }}>
          Thanks, {f.name.trim().split(' ')[0]}. Your answers help us build the right thing.{' '}
          {keen
            ? 'You said you might like to help test an early version, so we’ll be in touch about that when it’s ready.'
            : 'We’ll email you when founding access opens.'}
        </p>
      </div>
    );
  }

  const segments = (
    <div aria-hidden="true" style={{ display: 'flex', gap: 6 }}>
      {Array.from({ length: DETAILS_STEP + 1 }, (_, i) => <span key={i} className={`pw-seg${i <= step ? ' on' : ''}`} />)}
    </div>
  );
  const stepLabel = step < DETAILS_STEP ? `Question ${step + 1} of ${SURVEY.length}` : 'Last step';

  // ── Steps 1-5: one question at a time ──
  if (q) {
    return (
      <div style={{ display: 'grid', gap: 'var(--space-4)' }}>
        {styles}
        {step === 0 && (
          <div>
            <h2 style={{ ...headingStyle, fontSize: 'var(--text-2xl)' }}>Join the early-access waiting list</h2>
            <p style={{ ...mutedStyle, fontSize: 'var(--text-sm)', color: 'var(--text-body)', marginTop: 'var(--space-2)' }}>
              Founding participants will have an opportunity to influence the product before launch.
              Five quick questions help us shape it.
            </p>
          </div>
        )}
        <div style={{ display: 'grid', gap: 'var(--space-2)' }}>
          {segments}
          <p style={mutedStyle}>{stepLabel}</p>
        </div>

        <fieldset style={{ border: 0, padding: 0, margin: 0, minWidth: 0, display: 'grid', gap: 'var(--space-3)' }}>
          <legend ref={headingRef} tabIndex={-1} style={{ ...headingStyle, padding: 0, marginBottom: 'var(--space-3)' }}>{q.question}</legend>
          {q.options.map((o) => (
            <Option key={o} name={q.key} value={o} checked={a[q.key] === o} onChange={choose} onPick={pick} />
          ))}
          {otherOpen && (
            <Input label="Tell us a little more" hint="Optional" placeholder="In a few words" maxLength={100}
              id={`pw-${q.key}-other`} value={a[`${q.key}Other`] || ''}
              onChange={(e) => setA({ ...a, [`${q.key}Other`]: e.target.value })} />
          )}
        </fieldset>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-3)' }}>
          {step > 0
            ? <Button variant="ghost" iconLeft="arrow-left" onClick={() => go(step - 1)}>Back</Button>
            : <span />}
          <Button variant={otherOpen ? 'primary' : 'secondary'} iconRight="arrow-right" disabled={!answered}
            onClick={() => go(step + 1)}>Next</Button>
        </div>
      </div>
    );
  }

  // ── Step 6: contact details and consent ──
  return (
    <form onSubmit={submit} noValidate style={{ display: 'grid', gap: 'var(--space-4)' }}>
      {styles}
      <div style={{ display: 'grid', gap: 'var(--space-2)' }}>
        {segments}
        <p style={mutedStyle}>{stepLabel}</p>
      </div>
      <h2 ref={headingRef} tabIndex={-1} style={headingStyle}>Where should we send updates?</h2>

      <div className="grid-stack-sm" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
        <Input label="First name" required placeholder="Priya" autoComplete="given-name" name="name"
          id="pw-name" value={f.name} onChange={set('name')} error={errors.name} />
        <Input label="Company" placeholder="Optional" autoComplete="organization" name="company"
          id="pw-company" value={f.company} onChange={set('company')} />
      </div>
      <Input label="Work email" type="email" required iconLeft="mail" placeholder="you@yourcompany.com"
        autoComplete="email" name="email" id="pw-email" value={f.email} onChange={set('email')} error={errors.email} />

      <div style={{ display: 'grid', gap: 'var(--space-3)' }}>
        <Checkbox label="I’m happy for Amplio to contact me about Pageweave early access" required
          checked={f.consent} onChange={(v) => setF({ ...f, consent: v })} />
        {errors.consent && (
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'var(--clay-600)' }}>{errors.consent}</div>
        )}
        <Checkbox label="Also keep me updated about other Amplio products and services"
          checked={f.marketingConsent} onChange={(v) => setF({ ...f, marketingConsent: v })} />
        <Honeypot value={f.hp_website} onChange={set('hp_website')} />
      </div>

      {sendError && (
        <Alert tone="danger" title="That didn’t send">
          Something went wrong on our end. Please try again, or email us at{' '}
          <a href="mailto:info@ampliosystemsltd.com">info@ampliosystemsltd.com</a>.
        </Alert>
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
        <Button variant="ghost" iconLeft="arrow-left" onClick={() => go(DETAILS_STEP - 1)}>Back</Button>
        <Button type="submit" size="lg" iconRight="arrow-right" loading={sending} fullWidth>Join the waiting list</Button>
      </div>

      <p style={mutedStyle}>
        Amplio Systems Ltd will use your details and answers to run the waiting list, contact you about
        Pageweave and shape the product. The second box is optional and you can withdraw either at any time.
        We won’t share your details with anyone else. <a href="/privacy/">Privacy notice</a>.
      </p>
    </form>
  );
}
