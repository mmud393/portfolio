Absolutely. For Claude, I would give it a **much more structured engineering prompt** so it builds the portfolio as a real production-quality React project rather than putting everything into `App.jsx`.

This version covers **architecture, folder structure, components, data layer, routing, animations, responsive design, accessibility, SEO, GitHub Pages, deployment, assets, configuration, code quality, and future scalability**.

# Build a Production-Quality React Developer Portfolio

You are a senior React.js frontend engineer and UI/UX engineer.

I want you to build my **complete personal developer portfolio website in React.js** based on the attached/reference design.

This is NOT a request for a simple demo or a single-page HTML mockup.

Build it as a **real production-quality React project** with clean architecture, reusable components, maintainable code, responsive design, accessibility, SEO, animations, optimized assets, and GitHub Pages deployment support.

---

# 1. Main Goal

Create a premium personal portfolio for:

**Areeba Raza**

Professional title:

**Mobile App & Frontend Developer**

The portfolio should communicate that I am an experienced developer specializing in:

* React Native
* React.js
* Next.js
* JavaScript
* TypeScript
* Expo
* Firebase
* Redux
* REST APIs
* Stripe
* Maps
* Push Notifications
* Real-time Chat
* Mobile application development
* Frontend development

The website should feel:

* Modern
* Premium
* Professional
* Developer-focused
* Futuristic
* Clean
* Fast
* Responsive
* Elegant
* Visually impressive

Avoid making it look like a generic portfolio template.

---

# 2. Reference Design

Use the attached/reference image as the primary visual inspiration.

The design language should include:

* Dark navy/black background
* Purple/blue/cyan gradients
* Green accent colors
* Glassmorphism
* Subtle glowing borders
* Rounded cards
* Soft shadows
* Gradient typography
* Large hero typography
* Premium spacing
* Minimal but meaningful animations
* Modern developer aesthetic

Do NOT blindly copy every pixel.

Improve the design where appropriate while maintaining the same overall visual language.

The final result should look like a portfolio someone could realistically use professionally.

---

# 3. Technology Stack

Use:

### Core

* React.js
* Vite
* TypeScript preferred

### Styling

Use:

* Tailwind CSS
* CSS variables where useful
* Custom CSS for effects that are difficult or cleaner to implement outside Tailwind

### Icons

Use:

* Lucide React

Do not manually create SVG icons unless necessary.

### Animations

Prefer:

* CSS transitions
* CSS keyframes
* IntersectionObserver

You may use Framer Motion if it materially improves the implementation, but do not introduce a large dependency only for trivial animations.

### Routing

Use React Router only if there is a real need for multiple routes.

The primary portfolio can initially be a single-page application with sections:

```text
/
  Home
  About
  Skills
  Experience
  Projects
  Contact
```

If React Router is used, make sure it works correctly with GitHub Pages.

---

# 4. Architecture Philosophy

Follow these principles:

* Component-driven architecture
* Separation of concerns
* Reusable components
* Data-driven UI
* No giant components
* No duplicated markup
* No hardcoded project cards inside JSX when data arrays can be used
* No business/data logic inside purely presentational components
* Keep configuration separate
* Keep reusable UI components separate from page sections
* Keep assets organized
* Keep global styles minimal
* Avoid unnecessary abstractions

The application should be easy for another React developer to understand.

---

# 5. Recommended Folder Structure

Use a structure similar to:

