import { useEffect, useRef } from 'react';
import { CursorEffects } from './CursorEffects';
import type { CursorEffectsOptions } from './cursorEffectsConfig';

/** Mounts the fixed, non-interactive cursor effect layer behind page content. */
export function CursorEffectsLayer(props: Partial<CursorEffectsOptions>) {
  const hostRef = useRef<HTMLDivElement>(null);
  const propsRef = useRef(props);
  propsRef.current = props;
  const { enabled = true, respectReducedMotion = true } = props;

  useEffect(() => {
    const host = hostRef.current;
    if (!host || !enabled) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    let fx: CursorEffects | null = null;

    const sync = () => {
      const blocked = respectReducedMotion && mq.matches;
      if (blocked && fx) {
        fx.destroy();
        fx = null;
      } else if (!blocked && !fx) {
        fx = new CursorEffects(host, propsRef.current);
      }
    };
    sync();
    mq.addEventListener('change', sync);
    return () => {
      mq.removeEventListener('change', sync);
      fx?.destroy();
      fx = null;
    };
  }, [enabled, respectReducedMotion]);

  return <div ref={hostRef} />;
}
