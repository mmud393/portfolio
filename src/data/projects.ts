import type { Project } from '../types/project';
import { assets } from './assets';

export const projects: Project[] = [
  {
    id: 'chetibra',
    title: 'Chetibra',
    description:
      'A community app for cyclists to connect, share routes and participate in events.',
    cover: assets.projects.chetibra.cover,
    imagePosition: 'center',
    screenshots: assets.projects.chetibra.screenshots,
    technologies: ['React Native', 'Firebase', 'Maps'],
    links: {
      github: undefined,
      live: undefined,
    },
  },
  {
    id: 'carbon-confession',
    title: 'Carbon Confession',
    description:
      'Calculate your carbon footprint, offset it, and earn badges for a better planet.',
    cover: assets.projects.carbonConfession.cover,
    imagePosition: 'center',
    screenshots: assets.projects.carbonConfession.screenshots,
    technologies: ['React Native', 'Stripe', 'Firebase'],
    links: {
      github: undefined,
      live: undefined,
    },
  },
  {
    id: 'marble-cbt',
    title: 'Marble CBT',
    description: 'Mental health & CBT based app to support and guide users.',
    cover: assets.projects.marbleCbt.cover,
    imagePosition: 'center',
    screenshots: assets.projects.marbleCbt.screenshots,
    technologies: ['React Native', 'Firebase', 'In-App Purchases'],
    links: {
      github: undefined,
      live: undefined,
    },
  },
];