```text
portfolio/
│
├── .github/
│   └── workflows/
│       └── deploy.yml
│
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   └── og-image.png
│
├── src/
│   │
│   ├── assets/
│   │   ├── images/
│   │   │   ├── profile/
│   │   │   │   └── profile.webp
│   │   │   │
│   │   │   ├── projects/
│   │   │   │   ├── chetibra.webp
│   │   │   │   ├── carbon-confession.webp
│   │   │   │   └── marble-cbt.webp
│   │   │   │
│   │   │   └── general/
│   │   │       └── workspace.webp
│   │   │
│   │   └── icons/
│   │
│   ├── components/
│   │   │
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── PageContainer.tsx
│   │   │
│   │   ├── common/
│   │   │   ├── Button.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── SectionHeading.tsx
│   │   │   ├── GlassCard.tsx
│   │   │   ├── SocialLinks.tsx
│   │   │   ├── IconButton.tsx
│   │   │   └── ScrollReveal.tsx
│   │   │
│   │   ├── hero/
│   │   │   ├── Hero.tsx
│   │   │   ├── ProfileVisual.tsx
│   │   │   └── AvailabilityCard.tsx
│   │   │
│   │   ├── about/
│   │   │   ├── About.tsx
│   │   │   └── AboutInfo.tsx
│   │   │
│   │   ├── skills/
│   │   │   ├── Skills.tsx
│   │   │   └── SkillCard.tsx
│   │   │
│   │   ├── projects/
│   │   │   ├── Projects.tsx
│   │   │   ├── ProjectCard.tsx
│   │   │   └── ProjectModal.tsx
│   │   │
│   │   ├── experience/
│   │   │   ├── Experience.tsx
│   │   │   └── ExperienceItem.tsx
│   │   │
│   │   └── contact/
│   │       ├── Contact.tsx
│   │       └── ContactCTA.tsx
│   │
│   ├── data/
│   │   ├── personal.ts
│   │   ├── navigation.ts
│   │   ├── skills.ts
│   │   ├── projects.ts
│   │   ├── experience.ts
│   │   └── socialLinks.ts
│   │
│   ├── hooks/
│   │   ├── useActiveSection.ts
│   │   ├── useScrollPosition.ts
│   │   └── useMediaQuery.ts
│   │
│   ├── types/
│   │   ├── project.ts
│   │   ├── skill.ts
│   │   └── experience.ts
│   │
│   ├── utils/
│   │   ├── cn.ts
│   │   └── constants.ts
│   │
│   ├── pages/
│   │   └── Home.tsx
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
└── README.md
```

You may adjust the structure if there is a technically better approach, but maintain the same separation of concerns.

---

# 6. Component Architecture

Do NOT create one giant `App.tsx`.

`App.tsx` should remain extremely small.

For example:

```tsx
function App() {
  return <Home />;
}
```

The `Home` page should compose the sections:

```tsx
<Home>
  <Navbar />
  <main>
    <Hero />
    <About />
    <Skills />
    <Projects />
    <Experience />
    <Contact />
  </main>
  <Footer />
</Home>
```

Each section should be independently maintainable.

---

# 7. Reusable UI Components

Create reusable components where appropriate.

## Button

Create a reusable button supporting variants such as:

```text
primary
secondary
outline
ghost
```

Example usage:

```tsx
<Button variant="primary">
  View My Work
</Button>
```

Support:

* icons
* loading if needed
* anchor links
* external links
* keyboard accessibility

---

# 8. GlassCard

Create a reusable glassmorphism card component.

It should provide:

* Semi-transparent background
* Backdrop blur
* Subtle border
* Rounded corners
* Hover state
* Optional glow

Example:

```tsx
<GlassCard>
  ...
</GlassCard>
```

---

# 9. SectionHeading

Create a reusable heading component.

Example:

```tsx
<SectionHeading
  eyebrow="MY SKILLS"
  title="Technologies I work with"
/>
```

Support optional highlighted text.

---

# 10. Data-Driven Architecture

Do not hardcode portfolio content inside components.

Use files such as:

```text
data/personal.ts
data/projects.ts
data/skills.ts
data/experience.ts
data/socialLinks.ts
```

For example:

```ts
export const projects = [
  {
    id: "chetibra",
    title: "Chetibra",
    description: "...",
    image: "...",
    technologies: [
      "React Native",
      "Firebase",
      "Maps"
    ],
    links: {
      github: "...",
      live: "..."
    }
  }
];
```

Then render using:

```tsx
projects.map(...)
```

This will make it easy for me to add future projects.

