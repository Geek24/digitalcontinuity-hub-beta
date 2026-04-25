import { useMemo } from "react";
import { TopNav } from "@/components/shared/TopNav";
import { Footer } from "@/components/shared/Footer";
import { Btn } from "@/components/atoms/Btn";
import { Pill } from "@/components/atoms/Pill";
import { ToolGlyph } from "@/components/atoms/ToolGlyph";
import { Eyebrow } from "@/components/atoms/Eyebrow";
import { MonoCall } from "@/components/atoms/MonoCall";
import { SectionRule } from "@/components/atoms/SectionRule";
import { useTweaks } from "@/lib/tweaks";
import { TOOLS, RISK_LABEL, RISK_COPY, type Tool, type RiskGroup } from "@/lib/fixtures";

interface Pillar {
  key: string;
  label: string;
  copy: string;
  tools: Tool[];
}

export default function LandingPage() {
  const { tweaks } = useTweaks();
  const { hero, grouping, pillarCount, density } = tweaks;

  const groupedByRisk: Pillar[] = useMemo(
    () =>
      (["reg", "op", "rep"] as Exclude<RiskGroup, "cont">[]).map((r) => ({
        key: r,
        label: RISK_LABEL[r],
        copy: RISK_COPY[r],
        tools: TOOLS.filter((t) => t.riskGroup === r),
      })),
    [],
  );

  const pillars: Pillar[] =
    pillarCount === 3
      ? groupedByRisk
      : pillarCount === 4
        ? [
            {
              key: "sc",
              label: "Supply Chain",
              copy: "Sourcing transparency, CSRD, UFLPA.",
              tools: TOOLS.filter((t) => ["supply", "domestic"].includes(t.key)),
            },
            {
              key: "co",
              label: "Checkout",
              copy: "Cross-origin payment iframes.",
              tools: TOOLS.filter((t) => t.key === "checkout"),
            },
            {
              key: "ax",
              label: "Accessibility",
              copy: "WCAG 2.2 AA / EAA exposure.",
              tools: TOOLS.filter((t) => ["checkout", "ai"].includes(t.key)).slice(0, 1),
            },
            {
              key: "ag",
              label: "AI Agents",
              copy: "Agentic readiness across the funnel.",
              tools: TOOLS.filter((t) => ["ai", "ground"].includes(t.key)),
            },
          ]
        : [
            ...groupedByRisk,
            {
              key: "dev",
              label: "Developer",
              copy: "MCP + REST API for agent workflows.",
              tools: TOOLS.filter((t) => t.key === "ai"),
            },
            {
              key: "audit",
              label: "Auditor",
              copy: "Evidence-grade exports for boards.",
              tools: TOOLS.filter((t) => t.key === "ground"),
            },
          ];

  return (
    <div className={`artboard ${density === "dense" ? "dense" : "sparse"}`}>
      <TopNav active="landing" />

      <main id="main">
        {/* Hero */}
        <section
          className="vh-section"
          style={{ padding: density === "dense" ? "32px 56px 24px" : "56px 56px 36px" }}
        >
          <div style={{ maxWidth: 1080, margin: "0 auto" }}>
            <div className="meta-strip" style={{ marginBottom: 20 }}>
              <span style={{ color: "var(--text)", fontWeight: 600 }}>RENEW ECOME LLC</span>
              <span aria-hidden style={{ opacity: 0.4 }}>/</span>
              <span>
                <span className="swatch" style={{ background: "var(--risk-reg)" }} aria-hidden />
                Regulatory
              </span>
              <span>
                <span className="swatch" style={{ background: "var(--risk-op)" }} aria-hidden />
                Operational
              </span>
              <span>
                <span className="swatch" style={{ background: "var(--risk-rep)" }} aria-hidden />
                Reputational
              </span>
              <span style={{ marginLeft: "auto" }}>FY26 · {TOOLS.length} TOOLS · ONE AUDIT</span>
            </div>

            {hero === "scan" ? <ScanFirstHero /> : hero === "product" ? <ProductLedHero /> : <EditorialHero />}
          </div>
        </section>

        <SectionRule />

        {/* Risk-grouped tools matrix */}
        <section
          className="vh-section"
          style={{ padding: density === "dense" ? "24px 56px 28px" : "44px 56px 48px" }}
          aria-labelledby="pillars-heading"
        >
          <div style={{ maxWidth: 1080, margin: "0 auto" }}>
            <div className="row between itemsCenter" style={{ marginBottom: 18 }}>
              <div>
                <Eyebrow>
                  {grouping === "risk" ? "Grouped by exposure" : "Grouped by buyer"}
                </Eyebrow>
                <h2
                  id="pillars-heading"
                  className="headline"
                  style={{ fontSize: density === "dense" ? 22 : 28, marginTop: 4, marginBottom: 0 }}
                >
                  {grouping === "risk" ? (
                    <>
                      Three kinds of risk. <em>One audit surface.</em>
                    </>
                  ) : (
                    <>
                      Built for the people <em>who own the line.</em>
                    </>
                  )}
                </h2>
              </div>
              <div className="row gap-2">
                <span className="kbd">↑↓</span>
                <MonoCall>switch view</MonoCall>
              </div>
            </div>

            <div className="col stack-lg" style={{ gap: density === "dense" ? 14 : 22 }}>
              {pillars.map((p) => (
                <PillarRow key={p.key} pillar={p} />
              ))}
            </div>
          </div>
        </section>

        <SectionRule />

        {/* Featured flagship — patent pending dark block */}
        <section
          style={{ background: "var(--bg-deep)", color: "var(--text-onDeep)" }}
          aria-labelledby="methodology-heading"
        >
          <div
            className="vh-section"
            style={{ padding: density === "dense" ? "32px 56px" : "52px 56px" }}
          >
            <div style={{ maxWidth: 1080, margin: "0 auto" }}>
              <FeaturedFlagship />
            </div>
          </div>
        </section>

        {/* Trust strip */}
        <section
          style={{
            padding: "18px 56px",
            background: "var(--bg-raised)",
            borderTop: "1px solid var(--line-c)",
            borderBottom: "1px solid var(--line-c)",
          }}
          aria-label="Trust"
        >
          <div
            style={{ maxWidth: 1080, margin: "0 auto" }}
            className="row gap-6 itemsCenter"
          >
            <MonoCall>~60 sec scan</MonoCall>
            <MonoCall>· no card</MonoCall>
            <MonoCall>· PII auto-redacted</MonoCall>
            <MonoCall>· US processing</MonoCall>
            <MonoCall>· evidence exports</MonoCall>
            <span className="grow" />
            <MonoCall>Patent pending · methodology</MonoCall>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

/* ── hero variants ─────────────────────────────────────────────── */

function EditorialHero() {
  return (
    <>
      <h1
        className="headline"
        style={{ fontSize: 56, lineHeight: 1.05, margin: "4px 0 18px", maxWidth: 920 }}
      >
        The compliance chain runs from the <em>factory floor</em> to the
        <em> AI Mode checkout.</em> One audit watches the whole line.
      </h1>
      <p
        style={{
          fontSize: 16,
          color: "var(--text-soft)",
          maxWidth: 720,
          lineHeight: 1.55,
          marginBottom: 24,
        }}
      >
        DigitalContinuity is the operations layer for compliance teams shipping into a regulated,
        agentic, post-EAA market. SmarterTariff — our flagship checkout scanner — leads. Six more
        tools follow the same chain.
      </p>
      <div className="row gap-3 itemsCenter" style={{ flexWrap: "wrap" }}>
        <Btn variant="primary">Open the platform →</Btn>
        <Btn variant="ghost">See SmarterTariff in action</Btn>
        <MonoCall>· No card. Free first scan.</MonoCall>
      </div>
    </>
  );
}

function ScanFirstHero() {
  return (
    <>
      <Eyebrow style={{ marginBottom: 8 }}>Run the audit</Eyebrow>
      <h1
        className="headline"
        style={{ fontSize: 40, lineHeight: 1.08, margin: "0 0 20px", maxWidth: 820 }}
      >
        Paste a URL. Get a <em>full-chain</em> compliance read in 30 seconds.
      </h1>
      <div
        className="card"
        style={{
          padding: 8,
          display: "flex",
          alignItems: "center",
          gap: 8,
          maxWidth: 720,
          boxShadow: "0 1px 0 var(--line-c)",
        }}
      >
        <MonoCall>https://</MonoCall>
        <span
          style={{
            flex: 1,
            padding: "10px 0",
            fontFamily: "var(--font-mono)",
            fontSize: 14,
            color: "var(--text)",
          }}
        >
          checkout.example-store.com
          <span className="cursor" aria-hidden>
            |
          </span>
        </span>
        <Btn variant="accent">Scan</Btn>
      </div>
      <div className="row gap-4 itemsCenter" style={{ marginTop: 14, flexWrap: "wrap" }}>
        <div className="row gap-2 itemsCenter">
          <span className="dot" style={{ background: "var(--risk-reg-bg)" }} aria-hidden />
          <MonoCall>EAA · WCAG 2.2 AA</MonoCall>
        </div>
        <div className="row gap-2 itemsCenter">
          <span className="dot" style={{ background: "var(--risk-op-bg)" }} aria-hidden />
          <MonoCall>Stripe / PayPal / Adyen iframe</MonoCall>
        </div>
        <div className="row gap-2 itemsCenter">
          <span className="dot" style={{ background: "var(--risk-rep-bg)" }} aria-hidden />
          <MonoCall>Agent readiness</MonoCall>
        </div>
      </div>
    </>
  );
}

function ProductLedHero() {
  return (
    <div className="row gap-6" style={{ alignItems: "flex-start", flexWrap: "wrap" }}>
      <div style={{ flex: "1 1 50%", minWidth: 320 }}>
        <div className="row gap-2 itemsCenter" style={{ marginBottom: 10, flexWrap: "wrap" }}>
          <Pill tone="reg">One scan · 4 dimensions</Pill>
          <MonoCall>checkout is the entry point</MonoCall>
        </div>
        <h1 className="headline" style={{ fontSize: 38, lineHeight: 1.08, margin: "0 0 14px" }}>
          Stop paying the <em>self-imposed tariff.</em>
          <br />
          Supply chain, checkout, accessibility, and AI readiness — one free scan.
        </h1>
        <p
          style={{
            fontSize: 14,
            color: "var(--text-soft)",
            maxWidth: 520,
            lineHeight: 1.6,
            marginBottom: 14,
          }}
        >
          One pass returns Checkout · Supply Chain · Domestic Sourcing · GroundTruth — scored
          together (cap 95, methodology pending) with this week's P1/P2 priorities. AI shopping
          agents read your DOM the way screen readers do: every WCAG 2.2 / EAA fix is also an
          agentic commerce fix.
        </p>
        <div className="row gap-2 itemsCenter" style={{ marginBottom: 16, flexWrap: "wrap" }}>
          <Pill tone="reg">WCAG 2.2 AA · EAA</Pill>
          <Pill tone="reg">CSRD · CSDDD · UFLPA · EUDR</Pill>
          <Pill tone="op">Payment iframe · MoR</Pill>
          <Pill tone="rep">Agent readiness</Pill>
        </div>
        <div className="row gap-3 itemsCenter" style={{ flexWrap: "wrap" }}>
          <Btn variant="accent">Run a free scan →</Btn>
          <Btn variant="ghost">See sample report</Btn>
          <MonoCall>· ~60 sec · no card · PII auto-redacted · US processing</MonoCall>
        </div>
      </div>
      <div style={{ flex: "1 1 45%", minWidth: 320 }}>
        <DashboardPreview compact />
      </div>
    </div>
  );
}

/* ── pillar row ───────────────────────────────────────────────── */

function PillarRow({ pillar }: { pillar: Pillar }) {
  const tone =
    pillar.key === "reg" ? "reg" : pillar.key === "op" ? "op" : pillar.key === "rep" ? "rep" : null;
  return (
    <div className="row gap-5" style={{ alignItems: "stretch", flexWrap: "wrap" }}>
      <div style={{ flex: "0 0 220px", padding: "4px 0" }}>
        <div className="row gap-2 itemsCenter" style={{ marginBottom: 6 }}>
          {tone && (
            <span
              className="swatch"
              aria-hidden
              style={{
                background: `var(--risk-${tone})`,
                width: 10,
                height: 10,
                borderRadius: 2,
              }}
            />
          )}
          <Eyebrow>{pillar.label}</Eyebrow>
        </div>
        <div
          className="serif"
          style={{ fontSize: 18, color: "var(--text)", lineHeight: 1.25 }}
        >
          {pillar.copy}
        </div>
      </div>
      <div className="grow row gap-3" style={{ flexWrap: "wrap" }}>
        {pillar.tools.map((t) => (
          <article
            key={t.key}
            className="card card-pad-lg"
            style={{
              flex: "1 1 240px",
              minWidth: 220,
              padding: 14,
              display: "flex",
              gap: 10,
              alignItems: "flex-start",
              cursor: "pointer",
              position: "relative",
            }}
          >
            <ToolGlyph t={t} size={28} />
            <div style={{ flex: 1 }}>
              <div className="row between itemsCenter" style={{ marginBottom: 2 }}>
                <h3 style={{ fontWeight: 600, fontSize: 13, margin: 0 }}>{t.label}</h3>
                {t.flagship && (
                  <Pill tone="reg" style={{ padding: "1px 6px", fontSize: 9 }}>
                    FLAGSHIP
                  </Pill>
                )}
              </div>
              <MonoCall>{t.oneLiner}</MonoCall>
              <div
                style={{
                  marginTop: 8,
                  fontSize: 11,
                  color: "var(--text-muted)",
                  display: "flex",
                  gap: 10,
                }}
              >
                <span>↗ Open</span>
                <span>· Add to audit</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

/* ── featured flagship (dark block) ───────────────────────────── */

function FeaturedFlagship() {
  return (
    <div className="row gap-8" style={{ alignItems: "flex-start", flexWrap: "wrap" }}>
      <div style={{ flex: "1 1 55%", minWidth: 320 }}>
        <Eyebrow style={{ color: "var(--highlight)", marginBottom: 10 }}>
          Patent pending · proprietary scoring
        </Eyebrow>
        <h2
          id="methodology-heading"
          className="headline"
          style={{
            fontSize: 36,
            lineHeight: 1.1,
            margin: "0 0 16px",
            color: "var(--text-onDeep)",
          }}
        >
          AI agents shop the way <em style={{ color: "var(--highlight)" }}>screen readers do.</em>{" "}
          If your checkout blocks one, it blocks the other.
        </h2>
        <p
          style={{
            fontSize: 14,
            color: "var(--text-onDeep)",
            opacity: 0.88,
            maxWidth: 540,
            lineHeight: 1.6,
            marginBottom: 14,
          }}
        >
          The Checkout Audit reads DOM structure, form labels, and button semantics — the same
          surface OpenAI Operator, Google Commerce, and Anthropic MCP rely on to complete a
          purchase. Every WCAG 2.2 / EAA fix is simultaneously an agentic commerce fix.
        </p>
        <p
          className="mono-call"
          style={{
            fontSize: 11,
            color: "var(--text-onDeep-muted)",
            maxWidth: 540,
            marginBottom: 18,
            lineHeight: 1.6,
          }}
        >
          Scores cap at 95 per our methodology ceiling · proprietary to Renew EcoMe LLC · See
          /legal/how-we-scan
        </p>
        <div className="row gap-3" style={{ flexWrap: "wrap" }}>
          <Btn variant="accent">Run a free Checkout scan</Btn>
          <Btn
            variant="ghost"
            style={{
              borderColor: "var(--text-onDeep-muted)",
              color: "var(--text-onDeep)",
            }}
          >
            How we scan
          </Btn>
        </div>
        <div
          className="row gap-2 itemsCenter"
          style={{ marginTop: 18, flexWrap: "wrap" }}
        >
          {[
            "OpenAI Operator",
            "Google Commerce",
            "Anthropic MCP",
            "Mastercard Agent Pay",
            "PayPal Agent Ready",
            "JAWS / NVDA",
          ].map((p) => (
            <span
              key={p}
              className="pill"
              style={{
                borderColor: "var(--text-onDeep-muted)",
                color: "var(--text-onDeep)",
                background: "transparent",
                fontSize: 9,
              }}
            >
              {p}
            </span>
          ))}
        </div>
      </div>
      <div style={{ flex: "1 1 40%", minWidth: 320 }}>
        <DashboardPreview onDark />
      </div>
    </div>
  );
}

/* ── compact dashboard preview ───────────────────────────────── */

function DashboardPreview({ compact, onDark }: { compact?: boolean; onDark?: boolean }) {
  const bg = onDark ? "rgba(247,244,236,0.04)" : "var(--bg-card)";
  const border = onDark ? "var(--text-onDeep-muted)" : "var(--line-c)";
  const text = onDark ? "var(--text-onDeep)" : "var(--text)";
  const muted = onDark ? "var(--text-onDeep-muted)" : "var(--text-muted)";
  return (
    <div
      style={{
        background: bg,
        border: `1px solid ${border}`,
        borderRadius: 12,
        overflow: "hidden",
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        color: text,
      }}
    >
      <div
        className="row between itemsCenter"
        style={{ padding: "10px 14px", borderBottom: `1px solid ${border}` }}
      >
        <span style={{ color: muted, letterSpacing: "0.06em" }}>scan: walmart.com</span>
        <span style={{ color: onDark ? "var(--highlight)" : "var(--accent)" }}>● MONITOR</span>
      </div>
      <div style={{ padding: "14px" }}>
        <div
          className="row gap-3 itemsCenter"
          style={{
            marginBottom: 12,
            padding: "10px 12px",
            background: onDark
              ? "rgba(201,89,29,0.15)"
              : "color-mix(in srgb, var(--accent) 8%, transparent)",
            borderRadius: 6,
            border: `1px dashed ${onDark ? "var(--text-onDeep-muted)" : "color-mix(in srgb, var(--accent) 25%, transparent)"}`,
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: 30,
                lineHeight: 1,
                color: text,
              }}
            >
              25
              <span style={{ fontSize: 14, color: muted }}>/95</span>
            </div>
            <div
              style={{
                fontSize: 9,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginTop: 4,
                color: muted,
              }}
            >
              Agentic Commerce Readiness · CRITICAL
            </div>
          </div>
          <div className="grow" />
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 10, color: muted }}>24 issues · 4/4 dimensions · SDG 2/17</div>
            <div style={{ fontSize: 9, color: muted, marginTop: 2 }}>
              scanned · +new since last
            </div>
          </div>
        </div>
        <div className="row gap-2" style={{ marginBottom: 12 }}>
          <ScoreTile label="Checkout" v="4" tone="op" onDark={onDark} />
          <ScoreTile label="Supply" v="5" tone="reg" onDark={onDark} />
          <ScoreTile label="Domestic" v="10" tone="reg" onDark={onDark} />
          <ScoreTile label="GroundTruth" v="5" tone="rep" onDark={onDark} />
        </div>
        <div
          style={{
            color: muted,
            fontSize: 10,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: 6,
          }}
        >
          This week's priorities
        </div>
        <DataLine k="P1 · 4 checkout a11y violations" v="agent blocked" onDark={onDark} tone="op" />
        <DataLine k="P1 · 5 supply chain reg gaps" v="UFLPA / CSRD" onDark={onDark} tone="reg" />
        <DataLine k="P2 · Domestic sourcing" v="EO exposure" onDark={onDark} tone="reg" />
        {!compact && <DataLine k="TOS Confidence" v="100% risk" onDark={onDark} tone="rep" />}
      </div>
    </div>
  );
}

function ScoreTile({
  label,
  v,
  tone,
  onDark,
}: {
  label: string;
  v: string;
  tone: "reg" | "op" | "rep";
  onDark?: boolean;
}) {
  const c =
    tone === "op" ? "var(--risk-op)" : tone === "reg" ? "var(--risk-reg)" : "var(--risk-rep)";
  return (
    <div
      style={{
        flex: 1,
        padding: "10px 12px",
        background: onDark ? "rgba(247,244,236,0.04)" : "var(--bg-raised)",
        borderRadius: 6,
        borderLeft: `2px solid ${c}`,
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: 22,
          lineHeight: 1,
          color: onDark ? "var(--text-onDeep)" : "var(--text)",
        }}
      >
        {v}
      </div>
      <div
        style={{
          fontSize: 9,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          marginTop: 4,
          color: onDark ? "var(--text-onDeep-muted)" : "var(--text-muted)",
        }}
      >
        {label}
      </div>
    </div>
  );
}

function DataLine({
  k,
  v,
  tone,
  onDark,
}: {
  k: string;
  v: string;
  tone: "reg" | "op" | "rep";
  onDark?: boolean;
}) {
  const c =
    tone === "op" ? "var(--risk-op)" : tone === "reg" ? "var(--risk-reg)" : "var(--risk-rep)";
  return (
    <div
      className="row between itemsCenter"
      style={{
        padding: "5px 0",
        borderTop: `1px dashed ${onDark ? "rgba(247,244,236,0.10)" : "var(--line-c)"}`,
      }}
    >
      <span>
        <span
          aria-hidden
          style={{
            display: "inline-block",
            width: 6,
            height: 6,
            borderRadius: 2,
            background: c,
            marginRight: 8,
            verticalAlign: "middle",
          }}
        />
        {k}
      </span>
      <span style={{ color: onDark ? "var(--text-onDeep-muted)" : "var(--text-muted)" }}>{v}</span>
    </div>
  );
}
