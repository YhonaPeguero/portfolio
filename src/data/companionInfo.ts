import { profile } from "./profile";

export interface InfoTopic {
  id: string;
  /** Chip label */
  label: string;
  /** The visitor-facing question */
  question: string;
  /** Pre-written answer (no AI/API) */
  answer: string;
}

/**
 * The knowledge PIXL can surface about Yhonatan — pre-written, no API.
 * Clicking a chip reveals the answer inside the companion hologram.
 */
export const infoTopics: InfoTopic[] = [
  {
    id: "who",
    label: "Who is Yhonatan?",
    question: "Who is Yhonatan?",
    answer:
      "Yhonatan Peguero — a Senior Frontend Engineer based in the Dominican Republic with 5+ years building product-driven web apps. He works at the intersection of UX, performance and architecture, and is also a Web3 builder & DeFi contributor.",
  },
  {
    id: "stack",
    label: "Tech stack",
    question: "What does he build with?",
    answer:
      "Frontend: React, Next.js, TypeScript, Tailwind, Framer Motion & Three.js. Web3: Solana/Rust, EVM/Base, viem/wagmi. Backend & infra: Node.js, PostgreSQL, Vercel/Edge and AI/LLM integration.",
  },
  {
    id: "experience",
    label: "Experience",
    question: "Where has he worked?",
    answer:
      "Software Developer at Claro RD since 2023 (Sr. Software Engineer, 5+ yrs) — led a reusable React/Angular library (innovation award), cut user-reported issues 20% and page loads 40%. Earlier roles: BlackCode, OpenBootcamp, Boyants, Oracle ONE and a Bamapit internship. In Web3 he's been a Base LATAM Ambassador (Coinbase) and a Binance Angel.",
  },
  {
    id: "web3",
    label: "Web3 & DeFi",
    question: "What's his Web3 work?",
    answer:
      "He builds and contributes in DeFi: the StandX SIP Guide, K-milla (Hack@LATAM 2026), and RepuLink — an on-chain reputation experiment on Solana. He's also been a Base LATAM Ambassador (Coinbase) and a Binance Angel, creating educational content to drive Web3 adoption across LATAM.",
  },
  {
    id: "projects",
    label: "Top projects",
    question: "What should I look at first?",
    answer:
      "Start with the Mission Log: RustVenture (gamified Rust/Solana learning), Turboshop (auto-parts marketplace) and K-milla (civic-tech with grounded AI). Each card flips to reveal achievements & impact.",
  },
  {
    id: "contact",
    label: "How to reach him",
    question: "How do I get in touch?",
    answer: `He's open to senior frontend & Web3 roles and collaborations. Email ${profile.email}, or head to the CONNECT sector to send a transmission and find his socials.`,
  },
];
