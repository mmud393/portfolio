Yes — for Claude, it's better to explicitly define **image architecture + placeholder strategy + image dimensions/aspect ratios + overlays + object positioning + lazy loading + replacement instructions** alongside the color system.

Here is a detailed prompt you can give Claude:

# Portfolio Visual Design Specification

## Color System + Image System + Placeholder Architecture

You are a senior frontend engineer, UI/UX designer, and visual designer.

Build my portfolio as a **premium, modern, dark developer portfolio** in React.js.

This prompt specifically defines the **COLOR SYSTEM, IMAGE SYSTEM, PLACEHOLDER IMAGES, IMAGE ARCHITECTURE, IMAGE SIZING, IMAGE TREATMENT, BACKGROUNDS, GRADIENTS, GLOWS, AND VISUAL HIERARCHY**.

Follow these specifications carefully.

---

# PART 1 — OVERALL VISUAL DIRECTION

The portfolio should look like a combination of:

**Premium Developer Portfolio**
+
**Modern SaaS Product**
+
**Futuristic Technology Website**
+
**Minimal Glassmorphism**

The design should feel:

* Professional
* Expensive
* Clean
* Modern
* Technical
* Elegant
* Futuristic
* Confident
* Visually memorable

It should NOT look:

* Cartoonish
* Gaming-oriented
* Overly neon
* Like a template
* Like a generic Bootstrap portfolio
* Like an AI-generated landing page
* Overloaded with gradients
* Overloaded with cards
* Overloaded with animations

The design should use **dark neutral colors as the foundation** and use bright colors only as accents.

---

# PART 2 — COLOR PHILOSOPHY

The primary visual identity is:

**Deep Navy + Electric Blue + Violet + Cyan + Emerald**

Color should guide attention.

It should NOT dominate the page.

Approximately:

```text
80% Dark/Navy
10% White/Gray text
10% Accent colors
```

The dark background should occupy most of the screen.

Bright colors should be reserved for:

* Important headings
* Buttons
* Links
* Active navigation
* Technology accents
* Status indicators
* Decorative lighting
* Project highlights
* Contact CTA

---

# PART 3 — PRIMARY BACKGROUND

Do not use pure black.

Do NOT use:

```text
#000000
```

Use:

```text
#030712
```

as the primary background.

Create these background tokens:

```css
--background-primary: #030712;
--background-secondary: #050A16;
--background-tertiary: #08111F;
```

Use:

```text
#030712
```

for the overall page.

Use:

```text
#050A16
```

for alternate sections.

Use:

```text
#08111F
```

for elevated areas.

---

# PART 4 — ATMOSPHERIC BACKGROUND

The background should NOT be a completely flat color.

Add extremely subtle radial lighting.

Use blue and violet atmospheric gradients.

Example:

```css
background:
  radial-gradient(
    circle at 15% 10%,
    rgba(37, 99, 235, 0.08),
    transparent 30%
  ),
  radial-gradient(
    circle at 85% 20%,
    rgba(124, 58, 237, 0.08),
    transparent 30%
  ),
  #030712;
```

The gradient must be subtle.

The user should feel depth without immediately noticing a gradient.

---

# PART 5 — SURFACE COLORS

Create a layered surface system.

### Standard card

```text
rgba(15, 23, 42, 0.55)
```

### Elevated card

```text
rgba(15, 23, 42, 0.72)
```

### Hover card

```text
rgba(20, 30, 55, 0.82)
```

Use glassmorphism:

```css
backdrop-filter: blur(16px);
-webkit-backdrop-filter: blur(16px);
```

Do not make cards too transparent.

---

# PART 6 — CARD BORDERS

Default:

```text
rgba(148, 163, 184, 0.10)
```

Hover:

```text
rgba(96, 165, 250, 0.28)
```

Featured:

```text
rgba(139, 92, 246, 0.25)
```

Never use bright white borders.

Cards should have subtle boundaries.

---

# PART 7 — TEXT COLORS

