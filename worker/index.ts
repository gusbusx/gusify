/**
 * Cloudflare Worker — serves the exported site from /out and handles POST /api/contact.
 *
 * Contact emails go through Resend (https://resend.com, free tier). Add these in
 * Cloudflare → Workers & Pages → gusify → Settings → Variables and Secrets:
 *   RESEND_API_KEY  (Secret)  – your Resend API key
 *   CONTACT_TO      (Text)    – where inquiries go, e.g. you@gmail.com
 *   CONTACT_FROM    (Text)    – sender on a domain verified in Resend, e.g. "Gusify <hello@gusify.com>"
 */

interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
  RESEND_API_KEY?: string;
  CONTACT_TO?: string;
  CONTACT_FROM?: string;
}

type Body = { package?: string; name?: string; email?: string; phone?: string; business?: string; message?: string };

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json' } });

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string);

async function contact(request: Request, env: Env): Promise<Response> {
  let b: Body;
  try {
    b = await request.json();
  } catch {
    return json({ ok: false, error: 'Invalid request' }, 400);
  }
  const name = (b.name || '').trim().slice(0, 200);
  const email = (b.email || '').trim().slice(0, 200);
  const phone = (b.phone || '').trim().slice(0, 50);
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || phone.replace(/\D/g, '').length < 7 || !b.package) {
    return json({ ok: false, error: 'Missing required fields' }, 422);
  }

  if (!env.RESEND_API_KEY || !env.CONTACT_TO || !env.CONTACT_FROM) {
    // Not configured yet — accept so the site works, but nothing is emailed.
    console.warn('Contact form received but email is not configured', { name, email });
    return json({ ok: true, delivered: false });
  }

  const rows: [string, string][] = [
    ['Package', b.package || ''],
    ['Name', name],
    ['Email', email],
    ['Phone', phone],
    ['Business', (b.business || '').slice(0, 200) || '—'],
    ['Project', (b.message || '').slice(0, 5000) || '—'],
  ];
  const html = `<h2 style="font-family:sans-serif">New Gusify inquiry</h2><table style="font-family:sans-serif;font-size:14px">${rows
    .map(([k, v]) => `<tr><td style="padding:6px 16px 6px 0;color:#876421;vertical-align:top"><b>${k}</b></td><td style="padding:6px 0;white-space:pre-wrap">${esc(v)}</td></tr>`)
    .join('')}</table>`;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: env.CONTACT_FROM, to: [env.CONTACT_TO], reply_to: email, subject: `New inquiry — ${name} (${b.package})`, html }),
  });
  if (!res.ok) return json({ ok: false, error: 'Email failed' }, 502);
  return json({ ok: true, delivered: true });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === '/api/contact' || url.pathname === '/api/contact/') {
      if (request.method !== 'POST') return json({ ok: false, error: 'Method not allowed' }, 405);
      return contact(request, env);
    }
    return env.ASSETS.fetch(request);
  },
};
