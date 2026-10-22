'use client';

import { useEffect } from 'react';
import type { Project } from '@/lib/data';
import { CURSOR_SVG } from '@/lib/raw';
import LivePreview from './LivePreview';

/** Flies in at the viewer. The browser "opens" the client site, then it auto-scrolls on its own. */
export default function CaseStudy({ project, index, next, onClose, onNext }: { project: Project; index: number; next: Project; onClose: () => void; onNext: () => void }) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', onKey); };
  }, [onClose]);

  return (
    <div className="overlay fly" role="dialog" aria-modal="true" aria-label={`Case study: ${project.name}`}>
      <div className="overlay-bar" data-dark="1">
        <div className="container">
          <span className="eyebrow" style={{ color: '#C9A24A' }}>Case study · 0{index + 1}</span>
          <button className="icon-btn" onClick={onClose} aria-label="Close case study">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12" /><path d="M18 6L6 18" /></svg>
          </button>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 72, paddingBottom: 120 }}>
        <h2 className="h-page" style={{ fontSize: 'clamp(48px, 8vw, 128px)' }}>{project.name}</h2>
        <div className="meta-row">
          <div><p className="meta-label">Client</p><p style={{ fontSize: 17, lineHeight: 1.5 }}>{project.client}</p></div>
          <div><p className="meta-label">Services</p><p style={{ fontSize: 17 }}>{project.tags}</p></div>
          <div className="wide">
            <p className="meta-label">Overview</p>
            <p style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--muted)' }}>{project.summary}</p>
            <a className="ul" href={project.url} target="_blank" rel="noopener" style={{ display: 'inline-block', marginTop: 14 }}>Visit {project.domain} ↗</a>
          </div>
        </div>

        {/* Browser: types the URL, clicks, loads — then the live site scrolls itself */}
        <div className="browser cs-browser" key={project.slug}>
          <div className="browser-bar">
            <div className="browser-dots"><span /><span /><span /></div>
            <div className="browser-url">
              <span style={{ color: '#0A0A0A', fontWeight: 500 }}>
                <svg width="11" height="12" viewBox="0 0 24 26" fill="none" stroke="#55575C" strokeWidth="2.4" aria-hidden="true"><rect x="3" y="11" width="18" height="13" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                <span className="cs-type">{project.domain}</span>
              </span>
            </div>
            <div style={{ flex: '0 0 47px' }} />
          </div>
          <div className="browser-view">
            <div className="cs-load" />
            <div className="cs-start">
              <span className="btn btn-dark" style={{ pointerEvents: 'none' }}>Open {project.name} →</span>
            </div>
            <div className="cs-cursor" dangerouslySetInnerHTML={{ __html: CURSOR_SVG.replace('<svg', '<svg class="cs-press"') }} />
            <div className="cs-site">
              <LivePreview project={project} mode="scroll" />
            </div>
          </div>
        </div>
        <p style={{ marginTop: 14, fontSize: 13, color: 'var(--muted-2)' }}>Live site — scrolls on its own. Visit it to explore.</p>

        <div style={{ marginTop: 80, display: 'flex', flexWrap: 'wrap', gap: 48 }}>
          <div style={{ flex: '1 1 380px' }}>
            <h3 className="display" style={{ fontSize: 28, marginBottom: 14 }}>The goal</h3>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: 'var(--muted)' }}>{project.goal}</p>
          </div>
          <div style={{ flex: '1 1 380px' }}>
            <h3 className="display" style={{ fontSize: 28, marginBottom: 14 }}>What we built</h3>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: 'var(--muted)' }}>{project.built}</p>
          </div>
        </div>

        <button className="nb" onClick={onNext} style={{ marginTop: 104, width: '100%', borderTop: '1px solid var(--ink)', paddingTop: 32, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'baseline', gap: 16 }}>
          <span className="eyebrow">Next project</span>
          <span className="display" style={{ fontSize: 'clamp(36px, 5vw, 72px)' }}>{next.name} →</span>
        </button>
      </div>
    </div>
  );
}
