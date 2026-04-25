import type { ReactNode, CSSProperties } from "react";

export type PillTone = "reg" | "op" | "rep" | "neutral";

export interface PillProps {
  tone?: PillTone;
  children: ReactNode;
  dotOnly?: boolean;
  style?: CSSProperties;
  className?: string;
}

export function Pill({ tone = "neutral", children, dotOnly, style, className }: PillProps) {
  const toneClass = tone === "neutral" ? "" : `pill-tone-${tone}`;
  return (
    <span className={`pill ${toneClass} ${className ?? ""}`.trim()} style={style}>
      {!dotOnly && tone !== "neutral" && <span className="dot" aria-hidden />}
      {children}
    </span>
  );
}

export default Pill;
