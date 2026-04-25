import type { CSSProperties } from "react";

export interface DividerProps {
  variant?: "vertical" | "horizontal";
  height?: number;
  style?: CSSProperties;
}

export function Divider({ variant = "vertical", height = 14, style }: DividerProps) {
  if (variant === "vertical") {
    return (
      <span
        aria-hidden
        style={{
          width: 1,
          height,
          background: "var(--line-strong-c)",
          display: "inline-block",
          margin: "0 2px",
          ...style,
        }}
      />
    );
  }
  return (
    <span
      aria-hidden
      style={{
        height: 1,
        width: "100%",
        background: "var(--line-strong-c)",
        display: "block",
        ...style,
      }}
    />
  );
}

export default Divider;
