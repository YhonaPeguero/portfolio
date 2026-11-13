import cvFile from "../assets/Yhonatan Peguero-CV.pdf";
import type { Locale } from "../i18n/locales";

/**
 * Single source of truth for personal / contact data (English copy; the
 * Spanish text for roles, tagline and location is in src/i18n/content/es.ts).
 * Social links are Yhonatan's official accounts.
 */
export const profile = {
  name: "Yhonatan Peguero",
  alias: "YHONA",
  os: "YHONATAN_OS",
  version: "v2.0",
  roles: ["Senior Software Engineer", "Web3 Builder", "DeFi Contributor"],
  tagline: "I build next-gen web products at the intersection of UX, performance & on-chain.",
  location: "Santo Domingo, Dominican Republic",
  kanji: "開発者", // "developer"
  email: "yhona.peguero@gmail.com",
  cv: cvFile,
  socials: {
    github: "https://github.com/YhonaPeguero",
    linkedin: "https://www.linkedin.com/in/yhonatan-peguero/",
    x: "https://x.com/thisnotmeeme",
  },
} as const;

/**
 * CV files by language. List a language here only when a real, reviewed PDF
 * exists for it: languages without one fall back to the English file and the
 * download button says so. Today only the English CV exists.
 */
export const cvFiles: { en: string } & Partial<Record<Locale, string>> = {
  en: cvFile,
};

export type Social = keyof typeof profile.socials;
