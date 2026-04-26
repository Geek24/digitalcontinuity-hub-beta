/**
 * Safe fixture data — public-only.
 * See FIXTURES-SPEC.md and IP guardrails in README §13.
 *
 * Allowed:  what is visible on smartertariff.ai today.
 * NOT allowed: scoring weights, signal-detection logic,
 *              criterion→revenue mapping, real customer data.
 */

import groundTruthEvidence from "./ground-truth-evidence.json";
import type { EvidenceIndex } from "./types/evidence";

export const GROUND_TRUTH_EVIDENCE: EvidenceIndex = groundTruthEvidence as EvidenceIndex;
export type { EvidenceRow, EvidenceIndex } from "./types/evidence";

export type ToolKey =
  | "checkout"
  | "logistics"
  | "ground"
  | "supply"
  | "domestic"
  | "disaster"
  | "ai";

export type RiskGroup = "reg" | "op" | "rep" | "cont";

export type Severity = "OK" | "WARN" | "CRITICAL";

export interface Score {
  value: number;
  cap: 95;
  status: Severity;
}

export interface Tool {
  key: ToolKey;
  label: string;
  oneLiner: string;
  riskGroup: RiskGroup;
  glyph: string;
  flagship?: true;
  patentPending?: true;
  score?: Score;
  issues?: number;
  framework?: string[];
}

export interface Priority {
  rank: 1 | 2;
  title: string;
  criterion: string;
  toolKey: ToolKey;
  severity: Severity;
}

export interface Dimension {
  key: RiskGroup;
  label: string;
  score: Score;
  issueCount: number;
}

export interface ProtocolCompat {
  name: string;
  status: "pass" | "warn" | "fail";
  note?: string;
}

export interface AgenticReadiness {
  score: Score;
  protocols: ProtocolCompat[];
}

export interface Plan {
  tier: "Pro";
  status: "Active";
  features: string[];
}

export interface Account {
  email: string;
  provider: "Google · Workspace";
  initials: string;
}

/* ─────────────────────────────────────────────────────────────── */

export const TOOLS: Tool[] = [
  {
    key: "checkout",
    label: "Checkout Audit",
    oneLiner: "WCAG 2.2 · EAA · agent readiness",
    riskGroup: "reg",
    glyph: "C",
    flagship: true,
    patentPending: true,
    framework: ["WCAG 2.2 AA", "EAA"],
  },
  {
    key: "logistics",
    label: "Logistics Risk",
    oneLiner: "Lane, port & MoR exposure",
    riskGroup: "op",
    glyph: "↯",
  },
  {
    key: "ground",
    label: "GroundTruth",
    oneLiner: "Evidence chain · TOS confidence",
    riskGroup: "rep",
    glyph: "◎",
  },
  {
    key: "supply",
    label: "Supply Chain",
    oneLiner: "CSRD · CSDDD · UFLPA · EUDR",
    riskGroup: "reg",
    glyph: "▲",
  },
  {
    key: "domestic",
    label: "Domestic Sourcing",
    oneLiner: "EO & Made-in-America exposure",
    riskGroup: "reg",
    glyph: "★",
  },
  {
    key: "disaster",
    label: "Disaster Risk",
    oneLiner: "Climate & geo node exposure",
    riskGroup: "op",
    glyph: "△",
  },
  {
    key: "ai",
    label: "AI Visibility",
    oneLiner: "Brand presence in AI agents",
    riskGroup: "rep",
    glyph: "✦",
  },
];

export const RISK_LABEL: Record<Exclude<RiskGroup, "cont">, string> = {
  reg: "Regulatory",
  op: "Operational",
  rep: "Reputational",
};

export const RISK_COPY: Record<Exclude<RiskGroup, "cont">, string> = {
  reg: "Lines that, if crossed, become fines.",
  op: "Lines that, if crossed, halt revenue.",
  rep: "Lines that, if crossed, erode trust.",
};

export const DIMENSIONS: Dimension[] = [
  { key: "reg", label: "Regulatory", score: { value: 67, cap: 95, status: "WARN" }, issueCount: 9 },
  { key: "op", label: "Operational", score: { value: 41, cap: 95, status: "CRITICAL" }, issueCount: 8 },
  { key: "rep", label: "Reputational", score: { value: 58, cap: 95, status: "WARN" }, issueCount: 5 },
  { key: "cont", label: "Continuity", score: { value: 72, cap: 95, status: "OK" }, issueCount: 2 },
];

