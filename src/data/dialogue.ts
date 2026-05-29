/**
 * Pre-written companion dialogue — no AI API calls.
 * Lines are triggered by scroll position (the active section).
 * Friendly, slightly nerdy, light anime references.
 */
export const dialogue: Record<string, string[]> = {
  boot: [
    "システム起動！ I'm PIXL, your guide unit. Use the arrows or just scroll, senpai.",
    "Welcome to YHONATAN_OS. Let's clear this portfolio together, dattebayo!",
  ],
  hero: [
    "This is the boot screen. Hit [ENTER PORTFOLIO] when you're ready to dive in.",
    "Nice reflexes finding me already 👀",
  ],
  skills: [
    "Now entering: Tech Arsenal. Check those HP bars — Frontend's basically maxed.",
    "Web3 stack unlocked. Solana, Base, the whole party.",
  ],
  projects: [
    "Mission Log loaded — prepare for impact. These are real, shipped builds.",
    "Hover a mission card to flip it for the intel. Nani?! Look at M-01.",
  ],
  experience: [
    "Character Stats incoming. Level 30 Senior Engineer — that's no NPC.",
    "Each role unlocked new abilities. Telecom-scale boss fights cleared.",
  ],
  sidequests: [
    "Side Quests detected! Hackathons, DeFi, on-chain reputation. Big XP.",
    "Open-source completionist energy. Respect.",
  ],
  contact: [
    "Final sector: Initiate Connection. Drop a message in the terminal — he reads them!",
    "GG, you reached the end. Arigatou for playing 🎮 Now go say hi.",
  ],
};
