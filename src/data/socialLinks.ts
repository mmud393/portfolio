import { Code, Contact, X, Camera, Mail } from 'lucide-react';
import type { SocialLink } from '../types/social';
import { personal } from './personal';

// Replace with actual profile URLs.
// Note: lucide-react no longer ships brand-specific icons (GitHub, LinkedIn,
// Instagram), so generic equivalents are used here instead.
export const socialLinks: SocialLink[] = [
  { name: 'GitHub', url: 'https://github.com/', icon: Code },
  { name: 'LinkedIn', url: 'https://linkedin.com/', icon: Contact },
  { name: 'X', url: 'https://x.com/', icon: X },
  { name: 'Instagram', url: 'https://instagram.com/', icon: Camera },
  { name: 'Email', url: `mailto:${personal.email}`, icon: Mail },
];
