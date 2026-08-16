"use client";

/**
 * Dev-only EMULSION controls. Mounted from the root layout only when NODE_ENV !== production.
 * Writes runtime overrides into devStore; every field/poster on the page picks them up live.
 * Toggle: press `c` or click the floating pill. Persists to localStorage.
 */
import { useEffect, useState, useSyncExternalStore } from "react";
import { DEFAULT_PARAMS, PRESETS, type FieldParams } from "@/lib/emulsion/renderer";
import { COOL_STOPS, WARM_STOPS } from "@/lib/emulsion/lut";
import { devStore } from "@/lib/emulsion/devStore";

type NumKey = { [K in keyof FieldParams]: FieldParams[K] extends number ? K : never }[keyof FieldParams];

const SLIDERS: { key: NumKey; min: number; max: number; step: number; group: string }[] = [
  { key: "seed", min: 0, max: 1, step: 0.001, group: "field" },
  { key: "scale", min: 0.3, max: 4, step: 0.01, group: "field" },
  { key: "warp", min: 0, max: 6, step: 0.05, group: "field" },
  { key: "flow", min: 0, max: 0.4, step: 0.005, group: "field" },
  { key: "octaves", min: 1, max: 8, step: 1, group: "field" },
  { key: "band", min: 0, max: 1, step: 0.01, group: "field" },
  { key: "contrast", min: 0.3, max: 3, step: 0.01, group: "tone" },
  { key: "bias", min: -0.5, max: 0.5, step: 0.005, group: "tone" },
  { key: "gamma", min: 0.4, max: 2.5, step: 0.01, group: "tone" },
  { key: "coolAmount", min: 0, max: 1, step: 0.01, group: "tone" },
  { key: "coolScale", min: 0.2, max: 3, step: 0.01, group: "tone" },
  { key: "ditherSize", min: 1, max: 8, step: 1, group: "dither" },
  { key: "ditherAmt", min: 0, max: 1, step: 0.005, group: "dither" },
  { key: "levels", min: 0, max: 48, step: 1, group: "dither" },
  { key: "ditherFps", min: 0, max: 30, step: 1, group: "dither" },
  { key: "renderScale", min: 0.2, max: 1, step: 0.05, group: "dither" },
  { key: "grain", min: 0, max: 0.4, step: 0.005, group: "film" },
  { key: "vignette", min: 0, max: 1, step: 0.01, group: "film" },
  { key: "pointerHeat", min: 0, max: 0.6, step: 0.01, group: "pointer" },
  { key: "pointerRadius", min: 40, max: 600, step: 5, group: "pointer" },
  { key: "darkZoneAmt", min: 0, max: 1, step: 0.01, group: "layout" },
];
const GROUPS = ["field", "tone", "dither", "film", "pointer", "layout"];
const DITHERS = ["none", "grain", "bayer", "halftone", "ign"] as const;

/** module-level so the React Compiler lint does not see Math.random inside render closures */
function randomSeed() {
  return Math.random();
}

const mono: React.CSSProperties = { fontFamily: "var(--font-geist-mono), ui-monospace, monospace" };
const btn: React.CSSProperties = {
  ...mono,
  fontSize: 11,
  padding: "3px 7px",
  background: "transparent",
  color: "#f3efe4",
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: "rgba(243,239,228,.28)",
  cursor: "pointer",
};
const btnOn: React.CSSProperties = { ...btn, background: "#f3efe4", color: "#0b0a0e", borderColor: "#f3efe4" };

