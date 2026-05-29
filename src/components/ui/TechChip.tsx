interface TechChipProps {
  label: string;
  accent?: "cyan" | "magenta" | "amber";
}

const accentMap = {
  cyan: "border-cyan/40 text-cyan",
  magenta: "border-magenta/40 text-magenta",
  amber: "border-amber/40 text-amber",
};

/** Tech badge styled as an RPG item chip. */
export default function TechChip({ label, accent = "cyan" }: TechChipProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 border ${accentMap[accent]} bg-white/[0.02] px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider`}
    >
      <span className="opacity-60">◆</span>
      {label}
    </span>
  );
}
