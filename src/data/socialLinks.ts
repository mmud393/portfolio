import { Code, Contact, Mail } from 'lucide-react';
import type { SocialLink } from '../types/social';
import { personal } from './personal';

// Note: lucide-react no longer ships brand-specific icons (GitHub, LinkedIn),
// so generic equivalents are used here instead.
export const socialLinks: SocialLink[] = [
  { name: 'GitHub', url: 'https://github.com/mmud393', icon: Code },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/muhammad-moin-ud-din-dev', icon: Contact },
  { name: 'Email', url: `mailto:${personal.email}`, icon: Mail },
];
