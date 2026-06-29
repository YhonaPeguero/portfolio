# YHONATAN_OS // v2.0

An interactive, cyberpunk / anime / retro-gaming portfolio landing page for
**Yhonatan Peguero** — Senior Software Engineer · Web3 Builder · DeFi Contributor.

It's built to feel like the boot screen of a next-gen game: a live 3D hero scene,
a terminal boot sequence, an AI guide companion, and RPG-styled sections — while
staying fast, accessible and recruiter-friendly.

![stack](https://img.shields.io/badge/React-18-00F5FF?style=flat-square)
![stack](https://img.shields.io/badge/TypeScript-5-FF006E?style=flat-square)
![stack](https://img.shields.io/badge/Three.js-r168-FFB800?style=flat-square)

---

## ✦ Features

- **Hero "Boot Sequence"** — full-viewport Three.js scene (neon infinite grid,
  particle field, floating wireframe shards, mouse-parallax camera) with a
  terminal boot log and a scramble-in name. Degrades to a CSS-animated grid when
  WebGL is unavailable.
- **Tech Arsenal** — skill nodes with RPG HP/MP-style proficiency bars, grouped
  into Frontend Core / Web3 Stack / Backend & Infra / Currently Grinding.
- **Mission Log** — recruiter-priority project cards. Hover/focus flips a card to
  reveal achievements + quantified impact. Real data pulled from each project's
  GitHub README and live site.
- **Character Stats** — experience timeline as an RPG progression tree.
- **Side Quests** — Web3 & open-source activity with quest-status indicators.
- **Initiate Connection** — terminal-style contact form (composes a `mailto:`,
  no backend) + glowing social HUD icons.
- **PIXL** — an AI guide companion (bottom-right) that reacts to your scroll
  position with pre-written, anime-flavoured dialogue. No external AI API.

## ✦ Accessibility & performance

- Graceful WebGL fallback (CSS background) — see `src/lib/webgl.ts`.
- Full keyboard navigation, visible neon focus rings, and a skip link.
- `prefers-reduced-motion` honoured throughout (3D loop pauses, grain/beam hidden,
  transitions collapsed).
- Body text contrast ≥ 4.5:1 (`#E8EEF2` / `#9AA7B4` on `#0A0A0F`).
- Heavy 3D layer is code-split and lazy-loaded via `React.lazy` + `Suspense`, so
  the initial bundle is small (~50 KB gzip) and Three.js only loads when WebGL is
  present.

## ✦ Tech stack & rationale

| Tool | Why |
|------|-----|
| **Vite + React + TypeScript** | Fast DX, tree-shaking, type safety |
| **three / @react-three/fiber / drei** | Declarative 3D hero scene |
| **Framer Motion** | Scroll reveals & micro-interactions (spring physics) |
| **GSAP** | Available for timeline sequencing (boot/scramble use lightweight hooks) |
| **Tailwind CSS** | Utility-first styling with a custom neon theme |
| **Lucide React** | Tree-shakable icons |

> Dropped from a generic scaffold to keep the bundle lean: `react-router`
> (single page), `react-scroll` (native `scrollIntoView`) and
> `react-intersection-observer` (native `IntersectionObserver` hook).

## ✦ Project structure

```
src/
  data/         # profile, projects, skills, experience, side quests, dialogue
  lib/          # webgl detection + hooks (reduced-motion, active section, typewriter, scramble)
  components/
    fx/         # CRT scanline / grain / vignette overlays
    layout/     # HUD nav, footer
    three/      # HeroScene + CSS fallback
    companion/  # PIXL AI guide
    projects/   # MissionCard
    sections/   # Hero, Skills, Projects, Experience, SideQuests, Contact
    ui/         # GameButton, SectionHeading, TechChip, BootLog
  App.tsx       # composition + stack rationale
```

## ✦ Getting started

```bash
npm install       # install dependencies
npm run dev       # start the dev server (http://localhost:5173)
npm run build     # production build → dist/
npm run preview   # preview the production build
npm run typecheck # tsc --noEmit
```

Requires **Node 22**.

## ✦ Deployment (Vercel)

Zero additional configuration — import the repo into Vercel and it auto-detects
the Vite framework. `vercel.json` pins the framework, build command and output
directory explicitly:

```jsonc
{ "framework": "vite", "buildCommand": "npm run build", "outputDirectory": "dist" }
```

## ✦ Customising content

Everything is data-driven — edit the files in `src/data/` to update copy:

- `profile.ts` — name, roles, socials, CV (and the X/Twitter handle to verify).
- `projects.ts` — the Mission Log cards. Each has a `category: "web2" | "web3"`
  which drives the WEB2 / WEB3 tabs; copy an entry to add a project.
- `skills.ts` / `experience.ts` / `sideQuests.ts` — section content.
- `companionInfo.ts` — the topics/answers PIXL surfaces about you.

### Hero figure asset

The hero right-panel renders a single composite artwork (the holographic dev
figure with the AI-agent nodes baked in) from:

```
public/hero/figure.png
```

The image's black background is dropped with `mix-blend-mode: screen`, so only
the blue hologram blends onto the hero. Drag rotates it on the Y axis (with
inertia), it scales/parallaxes and dissolves on scroll, idle-floats, and has a
hue-rotate flicker + scanline overlay. Renders on `lg+` screens and respects
`prefers-reduced-motion`. If `figure.png` is missing the panel stays empty (no
placeholder art). To swap the file, just replace it — the path is the `ASSETS`
constant in `src/components/three/HeroFigure.tsx`.

---

Built with React · Three.js · Framer Motion · Tailwind.