Use:

### Primary

```text
#F8FAFC
```

For:

* Hero title
* Section headings
* Project titles
* Important information

### Secondary

```text
#CBD5E1
```

For:

* Body text
* Descriptions

### Muted

```text
#94A3B8
```

For:

* Dates
* Metadata
* Secondary information

### Subtle

```text
#64748B
```

For:

* Low-priority text

Do not use very dark gray text on the dark background.

---

# PART 8 — BLUE

Primary blue:

```text
#3B82F6
```

Supporting:

```text
#2563EB
#60A5FA
#93C5FD
```

Use blue for:

* Links
* Primary interactions
* Active navigation
* Hero accents
* Focus states
* Decorative lighting

---

# PART 9 — VIOLET

Primary violet:

```text
#8B5CF6
```

Supporting:

```text
#7C3AED
#A78BFA
```

Use violet for:

* Secondary accents
* Gradient headings
* Project accents
* Decorative lighting
* Hover effects

---

# PART 10 — CYAN

Primary:

```text
#06B6D4
```

Supporting:

```text
#22D3EE
#67E8F9
```

Use cyan sparingly.

Mainly for:

* Technology accents
* React-related visuals
* Decorative lighting
* Small highlights

---

# PART 11 — EMERALD

Primary:

```text
#10B981
```

Supporting:

```text
#059669
#34D399
```

Use emerald for:

* Available for work
* Success
* Active status
* Positive states

Example:

```text
● Available for work
```

The dot should have a small green glow.

---

# PART 12 — SIGNATURE GRADIENTS

## Main brand gradient

```css
linear-gradient(
  135deg,
  #2563EB,
  #7C3AED
)
```

Use for:

* Primary CTA
* Important accents
* Hero highlight

---

## Text gradient

```css
linear-gradient(
  90deg,
  #60A5FA,
  #8B5CF6
)
```

Use for selected words in headings.

---

## Cyan → Blue → Violet

```css
linear-gradient(
  90deg,
  #22D3EE,
  #3B82F6,
  #8B5CF6
)
```

Use for special decorative elements.

---

## Contact gradient

```css
linear-gradient(
  120deg,
  #06B6D4,
  #2563EB,
  #7C3AED
)
```

Use primarily for the final contact CTA.

---

# PART 13 — GLOW SYSTEM

Glow must be subtle.

### Blue glow

```text
rgba(59, 130, 246, 0.15)
```

### Violet glow

```text
rgba(139, 92, 246, 0.15)
```

### Cyan glow

```text
rgba(6, 182, 212, 0.10)
```

### Emerald glow

```text
rgba(16, 185, 129, 0.15)
```

Use blur values around:

```text
50px – 100px
```

depending on the element.

Never make the glow look like a neon sign.

---

# PART 14 — HERO COLOR DESIGN

The Hero is the most visually important section.

Background:

```text
#030712
```

Add:

* Subtle blue radial glow
* Subtle violet radial glow
* Small decorative particles
* Very subtle grid

Hero title:

```text
#F8FAFC
```

Highlighted part:

```text
Blue → Violet gradient
```

Subtitle:

```text
Cyan → Blue → Violet
```

Buttons:

Primary:

```text
Blue → Violet
```

Secondary:

```text
Transparent glass
```

---

# PART 15 — NAVBAR COLOR DESIGN

Initial navbar:

```text
transparent
```

After scrolling:

```text
rgba(3, 7, 18, 0.78)
```

with:

```css
backdrop-filter: blur(18px);
```

Navigation default:

```text
#CBD5E1
```

Hover:

```text
#F8FAFC
```

Active:

```text
#60A5FA
```

Active indicator:

```text
Blue → Violet gradient
```

---

# PART 16 — PROFILE IMAGE DESIGN

The profile image is one of the most important visual elements.

Use a real profile image later.

For now, use a **dummy placeholder image**.

Do NOT hardcode the image URL directly inside `Hero.tsx`.

Create:

