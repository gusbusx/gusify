'use client';

import { useEffect, useRef, useState } from 'react';
import { PACKAGES, money, type Package } from '@/lib/data';
import { prefersReducedMotion } from '@/lib/canvas';

/** Counts from a red $0 up to the price, shifting to green as it lands. */
function PriceCounter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = prefersReducedMotion();
    let raf = 0;
    const start = performance.now();
    el.classList.remove('pk-done');
    const loop = (now: number) => {
      const p = reduce ? 1 : Math.max(0, Math.min(1, (now - start - 450) / 1800));
      const e = 1 - Math.pow(1 - p, 3);
      el.textContent = money(value * e);
      el.style.color = p >= 1 ? '#1E8E4E' : `hsl(${Math.round(4 + 136 * e)}, ${Math.round(70 - 10 * e)}%, ${Math.round(45 - 8 * e)}%)`;
      if (p >= 1) { el.classList.add('pk-done'); return; }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return <span ref={ref} style={{ display: 'inline-block', color: '#C0392B' }}>$0</span>;
}

function PackageModal({ pkg, index, onClose }: { pkg: Package; index: number; onClose: () => void }) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', onKey); };
  }, [onClose]);

  return (
    <div className="modal" role="dialog" aria-modal="true" aria-label={`${pkg.name} package`} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-card fly">
        <div data-dark="1" style={{ background: 'var(--ink)', color: 'var(--on-dark)', padding: '14px 16px 14px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
          <span className="eyebrow" style={{ color: '#C9A24A' }}>Package · 0{index + 1}</span>
          <button className="icon-btn" onClick={onClose} aria-label="Close package details" style={{ width: 44, height: 44 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12" /><path d="M18 6L6 18" /></svg>
          </button>
        </div>
        <div style={{ padding: '40px 40px 8px', display: 'flex', flexWrap: 'wrap', gap: 40 }}>
          <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: 16 }}>
            <h2 className="display" style={{ fontSize: 'clamp(44px, 6vw, 68px)', lineHeight: 1, letterSpacing: '-0.04em' }}>{pkg.name}</h2>
            <p style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--muted)' }}>{pkg.desc}</p>
            <p style={{ marginTop: 16, fontSize: 12, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--muted-2)' }}>Investment</p>
            <p className="display" style={{ fontWeight: 800, fontSize: 'clamp(56px, 8vw, 84px)', lineHeight: 1, letterSpacing: '-0.04em' }}><PriceCounter value={pkg.price} /></p>
            <p style={{ fontSize: 13, color: 'var(--muted-2)' }}>One-time project fee · [payment terms]</p>
          </div>
          <div style={{ flex: '1 1 360px' }}>
            <p className="eyebrow" style={{ fontSize: 12, marginBottom: 6 }}>What’s included</p>
            <ul className="check-list">
              {pkg.full.map((f) => (
                <li key={f}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#B08D3C" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flex: '0 0 auto', marginTop: 3 }}><path d="M4 12.5l5 5L20 6.5" /></svg>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div style={{ padding: '28px 40px 40px', display: 'flex', flexWrap: 'wrap', gap: 20, alignItems: 'center' }}>
          <button className="btn btn-dark" onClick={() => window.location.assign(`/contact/?package=${pkg.id}`)}>Continue to contact →</button>
          <button className="nb ul" onClick={onClose}>Back to packages</button>
        </div>
      </div>
    </div>
  );
}

export default function Packages() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <>
      <div className="pk-stage">
        <svg className="pk-arrow" viewBox="0 0 1000 760" preserveAspectRatio="none" aria-hidden="true" style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', overflow: 'visible', pointerEvents: 'none' }}>
          <path className="pk-line" pathLength={1} d="M20,330 C400,322 720,250 940,40" fill="none" stroke="#B08D3C" strokeOpacity={0.18} strokeWidth={12} strokeLinecap="round" />
          <path className="pk-line" pathLength={1} d="M20,330 C400,322 720,250 940,40" fill="none" stroke="#B08D3C" strokeWidth={3} strokeLinecap="round" />
        </svg>
        <svg className="pk-head" width="34" height="34" viewBox="0 0 30 30" aria-hidden="true"><path d="M3,5 L27,15 L3,25 L9,15 Z" fill="#B08D3C" /></svg>

        <div className="pk-row">
          {PACKAGES.map((p, i) => (
            <div key={p.id} className="pillar" data-dark={p.theme.dark ? '1' : '0'} style={{ minHeight: p.height, animationDelay: `${0.15 + i * 0.18}s` }}>
              <div className="pillar-in">
                <span className="pf-top" style={{ background: p.theme.top }} />
                <span className="pf-side" style={{ background: p.theme.side }} />
                <div className="pf-front" style={{ background: p.theme.front, color: p.theme.ink, boxShadow: `inset 0 0 0 1px ${p.theme.edge}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
                    <h3 className="display" style={{ fontSize: 28, letterSpacing: '-0.02em' }}>{p.name}</h3>
                    {p.badge && <span style={{ border: '1px solid #C9A24A', color: '#C9A24A', borderRadius: 999, padding: '4px 10px', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{p.badge}</span>}
                  </div>
                  <p style={{ fontSize: 15, fontWeight: 600, color: p.theme.sub }}>From {money(p.price)}</p>
                  <p style={{ fontSize: 15, lineHeight: 1.55, color: p.theme.sub }}>{p.desc}</p>
                  <ul style={{ listStyle: 'none', margin: '4px 0 0', padding: 0, display: 'flex', flexDirection: 'column', gap: 9, fontSize: 15, fontWeight: 500 }}>
                    {p.short.map((b) => (
                      <li key={b} style={{ display: 'flex', gap: 10, alignItems: 'baseline' }}><span aria-hidden="true" style={{ color: p.theme.mark, fontSize: 11 }}>◆</span>{b}</li>
                    ))}
                  </ul>
                  <button className="nb lift-btn" onClick={() => setOpen(i)} style={{ marginTop: 'auto', background: p.theme.btnBg, color: p.theme.btnInk, borderRadius: 999, padding: '15px 20px', textAlign: 'center', fontWeight: 600, minHeight: 48 }}>Get started →</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="pk-floor" />
      </div>
      {open !== null && <PackageModal key={open} pkg={PACKAGES[open]} index={open} onClose={() => setOpen(null)} />}
    </>
  );
}
