import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "../ui/SectionHeading";
import MissionCard from "../projects/MissionCard";
import { projects, projectCategories, type ProjectCategory } from "../../data/projects";

export default function Projects() {
  const [tab, setTab] = useState<ProjectCategory>("web2");

  const counts = useMemo(
    () => ({
      web2: projects.filter((p) => p.category === "web2").length,
      web3: projects.filter((p) => p.category === "web3").length,
    }),
    []
  );

  const filtered = useMemo(() => projects.filter((p) => p.category === tab), [tab]);

  return (
    <section id="projects" className="relative mx-auto max-w-7xl px-5 py-24 md:py-32">
      <SectionHeading
        index="02"
        title="MISSION LOG"
        kanji="任務"
        accent="magenta"
        subtitle="Selected builds, split by sector. Hover or focus a card to decrypt the mission intel."
      />

      {/* Sector tabs: WEB2 / WEB3 */}
      <div
        role="tablist"
        aria-label="Project category"
        className="mb-8 inline-flex border border-white/10 bg-void-800/60 p-1 backdrop-blur-md"
      >
        {projectCategories.map((c) => {
          const active = tab === c.id;
          return (
            <button
              key={c.id}
              role="tab"
              aria-selected={active}
              onClick={() => setTab(c.id)}
              className={`relative px-5 py-2 font-mono text-xs tracking-[0.2em] transition-colors ${
                active ? "text-void" : "text-ink-muted hover:text-ink"
              }`}
            >
              {active && (
                <motion.span
                  layoutId="tab-pill"
                  className="absolute inset-0 -z-10 bg-cyan shadow-neon-cyan"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              {c.label}
              <span className={`ml-2 ${active ? "text-void/70" : "text-ink-faint"}`}>
                {counts[c.id]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Keyed wrapper re-mounts on tab change so cards re-stagger in.
          No exit animation (mode="wait") — the swap never blocks on rAF. */}
      <motion.div
        key={tab}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
      >
        {filtered.map((p, i) => (
          <MissionCard key={p.code} project={p} index={i} />
        ))}
      </motion.div>

      <p className="mt-6 font-mono text-[11px] text-ink-faint">
        ◆ {projects.length} missions logged · {counts.web2} Web2 · {counts.web3} Web3 · all builds live
      </p>
    </section>
  );
}
