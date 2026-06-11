# dokumenty82-site

Site repository for `dokumenty82.ru`.

## Source of Truth

The canonical source-of-truth repository remains:

`https://github.com/elena70semen/dokumenty-dlya-biznesa`

This repository contains the synchronized standalone Next.js static-export site source, selected evidence packs, public-readiness reports, and the TCP-only hosting reference for review.

## Current Status

- Site stack: Next.js static export.
- Public release: `HOLD`.
- Production deploy: not performed.
- Forms: placeholder UI only.
- Form submit, upload, CRM, analytics, Yandex Metrica, Telegram, MAX, cookie notice, and live map: disabled.
- Public launch gates remain closed until owner and legal/privacy approvals are complete.

## Build

```powershell
npm install
npm run build
```

## Preview Static Export

```powershell
npx serve out
```

## Evidence Packs

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
