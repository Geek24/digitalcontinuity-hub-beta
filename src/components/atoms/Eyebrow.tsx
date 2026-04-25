import type { ReactNode, CSSProperties } from "react";

export interface EyebrowProps {
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
}

export function Eyebrow({ children, style, className }: EyebrowProps) {
  return (
    <div className={`eyebrow ${className ?? ""}`.trim()} style={style}>
      {children}
    </div>
  );
}

export default Eyebrow;
