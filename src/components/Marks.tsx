import { site } from '../content';

/* Brand mark: a listening ring with two sound arcs, drawn in the same line
   language as the cable that runs down each page. */
export function LogoMark({ size = 30 }: { size?: number }) {
  return (
    <svg className="logo-mark" viewBox="0 0 32 32" width={size} height={size} aria-hidden="true">
      <circle cx="11" cy="16" r="6.2" fill="none" style={{ stroke: 'var(--accent)' }} strokeWidth="3.2" />
      <circle cx="11" cy="16" r="2" fill="currentColor" />
      <path d="M20.2 9.8a8.8 8.8 0 0 1 0 12.4" fill="none" style={{ stroke: 'var(--accent)' }} strokeWidth="2.6" strokeLinecap="round" />
      <path d="M24.6 5.8a14.4 14.4 0 0 1 0 20.4" fill="none" stroke="currentColor" strokeOpacity="0.55" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`logo ${className}`}>
      <LogoMark />
      <span className="logo-word">{site.name}</span>
    </span>
  );
}

export function Arrow({ dir = 'right' }: { dir?: 'right' | 'up' | 'down' | 'out' }) {
  const rot = dir === 'up' ? -90 : dir === 'down' ? 90 : dir === 'out' ? -45 : 0;
  return (
    <svg className="arrow" viewBox="0 0 20 20" width="18" height="18" aria-hidden="true" style={{ transform: `rotate(${rot}deg)` }}>
      <path d="M3 10 H16 M11 4.5 L16.5 10 L11 15.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