export function DevPanel() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const version = useSyncExternalStore(devStore.subscribe, devStore.getVersion, () => 0);
  const overrides = devStore.getOverrides();
  const palette = devStore.getPalette();
  const params: FieldParams = { ...DEFAULT_PARAMS, ...overrides };
  const warm = palette?.warm ?? WARM_STOPS;
  const cool = palette?.cool ?? COOL_STOPS;

  useEffect(() => {
    devStore.hydrate();
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      if (e.key === "c" && !e.metaKey && !e.ctrlKey && !e.altKey) setOpen((o) => !o);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const set = <K extends keyof FieldParams>(k: K, v: FieldParams[K]) => {
    const next = { ...overrides, [k]: v };
    // drop keys that equal the default so overrides stay minimal
    if (JSON.stringify(v) === JSON.stringify(DEFAULT_PARAMS[k])) delete next[k];
    devStore.setOverrides(next);
  };
  const setStop = (which: "warm" | "cool", i: number, hex: string) => {
    const w = which === "warm" ? warm.map((s, j) => (j === i ? { ...s, hex } : s)) : warm;
    const c = which === "cool" ? cool.map((s, j) => (j === i ? { ...s, hex } : s)) : cool;
    devStore.setPalette({ warm: w, cool: c });
  };
  const copy = async () => {
    const payload = JSON.stringify({ params, warm, cool }, null, 2);
    try {
      await navigator.clipboard.writeText(payload);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      window.prompt("Copy params", payload);
    }
  };

  const dirty = Object.keys(overrides).length > 0 || !!palette;

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        title="EMULSION dev controls (c)"
        style={{
          ...btn,
          position: "fixed",
          right: 12,
          bottom: 12,
          zIndex: 9999,
          background: dirty ? "#f394d6" : "rgba(11,10,14,.85)",
          color: dirty ? "#0b0a0e" : "#f3efe4",
          borderColor: dirty ? "#f394d6" : "rgba(243,239,228,.28)",
          backdropFilter: "blur(6px)",
        }}
      >
        controls{dirty ? " · modified" : ""} (c)
      </button>
    );
  }

  return (
    <aside
      data-dev-panel
      style={{
        ...mono,
        position: "fixed",
        top: 12,
        right: 12,
        zIndex: 9999,
        width: 300,
        maxHeight: "calc(100vh - 24px)",
        overflow: "auto",
        background: "rgba(11,10,14,.9)",
        border: "1px solid rgba(243,239,228,.16)",
        color: "#f3efe4",
        fontSize: 11,
        lineHeight: 1.4,
        backdropFilter: "blur(6px)",
        scrollbarWidth: "thin",
      }}
    >
      <header
        style={{
          display: "flex",
          gap: 6,
          padding: 8,
          position: "sticky",
          top: 0,
          background: "rgba(11,10,14,.96)",
          borderBottom: "1px solid rgba(243,239,228,.1)",
          zIndex: 1,
        }}
      >
        <button style={btn} onClick={() => setOpen(false)}>hide</button>
        <button style={btn} onClick={() => set("seed", randomSeed())}>reseed</button>
        <button style={btn} onClick={copy}>{copied ? "copied ✓" : "copy json"}</button>
        <button style={btn} onClick={() => devStore.reset()}>reset</button>
      </header>

      <div style={{ padding: "4px 10px 12px" }}>
        <p style={{ margin: "8px 0", opacity: 0.55 }}>
          v{version} · overrides apply on top of each field&apos;s own params (hero keeps its dark zone). Dev only.
        </p>

        <Section title="presets">
          <Row>
            {Object.keys(PRESETS).map((k) => (
              <button key={k} style={btn} onClick={() => devStore.setOverrides(k === "approved" ? {} : { ...overrides, ...PRESETS[k] })}>
                {k}
              </button>
            ))}
          </Row>
        </Section>

        <Section title="dither">
          <Row>
            {DITHERS.map((n, i) => (
              <button key={n} style={params.dither === i ? btnOn : btn} onClick={() => set("dither", i as FieldParams["dither"])}>
                {n}
              </button>
            ))}
          </Row>
        </Section>

        {GROUPS.map((g) => (
          <Section key={g} title={g}>
            {SLIDERS.filter((s) => s.group === g).map((s) => (
              <label key={s.key} style={{ display: "grid", gridTemplateColumns: "92px 1fr 44px", gap: 6, alignItems: "center", margin: "2px 0" }}>
                <span style={{ opacity: overrides[s.key] !== undefined ? 1 : 0.7, color: overrides[s.key] !== undefined ? "#f394d6" : undefined }}>{s.key}</span>
                <input
                  type="range"
                  min={s.min}
                  max={s.max}
                  step={s.step}
                  value={params[s.key]}
                  onChange={(e) => set(s.key, Number(e.target.value) as FieldParams[typeof s.key])}
                  style={{ width: "100%", accentColor: "#f394d6", height: 14 }}
                />
                <output style={{ textAlign: "right", opacity: 0.7 }}>
                  {Number(params[s.key]).toFixed(s.step < 0.01 ? 3 : s.step < 1 ? 2 : 0)}
                </output>
              </label>
            ))}
          </Section>
        ))}

        <Section title="warm ramp">
          <Row>
            {warm.map((s, i) => (
              <input key={i} type="color" value={s.hex} title={`t=${s.t}`} onChange={(e) => setStop("warm", i, e.target.value)} style={{ width: 26, height: 22, padding: 0, border: "1px solid rgba(243,239,228,.25)", background: "none" }} />
            ))}
          </Row>
        </Section>
        <Section title="cool ramp">
          <Row>
            {cool.map((s, i) => (
              <input key={i} type="color" value={s.hex} title={`t=${s.t}`} onChange={(e) => setStop("cool", i, e.target.value)} style={{ width: 26, height: 22, padding: 0, border: "1px solid rgba(243,239,228,.25)", background: "none" }} />
            ))}
          </Row>
        </Section>
      </div>
    </aside>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ padding: "8px 0", borderBottom: "1px dashed rgba(243,239,228,.1)" }}>
      <h4 style={{ margin: "0 0 6px", fontWeight: 500, letterSpacing: ".08em", textTransform: "uppercase", opacity: 0.55, fontSize: 10 }}>{title}</h4>
      {children}
    </section>
  );
}
function Row({ children }: { children: React.ReactNode }) {
  return <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 4 }}>{children}</div>;
}

export default DevPanel;
