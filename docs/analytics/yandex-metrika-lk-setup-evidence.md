# Yandex Metrika LK Setup Evidence

Date: 2026-06-16

Agent: Codex

Counter ID: `109869928`

Domain: `https://dokumenty82.ru`

Mode: `AUDIT_ONLY_BLOCKED`

`PUBLIC_LIVE_ALLOWED=false`

## 1. Scope

This evidence records the result of applying the LK setup checklist from `atlas_yandex_metrika_lk_agent_setup_checklist.md`.

No Yandex Metrika personal account setup was performed because the project does not currently contain explicit permission for LK-only setup or runtime activation.

This document is evidence only. It is not owner/legal approval, not `/policy` approval, not analytics/no-PII approval and not permission to modify PR #20.

## 2. Gate Status

| Gate | Status | Evidence |
| --- | --- | --- |
| Stage 21B staging/VPS report received | `no` | No accepted Stage 21B report found in checked repo docs. |
| Owner approval | `no` | Review packs are ready-for-human-review only. |
| Legal/privacy approval | `no` | Legal/privacy gates remain blocked; no accepted legal/privacy artifact found. |
| `/policy` approval | `no` | Review docs explicitly say `/policy` approval is not claimed. |
| Analytics/no-PII approval | `no` | Launch/finalization checks keep no-PII analytics proof missing. |
| Webvisor decision | `missing` | No explicit approved/disabled Webvisor decision found. |
| Runtime activation allowed | `no` | Current runtime is stubbed and activation gates are missing. |
| LK-only setup allowed | `no` | No explicit owner approval for LK-only setup was found. |
| PR #20 untouched | `yes` | PR #20 remains open draft with unchanged head `8f54b596804f1a6f41d087526bc7aca97405ccf5`. |
| Rollback/transport proof | `no` | Finalization checks report rollback/staging proof missing; transport remains gated. |

## 3. Repo State

- Branch: `stage21/metrika-readiness-gate-status`
- Latest commit before this evidence: `abc5385 docs: add Metrika readiness gate status`
- PR #20 touched: `no`
- `analyticsEnabled`: `false`
- `metricaEnabled`: `false`
- `cookieNoticeEnabled`: `false`
- `analyticsConfig.canLoadScript`: `false`
- `analyticsConfig.canSendEvents`: `false`
- `YandexMetrika` renders script: `no`

Runtime grep scope `app components lib package.json` found:

- `109869928`: no matches
- `mc.yandex.ru/metrika/tag.js`: no matches
- `reachGoal`: no matches
- `getClientID`: no matches

## 4. LK Counter Settings

Yandex Metrika LK was not configured in this pass.

Expected target values from the checklist remain future-only:

- counter name: `Документы для бизнеса / dokumenty82.ru`
- site URL: `https://dokumenty82.ru`
- timezone: `not checked`
- currency: `RUB`
- Webvisor: `not enabled`
- clickmap: `not changed`
- trackLinks: `not changed`
- ecommerce: `not enabled`
- filters: `not changed`
- access: `not changed`

Reason: `LK-only setup allowed = no`.

## 5. Goals Created Or Checked

No goals were created or changed in LK.

| goal_id | type | status | notes |
| --- | --- | --- | --- |
| `goal_call_click` | JavaScript event | `blocked` | LK-only setup approval missing. |
| `goal_form_start` | JavaScript event | `blocked` | LK-only setup approval missing. |
| `goal_form_submit_attempt` | JavaScript event | `blocked` | LK-only setup approval missing; not a lead. |
| `page_razbor_situacii_visit` | Page visit | `blocked` | LK-only setup approval missing. |
| `page_kontakty_visit` | Page visit | `blocked` | LK-only setup approval missing. |
| `goal_form_submit_success` | JavaScript event | `blocked` | Live forms/backend/CRM gate missing. |
| `site_lead_created` | JavaScript event | `blocked` | CRM/forms gate missing. |
| `crm_lead_qualified` | Offline event | `blocked` | CRM/offline gate missing. |
| `crm_payment_received` | Offline event | `blocked` | CRM/offline/payment proof missing. |

## 6. Segments And Reports

No LK segments, dashboards or saved reports were created or changed.

Future-only items remain blocked until explicit approval:

- daily analytics control dashboard;
- weekly lead quality dashboard;
- service demand report;
- data quality report;
- retargeting audiences.

## 7. Debug

- `_ym_debug=2` tested: `not applicable`
- PageView seen: `not applicable`
- Reach goal seen: `not applicable`
- No PII in payload: `not applicable`

Reason: runtime analytics and LK setup are not approved.

## 8. Verification Commands

Commands run from repository root:

```bash
git status --short
git branch --show-current
git log -1 --oneline
grep -R "109869928" -n app components lib package.json || true
grep -R "mc.yandex.ru/metrika/tag.js" -n app components lib package.json || true
grep -R "reachGoal" -n app components lib package.json || true
grep -R "getClientID" -n app components lib package.json || true
npm run check:analytics-stubs
npm run check:finalization
npm run build
git diff --check
```

Results:

- Git state before this evidence file: clean.
- Branch: `stage21/metrika-readiness-gate-status`.
- Latest commit before evidence: `abc5385 docs: add Metrika readiness gate status`.
- Runtime grep commands: no matches.
- `npm run check:analytics-stubs`: PASS.
- `npm run check:finalization`: PASS.
- `npm run build`: PASS.
- `git diff --check`: PASS.

Expected finalization blockers remain:

- staging deploy proof missing expected;
- rollback proof missing expected;
- owner/legal acceptance missing expected;
- CRM/forms/analytics acceptance missing expected;
- no-PII analytics payload proof missing expected;
- Search Console/Yandex Webmaster setup missing expected.

## 9. Not Performed

Not performed:

- no PR #20 changes;
- no LK counter changes;
- no goals created in LK;
- no segments/reports created in LK;
- no runtime analytics activation;
- no counter `109869928` inserted into runtime;
- no `mc.yandex.ru/metrika/tag.js`;
- no `ym` init;
- no `reachGoal`;
- no `getClientID`;
- no Webvisor;
- no ecommerce;
- no CRM/forms/webhooks/uploads/messaging;
- no paid traffic optimization;
- no public live, deploy or DNS change.

## 10. Final Verdict

`METRIKA_LK_AUDIT_ONLY_BLOCKED`

Reason:

```text
LK-only setup approval is missing.
Runtime activation approval is missing.
Stage 21B, owner/legal, /policy, analytics/no-PII, Webvisor, rollback and transport gates remain unresolved.
```

`PUBLIC_LIVE_ALLOWED=false`
