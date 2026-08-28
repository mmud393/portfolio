import type { LucideIcon } from 'lucide-react';
import { User, Briefcase, Mail, Phone, MapPin, CheckCircle2 } from 'lucide-react';
import { personal } from '../../data/personal';
import { cn } from '../../utils/cn';

interface InfoItem {
  icon: LucideIcon;
  label: string;
  value: string;
  positive?: boolean;
}

const items: InfoItem[] = [
  { icon: User, label: 'Name', value: personal.name },
  { icon: Briefcase, label: 'Experience', value: personal.experienceYears },
  { icon: Mail, label: 'Email', value: personal.email },
  { icon: Phone, label: 'Phone', value: personal.phone },
  { icon: MapPin, label: 'Location', value: personal.location },
  { icon: CheckCircle2, label: 'Availability', value: personal.availability, positive: true },
];

export function AboutInfo() {
  return (
    <dl className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
      {items.map(({ icon: Icon, label, value, positive }) => (
        <div key={label} className="flex items-start gap-3">
          <span className="glass mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border text-muted">
            <Icon size={18} aria-hidden="true" />
          </span>
          <div>
            <dt className={cn('text-sm font-medium', positive ? 'text-emerald' : 'text-blue-light')}>
              {label}
            </dt>
            <dd className="text-base text-foreground">{value}</dd>
          </div>
        </div>
      ))}
    </dl>
  );
}
