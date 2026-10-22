'use client';

import { useRef } from 'react';
import { fit, useCanvasLoop } from '@/lib/canvas';

/** Illustrative "stock ticker" dashboard — ticking KPIs + a streaming line. Sample data only. */
export default function LiveChart() {
  const ref = useRef<HTMLCanvasElement>(null);

  useCanvasLoop(ref, (cv, reduce) => {
    const N = 72, pts: number[] = [];
    let v = 0.38;
    for (let i = 0; i < N; i++) { v = Math.max(0.14, Math.min(0.86, v + (Math.random() - 0.4) * 0.05)); pts.push(v); }
    let off = 0;
    const step = 0.2;
    const kp = { vis: 1248, conv: 3.62, load: 0.84 };
    const gs = '201,162,74';

    const tick = (t: number, dt: number) => {
      if (!reduce) {
        off += dt / step;
        while (off >= 1) {
          off -= 1;
          pts.shift();
          let nv = pts[pts.length - 1] + (Math.random() - 0.44) * 0.075;
          if (nv > 0.86) nv = 0.78 - Math.random() * 0.06;
          if (nv < 0.14) nv = 0.2;
          pts.push(nv);
          if (Math.random() < 0.55) kp.vis += 1 + Math.floor(Math.random() * 3);
          kp.conv = Math.max(3.1, Math.min(4.4, kp.conv + (Math.random() - 0.5) * 0.05));
          kp.load = Math.max(0.68, Math.min(0.96, kp.load + (Math.random() - 0.5) * 0.015));
        }
      }
      const f = fit(cv);
      if (!f) return;
      const { ctx, w, h } = f;
      const pad = Math.max(20, Math.min(30, w * 0.04));
      const cols = w < 520 ? 2 : 3;
      const labels = ['VISITORS TODAY', 'CONVERSION RATE', 'AVG. LOAD TIME'];
      const vals = [kp.vis.toLocaleString('en-US'), kp.conv.toFixed(2) + '%', kp.load.toFixed(2) + 's'];
      const colW = (w - pad * 2) / cols;
      const big = Math.max(24, Math.min(38, w / 18));
      ctx.textBaseline = 'top';
      for (let i = 0; i < cols; i++) {
        const x = pad + colW * i;
        ctx.fillStyle = '#9A9790'; ctx.font = '600 11px Manrope, sans-serif'; ctx.fillText(labels[i], x, pad);
        ctx.fillStyle = '#F5F3EE'; ctx.font = `700 ${big}px Syne, sans-serif`; ctx.fillText(vals[i], x, pad + 20);
      }
      const top = pad + 20 + big + 30, bottom = h - pad, left = pad, right = w - pad;
      ctx.strokeStyle = 'rgba(255,255,255,0.07)'; ctx.lineWidth = 1;
      for (let i = 0; i <= 4; i++) { const gy = Math.round(top + ((bottom - top) * i) / 4) + 0.5; ctx.beginPath(); ctx.moveTo(left, gy); ctx.lineTo(right, gy); ctx.stroke(); }
      const n = pts.length, dx = (right - left) / (n - 3);
      const X = (k: number) => right - (n - 2 - k + off) * dx;
      const Y = (val: number) => bottom - val * (bottom - top);
      const hy = Y(pts[n - 2] + (pts[n - 1] - pts[n - 2]) * off), hx = right;
      const trace = () => { ctx.moveTo(X(0), Y(pts[0])); for (let k = 1; k <= n - 2; k++) ctx.lineTo(X(k), Y(pts[k])); ctx.lineTo(hx, hy); };
      ctx.save();
      ctx.beginPath(); ctx.rect(left, top - 6, right - left + 1, bottom - top + 12); ctx.clip();
      const grad = ctx.createLinearGradient(0, top, 0, bottom);
      grad.addColorStop(0, `rgba(${gs},0.26)`); grad.addColorStop(1, `rgba(${gs},0)`);
      ctx.beginPath(); trace(); ctx.lineTo(hx, bottom); ctx.lineTo(X(0), bottom); ctx.closePath(); ctx.fillStyle = grad; ctx.fill();
      ctx.beginPath(); trace(); ctx.strokeStyle = `rgb(${gs})`; ctx.lineWidth = 2; ctx.lineJoin = 'round'; ctx.stroke();
      ctx.restore();
      ctx.setLineDash([3, 4]); ctx.strokeStyle = `rgba(${gs},0.4)`;
      ctx.beginPath(); ctx.moveTo(left, Math.round(hy) + 0.5); ctx.lineTo(hx, Math.round(hy) + 0.5); ctx.stroke(); ctx.setLineDash([]);
      if (!reduce) {
        const p = (t % 1.4) / 1.4;
        ctx.beginPath(); ctx.arc(hx - 1, hy, 4 + p * 14, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${gs},${(1 - p) * 0.8})`; ctx.lineWidth = 1.5; ctx.stroke();
      }
      ctx.beginPath(); ctx.arc(hx - 1, hy, 4.5, 0, Math.PI * 2); ctx.fillStyle = `rgb(${gs})`; ctx.fill();
    };
    return { tick };
  });

  return (
    <div className="dash" data-dark="1">
      <div className="dash-head">
        <span className="display" style={{ fontSize: 16, color: '#F5F3EE', letterSpacing: 0 }}>Live overview</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#C9A24A' }}>
          <span className="live-dot" />Live
        </span>
      </div>
      <canvas ref={ref} role="img" aria-label="Sample live analytics dashboard with visitors, conversion rate, load time and a moving traffic graph" style={{ width: '100%', height: 380 }} />
    </div>
  );
}
