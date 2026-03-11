import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "375px",
      md: "768px",
      lg: "1200px",
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        md: "2rem",
      },
    },
    extend: {
      colors: {
        neural: {
          bg: "#060606",
          primary: "#00d4ff",
          secondary: "#38bdf8",
          tertiary: "#60a5fa",
          muted: "rgba(255,255,255,0.5)",
          surface: "#0a0a0a",
          card: "#0d1117",
          "card-border": "rgba(0,212,255,0.12)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        serif: ["var(--font-serif)", "serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      animation: {
        "ping-large": "ping-large 1s ease-in-out infinite",
        "move-left": "move-left 1s linear infinite",
        "move-right": "move-right 1s linear infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "node-float": "node-float 6s ease-in-out infinite",
        "connection-pulse": "connection-pulse 2s ease-in-out infinite",
        "fade-in-up": "fade-in-up 0.6s ease-out forwards",
        "slide-in-left": "slide-in-left 0.5s ease-out forwards",
        "glow-line": "glow-line 3s ease-in-out infinite",
      },
      keyframes: {
        "ping-large": {
          "75%, 100%": {
            transform: "scale(3)",
            opacity: "0",
          },
        },
        "move-left": {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "move-right": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        "node-float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "connection-pulse": {
          "0%": { opacity: "0.15", transform: "translateX(-100%)" },
          "50%": { opacity: "0.6" },
          "100%": { opacity: "0.15", transform: "translateX(100%)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-left": {
          "0%": { opacity: "0", transform: "translateX(-30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "glow-line": {
          "0%, 100%": { opacity: "0.15" },
          "50%": { opacity: "0.4" },
        },
      },
      boxShadow: {
        "node-glow": "0 0 20px rgba(0,212,255,0.4)",
        "node-glow-lg": "0 0 40px rgba(0,212,255,0.3)",
        "card-glow": "0 0 30px rgba(0,212,255,0.1)",
      },
    },
  },
  plugins: [],
};

export default config;