---

# 11. Hero Section

Create a visually powerful hero.

Desktop:

```text
--------------------------------------------------
| Navbar                                         |
--------------------------------------------------

|                                               |
| Hi, I'm                    Profile Visual      |
|                                               |
| Areeba Raza                                   |
| Mobile App & Frontend Developer               |
|                                               |
| Description                                   |
|                                               |
| [View My Work] [Let's Connect]                |
|                                               |
| GitHub LinkedIn X Instagram Email              |
|                                               |
--------------------------------------------------
```

Hero heading:

**Areeba Raza**

Make part of the name use a gradient.

Subtitle:

**Mobile App & Frontend Developer**

Description:

> I build modern, high-performance mobile apps and web experiences that are fast, accessible and impactful.

Buttons:

```text
View My Work →
Let's Connect ✉
```

---

# 12. Hero Profile Visual

On the right side create a premium developer profile composition.

Use my actual profile image if I provide one.

If no image is available, create a clearly replaceable placeholder.

Do NOT generate a fake personal identity.

The image should have:

* Rounded/circular frame
* Gradient border
* Glow
* Decorative orbit
* Floating technology icons
* Subtle animation

Technology badges:

* React
* JavaScript
* TypeScript

Add:

```text
Available for work
Freelance / Full-time
```

with a green status indicator.

---

# 13. Navbar

The navbar should be fixed/sticky.

Desktop:

```text
AR / Areeba Raza

Home
About
Skills
Projects
Experience
Contact

Theme
Download CV
```

Requirements:

* Transparent initially
* Glass effect after scrolling
* Active section indicator
* Smooth scrolling
* Mobile hamburger menu
* Accessible keyboard navigation
* Escape closes mobile menu
* Clicking a navigation item closes mobile menu

Use `IntersectionObserver` for active section detection.

Create:

```text
hooks/useActiveSection.ts
```

instead of putting the entire implementation inside `Navbar.tsx`.

---

# 14. About Section

Create a large glass card.

Eyebrow:

**ABOUT ME**

Heading:

**Crafting digital experiences that make a difference.**

Description:

> I'm a passionate Mobile App & Frontend Developer with experience in building cross-platform mobile applications using React Native and modern web applications using React.js and Next.js. I love turning ideas into real products that solve problems and create value.

Information:

```text
Name
Areeba Raza

Experience
3+ Years

Email
[replace with actual email]

Phone
[replace with actual phone]

Location
[replace with actual location]

Availability
Open to work
```

Do not invent personal contact information.

Use placeholders where real information has not been provided.

---

# 15. Skills Section

Create a premium grid of skill cards.

Skills:

```text
React Native
React.js
Next.js
TypeScript
JavaScript
Firebase
Redux
Tailwind CSS
Git
Expo
REST APIs
Stripe
```

Each card:

* Icon
* Name
* Hover animation
* Gradient/glow
* Glass background

Use data-driven rendering.

Create:

```text
SkillCard.tsx
```

instead of manually creating each card.

---

# 16. Projects Section

Create a premium project showcase.

Eyebrow:

**FEATURED PROJECTS**

Heading:

**Things I've built**

Create project cards.

---

## Project: Chetibra

Description:

> A community app for cyclists to connect, share routes and participate in events.

Technologies:

```text
React Native
Firebase
Maps
```

---

## Project: Carbon Confession

Description:

> Calculate your carbon footprint, offset it, and earn badges for a better planet.

Technologies:

```text
React Native
Stripe
Firebase
```

---

## Project: Marble CBT

Description:

> Mental health & CBT based app to support and guide users.

Technologies:

```text
React Native
Firebase
In-App Purchases
```

Do not invent project URLs.

Create empty/null fields if links are not yet available.

---

# 17. Project Card Architecture

Create:

```text
ProjectCard.tsx
```

It should accept project data through props.

Example:

```tsx
<ProjectCard project={project} />
```

Card should contain:

