# Final Paid Traffic Go/No-Go - 2026-06-22

Project: `dokumenty82.ru` / `Документы для бизнеса`

Repository: `elena70semen/dokumenty82-site`

Evidence/master contour: `elena70semen/dokumenty-dlya-biznesa`

PR: `#36`

Final verdict: `BLOCKED_OWNER_DECISION_REQUIRED`

Score: `7/10`

Paid traffic: `HOLD`

Forms/CRM: `OFF`

## Executive Summary

Yandex Webmaster is no longer the active blocker for paid traffic. The current
production/static snapshot in `main` has favicon files, `robots.txt`,
`sitemap.xml`, canonical static HTML, and Yandex Metrika counter `109869928`.

PR #36 cleanup was required because the previous PR branch contained a large
unrelated scope and was conflicting with current `main`. The clean PR branch is
rebased from current `origin/main` and keeps only this readiness/go-no-go
evidence file. Production static files are inherited from `main` and are not
changed in this cleanup PR.

Do not launch ads, do not merge/deploy for paid traffic, do not enable
forms/CRM, and do not change Metrika counter `109869928` until the owner makes
an explicit final decision.

## Gate Status

| Gate | Status | Evidence / note |
| --- | --- | --- |
| Yandex Webmaster | `OBSERVATION` | No current LK blocker reported in this workstream; sitemap/robots are accessible and submitted URLs are under observation. |
| Production source of truth | `OWNER_DECISION_REQUIRED` | This repo contains the current production static snapshot, but the live deploy pipeline/source must still be explicitly confirmed by the owner/deployer. |
| PR #95 from evidence repo | `NOT_DEPLOY_ARTIFACT` | `elena70semen/dokumenty-dlya-biznesa` PR #95 must not be used as a direct deploy artifact. |
| PR #36 scope | `PASS_CLEANED` | Clean branch was rebuilt from current `origin/main`; old broad source/stage/evidence changes were removed from PR scope. |
| Merge conflict | `RESOLVED_BY_CLEAN_BRANCH` | Conflict-causing scope was removed; GitHub reports PR #36 as `MERGEABLE` after cleanup. |
| Favicon | `PASS_STATIC_MAIN` | Current static snapshot contains root `favicon.svg` and `favicon.ico`. |
| Robots | `PASS_STATIC_MAIN_WITH_OWNER_NOTE` | Current `robots.txt` allows public crawl, disallows `/internal/`, points to canonical sitemap, and includes public-live comments. |
| Sitemap | `PASS_STATIC_MAIN_30` | Current `sitemap.xml` contains 30 canonical URLs. Any 36-route expansion remains a separate owner/SEO decision. |
| Canonical/index/noindex | `STATIC_ARTIFACT_PASS_WITH_WATCH` | Static HTML uses canonical `https://dokumenty82.ru/` URLs; internal/noindex boundaries must be smoke-tested after next deploy. |
| 404 | `STATIC_ARTIFACT_PRESENT` | Static snapshot contains `404.html` and `_not-found/`; live status behavior must be smoke-tested on hosting. |
| Yandex Metrika 109869928 | `PASS_STATIC_MAIN` | Static HTML includes `109869928`, `mc.yandex.ru`, `ym(109869928, ...)`, and `/watch/109869928`. |
| Metrika init options | `OWNER_LEGAL_DECISION_REQUIRED` | Current static snapshot includes `webvisor:true` and `ecommerce:"dataLayer"` in generated HTML. This cleanup PR does not change that without owner/legal approval. |
| Metrika goals / reachGoal | `STATIC_ARTIFACT_PRESENT_NEEDS_LK_CONFIRMATION` | Static JS contains `reachGoal` dispatch and safe goal names; LK goal configuration/firing must be confirmed before ads. |
| No-PII analytics | `STATIC_ARTIFACT_EVIDENCE_ONLY` | Static JS contains an allowlist and forbidden-key cleanup; source-level `check:tracking-no-pii` is not runnable from current static `main` because no `package.json` exists. |
| UTM persistence | `STATIC_ARTIFACT_PRESENT` | Static JS stores allowed attribution keys only. |
| Forms/CRM | `PASS_OFF` | Static JS feature flags show `formsLive:false`, `crmEnabled:false`, `crmSuccessEnabled:false`, `paidTrafficAllowed:false`. |
| Legal/owner | `BLOCKER` | Explicit owner GO for paid traffic is not recorded. |
| IndexNow | `NOT_ENABLED` | No owner-approved IndexNow key. No key file and no sitemap-wide submission. |

