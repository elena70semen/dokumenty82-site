# Yandex Metrika Future Human-Gated Playbook

Status: `FUTURE_PLAYBOOK_ONLY`

Release state: `PR20_HANDOFF_READY_FOR_VITYA_STAGING_DRY_RUN`

`PUBLIC_LIVE_ALLOWED=false`

## 1. Scope

This document is a future implementation playbook for Yandex Metrika counter `109869928`.

It is not activation approval. It does not approve analytics, Metrika, Webvisor, `reachGoal`, ClientID collection, offline conversions, ecommerce, CRM/forms, paid traffic, retargeting, deploy, DNS or public live.

PR #20 remains frozen for Vitya's Stage 21B staging/VPS dry run. This document must not be used to change PR #20, mark it ready, merge it, deploy it or enable any live integration.

## 2. Current Safe State

The current safe state must remain:

- no analytics/Metrika activation;
- no Webvisor activation;
- no `reachGoal` bridge;
- no ClientID/offline conversions;
- no CRM/forms;
- no cookie notice activation;
- no public live;
- `PUBLIC_LIVE_ALLOWED=false`.

Current code facts that must remain true until a separate owner/legal/staging decision:

- `analyticsEnabled: false`;
- `metricaEnabled: false`;
- `cookieNoticeEnabled: false`;
- `formsLive: false`;
- `crmSuccessEnabled: false`;
- analytics mode is `stub`;
- Yandex Metrika ID is `00000000`;
- `analyticsConfig.canLoadScript` is `false`;
- `analyticsConfig.canSendEvents` is `false`;
- `YandexMetrika` renders `null`;
- no real counter appears in runtime code;
- no Yandex Metrika script appears in built output.

## 3. Required Human Gates Before Any Future Activation

Counter `109869928` must not be enabled before all of these are explicitly approved and evidenced:

- owner approval;
- legal/privacy approval;
- `/policy` approval;
- analytics/no-PII proof;
- Stage 21B staging/VPS report review;
- staging verification;
- rollback proof;
- transport proof;
- explicit production go/no-go decision.

Webvisor is disabled unless explicitly approved.

The `reachGoal` bridge is disabled unless explicitly approved.

ClientID collection and offline conversions are disabled unless explicitly approved.

CRM/forms are disabled unless separately approved.

`/policy` must be approved before any analytics, session replay, ClientID collection, live forms or CRM submission.

## 4. Do Not Implement Now

Do not implement or activate any of the following in this stage:

- `109869928` runtime activation;
- Yandex tag script;
- `ym` init;
- Webvisor;
- `reachGoal`;
- ClientID;
- offline conversions;
- ecommerce;
- forms/CRM;
- paid traffic optimization;
- retargeting audiences.

Do not add live tokens, counters, secrets, environment values, CRM endpoints, webhooks, upload inputs, messaging links, deploy settings, DNS settings or public-live switches.

## 5. Future Phases

All phases below are `BLOCKED / NON-ACTIVE` until the required human gates pass.

| Phase | Name | Status | Exit criteria |
| --- | --- | --- | --- |
| A | Human approval and legal/privacy gate | `BLOCKED / NON-ACTIVE` | Owner/legal approves `/policy`, analytics scope, cookie/consent position and no-PII boundary. |
| B | Staging-only analytics proof | `BLOCKED / NON-ACTIVE` | Stage 21B staging/VPS report is reviewed, staging is non-indexed, and analytics testing is explicitly allowed for staging only. |
| C | No-PII tracking contract | `BLOCKED / NON-ACTIVE` | Allowed event names and payload keys are documented; PII and free text are excluded by automated checks. |
| D | Real Metrika counter insertion | `BLOCKED / NON-ACTIVE` | Counter `109869928` is approved for the exact environment and inserted only through a reviewed implementation PR. |
| E | Webvisor decision | `BLOCKED / NON-ACTIVE` | Webvisor/session replay is either explicitly approved with privacy controls or explicitly disabled. |
| F | `reachGoal` event bridge | `BLOCKED / NON-ACTIVE` | Safe event dispatcher is reviewed, no false success events exist, and staging debug evidence passes. |
| G | ClientID and CRM/offline conversion design | `BLOCKED / NON-ACTIVE` | CRM/backend contract, storage basis, identifiers, retention and offline conversion process are approved. |
| H | Production go/no-go | `BLOCKED / NON-ACTIVE` | Owner accepts staging, legal/privacy, analytics/no-PII, rollback, transport and production release evidence. |
| I | Monitoring and rollback | `BLOCKED / NON-ACTIVE` | Monitoring owner, rollback steps and bad-data handling are documented and tested. |

## 6. No-PII Analytics Boundary

Future analytics payloads, if approved, may contain only route, CTA and attribution classifiers. They must not contain:

- names;
- phone numbers;
- email addresses;
- free-text questions or messages;
- document text;
- file names;
- INN/OGRN or requisites;
- passport or bank data;
- CRM notes;
- private chat contents;
- client addresses or client documents.

Clicks, route actions, placeholder form attempts and fallback states are not confirmed leads.

`goal_form_submit_success` may exist only after backend/CRM acceptance proves that a lead was actually received.

## 7. Current Freeze Verification Checklist

Run from the site repository root:

```bash
git status --short
grep -R "109869928" -n app components lib docs package.json || true
grep -R "mc.yandex.ru/metrika/tag.js" -n app components lib docs package.json || true
grep -R "reachGoal" -n app components lib docs package.json || true
grep -R "getClientID" -n app components lib docs package.json || true
npm run check:analytics-stubs
npm run check:finalization
npm run build
```

Expected result:

- runtime directories `app`, `components` and `lib` do not contain active Metrika code;
- docs-only references may appear in this playbook or other review docs;
- `check:analytics-stubs`, `check:finalization` and `build` pass;
- no PR #20 runtime file is changed.

## 8. Acceptance Criteria

This documentation-only gate is accepted only if:

- `analyticsEnabled` remains `false`;
- `metricaEnabled` remains `false`;
- `cookieNoticeEnabled` remains `false`;
- `analyticsConfig.canLoadScript` remains `false`;
- `analyticsConfig.canSendEvents` remains `false`;
- `YandexMetrika` returns `null`;
- no real counter appears in runtime code;
- no Yandex Metrika script appears in built output;
- no `reachGoal` bridge exists;
- no Webvisor activation exists;
- no ClientID/offline conversion flow exists;
- PR #20 remains untouched;
- no launch, deploy, DNS or public-live change is made.

## 9. Source Alignment

This playbook follows the source-of-truth constraints:

- analytics/Metrika remains blocked until no-PII proof and legal/privacy approval;
- paid traffic remains blocked until analytics, CRM, attribution, landing QA and legal review are accepted;
- `/policy` remains a separate owner/legal decision;
- HOLD fields, credentials, secrets and private access data must not be committed;
- public live remains blocked until explicit owner go/no-go.

Release verdict for this document:

`DOCUMENTATION_ONLY_READY_WITH_CONDITIONS`

`PUBLIC_LIVE_ALLOWED=false`
