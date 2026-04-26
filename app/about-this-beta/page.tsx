import { Suspense } from "react";
import { TopNav } from "@/components/shared/TopNav";
import { Footer } from "@/components/shared/Footer";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MonoCall } from "@/components/ui/MonoCall";
import { SectionRule } from "@/components/ui/SectionRule";

export default function AboutThisBetaPage() {
  return (
    <div className="artboard dense">
      <Suspense fallback={null}>
        <TopNav active="landing" />
      </Suspense>
      <main id="main">
        <article
          className="vh-section"
          style={{ padding: "32px 56px 48px", maxWidth: 760, margin: "0 auto" }}
        >
          <Eyebrow>About</Eyebrow>
          <h1 className="headline" style={{ fontSize: 36, lineHeight: 1.15, margin: "8px 0 16px" }}>
            About this <em>beta</em>
          </h1>
          <p style={{ fontSize: 15, lineHeight: 1.6, color: "var(--text-soft)", marginBottom: 20 }}>
            This site is a <strong>prototype-grade beta</strong> demonstrating the consolidated
            DigitalContinuity.ai platform. It is intentionally indexed{" "}
            <code>noindex, nofollow, noarchive</code> and contains no live API calls, no auth, and
            no production data.
          </p>

          <SectionRule style={{ margin: "20px 0" }} />

          <h2 className="serif" style={{ fontSize: 22, marginBottom: 8 }}>
            What this beta is
          </h2>
          <ul style={{ paddingLeft: 18, lineHeight: 1.7, color: "var(--text-soft)" }}>
            <li>A visual & IA prototype across three artboards (Landing, Platform, Hub)</li>
            <li>Four AAA-tuned palettes × light/dark mode</li>
            <li>Driven entirely by URL query parameters and fixture data</li>
            <li>A safe substrate for design feedback and review</li>
            <li>Built on the same Next.js 16 + Tailwind v4 stack as production</li>
          </ul>

          <h2 className="serif" style={{ fontSize: 22, marginTop: 20, marginBottom: 8 }}>
            What this beta is not
          </h2>
          <ul style={{ paddingLeft: 18, lineHeight: 1.7, color: "var(--text-soft)" }}>
            <li>Not connected to the SmarterTariff scoring engine or any production API</li>
            <li>Not authoritative for any compliance, accessibility, or commerce decision</li>
            <li>Not a substitute for the live platform at smartertariff.ai</li>
          </ul>

          <h2 className="serif" style={{ fontSize: 22, marginTop: 20, marginBottom: 8 }}>
            IP guardrails
          </h2>
          <p style={{ lineHeight: 1.6, color: "var(--text-soft)" }}>
            Scoring weights, signal-detection logic, and the criterion → revenue mapping that power
            the live platform are intentionally <em>not</em> exposed in this beta. The{" "}
            <strong>Patent pending</strong> notation appears only near the methodology block on the
            Landing page and the Agentic Commerce Readiness card in the Hub. All score caps,
            dimension counts, framework names, and protocol compatibility entries reflect what is
            already public on smartertariff.ai today.
          </p>

          <h2 className="serif" style={{ fontSize: 22, marginTop: 20, marginBottom: 8 }}>
            Feedback
          </h2>
          <p style={{ lineHeight: 1.6, color: "var(--text-soft)" }}>
            Email <a href="mailto:chris@smartertariff.com">chris@smartertariff.com</a>. The beta
            banner injects the current URL (with all Tweak query params) into the message body, so
            feedback always says which variant you were viewing.
          </p>

          <SectionRule style={{ margin: "24px 0 12px" }} />
          <MonoCall>Renew EcoMe LLC · Cape Elizabeth, ME · v0.2 · 2026</MonoCall>
        </article>
      </main>
      <Footer />
    </div>
  );
}
