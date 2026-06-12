# dokumenty82-site

Standalone production site repository for `https://dokumenty82.ru/`.

Project: **Документы для бизнеса**.

## Source of truth

The canonical source-of-truth repository remains:

```text
https://github.com/elena70semen/dokumenty-dlya-biznesa
```

Use the source-of-truth repository for brand, NAP, HOLD zones, route registry, legal/privacy boundaries, CRM/analytics rules, pricing restrictions and final launch gates.

This repository contains the standalone Next.js static-export site source, selected evidence packs, CI/build proof, public-readiness reports and hosting references.

## Current status

- Site stack: Next.js static export.
- Repository layout: standalone root project.
- Stage 15/16 source-to-site package: synced with `MISSING_EXPECTED` placeholders where source files are absent.
- Stage 17 repository conformance: active checklist in `docs/launch/stage-17-repository-conformance-checklist-v1.md`.
- Public release: `HOLD`.
- Production deploy: not performed.
- Forms: placeholder UI only.
- Form submit, upload, CRM, analytics, Yandex Metrica, Telegram, MAX, cookie notice and live map: disabled.
- Final visual design polish: postponed until source/content/SEO/code/mobile/QA foundation is strong.
- Public launch gates remain closed until owner and legal/privacy approvals are complete.

## Build

Run from the repository root:

```bash
npm ci
npm run check:p0-semantic
npm run build
npm run evidence:p0
npm run check:p0-evidence
npm run check:fns-blog-news
npm run check:static-links
npm run check:launch-readiness
npm run check:stage16-source-to-site
npm run check:finalization
npm run brand:check
npm run check:pricing
```

For browser/accessibility evidence, start the static preview and then run:

```bash
npm run check:local-p0-browser
```

Static export output:

```text
out/
```

## Preview static export

```bash
npx serve out
```

or:

```bash
npm run preview:local
```

## CI

GitHub Actions workflow:

```text
.github/workflows/site-ci.yml
```

Stage 14A CI scope:

- install dependencies with `npm ci`;
- run P0 semantic and evidence checks;
- build static export;
- run static export link check;
- run launch/finalization guard checks;
- run Stage 16 source-to-site guardrails;
- run brand checks;
- upload static export artifact from `out/`.

Artifact pattern:

```text
dokumenty82-static-export-<commit-sha>
```

If no workflow run is visible, manually start:

```text
Actions -> Site CI -> Run workflow -> main
```

## Evidence packs

Evidence and review artifacts are stored under:

- `evidence/p0/`
- `evidence/browser/`
- `evidence/accessibility/`
- `evidence/rendered/`
- `evidence/forms/`
- `evidence/final-local/`
- `evidence/owner-legal-privacy/`
- `evidence/staging-hosting-rollback/`
- `evidence/owner-go-no-go/`

Key reports:

- `LOCAL_P0_BUILD.md`
- `CANONICAL_INTEGRATION_REPORT.md`
- `BROWSER_ACCESSIBILITY_EVIDENCE_REPORT.md`
- `STAGING_HOSTING_ROLLBACK_REPORT.md`

Hosting reference:

- `server/nginx/dokumenty82.static-tcp-only.reference.conf`

## Launch rule

`PUBLIC_LIVE_ALLOWED = false` until all launch gates pass.

## Stage 15/16 source-to-site package

Current control files:

- `docs/source-to-site/source-to-site-alignment-contract-v1.md`
- `docs/source-to-site/source-to-site-current-sync-status-v1.md`
- `docs/source-to-site/site-repo-stage-16-assembly-handoff-v1.md`
- `docs/launch/stage-15-site-foundation-status-v1.md`
- `docs/launch/stage-16-source-package-status-v1.md`
- `docs/launch/stage-16-selling-seo-content-status-v1.md`
- `docs/launch/stage-17-repository-conformance-checklist-v1.md`

The site repository remains source-led. Missing source documents are recorded as `MISSING_EXPECTED`, not filled with invented copy or claims.

## Current release verdict

`GO WITH CONDITIONS` for Stage 14A CI/build proof, Stage 15/16 source-to-site foundation and Stage 17 repository conformance.

`PUBLIC_LIVE_ALLOWED = false`.
