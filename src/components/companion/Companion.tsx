import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, RotateCcw, X } from "lucide-react";
import ChibiAvatar from "./ChibiAvatar";
import { Exchange } from "./Thread";
import type { Locale } from "../../i18n/locales";
import { useI18n } from "../../i18n/I18nProvider";
import { usePrefersReducedMotion } from "../../lib/hooks";

const PANEL_ID = "pixl-panel";
const SEEN_KEY = "yhonatan-os:pixl-seen";
const SCANLINES =
  "repeating-linear-gradient(0deg, rgba(0,245,255,0.25) 0px, rgba(0,245,255,0.25) 1px, transparent 1px, transparent 3px)";

// Storage can throw (private mode, sandboxed frames): failing just means the
// launcher's "new" dot shows again on the next visit.
function readSeen(): boolean {
  try {
    return localStorage.getItem(SEEN_KEY) === "1";
  } catch {
    return false;
  }
}
function storeSeen(): void {
  try {
    localStorage.setItem(SEEN_KEY, "1");
  } catch {
    /* not persisted, see readSeen */
  }
}

/** Floating hologram for the empty thread: scanlines plus a projector glow. */
function Hologram({ reduced }: { reduced: boolean }) {
  return (
    <div
      aria-hidden="true"
      className="relative mb-4 h-[72px] w-[72px] shrink-0 select-none [@media(max-height:500px)]:mb-2 [@media(max-height:500px)]:h-10 [@media(max-height:500px)]:w-10"
    >
      <div className="absolute -bottom-2 left-1/2 h-2.5 w-14 -translate-x-1/2 rounded-[50%] bg-cyan/30 blur-md" />
      <div className={`relative h-full w-full drop-shadow-[0_0_14px_rgba(0,245,255,0.6)] ${reduced ? "" : "animate-float"}`}>
        <ChibiAvatar talking />
        <div
          className="pointer-events-none absolute inset-0 rounded-xl mix-blend-overlay"
          style={{ backgroundImage: SCANLINES }}
        />
      </div>
    </div>
  );
}

const ICON_BUTTON =
  "grid h-8 w-8 shrink-0 place-items-center border border-white/10 text-ink-faint transition-colors hover:border-magenta hover:text-magenta";

/**
 * PIXL, the guide companion. A floating avatar button (bottom-right) opens a
 * conversation thread with pre-written answers about Yhonatan. No API, no
 * scroll-triggered pop-ups; the thread lives in memory for the session.
 */
