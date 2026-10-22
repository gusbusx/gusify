import type { Metadata } from 'next';
import { Suspense } from 'react';
import ContactForm from '@/components/ContactForm';
import { CONTACT_EMAIL, PHONE } from '@/lib/data';

export const metadata: Metadata = { title: 'Contact', description: 'Start a project with Gusify — we reply within 72 hours.' };

export default function ContactPage() {
  return (
    <div className="container" style={{ paddingTop: 96, paddingBottom: 136 }}>
      <p className="eyebrow fade" style={{ marginBottom: 20 }}>Contact</p>
      <h1 className="h-page"><span className="line"><span>Let’s <span className="gold">talk.</span></span></span></h1>
      <div style={{ marginTop: 72, display: 'flex', flexWrap: 'wrap', gap: 64, borderTop: '1px solid var(--line)', paddingTop: 48 }}>
        <div className="fade" style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: 20, animationDelay: '0.3s' }}>
          <p className="muted" style={{ fontSize: 17, lineHeight: 1.65 }}>Tell us about your project and we’ll get back to you within 72 hours.</p>
          <a className="ul display" href={`mailto:${CONTACT_EMAIL}`} style={{ fontWeight: 600, fontSize: 26, alignSelf: 'flex-start', letterSpacing: '-0.01em' }}>{CONTACT_EMAIL}</a>
          <p style={{ fontSize: 15, color: 'var(--muted-2)' }}>{PHONE}</p>
        </div>
        <Suspense fallback={<div style={{ flex: '2 1 520px' }} />}>
          <ContactForm />
        </Suspense>
      </div>
    </div>
  );
}
