import { Briefcase } from 'lucide-react';
import { personal } from '../../data/personal';
import { GlassCard } from '../common/GlassCard';

export function AvailabilityCard() {
  return (
    <GlassCard className="absolute -bottom-6 left-1/2 flex w-[85%] max-w-xs -translate-x-1/2 items-center gap-3 px-4 py-3 sm:left-auto sm:right-0 sm:translate-x-0">
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
