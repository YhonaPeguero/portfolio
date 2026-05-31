import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import { sideQuests } from "../../data/sideQuests";

const statusStyle = {
  COMPLETE: "border-cyan/50 text-cyan",
  ACTIVE: "border-magenta/50 text-magenta animate-pulse-glow",
  ONGOING: "border-amber/50 text-amber",
};

export default function SideQuests() {
  return (
    <section id="sidequests" className="relative mx-auto max-w-7xl px-5 py-24 md:py-32">
      <SectionHeading
        index="04"
        title="SIDE QUESTS"
        kanji="依頼"
        accent="cyan"
        subtitle="Web3 & open-source activity — hackathons, DeFi contributions and on-chain experiments."
      />

      <div className="grid gap-4 md:grid-cols-2">
        {sideQuests.map((q, i) => (
          <motion.div
            key={q.title}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="hud-panel hud-corners flex items-start gap-4 p-5"
          >
            <span className="mt-1 font-mono text-2xl text-cyan/40">◈</span>
            <div className="flex-1">
              <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-display text-base font-bold tracking-wide text-ink">
                  {q.title}
                </h3>
                <span
                  className={`border px-2 py-0.5 font-mono text-[11px] tracking-wider ${statusStyle[q.status]}`}
                >
                  {q.status}
                </span>
              </div>
              <p className="font-mono text-[11px] tracking-wider text-ink-faint">
                {q.org}
                {q.period && <span className="text-ink-faint/70"> · {q.period}</span>}
              </p>
              <p className="mt-2 font-ui text-sm leading-relaxed text-ink-muted">{q.description}</p>
              {q.link && (
                <a
                  href={q.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1.5 font-mono text-xs text-cyan hover:text-glow-cyan"
                >
                  <ExternalLink size={13} /> VIEW
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
