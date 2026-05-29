import SectionHeading from "../ui/SectionHeading";
import MissionCard from "../projects/MissionCard";
import { projects } from "../../data/projects";

export default function Projects() {
  return (
    <section id="projects" className="relative mx-auto max-w-7xl px-5 py-24 md:py-32">
      <SectionHeading
        index="02"
        title="MISSION LOG"
        kanji="任務"
        accent="magenta"
        subtitle="Selected builds, ordered by impact. Hover or focus a card to decrypt the mission intel."
      />

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <MissionCard key={p.code} project={p} index={i} />
        ))}
      </div>

      {/* Tabindex hint for keyboard users to make cards focusable in order */}
      <p className="mt-6 font-mono text-[11px] text-ink-faint">
        ◆ {projects.length} missions logged · all builds are live & shipping
      </p>
    </section>
  );
}
