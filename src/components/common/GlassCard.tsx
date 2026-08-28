import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/cn';

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  glow?: boolean;
  featured?: boolean;
  as?: 'div' | 'article';
}

export function GlassCard({
  children,
  className,
  glow = false,
  featured = false,
  as = 'div',
  ...props
}: GlassCardProps) {
  const Component = as;
  return (
    <Component
      className={cn(
        'glass rounded-xl border transition-all duration-300',
        featured ? 'border-border-featured' : 'border-border',
        'hover:border-border-hover hover:bg-surface-hover',
        glow && 'hover:shadow-glow',
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
