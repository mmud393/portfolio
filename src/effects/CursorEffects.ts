import {
  ColorCycle,
  DEFAULT_OPTIONS,
  QUALITY_PRESETS,
  type CursorEffectsOptions,
  type Quality,
  type RGB,
} from './cursorEffectsConfig';
import { FluidEngine } from './fluidEngine';
import { PointerTracker } from './pointerTracker';

const IDLE_MS = 7000;

/** Coordinates the pointer tracker and WebGL ink fluid on one rAF loop. */
export class CursorEffects {
  private opts: CursorEffectsOptions;
  private root: HTMLDivElement;
  private fluidCanvas: HTMLCanvasElement;
  private fluid: FluidEngine | null = null;
  private tracker: PointerTracker;
  private fluidColors: ColorCycle;
  private observer: ResizeObserver;
  private themeObserver: MutationObserver;
  private quality: Quality;
  private raf = 0;
  private running = false;
  private paused = false;
  private destroyed = false;
  private last = 0;
  private lastActivity = 0;
  private cssW = 0;
  private cssH = 0;
  private slowFrames = 0;
  private frames = 0;
  private downgraded = false;
  private tmp: RGB = [0, 0, 0];
  private inkBoost = 1;

  constructor(host: HTMLElement, options: Partial<CursorEffectsOptions> = {}) {
    this.opts = { ...DEFAULT_OPTIONS, ...options };
    const touch = window.matchMedia('(pointer: coarse)').matches;
    this.inkBoost = touch ? this.opts.mobileInkBoost : 1;
    this.quality = this.opts.quality === 'auto' ? (touch ? 'low' : 'high') : this.opts.quality;

    this.root = document.createElement('div');
    this.root.setAttribute('aria-hidden', 'true');
    this.root.style.cssText = 'position:fixed;inset:0;z-index:0;pointer-events:none;overflow:hidden';
    this.fluidCanvas = this.makeCanvas();
    this.root.append(this.fluidCanvas);
    host.appendChild(this.root);

    this.fluidColors = new ColorCycle(this.currentFluidPalette());
    this.themeObserver = new MutationObserver(() => {
      this.fluidColors.setPalette(this.currentFluidPalette());
    });
    this.themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    this.initFluid();
    this.fluidCanvas.addEventListener('webglcontextlost', this.onContextLost);
    this.fluidCanvas.addEventListener('webglcontextrestored', this.onContextRestored);

    this.tracker = new PointerTracker(window, this.wake);
    this.observer = new ResizeObserver(() => this.resize());
    this.observer.observe(this.root);
    document.addEventListener('visibilitychange', this.onVisibility);
    this.resize();
  }

  private currentFluidPalette() {
    return document.documentElement.classList.contains('light') ? this.opts.fluidPalette : this.opts.fluidPaletteDark;
  }

  private makeCanvas() {
    const c = document.createElement('canvas');
    c.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block';
    return c;
  }

  /** One attempt only; on failure the bubble trail keeps working on its own. */
  private initFluid() {
    try {
      this.fluid = new FluidEngine(this.fluidCanvas, QUALITY_PRESETS[this.quality]);
      this.fluid.opacity = this.opts.fluidOpacity;
    } catch (err) {
      this.fluid = null;
      if (import.meta.env.DEV) console.warn('[CursorEffects] WebGL fluid disabled:', err);
    }
  }

  private onContextLost = (e: Event) => {
    e.preventDefault(); // allows restoration
    this.fluid?.dispose();
    this.fluid = null;
  };

  private onContextRestored = () => {
    if (this.destroyed) return;
    this.initFluid();
    this.resize(true);
  };

  private resize(force = false) {
    const rect = this.root.getBoundingClientRect();
    const w = Math.round(rect.width);
    const h = Math.round(rect.height);
    if (!w || !h || (!force && w === this.cssW && h === this.cssH)) return;
    this.cssW = w;
    this.cssH = h;
    const cfg = QUALITY_PRESETS[this.quality];
    const dpr = Math.min(window.devicePixelRatio || 1, cfg.maxDpr);
    this.fluid?.resize(w * dpr, h * dpr);
  }

