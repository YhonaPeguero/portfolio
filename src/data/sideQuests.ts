export interface SideQuest {
  title: string;
  org: string;
  status: "COMPLETE" | "ACTIVE" | "ONGOING";
  description: string;
  link?: string;
}

/**
 * Web3 & open-source "side quests" — community + on-chain activity.
 * Sourced from the live portfolio + project briefs.
 */
export const sideQuests: SideQuest[] = [
  {
    title: "StandX Community Contributions",
    org: "StandX · DeFi",
    status: "ACTIVE",
    description:
      "Built and shipped the StandX SIP Guide to help the community understand the protocol's governance process.",
    link: "https://standx-sip-guide.vercel.app",
  },
  {
    title: "Hack@LATAM 2026 — K-milla",
    org: "Hackathon · Civic Tech",
    status: "COMPLETE",
    description:
      "Built K-milla for the Transparency & Corruption track — public-health spending made legible with grounded AI.",
    link: "https://k-milla.vercel.app",
  },
  {
    title: "RepuLink (Solana)",
    org: "Solana · Reputation",
    status: "ONGOING",
    description:
      "On-chain reputation experiment on Solana — exploring verifiable identity & trust primitives in Web3.",
  },
  {
    title: "Base LATAM Ambassador",
    org: "Base · Ecosystem",
    status: "ONGOING",
    description:
      "Growing the Base ecosystem across Latin America — onboarding builders and running community education.",
  },
];
