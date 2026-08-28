import type { Experience } from '../../types/experience';
import { Badge } from '../common/Badge';

interface ExperienceItemProps {
  item: Experience;
  isLast: boolean;
}

export function ExperienceItem({ item, isLast }: ExperienceItemProps) {
  return (
    <li className="relative pl-10">
      <span className="absolute left-0 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-primary shadow-glow">
        <span className="h-2 w-2 rounded-full bg-background" aria-hidden="true" />
      </span>
      {!isLast && <span className="absolute left-[9px] top-7 h-[calc(100%+1.5rem)] w-px bg-border" aria-hidden="true" />}

      <h3 className="text-lg font-semibold text-foreground">{item.role}</h3>
      <p className="mt-1 text-sm font-medium text-blue-light">
        {item.company} <span className="text-muted">• {item.period}</span>
      </p>
      <p className="mt-3 text-sm leading-relaxed text-foreground-secondary">{item.description}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {item.technologies.map((tech) => (
          <Badge key={tech}>{tech}</Badge>
        ))}
      </div>
    </li>
  );
}
