/**
 * Central asset registry. Images are discovered from folders at build time, so
 * adding or replacing an image is just a file drop — no code changes:
 *
 *   src/assets/images/profile/profile.(png|jpg|jpeg|webp|svg)
 *   src/assets/images/projects/<project-id>/cover.(png|jpg|jpeg|webp|svg)
 *   src/assets/images/projects/<project-id>/screenshots/*.(png|jpg|jpeg|webp|svg)
 *
 * `<project-id>` must match the `id` of the entry in data/projects.ts.
 * A project without a cover falls back to its placeholder.svg and is flagged
 * `hasImage: false`, so the list can show projects with real images first.
 */

type ImageModules = Record<string, string>;

const EXT_PRIORITY = ['png', 'jpg', 'jpeg', 'webp', 'svg'];

const projectCovers = import.meta.glob<string>(
  '../assets/images/projects/*/cover.{png,jpg,jpeg,webp,svg}',
  { eager: true, query: '?url', import: 'default' },
) as ImageModules;
const projectPlaceholders = import.meta.glob<string>('../assets/images/projects/*/placeholder.svg', {
  eager: true,
  query: '?url',
  import: 'default',
}) as ImageModules;
const projectScreenshots = import.meta.glob<string>(
  '../assets/images/projects/*/screenshots/*.{png,jpg,jpeg,webp,svg}',
  { eager: true, query: '?url', import: 'default' },
) as ImageModules;
const profileImages = import.meta.glob<string>(
  '../assets/images/profile/*.{png,jpg,jpeg,webp,svg}',
  { eager: true, query: '?url', import: 'default' },
) as ImageModules;

const extRank = (path: string) => {
  const rank = EXT_PRIORITY.indexOf(path.split('.').pop()!.toLowerCase());
  return rank === -1 ? EXT_PRIORITY.length : rank;
};

const byPreference = (a: string, b: string) => extRank(a) - extRank(b) || a.localeCompare(b);

export function projectAssets(projectId: string): {
  cover?: string;
  hasImage: boolean;
  screenshots: string[];
} {
  const folder = `../assets/images/projects/${projectId}/`;
  const cover = Object.keys(projectCovers)
    .filter((p) => p.startsWith(folder))
    .sort(byPreference)[0];
  const screenshots = Object.keys(projectScreenshots)
    .filter((p) => p.startsWith(`${folder}screenshots/`))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  const placeholder = projectPlaceholders[`${folder}placeholder.svg`];

  return {
    cover: cover ? projectCovers[cover] : placeholder,
    hasImage: Boolean(cover),
    screenshots: screenshots.map((p) => projectScreenshots[p]),
  };
}

const profilePaths = Object.keys(profileImages).sort((a, b) => {
  const aIsProfile = /\/profile\.[a-z]+$/i.test(a) ? 0 : 1;
  const bIsProfile = /\/profile\.[a-z]+$/i.test(b) ? 0 : 1;
  return aIsProfile - bIsProfile || byPreference(a, b);
});

export const profileImage: string | undefined = profilePaths[0]
  ? profileImages[profilePaths[0]]
  : undefined;
