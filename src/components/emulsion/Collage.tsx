"use client";

/**
 * Collage — a pile of prints dropped on the desk: a loose grid with small offsets and tilts, so
 * every photograph stays readable. Each print is exposed onto the film (see Photograph); hovering
 * lifts it, straightens it and develops it into the real photo. Clicking opens a lightbox.
 *
 * The pile is laid out from the measured container width, so it reflows to two columns on phones.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { Photograph, type PhotographProps } from "./Photograph";

export interface CollagePhoto {
  src: string;
  alt: string;
  focus?: [number, number];
}

export interface CollageProps {
  photos: CollagePhoto[];
  caption?: string;
  className?: string;
  /** shared Photograph tone settings */
  tone?: Pick<PhotographProps, "chunk" | "levels" | "ditherAmt" | "objAmt" | "contrast" | "gamma" | "lift" | "cool">;
}

/** print aspect (w / h) and the frame's own padding, in px */
const RATIO = 4 / 5;
const PAD_Y = 14;
/** width the server renders at; the ResizeObserver corrects it after mount */
const BASE_WIDTH = 440;

interface Placement {
  x: number;
  y: number;
  rotate: number;
  w: number;
}

/** deterministic pseudo-random in [-1, 1] — same on the server and the client */
function jitter(i: number, k: number) {
  const v = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453;
  return (v - Math.floor(v)) * 2 - 1;
}

/** max tilt of a print, degrees */
const TILT = 8;

function pile(n: number, width: number): { items: Placement[]; height: number } {
  const cols = width < 380 ? 2 : 3;
  const rows = Math.ceil(n / cols);
  // A print is 1.03 pitches wide, jitters ±0.08 of its width and tilts up to ±TILT°. The widest
  // bounding box of a tilted 4:5 print is w·cos + h·sin ≈ 1.16w, so the pile spans about
  // (cols + 0.37) pitches. Size the pitch from that, then inset the whole pile by the slack so
  // nothing pokes out of the container (on a phone that is the viewport, and any overflow there
  // makes the browser zoom the whole page out).
  const pitchX = width / (cols + 0.37);
  const w = Math.round(pitchX * 1.03);
  const frameH = w / RATIO + PAD_Y;
  const pitchY = frameH * 0.79;
  const jx = w * 0.08;
  const jy = w * 0.07;
  const rad = (TILT * Math.PI) / 180;
  const tiltX = (w * Math.cos(rad) + frameH * Math.sin(rad) - w) / 2;
  const tiltY = (frameH * Math.cos(rad) + w * Math.sin(rad) - frameH) / 2;
  const insetX = jx + tiltX;
  const insetY = jy + tiltY;
  const items: Placement[] = [];
  for (let i = 0; i < n; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const inRow = Math.min(cols, n - row * cols);
    const indent = ((cols - inRow) * pitchX) / 2;
    const r = (v: number) => Math.round(v * 10) / 10;
    items.push({
      x: r(insetX + indent + col * pitchX + jitter(i, 1) * jx),
      y: r(insetY + row * pitchY + jitter(i, 2) * jy),
      rotate: r(jitter(i, 3) * TILT),
      w,
    });
  }
  return { items, height: Math.round((rows - 1) * pitchY + frameH + insetY * 2) };
}

function Lightbox({ photos, index, onClose, onStep }: { photos: CollagePhoto[]; index: number; onClose: () => void; onStep: (d: number) => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onStep(1);
      if (e.key === "ArrowLeft") onStep(-1);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose, onStep]);

  const p = photos[index];
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={p.alt}
      className="fixed inset-0 z-[200] bg-ink/95 flex flex-col items-center justify-center p-4 sm:p-8"
      onClick={onClose}
    >
      <figure className="max-w-[min(1120px,100%)] max-h-full flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
        <div className="bg-paper p-1.5 sm:p-2 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={p.src} alt={p.alt} className="block max-h-[78vh] max-w-full object-contain" />
        </div>
        <figcaption className="mt-4 meta text-paper/60">
          {String(index + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
        </figcaption>
      </figure>
      <button type="button" className="btn-ghost absolute top-4 right-4 sm:top-6 sm:right-8" onClick={onClose}>
        Close <span className="text-paper/50">esc</span>
      </button>
      <button
        type="button"
        aria-label="Previous photo"
        className="btn-ghost absolute left-2 sm:left-6 top-1/2 -translate-y-1/2"
        onClick={(e) => {
          e.stopPropagation();
          onStep(-1);
        }}
      >
        ←
      </button>
      <button
        type="button"
        aria-label="Next photo"
        className="btn-ghost absolute right-2 sm:right-6 top-1/2 -translate-y-1/2"
        onClick={(e) => {
          e.stopPropagation();
          onStep(1);
        }}
      >
        →
      </button>
    </div>
  );
}

export function Collage({ photos, caption, className, tone }: CollageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(BASE_WIDTH);
  const [open, setOpen] = useState<number | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const step = useCallback((d: number) => setOpen((i) => (i === null ? null : (i + d + photos.length) % photos.length)), [photos.length]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setWidth(el.clientWidth || BASE_WIDTH);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { items, height } = pile(photos.length, width);

  return (
    <figure className={className}>
      <div ref={ref} className="relative" style={{ height }}>
        {photos.map((p, i) => {
          const f = items[i];
          return (
            <button
              key={p.src}
              type="button"
              onClick={() => setOpen(i)}
              aria-label={`Open photo: ${p.alt}`}
              className="group/frame absolute origin-bottom block cursor-zoom-in bg-[#fbf9f3] border hairline p-1.5 pb-2 text-left shadow-[0_18px_40px_-26px_rgba(11,10,14,0.6)] transition-[transform,box-shadow] duration-300 ease-out hover:z-20 hover:!rotate-0 hover:-translate-y-2 hover:scale-[1.06] hover:shadow-[0_28px_50px_-24px_rgba(11,10,14,0.7)] focus-visible:z-20"
              style={{ left: f.x, top: f.y, width: f.w, transform: `rotate(${f.rotate}deg)`, zIndex: i }}
            >
              <Photograph src={p.src} alt={p.alt} ratio={RATIO} focus={p.focus} seed={`pile:${p.src}`} reveal {...tone} />
            </button>
          );
        })}
      </div>
      {caption && <figcaption className="meta text-ink/55 mt-3">{caption}</figcaption>}
      {open !== null && <Lightbox photos={photos} index={open} onClose={close} onStep={step} />}
    </figure>
  );
}

export default Collage;
