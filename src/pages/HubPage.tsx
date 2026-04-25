import { useEffect, useMemo, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { Btn } from "@/components/atoms/Btn";
import { Pill } from "@/components/atoms/Pill";
import { ToolGlyph } from "@/components/atoms/ToolGlyph";
import { Eyebrow } from "@/components/atoms/Eyebrow";
import { MonoCall } from "@/components/atoms/MonoCall";
import { ScoreBar } from "@/components/atoms/ScoreBar";
import { ThemeSwitcher } from "@/components/atoms/ThemeSwitcher";
import { UnifiedScanCard } from "@/components/UnifiedScanCard";
import { useTweaks } from "@/lib/tweaks";
import {
  TOOLS,
  HUB_TOOL_STATS,
  HUB_DIMENSION_ROWS,
  TOOL_FIXTURES,
  PLAN,
  ACCOUNT,
  type ToolKey,
  type Tool,
  type ToolFixture,
} from "@/lib/fixtures";

const TOOL_KEYS: ToolKey[] = TOOLS.map((t) => t.key);

function isToolKey(v: string | null | undefined): v is ToolKey {
  return v != null && (TOOL_KEYS as string[]).includes(v);
}

export default function HubPage() {
  const { tweaks } = useTweaks();
  const { brandProminence, density } = tweaks;
  const [searchParams, setSearchParams] = useSearchParams();

  const activeFromUrl = searchParams.get("tool");
  const active: ToolKey = isToolKey(activeFromUrl) ? activeFromUrl : "checkout";
  const tool = TOOLS.find((t) => t.key === active)!;
  const fixture = TOOL_FIXTURES[active];

  const setActive = (key: ToolKey) => {
    const next = new URLSearchParams(searchParams);
    next.set("tool", key);
    setSearchParams(next, { replace: false });
  };

  // Keyboard arrow navigation across the sidebar tool list (when focus is on a side-item)
  const sidebarRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const el = sidebarRef.current;
    if (!el) return;
    function onKey(e: KeyboardEvent) {
      if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
      const target = document.activeElement;
      if (!target || !(target instanceof HTMLElement)) return;
      if (!el!.contains(target)) return;
      if (!target.dataset.toolKey) return;
      e.preventDefault();
      const idx = TOOL_KEYS.indexOf(target.dataset.toolKey as ToolKey);
      if (idx === -1) return;
      const nextIdx =
        e.key === "ArrowDown"
          ? (idx + 1) % TOOL_KEYS.length
          : (idx - 1 + TOOL_KEYS.length) % TOOL_KEYS.length;
      const nextKey = TOOL_KEYS[nextIdx];
      const nextEl = el!.querySelector<HTMLElement>(`[data-tool-key="${nextKey}"]`);
      nextEl?.focus();
      setActive(nextKey);
    }
    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setActive]);

  const lockup =
    brandProminence === "st-only" ? (
      <span className="brand serif" style={{ fontSize: 14 }}>
        SmarterTariff
      </span>
    ) : (
      <>
        <span className="brand serif" style={{ fontSize: 14 }}>
          DigitalContinuity
        </span>
        {brandProminence !== "dc-only" && (
          <span style={{ fontSize: 11, color: "var(--text-muted)" }}>.ai</span>
        )}
      </>
    );

  return (
    <div
      className={`artboard ${density === "dense" ? "dense" : "sparse"}`}
      style={{ display: "flex", flexDirection: "column", flex: 1 }}
    >
      <header
        style={{
          height: 44,
          borderBottom: "1px solid var(--line-c)",
          padding: "0 16px",
          display: "flex",
          alignItems: "center",
          gap: 14,
          background: "var(--bg)",
        }}
      >
        <a href="/" className="lockup" style={{ textDecoration: "none" }}>
          <span className="dc-mark" style={{ width: 18, height: 18 }} aria-hidden />
          {lockup}
        </a>
        <span aria-hidden style={{ margin: "0 6px", color: "var(--line-strong-c)" }}>
          /
        </span>
        <div className="row gap-2 itemsCenter">
          <ToolGlyph t={tool} size={16} />
          <span style={{ fontSize: 13, fontWeight: 500 }}>{tool.label}</span>
        </div>
        <div className="grow" />
        <div className="row gap-3 itemsCenter">
          <ThemeSwitcher />
          <span className="kbd">⌘K</span>
          <MonoCall>Search anything</MonoCall>
          <span aria-hidden style={{ width: 1, height: 18, background: "var(--line-c)" }} />
          <MonoCall>org · renewecome</MonoCall>
          <span
            aria-label={`Account ${ACCOUNT.initials}`}
            style={{
              width: 24,
              height: 24,
              borderRadius: "50%",
              background: "var(--accent-2)",
              color: "var(--text-onDeep)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 11,
              fontWeight: 600,
            }}
          >
            {ACCOUNT.initials}
          </span>
        </div>
      </header>

      <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
        <aside ref={sidebarRef} className="sidebar" aria-label="App navigation">
          <div
            style={{
              margin: "0 12px 14px",
              padding: "12px 12px 14px",
              background: "var(--bg-card)",
              border: "1px solid var(--line-c)",
              borderRadius: 8,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              aria-hidden
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(135deg, color-mix(in srgb, var(--accent) 10%, transparent), transparent 60%)",
                pointerEvents: "none",
              }}
            />
            <div
              className="mono-call"
              style={{
                fontSize: 9,
                letterSpacing: "0.14em",
                color: "var(--accent)",
                marginBottom: 6,
              }}
            >
              ★ THE ENTRY POINT
            </div>
            <div
              className="serif"
              style={{ fontSize: 14, lineHeight: 1.2, color: "var(--text)", marginBottom: 6 }}
            >
              One scan. <em style={{ color: "var(--accent)" }}>One surface.</em>
            </div>
            <div
              className="mono-call"
              style={{ fontSize: 10, lineHeight: 1.4, color: "var(--text-soft)" }}
            >
              Checkout fires all 7 audits in a single pass.
            </div>
          </div>

          <button type="button" className="side-item" style={{ marginBottom: 4 }}>
            <span
              className="side-icon"
              aria-hidden
              style={{ background: "var(--accent)", color: "white", borderColor: "var(--accent)" }}
            >
              ▶
            </span>
            <span style={{ fontWeight: 600 }}>Run {tool.label} scan</span>
            <span className="badge">⌘R</span>
          </button>
          <button type="button" className="side-item">
            <span className="side-icon" aria-hidden>≡</span>
            <span>Recent audits</span>
            <span className="badge">42</span>
          </button>

          <SidebarRiskGroup
            label="Regulatory"
            tone="reg"
            tools={TOOLS.filter((t) => t.riskGroup === "reg")}
            active={active}
            setActive={setActive}
          />
          <SidebarRiskGroup
            label="Operational"
            tone="op"
            tools={TOOLS.filter((t) => t.riskGroup === "op")}
            active={active}
            setActive={setActive}
          />
          <SidebarRiskGroup
            label="Reputational"
            tone="rep"
            tools={TOOLS.filter((t) => t.riskGroup === "rep")}
            active={active}
            setActive={setActive}
          />

          <PlanFooter />
        </aside>

        <main
          id="main"
          style={{
            flex: 1,
            padding: density === "dense" ? "16px 22px" : "26px 32px",
            overflow: "auto",
            transition: "opacity 150ms ease-out",
          }}
          key={active}
        >
          <div className="row between itemsCenter" style={{ marginBottom: 14, flexWrap: "wrap", gap: 12 }}>
            <div className="row gap-2 itemsCenter">
              <ToolGlyph t={tool} size={26} />
              <div>
                <h1 className="serif" style={{ fontSize: 20, lineHeight: 1.1, margin: 0 }}>
                  {tool.label}{" "}
                  <span
                    style={{
                      fontSize: 11,
                      color: "var(--text-muted)",
                      fontFamily: "var(--font-mono)",
                      letterSpacing: "0.04em",
                      marginLeft: 6,
                    }}
                  >
                    · entry point
                  </span>
                </h1>
                <MonoCall>{fixture.oneLiner} — fires all 7 audits in one pass</MonoCall>
              </div>
            </div>
            <div className="row gap-2">
              <Btn variant="ghost">Export PDF</Btn>
              <Btn variant="ghost">Share report</Btn>
              <Btn variant="accent">Run free scan →</Btn>
            </div>
          </div>

          <div
            className="card"
            style={{
              padding: "12px 16px",
              marginBottom: 14,
              background:
                "linear-gradient(180deg, color-mix(in srgb, var(--accent) 6%, transparent), transparent)",
              borderColor: "color-mix(in srgb, var(--accent) 25%, var(--line-c))",
            }}
          >
            <div className="row gap-4 itemsCenter" style={{ flexWrap: "wrap" }}>
              <div style={{ flex: "0 0 auto" }}>
                <div
                  className="mono-call"
                  style={{ fontSize: 9, color: "var(--accent)", marginBottom: 2 }}
                >
                  ★ WHY {tool.label.toUpperCase()}
                </div>
                <div className="serif" style={{ fontSize: 14, lineHeight: 1.2 }}>
                  {fixture.whyTitle}
                </div>
              </div>
              <div
                style={{
                  flex: 1,
                  fontSize: 11,
                  color: "var(--text-soft)",
                  lineHeight: 1.5,
                  minWidth: 280,
                }}
              >
                {fixture.whyCopy}
              </div>
              <div className="row gap-2" style={{ flex: "0 0 auto" }}>
                <Stat n="7" label="AUDITS" />
                <Stat n="1" label="SCAN" />
                <Stat n="30s" label="RESULT" />
              </div>
            </div>
          </div>

          <UnifiedScanCard tool={tool} fixture={fixture} />

          <div className="row gap-2" style={{ marginBottom: 18, alignItems: "stretch", flexWrap: "wrap" }}>
            {(["reg", "op", "rep"] as const).map((riskKey) => {
              const groupTools = TOOLS.filter((t) => t.riskGroup === riskKey);
              const label =
                riskKey === "reg" ? "Regulatory" : riskKey === "op" ? "Operational" : "Reputational";
              return (
                <div
                  key={riskKey}
                  style={{
                    flex: "1 1 220px",
                    padding: "8px 10px",
                    border: "1px solid var(--line-c)",
                    borderRadius: 8,
                    borderTop: `2px solid var(--risk-${riskKey})`,
                    background: "var(--bg-card)",
                  }}
                >
                  <div
                    className="mono-call"
                    style={{
                      fontSize: 9,
                      letterSpacing: "0.12em",
                      marginBottom: 8,
                      color: `var(--risk-${riskKey})`,
                    }}
                  >
                    {label.toUpperCase()}
                  </div>
                  <div className="row gap-2">
                    {groupTools.map((t) => {
                      const stats = HUB_TOOL_STATS[t.key];
                      return (
                        <button
                          key={t.key}
                          type="button"
                          onClick={() => setActive(t.key)}
                          aria-pressed={t.key === active}
                          style={{
                            flex: 1,
                            opacity: t.key === active ? 1 : 0.78,
                            cursor: "pointer",
                            background: "transparent",
                            border: 0,
                            padding: 0,
                            textAlign: "left",
                            color: "inherit",
                            fontFamily: "inherit",
                          }}
                        >
                          <div className="row between itemsCenter" style={{ marginBottom: 2 }}>
                            <ToolGlyph t={t} size={14} />
                            {t.flagship && (
                              <span
                                aria-label="flagship"
                                style={{ fontSize: 9, color: "var(--accent)" }}
                              >
                                ★
                              </span>
                            )}
                          </div>
                          <div className="row gap-1 itemsCenter" style={{ alignItems: "baseline" }}>
                            <div className="serif" style={{ fontSize: 20, lineHeight: 1 }}>
                              {stats.score}
                            </div>
                            <MonoCall size="sm">/95</MonoCall>
                          </div>
                          <div className="mono-call" style={{ fontSize: 8.5, marginTop: 3 }}>
                            {t.label.split(" ")[0]} · {stats.issues} issues
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="row gap-4" style={{ alignItems: "stretch", flexWrap: "wrap" }}>
            <PrioritiesPanel tool={tool} fixture={fixture} />
            <div className="col gap-3" style={{ flex: "1 1 280px" }}>
              <RiskDimensionsRail />
              <AgenticReadinessCard fixture={fixture} />
              <ProtocolCompatList fixture={fixture} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function SidebarRiskGroup({
  label,
  tone,
  tools,
  active,
  setActive,
}: {
  label: string;
  tone: "reg" | "op" | "rep";
  tools: typeof TOOLS;
  active: ToolKey;
  setActive: (k: ToolKey) => void;
}) {
  return (
    <>
      <div className="side-section-label" style={{ marginTop: 10 }}>
        <span style={{ flex: 1 }}>{label}</span>
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
      </div>
      {tools.map((t) => (
        <button
          key={t.key}
          type="button"
          data-tool-key={t.key}
          className={`side-item ${active === t.key ? "active" : ""}`}
          aria-pressed={active === t.key}
          onClick={() => setActive(t.key)}
        >
          <ToolGlyph t={t} size={18} />
          <span>{t.label}</span>
          {t.flagship && (
            <span
              className="badge"
              aria-label="flagship"
              style={{
                color: "var(--accent)",
                borderColor: "color-mix(in srgb, var(--accent) 35%, transparent)",
              }}
            >
              ★
            </span>
          )}
        </button>
      ))}
    </>
  );
}

function PlanFooter() {
  return (
    <div style={{ marginTop: "auto", padding: "12px 16px", borderTop: "1px solid var(--line-c)" }}>
      <div
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}
      >
        <div className="mono-call" style={{ fontSize: 9, letterSpacing: "0.12em" }}>
          PLAN
        </div>
        <span
          className="mono"
          style={{
            fontSize: 9,
            padding: "2px 6px",
            borderRadius: 3,
            background: "color-mix(in srgb, var(--accent-2) 14%, transparent)",
            color: "var(--accent-2)",
            border: "1px solid color-mix(in srgb, var(--accent-2) 28%, transparent)",
            letterSpacing: "0.10em",
          }}
        >
          {PLAN.tier.toUpperCase()} · {PLAN.status.toUpperCase()}
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 8 }}>
        <span className="serif" style={{ fontSize: 18, lineHeight: 1 }}>
          Unlimited
        </span>
        <span className="mono-call" style={{ fontSize: 9 }}>
          SCANS
        </span>
      </div>
      <div className="mono-call" style={{ fontSize: 10, marginBottom: 12, lineHeight: 1.4 }}>
        {PLAN.features.join(" · ")}
      </div>

      <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
        <Btn
          variant="ghost"
          style={{ flex: 1, fontSize: 10, padding: "5px 8px", justifyContent: "center" }}
        >
          Pricing
        </Btn>
        <Btn
          variant="ghost"
          style={{ flex: 1, fontSize: 10, padding: "5px 8px", justifyContent: "center" }}
        >
          Billing
        </Btn>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "8px 10px",
          background: "color-mix(in srgb, var(--text) 4%, transparent)",
          border: "1px solid var(--line-c)",
          borderRadius: 6,
        }}
      >
        <div
          aria-hidden
          style={{
            width: 22,
            height: 22,
            borderRadius: "50%",
            background:
              "linear-gradient(135deg, #4285f4 0%, #34a853 50%, #fbbc04 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontFamily: "var(--font-serif)",
            fontSize: 11,
            fontWeight: 600,
            flexShrink: 0,
          }}
        >
          {ACCOUNT.initials}
        </div>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div
            style={{
              fontSize: 11,
              lineHeight: 1.1,
              color: "var(--text)",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {ACCOUNT.email}
          </div>
          <div
            className="mono-call"
            style={{ fontSize: 8.5, marginTop: 1, letterSpacing: "0.08em" }}
          >
            GOOGLE · WORKSPACE
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <button
            title="Settings"
            aria-label="Settings"
            style={{
              width: 18,
              height: 14,
              padding: 0,
              background: "transparent",
              border: "none",
              color: "var(--text-muted)",
              cursor: "pointer",
              fontSize: 11,
              lineHeight: 1,
            }}
          >
            ⚙
          </button>
          <button
            title="Sign out"
            aria-label="Sign out"
            style={{
              width: 18,
              height: 14,
              padding: 0,
              background: "transparent",
              border: "none",
              color: "var(--text-muted)",
              cursor: "pointer",
              fontSize: 11,
              lineHeight: 1,
            }}
          >
            ↪
          </button>
        </div>
      </div>
    </div>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div
      style={{
        padding: "6px 10px",
        background: "var(--bg-card)",
        border: "1px solid var(--line-c)",
        borderRadius: 6,
        textAlign: "center",
      }}
    >
      <div className="serif" style={{ fontSize: 18, lineHeight: 1, color: "var(--accent)" }}>
        {n}
      </div>
      <div className="mono-call" style={{ fontSize: 8 }}>
        {label}
      </div>
    </div>
  );
}

function PrioritiesPanel({ tool, fixture }: { tool: Tool; fixture: ToolFixture }) {
  const rows = useMemo(() => fixture.priorities, [fixture]);
  return (
    <section
      className="card"
      style={{ flex: "2 1 460px", padding: 16 }}
      aria-labelledby="priorities-heading"
    >
      <div className="row between itemsCenter" style={{ marginBottom: 10, flexWrap: "wrap", gap: 8 }}>
        <div>
          <Eyebrow>
            <span id="priorities-heading">This week's priorities · {tool.label}</span>
          </Eyebrow>
          <MonoCall size="sm">{rows.length} actionable fixes · ~60 sec rescan</MonoCall>
        </div>
        <div className="row gap-2">
          <Pill>All</Pill>
          <Pill tone="op">P1</Pill>
          <Pill>P2</Pill>
        </div>
      </div>
      {rows.map((row) => (
        <div
          key={row.title}
          className="data-row"
          style={{ gridTemplateColumns: "auto auto 1fr auto auto", gap: 10 }}
        >
          <span
            className="pill"
            style={{
              padding: "1px 6px",
              fontSize: 9,
              color: row.severity === "P1" ? "var(--risk-op)" : "var(--text-muted)",
              borderColor:
                row.severity === "P1"
                  ? "color-mix(in srgb, var(--risk-op) 35%, transparent)"
                  : "var(--line-c)",
            }}
          >
            {row.severity}
          </span>
          <span
            className="swatch"
            aria-hidden
            style={{
              background: `var(--risk-${row.tone})`,
              width: 8,
              height: 8,
              borderRadius: 2,
            }}
          />
          <div>
            <div style={{ fontSize: 12, fontWeight: 500 }}>{row.title}</div>
            <div className="mono-call" style={{ fontSize: 10, marginTop: 1 }}>
              {row.where}
              {row.level !== "—" && ` · Level ${row.level}`}
            </div>
          </div>
          <span className="mono-call" style={{ fontSize: 10 }}>
            How to fix
          </span>
          <span aria-hidden style={{ color: "var(--text-muted)", fontSize: 11 }}>
            ↗
          </span>
        </div>
      ))}
    </section>
  );
}

function RiskDimensionsRail() {
  return (
    <section className="card" style={{ padding: 14 }} aria-labelledby="dimensions-heading">
      <Eyebrow style={{ marginBottom: 8 }}>
        <span id="dimensions-heading">Risk dimensions · 4/4 covered</span>
      </Eyebrow>
      <div className="col gap-2">
        {HUB_DIMENSION_ROWS.map((row) => (
          <div key={row.label}>
            <div className="row between" style={{ fontSize: 11, marginBottom: 3 }}>
              <span>
                <span
                  className="swatch"
                  aria-hidden
                  style={{
                    background: `var(--risk-${row.tone})`,
                    width: 8,
                    height: 8,
                    borderRadius: 2,
                    marginRight: 6,
                  }}
                />
                {row.label}
              </span>
              <span className="mono">
                {row.value}/95 · {row.issues}
              </span>
            </div>
            <ScoreBar value={row.value} tone={row.tone} label={row.label} />
          </div>
        ))}
      </div>
      <div
        className="mono-call"
        style={{ fontSize: 9, marginTop: 10, color: "var(--text-muted)", lineHeight: 1.5 }}
      >
        Cap 95 · proprietary methodology
        <br />
        SDG alignment 13/17
      </div>
    </section>
  );
}

function AgenticReadinessCard({ fixture }: { fixture: ToolFixture }) {
  return (
    <section
      className="card"
      style={{
        padding: 14,
        background: "color-mix(in srgb, var(--accent) 8%, var(--bg-card))",
        borderColor: "color-mix(in srgb, var(--accent) 25%, var(--line-c))",
      }}
      aria-labelledby="agentic-heading"
    >
      <Eyebrow style={{ marginBottom: 6, color: "var(--accent)" }}>Patent pending</Eyebrow>
      <h2
        id="agentic-heading"
        className="serif"
        style={{ fontSize: 14, lineHeight: 1.35, margin: 0 }}
      >
        Agentic Commerce Readiness
      </h2>
      <div className="row gap-2 itemsCenter" style={{ marginTop: 6, alignItems: "baseline" }}>
        <div className="serif" style={{ fontSize: 34, lineHeight: 1, color: "var(--accent)" }}>
          {fixture.agenticScore}
        </div>
        <MonoCall>/95 · BLOCKED</MonoCall>
      </div>
      <div
        className="mono-call"
        style={{ fontSize: 10, marginTop: 8, color: "var(--text-soft)", lineHeight: 1.5 }}
      >
        {fixture.agenticCopy}
      </div>
    </section>
  );
}

function ProtocolCompatList({ fixture }: { fixture: ToolFixture }) {
  return (
    <section className="card" style={{ padding: 14 }} aria-labelledby="protocol-heading">
      <Eyebrow style={{ marginBottom: 8 }}>
        <span id="protocol-heading">Protocol compatibility</span>
      </Eyebrow>
      <ul className="col gap-1" style={{ margin: 0, padding: 0, listStyle: "none" }}>
        {fixture.protocols.map((p) => (
          <li
            key={p.name}
            className="row gap-2 itemsCenter"
            style={{ fontSize: 11, padding: "3px 0" }}
          >
            <span
              aria-hidden
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background:
                  p.status === "pass"
                    ? "var(--accent-2)"
                    : p.status === "warn"
                      ? "var(--highlight-bg)"
                      : "var(--risk-op-bg)",
              }}
            />
            <span style={{ flex: 1 }}>{p.name}</span>
            <span className="mono-call" style={{ fontSize: 10, textTransform: "uppercase" }}>
              {p.status}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
