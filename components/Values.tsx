'use client';

import { useRef, useState } from 'react';
import { ART_CLARITY, ART_PARTNERSHIP, ART_PRECISION } from '@/lib/raw';

const VALUES = [
  { title: 'Precision', desc: 'Pixel-perfect design and clean, fast code. The details are the work.', art: ART_PRECISION },
  { title: 'Clarity', desc: 'Straight answers, clear timelines and no jargon — from first call to launch.', art: ART_CLARITY },
  { title: 'Partnership', desc: 'You work directly with the person building your site, and we stay with you after it’s live.', art: ART_PARTNERSHIP },
];

/** Hover a value: a 3D panel swings in, tilts toward the pointer, and plays that value's animation. */
export default function Values() {
  const [active, setActive] = useState(0);
  const [on, setOn] = useState(false);
  const tilt = useRef<HTMLDivElement>(null);

  const move = (e: React.PointerEvent) => {
    const el = tilt.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    if (!r.width) return;
    const nx = Math.max(-1.2, Math.min(1.2, (e.clientX - (r.left + r.width / 2)) / (r.width / 2)));
    const ny = Math.max(-1.2, Math.min(1.2, (e.clientY - (r.top + r.height / 2)) / (r.height / 2)));
    el.style.transform = `perspective(1200px) rotateX(${(-ny * 9).toFixed(2)}deg) rotateY(${(nx * 13).toFixed(2)}deg)`;
  };

  return (
    <section aria-labelledby="h-values" onPointerMove={move}>
      <div className="container section" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '48px 64px' }}>
        <div onMouseLeave={() => setOn(false)} style={{ flex: '1 1 400px', minWidth: 0 }}>
          <p className="eyebrow" style={{ marginBottom: 14 }}>Our values</p>
          <h2 id="h-values" className="h-sec" style={{ marginBottom: 12 }}>What we stand for</h2>
          <p style={{ marginBottom: 36, fontSize: 14, color: 'var(--muted)' }}>Hover or tap a value.</p>
          <div style={{ borderTop: '1px solid var(--ink)' }}>
            {VALUES.map((v, i) => {
              const isOn = on && active === i;
              return (
                <button
                  key={v.title}
                  className="nb svc-row"
                  aria-pressed={isOn}
                  onMouseEnter={() => { setActive(i); setOn(true); }}
                  onFocus={() => { setActive(i); setOn(true); }}
                  onClick={() => { setActive(i); setOn(true); }}
                  style={{ flexDirection: 'column', alignItems: 'stretch', gap: 10, padding: '28px 0', color: on && !isOn ? 'var(--dim)' : 'var(--ink)' }}
                >
                  <span style={{ display: 'flex', alignItems: 'baseline', gap: 20 }}>
                    <span style={{ fontSize: 14, color: 'var(--gold-ink)' }}>0{i + 1}</span>
                    <span className="display" style={{ fontSize: 'clamp(36px, 4.6vw, 68px)', lineHeight: 1, letterSpacing: '-0.04em' }}>{v.title}</span>
                  </span>
                  <span style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--muted)', paddingLeft: 40 }}>{v.desc}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ flex: '1.25 1 480px', minWidth: 0 }}>
          <div className="val-wrap" style={{ width: '100%', maxWidth: 'min(100%, 78vh)', marginLeft: 'auto', opacity: on ? 1 : 0, transform: `perspective(1400px) translateX(${on ? 0 : 120}px) rotateY(${on ? 0 : -35}deg) scale(${on ? 1 : 0.85})` }}>
            <div ref={tilt} className="val-tilt" data-dark="1" style={{ position: 'relative', width: '100%', aspectRatio: '1 / 1', transformStyle: 'preserve-3d' }}>
              <div aria-hidden="true" style={{ position: 'absolute', inset: 0, borderRadius: 22, background: 'linear-gradient(135deg, #E2C477, #8C6A22)', transform: 'translateZ(-28px)' }} />
              <div aria-hidden="true" style={{ position: 'absolute', inset: 0, borderRadius: 22, background: '#121212', boxShadow: '0 0 0 1px #1E1E1E, 0 80px 120px -40px rgba(10,10,10,0.5)' }} />
              <div style={{ position: 'absolute', inset: 0, borderRadius: 22, overflow: 'hidden', background: '#121212', boxShadow: '0 0 0 1px #262626', transform: 'translateZ(36px)' }}>
                {on && <div key={active} className="svc-pop" dangerouslySetInnerHTML={{ __html: VALUES[active].art }} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
