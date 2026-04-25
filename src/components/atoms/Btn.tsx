import type { ReactNode, CSSProperties, MouseEventHandler } from "react";

export type BtnVariant = "primary" | "ghost" | "accent";

export interface BtnProps {
  variant?: BtnVariant;
  children: ReactNode;
  as?: "button" | "a";
  href?: string;
  disabled?: boolean;
  style?: CSSProperties;
  className?: string;
  onClick?: MouseEventHandler<HTMLElement>;
  ariaLabel?: string;
  type?: "button" | "submit" | "reset";
}

export function Btn({
  variant = "primary",
  children,
  as = "button",
  href,
  disabled,
  style,
  className,
  onClick,
  ariaLabel,
  type = "button",
}: BtnProps) {
  const cls = `btn btn-${variant} ${className ?? ""}`.trim();
  if (as === "a" || href) {
    return (
      <a
        href={href ?? "#"}
        aria-label={ariaLabel}
        aria-disabled={disabled || undefined}
        className={cls}
        style={style}
        onClick={onClick as MouseEventHandler<HTMLAnchorElement>}
      >
        {children}
      </a>
    );
  }
  return (
    <button
      type={type}
      disabled={disabled}
      aria-label={ariaLabel}
      className={cls}
      style={style}
      onClick={onClick as MouseEventHandler<HTMLButtonElement>}
    >
      {children}
    </button>
  );
}

export default Btn;
