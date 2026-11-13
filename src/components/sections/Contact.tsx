import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Send } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import XIcon from "../ui/XIcon";
import { profile } from "../../data/profile";
import { useI18n } from "../../i18n/I18nProvider";

const socials = [
  { id: "github", label: "GitHub", href: profile.socials.github, icon: <Github size={20} /> },
  { id: "linkedin", label: "LinkedIn", href: profile.socials.linkedin, icon: <Linkedin size={20} /> },
  { id: "x", label: "X / Twitter", href: profile.socials.x, icon: <XIcon size={18} /> },
] as const;

export default function Contact() {
  const { t } = useI18n();
  const [name, setName] = useState("");
  const [from, setFrom] = useState("");
  const [message, setMessage] = useState("");

  function submit(e: FormEvent) {
    e.preventDefault();
    // No backend required (Vercel-friendly): compose a mailto.
    const subject = encodeURIComponent(t.contact.mailSubject(name));
    const body = encodeURIComponent(t.contact.mailBody(message, name, from));
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  }

  return (
    <section id="contact" className="relative mx-auto max-w-4xl px-5 py-24 md:py-32">
      <SectionHeading
        index="05"
        title={t.contact.title}
        kanji="接続"
        accent="magenta"
        subtitle={t.contact.subtitle}
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
            <span className="text-cyan">{t.contact.name}</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 w-full border border-white/10 bg-black/40 px-3 py-2 text-ink outline-none focus:border-cyan"
              placeholder={t.contact.namePlaceholder}
              autoComplete="name"
            />
          </label>

          <label className="block">
            <span className="text-cyan">{t.contact.replyTo}</span>
            <input
              type="email"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              required
              className="mt-1 w-full border border-white/10 bg-black/40 px-3 py-2 text-ink outline-none focus:border-cyan"
              placeholder={t.contact.emailPlaceholder}
              autoComplete="email"
            />
          </label>

          <label className="block">
            <span className="text-cyan">{t.contact.message}</span>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={4}
              className="mt-1 w-full resize-none border border-white/10 bg-black/40 px-3 py-2 text-ink outline-none focus:border-cyan"
              placeholder={t.contact.messagePlaceholder}
            />
          </label>

          <button
            type="submit"
            className="hud-corners group relative inline-flex items-center gap-2 border border-magenta/60 px-6 py-2.5 font-bold uppercase tracking-[0.15em] text-magenta transition-colors hover:bg-magenta hover:text-void hover:shadow-neon-magenta"
          >
            {t.contact.send}
            <Send size={15} className="transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </motion.form>

      {/* Social HUD icons */}
      <div className="mt-8 flex items-center justify-center gap-4">
        <a
          href={`mailto:${profile.email}`}
          className="grid h-12 w-12 place-items-center border border-white/10 text-ink-muted transition-all hover:border-cyan hover:text-cyan hover:shadow-neon-cyan"
          aria-label={t.contact.email}
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
