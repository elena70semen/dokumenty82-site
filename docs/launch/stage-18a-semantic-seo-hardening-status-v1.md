# Stage 18A Semantic SEO Hardening Status V1

Status: `READY_WITH_CONDITIONS`

Release verdict: `GO WITH CONDITIONS`

Public launch: `NOT_PUBLIC_LIVE_READY`

`PUBLIC_LIVE_ALLOWED = false`

## Purpose

This document records the Stage 18A deep SEO and semantic hardening pass for `elena70semen/dokumenty82-site`.

Stage 18A strengthens source-led route semantics, internal linking and anti-cannibalization evidence. It does not approve public live, public indexing, paid traffic, owner/legal sign-off, CRM/forms, analytics, upload, messaging, DNS, deploy or transport changes.

## Source Docs Created

| Source doc | Status | Notes |
| --- | --- | --- |
| `docs/seo/stage-18a-semantic-seo-master-audit-v1.md` | `READY_WITH_CONDITIONS` | Master audit for route classes, service coverage, metadata/H1/FAQ/page-block direction, internal linking and HOLD risks. |
| `docs/seo/stage-18a-route-semantic-cluster-map-v1.md` | `READY_WITH_CONDITIONS` | Route-to-query-cluster map for all approved routes without numeric search-volume claims. |
| `docs/seo/stage-18a-internal-linking-and-anti-cannibalization-map-v1.md` | `READY_WITH_CONDITIONS` | Hub, money-page, diagnostic, homepage, contacts and noindex linking rules. |

## Docs Synced To Site

| Site doc | Status |
| --- | --- |
| `docs/seo/stage-18a-semantic-seo-master-audit-v1.md` | `SYNCED_FROM_SOURCE` |
| `docs/seo/stage-18a-route-semantic-cluster-map-v1.md` | `SYNCED_FROM_SOURCE` |
| `docs/seo/stage-18a-internal-linking-and-anti-cannibalization-map-v1.md` | `SYNCED_FROM_SOURCE` |

Byte-for-byte `cmp` verification is required before local commit and after any future source-to-site refresh.

## Semantic Route Data Status

| Area | Status | Evidence |
| --- | --- | --- |
| Approved route universe | `PASS` | 39 approved routes represented. |
| Indexed route universe | `PASS` | 36 indexed routes represented and expected in sitemap. |
| Noindex foundation | `PASS` | `/blog/`, `/blog/obnovleniya-fns/`, `/blog/razbory/` remain excluded from sitemap and marked noindex foundation. |
| Route semantic fields | `READY_WITH_CONDITIONS` | `lib/seo/semantic-route-data.json` stores route class, parent route, group, service cluster, primary intent, support intent, safe query variants, problem hooks, content/FAQ angle, related routes, avoid-cannibalizing list, metadata/H1 direction, schema boundary, HOLD risks and page-block purpose. |
| Runtime manifest | `READY_WITH_CONDITIONS` | `lib/routes.ts` consumes Stage 18A semantic data and exposes selected fields on route manifest entries. |

## Metadata / H1 / Description Status

| Area | Status | Notes |
| --- | --- | --- |
| Metadata direction | `READY_WITH_CONDITIONS` | All indexed routes have metadata direction in Stage 18A semantic data. |
| H1 direction | `READY_WITH_CONDITIONS` | All indexed routes have H1 direction in Stage 18A semantic data. |
| Description clarity | `READY_WITH_CONDITIONS` | Stage 18A evidence checks content angle and metadata direction; final public copy remains owner/legal gated. |
| Deferred | `OWNER_LEGAL_REVIEW_REQUIRED` | Any final visible copy rewrite must remain source-backed and separately reviewed. |

## Internal Linking Status

| Area | Status | Notes |
| --- | --- | --- |
| Hub-to-money links | `READY_WITH_CONDITIONS` | Stage 18A map and guardrail require hubs to list child money pages. |
| Money-to-parent links | `READY_WITH_CONDITIONS` | Money pages must include the parent hub in related routes. |
| Diagnostic links | `READY_WITH_CONDITIONS` | Diagnostics must link to `/nalogi-i-rezhimy/` and `/razbor-situacii/`. |
| Homepage router | `READY_WITH_CONDITIONS` | Homepage remains a router, not a service catalogue. |
| Contacts/NAP | `PASS` | Contacts remain NAP-focused and do not add unconfirmed hours, office/floor details or legal identifiers. |

## Anti-Cannibalization Status

| Boundary | Status | Notes |
| --- | --- | --- |
| `/otchetnost/` vs reporting money pages | `READY_WITH_CONDITIONS` | Hub remains broad route selector; money pages own narrow reporting intents. |
| `/bank-i-115-fz/` vs bank money pages | `READY_WITH_CONDITIONS` | Hub owns bank/115 route choice; money pages own bank request and 115-ФЗ package intents. |
| `/adres-egryul-direktor/` vs address/director pages | `READY_WITH_CONDITIONS` | Hub owns category routing; money pages own specific address/director actions. |
| `/nalogi-i-rezhimy/` vs diagnostics | `READY_WITH_CONDITIONS` | Hub owns regime/tax routing; diagnostics own applicability/checking tasks. |
| Blog/news foundation | `PASS` | Noindex foundation remains outside sitemap and live publishing. |

## Guardrail And Evidence

| Artifact | Status | Notes |
| --- | --- | --- |
| `scripts/check-semantic-seo-quality.mjs` | `READY_WITH_CONDITIONS` | Checks route data completeness, sitemap/noindex boundaries, internal links, duplicate primary intents, disabled live flags, forbidden active claims and HTTP/3/QUIC enablement. |
| `package.json` script | `READY_WITH_CONDITIONS` | `check:semantic-seo` added and included in `check:finalization`. |
| `.github/workflows/site-ci.yml` | `READY_WITH_CONDITIONS` | CI includes Stage 18 semantic SEO quality step. |
| `evidence/seo/stage18-semantic-seo-quality.json` | `PASS_WITH_CONDITIONS` | Generated local evidence for 39 semantic routes. |

## Remaining SEO / Content Tasks

- Final public route copy remains owner/legal gated.
- Search Console/Yandex Webmaster setup remains `MISSING_EXPECTED`.
- Public indexing evidence remains `MISSING_EXPECTED`.
- Staging, rollback and transport proof remain `MISSING_EXPECTED`.
- No fake search volume, ranking promise, hidden SEO block or keyword stuffing is approved.

## Owner / Legal Blockers

- Owner/legal route acceptance remains `MISSING_EXPECTED`.
- `/policy` final acceptance remains `MISSING_EXPECTED`.
- CRM/forms/analytics acceptance remains `MISSING_EXPECTED`.
- Public live go/no-go remains `NOT_PUBLIC_LIVE_READY`.

## Release Verdict

`GO WITH CONDITIONS`

Stage 18A semantic SEO hardening is ready with conditions for local QA, source-to-site review and later owner/legal review. It does not approve public live or live indexing.

`PUBLIC_LIVE_ALLOWED = false`
