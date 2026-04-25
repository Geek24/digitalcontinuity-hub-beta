import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useTweaks, TWEAK_OPTIONS, type Tweaks } from "@/lib/tweaks";

type Route = "landing" | "platform" | "hub" | "other";

function routeFromPath(pathname: string): Route {
  if (pathname === "/") return "landing";
  if (pathname.startsWith("/platform")) return "platform";
  if (pathname.startsWith("/app")) return "hub";
  return "other";
}

interface ToggleGroup<K extends keyof Tweaks> {
  key: K;
  label: string;
  options: ReadonlyArray<Tweaks[K]>;
  routes: Route[];
}

const GROUPS: Array<ToggleGroup<keyof Tweaks>> = [
  { key: "theme", label: "Theme", options: TWEAK_OPTIONS.themes, routes: ["landing", "platform", "hub", "other"] },
  { key: "mode", label: "Mode", options: TWEAK_OPTIONS.modes, routes: ["landing", "platform", "hub", "other"] },
  { key: "hero", label: "Hero variant", options: TWEAK_OPTIONS.heroes, routes: ["landing"] },
  { key: "grouping", label: "Grouping", options: TWEAK_OPTIONS.groupings, routes: ["landing", "platform"] },
  {
    key: "pillarCount",
    label: "Pillar count",
    options: TWEAK_OPTIONS.pillarCounts as ReadonlyArray<Tweaks["pillarCount"]>,
    routes: ["landing", "platform"],
  },
  { key: "density", label: "Density", options: TWEAK_OPTIONS.densities, routes: ["hub"] },
  {
    key: "brandProminence",
    label: "Brand prominence",
    options: TWEAK_OPTIONS.brandProminences,
    routes: ["landing", "platform", "hub", "other"],
  },
];

export function VariantsPanel() {
  const { tweaks, setTweak } = useTweaks();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const route = routeFromPath(location.pathname);
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  // Esc closes
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Focus first focusable when opened
  useEffect(() => {
    if (!open) return;
    const first = drawerRef.current?.querySelector<HTMLElement>(
      "button, [href], input, select, [tabindex]:not([tabindex='-1'])",
    );
    first?.focus();
  }, [open]);

  // Click outside closes
  useEffect(() => {
    if (!open) return;
    function onClick(e: MouseEvent) {
      const t = e.target as Node | null;
      if (!t) return;
      if (drawerRef.current?.contains(t)) return;
      if (triggerRef.current?.contains(t)) return;
      setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  const visibleGroups = GROUPS.filter((g) => g.routes.includes(route));

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls="variants-drawer"
        onClick={() => setOpen((v) => !v)}
        style={{
          position: "fixed",
          right: 16,
          bottom: 16,
          zIndex: 60,
          padding: "10px 14px",
          background: "var(--accent)",
          color: "white",
          border: "1px solid var(--accent)",
          borderRadius: 999,
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          cursor: "pointer",
          boxShadow: "0 6px 20px rgba(0,0,0,0.18)",
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          transition: "transform 0.12s ease",
        }}
      >
        Variants <span aria-hidden>{open ? "›" : "‹"}</span>
      </button>

      {open && (
        <div
          aria-hidden
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.18)",
            zIndex: 55,
          }}
        />
      )}

      <aside
        ref={drawerRef}
        id="variants-drawer"
        role="dialog"
        aria-label="Variants drawer"
        aria-hidden={!open}
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          height: "100vh",
          width: 320,
          maxWidth: "92vw",
          background: "var(--bg-card)",
          borderLeft: "1px solid var(--line-c)",
          zIndex: 65,
          padding: "20px 18px 24px",
          overflowY: "auto",
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 220ms ease-out",
          boxShadow: open ? "-12px 0 28px rgba(0,0,0,0.16)" : "none",
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        <div className="row between itemsCenter">
          <div>
            <div
              className="mono-call"
              style={{
                fontSize: 9,
                letterSpacing: "0.14em",
                color: "var(--accent)",
                marginBottom: 4,
              }}
            >
              VARIANTS · BETA
            </div>
            <div className="serif" style={{ fontSize: 16, lineHeight: 1.2 }}>
              Try a different cut.
            </div>
          </div>
          <button
            type="button"
            aria-label="Close variants drawer"
            onClick={() => {
              setOpen(false);
              triggerRef.current?.focus();
            }}
            style={{
              width: 28,
              height: 28,
              padding: 0,
              border: "1px solid var(--line-c)",
              borderRadius: 6,
              background: "var(--bg)",
              color: "var(--text)",
              cursor: "pointer",
              fontFamily: "var(--font-mono)",
              fontSize: 12,
            }}
          >
            ✕
          </button>
        </div>

        <p
          className="mono-call"
          style={{ fontSize: 10, lineHeight: 1.5, color: "var(--text-muted)" }}
        >
          Each toggle below mirrors a URL query param. Share the URL to share the cut.
        </p>

        {visibleGroups.map((g) => (
          <ToggleGroupRow
            key={g.key}
            label={g.label}
            current={String(tweaks[g.key])}
            options={g.options.map((o) => String(o))}
            onSelect={(v) => {
              const numericKeys: Array<keyof Tweaks> = ["pillarCount"];
              const value = numericKeys.includes(g.key) ? (Number(v) as Tweaks[typeof g.key]) : (v as Tweaks[typeof g.key]);
              setTweak(g.key, value as Tweaks[typeof g.key]);
            }}
          />
        ))}

        <div
          className="mono-call"
          style={{
            marginTop: "auto",
            paddingTop: 14,
            borderTop: "1px solid var(--line-c)",
            fontSize: 10,
            color: "var(--text-muted)",
            lineHeight: 1.5,
          }}
        >
          Esc closes · click outside dismisses · prefs save to localStorage.
        </div>
      </aside>
    </>
  );
}

function ToggleGroupRow({
  label,
  current,
  options,
  onSelect,
}: {
  label: string;
  current: string;
  options: string[];
  onSelect: (v: string) => void;
}) {
  return (
    <div>
      <div
        className="mono-call"
        style={{
          fontSize: 9,
          letterSpacing: "0.14em",
          color: "var(--text-muted)",
          marginBottom: 6,
          textTransform: "uppercase",
        }}
      >
        {label}
      </div>
      <div
        role="radiogroup"
        aria-label={label}
        style={{ display: "flex", flexWrap: "wrap", gap: 6 }}
      >
        {options.map((opt) => {
          const isActive = current === opt;
          return (
            <button
              key={opt}
              type="button"
              role="radio"
              aria-checked={isActive}
              onClick={() => onSelect(opt)}
              style={{
                padding: "5px 10px",
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                background: isActive ? "var(--accent)" : "var(--bg)",
                color: isActive ? "white" : "var(--text)",
                border: `1px solid ${isActive ? "var(--accent)" : "var(--line-strong-c)"}`,
                borderRadius: 6,
                cursor: "pointer",
                textTransform: "lowercase",
                transition: "background 0.12s ease, transform 0.1s ease",
              }}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default VariantsPanel;
