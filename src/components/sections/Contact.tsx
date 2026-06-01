import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Send } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import { profile } from "../../data/profile";

/** X / Twitter glyph (lucide ships the legacy bird, so we inline the X). */
function XIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const socials = [
  { id: "github", label: "GitHub", href: profile.socials.github, icon: <Github size={20} /> },
  { id: "linkedin", label: "LinkedIn", href: profile.socials.linkedin, icon: <Linkedin size={20} /> },
  { id: "x", label: "X / Twitter", href: profile.socials.x, icon: <XIcon size={18} /> },
] as const;

export default function Contact() {
  const [name, setName] = useState("");
  const [from, setFrom] = useState("");
  const [message, setMessage] = useState("");

  function submit(e: FormEvent) {
    e.preventDefault();
    // No backend required (Vercel-friendly): compose a mailto.
    const subject = encodeURIComponent(`[PORTFOLIO] New transmission from ${name || "anon"}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}\nReply to: ${from}`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  }

  return (
    <section id="contact" className="relative mx-auto max-w-4xl px-5 py-24 md:py-32">
      <SectionHeading
        index="05"
        title="INITIATE CONNECTION"
        kanji="接続"
        accent="magenta"
        subtitle="Open to senior frontend & Web3 roles, collabs and good problems. Drop a transmission."
      />

      <motion.form
        onSubmit={submit}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="hud-panel hud-corners p-5 font-mono text-sm md:p-7"
      >
        {/* Terminal title bar */}
        <div className="mb-5 flex items-center gap-2 border-b border-white/10 pb-3 text-ink-faint">
          <span className="h-2.5 w-2.5 rounded-full bg-magenta" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber" />
          <span className="h-2.5 w-2.5 rounded-full bg-cyan" />
          <span className="ml-2 text-xs tracking-widest">guest@{profile.os.toLowerCase()}:~$ ./contact</span>
        </div>

        <div className="space-y-4">
          <label className="block">
            <span className="text-cyan">{"> NAME:"}</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 w-full border border-white/10 bg-black/40 px-3 py-2 text-ink outline-none focus:border-cyan"
              placeholder="your_name"
              autoComplete="name"
            />
          </label>

          <label className="block">
            <span className="text-cyan">{"> REPLY_ADDR:"}</span>
            <input
              type="email"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              required
              className="mt-1 w-full border border-white/10 bg-black/40 px-3 py-2 text-ink outline-none focus:border-cyan"
              placeholder="you@domain.com"
              autoComplete="email"
            />
          </label>

          <label className="block">
            <span className="text-cyan">{"> MESSAGE:"}</span>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={4}
              className="mt-1 w-full resize-none border border-white/10 bg-black/40 px-3 py-2 text-ink outline-none focus:border-cyan"
              placeholder="type your transmission..."
            />
          </label>

          <button
            type="submit"
            className="hud-corners group inline-flex items-center gap-2 border border-magenta/60 px-6 py-2.5 font-bold uppercase tracking-[0.15em] text-magenta transition-colors hover:bg-magenta hover:text-void hover:shadow-neon-magenta"
          >
            TRANSMIT
            <Send size={15} className="transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </motion.form>

      {/* Social HUD icons */}
      <div className="mt-8 flex items-center justify-center gap-4">
        <a
          href={`mailto:${profile.email}`}
          className="grid h-12 w-12 place-items-center border border-white/10 text-ink-muted transition-all hover:border-cyan hover:text-cyan hover:shadow-neon-cyan"
          aria-label="Email"
        >
          <Mail size={20} />
        </a>
        {socials.map((s) => (
          <a
            key={s.id}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="grid h-12 w-12 place-items-center border border-white/10 text-ink-muted transition-all hover:border-cyan hover:text-cyan hover:shadow-neon-cyan"
            aria-label={s.label}
          >
            {s.icon}
          </a>
        ))}
      </div>
    </section>
  );
}
