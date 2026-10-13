

# Areeba Raza — Portfolio

Personal developer portfolio for **Areeba Raza**, Mobile App & Frontend Developer.

## Tech Stack

- **React 18** + **TypeScript** + **Vite**
- **Tailwind CSS** for styling, driven entirely by CSS custom-property design tokens
- **Lucide React** for icons
- Section-reveal animations via `IntersectionObserver` (no animation library)

## Project Structure

```text
src/
├── assets/
│   └── images/
│       ├── profile/            profile-placeholder.svg
│       └── projects/
│           ├── chetibra/            cover.svg
│           ├── carbon-confession/   cover.svg
│           └── marble-cbt/          cover.svg
├── components/
│   ├── layout/         Navbar, Footer, PageContainer
│   ├── common/          Button, GlassCard, SectionHeading, Badge, SocialLinks, IconButton, ScrollReveal
│   ├── hero/            Hero, ProfileVisual, AvailabilityCard
│   ├── about/           About, AboutInfo
│   ├── skills/          Skills, SkillCard
│   ├── projects/        Projects, ProjectCard
│   ├── experience/      Experience, ExperienceItem
│   └── contact/         Contact, ContactCTA
├── data/               personal.ts, navigation.ts, skills.ts, projects.ts, experience.ts, socialLinks.ts, assets.ts
├── hooks/               useActiveSection, useScrollPosition, useMediaQuery, useInView, useTheme
├── styles/              theme.css — centralized color tokens
├── types/               project.ts, skill.ts, experience.ts, social.ts, navigation.ts
├── utils/               cn.ts, constants.ts
└── pages/               Home.tsx
```

`App.tsx` only renders `<Home />` — every section is its own component, and all portfolio content lives in `src/data/*.ts`.

## Development

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
```

## Preview the production build

```bash
npm run preview
```

## Lint

```bash
npm run lint
```

## GitHub Pages Deployment

This project deploys automatically via GitHub Actions (`.github/workflows/deploy.yml`).

1. **Create a GitHub repository** (e.g. `portfolio`) and push this project to it.
2. In `vite.config.ts`, the `repoName` constant is set to `'portfolio'`. If your repository has a different name, update it there (or set the `VITE_BASE_PATH` env var when building, e.g. `VITE_BASE_PATH=/my-repo/ npm run build`).
3. In your repository on GitHub, go to **Settings → Pages** and set **Source** to **GitHub Actions**.
4. Push to the `main` branch — the included workflow builds the site and deploys the `dist/` folder automatically.
5. Your site will be live at `https://USERNAME.github.io/portfolio/`.
6. To update the live site later, just push new commits to `main`; the workflow redeploys automatically.

## Content You Should Replace

All real content is centralized so you don't need to dig through components:

| What | File |
|---|---|
| Name, title, tagline, email, phone, location, resume link | [src/data/personal.ts](src/data/personal.ts) |
| Social profile URLs | [src/data/socialLinks.ts](src/data/socialLinks.ts) |
| Projects (title, description, tech, links, images) | [src/data/projects.ts](src/data/projects.ts) |
| Work experience | [src/data/experience.ts](src/data/experience.ts) |
| Skills list | [src/data/skills.ts](src/data/skills.ts) |
| Navigation links | [src/data/navigation.ts](src/data/navigation.ts) |
| Profile photo | Replace `src/assets/images/profile/profile-placeholder.svg` with your photo (e.g. `profile.webp`) and update the import path in [src/data/assets.ts](src/data/assets.ts) — no component changes needed |
| Project cover images | Replace each project's `cover.svg` under `src/assets/images/projects/<project>/` (e.g. with `cover.webp`) and update the import path in [src/data/assets.ts](src/data/assets.ts) |
| Project screenshots (gallery, for future use) | Add files alongside each project's cover and push their imports into that project's `screenshots` array in `assets.ts` |
| Open Graph / social preview image | Add `public/og-image.png` (1200×630 recommended) — referenced in `index.html` but not included by default |
| Favicon | `public/favicon.svg` |
| Resume/CV file | Host a PDF (e.g. in `public/`) and point `resumeUrl` in `personal.ts` to it |

## Notes

- **Icons**: `lucide-react` no longer ships dedicated brand icons for GitHub/LinkedIn/Instagram, so generic equivalents (`Code`, `Contact`, `Camera`) are used for those social links — swap in your own SVGs if you want literal brand marks.
- **Placeholder images**: the profile portrait and all three project covers are generated SVG mockups (not real photos/screenshots), built to match this portfolio's color system and each project's subject matter. They're clearly placeholders — replace them per the table above once you have real assets.
- **Color system**: every color used in the UI is a CSS custom property defined once in [src/styles/theme.css](src/styles/theme.css) and mapped into Tailwind via [tailwind.config.js](tailwind.config.js). Change a value there to re-theme the whole site.
- **No backend / contact form**: the Contact section uses a `mailto:` link, per the "no unnecessary backend code" requirement.
- **No environment variables** are required or used — nothing sensitive lives in this frontend.
- **Theme**: dark by default, with a light theme toggle persisted to `localStorage` and initialized from the system preference.
