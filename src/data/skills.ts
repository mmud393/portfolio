import {
  Smartphone,
  Atom,
  Layers,
  FileCode2,
  Braces,
  Flame,
  RefreshCcw,
  Wind,
  GitBranch,
  Rocket,
  Globe,
  CreditCard,
} from 'lucide-react';
import type { Skill } from '../types/skill';

export const skills: Skill[] = [
  { id: 'react-native', name: 'React Native', icon: Smartphone },
  { id: 'react', name: 'React.js', icon: Atom },
  { id: 'nextjs', name: 'Next.js', icon: Layers },
  { id: 'typescript', name: 'TypeScript', icon: FileCode2 },
  { id: 'javascript', name: 'JavaScript', icon: Braces },
  { id: 'firebase', name: 'Firebase', icon: Flame },
  { id: 'redux', name: 'Redux', icon: RefreshCcw },
  { id: 'tailwind', name: 'Tailwind CSS', icon: Wind },
  { id: 'git', name: 'Git', icon: GitBranch },
  { id: 'expo', name: 'Expo', icon: Rocket },
  { id: 'rest-apis', name: 'REST APIs', icon: Globe },
  { id: 'stripe', name: 'Stripe', icon: CreditCard },
];
