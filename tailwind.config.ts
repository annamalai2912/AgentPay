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
        // Grounded Brand Color System (Strictly overwriting framework defaults)
        primary: {
          DEFAULT: "#003087",
          dark: "#001C48",
          light: "#0070BA",
        },
        secondary: {
          DEFAULT: "#0070BA",
          light: "#0079C1",
          dark: "#003087",
        },
        accent: {
          DEFAULT: "#FFC439",
          hover: "#F2BA36",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          subtle: "#F5F7FA",
          card: "#FFFFFF",
          border: "#E1E7EB",
          text: "#0C163B",
          muted: "#687173",
        },
        paypal: {
          blue: "#0070BA",
          darkblue: "#003087",
          navy: "#001C48",
          darknavy: "#001435",
          gold: "#FFC439",
          goldHover: "#F2BA36",
          gray: "#F5F7FA",
          lightgray: "#F8FAFC",
          border: "#E1E7EB",
          text: "#0C163B",
          subtext: "#687173",
        },
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["JetBrains Mono", "SF Mono", "Menlo", "Courier New", "monospace"],
      },
      borderRadius: {
        pill: "9999px",
      },
    },
  },
  plugins: [],
};
export default config;
