'use client';

import Link from './SiteLink';
import { usePathname } from 'next/navigation';
import { FacetG, Wordmark } from './Logo';

const LINKS = [
  { href: '/work/', label: 'Work' },
  { href: '/services/', label: 'Services' },
  { href: '/about/', label: 'About' },
  { href: '/contact/', label: 'Contact' },
];

export default function Nav() {
  const path = usePathname() || '/';
  return (
    <header className="nav" data-dark="1">
      <nav aria-label="Main" className="container nav-inner">
        <Link href="/" className="logo" aria-label="Gusify home">
          <FacetG className="logo-gem" size={34} />
          <Wordmark />
        </Link>
        <div className="nav-links">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="nav-link" aria-current={path.startsWith(l.href.replace(/\/$/, '')) ? 'page' : undefined}>
              {l.label}
            </Link>
          ))}
          <Link href="/contact/" className="btn btn-gold">Start a project</Link>
        </div>
      </nav>
    </header>
  );
}
