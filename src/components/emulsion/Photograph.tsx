"use client";

/**
 * Photograph — a real photo exposed onto the film. The image is cropped to cover, reduced to
 * luminance, and fed to the EMULSION shader's object slot, so it comes out through the same
 * Bayer dither, quantise and LUT as every poster on the site. Static, cached per size.
 * With `reveal`, the original photograph fades in over the exposure on hover.
 */
import { useEffect, useRef, useState } from "react";
import { EmulsionRenderer, POSTER_PARAMS, type FieldParams } from "@/lib/emulsion/renderer";
import { seedFromString } from "@/lib/emulsion/lut";

export interface PhotographProps {
  src: string;
  alt?: string;
  /** aspect ratio (w / h); fills the container width */
  ratio?: number;
  /** cover-crop anchor, 0..1 in each axis (0.5,0.5 = centre) */
  focus?: [number, number];
  /** integer downscale; 2 = one shader pixel per 2×2 device pixels (same grain as the hero) */
  chunk?: 1 | 2 | 3;
  maxDpr?: number;
  /** quantisation levels */
  levels?: number;
  ditherAmt?: number;
  /** 1 = photo only; lower lets the field bleed into the shadows */
  objAmt?: number;
  /** luminance contrast around mid grey */
  contrast?: number;
  /** luminance gamma (>1 darkens mids) */
  gamma?: number;
  /** black point lift, 0..1 */
  lift?: number;
  /** how much of the cool (green) ramp may show */
  cool?: number;
  seed?: string;
  className?: string;
  params?: Partial<FieldParams>;
  /** show the real photograph on hover (also when a `group/photo` ancestor is hovered) */
  reveal?: boolean;
}

let shared: EmulsionRenderer | null = null;
function renderer(): EmulsionRenderer {
  if (!shared) {
    shared = new EmulsionRenderer(document.createElement("canvas"), { preserveDrawingBuffer: true });
  }
  return shared;
}

const images = new Map<string, Promise<HTMLImageElement>>();
function loadImage(src: string): Promise<HTMLImageElement> {
  let p = images.get(src);
  if (!p) {
    p = new Promise((resolve, reject) => {
      const img = new Image();
      img.decoding = "async";
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error(`photograph: failed to load ${src}`));
      img.src = src;
    });
    images.set(src, p);
  }
  return p;
}

const urls = new Map<string, string>();

export function Photograph({
  src,
  alt = "",
  ratio = 4 / 5,
  focus = [0.5, 0.5],
  chunk = 2,
  maxDpr = 2,
  levels = 12,
  ditherAmt = 0.45,
  objAmt = 0.92,
  contrast = 1.2,
  gamma = 1.0,
  lift = 0.0,
  cool = 0,
  seed,
  className,
  params,
  reveal = false,
}: PhotographProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [url, setUrl] = useState<string | null>(null);
  const focusX = focus[0];
  const focusY = focus[1];
  const paramsKey = JSON.stringify(params ?? null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let cancelled = false;
    let raf = 0;

    const draw = async () => {
      const cssW = el.clientWidth;
      if (!cssW) return;
      const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
      const w = Math.max(1, Math.round((cssW * dpr) / chunk));
      const h = Math.max(1, Math.round(((cssW / ratio) * dpr) / chunk));
      const key = JSON.stringify([src, w, h, focusX, focusY, levels, ditherAmt, objAmt, contrast, gamma, lift, cool, seed, paramsKey]);
      const hit = urls.get(key);
      if (hit) {
        setUrl(hit);
        return;
      }
      let img: HTMLImageElement;
      try {
        img = await loadImage(src);
      } catch (e) {
        console.warn(e);
        return;
      }
      if (cancelled) return;

      // cover-crop + luminance into an exact w×h canvas (the shader samples it 1:1, nearest)
      const c = document.createElement("canvas");
      c.width = w;
      c.height = h;
      const ctx = c.getContext("2d", { willReadFrequently: true })!;
      const s = Math.max(w / img.naturalWidth, h / img.naturalHeight);
      const sw = img.naturalWidth * s;
      const sh = img.naturalHeight * s;
      ctx.drawImage(img, (w - sw) * focusX, (h - sh) * focusY, sw, sh);
      const id = ctx.getImageData(0, 0, w, h);
      const d = id.data;
      for (let i = 0; i < d.length; i += 4) {
        const l = (0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2]) / 255;
        let v = (l - 0.5) * contrast + 0.5;
        v = Math.pow(Math.min(1, Math.max(0, v)), gamma);
        v = lift + (1 - lift) * v;
        const b = Math.round(v * 255);
        d[i] = b;
        d[i + 1] = b;
        d[i + 2] = b;
        d[i + 3] = 255;
      }
      ctx.putImageData(id, 0, 0);

      try {
        const r = renderer();
        r.setObject(c, [0, 0, 1, 1]);
        r.objAmt = objAmt;
        r.setBackingSize(w, h);
        const p: FieldParams = {
          ...POSTER_PARAMS,
          ...params,
          seed: seedFromString(seed ?? src),
          levels,
          ditherAmt,
          coolAmount: cool,
          pointerHeat: 0,
        };
        r.render(p.seed * 100, p, null, 1);
        const out = r.canvas.toDataURL("image/png");
        r.objAmt = 0;
        r.setObject(null);
        urls.set(key, out);
        if (!cancelled) setUrl(out);
      } catch (e) {
        console.warn("[photograph]", e);
      }
    };

    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => void draw());
    };
    schedule();
    const ro = new ResizeObserver(schedule);
    ro.observe(el);
    return () => {
      cancelled = true;
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [src, ratio, focusX, focusY, chunk, maxDpr, levels, ditherAmt, objAmt, contrast, gamma, lift, cool, seed, paramsKey, params]);

  return (
    <div ref={ref} className={`poster relative ${reveal ? "group/photo" : ""} ${className ?? ""}`} style={{ aspectRatio: `${ratio}` }}>
      {url && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={url}
          alt={alt}
          style={{ display: "block", width: "100%", height: "100%", objectFit: "cover", imageRendering: chunk > 1 ? "pixelated" : "auto" }}
        />
      )}
      {reveal && (
        // the real print, developed: fades in over the exposure on hover
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 ease-out group-hover/photo:opacity-100 group-hover/frame:opacity-100"
          style={{ objectPosition: `${focusX * 100}% ${focusY * 100}%` }}
        />
      )}
    </div>
  );
}

export default Photograph;
