import type { CSSProperties } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MonoCall } from "@/components/ui/MonoCall";
import { Pill } from "@/components/ui/Pill";
import { GROUND_TRUTH_EVIDENCE, type EvidenceRow } from "@/lib/fixtures";

const FIXTURE_ROWS: Array<{
  entity: string;
  ticker: string;
  policy_delta: string;
  sdg_alignment: string;
  source_path: string;
  last_verified: string;
}> = [
  {
    entity: "Acme Logistics, Inc.",
    ticker: "ACME",
    policy_delta: "[STATIC]",
    sdg_alignment: "[VERIFIED PLEDGE]",
    source_path: "acme.example.com/sustainability",
    last_verified: "fixture · illustrative",
  },
  {
    entity: "Globex Retail Co.",
    ticker: "GBX",
    policy_delta: "[ACCRETIVE]",
    sdg_alignment: "[VERIFIED PLEDGE]",
    source_path: "globex.example.com/esg",
    last_verified: "fixture · illustrative",
  },
];

function formatWaybackLabel(timestamp?: string) {
  if (!timestamp) return "Snapshot";
  const d = new Date(timestamp);
  if (Number.isNaN(d.getTime())) return "Snapshot";
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

function DiffBlock({ raw }: { raw: string }) {
  const lines = raw.split("\n");
  return (
    <pre
      className="diff-block"
      aria-label="Wayback before/after diff"
      role="region"
      style={{ margin: 0 }}
    >
      {lines.map((line, i) => {
        const trimmed = line;
        const cls = trimmed.startsWith("+ ") || trimmed.startsWith("+")
          ? "added"
          : trimmed.startsWith("- ") || trimmed.startsWith("-")
            ? "removed"
            : "";
        return (
          <span key={i} className={`diff-line ${cls}`.trim()}>
            {trimmed || " "}
          </span>
        );
      })}
    </pre>
  );
}

function EvidenceRowCard({ row }: { row: EvidenceRow }) {
  return (
    <article
      className="evidence-card"
      aria-labelledby={`ev-${row.ticker}-h`}
    >
      <header className="evidence-row-header">
        <span id={`ev-${row.ticker}-h`} className="entity">
          {row.entity}
        </span>
        <span className="ticker">{row.ticker}</span>
        <span className="scrub-badge" aria-label="Policy delta: scrub detected">
          ▽ {row.policy_delta}
        </span>
        <span className="wayback-badge" aria-label="Verified against Wayback Machine snapshots">
          ◎ Wayback-verified
        </span>
      </header>

      <div className="evidence-meta">
        <span>
          <span className="label">Source</span>
          {row.source_path}
        </span>
        <span>
          <span className="label">Last verified</span>
          {row.last_verified}
        </span>
        <span>
          <span className="label">SDG</span>
          {row.sdg_alignment}
          {row.sdg_target ? ` · ${row.sdg_target}` : ""}
        </span>
        {typeof row.removed_lines === "number" && typeof row.added_lines === "number" && (
          <span>
            <span className="label">Lines</span>
            <span style={{ color: "var(--risk-op)" }}>−{row.removed_lines}</span>
            {" / "}
            <span style={{ color: "var(--accent-2)" }}>+{row.added_lines}</span>
          </span>
        )}
      </div>

      <DiffBlock raw={row.raw_diff} />

      <div className="cite-row">
        <MonoCall size="sm" style={{ marginRight: 4 }}>
          Cite ›
        </MonoCall>
        {row.wayback_before && (
          <a
            className="cite-link"
            href={row.wayback_before}
            target="_blank"
            rel="noopener noreferrer"
          >
            Wayback ({formatWaybackLabel(row.baseline_timestamp)})
            <span className="arrow" aria-hidden>
              ↗
            </span>
          </a>
        )}
        {row.wayback_after && (
          <a
            className="cite-link"
            href={row.wayback_after}
            target="_blank"
            rel="noopener noreferrer"
          >
            Wayback ({formatWaybackLabel(row.current_timestamp)})
            <span className="arrow" aria-hidden>
              ↗
            </span>
          </a>
        )}
      </div>
    </article>
  );
}

function FixtureRowCard({
  entry,
}: {
  entry: (typeof FIXTURE_ROWS)[number];
}) {
  return (
    <div
      className="data-row"
      style={{ gridTemplateColumns: "auto 1fr auto auto", gap: 10, opacity: 0.78 }}
    >
      <span className="ticker" style={{
        fontFamily: "var(--font-mono)",
        fontSize: 10.5,
        letterSpacing: "0.10em",
        padding: "2px 6px",
        borderRadius: 3,
        border: "1px solid var(--line-strong-c)",
        color: "var(--text-soft)",
        background: "var(--bg)",
      }}>
        {entry.ticker}
      </span>
      <div>
        <div style={{ fontSize: 12, fontWeight: 500 }}>{entry.entity}</div>
        <div className="mono-call" style={{ fontSize: 10, marginTop: 1 }}>
          {entry.source_path} · {entry.policy_delta} · {entry.sdg_alignment}
        </div>
      </div>
      <span className="mono-call" style={{ fontSize: 9.5, letterSpacing: "0.06em" }}>
        {entry.last_verified}
      </span>
      <span aria-hidden style={{ color: "var(--text-muted)", fontSize: 11 }}>
        ·
      </span>
    </div>
  );
}

export interface GroundTruthPanelProps {
  toolLabel: string;
  style?: CSSProperties;
}

export function GroundTruthPanel({ toolLabel, style }: GroundTruthPanelProps) {
  const verifiedRows = GROUND_TRUTH_EVIDENCE.rows;
  const verifiedCount = verifiedRows.length;
  const totalRows = verifiedCount + FIXTURE_ROWS.length;

  return (
    <section
      className="card"
      style={{ flex: "2 1 460px", padding: 16, ...style }}
      aria-labelledby="groundtruth-heading"
    >
      <div className="row between itemsCenter" style={{ marginBottom: 10, flexWrap: "wrap", gap: 8 }}>
        <div>
          <Eyebrow>
            <span id="groundtruth-heading">Evidence chain · {toolLabel}</span>
          </Eyebrow>
          <MonoCall size="sm">
            {verifiedCount} of {totalRows} rows verified · live Wayback citations
          </MonoCall>
        </div>
        <div className="row gap-2">
          <Pill tone="rep">Verified</Pill>
          <Pill>Fixture</Pill>
        </div>
      </div>

      <div
        className="evidence-trust-strip"
        role="note"
        aria-label="Evidence verification disclosure"
      >
        <span aria-hidden style={{ fontSize: 14, lineHeight: 1, marginTop: 1 }}>
          ◎
        </span>
        <span>
          <strong>{verifiedCount} of {totalRows}</strong> evidence rows verified against
          Wayback Machine snapshots. The remaining rows are illustrative until verified.
        </span>
      </div>

      {verifiedRows.map((row) => (
        <EvidenceRowCard key={row.ticker} row={row} />
      ))}

      {FIXTURE_ROWS.map((entry) => (
        <FixtureRowCard key={entry.ticker} entry={entry} />
      ))}
    </section>
  );
}

export default GroundTruthPanel;
