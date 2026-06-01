export interface ExperienceRole {
  role: string;
  org: string;
  /** Human-readable date range (clear meaning — replaces arbitrary "levels") */
  period: string;
  location?: string;
  /** Short context tag, e.g. "Telecom · Frontend" */
  type: string;
  /** Current / active role */
  current?: boolean;
  summary: string;
  /** Quantified, recruiter-readable outcomes */
  highlights: string[];
}

/**
 * Work history — sourced from Yhonatan's LinkedIn profile (real roles, dates
 * and metrics). Ordered most-recent first. Web3 community roles (Coinbase /
 * Binance) live in the Side Quests section instead, to keep this a clean
 * engineering timeline.
 */
export const experience: ExperienceRole[] = [
  {
    role: "Software Developer",
    org: "Claro RD",
    period: "Jan 2023 — Present",
    location: "Dominican Republic",
    type: "Telecom · Frontend",
    current: true,
    summary:
      "Building scalable, user-centered front-ends at one of the Caribbean's largest telecoms — reusable React/Angular design systems plus resilient Java microservices.",
    highlights: [
      "Cut user-reported issues by 20% and raised user satisfaction 10% through React front-end improvements.",
      "Led a reusable Angular/React component library that reduced development time by 30% — received an innovation award.",
      "Reduced page-load times by 40% with modern JS/CSS and responsive, cross-device layouts.",
      "Built and hardened Java microservices, improving process efficiency and application stability.",
    ],
  },
  {
    role: "Frontend Web Developer",
    org: "BlackCode",
    period: "Feb — Nov 2024",
    location: "Mexico · Remote",
    type: "Startup · Frontend",
    summary:
      "Early-stage startup team shipping products end-to-end — app development, interface design and functional QA across the development cycle.",
    highlights: [
      "Shipped features and UI for an early-stage startup, iterating fast on real product problems.",
      "Ran functional testing (QA) to keep product quality and stability high.",
      "Worked across the dev cycle with a practical, iterative approach.",
    ],
  },
  {
    role: "FullStack Developer",
    org: "OpenBootcamp",
    period: "Aug 2022 — May 2023",
    location: "Spain · Remote",
    type: "Community · Fullstack",
    summary:
      "Collaborated in the Open-Week-Apps initiative, building small full-stack apps in 7-day team sprints with other developers.",
    highlights: [
      "Delivered full-stack apps in time-boxed team sprints (e.g. Anime Songs App, Quiz-Interview).",
      "Practiced real team workflows — planning, building and shipping under deadline.",
    ],
  },
  {
    role: "Fullstack Developer",
    org: "Boyants",
    period: "Jun — Dec 2022",
    location: "Remote",
    type: "Fullstack",
    summary:
      "Modernized legacy systems and delivered robust applications end-to-end, from RESTful services to polished React UIs.",
    highlights: [
      "Led the migration of legacy systems into modern, maintainable architectures (SPAs & PWAs).",
      "Coordinated full app development with RESTful services that improved client-side interaction.",
      "Raised code quality with unit & integration testing (Jest, Cypress) across agile sprints.",
    ],
  },
  {
    role: "Web Developer Bootcamp (ONE)",
    org: "Oracle Next Education",
    period: "Nov 2021 — Jul 2022",
    location: "Remote",
    type: "Program · Fullstack",
    summary:
      "Intensive, project-based web-development program simulating a real work environment with collaborative, self-managed learning.",
    highlights: [
      "Front-end & back-end tracks with JavaScript, React and Java.",
      "Project-based learning through collaborative team work.",
    ],
  },
  {
    role: "Front-End Analyst (Intern)",
    org: "Bamapit Agrosoft",
    period: "Jan 2021 — Jan 2022",
    location: "Dominican Republic",
    type: "Internship · Front-End",
    summary:
      "Front-end internship spanning requirements analysis, debugging, and translating design concepts into web & mobile prototypes and code.",
    highlights: [
      "Created prototypes in Adobe XD & Figma and turned them into HTML/CSS/JavaScript UIs.",
      "Researched and proposed UI/UX improvements for web and mobile interfaces.",
    ],
  },
];

export interface Credential {
  title: string;
  org: string;
  year: string;
}

/** Education (from LinkedIn). */
export const education: Credential[] = [
  { title: "B.S. Software Engineering", org: "Universidad Adventista Dominicana", year: "2017 — 2023" },
  { title: "Web Developer — ONE", org: "Oracle Next Education", year: "2022" },
  { title: "English · Pre-Intermediate", org: "King's College London", year: "2021" },
];

/** Certifications. */
export const certifications: string[] = [
  "Claude Code in Action",
  "JavaScript Algorithms & Data Structures",
  "Responsive Web Design",
  "Scrum Foundation (SFPC)",
];

/** Spoken languages. */
export const languages = ["Spanish", "English"];
