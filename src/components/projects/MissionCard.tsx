import { motion } from "framer-motion";
import { ExternalLink, Github, Maximize2, Target } from "lucide-react";
import TechChip from "../ui/TechChip";
import type { Project } from "../../data/projects";

export const rankColor: Record<Project["rank"], string> = {
  S: "border-amber text-amber shadow-neon-amber",
  A: "border-cyan text-cyan shadow-neon-cyan",
  B: "border-magenta text-magenta shadow-neon-magenta",
};

export type CardSize = "feature" | "medium" | "small";

/** Tags shown on a regular card before collapsing into "+N". */
const MAX_CHIPS = 3;

interface MissionCardProps {
  project: Project;
  index: number;
  size?: CardSize;
  /** Tablet only: lay the card out sideways to fill a full row. */
  tabletWide?: boolean;
  /** Opens the detail panel; receives the trigger so focus can return to it. */
  onOpen: (trigger: HTMLElement) => void;
}

/**
 * Mission card, built to be read in a few seconds: a real screenshot, the
 * name, one line and a handful of tags. Everything longer (achievements,
 * impact, full stack) lives in the detail panel, opened from the screenshot
 * or the INTEL button. The "feature" size is the flagship: wide, horizontal
 * from lg up, with its credential pulled out as a badge.
 */
export default function MissionCard({
  project,
  index,
  size = "small",
  tabletWide = false,
  onOpen,
}: MissionCardProps) {
  const feature = size === "feature";

  // Flagship brief reads "Credential: what it is." — show the credential as a
  // badge and the rest as the sentence. Same words, no duplication.
  const cut = feature ? project.brief.indexOf(": ") : -1;
  const credential = cut > 0 ? project.brief.slice(0, cut) : null;
  const summary = cut > 0 ? project.brief.slice(cut + 2) : project.brief;

  // A lone "+1" reads worse than the tag itself, so only collapse 2 or more.
  const collapse = !feature && project.stack.length > MAX_CHIPS + 1;
  const chips = collapse ? project.stack.slice(0, MAX_CHIPS) : project.stack;
  const hidden = project.stack.length - chips.length;

  const shot = feature
    ? "aspect-[16/10] lg:aspect-auto lg:min-h-[340px] lg:w-[56%] lg:border-b-0 lg:border-r"
    : size === "medium"
      ? "aspect-[16/10] lg:aspect-[16/9]"
      : tabletWide
        ? "aspect-[16/10] md:max-lg:aspect-auto md:max-lg:w-1/2 md:max-lg:border-b-0 md:max-lg:border-r"
        : "aspect-[16/10]";

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: Math.min(index, 5) * 0.06 }}
      className={`hud-panel hud-corners group flex h-full flex-col transition-colors hover:border-cyan/40 ${
        feature ? "lg:flex-row" : tabletWide ? "md:max-lg:flex-row" : ""
      }`}
    >
      {/* Screenshot — the whole frame opens the detail panel */}
      <button
        type="button"
        onClick={(e) => onOpen(e.currentTarget)}
        aria-label={`Open ${project.name} details`}
        className={`relative block w-full shrink-0 overflow-hidden border-b border-white/10 bg-void-700 ${shot}`}
      >
        {project.cover && (
          <img
            src={project.cover}
            alt={`Screenshot of ${project.name}`}
            width={784}
            height={490}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-left-top transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
        )}
        {/* Readability + theme tint */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/60 via-transparent to-void/30"
        />
        {/* Chrome sits at the bottom so it never covers the demo's own header */}
        <span className="absolute bottom-3 left-3 border border-white/20 bg-void/80 px-2 py-0.5 font-mono text-[11px] tracking-[0.2em] text-ink-muted backdrop-blur-sm">
          {project.code}
        </span>
        <span className="absolute bottom-3 right-3 flex items-center gap-1.5 border border-cyan/50 bg-void/85 px-2.5 py-1 font-mono text-[11px] font-bold tracking-[0.15em] text-cyan opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100">
          <Maximize2 size={12} /> VIEW INTEL
        </span>
      </button>

      {/* Copy */}
      <div className={`flex min-w-0 flex-1 flex-col p-5 ${feature ? "lg:justify-center lg:p-8" : ""}`}>
        <div className="mb-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] tracking-wider">
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
          <span
            className={`ml-auto grid h-7 w-7 shrink-0 place-items-center border font-display text-xs font-black ${rankColor[project.rank]}`}
            title={`Rank ${project.rank}`}
          >
            {project.rank}
          </span>
        </div>

        <h3
          className={`glitch font-display font-bold tracking-wide text-ink ${
            feature ? "text-2xl md:text-3xl lg:text-4xl" : size === "medium" ? "text-2xl" : "text-xl"
          }`}
          data-text={project.name}
        >
          {project.name}
        </h3>

        {credential && (
          <p className="mt-3 inline-flex w-fit max-w-full items-center gap-2 border border-amber/60 bg-amber/[0.08] px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-amber">
            <span aria-hidden="true">★</span>
            {credential}
          </p>
        )}

        <p
          className={`mt-3 font-ui leading-relaxed text-ink-muted first-letter:uppercase ${
            feature ? "text-base lg:text-lg" : "text-sm"
          }`}
        >
          {summary}
        </p>

        {feature && (
          <p className="mt-3 flex gap-2 font-mono text-[13px] leading-relaxed text-cyan/90">
            <Target size={14} className="mt-1 shrink-0" />
            <span>{project.impact}</span>
          </p>
        )}

        <div className="mt-4 flex flex-wrap gap-1.5">
          {chips.map((t) => (
            <TechChip key={t} label={t} accent="cyan" />
          ))}
          {hidden > 0 && (
            <span
              className="inline-flex items-center border border-white/15 px-2 py-1 font-mono text-[11px] tracking-wider text-ink-faint"
              title={project.stack.slice(MAX_CHIPS).join(", ")}
            >
              +{hidden}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="mt-auto flex flex-wrap items-center gap-2 pt-5">
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 border border-cyan/60 px-3 py-2 font-mono text-[11px] font-bold tracking-[0.12em] text-cyan transition-colors hover:bg-cyan hover:text-void"
          >
            <ExternalLink size={13} /> LIVE
          </a>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 border border-white/15 px-3 py-2 font-mono text-[11px] font-bold tracking-[0.12em] text-ink-muted transition-colors hover:border-white/40 hover:text-ink"
            >
              <Github size={13} /> CODE
            </a>
          )}
          <button
            type="button"
            onClick={(e) => onOpen(e.currentTarget)}
            className="ml-auto inline-flex items-center gap-1 py-2 font-mono text-[11px] font-bold tracking-[0.12em] text-ink-muted transition-colors hover:text-cyan"
          >
            INTEL <span aria-hidden="true">▸</span>
          </button>
        </div>
      </div>
    </motion.article>
  );
}
