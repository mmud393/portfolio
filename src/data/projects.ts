import type { Project } from '../types/project';
import { projectAssets } from './assets';

const projectData: Project[] = [
  {
    id: 'carbon-confession',
    title: 'Carbon Confession',
    description:
      'Works out your carbon footprint and lets you pay to offset it. Every offset earns a shareable "forgiven" badge.',
    imagePosition: 'center',
    technologies: ['React Native', 'Expo', 'Firebase', 'Stripe', 'Redux Toolkit'],
    links: {
      appStore: 'https://apps.apple.com/us/app/carbon-confession/id6756328564',
      playStore: 'https://play.google.com/store/apps/details?id=com.carbon.confession',
    },
  },
  {
    id: 'coaching-platform',
    title: 'Coaching Business Platform',
    description:
      'A business and community app for coaches, healers and service providers to manage their practice and their clients.',
    imagePosition: 'center',
    technologies: ['React Native', 'TypeScript', 'Firebase', 'Twilio', 'Real-time Chat'],
  },
  {
    id: 'chetibra',
    title: 'Chetibra',
    description:
      'A social app for cyclists. Find rides nearby, organise group events and share routes.',
    imagePosition: 'center',
    technologies: ['React Native', 'Redux', 'Mapbox', 'Firebase'],
    links: {
      appStore: 'https://apps.apple.com/us/app/chetibra-eventi-e-gps-bici/id6575379919',
      playStore: 'https://play.google.com/store/apps/details?id=com.chetibra.workout',
    },
  },
  {
    id: 'silverlinjen',
    title: 'Silverlinjen',
    description:
      'A bus booking website for routes between Stockholm, Kalmar and Öland, with an admin panel and a driver app.',
    imagePosition: 'center',
    technologies: ['React Native', 'React', 'TypeScript'],
    links: {
      live: 'https://silverlinjen.se',
      appStore: 'https://apps.apple.com/us/app/driverapp/id6745412666',
    },
  },
  {
    id: 'gamechanger',
    title: 'Gamechanger',
    description:
      'A mobile app for Accelerate Equality, available on Google Play.',
    imagePosition: 'center',
    technologies: ['React Native'],
    links: {
      playStore: 'https://play.google.com/store/apps/details?id=com.accelerateequality.gamechanger',
    },
  },
  {
    id: 'dynamics-plus-max',
    title: 'Dynamics Plus Max',
    description:
      'Three connected apps (Customer, Resource and Support) for reporting faults, tracking bookings and handling work orders and assets.',
    imagePosition: 'center',
    technologies: ['React Native'],
    links: {
      additional: [
        {
          label: 'Customer app',
          url: 'https://play.google.com/store/apps/details?id=com.dynamicspluscustomer',
          platform: 'android',
        },
        {
          label: 'Resource app',
          url: 'https://play.google.com/store/apps/details?id=com.dynamicsplusresource',
          platform: 'android',
        },
        {
          label: 'Support app',
          url: 'https://play.google.com/store/apps/details?id=com.dynamicsplussupport',
          platform: 'android',
        },
      ],
    },
  },
  {
    id: 'minifarms',
    title: 'Minifarms',
    description:
      'An online farmers market. Browse local produce, order boxes and save favourites on the web, iOS or Android.',
    imagePosition: 'center',
    technologies: ['React Native', 'React'],
    links: {
      live: 'https://minifarms.com.au/',
      appStore: 'https://apps.apple.com/au/app/minifarms/id1566107935',
      playStore: 'https://play.google.com/store/apps/details?id=com.fishvision.minifarms',
    },
  },
  {
    id: 'marbles-cbt',
    title: 'Marbles CBT',
    description:
      'A companion app for cognitive behavioural therapy, with thought challenges, exposure tracking and relaxation exercises.',
    imagePosition: 'center',
    technologies: ['React Native'],
    links: {
      appStore: 'https://apps.apple.com/il/app/marbles-cbt/id1527560798',
      playStore: 'https://play.google.com/store/apps/details?id=com.omrisadeh.marblescbt',
    },
  },
  {
    id: 'avap-crevalcore',
    title: 'Pubblica Assistenza Crevalcore',
    description:
      'An app for the volunteers of Pubblica Assistenza Crevalcore. Members get emergency alerts and confirm whether they are available.',
    imagePosition: 'center',
    technologies: ['React Native'],
    links: {
      appStore: 'https://apps.apple.com/dk/app/pubblica-assistenza-crevalcore/id6612030217',
      playStore: 'https://play.google.com/store/apps/details?id=avap.crevalcore',
    },
  },
  {
    id: 'fitai',
    title: 'FitAi',
    description:
      'A fitness app that estimates calories and macros from a photo of your meal, and logs workouts and progress.',
    imagePosition: 'center',
    technologies: ['React Native'],
    links: {
      playStore: 'https://play.google.com/store/apps/details?id=com.flaggy.fitai',
    },
  },
  {
    id: 'drive-lah',
    title: 'Car Sharing Booking App',
    description:
      'A car sharing app for finding, booking and unlocking cars.',
    imagePosition: 'center',
    technologies: ['React Native'],
  },
  {
    id: 'wrestletalk',
    title: 'Wrestletalk',
    description:
      'The magazine app for Wrestletalk. Download the latest issue, browse back issues and subscribe.',
    imagePosition: 'center',
    technologies: ['React Native'],
    links: {
      appStore: 'https://apps.apple.com/us/app/wrestletalk-magazine/id406350122',
      playStore: 'https://play.google.com/store/apps/details?id=com.triactivemedia.fightingspiritmagazine',
    },
  },
  {
    id: 'octavio',
    title: 'Octavio',
    description:
      'An app for home-service businesses to schedule jobs, send payment links and auto-reply to customer texts.',
    imagePosition: 'center',
    technologies: ['React Native'],
    links: {
      appStore: 'https://apps.apple.com/us/app/octavio-app/id6471650500',
      playStore: 'https://play.google.com/store/apps/details?id=com.lestatega.OctavioMobile',
    },
  },
  {
    id: 'gotone',
    title: 'GotOne',
    description:
      'A fishing log. Tap to record a catch with its size, location, weather and moon phase, then review it in charts.',
    imagePosition: 'center',
    technologies: ['React Native'],
    links: {
      appStore: 'https://apps.apple.com/us/app/gotone/id6443849200',
      playStore: 'https://play.google.com/store/apps/details?id=com.gotone.media',
    },
  },
];

/** Projects with a real cover image come first; original order is kept within each group. */
const sortedProjects: Project[] = projectData
  .map((project) => {
    const { hasImage, ...assets } = projectAssets(project.id);
    return { project: { ...project, ...assets }, hasImage };
  })
  .sort((a, b) => Number(b.hasImage) - Number(a.hasImage))
  .map(({ project }) => project);

/** Manual placement applied after sorting: project id → 1-based position. */
const PINNED_POSITIONS: Record<string, number> = { chetibra: 12 };

export const projects: Project[] = Object.entries(PINNED_POSITIONS).reduce((list, [id, position]) => {
  const from = list.findIndex((project) => project.id === id);
  if (from === -1) return list;
  const next = [...list];
  const [moved] = next.splice(from, 1);
  next.splice(position - 1, 0, moved);
  return next;
}, sortedProjects);
