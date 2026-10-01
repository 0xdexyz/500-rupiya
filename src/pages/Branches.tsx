import { useRef } from 'react';
import { branches, branchesPage } from '../content';
import { useReveal } from '../lib/motion';
import { CtaSection, Label, Lines, Marked, Turn } from '../components/Bits';
import { BranchCard } from '../components/Branches';
import Spine from '../components/Spine';

export default function Branches() {
  const ref = useRef<HTMLDivElement>(null);
  useReveal(ref);
  const { hero, list, visit, cta } = branchesPage;

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

      <section className="section team" data-tone="light">
        <Turn x="74%" />
        <div className="wrap">
          <Label n={2}>{list.label}</Label>
          <div className="branch-grid">
            {branches.map((b, i) => (
              <BranchCard key={b.id} b={b} delay={i * 80} />
            ))}
          </div>
        </div>
      </section>

      <section className="section" data-tone="light">
        <Turn x="74%" y="40px" />
        <div className="wrap">
          <Label n={3}>{visit.label}</Label>
          <p className="lead clients-p" data-reveal>
            <Marked text={visit.text} />
          </p>
        </div>
      </section>

      <CtaSection n={4} {...cta} />
    </div>
  );
}
