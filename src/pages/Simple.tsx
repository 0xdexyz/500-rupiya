import { useRef, type ReactNode } from 'react';
import { privacy } from '../content';
import { useReveal } from '../lib/motion';
import { Label, Lines, Pill } from '../components/Bits';

function Plain({ label, heading, body, children }: { label: string; heading: string; body: string[]; children?: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useReveal(ref);
  return (
    <div className="page" ref={ref}>
      <section className="page-hero plain" data-tone="dark">
        <div className="wrap">
          <Label n={1}>{label}</Label>
          <Lines text={heading} as="h1" className="h-xl" />
          <span className="rule" data-reveal />
          <div className="problem-body" data-reveal>
            {body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          {children}
        </div>
      </section>
    </div>
  );
}

export const Privacy = () => <Plain {...privacy} />;

export const NotFound = () => (
  <Plain label="404" heading={'Page not\nfound'} body={['The page you were looking for is not here.']}>
    <div className="hero-cta" data-reveal>
      <Pill to="/" variant="light">
        Back to home
      </Pill>
    </div>
  </Plain>
);
