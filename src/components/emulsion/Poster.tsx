"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { POSTER_PARAMS, renderPoster, type FieldParams } from "@/lib/emulsion/renderer";
import { devStore } from "@/lib/emulsion/devStore";
import { seedFromString } from "@/lib/emulsion/lut";

export interface PosterProps {
  /** any stable string — slug, title */
  seed: string;
  /** aspect ratio (w / h). The poster fills its container width. */
  ratio?: number;
  className?: string;
  params?: Partial<FieldParams>;
  alt?: string;
  /** cap device pixel ratio for the render (posters are cheap; 2 keeps retina crisp) */
  maxDpr?: number;
  /** integer downscale: 2 = one shader pixel per 2×2 device pixels (matches the hero grain) */
  chunk?: 1 | 2 | 3;
}

/**
 * Seeded static poster. One draw of the EMULSION shader on a shared offscreen renderer,
 * rendered at exactly the element's device-pixel size divided by an integer `chunk`, so the
 * ordered dither maps to whole device pixels (any fractional resampling of a Bayer pattern
 * produces moiré). Re-renders on resize; cached per size.
 */
export function Poster({ seed, ratio = 16 / 10, className, params, alt = "", maxDpr = 2, chunk = 2 }: PosterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [src, setSrc] = useState<string | null>(null);
  const devVersion = useSyncExternalStore(devStore.subscribe, devStore.getVersion, () => 0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const draw = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const cssW = el.clientWidth;
        if (!cssW) return;
        const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
        // exact device size, then an integer divisor → the upscale is a clean integer, no moiré
        const w = Math.max(1, Math.round((cssW * dpr) / chunk));
        const h = Math.max(1, Math.round(((cssW / ratio) * dpr) / chunk));
        try {
          setSrc(renderPoster(seed, { ...POSTER_PARAMS, ...params, seed: seedFromString(seed) }, w, h));
        } catch (e) {
          console.warn("[poster]", e);
        }
      });
    };
    draw();
    const ro = new ResizeObserver(draw);
    ro.observe(el);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [seed, ratio, params, maxDpr, chunk, devVersion]);

  return (
    <div ref={ref} className={`poster ${className ?? ""}`} style={{ aspectRatio: `${ratio}` }}>
      {src && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} style={{ display: "block", width: "100%", height: "100%", objectFit: "cover", imageRendering: chunk > 1 ? "pixelated" : "auto" }} />
      )}
    </div>
  );
}

export default Poster;