```text
src/assets/images/profile/profile-placeholder.webp
```

or:

```text
public/images/profile/profile-placeholder.webp
```

depending on the asset strategy.

Make replacing the image require changing only one file or one data reference.

---

# PART 17 — PROFILE IMAGE PLACEHOLDER

The placeholder should visually resemble a professional developer portrait.

Important:

The dummy image should NOT pretend to be the actual person.

It should be obviously replaceable.

If a generated placeholder is used, prefer:

* Generic professional developer portrait
* Neutral appearance
* Dark clothing
* Clean studio lighting
* Dark/neutral background

Do not create fake credentials or identity information in the image.

---

# PART 18 — PROFILE IMAGE CONTAINER

Use a large rounded/circular visual frame.

Outer decoration:

```text
Cyan → Blue → Violet
```

Use:

```css
background:
  conic-gradient(
    from 180deg,
    #06B6D4,
    #3B82F6,
    #8B5CF6,
    #06B6D4
  );
```

Keep the border elegant.

Do not make it extremely thick.

Add subtle glow:

```css
box-shadow:
  0 0 60px rgba(99, 102, 241, 0.18);
```

---

# PART 19 — PROFILE IMAGE SIZING

Desktop:

```text
400px – 500px
```

Tablet:

```text
320px – 400px
```

Mobile:

```text
260px – 320px
```

Use:

```css
aspect-ratio: 1 / 1;
```

Image should fill the container.

Use:

```css
object-fit: cover;
```

Position:

```css
object-position: center;
```

Allow easy customization later.

---

# PART 20 — HERO DECORATIVE TECHNOLOGY ICONS

Around the profile image place floating technology icons:

* React
* JavaScript
* TypeScript

Use small glass circles.

Example:

```text
Dark glass circle
+
technology icon
+
small colored glow
```

Do not use giant icons.

Desktop:

```text
48px – 64px
```

Mobile:

```text
36px – 48px
```

Add subtle floating animation.

---

# PART 21 — AVAILABILITY CARD

Place a floating glass card near the profile.

Content:

```text
● Available for work

Freelance / Full-time
```

Background:

```text
rgba(15, 23, 42, 0.75)
```

Border:

```text
rgba(148, 163, 184, 0.15)
```

Status dot:

```text
#10B981
```

Add subtle emerald glow.

---

# PART 22 — ABOUT IMAGE

The About section does NOT need another large profile image.

Keep it text-focused.

If an image is desired, use a subtle abstract technology illustration rather than another portrait.

For now, do not add unnecessary imagery.

---

# PART 23 — SKILL ICONS

Do NOT create large colorful backgrounds for every technology.

Example:

BAD:

```text
Huge purple React card
Huge orange Firebase card
Huge yellow JavaScript card
```

GOOD:

```text
Dark glass card
+
React icon
+
small cyan glow
+
React Native
```

Technology icons may retain their recognizable brand colors.

But the surrounding UI must remain within the dark palette.

---

# PART 24 — PROJECT IMAGE SYSTEM

Every project MUST have an image.

Create:

```text
src/assets/images/projects/
```

Structure:

```text
projects/
├── chetibra/
│   ├── cover.webp
│   ├── screenshot-1.webp
│   ├── screenshot-2.webp
│   └── screenshot-3.webp
│
├── carbon-confession/
│   ├── cover.webp
│   ├── screenshot-1.webp
│   ├── screenshot-2.webp
│   └── screenshot-3.webp
│
└── marble-cbt/
    ├── cover.webp
    ├── screenshot-1.webp
    ├── screenshot-2.webp
    └── screenshot-3.webp
```

Initially, use **dummy placeholder images**.

I will replace these later with actual screenshots.

---

# PART 25 — PROJECT COVER IMAGES

Every project needs a strong cover image.

Recommended ratio:

```text
16:9
```

Recommended minimum:

```text
1280 × 720
```

Better:

```text
1600 × 900
```

Use:

