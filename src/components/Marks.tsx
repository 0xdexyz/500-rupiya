import { site } from '../content';

/* The Hearing Sensitivity badge: an ear, sound waves and two cupped hands. The master file is
   logo/ in the project root; public/logo holds the small copies the site actually loads. */
export function LogoMark({ size = 40 }: { size?: number }) {
  return (
    <img
      className="logo-mark"
      src="/logo/logo-96.png"
      srcSet="/logo/logo-96.png 96w, /logo/logo-192.png 192w"
      sizes={`${size}px`}
      width={size}
      height={size}
      alt=""
      decoding="async"
      draggable={false}
    />
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
