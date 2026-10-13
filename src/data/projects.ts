import type { Project } from '../types/project';
import { projectAssets } from './assets';

const projectData: Project[] = [
  {
    id: 'carbon-confession',
    title: 'Carbon Confession',
    description:
      'Calculate your carbon footprint, pay to offset your daily "sins," and earn shareable "forgiven" badges — turning eco-guilt into action with a fun, ironic twist.',
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
      'An all-in-one business management and community platform built for coaches, healers, and service providers to run, market, and scale their practices.',
    imagePosition: 'center',
    technologies: ['React Native', 'TypeScript', 'Firebase', 'Twilio', 'Real-time Chat'],
    links: {
      appStore: 'https://apps.apple.com/sa/app/id6443923498',
      playStore: 'https://play.google.com/store/apps/details?id=com.cohere.live',
    },
  },
  {
    id: 'chetibra',
    title: 'Chetibra',
    description:
      'A community app for cyclists to connect, ride, and share routes — create events, challenge friends, and discover new itineraries with fellow cyclists.',
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
      'A web platform with an admin dashboard and a companion driver mobile app, covering the full flow from customer-facing site to day-to-day driver operations.',
    imagePosition: 'center',
    technologies: ['React Native', 'React', 'TypeScript'],
    links: {
      live: 'https://silverlinjen.se',
      admin: 'https://admin.silverlinjen.se',
      appStore: 'https://apps.apple.com/us/app/driverapp/id6745412666',
    },
  },
  {
    id: 'gamechanger',
    title: 'Gamechanger',
    description: 'A mobile app by Accelerate Equality, built and published for Android.',
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
      'A suite of three connected mobile apps — Customer, Resource and Support — serving each side of a service platform from one codebase approach.',
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
    description: "An online farmers market for fresh local produce — a web app plus iOS and Android apps for browsing the catalogue, ordering boxes and saving favourites.",
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
    description: 'A cognitive behavioural therapy companion app for iOS and Android.',
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
    description: 'A volunteer coordination app for Pubblica Assistenza Crevalcore — members receive emergency and pre-alert notifications and confirm their availability in real time.',
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
    description: 'An AI-powered fitness app — snap a photo of a meal to get calories and macros, log workouts set by set, and track weight and streaks over time.',
    imagePosition: 'center',
    technologies: ['React Native'],
    links: {
      playStore: 'https://play.google.com/store/apps/details?id=com.flaggy.fitai',
    },
  },
  {
    id: 'trick-and-treats',
    title: 'Trick and Treats',
    description: 'A consumer mobile app published on both the App Store and Google Play.',
    imagePosition: 'center',
    technologies: ['React Native'],
    links: {
      appStore: 'https://apps.apple.com/gb/app/trick-and-treats/id1630161563',
      playStore: 'https://play.google.com/store/apps/details?id=com.trickandtreats',
    },
  },
  {
    id: 'drive-lah',
    title: 'Car Sharing Booking App',
    description: 'A car-sharing marketplace app for browsing, booking and unlocking cars.',
    imagePosition: 'center',
    technologies: ['React Native'],
    links: {
      appStore: 'https://apps.apple.com/us/app/drive-lah/id1500770324',
      playStore: 'https://play.google.com/store/apps/details?id=com.drivelah.drivelah',
    },
  },
  {
    id: 'wrestletalk',
    title: 'Wrestletalk',
    description: 'The digital magazine app for Wrestletalk — download the latest issue, browse back issues, subscribe, and read offline from your personal library.',
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
    description: 'A mobile app published on both the App Store and Google Play.',
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
    description: 'A media-focused mobile app published on both the App Store and Google Play.',
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
