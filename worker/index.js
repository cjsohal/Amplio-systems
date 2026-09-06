// Cloudflare Worker entry point. Cloudflare's Git integration for static sites now deploys
// via `wrangler deploy` (a "Workers" project) rather than the older Pages product, so the
// file-based routing convention Pages Functions used (functions/api/*.js) doesn't apply here —
// this single script handles the form endpoints and falls back to the static build
// (bound as ASSETS, from wrangler.jsonc's `assets.directory`) for everything else.
//
// Form submissions are emailed via Resend (https://resend.com). RESEND_API_KEY is a Worker
// secret (set with `wrangler secret put RESEND_API_KEY`), never committed to the repo.

const NOTIFY_TO = 'info@ampliosystemsltd.com';
const NOTIFY_FROM = 'Amplio Systems <noreply@ampliosystemsltd.com>';

function jsonResponse(body, status) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

async function readJson(request) {
  try {
    return await request.json();
  } catch {
    return null;
  }
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}

async function sendNotification(env, { subject, replyTo, fields }) {
  const rows = fields.filter(([, v]) => v !== undefined);
  const text = rows.map(([label, v]) => `${label}: ${v || '—'}`).join('\n');
  const html = `<table>${rows.map(([label, v]) =>
    `<tr><td style="padding:4px 12px 4px 0;color:#666"><b>${escapeHtml(label)}</b></td><td style="padding:4px 0">${escapeHtml(v || '—')}</td></tr>`
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
      text,
      html,
    }),
  });

  if (!res.ok) {
    throw new Error(`Resend responded ${res.status}: ${await res.text()}`);
  }
}

async function handleContact(request, env) {
  const body = await readJson(request);
  if (!body || typeof body.email !== 'string' || !body.email.includes('@')) {
    return jsonResponse({ ok: false, error: 'A valid email is required' }, 400);
  }

  try {
    await sendNotification(env, {
      subject: `New enquiry from ${body.name || body.email}`,
      replyTo: body.email,
      fields: [
        ['Name', body.name],
        ['Email', body.email],
        ['Message', body.message],
      ],
    });
  } catch (err) {
    console.error('contact notification failed', err);
    return jsonResponse({ ok: false, error: 'Could not send message right now' }, 502);
  }

  return jsonResponse({ ok: true }, 200);
}

async function handlePilot(request, env) {
  const body = await readJson(request);
  if (!body || typeof body.email !== 'string' || !body.email.includes('@') || !body.org) {
    return jsonResponse({ ok: false, error: 'Organisation name and a valid email are required' }, 400);
  }

  try {
    await sendNotification(env, {
      subject: `Atlas pilot application: ${body.org}`,
      replyTo: body.email,
      fields: [
        ['Organisation', body.org],
        ['Organisation type', body.orgType === 'other' ? (body.orgTypeOther || 'Other') : body.orgType],
        ['Homes owned/managed', body.homes],
        ['Region', body.region],
        ['Name', body.name],
        ['Position', body.position],
        ['Email', body.email],
        ['Phone', body.phone],
        ['Wants Atlas to help with', body.focus],
        ['Notes', body.notes],
        ['Consented to contact', body.consent ? 'Yes' : 'No'],
      ],
    });
  } catch (err) {
    console.error('pilot notification failed', err);
    return jsonResponse({ ok: false, error: 'Could not submit application right now' }, 502);
  }

  return jsonResponse({ ok: true }, 200);
}

const ROUTES = {
  '/api/contact': handleContact,
  '/api/pilot': handlePilot,
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const handler = request.method === 'POST' ? ROUTES[url.pathname] : undefined;
    if (handler) return handler(request, env);
    return env.ASSETS.fetch(request);
  },
};
