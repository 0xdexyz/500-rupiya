import { useEffect, useRef } from 'react';

/* A solid dot that replaces the pointer on mouse devices. It is blended with
   `difference`, so it always reads against whatever is underneath. It moves on
   the pointer event itself (no easing), so it never trails the real pointer. */
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = ref.current;
    if (!dot || !window.matchMedia('(pointer: fine)').matches) return;
    const root = document.documentElement;
    root.classList.add('has-dot');

    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      dot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      dot.classList.add('is-on');
    };
    const over = (e: PointerEvent) => {
      const t = e.target as Element | null;
      dot.classList.toggle('is-big', !!t?.closest('a, button, [role="button"], label, select'));
    };
    const leave = () => dot.classList.remove('is-on');

    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerover', over, { passive: true });
    document.addEventListener('pointerleave', leave);
    return () => {
      root.classList.remove('has-dot');
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerover', over);
      document.removeEventListener('pointerleave', leave);
    };
  }, []);

  return (
    <div ref={ref} className="dot" aria-hidden="true">
      <span />
    </div>
  );
}
