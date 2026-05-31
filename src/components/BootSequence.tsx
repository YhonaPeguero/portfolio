import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { profile } from "../data/profile";
import { usePrefersReducedMotion } from "../lib/hooks";

const LINES = [
  `> INITIALIZING ${profile.os} ${profile.version} ...`,
  "> MOUNTING /modules/frontend ............ OK",
  "> MOUNTING /modules/web3 ................ OK",
  "> LINKING neural.ui // motion.engine .... OK",
  "> DECRYPTING_USER_PROFILE ............... OK",
  "> BOOT SEQUENCE COMPLETE ✓",
];

/**
 * Full-screen intro loader that plays once on initial load, then fades/scales
 * out to reveal the portfolio. Restores the original "loading screen" feel:
 * sequenced terminal typing + a filling progress bar.
 *
 * Reduced-motion: shows all lines instantly and exits after a short beat.
 * Click anywhere to skip.
 */
export default function BootSequence({ onComplete }: { onComplete: () => void }) {
  const reduced = usePrefersReducedMotion();
  const [count, setCount] = useState(reduced ? LINES.length : 0);

  // Reveal lines one by one.
  useEffect(() => {
    if (reduced) return;
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setCount(i);
      if (i >= LINES.length) window.clearInterval(id);
    }, 360);
    return () => window.clearInterval(id);
  }, [reduced]);

  // Auto-complete once the sequence has played.
  useEffect(() => {
    const total = reduced ? 700 : LINES.length * 360 + 900;
    const id = window.setTimeout(onComplete, total);
    return () => window.clearTimeout(id);
  }, [reduced, onComplete]);

  const progressDuration = reduced ? 0.3 : (LINES.length * 360 + 700) / 1000;

  return (
    <motion.div
      onClick={onComplete}
      role="status"
      aria-label="Booting portfolio"
      className="fixed inset-0 z-[100] flex cursor-pointer flex-col items-center justify-center overflow-hidden bg-void p-6 font-mono"
      exit={{ opacity: 0, scale: 1.08, transition: { duration: 0.7, ease: "easeInOut" } }}
    >
      {/* Perspective grid backdrop */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,245,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,0.06) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      {/* Corner glows */}
      <div className="pointer-events-none absolute -left-1/4 -top-1/4 h-1/2 w-1/2 rounded-full bg-cyan/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-1/4 -right-1/4 h-1/2 w-1/2 rounded-full bg-magenta/10 blur-[120px]" />

      <div className="hud-panel hud-corners relative z-10 w-full max-w-xl p-5 md:p-6">
        {/* Terminal header */}
        <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
          <span className="text-xs tracking-widest text-cyan">
            {profile.os}_TERMINAL {profile.version}
          </span>
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-magenta" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber" />
            <span className="h-2.5 w-2.5 rounded-full bg-cyan animate-pulse" />
          </div>
        </div>

        {/* Typed lines */}
        <div className="flex min-h-[168px] flex-col justify-end gap-1.5 text-[12px] leading-relaxed sm:text-sm">
          {LINES.slice(0, count).map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25 }}
              className={line.includes("COMPLETE") ? "text-amber" : "text-cyan/80"}
            >
              {line}
            </motion.div>
          ))}
          {count < LINES.length && <span className="animate-blink text-cyan">_</span>}
        </div>

        {/* Progress bar */}
        <div className="mt-6 h-1 w-full overflow-hidden border border-white/10 bg-black/40">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan to-magenta shadow-neon-cyan"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: progressDuration, ease: "easeInOut" }}
          />
        </div>
        <div className="mt-2 flex items-center justify-between text-[11px] tracking-wider text-ink-faint">
          <span className="animate-pulse text-cyan">SYSTEM_READY</span>
          <span>[ CLICK TO SKIP ]</span>
        </div>
      </div>
    </motion.div>
  );
}
