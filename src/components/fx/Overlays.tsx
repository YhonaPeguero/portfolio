import { usePrefersReducedMotion } from "../../lib/hooks";

/**
 * Full-screen decorative CRT layers: scanlines, animated grain,
 * a sweeping scan beam and a vignette. All pointer-events:none and
 * automatically toned down under prefers-reduced-motion (see index.css).
 */
export default function Overlays() {
  const reduced = usePrefersReducedMotion();
  return (
    <>
      <div className="fx-scanlines" aria-hidden="true" />
      {!reduced && (
        <div
          className="fx-scanbeam animate-scanline"
          aria-hidden="true"
          style={{ top: 0 }}
        />
      )}
      <div className="fx-noise" aria-hidden="true" />
      <div className="fx-vignette" aria-hidden="true" />
    </>
  );
}
