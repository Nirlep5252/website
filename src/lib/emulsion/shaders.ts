/**
 * EMULSION field shader — GLSL ES 3.00.
 *
 * Pipeline per pixel:
 *   domain-warped fbm  →  heat h ∈ [0,1]  →  (+ pointer heat, − dark zone, + object heat)
 *   →  dither offset (IGN grain / Bayer / halftone)  →  quantize to N levels
 *   →  LUT lookup (warm ramp, blended toward cool ramp by a slow mask field)
 *   →  film grain, vignette, develop-reveal
 */

export const VERT = /* glsl */ `#version 300 es
precision highp float;
const vec2 P[3] = vec2[3](vec2(-1.,-1.), vec2(3.,-1.), vec2(-1.,3.));
out vec2 v_uv;
void main(){
  vec2 p = P[gl_VertexID];
  v_uv = p * 0.5 + 0.5;
  gl_Position = vec4(p, 0., 1.);
}`;

export const FRAG = /* glsl */ `#version 300 es
precision highp float;

in vec2 v_uv;
out vec4 o_color;

uniform vec2  u_res;        // render-buffer size in px
uniform float u_time;
uniform float u_seed;

uniform sampler2D u_lutWarm;
uniform sampler2D u_lutCool;
uniform float u_coolAmount; // 0..1 how much cool ramp is allowed to show
uniform float u_coolScale;  // spatial scale of the warm/cool mask field

uniform float u_scale;      // noise scale (bigger = smaller features)
uniform float u_warp;       // domain warp strength
uniform float u_flow;       // animation speed
uniform int   u_octaves;
uniform float u_contrast;
uniform float u_bias;       // shifts heat up/down
uniform float u_gamma;      // heat gamma
uniform float u_band;       // diagonal light-band mix

uniform int   u_dither;     // 0 none, 1 grain(stipple), 2 bayer, 3 halftone, 4 ign
uniform float u_ditherSize; // cell size in render px
uniform float u_ditherAmt;  // amplitude in heat units
uniform float u_levels;     // quantization levels (0 = off)
uniform float u_ditherFps;  // temporal grain rate (0 = static)

uniform float u_grain;      // final rgb film grain
uniform float u_vignette;

uniform vec2  u_pointer;    // px in render space
uniform float u_pointerHeat;
uniform float u_pointerRadius; // px

uniform vec4  u_darkZone;   // uv rect x0,y0,x1,y1 (0..1) where heat is suppressed; z<x -> off
uniform float u_darkZoneAmt;

uniform sampler2D u_obj;    // optional object texture (luminance in .r, alpha in .a)
uniform float u_objAmt;     // 0 = off
uniform vec4  u_objRect;    // uv rect where the object texture is mapped

uniform float u_develop;    // 0..1 reveal
uniform int   u_developMode;// 0 threshold, 1 wipe-from-bottom with threshold

// ---------- hash / noise ----------
float hash21(vec2 p){
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}
vec2 hash22(vec2 p){
  vec3 p3 = fract(vec3(p.xyx) * vec3(0.1031, 0.1030, 0.0973));
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.xx + p3.yz) * p3.zy);
}
// gradient noise, range ~[-1,1]
float gnoise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  vec2 u = f*f*f*(f*(f*6.0-15.0)+10.0);
  vec2 ga = hash22(i + vec2(0,0)) * 2.0 - 1.0;
  vec2 gb = hash22(i + vec2(1,0)) * 2.0 - 1.0;
  vec2 gc = hash22(i + vec2(0,1)) * 2.0 - 1.0;
  vec2 gd = hash22(i + vec2(1,1)) * 2.0 - 1.0;
  float va = dot(ga, f - vec2(0,0));
  float vb = dot(gb, f - vec2(1,0));
  float vc = dot(gc, f - vec2(0,1));
  float vd = dot(gd, f - vec2(1,1));
  return mix(mix(va,vb,u.x), mix(vc,vd,u.x), u.y) * 1.4;
}
float fbm(vec2 p, int oct){
  float v = 0.0, a = 0.5;
  mat2 R = mat2(0.8, 0.6, -0.6, 0.8);
  for(int i = 0; i < 8; i++){
    if(i >= oct) break;
    v += a * gnoise(p);
    p = R * p * 2.03 + 17.1;
    a *= 0.5;
  }
  return v;
}

// ---------- dither patterns ----------
float bayer8(vec2 c){
  ivec2 p = ivec2(mod(c, 8.0));
  int x = p.x, y = p.y;
  int v = 0;
  for(int i = 0; i < 3; i++){
    int bx = (x >> i) & 1;
    int by = (y >> i) & 1;
    v = (v << 2) | ((bx ^ by) << 1) | by;
  }
  return (float(v) + 0.5) / 64.0;
}
// interleaved gradient noise (Jimenez) — cheap, blue-ish
float ign(vec2 c){
  return fract(52.9829189 * fract(0.06711056 * c.x + 0.00583715 * c.y));
}
// clustered dot on a 45° grid: 0 at cell centre .. 1 at corner
float halftone(vec2 c){
  mat2 R = mat2(0.70710678, 0.70710678, -0.70710678, 0.70710678);
  vec2 q = fract(R * c) - 0.5;
  return clamp(length(q) * 1.4142, 0.0, 1.0);
}

vec3 lut(sampler2D s, float t){
  return texture(s, vec2(clamp(t, 0.0, 1.0), 0.5)).rgb;
}

void main(){
  vec2 px = v_uv * u_res;
  float aspect = u_res.x / u_res.y;
  vec2 uv = v_uv;

  // ---------- heat field ----------
  vec2 pw = vec2(uv.x * aspect, uv.y);
  vec2 p = pw * u_scale + u_seed * 97.13;
  float t = u_time * u_flow;

  // (a) domain-warped fbm — texture / detail
  vec2 q = vec2(fbm(p + t * 0.10, u_octaves),
                fbm(p + vec2(5.2, 1.3) - t * 0.07, u_octaves));
  vec2 r = vec2(fbm(p + u_warp * q + vec2(1.7, 9.2) + t * 0.05, u_octaves),
                fbm(p + u_warp * q + vec2(8.3, 2.8) - t * 0.04, u_octaves));
  float f = fbm(p + u_warp * r, u_octaves);
  float hf = 0.5 + 0.5 * f;

  // (b) sheet — one big light direction (seeded), wavy edges, a hot ridge, a dark wedge.
  float ang = 0.55 + u_seed * 6.2831;
  vec2 dir = vec2(cos(ang), sin(ang));
  vec2 cuv = (uv - 0.5) * vec2(aspect, 1.0);
  float diag = dot(cuv, dir);
  float wave = fbm(pw * u_scale * 0.55 + u_seed * 13.0 + t * 0.06, 3);
  diag += 0.16 * u_warp * wave;                       // sheet edges undulate
  float sheet = smoothstep(-0.32, 0.62, diag);        // black → light
  float ridgePos = -0.12 + 0.18 * sin(u_seed * 41.0); // where the bright band crosses
  float ridge = 0.5 * exp(-pow((diag - ridgePos) * 5.5, 2.0));
  float wedge = smoothstep(0.05, 0.55, dot(cuv, vec2(-dir.y, dir.x)) + 0.25 * wave); // side wedge of dark
  float hs = clamp(sheet * 0.9 + ridge, 0.0, 1.0) * (1.0 - 0.55 * wedge) + 0.12 * f;

  float h = mix(hf, hs, u_band);
  h = (h - 0.5) * u_contrast + 0.5 + u_bias;
  h = pow(clamp(h, 0.0, 1.0), u_gamma);

  // pointer heat
  if(u_pointerHeat > 0.0){
    float d = distance(px, u_pointer) / max(u_pointerRadius, 1.0);
    h += u_pointerHeat * exp(-d * d * 2.5);
  }

  // dark zone (guaranteed legibility under headline)
  if(u_darkZone.z > u_darkZone.x){
    vec2 c = (u_darkZone.xy + u_darkZone.zw) * 0.5;
    vec2 hs = (u_darkZone.zw - u_darkZone.xy) * 0.5;
    vec2 dd = abs(uv - c) - hs;
    float outside = length(max(dd, 0.0)) + min(max(dd.x, dd.y), 0.0);
    float m = 1.0 - smoothstep(-0.02, 0.18, outside);
    h *= 1.0 - m * u_darkZoneAmt;
  }

  // object heat (dithered cat etc.)
  if(u_objAmt > 0.0){
    vec2 ouv = (uv - u_objRect.xy) / (u_objRect.zw - u_objRect.xy);
    if(all(greaterThanEqual(ouv, vec2(0.0))) && all(lessThanEqual(ouv, vec2(1.0)))){
      vec4 o = texture(u_obj, ouv);
      float objHeat = 0.2 + 0.8 * pow(o.r, 1.7); // the object reads "hot"; keep facet contrast
      h = mix(h * (1.0 - 0.35 * o.a), objHeat, o.a * u_objAmt);
    }
  }

  h = clamp(h, 0.0, 1.0);

  // ---------- dither + quantize ----------
  vec2 cell = floor(px / max(u_ditherSize, 1.0));
  float tf = u_ditherFps > 0.0 ? floor(u_time * u_ditherFps) : 0.0;
  float d = 0.5;
  if(u_dither == 1)      d = hash21(cell + tf * vec2(5.588238, 7.42) + u_seed * 100.0); // white-noise stipple
  else if(u_dither == 4) d = ign(cell + tf * vec2(5.588238, 7.42));
  else if(u_dither == 2) d = bayer8(cell);
  else if(u_dither == 3) d = halftone(px / max(u_ditherSize, 1.0));

  float hd = h + (d - 0.5) * u_ditherAmt;
  if(u_levels > 0.5){
    hd = floor(hd * u_levels + 0.5) / u_levels;
  }
  hd = clamp(hd, 0.0, 1.0);

  // ---------- colour ----------
  float coolMask = 0.0;
  if(u_coolAmount > 0.0){
    float cm = fbm(vec2(uv.x * aspect, uv.y) * u_coolScale + u_seed * 31.7 + 40.0 + t * 0.03, 3);
    coolMask = smoothstep(0.55 - u_coolAmount * 0.5, 0.75, 0.5 + 0.5 * cm);
  }
  vec3 col = mix(lut(u_lutWarm, hd), lut(u_lutCool, hd), coolMask);

  // film grain (heavier in shadows)
  if(u_grain > 0.0){
    float g = hash21(px + tf * 13.7 + 0.37) - 0.5;
    col += g * u_grain * (0.35 + 0.65 * (1.0 - h));
  }

  // vignette
  if(u_vignette > 0.0){
    vec2 vv = uv * (1.0 - uv);
    float vig = pow(vv.x * vv.y * 16.0, 0.35);
    col *= mix(1.0, vig, u_vignette);
  }

  // develop reveal
  if(u_develop < 1.0){
    float thr = bayer8(cell) * 0.9 + 0.05;
    float dev = u_develop;
    if(u_developMode == 1) dev = clamp(u_develop * 1.6 - uv.y * 0.6, 0.0, 1.0);
    if(thr > dev) col = vec3(0.043, 0.039, 0.055);
  }

  o_color = vec4(col, 1.0);
}`;
