import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronRight, GraduationCap, Award } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import {
  experience,
  education,
  certifications,
  languages,
  type ExperienceRole,
} from "../../data/experience";

const VISIBLE = 3; // roles shown before "See more"
const HL_VISIBLE = 2; // highlights shown before "Read more"

function RoleCard({ node, index }: { node: ExperienceRole; index: number }) {
  const [open, setOpen] = useState(false);
  const hasMore = node.highlights.length > HL_VISIBLE;
  const shown = open ? node.highlights : node.highlights.slice(0, HL_VISIBLE);

  return (
    <motion.li
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, delay: Math.min(index, VISIBLE) * 0.08 }}
      className="relative"
    >
      {/* Node marker */}
      <span
        className={`absolute -left-[31px] top-1.5 grid h-4 w-4 place-items-center rounded-full border md:-left-[39px] ${
          node.current ? "border-amber bg-amber shadow-neon-amber" : "border-cyan bg-void"
        }`}
      >
        {node.current && <span className="h-1.5 w-1.5 rounded-full bg-void" />}
      </span>

      <div className="hud-panel p-5">
        {/* Header */}
        <div className="mb-2 flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
          <div>
            <h3 className="font-display text-lg font-bold tracking-wide text-ink">{node.role}</h3>
            <p className="font-mono text-sm tracking-wide text-cyan">
              {node.org}
              {node.location && <span className="text-ink-faint"> · {node.location}</span>}
            </p>
          </div>
          <div className="text-right">
            <span className="block font-mono text-sm font-medium text-ink">{node.period}</span>
            <span
              className={`mt-0.5 inline-block border px-1.5 py-0.5 font-mono text-[10px] tracking-wider ${
                node.current ? "border-amber/60 text-amber" : "border-white/15 text-ink-faint"
              }`}
            >
              {node.current ? "CURRENT" : node.type}
            </span>
          </div>
        </div>

        <p className="mb-3 font-ui text-sm leading-relaxed text-ink-muted">{node.summary}</p>

        <ul className="space-y-1.5">
          {shown.map((h) => (
            <li key={h} className="flex items-start gap-2 font-ui text-sm leading-relaxed text-ink">
              <ChevronRight size={15} className="mt-0.5 shrink-0 text-amber" />
              <span>{h}</span>
            </li>
          ))}
        </ul>

        {hasMore && (
          <button
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            className="mt-3 inline-flex items-center gap-1 font-mono text-[12px] font-medium tracking-wider text-cyan/80 transition-colors hover:text-cyan"
          >
            {open ? "Read less" : `Read more (+${node.highlights.length - HL_VISIBLE})`}
            <ChevronDown
              size={13}
              className={`transition-transform ${open ? "rotate-180" : ""}`}
            />
          </button>
        )}
      </div>
    </motion.li>
  );
}

export default function Experience() {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? experience : experience.slice(0, VISIBLE);
  const remaining = experience.length - VISIBLE;

  return (
    <section id="experience" className="relative mx-auto max-w-5xl px-5 py-24 md:py-32">
      <SectionHeading
        index="04"
        title="CHARACTER STATS"
        kanji="経歴"
        accent="amber"
        subtitle="Real roles, real dates, real outcomes — most recent first."
      />

      {/* Work timeline */}
      <ol className="relative space-y-6 border-l border-white/10 pl-6 md:pl-8">
        {visible.map((node, i) => (
          <RoleCard key={node.role + node.period} node={node} index={i} />
        ))}
      </ol>

      {/* See more / less roles */}
      {remaining > 0 && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => setShowAll((s) => !s)}
            aria-expanded={showAll}
            className="hud-corners group inline-flex items-center gap-2 border border-cyan/40 px-5 py-2 font-mono text-xs font-bold uppercase tracking-[0.15em] text-cyan transition-colors hover:bg-cyan hover:text-void"
          >
            {showAll ? "See less" : `See ${remaining} more roles`}
            <ChevronDown
              size={14}
              className={`transition-transform ${showAll ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      )}

      {/* Education, certifications & languages */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="mt-14 grid gap-8 md:grid-cols-2"
      >
        {/* Education */}
        <div>
          <h3 className="mb-4 flex items-center gap-2 font-mono text-sm tracking-[0.25em] text-cyan">
            <GraduationCap size={16} /> EDUCATION
          </h3>
          <div className="space-y-3">
            {education.map((c) => (
              <div
                key={c.title}
                className="hud-panel flex items-center justify-between gap-3 px-4 py-3"
              >
                <div>
                  <p className="font-ui text-sm font-semibold text-ink">{c.title}</p>
                  <p className="font-mono text-[12px] text-ink-faint">{c.org}</p>
                </div>
                <span className="shrink-0 font-mono text-[13px] text-amber">{c.year}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications + languages */}
        <div>
          <h3 className="mb-4 flex items-center gap-2 font-mono text-sm tracking-[0.25em] text-magenta">
            <Award size={16} /> CERTIFICATIONS
          </h3>
          <ul className="mb-6 space-y-2">
            {certifications.map((c) => (
              <li
                key={c}
                className="flex items-center gap-2 font-ui text-sm text-ink"
              >
                <span className="text-magenta">◆</span>
                {c}
              </li>
            ))}
          </ul>

          <h3 className="mb-3 font-mono text-sm tracking-[0.25em] text-amber">LANGUAGES</h3>
          <div className="flex flex-wrap gap-2">
            {languages.map((l) => (
              <span
                key={l}
                className="border border-amber/40 bg-amber/[0.04] px-3 py-1 font-mono text-xs tracking-wider text-amber"
              >
                {l}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
