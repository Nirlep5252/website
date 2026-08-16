/**
 * Superellipse ("squircle") outlines as SVG path strings for CSS clip-path: path().
 * n≈5 is close to the iOS icon curve. Pure + deterministic — compute once at module load.
 */

/** Points along one superellipse quadrant, from angle a0 to a1 (radians), radius rx/ry, centred at (cx, cy). */
function quadrant(cx: number, cy: number, rx: number, ry: number, a0: number, a1: number, n: number, steps: number) {
  const pts: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = a0 + ((a1 - a0) * i) / steps;
    const c = Math.cos(t);
    const s = Math.sin(t);
    const x = cx + Math.sign(c) * Math.pow(Math.abs(c), 2 / n) * rx;
    const y = cy + Math.sign(s) * Math.pow(Math.abs(s), 2 / n) * ry;
    pts.push(`${x.toFixed(2)} ${y.toFixed(2)}`);
  }
  return pts;
}

/**
 * Rounded rectangle whose corners are superellipse arcs of radius `r`.
 * With w === h and r === w / 2 this is the classic squircle.
 */
export function squirclePath(w: number, h: number, r = Math.min(w, h) / 2, n = 5, stepsPerCorner = 16): string {
  const rr = Math.min(r, w / 2, h / 2);
  const q = Math.PI / 2;
  const pts = [
    ...quadrant(w - rr, rr, rr, rr, -q, 0, n, stepsPerCorner), // top-right
    ...quadrant(w - rr, h - rr, rr, rr, 0, q, n, stepsPerCorner), // bottom-right
    ...quadrant(rr, h - rr, rr, rr, q, 2 * q, n, stepsPerCorner), // bottom-left
    ...quadrant(rr, rr, rr, rr, 2 * q, 3 * q, n, stepsPerCorner), // top-left
  ];
  return `M${pts[0]} ` + pts.slice(1).map((p) => `L${p}`).join(" ") + " Z";
}

/** CSS value for clip-path. */
export function squircleClip(w: number, h: number, r?: number): string {
  return `path('${squirclePath(w, h, r)}')`;
}
