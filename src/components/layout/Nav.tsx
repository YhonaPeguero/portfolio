import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { ArrowUpRight, Download, Github, Linkedin, Menu, X } from "lucide-react";
import XIcon from "../ui/XIcon";
import LanguageSwitch from "./LanguageSwitch";
import { socialBrand } from "../ui/socialBrand";
import { profile } from "../../data/profile";
import { useLockScroll, useScrolled } from "../../lib/hooks";
import { useCv, useI18n } from "../../i18n/I18nProvider";

// Sections in page order; `index` matches each section's [ SECTOR_0X ] heading.
// Labels are plain and scannable; the themed codename is kept as a tooltip so
// the game flavour survives without confusing visitors. Both come from the
// dictionary (t.nav.links / t.nav.codes), keyed by `id`.
const links = [
  { id: "home", index: "00" },
  { id: "skills", index: "01" },
  { id: "projects", index: "02" },
  { id: "sidequests", index: "03" },
  { id: "experience", index: "04" },
  { id: "contact", index: "05" },
] as const;
// Desktop bar: the brand is "home" and CONTACT is the call to action.
const barLinks = links.filter((l) => l.id !== "home" && l.id !== "contact");

const socials = [
  { id: "github", label: "GitHub", href: profile.socials.github, icon: <Github size={18} /> },
  { id: "linkedin", label: "LinkedIn", href: profile.socials.linkedin, icon: <Linkedin size={18} /> },
  { id: "x", label: "X / Twitter", href: profile.socials.x, icon: <XIcon size={16} /> },
] as const;

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/**
 * HUD navigation. Transparent over the hero, then a floating glass bar once
 * the page scrolls. The active section is marked by a highlight that slides
 * between links, and a thin line under the bar tracks reading progress.
 * The EN | ES selector stays in the bar at every width it fits. Below lg the
 * links move to a full-screen menu with numbered sectors, CV and socials
 * (Spanish labels are longer, so the full link row needs the lg width).
 */
