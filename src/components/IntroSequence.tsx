import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import HoloFigure from "./three/HoloFigure";
import Particles from "./three/Particles";
import { profile } from "../data/profile";
import { usePrefersReducedMotion, useMediaQuery, useTypewriter } from "../lib/hooks";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

/** Small "typing" line — what the operator is typing on the console. */
function TypingLine() {
  const { text, done } = useTypewriter("> initializing operator…", 30);
  return (
    <span className="font-mono text-xs tracking-wider text-cyan/80 sm:text-sm">
      {text}
      {!done && <span className="animate-blink">▮</span>}
    </span>
  );
}

/**
 * Intro sequence (replaces the terminal boot). Two states for one character:
 *  1. INTRO — a hooded holographic developer appears typing (~1.1s) with
 *     particles, scanlines and a soft glitch.
 *  2. HERO  — the same figure glides to the right of the hero and settles in as
 *     part of the composition while the backdrop dissolves to reveal the ready
 *     portfolio. Total ≈ 2s.
 *
 * Short, non-blocking and click-to-skip. Reduced-motion → quick fade.
 * Asset is swappable in HoloFigure (PNG/WebP/SVG…).
 */
export default function IntroSequence({ onComplete }: { onComplete: () => void }) {
  const reduced = usePrefersReducedMotion();
  const isWide = useMediaQuery("(min-width: 1280px)");
  const [phase, setPhase] = useState<"type" | "move">("type");

  useEffect(() => {
    if (reduced) {
      const t = window.setTimeout(onComplete, 500);
      return () => window.clearTimeout(t);
    }
    const t1 = window.setTimeout(() => setPhase("move"), 1100);
    const t2 = window.setTimeout(onComplete, 2150);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [reduced, onComplete]);

  // Roughly land where the hero figure sits (right side); else fade in place.
  const moveX = useMemo(
    () => (typeof window !== "undefined" ? window.innerWidth * 0.27 : 320),
    []
  );

  const moving = phase === "move" && !reduced;
  // On the move the character glides toward the hero figure's spot AND fades —
  // the identical hero figure sits behind it, so it cross-fades into place
  // (no black-square flash from the image's background once the backdrop is gone).
  const characterAnim = !moving
    ? { x: 0, scale: 1, opacity: 1, filter: "blur(0px)" }
    : isWide
      ? { x: moveX, scale: 1.12, opacity: 0, filter: "blur(2px)" }
      : { x: 0, scale: 0.92, opacity: 0, filter: "blur(8px)" };

  return (
    <motion.div
      className="fixed inset-0 z-[100] cursor-pointer overflow-hidden"
      onClick={onComplete}
      role="status"
      aria-label="Intro — booting portfolio"
      exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
    >
      {/* Opaque backdrop (void + perspective grid + neon glows) — dissolves
          during the move so the ready hero is revealed behind the character. */}
      <motion.div
        className="absolute inset-0 bg-void"
        aria-hidden="true"
        animate={{ opacity: moving ? 0 : 1 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
      >
        <div className="absolute -left-1/4 top-0 h-2/3 w-2/3 rounded-full bg-cyan/10 blur-[120px]" />
        <div className="absolute -right-1/4 bottom-0 h-2/3 w-2/3 rounded-full bg-magenta/10 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,245,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,0.06) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        {!reduced && <Particles count={18} />}
      </motion.div>

      {/* Character */}
      <div className="absolute inset-0 grid place-items-center">
        <motion.div
          className="relative aspect-square w-[min(78vw,440px)]"
          initial={
            reduced
              ? { opacity: 1 }
              : { opacity: 0, scale: 0.9, filter: "blur(16px)", y: 14 }
          }
          animate={moving ? characterAnim : { opacity: 1, scale: 1, x: 0, y: 0, filter: "blur(0px)" }}
          transition={{ duration: moving ? 0.9 : 0.7, ease: EASE }}
        >
          {/* soft glow behind the hologram (no boxy drop-shadow) */}
          <div className="pointer-events-none absolute inset-[8%] -z-10 rounded-full bg-[radial-gradient(circle,rgba(0,166,255,0.2),transparent_62%)] blur-2xl" />
          {/* Same figure the hero uses, so it settles in after the hand-off. */}
          <HoloFigure />
        </motion.div>
      </div>

      {/* Typing line (operator at the keyboard) — hidden once the move starts */}
      <motion.div
        className="absolute inset-x-0 bottom-[15%] flex justify-center px-6 text-center"
        animate={{ opacity: moving ? 0 : 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="hud-panel hud-corners px-4 py-2">
          <p className="mb-1 font-mono text-[10px] tracking-[0.3em] text-magenta">
            {profile.os} {profile.version}
          </p>
          <TypingLine />
        </div>
      </motion.div>

      {/* Skip */}
      <button
        onClick={onComplete}
        className="absolute bottom-5 right-5 font-mono text-[11px] tracking-widest text-ink-faint hover:text-cyan"
      >
        [ SKIP ]
      </button>
    </motion.div>
  );
}
