/**
 * Safe fixture data — public-only.
 * See FIXTURES-SPEC.md and IP guardrails in README §13.
 *
 * Allowed:  what is visible on smartertariff.ai today.
 * NOT allowed: scoring weights, signal-detection logic,
 *              criterion→revenue mapping, real customer data.
 */

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
  /** Public name, mirrors live nav order */
  label: string;
  /** Short subtitle / one-liner */
  oneLiner: string;
  /** Risk group for grouping */
  riskGroup: RiskGroup;
  /** Glyph used by ToolGlyph */
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

/* ── per-tool fixtures for hub switcher ──────────────────────── */

export interface ToolFixture {
  oneLiner: string;
  whyTitle: string;
  whyCopy: string;
  scanLine: string;
  priorities: HubPriorityRow[];
  agenticScore: number;
  agenticCopy: string;
  protocols: ProtocolCompat[];
}

export const TOOL_FIXTURES: Record<ToolKey, ToolFixture> = {
  checkout: {
    oneLiner: "WCAG 2.2 · EAA · agent readiness",
    whyTitle: "Commerce × climate, at one critical point.",
    whyCopy:
      "Checkout is where regulatory exposure (WCAG, EAA, UFLPA), operational risk (iframe failures), and AI-agent visibility (whether Google or ChatGPT will even surface you) all collide. We're the only audit that scores all three at once — plus the upstream supply chain that feeds into it.",
    scanLine: "checkout.shopify.com",
    priorities: [
      { title: "3.3.2 Labels or Instructions — order lookup uses placeholder text as labels", where: "/order-lookup", severity: "P1", tone: "op", level: "AA" },
      { title: "1.3.5 Identify Input Purpose — autocomplete missing on email & order #", where: "/order-lookup", severity: "P1", tone: "op", level: "AA" },
      { title: "2.4.7 Focus Visible — no indicators on interactive elements", where: "/checkout", severity: "P1", tone: "op", level: "AA" },
      { title: "AGENTREADY 1.1 — Cart cannot be summarized by AI agents", where: "/cart", severity: "P2", tone: "rep", level: "AA" },
    ],
    agenticScore: 22,
    agenticCopy: "3 agent blockers detected. OpenAI Operator, Google Commerce, Anthropic MCP cannot complete checkout.",
    protocols: AGENTIC_READINESS.protocols,
  },
  logistics: {
    oneLiner: "Lane, port & MoR exposure",
    whyTitle: "Lanes, ports, MoR — visibility before the storm.",
    whyCopy:
      "Logistics Risk maps every lane in your supply graph against weather, geopolitics, and Merchant of Record exposure. Detect the bottleneck before it costs a quarter of revenue.",
    scanLine: "lane://us-west-1 → eu-central",
    priorities: [
      { title: "MoR exposure — undeclared payment processor in EU lanes", where: "lane:us→eu", severity: "P1", tone: "op", level: "—" },
      { title: "Port concentration — 78% of inbound through LA/LB", where: "ports", severity: "P1", tone: "op", level: "—" },
      { title: "Climate proximity — Tier-1 supplier 40km from active fault", where: "supplier-graph", severity: "P2", tone: "op", level: "—" },
    ],
    agenticScore: 54,
    agenticCopy: "2 lanes lack agent-readable manifests. Real-time risk briefings unavailable to AI co-pilots.",
    protocols: [
      { name: "Project44 API", status: "pass" },
      { name: "FlexPort Insights", status: "warn" },
      { name: "ETA agent feeds", status: "fail" },
    ],
  },
  ground: {
    oneLiner: "Evidence chain · TOS confidence",
    whyTitle: "Truth, scored — before the regulator scores it for you.",
    whyCopy:
      "GroundTruth audits TOS, evidence chains, and proof artifacts. When auditors arrive, you have receipts — and AI agents can validate your claims directly.",
    scanLine: "/legal/terms · evidence-chain",
    priorities: [
      { title: "TOS Confidence Risk: High (100%)", where: "/legal/terms", severity: "P1", tone: "rep", level: "—" },
      { title: "Evidence chain gap — no signed proof on shipping ETA claims", where: "/promises", severity: "P1", tone: "rep", level: "—" },
      { title: "Citation drift — 4 marketing pages cite an outdated whitepaper", where: "marketing-pages", severity: "P2", tone: "rep", level: "—" },
    ],
    agenticScore: 71,
    agenticCopy: "Evidence chain mostly machine-readable. 1 protocol missing structured citations.",
    protocols: [
      { name: "C2PA provenance", status: "pass" },
      { name: "Schema.org claim graph", status: "warn" },
      { name: "Anthropic citations", status: "pass" },
    ],
  },
  supply: {
    oneLiner: "CSRD · CSDDD · UFLPA · EUDR",
    whyTitle: "Tier-3 visibility before the regulator asks.",
    whyCopy:
      "Supply Chain audits map suppliers across cotton, electronics, and ag. CSRD-grade reports without the spreadsheet ritual.",
    scanLine: "supplier-graph · 4 tiers",
    priorities: [
      { title: "UFLPA — Tier-3 supplier opacity (cotton, electronics)", where: "supplier-graph", severity: "P1", tone: "reg", level: "—" },
      { title: "CSRD double materiality — climate impact gap", where: "esg-report", severity: "P1", tone: "reg", level: "—" },
      { title: "EUDR — deforestation due-diligence missing for 2 SKUs", where: "/sku/cocoa-*", severity: "P2", tone: "reg", level: "—" },
    ],
    agenticScore: 48,
    agenticCopy: "Supplier disclosures partially structured. Agents cannot reconcile tier-3 without manual joins.",
    protocols: [
      { name: "GS1 Digital Link", status: "pass" },
      { name: "EUDR Traces API", status: "warn" },
      { name: "OpenSupplyHub", status: "warn" },
    ],
  },
  domestic: {
    oneLiner: "EO & Made-in-America exposure",
    whyTitle: "Domestic claims, with the receipts.",
    whyCopy:
      "Domestic Sourcing scores Made-in-America claims against EO 14257 & FTC enforcement criteria — no surprises in the next FTC sweep.",
    scanLine: "/marketing · made-in-usa",
    priorities: [
      { title: "EO 14257 — Domestic sourcing claims unverified", where: "marketing-pages", severity: "P1", tone: "reg", level: "—" },
      { title: "FTC Made-in-USA — 'Assembled in USA' lacks substantiation", where: "/about", severity: "P1", tone: "reg", level: "—" },
      { title: "Buy American Act — federal contract eligibility unclear", where: "/government-sales", severity: "P2", tone: "reg", level: "—" },
    ],
    agenticScore: 39,
    agenticCopy: "Sourcing claims not machine-verifiable. AI shopping agents can't cite provenance.",
    protocols: [
      { name: "Schema.org countryOfOrigin", status: "fail" },
      { name: "USDA BioPreferred", status: "warn" },
      { name: "C2PA provenance", status: "fail" },
    ],
  },
  disaster: {
    oneLiner: "Climate & geo node exposure",
    whyTitle: "Before the storm — not after.",
    whyCopy:
      "Disaster Risk overlays your facility graph onto climate, seismic, and geopolitical risk feeds. Continuity planning with hard numbers.",
    scanLine: "facility-graph · climate-overlay",
    priorities: [
      { title: "Hurricane Tier-1 — 3 DCs in 50yr flood plain", where: "facility-graph", severity: "P1", tone: "op", level: "—" },
      { title: "Seismic — primary fulfillment 12km from active fault", where: "facility:fc-1", severity: "P2", tone: "op", level: "—" },
    ],
    agenticScore: 64,
    agenticCopy: "Most facility data is structured. 1 data feed lags 24h+ behind real-time NOAA.",
    protocols: [
      { name: "NOAA SWFO feed", status: "warn" },
      { name: "USGS realtime", status: "pass" },
      { name: "GDELT geopolitical", status: "warn" },
    ],
  },
  ai: {
    oneLiner: "Brand presence in AI agents",
    whyTitle: "Where the search bar used to be — agents now decide.",
    whyCopy:
      "AI Visibility tests how AI shopping agents see your brand: presence in citations, ranking in result-of-actions, and accuracy of summaries.",
    scanLine: "agent-vis · brand-coverage",
    priorities: [
      { title: "Citation gap — ChatGPT cites competitor over brand on key query", where: "/brand-perception", severity: "P1", tone: "rep", level: "—" },
      { title: "Schema.org Organization — missing sameAs links", where: "/about", severity: "P1", tone: "rep", level: "—" },
      { title: "Operator action coverage — 4 of 7 flows fail", where: "/checkout", severity: "P2", tone: "rep", level: "—" },
    ],
    agenticScore: 31,
    agenticCopy: "Brand presence weak across 3 of 5 leading shopping agents.",
    protocols: [
      { name: "OpenAI Operator", status: "fail" },
      { name: "Google Commerce", status: "warn" },
      { name: "Perplexity Shop", status: "fail" },
    ],
  },
};

