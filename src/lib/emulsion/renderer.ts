/**
 * EmulsionRenderer — raw WebGL2 renderer for the EMULSION field. No three.js.
 * One full-screen triangle, one fragment shader, two 256×1 LUT textures.
 */
import { buildLut, COOL_STOPS, WARM_STOPS, type Stop } from "./lut";
import { FRAG, VERT } from "./shaders";
import { devStore, withDev } from "./devStore";

export type DitherMode = 0 | 1 | 2 | 3 | 4; // none | grain(stipple) | bayer | halftone | ign

export interface FieldParams {
  seed: number;
  scale: number;
  warp: number;
  flow: number;
  octaves: number;
  contrast: number;
  bias: number;
  gamma: number;
  band: number;
  dither: DitherMode;
  ditherSize: number;
  ditherAmt: number;
  levels: number;
  ditherFps: number;
  grain: number;
  vignette: number;
  coolAmount: number;
  coolScale: number;
  pointerHeat: number;
  pointerRadius: number; // css px
  /** uv rect (y up) where heat is suppressed; null = off */
  darkZone: [number, number, number, number] | null;
  darkZoneAmt: number;
  /** internal render scale — 0.5 = half-res + pixelated upscale (chunkier grain) */
  renderScale: number;
  maxDpr: number;
  developMode: 0 | 1;
}

export const DEFAULT_PARAMS: FieldParams = {
  // user-approved 2026-08-15 (P1 "copy json")
  seed: 0.61,
  scale: 0.9,
  warp: 1.6,
  flow: 0.05,
  octaves: 4,
  contrast: 1.25,
  bias: -0.06,
  gamma: 1.25,
  band: 0.8,
  dither: 2, // Bayer 8×8 — chosen over stipple
  ditherSize: 1,
  ditherAmt: 0.32,
  levels: 22,
  ditherFps: 10,
  grain: 0.05,
  vignette: 0.5,
  coolAmount: 0.3,
  coolScale: 0.8,
  pointerHeat: 0.18,
  pointerRadius: 220,
  darkZone: null,
  darkZoneAmt: 0.85,
  renderScale: 0.5,
  maxDpr: 2,
  developMode: 0,
};

export const PRESETS: Record<string, Partial<FieldParams>> = {
  approved: {}, // = DEFAULT_PARAMS (user pick)
  stipple: {
    dither: 1,
    ditherAmt: 0.32,
    levels: 22,
    renderScale: 0.5,
    grain: 0.05,
    vignette: 0.2,
  },
  morphosis: {
    dither: 3,
    ditherSize: 3,
    ditherAmt: 0.55,
    levels: 8,
    renderScale: 1,
    grain: 0.1,
    coolAmount: 0,
    band: 0.15,
    contrast: 1.6,
    gamma: 1.3,
    scale: 1.0,
  },
  bayer: {
    dither: 2,
    ditherSize: 1,
    ditherAmt: 0.5,
    levels: 6,
    renderScale: 0.35,
    grain: 0,
    coolAmount: 0.25,
  },
  smooth: {
    dither: 0,
    ditherAmt: 0,
    levels: 0,
    renderScale: 1,
    grain: 0.04,
  },
};

export interface RendererOptions {
  warmStops?: Stop[];
  coolStops?: Stop[];
  preserveDrawingBuffer?: boolean;
}

function compile(gl: WebGL2RenderingContext, type: number, src: string) {
  const sh = gl.createShader(type)!;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(sh);
    gl.deleteShader(sh);
    throw new Error("EMULSION shader compile failed:\n" + log);
  }
  return sh;
}

export class EmulsionRenderer {
  readonly gl: WebGL2RenderingContext;
  readonly canvas: HTMLCanvasElement;
  private prog: WebGLProgram;
  private u = new Map<string, WebGLUniformLocation | null>();
  private lutWarm: WebGLTexture;
  private lutCool: WebGLTexture;
  private objTex: WebGLTexture;
  private vao: WebGLVertexArrayObject;
  private cssW = 1;
  private cssH = 1;
  private pxScale = 1; // render px per css px
  objRect: [number, number, number, number] = [0, 0, 1, 1];
  objAmt = 0;
  private destroyed = false;

  static supported(): boolean {
    if (typeof document === "undefined") return false;
    try {
      const c = document.createElement("canvas");
      return !!c.getContext("webgl2");
    } catch {
      return false;
    }
  }

  constructor(canvas: HTMLCanvasElement, opts: RendererOptions = {}) {
    this.canvas = canvas;
    const gl = canvas.getContext("webgl2", {
      antialias: false,
      alpha: false,
      depth: false,
      stencil: false,
      premultipliedAlpha: false,
      preserveDrawingBuffer: !!opts.preserveDrawingBuffer,
      powerPreference: "high-performance",
    });
    if (!gl) throw new Error("WebGL2 unavailable");
    this.gl = gl;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      throw new Error("EMULSION link failed: " + gl.getProgramInfoLog(prog));
    }
    gl.deleteShader(vs);
    gl.deleteShader(fs);
    this.prog = prog;
    gl.useProgram(prog);