## PR #36 Conflict Cleanup Check

Date: `2026-06-22`

Cleanup strategy: clean branch from `origin/main`, PR-scoped changes only.

### Result

- PR scope cleanup: `PASS`
- Merge conflict: `RESOLVED_BY_CLEAN_BRANCH`
- GitHub mergeability after cleanup: `MERGEABLE`
- Draft status: must remain `true`
- Paid traffic: `HOLD`
- Forms/CRM: `OFF`
- Verdict: `BLOCKED_OWNER_DECISION_REQUIRED`

### Removed From PR Scope

- Old stage 15/16/17/18 foundation docs and evidence.
- Broad `app/`, `components/`, `lib/`, route/layout/content rewrites.
- Unrelated handoff file `docs/handoff/vitya-vps-launch-handoff.md`.
- Broad unrelated checks/scripts/evidence.
- Full Next source/package changes were not reintroduced because current
  `origin/main` is a production static snapshot.

### Kept In PR Scope

- `docs/ads/final-paid-traffic-go-no-go-2026-06-22.md`.
- Production static files are inherited from current `origin/main`:
  `favicon.svg`, `favicon.ico`, `robots.txt`, `sitemap.xml`, static HTML, and
  Metrika `109869928`.

## Closed Items

- PR #36 has a backup branch before cleanup:
  `backup/pr36-before-cleanup-9f11b5d`.
- Clean branch was created from current `origin/main`.
- PR scope is reduced to the readiness/go-no-go report only.
- Current static `main` already contains `favicon.svg` and `favicon.ico`.
- Current static `main` preserves Yandex Metrika counter `109869928`.
- Current static `main` has `robots.txt` with `/internal/` disallowed.
- Current static `main` has a 30 URL `sitemap.xml`.
- Forms, CRM and paid traffic remain off in static feature flags.
- No IndexNow key was added.
- No paid traffic, deploy, PR ready state, or merge action was performed.

## Blockers

1. `OWNER_GO_MISSING`: owner must explicitly approve paid traffic launch.
2. `DEPLOY_SOURCE_NOT_PROVEN`: the live deploy pipeline/source must be
   confirmed by the owner/deployer.
3. `STATIC_MAIN_VS_SOURCE_DECISION_REQUIRED`: current `main` is a static
   production snapshot, not the full Next source tree. Future source-of-truth
   and deploy workflow must be confirmed before owner GO.
4. `SITEMAP_CONTOUR_DECISION_REQUIRED`: current static sitemap contains 30 URLs;
   prior source candidate contained 36 URLs. Do not expand without owner/SEO
   decision.
5. `METRIKA_WEBVISOR_ECOMMERCE_OWNER_LEGAL_DECISION`: current static HTML
   includes Webvisor/ecommerce init options. Do not change, disable, or rely on
   them for ads without owner/legal/privacy decision.
6. `METRIKA_LK_GOALS_CONFIRMATION_REQUIRED`: goal IDs are present in static
   code, but LK goal setup and firing must be verified after deploy.
7. `LEGAL_OWNER_SIGNOFF_REQUIRED`: ads for taxes, banks and 115-FZ require
   owner/legal confirmation of copy, claims and disclaimers.
8. `FORMS_CRM_HOLD`: forms/CRM remain off; enabling them requires a separate
   approved PR.

## Should Fix

- Confirm the actual hosting/deploy source and release procedure.
- Decide whether future deploys should use the static snapshot contour or a
  restored full Next source build pipeline.
- Confirm whether the 30 URL sitemap remains the approved advertising/indexing
  contour.
- Confirm Metrika Webvisor/ecommerce/privacy position before any paid traffic.
- Confirm Metrika goals in LK and smoke-test actual events.
- Update privacy/legal text only after owner confirms the real analytics/forms
  state.
- Keep PR #36 as Draft until owner/deploy/legal gates are complete.

## Watch