export default function Companion() {
  const reduced = usePrefersReducedMotion();
  const { t, content, locale } = useI18n();
  const { infoTopics } = content;

  const [open, setOpen] = useState(false);
  const [seen, setSeen] = useState(readSeen);
  // Topic ids, not strings, so the whole thread follows a language switch.
  const [thread, setThread] = useState<string[]>([]);
  // Typing belongs to the language it started in: switching languages shows
  // the answer complete instead of typing it again.
  const [typing, setTyping] = useState<{ id: string; locale: Locale } | null>(null);
  const typingId = typing && typing.locale === locale ? typing.id : null;

  const launcherRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const logBodyRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    launcherRef.current?.focus({ preventScroll: true });
  }, []);

  const toggle = () => {
    if (open) return close();
    setOpen(true);
    if (!seen) {
      setSeen(true);
      storeSeen();
    }
  };

  const ask = (id: string) => {
    // Re-asking moves the exchange to the end instead of duplicating it.
    setThread((prev) => [...prev.filter((item) => item !== id), id]);
    setTyping(reduced ? null : { id, locale });
  };

  const finishTyping = useCallback(() => setTyping(null), []);

  const restart = () => {
    setThread([]);
    setTyping(null);
    // The restart button disappears with the thread; keep focus in the panel.
    panelRef.current?.querySelector<HTMLButtonElement>("[data-chip]")?.focus();
  };

  const goToSection = useCallback(
    (id: string) => {
      document.getElementById(id)?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
      // On narrow screens the panel would hide the section it just opened.
      if (window.matchMedia("(max-width: 767px)").matches) close();
    },
    [reduced, close]
  );

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  // Non-modal dialog: on open, put focus on the first question.
  useEffect(() => {
    if (open) panelRef.current?.querySelector<HTMLButtonElement>("[data-chip]")?.focus({ preventScroll: true });
  }, [open]);

  // Keep the log pinned to the newest line while entries arrive and type.
  useEffect(() => {
    const log = logRef.current;
    const body = logBodyRef.current;
    if (!open || !log || !body) return;
    const pin = () => log.scrollTo({ top: log.scrollHeight, behavior: "auto" });
    pin();
    const observer = new ResizeObserver(pin);
    observer.observe(body);
    return () => observer.disconnect();
  }, [open]);

  const exchanges = thread
    .map((id) => infoTopics.find((topic) => topic.id === id))
    .filter((topic): topic is (typeof infoTopics)[number] => !!topic);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3 sm:bottom-5 sm:right-5">
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            ref={panelRef}
            id={PANEL_ID}
            role="dialog"
            aria-label={t.companion.dialogLabel}
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.96 }}
            animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.96 }}
            transition={reduced ? { duration: 0.12 } : { type: "spring", stiffness: 300, damping: 26 }}
            className="hud-corners relative flex h-[min(33rem,calc(100dvh-6rem))] w-[min(23rem,calc(100vw-2rem))] origin-bottom-right flex-col border border-white/15 bg-void-800/95 shadow-[0_24px_80px_rgba(0,0,0,0.6)] backdrop-blur-md"
          >
            {/* header */}
            <div className="flex shrink-0 items-center gap-2.5 border-b border-white/10 px-3 py-2">
              <div className="relative h-9 w-9 shrink-0 select-none border border-cyan/40 bg-void-700 p-0.5 drop-shadow-[0_0_8px_rgba(0,245,255,0.45)]">
                <ChibiAvatar talking={typingId !== null} />
                {/* hologram scanlines */}
                <div
                  className="pointer-events-none absolute inset-0 mix-blend-overlay"
                  style={{ backgroundImage: SCANLINES }}
                />
              </div>
              <div className="min-w-0 flex-1 leading-none">
                <p className="flex items-baseline gap-2 truncate">
                  <span className="font-display text-sm font-bold tracking-wider text-cyan">PIXL</span>
                  <span className="truncate font-mono text-[10px] tracking-[0.15em] text-ink-faint">// {t.companion.unit}</span>
                </p>
                <p className="mt-1 inline-flex items-center gap-1.5 font-mono text-[10px] tracking-wider text-ink-muted">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan" aria-hidden="true" />
                  {t.companion.online}
                </p>
              </div>
              {thread.length > 0 && (
                <button
                  type="button"
                  onClick={restart}
                  className={ICON_BUTTON}
                  aria-label={t.companion.restart}
                  title={t.companion.restart}
                >
                  <RotateCcw size={14} aria-hidden="true" />
                </button>
              )}
              <button type="button" onClick={close} className={ICON_BUTTON} aria-label={t.companion.close} title={t.companion.close}>
                <X size={14} aria-hidden="true" />
              </button>
            </div>

            {/* conversation log: the only scrolling area */}
            <div
              ref={logRef}
              role="log"
              aria-live="polite"
              aria-label={t.companion.logLabel}
              className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 py-3"
            >
              {/* Empty thread: a centered hologram greets the visitor instead of a blank log. */}
              <div ref={logBodyRef} className={exchanges.length === 0 ? "flex min-h-full flex-col items-center justify-center" : ""}>
                {exchanges.length === 0 && <Hologram reduced={reduced} />}
                <p
                  className={`font-ui text-sm leading-relaxed text-ink-muted ${
                    exchanges.length === 0 ? "max-w-[16rem] text-center" : ""
                  }`}
                >
                  <span className="sr-only">{t.companion.pixlSays} </span>
                  {t.companion.greetingBefore}
                  <span className="text-cyan">PIXL</span>
                  {t.companion.greetingAfter}
                </p>
                {exchanges.length > 0 && (
                  <ol className="mt-4 space-y-4">
                    {exchanges.map((topic) => (
                      <Exchange
                        key={topic.id}
                        topic={topic}
                        typing={topic.id === typingId}
                        onFinish={finishTyping}
                        onSection={goToSection}
                      />
                    ))}
                  </ol>
                )}
              </div>
            </div>

            {/* quick replies */}
            <div className="shrink-0 border-t border-white/10 px-3 pb-3 pt-2">
              <p className="mb-1.5 font-mono text-[10px] tracking-[0.3em] text-ink-faint">[ {t.companion.topics} ]</p>
              <div className="flex flex-wrap gap-1.5 [@media(max-height:500px)]:flex-nowrap [@media(max-height:500px)]:overflow-x-auto [@media(max-height:500px)]:pb-1">
                {infoTopics.map((topic) => {
                  const asked = thread.includes(topic.id);
                  return (
                    <button
                      key={topic.id}
                      type="button"
                      data-chip
                      onClick={() => ask(topic.id)}
                      className={`inline-flex shrink-0 items-center gap-1 whitespace-nowrap border px-2 py-1.5 font-mono text-[11px] transition-colors hover:border-cyan hover:text-cyan ${
                        asked ? "border-white/10 text-ink-faint" : "border-cyan/30 bg-cyan/[0.03] text-ink"
                      }`}
                    >
                      {asked && <Check size={11} aria-hidden="true" />}
                      {topic.label}
                      {asked && <span className="sr-only"> ({t.companion.seen})</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating avatar button: the whole button floats so the avatar stays
          centered within its frame (no internal drift / misalignment). */}
      <motion.button
        ref={launcherRef}
        type="button"
        onClick={toggle}
        animate={reduced || open ? { y: 0 } : { y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: reduced || open ? 0 : Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="relative grid h-12 w-12 shrink-0 place-items-center rounded-full border border-cyan/50 bg-void-800/90 p-1.5 shadow-neon-cyan sm:h-14 sm:w-14"
        title={open ? t.companion.closeTitle : t.companion.openTitle}
        aria-label={open ? t.companion.closeLabel : t.companion.openLabel}
        aria-expanded={open}
        aria-controls={PANEL_ID}
      >
        <ChibiAvatar talking={open} />
        {!seen && (
          <span
            data-unseen
            aria-hidden="true"
            className={`absolute right-0 top-0 h-3 w-3 rounded-full border-2 border-void bg-magenta shadow-neon-magenta ${
              reduced ? "" : "animate-pulse"
            }`}
          />
        )}
      </motion.button>
    </div>
  );
}
