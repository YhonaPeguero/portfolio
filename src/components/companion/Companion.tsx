import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import ChibiAvatar from "./ChibiAvatar";
import { dialogue } from "../../data/dialogue";
import { useTypewriter } from "../../lib/hooks";

/**
 * AI guide companion (bottom-right). Pre-written dialogue keyed to the
 * active section — no AI API calls. Typewriter reveal; click avatar to
 * cycle lines; dismissable.
 */
export default function Companion({ section }: { section: string }) {
  const [open, setOpen] = useState(true);
  const [bubble, setBubble] = useState(true);
  const [lineIndex, setLineIndex] = useState(0);

  const lines = dialogue[section] ?? dialogue.boot;
  const current = lines[lineIndex % lines.length];
  const { text, done } = useTypewriter(current, 24);

  // New section → reset to first line and re-open the bubble.
  useEffect(() => {
    setLineIndex(0);
    setBubble(true);
  }, [section]);

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-50 grid h-12 w-12 place-items-center rounded-full border border-cyan/50 bg-void-800/90 shadow-neon-cyan"
        aria-label="Open guide companion PIXL"
      >
        <ChibiAvatar />
      </button>
    );
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex max-w-[min(20rem,calc(100vw-2.5rem))] flex-col items-end gap-2">
      <AnimatePresence>
        {bubble && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            className="hud-panel hud-corners relative w-full p-3 pr-7"
            role="status"
            aria-live="polite"
          >
            <button
              onClick={() => setBubble(false)}
              className="absolute right-1.5 top-1.5 text-ink-faint hover:text-magenta"
              aria-label="Dismiss message"
            >
              <X size={14} />
            </button>
            <p className="mb-1 font-mono text-[10px] tracking-widest text-cyan">PIXL // GUIDE_UNIT</p>
            <p className="font-ui text-sm leading-snug text-ink">
              {text}
              {!done && <span className="ml-0.5 animate-blink text-cyan">▮</span>}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setOpen(false)}
          className="font-mono text-[10px] tracking-widest text-ink-faint hover:text-ink"
          aria-label="Hide companion"
        >
          [ HIDE ]
        </button>
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => {
            setBubble(true);
            setLineIndex((i) => i + 1);
          }}
          className="h-14 w-14 rounded-full border border-cyan/50 bg-void-800/90 p-1 shadow-neon-cyan animate-float"
          aria-label="Next message from PIXL"
        >
          <ChibiAvatar talking={!done} />
        </motion.button>
      </div>
    </div>
  );
}
