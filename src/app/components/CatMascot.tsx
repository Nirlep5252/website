"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

/**
 * The signature ginger cat: a cute, clean orange-tabby mascot that sits on a
 * cushion beside a little herb plant. Reads "ginger tabby" through the cream
 * chest + muzzle, a subtle forehead "M", and a ringed tail, kept minimal so it
 * stays cute rather than busy. Its pupils track the cursor, it blinks and flicks
 * its tail, and clicking it (a pet) sends up a heart. All idle motion stops
 * under prefers-reduced-motion; the SVG is decorative (aria-hidden).
 */

const C = {
  ginger: "oklch(0.72 0.16 58)",
  stripe: "oklch(0.56 0.16 50)",
  cream: "oklch(0.96 0.025 78)",
  ink: "oklch(0.24 0.03 50)",
  amber: "oklch(0.80 0.14 92)",
  amberRim: "oklch(0.55 0.12 78)",
  nose: "oklch(0.76 0.10 22)",
  noseLine: "oklch(0.56 0.12 20)",
  herb: "oklch(0.55 0.13 140)",
  herbDeep: "oklch(0.46 0.12 142)",
  terracotta: "oklch(0.56 0.13 48)",
  terracottaRim: "oklch(0.62 0.13 46)",
  soil: "oklch(0.34 0.03 50)",
  cushionTop: "oklch(0.95 0.035 65)",
  cushionBase: "oklch(0.92 0.04 60)",
};

const LEAF = "M0 0 C-9 -14 -5 -30 0 -40 C5 -30 9 -14 0 0 Z";

type Heart = { id: number; x: number };