```css
aspect-ratio: 16 / 9;
```

with:

```css
object-fit: cover;
```

---

# PART 26 — DUMMY PROJECT IMAGES

Until I provide actual screenshots, create visually appropriate dummy images.

Do NOT use random stock photos.

The dummy image should communicate the project's purpose.

---

## Chetibra Dummy Image

Create/use a placeholder showing:

* Mobile cycling application
* Smartphone UI mockups
* Cycling routes
* Map interface
* Green/cyan accents
* Dark background

Suggested visual palette:

```text
#030712
#10B981
#06B6D4
```

The image should clearly look like a **cycling mobile app**.

---

## Carbon Confession Dummy Image

Create/use a placeholder showing:

* Mobile app interface
* Carbon footprint dashboard
* Environmental graphics
* Green accent
* Sustainability visual
* Smartphone mockups

Palette:

```text
#030712
#10B981
#22C55E
```

It should clearly communicate:

**carbon footprint + sustainability**

---

## Marble CBT Dummy Image

Create/use a placeholder showing:

* Mobile application UI
* Mental wellness / CBT interface
* Calm modern UI
* Purple/indigo accents
* Smartphone mockups

Palette:

```text
#030712
#6366F1
#8B5CF6
```

It should feel calm and professional.

---

# PART 27 — DO NOT USE RANDOM STOCK IMAGES

Do not use:

* Random office workers
* Random laptops
* Random coding photos
* Random city photos
* Random abstract stock images

Every image should have a relationship with the content.

For projects, application screenshots/mockups are preferred.

---

# PART 28 — PROJECT IMAGE OVERLAY

Project images should have a subtle dark overlay.

Example:

```css
background:
  linear-gradient(
    to bottom,
    transparent 45%,
    rgba(3, 7, 18, 0.65) 100%
  );
```

The overlay should help the image integrate with the dark card.

Do not make the image excessively dark.

---

# PART 29 — PROJECT IMAGE HOVER

On hover:

```text
scale: 1.03
```

approximately.

Animation:

```text
300ms ease
```

The image should slightly zoom.

Do not zoom excessively.

Card itself:

```text
translateY(-4px)
```

maximum.

Add a subtle border/glow.

---

# PART 30 — PROJECT IMAGE PLACEHOLDER ARCHITECTURE

Do not reference placeholder URLs directly inside components.

Bad:

```tsx
<img src="https://some-placeholder-site.com/..." />
```

Good:

```ts
const projects = [
  {
    id: "chetibra",
    title: "Chetibra",
    image: chetibraCover,
  }
];
```

Import the image from a central location.

For example:

```text
data/projects.ts
```

or:

```text
data/projectAssets.ts
```

---

# PART 31 — EASY IMAGE REPLACEMENT

Replacing images later should be extremely easy.

For example:

Current:

```text
chetibra/cover.webp
```

Later I should simply replace:

```text
chetibra/cover.webp
```

with my actual image.

I should NOT have to modify:

* ProjectCard
* Projects
* App
* CSS
* routing
* other components

to replace an image.

---

# PART 32 — PROJECT GALLERY ARCHITECTURE

The data model should support multiple screenshots.

Example:

```ts
{
  id: "chetibra",
  title: "Chetibra",
  cover: chetibraCover,
  screenshots: [
    chetibraScreenshot1,
    chetibraScreenshot2,
    chetibraScreenshot3
  ]
}
```

Even if the gallery is not implemented initially, the architecture should support it.

---

# PART 33 — IMAGE LAZY LOADING

Project images below the fold should use:

```html
loading="lazy"
```

The hero profile image can load normally because it is above the fold.

Use proper image dimensions to reduce layout shifts.

---

# PART 34 — IMAGE ALT TEXT

Every meaningful image must have descriptive alt text.

Example:

```text
Chetibra cycling community mobile application
```

Not:

```text
image1
```

Decorative images should use:

```html
alt=""
```

when appropriate.

---

# PART 35 — IMAGE OBJECT POSITION

