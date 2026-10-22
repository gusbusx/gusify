import type { Metadata } from 'next';
import Link from 'next/link';
import Values from '@/components/Values';

export const metadata: Metadata = { title: 'About', description: 'Gusify is an independent web design and development studio founded by Gus.' };

export default function AboutPage() {
  return (
    <>
      <section className="container" style={{ paddingTop: 96, paddingBottom: 112 }}>
        <p className="eyebrow fade" style={{ marginBottom: 20 }}>The studio</p>
        <h1 className="h-page"><span className="line"><span>About us</span></span></h1>
        <p className="display fade" style={{ marginTop: 56, maxWidth: 980, fontWeight: 500, fontSize: 'clamp(24px, 2.6vw, 38px)', lineHeight: 1.3, letterSpacing: '-0.02em', animationDelay: '0.3s' }}>
          Gusify is an independent web design and development studio. We partner with businesses that care about how they show up — and build websites that make them look as good as they <span className="gold">really are.</span>
        </p>
      </section>

      <section aria-labelledby="h-founder" className="container" style={{ paddingBottom: 128, display: 'flex', flexWrap: 'wrap', gap: '48px 64px', alignItems: 'center' }}>
        <div className="reveal" style={{ flex: '1 1 360px', aspectRatio: '4 / 5', maxWidth: 520, background: 'var(--stone)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8A8780', fontSize: 12, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase' }}>
          {/* Replace with: <img src="/gus.jpg" alt="Gus, founder of Gusify" /> */}
          [Photo of Gus]
        </div>
        <div className="reveal" style={{ flex: '1 1 420px' }}>
          <p className="eyebrow" style={{ marginBottom: 14 }}>Founder &amp; lead developer</p>
          <h2 id="h-founder" className="display" style={{ marginBottom: 24, fontSize: 'clamp(40px, 5vw, 72px)', letterSpacing: '-0.04em' }}>Gus</h2>
          <p className="muted" style={{ marginBottom: 18, fontSize: 17, lineHeight: 1.7 }}>Gus founded Gusify to give growing businesses the kind of website usually reserved for big brands — designed with care and built by the same person from start to finish.</p>
          <p className="muted" style={{ marginBottom: 18, fontSize: 17, lineHeight: 1.7 }}>[Your story — how you got into web development, what drives you, and the kind of clients you love working with.]</p>
          <p className="muted" style={{ fontSize: 17, lineHeight: 1.7 }}>Recent work includes the websites for Marler Enterprises and 2KD Hood Cleaning.</p>
        </div>
      </section>

      <section aria-labelledby="h-why" className="dark" data-dark="1">
        <div className="container section" style={{ display: 'flex', flexWrap: 'wrap', gap: 48 }}>
          <div className="reveal" style={{ flex: '1 1 260px' }}><p className="eyebrow">Why the diamond</p></div>
          <div style={{ flex: '3 1 640px' }}>
            <h2 id="h-why" className="reveal display" style={{ marginBottom: 28, fontSize: 'clamp(36px, 4.6vw, 68px)', lineHeight: 1.02 }}>Every facet is <span className="gold">deliberate.</span></h2>
            <p className="reveal" style={{ maxWidth: 680, fontSize: 18, lineHeight: 1.7, color: 'var(--on-dark-muted)' }}>A diamond earns its brilliance through precision — every angle cut with intention. We build websites the same way: considered design, clean code and nothing left to chance.</p>
          </div>
        </div>
      </section>

      <Values />

      <section aria-label="Work with us" className="cream" style={{ overflow: 'hidden' }}>
        <div className="container pop-in" style={{ paddingTop: 150, paddingBottom: 150, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 40 }}>
          <p className="eyebrow">Let’s build it</p>
          <h2 className="display" style={{ fontWeight: 800, fontSize: 'clamp(52px, 9vw, 150px)', lineHeight: 0.92, letterSpacing: '-0.05em' }}>
            Ready when<br /><span className="shimmer">you are.</span>
          </h2>
          <Link href="/contact/" className="btn btn-dark btn-lg nudge">Start a project →</Link>
        </div>
      </section>
    </>
  );
}
