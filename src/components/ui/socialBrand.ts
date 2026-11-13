import type { Social } from "../../data/profile";

/**
 * Brand colors for the social links, in the site's HUD idiom: the icon and a
 * thin frame carry the brand color at rest; on hover the tile fills with it
 * and glows, the same way the nav's CONTACT button does in cyan.
 *
 * GitHub and X are monochrome brands (black on light, white on dark), so on
 * this dark page they are white. LinkedIn uses its official blue for the
 * frame and the hover fill, and a lighter tone of it for the resting icon so
 * it stays legible on the dark background.
 */
export const socialBrand: Record<Social, string> = {
  github:
    "border-white/30 text-white hover:border-white hover:bg-white hover:text-void hover:shadow-neon-white",
  linkedin:
    "border-linkedin text-linkedin-light hover:bg-linkedin hover:text-white hover:shadow-neon-linkedin",
  x: "border-white/30 text-white hover:border-white hover:bg-white hover:text-void hover:shadow-neon-white",
};

/** Email is the site's own channel: same treatment, in the primary cyan. */
export const emailBrand =
  "border-cyan/40 text-cyan hover:border-cyan hover:bg-cyan hover:text-void hover:shadow-neon-cyan";
