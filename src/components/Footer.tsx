import { Link } from 'react-router-dom';
import { branches, nav, site, telHref } from '../content';
import { Socials } from './Bits';
import { Icon } from './Icons';
import { Arrow, Logo } from './Marks';

export default function Footer() {
  const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  return (
    <footer className="footer" data-tone="dark">
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-brand">
            <Link to="/" aria-label={`${site.name} home`}>
              <Logo />
            </Link>
            <p>{site.tagline}</p>
            <Socials className="footer-social" size={20} />
          </div>
          <Link to={site.bookHref} className="footer-book">
            <span className="micro">Appointments</span>
            <span className="footer-book-cta">
              Book Appointment <Arrow />
            </span>
          </Link>
        </div>
        <div className="footer-cols">
          <div>
            <p className="micro">Navigation</p>
            <ul>
              {nav.map((n) => (
                <li key={n.to}>
                  <Link to={n.to}>{n.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="micro">Branches</p>
            <ul>
              {branches.map((b) => (
                <li key={b.id}>
                  <Link to={`/branches#${b.id}`}>{b.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="micro">Visit &amp; contact</p>
            <ul>
              <li className="footer-line">
                <Icon name="clock" size={18} />
                {site.hours}
              </li>
              {site.phones.map((p, i) => (
                <li className="footer-line" key={p}>
                  <Icon name="phone" size={18} />
                  <a href={telHref(p)}>{p}</a>
                  {i === 0 && <span className="phone-tag">Main</span>}
                </li>
              ))}
              {site.email && (
                <li className="footer-line">
                  <Icon name="mail" size={18} />
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </li>
              )}
              <li className="footer-line">
                <Icon name="calendar" size={18} />
                <Link to={site.bookHref}>Book Appointment</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bar">
          <p>
            © {new Date().getFullYear()} {site.name}
            <Link className="footer-legal" to="/privacy">
              Privacy
            </Link>
          </p>
          <button className="to-top" onClick={toTop}>
            Back to top <Arrow dir="up" />
          </button>
        </div>
      </div>
    </footer>
  );
}
