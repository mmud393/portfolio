import type { Skill } from '../../types/skill';
import { GlassCard } from '../common/GlassCard';

interface SkillCardProps {
  skill: Skill;
}

export function SkillCard({ skill }: SkillCardProps) {
  const Icon = skill.icon;

  return (
    <GlassCard
      glow
      className="group flex h-full flex-col items-center justify-center gap-3 px-4 py-6 text-center hover:-translate-y-1"
    >
      <span className="glass flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border text-cyan-light transition-colors group-hover:border-transparent group-hover:bg-gradient-primary group-hover:text-white">
        <Icon size={24} aria-hidden="true" />
      </span>
      <span className="text-sm font-medium leading-snug text-foreground">{skill.name}</span>
    </GlassCard>
  );
}
