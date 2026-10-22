// Site content. Edit prices, package contents and projects here.

export const CONTACT_EMAIL = 'hello@gusify.com';
export const PHONE = '[Phone number]';

export type Project = {
  slug: string;
  name: string;
  client: string;
  tags: string;
  url: string;
  domain: string;
  summary: string;
  goal: string;
  built: string;
  /** Used only if the live site can't be shown (e.g. it blocks embedding). */
  fallback: { kicker: string; headline: string; cta: string; bg: string; ink: string; accent: string };
};

export const PROJECTS: Project[] = [
  {
    slug: 'marler-enterprises',
    name: 'Marler Enterprises',
    client: 'Bookkeeping & admin · Roselle, NJ',
    tags: 'Web design · Development',
    url: 'https://marlerenterprises.com',
    domain: 'marlerenterprises.com',
    summary:
      'A clean, trustworthy site for a small-business support firm offering bookkeeping, real estate bookkeeping, notary, form preparation and office support.',
    goal: 'Present a detail-driven bookkeeping and admin firm as organized and trustworthy — and make it effortless for small businesses and property managers to book a consultation.',
    built:
      'A calm, document-inspired design with a card for every service, each illustrated with its own paperwork-style visual. Plus a three-step “How it works”, Google reviews, certification highlights and a contact flow that explains what happens next.',
    fallback: { kicker: 'Bookkeeping · Notary · Admin', headline: 'Paperwork, perfectly handled.', cta: 'Book a consultation', bg: '#F4F1EA', ink: '#14213D', accent: '#14213D' },
  },
  {
    slug: '2kd-hood-cleaning',
    name: '2KD Hood Cleaning',
    client: 'Commercial kitchen services · Union County, NJ',
    tags: 'Web design · Development',
    url: 'https://2kdhoodcleaning.com',
    domain: '2kdhoodcleaning.com',
    summary:
      'A bold, conversion-focused site for a family-owned commercial kitchen hood cleaning company serving restaurants across Northern New Jersey and Southern New York.',
    goal: 'Win restaurant owners’ trust fast — put safety, certification and 24/7 availability up front, and turn visits into quote requests and phone calls.',
    built:
      'A video hero with clear calls to action, dedicated pages for services and service areas, NFPA 96 and certification trust badges, and a “Request a Quote” form backed by click-to-call throughout.',
    fallback: { kicker: 'Hood cleaning · 24/7', headline: 'Keep your kitchen clean, safe, compliant.', cta: 'Request a quote', bg: '#111214', ink: '#F5F3EE', accent: '#E4572E' },
  },
];

export type Package = {
  id: 'launch' | 'growth' | 'signature';
  name: string;
  price: number;
  height: number;
  desc: string;
  short: string[];
  full: string[];
  theme: { front: string; side: string; top: string; ink: string; sub: string; edge: string; mark: string; btnBg: string; btnInk: string; dark: boolean };
  badge?: string;
};

// Placeholder prices — set your real ones here.
export const PACKAGES: Package[] = [
  {
    id: 'launch',
    name: 'Launch',
    price: 1500,
    height: 360,
    desc: 'A polished one-page site to get a new business online, fast.',
    short: ['One-page custom site', 'Mobile-ready design', 'Contact form'],
    full: ['Custom one-page design', 'Mobile & tablet optimized', 'Contact form straight to your inbox', 'Basic SEO setup — titles, meta, sitemap', 'Domain & hosting setup', 'Google Analytics installed', '1 round of revisions', 'Launch support'],
    theme: { front: '#F3F1EC', side: '#CFCBC2', top: '#E9E6DF', ink: '#0A0A0A', sub: '#55575C', edge: '#E2DFD7', mark: '#B08D3C', btnBg: '#0A0A0A', btnInk: '#FFFFFF', dark: false },
  },
  {
    id: 'growth',
    name: 'Growth',
    price: 3500,
    height: 450,
    badge: 'Most chosen',
    desc: 'A multi-page custom site with SEO setup and launch support.',
    short: ['Up to 5 custom pages', 'On-page SEO', 'Analytics dashboard', '30-day support'],
    full: ['Everything in Launch', 'Up to 5 custom pages', 'Blog or news section', 'On-page SEO for every page', 'Google Business Profile setup', 'Speed optimization', 'Analytics dashboard', '2 rounds of revisions', '30 days of post-launch support'],
    theme: { front: '#111111', side: '#000000', top: '#2A2A2A', ink: '#F5F3EE', sub: '#B9B6AE', edge: '#111111', mark: '#C9A24A', btnBg: '#B08D3C', btnInk: '#0A0A0A', dark: true },
  },
  {
    id: 'signature',
    name: 'Signature',
    price: 7500,
    height: 540,
    desc: 'Full custom build, brand identity and a monthly care plan.',
    short: ['Full custom build', 'Logo & brand kit', 'Custom animations & 3D', 'Monthly care plan'],
    full: ['Everything in Growth', 'Full custom design — no page limit', 'Logo & brand identity kit', 'Custom animations & 3D', 'E-commerce or booking, if needed', 'Copywriting help', 'Priority support', 'Monthly care plan — updates, backups, reports', '3 rounds of revisions'],
    theme: { front: '#C9A24A', side: '#8C6A22', top: '#E2C477', ink: '#0A0A0A', sub: '#3A2E12', edge: '#C9A24A', mark: '#0A0A0A', btnBg: '#0A0A0A', btnInk: '#FFFFFF', dark: false },
  },
];

export const money = (n: number) => '$' + Math.round(n).toLocaleString('en-US');

export const SERVICES = [
  { title: 'Web design', desc: 'Custom layouts shaped around your brand and your customers — never a template.' },
  { title: 'Development', desc: 'Fast, responsive, hand-coded sites that work beautifully on every device.' },
  { title: 'Brand identity', desc: 'Logos, color and type that make a new business look established from day one.' },
  { title: 'SEO & ongoing care', desc: 'Search-ready structure, hosting and monthly updates long after launch.' },
];
