'use client';

import Link from 'next/link';
import { useState } from 'react';
import { PROJECTS } from '@/lib/data';
import { FacetG } from './Logo';
import LivePreview from './LivePreview';
import CaseStudy from './CaseStudy';

export default function ProjectTiles({ wide = false }: { wide?: boolean }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <>
      <div className={`tiles${wide ? ' wide' : ''}`}>
        {PROJECTS.map((p, i) => (
          <button key={p.slug} className="nb tile reveal" onClick={() => setOpen(i)} aria-label={`Open case study: ${p.name}`}>
            <span className="tile-media">
              <span className="tile-img"><LivePreview project={p} mode="hero" virtualWidth={wide ? 1440 : 1280} /></span>
              <span className="tile-cta">View case ↗</span>
            </span>
            <span className="tile-meta">
              <span style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
                {wide && <span style={{ fontSize: 14, color: 'var(--gold-ink)' }}>0{i + 1}</span>}
                <span className="tile-name" style={wide ? { fontSize: 28 } : undefined}>{p.name}</span>
              </span>
              <span className="tile-type">{wide ? p.tags : p.client.split(' · ')[0]}</span>
            </span>
          </button>
        ))}

        <Link href="/contact/" className="tile reveal" aria-label="Start a project">
          <span className="tile-media" data-dark="1" style={{ background: 'var(--ink)' }}>
            <span className="tile-img" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 20, padding: wide ? 40 : 32, color: 'var(--on-dark)' }}>
              <FacetG size={wide ? 56 : 52} />
              <span className="display" style={{ fontSize: wide ? 'clamp(32px, 3.6vw, 56px)' : 'clamp(30px, 3vw, 44px)', lineHeight: 1.02 }}>Your brand could be next.</span>
            </span>
            <span className="tile-cta" style={{ background: 'var(--gold)', color: 'var(--ink)' }}>Start a project ↗</span>
          </span>
          <span className="tile-meta">
            <span style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
              {wide && <span style={{ fontSize: 14, color: 'var(--gold-ink)' }}>0{PROJECTS.length + 1}</span>}
              <span className="tile-name" style={wide ? { fontSize: 28 } : undefined}>{wide ? 'Your project' : 'Now booking'}</span>
            </span>
            <span className="tile-type">{wide ? 'Now booking' : 'New projects'}</span>
          </span>
        </Link>
      </div>

      {open !== null && (
        <CaseStudy
          key={open}
          project={PROJECTS[open]}
          index={open}
          next={PROJECTS[(open + 1) % PROJECTS.length]}
          onClose={() => setOpen(null)}
          onNext={() => setOpen((open + 1) % PROJECTS.length)}
        />
      )}
    </>
  );
}
