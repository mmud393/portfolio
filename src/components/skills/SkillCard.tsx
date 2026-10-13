import { useRef, type PointerEvent } from 'react';
import type { Skill } from '../../types/skill';

interface SkillCardProps {
  skill: Skill;
}

const MAX_TILT = 12;

/** Glass tile that tilts toward the pointer and lights up under it. */
export function SkillCard({ skill }: SkillCardProps) {
  const Icon = skill.icon;
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || e.pointerType === 'touch') return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty('--mx', `${px * 100}%`);
    el.style.setProperty('--my', `${py * 100}%`);
    el.style.transform = `perspective(600px) rotateX(${(0.5 - py) * MAX_TILT}deg) rotateY(${(px - 0.5) * MAX_TILT}deg) translateY(-4px) scale(1.04)`;
  };

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = '';
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="group glass relative h-full overflow-hidden rounded-xl border border-border transition-[transform,border-color,box-shadow] duration-200 ease-out hover:border-border-featured hover:shadow-glow"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* spotlight that follows the pointer */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(160px circle at var(--mx, 50%) var(--my, 50%), color-mix(in srgb, var(--color-cyan) 30%, transparent), transparent 70%)',
        }}
      />
      {/* shine sweep */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -translate-x-full -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-[transform,opacity] duration-700 ease-out group-hover:translate-x-[400%] group-hover:opacity-100"
      />

      <div className="relative flex h-full flex-col items-center justify-center gap-3 px-4 py-6 text-center">
        <span className="glass flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border text-cyan-light transition-[transform,background-color,border-color,color] duration-300 group-hover:-translate-y-1 group-hover:scale-110 group-hover:-rotate-6 group-hover:border-transparent group-hover:bg-gradient-primary group-hover:text-white">
          <Icon size={24} aria-hidden="true" />
        </span>
        <span className="text-sm font-medium leading-snug text-foreground transition-transform duration-300 group-hover:translate-y-0.5">
          {skill.name}
        </span>
      </div>
    </div>
  );
}
