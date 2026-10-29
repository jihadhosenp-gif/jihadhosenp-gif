# Portfolio profile: Jihad Hosen

Source of truth for the portfolio site. Same palette as the GitHub profile so both read as one identity.

## Identity

| Field | Value |
| --- | --- |
| Name | Jihad Hosen |
| Role | Full-Stack Developer |
| Tagline | Interfaces that respond. Backends that hold. |
| Focus now | advanced React, backend development with Node.js |
| Contact | jihadhosenp@gmail.com |
| Links | [GitHub](https://github.com/jihadhosenp-gif), [LinkedIn](https://linkedin.com/in/jihad-hosen), [Facebook](https://fb.com/jihadhussin85), [Discord](https://discord.gg/jihad004410) |

## Design tokens

| Token | Value | Role |
| --- | --- | --- |
| Background | `#070A12` | deep ink |
| Secondary | `#0D1321` | panel / surface |
| Primary | `#7C5CFF` | violet |
| Accent | `#00E5FF` | cyan |
| Highlight | `#B8FF6A` | lime |
| Text | `#F5F7FF` | body text |
| Muted | `#9AA6BD` | secondary text |

Add these to `tailwind.config.ts` under `theme.extend.colors`:

```ts
extend: {
  colors: {
    ink: '#070A12',
    panel: '#0D1321',
    violet: '#7C5CFF',
    cyan: '#00E5FF',
    lime: '#B8FF6A',
    text: '#F5F7FF',
    muted: '#9AA6BD',
  },
},
```

## Stack

- **Framework:** Next.js 14 (App Router), TypeScript
- **Styling:** Tailwind CSS
- **3D:** `@react-three/fiber`, `@react-three/drei`, `three`
- **Motion:** `framer-motion`
- **Icons:** heroicons / devicons via SVG
- **Deploy:** Vercel

Install:

```bash
cd portfolio
npm install three @react-three/fiber @react-three/drei framer-motion
npm install -D @types/three tailwindcss postcss autopersist
```

## Data model

Defined once in `data/skills.ts`. Filled nodes are working knowledge; hollow wireframe nodes are skills still being learned. No percentages or ratings.

```
data/skills.ts        -> CATEGORIES with orbits, geometry, skills
components/Hero.tsx   -> cinematic 3D hero geometry
components/SkillUniverse.tsx -> interactive 3D skill constellation
components/ProjectGallery.tsx -> original project gallery
components/Journey.tsx   -> developer journey
components/Contact.tsx   -> contact section
```

## Sections

1. **Hero:** name, role, tagline, link to projects. Custom 3D hero geometry (rotating wireframe core), floating symbols.
2. **Skill universe:** `SkillUniverseLoader`. Orbit selection, tap/hover a node to reveal name + description, camera glide between orbits, pointer depth, touch-friendly drag, reduced-motion support, list fallback.
3. **Projects:** gallery of real repositories. Placeholder rows to fill with real repo names, descriptions, demo URLs.
4. **Journey:** foundations HTML/CSS/JS, then React/Tailwind, now advanced React + Node.js, next 3D/motion.
5. **Contact:** email + social links.

## Component conventions

- All 3D components are `'use client'`; wrapped with `next/dynamic` (`ssr: false`) to avoid hydration errors and browser-only APIs during server rendering.
- `SkillUniverseLoader` detects WebGL, falls back to an accessible HTML skill list on weak devices or when WebGL is missing.
- `prefers-reduced-motion` is respected: animations disabled, camera uses direct cuts instead of lerp.
- Keyboard navigation: orbit buttons are `<button type="button">` with `aria-pressed`, focus-visible rings.
- Touch: canvas uses `touchAction="pan-y"`; drag rotates the universe on mobile.
- No fabricated personal information or project achievements.

## File layout (portfolio/)

```
portfolio/
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── Hero.tsx
│   ├── SkillUniverse.tsx
│   ├── SkillUniverseLoader.tsx
│   ├── ProjectGallery.tsx
│   ├── Journey.tsx
│   └── Contact.tsx
├── data/
│   └── skills.ts
└── lib/
    └── utils.ts
```

## Run and deploy

```bash
cd portfolio
npm install
npm run dev      # local dev at http://localhost:3000
npm run lint
npm run build    # type check + production build
npm start        # production server
```

Deploy by pushing to GitHub and importing the repo in Vercel. No environment variables or secrets are needed.

## Placeholders to fill

- Project names, descriptions, repo links and demo links in `components/ProjectGallery.tsx`
- Which skills are "learning" (edit `learning: true` in `data/skills.ts`)
- Optional profile photo in `components/Hero.tsx`
