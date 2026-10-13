export type Quality = 'high' | 'medium' | 'low';
export type RGB = [number, number, number];

export interface CursorEffectsOptions {
  enabled: boolean;
  labels: string[];
  /** Hex colors for the shared cycle. Empty = use the site's theme colors (follows light/dark). */
  palette: string[];
  /** Fluid colors used on the light theme (ice, snow and glacial blue). */
  fluidPalette: string[];
  /** Fluid colors used on the dark theme (red through gold). */
  fluidPaletteDark: string[];
  /** Share of bubbles that carry a label (0–1). */
  labelProbability: number;
  /** Desktop cap; touch devices use maxParticlesMobile. */
  maxParticles: number;
  maxParticlesMobile: number;
  /** [min, max] bubble lifetime in ms. */
  particleLifetime: [number, number];
  /** CSS pixels of pointer travel between bubbles. */
  spawnDistance: number;
  /** Minimum ms between bubbles. */
  spawnInterval: number;
  /** Plain / labeled bubble radius ranges in CSS px. */
  plainRadius: [number, number];
  labelRadius: [number, number];
  /** Overall fluid visibility multiplier. */
  fluidOpacity: number;
  /** Extra ink density multiplier on touch devices. */
  mobileInkBoost: number;
  /** 'auto' picks by device and may downgrade once on slow hardware. */
  quality: 'auto' | Quality;
  respectReducedMotion: boolean;
}

export const DEFAULT_OPTIONS: CursorEffectsOptions = {
  enabled: true,
  labels: [
    "I'm Moin Ud Din",
    'Ideas into apps',
    'Mobile & Web',
    'Exploring AI',
    'Code. Create. Ship.',
    "Let's build",
    'React Native',
    'Next.js',
    'TypeScript',
    'Node.js',
  ],
  palette: [],
  fluidPaletteDark: ['#FF0000', '#FF2400', '#FF4500', '#FF6A00', '#FF8C00', '#FFA500', '#FFC400', '#FFD700', '#FFF200', '#FFF7B2'],
  fluidPalette: ['#E0F7FF', '#B9EAFE', '#67D8FF', '#2FB7F3', '#F8FDFF'],
  labelProbability: 1,
  maxParticles: 70,
  maxParticlesMobile: 30,
  particleLifetime: [3500, 5500],
  spawnDistance: 24,
  spawnInterval: 60,
  plainRadius: [10, 24],
  labelRadius: [16, 58],
  fluidOpacity: 1,
  mobileInkBoost: 1.6,
  quality: 'auto',
  respectReducedMotion: true,
};

export interface FluidConfig {
  simResolution: number;
  dyeResolution: number;
  /** Trail persistence: higher fades faster. */
  densityDissipation: number;
  /** Higher stops motion sooner. */
  velocityDissipation: number;
  pressure: number;
  pressureIterations: number;
  /** Swirl strength. */
  curl: number;
  /** Injection radius (percent of screen, aspect-corrected). */
  splatRadius: number;
  /** Injection force. */
  splatForce: number;
  /** Palette cycle speed (palette steps per second = value / 10). */
  colorUpdateSpeed: number;
  /** Canvas drawing-buffer DPR cap. */
  maxDpr: number;
}

const BASE_FLUID: FluidConfig = {
  simResolution: 128,
  dyeResolution: 512,
  densityDissipation: 0.5,
  velocityDissipation: 3,
  pressure: 0.1,
  pressureIterations: 20,
  curl: 3,
  splatRadius: 0.2,
  splatForce: 6000,
  colorUpdateSpeed: 10,
  maxDpr: 1.5,
};

export const QUALITY_PRESETS: Record<Quality, FluidConfig> = {
  high: BASE_FLUID,
  medium: { ...BASE_FLUID, simResolution: 96, dyeResolution: 512, pressureIterations: 14, maxDpr: 1 },
  low: { ...BASE_FLUID, simResolution: 64, dyeResolution: 256, pressureIterations: 8, maxDpr: 1 },
};

/** Fraction of maxParticles allowed per preset. */
export const QUALITY_PARTICLE_SCALE: Record<Quality, number> = { high: 1, medium: 0.7, low: 0.5 };

/** Theme CSS variables that make up the effect palette. */
const THEME_VARS = [
  '--color-blue-dark', '--color-blue', '--color-blue-light', '--color-blue-lighter',
  '--color-violet-dark', '--color-violet', '--color-violet-light',
  '--color-emerald-dark', '--color-emerald', '--color-emerald-light',
  '--color-cyan', '--color-cyan-light', '--color-cyan-lighter',
];

/** Every theme color, each family ordered dark → light, duplicates removed. */
export function themePalette(): string[] {
  const style = getComputedStyle(document.documentElement);
  const seen = new Set<string>();
  const out: string[] = [];
  for (const v of THEME_VARS) {
    const c = style.getPropertyValue(v).trim().toLowerCase();
    if (/^#[0-9a-f]{6}$/.test(c) && !seen.has(c)) {
      seen.add(c);
      out.push(c);
    }
  }
  return out.length ? out : ['#ff6b35', '#f59e0b', '#ef4444'];
}

export function hexToRgb(hex: string): RGB {
  const n = parseInt(hex.replace('#', ''), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

/** Shared color source so fluid injections and bubbles stay related. */
export class ColorCycle {
  private colors: RGB[] = [];
  private t = 0;

  constructor(palette: string[]) {
    this.setPalette(palette);
  }

  setPalette(palette: string[]) {
    this.colors = palette.map(hexToRgb);
    this.t %= this.colors.length;
  }

  advance(dt: number, speed: number) {
    this.t = (this.t + dt * speed * 0.1) % this.colors.length;
  }

  /** Current color, optionally offset along the palette for slight variety. */
  sample(offset = 0, out: RGB = [0, 0, 0]): RGB {
    const n = this.colors.length;
    const t = (((this.t + offset) % n) + n) % n;
    const i = Math.floor(t);
    const f = t - i;
    const a = this.colors[i];
    const b = this.colors[(i + 1) % n];
    out[0] = a[0] + (b[0] - a[0]) * f;
    out[1] = a[1] + (b[1] - a[1]) * f;
    out[2] = a[2] + (b[2] - a[2]) * f;
    return out;
  }
}
