import { useEffect, useId, useRef, useState } from 'react';
import { reducedMotion } from '../lib/motion';

/* The cable that runs down every page. It is routed through marker elements
   placed by each page:
     [data-spine="start"]  the plug ring (its centre)
     [data-spine="turn"]   a row where the cable steps sideways to the marker's x
     [data-spine="end"]    where the cable stops (only its y is used)
     [data-spine-invert]   from this element's top down, the cable turns light
   Markers are positioned with CSS, so each breakpoint can route it differently.
   The drawn length follows a point 70% down the viewport, eased per frame. */

const NARROW = 720;
const HEAD = 0.7;
const EASE = 0.12;
const SAMPLE = 6;

interface Geometry {
  w: number;
  h: number;
  d: string;
  start: { x: number; y: number };
  end: { x: number; y: number };
  invertY: number;
  stroke: number;
  ring: number;
}

function centre(el: Element, origin: DOMRect) {
  const r = el.getBoundingClientRect();
  return { x: r.left - origin.left + r.width / 2, y: r.top - origin.top + r.height / 2 };
}

function route(start: { x: number; y: number }, turns: { x: number; y: number }[], endY: number, radius: number) {
  const ys = [start.y, ...turns.map((t) => t.y), endY];
  let d = `M ${start.x} ${start.y}`;
  let cx = start.x;
  turns.forEach((t, i) => {
    const dx = t.x - cx;
    if (Math.abs(dx) < 1) return;
    const sx = Math.sign(dx);
    const r = Math.max(0, Math.min(radius, Math.abs(dx) / 2, (t.y - ys[i]) / 2, (ys[i + 2] - t.y) / 2));
    d += ` L ${cx} ${t.y - r} Q ${cx} ${t.y} ${cx + sx * r} ${t.y}`;
    d += ` L ${t.x - sx * r} ${t.y} Q ${t.x} ${t.y} ${t.x} ${t.y + r}`;
    cx = t.x;
  });
  d += ` L ${cx} ${endY}`;
  return { d, endX: cx };
}

export default function Spine() {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const endRef = useRef<SVGCircleElement>(null);
  const [geo, setGeo] = useState<Geometry | null>(null);
  const gradId = useId().replace(/:/g, '');

  // Measure markers and build the route.
  useEffect(() => {
    const svg = svgRef.current;
    const page = svg?.parentElement;
    if (!svg || !page) return;
    let raf = 0;

    const measure = () => {
      raf = 0;
      const origin = page.getBoundingClientRect();
      const startEl = page.querySelector('[data-spine="start"]');
      const endEl = page.querySelector('[data-spine="end"]');
      if (!startEl || !endEl) return setGeo(null);
      const narrow = origin.width < NARROW;
      const start = centre(startEl, origin);
      const turns = [...page.querySelectorAll('[data-spine="turn"]')]
        .map((el) => centre(el, origin))
        .filter((t) => t.y > start.y)
        .sort((a, b) => a.y - b.y);
      const endY = centre(endEl, origin).y;
      const { d, endX } = route(start, turns, endY, narrow ? 16 : 32);
      const inv = page.querySelector('[data-spine-invert]');
      const invertY = inv ? inv.getBoundingClientRect().top - origin.top : origin.height + 10;
      setGeo({
        w: origin.width,
        h: origin.height,
        d,
        start,
        end: { x: endX, y: endY },
        invertY,
        stroke: narrow ? 5 : 16,
        ring: narrow ? 9 : 40,
      });
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };

    schedule();
    const ro = new ResizeObserver(schedule);
    ro.observe(page);
    document.fonts?.ready.then(schedule);
    const late = window.setTimeout(schedule, 900);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
      clearTimeout(late);
    };
  }, []);

  // Draw along with the scroll.
  useEffect(() => {
    const path = pathRef.current;
    const svg = svgRef.current;
    if (!geo || !path || !svg) return;
    const total = path.getTotalLength();
    const count = Math.ceil(total / SAMPLE) + 1;
    const ys = new Float32Array(count);
    for (let i = 0; i < count; i++) ys[i] = path.getPointAtLength(Math.min(i * SAMPLE, total)).y;
    path.style.strokeDasharray = `${total}`;

    const lengthAt = (y: number) => {
      if (y <= ys[0]) return 0;
      if (y >= ys[count - 1]) return total;
      let lo = 0;
      let hi = count - 1;
      while (lo < hi) {
        const mid = (lo + hi + 1) >> 1;
        if (ys[mid] <= y) lo = mid;
        else hi = mid - 1;
      }
      const next = ys[Math.min(lo + 1, count - 1)];
      const part = next > ys[lo] ? (y - ys[lo]) / (next - ys[lo]) : 0;
      return Math.min(total, (lo + part) * SAMPLE);
    };

    const still = reducedMotion();
    let current = Number(path.dataset.drawn ?? 0);
    let target = current;
    let raf = 0;

    const paint = () => {
      path.style.strokeDashoffset = `${total - current}`;
      path.dataset.drawn = String(current);
      endRef.current?.classList.toggle('is-on', current >= total - 2);
    };
    const tick = () => {
      raf = 0;
      const diff = target - current;
      current = Math.abs(diff) < 0.5 ? target : current + diff * EASE;
      paint();
      if (current !== target) raf = requestAnimationFrame(tick);
    };
    const onScroll = () => {
      const top = svg.getBoundingClientRect().top;
      target = still ? total : lengthAt(window.innerHeight * HEAD - top);
      if (still) {
        current = target;
        paint();
      } else if (!raf) raf = requestAnimationFrame(tick);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [geo]);

  return (
    <svg
      ref={svgRef}
      className="spine"
      aria-hidden="true"
      width={geo?.w ?? 0}
      height={geo?.h ?? 0}
      viewBox={geo ? `0 0 ${geo.w} ${geo.h}` : undefined}
    >
      {geo && (
        <>
          <defs>
            <linearGradient id={gradId} gradientUnits="userSpaceOnUse" x1="0" y1={geo.invertY} x2="0" y2={geo.invertY + 1}>
              <stop offset="0" style={{ stopColor: 'var(--accent)' }} />
              <stop offset="1" style={{ stopColor: 'var(--stone-100)' }} />
            </linearGradient>
          </defs>
          <path
            ref={pathRef}
            d={geo.d}
            fill="none"
            stroke={`url(#${gradId})`}
            strokeWidth={geo.stroke}
            strokeLinecap="round"
          />
          <circle
            className="spine-ring"
            cx={geo.start.x}
            cy={geo.start.y}
            r={geo.ring}
            strokeWidth={geo.stroke}
          />
          <circle
            ref={endRef}
            className="spine-plug"
            cx={geo.end.x}
            cy={geo.end.y}
            r={geo.ring}
            strokeWidth={geo.stroke}
          />
        </>
      )}
    </svg>
  );
}
