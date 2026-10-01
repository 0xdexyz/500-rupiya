import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import { reducedMotion, splitMarks } from '../lib/motion';

/* Hero heading whose highlight slides from one [marked] word to the next. */
export default function HeroHeading({ lines }: { lines: string[] }) {
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const boxRef = useRef<HTMLSpanElement>(null);
  const wordRefs = useRef<HTMLSpanElement[]>([]);
  const [active, setActive] = useState(0);

  let count = 0;
  const parsed = lines.map((line) =>
    splitMarks(line).map((part, i) => (i % 2 ? { word: part, index: count++ } : { text: part })),
  );

  // Cycle through the marked words once the heading has risen in.
  useEffect(() => {
    if (reducedMotion() || count < 2) return;
    let timer = 0;
    const start = window.setTimeout(() => {
      timer = window.setInterval(() => setActive((a) => (a + 1) % count), 2400);
    }, 1400);
    return () => {
      clearTimeout(start);
      clearInterval(timer);
    };
  }, [count]);

  // Move the highlight box onto the active word.
  useLayoutEffect(() => {
    const h1 = h1Ref.current;
    const box = boxRef.current;
    if (!h1 || !box) return;
    const place = () => {
      const word = wordRefs.current[active];
      if (!word) return;
      // offsets ignore the rise-in transform, so the box lands where the word ends up
      let x = 0;
      let y = 0;
      let el: HTMLElement | null = word;
      while (el && el !== h1) {
        x += el.offsetLeft;
        y += el.offsetTop;
        el = el.offsetParent as HTMLElement | null;
      }
      box.style.transform = `translate(${x}px, ${y}px)`;
      box.style.width = `${word.offsetWidth}px`;
      box.style.height = `${word.offsetHeight}px`;
    };
    place();
    const ro = new ResizeObserver(place);
    ro.observe(h1);
    document.fonts?.ready.then(place);
    return () => ro.disconnect();
  }, [active]);

  return (
    <h1 ref={h1Ref} className="hero-h1 lines" data-reveal aria-label={lines.map((l) => l.replace(/[[\]]/g, '')).join(' ')}>
      <span ref={boxRef} className="hero-hl" aria-hidden="true" />
      {parsed.map((parts, li) => (
        <span className="line" key={li} aria-hidden="true">
          <span className="line-in" style={{ '--i': li } as CSSProperties}>
            {parts.map((p, pi) =>
              'word' in p ? (
                <span
                  key={pi}
                  ref={(el) => {
                    if (el) wordRefs.current[p.index!] = el;
                  }}
                  className={`hero-word ${p.index === active ? 'is-hot' : ''}`}
                >
                  {p.word}
                </span>
              ) : (
                <span key={pi}>{p.text}</span>
              ),
            )}
          </span>
        </span>
      ))}
    </h1>
  );
}