    const n = gl.getProgramParameter(prog, gl.ACTIVE_UNIFORMS) as number;
    for (let i = 0; i < n; i++) {
      const info = gl.getActiveUniform(prog, i);
      if (info) this.u.set(info.name, gl.getUniformLocation(prog, info.name));
    }

    this.vao = gl.createVertexArray()!;
    gl.bindVertexArray(this.vao);

    this.lutWarm = this.makeLut(opts.warmStops ?? WARM_STOPS);
    this.lutCool = this.makeLut(opts.coolStops ?? COOL_STOPS);
    this.objTex = gl.createTexture()!;
    gl.bindTexture(gl.TEXTURE_2D, this.objTex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 0]));
    // object textures are pixel art mapped 1:1 → nearest keeps edges crisp and symmetric
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    gl.uniform1i(this.u.get("u_lutWarm") ?? null, 0);
    gl.uniform1i(this.u.get("u_lutCool") ?? null, 1);
    gl.uniform1i(this.u.get("u_obj") ?? null, 2);
  }

  private makeLut(stops: Stop[]): WebGLTexture {
    const gl = this.gl;
    const tex = gl.createTexture()!;
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 256, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, buildLut(stops, 256));
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    return tex;
  }

  setPalette(warm: Stop[], cool?: Stop[]) {
    const gl = this.gl;
    gl.deleteTexture(this.lutWarm);
    this.lutWarm = this.makeLut(warm);
    if (cool) {
      gl.deleteTexture(this.lutCool);
      this.lutCool = this.makeLut(cool);
    }
  }

  /** Upload any TexImageSource (canvas, image, video) as the object texture. */
  setObject(src: TexImageSource | null, rect?: [number, number, number, number]) {
    const gl = this.gl;
    gl.activeTexture(gl.TEXTURE2);
    gl.bindTexture(gl.TEXTURE_2D, this.objTex);
    if (src) {
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, src);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
    } else {
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 0]));
    }
    if (rect) this.objRect = rect;
  }

  /** Set an exact backing size (used for posters); css size == render size. */
  setBackingSize(w: number, h: number) {
    this.pxScale = 1;
    this.cssW = w;
    this.cssH = h;
    if (this.canvas.width !== w || this.canvas.height !== h) {
      this.canvas.width = w;
      this.canvas.height = h;
    }
  }

  /** Resize backing store. Returns render px per css px. */
  resize(cssW: number, cssH: number, renderScale: number, maxDpr: number) {
    const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
    this.pxScale = dpr * renderScale;
    const w = Math.max(1, Math.round(cssW * this.pxScale));
    const h = Math.max(1, Math.round(cssH * this.pxScale));
    this.cssW = cssW;
    this.cssH = cssH;
    if (this.canvas.width !== w || this.canvas.height !== h) {
      this.canvas.width = w;
      this.canvas.height = h;
    }
    this.canvas.style.imageRendering = renderScale < 1 ? "pixelated" : "auto";
    return this.pxScale;
  }

  render(time: number, p: FieldParams, pointerCss: { x: number; y: number } | null, develop = 1) {
    if (this.destroyed) return;
    const gl = this.gl;
    const W = this.canvas.width;
    const H = this.canvas.height;
    gl.viewport(0, 0, W, H);
    gl.useProgram(this.prog);
    gl.bindVertexArray(this.vao);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.lutWarm);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, this.lutCool);
    gl.activeTexture(gl.TEXTURE2);
    gl.bindTexture(gl.TEXTURE_2D, this.objTex);

    const u = (n: string) => this.u.get(n) ?? null;
    gl.uniform2f(u("u_res"), W, H);
    gl.uniform1f(u("u_time"), time);
    gl.uniform1f(u("u_seed"), p.seed);
    gl.uniform1f(u("u_coolAmount"), p.coolAmount);
    gl.uniform1f(u("u_coolScale"), p.coolScale);
    gl.uniform1f(u("u_scale"), p.scale);
    gl.uniform1f(u("u_warp"), p.warp);
    gl.uniform1f(u("u_flow"), p.flow);
    gl.uniform1i(u("u_octaves"), Math.max(1, Math.min(8, Math.round(p.octaves))));
    gl.uniform1f(u("u_contrast"), p.contrast);
    gl.uniform1f(u("u_bias"), p.bias);
    gl.uniform1f(u("u_gamma"), p.gamma);
    gl.uniform1f(u("u_band"), p.band);
    gl.uniform1i(u("u_dither"), p.dither);
    gl.uniform1f(u("u_ditherSize"), p.ditherSize);
    gl.uniform1f(u("u_ditherAmt"), p.ditherAmt);
    gl.uniform1f(u("u_levels"), p.levels);
    gl.uniform1f(u("u_ditherFps"), p.ditherFps);
    gl.uniform1f(u("u_grain"), p.grain);
    gl.uniform1f(u("u_vignette"), p.vignette);

    if (pointerCss && p.pointerHeat > 0) {
      gl.uniform2f(u("u_pointer"), pointerCss.x * this.pxScale, (this.cssH - pointerCss.y) * this.pxScale);
      gl.uniform1f(u("u_pointerHeat"), p.pointerHeat);
      gl.uniform1f(u("u_pointerRadius"), p.pointerRadius * this.pxScale);
    } else {
      gl.uniform1f(u("u_pointerHeat"), 0);
    }

    if (p.darkZone) {
      gl.uniform4f(u("u_darkZone"), p.darkZone[0], p.darkZone[1], p.darkZone[2], p.darkZone[3]);
      gl.uniform1f(u("u_darkZoneAmt"), p.darkZoneAmt);
    } else {
      gl.uniform4f(u("u_darkZone"), 1, 0, 0, 0);
    }

    gl.uniform1f(u("u_objAmt"), this.objAmt);
    gl.uniform4f(u("u_objRect"), this.objRect[0], this.objRect[1], this.objRect[2], this.objRect[3]);

    gl.uniform1f(u("u_develop"), develop);
    gl.uniform1i(u("u_developMode"), p.developMode);

    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }

  destroy() {
    if (this.destroyed) return;
    this.destroyed = true;
    const gl = this.gl;
    gl.deleteTexture(this.lutWarm);
    gl.deleteTexture(this.lutCool);
    gl.deleteTexture(this.objTex);
    gl.deleteVertexArray(this.vao);
    gl.deleteProgram(this.prog);
    // NOTE: deliberately no WEBGL_lose_context here — React StrictMode remounts reuse
    // the same <canvas>, and a lost context can't be re-acquired via getContext().
  }
}

