// Cloudflare Pages Function — POST /api/pilot
// Stub only: validates shape and returns 200. Nothing is sent or stored anywhere yet.
// See functions/api/contact.js for the TODO on wiring real email delivery (e.g. Resend).

export async function onRequestPost({ request }) {
  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ ok: false, error: 'Invalid JSON body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!body || typeof body.email !== 'string' || !body.email.includes('@') || !body.org) {
    return new Response(JSON.stringify({ ok: false, error: 'Organisation name and a valid email are required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
