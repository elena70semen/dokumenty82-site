# Final Paid Traffic Go/No-Go - 2026-06-22

Project: `dokumenty82.ru` / `Документы для бизнеса`

Production source candidate: `elena70semen/dokumenty82-site`

Evidence/master contour: `elena70semen/dokumenty-dlya-biznesa`

Final verdict: `BLOCKED_OWNER_DECISION_REQUIRED`

Score: `7/10`

Paid traffic status: `HOLD`

Forms/CRM status: `OFF`

## Executive Summary

Yandex Webmaster is no longer the active blocker for paid traffic. The site has accessible robots/sitemap endpoints, the Webmaster cabinet is in observation mode, and the current implementation now preserves production Yandex Metrika counter `109869928`.

The remaining blocker is production/owner governance: live is not fully proven to be synchronized with this repository, the next deploy source/pipeline is not independently confirmed, and owner/legal approval for paid traffic is not recorded.

Do not launch ads, do not merge/deploy for paid traffic, and do not enable forms/CRM until the owner explicitly approves the final launch decision.

## Gate Status

| Gate | Status | Evidence |
| --- | --- | --- |
| Yandex Webmaster | `OBSERVATION` | No current LK blocker reported in this workstream; sitemap/robots are reachable. |
| Production source of truth | `BLOCKED_OWNER_DECISION_REQUIRED` | Repo remote is `https://github.com/elena70semen/dokumenty82-site.git`, but live/source sync is not proven. |
| PR #95 from master/evidence repo | `NOT_DEPLOY_ARTIFACT` | PR #95 in `dokumenty-dlya-biznesa` must not be used as direct deploy artifact. |
| Live vs source sync | `BLOCKER` | Source sitemap has 36 URLs; live sitemap currently returned 30 URLs. |
| Favicon | `READY_AFTER_DEPLOY` | Added root `public/favicon.svg`; preserved live `favicon.ico` as `public/favicon.ico`; build output includes both. |
| Robots | `WATCH` | Source robots is valid and points to canonical sitemap; live robots differs from source and includes an active public-live status comment. |
| Sitemap | `WATCH` | Source/build sitemap has 36 URLs; live sitemap has 30 URLs. |
| Canonical/index/noindex | `PASS_SOURCE` | Local finalization checks passed for canonical sitemap/noindex boundaries. |
| 404 | `PASS_BUILD` | Static Next build includes `_not-found`; no paid-traffic GO until post-deploy smoke repeats. |
| Yandex Metrika 109869928 | `PASS_SOURCE_BUILD_LIVE` | Source/build/live checks include `109869928`, `mc.yandex.ru`, `ym(109869928, 'init', ...)`, and `/watch/109869928`. |
| Live Metrika init config | `BLOCKER_RECONCILE_BEFORE_ADS` | Live HTML currently initializes Metrika with Webvisor/ecommerce signals, while source/build in this PR keeps `webvisor=false` and `ecommerce=false`. Reconcile on deploy before ads. |
| No-PII analytics payload | `PASS_SOURCE_BUILD` | `npm run check:tracking-no-pii` generated `evidence/finalization/tracking-no-pii-proof.json`. |
| Goals/reachGoal | `PASS_SOURCE` | Safe `reachGoal` bridge exists for phone, route, contacts, situation review, documents, service cards, fallback contact; submit-success remains backend-gated. |
| Forms/CRM | `PASS_OFF` | `formsLive=false`, `crmEnabled=false`, `crmSuccessEnabled=false`; no live CRM webhook or hidden PII collection. |
| Legal/owner | `BLOCKER` | Explicit owner GO for paid traffic is not recorded. |
| IndexNow | `NOT_ENABLED` | No owner-approved key; no sitemap-wide submission. Manual/dry-run only for changed URLs after owner decision. |

## Closed Items

- Root favicon fixed in source: `public/favicon.svg`.
- Live favicon preservation added: `public/favicon.ico`.
- Metadata icon points to `/favicon.svg`.
- Yandex Metrika counter `109869928` is in source and build output.
- `YandexMetrika` renders approved script and noscript watch fallback.
- Safe `reachGoal` dispatch is implemented.
- UTM/source context is preserved in session storage with allowlisted fields only.
- No PII fields are allowlisted in analytics payloads.
- Forms, CRM and paid traffic remain disabled.
- `check:tracking-no-pii` added to finalization.
- P0 evidence regenerated for approved Metrika mode.

## Blockers

