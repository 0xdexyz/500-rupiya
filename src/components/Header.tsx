import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { branches, nav, site, telHref } from '../content';
import { useTheme } from '../lib/theme';
import { Pill, Socials } from './Bits';
import { Icon } from './Icons';
import { Logo } from './Marks';

const NUM_TONES = ['var(--accent)', 'var(--blue)', 'var(--sand)', 'var(--accent-soft)', 'var(--slate-light)', 'var(--stone-400)'];

/** Which kind of section sits under the fixed buttons, so they can recolour. */
function useToneUnderButton(pathname: string) {
  const [tone, setTone] = useState('dark');
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('[data-tone]');
    const hits = new Map<Element, boolean>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => hits.set(e.target, e.isIntersecting));
        // last section in document order that touches the band wins
        let next = 'light';
        sections.forEach((s) => {
          if (hits.get(s)) next = s.dataset.tone || 'light';
        });
        setTone(next);
      },
      { rootMargin: '-34px 0px -95% 0px' },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [pathname]);
  return tone;
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const { pathname } = useLocation();
  const tone = useToneUnderButton(pathname);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.documentElement.classList.toggle('menu-open', open);
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
      if (e.key === 'Tab' && panelRef.current) {
        // keep focus inside the menu and its toggle
        const items = [buttonRef.current, ...panelRef.current.querySelectorAll<HTMLElement>('a, button')].filter(Boolean) as HTMLElement[];
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <header className="masthead">
        <Link to="/" className="masthead-logo" aria-label={`${site.name} home`}>
          <Logo />
        </Link>
        <nav className="masthead-nav" aria-label="Main">
          {nav.map((item) => (
            <NavLink key={item.to} to={item.to} end className="masthead-link">
              {item.label}
            </NavLink>
          ))}
        </nav>
        <Socials className="masthead-social" size={18} />
      </header>

      <Link to={site.bookHref} className="book-btn" data-tone={open ? 'dark' : tone}>
        <Icon name="calendar" size={18} />
        <span>Book Appointment</span>
      </Link>

      {/* phones and tablets: one tap to call the main number */}
      {site.phones[0] && (
        <a
          className="call-btn"
          href={telHref(site.phones[0])}
          data-tone={open ? 'dark' : tone}
          aria-label={`Call ${site.name} on ${site.phones[0]}`}
        >
          <Icon name="phone" size={20} />
        </a>
      )}

      <button
        ref={buttonRef}
        className="menu-btn"
        data-tone={open ? 'dark' : tone}
        aria-expanded={open}
        aria-controls="site-menu"
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="menu-btn-lines" aria-hidden="true">
          <i />
          <i />
        </span>
      </button>

      <div id="site-menu" ref={panelRef} className={`menu ${open ? 'is-open' : ''}`} aria-hidden={!open} inert={!open}>
        <div className="menu-top">
          <Link to="/" className="masthead-logo" aria-label={`${site.name} home`}>
            <Logo />
          </Link>
        </div>
        <nav className="menu-nav" aria-label="Menu">
          {nav.map((item, i) => (
            <NavLink
              key={item.to}
              to={item.to}
              end
              className="menu-link"
              style={{ '--i': i, '--num': NUM_TONES[i % NUM_TONES.length] } as CSSProperties}
            >
              <span className="menu-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="menu-word">{item.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="menu-foot">
          <div className="menu-book">
            <Pill to={site.bookHref} variant="light">
              Book Appointment
            </Pill>
          </div>
          <div>
            <p className="micro">Opening hours</p>
            <p>{site.hours}</p>
          </div>
          <div>
            <p className="micro">Branches</p>
            <p className="menu-branches">
              {branches.map((b) => (
                <Link key={b.id} to={`/branches#${b.id}`}>
                  {b.name}
                </Link>
              ))}
            </p>
          </div>
          {site.phones.length > 0 && (
            <div>
              <p className="micro">Call us</p>
              <p className="menu-phones">
                {site.phones.map((p, i) => (
                  <a key={p} href={telHref(p)} className={i === 0 ? 'is-main' : ''}>
                    {p}
                  </a>
                ))}
              </p>
            </div>
          )}
          {site.email && (
            <div>
              <p className="micro">Email</p>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </div>
          )}
          <div>
            <p className="micro">Follow us</p>
            <Socials className="menu-social" size={20} />
          </div>
          <button className="theme-btn" onClick={toggle} aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}>
            {theme === 'dark' ? (
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                <circle cx="12" cy="12" r="4.5" fill="currentColor" />
                <path
                  d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z" fill="currentColor" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </>
  );
}
