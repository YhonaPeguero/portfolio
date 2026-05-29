export interface ExperienceNode {
  level: number;
  role: string;
  org: string;
  period: string;
  /** Short context line */
  summary: string;
  /** "Unlocked abilities" — responsibilities framed as RPG perks */
  abilities: string[];
  /** Current / active role */
  active?: boolean;
}

/**
 * Character progression tree. Kept high-level and truthful —
 * no fabricated metrics. Roles reflect the brief + live portfolio.
 */
export const experience: ExperienceNode[] = [
  {
    level: 30,
    role: "Senior Frontend Engineer",
    org: "Claro RD",
    period: "Current",
    summary:
      "Building and scaling front-end experiences at telecom scale for one of LATAM's largest carriers.",
    active: true,
    abilities: [
      "Ship production UI used at national telecom scale",
      "Performance & accessibility budgeting on high-traffic flows",
      "Mentor + raise the front-end quality bar across teams",
    ],
  },
  {
    level: 24,
    role: "Base LATAM Ambassador",
    org: "Base / Web3 Community",
    period: "Ongoing",
    summary:
      "Representing and growing the Base ecosystem across Latin America — bridging builders into Web3.",
    abilities: [
      "Onboard developers into the Base / EVM ecosystem",
      "Run & support community education and hackathons",
      "Bridge DeFi concepts to a broader LATAM audience",
    ],
  },
  {
    level: 18,
    role: "Product / Frontend Engineer",
    org: "Independent · Clients",
    period: "5+ years",
    summary:
      "Product-driven front-end development with strong backend foundations — UX, performance & architecture.",
    abilities: [
      "Take complex ideas from concept to production",
      "Own UX, performance and component architecture",
      "Deliver client work end-to-end (design → deploy)",
    ],
  },
];
