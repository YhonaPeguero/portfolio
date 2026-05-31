import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoloFigure from "./HoloFigure";
import Particles from "./Particles";
import { usePrefersReducedMotion } from "../../lib/hooks";

gsap.registerPlugin(ScrollTrigger);

/**
 * Hero right-panel — the holographic operator (Yhonatan's composite artwork:
 * figure + AI-agent nodes + topology baked in). Always rendered so it never
 * disappears after the intro hands off.
 *
 * React + GSAP: drag to rotate (Y, inertia), scroll parallax, idle float;
 * mix-blend + flicker + scanlines + glow + particles for the holographic feel.
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
    </div>
  );
}
