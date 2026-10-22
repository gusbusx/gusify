import type { Metadata, Viewport } from 'next';
import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Cursor from '@/components/Cursor';
import RevealObserver from '@/components/RevealObserver';

export const metadata: Metadata = {
  title: { default: 'Gusify — Websites cut with precision', template: '%s · Gusify' },
  description: 'Gusify is an independent studio designing and building premium websites for brands that mean business.',
  icons: { icon: '/favicon.svg' },
  openGraph: { title: 'Gusify — Websites cut with precision', description: 'Premium websites, designed and built by hand.', type: 'website' },
};

export const viewport: Viewport = { themeColor: '#0A0A0A' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Syne:wght@500;600;700;800&family=Manrope:wght@300;400;500;600;700&display=swap"
        />
      </head>
      <body>
        <Cursor />
        <RevealObserver />
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
