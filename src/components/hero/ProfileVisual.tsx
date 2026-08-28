import { Atom, FileCode2, Braces } from 'lucide-react';
import { assets } from '../../data/assets';
import { AvailabilityCard } from './AvailabilityCard';

// Swap the placeholder for a real photo by replacing the file at
// src/assets/images/profile/profile-placeholder.svg (or updating the import
// path in src/data/assets.ts) — no component changes required.

const badges = [
  { icon: Atom, label: 'React', glow: 'shadow-glow-cyan', tone: 'text-cyan-light', className: 'left-0 top-6 sm:-left-6' },
  { icon: Braces, label: 'JavaScript', glow: 'shadow-glow', tone: 'text-blue-light', className: 'right-0 top-1/3 sm:-right-4' },
  { icon: FileCode2, label: 'TypeScript', glow: 'shadow-glow-lg', tone: 'text-violet-light', className: 'left-2 bottom-16 sm:-left-4' },
];

export function ProfileVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[280px] sm:max-w-[380px] lg:max-w-[440px]">
      <div className="pointer-events-none absolute inset-0 animate-orbit rounded-full border border-dashed border-border" />

      <div className="relative aspect-square rounded-[2rem] bg-gradient-conic-tech p-[3px] shadow-[0_0_60px_rgba(99,102,241,0.18)]">
        <div className="h-full w-full overflow-hidden rounded-[calc(2rem-3px)] bg-background-tertiary">
          <img
            src={assets.profile}
            alt="Areeba Raza — placeholder profile portrait, replace with a real photo"
            width={480}
            height={480}
            className="h-full w-full object-cover object-center"
          />
        </div>
      </div>

      {badges.map(({ icon: Icon, label, glow, tone, className }) => (
        <div
          key={label}
          className={`glass absolute flex h-12 w-12 animate-float items-center justify-center rounded-full border border-border sm:h-14 sm:w-14 ${glow} ${tone} ${className}`}
        >
          <Icon size={20} aria-hidden="true" />
          <span className="sr-only">{label}</span>
        </div>
      ))}

      <AvailabilityCard />
    </div>
  );
}
