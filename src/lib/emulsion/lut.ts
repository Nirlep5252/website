/**
 * EMULSION palette + LUT helpers.
 *
 * One thermal-structured colormap: near-black → deep indigo → violet → hot pink → cream.
 * A second, rarer "cool" ramp (moss → chartreuse → cream) is blended in by a slow noise
 * field so green shows up as an occasional side-arm, never as a second full temperature system.
 */

export type Stop = { t: number; hex: string };

export const WARM_STOPS: Stop[] = [
  { t: 0.0, hex: "#0b0a0e" },
  { t: 0.16, hex: "#160f3a" },
  { t: 0.34, hex: "#3a2fd6" },
  { t: 0.5, hex: "#7659ee" },
  { t: 0.66, hex: "#c67ae6" },
  { t: 0.78, hex: "#f394d6" },
  { t: 0.9, hex: "#f6cfc4" },
  { t: 1.0, hex: "#f5f0d6" },
];

export const COOL_STOPS: Stop[] = [
  { t: 0.0, hex: "#0b0a0e" },
  { t: 0.2, hex: "#0e1a16" },
  { t: 0.42, hex: "#254a35" },
  { t: 0.62, hex: "#6f9e52" },
  { t: 0.8, hex: "#c3dc7c" },
  { t: 0.92, hex: "#e9efb4" },
  { t: 1.0, hex: "#f5f0d6" },
];

/** UI tokens that sit *outside* the LUT. */
export const TOKENS = {
  ink: "#0b0a0e",
  paper: "#f3efe4",
  paperDim: "#e6e1d2",
  signal: "#b7de5e", // moss/chartreuse — the single accent
  indigo: "#3a2fd6",
  pink: "#f394d6",
  cream: "#f5f0d6",
} as const;

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [
    parseInt(h.slice(0, 2), 16) / 255,
    parseInt(h.slice(2, 4), 16) / 255,
    parseInt(h.slice(4, 6), 16) / 255,
  ];
}
const toLin = (c: number) =>
  c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
const toSrgb = (c: number) =>
  c <= 0.0031308 ? c * 12.92 : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;

/** Build an RGBA8 LUT of `size` entries, interpolating stops in linear light. */
export function buildLut(stops: Stop[], size = 256): Uint8Array {
  const out = new Uint8Array(size * 4);
  const lin = stops.map((s) => ({ t: s.t, c: hexToRgb(s.hex).map(toLin) }));
  for (let i = 0; i < size; i++) {
    const t = i / (size - 1);
    let a = lin[0];
    let b = lin[lin.length - 1];
    for (let k = 0; k < lin.length - 1; k++) {
      if (t >= lin[k].t && t <= lin[k + 1].t) {
        a = lin[k];
        b = lin[k + 1];
        break;
      }
    }
    const span = Math.max(1e-6, b.t - a.t);
    const u = Math.min(1, Math.max(0, (t - a.t) / span));
    // smoothstep the segment a touch so stop boundaries don't band
    const s = u * u * (3 - 2 * u);
    for (let ch = 0; ch < 3; ch++) {
      const v = a.c[ch] + (b.c[ch] - a.c[ch]) * s;
      out[i * 4 + ch] = Math.round(toSrgb(v) * 255);
    }
    out[i * 4 + 3] = 255;
  }
  return out;
}

/** Deterministic 32-bit hash of a string → [0,1). Used to seed posters from slugs. */
export function seedFromString(s: string): number {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return (h >>> 0) / 4294967296;
}