Make image positioning configurable.

For example:

```ts
{
  image: chetibraCover,
  imagePosition: "center"
}
```

Some screenshots may require:

```text
center
top
bottom
```

Do not hardcode `object-position` globally if project images have different compositions.

---

# PART 36 — IMAGE QUALITY

Do not use unnecessarily huge images.

Preferred:

```text
WebP
AVIF where practical
```

Avoid:

```text
10MB PNG
```

for a simple project card.

Target image sizes should generally be kept reasonable for web delivery.

---

# PART 37 — IMAGE FALLBACK

If an image fails to load, do not show a broken image icon.

Create a fallback visual:

```text
Dark gradient
+
Project icon
+
Project name
```

Example:

```text
[Cycling Icon]

Chetibra
```

This should preserve the card layout.

---

# PART 38 — IMAGE RESPONSIVENESS

Images should never overflow their containers.

Use:

```css
width: 100%;
height: 100%;
object-fit: cover;
```

or appropriate responsive behavior.

Project image containers should maintain consistent aspect ratios.

---

# PART 39 — CONTACT SECTION VISUALS

Do not add a random photograph.

Instead use:

* Gradient background
* Subtle glow
* Abstract decorative shapes
* Social icons

The contact section should feel like a strong visual conclusion.

---

# PART 40 — BACKGROUND DECORATIONS

Use a small number of abstract decorations.

Possible elements:

```text
Blurred blue orb
Blurred violet orb
Tiny dots
Subtle grid
Thin gradient line
```

Do not add:

* random 3D objects
* excessive floating shapes
* random stars everywhere
* huge blobs
* excessive particles

---

# PART 41 — GRID

A subtle grid may be used behind the hero.

Example:

```css
background-image:
  linear-gradient(
    rgba(148, 163, 184, 0.025) 1px,
    transparent 1px
  ),
  linear-gradient(
    90deg,
    rgba(148, 163, 184, 0.025) 1px,
    transparent 1px
  );
```

Grid size:

```text
40px × 40px
```

Opacity should be extremely low.

---

# PART 42 — IMAGE + COLOR RELATIONSHIP

Images should not fight with the UI.

For example:

If the project image contains bright green:

The surrounding card should remain:

```text
dark navy
```

with only a subtle green glow.

Do NOT change the entire card to green.

Same for purple/blue project images.

---

# PART 43 — MOBILE IMAGE DESIGN

On mobile:

Project images remain:

```text
16:9
```

unless the actual screenshot benefits from another ratio.

Do not make project images extremely tall.

Profile image:

```text
260px – 320px
```

Decorative technology icons should become smaller.

Reduce:

* Glow
* Blur
* Decorative particles

on mobile.

---

# PART 44 — DARKNESS HIERARCHY

The page should visually follow:

```text
Background
████████████████

Cards
██████████████

Elevated Cards
████████████

Important Elements
████████

Text
████

Accent
██
```

This creates depth.

Do not make every card the same brightness.

---

# PART 45 — LIGHT MODE

If implementing light mode, create a separate intentional palette.

Do not invert the dark colors.

Light palette:

```text
Background:
#F8FAFC

Surface:
#FFFFFF

Secondary surface:
#F1F5F9

Primary text:
#0F172A

Secondary:
#334155

Muted:
#64748B

Border:
#E2E8F0

Blue:
#2563EB

Violet:
#7C3AED
```

Brand gradients remain blue/violet.

However, dark mode is the primary experience.

---

# PART 46 — SEMANTIC COLORS

```text
Success
#10B981

Warning
#F59E0B

Error
#EF4444

Info
#3B82F6
```

Use these only for semantic meaning.

---

# PART 47 — COLOR TOKENS FILE

Create a centralized design token system.

For example:

```text
src/styles/tokens.css
```

or:

```text
src/styles/theme.css
```

Keep all primary colors there.

Example:

