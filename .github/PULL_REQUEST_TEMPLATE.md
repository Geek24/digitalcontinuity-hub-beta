# Design handoff · DigitalContinuity.ai consolidation

## What this PR adds

A self-contained design + deploy package for the DigitalContinuity.ai + SmarterTariff consolidation beta. Three artboards (Landing / Marketing IA / In-product Hub) covering the unified IA, four AAA-compliant palettes, and a static Vercel-ready deploy.

## Live beta

- **Production**: https://hub-beta.digitalcontinuity.ai *(once DNS is configured)*
- **Vercel alias**: https://hub-beta-phi.vercel.app
- **Feedback**: chris@smartertariff.com (banner mailto in every variant)

## Constraints (non-negotiable)

- **Fixtures only** — no calls to live SmarterTariff API or DC.ai infra
- **AAA contrast everywhere** — verify with axe-core in CI
- **`noindex` headers on every route** — beta must not be SEO'd
- **Patent-pending copy** appears only near the methodology block (Landing dark hero) and the Agentic Readiness card (Hub) — nowhere else
- **No internal scoring weights, signals, or criterion→revenue mapping**

## Reviewer checklist

- [ ] `noindex` set in `vercel.json` and `<meta>`
- [ ] Beta banner with `mailto:chris@smartertariff.com` on all routes
- [ ] AAA contrast verified for the active palette × mode
- [ ] No live API references in the code
- [ ] No leakage of internal scoring methodology
- [ ] Vercel Deployment Protection: **Disabled** (or testers can't view)

## Owning company

Renew EcoMe LLC · contact: chris@smartertariff.com
