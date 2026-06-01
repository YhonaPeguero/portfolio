import { useState } from "react";
import { ChevronDown } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import MissionCard from "../projects/MissionCard";
import { projects } from "../../data/projects";

const VISIBLE = 6; // shown before "See more"

export default function Projects() {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? projects : projects.slice(0, VISIBLE);
  const remaining = projects.length - VISIBLE;

  return (
    <section id="projects" className="relative mx-auto max-w-7xl px-5 py-24 md:py-32">
      <SectionHeading
        index="02"
        title="MISSION LOG"
        kanji="任務"
        accent="magenta"
        subtitle="Selected builds, most impactful first. Hover or focus a card to decrypt the intel."
      />

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((p, i) => (
          <MissionCard key={p.code} project={p} index={i} />
        ))}
      </div>

      {remaining > 0 && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setShowAll((s) => !s)}
            aria-expanded={showAll}
            className="hud-corners group inline-flex items-center gap-2 border border-cyan/40 px-5 py-2 font-mono text-xs font-bold uppercase tracking-[0.15em] text-cyan transition-colors hover:bg-cyan hover:text-void"
          >
            {showAll ? "See less" : `See ${remaining} more projects`}
            <ChevronDown
              size={14}
              className={`transition-transform ${showAll ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      )}
    </section>
  );
}
