/*
 * WebGL fluid simulation (stable-fluids: advection, curl/vorticity, pressure projection),
 * adapted in structure from PavelDoGreat/WebGL-Fluid-Simulation
 * Copyright (c) 2017 Pavel Dobryakov — MIT License.
 * https://github.com/PavelDoGreat/WebGL-Fluid-Simulation/blob/master/LICENSE
 *
 * Changes: ES module with explicit lifecycle, transparent (premultiplied) output for
 * overlaying page content, WebGL2/WebGL1 capability checks, resource disposal.
 */
import type { FluidConfig, RGB } from './cursorEffectsConfig';

type GL = WebGLRenderingContext | WebGL2RenderingContext;

interface FBO {
  texture: WebGLTexture;
  fbo: WebGLFramebuffer;
  width: number;
  height: number;
  texelX: number;
  texelY: number;
}
interface DoubleFBO {
  read: FBO;
  write: FBO;
  swap(): void;
}

const BASE_VS = `
precision highp float;
attribute vec2 aPosition;
varying vec2 vUv, vL, vR, vT, vB;
uniform vec2 texelSize;
void main () {
  vUv = aPosition * 0.5 + 0.5;
  vL = vUv - vec2(texelSize.x, 0.0);
  vR = vUv + vec2(texelSize.x, 0.0);
  vT = vUv + vec2(0.0, texelSize.y);
  vB = vUv - vec2(0.0, texelSize.y);
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`;

const FS_HEAD = `precision highp float; precision highp sampler2D;
varying highp vec2 vUv; varying highp vec2 vL; varying highp vec2 vR; varying highp vec2 vT; varying highp vec2 vB;
`;

const FS = {
  flow: `${FS_HEAD}uniform sampler2D uVelocity;
void main () {
  vec2 encoded = floor(clamp(texture2D(uVelocity, vUv).xy * 16.0 + 32768.0, 0.0, 65535.0));
  gl_FragColor = vec4(floor(encoded / 256.0), mod(encoded, 256.0)) / 255.0;
}`,
  clear: `${FS_HEAD}uniform sampler2D uTexture; uniform float value;
void main () { gl_FragColor = value * texture2D(uTexture, vUv); }`,
  splat: `${FS_HEAD}uniform sampler2D uTarget; uniform float aspectRatio; uniform vec4 color; uniform vec2 point; uniform float radius;
void main () {
  vec2 p = vUv - point.xy; p.x *= aspectRatio;
  vec4 splat = exp(-dot(p, p) / radius) * color;
  gl_FragColor = texture2D(uTarget, vUv) + splat;
}`,
  advection: `${FS_HEAD}uniform sampler2D uVelocity; uniform sampler2D uSource; uniform vec2 texelSize; uniform float dt; uniform float motion; uniform float dissipation;
void main () {
  vec2 coord = vUv - dt * motion * texture2D(uVelocity, vUv).xy * texelSize;
  vec4 result = texture2D(uSource, coord);
  gl_FragColor = result / (1.0 + dissipation * dt);
}`,
  divergence: `${FS_HEAD}uniform sampler2D uVelocity;
void main () {
  float L = texture2D(uVelocity, vL).x; float R = texture2D(uVelocity, vR).x;
  float T = texture2D(uVelocity, vT).y; float B = texture2D(uVelocity, vB).y;
  vec2 C = texture2D(uVelocity, vUv).xy;
  if (vL.x < 0.0) L = -C.x; if (vR.x > 1.0) R = -C.x;
  if (vT.y > 1.0) T = -C.y; if (vB.y < 0.0) B = -C.y;
  gl_FragColor = vec4(0.5 * (R - L + T - B), 0.0, 0.0, 1.0);
}`,
  curl: `${FS_HEAD}uniform sampler2D uVelocity;
void main () {
  float L = texture2D(uVelocity, vL).y; float R = texture2D(uVelocity, vR).y;
  float T = texture2D(uVelocity, vT).x; float B = texture2D(uVelocity, vB).x;
  gl_FragColor = vec4(0.5 * (R - L - T + B), 0.0, 0.0, 1.0);
}`,
  vorticity: `${FS_HEAD}uniform sampler2D uVelocity; uniform sampler2D uCurl; uniform float curl; uniform float dt;
void main () {
  float L = texture2D(uCurl, vL).x; float R = texture2D(uCurl, vR).x;
  float T = texture2D(uCurl, vT).x; float B = texture2D(uCurl, vB).x;
  float C = texture2D(uCurl, vUv).x;
  vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
  force /= length(force) + 0.0001; force *= curl * C; force.y *= -1.0;
  vec2 v = texture2D(uVelocity, vUv).xy + force * dt;
  gl_FragColor = vec4(min(max(v, -1000.0), 1000.0), 0.0, 1.0);
}`,
  pressure: `${FS_HEAD}uniform sampler2D uPressure; uniform sampler2D uDivergence;
void main () {
  float L = texture2D(uPressure, vL).x; float R = texture2D(uPressure, vR).x;
  float T = texture2D(uPressure, vT).x; float B = texture2D(uPressure, vB).x;
  float div = texture2D(uDivergence, vUv).x;
  gl_FragColor = vec4((L + R + B + T - div) * 0.25, 0.0, 0.0, 1.0);
}`,
  gradient: `${FS_HEAD}uniform sampler2D uPressure; uniform sampler2D uVelocity;
void main () {
  float L = texture2D(uPressure, vL).x; float R = texture2D(uPressure, vR).x;
  float T = texture2D(uPressure, vT).x; float B = texture2D(uPressure, vB).x;
  vec2 v = texture2D(uVelocity, vUv).xy - vec2(R - L, T - B);
  gl_FragColor = vec4(v, 0.0, 1.0);
}`,
  // Premultiplied output: alpha follows the dye's strongest channel so empty water stays transparent.
  display: `${FS_HEAD}uniform sampler2D uTexture; uniform float opacity;
void main () {
  vec4 t = texture2D(uTexture, vUv);
  vec3 c = clamp(t.rgb * 3.0, 0.0, 1.0);
  float ca = max(c.r, max(c.g, c.b));
  float d = clamp(t.w * 3.0, 0.0, 1.0); // black ink density
  float a = (ca + d - ca * d) * opacity;
  gl_FragColor = vec4(c * (1.0 - d) * opacity, a);
}`,
};

