# Yandex Metrika / Webmaster / SEO Instruction Intake Status

Status: `EXTERNAL_INSTRUCTION_INTAKE_WITH_BLOCKERS`

Source file reviewed: `CODEX_YANDEX_METRICA_WEBMASTER_SEO_INSTRUCTIONS.md`

Date: 2026-06-16

`PUBLIC_LIVE_ALLOWED=false`

## 1. Decision

The external instruction file was reviewed, but it must not be copied into the repository as an executable implementation prompt in its current form.

Reason: the file contains useful Yandex Webmaster and SEO runbook material, but its technical assumptions do not match the current site repository state and would incorrectly authorize runtime Yandex Metrika activation.

No runtime activation was performed.

PR #20 remains untouched.

## 2. Current Repository Facts

Current safe runtime state:

- `analyticsEnabled: false`
- `metricaEnabled: false`
- `cookieNoticeEnabled: false`
- analytics mode is `stub`
- Yandex Metrika ID is `00000000`
- `analyticsConfig.canLoadScript: false`
- `analyticsConfig.canSendEvents: false`
- `components/analytics/YandexMetrika.tsx` returns `null`
- no real counter exists in runtime code
- no Yandex Metrika tag loads
- no `reachGoal` bridge exists
- no `getClientID` flow exists
- no CRM/forms activation exists
- no public live approval exists

Current launch gates:

- owner/legal acceptance: `MISSING_EXPECTED`
- `/policy` approval: `MISSING_EXPECTED`
- analytics/no-PII approval: `MISSING_EXPECTED`
- Webvisor decision: `MISSING_EXPECTED`
- Stage 21B staging/VPS report: `MISSING_EXPECTED`
- rollback proof: `MISSING_EXPECTED`
- transport proof: `MISSING_EXPECTED`
- public live go/no-go: `NOT_STARTED`

## 3. Mismatches In The External Instruction

The external file says or assumes:

- counter `109869928` is already installed in `app/layout.tsx`;
- `metricaEnabled: true`;
- a public-live enabled flag;
- an unsafe public-live true marker in `robots.txt`;
- Yandex Metrika runtime bridge should be implemented now;
- `check:tracking-no-pii` and `check:yandex-metrica` should be added to CI;
- production HTML should contain counter `109869928`.

Current repository reality:

- active runtime Metrika is disabled;
- `metricaEnabled` is `false`;
- `PUBLIC_LIVE_ALLOWED=false`;
- `components/analytics/YandexMetrika.tsx` renders `null`;
- `check:analytics-stubs` is the active guardrail, not a live-Metrika guard;
- PR #20 is frozen for Vitya's staging/VPS dry run;
- analytics/Metrika remains blocked until explicit human gates pass.

Therefore the implementation phases that enable runtime Metrika, `ym`, `reachGoal`, Webvisor, ClientID, ecommerce or Metrika/Webmaster linking are blocked.

## 4. Safe Parts To Keep As Future Runbook

The following parts are useful as future/manual guidance after the missing gates are resolved:

- use canonical host `https://dokumenty82.ru/`;
- submit `https://dokumenty82.ru/sitemap.xml` in Yandex Webmaster;
- check `robots.txt` in Yandex Webmaster;
- verify that sitemap contains only approved indexed routes;
- keep `/internal/` out of public indexing;
- keep noindex foundation/blog routes out of sitemap until approved;
- check canonical and meta robots behavior for representative routes;
- use `https://dokumenty82.ru/kontakty/` for regionality evidence when owner/legal accepts public facts;
- monitor important pages after public launch;
- keep PII out of analytics payloads and `data-*` attributes;
- keep form success, CRM/offline conversions, ecommerce and retargeting blocked until their separate gates pass.

Allowed current manual Webmaster step, if the site is publicly accessible and owner/SEO approves it:

```text
Submit sitemap URL only:
https://dokumenty82.ru/sitemap.xml
```

This sitemap action does not approve analytics, Metrika, CRM/forms, paid traffic, deploy, DNS, public live, owner/legal acceptance or `/policy`.

## 5. Blocked Actions

Do not implement now:

- inserting counter `109869928` into runtime;
- loading `mc.yandex.ru/metrika/tag.js`;
- adding `ym(..., "init", ...)`;
- adding `ym(..., "reachGoal", ...)`;
- adding a `reachGoal` bridge;
- adding `getClientID`;
- enabling Webvisor/session replay;
- enabling ecommerce/dataLayer;
- creating runtime Metrika checks that require `metricaEnabled: true`;
- changing `analyticsEnabled`, `metricaEnabled` or `cookieNoticeEnabled`;
- enabling CRM/forms/webhooks/uploads/messaging;
- enabling paid traffic or retargeting audiences;
- linking Metrika to Webmaster as an activation gate substitute;
- treating Webmaster sitemap submission as public live approval.

## 6. Evidence Checked

Files/areas checked:

- `lib/feature-flags.ts`
- `lib/integrations/analytics-config.ts`
- `components/analytics/YandexMetrika.tsx`
- `public/robots.txt`
- `public/sitemap.xml`
- `docs/operations/live-launch-gates-v1.md`
- `docs/review/stage19-human-review-and-staging-decision-pack.md`
- `docs/analytics/yandex-metrika-activation-readiness-status.md`
- `docs/analytics/yandex-metrika-lk-setup-evidence.md`

Current `robots.txt`:

- allows public paths;
- declares `Host: dokumenty82.ru`;
- declares `Sitemap: https://dokumenty82.ru/sitemap.xml`;
- declares `Clean-param` for UTM/Yandex parameters.

Current `sitemap.xml`:

- contains approved indexed site routes;
- does not include `/internal/`;
- does not include `/blog/`, `/blog/obnovleniya-fns/` or `/blog/razbory/`.

## 7. Required Gates Before Any Future Runtime Metrika Work

Before any runtime Yandex Metrika implementation, all of the following must be present:

- Stage 21B staging/VPS report accepted;
- owner approval;
- legal/privacy approval;
- `/policy` approval;
- analytics/no-PII proof accepted;
- Webvisor/session replay decision;
- staging verification;
- rollback proof;
- transport proof;
- explicit analytics activation go/no-go;
- explicit decision whether setup is LK-only, staging-only or production.

## 8. Final Verdict

`YANDEX_METRIKA_WEBMASTER_SEO_INSTRUCTION_INTAKE_BLOCKED_FOR_RUNTIME`

`WEBMASTER_SITEMAP_MANUAL_STEP_ALLOWED_WITH_CONDITIONS`

`PUBLIC_LIVE_ALLOWED=false`