```text
Image
Title
Description
Technology badges
GitHub link
Live/project link
```

Hover:

* Card moves upward slightly
* Image zooms slightly
* Border glow increases
* Buttons become more visible

Keep animation subtle.

---

# 18. Optional Project Details

Architect the project system so that later I can add:

* Detailed project pages
* Screenshots
* Features
* Challenges
* Architecture
* Technologies
* App Store link
* Google Play link
* GitHub
* Live website

Do not necessarily implement all of this now, but structure the data model so it can support it later.

---

# 19. Experience Section

Create a professional timeline.

Eyebrow:

**EXPERIENCE**

Heading:

**My professional journey**

Experience #1:

```text
Mobile App Developer

QubitSBits
Apr 2022 – Present
```

Description:

> Developing cross-platform mobile apps using React Native. Integrated REST APIs, Firebase, payment gateways such as Stripe, push notifications, and real-time chat.

Experience #2:

```text
Frontend Developer

Freelance
Jan 2021 – Mar 2022
```

Description:

> Built responsive web applications using React.js and Next.js. Worked with REST APIs, state management using Redux, and modern UI/UX practices.

Create a reusable:

```text
ExperienceItem.tsx
```

---

# 20. Contact Section

Make this one of the strongest visual sections.

Use a large gradient/glass CTA.

Heading:

**Let's work together**

Text:

> Have a project in mind or just want to say hi? I'd love to hear from you.

Primary button:

```text
Send Me an Email →
```

Social links:

* GitHub
* LinkedIn
* X/Twitter
* Instagram
* Email

Do not build a backend contact form unless explicitly requested.

For now, email/contact buttons can use:

```text
mailto:
```

---

# 21. Footer

Footer:

```text
AR

© 2026 Areeba Raza. All rights reserved.

Built with ❤️ using React
```

Social links should be included.

---

# 22. Design System

Create CSS variables for the major design tokens.

For example:

```css
:root {
  --background: ...
  --foreground: ...
  --muted: ...
  --primary: ...
  --secondary: ...
  --border: ...
  --card: ...
  --radius: ...
}
```

Do not scatter arbitrary color values throughout the code.

Use consistent:

* Spacing
* Border radius
* Typography
* Shadows
* Gradients
* Transitions

---

# 23. Typography

Use a modern professional font.

You may use Google Fonts such as:

* Inter
* Manrope
* Plus Jakarta Sans

Choose one primary font and use it consistently.

Typography hierarchy:

```text
Hero:
very large

Section heading:
large

Card heading:
medium

Body:
comfortable readable size

Labels:
small uppercase
```

Ensure good readability against the dark background.

---

# 24. Responsive Design

Design mobile-first.

Breakpoints should support:

```text
Mobile
Tablet
Laptop
Desktop
Large Desktop
```

Do not simply shrink the desktop version.

Mobile should be intentionally designed.

### Mobile Hero

Stack:

```text
Text
Buttons
Social links
Profile
```

### Mobile Projects

Single column.

### Mobile Skills

2-column grid where appropriate.

### Mobile About

Stack information vertically.

### Mobile Experience

Timeline should remain readable without horizontal overflow.

---

# 25. Accessibility

Follow good accessibility practices.

Implement:

* Semantic HTML
* Proper heading hierarchy
* `aria-label` for icon-only buttons
* Visible focus states
* Keyboard navigation
* Accessible mobile menu
* Alt text
* Sufficient color contrast
* Reduced motion support

Do not use `<div>` elements as buttons.

Use:

```html
button
a
nav
main
section
article
footer
header
```

appropriately.

---

# 26. SEO

Configure:

```text
title
description
keywords
author
Open Graph
Twitter/X card
favicon
robots.txt
```

Example title:

```text
Areeba Raza | Mobile App & Frontend Developer
```

Description:

```text
Areeba Raza is a Mobile App & Frontend Developer specializing in React Native, React.js, Next.js and modern web and mobile applications.
```

Use semantic headings.

Add appropriate metadata to `index.html`.

