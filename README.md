# Abdul Ahad — Portfolio

Personal site of Abdul Ahad, full-stack engineer. A scroll-driven story told by a single
particle system: the particles form my portrait, then a galaxy, a wave, a globe, a helix and
a vortex as you move through the chapters.

**Live:** https://ahad-devsite.netlify.app

## Stack

| Layer      | Choice                                                                    |
| ---------- | ------------------------------------------------------------------------- |
| Framework  | Next.js 16 (App Router, Turbopack, React Compiler, typed routes)          |
| UI         | React 19, Tailwind CSS 4 (CSS-first tokens), Geist + Instrument Serif     |
| 3D         | three.js + React Three Fiber — one canvas, one draw call, custom shaders  |
| Motion     | GSAP (ScrollTrigger, SplitText), Lenis smooth scroll, Motion for UI bits  |
| Contact    | Server Action → Resend, validated with Zod                                |
| Film       | Remotion (rendered from the same content + particle code as the site)     |
| Types/lint | TypeScript 7 (`tsc`) with the TS 6 API for tooling, ESLint 10, Prettier   |

## Project structure

```
src/
  content/        ← single source of truth: identity, projects, journey, skills, copy
  app/            ← routes, metadata, OG images, sitemap/robots/manifest
  sections/home/  ← the homepage chapters (Hero → Contact)
  components/
    three/        ← particle engine: shapes, shaders, scene state & director
    motion/       ← reveal, magnetic, cursor, smooth scroll
    layout/ ui/ brand/ project/
  features/contact/ ← form, schema, server action, email template
  lib/            ← utilities (gsap setup, seo, env, media queries…)
  styles/         ← globals.css with all design tokens
video/            ← Remotion intro film (scenes, particle renderer, timeline)
scripts/          ← asset pipeline, soundtrack synth, film render
assets/source/    ← original images (pipeline input)
```

**Want to change something?**

- Name, role, email, socials, availability → `src/content/site.ts`
- Projects (and their case-study pages) → `src/content/projects.ts`
- Timeline, skills, bio stats → `src/content/journey.ts`, `skills.ts`, `about.ts`
- Colours, type scale, easing → `src/styles/globals.css` (`@theme`) + `brand` in `site.ts`
- What the 3D does per chapter → `chapters` in `src/components/three/scene-state.ts`

Stats, counts, sitemap, JSON-LD, OG images and the film are all derived from these files.

## Getting started

```bash
npm install
cp .env.example .env.local   # add your Resend key
npm run dev
```

| Script                 | What it does                                                      |
| ---------------------- | ----------------------------------------------------------------- |
| `npm run dev`          | Dev server                                                        |
| `npm run build`        | Production build                                                  |
| `npm run check`        | Type-check + lint + formatting                                    |
| `npm run assets`       | Re-generate optimised images + portrait map from `assets/source`  |
| `npm run video:studio` | Open the intro film in Remotion Studio                            |
| `npm run video:render` | Render the film (+ soundtrack, poster, captions) to `public/media` |

## Contact form (Resend)

1. Create an API key at [resend.com/api-keys](https://resend.com/api-keys).
2. Set `RESEND_API_KEY` in `.env.local` and in Netlify → Site configuration → Environment
   variables (mark it as a secret). It is the only variable the site needs.
3. Sender, recipient and site URL have defaults in code (see `.env.example`). Leave them unset
   unless you need to change them. The default sender is Resend's shared onboarding address,
   which only delivers to the email that owns the Resend account; after verifying your own
   domain in Resend, set `CONTACT_FROM_EMAIL` to an address on that domain.

Spam protection: honeypot field, minimum fill time, per-IP rate limit, server-side validation.

## Performance notes

- Hero text is server-rendered; WebGL loads in an idle callback after first paint.
- Particle count and pixel ratio adapt to the device (and drop under load); Save-Data and
  no-WebGL visitors get the site without the canvas.
- `prefers-reduced-motion` disables smooth scrolling, text animation, autoplay and swirl.
- Images are AVIF/WebP via `next/image`; the film loads only when it nears the viewport.

## Deploy

Netlify builds with `npm run build` (see `netlify.toml`). To move to a custom domain, set
`NEXT_PUBLIC_SITE_URL` — canonical URLs, sitemap, OG images and JSON-LD follow automatically.
