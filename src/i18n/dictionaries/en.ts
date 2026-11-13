/**
 * English interface copy: the source of truth. Every other language is typed
 * against this object (see ./es.ts), so a missing or misspelled key is a
 * compile error, not a blank label in production.
 *
 * Only interface text lives here. Portfolio content (projects, roles, side
 * quests…) stays in src/data and is localized in src/i18n/content.
 */
export const en = {
  common: {
    seeLess: "See less",
  },
  a11y: {
    skipToProjects: "Skip to projects",
  },
  language: {
    /** Accessible name of the language selector */
    label: "Language",
    /** Language names as written in this language */
    names: { en: "English", es: "Spanish" },
  },
  intro: {
    label: "Intro — booting portfolio",
    typing: "> initializing operator…",
    skip: "[ SKIP ]",
  },
  nav: {
    label: "Primary",
    backToTop: "Back to top",
    links: {
      home: "HOME",
      skills: "SKILLS",
      projects: "PROJECTS",
      sidequests: "WEB3",
      experience: "EXPERIENCE",
      contact: "CONTACT",
    },
    /** Themed codenames, shown as tooltips */
    codes: {
      home: "BOOT",
      skills: "ARSENAL",
      projects: "MISSIONS",
      sidequests: "QUESTS",
      experience: "STATS",
      contact: "CONNECT",
    },
    openMenu: "Open menu",
    closeMenu: "Close menu",
    menuTitle: "[ NAVIGATION ]",
    here: "● HERE",
  },
  cv: {
    download: "DOWNLOAD CV",
    /** Used when the CV does not exist in the visitor's language */
    onlyIn: (language: string) => `Download CV (available in ${language} only)`,
  },
  hero: {
    status: "SYSTEM ONLINE // READY",
    enter: "ENTER PORTFOLIO",
    findMe: "FIND ME",
    scrollNext: "Scroll to next section",
    figureAlt: "Yhonatan as a holographic hooded developer",
  },
  skills: {
    title: "TECH ARSENAL",
    subtitle:
      "Equipped skill nodes. Bars show current proficiency — frontend is maxed, on-chain is leveling fast.",
  },
  projects: {
    title: "MISSION LOG",
    subtitle: "Selected builds, most impactful first. Open any card for the full intel.",
    seeMore: (count: number) => `See ${count} more projects`,
    openDetails: (name: string) => `Open ${name} details`,
    screenshotOf: (name: string) => `Screenshot of ${name}`,
    rank: (rank: string) => `Rank ${rank}`,
    viewIntel: "VIEW INTEL",
    intel: "INTEL",
    live: "LIVE",
    code: "CODE",
    missionBrief: "MISSION BRIEF",
    previous: "Previous project",
    next: "Next project",
    close: "Close project details",
    openLive: "OPEN LIVE DEMO",
    sourceCode: "SOURCE CODE",
    achievements: "ACHIEVEMENTS",
    impact: "IMPACT",
    stack: "STACK",
  },
  sideQuests: {
    title: "SIDE QUESTS",
    subtitle:
      "Web3 & open-source activity — hackathons, DeFi contributions and on-chain experiments.",
    status: { COMPLETE: "COMPLETE", ACTIVE: "ACTIVE", ONGOING: "ONGOING" },
    view: "VIEW",
    seeMore: (count: number) => `See ${count} more quests`,
  },
  experience: {
    title: "CHARACTER STATS",
    subtitle: "Real roles, real dates, real outcomes — most recent first.",
    current: "CURRENT",
    readLess: "Read less",
    readMore: (count: number) => `Read more (+${count})`,
    seeMore: (count: number) => `See ${count} more roles`,
    education: "EDUCATION",
    certifications: "CERTIFICATIONS",
    languages: "LANGUAGES",
  },
  contact: {
    title: "INITIATE CONNECTION",
    subtitle:
      "Open to senior software engineering & Web3 roles, collabs and good problems. Drop a transmission.",
    name: "> NAME:",
    replyTo: "> REPLY_ADDR:",
    message: "> MESSAGE:",
    namePlaceholder: "your_name",
    emailPlaceholder: "you@domain.com",
    messagePlaceholder: "type your transmission...",
    send: "TRANSMIT",
    email: "Email",
    mailSubject: (name: string) => `[PORTFOLIO] New transmission from ${name || "anon"}`,
    mailBody: (message: string, name: string, replyTo: string) =>
      `${message}\n\n— ${name}\nReply to: ${replyTo}`,
  },
  footer: {
    rights: "All rights reserved",
    top: "TOP",
    backToTop: "Back to top",
  },
  companion: {
    dialogLabel: "PIXL — information about Yhonatan",
    close: "Close",
    unit: "PIXL // GUIDE_UNIT",
    online: "ONLINE",
    topics: "TOPICS",
    /** The greeting wraps the highlighted name: before + "PIXL" + after */
    greetingBefore: "Konnichiwa! I'm ",
    greetingAfter: ". Pick a topic and I'll tell you about Yhonatan 👀",
    openTitle: "Ask PIXL about Yhonatan",
    closeTitle: "Close PIXL",
    openLabel: "Open PIXL — info about Yhonatan",
    closeLabel: "Close PIXL guide",
  },
};

export type Dictionary = typeof en;
