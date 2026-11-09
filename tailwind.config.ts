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
        paypal: {
          blue: "#0070BA",
          darkblue: "#003087",
          navy: "#001C48",
          light: "#0079C1",
          gold: "#FFC439",
        },
        cyber: {
          dark: "#0a0d14",
          card: "#111726",
          border: "#1f293d",
          accent: "#38bdf8",
          emerald: "#10b981",
        }
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        glow: {
          "0%": { boxShadow: "0 0 10px rgba(0, 112, 186, 0.3)" },
          "100%": { boxShadow: "0 0 25px rgba(0, 112, 186, 0.7)" },
        }
      }
    },
  },
  plugins: [],
};
export default config;