class Program {
  program: WebGLProgram;
  uniforms: Record<string, WebGLUniformLocation> = {};

  constructor(private gl: GL, vs: WebGLShader, fsSource: string) {
    const fs = compile(gl, gl.FRAGMENT_SHADER, fsSource);
    const p = gl.createProgram();
    if (!p) throw new Error('createProgram failed');
    gl.attachShader(p, vs);
    gl.attachShader(p, fs);
    gl.bindAttribLocation(p, 0, 'aPosition');
    gl.linkProgram(p);
    gl.deleteShader(fs);
    if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
      const log = gl.getProgramInfoLog(p);
      gl.deleteProgram(p);
      throw new Error(`Program link failed: ${log}`);
    }
    this.program = p;
    const count = gl.getProgramParameter(p, gl.ACTIVE_UNIFORMS) as number;
    for (let i = 0; i < count; i++) {
      const info = gl.getActiveUniform(p, i);
      const loc = info && gl.getUniformLocation(p, info.name);
      if (info && loc) this.uniforms[info.name] = loc;
    }
  }

  bind() {
    this.gl.useProgram(this.program);
  }

  dispose() {
    this.gl.deleteProgram(this.program);
  }
}

function compile(gl: GL, type: number, source: string): WebGLShader {
  const s = gl.createShader(type);
  if (!s) throw new Error('createShader failed');
  gl.shaderSource(s, source);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(s);
    gl.deleteShader(s);
    throw new Error(`Shader compile failed: ${log}`);
  }
  return s;
}

export class FluidEngine {
  private gl: GL;
  private halfFloat: number;
  private internalFormat: number;
  private vs: WebGLShader;
  private quad: WebGLBuffer;
  private programs: Record<keyof typeof FS, Program>;
  private velocity!: DoubleFBO;
  private dye!: DoubleFBO;
  private pressure!: DoubleFBO;
  private divergence!: FBO;
  private curl!: FBO;
  private flow!: FBO;
  private flowPixels = new Uint8Array(0);
  private lastFlowCapture = -Infinity;
  private width = 0;
  private height = 0;
  private disposed = false;
  opacity = 1;

