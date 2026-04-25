import { useTweaks, TWEAK_OPTIONS } from "@/lib/tweaks";

export function ThemeSwitcher() {
  const { tweaks, setTweak } = useTweaks();
  return (
    <div className="theme-switcher" aria-label="Theme controls">
      <label>
        <span className="sr-only" style={{ position: "absolute", left: -9999 }}>
          Palette
        </span>
        Palette
        <select
          value={tweaks.theme}
          onChange={(e) => setTweak("theme", e.target.value as typeof tweaks.theme)}
          aria-label="Palette"
        >
          {TWEAK_OPTIONS.themes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </label>
      <label>
        <span className="sr-only" style={{ position: "absolute", left: -9999 }}>
          Mode
        </span>
        Mode
        <select
          value={tweaks.mode}
          onChange={(e) => setTweak("mode", e.target.value as typeof tweaks.mode)}
          aria-label="Mode"
        >
          {TWEAK_OPTIONS.modes.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

export default ThemeSwitcher;
