import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import { experience } from "../../data/experience";

export default function Experience() {
  return (
    <section id="experience" className="relative mx-auto max-w-5xl px-5 py-24 md:py-32">
      <SectionHeading
        index="03"
        title="CHARACTER STATS"
        kanji="経歴"
        accent="amber"
        subtitle="Progression tree. Each role unlocked a new set of abilities."
      />

      <ol className="relative space-y-6 border-l border-white/10 pl-6 md:pl-8">
        {experience.map((node, i) => (
          <motion.li
            key={node.role}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="relative"
          >
            {/* Node marker */}
            <span
              className={`absolute -left-[31px] top-1 grid h-4 w-4 place-items-center rounded-full border md:-left-[39px] ${
                node.active ? "border-amber bg-amber shadow-neon-amber" : "border-cyan bg-void"
              }`}
            >
              {node.active && <span className="h-1.5 w-1.5 rounded-full bg-void" />}
            </span>

            <div className="hud-panel p-5">
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h3 className="font-display text-lg font-bold tracking-wide text-ink">
                    {node.role}
                  </h3>
                  <p className="font-mono text-xs tracking-wider text-cyan">{node.org}</p>
                </div>
                <div className="text-right">
                  <span className="block font-display text-sm font-black text-amber">
                    LV {node.level}
                  </span>
                  <span className="font-mono text-[10px] tracking-widest text-ink-faint">
                    {node.period}
                  </span>
                </div>
              </div>

              <p className="mb-3 font-ui text-sm leading-relaxed text-ink-muted">{node.summary}</p>

              <ul className="grid gap-1.5 sm:grid-cols-2">
                {node.abilities.map((ab) => (
                  <li
                    key={ab}
                    className="flex items-start gap-1.5 font-mono text-[12px] leading-snug text-ink"
                  >
                    <ChevronRight size={13} className="mt-0.5 shrink-0 text-amber" />
                    <span>{ab}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
