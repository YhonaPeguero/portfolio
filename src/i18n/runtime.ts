import {
  DEFAULT_LOCALE,
  LOCALES,
  META,
  SITE_URL,
  isLocale,
  localeFromPath,
  pathForLocale,
  type Locale,
} from "./locales";

const STORAGE_KEY = "yhonatan-os:locale";

/**
 * Locale URLs ("/" and "/es/") only exist when the site is served from the
 * domain root. Under any other base (e.g. a sandboxed preview) the language
 * still switches and persists; the address just stays put.
 */
const ROUTED = import.meta.env.BASE_URL === "/";

function readStored(): Locale | null {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return isLocale(value) ? value : null;
  } catch {
    return null; // storage blocked (private mode, sandbox…)
  }
}

export function storeLocale(locale: Locale): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    /* preference simply won't persist */
  }
}

function fromBrowser(): Locale | null {
  const preferred = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const tag of preferred) {
    const base = tag?.toLowerCase().split("-")[0];
    if (isLocale(base)) return base;
  }
  return null;
}

/**
 * Which language to start in, most explicit signal first:
 *  1. a locale URL (/es/): someone linked or bookmarked that version
 *  2. the visitor's saved choice
 *  3. the browser's language
 *  4. English
 */
export function resolveInitialLocale(): Locale {
  return (
    (ROUTED ? localeFromPath(window.location.pathname) : null) ??
    readStored() ??
    fromBrowser() ??
    DEFAULT_LOCALE
  );
}

/** Real URL of a locale, or null when locale URLs are not available. */
export function localeHref(locale: Locale): string | null {
  return ROUTED ? pathForLocale(locale) : null;
}

/** Point the address bar at the locale's URL without reloading or adding history. */
export function syncUrl(locale: Locale): void {
  if (!ROUTED) return;
  const current = localeFromPath(window.location.pathname) ?? DEFAULT_LOCALE;
  if (current === locale) return;
  try {
    const { search, hash } = window.location;
    window.history.replaceState(window.history.state, "", pathForLocale(locale) + search + hash);
  } catch {
    /* history unavailable: the language still switches */
  }
}

function setMeta(selector: string, content: string): void {
  document.head.querySelector<HTMLMetaElement>(selector)?.setAttribute("content", content);
}

/** Keep <html lang>, title, descriptions and canonical in step with the UI. */
export function applyDocumentMeta(locale: Locale): void {
  const meta = META[locale];
  const url = SITE_URL + pathForLocale(locale);
  document.documentElement.lang = locale;
  document.title = meta.title;
  setMeta('meta[name="description"]', meta.description);
  setMeta('meta[property="og:title"]', meta.title);
  setMeta('meta[property="og:description"]', meta.ogDescription);
  setMeta('meta[property="og:url"]', url);
  setMeta('meta[property="og:locale"]', meta.ogLocale);
  const other = LOCALES.find((l) => l !== locale);
  if (other) setMeta('meta[property="og:locale:alternate"]', META[other].ogLocale);
  document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.setAttribute("href", url);
}

/**
 * Runs once, before React renders, so the first paint is already in the right
 * language with the right URL and <html lang>: no flash, no second render.
 */
export function bootLocale(): Locale {
  const locale = resolveInitialLocale();
  syncUrl(locale);
  applyDocumentMeta(locale);
  return locale;
}

export interface ScrollAnchor {
  element: HTMLElement;
  /** How far down the element the reading line was (0 = top, 1 = bottom) */
  ratio: number;
  line: number;
}

/**
 * Text length differs between languages, so everything below a translated
 * block moves when the language switches. Remember what the visitor is
 * looking at (the element a third of the way down the screen) so it can be
 * put back in the same spot once the new language has rendered.
 */
export function captureScrollAnchor(): ScrollAnchor | null {
  if (window.scrollY === 0) return null;
  const main = document.querySelector("main");
  const line = window.innerHeight * 0.3;
  const element = document
    .elementsFromPoint(window.innerWidth / 2, line)
    .find((candidate) => candidate !== main && main?.contains(candidate));
  if (!(element instanceof HTMLElement)) return null;
  const rect = element.getBoundingClientRect();
  return { element, ratio: rect.height > 0 ? (line - rect.top) / rect.height : 0, line };
}

export function restoreScrollAnchor(anchor: ScrollAnchor | null): void {
  if (!anchor?.element.isConnected) return;
  const rect = anchor.element.getBoundingClientRect();
  const drift = rect.top + anchor.ratio * rect.height - anchor.line;
  if (Math.abs(drift) > 1) window.scrollBy({ top: drift, behavior: "instant" });
}
