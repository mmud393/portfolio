import {
  Smartphone,
  Atom,
  Layers,
  FileCode2,
  Braces,
  Flame,
  GitBranch,
  Rocket,
  Server,
  Cloud,
  Database,
  Gauge,
} from 'lucide-react';
import type { Skill } from '../types/skill';

export const skills: Skill[] = [
  { id: 'react-native', name: 'React Native', icon: Smartphone },
  { id: 'react', name: 'React.js', icon: Atom },
  { id: 'nextjs', name: 'Next.js', icon: Layers },
  { id: 'typescript', name: 'TypeScript', icon: FileCode2 },
  { id: 'javascript', name: 'JavaScript', icon: Braces },
  { id: 'nodejs', name: 'Node.js', icon: Server },
  { id: 'firebase', name: 'Firebase', icon: Flame },
  { id: 'aws', name: 'AWS', icon: Cloud },
  { id: 'mysql-mongodb', name: 'MySQL / MongoDB', icon: Database },
  { id: 'git', name: 'Git', icon: GitBranch },
  { id: 'expo', name: 'Expo / EAS', icon: Rocket },
  { id: 'performance', name: 'Performance Optimization', icon: Gauge },
];
