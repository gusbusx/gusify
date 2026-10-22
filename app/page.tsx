import Link from '@/components/SiteLink';
import { ARCH, BROWSER_DEMO } from '@/lib/raw';
import ProjectTiles from '@/components/ProjectTiles';
import LiveChart from '@/components/LiveChart';
import ServiceShowcase from '@/components/ServiceShowcase';

export default function Home() {
  return (
    <>
      {/* Hero: rotating arch of services, headline, browser demo loop */}
      <section className="hero">
        <div className="container">
          <div className="arch fade" aria-hidden="true">
            <div className="arch-wheel" dangerouslySetInnerHTML={{ __html: ARCH }} />
          </div>
          <div className="hero-copy">
            <p className="eyebrow fade" style={{ marginBottom: 28 }}>Web design &amp; development studio</p>
            <h1 className="hero-title">
              <span className="line"><span style={{ animationDelay: '0.05s' }}>Websites cut</span></span>
              <span className="line"><span style={{ animationDelay: '0.18s' }}>with <span className="gold">precision.</span></span></span>
            </h1>
            <p className="lead fade" style={{ margin: '32px auto 0', maxWidth: 520, animationDelay: '0.45s' }}>
              Gusify is an independent studio designing and building premium websites for brands that mean business.
            </p>
            <div className="hero-actions fade" style={{ animationDelay: '0.6s' }}>
              <Link href="/contact/" className="btn btn-dark">Start a project</Link>
              <Link href="/work/" className="ul">View our work →</Link>
            </div>
          </div>
          <div className="fade" style={{ maxWidth: 1120, margin: '80px auto 0', animationDelay: '0.7s' }} dangerouslySetInnerHTML={{ __html: BROWSER_DEMO }} />
        </div>
      </section>

      {/* Selected work — live sites */}
      <section aria-labelledby="sel-work" className="container" style={{ paddingBottom: 128 }}>
        <div className="reveal" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, marginBottom: 48 }}>
          <div>
            <p className="eyebrow" style={{ marginBottom: 14 }}>Portfolio</p>
            <h2 id="sel-work" className="h-sec">Selected work</h2>
          </div>
          <Link href="/work/" className="ul">All projects →</Link>
        </div>
        <ProjectTiles />
      </section>

      {/* Built to perform — live dashboard */}
      <section aria-labelledby="h-perf" className="cream">
        <div className="container section" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 56 }}>
          <div className="reveal" style={{ flex: '1 1 340px' }}>
            <p className="eyebrow" style={{ marginBottom: 14 }}>Built to perform</p>
            <h2 id="h-perf" className="h-sec" style={{ marginBottom: 22 }}>Websites that work as hard as you do.</h2>
            <p className="muted" style={{ marginBottom: 32, maxWidth: 440, fontSize: 17, lineHeight: 1.65 }}>Fast, search-ready and measurable — track your traffic, leads and speed as they happen.</p>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 14, fontSize: 16, fontWeight: 500 }}>
              {['Optimized for speed', 'SEO-ready structure', 'Analytics built in'].map((t) => (
                <li key={t} style={{ display: 'flex', alignItems: 'center', gap: 12 }}><span aria-hidden="true" className="gold">◆</span>{t}</li>
              ))}
            </ul>
          </div>
          <div className="reveal" style={{ flex: '1.4 1 520px', minWidth: 0 }}>
            <LiveChart />
            <p style={{ marginTop: 14, fontSize: 13, color: 'var(--muted-2)' }}>Illustrative dashboard · sample data</p>
          </div>
        </div>
      </section>

      {/* What we do — floating previews */}
      <section aria-labelledby="h-cap" className="container section">
        <ServiceShowcase
          layout="split"
          intro={
            <>
              <p className="eyebrow" style={{ marginBottom: 14 }}>Services</p>
              <h2 id="h-cap" className="h-sec" style={{ marginBottom: 20 }}>What we do</h2>
              <p className="muted" style={{ marginBottom: 16, maxWidth: 360, fontSize: 17, lineHeight: 1.65 }}>Everything a brand needs to look established online, from first sketch to launch.</p>
              <p style={{ marginBottom: 28, fontSize: 14, color: 'var(--muted-2)' }}>Hover or tap a service to see it in action.</p>
              <Link href="/services/" className="ul">Explore services →</Link>
            </>
          }
        />
      </section>

      {/* About teaser */}
      <section aria-labelledby="h-about" className="dark" data-dark="1">
        <div className="container section" style={{ display: 'flex', flexWrap: 'wrap', gap: 48 }}>
          <div className="reveal" style={{ flex: '1 1 260px' }}><p className="eyebrow">About us</p></div>
          <div style={{ flex: '3 1 640px' }}>
            <h2 id="h-about" className="reveal display" style={{ fontWeight: 600, fontSize: 'clamp(30px, 3.6vw, 52px)', lineHeight: 1.15, letterSpacing: '-0.025em' }}>
              A small studio with an obsession for detail. Every site is designed and coded by hand — <span className="gold">no templates, no shortcuts.</span>
            </h2>
            <Link href="/about/" className="btn btn-line reveal" style={{ marginTop: 48 }}>Meet the studio →</Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section aria-label="Start a project" className="cream">
        <div className="container section" style={{ textAlign: 'center', paddingTop: 136, paddingBottom: 136 }}>
          <p className="eyebrow reveal" style={{ marginBottom: 20 }}>Have a project in mind?</p>
          <h2 className="reveal display" style={{ margin: '0 auto 44px', maxWidth: 920, fontSize: 'clamp(40px, 5.6vw, 88px)', lineHeight: 1.02, letterSpacing: '-0.04em' }}>
            Ready to <span className="gold">Gusify</span> your brand?
          </h2>
          <Link href="/contact/" className="btn btn-dark reveal">Get in touch</Link>
        </div>
      </section>
    </>
  );
}
