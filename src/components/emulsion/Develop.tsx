"use client";

/**
 * <Develop> — DOM content resolves out of grain, like a print in a developer tray.
 * Implementation: N pre-thresholded noise tiles (generated once, client-side) stepped
 * through as CSS mask-image frames, applied imperatively (no per-frame React renders).
 * After the run the mask is removed entirely.
 */
import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";

type Pattern = "grain" | "bayer";

const FRAMES = 22;
const TILE = 96;
const spriteCache = new Map<string, string[]>();

function bayer8(x: number, y: number) {
  let v = 0;
  for (let i = 0; i < 3; i++) {
    const bx = (x >> i) & 1;
    const by = (y >> i) & 1;
    v = (v << 2) | ((bx ^ by) << 1) | by;
  }
  return (v + 0.5) / 64;
}
function ign(x: number, y: number) {
  const f = (v: number) => v - Math.floor(v);
  return f(52.9829189 * f(0.06711056 * x + 0.00583715 * y));
}

function frames(pattern: Pattern, cell: number): string[] {
  const key = `${pattern}:${cell}`;
  const hit = spriteCache.get(key);
  if (hit) return hit;
  const c = document.createElement("canvas");
  c.width = TILE;
  c.height = TILE;
  const ctx = c.getContext("2d")!;
  const cells = Math.ceil(TILE / cell);
  const noise = new Float32Array(cells * cells);
  for (let y = 0; y < cells; y++)
    for (let x = 0; x < cells; x++)
      noise[y * cells + x] = pattern === "bayer" ? bayer8(x, y) : ign(x + 7, y + 3);
  const out: string[] = [];
  for (let k = 0; k < FRAMES; k++) {
    const thr = (k + 1) / FRAMES;
    ctx.clearRect(0, 0, TILE, TILE);
    ctx.fillStyle = "#fff";
    for (let y = 0; y < cells; y++)
      for (let x = 0; x < cells; x++)
        if (noise[y * cells + x] < thr) ctx.fillRect(x * cell, y * cell, cell, cell);
    out.push(`url(${c.toDataURL("image/png")})`);
  }
  spriteCache.set(key, out);
  return out;
}

function applyMask(el: HTMLElement, url: string | null) {
  const s = el.style as CSSStyleDeclaration & { webkitMaskImage?: string; webkitMaskSize?: string; webkitMaskRepeat?: string };
  if (url === null) {
    s.maskImage = "";
    s.maskSize = "";
    s.maskRepeat = "";
    s.webkitMaskImage = "";
    s.webkitMaskSize = "";
    s.webkitMaskRepeat = "";
    return;
  }
  s.maskImage = url;
  s.maskSize = `${TILE}px ${TILE}px`;
  s.maskRepeat = "repeat";
  s.webkitMaskImage = url;
  s.webkitMaskSize = `${TILE}px ${TILE}px`;
  s.webkitMaskRepeat = "repeat";
}

export interface DevelopProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  /** ms */
  duration?: number;
  /** ms */
  delay?: number;
  pattern?: Pattern;
  /** css px per grain cell */
  cell?: number;
  /** trigger when scrolled into view (default) vs immediately */
  inView?: boolean;
}

export function Develop({
  children,
  as: Tag = "div",
  className,
  style,
  duration = 900,
  delay = 0,
  pattern = "grain",
  cell = 2,
  inView = true,
}: DevelopProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reveal = () => {
      el.style.visibility = "";
      applyMask(el, null);
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      reveal();
      return;
    }
    const seq = frames(pattern, cell);
    applyMask(el, seq[0]);
    el.style.visibility = "";

    let raf = 0;
    let stop = false;
    // Guarantees the content is never left behind a mask if the frame loop is cancelled
    // mid-run (tab throttling, HMR re-running the effect, etc.).
    let safety = 0;
    const run = () => {
      safety = window.setTimeout(reveal, delay + duration + 400);
      const start = performance.now() + delay;
      const tick = (now: number) => {
        if (stop) return;
        const u = Math.min(1, Math.max(0, (now - start) / duration));
        const eased = u * u * (3 - 2 * u);
        const k = Math.min(FRAMES - 1, Math.floor(eased * FRAMES));
        applyMask(el, seq[k]);
        if (u < 1) raf = requestAnimationFrame(tick);
        else reveal();
      };
      raf = requestAnimationFrame(tick);
    };

    if (!inView) {
      run();
      return () => {
        stop = true;
        cancelAnimationFrame(raf);
        clearTimeout(safety);
        reveal();
      };
    }
    const io = new IntersectionObserver(
      ([en]) => {
        if (en.isIntersecting) {
          io.disconnect();
          run();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => {
      stop = true;
      io.disconnect();
      cancelAnimationFrame(raf);
      clearTimeout(safety);
      reveal();
    };
  }, [pattern, cell, delay, duration, inView]);

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} className={className} style={{ visibility: "hidden", ...style }}>
      {children}
    </Tag>
  );
}

export default Develop;
