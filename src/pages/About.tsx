import { useRef, type CSSProperties } from 'react';
import { about, branches } from '../content';
import { useReveal } from '../lib/motion';
import { CtaSection, Label, Lines, Turn } from '../components/Bits';
import { BranchCard } from '../components/Branches';
import Photo from '../components/Photo';
import Spine from '../components/Spine';

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  useReveal(ref);
  const { hero, principles, approach, technology, cta } = about;

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
            <Label n={2}>{principles.label}</Label>
          </div>
          <ol className="principle-list">
            {principles.items.map((p, i) => (
              <li className="principle" data-reveal key={p.title}>
                <span className="num-badge">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="h-card">{p.title}</h3>
                  <p>{p.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section model" data-tone="light">
        <div className="wrap">
          <Label n={3}>{approach.label}</Label>
          <p className="lead model-p" data-reveal>
            {approach.text}
          </p>
        </div>
      </section>

      <section className="section featured" data-tone="dark">
        <Turn x="86%" />
        <div className="wrap featured-grid">
          <div className="featured-text">
            <Label n={4}>{technology.label}</Label>
            <Lines text={technology.heading} className="h-lg" />
            <span className="rule" data-reveal />
            <p className="problem-body" data-reveal>
              {technology.body}
            </p>
            <ul className="steps-pills">
              {technology.steps.map((s, i) => (
                <li data-reveal key={s} style={{ '--d': `${i * 70}ms` } as CSSProperties}>
                  <span className="micro">{String(i + 1).padStart(2, '0')}</span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div className="plinth featured-media featured-wide" data-reveal>
            <Photo id={technology.image} />
          </div>
        </div>
      </section>

      <section className="section team" data-tone="light">
        <Turn x="74%" />
        <div className="wrap">
          <Label n={5}>{about.branches.label}</Label>
          <div className="branch-grid">
            {branches.map((b, i) => (
              <BranchCard key={b.id} b={b} delay={i * 80} />
            ))}
          </div>
        </div>
      </section>

      <CtaSection n={6} {...cta} />
    </div>
  );
}
