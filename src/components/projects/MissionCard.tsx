import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Target, Trophy } from "lucide-react";
import TechChip from "../ui/TechChip";
import type { Project } from "../../data/projects";

const rankColor: Record<Project["rank"], string> = {
  S: "border-amber text-amber shadow-neon-amber",
  A: "border-cyan text-cyan shadow-neon-cyan",
  B: "border-magenta text-magenta shadow-neon-magenta",
};

/**
 * Mission briefing card. Front shows the brief + stack; hovering or
 * keyboard-focusing the card reveals a second face (achievements + impact)
 * with a glitch transition. Live/GitHub links stay in the footer so they
 * remain reachable in both states (accessibility).
 */
export default function MissionCard({ project, index }: { project: Project; index: number }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      onMouseEnter={() => setRevealed(true)}
      onMouseLeave={() => setRevealed(false)}
      onFocus={() => setRevealed(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setRevealed(false);
      }}
      className="hud-panel hud-corners group flex flex-col p-5 transition-colors hover:border-cyan/40"
    >
      {/* Header */}
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <span className="font-mono text-[10px] tracking-widest text-ink-faint">
            {project.code} // {project.classTag}
          </span>
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
      <div className="relative min-h-[168px] flex-1">
        <AnimatePresence mode="wait" initial={false}>
          {!revealed ? (
            <motion.div
              key="front"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8, filter: "blur(2px)" }}
              transition={{ duration: 0.18 }}
            >
              <p className="mb-4 font-ui text-sm leading-relaxed text-ink-muted">
                {project.brief}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {project.stack.map((t) => (
                  <TechChip key={t} label={t} accent="cyan" />
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="back"
              initial={{ opacity: 0, x: 8, filter: "blur(2px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.18 }}
            >
              <ul className="mb-3 space-y-1.5">
                {project.achievements.map((a) => (
                  <li key={a} className="flex gap-2 font-ui text-[13px] leading-snug text-ink">
                    <Trophy size={13} className="mt-0.5 shrink-0 text-amber" />
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
              <div className="flex gap-2 border-t border-white/10 pt-2.5">
                <Target size={14} className="mt-0.5 shrink-0 text-cyan" />
                <p className="font-mono text-[12px] leading-snug text-cyan/90">{project.impact}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
        <span className="ml-auto font-mono text-[10px] text-ink-faint group-hover:text-cyan">
          {revealed ? "▸ INTEL" : "HOVER ▸"}
        </span>
      </div>
    </motion.article>
  );
}
