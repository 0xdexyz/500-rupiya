import { useRef, type CSSProperties } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { categories, hearingAidsPage, products, site } from '../content';
import { media } from '../media';
import { useReveal } from '../lib/motion';
import { CtaSection, Label, Lines, Pill, Turn } from '../components/Bits';
import Photo from '../components/Photo';
import Spine from '../components/Spine';

export default function HearingAids() {
  const ref = useRef<HTMLDivElement>(null);
  useReveal(ref);
  const { hero, styles, note, choose, unsure, cta } = hearingAidsPage;
  const [params, setParams] = useSearchParams();
  const style = categories.some((c) => c.id === params.get('style')) ? params.get('style')! : 'all';
  const current = categories.find((c) => c.id === style);
  const shown = style === 'all' ? products : products.filter((p) => p.category === style);

  // the filter lives in the URL so a style can be linked to and survives a reload
  const choose_ = (id: string) => setParams(id === 'all' ? {} : { style: id }, { replace: true, preventScrollReset: true });

  return (
    <div className="page" ref={ref}>
      <Spine />

      <section className="page-hero has-visual" data-tone="dark">
        <div className="hero-visual">
          <div className="hero-stage">
            <Photo id={hero.image} eager reveal className="blend-multiply" />
          </div>
        </div>
        <i className="hero-plug" data-spine="start" />
        <div className="wrap">
          <Label n={1}>{hero.label}</Label>
          <Lines text={hero.heading} as="h1" className="h-xl" />
          <span className="rule" data-reveal />
          <p className="page-hero-body" data-reveal>
            {hero.body}
          </p>
        </div>
      </section>

      <section className="section lib" data-tone="light" id="styles">
        <Turn x="calc(100% - var(--margin) / 2)" />
        <div className="wrap">
          <Label n={2}>{styles.label}</Label>
          <div className="chips" role="group" aria-label="Filter by hearing aid style" data-reveal>
            {[{ id: 'all', name: styles.all }, ...categories].map((c) => (
              <button key={c.id} className={`chip ${style === c.id ? 'is-on' : ''}`} aria-pressed={style === c.id} onClick={() => choose_(c.id)}>
                {c.name}
                <span className="chip-count">{c.id === 'all' ? products.length : products.filter((p) => p.category === c.id).length}</span>
              </button>
            ))}
          </div>
          {current && (
            <p className="cat-intro" key={current.id}>
              {current.body}
            </p>
          )}
          <ul className="lib-grid" key={style}>
            {shown.map((p, i) => (
              <li className="card lib-tile" key={p.id} style={{ '--d': `${i * 45}ms` } as CSSProperties}>
                <div className={`plinth lib-media ${media[p.image].bg === 'black' ? 'plinth-black' : ''}`}>
                  <Photo id={p.image} />
                </div>
                <div className="lib-text">
                  <h3 className="lib-name">{p.name}</h3>
                  <span className="micro">{categories.find((c) => c.id === p.category)?.name}</span>
                </div>
              </li>
            ))}
          </ul>
          <p className="gallery-note">{note}</p>
        </div>
      </section>

      <section className="section build" data-tone="dark">
        <Turn x="86%" />
        <div className="wrap">
          <Label n={3}>{choose.label}</Label>
          <Lines text={choose.heading} className="h-lg build-h" />
          <span className="rule" data-reveal />
          <p className="problem-body" data-reveal>
            {choose.body}
          </p>
          <ol className="outcomes">
            {choose.steps.map((o, i) => (
              <li data-reveal key={o} style={{ '--d': `${i * 80}ms` } as CSSProperties}>
                <span className="num-badge">{String(i + 1).padStart(2, '0')}</span>
                <span className="h-card">{o}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" data-tone="light">
        <Turn x="86%" />
        <div className="wrap">
          <Label n={4}>{unsure.label}</Label>
          <p className="lead clients-p" data-reveal>
            {unsure.text}
          </p>
          <ul className="kinds" data-reveal>
            {categories.map((c) => (
              <li key={c.id}>
                <Link to={`/hearing-aids?style=${c.id}#styles`}>{c.name}</Link>
              </li>
            ))}
          </ul>
          <div className="hero-cta" data-reveal>
            <Pill to={site.bookHref}>Book an Appointment</Pill>
          </div>
        </div>
      </section>

      <CtaSection n={5} {...cta} />
    </div>
  );
}
