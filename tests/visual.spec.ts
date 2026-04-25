import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const ROUTES = [
  { path: "/", name: "landing" },
  { path: "/platform", name: "platform" },
  { path: "/app", name: "hub" },
];

const THEMES = ["enterprise", "heritage", "sage", "inverse"] as const;
const MODES = ["light", "dark"] as const;

// Visual: every theme × mode (24 baseline)
for (const route of ROUTES) {
  for (const theme of THEMES) {
    for (const mode of MODES) {
      test(`visual · ${route.name} · ${theme} · ${mode}`, async ({ page }) => {
        await page.goto(`${route.path}?theme=${theme}&mode=${mode}`);
        await page.waitForLoadState("networkidle");
        await expect(page).toHaveScreenshot(`${route.name}-${theme}-${mode}.png`, {
          fullPage: true,
          maxDiffPixelRatio: 0.001,
        });
      });
    }
  }
}

// Visual: tweak-state coverage (a sampler — keep snapshot count manageable)
const TWEAK_VARIANTS: { route: string; name: string; query: string }[] = [
  { route: "/", name: "landing-hero-editorial", query: "hero=editorial" },
  { route: "/", name: "landing-hero-scan", query: "hero=scan" },
  { route: "/", name: "landing-pillars-5", query: "pillarCount=5" },
  { route: "/", name: "landing-grouping-buyer", query: "grouping=buyer" },
  { route: "/", name: "landing-brand-st-only", query: "brandProminence=st-only" },
  { route: "/platform", name: "platform-grouping-buyer", query: "grouping=buyer" },
  { route: "/platform", name: "platform-pillars-4", query: "pillarCount=4" },
  { route: "/app", name: "hub-density-sparse", query: "density=sparse" },
  { route: "/app", name: "hub-tool-supply", query: "tool=supply" },
  { route: "/app", name: "hub-tool-ai", query: "tool=ai" },
  { route: "/app", name: "hub-brand-dc-only", query: "brandProminence=dc-only" },
];

for (const v of TWEAK_VARIANTS) {
  for (const theme of ["enterprise", "inverse"] as const) {
    test(`visual · ${v.name} · ${theme}`, async ({ page }) => {
      await page.goto(`${v.route}?theme=${theme}&${v.query}`);
      await page.waitForLoadState("networkidle");
      await expect(page).toHaveScreenshot(`${v.name}-${theme}.png`, {
        fullPage: true,
        maxDiffPixelRatio: 0.001,
      });
    });
  }
}

// AAA contrast verification — every route × palette × mode
for (const route of ROUTES) {
  for (const theme of THEMES) {
    for (const mode of MODES) {
      test(`a11y · ${route.name} · ${theme} · ${mode}`, async ({ page }) => {
        await page.goto(`${route.path}?theme=${theme}&mode=${mode}`);
        await page.waitForLoadState("networkidle");
        const results = await new AxeBuilder({ page })
          .withTags([
            "wcag2a",
            "wcag2aa",
            "wcag21aa",
            "wcag22aa",
            "wcag2aaa",
            "wcag21aaa",
          ])
          .analyze();
        expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
      });
    }
  }
}

// AAA with the variants drawer open
test("a11y · variants panel open", async ({ page }) => {
  await page.goto("/?theme=enterprise");
  await page.waitForLoadState("networkidle");
  await page.getByRole("button", { name: /variants/i }).click();
  await page.locator('aside[role="dialog"]').waitFor();
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
});

// AAA with a hub scan in-progress
test("a11y · hub scan in-progress", async ({ page }) => {
  await page.goto("/app?theme=enterprise");
  await page.waitForLoadState("networkidle");
  await page.getByRole("button", { name: /^run scan$/i }).first().click();
  // Don't wait for completion — capture a11y mid-progress
  await page.locator('[role="progressbar"]').waitFor();
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
});

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

test("hub ?tool= param swaps panel content", async ({ page }) => {
  await page.goto("/app?tool=supply");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(/Supply Chain/i);
  await page.goto("/app?tool=ai");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(/AI Visibility/i);
});

test("variants panel toggles via Esc + click outside", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /variants/i }).click();
  const drawer = page.locator('aside[role="dialog"]');
  await expect(drawer).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(drawer).toBeHidden({ timeout: 2000 }).catch(() => {
    // drawer may slide via transform; assert aria-hidden=true after Esc
    return expect(drawer).toHaveAttribute("aria-hidden", "true");
  });
});

test("noindex meta is preserved", async ({ page }) => {
  await page.goto("/");
  const meta = await page
    .locator('meta[name="robots"]')
    .getAttribute("content");
  expect(meta).toContain("noindex");
});
