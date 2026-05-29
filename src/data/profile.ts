import cvFile from "../assets/Yhonatan Peguero-CV.pdf";

/**
 * Single source of truth for personal / contact data.
 * Pulled from the live portfolio + CV — not invented.
 *
 * NOTE: `x` (Twitter) handle is the best guess from the GitHub username.
 *       Update it if the real handle differs.
 */
export const profile = {
  name: "Yhonatan Peguero",
  alias: "YHONA",
  os: "YHONATAN_OS",
  version: "v2.0",
  roles: ["Senior Frontend Engineer", "Web3 Builder", "DeFi Contributor"],
  tagline: "I build next-gen web products at the intersection of UX, performance & on-chain.",
  location: "Santo Domingo, Dominican Republic",
  kanji: "開発者", // "developer"
  email: "yhona.peguero@gmail.com",
  cv: cvFile,
  socials: {
    github: "https://github.com/YhonaPeguero",
    linkedin: "https://linkedin.com/in/yhona-peguero",
    x: "https://x.com/YhonaPeguero",
  },
} as const;

export type Social = keyof typeof profile.socials;
