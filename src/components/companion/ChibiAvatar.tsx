/**
 * PIXL — the guide unit. Pure inline SVG (no external image deps).
 * A small anime-chibi / mascot face with neon visor.
 */
export default function ChibiAvatar({ talking = false }: { talking?: boolean }) {
  return (
    <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden="true">
      {/* head */}
      <rect x="12" y="10" width="40" height="36" rx="12" fill="#13131F" stroke="#00F5FF" strokeWidth="2" />
      {/* antenna */}
      <line x1="32" y1="10" x2="32" y2="3" stroke="#FF006E" strokeWidth="2" />
      <circle cx="32" cy="3" r="2.4" fill="#FF006E">
        {talking && (
          <animate attributeName="opacity" values="1;0.3;1" dur="0.8s" repeatCount="indefinite" />
        )}
      </circle>
      {/* visor */}
      <rect x="17" y="20" width="30" height="14" rx="7" fill="#0A0A0F" stroke="#00F5FF" strokeWidth="1.2" />
      {/* eyes */}
      <circle cx="26" cy="27" r="3" fill="#00F5FF">
        <animate attributeName="r" values="3;0.6;3" dur="4s" repeatCount="indefinite" />
      </circle>
      <circle cx="38" cy="27" r="3" fill="#00F5FF">
        <animate attributeName="r" values="3;0.6;3" dur="4s" repeatCount="indefinite" />
      </circle>
      {/* mouth */}
      <rect x="29" y="38" width="6" height={talking ? 3 : 1.5} rx="1" fill="#FFB800">
        {talking && (
          <animate attributeName="height" values="1.5;3.5;1.5" dur="0.35s" repeatCount="indefinite" />
        )}
      </rect>
      {/* cheeks */}
      <circle cx="19" cy="33" r="2" fill="#FF006E" opacity="0.6" />
      <circle cx="45" cy="33" r="2" fill="#FF006E" opacity="0.6" />
    </svg>
  );
}
