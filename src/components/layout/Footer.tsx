import { ArrowUp, Github, Linkedin } from "lucide-react";
import XIcon from "../ui/XIcon";
import { profile } from "../../data/profile";
import { useI18n } from "../../i18n/I18nProvider";

const socials = [
  { label: "GitHub", href: profile.socials.github, icon: <Github size={16} /> },
  { label: "LinkedIn", href: profile.socials.linkedin, icon: <Linkedin size={16} /> },
  { label: "X / Twitter", href: profile.socials.x, icon: <XIcon size={14} /> },
];

export default function Footer() {
  const { t } = useI18n();
  return (
    <footer className="relative z-10 border-t border-white/10 bg-void-800/60 py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-5 md:flex-row">
        <div className="flex items-center gap-2 font-display text-sm font-black tracking-widest text-ink">
          <span className="text-cyan">▰</span> {profile.os}
          <span className="font-mono text-[11px] text-magenta">{profile.version}</span>
        </div>
        <p className="font-mono text-[11px] tracking-wider text-ink-faint">
          © {new Date().getFullYear()} {profile.name} · {t.footer.rights}
        </p>
        <div className="flex items-center gap-2">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="grid h-10 w-10 place-items-center border border-white/10 text-ink-muted transition-colors hover:border-cyan/50 hover:text-cyan"
            >
              {s.icon}
            </a>
          ))}
          <button
            type="button"
            onClick={() => document.getElementById("home")?.scrollIntoView({ behavior: "smooth" })}
            aria-label={t.footer.backToTop}
            className="ml-2 inline-flex h-10 items-center gap-1.5 border border-cyan/40 px-3 font-mono text-[11px] font-bold tracking-[0.15em] text-cyan transition-colors hover:bg-cyan hover:text-void"
          >
            {t.footer.top} <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
