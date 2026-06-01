/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Core cyberpunk palette — deep void + neon accents. No purple gradients.
        void: {
          DEFAULT: "#0A0A0F", // deep void black
          800: "#0E0E16",
          700: "#13131F",
          600: "#1A1A28",
        },
        cyan: {
          DEFAULT: "#00F5FF", // neon cyan (primary)
          dim: "rgba(0, 245, 255, 0.12)",
        },
        magenta: {
          DEFAULT: "#FF006E", // hot magenta (secondary)
          dim: "rgba(255, 0, 110, 0.12)",
        },
        amber: {
          DEFAULT: "#FFB800", // electric amber (accent)
          dim: "rgba(255, 184, 0, 0.12)",
        },
        ink: {
          DEFAULT: "#E8EEF2", // high-contrast body text (≈ 14:1 on void)
          muted: "#A8B4C0", // secondary text — ≈ 8.6:1 on void
          faint: "#7E8B99", // micro-labels — ≈ 5.7:1 on void (WCAG AA)
        },
      },
      fontFamily: {
        display: ["Orbitron", "sans-serif"],
        ui: ["Rajdhani", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
        jp: ["'Noto Sans JP'", "sans-serif"],
      },
      boxShadow: {
        "neon-cyan": "0 0 8px rgba(0,245,255,0.6), 0 0 24px rgba(0,245,255,0.25)",
        "neon-magenta": "0 0 8px rgba(255,0,110,0.6), 0 0 24px rgba(255,0,110,0.25)",
        "neon-amber": "0 0 8px rgba(255,184,0,0.6), 0 0 24px rgba(255,184,0,0.25)",
      },
      keyframes: {
        flicker: {
          "0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%": { opacity: "1" },
          "20%, 22%, 24%, 55%": { opacity: "0.55" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
      },
      animation: {
        flicker: "flicker 4s linear infinite",
        scanline: "scanline 8s linear infinite",
        "pulse-glow": "pulse-glow 2.4s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        blink: "blink 1s step-end infinite",
      },
    },
  },
  plugins: [],
};