```css
:root {
  --color-bg-primary: #030712;
  --color-bg-secondary: #050A16;
  --color-bg-tertiary: #08111F;

  --color-surface: rgba(15, 23, 42, 0.55);
  --color-surface-elevated: rgba(15, 23, 42, 0.72);

  --color-text-primary: #F8FAFC;
  --color-text-secondary: #CBD5E1;
  --color-text-muted: #94A3B8;
  --color-text-subtle: #64748B;

  --color-blue: #3B82F6;
  --color-blue-light: #60A5FA;

  --color-violet: #8B5CF6;
  --color-violet-light: #A78BFA;

  --color-cyan: #06B6D4;
  --color-emerald: #10B981;

  --color-border: rgba(148, 163, 184, 0.10);
  --color-border-hover: rgba(96, 165, 250, 0.28);

  --color-success: #10B981;
  --color-warning: #F59E0B;
  --color-error: #EF4444;
  --color-info: #3B82F6;
}
```

---

# PART 48 — ASSET ARCHITECTURE

Use:

```text
src/
└── assets/
    └── images/
        ├── profile/
        │   └── profile-placeholder.webp
        │
        ├── projects/
        │   ├── chetibra/
        │   │   ├── cover.webp
        │   │   ├── screenshot-1.webp
        │   │   ├── screenshot-2.webp
        │   │   └── screenshot-3.webp
        │   │
        │   ├── carbon-confession/
        │   │   ├── cover.webp
        │   │   ├── screenshot-1.webp
        │   │   ├── screenshot-2.webp
        │   │   └── screenshot-3.webp
        │   │
        │   └── marble-cbt/
        │       ├── cover.webp
        │       ├── screenshot-1.webp
        │       ├── screenshot-2.webp
        │       └── screenshot-3.webp
        │
        └── general/
            └── workspace-placeholder.webp
```

Keep assets organized by purpose.

---

# PART 49 — IMAGE IMPORT ARCHITECTURE

Create a central asset file if useful:

```text
src/data/assets.ts
```

Example:

```ts
import profile from "../assets/images/profile/profile-placeholder.webp";

import chetibraCover from "../assets/images/projects/chetibra/cover.webp";
import carbonCover from "../assets/images/projects/carbon-confession/cover.webp";
import marbleCover from "../assets/images/projects/marble-cbt/cover.webp";

export const assets = {
  profile,
  projects: {
    chetibra: chetibraCover,
    carbonConfession: carbonCover,
    marbleCbt: marbleCover,
  },
};
```

Then the rest of the application does not need to know the physical asset paths.

---

# PART 50 — REPLACING PLACEHOLDERS

Make this workflow extremely simple:

### Current

```text
profile-placeholder.webp
```

### Later

Replace it with:

```text
profile.webp
```

Update only:

```text
assets.ts
```

if the filename changes.

For project images:

```text
chetibra/cover.webp
carbon-confession/cover.webp
marble-cbt/cover.webp
```

I should be able to replace these files without modifying the React components.

---

# PART 51 — DUMMY IMAGE GENERATION

If you need to create placeholder images for the implementation, use **dummy UI mockups rather than random photography**.

The placeholders should visually match the portfolio.

For example:

### Chetibra

Create a fake mobile app screenshot composition showing:

* Cycling map
* Route line
* User profile
* Event card
* Green/cyan interface

### Carbon Confession

Create:

* Carbon score
* Footprint dashboard
* Offset button
* Green sustainability graphics

### Marble CBT

Create:

* Calm purple interface
* CBT exercise card
* Progress indicator
* Mobile UI

These are only placeholders.

Do not represent them as actual screenshots.

---

# PART 52 — PROJECT CARD IMAGE LAYOUT

Each card:

```text
┌─────────────────────────────┐
│                             │
│       PROJECT IMAGE         │
│                             │
│                             │
├─────────────────────────────┤
│ Project Name                │
│                             │
│ Description                 │
│                             │
│ [React] [Firebase] [Maps]   │
│                         ↗   │
└─────────────────────────────┘
```

