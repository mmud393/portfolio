import { Briefcase } from 'lucide-react';
import { personal } from '../../data/personal';
import { GlassCard } from '../common/GlassCard';

export function AvailabilityCard() {
  return (
    <GlassCard className="relative mt-4 flex w-full items-center gap-3 px-4 py-3 sm:absolute sm:-bottom-6 sm:right-0 sm:mt-0 sm:w-[85%] sm:max-w-xs">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-primary text-white">
        <Briefcase size={18} aria-hidden="true" />
      </span>
      <div>
        <p className="flex items-center gap-1.5 text-sm font-semibold text-emerald">
          <span className="h-2 w-2 rounded-full bg-emerald shadow-glow-emerald" aria-hidden="true" />
          {personal.availabilityShort}
        </p>
        <p className="text-xs text-muted">{personal.availabilityDetail}</p>
      </div>
    </GlassCard>
  );
}
