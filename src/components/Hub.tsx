import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import type { IconName } from '../content';
import { reducedMotion } from '../lib/motion';
import { Icon } from './Icons';
import { LogoMark } from './Marks';

interface Pt {
  x: number;
  y: number;
}

/** Orthogonal route with rounded bends. Horizontal layouts bend at the middle x, vertical ones at the middle y. */
function link(a: Pt, b: Pt, vertical: boolean, radius = 16) {
  if (vertical) {
    if (Math.abs(a.x - b.x) < 1) return `M ${a.x} ${a.y} L ${b.x} ${b.y}`;
    const my = (a.y + b.y) / 2;
    const s = Math.sign(b.x - a.x);
    const r = Math.min(radius, Math.abs(b.x - a.x) / 2, (b.y - a.y) / 2);
    return `M ${a.x} ${a.y} L ${a.x} ${my - r} Q ${a.x} ${my} ${a.x + s * r} ${my} L ${b.x - s * r} ${my} Q ${b.x} ${my} ${b.x} ${my + r} L ${b.x} ${b.y}`;
  }
  if (Math.abs(a.y - b.y) < 1) return `M ${a.x} ${a.y} L ${b.x} ${b.y}`;
  const mx = (a.x + b.x) / 2;
  const s = Math.sign(b.y - a.y);
  const r = Math.min(radius, Math.abs(b.y - a.y) / 2, (b.x - a.x) / 2);
  return `M ${a.x} ${a.y} L ${mx - r} ${a.y} Q ${mx} ${a.y} ${mx} ${a.y + s * r} L ${mx} ${b.y - s * r} Q ${mx} ${b.y} ${mx + r} ${b.y} L ${b.x} ${b.y}`;
}

/* The care path: the visitor, through Hearing Sensitivity, to each stage of care.
   Lines draw in once the diagram scrolls into view. */
export default function Hub({ source, targets }: { source: string; targets: { label: string; tone: string; icon: IconName }[] }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const srcRef = useRef<HTMLSpanElement>(null);
  const hubRef = useRef<HTMLSpanElement>(null);
  const tRefs = useRef<HTMLSpanElement[]>([]);
  const [lines, setLines] = useState<{ w: number; h: number; d: string[] } | null>(null);
  const [on, setOn] = useState(false);

  useLayoutEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    const measure = () => {
      const o = box.getBoundingClientRect();
      const vertical = o.width < 640;
      const rect = (el: Element) => {
        const r = el.getBoundingClientRect();
        return { l: r.left - o.left, t: r.top - o.top, w: r.width, h: r.height };
      };
      const out = (el: Element): Pt => {
        const r = rect(el);
        return vertical ? { x: r.l + r.w / 2, y: r.t + r.h + 6 } : { x: r.l + r.w + 6, y: r.t + r.h / 2 };
      };
      const inn = (el: Element): Pt => {
        const r = rect(el);
        return vertical ? { x: r.l + r.w / 2, y: r.t - 6 } : { x: r.l - 6, y: r.t + r.h / 2 };
      };
      if (!srcRef.current || !hubRef.current) return;
      const d = [link(out(srcRef.current), inn(hubRef.current), vertical)];
      tRefs.current.forEach((t) => d.push(link(out(hubRef.current!), inn(t), vertical)));
      setLines({ w: o.width, h: o.height, d });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(box);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    if (reducedMotion()) return setOn(true);
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(box);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={boxRef}
      className={`hub ${on ? 'is-on' : ''}`}
      role="img"
      aria-label={`Your path to better hearing: ${targets.map((t) => t.label).join(', ')}`}
    >
      {lines && (
        <svg className="hub-lines" viewBox={`0 0 ${lines.w} ${lines.h}`} aria-hidden="true">
          {lines.d.map((d, i) => (
            <path key={i} d={d} pathLength={1} className={i ? 'hub-branch' : 'hub-trunk'} style={{ '--i': i } as CSSProperties} />
          ))}
        </svg>
      )}
      <div className="hub-src" aria-hidden="true">
        <span ref={srcRef} className="hub-node node-dark">
          <Icon name="person" />
        </span>
        <span className="micro">{source}</span>
      </div>
      <div className="hub-mid" aria-hidden="true">
        <span ref={hubRef} className="hub-node node-hub">
          <LogoMark size={80} />
        </span>
      </div>
      <ul className="hub-targets" aria-hidden="true">
        {targets.map((t, i) => (
          <li key={t.label} style={{ '--i': i } as CSSProperties}>
            <span
              ref={(el) => {
                if (el) tRefs.current[i] = el;
              }}
              className={`hub-node node-ring tone-${t.tone}`}
            >
              <Icon name={t.icon} />
            </span>
            <span className="micro">{t.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
