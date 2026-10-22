import type { Metadata } from 'next';
import Diamond from '@/components/Diamond';
import Packages from '@/components/Packages';
import ServiceShowcase from '@/components/ServiceShowcase';

export const metadata: Metadata = { title: 'Services', description: 'Web design, development, brand identity and SEO — plus Launch, Growth and Signature packages.' };

const STEPS = [
  ['Discovery', 'We learn your business, goals and customers.'],
  ['Design', 'You approve the look before anything is built.'],
  ['Build', 'Hand-coded, tested on every screen, tuned for speed.'],
  ['Launch', 'Live on your domain, with ongoing support.'],
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero with the 3D diamond */}
      <section className="container" style={{ paddingTop: 72, paddingBottom: 96, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '24px 48px' }}>
        <div style={{ flex: '1 1 480px', minWidth: 0 }}>
          <p className="eyebrow fade" style={{ marginBottom: 20 }}>What we do</p>
          <h1 className="h-page"><span className="line"><span>Services</span></span></h1>
          <p className="lead fade" style={{ marginTop: 32, maxWidth: 460, animationDelay: '0.3s' }}>
            Every project is cut to fit — strategy, design and code shaped around your brand, one facet at a time.
          </p>
        </div>
        <div className="fade" style={{ flex: '1 1 420px', minWidth: 0, animationDelay: '0.2s' }}>
          <Diamond height={500} />
        </div>
      </section>

      {/* Packages — 3D pillars */}
      <section aria-labelledby="h-pk" className="container" style={{ paddingTop: 24, paddingBottom: 136 }}>
        <div className="reveal" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24 }}>
          <div>
            <p className="eyebrow" style={{ marginBottom: 14 }}>Packages</p>
            <h2 id="h-pk" className="display" style={{ fontSize: 'clamp(40px, 5vw, 76px)', lineHeight: 1, letterSpacing: '-0.04em' }}>Choose your <span className="gold">cut.</span></h2>
          </div>
          <p className="muted" style={{ maxWidth: 420, fontSize: 17, lineHeight: 1.65 }}>Every tier builds on the last — start where you are today and grow from there.</p>
        </div>
        <Packages />
      </section>

      {/* Services list with floating previews */}
      <section aria-labelledby="h-svc-list" className="container" style={{ paddingBottom: 120 }}>
        <ServiceShowcase
          layout="stack"
          intro={
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: 16 }}>
              <h2 id="h-svc-list" className="h-sec">What’s inside</h2>
              <p style={{ fontSize: 14, color: 'var(--muted-2)' }}>Hover or tap a service to see it in action.</p>
            </div>
          }
        />
      </section>

      {/* Process */}
      <section aria-labelledby="h-proc" className="dark" data-dark="1">
        <div className="container section">
          <h2 id="h-proc" className="h-sec reveal" style={{ marginBottom: 56 }}>Our process</h2>
          <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexWrap: 'wrap', gap: '40px 32px' }}>
            {STEPS.map(([t, d], i) => (
              <li key={t} className="reveal" style={{ flex: '1 1 240px', borderTop: '1px solid #C9A24A', paddingTop: 24 }}>
                <span style={{ fontSize: 14, color: '#C9A24A' }}>0{i + 1}</span>
                <h3 className="display" style={{ margin: '40px 0 10px', fontSize: 26 }}>{t}</h3>
                <p style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--on-dark-muted)' }}>{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
