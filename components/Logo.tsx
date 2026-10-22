const G_PATH = 'M72,32 L50,10 L10,50 L50,90 L90,50 L54,50';

/** Facet G — engraved style (F3). `bg` is the color behind it, used for the engraved line. */
export function FacetG({ size = 34, bg = '#0A0A0A', className }: { size?: number; bg?: string; className?: string }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 100 100" fill="none" strokeLinejoin="miter" aria-hidden="true">
      <path d={G_PATH} stroke="#C9A24A" strokeWidth={13} />
      <path d={G_PATH} stroke={bg} strokeWidth={2.4} />
    </svg>
  );
}

export function Wordmark({ size = 18 }: { size?: number }) {
  return <span className="logo-word" style={{ fontSize: size }}>GUSIFY</span>;
}
