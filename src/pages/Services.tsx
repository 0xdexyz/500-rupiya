import { useRef } from 'react';
import { journey, services, servicesPage } from '../content';
import { useReveal } from '../lib/motion';
import { CtaSection, Label, Lines, Turn } from '../components/Bits';
import Hub from '../components/Hub';
import { Icon } from '../components/Icons';
import Spine from '../components/Spine';

export default function Services() {
  const ref = useRef<HTMLDivElement>(null);
  useReveal(ref);
  const { hero, list, cta } = servicesPage;

  return (
    <div className="page" ref={ref}>
      <Spine />

      <section className="page-hero" data-tone="dark">
        <i className="hero-plug hero-plug-page" data-spine="start" />
        <div className="wrap">
          <Label n={1}>{hero.label}</Label>
          <Lines text={hero.heading} as="h1" className="h-xl" />
          <span className="rule" data-reveal />
          <p className="page-hero-body" data-reveal>
            {hero.body}
          </p>
        </div>
      </section>

      <section className="section principles" data-tone="light">
        <Turn x="calc(100% - var(--margin) / 2)" />
        <div className="wrap principles-grid">
          <div className="principles-side">
            <Label n={2}>{list.label}</Label>
          </div>
          <ol className="principle-list">
            {services.map((s, i) => (
              <li className="principle service-row" data-reveal key={s.id} id={s.id}>
                <span className="num-badge">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h2 className="h-card service-title">
                    <span className="num-icon">
                      <Icon name={s.icon} />
                    </span>
                    {s.title}
                  </h2>
                  <p>{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section impact" data-tone="light">
        <Turn x="77.5%" />
        <div className="wrap">
          <Label n={3}>{servicesPage.journey.label}</Label>
          <Lines text={servicesPage.journey.heading} className="h-lg impact-h" />
          <div className="body-copy" data-reveal>
            <p>{servicesPage.journey.body}</p>
          </div>
          <div className="card hub-card" data-reveal>
            <Hub source={journey.source} targets={journey.targets} />
          </div>
        </div>
      </section>

      <CtaSection n={4} {...cta} />
    </div>
  );
}
