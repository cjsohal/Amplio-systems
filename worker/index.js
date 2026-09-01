// Cloudflare Worker entry point. Cloudflare's Git integration for static sites now deploys
// via `wrangler deploy` (a "Workers" project) rather than the older Pages product, so the
// file-based routing convention Pages Functions used (functions/api/*.js) doesn't apply here —
// this single script handles the three form endpoints and falls back to the static build
// (bound as ASSETS, from wrangler.jsonc's `assets.directory`) for everything else.
//
// All three routes are stubs: they validate the payload shape and return 200. Nothing is sent
// or stored anywhere yet.
//
// TODO before launch: send the payload on, e.g. via Resend (https://resend.com — free tier,
// one API key):
//
//   const res = await fetch('https://api.resend.com/emails', {
//     method: 'POST',
//     headers: {
//       Authorization: `Bearer ${env.RESEND_API_KEY}`,
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       from: 'Amplio Systems <noreply@ampliosystemsltd.com>',
//       to: 'info@ampliosystemsltd.com',
//       reply_to: body.email,
//       subject: `New enquiry from ${body.name || body.email}`,
//       text: JSON.stringify(body, null, 2),
//     }),
//   });
//
// RESEND_API_KEY would be added as a Worker secret (Workers & Pages > this project >
// Settings > Variables and secrets), never committed to the repo or typed into chat.

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

async function handleContact(request) {
  const body = await readJson(request);
  if (!body || typeof body.email !== 'string' || !body.email.includes('@')) {
    return jsonResponse({ ok: false, error: 'A valid email is required' }, 400);
  }
  return jsonResponse({ ok: true }, 200);
}

async function handlePilot(request) {
  const body = await readJson(request);
  if (!body || typeof body.email !== 'string' || !body.email.includes('@') || !body.org) {
    return jsonResponse({ ok: false, error: 'Organisation name and a valid email are required' }, 400);
  }
  return jsonResponse({ ok: true }, 200);
}

async function handleBooking(request) {
  const body = await readJson(request);
  if (!body || typeof body.email !== 'string' || !body.email.includes('@')) {
    return jsonResponse({ ok: false, error: 'A valid email is required' }, 400);
  }
  return jsonResponse({ ok: true }, 200);
}

const ROUTES = {
  '/api/contact': handleContact,
  '/api/pilot': handlePilot,
  '/api/booking': handleBooking,
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const handler = request.method === 'POST' ? ROUTES[url.pathname] : undefined;
    if (handler) return handler(request);
    return env.ASSETS.fetch(request);
  },
};
