import { useRef, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { branches, contactPage, site, telHref } from '../content';
import { useReveal } from '../lib/motion';
import { CallLine, Label, Lines, Socials } from '../components/Bits';
import AppointmentForm from '../components/AppointmentForm';
import { Icon } from '../components/Icons';
import Spine from '../components/Spine';

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  useReveal(ref);
  const { hero, book } = contactPage;

  return (
    <div className="page" ref={ref}>
      <Spine />

      <section className="page-hero contact-hero" data-tone="dark">
        <i className="hero-plug hero-plug-page" data-spine="start" />
        <div className="wrap">
          <Label n={1}>{hero.label}</Label>
          <Lines text={hero.heading} as="h1" className="h-xl" />
          <span className="rule" data-reveal />
          <p className="page-hero-body" data-reveal>
            {hero.body}
          </p>
          <ul className="contact-grid">
            {site.phones.length > 0 && (
              <li className="contact-item contact-phones" data-reveal>
                <Icon name="phone" />
                <span className="micro">Phone</span>
                <a className="contact-main" href={telHref(site.phones[0])}>
                  {site.phones[0]}
                </a>
                {site.phones.length > 1 && (
                  <span className="contact-alt">
                    {site.phones.slice(1).map((p) => (
                      <a key={p} href={telHref(p)}>
                        {p}
                      </a>
                    ))}
                  </span>
                )}
              </li>
            )}
            {site.email && (
              <li className="contact-item" data-reveal>
                <Icon name="mail" />
                <span className="micro">Email</span>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
            )}
            <li className="contact-item" data-reveal style={{ '--d': '60ms' } as CSSProperties}>
              <Icon name="pin" />
              <span className="micro">Branch locations</span>
              <span className="contact-branches">
                {branches.map((b) => (
                  <Link key={b.id} to={`/branches#${b.id}`}>
                    {b.name}
                  </Link>
                ))}
              </span>
            </li>
            <li className="contact-item" data-reveal style={{ '--d': '120ms' } as CSSProperties}>
              <Icon name="clock" />
              <span className="micro">Opening hours</span>
              <span>{site.hours}</span>
            </li>
            <li className="contact-item" data-reveal style={{ '--d': '180ms' } as CSSProperties}>
              <Icon name="calendar" />
              <span className="micro">Appointment enquiry</span>
              <a href="#book">Use the form below</a>
            </li>
            <li className="contact-item" data-reveal style={{ '--d': '240ms' } as CSSProperties}>
              <Icon name="chat" />
              <span className="micro">Follow us</span>
              <Socials className="contact-social" size={22} />
            </li>
          </ul>
        </div>
      </section>

      <section className="section talk book" id="book" data-tone="accent" data-spine-invert>
        <i className="spine-mark" data-spine="end" style={{ '--y': '200px', '--y-sm': '96px' } as CSSProperties} />
        <div className="wrap">
          <Label n={2}>{book.label}</Label>
          <Lines text={book.heading} className="h-lg call-h" />
          <p className="talk-body" data-reveal>
            {book.body}
          </p>
          <CallLine />
          <AppointmentForm />
        </div>
      </section>
    </div>
  );
}