1. `BLOCKED_OWNER_DECISION_REQUIRED`: owner must explicitly approve paid traffic launch.
2. `DEPLOY_SOURCE_NOT_PROVEN`: live deploy pipeline/source is not independently confirmed in this run.
3. `LIVE_REPO_SYNC_MISMATCH`: live sitemap returned 30 URLs while source/build sitemap contains 36 URLs.
4. `LIVE_ROBOTS_MISMATCH`: live robots text differs from source robots and includes a public-live comment not present in source.
5. `LIVE_METRIKA_CONFIG_MISMATCH`: live Metrika init includes Webvisor/ecommerce signals; source/build in this PR intentionally keeps them disabled.
6. `METRIKA_LK_GOALS_CONFIRMATION_REQUIRED`: source goals exist, but LK goal configuration/goal firing must be smoke-tested after deploy.
7. `FORMS_CRM_HOLD`: forms/CRM remain off; enabling them requires a separate approved PR.
8. `LEGAL_OWNER_SIGNOFF_REQUIRED`: sensitive ad categories require owner/legal confirmation of copy, claims and disclaimers.

## Should Fix

- Confirm hosting/deploy pipeline for `elena70semen/dokumenty82-site`.
- Align live artifact with this repo before paid traffic.
- Repeat live smoke after deploy: favicon, robots, sitemap, canonical, Metrika, noindex, 404.
- Reconcile live Metrika init with source/build: no Webvisor/ecommerce unless separately approved by owner/legal/privacy review.
- Confirm Metrika LK goals exist for the implemented goal IDs.
- Update privacy/legal text after owner/legal confirms actual analytics/forms state.
- Decide whether live sitemap should remain 30 URLs or move to the 36 URL source sitemap.

## Watch

- Yandex indexing status for newly submitted URLs.
- Sitemap processing status after deploy sync.
- Canonical/index statuses in Webmaster after the next crawl.
- Any Metrika consent/privacy requirements before scaling paid traffic.
- No Webvisor/ecommerce/ClientID/offline conversions until separately approved.

## Advertising Landing Status

Global condition for every `READY_FOR_ADS` page: owner GO, deploy source confirmation, live sync, post-deploy smoke and Metrika LK goal check are still required.

| Page | Status | Notes |
| --- | --- | --- |
| `/` | `READY_FOR_ADS` | Safe router/home entry after global gates. |
| `/razbor-situacii/` | `READY_FOR_ADS` | Best primary first-step landing. |
| `/kontakty/` | `READY_FOR_ADS` | Safe local/contact landing. |
| `/otchetnost/` | `READY_FOR_ADS` | Hub page; use broad accounting/reporting ad groups only. |
| `/bank-i-115-fz/` | `READY_FOR_ADS` | Hub page; avoid outcome guarantees for banks/115-FZ. |
| `/otvet-na-trebovanie-ifns/` | `READY_FOR_ADS` | Money page; no guarantees of tax result. |
| `/otvet-na-zapros-banka/` | `READY_FOR_ADS` | Money page; no bank outcome promise. |
| `/dokumenty-dlya-banka-115-fz/` | `READY_FOR_ADS` | Money page; no 115-FZ unlock/removal promise. |
| `/deklaraciya-usn/` | `READY_FOR_ADS` | Money page; no tax optimization promise. |
| `/nulevaya-otchetnost-ooo/` | `READY_FOR_ADS` | Money page; safe if copy remains factual. |
| `/nulevaya-otchetnost-ip/` | `READY_FOR_ADS` | Money page; safe if copy remains factual. |
| `/registraciya-ooo/` | `READY_FOR_ADS` | Money page; no registration guarantee. |
| `/registraciya-ip/` | `READY_FOR_ADS` | Money page; no registration guarantee. |
| `/yuridicheskiy-adres-simferopol/` | `READY_FOR_ADS` | Money page; no unconfirmed office/legal-entity detail. |
| `/nedostovernost-yuridicheskogo-adresa/` | `READY_FOR_ADS` | Money page; avoid guaranteed correction/removal claims. |
| `/srochnye-voprosy/` | `NEEDS_COPY_FIX` | Ad copy must avoid urgency/deadline promises. |
| `/nalogi-i-rezhimy/` | `BLOCKED_LEGAL_OWNER` | Tax advice/ad framing requires owner/legal review. |
| `/ausn-krym/` | `BLOCKED_LEGAL_OWNER` | Tax regime claims require owner/legal review. |
| `/raschet-nalogovoy-nagruzki/` | `BLOCKED_LEGAL_OWNER` | Tax/load calculations are sensitive. |
| `/nds-pri-usn-2026/` | `BLOCKED_LEGAL_OWNER` | Tax/NDS claims require review before ads. |
| `/policy` | `BLOCKED_LEGAL_OWNER` | Not a commercial landing page. |
| `/o-proekte/` | `BLOCKED_LEGAL_OWNER` | Not a money landing; do not use for paid traffic. |
| `/blog/`, `/blog/obnovleniya-fns/`, `/blog/razbory/`, `/faq/`, `/internal/*` | `BLOCKED_LEGAL_OWNER` | Noindex/internal/foundation pages; do not advertise. |

