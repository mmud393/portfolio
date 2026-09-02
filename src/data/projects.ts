import type { Project } from '../types/project';
import { assets } from './assets';

export const projects: Project[] = [
  {
    id: 'carbon-confession',
    title: 'Carbon Confession',
    description:
      'Calculate your carbon footprint, pay to offset your daily "sins," and earn shareable "forgiven" badges — turning eco-guilt into action with a fun, ironic twist.',
    cover: assets.projects.carbonConfession.cover,
    imagePosition: 'center',
    screenshots: assets.projects.carbonConfession.screenshots,
    technologies: ['React Native', 'Expo', 'Firebase', 'Stripe', 'Redux Toolkit'],
    links: {
      github: undefined,
      live: undefined,
    },
  },
  {
    id: 'cohere',
    title: 'Cohere',
    description:
      'An all-in-one business management and community platform built for coaches, healers, and service providers to run, market, and scale their practices.',
    cover: assets.projects.cohere.cover,
    imagePosition: 'center',
    screenshots: assets.projects.cohere.screenshots,
    technologies: ['React Native', 'TypeScript', 'Firebase', 'Twilio', 'Real-time Chat'],
    links: {
      github: undefined,
      live: undefined,
    },
  },
  {
    id: 'chetibra',
    title: 'Chetibra',
    description:
      'A community app for cyclists to connect, ride, and share routes — create events, challenge friends, and discover new itineraries with fellow cyclists.',
    cover: assets.projects.chetibra.cover,
    imagePosition: 'center',
    screenshots: assets.projects.chetibra.screenshots,
    technologies: ['React Native', 'Redux', 'Mapbox', 'Firebase'],
    links: {
      github: undefined,
      live: undefined,
    },
  },
];
