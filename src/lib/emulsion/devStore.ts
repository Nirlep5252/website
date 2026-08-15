/**
 * Dev-only runtime overrides for the EMULSION field. The DevPanel writes here; every
 * EmulsionField / Poster subscribes and merges `overrides` on top of its own params, and
 * swaps palettes when `palette` is set. In production nothing writes to this store, so it
 * costs a Map lookup and nothing else.
 */
import type { FieldParams } from "./renderer";
import type { Stop } from "./lut";

export type DevPalette = { warm: Stop[]; cool: Stop[] };

let overrides: Partial<FieldParams> = {};
let palette: DevPalette | null = null;
let version = 0;
const subs = new Set<() => void>();
const KEY = "emulsion:dev";

function emit() {
  version++;
  subs.forEach((fn) => fn());
}

export const devStore = {
  enabled: process.env.NODE_ENV !== "production",
  getOverrides: () => overrides,
  getPalette: () => palette,
  getVersion: () => version,
  subscribe(fn: () => void) {
    subs.add(fn);
    return () => {
      subs.delete(fn);
    };
  },
  setOverrides(next: Partial<FieldParams>) {
    overrides = next;
    persist();
    emit();
  },
  setPalette(next: DevPalette | null) {
    palette = next;
    persist();
    emit();
  },
  reset() {
    overrides = {};
    palette = null;
    try {
      localStorage.removeItem(KEY);
    } catch {}
    emit();
  },
  /** Load persisted overrides (client only, dev only). */
  hydrate() {
    if (!devStore.enabled || typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return;
      const j = JSON.parse(raw);
      overrides = j.overrides ?? {};
      palette = j.palette ?? null;
      emit();
    } catch {}
  },
};

function persist() {
  try {
    localStorage.setItem(KEY, JSON.stringify({ overrides, palette }));
  } catch {}
}

/** Merge helper used by the field + posters. */
export function withDev(p: FieldParams): FieldParams {
  return devStore.enabled && Object.keys(overrides).length ? { ...p, ...overrides } : p;
}
