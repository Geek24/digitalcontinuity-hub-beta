import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const ROUTES = [
  { path: "/", name: "landing" },
  { path: "/platform", name: "platform" },
  { path: "/app", name: "hub" },
];

const THEMES = ["enterprise", "heritage", "sage", "inverse"] as const;
const MODES = ["light", "dark"] as const;

for (const route of ROUTES) {
  for (const theme of THEMES) {
    for (const mode of MODES) {
      test(`visual · ${route.name} · ${theme} · ${mode}`, async ({ page }) => {
        await page.goto(`${route.path}?theme=${theme}&mode=${mode}`);
        // give CSS vars a tick to apply
        await page.waitForLoadState("networkidle");
        await expect(page).toHaveScreenshot(`${route.name}-${theme}-${mode}.png`, {
          fullPage: true,
          maxDiffPixelRatio: 0.001, // <0.1% diff
        });
      });
    }
  }
}

// AAA contrast verification — fail on any AA or AAA violation, every route × palette × mode.
for (const route of ROUTES) {
  for (const theme of THEMES) {
    for (const mode of MODES) {
      test(`a11y · ${route.name} · ${theme} · ${mode}`, async ({ page }) => {
        await page.goto(`${route.path}?theme=${theme}&mode=${mode}`);
        await page.waitForLoadState("networkidle");
        const results = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa", "wcag2aaa", "wcag21aaa"])
          .analyze();
        expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
      });
    }
  }
}

test("beta banner is present on every route", async ({ page }) => {
  for (const route of ROUTES) {
    await page.goto(route.path);
    const banner = page.locator(".beta-banner");
    await expect(banner).toBeVisible();
    await expect(banner.getByText("Beta · Prototype")).toBeVisible();
    const mailto = banner.locator("a[href^='mailto:chris@smartertariff.com']");
    await expect(mailto).toBeVisible();
  }
});

test("URL theme param drives data-theme", async ({ page }) => {
  await page.goto("/?theme=sage&mode=dark");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "sage");
  await expect(page.locator("html")).toHaveAttribute("data-mode", "dark");
});
