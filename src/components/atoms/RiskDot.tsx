import type { CSSProperties } from "react";

export type RiskKind = "reg" | "op" | "rep";

export interface RiskDotProps {
  kind: RiskKind;
  size?: number;
  ariaLabel?: string;
}

export function RiskDot({ kind, size = 6, ariaLabel }: RiskDotProps) {
  const bg =
    kind === "reg"
      ? "var(--risk-reg-bg)"
      : kind === "op"
        ? "var(--risk-op-bg)"
        : "var(--risk-rep-bg)";

  const style: CSSProperties = {
    display: "inline-block",
    width: size,
    height: size,
    borderRadius: "50%",
    background: bg,
    verticalAlign: "middle",
    flexShrink: 0,
  };
  return <span aria-label={ariaLabel} aria-hidden={ariaLabel ? undefined : true} style={style} />;
}

export default RiskDot;
