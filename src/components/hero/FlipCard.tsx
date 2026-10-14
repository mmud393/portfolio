import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
} from 'react';
import gsap from 'gsap';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { quotes } from '../../data/quotes';
import { QuoteBack } from './QuoteBack';

const AUTO_FLIP_MS = 5_000;
const FLIP_SECONDS = 2;
const MAX_TILT_Y = 9;
const MAX_TILT_X = 7;
const DRAG_DEG_PER_PX = 0.35;
const DRAG_THRESHOLD_PX = 6;

const nearestFace = (deg: number) => Math.round(deg / 180) * 180;

interface FlipCardProps {
  /** Everything that belongs to the front face (card, floating icons, badge). */
  front: ReactNode;
  className?: string;
}

/**
 * Interactive 3D card. Front is the code window; the back shows a different developer quote each flip.
 * All per-frame work (tilt, flip, glare) goes through motion values or
 * direct style writes, never React state.
 */
export function FlipCard({ front, className }: FlipCardProps) {
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  const stageRef = useRef<HTMLDivElement>(null);
  const flipState = useRef({ deg: 0 });
  // Rotation axis (in the card plane) for the current flip; which face is up.
  const axis = useRef({ x: 0, y: 1 });
  const showing = useRef<'front' | 'back'>('front');
  const flipperRef = useRef<HTMLDivElement>(null);
  const frontRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);
  const lastAxisIdx = useRef(-1);
  const tween = useRef<gsap.core.Tween | null>(null);
  const timer = useRef<number | null>(null);
  const barAnim = useRef<Animation | null>(null);
  const hovering = useRef(false);
  const drag = useRef<{ x: number; y: number; moved: boolean; id: number } | null>(null);

  const [quoteIdx, setQuoteIdx] = useState(() => Math.floor(Math.random() * quotes.length));

  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springX = useSpring(tiltX, { stiffness: 90, damping: 15, mass: 0.9 });
  const springY = useSpring(tiltY, { stiffness: 90, damping: 15, mass: 0.9 });
  const lift = useSpring(1, { stiffness: 140, damping: 20 });

  /** Push the current flip angle/axis onto the DOM (no React state per frame). */
  const apply = useCallback(() => {
    const deg = flipState.current.deg;
    const { x, y } = axis.current;
    if (flipperRef.current) flipperRef.current.style.transform = `rotate3d(${x}, ${y}, 0, ${deg}deg)`;
    // The face that is currently "behind" is pre-rotated 180deg about the same axis.
    const hidden = showing.current === 'front' ? backRef.current : frontRef.current;
    const shown = showing.current === 'front' ? frontRef.current : backRef.current;
    if (hidden) hidden.style.transform = `rotate3d(${x}, ${y}, 0, 180deg) translateZ(1px)`;
    if (shown) shown.style.transform = 'translateZ(1px)';
  }, []);

  /** Pick one of 8 directions (edges + corners), never the same twice in a row. */
  const randomAxis = useCallback(() => {
    const dirs = [
      [0, 1], [1, 0], [0, -1], [-1, 0],
      [0.7071, 0.7071], [0.7071, -0.7071], [-0.7071, 0.7071], [-0.7071, -0.7071],
    ];
    let i = Math.floor(Math.random() * dirs.length);
    if (i === lastAxisIdx.current) i = (i + 1) % dirs.length;
    lastAxisIdx.current = i;
    axis.current = { x: dirs[i][0], y: dirs[i][1] };
  }, []);

  /** Finish a flip: bake the rotation by swapping which face is up and resetting to 0. */
  const settle = useCallback(() => {
    const k = Math.round(flipState.current.deg / 180);
    if (Math.abs(k) % 2 === 1) showing.current = showing.current === 'front' ? 'back' : 'front';
    flipState.current.deg = 0;
    apply();
    // The quote face is hidden again: line up a different quote for its next appearance.
    if (showing.current === 'front') {
      setQuoteIdx((prev) => {
        const next = Math.floor(Math.random() * (quotes.length - 1));
        return next >= prev ? next + 1 : next;
      });
    }
  }, [apply]);

  const clearTimer = useCallback(() => {
    barAnim.current?.cancel();
    barAnim.current = null;
    if (timer.current !== null) {
      window.clearTimeout(timer.current);
      timer.current = null;
    }
  }, []);

  const flipTo = useCallback(
    (target: number, seconds: number) => {
      tween.current?.kill();
      tween.current = gsap.to(flipState.current, {
        deg: target,
        duration: seconds,
        ease: 'power3.inOut',
        onUpdate: apply,
        onComplete: () => {
          tween.current = null;
          settle();
          scheduleAutoRef.current();
        },
      });
    },
    [apply, settle],
  );

  const scheduleAutoRef = useRef<() => void>(() => {});
  const scheduleAuto = useCallback(() => {
    clearTimer();
    if (reducedMotion || document.hidden || hovering.current || drag.current) return;
    // The card border fills clockwise over the wait, then the card flips.
    barAnim.current = stageRef.current?.animate(
      [{ '--flip-progress': '0%' }, { '--flip-progress': '100%' }],
      { duration: AUTO_FLIP_MS, easing: 'linear', fill: 'forwards' },
    ) ?? null;
    timer.current = window.setTimeout(() => {
      timer.current = null;
      if (hovering.current || drag.current || tween.current) return;
      randomAxis();
      flipState.current.deg = 0;
      flipTo(180, FLIP_SECONDS);
    }, AUTO_FLIP_MS);
  }, [clearTimer, flipTo, reducedMotion, randomAxis]);
  scheduleAutoRef.current = scheduleAuto;

  /** Flip from the side/corner that was pressed (offset from the centre), or randomly. */
  const manualFlip = useCallback(
    (nx = 0, ny = 0) => {
      clearTimer();
      tween.current?.kill();
      const len = Math.hypot(nx, ny);
      if (len > 0.25) {
        // axis perpendicular to the pressed offset => that corner swings away
        axis.current = { x: -ny / len, y: nx / len };
      } else {
        randomAxis();
      }
      flipState.current.deg = 0;
      flipTo(180, reducedMotion ? 0.4 : FLIP_SECONDS * 0.8);
    },
    [clearTimer, flipTo, reducedMotion, randomAxis],
  );

  // Start the auto-flip clock, and pause everything while the tab is hidden.
  useEffect(() => {
    scheduleAuto();
    const onVisibility = () => {
      if (document.hidden) {
        clearTimer();
        tween.current?.pause();
      } else {
        if (tween.current) tween.current.resume();
        else scheduleAuto();
      }
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      clearTimer();
      tween.current?.kill();
    };
  }, [scheduleAuto, clearTimer]);


  /* ----------------------------- pointer handling ---------------------------- */

  const setGlare = (e: PointerEvent) => {
    const el = stageRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width;
    const ny = (e.clientY - r.top) / r.height;
    el.style.setProperty('--mx', `${(nx * 100).toFixed(1)}%`);
    el.style.setProperty('--my', `${(ny * 100).toFixed(1)}%`);
    if (!reducedMotion && !drag.current) {
      const cx = Math.max(-1, Math.min(1, nx * 2 - 1));
      const cy = Math.max(-1, Math.min(1, ny * 2 - 1));
      tiltY.set(cx * MAX_TILT_Y);
      tiltX.set(-cy * MAX_TILT_X);
    }
  };

  const onPointerEnter = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    hovering.current = true;
    clearTimer();
    lift.set(reducedMotion ? 1 : 1.03);
    stageRef.current?.setAttribute('data-hover', 'true');
  };

  const onPointerLeave = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    hovering.current = false;
    tiltX.set(0);
    tiltY.set(0);
    lift.set(1);
    stageRef.current?.removeAttribute('data-hover');
    if (!drag.current && !tween.current) scheduleAuto();
  };

  const onPointerDown = (e: PointerEvent) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    drag.current = { x: e.clientX, y: e.clientY, moved: false, id: e.pointerId };
    clearTimer();
  };

  const onPointerMove = (e: PointerEvent) => {
    setGlare(e);
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    const dist = Math.hypot(dx, dy);
    if (!d.moved && dist < DRAG_THRESHOLD_PX) return;
    if (!d.moved) {
      d.moved = true;
      tween.current?.kill();
      tween.current = null;
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      tiltX.set(0);
      tiltY.set(0);
    }
    // Rotate about the axis perpendicular to the drag direction: any direction works.
    axis.current = { x: -dy / dist, y: dx / dist };
    flipState.current.deg = Math.min(dist * DRAG_DEG_PER_PX, 270);
    apply();
  };

  const endDrag = (e: PointerEvent, cancelled = false) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    drag.current = null;
    if (d.moved) {
      flipTo(nearestFace(flipState.current.deg), 0.7);
    } else if (!cancelled) {
      const r = stageRef.current?.getBoundingClientRect();
      if (r) manualFlip(((e.clientX - r.left) / r.width) * 2 - 1, ((e.clientY - r.top) / r.height) * 2 - 1);
      else manualFlip();
    }
    if (e.pointerType !== 'mouse') {
      tiltX.set(0);
      tiltY.set(0);
    }
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (!tween.current) manualFlip();
    }
  };

  return (
    <div className={className} style={{ perspective: 1400 }}>
      <motion.div
        ref={stageRef}
        role="button"
        tabIndex={0}
        aria-label="Developer card. Press to flip between the code view and a developer quote."
        onKeyDown={onKeyDown}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={(e) => endDrag(e, true)}
        className="flip-stage relative cursor-grab select-none rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-blue-light)] active:cursor-grabbing"
        style={{
          transformStyle: 'preserve-3d',
          rotateX: springX,
          rotateY: springY,
          scale: lift,
          touchAction: 'pan-y',
        }}
      >
        {/* Soft ambient glow + contact shadow sit behind the card in Z. */}
        <div aria-hidden="true" className="flip-ambient" />
        <div aria-hidden="true" className="flip-contact" />

        <div ref={flipperRef} className="flip-flipper">

        {/* FRONT */}
        <div ref={frontRef} className="flip-face flip-front" style={{ transform: 'translateZ(1px)' }}>
          {front}
          <div aria-hidden="true" className="flip-glare" />
        </div>

        {/* BACK */}
        <div
          ref={backRef}
          className="flip-face flip-back"
          style={{ transform: 'rotate3d(0, 1, 0, 180deg) translateZ(1px)' }}
          aria-hidden="true"
        >
          {/* Same IDE chrome as the front so both faces read as one card. */}
          <div className="flip-border h-full rounded-2xl p-[2px] shadow-glow-lg">
            <div className="flex h-full flex-col overflow-hidden rounded-[calc(1rem-2px)] bg-background-tertiary">
              <div className="flex items-center gap-2 border-b border-border px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-[#ff5f57]" aria-hidden="true" />
                <span className="h-3 w-3 rounded-full bg-[#febc2e]" aria-hidden="true" />
                <span className="h-3 w-3 rounded-full bg-[#28c840]" aria-hidden="true" />
                <span className="ml-3 font-mono text-xs text-muted">quote.md</span>
              </div>
              <div className="relative min-h-0 flex-1">
                <QuoteBack quote={quotes[quoteIdx]} index={quoteIdx} total={quotes.length} />
              </div>
            </div>
          </div>
          <div aria-hidden="true" className="flip-glare" />
        </div>
        </div>
      </motion.div>
    </div>
  );
}
