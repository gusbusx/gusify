'use client';

import { useEffect, type RefObject } from 'react';

export type Fit = { ctx: CanvasRenderingContext2D; w: number; h: number };

/** Size the canvas backing store to its CSS box (DPR capped at 2) and clear it. */
export function fit(cv: HTMLCanvasElement): Fit | null {
  const w = cv.clientWidth, h = cv.clientHeight;
  if (!w || !h) return null;
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  const W = Math.round(w * dpr), H = Math.round(h * dpr);
  if (cv.width !== W || cv.height !== H) { cv.width = W; cv.height = H; }
  const ctx = cv.getContext('2d');
  if (!ctx) return null;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, w, h);
  return { ctx, w, h };
}

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Runs `setup(canvas)` once; it returns a per-frame tick(t, dt) and optional cleanup.
 * The loop pauses while the canvas is off-screen.
 */
export function useCanvasLoop(
  ref: RefObject<HTMLCanvasElement | null>,
  setup: (cv: HTMLCanvasElement, reduce: boolean) => { tick: (t: number, dt: number) => void; cleanup?: () => void },
  pauseOffscreen = true,
) {
  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const reduce = prefersReducedMotion();
    const { tick, cleanup } = setup(cv, reduce);
    let visible = true;
    let io: IntersectionObserver | null = null;
    if (pauseOffscreen && 'IntersectionObserver' in window) {
      io = new IntersectionObserver((en) => en.forEach((e) => (visible = e.isIntersecting)));
      io.observe(cv);
    }
    let raf = 0, last = performance.now();
    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (visible) tick(now / 1000, dt);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); io?.disconnect(); cleanup?.(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