export default function CatMascot({ className = "" }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hearts, setHearts] = useState<Heart[]>([]);
  const heartId = useRef(0);

  // Pupils follow the cursor (skipped entirely under reduced motion).
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return;

    let frame = 0;
    const pointer = { x: 0, y: 0, active: false };

    const apply = () => {
      frame = 0;
      const svg = svgRef.current;
      if (!svg || !pointer.active) return;
      const r = svg.getBoundingClientRect();
      const ax = r.left + r.width * 0.5;
      const ay = r.top + r.height * 0.33; // eye line
      const dx = pointer.x - ax;
      const dy = pointer.y - ay;
      const dist = Math.min(1, Math.hypot(dx, dy) / 280);
      const ang = Math.atan2(dy, dx);
      const max = 5;
      svg.style.setProperty("--eye-x", `${(Math.cos(ang) * dist * max).toFixed(2)}px`);
      svg.style.setProperty("--eye-y", `${(Math.sin(ang) * dist * max).toFixed(2)}px`);
    };

    const onMove = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.active = true;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const pet = useCallback(() => {
    const id = heartId.current++;
    const x = 40 + Math.random() * 22; // % across the scene
    setHearts((h) => [...h, { id, x }]);
    window.setTimeout(() => {
      setHearts((h) => h.filter((heart) => heart.id !== id));
    }, 950);
  }, []);

  return (
    <div
      className={`cat-scene relative cursor-pointer select-none ${className}`}
      onPointerDown={pet}
      aria-hidden="true"
    >
      {/* Floating hearts on pet */}
      <div className="pointer-events-none absolute inset-x-0 top-[14%] z-10">
        {hearts.map((h) => (
          <svg
            key={h.id}
            className="cat-heart absolute -translate-x-1/2"
            style={{ left: `${h.x}%` }}
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12 21s-7.2-4.6-9.6-9.2C.9 8.5 2.4 5 5.8 5c2 0 3.3 1.2 4.2 2.6C10.9 6.2 12.2 5 14.2 5c3.4 0 4.9 3.5 3.4 6.8C19.2 16.4 12 21 12 21Z"
              fill="oklch(0.66 0.17 35)"
            />
          </svg>
        ))}
      </div>

      <svg
        ref={svgRef}
        viewBox="0 0 360 384"
        className="relative z-[1] block h-auto w-full"
        role="presentation"
      >
        <defs>
          <linearGradient id="catCoat" gradientUnits="userSpaceOnUse" x1="186" y1="40" x2="186" y2="348">
            <stop offset="0" stopColor="oklch(0.77 0.145 63)" />
            <stop offset="0.5" stopColor="oklch(0.71 0.16 58)" />
            <stop offset="1" stopColor="oklch(0.62 0.16 52)" />
          </linearGradient>
          <linearGradient id="catCream" gradientUnits="userSpaceOnUse" x1="186" y1="205" x2="186" y2="346">
            <stop offset="0" stopColor="oklch(0.91 0.035 68)" />
            <stop offset="0.38" stopColor="oklch(0.965 0.022 80)" />
            <stop offset="1" stopColor="oklch(0.93 0.03 74)" />
          </linearGradient>
          <filter id="catSoft" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="4.5" />
          </filter>
        </defs>

        {/* Ground shadow */}
        <ellipse cx="186" cy="350" rx="138" ry="20" fill="oklch(0.40 0.03 55 / 0.10)" />

        {/* Cushion */}
        <ellipse cx="186" cy="334" rx="128" ry="28" fill={C.cushionBase} />
        <ellipse cx="186" cy="324" rx="120" ry="23" fill={C.cushionTop} />
        <circle cx="186" cy="324" r="3.5" fill="oklch(0.90 0.045 62)" />

        {/* Herb plant in a terracotta pot (left) */}
        <g>
          <g transform="translate(72 270)">
            <path d={LEAF} transform="rotate(-2) scale(1.05)" fill={C.herb} />
            <path d={LEAF} transform="rotate(-30) scale(0.86)" fill={C.herbDeep} />
            <path d={LEAF} transform="rotate(28) scale(0.9)" fill={C.herbDeep} />
            <path d={LEAF} transform="rotate(-54) scale(0.7)" fill={C.herb} />
            <path d={LEAF} transform="rotate(50) scale(0.72)" fill={C.herb} />
          </g>
          <ellipse cx="72" cy="274" rx="24" ry="5" fill={C.soil} />
          <path d="M48 276 L96 276 L89 316 L55 316 Z" fill={C.terracotta} />
          <rect x="44" y="266" width="56" height="14" rx="5" fill={C.terracottaRim} />
        </g>

        {/* ---------- The cat ---------- */}

        {/* Tail (behind the body): one clean, rounded curl */}
        <g className="cat-tail">
          <path
            d="M250 300 C303 298 315 248 294 225 C285 215 273 219 276 231"
            fill="none"
            stroke="url(#catCoat)"
            strokeWidth="34"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>

        {/* Body */}
        <path
          d="M186 150 C139 150 110 206 109 274 C108 314 138 332 186 332 C234 332 264 314 263 274 C262 206 233 150 186 150 Z"
          fill="url(#catCoat)"
        />

        {/* Front legs / paws: each leg flares into a wide, rounded foot planted on
            the cushion, its front edge scalloped into three toes */}
        <path
          d="M150 299 C144 301 142 314 142 327 C142 334 143 340 146 343 Q151 350 157 343 Q162 350 168 343 Q173 350 178 342 C181 339 181 331 180 322 C179 311 176 301 170 299 C163 297 155 297 150 299 Z"
          fill="url(#catCoat)"
        />
        <path
          d="M222 299 C228 301 230 314 230 327 C230 334 229 340 226 343 Q221 350 215 343 Q210 350 204 343 Q199 350 194 342 C191 339 191 331 192 322 C193 311 196 301 202 299 C209 297 217 297 222 299 Z"
          fill="url(#catCoat)"
        />

        {/* Cream chest + bib, tapering down between the legs */}
        <path
          d="M186 208 C158 216 148 264 158 292 C162 308 170 324 180 334 C183 337 189 337 192 334 C202 324 210 308 214 292 C224 264 214 216 186 208 Z"
          fill="url(#catCream)"
        />

        {/* Toe separations (darker ginger, like fur shadow between the toes) */}
        <g stroke="oklch(0.50 0.15 48 / 0.6)" strokeWidth="2.4" strokeLinecap="round" fill="none">
          <path d="M157 345 L157 335" />
          <path d="M168 345 L168 335" />
          <path d="M215 345 L215 335" />
          <path d="M204 345 L204 335" />
        </g>

        {/* Ears (behind the head): outer + inner grouped so both perk together on hover */}
        <g className="cat-ear cat-ear--l">
          <path d="M122 96 C116 62 130 38 145 32 Q150 30 154 36 C168 56 176 72 182 88 Z" fill="url(#catCoat)" />
          <path d="M140 86 C137 64 145 48 153 42 C160 52 166 68 171 84 Z" fill={C.nose} opacity="0.85" />
        </g>
        <g className="cat-ear cat-ear--r">
          <path d="M250 96 C256 62 242 38 227 32 Q222 30 218 36 C204 56 196 72 190 88 Z" fill="url(#catCoat)" />
          <path d="M232 86 C235 64 227 48 219 42 C212 52 206 68 201 84 Z" fill={C.nose} opacity="0.85" />
        </g>

        {/* Head */}
        <path
          d="M186 58 C144 58 116 86 116 124 C116 162 147 182 186 182 C225 182 256 162 256 124 C256 86 228 58 186 58 Z"
          fill="url(#catCoat)"
        />

        {/* Soft form: forehead sheen + shadow under the chin */}
        <ellipse cx="174" cy="90" rx="26" ry="17" fill="oklch(0.85 0.10 68 / 0.3)" filter="url(#catSoft)" />
        <ellipse cx="186" cy="197" rx="40" ry="13" fill="oklch(0.50 0.12 50 / 0.20)" filter="url(#catSoft)" />

        {/* Subtle forehead "M" */}
        <g stroke={C.stripe} strokeWidth="5" strokeLinecap="round" fill="none" opacity="0.85">
          <path d="M186 66 L186 90" />
          <path d="M171 70 C169 79 170 86 174 93" />
          <path d="M201 70 C203 79 202 86 198 93" />
        </g>

        {/* Cream muzzle (whisker pads + chin) */}
        <ellipse cx="172" cy="158" rx="17" ry="14" fill={C.cream} />
        <ellipse cx="200" cy="158" rx="17" ry="14" fill={C.cream} />
        <ellipse cx="186" cy="167" rx="15" ry="11" fill={C.cream} />

        {/* Eyes (cute: amber iris, soft oval pupil, catchlight) */}
        <g className="cat-eye">
          <ellipse cx="160" cy="122" rx="13" ry="14.5" fill={C.amber} />
          <ellipse cx="160" cy="122" rx="13" ry="14.5" fill="none" stroke={C.amberRim} strokeWidth="1.6" />
          <g className="cat-pupil">
            <ellipse cx="160" cy="122" rx="5" ry="10" fill={C.ink} />
            <circle cx="157.8" cy="118" r="1.8" fill="white" />
          </g>
        </g>
        <g className="cat-eye cat-eye--lag">
          <ellipse cx="212" cy="122" rx="13" ry="14.5" fill={C.amber} />
          <ellipse cx="212" cy="122" rx="13" ry="14.5" fill="none" stroke={C.amberRim} strokeWidth="1.6" />
          <g className="cat-pupil">
            <ellipse cx="212" cy="122" rx="5" ry="10" fill={C.ink} />
            <circle cx="209.8" cy="118" r="1.8" fill="white" />
          </g>
        </g>

        {/* Nose + mouth */}
        <path
          d="M180 147 L192 147 Q186 154 186 154 Q186 154 180 147 Z"
          fill={C.nose}
          stroke={C.noseLine}
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
        <path
          d="M186 153 Q186 162 176 164 M186 153 Q186 162 196 164"
          stroke={C.ink}
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />

        {/* Whiskers (few, light) */}
        <g stroke="oklch(0.30 0.02 55 / 0.42)" strokeWidth="1.6" strokeLinecap="round" fill="none">
          <path d="M160 154 C140 152 123 152 108 152" />
          <path d="M160 160 C141 162 124 166 110 170" />
          <path d="M212 154 C232 152 249 152 264 152" />
          <path d="M212 160 C231 162 248 166 262 170" />
        </g>
      </svg>
    </div>
  );
}
