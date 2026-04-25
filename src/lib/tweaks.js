import { useEffect, useMemo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
const DEFAULTS = {
    theme: "enterprise",
    mode: "light",
    hero: "product",
    grouping: "risk",
    pillarCount: 3,
    density: "dense",
    brandProminence: "dc-led",
};
const STORAGE_KEY = "dc-hub-beta:tweaks";
const THEMES = ["enterprise", "heritage", "sage", "inverse"];
const MODES = ["light", "dark"];
const HEROES = ["editorial", "product", "scan"];
const GROUPINGS = ["risk", "buyer"];
const PILLAR_COUNTS = [3, 4, 5];
const DENSITIES = ["sparse", "dense"];
const BRAND_PROMINENCES = ["dc-led", "dc-only", "st-only"];
function pick(allowed, v, fallback) {
    if (v == null)
        return fallback;
    return allowed.includes(v) ? v : fallback;
}
function readStoredDefaults() {
    if (typeof window === "undefined")
        return {};
    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw)
            return {};
        const parsed = JSON.parse(raw);
        return parsed && typeof parsed === "object" ? parsed : {};
    }
    catch {
        return {};
    }
}
function writeStoredDefaults(tweaks) {
    if (typeof window === "undefined")
        return;
    try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tweaks));
    }
    catch {
        /* swallow */
    }
}
export function useTweaks() {
    const [searchParams, setSearchParams] = useSearchParams();
    const stored = useMemo(readStoredDefaults, []);
    const tweaks = useMemo(() => {
        const base = { ...DEFAULTS, ...stored };
        return {
            theme: pick(THEMES, searchParams.get("theme"), base.theme),
            mode: pick(MODES, searchParams.get("mode"), base.mode),
            hero: pick(HEROES, searchParams.get("hero"), base.hero),
            grouping: pick(GROUPINGS, searchParams.get("grouping"), base.grouping),
            pillarCount: pick(PILLAR_COUNTS.map((n) => String(n)), searchParams.get("pillarCount"), String(base.pillarCount)),
            density: pick(DENSITIES, searchParams.get("density"), base.density),
            brandProminence: pick(BRAND_PROMINENCES, searchParams.get("brandProminence"), base.brandProminence),
        };
    }, [searchParams, stored]);
    // Coerce pillarCount string back to a number safely.
    const numericPillarCount = useMemo(() => {
        const n = Number(tweaks.pillarCount);
        return PILLAR_COUNTS.includes(n) ? n : 3;
    }, [tweaks.pillarCount]);
    const finalTweaks = { ...tweaks, pillarCount: numericPillarCount };
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
    const setTweak = useCallback((key, value) => {
        const next = new URLSearchParams(searchParams);
        next.set(key, String(value));
        setSearchParams(next, { replace: false });
    }, [searchParams, setSearchParams]);
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
