import chetibraCover from '../assets/images/projects/chetibra/cover.svg';
import carbonConfessionCover from '../assets/images/projects/carbon-confession/cover.svg';

/**
 * Central asset registry. Components import from here instead of reaching
 * into src/assets directly, so swapping a placeholder for a real image only
 * requires changing the file on disk (and this import if the filename changes) —
 * never the components that render it.
 */
export const assets = {
  projects: {
    chetibra: {
      cover: chetibraCover,
      screenshots: [] as string[],
    },
    carbonConfession: {
      cover: carbonConfessionCover,
      screenshots: [] as string[],
    },
    cohere: {
      cover: undefined as string | undefined,
      screenshots: [] as string[],
    },
  },
} as const;
