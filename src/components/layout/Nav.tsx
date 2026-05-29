import { useState } from "react";
import { Menu, X } from "lucide-react";
import { profile } from "../../data/profile";

const links = [
  { id: "home", label: "BOOT" },
  { id: "skills", label: "ARSENAL" },
  { id: "projects", label: "MISSIONS" },
  { id: "experience", label: "STATS" },
  { id: "sidequests", label: "QUESTS" },
  { id: "contact", label: "CONNECT" },
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Nav({ active }: { active: string }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        {/* Brand */}
        <button
          onClick={() => scrollTo("home")}
          className="group flex items-center gap-2 font-display text-lg font-black tracking-widest text-ink"
          aria-label="Back to top"
        >
          <span className="text-cyan text-glow-cyan">▰</span>
          {profile.os}
          <span className="font-mono text-[10px] text-magenta">{profile.version}</span>
        </button>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 rounded-sm border border-white/10 bg-void-800/70 px-2 py-1.5 backdrop-blur-md md:flex">
          {links.map((l) => {
            const isActive = active === l.id;
            return (
              <li key={l.id}>
                <button
                  onClick={() => scrollTo(l.id)}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative px-3 py-1.5 font-mono text-xs tracking-widest transition-colors ${
                    isActive ? "text-cyan" : "text-ink-muted hover:text-ink"
                  }`}
                >
                  {isActive && (
                    <span className="absolute inset-x-1 -bottom-0.5 h-px bg-cyan shadow-neon-cyan" />
                  )}
                  {l.label}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Mobile toggle */}
        <button
          className="text-ink md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <ul className="mx-5 flex flex-col gap-1 border border-white/10 bg-void-800/95 p-3 backdrop-blur-md md:hidden">
          {links.map((l) => (
            <li key={l.id}>
              <button
                onClick={() => {
                  scrollTo(l.id);
                  setOpen(false);
                }}
                className={`w-full px-3 py-2 text-left font-mono text-sm tracking-widest ${
                  active === l.id ? "text-cyan" : "text-ink-muted"
                }`}
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
