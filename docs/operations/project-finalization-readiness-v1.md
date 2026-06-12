# Project Finalization Readiness V1

## Purpose

This file defines readiness to move from the current strong P0 foundation into controlled finalization and launch preparation for `https://dokumenty82.ru/`.

It is not a public launch approval, paid traffic approval, CRM/live analytics activation, FNS fetch activation or autopublish activation. It is the source-of-truth control layer for what is ready, what is blocked and what evidence must be produced before LIVE.

## Current state summary

| Area | State |
| --- | --- |
| P0 code alignment | complete as a text/JSON evidence baseline |
| P0 evidence | complete for lightweight local proof |
| Static build | available through `code/` |
| Source-of-truth docs | strong and ready for controlled finalization |
| Source-to-site transport sync package | ready with conditions; target site repository unavailable in current Codex environment |
| Public launch | blocked |
| Paid traffic | blocked |
| FNS autopublish | PR #49 merged as foundation only; no live fetch, scheduler, rewrite provider, autopublish or indexing |
| CRM/forms/analytics | disabled or not accepted |

## Readiness matrix

| Area | Status | Evidence | Blockers | Required next action | Owner | Launch impact |
| --- | --- | --- | --- | --- | --- | --- |
| Strategy | READY_WITH_CONDITIONS | README, AGENTS, launch contour, strengthening audits | acceptance evidence missing | use this finalization package as execution control | Owner / project lead | DOES_NOT_BLOCK_P0_FINALIZATION |
| Route registry | READY | `docs/seo/route-registry.md`, `code/lib/routes.ts` | full public expansion still needs proof | keep one URL = one intent during browser QA | SEO / frontend | BLOCKS_PUBLIC_LIVE if drift appears |
| Metadata | PARTIAL | `docs/seo/metadata-map.md`, P0 metadata proof | full-route metadata review and browser DOM proof missing | capture browser head snapshots | SEO / QA | BLOCKS_PUBLIC_LIVE |
| Sitemap | READY_WITH_CONDITIONS | `code/public/sitemap.xml`, `code/evidence/p0/sitemap-proof.json` | submission plan not approved | verify on staging and prepare Webmaster submission plan | SEO / ops | BLOCKS_PUBLIC_LIVE until staging proof |
| Robots/canonical | READY_WITH_CONDITIONS | P0 evidence, `/policy` slash policy | browser DOM proof missing | verify canonical/robots in browser | SEO / QA | BLOCKS_PUBLIC_LIVE if mismatch appears |
| P0 code | READY_WITH_CONDITIONS | `code/`, `npm run check:p0-semantic` | browser and sign-off proof missing | keep checks green while finalizing | Frontend / QA | DOES_NOT_BLOCK_FINALIZATION |
| P0 evidence | READY_WITH_CONDITIONS | `code/evidence/p0/summary.md` | visual and browser evidence missing | add browser evidence PR | QA | BLOCKS_PUBLIC_LIVE |
| Browser rendering | NOT_STARTED | none committed for browser screenshots | screenshots, DOM, console and overflow proof missing | PR A: Browser evidence v1 | QA / frontend | BLOCKS_PUBLIC_LIVE |
| Accessibility | NOT_STARTED | requirements only | axe, keyboard and focus proof missing | PR B: Accessibility evidence v1 | QA / frontend | BLOCKS_PUBLIC_LIVE |
| Playwright E2E | NOT_STARTED | none | smoke suite missing | add route, CTA and safety smoke checks | QA / frontend | BLOCKS_PUBLIC_LIVE |
| Forms | BLOCKED | feature flags closed | backend/CRM acceptance and consent not approved | keep disabled; prove fallback | Backend / legal / CRM | BLOCKS_PUBLIC_LIVE for forms |
| CRM | BLOCKED | CRM contracts and traceability docs | provider, acceptance and no-PII proof missing | PR C: readiness without live activation | CRM implementer | BLOCKS_PAID_TRAFFIC |
| Analytics/Metrica | BLOCKED | analytics contract docs | counter, goals and no-PII proof missing | keep disabled until accepted | Analytics / legal | BLOCKS_PUBLIC_LIVE and BLOCKS_PAID_TRAFFIC |
| Privacy/legal | READY_WITH_CONDITIONS | legal compliance docs and `/policy` implementation | owner/legal acceptance missing | PR E: legal/owner acceptance | Owner / legal | BLOCKS_PUBLIC_LIVE |
| Lead collectors | PARTIAL | collector docs and P0 collector proof | browser behavior and CRM source proof missing | test in browser and document fallback | UX / CRM / QA | BLOCKS_PUBLIC_LIVE |
| Contact actions | READY_WITH_CONDITIONS | phone, contacts and route docs | messaging actions still gated | prove contact-only behavior on staging | UX / QA | DOES_NOT_BLOCK_STATIC_CONTACT_REVIEW |
| Header/footer/navigation | PARTIAL | global docs, current code | browser snapshots and keyboard behavior missing | include in PR A and PR B | Frontend / QA | BLOCKS_PUBLIC_LIVE |
| Mobile UX | PARTIAL | UX docs and current responsive code | mobile screenshots and overflow proof missing | capture mobile snapshots | Frontend / QA | BLOCKS_PUBLIC_LIVE |
| Blog/news | MERGED_FOUNDATION_ONLY | PR #49 merged into main as FNS blog/news foundation only | noindex foundation only; no live fetch, scheduler, rewrite provider, autopublish or indexing | keep noindex/excluded; prepare later manual pilot only after owner/legal/editorial gates | Content / SEO / legal | DOES_NOT_BLOCK_FINALIZATION |
| FNS autopublish | BLOCKED | PR #49 foundation only | scheduler, source approval, rewrite provider, validation, audit and rollback missing | no activation; design later controlled pilot | Ops / legal / owner | BLOCKS_AUTOPUBLISH |
| Hosting/deploy | NOT_STARTED | static build available; current Nginx template has no active `listen ... quic` directive; source-to-site transport sync package exists | staging host, deploy SOP and transport proof missing | PR D: staging deploy, transport and rollback proof | Ops / frontend | BLOCKS_PUBLIC_LIVE |
| Rollback | NOT_STARTED | rollback required in docs | rollback proof missing | run rollback drill on staging | Ops | BLOCKS_PUBLIC_LIVE |
| Search Console | NOT_STARTED | SEO docs | domain verification and submission plan missing | prepare setup plan after staging proof | SEO / owner | BLOCKS_PUBLIC_LIVE |
| Yandex Webmaster | NOT_STARTED | Yandex docs | verification and sitemap plan missing | prepare setup plan after staging proof | SEO / owner | BLOCKS_PUBLIC_LIVE |
| Paid traffic | BLOCKED | Direct docs and readiness blockers | tracking, CRM, landing QA and legal review missing | keep disabled | Marketing / analytics / CRM | BLOCKS_PAID_TRAFFIC |
| Sales channel handoff | PARTIAL | channel docs and CRM contracts | attribution and owner approvals missing | prepare channel gates only | Marketing / CRM | BLOCKS_CHANNEL_PUBLICATION |
| Owner acceptance | NOT_STARTED | sign-off docs | owner/legal/backend/provider sign-off missing | PR E: acceptance checklist | Owner | BLOCKS_PUBLIC_LIVE |

