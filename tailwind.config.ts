import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        "bg-raised": "var(--bg-raised)",
        "bg-card": "var(--bg-card)",
        "bg-deep": "var(--bg-deep)",
        text: "var(--text)",
        "text-soft": "var(--text-soft)",
        "text-muted": "var(--text-muted)",
        "text-on-deep": "var(--text-onDeep)",
        "text-on-deep-muted": "var(--text-onDeep-muted)",
        accent: "var(--accent)",
        "accent-2": "var(--accent-2)",
        highlight: "var(--highlight)",
        "highlight-bg": "var(--highlight-bg)",
        line: "var(--line-c)",
        "line-strong": "var(--line-strong-c)",
        "risk-reg": "var(--risk-reg)",
        "risk-op": "var(--risk-op)",
        "risk-rep": "var(--risk-rep)",
      },
      fontFamily: {
        serif: "var(--font-serif)",
        sans: "var(--font-sans)",
        mono: "var(--font-mono)",
      },
    },
  },
  plugins: [],
};

export default config;
