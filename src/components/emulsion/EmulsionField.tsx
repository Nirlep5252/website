"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { DEFAULT_PARAMS, EmulsionRenderer, type FieldParams } from "@/lib/emulsion/renderer";
import { devStore, withDev } from "@/lib/emulsion/devStore";

export interface EmulsionFieldProps {
  params?: Partial<FieldParams>;
  className?: string;
  style?: React.CSSProperties;
  /** Cursor warms the field. Listens on window so the field can sit behind content. */
  interactive?: boolean;
  /** Freeze the animation (still renders one frame). */
  paused?: boolean;
  /** 0..1 reveal. Omit for fully developed. */
  develop?: number;
  /** Auto-develop from 0→1 over N ms on mount. Overrides `develop` while running. */
  developOnMount?: number;
  /** Called every frame before draw — hook for feeding object textures. */
  onFrame?: (r: EmulsionRenderer, t: number) => void;
  onReady?: (r: EmulsionRenderer) => void;
  /** Force the static CSS fallback (for testing). */
  forceFallback?: boolean;
}

function usePrefersReducedMotion() {
  const [prm, setPrm] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setPrm(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return prm;
}

/** Static CSS fallback: layered radial gradients in the LUT colours + SVG grain. */
export function EmulsionFallback({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={className}
      aria-hidden
      style={{
        background:
          "radial-gradient(120% 90% at 85% 5%, #f5f0d6 0%, #f394d6 22%, #7659ee 45%, transparent 70%)," +
          "radial-gradient(90% 70% at 10% 95%, #3a2fd6 0%, #160f3a 45%, transparent 75%)," +
          "radial-gradient(60% 40% at 90% 90%, #254a35 0%, transparent 70%)," +
          "#0b0a0e",
        ...style,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.35,
          mixBlendMode: "overlay",
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}

export function EmulsionField({
  params,
  className,
  style,
  interactive = true,
  paused = false,
  develop,
  developOnMount,
  onFrame,
  onReady,
  forceFallback,
}: EmulsionFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<EmulsionRenderer | null>(null);
  const [failed, setFailed] = useState(false);
  const prm = usePrefersReducedMotion();

  // dev-only runtime overrides (no-op in production)
  const devVersion = useSyncExternalStore(devStore.subscribe, devStore.getVersion, () => 0);

  // latest-value refs so the RAF loop never restarts on prop changes
  const paramsRef = useRef<FieldParams>(withDev({ ...DEFAULT_PARAMS, ...params }));
  paramsRef.current = withDev({ ...DEFAULT_PARAMS, ...params });
  const developRef = useRef(develop);
  developRef.current = develop;
  const onFrameRef = useRef(onFrame);
  onFrameRef.current = onFrame;
  const pausedRef = useRef(paused || prm);
  pausedRef.current = paused || prm;
  const pointerRef = useRef<{ x: number; y: number } | null>(null);
  const developStart = useRef<number | null>(null);

  const useFallback = forceFallback || failed;

  // dev palette swaps
  useEffect(() => {
    const pal = devStore.getPalette();
    if (rendererRef.current && pal) rendererRef.current.setPalette(pal.warm, pal.cool);
  }, [devVersion]);

  useEffect(() => {
    if (useFallback) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    let r: EmulsionRenderer;
    try {
      r = new EmulsionRenderer(canvas);
    } catch (e) {
      console.warn("[emulsion] falling back:", e);
      setFailed(true);
      return;
    }
    rendererRef.current = r;
    const pal = devStore.getPalette();
    if (pal) r.setPalette(pal.warm, pal.cool);
    onReady?.(r);

    let raf = 0;
    let visible = true;
    let lastSize = { w: 0, h: 0, rs: 0, dpr: 0 };
    const t0 = performance.now();
    if (developOnMount) developStart.current = t0;

    const fit = () => {
      const rect = canvas.getBoundingClientRect();
      const p = paramsRef.current;
      if (
        rect.width !== lastSize.w ||
        rect.height !== lastSize.h ||
        p.renderScale !== lastSize.rs ||
        p.maxDpr !== lastSize.dpr
      ) {
        r.resize(rect.width, rect.height, p.renderScale, p.maxDpr);
        lastSize = { w: rect.width, h: rect.height, rs: p.renderScale, dpr: p.maxDpr };
      }
      return rect;
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      const rect = fit();
      const t = (now - t0) / 1000;
      const p = paramsRef.current;
      let dev = developRef.current ?? 1;
      if (developStart.current !== null && developOnMount) {
        const u = Math.min(1, (now - developStart.current) / developOnMount);
        dev = u * u * (3 - 2 * u);
        if (u >= 1) developStart.current = null;
      }
      onFrameRef.current?.(r, t);
      const ptr = pointerRef.current
        ? { x: pointerRef.current.x - rect.left, y: pointerRef.current.y - rect.top }
        : null;
      const time = pausedRef.current ? p.seed * 40 : t;
      r.render(time, p, interactive ? ptr : null, dev);
    };
    raf = requestAnimationFrame(frame);

    const onMove = (e: PointerEvent) => {
      pointerRef.current = { x: e.clientX, y: e.clientY };
    };
    const onLeave = () => {
      pointerRef.current = null;
    };
    if (interactive) {
      window.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerleave", onLeave);
    }

    const io = new IntersectionObserver(([en]) => {
      visible = en.isIntersecting;
    });
    io.observe(canvas);
    const onVis = () => {
      visible = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      r.destroy();
      rendererRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useFallback, interactive]);

  if (useFallback) return <EmulsionFallback className={className} style={style} />;

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden
      style={{ display: "block", width: "100%", height: "100%", ...style }}
    />
  );
}

export default EmulsionField;
