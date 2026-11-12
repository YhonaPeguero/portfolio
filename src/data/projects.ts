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
 * Mission Log — a single list of exactly six projects, ordered
 * most-impactful-first (RepuLink, the flagship, always leads). Web2/Web3 is
 * shown as a small per-card badge (no separate tab row). Six fills the grid, so
 * the "See more" toggle stays hidden unless a seventh is added. Briefs are
 * intentionally one short line; the longer detail (achievements + impact)
 * lives on the card's hover/focus face.
 *
 * Data is real — pulled from each project's GitHub README + live site.
 */
export const projects: Project[] = [
  {
    code: "M-01",
    name: "RepuLink",
    category: "web3",
    classTag: "FOUNDER · SOLANA",
    rank: "S",
    live: "https://repu-link.vercel.app",
    github: "https://github.com/YhonaPeguero/RepuLink",
    brief:
      "Incubated by WayLearn × Solana Foundation LATAM: escrow that turns paid work into on-chain reputation.",
    stack: ["Rust", "Anchor", "Solana Kit", "Codama", "React 19", "TypeScript"],
    achievements: [
      "The client funds a program-owned vault; release, refund and dispute are enforced by a 7-state on-chain machine.",
      "Settled jobs can be attested via the Solana Attestation Service: the track record belongs to the wallet.",
      "15 LiteSVM integration tests (role swaps, invalid transitions, vault substitution) and a Codama-generated client.",
    ],
    impact:
      "Founder-built MVP live on Solana devnet: seeded jobs can be explored without connecting a wallet.",
  },
  {
    code: "M-02",
    name: "StandX Community Hub",
    category: "web3",
    classTag: "COMMUNITY · AI",
    rank: "S",
    live: "https://standx-community-hub.vercel.app/en",
    github: "https://github.com/YhonaPeguero/standx-community-hub",
    brief:
      "Onboarding hub for the StandX perps DEX community, with an AI guide grounded in official docs.",
    stack: ["Next.js 14", "TypeScript", "Tailwind", "next-intl", "Three.js", "LLM API"],
    achievements: [
      "Rebuilt a community-run hub in Next.js: seven sections, from onboarding to brand kit, in six languages.",
      "Stander, the AI guide, reads the official docs, links its source page and navigates the hub on request. No login.",
      "Free-tier LLM chain (Gemini, Mistral, Groq, OpenRouter) with rate-limit fallthrough to an offline knowledge base.",
    ],
    impact: "Independent community project, free and login-free.",
  },
  {
    code: "M-03",
    name: "StandX SIP Guide",
    category: "web3",
    classTag: "DEFI · EDUCATION",
    rank: "S",
    live: "https://standx-sip-guide.vercel.app/#/en/overview",
    github: "https://github.com/YhonaPeguero/standx-sip-guide",
    brief:
      "Interactive guide to the StandX DEX's improvement proposals (SIPs), with a live yield simulator.",
    stack: ["React 18", "Vite", "Tailwind", "Framer Motion", "GitHub Actions"],
    achievements: [
      "Yield simulator, yield-loop walkthrough and a Community Vaults (SIP-5B) section, in five languages.",
      "Deep-linkable hash routes carry locale and section, so any view is shareable from a static deploy.",
      "GitHub Actions CI on every PR: lint, build, i18n coverage and simulator-math checks.",
    ],
    impact: "Shared by the StandX team in their official Discord, with author credit.",
  },
  {
    code: "M-04",
    name: "StandX Stats",
    category: "web3",
    classTag: "DEFI · ANALYTICS",
    rank: "A",
    live: "https://standx-stats.vercel.app",
    brief:
      "Turns a StandX perps trade export into a performance dashboard, parsed entirely in the browser.",
    stack: ["React 18", "Vite", "Canvas API", "Vercel"],
    achievements: [
      "Computes realized PnL, win rate, profit factor, fees and per-market results from raw trade and order exports.",
      "Private by design: files are parsed locally, with no login and nothing sent to a server.",
      "Generates a shareable stats card and ships sample data to try it without an account. English and Spanish.",
    ],
    impact:
      "Free community tool: traders review their own performance without handing their history to a third party.",
  },
  {
    code: "M-05",
    name: "StandX Growth Path RPG",
    category: "web3",
    classTag: "EDU · GAME",
    rank: "A",
    live: "https://rpg-standx-game.vercel.app",
    github: "https://github.com/YhonaPeguero/rpg-standx-game",
    brief:
      "Narrative browser RPG that teaches newcomers how to rank up in the StandX DEX community.",
    stack: ["Next.js 16", "React 19", "TypeScript", "Zustand", "Zod", "Vitest"],
    achievements: [
      '"Episode I: Origin": six story zones with dialog, quizzes and mini-games, plus daily, weekly and community quests.',
      "Local-first: game state in Zustand + localStorage and Zod-validated content, no backend. Five locales.",
      "Core systems (points, ranks, gates, streaks, quests) covered by Vitest unit tests.",
    ],
    impact:
      "Makes the path from New Stander to Seed, Sprout and Flower something you play instead of read.",
  },
  {
    code: "M-06",
    name: "Wave Rush",
    category: "web3",
    classTag: "GAME · THREE.JS",
    rank: "A",
    live: "https://stand-x-wave-rush.vercel.app",
    brief:
      "Cel-shaded browser boat racer with a StandX theme, extended from the open-source Wave-Racer.",
    stack: ["Three.js", "GLSL", "Web Audio API", "Vite"],
    achievements: [
      "Extends the open-source Wave-Racer base (Three.js) with StandX identity and a mascot rider.",
      "Adds a nitro system fed by drifts, slipstream and clean landings on top of the base racing loop.",
      "Pause menu with audio, controls and graphics settings.",
    ],
    impact: "A playable community game that runs in the browser with no install or login.",
  },
];
