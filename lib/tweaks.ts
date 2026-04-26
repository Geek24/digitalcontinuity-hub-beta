"use client";

import { useEffect, useMemo, useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

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
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const stored = useMemo(() => readStoredDefaults(), []);

  const tweaks: Tweaks = useMemo(() => {
    const base: Tweaks = { ...DEFAULTS, ...stored };
    const get = (k: string) => searchParams?.get(k) ?? null;
    const pillarStr = String(base.pillarCount);
    const pickedPillar = pick(
      PILLAR_COUNTS.map((n) => String(n)),
      get("pillarCount"),
      pillarStr,
    );
    return {
      theme: pick(THEMES, get("theme"), base.theme),
      mode: pick(MODES, get("mode"), base.mode),
      hero: pick(HEROES, get("hero"), base.hero),
      grouping: pick(GROUPINGS, get("grouping"), base.grouping),
      pillarCount: Number(pickedPillar) as PillarCount,
      density: pick(DENSITIES, get("density"), base.density),
      brandProminence: pick(BRAND_PROMINENCES, get("brandProminence"), base.brandProminence),
    };
  }, [searchParams, stored]);

  // apply data-theme + data-mode to <html>
  useEffect(() => {
    if (typeof document === "undefined") return;
    const html = document.documentElement;
    html.setAttribute("data-theme", tweaks.theme);
    html.setAttribute("data-mode", tweaks.mode);
  }, [tweaks.theme, tweaks.mode]);

  // persist defaults for next visit
  useEffect(() => {
    writeStoredDefaults(tweaks);
  }, [tweaks]);

  const setTweak = useCallback(
    <K extends keyof Tweaks>(key: K, value: Tweaks[K]) => {
      const next = new URLSearchParams(searchParams?.toString() ?? "");
      next.set(key, String(value));
      const qs = next.toString();
      router.replace(`${pathname}${qs ? `?${qs}` : ""}`, { scroll: false });
    },
    [router, pathname, searchParams],
  );

  return { tweaks, setTweak };
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
