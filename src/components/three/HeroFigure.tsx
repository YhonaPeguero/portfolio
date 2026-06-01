import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoloFigure from "./HoloFigure";
import Particles from "./Particles";
import { usePrefersReducedMotion } from "../../lib/hooks";

gsap.registerPlugin(ScrollTrigger);

/**
 * A few "AI agent" HUD nodes that orbit the operator. Kept brief and subtle so
 * they read as ambient context, not clutter. `left/top` = card position (% of
 * the box); `ax/ay` = the point its connector line links to.
 */
const NODES = [
  { label: "CODE REVIEWER", dept: "DEVOPS", left: 0, top: 5, ax: 16, ay: 15 },
  { label: "REFACTORER", dept: "AI ENGINE", left: 64, top: 0, ax: 78, ay: 10 },
  { label: "TESTER", dept: "DIAGNOSTIC", left: 76, top: 35, ax: 86, ay: 41 },
  { label: "SECURITY", dept: "QA AGENT", left: 62, top: 80, ax: 76, ay: 82 },
  { label: "API DESIGNER", dept: "BACKEND", left: -1, top: 64, ax: 14, ay: 68 },
];

/**
 * Hero right-panel — the holographic operator (transparent avatar) with a few
 * floating AI-agent nodes. Always rendered so it never disappears after the
 * intro hands off.
 *
 * React + GSAP: drag to rotate (Y, inertia), scroll parallax, idle float;
 * drop-shadow glow + breathing + glow pool + particles for the holographic feel.
 */
export default function HeroFigure({ ready = false }: { ready?: boolean }) {
  const reduced = usePrefersReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);

  // The figure stays hidden during the intro move, then fades in as the intro
  // character lands (≈1.5s) — so there's no "already there" figure; it settles
  // into place. `ready` (intro finished / skipped) reveals it immediately too.
  const [show, setShow] = useState(reduced);
  useEffect(() => {
    if (reduced || ready) {
      setShow(true);
      return;
    }
    // Reveal as the intro character finishes its glide (~move end), so it
    // looks like the character solidifies into place rather than two elements.
    const t = window.setTimeout(() => setShow(true), 1950);
    return () => window.clearTimeout(t);
  }, [reduced, ready]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const hero = document.getElementById("home");
    const q = gsap.utils.selector(root);
    const rot = q(".hf-rot")[0] as HTMLElement;

    const ctx = gsap.context(() => {
      if (reduced) return;

      gsap.to(q(".hf-float"), { y: -12, duration: 2.4, ease: "sine.inOut", yoyo: true, repeat: -1 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: hero ?? root, start: "top top", end: "bottom top", scrub: 0.6 },
      });
      tl.to(q(".hf-glow"), { yPercent: -10, duration: 1 }, 0)
        .to(q(".hf-parallax"), { yPercent: -24, duration: 1 }, 0)
        .to(q(".hf-scale"), { scale: 1.1, duration: 0.3 }, 0)
        .to(q(".hf-glow"), { scale: 1.25, opacity: 0.9, duration: 0.3 }, 0.3);
    }, root);

    // Drag to rotate (Y axis) with inertia return.
    let dragging = false;
    let startX = 0;
    let rotation = 0;
    let lastX = 0;
    let velocity = 0;
    const clamp = (v: number) => Math.max(-55, Math.min(55, v));

    const onDown = (e: PointerEvent) => {
      if (reduced) return;
      dragging = true;
      startX = e.clientX;
      lastX = e.clientX;
      velocity = 0;
      gsap.killTweensOf(rot);
      rot.setPointerCapture?.(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      velocity = e.clientX - lastX;
      lastX = e.clientX;
      rotation = clamp(rotation + (e.clientX - startX) * 0.16);
      startX = e.clientX;
      gsap.set(rot, { rotateY: rotation });
    };
    const onUp = () => {
      if (!dragging) return;
      dragging = false;
      const target = clamp(rotation + velocity * 1.4);
      gsap.timeline()
        .to(rot, { rotateY: target, duration: 0.35, ease: "power2.out" })
        .to(rot, { rotateY: 0, duration: 1.1, ease: "elastic.out(0.7, 0.5)" });
      rotation = 0;
    };

    if (rot && !reduced) {
      rot.addEventListener("pointerdown", onDown);
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
    }

    return () => {
      ctx.revert();
      if (rot) rot.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [reduced]);

  return (
    <div
      ref={rootRef}
      className="pointer-events-auto relative mx-auto aspect-square w-full max-w-[540px] select-none"
      style={{
        perspective: "1100px",
        opacity: show ? 1 : 0,
        transition: "opacity 0.7s ease",
      }}
      aria-hidden="true"
    >
      {/* soft background glow pool */}
      <div className="hf-glow pointer-events-none absolute inset-[-8%] -z-10 rounded-full bg-[radial-gradient(circle_at_50%_44%,rgba(30,140,255,0.16),transparent_62%)] blur-3xl" />
      {/* floor light grounding the seated figure */}
      <div className="pointer-events-none absolute bottom-[10%] left-1/2 -z-10 h-10 w-[58%] -translate-x-1/2 rounded-[50%] bg-cyan/20 blur-2xl" />
      {/* subtle ambient particles */}
      <Particles count={10} className="-z-10" />

      {/* holographic figure */}
      <div className="hf-parallax absolute inset-0">
        <div className="hf-scale absolute inset-0 origin-center">
          <div className="hf-float absolute inset-0 grid place-items-center">
            <div
              className="hf-rot relative h-full w-full cursor-grab active:cursor-grabbing"
              style={{ transformStyle: "preserve-3d", touchAction: "pan-y" }}
            >
              <HoloFigure />
            </div>
          </div>
        </div>
      </div>

      {/* AI-agent nodes + connectors */}
      <div className="hf-nodes pointer-events-none absolute inset-0">
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <g stroke="#00f5ff" strokeWidth="0.12" strokeOpacity="0.25" fill="none">
            {NODES.map((n) => (
              <line key={n.label} x1="50" y1="48" x2={n.ax} y2={n.ay} />
            ))}
          </g>
          <g fill="#00f5ff" fillOpacity="0.5">
            {NODES.map((n) => (
              <circle key={n.label} cx={n.ax} cy={n.ay} r="0.55" />
            ))}
          </g>
        </svg>

        {NODES.map((n, i) => (
          <div
            key={n.label}
            className="absolute w-[104px]"
            style={{ left: `${n.left}%`, top: `${n.top}%` }}
          >
            <div className="hud-corners border border-cyan/25 bg-void-800/70 px-2 py-1 backdrop-blur-sm">
              <div className="flex items-center justify-between font-mono text-[6.5px] leading-none tracking-[0.15em] text-cyan/70">
                <span>AI&nbsp;AGENT</span>
                <span className="text-ink-faint">{n.dept}</span>
              </div>
              <p className="mt-1 font-display text-[10px] font-bold leading-none tracking-wide text-ink/90">
                {n.label}
              </p>
              <div className="mt-1 flex items-center gap-1 font-mono text-[6.5px] tracking-[0.15em] text-ink-faint">
                <span
                  className="hf-node-pulse inline-block h-1 w-1 rounded-full bg-cyan"
                  style={{ animationDelay: `${(i * 0.5).toFixed(1)}s` }}
                />
                STATUS: ACTIVE
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
