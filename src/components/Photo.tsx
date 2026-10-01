import { media, type MediaId } from '../media';

/* One of the supplied photographs. Width and height are set from the source so
   the page never jumps while images load; CSS decides the displayed size.
   Product shots use object-fit: contain so nothing is cropped. */
export default function Photo({
  id,
  className = '',
  fit = 'contain',
  eager = false,
}: {
  id: MediaId;
  className?: string;
  fit?: 'contain' | 'cover';
  eager?: boolean;
}) {
  const m = media[id];
  return (
    <img
      className={`photo fit-${fit} bg-${m.bg} ${className}`}
      src={m.src}
      alt={m.alt}
      width={m.w}
      height={m.h}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={eager ? 'high' : undefined}
      draggable={false}
    />
  );
}
