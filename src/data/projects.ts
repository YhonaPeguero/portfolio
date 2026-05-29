import foreverPinkCover from "../assets/forever-pink-cover.jpg";

export interface Project {
  /** Display id, e.g. M-01 */
  code: string;
  name: string;
  /** Short genre/role tag shown on the card chrome */
  classTag: string;
  rank: "S" | "A" | "B";
  live: string;
  github?: string;
  /** One-line briefing (front of card) */
  brief: string;
  /** Tech badges — styled as game item chips */
  stack: string[];
  /** Recruiter-readable achievements (back of card) */
  achievements: string[];
  /** Quantified impact / outcome */
  impact: string;
  cover?: string;
}

/**
 * Mission Log — ordered most-impactful-first for recruiters.
 * Descriptions extracted from each project's GitHub README + live site.
 * Numbers (40+ brands, 28 services, 15M citizens, Hack@LATAM) are real,
 * pulled from the source READMEs — not fabricated.
 */
export const projects: Project[] = [
  {
    code: "M-01",
    name: "RustVenture",
    classTag: "EDU · WEB3 GAME",
    rank: "S",
    live: "https://rust-venture.vercel.app",
    github: "https://github.com/YhonaPeguero/RustVenture",
    brief:
      "Gamified learning platform that turns Rust & Solana's brutal learning curve into an XP-driven adventure.",
    stack: [
      "React 18",
      "Vite",
      "Tailwind",
      "Framer Motion",
      "Web Audio API",
      "Canvas Confetti",
      "Solana",
    ],
    achievements: [
      "Built an interactive adventure map with progressive difficulty, XP and unlockable badges (e.g. 'RustVenture Hero').",
      "Adaptive curriculum that tailors lessons to the learner's existing programming background.",
      "Immersive UX layer: Web Audio API ambient lo-fi, chimes, and confetti reward loops with LocalStorage progress persistence.",
    ],
    impact:
      "Lowers the entry barrier into Solana/Rust for Web3 newcomers — full client-side, zero backend, instantly shippable.",
  },
  {
    code: "M-02",
    name: "Turboshop",
    classTag: "MARKETPLACE · E-COM",
    rank: "S",
    live: "https://turboshop.vercel.app",
    github: "https://github.com/YhonaPeguero/turboshop",
    brief:
      "Two-sided auto-parts marketplace connecting repair shops with suppliers — 'Repuestos en 90 Minutos · Modo Nitro'.",
    stack: ["Next.js", "TypeScript", "Tailwind", "Google Maps API", "Vercel"],
    achievements: [
      "Designed a dual-onboarding flow with separate journeys for workshops and parts suppliers.",
      "Parts-compatibility lookup by license plate, OEM number or vehicle model across 40+ brands (Toyota, BMW, Nissan…).",
      "Conversion-focused storefront built around a 90-minute delivery promise and a 3-step search → validate → receive UX.",
    ],
    impact:
      "Covers 40+ vehicle brands with a 90-minute delivery value-prop targeting Santiago's Metropolitan Region repair market.",
  },
  {
    code: "M-03",
    name: "K-milla",
    classTag: "CIVIC TECH · AI",
    rank: "A",
    live: "https://k-milla.vercel.app",
    github: "https://github.com/YhonaPeguero/K-milla",
    brief:
      "Civic-tech tool that makes Chile's public-health spending & surgery waitlists legible in plain language.",
    stack: ["Next.js 16", "Turbopack", "TypeScript", "Tailwind", "MiniMax AI", "Vercel"],
    achievements: [
      "Unified two disconnected government datasets (DIPRES budgets + MINSAL waitlists) into a single search box.",
      "8-quarter sparklines and year-over-year variance across 28 regional health services with a documented data-audit trail.",
      "Grounded conversational AI assistant constrained to the injected dataset — search works 100% offline, no hallucination.",
    ],
    impact:
      "Built for Hack@LATAM 2026 (Transparency & Corruption track), surfacing public-health data relevant to ~15M Chileans.",
  },
  {
    code: "M-04",
    name: "StandX SIP Guide",
    classTag: "DEFI · COMMUNITY",
    rank: "A",
    live: "https://standx-sip-guide.vercel.app",
    github: "https://github.com/YhonaPeguero/standx-sip-guide",
    brief:
      "Community explainer that demystifies StandX's SIP governance process for the wider DeFi audience.",
    stack: ["JavaScript", "Vite", "Tailwind", "Vercel"],
    achievements: [
      "Translated dense DeFi/governance proposal mechanics into an approachable, scannable explainer.",
      "Open contribution to the StandX community — built and shipped independently to support protocol adoption.",
      "Clean, fast, fully responsive static deploy optimized for sharing across community channels.",
    ],
    impact:
      "Reduces onboarding friction for StandX governance participants — a real open-source DeFi community contribution.",
  },
  {
    code: "M-05",
    name: "Forever Pink",
    classTag: "CLIENT · BRAND",
    rank: "B",
    live: "https://forever-pink-website.vercel.app",
    github: "https://github.com/YhonaPeguero/Forever-Pink_website",
    cover: foreverPinkCover,
    brief:
      "Polished brand site for Forever Pink Beauty Lounge (St. Thomas) — delivered for a real client.",
    stack: ["React", "Vite", "Tailwind", "Framer Motion", "Vercel"],
    achievements: [
      "Translated a beauty-brand identity into an elegant, conversion-oriented one-page experience.",
      "Mobile-first responsive layout with smooth scroll-reveal motion and clear service/booking CTAs.",
      "Shipped end-to-end for a paying client, from design direction through production deploy.",
    ],
    impact:
      "Real client delivery — demonstrates turning a brand brief into a live, marketing-ready web presence.",
  },
];
