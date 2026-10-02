import { media, type MediaId } from '../media';

/* One of the supplied photographs. Width and height are set from the source so
   the page never jumps while images load; CSS decides the displayed size.
   Product shots use object-fit: contain so nothing is cropped. */
export default function Photo({
  id,
  className = '',
  fit = 'contain',
  eager = false,
  reveal = false,
}: {
  id: MediaId;
  className?: string;
  fit?: 'contain' | 'cover';
  eager?: boolean;
  /** Animate the image itself into view. Use this for blended images: a revealing wrapper
      would isolate the blend from the background behind it. */
  reveal?: boolean;
}) {
  const m = media[id];
  return (
    <img
      data-reveal={reveal ? '' : undefined}
      className={`photo fit-${fit} bg-${m.bg} ${className}`}
      src={m.src}
      alt={m.alt}
      width={m.w}
      height={m.h}
      loading="eager"
      decoding="async"
      fetchPriority={eager ? 'high' : undefined}
      draggable={false}
    />
  );
}
