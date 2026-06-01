import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface GameButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost";
  download?: string;
  external?: boolean;
  className?: string;
}

/**
 * Game-UI style button with a neon glow pulse and corner brackets.
 * Renders as <a> when href is provided, otherwise <button>.
 */
export default function GameButton({
  children,
  href,
  onClick,
  variant = "primary",
  download,
  external,
  className = "",
}: GameButtonProps) {
  const base =
    "hud-corners group relative inline-flex items-center justify-center gap-2 px-7 py-3 font-mono text-sm font-bold uppercase tracking-[0.15em] transition-colors duration-200 focus-visible:outline-cyan";
  const styles =
    variant === "primary"
      ? "border border-cyan/60 text-cyan hover:bg-cyan hover:text-void"
      : "border border-white/15 text-ink hover:border-amber hover:text-amber";

  const inner = (
    <motion.span
      className="flex items-center gap-2"
      whileHover={{ x: 2 }}
      transition={{ type: "spring", stiffness: 400, damping: 18 }}
    >
      {children}
    </motion.span>
  );

  const glow =
    variant === "primary"
      ? "shadow-[0_0_0_rgba(0,245,255,0)] group-hover:shadow-neon-cyan"
      : "group-hover:shadow-neon-amber";

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        download={download}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={`${base} ${styles} ${glow} ${className}`}
      >
        {inner}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={`${base} ${styles} ${glow} ${className}`}>
      {inner}
    </button>
  );
}
