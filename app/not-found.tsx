import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container" style={{ paddingTop: 140, paddingBottom: 160, textAlign: 'center' }}>
      <p className="eyebrow" style={{ marginBottom: 20 }}>404</p>
      <h1 className="h-page" style={{ fontSize: 'clamp(48px, 8vw, 120px)' }}>Lost a <span className="gold">facet.</span></h1>
      <p className="lead" style={{ margin: '28px auto 40px', maxWidth: 460 }}>This page doesn’t exist — but your next website could.</p>
      <Link href="/" className="btn btn-dark">Back home</Link>
    </div>
  );
}
