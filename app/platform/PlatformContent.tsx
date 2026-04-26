"use client";

import { useEffect, useRef, useState } from "react";
import { TopNav } from "@/components/shared/TopNav";
import { Footer } from "@/components/shared/Footer";
import { Btn } from "@/components/ui/Btn";
import { Pill } from "@/components/ui/Pill";
import { ToolGlyph } from "@/components/ui/ToolGlyph";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MonoCall } from "@/components/ui/MonoCall";
import { SectionRule } from "@/components/ui/SectionRule";
import { useTweaks } from "@/lib/tweaks";
import { TOOLS, type ToolKey } from "@/lib/fixtures";

interface MegaGroup {
  label: string;
  copy: string;
  tools: ToolKey[];
}

export default function PlatformPage() {
  const { tweaks } = useTweaks();
  const { grouping, density } = tweaks;

  const [megaOpen, setMegaOpen] = useState(true);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!megaOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setMegaOpen(false);
        triggerRef.current?.focus();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [megaOpen]);

  const groups: MegaGroup[] =
    grouping === "buyer"
      ? [
          {
            label: "For E-commerce",
            copy: "Stop losing carts to invisible failures.",
            tools: ["checkout", "domestic", "ai"],
          },
          {
            label: "For Compliance",
            copy: "Evidence on demand for EAA, UFLPA, ADA.",
            tools: ["supply", "ground", "checkout"],
          },
          {
            label: "For DevOps & Agents",
            copy: "MCP, REST, CI/CD wired in.",
            tools: ["ai", "logistics", "disaster"],
          },
        ]
      : [
          {
            label: "Regulatory",
            copy: "Lines that, if crossed, become fines.",
            tools: ["checkout", "supply", "domestic", "ground"],
          },
          {
            label: "Operational",
            copy: "Lines that, if crossed, halt revenue.",
            tools: ["logistics", "disaster"],
          },
          {
            label: "Reputational",
            copy: "Lines that, if crossed, erode trust.",
            tools: ["ai", "ground"],
          },
        ];

  const tool = (k: ToolKey) => TOOLS.find((t) => t.key === k)!;

  return (
    <div className={`artboard ${density === "dense" ? "dense" : "sparse"}`}>
      <TopNav active="platform" showMegaIndicator />

      <button
        ref={triggerRef}
        type="button"
        aria-expanded={megaOpen}
        aria-controls="platform-megamenu"
        onClick={() => setMegaOpen((v) => !v)}
        style={{ position: "absolute", left: -9999, top: 0 }}
      >
        Toggle platform menu
      </button>

      <main id="main">
        {megaOpen && (
          <section style={{ position: "relative" }} id="platform-megamenu" aria-label="Platform menu">
            <div
              aria-hidden
              style={{
                position: "absolute",
                left: 24,
                top: -1,
                width: 14,
                height: 14,
                transform: "rotate(45deg)",
                background: "var(--bg-card)",
                borderTop: "1px solid var(--line-c)",
                borderLeft: "1px solid var(--line-c)",
              }}
            />
            <div
              className="card"
              style={{
                margin: "8px 24px 0",
                padding: density === "dense" ? 18 : 26,
                borderRadius: 12,
              }}
            >
              <div className="row between itemsCenter" style={{ marginBottom: 14, flexWrap: "wrap", gap: 12 }}>
                <div>
                  <Eyebrow>Platform · {TOOLS.length} tools</Eyebrow>
                  <h1 className="serif" style={{ fontSize: 22, marginTop: 4, marginBottom: 0 }}>
                    One scan. Three kinds of risk.{" "}
                    <em style={{ color: "var(--accent)" }}>Seven tools.</em>
                  </h1>
                </div>
                <div className="row gap-3 itemsCenter">
                  <span className="kbd">⌘K</span>
                  <MonoCall>Jump to a tool</MonoCall>
                  <Btn variant="ghost" onClick={() => setMegaOpen(false)} ariaLabel="Close menu">
                    Esc
                  </Btn>
                </div>
              </div>

              <div className="row gap-4" style={{ alignItems: "flex-start", flexWrap: "wrap" }}>
                {groups.map((g, gi) => {
                  const tone =
                    g.label === "Regulatory"
                      ? "reg"
                      : g.label === "Operational"
                        ? "op"
                        : g.label === "Reputational"
                          ? "rep"
                          : null;
                  return (
                    <div
                      key={g.label}
                      style={{
                        flex: "1 1 220px",
                        padding: "8px 12px",
                        borderRight:
                          gi < groups.length - 1 ? "1px solid var(--line-c)" : "none",
                      }}
                    >
                      <div className="row gap-2 itemsCenter" style={{ marginBottom: 6 }}>
                        {tone && (
                          <span
                            className="swatch"
                            aria-hidden
                            style={{
                              background: `var(--risk-${tone})`,
                              width: 9,
                              height: 9,
                              borderRadius: 2,
                            }}
                          />
                        )}
                        <Eyebrow>{g.label}</Eyebrow>
                      </div>
                      <div
                        className="serif"
                        style={{
                          fontSize: 14,
                          color: "var(--text-soft)",
                          marginBottom: 12,
                          lineHeight: 1.35,
                        }}
                      >
                        {g.copy}
                      </div>
                      <div className="col gap-2">
                        {g.tools.map((k) => {
                          const t = tool(k);
                          return (
                            <a
                              key={k}
                              href="/app"
                              className="row gap-2 itemsCenter"
                              style={{
                                padding: "6px 8px",
                                borderRadius: 6,
                                cursor: "pointer",
                                background: t.flagship
                                  ? "color-mix(in srgb, var(--accent) 8%, transparent)"
                                  : "transparent",
                                textDecoration: "none",
                                color: "inherit",
                              }}
                            >
                              <ToolGlyph t={t} size={22} />
                              <div style={{ flex: 1 }}>
                                <div className="row gap-2 itemsCenter">
                                  <span
                                    style={{
                                      fontWeight: t.flagship ? 600 : 500,
                                      fontSize: 13,
                                    }}
                                  >
                                    {t.label}
                                  </span>
                                  {t.flagship && (
                                    <Pill
                                      tone="reg"
                                      style={{ padding: "0px 5px", fontSize: 8, lineHeight: 1.6 }}
                                    >
                                      FLAGSHIP
                                    </Pill>
                                  )}
                                </div>
                                <MonoCall size="sm">{t.oneLiner}</MonoCall>
                              </div>
                              <span aria-hidden style={{ color: "var(--text-muted)", fontSize: 11 }}>
                                ↗
                              </span>
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              <SectionRule style={{ margin: "16px 0 12px" }} />
              <div
                className="row between itemsCenter"
                style={{ fontSize: 11, color: "var(--text-muted)", flexWrap: "wrap", gap: 12 }}
              >
                <div className="row gap-4">
                  <span>↗ All tools</span>
                  <span>↗ Compare plans</span>
                  <span>↗ Methodology brief</span>
                </div>
                <div className="row gap-2 itemsCenter">
                  <span aria-hidden className="dot" style={{ background: "var(--accent-2)" }} />
                  <MonoCall>Single Stripe billing across the platform</MonoCall>
                </div>
              </div>
            </div>
          </section>
        )}

        <section
          className="vh-section"
          style={{
            padding: density === "dense" ? "24px 24px 28px" : "44px 24px 56px",
            marginTop: 8,
          }}
          aria-labelledby="sitemap-heading"
        >
          <div style={{ maxWidth: 1080, margin: "0 auto" }}>
            <div className="meta-strip" style={{ marginBottom: 16 }}>
              <span>SITEMAP / IA PROPOSAL</span>
              <span style={{ marginLeft: "auto" }}>v3 · consolidated</span>
            </div>
            <h2
              id="sitemap-heading"
              className="headline"
              style={{ fontSize: 30, lineHeight: 1.1, marginBottom: 18 }}
            >
              From {TOOLS.length} flat tabs to{" "}
              <em>one platform with a clear chain of command.</em>
            </h2>

            <div className="row gap-4" style={{ alignItems: "stretch", flexWrap: "wrap" }}>
              <div className="card" style={{ flex: "1 1 320px", padding: 16 }}>
                <Eyebrow style={{ marginBottom: 8 }}>Before · today</Eyebrow>
                <div className="col gap-1">
                  {TOOLS.map((t) => (
                    <div
                      key={t.key}
                      className="row gap-2 itemsCenter"
                      style={{
                        padding: "5px 0",
                        borderBottom: "1px dashed var(--line-c)",
                        fontSize: 12,
                      }}
                    >
                      <span className="mono-call" style={{ width: 14 }}>
                        —
                      </span>
                      <span>{t.label}</span>
                      <span
                        style={{
                          marginLeft: "auto",
                          color: "var(--text-muted)",
                          fontSize: 10,
                        }}
                      >
                        flat
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div
                className="card"
                style={{ flex: "1 1 460px", padding: 16, borderColor: "var(--accent)" }}
              >
                <Eyebrow style={{ marginBottom: 8, color: "var(--accent)" }}>
                  After · proposal
                </Eyebrow>
                {groups.map((g) => {
                  const tone =
                    g.label === "Regulatory"
                      ? "reg"
                      : g.label === "Operational"
                        ? "op"
                        : g.label === "Reputational"
                          ? "rep"
                          : null;
                  return (
                    <div key={g.label} style={{ marginBottom: 10 }}>
                      <div className="row gap-2 itemsCenter" style={{ marginBottom: 4 }}>
                        {tone && (
                          <span
                            className="swatch"
                            aria-hidden
                            style={{
                              background: `var(--risk-${tone})`,
                              width: 8,
                              height: 8,
                              borderRadius: 2,
                            }}
                          />
                        )}
                        <span style={{ fontSize: 11, fontWeight: 600, color: "var(--text)" }}>
                          {g.label}
                        </span>
                      </div>
                      <div style={{ paddingLeft: 14 }}>
                        {g.tools.map((k) => {
                          const t = tool(k);
                          return (
                            <div
                              key={k}
                              className="row gap-2 itemsCenter"
                              style={{ padding: "3px 0", fontSize: 12 }}
                            >
                              <ToolGlyph t={t} size={14} />
                              <span style={{ fontWeight: t.flagship ? 600 : 400 }}>
                                {t.label}
                              </span>
                              {t.flagship && (
                                <Pill tone="reg" style={{ padding: "0px 5px", fontSize: 8 }}>
                                  FLAGSHIP
                                </Pill>
                              )}
                              <span
                                style={{
                                  marginLeft: "auto",
                                  color: "var(--text-muted)",
                                  fontSize: 10,
                                }}
                              >
                                {t.oneLiner}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
