import type { ReactNode, CSSProperties } from "react";

export interface MonoCallProps {
  children: ReactNode;
  size?: "sm" | "md";
  style?: CSSProperties;
  className?: string;
}

export function MonoCall({ children, size = "md", style, className }: MonoCallProps) {
  const sized: CSSProperties = size === "sm" ? { fontSize: 10 } : {};
  return (
    <span className={`mono-call ${className ?? ""}`.trim()} style={{ ...sized, ...style }}>
      {children}
    </span>
  );
}

export default MonoCall;