- Yandex indexing status for submitted URLs.
- Sitemap processing and canonical/index statuses after the next crawl.
- Live favicon/robots/sitemap drift after any deploy.
- Metrika event receipt in LK.
- No accidental enabling of paid traffic, forms, CRM, IndexNow, Webvisor or
  ecommerce without explicit owner/legal approval.

## Landing Page Advertising Status

Global condition for every `READY_FOR_ADS` page: owner GO, deploy source
confirmation, live smoke check, legal copy review, and Metrika LK goal
confirmation are still required.

| Page | Status | Notes |
| --- | --- | --- |
| `/` | `READY_FOR_ADS_AFTER_GLOBAL_GATES` | Safe router/home entry after global gates. |
| `/razbor-situacii/` | `READY_FOR_ADS_AFTER_GLOBAL_GATES` | Best primary first-step landing. |
| `/kontakty/` | `READY_FOR_ADS_AFTER_GLOBAL_GATES` | Safe local/contact landing. |
| `/otchetnost/` | `READY_FOR_ADS_AFTER_GLOBAL_GATES` | Hub page; use broad accounting/reporting intent only. |
| `/bank-i-115-fz/` | `READY_FOR_ADS_AFTER_GLOBAL_GATES` | Avoid bank/115-FZ outcome guarantees. |
| `/otvet-na-trebovanie-ifns/` | `READY_FOR_ADS_AFTER_GLOBAL_GATES` | No guarantees of tax result. |
| `/otvet-na-zapros-banka/` | `READY_FOR_ADS_AFTER_GLOBAL_GATES` | No bank approval/result promise. |
| `/dokumenty-dlya-banka-115-fz/` | `READY_FOR_ADS_AFTER_GLOBAL_GATES` | No 115-FZ unlock/removal promise. |
| `/deklaraciya-usn/` | `READY_FOR_ADS_AFTER_GLOBAL_GATES` | No tax optimization promise. |
| `/nulevaya-otchetnost-ooo/` | `READY_FOR_ADS_AFTER_GLOBAL_GATES` | Safe if copy remains factual. |
| `/nulevaya-otchetnost-ip/` | `READY_FOR_ADS_AFTER_GLOBAL_GATES` | Safe if copy remains factual. |
| `/registraciya-ooo/` | `READY_FOR_ADS_AFTER_GLOBAL_GATES` | No registration guarantee. |
| `/registraciya-ip/` | `READY_FOR_ADS_AFTER_GLOBAL_GATES` | No registration guarantee. |
| `/yuridicheskiy-adres-simferopol/` | `READY_FOR_ADS_AFTER_GLOBAL_GATES` | No unconfirmed office/legal-entity detail. |
| `/nedostovernost-yuridicheskogo-adresa/` | `READY_FOR_ADS_AFTER_GLOBAL_GATES` | Avoid guaranteed correction/removal claims. |
| `/srochnye-voprosy/` | `NEEDS_COPY_FIX` | Ad copy must avoid urgency/deadline promises. |
| `/nalogi-i-rezhimy/` | `BLOCKED_LEGAL_OWNER` | Tax advice/ad framing requires owner/legal review. |
| `/ausn-krym/` | `BLOCKED_LEGAL_OWNER` | Tax regime claims require owner/legal review. |
| `/raschet-nalogovoy-nagruzki/` | `BLOCKED_LEGAL_OWNER` | Tax/load calculations are sensitive. |
| `/nds-pri-usn-2026/` | `BLOCKED_LEGAL_OWNER` | Tax/NDS claims require owner/legal review before ads. |
| `/policy/` | `DO_NOT_ADVERTISE` | Legal/supporting page, not a commercial landing. |
| `/o-proekte/` | `DO_NOT_ADVERTISE` | Trust/supporting page, not a money landing. |
| `/blog/`, `/faq/`, `/internal/*` | `DO_NOT_ADVERTISE` | Content/internal/foundation pages; do not use for paid traffic. |

## Allowed Ad And UTM Rules

- Use only factual service/problem phrasing.
- Allowed UTM keys: `utm_source`, `utm_medium`, `utm_campaign`,
  `utm_content`, `utm_term`, `utm_id`, `utm_referrer`, `yclid`, `ysclid`,
  `from`, `gclid`, `fbclid`.
- Do not put names, phone numbers, emails, messages, INN/OGRN/KPP, passport
  data, bank data, document text or scan/file names into UTM values.
