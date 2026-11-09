import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "#0C0C0E",
        charcoal: "#16161A",
        raised: "#1F1F24",
        hairline: "#27272A",
        "hairline-strong": "#3F3F46",
        bone: "#F5F5F7",
        stone: {
          light: "#A1A1AA",
          DEFAULT: "#71717A",
          dark: "#52525B",
        },
        bronze: {
          light: "#F59E0B",
          DEFAULT: "#D97706",
          dark: "#B45309",
        },
        brass: {
          light: "#FDE047",
          DEFAULT: "#EAB308",
          dark: "#CA8A04",
        },
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "SF Mono", "Menlo", "Courier New", "monospace"],
      },
      borderRadius: {
        xs: "2px",
        sm: "4px",
        DEFAULT: "4px",
        md: "6px",
        lg: "8px",
        xl: "12px",
      },
    },
  },
  plugins: [],
};
export default config;
