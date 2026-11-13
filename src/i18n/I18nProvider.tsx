import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { getContent, type Content } from "./content";
import { DICTIONARIES, type Dictionary } from "./dictionaries";
import type { Locale } from "./locales";
import {
  applyDocumentMeta,
  captureScrollAnchor,
  restoreScrollAnchor,
  storeLocale,
  syncUrl,
  type ScrollAnchor,
} from "./runtime";

interface I18nValue {
  locale: Locale;
  /** Switch language in place: no reload, same section, choice remembered. */
  setLocale: (locale: Locale) => void;
  /** Interface copy */
  t: Dictionary;
  /** Portfolio content (projects, roles…) in the current language */
  content: Content;
}

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({
  initialLocale,
  children,
}: {
  initialLocale: Locale;
  children: ReactNode;
}) {
  const [locale, setLocaleState] = useState(initialLocale);
  const anchor = useRef<ScrollAnchor | null>(null);

  const setLocale = useCallback(
    (next: Locale) => {
      if (next === locale) return;
      anchor.current = captureScrollAnchor();
      storeLocale(next);
      syncUrl(next);
      applyDocumentMeta(next);
      setLocaleState(next);
    },
    [locale]
  );

  // After the new language has rendered, before the browser paints it.
  useLayoutEffect(() => {
    restoreScrollAnchor(anchor.current);
    anchor.current = null;
  }, [locale]);

  const value = useMemo<I18nValue>(
    () => ({ locale, setLocale, t: DICTIONARIES[locale], content: getContent(locale) }),
    [locale, setLocale]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const value = useContext(I18nContext);
  if (!value) throw new Error("useI18n must be used inside <I18nProvider>");
  return value;
}

/**
 * The CV download for the current language. When no CV exists in it, the
 * English file is offered and both the label and its description say so.
 */
export function useCv() {
  const { locale, t, content } = useI18n();
  const { href, fileName, language } = content.cv;
  const fallback = language !== locale;
  return {
    href,
    fileName,
    language,
    label: fallback ? `${t.cv.download} (${language.toUpperCase()})` : t.cv.download,
    description: fallback ? t.cv.onlyIn(t.language.names[language]) : undefined,
  };
}
