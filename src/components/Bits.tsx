import type { CSSProperties, ElementType, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { site, socials, telHref } from '../content';
import { splitMarks } from '../lib/motion';
import { SocialIcon } from './Icons';
import { Arrow } from './Marks';

/** "01 / HERO" style section label. */
export function Label({ n, children, className = '' }: { n: number; children: ReactNode; className?: string }) {
  return (
    <p className={`label ${className}`} data-reveal>
      {String(n).padStart(2, '0')} / {children}
    </p>
  );
}

/** Heading whose lines rise into place one after another. Lines are split on "\n". */
export function Lines({ text, as: Tag = 'h2', className = '' }: { text: string; as?: ElementType; className?: string }) {
  const lines = text.split('\n');
  return (
    <Tag className={`lines ${className}`} data-reveal aria-label={lines.join(' ')}>
      {lines.map((line, i) => (
        <span className="line" key={i} aria-hidden="true">
          <span className="line-in" style={{ '--i': i } as CSSProperties}>
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}

/** Text with [marked] phrases drawn as highlights. */
export function Marked({ text }: { text: string }) {
  return (
    <>
      {splitMarks(text).map((part, i) =>
        i % 2 ? (
          <mark className="hl" key={i}>
            {part}
          </mark>
        ) : (
          part
        ),
      )}
    </>
  );
}

const isExternal = (to: string) => /^(https?:|mailto:|tel:)/.test(to);

/** Pill button with the sliding arrow. `auto` follows the theme; the others are fixed. */
export function Pill({
  to,
  children,
  variant = 'auto',
  className = '',
}: {
  to: string;
  children: ReactNode;
  variant?: 'auto' | 'dark' | 'light' | 'ghost';
  className?: string;
}) {
  const cls = `pill pill-${variant} ${className}`;
  const inner = (
    <>
      <span>{children}</span>
      <span className="pill-arrow">
        <Arrow />
        <Arrow />
      </span>
    </>
  );
  if (isExternal(to)) {
    const web = to.startsWith('http');
    return (
      <a className={cls} href={to} target={web ? '_blank' : undefined} rel={web ? 'noreferrer' : undefined}>
        {inner}
      </a>
    );
  }
  return (
    <Link className={cls} to={to}>
      {inner}
    </Link>
  );
}

/** Underlined text link with an arrow. */
export function TextLink({ to, children, className = '' }: { to: string; children: ReactNode; className?: string }) {
  return (
    <Link className={`text-link ${className}`} to={to}>
      <span>{children}</span>
      <Arrow />
    </Link>
  );
}

/** Instagram, Facebook and YouTube, each opening in a new tab. */
export function Socials({ className = '', size = 20 }: { className?: string; size?: number }) {
  return (
    <ul className={`socials ${className}`} aria-label={`${site.name} on social media`}>
      {socials.map((s) => (
        <li key={s.id}>
          <a href={s.href} target="_blank" rel="noreferrer" aria-label={`${s.label} (opens in a new tab)`} title={s.label}>
            <SocialIcon id={s.id} size={size} />
          </a>
        </li>
      ))}
    </ul>
  );
}

/** "Prefer to talk?" line with the main number, for visitors who would rather phone. */
export function CallLine({ className = '' }: { className?: string }) {
  const main = site.phones[0];
  if (!main) return null;
  return (
    <p className={`call-line ${className}`} data-reveal>
      Prefer to talk? Call <a href={telHref(main)}>{main}</a>
    </p>
  );
}

/** The teal appointment band every page ends on. The cable stops inside it. */
export function CtaSection({ n, label, heading, body }: { n: number; label: string; heading: string; body: string }) {
  return (
    <section className="section talk" data-tone="accent" data-spine-invert>
      <i className="spine-mark" data-spine="end" style={{ '--y': '290px', '--y-sm': '112px' } as CSSProperties} />
      <div className="wrap">
        <Label n={n}>{label}</Label>
        <Lines text={heading} className="h-xl talk-heading" />
        <p className="talk-body" data-reveal>
          {body}
        </p>
        <div className="talk-row" data-reveal>
          <Pill to={site.bookHref} variant="light">
            Book an Appointment
          </Pill>
          <Pill to="/contact" variant="ghost">
            Contact Us
          </Pill>
        </div>
        <CallLine />
      </div>
    </section>
  );
}

/** A spine turn marker. x is a CSS length or percentage of the section width. */
export function Turn({ x, y = '64px' }: { x: string; y?: string }) {
  return <i className="spine-mark" data-spine="turn" style={{ '--x': x, '--y': y } as CSSProperties} />;
}
