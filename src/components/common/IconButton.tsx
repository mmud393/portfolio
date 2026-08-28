import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

const baseStyles =
  'glass inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-all duration-300 hover:border-border-hover hover:text-blue-light hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue';

interface CommonProps {
  icon: LucideIcon;
  label: string;
  className?: string;
}

type IconButtonAsButton = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type IconButtonAsAnchor = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export type IconButtonProps = IconButtonAsButton | IconButtonAsAnchor;

export function IconButton({ icon: Icon, label, className, ...props }: IconButtonProps) {
  const classes = cn(baseStyles, className);

  if ('href' in props && props.href) {
    const isExternal = props.href.startsWith('http') || props.href.startsWith('mailto:');
    return (
      <a
        className={classes}
        aria-label={label}
        {...props}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
      >
        <Icon size={18} aria-hidden="true" />
      </a>
    );
  }

  return (
    <button
      className={classes}
      aria-label={label}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      <Icon size={18} aria-hidden="true" />
    </button>
  );
}
