import type { profile } from "../../data/profile";
import type { Project } from "../../data/projects";
import type { SkillCategory } from "../../data/skills";
import type { SideQuest } from "../../data/sideQuests";
import type { Credential, ExperienceRole } from "../../data/experience";
import type { InfoTopic } from "../../data/companionInfo";
import type { Locale } from "../locales";

/** The profile with its translatable fields widened from literals to text. */
export type LocalizedProfile = Omit<typeof profile, "roles" | "tagline" | "location"> & {
  roles: readonly string[];
  tagline: string;
  location: string;
};

/** Which CV file a locale gets. `language` differs from the UI when no CV exists in it. */
export interface CvFile {
  href: string;
  fileName: string;
  language: Locale;
}

/** Everything the page renders from src/data, in one language. */
export interface Content {
  profile: LocalizedProfile;
  cv: CvFile;
  skillCategories: SkillCategory[];
  projects: Project[];
  sideQuests: SideQuest[];
  experience: ExperienceRole[];
  education: Credential[];
  certifications: string[];
  languages: string[];
  infoTopics: InfoTopic[];
}

type Text<T, K extends keyof T> = Partial<Pick<T, K>>;

/**
 * A translation of the data in src/data. It never repeats the data: it only
 * carries the text that changes, matched to each record by its stable id
 * (project `code`, everything else `id`). Links, images, tags, ranks and order
 * always come from src/data. A field left out falls back to English.
 */
export interface ContentOverlay {
  profile: Pick<LocalizedProfile, "roles" | "tagline" | "location">;
  skillCategories: Record<string, Text<SkillCategory, "title" | "subtitle">>;
  projects: Record<string, Text<Project, "classTag" | "brief" | "achievements" | "impact">>;
  sideQuests: Record<string, Text<SideQuest, "title" | "org" | "description">>;
  experience: Record<
    string,
    Text<ExperienceRole, "role" | "period" | "location" | "type" | "summary" | "highlights">
  >;
  infoTopics: Record<string, Text<InfoTopic, "label" | "question" | "answer">>;
  /**
   * Short labels with no id of their own (skill names, degrees, spoken
   * languages), keyed by their English text. A label left out stays as is,
   * which is what technology and certificate names should do.
   */
  labels: Record<string, string>;
}
