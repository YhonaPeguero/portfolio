import { cvFiles, profile } from "../../data/profile";
import { projects } from "../../data/projects";
import { skillCategories } from "../../data/skills";
import { sideQuests } from "../../data/sideQuests";
import { certifications, education, experience, languages } from "../../data/experience";
import { infoTopics } from "../../data/companionInfo";
import { DEFAULT_LOCALE, type Locale } from "../locales";
import { es } from "./es";
import type { Content, ContentOverlay, CvFile } from "./types";

export type { Content, ContentOverlay, CvFile };

/**
 * src/data is written in English and is the single source for structure,
 * links, images and order. Other languages are overlays that only replace
 * text, so a project is never defined twice.
 */
const OVERLAYS: Partial<Record<Locale, ContentOverlay>> = { es };

/** Lay each record's translation over the English record, matched by id. */
function translate<T extends object>(
  items: readonly T[],
  idOf: (item: T) => string,
  patches: Record<string, Partial<NoInfer<T>>>,
  kind: string
): T[] {
  return items.map((item) => {
    const patch = patches[idOf(item)];
    if (!patch && import.meta.env.DEV) {
      console.warn(`[i18n] No translation for ${kind} "${idOf(item)}": showing English.`);
    }
    return patch ? { ...item, ...patch } : item;
  });
}

function cvFor(locale: Locale): CvFile {
  const own = cvFiles[locale];
  const language = own ? locale : DEFAULT_LOCALE;
  return {
    href: own ?? cvFiles.en,
    language,
    fileName:
      language === DEFAULT_LOCALE
        ? "Yhonatan_Peguero_CV.pdf"
        : `Yhonatan_Peguero_CV_${language.toUpperCase()}.pdf`,
  };
}

function build(locale: Locale): Content {
  const cv = cvFor(locale);
  const overlay = OVERLAYS[locale];

  if (!overlay) {
    return {
      profile,
      cv,
      skillCategories,
      projects,
      sideQuests,
      experience,
      education,
      certifications,
      languages,
      infoTopics,
    };
  }

  const label = (text: string) => overlay.labels[text] ?? text;

  return {
    profile: { ...profile, ...overlay.profile },
    cv,
    skillCategories: translate(skillCategories, (c) => c.id, overlay.skillCategories, "skill category").map(
      (category) => ({
        ...category,
        skills: category.skills.map((skill) => ({ ...skill, name: label(skill.name) })),
      })
    ),
    projects: translate(projects, (p) => p.code, overlay.projects, "project"),
    sideQuests: translate(sideQuests, (q) => q.id, overlay.sideQuests, "side quest"),
    experience: translate(experience, (r) => r.id, overlay.experience, "role"),
    education: education.map((credential) => ({ ...credential, title: label(credential.title) })),
    certifications: certifications.map(label),
    languages: languages.map(label),
    infoTopics: translate(infoTopics, (t) => t.id, overlay.infoTopics, "companion topic"),
  };
}

const cache = new Map<Locale, Content>();

/** Portfolio content in one language (built once per language, then reused). */
export function getContent(locale: Locale): Content {
  let content = cache.get(locale);
  if (!content) {
    content = build(locale);
    cache.set(locale, content);
  }
  return content;
}
