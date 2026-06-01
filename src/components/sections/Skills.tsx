import { motion } from "framer-motion";
import SectionHeading from "../ui/SectionHeading";
import { skillCategories } from "../../data/skills";

const barColor = {
  cyan: "from-cyan/70 to-cyan",
  magenta: "from-magenta/70 to-magenta",
  amber: "from-amber/70 to-amber",
};
const textColor = {
  cyan: "text-cyan",
  magenta: "text-magenta",
  amber: "text-amber",
};

export default function Skills() {
  return (
    <section id="skills" className="relative mx-auto max-w-7xl px-5 py-24 md:py-32">
      <SectionHeading
        index="01"
        title="TECH ARSENAL"
        kanji="技"
        accent="cyan"
        subtitle="Equipped skill nodes. Bars show current proficiency — frontend is maxed, on-chain is leveling fast."
      />

      <div className="grid gap-5 md:grid-cols-2">
        {skillCategories.map((cat, ci) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: ci * 0.08 }}
            className="hud-panel hud-corners p-5"
          >
            <div className="mb-5 flex items-baseline justify-between">
              <h3 className={`font-display text-lg font-bold tracking-wider ${textColor[cat.accent]}`}>
                {cat.title}
              </h3>
              <span className="font-mono text-[11px] tracking-wider text-ink-faint">
                {cat.subtitle}
              </span>
            </div>

            <ul className="space-y-3.5">
              {cat.skills.map((skill, si) => (
                <li key={skill.name}>
                  <div className="mb-1 flex items-center justify-between font-mono text-xs">
                    <span className="text-ink">{skill.name}</span>
                    <span className={textColor[cat.accent]}>{skill.level}</span>
                  </div>
                  {/* HP/MP-style bar */}
                  <div className="h-2 w-full overflow-hidden border border-white/10 bg-black/40">
                    <motion.div
                      className={`h-full bg-gradient-to-r ${barColor[cat.accent]}`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, delay: 0.15 + si * 0.06, ease: "easeOut" }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
