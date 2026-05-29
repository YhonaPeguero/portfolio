export interface Skill {
  name: string;
  /** 0–100, rendered as an RPG HP/MP bar */
  level: number;
}

export interface SkillCategory {
  id: string;
  title: string;
  /** Tailwind accent token: cyan | magenta | amber */
  accent: "cyan" | "magenta" | "amber";
  /** Single-line label, RPG-flavoured */
  subtitle: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    title: "FRONTEND CORE",
    accent: "cyan",
    subtitle: "Primary class · max level",
    skills: [
      { name: "React / Next.js", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "Tailwind CSS", level: 95 },
      { name: "Framer Motion / GSAP", level: 85 },
      { name: "Three.js / R3F", level: 78 },
    ],
  },
  {
    id: "web3",
    title: "WEB3 STACK",
    accent: "magenta",
    subtitle: "Secondary class · on-chain",
    skills: [
      { name: "Solana / Rust", level: 75 },
      { name: "EVM / Base", level: 80 },
      { name: "ethers / viem / wagmi", level: 82 },
      { name: "DeFi protocols", level: 78 },
      { name: "Smart-contract integration", level: 76 },
    ],
  },
  {
    id: "backend",
    title: "BACKEND & INFRA",
    accent: "amber",
    subtitle: "Support class · ships it",
    skills: [
      { name: "Node.js / APIs", level: 84 },
      { name: "PostgreSQL / Prisma", level: 78 },
      { name: "Vercel / Edge", level: 88 },
      { name: "CI/CD & Git", level: 86 },
      { name: "AI / LLM integration", level: 80 },
    ],
  },
  {
    id: "grinding",
    title: "CURRENTLY GRINDING",
    accent: "cyan",
    subtitle: "In progress · XP rising",
    skills: [
      { name: "Anchor (Solana programs)", level: 55 },
      { name: "WebGPU / shaders", level: 45 },
      { name: "AI agent frameworks", level: 60 },
      { name: "Rust (systems)", level: 50 },
    ],
  },
];