---

# 27. Performance

Optimize for performance.

Requirements:

* Lazy-load non-critical images
* Use WebP/AVIF where possible
* Avoid unnecessarily large images
* Avoid huge JavaScript dependencies
* Avoid unnecessary re-renders
* Use CSS animations instead of JavaScript where possible
* Keep the initial bundle small
* Do not load unnecessary icon libraries
* Do not use huge background videos

The portfolio should feel fast.

---

# 28. Image Handling

Organize images:

```text
src/assets/images/profile/
src/assets/images/projects/
src/assets/images/general/
```

Use meaningful filenames.

Example:

```text
chetibra-project.webp
carbon-confession-project.webp
marble-cbt-project.webp
profile.webp
```

If an image does not exist, create a clean placeholder component rather than breaking the layout.

Make replacing images easy.

---

# 29. Animations

Implement:

### Page entrance

Subtle fade + upward movement.

### Section reveal

Sections animate when entering the viewport.

Use:

```text
IntersectionObserver
```

or a lightweight animation solution.

### Buttons

Subtle:

* scale
* glow
* gradient transition

### Project cards

Subtle:

* translateY
* image scale
* border glow

### Hero decorative elements

Very subtle floating/orbit animation.

Do not create distracting animations.

Support:

```css
@media (prefers-reduced-motion: reduce)
```

and disable/reduce animations.

---

# 30. Scroll Behavior

Implement:

```css
scroll-behavior: smooth;
```

However, ensure navigation still works correctly if users have reduced motion enabled.

Account for fixed navbar height when scrolling to sections.

Use:

```css
scroll-margin-top
```

on sections.

---

# 31. Dark / Light Theme

The primary design should be dark.

Add a theme toggle if it can be implemented cleanly.

If implementing light mode:

* Create a proper light design
* Do not simply invert colors
* Maintain accessibility
* Persist preference in localStorage
* Respect system preference initially

If light mode compromises the quality of the design, prioritize an excellent dark theme rather than implementing a poor light theme.

---

# 32. Navigation Architecture

Define navigation in:

```text
data/navigation.ts
```

Example:

```ts
export const navigationItems = [
  {
    label: "Home",
    href: "#home",
  },
  {
    label: "About",
    href: "#about",
  },
  {
    label: "Skills",
    href: "#skills",
  },
  {
    label: "Projects",
    href: "#projects",
  },
  {
    label: "Experience",
    href: "#experience",
  },
  {
    label: "Contact",
    href: "#contact",
  },
];
```

Navbar should map over this data.

---

# 33. Social Links Architecture

Create:

```text
data/socialLinks.ts
```

Example structure:

```ts
export const socialLinks = [
  {
    name: "GitHub",
    url: "...",
    icon: Github,
  },
  {
    name: "LinkedIn",
    url: "...",
    icon: Linkedin,
  },
];
```

Do not invent my social URLs.

Use placeholders that are easy to replace.

---

# 34. Personal Data Architecture

Create:

```text
data/personal.ts
```

Keep:

* Name
* Job title
* Description
* Email
* Phone
* Location
* Experience
* Resume URL
* Availability

inside this file.

This means I can update my personal information without searching through components.

---

# 35. TypeScript Types

Create types such as:

```text
types/project.ts
types/skill.ts
types/experience.ts
```

Example:

```ts
export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  links?: {
    github?: string;
    live?: string;
  };
}
```

Use TypeScript properly.

Avoid:

```ts
any
```

unless absolutely necessary.

---

# 36. Utility Functions

Create:

```text
utils/
```

for genuinely reusable helpers.

Do not create utility files just for the sake of architecture.

For example:

```text
utils/cn.ts
```

can combine class names.

---

# 37. Custom Hooks

Use custom hooks only when they provide real value.

Potential hooks:

```text
useActiveSection
useScrollPosition
useMediaQuery
```

For example:

```text
useActiveSection.ts
```

should handle detecting which section is currently visible.

