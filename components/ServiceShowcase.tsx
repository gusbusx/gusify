'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { SERVICES } from '@/lib/data';
import { PANEL_BRAND, PANEL_DEV, PANEL_SEO, PANEL_WEB } from '@/lib/raw';
import { prefersReducedMotion } from '@/lib/canvas';

const PANELS = [PANEL_WEB, PANEL_DEV, PANEL_BRAND, PANEL_SEO];

/**
 * Service rows; hovering (or tapping) one floats an animated preview card that follows the pointer.
 * `split` = intro on the left, rows on the right (home). `stack` = intro above, detailed rows (services).
 */
export default function ServiceShowcase({ intro, layout = 'split' }: { intro: ReactNode; layout?: 'split' | 'stack' }) {
  const [active, setActive] = useState(0);
  const [on, setOn] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const float = useRef<HTMLDivElement>(null);
  const st = useRef({ x: 0, y: 0, tx: 0, ty: 0, rot: 0, init: false });

  useEffect(() => {
    const el = float.current;
    if (!el) return;
    const reduce = prefersReducedMotion();
    let raf = 0, last = performance.now(), lastT = '';
    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000); last = now;
      const s = st.current;
      const k = reduce ? 1 : 1 - Math.pow(0.0006, dt);
      const px = s.x;
      s.x += (s.tx - s.x) * k; s.y += (s.ty - s.y) * k;
      const rt = reduce ? 0 : Math.max(-7, Math.min(7, dt > 0 ? ((s.x - px) / dt) * 0.01 : 0));
      s.rot += (rt - s.rot) * 0.15;
      const tr = `translate3d(${s.x.toFixed(1)}px,${s.y.toFixed(1)}px,0) rotate(${s.rot.toFixed(2)}deg)`;
      if (tr !== lastT) { el.style.transform = tr; lastT = tr; }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const track = (e: React.PointerEvent) => {
    const w = wrap.current, fl = float.current;
    if (!w || !fl) return;
    const r = w.getBoundingClientRect();
    const bw = fl.offsetWidth, bh = fl.offsetHeight;
    const cx = e.clientX - r.left, cy = e.clientY - r.top;
    let x = cx > r.width * 0.55 ? cx - bw - 36 : cx + 36;
    let y = cy - bh / 2;
    x = Math.max(0, Math.min(r.width - bw, x));
    y = Math.max(0, Math.min(r.height - bh, y));
    const s = st.current;
    s.tx = x; s.ty = y;
    if (!s.init) { s.x = x; s.y = y; s.init = true; }
  };
  const enter = (i: number) => { setActive(i); setOn(true); };
  const leave = () => { st.current.init = false; setOn(false); };

  const rows = (
    <div className="svc-rows" onPointerMove={track} onPointerDown={track} onMouseLeave={leave}>
      {SERVICES.map((s, i) => (
        <button
          key={s.title}
          className={`nb svc-row${layout === 'stack' ? ' detailed' : ''}${on && active !== i ? ' dimmed' : ''}`}
          aria-pressed={on && active === i}
          onMouseEnter={() => enter(i)}
          onFocus={() => enter(i)}
          onClick={() => enter(i)}
        >
          {layout === 'stack' ? (
            <>
              <span className="num">0{i + 1}</span>
              <span className="title">{s.title}</span>
              <span className="desc">{s.desc}</span>
            </>
          ) : (
            <>
              <span className="title">{s.title}</span>
              <span className="num">0{i + 1}</span>
            </>
          )}
        </button>
      ))}
    </div>
  );

  return (
    <div ref={wrap} style={{ position: 'relative', display: 'flex', flexWrap: 'wrap', gap: layout === 'split' ? 48 : 36, flexDirection: layout === 'split' ? 'row' : 'column' }}>
      <div className="reveal" style={layout === 'split' ? { flex: '1 1 320px' } : undefined}>{intro}</div>
      <div className="reveal" style={layout === 'split' ? { flex: '2 1 560px', minWidth: 0 } : undefined}>{rows}</div>
      <div ref={float} className="svc-float" aria-hidden="true">
        <div className={`svc-card${on ? ' on' : ''}`}>
          <div className="svc-stage">
            <div key={active} className="svc-pop" dangerouslySetInnerHTML={{ __html: PANELS[active] }} />
          </div>
        </div>
      </div>
    </div>
  );
}
