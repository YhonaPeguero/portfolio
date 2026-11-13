export interface SideQuest {
  /** Stable key: translations in src/i18n/content are matched by it */
  id: string;
  title: string;
  org: string;
  status: "COMPLETE" | "ACTIVE" | "ONGOING";
  /** Optional date range */
  period?: string;
  description: string;
  link?: string;
}

/**
 * Web3 & open-source "side quests" — community + on-chain activity.
 * Sourced from LinkedIn + project briefs.
 */
export const sideQuests: SideQuest[] = [
  {
    id: "repulink",
    title: "RepuLink (Solana)",
    org: "Solana · Reputation",
    status: "COMPLETE",
    description:
      "On-chain reputation experiment on Solana — exploring verifiable identity & trust primitives in Web3.",
  },
  {
    id: "binance-angel",
    title: "Binance Angel",
    org: "Binance · Web3",
    period: "2026",
    status: "COMPLETE",
    description:
      "Web3 technical-community role — designed educational content for builders and helped newcomers use the crypto ecosystem responsibly.",
  },
  {
    id: "base-latam-ambassador",
    title: "Base LATAM Ambassador",
    org: "Coinbase · Base",
    period: "2025 — 2026",
    status: "COMPLETE",
    description:
      "Created technical & educational content to drive Web3 adoption across LATAM — accessible, practical onchain onboarding for the Base community.",
  },
  {
    id: "hack-latam-2026",
    title: "Hack@LATAM 2026 — K-milla",
    org: "Hackathon · Civic Tech",
    status: "COMPLETE",
    description:
      "Built K-milla for the Transparency & Corruption track — public-health spending made legible with grounded AI.",
    link: "https://k-milla.vercel.app",
  },
  {
    id: "standx-contributions",
    title: "StandX Community Contributions",
    org: "StandX · DeFi",
    status: "COMPLETE",
    description:
      "Built and shipped the StandX SIP Guide to help the community understand the protocol's governance process.",
    link: "https://standx-sip-guide.vercel.app",
  },
];