## Allowed Ad/UTM Rules

- Use only factual service/problem phrasing.
- Allowed UTM keys: `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `yclid`.
- Do not put names, phone numbers, emails, messages, INN/OGRN/KPP, passport data or document text into UTM values.
- Do not promise a result, bank approval, tax saving, 115-FZ removal, deadline, price, discount, review or rating.
- Do not use state-affiliation framing.

## Metrika Goal IDs

- `goal_call_click`
- `goal_route_click`
- `goal_contacts_click`
- `goal_razbor_situacii_click`
- `goal_docs_show_click`
- `goal_service_card_click`
- `goal_fallback_contact_click`
- `goal_form_start`
- `goal_form_submit_attempt`
- `goal_form_submit_fail`
- `goal_related_route_click`

`goal_form_submit_success` exists only as a backend/CRM-accepted future goal and cannot fire from placeholder forms.

## IndexNow

Status: `NOT_ENABLED`

No owner-approved IndexNow key was provided. Do not generate or publish an IndexNow key file, do not submit the full sitemap, and do not automate submissions.

Allowed next step after owner key approval: add `public/<key>.txt`, run a dry-run/manual submission only for changed URLs, and record response evidence.

## Post-Deploy Smoke Check

Repeat after the next deploy from `dokumenty82-site`:

1. `https://dokumenty82.ru/favicon.svg` returns `200 image/svg+xml`.
2. `https://dokumenty82.ru/favicon.ico` returns `200 image/x-icon`.
3. `https://dokumenty82.ru/robots.txt` returns `200 text/plain`.
4. `https://dokumenty82.ru/sitemap.xml` returns `200` and expected URL count.
5. Home HTML contains `109869928`.
6. Home HTML contains `mc.yandex.ru`.
7. Home HTML contains `ym(109869928, 'init', ...)`.
8. Home HTML contains `/watch/109869928`.
9. Home HTML does not enable Webvisor/ecommerce unless separately approved.
10. Canonicals use `https://dokumenty82.ru/`.
11. Noindex/internal routes are excluded from sitemap.
12. 404 route returns the intended not-found page.
13. Metrika LK receives test events for phone, route/contact, situation review and fallback contact.

## Checks

| Check | Result | Notes |
| --- | --- | --- |
| `git diff --check` | `PASS` | No whitespace/diff format issues. |
| `npm ci` | `PASS_WITH_WARNINGS` | Node/npm engine warning: current Node `v25.9.0`, package expects `>=22 <23`; npm audit reports 2 moderate vulnerabilities. |
| `npm run build` | `PASS` | Static export generated. |
| `npm run evidence:p0` | `PASS` | P0 evidence regenerated. |
| `npm run check:p0-evidence` | `PASS` | 14 P0 routes checked. |
| `npm run check:tracking-no-pii` | `PASS` | Approved Metrika/no-PII proof generated. |
| `npm run check:finalization` | `PASS` | Paid traffic remains blocked; forms/CRM remain off. |
| `npm run brand:check` | `PASS` | Brand token, contrast, SVG color/a11y and claims checks passed. |
| Post-build artifact check | `PASS` | `out/favicon.svg`, `out/favicon.ico`, `out/robots.txt`, `out/sitemap.xml`, Metrika init/watch present. |
| Live endpoint smoke | `WATCH` | favicon/robots/sitemap return 200; sitemap count and Metrika init config differ from source. |

## Owner Decision Checklist

- [ ] Confirm `dokumenty82-site` is the deploy source of truth for live.
- [ ] Confirm next deploy will not remove Yandex Metrika `109869928`.
- [ ] Confirm live should use source sitemap with 36 URLs or explain the 30 URL live sitemap.
- [ ] Confirm favicon assets are approved for production.
- [ ] Confirm Metrika goals are created in LK for the listed IDs.
- [ ] Confirm Webvisor/ecommerce are disabled on the deployed artifact unless separately approved.
- [ ] Confirm paid traffic copy contains no guarantees, prices, ratings, reviews or unsupported legal/tax/bank promises.
- [ ] Confirm forms/CRM stay OFF for this PR.
- [ ] Confirm owner GO before any ad spend.

## Final Decision

`BLOCKED_OWNER_DECISION_REQUIRED`

The site is closer to paid-traffic readiness after this PR, but paid traffic must remain `HOLD` until the owner confirms production source/deploy sync, legal approval and Metrika LK goal readiness.