Navbar should consume the hook instead of implementing the entire IntersectionObserver logic itself.

---

# 38. GitHub Pages Compatibility

This is extremely important.

The website must work correctly when deployed to:

```text
https://USERNAME.github.io/REPOSITORY/
```

and not only:

```text
http://localhost:5173/
```

Configure Vite correctly.

Do not hardcode:

```text
/
```

for assets in a way that breaks GitHub Pages.

Make the repository name easy to configure.

If the repository is:

```text
portfolio
```

the production base should support:

```text
/portfolio/
```

---

# 39. GitHub Actions

Create:

```text
.github/workflows/deploy.yml
```

Use GitHub Actions to:

1. Checkout repository
2. Install Node
3. Install dependencies
4. Build project
5. Deploy `dist`
6. Publish to GitHub Pages

Use the current recommended GitHub Pages deployment approach.

Do not require me to manually upload the `dist` folder.

---

# 40. Package Scripts

Configure useful scripts:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint ."
  }
}
```

Add other scripts only when necessary.

---

# 41. README

Create a professional `README.md`.

Include:

## Project

Portfolio website for Areeba Raza.

## Tech Stack

List technologies.

## Development

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
```

## Preview

```bash
npm run preview
```

## GitHub Pages Deployment

Explain exactly how to:

1. Create GitHub repository
2. Push project
3. Configure Pages
4. Enable GitHub Actions
5. Deploy
6. Update website

Also explain where to change:

* Name
* Email
* Social links
* Projects
* Experience
* Skills
* Resume
* Profile image

---

# 42. Environment Variables

Do NOT put secrets in the frontend.

If environment variables are required, explain that:

```text
VITE_*
```

variables are public in a Vite frontend.

Do not put:

* API secrets
* private keys
* passwords
* Stripe secret keys
* Firebase admin credentials

in the project.

For this portfolio, avoid environment variables unless actually required.

---

# 43. Security

Follow frontend security best practices.

Do not:

* expose secrets
* use dangerous `innerHTML`
* use `eval`
* inject arbitrary HTML
* include unnecessary third-party scripts

External links should use appropriate attributes where necessary.

---

# 44. Error-Free Code

Before considering the project complete:

Run:

```bash
npm install
npm run lint
npm run build
```

Fix all errors.

There should be:

* No TypeScript errors
* No ESLint errors
* No broken imports
* No missing images
* No console errors
* No broken navigation
* No horizontal overflow

---

# 45. Visual Quality Checklist

Before finishing, inspect the entire page.

Check:

### Navbar

* Alignment
* Active state
* Mobile menu
* Scroll behavior

### Hero

* Typography
* Spacing
* Profile image
* Buttons
* Social icons

### About

* Card proportions
* Text readability
* Information alignment

### Skills

* Consistent card sizes
* Icons
* Hover states

### Projects

* Image aspect ratios
* Card heights
* Technology badges
* Links

### Experience

* Timeline alignment
* Responsive behavior

### Contact

* CTA prominence
* Gradient
* Button

### Footer

* Spacing
* Social links
* Copyright

---

# 46. Avoid These Mistakes

DO NOT:

* Put the entire website inside `App.tsx`
* Create one 1000+ line component
* Hardcode every project card
* Use Lorem Ipsum
* Invent work experience
* Invent client names
* Invent social links
* Invent contact information
* Add fake testimonials
* Add fake statistics
* Add fake awards
* Add random sections
* Add excessive animations
* Use giant dependencies unnecessarily
* Make the mobile design an afterthought
* Break GitHub Pages asset paths
* Use fake API calls
* Add unnecessary backend code

---

# 47. Content Accuracy

Use only the information provided below.

## Personal

```text
Name:
Areeba Raza

Title:
Mobile App & Frontend Developer

Experience:
3+ Years
```

## Education

```text
BS Computer Science
PMAS-AAUR
2017 – 2021
```

## Experience

```text
Mobile App Developer
QubitSBits
April 2022 – Present
```

