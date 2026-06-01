/**
 * CSS-only animated background used when WebGL is unavailable
 * (Phase 4 graceful degradation). A neon perspective grid + glows.
 */
export default function CSSFallback() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-void" aria-hidden="true">
      <div className="absolute -left-1/4 top-0 h-1/2 w-1/2 rounded-full bg-cyan/10 blur-[120px]" />
      <div className="absolute -right-1/4 bottom-0 h-1/2 w-1/2 rounded-full bg-magenta/10 blur-[120px]" />
      <div
        className="absolute inset-x-0 bottom-0 h-2/3 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,245,255,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,0.25) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          transform: "perspective(420px) rotateX(62deg)",
          transformOrigin: "bottom",
          maskImage: "linear-gradient(transparent, #000 60%)",
        }}
      />
    </div>
  );
}
