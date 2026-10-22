'use client';

import { useEffect, useRef } from 'react';

/** White blend-mode circle on light areas, gold on anything marked data-dark="1". Mouse only. */
export default function Cursor() {
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const r = ring.current, d = dot.current;
    if (!r || !d) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const st = { x: -200, y: -200, tx: -200, ty: -200, on: false, dark: false, hover: false };
    const show = (v: boolean) => {
      st.on = v;
      r.classList.toggle('on', v);
      d.classList.toggle('on', v);
      document.documentElement.classList.toggle('nocursor', v);
    };
    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') { if (st.on) show(false); return; }
      st.tx = e.clientX; st.ty = e.clientY;
      if (!st.on) { st.x = st.tx; st.y = st.ty; show(true); }
      const t = e.target as Element | null;
      const dark = !!t?.closest?.('[data-dark="1"]');
      const hov = !!t?.closest?.('a, button, input, textarea, label, .gem');
      if (dark !== st.dark) { st.dark = dark; r.classList.toggle('dark', dark); d.classList.toggle('dark', dark); }
      if (hov !== st.hover) { st.hover = hov; r.classList.toggle('hover', hov); }
    };
    const leave = () => { if (st.on) { st.on = false; r.classList.remove('on'); d.classList.remove('on'); } };
    let raf = 0, last = performance.now();
    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000); last = now;
      if (st.on) {
        const k = reduce ? 1 : 1 - Math.pow(0.00002, dt);
        st.x += (st.tx - st.x) * k; st.y += (st.ty - st.y) * k;
        r.style.transform = `translate3d(${st.x.toFixed(1)}px,${st.y.toFixed(1)}px,0)`;
        d.style.transform = `translate3d(${st.tx}px,${st.ty}px,0)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerdown', move, { passive: true });
    document.documentElement.addEventListener('pointerleave', leave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerdown', move);
      document.documentElement.removeEventListener('pointerleave', leave);
      document.documentElement.classList.remove('nocursor');
    };
  }, []);

  return (
    <>
      <div ref={ring} className="g-cursor" aria-hidden="true" />
      <div ref={dot} className="g-dot" aria-hidden="true" />
    </>
  );
}
