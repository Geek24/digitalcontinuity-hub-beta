# DigitalContinuity.ai · Hub Beta

Prototype-grade beta of the consolidated DigitalContinuity.ai platform. Three artboards (Landing, Platform, Hub), four AAA-tuned palettes × light/dark, fixture-only.

## Stack — matches production exactly

This beta is built on the **same stack as the SmarterTariff production app** so it cannot accidentally introduce a new dependency that the prod scanner doesn't already vet. Versions are pinned to match `frontend/package.json` in the prod repo.

| | Version |
|---|---|
| Next.js | ^16.2.4 (App Router) |
| React | 19.2.5 |
| TypeScript | ^5.9.3 |
| Tailwind CSS | ^4 (CSS-first config via `@import` in `app/globals.css`) |
| ESLint | ^9 (flat config + `eslint-config-next@16.2.4`) |
| Utility libs | `class-variance-authority`, `clsx`, `tailwind-merge`, `lucide-react` |

What is **not** here: no Vite, no React Router, no axe-core, no Playwright, no testing framework. This beta is human-eyeball-tested.

## Run it

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
npm run lint         # eslint
```

## Layout

```
app/
├── layout.tsx                 # root layout, BetaBanner, VariantsPanel, noindex meta
├── globals.css                # Tailwind v4 import + base styles
├── styles/tokens.css          # 4 palettes × light/dark CSS custom properties
├── page.tsx                   # Landing (artboard A)
├── platform/page.tsx          # Platform IA (artboard B)
├── app/page.tsx               # In-product Hub (artboard C, with v0.2 interactivity)
├── about-this-beta/page.tsx   # About this beta
└── not-found.tsx              # 404
components/
├── BetaBanner.tsx             # sticky beta strip with mailto
├── ThemeSwitcher.tsx          # palette + mode dropdowns
├── VariantsPanel.tsx          # tester-friendly drawer for URL state
├── shared/                    # TopNav, Footer
└── ui/                        # shadcn-style atoms (Btn, Pill, ToolGlyph, …)
lib/
├── fixtures.ts                # safe public fixture data
├── tweaks.ts                  # URL state hook (next/navigation)
└── utils.ts                   # cn helper (clsx + tailwind-merge)
public/
├── robots.txt                 # Disallow: /
└── humans.txt
```

## URL state

Every visual variant is a URL query param so feedback links capture exactly the state the tester saw. Example:
`/?theme=heritage&mode=dark&hero=scan&grouping=buyer&pillarCount=5&brandProminence=dc-only`

Supported keys: `theme`, `mode`, `hero`, `grouping`, `pillarCount`, `density`, `brandProminence`, `tool` (Hub only).

The Variants drawer (bottom-right) writes these for you and lets testers compare designs without touching the URL bar.

## IP guardrails

See `app/about-this-beta/page.tsx` and `AUDIT-2026-04-25.md`. Scoring weights, signal-detection logic, and criterion → revenue mapping are intentionally not exposed. Priority titles strip internal numeric identifiers and surface only the public-facing WCAG criterion.

## Deploy

Vercel auto-deploys this branch. `vercel.json` enforces `X-Robots-Tag: noindex, nofollow, noarchive` plus a baseline of security headers.
