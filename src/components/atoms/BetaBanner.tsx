import { useLocation } from "react-router-dom";

export interface BetaBannerProps {
  email?: string;
}

export function BetaBanner({ email = "chris@smartertariff.com" }: BetaBannerProps) {
  const location = useLocation();

  // Compose the mailto with the *current* URL (incl. query params) injected
  const currentUrl =
    typeof window !== "undefined"
      ? window.location.href
      : `https://hub-beta.digitalcontinuity.ai${location.pathname}${location.search}`;

  const mailto = `mailto:${email}?subject=${encodeURIComponent("DC Hub Beta feedback")}&body=${encodeURIComponent(`URL: ${currentUrl}\n\n`)}`;

  return (
    <div className="beta-banner" role="region" aria-label="Beta notice">
      <span aria-hidden style={{ marginRight: 4 }}>⚑</span>
      <span>
        <strong>Beta · Prototype · Not production data</strong>
      </span>
      <span aria-hidden style={{ opacity: 0.5 }}>·</span>
      <span>
        Feedback → <a href={mailto}>{email}</a>
      </span>
      <span aria-hidden style={{ opacity: 0.5 }}>·</span>
      <a href="/about-this-beta">About this beta</a>
    </div>
  );
}

export default BetaBanner;
