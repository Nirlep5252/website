"use client";

import { useRef } from "react";
import { EmulsionField } from "./EmulsionField";
import { drawMarkExact, markInfo, type MarkVariant } from "./CatMark";
import type { EmulsionRenderer, FieldParams } from "@/lib/emulsion/renderer";
import { DEFAULT_PARAMS } from "@/lib/emulsion/renderer";

export interface OrnamentProps {
  variant?: MarkVariant;
  seed?: number;
  /** uv rect (y up) — the glyph is fitted to this rect's height and centred on its centre */
  rect?: [number, number, number, number];
  params?: Partial<FieldParams>;
  className?: string;
  interactive?: boolean;
}

/**
 * The cat mark pushed through the emulsion: a hot patch of the same field.
 * The glyph is drawn at an integer cell size and placed on integer render-pixel offsets so
 * every bitmap cell covers whole pixels — no resampling, stays symmetric.
 */
export function Ornament({ variant = "solid", seed = 0.61, rect = [0.72, 0.18, 0.96, 0.82], params, className, interactive = true }: OrnamentProps) {
  const fitted = useRef<{ W: number; H: number } | null>(null);
  const onFrame = (r: EmulsionRenderer) => {
    const W = r.canvas.width;
    const H = r.canvas.height;
    if (fitted.current && fitted.current.W === W && fitted.current.H === H) return;
    const { w: mw, h: mh } = markInfo(variant);
    const targetH = (rect[3] - rect[1]) * H;
    const cellPx = Math.max(1, Math.round(targetH / mh));
    const gw = cellPx * mw;
    const gh = cellPx * mh;
    const cx = ((rect[0] + rect[2]) / 2) * W;
    const cy = ((rect[1] + rect[3]) / 2) * H;
    const x0 = Math.round(cx - gw / 2);
    const y0 = Math.round(cy - gh / 2);
    r.setObject(drawMarkExact(variant, cellPx), [x0 / W, y0 / H, (x0 + gw) / W, (y0 + gh) / H]);
    r.objAmt = 1;
    fitted.current = { W, H };
  };
  return (
    <div className={className} style={className?.includes("absolute") || className?.includes("fixed") ? undefined : { position: "relative" }}>
      <EmulsionField
        params={{ ...DEFAULT_PARAMS, seed, pointerHeat: 0.1, ...params }}
        onFrame={onFrame}
        interactive={interactive}
        style={{ position: "absolute", inset: 0 }}
      />
    </div>
  );
}

export default Ornament;
