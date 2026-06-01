import { useMemo } from "react";

/**
 * Subtle, lightweight floating particle field (pure CSS animation, a handful of
 * dots). Used behind the holographic figure in both the intro and hero states.
 * Respects reduced-motion via the global media query in index.css.
 */
export default function Particles({
  count = 14,
  className = "",
}: {
  count?: number;
  className?: string;
}) {
  const dots = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 1 + Math.random() * 2,
        delay: Math.random() * 6,
        duration: 5 + Math.random() * 5,
      })),
    [count]
  );

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {dots.map((d, i) => (
        <span
          key={i}
          className="fx-particle absolute rounded-full bg-cyan"
          style={{
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: `${d.size}px`,
            height: `${d.size}px`,
            boxShadow: "0 0 6px rgba(0,245,255,0.8)",
            animationDelay: `${d.delay}s`,
            animationDuration: `${d.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
