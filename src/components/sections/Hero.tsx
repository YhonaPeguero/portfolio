import { Suspense, lazy, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, ChevronDown } from "lucide-react";
import GameButton from "../ui/GameButton";
import CSSFallback from "../three/CSSFallback";
import { profile } from "../../data/profile";
import { isWebGLAvailable } from "../../lib/webgl";
import { useMediaQuery, usePrefersReducedMotion, useScramble } from "../../lib/hooks";

// Heavy 3D scene is code-split and only loaded when WebGL is present.
const HeroScene = lazy(() => import("../three/HeroScene"));
// The hologram figure (pulls in GSAP) is desktop-only — lazy-loaded so it
// never ships to or runs on mobile/tablet.
const HeroFigure = lazy(() => import("../three/HeroFigure"));

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Hero() {
  const reduced = usePrefersReducedMotion();
  const webgl = useMemo(() => isWebGLAvailable(), []);
  // Figure only appears where there's real room beside the text (xl+).
  const isWide = useMediaQuery("(min-width: 1280px)");
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

      {/* Hero content — single left-aligned column. Width is independent of
          the figure, so the layout holds with or without the artwork. */}
      <div className="relative mx-auto w-full max-w-7xl px-5 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-xl lg:max-w-2xl"
        >
          {/* Status line */}
          <p className="mb-4 inline-flex items-center gap-2 border border-cyan/30 bg-cyan/[0.04] px-3 py-1 font-mono text-[11px] tracking-[0.25em] text-cyan">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan shadow-neon-cyan" />
            SYSTEM ONLINE // READY
          </p>

          {/* Kanji + canonical title (single source — no duplicate below) */}
          <p className="mb-3 font-mono text-sm tracking-[0.3em] text-magenta">
            <span className="font-jp mr-2">{profile.kanji}</span>
            // {profile.roles[0].toUpperCase()}
          </p>

          {/* Name (scramble-in) */}
          <h1 className="font-display text-4xl font-black leading-none tracking-tight text-ink sm:text-6xl md:text-7xl">
            <span className="text-glow-cyan">{name}</span>
          </h1>

          {/* Specialties (title already shown above, so skip roles[0]) */}
          <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 font-ui text-lg text-ink-muted md:text-2xl">
            {profile.roles.slice(1).map((r, i) => (
              <span key={r} className="flex items-center gap-3">
                {i > 0 && <span className="text-cyan/50">·</span>}
                <span className={i === 0 ? "text-magenta" : "text-amber"}>{r}</span>
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

      {/* Holographic figure — decorative right-side overlay (xl+ only, lazy).
          Constrained to the same max-w-7xl track as the text and justified to
          the right edge, so it never overlaps the copy at any viewport width
          and never leaves a dead column when the artwork is absent. */}
      <div className="pointer-events-none absolute inset-0 hidden xl:block">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-end px-5">
          <div className="w-[42%] max-w-[500px]">
            {isWide && (
              <Suspense fallback={null}>
                <HeroFigure />
              </Suspense>
            )}
          </div>
        </div>
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
