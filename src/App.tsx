/**
 * YHONATAN_OS v2.0 — interactive cyberpunk portfolio.
 *
 * Stack rationale (Phase 0):
 *  - Vite + React + TypeScript ... fast DX, tree-shaking, type safety
 *  - three / @react-three/fiber / drei ... declarative 3D hero scene
 *  - framer-motion ... scroll + micro-interactions (spring physics)
 *  - gsap ... available for timeline sequencing (boot/scramble use lightweight hooks)
 *  - tailwindcss ... utility-first styling with a custom neon theme
 *  - lucide-react ... tree-shakable icons
 *
 * Dropped from a generic scaffold (only ship what's needed):
 *  - react-router (single page), react-scroll (native scrollIntoView),
 *    react-intersection-observer (native IntersectionObserver hook).
 */
import Overlays from "./components/fx/Overlays";
import Nav from "./components/layout/Nav";
import Footer from "./components/layout/Footer";
import Companion from "./components/companion/Companion";
import Hero from "./components/sections/Hero";
import Skills from "./components/sections/Skills";
import Projects from "./components/sections/Projects";
import Experience from "./components/sections/Experience";
import SideQuests from "./components/sections/SideQuests";
import Contact from "./components/sections/Contact";
import { useActiveSection } from "./lib/hooks";

const SECTION_IDS = ["home", "skills", "projects", "experience", "sidequests", "contact"];

// Companion dialogue keys map onto section ids (home → "hero").
const DIALOGUE_KEY: Record<string, string> = {
  home: "hero",
  skills: "skills",
  projects: "projects",
  experience: "experience",
  sidequests: "sidequests",
  contact: "contact",
};

export default function App() {
  const active = useActiveSection(SECTION_IDS);

  return (
    <div className="relative min-h-screen bg-void text-ink">
      {/* Skip link for keyboard / screen-reader users */}
      <a
        href="#projects"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:bg-cyan focus:px-4 focus:py-2 focus:font-mono focus:text-void"
      >
        Skip to projects
      </a>

      <Overlays />
      <Nav active={active} />

      <main>
        <Hero />
        <Skills />
        <Projects />
        <Experience />
        <SideQuests />
        <Contact />
      </main>

      <Footer />
      <Companion section={DIALOGUE_KEY[active] ?? "boot"} />
    </div>
  );
}
