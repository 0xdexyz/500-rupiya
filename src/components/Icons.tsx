import type { ReactElement } from 'react';
import type { IconName } from '../content';

/* Simple line icons drawn on a 24px grid. Deliberately plain: no medical crosses. */
const PATHS: Record<IconName, ReactElement> = {
  ear: (
    <>
      <path d="M7.5 9.5a5 5 0 0 1 10 0c0 2.6-1.7 3.7-2.8 4.7-1 .9-1.2 2-1.4 3.2-.3 2-1.8 3.3-3.6 3.3a3 3 0 0 1-3-2.8" />
      <path d="M10.3 9.6a2.2 2.2 0 0 1 4.4 0c0 1.2-1 1.8-1.8 2.4" />
    </>
  ),
  chat: (
    <>
      <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v7a2.5 2.5 0 0 1-2.5 2.5H11l-4.5 4v-4h0A2.5 2.5 0 0 1 4 13.5Z" />
      <path d="M8.5 9h7M8.5 12h4.5" />
    </>
  ),
  tune: (
    <>
      <path d="M5 4.5v15M12 4.5v15M19 4.5v15" />
      <circle cx="5" cy="9" r="2" />
      <circle cx="12" cy="15" r="2" />
      <circle cx="19" cy="7.5" r="2" />
    </>
  ),
  support: (
    <>
      <path d="M19.5 12a7.5 7.5 0 0 1-12.8 5.3M4.5 12A7.5 7.5 0 0 1 17.3 6.7" />
      <path d="M17.5 3.5v3.4h-3.4M6.5 20.5v-3.4h3.4" />
    </>
  ),
  speech: (
    <>
      <path d="M4 7a3 3 0 0 1 3-3h7a3 3 0 0 1 3 3v4a3 3 0 0 1-3 3H9.5L6 17v-3.2A3 3 0 0 1 4 11Z" />
      <path d="M19.5 9.5a4.5 4.5 0 0 1 0 6M21.5 7.5a7.5 7.5 0 0 1 0 10" />
    </>
  ),
  chip: (
    <>
      <rect x="6.5" y="6.5" width="11" height="11" rx="2.5" />
      <path d="M9.5 3.5v3M14.5 3.5v3M9.5 17.5v3M14.5 17.5v3M3.5 9.5h3M3.5 14.5h3M17.5 9.5h3M17.5 14.5h3" />
      <circle cx="12" cy="12" r="2" />
    </>
  ),
  person: (
    <>
      <circle cx="12" cy="8" r="3.6" />
      <path d="M4.8 20a7.2 7.2 0 0 1 14.4 0" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m15.2 8.8-2 4.4-4.4 2 2-4.4Z" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" />
      <circle cx="12" cy="10" r="2.4" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  phone: <path d="M6.5 3.8h3l1.5 4-2 1.3a10 10 0 0 0 5.9 5.9l1.3-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 6a2 2 0 0 1 2-2.2Z" />,
  mail: (
    <>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" />
      <path d="m4.5 7 7.5 6 7.5-6" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </>
  ),
};

export function Icon({ name, size = 24 }: { name: IconName; size?: number }) {
  return (
    <svg
      className="icon"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {PATHS[name]}
    </svg>
  );
}

export type SocialId = 'instagram' | 'facebook' | 'youtube';

export function SocialIcon({ id, size = 20 }: { id: SocialId; size?: number }) {
  return (
    <svg className="icon" viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      {id === 'instagram' && (
        <g fill="none" stroke="currentColor" strokeWidth="1.9">
          <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5.2" />
          <circle cx="12" cy="12" r="4.1" />
          <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" stroke="none" />
        </g>
      )}
      {id === 'facebook' && (
        <path
          fill="currentColor"
          d="M13.6 21v-7.6h2.6l.4-3h-3V8.5c0-.9.3-1.5 1.5-1.5h1.6V4.3a21 21 0 0 0-2.3-.1c-2.3 0-3.9 1.4-3.9 4v2.2H7.9v3h2.6V21Z"
        />
      )}
      {id === 'youtube' && (
        <g>
          <rect x="2.5" y="5.5" width="19" height="13" rx="4" fill="currentColor" />
          <path d="M10.2 9.2v5.6l4.8-2.8Z" fill="var(--icon-cut, #fff)" />
        </g>
      )}
    </svg>
  );
}
