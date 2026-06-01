import foreverPinkCover from "../assets/forever-pink-cover.jpg";

export type ProjectCategory = "web2" | "web3";

export interface Project {
  /** Display id, e.g. M-01 */
  code: string;
  name: string;
  category: ProjectCategory;
  /** Short genre/role tag shown on the card chrome */
  classTag: string;
  rank: "S" | "A" | "B";
  live: string;
  github?: string;
  /** One-line briefing (front of card) — keep it short */
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
 * Mission Log — a single list ordered most-impactful-first (flagship builds
 * up top, client landings last). Web2/Web3 is shown as a small per-card badge
 * (no separate tab row). The first few render up front; the rest are behind a
 * "See more" toggle. Briefs are intentionally one short line; the longer detail
 * (achievements + impact) lives on the card's hover/focus face.
 *
 * Data is real — pulled from each project's GitHub README + live site.
 */
export const projects: Project[] = [
  {
    code: "M-01",
    name: "RustVenture",
    category: "web3",
    classTag: "EDU · SOLANA",
    rank: "S",
    live: "https://rust-venture.vercel.app",
    github: "https://github.com/YhonaPeguero/RustVenture",
    brief: "Gamified platform that turns the Rust & Solana learning curve into an XP-driven adventure.",
    stack: ["React 18", "Vite", "Tailwind", "Framer Motion", "Web Audio API", "Solana"],
    achievements: [
      "Built an interactive adventure map with progressive difficulty, XP and unlockable badges (e.g. 'RustVenture Hero').",
      "Adaptive curriculum that tailors lessons to the learner's existing programming background.",
      "Immersive UX: Web Audio API ambient audio, chimes and confetti reward loops with LocalStorage progress.",
    ],
    impact:
      "Lowers the entry barrier into Solana/Rust for Web3 newcomers — full client-side, zero backend, instantly shippable.",
  },
  {
    code: "M-02",
    name: "Turboshop",
    category: "web2",
    classTag: "MARKETPLACE · E-COM",
    rank: "S",
    live: "https://turboshop.vercel.app",
    github: "https://github.com/YhonaPeguero/turboshop",
    brief: "Two-sided auto-parts marketplace built around a 90-minute delivery promise.",
    stack: ["Next.js", "TypeScript", "Tailwind", "Google Maps API", "Vercel"],
    achievements: [
      "Designed a dual-onboarding flow with separate journeys for workshops and parts suppliers.",
      "Parts-compatibility lookup by license plate, OEM number or vehicle model across 40+ brands.",
      "Conversion-focused storefront with a 3-step search → validate → receive UX.",
    ],
    impact:
      "Covers 40+ vehicle brands with a 90-minute delivery value-prop targeting Santiago's repair market.",
  },
  {
    code: "M-03",
    name: "K-milla",
    category: "web2",
    classTag: "CIVIC TECH · AI",
    rank: "S",
    live: "https://k-milla.vercel.app",
    github: "https://github.com/YhonaPeguero/K-milla",
    brief: "Makes Chile's public-health spending & surgery waitlists legible in plain language.",
    stack: ["Next.js 16", "Turbopack", "TypeScript", "Tailwind", "MiniMax AI", "Vercel"],
    achievements: [
      "Unified two disconnected government datasets (DIPRES budgets + MINSAL waitlists) into one search box.",
      "8-quarter sparklines and year-over-year variance across 28 regional health services.",
      "Grounded AI assistant constrained to the injected dataset — search works 100% offline, no hallucination.",
    ],
    impact:
      "Built for Hack@LATAM 2026 (Transparency track), surfacing public-health data relevant to ~15M Chileans.",
  },
  {
    code: "M-04",
    name: "StandX SIP Guide",
    category: "web3",
    classTag: "DEFI · COMMUNITY",
    rank: "A",
    live: "https://standx-sip-guide.vercel.app",
    github: "https://github.com/YhonaPeguero/standx-sip-guide",
    brief: "Community explainer that demystifies StandX's SIP governance for DeFi users.",
    stack: ["JavaScript", "Vite", "Tailwind", "Vercel"],
    achievements: [
      "Translated dense DeFi/governance proposal mechanics into an approachable, scannable explainer.",
      "Open contribution to the StandX community — built and shipped independently.",
      "Clean, fast, fully responsive static deploy optimized for sharing.",
    ],
    impact: "Reduces onboarding friction for StandX governance — a real open-source DeFi community contribution.",
  },
  {
    code: "M-05",
    name: "Vocational AI",
    category: "web2",
    classTag: "AI · GUIDANCE",
    rank: "A",
    live: "https://vocational-ai.vercel.app",
    github: "https://github.com/YhonaPeguero/VocationalAI",
    brief: "AI-powered career guide that helps users explore professional paths.",
    stack: ["React", "Vite", "Tailwind", "LLM API"],
    achievements: [
      "Built a conversational flow that turns user inputs into tailored vocational guidance.",
      "Clean, responsive single-page experience with a focused, low-friction UX.",
    ],
    impact: "Applies LLMs to a real-world guidance use-case in an approachable, accessible interface.",
  },
  {
    code: "M-06",
    name: "LLM Token Calculator",
    category: "web2",
    classTag: "DEV TOOL · AI",
    rank: "A",
    live: "https://llmtokenscalulator.netlify.app",
    github: "https://github.com/YhonaPeguero/llms-tokens-calculator",
    brief: "Dev utility to estimate token counts and cost for LLM prompts.",
    stack: ["React", "Vite", "Tailwind"],
    achievements: [
      "Instant client-side token estimation to help developers budget prompts and API spend.",
      "Lightweight, single-purpose tool with a fast, no-friction interface.",
    ],
    impact: "A practical utility for anyone building on LLM APIs — ships as a zero-backend static app.",
  },
  {
    code: "M-07",
    name: "Forever Pink",
    category: "web2",
    classTag: "CLIENT · BRAND",
    rank: "A",
    live: "https://forever-pink-website.vercel.app",
    github: "https://github.com/YhonaPeguero/Forever-Pink_website",
    cover: foreverPinkCover,
    brief: "Polished brand site for a beauty lounge — real client delivery.",
    stack: ["React", "Vite", "Tailwind", "Framer Motion", "Vercel"],
    achievements: [
      "Translated a beauty-brand identity into an elegant, conversion-oriented one-page experience.",
      "Mobile-first responsive layout with smooth scroll-reveal motion and clear booking CTAs.",
      "Shipped end-to-end for a paying client, from design direction through production deploy.",
    ],
    impact: "Real client delivery — turning a brand brief into a live, marketing-ready web presence.",
  },
  {
    code: "M-08",
    name: "Digital Thrive",
    category: "web2",
    classTag: "CLIENT · AGENCY",
    rank: "A",
    live: "https://digitalthrivee.com",
    brief: "Marketing landing page for a client's digital-services brand.",
    stack: ["React", "Tailwind", "Vercel"],
    achievements: [
      "Built a responsive, conversion-focused landing page from a client brief.",
      "Delivered on a custom domain in production.",
    ],
    impact: "Live client work running on its own domain (digitalthrivee.com).",
  },
  {
    code: "M-09",
    name: "LeoPrint",
    category: "web2",
    classTag: "CLIENT · LANDING",
    rank: "A",
    live: "https://leo-print.vercel.app",
    brief: "Landing page built for a print-services client.",
    stack: ["React", "Tailwind", "Vercel"],
    achievements: ["Clean, responsive landing page tailored to the client's services and brand."],
    impact: "Client deliverable shipped to production.",
  },
  {
    code: "M-10",
    name: "Promo Visa",
    category: "web2",
    classTag: "CLIENT · CAMPAIGN",
    rank: "A",
    live: "https://promo-visa.netlify.app",
    brief: "Promotional campaign landing page for a client offer.",
    stack: ["JavaScript", "CSS", "Netlify"],
    achievements: ["Built a focused promo/campaign page optimized for a single conversion goal."],
    impact: "Campaign landing delivered for a client promotion.",
  },
  {
    code: "M-11",
    name: "Anime App",
    category: "web2",
    classTag: "APP · API",
    rank: "A",
    live: "https://anime-app-ob.netlify.app",
    github: "https://github.com/fabioalcocer/anime-app",
    brief: "Anime browser app consuming a public API to search titles.",
    stack: ["React", "Vite", "Tailwind", "REST API"],
    achievements: [
      "Built API-driven search and listing with a responsive React UI.",
      "Collaborative build practicing data-fetching and component composition.",
    ],
    impact: "Hands-on practice consuming and rendering live API data in React.",
  },
];