  private wake = () => {
    this.lastActivity = performance.now();
    if (!this.paused && !this.running && !this.destroyed && !document.hidden) this.start();
  };

  start() {
    if (this.running || this.destroyed) return;
    this.running = true;
    this.paused = false;
    this.last = performance.now();
    this.raf = requestAnimationFrame(this.tick);
  }

  pause() {
    this.paused = true;
    this.stopLoop();
  }

  resume() {
    this.paused = false;
    this.tracker.reset();
    this.lastActivity = performance.now();
  }

  private stopLoop() {
    this.running = false;
    cancelAnimationFrame(this.raf);
  }

  private onVisibility = () => {
    if (document.hidden) this.stopLoop();
  };

  private tick = (now: number) => {
    if (!this.running) return;
    this.raf = requestAnimationFrame(this.tick);
    const rawDt = (now - this.last) / 1000;
    this.last = now;
    const dt = Math.min(rawDt, 1 / 30);
    this.watchPerformance(rawDt);

    const cfg = QUALITY_PRESETS[this.quality];
    this.fluidColors.advance(dt, cfg.colorUpdateSpeed);

    // read pointer input, inject fluid
    const seg = this.tracker.consume();
    if (seg && this.cssW) {
      const dx = seg.x1 - seg.x0;
      const dy = seg.y1 - seg.y0;
      const sdt = Math.max(seg.dt, 0.004);
      if (this.fluid) {
        const steps = Math.min(6, Math.max(1, Math.ceil(Math.hypot(dx, dy) / 40)));
        const fx = (dx / this.cssW) * cfg.splatForce * (steps > 1 ? 1 / steps : 1);
        const fy = (-dy / this.cssH) * cfg.splatForce * (steps > 1 ? 1 / steps : 1);
        // Impulse scales with per-stroke distance: slow strokes give soft swirls, fast ones strong flow.
        // Faster strokes lay down denser ink; slow ones stay soft.
        const speed = Math.hypot(dx, dy) / sdt;
        const dyeScale = Math.min(1.6, 0.45 + speed / 1400) * this.inkBoost;
        for (let i = 1; i <= steps; i++) {
          const t = i / steps;
          this.fluid.splat(
            (seg.x0 + dx * t) / this.cssW,
            1 - (seg.y0 + dy * t) / this.cssH,
            fx,
            fy,
            this.fluidColors.sample(0, this.tmp),
            dyeScale,
          );
        }
      }
    }

    // advance + render fluid
    const frozen = document.documentElement.classList.contains('light')
        ? Math.min(1, Math.max(0, (now - this.lastActivity - 150) / 650))
        : 0;
    if (this.fluid) {
      this.fluid.step(dt, frozen);
      this.fluid.render();
    }

    if (now - this.lastActivity > IDLE_MS) {
      this.fluid?.clearOutput();
      this.stopLoop();
    }
  };

  /** Drop one preset once if the first second of frames is consistently slow. */
  private watchPerformance(rawDt: number) {
    if (this.downgraded || !this.fluid || this.opts.quality !== 'auto' || this.quality === 'low') return;
    if (this.frames++ < 10) return; // skip warm-up
    if (rawDt > 0.034) this.slowFrames++;
    if (this.frames === 100) {
      if (this.slowFrames > 40) {
        this.downgraded = true;
        this.quality = this.quality === 'high' ? 'medium' : 'low';
        this.fluid.setConfig(QUALITY_PRESETS[this.quality]);
        this.resize(true);
      } else {
        this.downgraded = true; // measured once, fine
      }
    }
  }

  destroy() {
    if (this.destroyed) return;
    this.destroyed = true;
    this.stopLoop();
    this.tracker.destroy();
    this.observer.disconnect();
    this.themeObserver.disconnect();
    document.removeEventListener('visibilitychange', this.onVisibility);
    this.fluidCanvas.removeEventListener('webglcontextlost', this.onContextLost);
    this.fluidCanvas.removeEventListener('webglcontextrestored', this.onContextRestored);
    this.fluid?.dispose();
    this.fluid = null;
    this.root.remove();
  }
}
