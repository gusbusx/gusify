'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/** Fallback for browsers without CSS scroll timelines: adds .is-in to .reveal elements as they enter. */
export default function RevealObserver() {
  const path = usePathname();
  useEffect(() => {
    if (CSS.supports?.('animation-timeline: view()')) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } }),
      { rootMargin: '0px 0px -8% 0px' },
    );
    const scan = () => document.querySelectorAll('.reveal:not(.is-in)').forEach((el) => io.observe(el));
    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => { io.disconnect(); mo.disconnect(); };
  }, [path]);
  return null;
}
