import { useCallback, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import MissionCard, { type CardSize } from "../projects/MissionCard";
import MissionModal from "../projects/MissionModal";
import { projects } from "../../data/projects";

const VISIBLE = 6; // shown before "See more"

/**
 * Bento layout. lg+ uses a 6-column grid: one wide flagship, two medium, then
 * rows of three. Tablet is 2 columns with the flagship on its own row; phones
 * stack everything.
 */
const LAYOUT: { size: CardSize; span: string }[] = [
  { size: "feature", span: "md:col-span-2 lg:col-span-6" },
  { size: "medium", span: "lg:col-span-3" },
  { size: "medium", span: "lg:col-span-3" },
];
const REST = { size: "small" as CardSize, span: "lg:col-span-2" };

export default function Projects() {
  const [showAll, setShowAll] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const trigger = useRef<HTMLElement | null>(null);

  const visible = showAll ? projects : projects.slice(0, VISIBLE);
  const remaining = projects.length - VISIBLE;

  const close = useCallback(() => {
    setOpenIndex(null);
    // Hand focus back to the card that opened the panel.
    trigger.current?.focus();
  }, []);
  const step = useCallback(
    (delta: number) =>
      setOpenIndex((i) => (i === null ? i : (i + delta + projects.length) % projects.length)),
    []
  );
  const prev = useCallback(() => step(-1), [step]);
  const next = useCallback(() => step(1), [step]);

  return (
    <section id="projects" className="relative mx-auto max-w-7xl px-5 py-24 md:py-32">
      <SectionHeading
        index="02"
        title="MISSION LOG"
        kanji="任務"
        accent="magenta"
        subtitle="Selected builds, most impactful first. Open any card for the full intel."
      />

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-6">
        {visible.map((p, i) => {
          const slot = LAYOUT[i] ?? REST;
          // Tablet (2 columns): the flagship takes a full row, so an odd card
          // left at the end also takes a full row instead of leaving a hole.
          const tabletWide = i > 0 && i === visible.length - 1 && visible.length % 2 === 0;
          return (
            <div key={p.code} className={`${slot.span} ${tabletWide ? "md:col-span-2" : ""}`}>
              <MissionCard
                project={p}
                index={i}
                size={slot.size}
                tabletWide={tabletWide}
                onOpen={(el) => {
                  trigger.current = el;
                  setOpenIndex(i);
                }}
              />
            </div>
          );
        })}
      </div>

      {remaining > 0 && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setShowAll((s) => !s)}
            aria-expanded={showAll}
            className="hud-corners group relative inline-flex items-center gap-2 border border-cyan/40 px-5 py-2 font-mono text-xs font-bold uppercase tracking-[0.15em] text-cyan transition-colors hover:bg-cyan hover:text-void"
          >
            {showAll ? "See less" : `See ${remaining} more projects`}
            <ChevronDown
              size={14}
              className={`transition-transform ${showAll ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      )}

      {createPortal(
        <AnimatePresence>
          {openIndex !== null && (
            <MissionModal
              key="mission-modal"
              project={projects[openIndex]}
              position={openIndex + 1}
              total={projects.length}
              onClose={close}
              onPrev={prev}
              onNext={next}
            />
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}