/* ------------------------------------------------------------------ */
/* Poster rendering: one shared offscreen renderer, snapshot to PNG.   */
/* ------------------------------------------------------------------ */

let posterRenderer: EmulsionRenderer | null = null;
function getPosterRenderer(): EmulsionRenderer {
  if (!posterRenderer) {
    const c = document.createElement("canvas");
    posterRenderer = new EmulsionRenderer(c, { preserveDrawingBuffer: true });
  }
  return posterRenderer;
}

const posterCache = new Map<string, string>();
let posterPaletteVersion = -1;

/**
 * Render a static poster (data URL) for a seed. Cached per key. Cheap: one draw call.
 * `w`/`h` are the *render* dimensions (posters are chunky by design; upscale in CSS).
 */
export function renderPoster(key: string, params: FieldParams, w = 320, h = 200): string {
  params = withDev(params);
  const pal = devStore.getPalette();
  const ck = `${key}|${w}x${h}|${JSON.stringify(params)}|${pal ? JSON.stringify(pal) : ""}`;
  const hit = posterCache.get(ck);
  if (hit) return hit;
  const r = getPosterRenderer();
  if (devStore.enabled && posterPaletteVersion !== devStore.getVersion()) {
    posterPaletteVersion = devStore.getVersion();
    if (pal) r.setPalette(pal.warm, pal.cool);
    else r.setPalette(WARM_STOPS, COOL_STOPS);
  }
  r.setBackingSize(w, h);
  r.render(params.seed * 100, { ...params, pointerHeat: 0 }, null, 1);
  const url = r.canvas.toDataURL("image/png");
  posterCache.set(ck, url);
  return url;
}

/** Static poster configuration: no flow, no temporal grain, exact pixels. */
export const POSTER_PARAMS: FieldParams = {
  ...DEFAULT_PARAMS,
  flow: 0,
  ditherFps: 0,
  renderScale: 1,
  maxDpr: 1,
  vignette: 0.15,
  pointerHeat: 0,
  darkZone: null,
};

/** Hero configuration: light top-right, headline sits in the black. */
export const HERO_PARAMS: FieldParams = {
  ...DEFAULT_PARAMS,
  seed: 0.12,
  darkZone: [0, 0, 0.6, 0.62],
  darkZoneAmt: 0.88,
};

/** Backdrop configuration for pages where content sits on the field. */
export const BACKDROP_PARAMS: FieldParams = {
  ...DEFAULT_PARAMS,
  bias: DEFAULT_PARAMS.bias - 0.24,
  contrast: DEFAULT_PARAMS.contrast * 0.9,
  pointerHeat: 0.08,
};
