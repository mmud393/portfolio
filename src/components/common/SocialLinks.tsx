import { socialLinks } from '../../data/socialLinks';
import { IconButton } from './IconButton';
import { cn } from '../../utils/cn';

interface SocialLinksProps {
  className?: string;
}

export function SocialLinks({ className }: SocialLinksProps) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      {socialLinks.map((link) => (
        <IconButton key={link.name} icon={link.icon} label={link.name} href={link.url} />
      ))}
    </div>
  );
}
