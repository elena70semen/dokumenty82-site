# P0-06 Legal Cookie Metrica No-PII Alignment

Date: `2026-06-17`
Repository: `elena70semen/dokumenty82-site`

## Scope

Bring the public live static site into a safer legal/privacy evidence state while Yandex Metrica remains enabled.

No production deploy is included in this task. No CRM, live forms, upload, paid traffic, Telegram/MAX public messaging links, local profiles, prices, guarantees, deadlines, reviews, ratings, legal identifiers, office/floor/hours or new routes are opened.

## Inputs

- Source-of-truth: `elena70semen/dokumenty-dlya-biznesa`
- Site repository: `elena70semen/dokumenty82-site`
- Current production state from P0-FINAL: production aligned to verified PR static artifact, with docs-only main delta recorded.
- Existing public live flags: `publicLiveAllowed=true`, `metricaEnabled=true`, `analyticsEnabled=false`, forms/CRM/upload/paid traffic/messaging/local profiles closed.

## Current Risk

Metrica is live on a public production site, while the previous owner/legal/privacy evidence still represented an older non-public / no-Metrica state and cookie notice was disabled.

## Changes Made

- Added a non-blocking cookie/analytics notice component.
- Enabled `cookieNoticeEnabled`.
- Added policy disclosure for analytics, cookies and technical events.
- Expanded the tracking no-PII guard and forbidden tracking keys.
- Updated launch/P0/finalization guards for the new public live Metrica + cookie notice mode.
- Updated owner/legal/privacy evidence generation and checks for the new mode.

## Policy Disclosure

`/policy/` now states that the site may use Yandex Metrica for technical analytics, including traffic, phone clicks, CTA transitions and technical events.

It also states that events must not contain names, phones, emails, message/question text, documents, scans, requisites, INN/OGRN, passport data or sensitive details. Clicks are recorded as intent events only, not confirmed leads.

## Cookie Notice

`components/CookieAnalyticsNotice.tsx` is shown only when `cookieNoticeEnabled=true`.

It links to `/policy/`, stores only a local dismissal marker in `localStorage`, does not block the page and does not emit a tracking event on dismissal.

## Metrica No-PII Event Guard

The safe payload allowlist remains typed and limited to page/CTA/route/source attribution context.

`goal_form_submit_success` remains unavailable until backend/CRM acceptance. Direct arbitrary `ym(...)` calls are blocked outside the Metrica init snippet; reachGoal stays behind the typed adapter.

## Forms / CRM / Upload Status

- `formsLive=false`
- `crmEnabled=false`
- `crmSuccessEnabled=false`
- no backend form endpoint
- no public upload
- no webhook or secrets
- no Telegram/MAX public deep links

## Evidence Scripts

Owner/legal/privacy evidence now uses:

```text
PUBLIC_LIVE_METRICA_NO_PII_WITH_COOKIE_NOTICE
```

Expected verdict:

```text
PUBLIC_LIVE_METRICA_NO_PII_WITH_COOKIE_NOTICE_OWNER_LEGAL_REVIEW_REQUIRED
```

## Checks Run

Local runtime note:

- local Node.js: `v24.16.0`
- project/CI runtime: Node.js `22`
- `npm ci` passed with the expected local `EBADENGINE` warning because the local machine is on Node 24 while the project targets Node 22.

Commands:

| Command | Result |
| --- | --- |
| `npm ci --prefer-offline --no-audit --no-fund --loglevel=warn` | PASS |
| `npm run build` | PASS |
| `npm run check:tracking-no-pii` | PASS |
| `npm run evidence:owner-legal-privacy` | PASS |
| `npm run check:owner-legal-privacy` | PASS |
| `npm run check:forms-crm-contract` | PASS |
| `npm run check:launch-live-config` | PASS |
| `npm run check:public-live-config` | PASS |
| `npm run check:launch-readiness` | PASS |
| `npm run check:finalization` | PASS |
| `npm run brand:check` | PASS, with warning-zone documentation matches only |
| `npm run check:static-links` | PASS |
| `npm run release:manifest` | PASS |

## Production Deploy Status

`NOT_DEPLOYED_IN_THIS_TASK`

Production deploy requires a separate owner-approved deploy step after PR review/merge.

## Verdict

`PUBLIC_LIVE_METRICA_NO_PII_WITH_COOKIE_NOTICE_OWNER_LEGAL_REVIEW_REQUIRED`

## Remaining HOLD

- owner/legal acceptance
- final legal wording
- CRM/live forms/form success
- public upload
- paid traffic
- Telegram/MAX public messaging links
- local profiles publication
- prices, guarantees, deadlines, reviews, ratings
- legal identifiers and office/floor/hours

## Next Recommended Task

After PR merge, run the approved deploy step from the verified CI artifact and re-check production HTML for the policy disclosure, cookie notice marker, no-PII tracking guard evidence and unchanged closed gates.
