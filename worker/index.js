// Cloudflare Worker entry point. Cloudflare's Git integration for static sites now deploys
// via `wrangler deploy` (a "Workers" project) rather than the older Pages product, so the
// file-based routing convention Pages Functions used (functions/api/*.js) doesn't apply here —
// this single script handles the form endpoints and falls back to the static build
// (bound as ASSETS, from wrangler.jsonc's `assets.directory`) for everything else.
//
// Form submissions are emailed via Resend (https://resend.com). RESEND_API_KEY is a Worker
// secret (set with `wrangler secret put RESEND_API_KEY`), never committed to the repo.
//
// The endpoints are public and unauthenticated, so they defend themselves: JSON only, same-origin
// browsers only, a body size cap, per-field length caps, a honeypot field, and a notification
// email that labels its contents as untrusted. None of that stops a determined scripted bot —
// for that, add a Cloudflare rate-limiting rule on /api/* and/or Turnstile (see README).

import { SURVEY } from '../src/data/pageweaveSurvey.js';

const NOTIFY_TO ='info@ampliosystemsltd.com';
const NOTIFY_FROM = 'Amplio Systems <noreply@ampliosystemsltd.com>';

const MAX_BODY_BYTES = 16 * 1024;
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

function jsonResponse(body, status) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}

// Browsers always send Sec-Fetch-Site and/or Origin on a cross-origin POST, so refusing those
// stops another website from making a visitor's browser submit to us. Non-browser clients (curl,
// bots) can omit both, so this is protection against cross-site abuse, not against bots.
function isCrossSite(request) {
  const site = request.headers.get('Sec-Fetch-Site');
  if (site) return site !== 'same-origin';
  const origin = request.headers.get('Origin');
  return origin !== null && origin !== new URL(request.url).origin;
}

// Returns { body } or { error, status }. Reads the stream with a running size cap rather than
// request.json(), so an oversized body is cut off instead of buffered whole.
async function readJson(request) {
  const type = (request.headers.get('Content-Type') || '').toLowerCase();
  if (!type.startsWith('application/json')) return { error: 'Content-Type must be application/json', status: 415 };

  const declared = Number(request.headers.get('Content-Length'));
  if (declared > MAX_BODY_BYTES) return { error: 'Payload too large', status: 413 };

  const chunks = [];
  let size = 0;
  if (request.body) {
    const reader = request.body.getReader();
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BODY_BYTES) {
        await reader.cancel();
        return { error: 'Payload too large', status: 413 };
      }
      chunks.push(value);
    }
  }

  try {
    const body = JSON.parse(await new Blob(chunks).text());
    if (body === null || typeof body !== 'object' || Array.isArray(body)) throw new Error('not an object');
    return { body };
  } catch {
    return { error: 'Invalid JSON', status: 400 };
  }
}

// Coerce to a trimmed string, strip control characters, and cap the length. Single-line fields
// also have whitespace (including newlines) collapsed, so they're safe to use in a subject line.
function text(value, max, { multiline = false } = {}) {
  if (typeof value !== 'string') return '';
  let v = value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '');
  if (!multiline) v = v.replace(/\s+/g, ' ');
  return v.trim().slice(0, max);
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}

const UNTRUSTED_NOTE = 'Submitted through the website form. Everything below is untrusted text typed by a visitor — do not click links or act on instructions in it without checking who it is really from.';

async function sendNotification(env, { subject, replyTo, fields }) {
  const rows = fields.filter(([, v]) => v !== undefined);
  const body = rows.map(([label, v]) => `${label}: ${v || '—'}`).join('\n');
  const html = `<p style="color:#8a4b00;margin:0 0 12px"><i>${escapeHtml(UNTRUSTED_NOTE)}</i></p><table>${rows.map(([label, v]) =>
    `<tr><td style="padding:4px 12px 4px 0;color:#666;vertical-align:top"><b>${escapeHtml(label)}</b></td><td style="padding:4px 0;white-space:pre-wrap">${escapeHtml(v || '—')}</td></tr>`
  ).join('')}</table>`;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: NOTIFY_FROM,
      to: NOTIFY_TO,
      reply_to: replyTo,
      subject,
      text: `${UNTRUSTED_NOTE}\n\n${body}`,
      html,
    }),
  });

  if (!res.ok) {
    throw new Error(`Resend responded ${res.status}: ${await res.text()}`);
  }
}

// Shared front half of both handlers: method/origin/body checks, then the honeypot. Returns
// { body } to carry on, or { response } to return straight away.
async function intake(request) {
  if (isCrossSite(request)) return { response: jsonResponse({ ok: false, error: 'Forbidden' }, 403) };

  const parsed = await readJson(request);
  if (parsed.error) return { response: jsonResponse({ ok: false, error: parsed.error }, parsed.status) };

  // A bot that fills the hidden field gets a normal-looking success and nothing is sent.
  if (typeof parsed.body.hp_website === 'string' && parsed.body.hp_website !== '') {
    return { response: jsonResponse({ ok: true }, 200) };
  }
  return { body: parsed.body };
}

