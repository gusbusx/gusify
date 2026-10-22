import type { Metadata } from 'next';
import Link from '@/components/SiteLink';
import Values from '@/components/Values';

export const metadata: Metadata = { title: 'About', description: 'Gusify is an independent web design and development studio founded by Gus.' };

const TEAM = [
  {
    name: 'Gus',
    role: 'Founder & lead developer',
    placeholder: '[Photo of Gus]',
    bio: [
      'Gus founded Gusify to give growing businesses the kind of website usually reserved for big brands — designed with care and built by the same person from start to finish.',
      '[Your story — how you got into web development, what drives you, and the kind of clients you love working with.]',
      'Recent work includes the websites for Marler Enterprises and 2KD Hood Cleaning.',
    ],
  },
  {
    name: 'Zoey',
    role: 'Lead Support',
    placeholder: '[Photo of Zoey]',
    bio: [
      'Every studio needs someone keeping morale up. At Gusify, that’s Zoey — head of emotional support, official greeter and firm believer that no deadline is more important than a walk.',
      '[Zoey’s story — how she joined the family, her breed, and her favorite part of studio life.]',
    ],
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="container about-intro">
        <div>
          <p className="eyebrow fade" style={{ marginBottom: 20 }}>The studio</p>
          <h1 className="h-page"><span className="line"><span>About us</span></span></h1>
          <p className="display fade" style={{ marginTop: 56, maxWidth: 980, fontWeight: 500, fontSize: 'clamp(24px, 2.6vw, 38px)', lineHeight: 1.3, letterSpacing: '-0.02em', animationDelay: '0.3s' }}>
            Gusify is an independent web design and development studio. We partner with businesses that care about how they show up — and build websites that make them look as good as they <span className="gold">really are.</span>
          </p>
        </div>
        <a href="#team" className="scroll-cue fade" style={{ animationDelay: '0.9s' }}>
          <span>Scroll down</span>
          <svg width="22" height="34" viewBox="0 0 22 34" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M11 2v29" /><path d="M3 23l8 8 8-8" />
          </svg>
        </a>
      </section>

      <section id="team" aria-labelledby="h-team" className="container" style={{ paddingTop: 24, paddingBottom: 128, scrollMarginTop: 96 }}>
        <div className="reveal" style={{ marginBottom: 56 }}>
          <p className="eyebrow" style={{ marginBottom: 14 }}>The team</p>
          <h2 id="h-team" className="h-sec">Small team. Big standards.</h2>
        </div>
        <div className="team">
          {TEAM.map((m) => (
            <article key={m.name} className="member reveal">
              <div className="member-photo">
                {/* Replace with: <img src={m.photo} alt={m.alt} /> */}
                {m.placeholder}
              </div>
              <p className="eyebrow" style={{ marginTop: 28, marginBottom: 10 }}>{m.role}</p>
              <h3 className="display" style={{ marginBottom: 18, fontSize: 'clamp(36px, 4vw, 56px)', letterSpacing: '-0.04em' }}>{m.name}</h3>
              {m.bio.map((b) => (
                <p key={b} className="muted" style={{ marginBottom: 14, fontSize: 17, lineHeight: 1.7 }}>{b}</p>
              ))}
            </article>
          ))}
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