## Minimum safe launch mode

`STATIC_CONTACT_ONLY_LAUNCH_CANDIDATE`

This is the safest possible launch candidate mode for review:

- static site can be reviewed on staging;
- no live forms;
- no CRM submission;
- no analytics until accepted;
- phone/contact CTA only;
- no public upload;
- no paid traffic;
- no FNS autopublish;
- no `HTTP/3` / `QUIC`, `UDP/443`, `Alt-Svc: h3` or active `listen ... quic` default serving until transport proof is accepted;
- blog/news stays noindex and excluded from sitemap after PR #49 foundation merge;
- public launch still requires owner/legal/QA sign-off.

This mode is a staging candidate, not a public LIVE decision.

## LIVE blockers

- browser-level rendered QA;
- visual screenshots;
- accessibility/axe evidence;
- Playwright smoke;
- staging deploy proof;
- transport protocol proof for `TCP/443` baseline and disabled/default-blocked `HTTP/3` / `QUIC` over `UDP/443`, `Alt-Svc: h3` and active `listen ... quic`;
- rollback proof;
- privacy/legal acceptance;
- owner acceptance;
- CRM/forms/analytics decision;
- Search Console/Yandex Webmaster setup plan;
- production hosting decision.

## Paid traffic blockers

- analytics goals are not live or accepted;
- CRM is not live or accepted;
- attribution proof is missing;
- no-PII proof is missing;
- lead collector behavior is not browser-tested;
- legal consent is not accepted;
- call tracking policy is not decided;
- landing QA is missing.

## FNS autopublish blockers

- PR #49 is merged into main as FNS blog/news foundation only;
- it does not enable live fetch, scheduler, rewrite provider, autopublish, indexing, public launch, paid traffic, forms, analytics or CRM submission;
- no live scheduler;
- no source allowlist owner/legal approval;
- no rewrite provider decision;
- no similarity/overlap gate;
- no validation runtime;
- no audit log;
- no rollback proof;
- no indexing decision;
- no pilot.

## Verdicts

- Release: `GO WITH CONDITIONS`
- P0 build: `READY_FOR_DOKUMENTY82_SITE_P0_BUILD_WITH_CONDITIONS`
- Static staging candidate: `READY_TO_PREPARE`
- Public launch: `NOT_PUBLIC_LAUNCH_READY`
- Paid traffic: `BLOCKS_PAID_TRAFFIC`
- FNS autopublish: `BLOCKED_UNTIL_SERVER_LEGAL_OWNER_ACCEPTANCE`
