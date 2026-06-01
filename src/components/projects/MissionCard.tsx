import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, Target, Trophy } from "lucide-react";
import TechChip from "../ui/TechChip";
import { useMediaQuery } from "../../lib/hooks";
import type { Project } from "../../data/projects";

const rankColor: Record<Project["rank"], string> = {
  S: "border-amber text-amber shadow-neon-amber",
  A: "border-cyan text-cyan shadow-neon-cyan",
  B: "border-magenta text-magenta shadow-neon-magenta",
};

/**
 * Mission briefing card. Front shows the brief + stack; hovering or
 * keyboard-focusing the card reveals a second face (achievements + impact)
 * with a glitch transition. On touch devices (no hover) tapping the card
 * toggles the reveal. Live/GitHub links stay in the footer so they remain
 * reachable in both states (accessibility).
 */
export default function MissionCard({ project, index }: { project: Project; index: number }) {
  const [revealed, setRevealed] = useState(false);
  // Touch / no-hover devices can't hover — let a tap toggle the intel.
  const coarse = useMediaQuery("(hover: none)");

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5, delay: Math.min(index, 5) * 0.06 }}
      onMouseEnter={() => !coarse && setRevealed(true)}
      onMouseLeave={() => !coarse && setRevealed(false)}
      onFocus={() => setRevealed(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setRevealed(false);
      }}
      onClick={() => coarse && setRevealed((r) => !r)}
      className="hud-panel hud-corners group flex flex-col p-5 transition-colors hover:border-cyan/40"
    >
      {/* Header */}
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <div className="mb-0.5 flex items-center gap-2 font-mono text-[11px] tracking-wider">
            <span
              className={`border px-1.5 py-px text-[10px] font-bold ${
                project.category === "web3"
                  ? "border-magenta/50 text-magenta"
                  : "border-cyan/40 text-cyan"
              }`}
            >
              {project.category === "web3" ? "WEB3" : "WEB2"}
            </span>
            <span className="text-ink-faint">{project.classTag}</span>
          </div>
          <h3
            className="glitch font-display text-2xl font-bold tracking-wide text-ink"
            data-text={project.name}
          >
            {project.name}
          </h3>
        </div>
        <span
          className={`grid h-9 w-9 shrink-0 place-items-center border ${rankColor[project.rank]} font-display text-sm font-black`}
          title={`Rank ${project.rank}`}
        >
          {project.rank}
        </span>
      </div>

      {/* Flip body — fixed min-height so the layout doesn't jump */}
      {/* Both faces share one grid cell, so the card height is the taller of
          the two — no reflow when flipping, and screen readers get both. */}
      <div className="grid flex-1 [&>*]:[grid-area:1/1]">
        {/* Front: brief + stack */}
        <motion.div
          animate={{ opacity: revealed ? 0 : 1, filter: revealed ? "blur(2px)" : "blur(0px)" }}
          transition={{ duration: 0.2 }}
          className={revealed ? "pointer-events-none" : ""}
        >
          <p className="mb-4 font-ui text-sm leading-relaxed text-ink-muted">{project.brief}</p>
          <div className="flex flex-wrap gap-1.5">
            {project.stack.map((t) => (
              <TechChip key={t} label={t} accent="cyan" />
            ))}
          </div>
        </motion.div>

        {/* Back: achievements + impact */}
        <motion.div
          animate={{ opacity: revealed ? 1 : 0, filter: revealed ? "blur(0px)" : "blur(2px)" }}
          transition={{ duration: 0.2 }}
          className={revealed ? "" : "pointer-events-none"}
        >
          <ul className="mb-3 space-y-2">
            {project.achievements.map((a) => (
              <li key={a} className="flex gap-2 font-ui text-sm leading-relaxed text-ink">
                <Trophy size={14} className="mt-0.5 shrink-0 text-amber" />
                <span>{a}</span>
              </li>
            ))}
          </ul>
          <div className="flex gap-2 border-t border-white/10 pt-2.5">
            <Target size={14} className="mt-0.5 shrink-0 text-cyan" />
            <p className="font-mono text-[13px] leading-relaxed text-cyan/90">{project.impact}</p>
          </div>
        </motion.div>
      </div>

      {/* Footer links (always reachable) */}
      <div className="mt-4 flex items-center gap-4 border-t border-white/10 pt-3">
        <a
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 font-mono text-xs tracking-wider text-cyan hover:text-glow-cyan"
        >
          <ExternalLink size={14} /> LIVE
        </a>
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-mono text-xs tracking-wider text-ink-muted hover:text-ink"
          >
            <Github size={14} /> CODE
          </a>
        )}
        <span className="ml-auto font-mono text-[11px] font-medium text-cyan/80">
          {revealed ? "▾ ACHIEVEMENTS" : coarse ? "TAP ▸ MORE" : "HOVER ▸ MORE"}
        </span>
      </div>
    </motion.article>
  );
}