Responsibilities:

```text
React Native
REST APIs
Firebase
Stripe
Push Notifications
Real-time Chat
```

Previous:

```text
Frontend Developer
Freelance
January 2021 – March 2022
```

Technologies:

```text
React.js
Next.js
REST APIs
Redux
Modern UI/UX
```

---

# 48. Projects

## Chetibra

```text
A community app for cyclists to connect, share routes and participate in events.
```

Technologies:

```text
React Native
Firebase
Maps
```

## Carbon Confession

```text
Calculate your carbon footprint, offset it, and earn badges for a better planet.
```

Technologies:

```text
React Native
Stripe
Firebase
```

## Marble CBT

```text
Mental health & CBT based app to support and guide users.
```

Technologies:

```text
React Native
Firebase
In-App Purchases
```

---

# 49. Future Extensibility

Architect the project so I can later add:

```text
Blog
Case Studies
Project Details
Testimonials
Services
Contact Form
Resume Viewer
Multiple Portfolio Pages
Analytics
GitHub API
```

But DO NOT implement unnecessary features now.

The current portfolio should remain focused.

---

# 50. Final Visual Direction

The final design should feel similar to:

```text
Premium SaaS Website
        +
Modern Developer Portfolio
        +
Futuristic Dark UI
        +
Glassmorphism
        +
Subtle Neon Gradients
```

Think:

**Apple-level simplicity + modern developer aesthetic + premium SaaS UI**

Avoid:

* Overly flashy neon
* Excessive gradients
* Too many cards
* Clutter
* Huge amounts of text
* Generic Bootstrap-style layouts

---

# 51. Final Deliverable

I want you to generate the **complete working project**.

Provide:

1. Complete folder structure
2. All source files
3. All components
4. All data files
5. TypeScript types
6. Hooks
7. Utility functions
8. Styling
9. Vite configuration
10. Tailwind configuration
11. ESLint configuration
12. GitHub Actions workflow
13. README
14. GitHub Pages deployment instructions

The project must run with:

```bash
npm install
npm run dev
```

and production build with:

```bash
npm run build
```

---

# 52. Implementation Order

Build the project in this order:

### Phase 1

Set up:

* Vite
* React
* TypeScript
* Tailwind
* ESLint
* Folder structure

### Phase 2

Create:

* Design tokens
* Global styles
* Typography
* Button
* GlassCard
* SectionHeading
* SocialLinks

### Phase 3

Create:

* Navbar
* Hero
* ProfileVisual
* About

### Phase 4

Create:

* Skills
* Projects
* Experience

### Phase 5

Create:

* Contact
* Footer

### Phase 6

Implement:

* Animations
* Active navigation
* Responsive behavior
* Theme support

### Phase 7

Implement:

* SEO
* Accessibility
* Performance optimization

### Phase 8

Implement:

* GitHub Pages
* GitHub Actions
* Production configuration

### Phase 9

Run:

```bash
npm run lint
npm run build
```

Fix everything.

---

# 53. Important Instruction About the Reference Image

The attached image is the visual reference.

Use it to understand:

* Layout
* Spacing
* Colors
* Card design
* Typography hierarchy
* Hero composition
* Section structure
* Gradient treatment
* Overall visual personality

However, make the implementation **better and cleaner where appropriate**.

Do not reproduce obvious AI-generated artifacts from the reference.

The actual website must look like a professionally coded website.

---

# 54. How You Should Respond

Do not only explain how I could build it.

Actually create the implementation.

Start by showing the final architecture/folder structure, then provide the required code files.

If the response is too large for one response, continue in logical parts without skipping implementation details.

Do not replace important code with:

```text
// rest of code here
```

or:

```text
// implement this yourself
```

Every important file should contain complete working code.

At the end, provide exact commands for:

```bash
npm install
npm run dev
npm run lint
npm run build
```

and exact GitHub Pages deployment steps.

The final result should be a **production-ready React portfolio**, not a tutorial or conceptual example.
