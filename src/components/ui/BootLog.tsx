import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "../../lib/hooks";
import { profile } from "../../data/profile";

const LINES = [
  `> INITIALIZING ${profile.os} ${profile.version} ...`,
  "> MOUNTING /modules/frontend ............ OK",
  "> MOUNTING /modules/web3 ................ OK",
  "> LINKING neural.ui // motion.engine .... OK",
  "> BOOT SEQUENCE COMPLETE ✓",
];

/**
 * Terminal-style boot log that types out line-by-line.
 * Reduced-motion → renders all lines instantly.
 */
export default function BootLog() {
  const reduced = usePrefersReducedMotion();
  const [count, setCount] = useState(reduced ? LINES.length : 0);

  useEffect(() => {
    if (reduced) return;
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setCount(i);
      if (i >= LINES.length) window.clearInterval(id);
    }, 420);
    return () => window.clearInterval(id);
  }, [reduced]);

  return (
    <div className="font-mono text-[11px] leading-relaxed text-cyan/80 sm:text-xs">
      {LINES.slice(0, count).map((line, i) => (
        <div key={i} className={line.includes("COMPLETE") ? "text-amber" : ""}>
          {line}
        </div>
      ))}
      {count < LINES.length && <span className="animate-blink">_</span>}
    </div>
  );
}
