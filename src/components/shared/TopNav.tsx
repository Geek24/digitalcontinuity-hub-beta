import { Link, NavLink } from "react-router-dom";
import { Btn } from "@/components/atoms/Btn";
import { Divider } from "@/components/atoms/Divider";
import { ThemeSwitcher } from "@/components/atoms/ThemeSwitcher";
import { useTweaks } from "@/lib/tweaks";

export interface TopNavProps {
  /** "platform" highlights Platform · "landing" highlights nothing */
  active?: "landing" | "platform" | "hub";
  showMegaIndicator?: boolean;
}

export function TopNav({ active = "landing", showMegaIndicator }: TopNavProps) {
  const { tweaks } = useTweaks();
  const { brandProminence } = tweaks;

  const renewByline = (
    <span
      className="brand-sub mono"
      style={{
        fontSize: 9.5,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        display: "block",
        lineHeight: 1.1,
        marginTop: 1,
      }}
    >
      a Renew EcoMe LLC product
    </span>
  );

  const lockup =
    brandProminence === "dc-only" ? (
      <span style={{ display: "inline-flex", flexDirection: "column" }}>
        <span className="brand serif" style={{ fontSize: 15, letterSpacing: "-0.01em", lineHeight: 1 }}>
          DigitalContinuity<span style={{ color: "var(--accent)" }}>.ai</span>
        </span>
        {renewByline}
      </span>
    ) : brandProminence === "st-only" ? (
      <span style={{ display: "inline-flex", flexDirection: "column" }}>
        <span className="brand serif" style={{ fontSize: 15, lineHeight: 1 }}>
          SmarterTariff
        </span>
        {renewByline}
      </span>
    ) : (
      <>
        <span style={{ display: "inline-flex", flexDirection: "column" }}>
          <span className="brand serif" style={{ fontSize: 15, letterSpacing: "-0.01em", lineHeight: 1 }}>
            DigitalContinuity<span style={{ color: "var(--accent)" }}>.ai</span>
          </span>
          {renewByline}
        </span>
        <Divider variant="vertical" />
        <span style={{ display: "inline-flex", flexDirection: "column" }}>
          <span className="brand serif" style={{ fontSize: 15, letterSpacing: "-0.005em", lineHeight: 1 }}>
            Smarter<span style={{ color: "var(--accent)" }}>Tariff</span>
            <span
              className="mono"
              style={{ fontSize: 8, color: "var(--text-soft)", marginLeft: 4, verticalAlign: "super" }}
            >
              ™
            </span>
          </span>
          <span
            className="brand-sub mono"
            style={{
              fontSize: 9.5,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              display: "block",
              lineHeight: 1.1,
              marginTop: 1,
              color: "var(--text-soft)",
            }}
          >
            the self-imposed tariff thesis
          </span>
        </span>
        <Divider variant="vertical" />
        <span className="brand-sub mono" style={{ fontSize: 9.5, color: "var(--text-soft)" }}>
          + 6 audit tools
        </span>
      </>
    );

  return (
    <nav className="topnav" aria-label="Primary">
      <Link to="/" className="lockup" style={{ textDecoration: "none" }}>
        <span className="dc-mark" aria-hidden />
        {lockup}
      </Link>
      <div className="row gap-5 itemsCenter" style={{ marginLeft: 24 }}>
        <NavLink
          to="/platform"
          className={({ isActive }) =>
            `topnav-link ${isActive || active === "platform" ? "active" : ""}`
          }
        >
          Platform {showMegaIndicator ? "▾" : ""}
        </NavLink>
        <NavLink to="/" className="topnav-link" end>
          Tools
        </NavLink>
        <span className="topnav-link">Pricing</span>
        <span className="topnav-link">Story</span>
        <span className="topnav-link">Resources</span>
      </div>
      <div className="grow" />
      <div className="row gap-3 itemsCenter">
        <ThemeSwitcher />
        <Btn variant="ghost">Sign in</Btn>
        <Btn variant="primary" as="a" href="/app">
          Run audit →
        </Btn>
      </div>
    </nav>
  );
}

export default TopNav;
