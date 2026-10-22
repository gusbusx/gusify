'use client';

import { useRef } from 'react';
import { fit, useCanvasLoop } from '@/lib/canvas';

type Vec = [number, number, number];
type Mesh = { v: Vec[]; f: { v: number[]; n: Vec }[] };

/** Round brilliant cut, centered on the origin. */
function buildMesh(): Mesh {
  const V: Vec[] = [];
  const F: number[][] = [];
  const n = 8, step = (Math.PI * 2) / n;
  const P = (r: number, a: number, y: number) => { V.push([r * Math.cos(a), y + 0.26, r * Math.sin(a)]); return V.length - 1; };
  const T: number[] = [], M: number[] = [], G: number[] = [], B: number[] = [], L: number[] = [];
  for (let i = 0; i < n; i++) T.push(P(0.55, i * step, 0.36));
  for (let i = 0; i < n; i++) M.push(P(0.8, i * step + step / 2, 0.175));
  for (let j = 0; j < 16; j++) G.push(P(1, (j * step) / 2, 0));
  for (let j = 0; j < 16; j++) B.push(P(1, (j * step) / 2, -0.035));
  for (let i = 0; i < n; i++) L.push(P(0.5, i * step + step / 2, -0.46));
  const C = P(0, 0, -0.88);
  F.push(T.slice());
  for (let i = 0; i < n; i++) {
    const ip = (i + 1) % n, im = (i - 1 + n) % n;
    const g0 = G[2 * i], g1 = G[2 * i + 1], g2 = G[(2 * i + 2) % 16];
    const b0 = B[2 * i], b1 = B[2 * i + 1], b2 = B[(2 * i + 2) % 16];
    F.push([T[i], T[ip], M[i]], [T[i], M[im], g0], [T[i], g0, M[i]], [M[i], g0, g1], [M[i], g1, g2]);
    F.push([b0, b1, L[i]], [b1, b2, L[i]], [b0, L[i], C], [b0, C, L[im]]);
  }
  for (let j = 0; j < 16; j++) { const jn = (j + 1) % 16; F.push([G[j], G[jn], B[jn], B[j]]); }
  const f = F.map((idx) => {
    const [a, b, c] = [V[idx[0]], V[idx[1]], V[idx[2]]];
    const u = [b[0] - a[0], b[1] - a[1], b[2] - a[2]], w = [c[0] - a[0], c[1] - a[1], c[2] - a[2]];
    let nx = u[1] * w[2] - u[2] * w[1], ny = u[2] * w[0] - u[0] * w[2], nz = u[0] * w[1] - u[1] * w[0];
    let cx = 0, cy = 0, cz = 0;
    idx.forEach((k) => { cx += V[k][0]; cy += V[k][1]; cz += V[k][2]; });
    cx /= idx.length; cy /= idx.length; cz /= idx.length;
    if (nx * cx + ny * (cy - 0.26) + nz * cz < 0) { nx = -nx; ny = -ny; nz = -nz; }
    const l = Math.hypot(nx, ny, nz) || 1;
    return { v: idx, n: [nx / l, ny / l, nz / l] as Vec };
  });
  return { v: V, f };
}

const PAL = { dark: [22, 22, 24], light: [255, 255, 255], gold: [214, 176, 92], goldAmt: 0.9, front: 0.93, back: 0.45, edge: 'rgba(15,15,15,0.28)' };

function env(r: Vec) {
  const a = Math.atan2(r[0], r[2]), y = r[1];
  let lum = Math.pow(Math.sin(a * 3 + y * 3.2 + 0.6) * 0.5 + 0.5, 2.2);
  if (y > 0.45) lum = Math.max(lum, Math.min(1, (y - 0.45) * 4));
  if (y < -0.35) lum *= 0.4;
  const g = Math.sin(a * 2 - y * 5 + 2.1);
  const ga = g > 0.55 ? Math.min(1, (g - 0.55) / 0.3) * PAL.goldAmt : 0;
  return [0, 1, 2].map((k) => { const base = PAL.dark[k] + (PAL.light[k] - PAL.dark[k]) * lum; return base + (PAL.gold[k] - base) * ga; });
}

