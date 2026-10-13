export interface PointerSegment {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  /** Seconds covered by the segment (clamped). */
  dt: number;
  pointerType: string;
}

const MAX_JUMP = 400; // px; larger jumps are treated as teleports, not strokes
const MAX_DT = 0.05;

/** Single pointer source shared by the fluid and bubble layers (CSS px, viewport space). */
export class PointerTracker {
  x = 0;
  y = 0;
  prevX = 0;
  prevY = 0;
  vx = 0;
  vy = 0;
  time = 0;
  pointerType = 'mouse';
  inside = false;

  private seg: PointerSegment | null = null;
  private hasPrev = false;
  private target: Window;
  private onActivity: () => void;

  constructor(target: Window, onActivity: () => void) {
    this.target = target;
    this.onActivity = onActivity;
    target.addEventListener('pointermove', this.handleMove, { passive: true });
    target.addEventListener('pointerdown', this.handleDown, { passive: true });
    target.addEventListener('blur', this.reset);
    document.documentElement.addEventListener('pointerleave', this.reset);
    document.addEventListener('visibilitychange', this.reset);
  }

  private handleDown = (e: PointerEvent) => {
    if (e.pointerType !== 'touch') return;
    // Restrained burst for touch: a tiny stroke at the touch point.
    this.pointerType = 'touch';
    this.x = e.clientX;
    this.y = e.clientY;
    this.seg = { x0: e.clientX - 14, y0: e.clientY + 10, x1: e.clientX, y1: e.clientY, dt: 0.016, pointerType: 'touch' };
    this.inside = true;
    this.hasPrev = false;
    this.onActivity();
  };

  private handleMove = (e: PointerEvent) => {
    const now = performance.now();
    this.pointerType = e.pointerType;
    this.inside = true;
    if (this.hasPrev) {
      const dx = e.clientX - this.x;
      const dy = e.clientY - this.y;
      if (dx * dx + dy * dy < MAX_JUMP * MAX_JUMP && (dx !== 0 || dy !== 0)) {
        const dt = Math.min(Math.max((now - this.time) / 1000, 0.004), MAX_DT);
        this.prevX = this.x;
        this.prevY = this.y;
        this.vx = dx / dt;
        this.vy = dy / dt;
        // Merge with any unconsumed segment so nothing is lost between frames.
        if (this.seg) {
          this.seg.x1 = e.clientX;
          this.seg.y1 = e.clientY;
          this.seg.dt = Math.min(this.seg.dt + dt, MAX_DT * 2);
        } else {
          this.seg = { x0: this.x, y0: this.y, x1: e.clientX, y1: e.clientY, dt, pointerType: e.pointerType };
        }
        this.onActivity();
      }
    }
    this.x = e.clientX;
    this.y = e.clientY;
    this.time = now;
    this.hasPrev = true;
  };

  /** Forget the previous position so re-entry never draws a streak. */
  reset = () => {
    this.hasPrev = false;
    this.inside = false;
    this.seg = null;
    this.vx = 0;
    this.vy = 0;
  };

  consume(): PointerSegment | null {
    const s = this.seg;
    this.seg = null;
    return s;
  }

  destroy() {
    this.target.removeEventListener('pointermove', this.handleMove);
    this.target.removeEventListener('pointerdown', this.handleDown);
    this.target.removeEventListener('blur', this.reset);
    document.documentElement.removeEventListener('pointerleave', this.reset);
    document.removeEventListener('visibilitychange', this.reset);
    this.seg = null;
  }
}
