import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "../../lib/hooks";

gsap.registerPlugin(ScrollTrigger);

/**
 * Hero right-panel — holographic dev figure.
 *
 * Uses Yhonatan's own composite artwork (figure + floating AI-agent nodes are
 * baked into the PNG). The image's black background is dropped via
 * `mix-blend-mode: screen` so only the blue hologram blends onto the hero.
 *
 * React + GSAP 3 drive the DOM imperatively (CSS custom properties for theming):
 *  - INTERACTION: click/drag rotates the figure on its Y axis; on release it
 *    auto-returns to 0° with a momentum/inertia ease.
 *  - SCROLL (ScrollTrigger, scrubbed over the hero): 0–30% scale-up + parallax,
 *    30–60% glow intensifies, 60–100% figure dissolves into particles toward text.
 *  - DEPTH: parallax layers — glow (0.2) / figure (0.6).
 *  - AMBIENT: idle float (±12px, 4s).
 *
 * ▶ Drop your artwork at /public/hero/figure.png. Until then the panel stays
 *   empty (no placeholder) rather than showing stand-in art.
 */
const ASSETS = {
  figure: "/hero/figure.png",
};

export default function HeroFigure() {
  const reduced = usePrefersReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(true);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const hero = document.getElementById("home");
    const q = gsap.utils.selector(root);
    const rot = q(".hf-rot")[0] as HTMLElement;

    const ctx = gsap.context(() => {
      // ---- Entry: fade + slide in from the right ----
      gsap.from(root, { opacity: 0, x: 80, duration: 1, ease: "power2.out", delay: 0.2 });

      if (reduced) return;

      // ---- Ambient idle float (±12px, ~4s loop) ----
      gsap.to(q(".hf-float"), {
        y: -12,
        duration: 2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      // ---- Scroll timeline (scrubbed over the hero) ----
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: hero ?? root, start: "top top", end: "bottom top", scrub: 0.6 },
      });

      // Parallax depth layers (0.2 / 0.6).
      tl.to(q(".hf-glow"), { yPercent: -10, duration: 1 }, 0)
        .to(q(".hf-parallax"), { yPercent: -28, duration: 1 }, 0);

      // 0–30%: figure scales up.
      tl.to(q(".hf-scale"), { scale: 1.15, duration: 0.3 }, 0);

      // 30–60%: glow intensifies.
      tl.to(q(".hf-glow"), { scale: 1.3, opacity: 0.9, duration: 0.3 }, 0.3);

      // 60–100%: figure dissolves toward the text; particles drift left.
      tl.to(q(".hf-figure"), { opacity: 0, filter: "blur(10px)", x: -50, duration: 0.4 }, 0.6).to(
        q(".hf-particle"),
        {
          opacity: 1,
          x: (_i, el: Element) => Number((el as HTMLElement).dataset.px),
          y: (_i, el: Element) => Number((el as HTMLElement).dataset.py),
          duration: 0.4,
          stagger: 0.015,
        },
        0.6
      );
    }, root);

    // ---- Drag to rotate on Y axis, with inertia return ----
    let dragging = false;
    let startX = 0;
    let rotation = 0;
    let lastX = 0;
    let velocity = 0;
    const clamp = (v: number) => Math.max(-70, Math.min(70, v));

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
      rotation = clamp(rotation + (e.clientX - startX) * 0.18);
      startX = e.clientX;
      gsap.set(rot, { rotateY: rotation });
    };
    const onUp = () => {
      if (!dragging) return;
      dragging = false;
      const target = clamp(rotation + velocity * 1.5);
      gsap
        .timeline()
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
  }, [reduced, loaded]);

  // Particle drift targets (toward the text on the left).
  const particles = Array.from({ length: 16 }, () => ({
    px: -(60 + Math.random() * 140),
    py: (Math.random() - 0.5) * 160,
    left: 30 + Math.random() * 40,
    top: 25 + Math.random() * 50,
  }));

  return (
    <div
      ref={rootRef}
      className="pointer-events-auto relative mx-auto aspect-square w-full max-w-[500px] select-none"
      style={{ perspective: "1100px" }}
      aria-hidden="true"
    >
      {/* Background glow (parallax 0.2) */}
      <div className="hf-glow pointer-events-none absolute inset-0 -z-10 rounded-full bg-[radial-gradient(circle_at_center,rgba(0,166,255,0.22),transparent_62%)] blur-2xl" />

      {/* Figure (parallax 0.6) */}
      <div className="hf-parallax absolute inset-0">
        <div className="hf-scale absolute inset-0 origin-center">
          <div className="hf-float absolute inset-0 grid place-items-center">
            <div
              className="hf-rot relative h-full w-full cursor-grab active:cursor-grabbing"
              style={{ transformStyle: "preserve-3d", touchAction: "pan-y" }}
            >
              {loaded && (
                <>
                  <img
                    src={ASSETS.figure}
                    alt="Yhonatan as a holographic developer surrounded by AI agents"
                    draggable={false}
                    onError={() => setLoaded(false)}
                    className="hf-figure holo-flicker mx-auto h-full w-full object-contain mix-blend-screen drop-shadow-[0_0_30px_rgba(0,245,255,0.35)]"
                  />
                  {/* scanline overlay clipped to the figure box */}
                  <div className="hf-scanlines pointer-events-none absolute inset-0" />
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* dissolve particles */}
      {particles.map((p, i) => (
        <span
          key={i}
          className="hf-particle pointer-events-none absolute h-1 w-1 rounded-full bg-cyan opacity-0"
          data-px={p.px}
          data-py={p.py}
          style={{ left: `${p.left}%`, top: `${p.top}%` }}
        />
      ))}
    </div>
  );
}
