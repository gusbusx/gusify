import type { AnchorHTMLAttributes } from 'react';

/**
 * Plain <a> for internal links. Static exports on Cloudflare can serve Next's client-side
 * page data (index.txt) instead of the page during in-app navigation — full page loads avoid that.
 */
export default function SiteLink(props: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  return <a {...props} />;
}
