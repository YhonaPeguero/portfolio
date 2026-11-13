import { useId, type MouseEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useI18n } from "../../i18n/I18nProvider";
import { LOCALES, META, type Locale } from "../../i18n/locales";
import { localeHref } from "../../i18n/runtime";

/**
 * EN | ES selector, styled as a HUD segment: the active language carries the
 * same cyan highlight as the active nav link, and it slides when you switch.
 *
 * Each option is a real link to that language's URL (crawlable, and it still
 * works on middle-click or without JavaScript); a plain click is intercepted
 * so the page switches in place with no reload.
 */
export default function LanguageSwitch({ className = "" }: { className?: string }) {
  const { locale, setLocale, t } = useI18n();
  const reduced = useReducedMotion();
  const highlightId = useId();

  const choose = (code: Locale) => (event: MouseEvent) => {
    // Let the browser handle "open in new tab" and friends.
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    setLocale(code);
  };

  return (
    <div
      role="group"
      aria-label={t.language.label}
      className={`items-center border border-white/10 bg-void/40 font-mono text-[11px] font-bold tracking-[0.12em] ${className}`}
    >
      {LOCALES.map((code, i) => {
        const active = code === locale;
        const href = localeHref(code);
        const shared = {
          onClick: choose(code),
          lang: code,
          title: META[code].name,
          "aria-label": META[code].name,
          "aria-current": active ? ("true" as const) : undefined,
          className: `relative grid h-8 min-w-[1.75rem] place-items-center px-1.5 transition-colors sm:min-w-[2rem] sm:px-2 ${
            active ? "text-cyan" : "text-ink-faint hover:text-ink"
          }`,
        };
        const content = (
          <>
            {active && (
              <motion.span
                layoutId={highlightId}
                className="absolute inset-0 border border-cyan/30 bg-cyan/[0.08]"
                transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 34 }}
              >
                <span className="absolute inset-x-1.5 -bottom-px h-px bg-cyan shadow-neon-cyan" />
              </motion.span>
            )}
            <span className="relative" aria-hidden="true">
              {code.toUpperCase()}
            </span>
          </>
        );
        return (
          <span key={code} className="flex items-center">
            {i > 0 && <span aria-hidden="true" className="h-3 w-px bg-white/15" />}
            {href ? (
              <a href={href} hrefLang={code} {...shared}>
                {content}
              </a>
            ) : (
              <button type="button" {...shared}>
                {content}
              </button>
            )}
          </span>
        );
      })}
    </div>
  );
}
