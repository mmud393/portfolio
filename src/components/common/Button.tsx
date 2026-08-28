import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/cn';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost';

const variantStyles: Record<Variant, string> = {
  primary:
    'bg-gradient-primary text-white shadow-glow hover:brightness-110 hover:shadow-glow-lg',
  secondary: 'glass text-foreground border border-border hover:border-border-hover',
  outline: 'bg-transparent text-foreground border border-border hover:glass hover:border-border-hover',
  ghost: 'bg-transparent text-foreground hover:glass',
};

const baseStyles =
  'inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue active:scale-[0.98]';

interface CommonProps {
  variant?: Variant;
  children: ReactNode;
  className?: string;
}

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsAnchor = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsAnchor;

export function Button({ variant = 'primary', className, children, ...props }: ButtonProps) {
  const classes = cn(baseStyles, variantStyles[variant], className);

  if ('href' in props && props.href) {
    const isExternal = props.href.startsWith('http') || props.href.startsWith('mailto:');
    return (
      <a
        className={classes}
        {...props}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