The image should take approximately:

```text
45% – 50%
```

of the card's visual height.

---

# PART 53 — IMAGE CORNERS

Project image should follow the card radius.

Example:

```text
border-radius: 16px 16px 0 0;
```

Do not create a separate floating image with unrelated radius.

---

# PART 54 — IMAGE OVERLAY ON HOVER

On hover:

```text
dark overlay slightly decreases
image becomes slightly brighter
image zooms to 1.03
```

Optional:

A small external-link icon can appear.

Animation:

```text
250–350ms
```

---

# PART 55 — PROFILE IMAGE OVERLAY

Do NOT apply heavy overlays to the profile image.

The person's face must remain natural and clear.

Only the surrounding frame should carry the color treatment.

---

# PART 56 — VISUAL PRIORITY

The most visually important elements should be:

### Priority 1

Hero name

### Priority 2

Developer title

### Priority 3

Primary CTA

### Priority 4

Profile visual

### Priority 5

Featured projects

### Priority 6

Contact CTA

Everything else should support these.

---

# PART 57 — FINAL COLOR RULE

Whenever you are unsure about a color:

Prefer:

```text
dark neutral
```

over:

```text
bright accent
```

Whenever you are unsure about an effect:

Prefer:

```text
subtle glow
```

over:

```text
strong neon glow
```

Whenever you are unsure about an image:

Prefer:

```text
relevant application UI
```

over:

```text
random stock photo
```

---

# PART 58 — FINAL IMAGE RULE

Every image must answer:

> "Why is this image here?"

If there is no good answer, don't use it.

Use images primarily for:

* Hero profile
* Project covers
* Project screenshots
* Optional workspace/developer visual

Do not fill empty space with random images.

---

# PART 59 — FINAL QUALITY STANDARD

The website should look like it was designed by a professional UI designer and implemented by a senior React developer.

The visual system must be consistent across:

* Colors
* Images
* Cards
* Typography
* Buttons
* Icons
* Borders
* Shadows
* Glows
* Animations
* Responsive layouts

The result should feel like **one coherent design system**.

---

# PART 60 — FINAL CHECKLIST

Before finishing, verify:

## Colors

* [ ] No pure black background
* [ ] No random colors
* [ ] Centralized color tokens
* [ ] Blue/violet brand identity
* [ ] Cyan used sparingly
* [ ] Emerald reserved for positive states
* [ ] Consistent borders
* [ ] Consistent text hierarchy
* [ ] Subtle glows
* [ ] No excessive neon

## Images

* [ ] Profile placeholder exists
* [ ] Chetibra placeholder exists
* [ ] Carbon Confession placeholder exists
* [ ] Marble CBT placeholder exists
* [ ] Images use correct aspect ratios
* [ ] Images are optimized
* [ ] Images have alt text
* [ ] Project images lazy-load
* [ ] Broken image fallback exists
* [ ] Images can be replaced easily

## Architecture

* [ ] Images are separated from components
* [ ] Project data is data-driven
* [ ] Asset paths are centralized
* [ ] No hardcoded image URLs
* [ ] No random stock images
* [ ] No giant component
* [ ] No duplicated project markup

## Responsive

* [ ] Desktop looks premium
* [ ] Tablet works correctly
* [ ] Mobile is intentionally designed
* [ ] Images don't overflow
* [ ] Glows are reduced on mobile
* [ ] Decorative elements don't cause horizontal scrolling

---

# FINAL INSTRUCTION TO CLAUDE

Treat this document as the **visual design system specification**.

Do not improvise a completely different color palette.

Do not use random placeholder images.

Do not use generic stock photography.

Use **dummy application UI mockups/placeholders** for projects until actual screenshots are provided.

Make every image replaceable without changing component architecture.

Keep all colors centralized.

Keep the visual hierarchy subtle and premium.

The final portfolio should communicate:

**"Professional React Native / Frontend Developer with strong technical skills and excellent design taste."**
