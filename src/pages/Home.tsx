import { useRef, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { benefits, branches, categories, home, journey, services, site, trust } from '../content';
import { useReveal } from '../lib/motion';
import { CtaSection, Label, Lines, Marked, Pill, TextLink, Turn } from '../components/Bits';
import { BranchPicker } from '../components/Branches';
import HeroHeading from '../components/HeroHeading';
import Hub from '../components/Hub';
import { Icon } from '../components/Icons';
import { Arrow } from '../components/Marks';
import Marquee from '../components/Marquee';
import Photo from '../components/Photo';
import Spine from '../components/Spine';

export const TONE_BG: Record<string, string> = {
  navy: 'var(--tone-navy)',
  teal: 'var(--tone-teal)',
  slate: 'var(--tone-slate)',
  ocean: 'var(--tone-ocean)',
  ink: 'var(--tone-ink)',
};

const bandRows = [
  services.map((s) => s.title),
  [...branches.map((b) => b.name), site.hours, 'Personalised Care', 'Professional Guidance'],
];

export default function Home() {
  const ref = useRef<HTMLDivElement>(null);
  useReveal(ref);
  const { hero, about, solutions, featured, life, why, cta } = home;

  return (
    <div className="page" ref={ref}>
      <Spine />

      {/* 01 hero */}
      <section className="hero" data-tone="dark">
        <div className="hero-visual">
          <div className="hero-stage" data-reveal>
            <Photo id={hero.image} eager className="blend-screen" />
          </div>
        </div>
        <i className="hero-plug" data-spine="start" />
        <div className="wrap hero-inner">
          <Label n={1}>{hero.label}</Label>
          <HeroHeading lines={hero.lines} />
          <p className="hero-body" data-reveal>
            {hero.body}
          </p>
          <div className="hero-cta" data-reveal>
            <Pill to={site.bookHref} variant="light">
              {hero.cta}
            </Pill>
            <Pill to="/hearing-aids" variant="ghost">
              {hero.secondary}
            </Pill>
          </div>
        </div>
        <a className="scroll-hint" href="#care">
          <Arrow dir="down" /> Scroll
        </a>
      </section>

      {/* 02 trust */}
      <section className="section trust" id="care" data-tone="light">
        <Turn x="50%" />
        <div className="wrap">
          <Label n={2}>{home.trust.label}</Label>
          <ul className="trust-grid">
            {trust.map((t, i) => (
              <li className="card trust-card" data-reveal key={t.title} style={{ '--d': `${i * 70}ms` } as CSSProperties}>
                <span className="icon-badge">
                  <Icon name={t.icon} />
                </span>
                <h3 className="h-card">{t.title}</h3>
                <p>{t.body}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="band" data-reveal>
          <Marquee rows={bandRows} label="Our services and branches" />
        </div>
      </section>

      {/* 03 about */}
      <section className="section who" data-tone="light">
        <Turn x="calc(100% - var(--margin) / 2)" />
        <div className="wrap">
          <Label n={3}>{about.label}</Label>
          <Lines text={about.heading} className="h-lg who-h" />
          <p className="lead who-p" data-reveal>
            <Marked text={about.text} />
          </p>
          <div data-reveal>
            <TextLink to="/about">{about.link}</TextLink>
          </div>
        </div>
      </section>

      {/* 04 services */}
      <section className="section impact" data-tone="light">
        <Turn x="77.5%" />
        <div className="wrap">
          <Label n={4}>{home.services.label}</Label>
          <Lines text={home.services.heading} className="h-lg impact-h" />
          <div className="body-copy" data-reveal>
            <p>{home.services.body}</p>
          </div>
          <div className="card hub-card" data-reveal>
            <Hub source={journey.source} targets={journey.targets} />
          </div>
          <ul className="num-cards">
            {services.map((s, i) => (
              <li className="card num-card" data-reveal key={s.id} style={{ '--d': `${(i % 3) * 80}ms` } as CSSProperties}>
                <div className="num-card-head">
                  <span className="num-badge">{String(i + 1).padStart(2, '0')}</span>
                  <span className="num-icon">
                    <Icon name={s.icon} />
                  </span>
                </div>
                <div>
                  <h3 className="h-card">{s.title}</h3>
                  <p>{s.body}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="section-more" data-reveal>
            <TextLink to="/services">{home.services.link}</TextLink>
          </div>
        </div>
      </section>

      {/* 05 hearing solutions */}
      <section className="section solutions" data-tone="light">
        <Turn x="86%" />
        <div className="wrap">
          <Label n={5}>{solutions.label}</Label>
          <Lines text={solutions.heading} className="h-lg impact-h" />
          <div className="body-copy" data-reveal>
            <p>{solutions.body}</p>
          </div>
          <ul className="cat-grid">
            {categories.map((c, i) => (
              <li className="card cat-card" data-reveal key={c.id} style={{ '--d': `${i * 80}ms` } as CSSProperties}>
                <Link to={`/hearing-aids?style=${c.id}`} className="cat-link">
                  <div className="plinth cat-media">
                    <Photo id={c.image} />
                  </div>
                  <div className="cat-text">
                    <h3 className="h-card">{c.name}</h3>
                    <p>{c.body}</p>
                    <span className="text-link">
                      <span>{solutions.explore}</span>
                      <Arrow />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 06 featured product */}
      <section className="section featured" data-tone="dark">
        <div className="wrap featured-grid">
          <div className="featured-text">
            <Label n={6}>{featured.label}</Label>
            <Lines text={featured.heading} className="h-lg" />
            <span className="rule" data-reveal />
            <p className="problem-body" data-reveal>
              {featured.body}
            </p>
            <div className="hero-cta" data-reveal>
              <Pill to="/hearing-aids" variant="light">
                {featured.cta}
              </Pill>
            </div>
          </div>
          <div className="plinth featured-media" data-reveal>
            <Photo id={featured.image} />
          </div>
        </div>
      </section>

      {/* 07 real life */}
      <section className="section life" data-tone="light">
        <Turn x="calc(100% - var(--margin) / 2)" />
        <div className="wrap">
          <Label n={7}>{life.label}</Label>
          <div className="life-head">
            <Lines text={life.heading} className="h-lg" />
            <p className="body-copy" data-reveal>
              {life.body}
            </p>
          </div>
          <div className="life-grid">
            <figure className="life-main frame" data-reveal>
              <Photo id="held" fit="cover" />
            </figure>
            <figure className="life-round frame" data-reveal style={{ '--d': '90ms' } as CSSProperties}>
              <Photo id="inEar" fit="cover" />
            </figure>
            <figure className="life-side plinth" data-reveal style={{ '--d': '180ms' } as CSSProperties}>
              <Photo id="signiaBlack" />
            </figure>
          </div>
        </div>
      </section>

      {/* 08 why choose */}
      <section className="section reasons" data-tone="light">
        <Turn x="50%" />
        <div className="wrap">
          <Label n={8}>{why.label}</Label>
          <Lines text={why.heading} className="h-lg why-h" />
          <ul className="reason-grid">
            {benefits.map((b, i) => (
              <li
                className="reason"
                data-reveal
                key={b.title}
                style={{ '--bg': TONE_BG[b.tone], '--d': `${(i % 3) * 90}ms` } as CSSProperties}
              >
                <p className="micro">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="h-card">{b.title}</h3>
                <p>{b.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 09 branches */}
      <section className="section branches-sec" data-tone="light">
        <Turn x="85%" />
        <div className="wrap">
          <Label n={9}>{home.branches.label}</Label>
          <Lines text={home.branches.heading} className="h-lg impact-h" />
          <p className="lead clients-p" data-reveal>
            <Marked text={home.branches.text} />
          </p>
          <BranchPicker />
        </div>
      </section>

      {/* 10 appointment */}
      <CtaSection n={10} {...cta} />
    </div>
  );
}
