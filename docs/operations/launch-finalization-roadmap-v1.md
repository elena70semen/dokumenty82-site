# Launch Finalization Roadmap V1

## Purpose

This roadmap defines the remaining PR sequence before any public LIVE decision for `Документы для бизнеса`. It starts from the current P0 foundation and moves toward evidence-producing finalization.

It does not approve public launch, paid traffic, live forms, live analytics, CRM submission or FNS autopublish.

## PR sequence

| PR | Name | Goal | Depends on | Stop conditions |
| --- | --- | --- | --- | --- |
| A | Browser evidence v1 | prove rendered routes in real browser contexts | current P0 evidence | severe console errors, missing H1, missing footer/header, overflow, unsafe CTA |
| B | Accessibility evidence v1 | prove keyboard/focus/accessibility baseline | PR A or same staging build | keyboard trap, missing focus, critical axe issues |
| C | Forms/CRM/analytics readiness v1 | prove data and event readiness without live activation | PR A, legal docs | PII in payload, false success, missing fallback, unclear CRM acceptance |
| D | Staging deploy, transport and rollback v1 | prove static deploy, staging host, TCP HTTPS baseline and rollback | PR A/B baseline | no rollback path, sitemap/robots drift, hosting/legal uncertainty, HTTP/3/QUIC or Alt-Svc h3 enabled without approval |
| E | Legal/owner acceptance v1 | produce owner/legal go/no-go | PR A-D evidence | policy/consent, CRM, provider or public-claim blocker |
| F | Blog/news pilot v1 | noindex/manual pilot only after PR #49 foundation | PR #49 merged as foundation only, PR A-E where relevant | live autopublish, missing source attribution, copied source material, indexing without approval |
| G | Launch candidate v1 | final prelaunch report and controlled flags | PR A-E pass | any public-live blocker open |

## PR A: Browser evidence v1

Scope:

- Playwright or equivalent browser smoke;
- desktop and mobile screenshots;
- route rendering for P0 pages;
- metadata/canonical/robots extracted from browser DOM;
- header, footer, phone CTA and contact/route CTA checks;
- no upload input;
- no false success;
- no forbidden public phrases in rendered UI;
- horizontal overflow check;
- severe console error report;
- evidence report under `code/evidence/browser/`.

Stop if the rendered browser state differs from the P0 text/JSON evidence.

## PR B: Accessibility evidence v1

Scope:

- axe or equivalent;
- keyboard navigation;
- focus states;
- menu/drawer behavior;
- contrast reminders;
- form/fallback states if visible;
- footer and `/policy` links;
- accessibility report.

Stop if navigation cannot be completed by keyboard or critical accessibility failures remain unexplained.

## PR C: Forms/CRM/analytics readiness v1

Scope:

- event taxonomy review;
- no-PII payload proof;
- form state machine;
- CRM acceptance mock or disabled fallback proof;
- Metrica goals contract review;
- no live enablement unless explicitly approved later.

Stop if `goal_form_submit_success` can fire without backend/CRM acceptance or if payloads include personal text, document text, phone number, private notes or identifiers.

## PR D: Staging Deploy, Transport And Rollback V1

Scope:

- staging build;
- hosting/deploy SOP;
- source-to-site transport sync package from `docs/source-to-site/transport-protocol-launch-gate-sync-v1.md`;
- transport protocol proof: `HTTP/1.1` or `HTTP/2` over `TCP/443` as baseline;
- proof that `HTTP/3` / `QUIC` over `UDP/443` is disabled, closed or explicitly blocked unless separately approved;
- proof that responses do not advertise `Alt-Svc: h3` unless separately approved;
- if Caddy is used, prove default HTTP/3 behavior is disabled;
- if Nginx is used, prove no `listen ... quic` is active;
- static export deploy proof;
- rollback proof;
- Search Console plan;
- Yandex Webmaster plan;
- robots/sitemap submission plan.

Stop if the build cannot be deployed and rolled back reproducibly, or if `HTTP/3` / `QUIC`, `UDP/443`, `Alt-Svc: h3` or active `listen ... quic` is exposed without owner/ops approval and transport proof.

## PR E: Legal/owner acceptance v1

Scope:

- owner sign-off checklist;
- legal sign-off checklist;
- privacy/cookies/forms acceptance;
- phone/contact fallback acceptance;
- public launch go/no-go.

Stop if owner/legal acceptance is missing for policy, consent, provider, forms, analytics, claims or contact channels.

## PR F: Blog/news pilot v1

Only after PR #49 foundation. PR #49 is merged into main as FNS blog/news foundation only. It does not enable live fetch, scheduler, rewrite provider, autopublish, indexing, public launch, paid traffic, forms, analytics or CRM submission.

Scope:

- noindex pilot;
- no live autopublish;
- first evergreen materials or generated mock news only;
- source attribution proof;
- similarity gate plan;
- no copied FNS text or images;
- no `/novosti/` or `/news/` route.

Stop if automation, indexing or live fetch is enabled before owner/legal/editorial acceptance.

## PR G: Launch candidate v1

Only after PR A-E pass.

Scope:

- final prelaunch report;
- public launch checklist;
- live mode flags still controlled;
- evidence links for each gate;
- owner go/no-go decision.

Stop if any `BLOCKS_PUBLIC_LIVE` gate remains open.

## Minimum safe launch mode

The only launch candidate mode this roadmap can prepare before live forms/analytics/CRM is:

`STATIC_CONTACT_ONLY_LAUNCH_CANDIDATE`

It permits staging review with phone/contact paths and static pages. It does not permit public LIVE by itself.

## Verdicts

- Release: `GO WITH CONDITIONS`
- Public launch: `NOT_PUBLIC_LAUNCH_READY`
- Paid traffic: `BLOCKS_PAID_TRAFFIC`
- FNS autopublish: `BLOCKED_UNTIL_SERVER_LEGAL_OWNER_ACCEPTANCE`
