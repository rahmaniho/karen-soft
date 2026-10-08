import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        obsidian: "#050505",
        navy: "#0B1120",
        electric: "#00F0FF",
        neon: "#8B5CF6",
        cmyk: { cyan: "#00AEEF", magenta: "#EC008C", yellow: "#FFD200", key: "#111626" },
      },
      fontFamily: { sans: ["Vazirmatn", "system-ui", "sans-serif"], mono: ["JetBrains Mono", "ui-monospace", "monospace"] },
    },
  },
  plugins: [],
};

export default config;