export default function Diamond({ height = 500 }: { height?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useCanvasLoop(ref, (cv, reduce) => {
    const mesh = buildMesh();
    const st = { rotY: 0.5, vel: 0, tilt: 0, tiltT: 0, drag: null as null | { x: number } };
    const down = (e: PointerEvent) => { st.drag = { x: e.clientX }; st.vel = 0; try { cv.setPointerCapture(e.pointerId); } catch {} };
    const move = (e: PointerEvent) => {
      const r = cv.getBoundingClientRect();
      if (st.drag) { const dx = e.clientX - st.drag.x; st.drag.x = e.clientX; st.rotY += dx * 0.009; st.vel = dx * 0.009; }
      if (r.height) st.tiltT = ((e.clientY - r.top) / r.height - 0.5) * 0.35;
    };
    const up = () => { st.drag = null; };
    const leave = () => { st.tiltT = 0; };
    cv.addEventListener('pointerdown', down);
    cv.addEventListener('pointermove', move);
    cv.addEventListener('pointerup', up);
    cv.addEventListener('pointercancel', up);
    cv.addEventListener('pointerleave', leave);

    const tick = (t: number, dt: number) => {
      if (!st.drag) { st.rotY += (reduce ? 0 : 0.32 * dt) + st.vel; st.vel *= 0.94; }
      st.tilt += (st.tiltT - st.tilt) * 0.06;
      const f = fit(cv);
      if (!f) return;
      const { ctx, w, h } = f;
      const S = Math.min(w, h) * 0.42, cx = w / 2, cy = h / 2 - 8, D = 4.2;
      const ry = st.rotY, rx = 0.4 + st.tilt;
      const cY = Math.cos(ry), sY = Math.sin(ry), cX = Math.cos(rx), sX = Math.sin(rx);
      const rot = (p: Vec): Vec => { const x = p[0] * cY + p[2] * sY, z = -p[0] * sY + p[2] * cY, y = p[1]; return [x, y * cX - z * sX, y * sX + z * cX]; };
      const proj = (p: Vec) => { const k = D / (D - p[2]); return [cx + p[0] * S * k, cy - p[1] * S * k]; };

      // soft floor shadow
      const sh = ctx.createRadialGradient(cx, cy + S, 0, cx, cy + S, S * 0.85);
      sh.addColorStop(0, 'rgba(0,0,0,0.16)'); sh.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.save(); ctx.translate(cx, cy + S); ctx.scale(1, 0.13); ctx.translate(-cx, -(cy + S));
      ctx.fillStyle = sh; ctx.beginPath(); ctx.arc(cx, cy + S, S * 0.85, 0, Math.PI * 2); ctx.fill(); ctx.restore();

      const R = mesh.v.map(rot);
      const Lt: Vec = [-0.352, 0.755, 0.553];
      const list = mesh.f.map((face) => {
        const nn = rot(face.n);
        const c: Vec = [0, 0, 0];
        face.v.forEach((k) => { c[0] += R[k][0]; c[1] += R[k][1]; c[2] += R[k][2]; });
        c[0] /= face.v.length; c[1] /= face.v.length; c[2] /= face.v.length;
        const front = nn[0] * -c[0] + nn[1] * -c[1] + nn[2] * (D - c[2]) > 0;
        return { face, n: nn, c, front };
      }).sort((a, b) => a.c[2] - b.c[2]);

      ctx.lineJoin = 'round'; ctx.lineWidth = 0.8;
      for (const it of list) {
        const n = it.front ? it.n : ([-it.n[0], -it.n[1], -it.n[2]] as Vec);
        let vx = it.c[0], vy = it.c[1], vz = it.c[2] - D;
        const vl = Math.hypot(vx, vy, vz) || 1; vx /= vl; vy /= vl; vz /= vl;
        const d = vx * n[0] + vy * n[1] + vz * n[2];
        const rr: Vec = [vx - 2 * d * n[0], vy - 2 * d * n[1], vz - 2 * d * n[2]];
        const col = env(rr);
        const sp = Math.pow(Math.max(0, rr[0] * Lt[0] + rr[1] * Lt[1] + rr[2] * Lt[2]), 30) * 230;
        const dim = it.front ? 1 : 0.55;
        const [r, g, b] = col.map((c) => Math.min(255, Math.round(c * dim + sp)));
        ctx.beginPath();
        it.face.v.forEach((k, i) => { const q = proj(R[k]); if (i === 0) ctx.moveTo(q[0], q[1]); else ctx.lineTo(q[0], q[1]); });
        ctx.closePath();
        ctx.fillStyle = `rgba(${r},${g},${b},${it.front ? PAL.front : PAL.back})`;
        ctx.fill();
        if (it.front) { ctx.strokeStyle = PAL.edge; ctx.stroke(); }
      }

      if (!reduce) {
        for (let s = 0; s < 3; s++) {
          const tt = t * 0.55 + s / 3, cyc = Math.floor(tt), ph = tt - cyc;
          let hv = Math.sin(cyc * 12.9898 + s * 78.233) * 43758.5453; hv -= Math.floor(hv);
          const p = R[Math.floor(hv * R.length)];
          if (!p || p[2] < 0.15) continue;
          const q = proj(p), sz = S * 0.1 * Math.sin(ph * Math.PI);
          if (sz < 0.5) continue;
          ctx.save(); ctx.translate(q[0], q[1]); ctx.rotate(ph * 0.6);
          ctx.shadowColor = 'rgba(214,176,92,0.9)'; ctx.shadowBlur = 14; ctx.fillStyle = '#FFFFFF';
          const a2 = sz * 0.16;
          ctx.beginPath();
          ctx.moveTo(0, -sz); ctx.lineTo(a2, -a2); ctx.lineTo(sz, 0); ctx.lineTo(a2, a2);
          ctx.lineTo(0, sz); ctx.lineTo(-a2, a2); ctx.lineTo(-sz, 0); ctx.lineTo(-a2, -a2);
          ctx.closePath(); ctx.fill(); ctx.restore();
        }
      }
    };
    const cleanup = () => {
      cv.removeEventListener('pointerdown', down);
      cv.removeEventListener('pointermove', move);
      cv.removeEventListener('pointerup', up);
      cv.removeEventListener('pointercancel', up);
      cv.removeEventListener('pointerleave', leave);
    };
    return { tick, cleanup };
  });

  return (
    <div style={{ position: 'relative' }}>
      <canvas ref={ref} className="gem" role="img" aria-label="Rotating 3D diamond. Drag to rotate." style={{ width: '100%', height, cursor: 'grab', touchAction: 'pan-y' }} />
      <p style={{ position: 'absolute', left: 0, right: 0, bottom: 4, textAlign: 'center', fontSize: 12, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#8A8C90' }}>Drag to rotate</p>
    </div>
  );
}
