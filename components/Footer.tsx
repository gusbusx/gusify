import Link from 'next/link';
import { FacetG, Wordmark } from './Logo';
import { CONTACT_EMAIL, PHONE } from '@/lib/data';

export default function Footer() {
  return (
    <footer className="footer" data-dark="1">
      <div className="container footer-top">
        <div style={{ flex: '1 1 280px' }}>
          <div className="logo" style={{ minHeight: 0 }}>
            <FacetG size={32} />
            <Wordmark size={17} />
          </div>
          <p style={{ marginTop: 18, maxWidth: 300, fontSize: 15, lineHeight: 1.6 }}>Premium websites, designed and built by hand.</p>
        </div>
        <div className="footer-col" style={{ flex: '0 1 160px' }}>
          <h4>Pages</h4>
          <Link href="/work/" className="ul">Work</Link>
          <Link href="/services/" className="ul">Services</Link>
          <Link href="/about/" className="ul">About</Link>
          <Link href="/contact/" className="ul">Contact</Link>
        </div>
        <div className="footer-col" style={{ flex: '0 1 220px' }}>
          <h4>Get in touch</h4>
          <a className="ul" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          <span>{PHONE}</span>
        </div>
        <div className="footer-col" style={{ flex: '0 1 160px' }}>
          <h4>Follow</h4>
          <a className="ul" href="#">[Instagram]</a>
          <a className="ul" href="#">[LinkedIn]</a>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <span>© {new Date().getFullYear()} Gusify. All rights reserved.</span>
          <span>Designed &amp; built by Gusify</span>
        </div>
      </div>
    </footer>
  );
}
