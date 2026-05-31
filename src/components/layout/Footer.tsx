import { profile } from "../../data/profile";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-void-800/60 py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 md:flex-row">
        <div className="flex items-center gap-2 font-display text-sm font-black tracking-widest text-ink">
          <span className="text-cyan">▰</span> {profile.os}
          <span className="font-mono text-[11px] text-magenta">{profile.version}</span>
        </div>
        <p className="font-mono text-[11px] tracking-wider text-ink-faint">
          © {new Date().getFullYear()} {profile.name} · All rights reserved
        </p>
        <p className="font-mono text-[11px] tracking-wider text-ink-faint">
          <span className="text-cyan">●</span> SYSTEM ONLINE
        </p>
      </div>
    </footer>
  );
}
