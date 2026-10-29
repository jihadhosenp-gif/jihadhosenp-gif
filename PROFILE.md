# Portfolio profile: Jihad Hosen

Source of truth for the portfolio site. Same palette as the GitHub profile so both read as one identity.

## Identity

- **Name:** Jihad Hosen
- **Role:** Full-Stack Developer (fresher, learning and building projects)
- **Tagline:** Interfaces that respond. Backends that hold.
- **Focus now:** advanced React, backend development with Node.js
- **Contact:** jihadhosenp@gmail.com
- **Links:** [GitHub](https://github.com/jihadhosenp-gif), [LinkedIn](https://linkedin.com/in/jihad-hosen), [Facebook](https://fb.com/jihadhussin85), [Discord](https://discord.gg/jihad004410)

## Design tokens

| Token | Value |
| --- | --- |
| Background | `#070A12` |
| Secondary | `#0D1321` |
| Primary | `#7C5CFF` |
| Accent | `#00E5FF` |
| Highlight | `#B8FF6A` |
| Text | `#F5F7FF` |
| Muted | `#9AA6BD` |

Add these to `tailwind.config` under `theme.extend.colors` (for example `ink`, `panel`, `violet`, `cyan`, `lime`) and replace the hex values in the components if you prefer tokens.

## Skills

Defined once in `data/skills.ts`. Filled nodes are working knowledge, hollow wireframe nodes are skills still being learned. There are no percentages or ratings.

| Orbit | Geometry | Skills |
| --- | --- | --- |
| Frontend | Icosahedron | HTML, CSS, JavaScript, React.js, Tailwind CSS, Next.js (learning), TypeScript (learning) |
| Backend | Cube | Node.js, Express.js, REST APIs, authentication, server-side development (all learning) |
| Database | Hexagonal prism | MongoDB (learning) |
| Tools | Tetrahedron | Git, GitHub, VS Code, npm, Vercel |
| Creative tech | Octahedron | Framer Motion, GSAP, Three.js, React Three Fiber (all learning) |

## Sections

1. **Hero:** name, role, tagline, link to projects. *(Not built yet: custom 3D hero geometry.)*
2. **Skill universe:** `SkillUniverseLoader` (built). Orbit selection, tap or hover a node, camera glide between orbits, pointer depth, reduced-motion support, list fallback.
3. **Projects:** gallery of real repositories. *(Not built yet. Needs your real repo names, descriptions and demo URLs.)*
4. **Journey:** foundations in HTML, CSS and JavaScript, then React and Tailwind CSS, now advanced React and Node.js, next 3D and motion.
5. **Contact:** email and social links above. *(Not built yet.)*

## Install

```bash
npm install three @react-three/fiber @react-three/drei framer-motion
npm install -D @types/three
```

Skip any package your project already has. `@react-three/fiber` v8 pairs with React 18, v9 with React 19.

## Use

Copy the files into your project, keeping the `@/data/skills` import path valid for your alias:

```
data/skills.ts
components/SkillUniverse.tsx
components/SkillUniverseLoader.tsx
```

```tsx
import SkillUniverseLoader from '@/components/SkillUniverseLoader';

export default function SkillsSection() {
  return (
    <section id="skills" className="mx-auto max-w-5xl px-4 py-24">
      <h2 className="text-3xl font-bold text-[#F5F7FF]">Skills</h2>
      <p className="mt-2 text-[#9AA6BD]">What I work with, and what I am still learning.</p>
      <div className="mt-8"><SkillUniverseLoader /></div>
    </section>
  );
}
```

If your project uses the Pages Router or plain React, remove `'use client'` and swap `next/dynamic` for `React.lazy` with `Suspense`.

## Run and deploy

```bash
npm run dev      # local
npm run lint
npm run build    # type check and production build
```

Deploy by pushing to GitHub and importing the repo in Vercel. No environment variables or secrets are needed.

## Placeholders to fill

- Project names, descriptions, repo links and demo links
- Which skills are "learning" (edit `learning: true` in `data/skills.ts`)
- Optional profile photo
