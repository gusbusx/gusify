'use client';

import { useEffect, useRef, useState } from 'react';
import Link from './SiteLink';
import { useSearchParams } from 'next/navigation';
import { PACKAGES, money } from '@/lib/data';
import Confetti from './Confetti';

const G_PATH = 'M72,32 L50,10 L10,50 L50,90 L90,50 L54,50';
const OPTIONS = [...PACKAGES.map((p) => ({ id: p.id as string, label: `${p.name} · ${money(p.price)}` })), { id: 'unsure', label: 'Not sure yet' }];

type Errs = { pkg?: boolean; name?: boolean; email?: boolean; phone?: boolean };

export default function ContactForm() {
  const params = useSearchParams();
  const [pkg, setPkg] = useState<string | null>(null);
  const [errs, setErrs] = useState<Errs>({});
  const [sending, setSending] = useState(false);
  const [sentName, setSentName] = useState('');
  const [sentOk, setSentOk] = useState(false);
  const [failed, setFailed] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const form = useRef<HTMLFormElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const p = params.get('package');
    if (p && OPTIONS.some((o) => o.id === p)) setPkg(p);
  }, [params]);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fd = new FormData(form.current!);
    const val = (k: string) => String(fd.get(k) || '').trim();
    const data = { package: pkg, name: val('name'), email: val('email'), phone: val('phone'), business: val('business'), message: val('message') };
    const next: Errs = {
      pkg: !pkg,
      name: !data.name,
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email),
      phone: data.phone.replace(/\D/g, '').length < 7,
    };
    if (next.pkg || next.name || next.email || next.phone) {
      setErrs(next);
      setSentOk(false);
      const first = next.name ? 'cname' : next.email ? 'cemail' : next.phone ? 'cphone' : null;
      if (first) document.getElementById(first)?.focus();
      return;
    }
    setErrs({});
    setFailed(false);

    let ok = false;
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      ok = res.ok || (process.env.NODE_ENV === 'development' && res.status === 404);
    } catch {
      ok = false;
    }
    if (!ok) { setFailed(true); return; }

    setSentName(data.name.split(/\s+/)[0]);
    setSending(true);
    setSentOk(false);
    timer.current = setTimeout(() => {
      form.current?.reset();
      setPkg(null);
      setSending(false);
      setSentOk(true);
      setConfetti(true);
    }, 7000);
  };

  return (
    <>
      <form ref={form} onSubmit={submit} noValidate className="fade" style={{ flex: '2 1 520px', display: 'flex', flexDirection: 'column', gap: 30, animationDelay: '0.45s' }}>
        {sentOk && (
          <div className="sent-ok" role="status">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1E8E4E" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 12.5l5 5L20 6.5" /></svg>
            Inquiry sent — talk soon.
          </div>
        )}
        {failed && (
          <div role="alert" className="sent-ok" style={{ borderColor: 'var(--red)', color: 'var(--red)' }}>
            Something went wrong sending your message. Please email us at hello@gusify.com.
          </div>
        )}

        <fieldset style={{ border: 0, margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <legend className="legend" style={{ padding: 0, marginBottom: 14 }}>Which package are you interested in? <span className="req">*</span></legend>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {OPTIONS.map((o) => (
              <button key={o.id} type="button" className={`chip${errs.pkg ? ' invalid' : ''}`} aria-pressed={pkg === o.id} onClick={() => { setPkg(o.id); setErrs((x) => ({ ...x, pkg: false })); }}>
                {o.label}
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 18px', alignItems: 'center' }}>
            <Link href="/services/" className="ul" style={{ fontSize: 14 }}>Compare packages on Services →</Link>
            {errs.pkg && <span className="err">Please choose a package.</span>}
          </div>
        </fieldset>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 28 }}>
          <div className="field">
            <label htmlFor="cname">Name <span className="req">*</span></label>
            <input id="cname" name="name" className="input" type="text" autoComplete="name" aria-required="true" aria-invalid={!!errs.name} />
            {errs.name && <span className="err">Please enter your name.</span>}
          </div>
          <div className="field">
            <label htmlFor="cemail">Email <span className="req">*</span></label>
            <input id="cemail" name="email" className="input" type="email" autoComplete="email" aria-required="true" aria-invalid={!!errs.email} />
            {errs.email && <span className="err">Please enter a valid email.</span>}
          </div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 28 }}>
          <div className="field">
            <label htmlFor="cphone">Phone <span className="req">*</span></label>
            <input id="cphone" name="phone" className="input" type="tel" autoComplete="tel" aria-required="true" aria-invalid={!!errs.phone} />
            {errs.phone && <span className="err">Please enter a valid phone number.</span>}
          </div>
          <div className="field">
            <label htmlFor="cbiz">Business name <span className="opt">(optional)</span></label>
            <input id="cbiz" name="business" className="input" type="text" autoComplete="organization" />
          </div>
        </div>
        <div className="field">
          <label htmlFor="cmsg">About your project</label>
          <textarea id="cmsg" name="message" className="input" rows={4} />
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 20 }}>
          <button type="submit" className="btn btn-dark">Send inquiry</button>
          <span style={{ fontSize: 13, color: 'var(--muted-2)' }}><span className="req">*</span> Required</span>
        </div>
      </form>

      {sending && (
        <div className="so-ov" data-dark="1" role="status" aria-live="polite">
          <svg width="170" height="170" viewBox="0 0 100 100" fill="none" strokeLinejoin="miter" aria-hidden="true" style={{ overflow: 'visible' }}>
            <g className="so-fill">
              <path d={G_PATH} stroke="#B08D3C" strokeWidth={13} />
              <path d={G_PATH} stroke="#0A0A0A" strokeWidth={2.4} />
            </g>
            <path className="so-draw" pathLength={1} d={G_PATH} stroke="#F5F3EE" strokeWidth={1.2} strokeLinejoin="round" />
          </svg>
          <p className="so-word" style={{ fontWeight: 600, fontSize: 20, letterSpacing: '0.42em', paddingLeft: '0.42em' }}>GUSIFY</p>
          <div className="so-msg" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <p className="display" style={{ fontSize: 'clamp(28px, 4vw, 48px)', letterSpacing: '-0.03em' }}>Thanks, {sentName || 'there'}.</p>
            <p style={{ fontSize: 18, color: 'var(--on-dark-muted)' }}>
              I’ll get in contact with you within <span style={{ color: '#C9A24A', fontWeight: 600 }}>72 hours</span>.
            </p>
          </div>
        </div>
      )}
      {confetti && <Confetti onDone={() => setConfetti(false)} />}
    </>
  );
}