/* IP guardrail: priority titles strip "AGENTREADY [number]" prefix and append the WCAG criterion as suffix. */
export const PRIORITIES: Priority[] = [
  {
    rank: 1,
    title: "Cart cannot be summarized by AI agents · WCAG 3.3.2",
    criterion: "WCAG 3.3.2",
    toolKey: "checkout",
    severity: "CRITICAL",
  },
  {
    rank: 2,
    title: "Inputs lack autocomplete metadata · WCAG 1.3.5",
    criterion: "WCAG 1.3.5",
    toolKey: "checkout",
    severity: "WARN",
  },
];

/** Hub-page priority rows, mirrors design-source/artboard-c-hub.jsx */
export interface HubPriorityRow {
  title: string;
  where: string;
  severity: "P1" | "P2";
  tone: "reg" | "op" | "rep";
  level: "AA" | "—";
}

export const HUB_PRIORITIES: HubPriorityRow[] = [
  {
    title: "3.3.2 Labels or Instructions — order lookup uses placeholder text as labels",
    where: "/order-lookup",
    severity: "P1",
    tone: "op",
    level: "AA",
  },
  {
    title: "1.3.5 Identify Input Purpose — autocomplete missing on email & order #",
    where: "/order-lookup",
    severity: "P1",
    tone: "op",
    level: "AA",
  },
  {
    title: "UFLPA — Tier-3 supplier opacity (cotton, electronics)",
    where: "supplier-graph",
    severity: "P1",
    tone: "reg",
    level: "—",
  },
  {
    title: "2.4.7 Focus Visible — no indicators on interactive elements",
    where: "/checkout",
    severity: "P1",
    tone: "op",
    level: "AA",
  },
  {
    title: "EO 14257 — Domestic sourcing claims unverified",
    where: "marketing-pages",
    severity: "P2",
    tone: "reg",
    level: "—",
  },
  {
    title: "TOS Confidence Risk: High (100%)",
    where: "/legal/terms",
    severity: "P2",
    tone: "rep",
    level: "—",
  },
];

/** Per-tool issue count + score for the Hub fan-out strip. Display-only. */
export const HUB_TOOL_STATS: Record<ToolKey, { issues: number; score: number }> = {
  checkout: { issues: 4, score: 75 },
  supply: { issues: 5, score: 78 },
  ground: { issues: 3, score: 91 },
  domestic: { issues: 9, score: 55 },
  logistics: { issues: 2, score: 72 },
  disaster: { issues: 1, score: 68 },
  ai: { issues: 6, score: 44 },
};

/** Right-rail risk-dimension rows on the Hub. */
export const HUB_DIMENSION_ROWS: { label: string; tone: "reg" | "op" | "rep"; value: number; issues: number }[] = [
  { label: "Checkout", tone: "op", value: 75, issues: 4 },
  { label: "Supply Chain", tone: "reg", value: 78, issues: 5 },
  { label: "Domestic Sourcing", tone: "reg", value: 55, issues: 9 },
  { label: "GroundTruth", tone: "rep", value: 91, issues: 3 },
];

export const AGENTIC_READINESS: AgenticReadiness = {
  score: { value: 22, cap: 95, status: "CRITICAL" },
  protocols: [
    { name: "OpenAI Operator", status: "fail" },
    { name: "Google Commerce", status: "warn" },
    { name: "Anthropic MCP", status: "fail" },
    { name: "Mastercard Agent Pay", status: "pass" },
    { name: "PayPal Agent Ready", status: "warn" },
    { name: "JAWS / NVDA", status: "fail" },
  ],
};

export const PLAN: Plan = {
  tier: "Pro",
  status: "Active",
  features: ["All 7 tools", "Evidence exports", "MCP API"],
};

export const ACCOUNT: Account = {
  email: "s.kennedy@renew…",
  provider: "Google · Workspace",
  initials: "SK",
};

export const PROTOCOLS_LIST = [
  "OpenAI Operator",
  "Google Commerce",
  "Anthropic MCP",
  "Mastercard Agent Pay",
  "PayPal Agent Ready",
  "JAWS / NVDA",
];
