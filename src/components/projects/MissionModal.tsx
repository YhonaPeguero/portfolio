import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, Github, Target, Trophy, X } from "lucide-react";
import TechChip from "../ui/TechChip";
import { rankColor } from "./MissionCard";
import { useLockScroll } from "../../lib/hooks";
import type { Project } from "../../data/projects";
import { useI18n } from "../../i18n/I18nProvider";

interface MissionModalProps {
  project: Project;
  /** 1-based position and total, e.g. 2 of 6 */
  position: number;
  total: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Full mission brief. Holds everything the card leaves out: a larger
 * screenshot, achievements, impact and the full stack. Esc or the backdrop
 * closes it, ← / → step through projects, and Tab stays inside the panel.
 */
export default function MissionModal({
  project,
  position,
  total,
  onClose,
  onPrev,
  onNext,
}: MissionModalProps) {
  const { t } = useI18n();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useLockScroll(true);

  // Move focus into the dialog once, when it opens.
  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") onNext();
      else if (e.key === "ArrowLeft") onPrev();
      else if (e.key === "Tab" && panelRef.current) {
        const nodes = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
        if (nodes.length === 0) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose, onNext, onPrev]);

  const pad = (n: number) => String(n).padStart(2, "0");

  const stack = (
    <>
      <h4 className="mb-3 mt-6 font-mono text-[11px] tracking-[0.3em] text-ink-faint">{t.projects.stack}</h4>
      <div className="flex flex-wrap gap-1.5">
        {project.stack.map((t) => (
          <TechChip key={t} label={t} accent="cyan" />
        ))}
      </div>
    </>
  );

  return (
    <motion.div
      className="fixed inset-0 z-[56] flex items-end justify-center sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-void/85 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />

      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mission-title"
        initial={{ y: 28, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 16, opacity: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="hud-corners relative flex max-h-[100dvh] w-full max-w-5xl flex-col border border-white/15 bg-void-800 shadow-[0_24px_80px_rgba(0,0,0,0.6)] sm:max-h-[calc(100dvh-3rem)]"
      >
        {/* Title bar */}
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-white/10 px-4 py-2.5 md:px-6">
          <p className="font-mono text-[11px] tracking-[0.25em] text-ink-faint">
            <span className="text-cyan">{project.code}</span> // {t.projects.missionBrief}{" "}
            <span className="hidden sm:inline">
              · {pad(position)}/{pad(total)}
            </span>
          </p>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={onPrev}
              aria-label={t.projects.previous}
              className="grid h-9 w-9 place-items-center border border-white/10 text-ink-muted transition-colors hover:border-cyan/50 hover:text-cyan"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              onClick={onNext}
              aria-label={t.projects.next}
              className="grid h-9 w-9 place-items-center border border-white/10 text-ink-muted transition-colors hover:border-cyan/50 hover:text-cyan"
            >
              <ChevronRight size={16} />
            </button>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label={t.projects.close}
              className="ml-2 grid h-9 w-9 place-items-center border border-white/10 text-ink-muted transition-colors hover:border-magenta/60 hover:text-magenta"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="grid min-h-0 flex-1 gap-6 overflow-y-auto overscroll-contain p-4 md:p-6 lg:grid-cols-[1.1fr_1fr] lg:gap-8">
          {/* Visual + actions */}
          <div className="min-w-0">
            <div className="relative aspect-[16/10] overflow-hidden border border-white/10 bg-void-700">
              {project.cover && (
                <img
                  src={project.cover}
                  alt={t.projects.screenshotOf(project.name)}
                  width={784}
                  height={490}
                  className="absolute inset-0 h-full w-full object-cover object-left-top"
                />
              )}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-cyan/60 px-4 py-2.5 font-mono text-xs font-bold tracking-[0.15em] text-cyan transition-colors hover:bg-cyan hover:text-void"
              >
                <ExternalLink size={14} /> {t.projects.openLive}
              </a>
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-white/15 px-4 py-2.5 font-mono text-xs font-bold tracking-[0.15em] text-ink-muted transition-colors hover:border-white/40 hover:text-ink"
                >
                  <Github size={14} /> {t.projects.sourceCode}
                </a>
              )}
            </div>
            <div className="hidden lg:block">{stack}</div>
          </div>

          {/* Brief */}
          <div className="min-w-0">
            <div className="mb-2 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] tracking-wider">
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
                className={`ml-auto grid h-7 w-7 place-items-center border font-display text-xs font-black ${rankColor[project.rank]}`}
                title={t.projects.rank(project.rank)}
              >
                {project.rank}
              </span>
            </div>

            <h3 id="mission-title" className="font-display text-2xl font-bold tracking-wide text-ink md:text-3xl">
              {project.name}
            </h3>
            <p className="mt-3 font-ui text-base leading-relaxed text-ink-muted">{project.brief}</p>

            <h4 className="mb-3 mt-6 font-mono text-[11px] tracking-[0.3em] text-amber">{t.projects.achievements}</h4>
            <ul className="space-y-2.5">
              {project.achievements.map((a, i) => (
                <li key={i} className="flex gap-2.5 font-ui text-sm leading-relaxed text-ink">
                  <Trophy size={14} className="mt-1 shrink-0 text-amber" />
                  <span>{a}</span>
                </li>
              ))}
            </ul>

            <h4 className="mb-2 mt-6 font-mono text-[11px] tracking-[0.3em] text-cyan">{t.projects.impact}</h4>
            <p className="flex gap-2.5 font-mono text-[13px] leading-relaxed text-cyan/90">
              <Target size={14} className="mt-1 shrink-0" />
              <span>{project.impact}</span>
            </p>

            <div className="lg:hidden">{stack}</div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