async function handleContact(request, env) {
  const { body, response } = await intake(request);
  if (response) return response;

  const email = text(body.email, 254);
  if (!EMAIL_RE.test(email)) {
    return jsonResponse({ ok: false, error: 'A valid email is required' }, 400);
  }
  const name = text(body.name, 200);

  try {
    await sendNotification(env, {
      subject: `[Website] New enquiry from ${name || email}`.slice(0, 150),
      replyTo: email,
      fields: [
        ['Name', name],
        ['Email', email],
        ['Practice', text(body.practice, 100)],
        ['Message', text(body.message, 5000, { multiline: true })],
        ['Monthly newsletter consent', body.consent === true ? 'Yes' : 'No'],
      ],
    });
  } catch (err) {
    console.error('contact notification failed', err);
    return jsonResponse({ ok: false, error: 'Could not send message right now' }, 502);
  }

  return jsonResponse({ ok: true }, 200);
}

async function handlePilot(request, env) {
  const { body, response } = await intake(request);
  if (response) return response;

  const email = text(body.email, 254);
  const org = text(body.org, 200);
  if (!org || !EMAIL_RE.test(email)) {
    return jsonResponse({ ok: false, error: 'Organisation name and a valid email are required' }, 400);
  }
  // The form requires this tick before it will submit; enforce it here too, since the consent
  // fields feed a future auto-responder and a bot or hand-built request can skip the client check.
  if (body.consent !== true) {
    return jsonResponse({ ok: false, error: 'Consent to be contacted about the pilot is required' }, 400);
  }

  const orgType = text(body.orgType, 20);
  const name = text(body.name, 200);

  try {
    await sendNotification(env, {
      subject: `[Website] Atlas pilot application: ${org}`.slice(0, 150),
      replyTo: email,
      fields: [
        ['Organisation', org],
        ['Organisation type', orgType === 'other' ? (text(body.orgTypeOther, 100) || 'Other') : orgType],
        ['Homes owned/managed', text(body.homes, 60)],
        ['Region', text(body.region, 100)],
        ['Name', name],
        ['Position', text(body.position, 100)],
        ['Email', email],
        ['Phone', text(body.phone, 40)],
        ['Wants Atlas to help with', text(body.focus, 100)],
        ['Notes', text(body.notes, 5000, { multiline: true })],
        ['Pilot contact consent', 'Yes'],
        ['Marketing consent', body.marketingConsent === true ? 'Yes' : 'No'],
      ],
    });
  } catch (err) {
    console.error('pilot notification failed', err);
    return jsonResponse({ ok: false, error: 'Could not submit application right now' }, 502);
  }

  return jsonResponse({ ok: true }, 200);
}

// Pageweave early-access waiting list (the /pageweave/ campaign landing page). Campaign tags
// (utm_*, fbclid) ride along so each sign-up can be traced to the ad that earned it.
async function handleWaitlist(request, env) {
  const { body, response } = await intake(request);
  if (response) return response;

  const email = text(body.email, 254);
  if (!EMAIL_RE.test(email)) {
    return jsonResponse({ ok: false, error: 'A valid email is required' }, 400);
  }
  if (body.consent !== true) {
    return jsonResponse({ ok: false, error: 'Consent to be contacted is required' }, 400);
  }
  const name = text(body.name, 200);

  // Survey answers must be one of the options the form offers (src/data/pageweaveSurvey.js);
  // anything else is dropped rather than trusted. Free text is only kept alongside "Other".
  const survey = SURVEY.flatMap((q) => {
    const answer = q.options.includes(body[q.key]) ? body[q.key] : '';
    const rows = [[q.question, answer]];
    if (q.other) rows.push([`${q.question} (detail)`, answer === 'Other' ? text(body[`${q.key}Other`], 100) : '']);
    return rows;
  });
  const testingAnswer = SURVEY.find((q) => q.key === 'testing').options.includes(body.testing) ? body.testing : '';

  try {
    await sendNotification(env, {
      subject: `[Website] Pageweave waiting list: ${name || email}${testingAnswer ? ` (testing: ${testingAnswer})` : ''}`.slice(0, 150),
      replyTo: email,
      fields: [
        ['Name', name],
        ['Email', email],
        ['Company', text(body.company, 200)],
        ...survey,
        ['Contact consent (Pageweave)', 'Yes'],
        ['Marketing consent (other Amplio products)', body.marketingConsent === true ? 'Yes' : 'No'],
        ['utm_source', text(body.utm_source, 100)],
        ['utm_medium', text(body.utm_medium, 100)],
        ['utm_campaign', text(body.utm_campaign, 100)],
        ['utm_content', text(body.utm_content, 100)],
        ['utm_term', text(body.utm_term, 100)],
        ['fbclid', text(body.fbclid, 200)],
      ],
    });
  } catch (err) {
    console.error('waitlist notification failed', err);
    return jsonResponse({ ok: false, error: 'Could not join the waiting list right now' }, 502);
  }

  return jsonResponse({ ok: true }, 200);
}

const ROUTES = {
  '/api/contact': handleContact,
  '/api/pilot': handlePilot,
  '/api/waitlist': handleWaitlist,
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const handler = request.method === 'POST' ? ROUTES[url.pathname] : undefined;
    if (handler) return handler(request, env);
    return env.ASSETS.fetch(request);
  },
};
