import { Routes, Route } from "react-router-dom";
import { BetaBanner } from "@/components/atoms/BetaBanner";
import { VariantsPanel } from "@/components/VariantsPanel";
import LandingPage from "@/pages/LandingPage";
import PlatformPage from "@/pages/PlatformPage";
import HubPage from "@/pages/HubPage";
import AboutThisBetaPage from "@/pages/AboutThisBetaPage";
import NotFoundPage from "@/pages/NotFoundPage";
import { useTweaks } from "@/lib/tweaks";

export default function App() {
  // initialise tweaks/theme attribute on <html>
  useTweaks();

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
      <BetaBanner />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/platform" element={<PlatformPage />} />
        <Route path="/app" element={<HubPage />} />
        <Route path="/about-this-beta" element={<AboutThisBetaPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <VariantsPanel />
    </>
  );
}
