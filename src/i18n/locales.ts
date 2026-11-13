import site from "./site.json";

/**
 * Locale registry, read from ./site.json. That file is plain JSON because the
 * build (vite.config.ts) reads it too, to write one static HTML per language:
 * it holds the site URL, the default language and, per language, its name
 * (written in itself) and the document metadata.
 *
 * To add a language: add it to site.json, then a dictionary in ./dictionaries
 * and a content overlay in ./content. TypeScript flags a missing dictionary.
 */
export type Locale = keyof typeof site.locales;

export interface PageMeta {
  /** Language name in that language, as a selector should show it */
  name: string;
  title: string;
  description: string;
  ogDescription: string;
  /** Open Graph locale tag */
  ogLocale: string;
}

export const LOCALES = Object.keys(site.locales) as Locale[];
export const DEFAULT_LOCALE = site.defaultLocale as Locale;
export const SITE_URL = site.url;
export const META: Record<Locale, PageMeta> = site.locales;

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (LOCALES as string[]).includes(value);
}

/** URL path of a locale's home: "/" for the default, "/es/" for the rest. */
export function pathForLocale(locale: Locale): string {
  return locale === DEFAULT_LOCALE ? "/" : `/${locale}/`;
}

/** Locale named by a pathname ("/es", "/es/…"), or null when it names none. */
export function localeFromPath(pathname: string): Locale | null {
  const first = pathname.split("/")[1];
  return isLocale(first) && first !== DEFAULT_LOCALE ? first : null;
}
