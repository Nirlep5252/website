"use client";

import { useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import CatMascot from "./CatMascot";

/**
 * The hero cat, continued. As you scroll past the hero, the same cat shrinks
 * and glides into the bottom-right corner where it keeps watch — eyes tracking
 * the cursor, perking up on hover, napping once the footer comes into view, and
 * gliding you back to the top on click.
 *
 * Pure progressive enhancement: it measures the in-flow hero cat (#hero-cat-anchor),
 * renders a single `position: fixed` cat exactly over it, then hides the original.
 * Under reduced motion (or with JS off) it never mounts, so the static hero cat
 * stays as-is and nothing is ever blank.
 */

const ANCHOR_ID = "hero-cat-anchor";
const FOOTER_ID = "connect";

type Geo = {
  startX: number;
  startY: number;
  heroW: number;
  heroH: number;
  dockScale: number;
  dockX: number;
  dockY: number;
  dist: number;
};

function smoothstep(t: number) {
  const x = Math.max(0, Math.min(1, t));
  return x * x * (3 - 2 * x);
}

function measureGeo(): Geo | null {
  if (typeof window === "undefined") return null;
  const a = document.getElementById(ANCHOR_ID);
  if (!a) return null;
  const r = a.getBoundingClientRect();
  // Layout size is transform-independent, so this is correct even while the
  // hero-pop scale-in is still running; the rect's *center* is stable under a
  // centered scale, so we take the start point from there.
  const heroW = a.offsetWidth;
  const heroH = a.offsetHeight;
  if (!heroW || !heroH) return null;

  // Start point = the hero cat's center at the top of the page.
  const startX = r.left + r.width / 2 + window.scrollX;
  const startY = r.top + r.height / 2 + window.scrollY;

  const vw = window.innerWidth;
  const dockW = Math.max(78, Math.min(112, vw * 0.12));
  const dockScale = dockW / heroW;
  const dockH = heroH * dockScale;
  const margin = vw < 640 ? 16 : 24;

  return {
    startX,
    startY,
    heroW,
    heroH,
    dockScale,
    dockX: vw - margin - dockW / 2, // bottom-right
    dockY: window.innerHeight - margin - dockH / 2,
    dist: Math.max(240, window.innerHeight * 0.62), // scroll distance to fully dock
  };
}

export default function HomeScrollCat() {
  // `geo` (state) drives the render-time style; `geoRef` (mutable) is what the
  // scroll/resize handlers read, since those effects don't re-run on resize.
  const [geo, setGeo] = useState<Geo | null>(null);
  const [active, setActive] = useState(false);
  const [docked, setDocked] = useState(false);
  const [napping, setNapping] = useState(false);

  const wrapRef = useRef<HTMLDivElement>(null);
  const hitRef = useRef<HTMLDivElement>(null);
  const geoRef = useRef<Geo | null>(null);
  const pRef = useRef(0);
  const dockedRef = useRef(false);

  // Measure the hero cat, then activate on the next frame (deferred so the
  // fixed cat renders over the original before we hide it — no blink).
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const measured = measureGeo();
    if (!measured) return;
    geoRef.current = measured;
    const id = requestAnimationFrame(() => {
      setActive(true);
      setGeo(measured);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  // Once active: take over the hero slot and wire scroll / resize / nap.
  useEffect(() => {
    if (!active) return;
    document.documentElement.dataset.scrollcat = "on";

    const apply = () => {
      const g = geoRef.current;
      const wrap = wrapRef.current;
      if (!g || !wrap) return;

      const p = smoothstep(window.scrollY / g.dist);
      pRef.current = p;

      const scale = 1 + (g.dockScale - 1) * p;
      const w = g.heroW * scale;
      const h = g.heroH * scale;
      const cx = g.startX + (g.dockX - g.startX) * p;
      const cy = g.startY + (g.dockY - g.startY) * p;
      wrap.style.transform = `translate(${(cx - w / 2).toFixed(1)}px, ${(
        cy -
        h / 2
      ).toFixed(1)}px) scale(${scale.toFixed(4)})`;

      // Don't intercept clicks while mid-flight over the content.
      if (hitRef.current) {
        hitRef.current.style.pointerEvents =
          p < 0.12 || p > 0.85 ? "auto" : "none";
      }

      const nextDocked = p > 0.55;
      if (nextDocked !== dockedRef.current) {
        dockedRef.current = nextDocked;
        setDocked(nextDocked);
      }
    };

    let raf = 0;
    const onScroll = () => {
      if (!raf) {
        raf = requestAnimationFrame(() => {
          raf = 0;
          apply();
        });
      }
    };
    const onResize = () => {
      const g = measureGeo();
      if (g) {
        geoRef.current = g;
        setGeo(g);
      }
      apply();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    apply();

    const footer = document.getElementById(FOOTER_ID);
    let io: IntersectionObserver | undefined;
    if (footer) {
      io = new IntersectionObserver(
        (entries) => setNapping(entries[0].isIntersecting),
        { rootMargin: "0px 0px -35% 0px", threshold: 0.01 },
      );
      io.observe(footer);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      io?.disconnect();
      if (raf) cancelAnimationFrame(raf);
      delete document.documentElement.dataset.scrollcat;
    };
  }, [active]);

  if (!active || !geo) return null;

  const g = geo;
  const p0 = smoothstep(
    (typeof window !== "undefined" ? window.scrollY : 0) / g.dist,
  );
  const s0 = 1 + (g.dockScale - 1) * p0;
  const w0 = g.heroW * s0;
  const h0 = g.heroH * s0;
  const cx0 = g.startX + (g.dockX - g.startX) * p0;
  const cy0 = g.startY + (g.dockY - g.startY) * p0;

  const onPointerDownCapture = (e: ReactPointerEvent) => {
    // While docked, a tap is "back to top", not a pet — block the pet handler.
    if (pRef.current > 0.55) e.stopPropagation();
  };
  const onClick = () => {
    if (pRef.current > 0.55) window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      ref={wrapRef}
      className={`scroll-cat fixed left-0 top-0 z-40 ${docked ? "is-docked" : ""}`}
      style={{
        width: g.heroW,
        transformOrigin: "0 0",
        pointerEvents: "none",
        transform: `translate(${(cx0 - w0 / 2).toFixed(1)}px, ${(
          cy0 -
          h0 / 2
        ).toFixed(1)}px) scale(${s0.toFixed(4)})`,
      }}
    >
      <div
        ref={hitRef}
        style={{ pointerEvents: "auto" }}
        onPointerDownCapture={onPointerDownCapture}
        onClick={onClick}
      >
        <CatMascot className="w-full" napping={napping} />
      </div>
    </div>
  );
}
