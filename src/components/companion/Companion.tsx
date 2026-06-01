import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, X } from "lucide-react";
import ChibiAvatar from "./ChibiAvatar";
import { infoTopics, type InfoTopic } from "../../data/companionInfo";
import { usePrefersReducedMotion, useTypewriter } from "../../lib/hooks";

/** Holographic avatar with a scanline overlay + projector base glow. */
function Hologram() {
  return (
    <div className="relative mx-auto h-24 w-24 select-none">
      {/* projector base */}
      <div className="absolute -bottom-2 left-1/2 h-3 w-20 -translate-x-1/2 rounded-[50%] bg-cyan/30 blur-md" />
      {/* avatar */}
      <div className="relative h-full w-full animate-float drop-shadow-[0_0_14px_rgba(0,245,255,0.6)]">
        <ChibiAvatar talking />
        {/* hologram scanlines */}
        <div
          className="pointer-events-none absolute inset-0 rounded-xl mix-blend-overlay"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(0,245,255,0.25) 0px, rgba(0,245,255,0.25) 1px, transparent 1px, transparent 3px)",
          }}
        />
      </div>
    </div>
  );
}

/** Answer view with a typewriter reveal. */
function Answer({ topic }: { topic: InfoTopic }) {
  const { text, done } = useTypewriter(topic.answer, 12);
  return (
    <div>
      <p className="mb-2 font-mono text-[11px] tracking-widest text-magenta">{">"} {topic.question}</p>
      <p className="font-ui text-sm leading-relaxed text-ink">
        {text}
        {!done && <span className="ml-0.5 animate-blink text-cyan">▮</span>}
      </p>
    </div>
  );
}

/**
 * PIXL — guide companion. A floating avatar button (bottom-right). Clicking it
 * opens a hologram info panel where visitors can browse pre-written facts about
 * Yhonatan. No scroll-triggered pop-ups, no external API.
 */
export default function Companion() {
  const reduced = usePrefersReducedMotion();
  const [open, setOpen] = useState(false);
  const [topic, setTopic] = useState<InfoTopic | null>(null);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            role="dialog"
            aria-label="PIXL — information about Yhonatan"
            className="hud-panel hud-corners relative w-[min(22rem,calc(100vw-2.5rem))] overflow-hidden"
          >
            {/* glow backdrop */}
            <div className="pointer-events-none absolute -top-10 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full bg-cyan/15 blur-3xl" />

            {/* header */}
            <div className="relative border-b border-white/10 px-4 pb-3 pt-5">
              <button
                onClick={() => setOpen(false)}
                className="absolute right-3 top-3 grid h-7 w-7 place-items-center border border-white/10 text-ink-faint transition-colors hover:border-magenta hover:text-magenta"
                aria-label="Close"
              >
                <X size={14} />
              </button>
              <Hologram />
              <div className="mt-3 text-center">
                <p className="font-mono text-[11px] tracking-[0.3em] text-cyan">PIXL // GUIDE_UNIT</p>
                <p className="mt-0.5 inline-flex items-center gap-1.5 font-mono text-[11px] tracking-wider text-ink-muted">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan" /> ONLINE
                </p>
              </div>
            </div>

            {/* body */}
            <div className="max-h-[46vh] overflow-y-auto px-4 py-4">
              <AnimatePresence mode="wait" initial={false}>
                {topic ? (
                  <motion.div
                    key="answer"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.18 }}
                  >
                    <button
                      onClick={() => setTopic(null)}
                      className="mb-3 inline-flex items-center gap-1 font-mono text-[11px] tracking-widest text-ink-faint hover:text-cyan"
                    >
                      <ChevronLeft size={13} /> TOPICS
                    </button>
                    <Answer topic={topic} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="list"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <p className="mb-3 font-ui text-sm leading-snug text-ink-muted">
                      Konnichiwa! I'm <span className="text-cyan">PIXL</span>. Pick a topic and I'll
                      tell you about Yhonatan 👀
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {infoTopics.map((t) => (
                        <button
                          key={t.id}
                          onClick={() => setTopic(t)}
                          className="hud-corners border border-cyan/30 bg-cyan/[0.03] px-2.5 py-2 text-left font-mono text-[11px] leading-tight tracking-wide text-ink transition-colors hover:border-cyan hover:bg-cyan/10 hover:text-cyan"
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating avatar button — the whole button floats so the avatar stays
          centered within its frame (no internal drift / misalignment). */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        animate={reduced || open ? { y: 0 } : { y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: reduced || open ? 0 : Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-cyan/50 bg-void-800/90 p-1.5 shadow-neon-cyan"
        title={open ? "Close PIXL" : "Ask PIXL about Yhonatan"}
        aria-label={open ? "Close PIXL guide" : "Open PIXL — info about Yhonatan"}
        aria-expanded={open}
      >
        <ChibiAvatar talking={open} />
      </motion.button>
    </div>
  );
}
