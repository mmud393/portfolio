import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';

interface BadgeProps {
  children: ReactNode;
  className?: string;
}

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'glass inline-flex items-center rounded-full border border-border px-3 py-1 text-xs font-medium text-muted',
        className,
      )}
    >
      {children}
    </span>
  );
}
