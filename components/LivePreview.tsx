'use client';

import { useEffect, useRef, useState } from 'react';
import type { Project } from '@/lib/data';

const SCROLLBAR_CROP = 24;

/**
 * The client's real, live website — rendered at desktop width, scaled down to fit, and locked
 * (visitors can't click or scroll it). In `scroll` mode it loads `?gusify-preview=1`, which makes
 * the client site auto-scroll itself when it has the small preview snippet installed (see README).
 */
export default function LivePreview({ project, mode, virtualWidth = 1440 }: { project: Project; mode: 'hero' | 'scroll'; virtualWidth?: number }) {
  const box = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ scale: 0, vw: virtualWidth, vh: 900 });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const measure = () => {
      const w = el.clientWidth, h = el.clientHeight;
      if (!w || !h) return;
      // Small boxes (phones) show the client site's mobile layout; larger ones show desktop.
      const vw = w < 520 ? 390 : virtualWidth;
      const scale = w / vw;
      setSize({ scale, vw, vh: Math.round(h / scale) });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [virtualWidth]);

  const src = mode === 'scroll' ? `${project.url}/?gusify-preview=1` : project.url;
  const fb = project.fallback;

  return (
    <div ref={box} className="live">
      {/* Shown until the live site has loaded */}
      <div className="live-fallback" style={{ background: fb.bg, color: fb.ink }} aria-hidden={loaded}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: fb.accent }}>{fb.kicker}</span>
        <span className="display" style={{ fontSize: 'clamp(24px, 2.8vw, 42px)', lineHeight: 1.02 }}>{fb.headline}</span>
        <span style={{ marginTop: 6, background: fb.accent, color: '#fff', borderRadius: 999, padding: '9px 16px', fontSize: 12, fontWeight: 700 }}>{fb.cta}</span>
      </div>
      {size.scale > 0 && (
        <iframe
          src={src}
          title={`Live preview of ${project.domain}`}
          loading="lazy"
          tabIndex={-1}
          scrolling={mode === 'hero' ? 'no' : undefined}
          sandbox="allow-scripts allow-same-origin"
          referrerPolicy="no-referrer-when-downgrade"
          onLoad={() => setLoaded(true)}
          style={{
            // extra width pushes the site's scrollbar past the crop edge
            width: size.vw + SCROLLBAR_CROP,
            height: size.vh,
            transform: `scale(${size.scale})`,
            opacity: loaded ? 1 : 0,
            transition: 'opacity .6s ease',
          }}
        />
      )}
      <div className="live-shield" aria-hidden="true" />
    </div>
  );
}