export default function Nav({ active }: { active: string }) {
  const { t } = useI18n();
  const cv = useCv();
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled();
  const reduced = useReducedMotion();
  const toggleRef = useRef<HTMLButtonElement>(null);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.4 });

  useLockScroll(open);

  // Esc closes the menu; so does growing past the breakpoint that hides it.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const mq = window.matchMedia("(min-width: 1024px)");
    const onWide = () => mq.matches && setOpen(false);
    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", onWide);
    return () => {
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onWide);
    };
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    scrollTo(id);
  };

  const glass = scrolled || open;

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-5">
      <nav
        aria-label={t.nav.label}
        className={`relative mx-auto flex max-w-7xl items-center justify-between gap-2 border px-4 py-2.5 min-[400px]:gap-3 transition-[background-color,border-color,box-shadow] duration-300 ${
          glass
            ? "border-white/10 bg-void-800/80 shadow-[0_10px_40px_rgba(0,0,0,0.5)] backdrop-blur-md"
            : "border-transparent"
        }`}
      >
        {/* Brand — doubles as "back to top" */}
        <button
          onClick={() => go("home")}
          className="group flex items-center gap-2 font-display text-base font-black tracking-widest text-ink sm:text-lg"
          aria-label={t.nav.backToTop}
        >
          <span className="text-cyan text-glow-cyan transition-transform duration-300 group-hover:translate-x-0.5">
            ▰
          </span>
          {profile.os}
          {/* Narrow phones: the version tag gives its room to the language selector */}
          <span className="font-mono text-[10px] text-magenta min-[360px]:max-[399px]:hidden">
            {profile.version}
          </span>
        </button>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {barLinks.map((l) => {
            const isActive = active === l.id;
            return (
              <li key={l.id}>
                <button
                  onClick={() => go(l.id)}
                  aria-current={isActive ? "true" : undefined}
                  title={t.nav.codes[l.id]}
                  className={`relative whitespace-nowrap px-3 py-2 font-mono text-[13px] font-medium tracking-[0.08em] transition-colors xl:px-3.5 ${
                    isActive ? "text-cyan" : "text-ink-muted hover:text-ink"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 border border-cyan/30 bg-cyan/[0.08]"
                      transition={
                        reduced ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 34 }
                      }
                    >
                      <span className="absolute inset-x-2 -bottom-px h-px bg-cyan shadow-neon-cyan" />
                    </motion.span>
                  )}
                  <span className="relative">{t.nav.links[l.id]}</span>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-1.5 sm:gap-3">
          {/* Language: in the bar wherever it fits; the narrowest phones get
              it at the top of the menu instead. */}
          <LanguageSwitch className="hidden min-[360px]:flex" />

          {/* Call to action */}
          <button
            onClick={() => go("contact")}
            aria-current={active === "contact" ? "true" : undefined}
            className={`hud-corners relative hidden items-center gap-1.5 whitespace-nowrap border px-3.5 py-2 font-mono text-[12px] font-bold tracking-[0.12em] transition-colors md:inline-flex lg:text-[13px] ${
              active === "contact"
                ? "border-cyan bg-cyan text-void"
                : "border-cyan/60 text-cyan hover:bg-cyan hover:text-void"
            }`}
          >
            {t.nav.links.contact} <ArrowUpRight size={14} />
          </button>

          {/* Menu toggle */}
          <button
            ref={toggleRef}
            className="-mr-2 grid h-10 w-10 place-items-center text-ink lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>

        {/* Reading progress */}
        <motion.span
          aria-hidden="true"
          style={{ scaleX: progress }}
          className={`absolute inset-x-0 -bottom-px h-px origin-left bg-gradient-to-r from-cyan via-cyan to-magenta transition-opacity duration-300 ${
            scrolled ? "opacity-100" : "opacity-0"
          }`}
        />
      </nav>

      {/* Menu — full screen under the bar */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.2 }}
            className="fixed inset-0 -z-10 flex flex-col overflow-y-auto bg-void/95 px-5 pb-8 pt-24 backdrop-blur-lg lg:hidden"
          >
            <div className="mb-4 flex items-center justify-between gap-3">
              <p className="font-mono text-[11px] tracking-[0.4em] text-ink-faint">{t.nav.menuTitle}</p>
              <LanguageSwitch className="flex min-[360px]:hidden" />
            </div>
            <ul className="flex flex-col">
              {links.map((l, i) => {
                const isActive = active === l.id;
                return (
                  <motion.li
                    key={l.id}
                    initial={reduced ? false : { opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25, delay: reduced ? 0 : 0.04 * i }}
                    className="border-b border-white/[0.07]"
                  >
                    <button
                      onClick={() => go(l.id)}
                      aria-current={isActive ? "true" : undefined}
                      className={`flex w-full items-baseline gap-4 py-3.5 text-left transition-colors ${
                        isActive ? "text-cyan" : "text-ink hover:text-cyan"
                      }`}
                    >
                      <span className={`font-mono text-xs ${isActive ? "text-cyan" : "text-ink-faint"}`}>
                        {l.index}
                      </span>
                      <span className="font-display text-xl font-bold tracking-widest">{t.nav.links[l.id]}</span>
                      {isActive && (
                        <span className="ml-auto font-mono text-[10px] tracking-[0.2em] text-cyan">
                          {t.nav.here}
                        </span>
                      )}
                    </button>
                  </motion.li>
                );
              })}
            </ul>

            <div className="mt-auto flex flex-col items-start gap-4 pt-8">
              <a
                href={cv.href}
                download={cv.fileName}
                hrefLang={cv.language}
                title={cv.description}
                aria-label={cv.description}
                className="hud-corners relative inline-flex items-center gap-2 border border-cyan/60 px-4 py-2.5 font-mono text-xs font-bold tracking-[0.15em] text-cyan"
              >
                {cv.label} <Download size={14} />
              </a>
              <div className="flex items-center gap-2">
                {socials.map((s) => (
                  <a
                    key={s.id}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className={`grid h-11 w-11 place-items-center border transition duration-200 ${socialBrand[s.id]}`}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
