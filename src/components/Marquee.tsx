/* Two rows of tiles sliding in opposite directions. Each row repeats its list
   until one copy is wide enough for large screens, then holds that copy twice,
   so moving it by half its width loops without a seam. */
export default function Marquee({ rows, label }: { rows: string[][]; label: string }) {
  return (
    <div className="marquee">
      <ul className="sr-only" aria-label={label}>
        {[...new Set(rows.flat())].map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      {rows.map((row, r) => {
        const copy = Array.from({ length: Math.max(1, Math.ceil(12 / row.length)) }, () => row).flat();
        return (
          <div className={`mq-row ${r % 2 ? 'mq-rev' : ''}`} key={r} aria-hidden="true">
            <div className="mq-track">
              {[...copy, ...copy].map((t, i) => (
                <div className="mq-tile" key={i}>
                  <span className="mq-dot" />
                  {t}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
