# DigitalContinuity.ai · Hub Beta · v0.1

Public, testable beta demonstrating the consolidated platform across three artboards
(Landing · Marketing IA · In-product Hub) **without touching any live SmarterTariff or
DigitalContinuity infrastructure**. Fixture-driven, `noindex` everywhere.

> Spec source of truth: see the original handoff at `dc-hub-beta-handoff/` (README, COMPONENT-MAP, PALETTE-TOKENS, FIXTURES-SPEC).

## Stack

- Vite 5
- React 18 + TypeScript (strict)
- React Router v6 (SPA)
- Tailwind v3 + CSS custom properties (palette tokens)
- Playwright + axe-core (visual regression + a11y)
- Hosted on Vercel (sibling project, custom subdomain `hub-beta.digitalcontinuity.ai`)

## Routes

| Path             | Purpose                              |
| ---------------- | ------------------------------------ |
| `/`              | Landing (artboard A)                 |
| `/platform`      | Marketing IA / megamenu (artboard B) |
| `/app`           | In-product Hub (artboard C)          |
| `/about-this-beta` | Beta hygiene + IP guardrails       |
| `*`              | 404                                  |

## URL state contract

```
?theme=enterprise|heritage|sage|inverse  (default: enterprise)
&mode=light|dark                         (default: light)
&hero=editorial|product|scan             (Landing only, default: product)
&grouping=risk|buyer                     (Landing/IA, default: risk)
&pillarCount=3|4|5                       (Landing, default: 3)
&density=sparse|dense                    (Hub only, default: dense)
&brandProminence=dc-led|dc-only|st-only  (default: dc-led)
```

URL is the source of truth. `localStorage` only stores "default on next visit."

## Local dev

```sh
npm install
npm run dev          # http://localhost:5173
npm run typecheck
npm run build
npm run preview
npm run test:visual  # Playwright + axe (requires browsers installed)
```

## Beta hygiene (non-negotiable, baked-in)

- Beta banner on every route with `mailto:` injecting the current URL
- `<meta name="robots" content="noindex, nofollow, noarchive">` + `X-Robots-Tag` header
- `humans.txt` + `/about-this-beta` route
- AAA-tuned palettes only (4 palettes × light/dark)
- Reduced-motion respected
- One `<h1>` per route, no skipped levels, focus-visible everywhere

## IP guardrails (recap)

| Allowed                                | Not allowed                                  |
| -------------------------------------- | -------------------------------------------- |
| Score cap of 95 (public)               | The formula behind /95                       |
| Dimension counts ("24 issues · 4/4") | Per-signal scoring                           |
| Protocol compat with pass/warn/fail    | Signal-detection logic                       |
| WCAG criterion numbers (3.3.2 etc.)  | Criterion → revenue mapping                  |
| "Patent pending" near methodology only | Plastered on every page                      |
| Tool names + one-liners                | Internal tool architecture                   |
| Pro plan / Unlimited copy              | Real customer counts, real revenue           |

If unsure: does it appear on `smartertariff.ai` today? If yes, fine. If no, leave it out.

## Deploy → Vercel

1. Import this repo into Vercel (framework preset = Vite)
2. No env vars required
3. `Settings → Domains` → add `hub-beta.digitalcontinuity.ai`
4. Add the CNAME at the DNS provider (NOT Cloudflare-proxied)
5. Vercel auto-issues the cert

`vercel.json` ships with SPA rewrites + `X-Robots-Tag: noindex, nofollow`.

## Owning company

Renew EcoMe LLC · contact: chris@smartertariff.com
