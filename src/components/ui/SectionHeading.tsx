import { motion } from "framer-motion";

interface SectionHeadingProps {
  index: string; // e.g. "02"
  title: string;
  kanji?: string;
  accent?: "cyan" | "magenta" | "amber";
  subtitle?: string;
}

const accentMap = {
  cyan: { text: "text-cyan", glow: "text-glow-cyan", bar: "bg-cyan" },
  magenta: { text: "text-magenta", glow: "text-glow-magenta", bar: "bg-magenta" },
  amber: { text: "text-amber", glow: "", bar: "bg-amber" },
};

/** Consistent section header: [SECTOR 0X] + glitch title + kanji overlay. */
export default function SectionHeading({
  index,
  title,
  kanji,
  accent = "cyan",
  subtitle,
}: SectionHeadingProps) {
  const a = accentMap[accent];
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.5 }}
      className="mb-12"
    >
      <div className={`mb-2 font-mono text-xs tracking-[0.4em] ${a.text}`}>
        [ SECTOR_{index} ]
      </div>
      {/* Below 360px the title scales with the viewport (it is exactly text-3xl
          from 360px up), so one long word, common in Spanish, still fits
          beside the kanji. */}
      <div className="flex items-end gap-3 min-[360px]:gap-4">
        <h2
          className={`glitch text-[length:clamp(1.5rem,8.34vw,1.875rem)] font-black uppercase leading-9 tracking-wider text-ink md:text-5xl`}
          data-text={title}
        >
          {title}
        </h2>
        {kanji && (
          <span className="font-jp text-2xl text-ink-faint md:text-3xl" aria-hidden="true">
            {kanji}
          </span>
        )}
      </div>
      {subtitle && (
        <p className="mt-3 max-w-2xl font-mono text-sm text-ink-muted">{subtitle}</p>
      )}
      <div className={`mt-4 h-[2px] w-24 ${a.bar} shadow-neon-cyan`} />
    </motion.div>
  );
}