  /** Throws if WebGL, half-float render targets or linear filtering are unavailable. */
  constructor(private canvas: HTMLCanvasElement, public config: FluidConfig) {
    const attrs: WebGLContextAttributes = { alpha: true, premultipliedAlpha: true, antialias: false, depth: false, stencil: false, preserveDrawingBuffer: false };
    const gl = FluidEngine.acquire(canvas, attrs);
    if (gl instanceof WebGL2RenderingContext) {
      this.halfFloat = gl.HALF_FLOAT;
      this.internalFormat = gl.RGBA16F;
    } else {
      const ext = gl.getExtension('OES_texture_half_float');
      if (!ext || !gl.getExtension('OES_texture_half_float_linear')) throw new Error('No half-float linear support');
      gl.getExtension('EXT_color_buffer_half_float');
      this.halfFloat = ext.HALF_FLOAT_OES;
      this.internalFormat = gl.RGBA;
    }
    this.gl = gl;

    this.vs = compile(gl, gl.VERTEX_SHADER, BASE_VS);
    this.programs = {} as Record<keyof typeof FS, Program>;
    (Object.keys(FS) as (keyof typeof FS)[]).forEach((k) => {
      this.programs[k] = new Program(gl, this.vs, FS[k]);
    });

    const quad = gl.createBuffer();
    if (!quad) throw new Error('createBuffer failed');
    this.quad = quad;
    gl.bindBuffer(gl.ARRAY_BUFFER, quad);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.disable(gl.BLEND);

    // Probe: must be able to render into a half-float target.
    this.createFBO(4, 4, gl.LINEAR, true);
  }

  private static acquire(canvas: HTMLCanvasElement, attrs: WebGLContextAttributes): GL {
    const gl2 = canvas.getContext('webgl2', attrs);
    if (gl2) {
      if (!gl2.getExtension('EXT_color_buffer_float') && !gl2.getExtension('EXT_color_buffer_half_float')) throw new Error('No float render targets');
      gl2.getExtension('OES_texture_float_linear');
      return gl2;
    }
    const gl = canvas.getContext('webgl', attrs) as WebGLRenderingContext | null;
    if (!gl) throw new Error('WebGL unavailable');
    return gl;
  }

  setConfig(config: FluidConfig) {
    const resChanged = config.simResolution !== this.config.simResolution || config.dyeResolution !== this.config.dyeResolution;
    this.config = config;
    if (resChanged && this.width) this.initFramebuffers();
  }

  /** Sets drawing-buffer size; (re)builds simulation targets only if their size changed. */
  resize(width: number, height: number) {
    width = Math.max(2, Math.round(width));
    height = Math.max(2, Math.round(height));
    if (width === this.width && height === this.height) return;
    this.width = width;
    this.height = height;
    this.canvas.width = width;
    this.canvas.height = height;
    this.initFramebuffers();
  }

  private resolution(res: number) {
    let aspect = this.width / this.height;
    if (aspect < 1) aspect = 1 / aspect;
    const min = Math.round(res);
    const max = Math.round(res * aspect);
    return this.width > this.height ? { w: max, h: min } : { w: min, h: max };
  }

  private initFramebuffers() {
    const gl = this.gl;
    this.releaseTargets();
    const sim = this.resolution(this.config.simResolution);
    const dye = this.resolution(this.config.dyeResolution);
    this.dye = this.createDouble(dye.w, dye.h, gl.LINEAR);
    this.velocity = this.createDouble(sim.w, sim.h, gl.LINEAR);
    this.pressure = this.createDouble(sim.w, sim.h, gl.NEAREST);
    this.divergence = this.createFBO(sim.w, sim.h, gl.NEAREST);
    this.curl = this.createFBO(sim.w, sim.h, gl.NEAREST);
    const flow = this.resolution(24);
    this.flow = this.createFBO(flow.w, flow.h, gl.NEAREST, false, true);
    this.flowPixels = new Uint8Array(flow.w * flow.h * 4);
    this.lastFlowCapture = -Infinity;
  }

