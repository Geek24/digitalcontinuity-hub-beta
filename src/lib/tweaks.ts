import { useEffect, useMemo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";

export type Theme = "enterprise" | "heritage" | "sage" | "inverse";
export type Mode = "light" | "dark";
export type Hero = "editorial" | "product" | "scan";
export type Grouping = "risk" | "buyer";
export type PillarCount = 3 | 4 | 5;
export type Density = "sparse" | "dense";
export type BrandProminence = "dc-led" | "dc-only" | "st-only";

export interface Tweaks {
  theme: Theme;
  mode: Mode;
  hero: Hero;
  grouping: Grouping;
  pillarCount: PillarCount;
  density: Density;
  brandProminence: BrandProminence;
}

const DEFAULTS: Tweaks = {
  theme: "enterprise",
  mode: "light",
  hero: "product",
  grouping: "risk",
  pillarCount: 3,
  density: "dense",
  brandProminence: "dc-led",
};

const STORAGE_KEY = "dc-hub-beta:tweaks";

const THEMES: Theme[] = ["enterprise", "heritage", "sage", "inverse"];
const MODES: Mode[] = ["light", "dark"];
const HEROES: Hero[] = ["editorial", "product", "scan"];
const GROUPINGS: Grouping[] = ["risk", "buyer"];
const PILLAR_COUNTS: PillarCount[] = [3, 4, 5];
const DENSITIES: Density[] = ["sparse", "dense"];
const BRAND_PROMINENCES: BrandProminence[] = ["dc-led", "dc-only", "st-only"];

function pick<T>(allowed: readonly T[], v: string | null | undefined, fallback: T): T {
  if (v == null) return fallback;
  return (allowed as readonly unknown[]).includes(v) ? (v as T) : fallback;
}

function readStoredDefaults(): Partial<Tweaks> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Partial<Tweaks>;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function writeStoredDefaults(tweaks: Tweaks) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tweaks));
  } catch {
    /* swallow */
  }
}

export function useTweaks() {
  const [searchParams, setSearchParams] = useSearchParams();

  const stored = useMemo(readStoredDefaults, []);

  const tweaks: Tweaks = useMemo(() => {
    const base: Tweaks = { ...DEFAULTS, ...stored };
    return {
      theme: pick(THEMES, searchParams.get("theme"), base.theme),
      mode: pick(MODES, searchParams.get("mode"), base.mode),
      hero: pick(HEROES, searchParams.get("hero"), base.hero),
      grouping: pick(GROUPINGS, searchParams.get("grouping"), base.grouping),
      pillarCount: pick(
        PILLAR_COUNTS.map((n) => String(n) as unknown as PillarCount),
        searchParams.get("pillarCount"),
        String(base.pillarCount) as unknown as PillarCount,
      ) as unknown as PillarCount,
      density: pick(DENSITIES, searchParams.get("density"), base.density),
      brandProminence: pick(BRAND_PROMINENCES, searchParams.get("brandProminence"), base.brandProminence),
    };
  }, [searchParams, stored]);

  // Coerce pillarCount string back to a number safely.
  const numericPillarCount = useMemo<PillarCount>(() => {
    const n = Number(tweaks.pillarCount);
    return (PILLAR_COUNTS as number[]).includes(n) ? (n as PillarCount) : 3;
  }, [tweaks.pillarCount]);

  const finalTweaks: Tweaks = { ...tweaks, pillarCount: numericPillarCount };

  // apply data-theme + data-mode to <html>
  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute("data-theme", finalTweaks.theme);
    html.setAttribute("data-mode", finalTweaks.mode);
  }, [finalTweaks.theme, finalTweaks.mode]);

  // persist defaults for next visit
  useEffect(() => {
    writeStoredDefaults(finalTweaks);
  }, [finalTweaks]);

  const setTweak = useCallback(
    <K extends keyof Tweaks>(key: K, value: Tweaks[K]) => {
      const next = new URLSearchParams(searchParams);
      next.set(key, String(value));
      setSearchParams(next, { replace: false });
    },
    [searchParams, setSearchParams],
  );

  return { tweaks: finalTweaks, setTweak };
}

export const TWEAK_OPTIONS = {
  themes: THEMES,
  modes: MODES,
  heroes: HEROES,
  groupings: GROUPINGS,
  pillarCounts: PILLAR_COUNTS,
  densities: DENSITIES,
  brandProminences: BRAND_PROMINENCES,
};
