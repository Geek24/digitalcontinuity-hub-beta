import { useEffect, useRef, useState } from "react";
import { Btn } from "@/components/atoms/Btn";
import { Pill } from "@/components/atoms/Pill";
import { MonoCall } from "@/components/atoms/MonoCall";
import type { Tool, ToolFixture } from "@/lib/fixtures";

type ScanState = "idle" | "scanning" | "done";

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function UnifiedScanCard({
  tool,
  fixture,
}: {
  tool: Tool;
  fixture: ToolFixture;
}) {
  const [state, setState] = useState<ScanState>("idle");
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startedAtRef = useRef<number | null>(null);

  // Reset when the active tool changes.
  useEffect(() => {
    setState("idle");
    setProgress(0);
    startedAtRef.current = null;
    if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
  }, [tool.key]);

  useEffect(() => {
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  function startScan() {
    if (state === "scanning") return;
    if (prefersReducedMotion()) {
      setState("done");
      setProgress(100);
      return;
    }
    setState("scanning");
    setProgress(0);
    startedAtRef.current = performance.now();
    const tick = (now: number) => {
      const start = startedAtRef.current ?? now;
      const elapsed = now - start;
      const pct = Math.min(100, (elapsed / 2000) * 100);
      setProgress(pct);
      if (elapsed >= 2000) {
        setState("done");
        setProgress(100);
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  }

  function reset() {
    if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    setState("idle");
    setProgress(0);
  }

  const buttonLabel =
    state === "idle" ? "Run scan" : state === "scanning" ? "Scanning…" : "View results";

  return (
    <div
      className="card"
      style={{
        padding: 10,
        marginBottom: 14,
        position: "relative",
        overflow: "hidden",
      }}
      data-scan-state={state}
    >
      <div
        className="row itemsCenter"
        style={{ gap: 8, flexWrap: "wrap" }}
      >
        <MonoCall>scan ›</MonoCall>
        <span
          style={{
            flex: 1,
            padding: "6px 0",
            fontFamily: "var(--font-mono)",
            fontSize: 13,
            minWidth: 200,
          }}
        >
          {fixture.scanLine}
          <span className="cursor" aria-hidden>
            |
          </span>
        </span>
        <Pill tone="reg">Regulatory</Pill>
        <Pill tone="op">Operational</Pill>
        <Pill tone="rep">Reputational</Pill>
        <Btn
          variant="accent"
          onClick={state === "done" ? reset : startScan}
          disabled={state === "scanning"}
          ariaLabel={buttonLabel}
        >
          {buttonLabel}
        </Btn>
      </div>

      {state !== "idle" && (
        <div
          role="progressbar"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${tool.label} scan progress`}
          style={{
            marginTop: 8,
            height: 4,
            background: "var(--bg-raised)",
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              background: "var(--accent)",
              transition: "width 80ms linear",
            }}
          />
        </div>
      )}

      {state === "done" && (
        <div
          role="status"
          aria-live="polite"
          className="row gap-3 itemsCenter"
          style={{
            marginTop: 10,
            padding: "8px 10px",
            background: "color-mix(in srgb, var(--accent) 6%, transparent)",
            borderRadius: 6,
            border: "1px solid color-mix(in srgb, var(--accent) 25%, transparent)",
            flexWrap: "wrap",
          }}
        >
          <span
            className="serif"
            style={{ fontSize: 16, color: "var(--accent)", lineHeight: 1 }}
          >
            {fixture.priorities.length}
          </span>
          <MonoCall>issues found</MonoCall>
          <span
            aria-hidden
            style={{ width: 1, height: 14, background: "var(--line-c)" }}
          />
          <span
            className="serif"
            style={{ fontSize: 16, lineHeight: 1 }}
          >
            {fixture.agenticScore}
            <span style={{ fontSize: 11, color: "var(--text-muted)" }}>/95</span>
          </span>
          <MonoCall>agent readiness</MonoCall>
          <span className="grow" />
          <button
            type="button"
            onClick={reset}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--text-muted)",
              background: "transparent",
              border: "1px solid var(--line-c)",
              borderRadius: 4,
              padding: "3px 8px",
              cursor: "pointer",
            }}
          >
            ↺ Reset
          </button>
        </div>
      )}
    </div>
  );
}

export default UnifiedScanCard;
