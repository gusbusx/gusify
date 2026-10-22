'use client';

import { useRef } from 'react';
import { fit, useCanvasLoop } from '@/lib/canvas';

/** Gold/black confetti from both bottom corners + a rain from the top. Calls onDone when finished. */
export default function Confetti({ onDone }: { onDone: () => void }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useCanvasLoop(ref, (cv, reduce) => {
    const cols = ['#C9A24A', '#E2C477', '#B08D3C', '#F3DE9E', '#0A0A0A', '#8C6A22', '#D9D6CF'];
    const W = window.innerWidth, H = window.innerHeight;
    type P = { x: number; y: number; vx: number; vy: number; r: number; vr: number; w: number; h: number; c: string; wob: number };
    const parts: P[] = [];
    const mk = (x: number, y: number, vx: number, vy: number) =>
      parts.push({ x, y, vx, vy, r: Math.random() * 6.28, vr: (Math.random() - 0.5) * 14, w: 6 + Math.random() * 7, h: 9 + Math.random() * 10, c: cols[Math.floor(Math.random() * cols.length)], wob: Math.random() * 6.28 });
    const cannon = (x: number, y: number, ang: number, n: number) => {
      for (let i = 0; i < n; i++) { const a = ang + (Math.random() - 0.5) * 0.9, v = 1150 * (0.55 + Math.random() * 0.6); mk(x, y, Math.cos(a) * v, Math.sin(a) * v); }
    };
    if (!reduce) {
      cannon(0, H, -Math.PI / 3, 110);
      cannon(W, H, (-2 * Math.PI) / 3, 110);
      for (let i = 0; i < 90; i++) mk(Math.random() * W, -20 - Math.random() * H * 0.6, (Math.random() - 0.5) * 140, 80 + Math.random() * 180);
    }
    let t0: number | null = null, ended = false;
    const tick = (t: number, dt: number) => {
      if (t0 === null) t0 = t;
      const age = t - t0;
      const f = fit(cv);
      if (!f) return;
      const { ctx } = f;
      ctx.globalAlpha = age > 3.4 ? Math.max(0, 1 - (age - 3.4) / 1.3) : 1;
      for (const p of parts) {
        p.vy = Math.min(360, p.vy + 1100 * dt);
        p.vx *= 1 - 1.4 * dt;
        p.x += p.vx * dt; p.y += p.vy * dt; p.r += p.vr * dt; p.wob += 7 * dt;
        if (p.y > f.h + 40) continue;
        ctx.save();
        ctx.translate(p.x + Math.sin(p.wob) * 5, p.y);
        ctx.rotate(p.r);
        ctx.scale(1, Math.max(0.15, Math.abs(Math.cos(p.wob))));
        ctx.fillStyle = p.c;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      }
      ctx.globalAlpha = 1;
      if (!ended && (age > 4.8 || reduce)) { ended = true; setTimeout(onDone, 0); }
    };
    return { tick };
  }, false);

  return <canvas ref={ref} className="confetti" aria-hidden="true" />;
}
