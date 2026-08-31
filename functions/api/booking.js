// Cloudflare Pages Function — POST /api/booking
// Stub only: validates shape and returns 200. The "Book a discovery call" dialog calls this
// on "Find a time"; nothing is sent or stored anywhere yet, and no calendar is connected.
// See functions/api/contact.js for the TODO on wiring real email delivery (e.g. Resend), and
// note this endpoint would eventually want a real scheduling integration (e.g. Cal.com,
// Calendly) rather than (or alongside) an email notification.

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

  if (!body || typeof body.email !== 'string' || !body.email.includes('@')) {
    return new Response(JSON.stringify({ ok: false, error: 'A valid email is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
