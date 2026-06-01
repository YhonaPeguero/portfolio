// Background-keyed (transparent) version of avatar-pj2.png — see
// scripts/cut-avatar.cjs (the original export was flattened onto a light bg).
import avatar from "../../assets/avatar-pj2-cut.png";

/**
 * The central holographic operator — a transparent PNG cutout of Yhonatan as a
 * hooded developer. Rendered cleanly (alpha channel, no blend hacks) with a
 * soft blue drop-shadow that follows the figure's silhouette so the hologram
 * blends into the dark UI instead of looking pasted. Shared by the intro and
 * the hero so the character is identical in both states.
 *
 * To swap the artwork: replace src/assets/avatar-pj2.png (transparent PNG/WebP).
 */
const GLOW =
  "drop-shadow(0 0 20px rgba(40,150,255,0.5)) drop-shadow(0 0 52px rgba(20,110,255,0.28))";

export default function HoloFigure({ className = "" }: { className?: string }) {
  return (
    <img
      src={avatar}
      alt="Yhonatan as a holographic hooded developer"
      draggable={false}
      style={{ filter: GLOW }}
      className={`holo-soft h-full w-full object-contain ${className}`}
    />
  );
}
