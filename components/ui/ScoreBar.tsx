import type { CSSProperties } from "react";

export type ScoreTone = "reg" | "op" | "rep" | "accent";

export interface ScoreBarProps {
  value: number;
  max?: number;
  tone?: ScoreTone;
  label?: string;
  status?: "OK" | "WARN" | "CRITICAL";
  style?: CSSProperties;
}

export function ScoreBar({ value, max = 95, tone = "accent", label, status, style }: ScoreBarProps) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  const color =
    tone === "reg"
      ? "var(--risk-reg)"
      : tone === "op"
        ? "var(--risk-op)"
        : tone === "rep"
          ? "var(--risk-rep)"
          : "var(--accent)";

  const ariaText = label
    ? `${label}: ${value} of ${max}${status ? `, ${status.toLowerCase()}` : ""}`
    : `Score ${value} of ${max}${status ? `, ${status.toLowerCase()}` : ""}`;

  return (
    <div
      role="meter"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={ariaText}
      className="bar"
      style={style}
    >
      <i style={{ width: `${pct}%`, background: color }} />
      <span className="sr-only">{ariaText}</span>
    </div>
  );
}

export default ScoreBar;
