# Staging Hosting Rollback Report

## Scope

Local staging/hosting/rollback readiness pack for the canonical static Next.js site. This is not production deploy and not public launch.

## Current commit

Starting source commit for this pack: `8f7445e`.

## Static export status

Static export path:
`C:\new\dokumenty-dlya-biznesa\code\out`

Local copy path:
`C:\new\dokumenty82-p0-local`

The site remains static-export friendly and does not require a Next.js server for preview.

## Local preview status

Local preview URL:
`http://127.0.0.1:4173/`

The readiness proof checks HTTP 200 for 14 P0 routes against this local preview.

## Hosting decision matrix summary

Recommended current staging approach:

- static hosting over HTTPS/TCP;
- HTTP/2 allowed;
- HTTP/3, QUIC, UDP/443 and h3 Alt-Svc disabled unless separately approved;
- no live CRM/forms/analytics;
- no production public launch until owner/legal/staging/rollback gates pass.

Matrix:
`C:\new\dokumenty-dlya-biznesa\code\evidence\staging-hosting-rollback\hosting\hosting-decision-matrix.md`

## Nginx TCP-only reference

Reference file:
`C:\new\dokumenty-dlya-biznesa\code\server\nginx\dokumenty82.static-tcp-only.reference.conf`

Status:
reference only, not deployed.

## Rollback runbook summary

Runbook:
`C:\new\dokumenty-dlya-biznesa\code\evidence\staging-hosting-rollback\rollback\rollback-runbook.md`

The rollback plan covers artifact versioning, previous artifact placeholder, static export restore, local validation, sitemap/robots checks, 14-route checks, server restart notes, future CDN/cache purge notes and required approval.

## Security audit

Security proof:
`C:\new\dokumenty-dlya-biznesa\code\evidence\staging-hosting-rollback\security\security-readiness-proof.json`

Checks cover env files, private key files/text, API keys, external hook endpoint patterns, token/secret assignments, analytics IDs, Metrica counters and external CRM endpoints in runtime/config/public scopes.

## Production readiness gap

Gap file:
`C:\new\dokumenty-dlya-biznesa\code\evidence\staging-hosting-rollback\final\production-readiness-gap.md`

Production remains blocked by owner/legal approval, staging URL proof, hosting decision, real-host rollback proof, CRM/live forms, analytics/Metrica, no-PII analytics proof, Search Console/Yandex Webmaster and FNS live/autopublish gates.

## Evidence paths

- `code\evidence\staging-hosting-rollback\staging`
- `code\evidence\staging-hosting-rollback\hosting`
- `code\evidence\staging-hosting-rollback\rollback`
- `code\evidence\staging-hosting-rollback\security`
- `code\evidence\staging-hosting-rollback\final`

## Commands

```powershell
npm.cmd run evidence:staging-hosting-rollback
npm.cmd run check:staging-hosting-rollback
```

## HOLD remaining

- `PUBLIC_LIVE_ALLOWED = false`
- public launch remains HOLD
- production deploy not performed
- staging URL proof still required before production
- owner approval required
- legal/privacy final sign-off required
- rollback proof on real hosting required
- live forms disabled
- CRM disabled
- analytics disabled
- Metrica disabled
- cookie notice disabled
- MAX disabled
- Telegram disabled
- live map disabled
- no real form submit
- no public file upload
- prices, discounts, guarantees, reviews and ratings remain HOLD

## Release verdict

`HOLD/NOT_PUBLIC_LAUNCH_READY`