  private createFBO(w: number, h: number, filter: number, probe = false, bytes = false): FBO {
    const gl = this.gl;
    const texture = gl.createTexture();
    const fbo = gl.createFramebuffer();
    if (!texture || !fbo) throw new Error('Texture/framebuffer allocation failed');
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, bytes ? gl.RGBA : this.internalFormat, w, h, 0, gl.RGBA, bytes ? gl.UNSIGNED_BYTE : this.halfFloat, null);
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
    const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
    if (status !== gl.FRAMEBUFFER_COMPLETE) {
      gl.deleteTexture(texture);
      gl.deleteFramebuffer(fbo);
      throw new Error(`Framebuffer incomplete (${status})`);
    }
    gl.viewport(0, 0, w, h);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    const target = { texture, fbo, width: w, height: h, texelX: 1 / w, texelY: 1 / h };
    if (probe) this.freeFBO(target);
    return target;
  }

  private createDouble(w: number, h: number, filter: number): DoubleFBO {
    const d: DoubleFBO = {
      read: this.createFBO(w, h, filter),
      write: this.createFBO(w, h, filter),
      swap() {
        const t = d.read;
        d.read = d.write;
        d.write = t;
      },
    };
    return d;
  }

  private freeFBO(f?: FBO) {
    if (!f) return;
    this.gl.deleteTexture(f.texture);
    this.gl.deleteFramebuffer(f.fbo);
  }

  private releaseTargets() {
    [this.velocity, this.dye, this.pressure].forEach((d) => {
      if (d) {
        this.freeFBO(d.read);
        this.freeFBO(d.write);
      }
    });
    this.freeFBO(this.divergence);
    this.freeFBO(this.curl);
    this.freeFBO(this.flow);
  }

  private blit(target: FBO | null) {
    const gl = this.gl;
    if (target) {
      gl.viewport(0, 0, target.width, target.height);
      gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
    } else {
      gl.viewport(0, 0, this.width, this.height);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    }
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }

  private tex(unit: number, f: FBO) {
    const gl = this.gl;
    gl.activeTexture(gl.TEXTURE0 + unit);
    gl.bindTexture(gl.TEXTURE_2D, f.texture);
    return unit;
  }

  /** x,y normalized (0–1, y up); dx,dy are velocity impulse; color is 0–255. */
  splat(x: number, y: number, dx: number, dy: number, color: RGB, dyeScale = 1, ink = 0) {
    const gl = this.gl;
    const p = this.programs.splat;
    const aspect = this.width / this.height;
    p.bind();
    gl.uniform1i(p.uniforms.uTarget, this.tex(0, this.velocity.read));
    gl.uniform1f(p.uniforms.aspectRatio, aspect);
    gl.uniform2f(p.uniforms.point, x, y);
    gl.uniform4f(p.uniforms.color, dx, dy, 0, 0);
    let radius = this.config.splatRadius / 100;
    if (aspect > 1) radius *= aspect;
    gl.uniform1f(p.uniforms.radius, radius);
    this.blit(this.velocity.write);
    this.velocity.swap();

    gl.uniform1i(p.uniforms.uTarget, this.tex(0, this.dye.read));
    gl.uniform4f(p.uniforms.color, (color[0] / 255) * 0.15 * dyeScale, (color[1] / 255) * 0.15 * dyeScale, (color[2] / 255) * 0.15 * dyeScale, ink * 0.15);
    this.blit(this.dye.write);
    this.dye.swap();
  }

  /**
   * Dye-only injection sized in CSS-relative units: radiusPx/heightPx. Used to paint bubble bodies
   * directly into the ink so bubbles and fluid are the same material.
   */
  splatDye(x: number, y: number, color: RGB, radiusFrac: number, amount: number) {
    const gl = this.gl;
    const p = this.programs.splat;
    p.bind();
    gl.uniform1i(p.uniforms.uTarget, this.tex(0, this.dye.read));
    gl.uniform1f(p.uniforms.aspectRatio, this.width / this.height);
    gl.uniform2f(p.uniforms.point, x, y);
    gl.uniform1f(p.uniforms.radius, radiusFrac * radiusFrac * 0.5);
    gl.uniform4f(p.uniforms.color, (color[0] / 255) * amount, (color[1] / 255) * amount, (color[2] / 255) * amount, 0);
    this.blit(this.dye.write);
    this.dye.swap();
  }

  step(dt: number, frozen = 0) {
    if (this.disposed) return;
    const gl = this.gl;
    const c = this.config;
    gl.disable(gl.BLEND);
    const { velocity, pressure, programs } = this;
    const texel = (p: Program, f: FBO) => gl.uniform2f(p.uniforms.texelSize, f.texelX, f.texelY);

    let p = programs.curl;
    p.bind();
    texel(p, velocity.read);
    gl.uniform1i(p.uniforms.uVelocity, this.tex(0, velocity.read));
    this.blit(this.curl);

    p = programs.vorticity;
    p.bind();
    texel(p, velocity.read);
    gl.uniform1i(p.uniforms.uVelocity, this.tex(0, velocity.read));
    gl.uniform1i(p.uniforms.uCurl, this.tex(1, this.curl));
    gl.uniform1f(p.uniforms.curl, c.curl * (1 - frozen));
    gl.uniform1f(p.uniforms.dt, dt);
    this.blit(velocity.write);
    velocity.swap();

    p = programs.divergence;
    p.bind();
    texel(p, velocity.read);
    gl.uniform1i(p.uniforms.uVelocity, this.tex(0, velocity.read));
    this.blit(this.divergence);

    p = programs.clear;
    p.bind();
    gl.uniform1i(p.uniforms.uTexture, this.tex(0, pressure.read));
    gl.uniform1f(p.uniforms.value, c.pressure);
    this.blit(pressure.write);
    pressure.swap();

    p = programs.pressure;
    p.bind();
    texel(p, velocity.read);
    gl.uniform1i(p.uniforms.uDivergence, this.tex(0, this.divergence));
    for (let i = 0; i < c.pressureIterations; i++) {
      gl.uniform1i(p.uniforms.uPressure, this.tex(1, pressure.read));
      this.blit(pressure.write);
      pressure.swap();
    }

    p = programs.gradient;
    p.bind();
    texel(p, velocity.read);
    gl.uniform1i(p.uniforms.uPressure, this.tex(0, pressure.read));
    gl.uniform1i(p.uniforms.uVelocity, this.tex(1, velocity.read));
    this.blit(velocity.write);
    velocity.swap();

    p = programs.advection;
    p.bind();
    texel(p, velocity.read);
    gl.uniform1i(p.uniforms.uVelocity, this.tex(0, velocity.read));
    gl.uniform1i(p.uniforms.uSource, 0);
    gl.uniform1f(p.uniforms.dt, dt);
    gl.uniform1f(p.uniforms.dissipation, c.velocityDissipation + frozen * 30);
    gl.uniform1f(p.uniforms.motion, 1);
    this.blit(velocity.write);
    velocity.swap();

    gl.uniform1i(p.uniforms.uVelocity, this.tex(0, velocity.read));
    gl.uniform1i(p.uniforms.uSource, this.tex(1, this.dye.read));
    gl.uniform1f(p.uniforms.motion, 1 - frozen);
    gl.uniform1f(p.uniforms.dissipation, c.densityDissipation);
    this.blit(this.dye.write);
    this.dye.swap();
  }

  /** Read a small flow grid at 20 Hz; particles share it without per-particle GPU reads. */
  captureFlow(now: number) {
    if (this.disposed || !this.flow || now - this.lastFlowCapture < 50) return;
    const gl = this.gl;
    const p = this.programs.flow;
    gl.disable(gl.BLEND);
    gl.disable(gl.DITHER);
    p.bind();
    gl.uniform1i(p.uniforms.uVelocity, this.tex(0, this.velocity.read));
    this.blit(this.flow);
    gl.readPixels(0, 0, this.flow.width, this.flow.height, gl.RGBA, gl.UNSIGNED_BYTE, this.flowPixels);
    this.lastFlowCapture = now;
  }

  sampleFlow(x: number, y: number, width: number, height: number): [number, number] | null {
    if (this.disposed || !this.flow || !Number.isFinite(this.lastFlowCapture)) return null;
    const gx = Math.max(0, Math.min(this.flow.width - 1, x / width * this.flow.width - 0.5));
    const gy = Math.max(0, Math.min(this.flow.height - 1, (1 - y / height) * this.flow.height - 0.5));
    const x0 = Math.floor(gx);
    const y0 = Math.floor(gy);
    let vx = 0;
    let vy = 0;
    for (let j = 0; j < 2; j++) {
      for (let i = 0; i < 2; i++) {
        const px = Math.min(x0 + i, this.flow.width - 1);
        const py = Math.min(y0 + j, this.flow.height - 1);
        const offset = (py * this.flow.width + px) * 4;
        const weight = (i ? gx - x0 : 1 - (gx - x0)) * (j ? gy - y0 : 1 - (gy - y0));
        vx += (this.flowPixels[offset] * 256 + this.flowPixels[offset + 2] - 32768) / 16 * weight;
        vy += (this.flowPixels[offset + 1] * 256 + this.flowPixels[offset + 3] - 32768) / 16 * weight;
      }
    }
    return [vx * width / this.velocity.read.width, -vy * height / this.velocity.read.height];
  }

  render() {
    if (this.disposed) return;
    const gl = this.gl;
    gl.clearColor(0, 0, 0, 0);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.clear(gl.COLOR_BUFFER_BIT);
    const p = this.programs.display;
    p.bind();
    gl.uniform1i(p.uniforms.uTexture, this.tex(0, this.dye.read));
    gl.uniform1f(p.uniforms.opacity, this.opacity);
    this.blit(null);
  }

  /** Wipe the visible output (used when the effect idles). */
  clearOutput() {
    if (this.disposed) return;
    const gl = this.gl;
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
  }

  dispose() {
    if (this.disposed) return;
    this.disposed = true;
    const gl = this.gl;
    if (gl.isContextLost()) return;
    this.releaseTargets();
    Object.values(this.programs).forEach((p) => p.dispose());
    gl.deleteShader(this.vs);
    gl.deleteBuffer(this.quad);
  }
}
