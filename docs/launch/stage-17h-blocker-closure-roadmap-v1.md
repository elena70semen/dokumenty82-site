# Stage 17H Blocker Closure Roadmap V1

Status: `READY_WITH_CONDITIONS`

Release verdict: `GO WITH CONDITIONS`

Public launch: `NOT_PUBLIC_LIVE_READY`

`PUBLIC_LIVE_ALLOWED = false`

## Purpose

This roadmap lists the remaining blockers after Stage 17H source canon gap closure and defines safe closure paths.

It does not close any blocker by itself. All blockers remain incomplete unless real evidence exists and is recorded through the human decision intake protocol.

## Blocker Closure Matrix

| # | Blocker group | Current status | Owner | Required evidence | Files to update after evidence | Checks to run | What does not count as proof | Stop conditions | Can enable public live by itself |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Owner/legal route approval | `PENDING_HUMAN_REVIEW` | Owner / legal | Explicit route-by-route decision evidence for all affected routes. | `docs/owner-review/stage-17g-route-decision-log-v1.md`; `docs/owner-review/stage-17g-owner-legal-signoff-packet-v1.md`; Stage 17F QA docs if copy changes. | `npm run check:p0-semantic`; `npm run build`; `npm run check:stage16-source-to-site`; forbidden scan. | Stage 17G packet, passing checks or no objections. | Missing evidence; route scope unclear; HOLD exposure; route cannibalization. | No |
| 2 | `/policy` final acceptance | `MISSING_EXPECTED` | Owner / legal | Reviewed `/policy` wording, consent/privacy/data-handling acceptance and notes. | `docs/owner-review/stage-17g-go-no-go-review-checklist-v1.md`; `docs/owner-review/stage-17g-route-decision-log-v1.md`; policy source/site docs if text changes. | `npm run check:p0-semantic`; `npm run build`; `npm run check:launch-readiness`; browser/accessibility checks if UI changes. | Existence of `/policy`; generic legal checklist; Codex summary. | Unapproved legal entity/provider/cookie/analytics claims. | No |
| 3 | CRM/forms decision | `MISSING_EXPECTED` | Backend / CRM / owner / legal | Accepted disabled fallback or accepted backend/CRM flow with no false success and no secrets. | `docs/owner-review/stage-17g-go-no-go-review-checklist-v1.md`; evidence under `evidence/forms/` or CRM readiness docs; feature flags only after separate approval. | `npm run evidence:p0`; `npm run check:p0-evidence`; `npm run check:launch-readiness`; `npm run check:local-p0-browser`; forbidden scan. | Placeholder form, route approval, planned webhook, private note. | CRM webhook in repo; fake success; public upload; PII exposure. | No |
| 4 | Analytics/Metrica/no-PII proof | `MISSING_EXPECTED` | Analytics / CRM / legal / owner | No-PII event payload proof, goal map acceptance and legal/owner approval. | `docs/owner-review/stage-17g-go-no-go-review-checklist-v1.md`; analytics evidence docs; feature flags only after separate approval. | `npm run check:launch-readiness`; `npm run check:finalization`; browser evidence; forbidden scan. | Event taxonomy alone, private counter ID, passing build. | Private IDs/secrets; PII payload; analytics enabled without acceptance. | No |
| 5 | Search Console/Yandex Webmaster setup | `MISSING_EXPECTED` | SEO / ops / owner | Verification/submission/setup proof or owner-approved setup plan. | `docs/owner-review/stage-17g-go-no-go-review-checklist-v1.md`; launch/readiness status docs; SEO evidence docs. | `npm run check:static-links`; `npm run check:p0-semantic`; `npm run check:launch-readiness`; sitemap/robots proof. | SEO docs, sitemap file alone, local build. | Wrong host; unapproved indexing of noindex foundation; provider credentials in repo. | No |
| 6 | Staging deploy proof | `MISSING_EXPECTED` | Ops / frontend | Staging static export proof, URL/screenshot/logs and confirmation no DNS/public-live change happened. | staging evidence docs; `docs/launch/stage-17h-blocker-closure-roadmap-v1.md`; go/no-go checklist. | `npm run build`; `npm run check:static-links`; `npm run check:launch-readiness`; browser/accessibility checks against staging if available. | Local build, deployment intent, hosting choice without proof. | DNS/public-live change; secrets; drift from static export. | No |
| 7 | Rollback proof | `MISSING_EXPECTED` | Ops | Rollback drill record with steps, previous artifact and verification. | rollback evidence docs; go/no-go checklist; launch readiness docs. | `npm run check:launch-readiness`; staging/rollback-specific checks when available. | Written rollback idea without drill. | No reproducible rollback; missing artifact; public-live side effect. | No |
| 8 | Transport network proof | `MISSING_EXPECTED` | Ops / frontend / owner | Proof of HTTPS over TCP/443 with HTTP/1.1 or HTTP/2 baseline and no unapproved HTTP/3/QUIC/UDP/443/Alt-Svc h3/listen quic. | transport evidence docs; `docs/source-to-site/transport-protocol-launch-gate-sync-v1.md` if source changes; go/no-go checklist. | `npm run check:launch-readiness`; `npm run check:stage16-source-to-site`; config/response scans. | Choosing Nginx/Caddy by name; local config without network proof. | HTTP/3/QUIC exposed without explicit owner/ops approval; Alt-Svc h3 advertised; active `listen ... quic`. | No |
| 9 | FNS/blog/news live fetch/autopublish/indexing | `BLOCKED` | Content / SEO / legal / owner / ops | Separate editorial/legal/source-attribution/automation proof and explicit indexing/autopublish decision. | blog/news docs, route config, robots/sitemap only after approval; go/no-go checklist. | `npm run check:fns-blog-news`; `npm run check:p0-semantic`; `npm run check:static-links`; forbidden scan. | PR #49 foundation, noindex page existence, copied source article. | Live fetch, scheduler, rewrite provider, autopublish or indexing enabled early. | No |
| 10 | Public live go/no-go | `NOT_PUBLIC_LIVE_READY` | Owner | Explicit owner go/no-go after all public-live blockers are resolved and evidence is current. | owner go/no-go record; go/no-go checklist; launch readiness/final report. | Full finalization suite, browser/accessibility/staging/rollback/transport checks, forbidden scan, `git diff --check`. | Route approval, legal approval, staging proof, passing build, absence of objections. | Any `BLOCKS_PUBLIC_LIVE` gate open; HOLD exposure; public-live side effect. | Only this gate can decide public live, and only after all blockers are closed |

## Current Non-Closure Notes

- Source Stage 16 docs are now resolved for semantic service map, selling SEO content architecture, page block blueprints and client need hooks/lead path, but this does not approve public copy or launch.
- Stage 18A semantic SEO docs, route data and local evidence strengthen route semantics, but they do not close owner/legal, Search Console/Yandex Webmaster, staging, rollback, transport or public-live blockers.
- Owner/legal acceptance remains `MISSING_EXPECTED`.
- CRM/forms/analytics acceptance remains `MISSING_EXPECTED`.
- Staging, rollback and transport proof remain `MISSING_EXPECTED`.
- Search Console/Yandex Webmaster setup remains `MISSING_EXPECTED`.
- Blog/news live fetch, scheduler, rewrite provider, autopublish and indexing remain blocked.

## Required Intake Protocol

Any future blocker update must follow:

```text
docs/owner-review/stage-17h-human-decision-intake-protocol-v1.md
```

## Release Verdict

`GO WITH CONDITIONS`

This roadmap is ready for blocker tracking. It does not close blockers or approve public live.

`PUBLIC_LIVE_ALLOWED = false`
