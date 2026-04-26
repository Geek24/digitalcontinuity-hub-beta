"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useTweaks, TWEAK_OPTIONS } from "@/lib/tweaks";

interface ToggleGroupProps<V> {
  label: string;
  value: V;
  options: ReadonlyArray<V>;
  onChange: (v: V) => void;
}

function ToggleGroup<V>({ label, value, options, onChange }: ToggleGroupProps<V>) {
  return (
    <div className="variants-group">
      <label>{label}</label>
      <div className="options" role="radiogroup" aria-label={label}>
        {options.map((opt) => {
          const selected = String(value) === String(opt);
          return (
            <button
              key={String(opt)}
              type="button"
              aria-pressed={selected}
              onClick={() => onChange(opt)}
            >
              {String(opt)}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function VariantsPanel() {
  const { tweaks, setTweak } = useTweaks();
  const [open, setOpen] = useState(false);
  const pathname = usePathname() ?? "/";

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const onLanding = pathname === "/";
  const onPlatform = pathname === "/platform";
  const onHub = pathname === "/app";

  return (
    <>
      {!open && (
        <button
          type="button"
          className="variants-trigger"
          aria-expanded={false}
          aria-controls="variants-drawer"
          onClick={() => setOpen(true)}
        >
          Variants ›
        </button>
      )}
      {open && (
        <>
          <div className="variants-overlay" onClick={() => setOpen(false)} aria-hidden />
          <aside
            id="variants-drawer"
            className="variants-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Variant controls"
          >
            <div className="row between itemsCenter">
              <h2>Variants</h2>
              <button
                type="button"
                className="variants-close"
                onClick={() => setOpen(false)}
                aria-label="Close variants"
              >
                Esc
              </button>
            </div>

            <ToggleGroup
              label="Theme"
              value={tweaks.theme}
              options={TWEAK_OPTIONS.themes}
              onChange={(v) => setTweak("theme", v)}
            />
            <ToggleGroup
              label="Mode"
              value={tweaks.mode}
              options={TWEAK_OPTIONS.modes}
              onChange={(v) => setTweak("mode", v)}
            />
            {onLanding && (
              <ToggleGroup
                label="Hero variant"
                value={tweaks.hero}
                options={TWEAK_OPTIONS.heroes}
                onChange={(v) => setTweak("hero", v)}
              />
            )}
            {(onLanding || onPlatform) && (
              <>
                <ToggleGroup
                  label="Grouping"
                  value={tweaks.grouping}
                  options={TWEAK_OPTIONS.groupings}
                  onChange={(v) => setTweak("grouping", v)}
                />
                <ToggleGroup
                  label="Pillar count"
                  value={tweaks.pillarCount}
                  options={TWEAK_OPTIONS.pillarCounts}
                  onChange={(v) => setTweak("pillarCount", v)}
                />
              </>
            )}
            {onHub && (
              <ToggleGroup
                label="Density"
                value={tweaks.density}
                options={TWEAK_OPTIONS.densities}
                onChange={(v) => setTweak("density", v)}
              />
            )}
            <ToggleGroup
              label="Brand prominence"
              value={tweaks.brandProminence}
              options={TWEAK_OPTIONS.brandProminences}
              onChange={(v) => setTweak("brandProminence", v)}
            />
          </aside>
        </>
      )}
    </>
  );
}

export default VariantsPanel;
