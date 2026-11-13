import { useEffect } from "react";
import { ArrowDownRight, Download, Mail } from "lucide-react";
import type { InfoTopic, TopicAction } from "../../data/companionInfo";
import { profile } from "../../data/profile";
import { useCv, useI18n } from "../../i18n/I18nProvider";
import { useTypewriter } from "../../lib/hooks";

const ACTION_CLASS =
  "inline-flex items-center gap-1.5 border border-cyan/50 px-2.5 py-1.5 font-mono text-[11px] font-bold tracking-[0.12em] text-cyan transition-colors hover:bg-cyan hover:text-void";

/** Follow-up buttons under a finished answer, so it is never a dead end. */
function Actions({ actions, onSection }: { actions: TopicAction[]; onSection: (id: string) => void }) {
  const { t } = useI18n();
  const cv = useCv();
  return (
    <div className="mt-2.5 flex flex-wrap gap-1.5">
      {actions.map((action) => {
        if (action.kind === "section") {
          return (
            <button key={action.target} type="button" onClick={() => onSection(action.target)} className={ACTION_CLASS}>
              <ArrowDownRight size={12} aria-hidden="true" />
              {t.companion.actions[action.target]}
            </button>
          );
        }
        if (action.kind === "cv") {
          return (
            <a
              key="cv"
              href={cv.href}
              download={cv.fileName}
              hrefLang={cv.language}
              title={cv.description}
              aria-label={cv.description}
              target="_blank"
              rel="noopener noreferrer"
              className={ACTION_CLASS}
            >
              <Download size={12} aria-hidden="true" />
              {cv.label}
            </a>
          );
        }
        return (
          <a key="email" href={`mailto:${profile.email}`} className={ACTION_CLASS}>
            <Mail size={12} aria-hidden="true" />
            {t.companion.actions.email}
          </a>
        );
      })}
    </div>
  );
}

/** The newest answer, revealed character by character. */
function TypingText({ text, onDone }: { text: string; onDone: () => void }) {
  const typed = useTypewriter(text, 8);
  useEffect(() => {
    if (typed.done) onDone();
  }, [typed.done, onDone]);
  return (
    <>
      {typed.text}
      <span className="ml-0.5 animate-blink text-cyan">▮</span>
    </>
  );
}

interface EntryProps {
  topic: InfoTopic;
  typing: boolean;
  onFinish: () => void;
  onSection: (id: string) => void;
}

/** One exchange: the visitor's question, then PIXL's answer. */
export function Exchange({ topic, typing, onFinish, onSection }: EntryProps) {
  const { t } = useI18n();
  return (
    <li className="space-y-2.5" data-topic={topic.id}>
      <div className="flex justify-end">
        <p className="max-w-[85%] border border-magenta/40 bg-magenta/[0.06] px-2.5 py-1.5 font-mono text-[11px] leading-snug text-magenta">
          <span className="sr-only">{t.companion.youAsked} </span>
          <span aria-hidden="true">{"> "}</span>
          {topic.question}
        </p>
      </div>
      <div className="border-l-2 border-cyan/40 pl-3">
        {/* Screen readers get the full answer once; the typed copy is visual only. */}
        <p
          className={`font-ui text-sm leading-relaxed text-ink ${typing ? "cursor-pointer" : ""}`}
          onClick={typing ? onFinish : undefined}
          data-answer
          data-typing={typing || undefined}
        >
          <span className="sr-only">
            {t.companion.pixlSays} {topic.answer}
          </span>
          <span aria-hidden="true">{typing ? <TypingText text={topic.answer} onDone={onFinish} /> : topic.answer}</span>
        </p>
        {!typing && topic.actions && <Actions actions={topic.actions} onSection={onSection} />}
      </div>
    </li>
  );
}
