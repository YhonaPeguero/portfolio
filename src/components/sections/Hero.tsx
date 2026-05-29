import { Suspense, lazy, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, ChevronDown } from "lucide-react";
import GameButton from "../ui/GameButton";
import BootLog from "../ui/BootLog";
import CSSFallback from "../three/CSSFallback";
import { profile } from "../../data/profile";
import { isWebGLAvailable } from "../../lib/webgl";
import { usePrefersReducedMotion, useScramble } from "../../lib/hooks";

// Heavy 3D scene is code-split and only loaded when WebGL is present.
const HeroScene = lazy(() => import("../three/HeroScene"));

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Hero() {
  const reduced = usePrefersReducedMotion();
  const webgl = useMemo(() => isWebGLAvailable(), []);
  const name = useScramble(profile.name.toUpperCase());

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden">
      {/* Background: 3D scene (lazy) with CSS fallback */}
      {webgl ? (
        <Suspense fallback={<CSSFallback />}>
          <HeroScene reduced={reduced} />
        </Suspense>
      ) : (
        <CSSFallback />
      )}

      {/* Readability gradient over the scene */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-void/60 via-transparent to-void" />

      <div className="mx-auto w-full max-w-7xl px-5 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          {/* Boot log terminal */}
          <div className="hud-panel hud-corners mb-8 inline-block p-3">
            <BootLog />
          </div>

          {/* Kanji + intro */}
          <p className="mb-3 font-mono text-sm tracking-[0.3em] text-magenta">
            <span className="font-jp mr-2">{profile.kanji}</span>
            // SENIOR SOFTWARE ENGINEER
          </p>

          {/* Name (scramble-in) */}
          <h1 className="font-display text-4xl font-black leading-none tracking-tight text-ink sm:text-6xl md:text-7xl">
            <span className="text-glow-cyan">{name}</span>
          </h1>

          {/* Roles sub-headline */}
          <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 font-ui text-lg text-ink-muted md:text-2xl">
            {profile.roles.map((r, i) => (
              <span key={r} className="flex items-center gap-3">
                {i > 0 && <span className="text-cyan/50">·</span>}
                <span className={i === 0 ? "text-cyan" : i === 1 ? "text-magenta" : "text-amber"}>
                  {r}
                </span>
              </span>
            ))}
          </p>

          <p className="mt-5 max-w-xl font-ui text-base leading-relaxed text-ink-muted">
            {profile.tagline}
          </p>

          {/* CTAs */}
          <div className="mt-9 flex flex-wrap gap-4">
            <GameButton onClick={() => scrollTo("projects")} variant="primary">
              ENTER PORTFOLIO
              <ArrowRight size={16} />
            </GameButton>
            <GameButton href={profile.cv} download="Yhonatan_Peguero_CV.pdf" variant="ghost" external>
              DOWNLOAD CV
              <Download size={16} />
            </GameButton>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => scrollTo("skills")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-cyan/70 hover:text-cyan"
        aria-label="Scroll to next section"
      >
        <ChevronDown className="animate-float" />
      </button>
    </section>
  );
}