- Do not promise a result, bank approval, tax saving, 115-FZ removal, deadline,
  price, discount, review or rating.
- Do not use state-affiliation framing.

## Metrika Goal IDs To Confirm In LK

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
- `consultation_cta_click`
- `hero_cta_click`
- `scenario_card_click`
- `support_bridge_click`
- `fallback_contact_click`

`goal_form_submit_success` must remain backend/CRM-gated and cannot be enabled
while forms/CRM are on HOLD.

## IndexNow

Status: `NOT_ENABLED`

No owner-approved IndexNow key was provided. Do not generate or publish an
IndexNow key file, do not submit the full sitemap, and do not automate
submissions.

Allowed future step after owner key approval: add `public/<key>.txt`, run a
manual/dry-run submission only for changed URLs, and record response evidence.

## Post-Deploy Smoke Check

Repeat after the next confirmed deploy:

1. `https://dokumenty82.ru/favicon.svg` returns `200 image/svg+xml`.
2. `https://dokumenty82.ru/favicon.ico` returns `200 image/x-icon`.
3. `https://dokumenty82.ru/robots.txt` returns `200 text/plain`.
4. `https://dokumenty82.ru/sitemap.xml` returns `200` and the approved URL
   count.
5. Home HTML contains `109869928`.
6. Home HTML contains `mc.yandex.ru`.
7. Home HTML contains `ym(109869928, ...)`.
8. Home HTML contains `/watch/109869928`.
9. Metrika init options match owner/legal/privacy decision.
10. Canonicals use `https://dokumenty82.ru/`.
11. Noindex/internal routes are excluded from sitemap.
12. 404 route returns the intended not-found page/status.
13. Metrika LK receives test events for phone, route/contact, situation review
    and fallback contact.

## Checks

| Check | Result | Notes |
| --- | --- | --- |
| Backup branch | `PASS` | `backup/pr36-before-cleanup-9f11b5d` was created before cleanup. |
| Clean branch from `origin/main` | `PASS` | Cleanup branch starts from current static `origin/main`. |
| Static favicon files | `PASS` | Root `favicon.svg` and `favicon.ico` exist in current static snapshot. |
| Static robots | `PASS_WITH_OWNER_NOTE` | `/internal/` is disallowed; public-live comments remain inherited from `main`. |
| Static sitemap | `PASS` | 30 canonical URLs. |
| Static Metrika counter | `PASS` | `109869928`, `mc.yandex.ru`, `ym(...)`, and `/watch/109869928` found. |
| Static reachGoal | `PASS` | `reachGoal` dispatch is present in compiled JS. |
| Static feature flags | `PASS` | `formsLive:false`, `crmEnabled:false`, `crmSuccessEnabled:false`, `paidTrafficAllowed:false`. |
| `git diff --check` | `PASS` | No whitespace/diff format issues after report update. |
| `npm ci` | `NOT_APPLICABLE` | Current `origin/main` is a static snapshot and has no `package.json`; cleanup intentionally does not reintroduce the source package. |
| `npm run build` | `NOT_APPLICABLE` | No source package in current static `main`. |
| `npm run check:tracking-no-pii` | `NOT_APPLICABLE` | No source package in current static `main`; static allowlist evidence is recorded above. |
| `npm run check:finalization` | `NOT_APPLICABLE` | No source package in current static `main`. |
| `npm run brand:check` | `NOT_APPLICABLE` | No source package in current static `main`. |
| GitHub PR mergeability | `PASS` | PR #36 reports `MERGEABLE` after force-with-lease cleanup push. |
| GitHub checks | `NOT_REPORTED` | GitHub reports no checks on the cleaned PR branch. |

## Owner Decision Checklist

- Confirm whether current static `main` is the deploy source for live.
- Confirm whether PR #36 may be merged after remaining gates are closed.
- Confirm whether the 30 URL sitemap contour remains approved.
- Confirm Metrika Webvisor/ecommerce privacy/legal position.
- Confirm Metrika LK goals and event names.
- Confirm legal copy for tax, bank and 115-FZ ad groups.
- Confirm forms/CRM remain off for this launch stage.
- Give explicit written `OWNER_GO` before any paid traffic launch.

Final decision remains:

`BLOCKED_OWNER_DECISION_REQUIRED`
