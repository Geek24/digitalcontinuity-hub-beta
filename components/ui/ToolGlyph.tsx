import type { Tool } from "@/lib/fixtures";

export interface ToolGlyphProps {
  t: Tool;
  size?: number;
  accent?: string;
}

export function ToolGlyph({ t, size = 18, accent }: ToolGlyphProps) {
  const bg = t.flagship
    ? "var(--accent)"
    : t.riskGroup === "reg"
      ? "color-mix(in srgb, var(--risk-reg) 14%, var(--bg-card))"
      : t.riskGroup === "op"
        ? "color-mix(in srgb, var(--risk-op) 14%, var(--bg-card))"
        : "color-mix(in srgb, var(--risk-rep) 18%, var(--bg-card))";
  const fg = t.flagship
    ? "white"
    : t.riskGroup === "reg"
      ? "var(--risk-reg)"
      : t.riskGroup === "op"
        ? "var(--risk-op)"
        : "var(--risk-rep)";
  return (
    <span
      role="img"
      aria-label={`${t.label} icon`}
      style={{
        width: size,
        height: size,
        borderRadius: 4,
        background: accent || bg,
        color: fg,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: size * 0.55,
        fontFamily: "var(--font-serif)",
        fontWeight: 600,
        flexShrink: 0,
        border: t.flagship ? "none" : "1px solid var(--line-c)",
      }}
    >
      {t.glyph}
    </span>
  );
}

export default ToolGlyph;
