import type { CSSProperties } from "react";

export interface SectionRuleProps {
  style?: CSSProperties;
  className?: string;
}

export function SectionRule({ style, className }: SectionRuleProps) {
  return <hr role="separator" className={`section-rule ${className ?? ""}`.trim()} style={style} />;
}

export default SectionRule;
