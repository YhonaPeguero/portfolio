import { useEffect, useRef, useState } from "react";

/** Tracks the user's `prefers-reduced-motion` setting, reactively. */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

/**
 * Returns the id of the section currently dominating the viewport.
 * Drives the HUD nav highlight and the AI companion's dialogue.
 */
export function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState(ids[0] ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el)
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [ids]);

  return active;
}

/**
 * Typewriter effect. Returns the progressively-revealed string and a
 * `done` flag. Respects reduced-motion by rendering the full text at once.
 */
export function useTypewriter(text: string, speed = 28): { text: string; done: boolean } {
  const reduced = usePrefersReducedMotion();
  const [out, setOut] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (reduced) {
      setOut(text);
      setDone(true);
      return;
    }
    setOut("");
    setDone(false);
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setOut(text.slice(0, i));
      if (i >= text.length) {
        window.clearInterval(id);
        setDone(true);
      }
    }, speed);
    return () => window.clearInterval(id);
  }, [text, speed, reduced]);

  return { text: out, done };
}

/**
 * Scramble-in text effect (decodes from random glyphs to the target).
 * Great for the cyberpunk headline. Reduced-motion → instant.
 */
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!<>-_\\/[]{}=+*^?#";

export function useScramble(target: string, active = true): string {
  const reduced = usePrefersReducedMotion();
  const [output, setOutput] = useState(reduced ? target : "");
  const frame = useRef(0);

  useEffect(() => {
    if (reduced || !active) {
      setOutput(target);
      return;
    }
    let raf = 0;
    frame.current = 0;
    const total = target.length * 3;

    const tick = () => {
      const progress = frame.current / 3;
      const next = target
        .split("")
        .map((char, i) => {
          if (i < progress) return char;
          if (char === " ") return " ";
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        })
        .join("");
      setOutput(next);
      frame.current += 1;
      if (frame.current <= total) raf = requestAnimationFrame(tick);
      else setOutput(target);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active, reduced]);

  return output;
}
