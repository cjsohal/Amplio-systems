// Cloudflare Pages Function — POST /api/contact
// Stub only: validates shape and returns 200. Nothing is sent or stored anywhere yet.
//
// TODO before launch: send the payload on, e.g. via Resend
// (https://resend.com — free tier, one API key):
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
// RESEND_API_KEY would be added as a Cloudflare Pages secret (Settings > Environment
// variables), never committed to the repo or typed into chat.

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
