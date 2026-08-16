/**
 * CatMark — the site's pixel-glyph cat. Bitmap-defined (20×21 grid) so it stays crisp at 16px
 * (favicon, nav mark) and can be blown up as an ornament or pushed through the emulsion as an
 * object. Same grid language as the Bayer dither → it belongs to the system rather than sits on it.
 */

export type MarkVariant = "solid" | "wink";

// X = ink, . = transparent — 20×21
const BITMAPS: Record<MarkVariant, string[]> = {
  solid: [
    ".XX..............XX.",
    ".XXX............XXX.",
    ".XXXX..........XXXX.",
    ".XXXXX........XXXXX.",
    ".XXXXXX......XXXXXX.",
    ".XXXXXXXXXXXXXXXXXX.",
    ".XXXXXXXXXXXXXXXXXX.",
    "XXXXXXXXXXXXXXXXXXXX",
    "XXXXXXXXXXXXXXXXXXXX",
    "XXXX...XXXXXX...XXXX",
    "XXXX...XXXXXX...XXXX",
    "XXXX...XXXXXX...XXXX",
    "XXXX...XXXXXX...XXXX",
    "XXXXXXXXXXXXXXXXXXXX",
    "XXXXXXXXX..XXXXXXXXX",
    "XXXXXXXXXXXXXXXXXXXX",
    ".XXXXXXXXXXXXXXXXXX.",
    ".XXXXXXXXXXXXXXXXXX.",
    "..XXXXXXXXXXXXXXXX..",
    "....XXXXXXXXXXXX....",
    "......XXXXXXXX......",
  ],
  wink: [
    ".XX..............XX.",
    ".XXX............XXX.",
    ".XXXX..........XXXX.",
    ".XXXXX........XXXXX.",
    ".XXXXXX......XXXXXX.",
    ".XXXXXXXXXXXXXXXXXX.",
    ".XXXXXXXXXXXXXXXXXX.",
    "XXXXXXXXXXXXXXXXXXXX",
    "XXXXXXXXXXXXXXXXXXXX",
    "XXXXXXXXXXXXX...XXXX",
    "XXXXXXXXXXXXX...XXXX",
    "XX.....XXXXXX...XXXX",
    "XXXXXXXXXXXXX...XXXX",
    "XXXXXXXXXXXXXXXXXXXX",
    "XXXXXXXXX..XXXXXXXXX",
    "XXXXXXXXXXXXXXXXXXXX",
    ".XXXXXXXXXXXXXXXXXX.",
    ".XXXXXXXXXXXXXXXXXX.",
    "..XXXXXXXXXXXXXXXX..",
    "....XXXXXXXXXXXX....",
    "......XXXXXXXX......",
  ],
};

export const MARK_VARIANTS = Object.keys(BITMAPS) as MarkVariant[];

export function markInfo(variant: MarkVariant) {
  const rows = BITMAPS[variant];
  const w = rows[0].length;
  const h = rows.length;
  const cells: [number, number][] = [];
  rows.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) if (row[x] === "X") cells.push([x, y]);
  });
  return { w, h, cells };
}

export interface CatMarkProps {
  variant?: MarkVariant;
  /** css px per cell (0.9 ≈ 18px nav mark) */
  cell?: number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  title?: string;
}

export function CatMark({ variant = "solid", cell = 1, color = "currentColor", className, style, title }: CatMarkProps) {
  const { w, h, cells } = markInfo(variant);
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      width={w * cell}
      height={h * cell}
      className={className}
      style={{ display: "inline-block", verticalAlign: "middle", shapeRendering: "crispEdges", ...style }}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
    >
      {title && <title>{title}</title>}
      {cells.map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={color} />
      ))}
    </svg>
  );
}

/**
 * Favicon SVG source. Transparent (no tile), viewBox = glyph + 1-cell padding. `mode` "auto" =
 * ink on light tab bars, ivory on dark ones (prefers-color-scheme inside the SVG); "ink"/"ivory"
 * force a colour (previews).
 */
export function faviconSvg(variant: MarkVariant = "solid", mode: "auto" | "ink" | "ivory" = "auto"): string {
  const { w, h, cells } = markInfo(variant);
  const G = Math.max(w, h) + 2;
  const ox = Math.floor((G - w) / 2);
  const oy = Math.floor((G - h) / 2);
  const ink = "#0b0a0e";
  const ivory = "#f3efe4";
  const glyph = mode === "ivory" ? ivory : ink;
  const style = mode === "auto" ? `<style>.g{fill:${ink}}@media(prefers-color-scheme:dark){.g{fill:${ivory}}}</style>` : "";
  const rects = cells.map(([x, y]) => `<rect x="${x + ox}" y="${y + oy}" width="1" height="1"/>`).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${G} ${G}" shape-rendering="crispEdges">${style}<g class="g" fill="${glyph}">${rects}</g></svg>`;
}

/**
 * Draw the mark at an exact integer cell size, no padding: canvas = (w·cellPx) × (h·cellPx).
 * Used by Ornament so the glyph maps 1:1 onto render pixels (keeps it symmetric and crisp).
 */
export function drawMarkExact(variant: MarkVariant, cellPx: number): HTMLCanvasElement {
  const { w, h, cells } = markInfo(variant);
  const c = document.createElement("canvas");
  c.width = w * cellPx;
  c.height = h * cellPx;
  const ctx = c.getContext("2d")!;
  ctx.clearRect(0, 0, c.width, c.height);
  ctx.fillStyle = "#fff";
  for (const [x, y] of cells) ctx.fillRect(x * cellPx, y * cellPx, cellPx, cellPx);
  return c;
}

export default CatMark;
