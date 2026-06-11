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
- Public release: `HOLD`.
- Production deploy: not performed.
- Forms: placeholder UI only.
- Form submit, upload, CRM, analytics, Yandex Metrica, Telegram, MAX, cookie notice and live map: disabled.
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
npm run check:finalization
npm run brand:check
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

## Current release verdict

`GO WITH CONDITIONS` for Stage 14A CI/build proof.

`PUBLIC_LIVE_ALLOWED = false`.
