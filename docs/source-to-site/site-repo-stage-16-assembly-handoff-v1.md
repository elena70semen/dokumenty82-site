# Site Repo Stage 16 Assembly Handoff V1

Status: `SOURCE_TO_SITE_HANDOFF_READY_WITH_CONDITIONS`

Release verdict: `GO WITH CONDITIONS`

Public launch: `NOT_PUBLIC_LAUNCH_READY`

`PUBLIC_LIVE_ALLOWED = false`

## 1. Purpose

This document is the main source-to-site handoff for assembling the standalone site repository `elena70semen/dokumenty82-site`.

It was originally prepared while site-repository access was blocked. In the current local environment, `dokumenty82-site` is available at `/Users/office-9102/Documents/GitHub/dokumenty82-site`; the handoff remains the source package that site work must verify against without inventing facts.

The handoff prepares:

- strong selling page structure;
- Yandex-first SEO foundation;
- complete route and service semantic coverage;
- safe client-facing text framework;
- useful page block sequences;
- safe lead paths toward contact, phone, route and situation review;
- mobile-first structure requirements;
- semantic markup and accessibility requirements;
- evidence and QA requirements;
- source-to-site traceability;
- implementation prompts for the standalone site repository.

This document does not create website code in the source repository, does not modify `dokumenty82-site`, does not approve public launch and does not start final visual design polish.

## 2. Current Repository Gate

Current site access status:

- `PASS` for `/Users/office-9102/Documents/GitHub/dokumenty82-site`

Historical blocker:

- `BLOCKED_SITE_REPOSITORY_NOT_AVAILABLE` is closed for this checkout.

The site repository must not be substituted with `code/` in this source repository. Every implementation run must positively identify the target repository before editing.

## 3. Required Before Site Work

Before Stage 16/17 implementation continues, verify:

- current site repository is `elena70semen/dokumenty82-site`;
- source repository `elena70semen/dokumenty-dlya-biznesa` is readable;
- missing requested source files are recorded as `MISSING_EXPECTED`;
- public live remains false.

If the site repository is still unavailable, the next run must stop and report:

`BLOCKED_SITE_REPOSITORY_NOT_AVAILABLE`

If the source repository is unavailable for verification, the next run must stop and report:

`BLOCKED_SOURCE_OF_TRUTH_NOT_AVAILABLE`

## 4. Source-Of-Truth Files To Read Before Site Implementation

Read these files from `elena70semen/dokumenty-dlya-biznesa` before changing any site file:

Core:

- `AGENTS.md`
- `README.md`
- `docs/00-start/active-canon-index.md`
- `docs/00-start/hold-register.md`

Routes and SEO:

- `docs/seo/route-registry.md`
- `docs/seo/seo-canon.md`
- `docs/seo/semantic-core-v1.md`
- `docs/seo/semantic-analysis-and-priority-plan-v1.md`
- `docs/seo/metadata-completion-and-semantic-gap-plan-v1.md`
- `docs/seo/route-cannibalization-intent-boundary-audit-v1.md`
- `docs/seo/seo-structure-strengthening-audit-v1.md`
- `docs/seo/yandex-seo-playbook.md`
- `docs/seo/stage-16-route-group-semantic-coverage-v1.md`

Services and content:

- `docs/services/service-catalog-2026-v1.md`
- `docs/services/service-source-ledger-2026.md`
- `docs/services/passports/`
- `docs/content/stage-15-text-quality-standards-v1.md`
- `docs/content/stage-16-selling-page-block-library-v1.md`

Strategy and source-to-site:

- `docs/strategy/source-to-site-traceability-matrix-v1.md`
- `docs/strategy/project-strengthening-audit-v1.md`
- `docs/strategy/seo-product-lead-strengthening-v1.md`
- `docs/strategy/semantic-implementation-alignment-v1.md`
- `docs/strategy/stage-15-site-seo-content-structure-roadmap-v1.md`
- `docs/strategy/stage-15-source-to-site-content-matrix-v1.md`
- `docs/source-to-site/site-repo-stage-16-assembly-handoff-v1.md`
- `docs/source-to-site/transport-protocol-launch-gate-sync-v1.md`

Frontend, UX and QA:

- `docs/frontend/stage-12-wave1-route-page-build-v0.1.md`
- `docs/frontend/stage-12-wave1-route-component-map-v0.1.md`
- `docs/qa/stage-12-wave1-route-qa-checklist-v0.1.md`
- `docs/frontend/stage-15-mobile-layout-standards-v1.md`
- `docs/frontend/stage-15-semantic-markup-accessibility-standards-v1.md`
- `docs/frontend/stage-16-route-implementation-checklist-v1.md`
- `docs/ux/stage-16-lead-path-and-conversion-architecture-v1.md`

Operations and launch:

- `docs/operations/live-launch-gates-v1.md`
- `docs/operations/project-finalization-readiness-v1.md`
- `docs/operations/launch-finalization-roadmap-v1.md`
- `docs/launch/stage-16-source-package-status-v1.md`

Codex prompt packs:

- `docs/codex/stage-15-site-foundation-prompts-v1.md`
- `docs/codex/site-repo-stage-16-assembly-master-prompt-v1.md`

If any required source is missing, mark it as `MISSING_EXPECTED` and continue only if the missing file is not needed for the exact change. Never invent facts to fill a missing source.

## 5. Canon And HOLD

Preserve exactly:

| Field | Value | Status |
| --- | --- | --- |
| Brand | `Документы для бизнеса` | `ACTIVE` |
| Domain | `https://dokumenty82.ru/` | `ACTIVE` |
| Canonical URL | `https://dokumenty82.ru/` | `ACTIVE` |
| Category | `Центр подготовки документов` | `ACTIVE` |
| Extended category | `центр подготовки документов для бизнеса` | `ACTIVE` |
| Geography | `Симферополь / Республика Крым` | `ACTIVE` |
| Slogan | `Разберём ситуацию и подготовим документы.` | `ACTIVE` |
| Local marker | `офис рядом с налоговой` | `ACTIVE_WITH_BOUNDARY` |
| Phone | `+7 (978) 998-72-22` | `ACTIVE` |
| Phone href | `tel:+79789987222` | `ACTIVE` |
| Address | `Республика Крым, Симферополь, ул. им. Мате Залки, 1` | `ACTIVE` |
| Short address | `Симферополь, ул. Мате Залки, 1` | `ACTIVE` |
| Email | `info@dokumenty82.ru` | `TARGET_UNTIL_DOMAIN_MAIL_CONFIRMED` |

CTA hierarchy:

- main CTA: `Разобрать ситуацию`;
- secondary CTAs: `Позвонить`, `Построить маршрут`, `Показать документы`.

CTA must not promise a result before the situation and documents are reviewed.

Do not add or imply:

- working hours;
- office number;
- floor;
- full legal entity name;
- INN;
- OGRN;
- bank/legal details;
- representative name;
- legal wording creating obligations;
- prices;
- discounts;
- guarantees;
- exact deadlines;
- urgent-result promises;
- ratings;
- reviews;
- cases;
- comparative claims without proof;
- result promises before studying documents;
- `.env`;
- tokens;
- SSH keys;
- API keys;
- server access data;
- Yandex/Google/VK/CRM access data;
- backend credentials;
- client documents;
- document scans;
- sensitive logs;
- real form endpoint;
- CRM webhook;
- false form success messages;
- private analytics IDs;
- schema or metadata claims wider than confirmed visible content;
- public profile/card data for Yandex, 2GIS, VK, Avito or Yandex Services;
- advertising promises;
- old names or old domains;
- state affiliation imitation.

The local marker `офис рядом с налоговой` is allowed, but it must never imply state affiliation, official partnership or representative status.

## 6. Route Model

Preserve this site model:

```text
Главная -> Разбор ситуации -> Хабы -> Money-pages -> Diagnostics -> Контакты
```

Route roles:

- `/` is a brand/local router, not a service catalogue.
- `/razbor-situacii/` is safe first triage.
- Hubs route users by mixed intent.
- Money pages target one exact commercial intent.
- Diagnostics answer applicability, influence or calculation intent without giving final conclusions.
- `/kontakty/` is the canonical NAP page.
- `/policy` is the legal/privacy page and keeps the no-trailing-slash exception.
- `/blog/`, `/blog/obnovleniya-fns/` and `/blog/razbory/` are foundation noindex routes only; they must be excluded from sitemap and must not enable live fetch, scheduler, rewrite provider or autopublication.

Approved route groups and roles are defined in `docs/seo/route-registry.md` and expanded in `docs/seo/stage-16-route-group-semantic-coverage-v1.md`.

## 7. Selling Structure

Every public route should sell by helping the user choose the right next step, not by overclaiming.

Selling structure principles:

- show the route role in the first screen;
- recognize the user's situation without panic language;
- explain what is checked or prepared;
- show what documents/data may be needed without upload;
- state what is not promised;
- route wrong-fit users to the correct route;
- preserve office-first contact and phone path;
- use CTA hierarchy without pressure;
- keep related route links useful and limited.

Reusable blocks are defined in `docs/content/stage-16-selling-page-block-library-v1.md`.

## 8. SEO Structure

SEO structure is Yandex-first and route-owned:

- one URL = one primary intent;
- homepage is a router;
- hubs own mixed route-selection intent;
- money pages own exact commercial/document intent;
- diagnostics own evaluation/checking intent;
- title, H1 and description must support the route role;
- no hub may duplicate a child money-page title/H1;
- no page may use keyword stuffing;
- snippets must be based on visible confirmed content;
- local SEO must use confirmed NAP and must not imitate state affiliation;
- schema must not exceed visible confirmed content;
- no price, rating, review, offer, guarantee or deadline schema;
- no hidden SEO text;
- blog/news foundation remains noindex until approved.

Use `docs/seo/stage-16-route-group-semantic-coverage-v1.md` to map route groups to search intent, metadata direction, internal links and schema boundaries.

## 9. Text Structure

Text must be useful, source-backed and route-specific.

Required content behavior:

- visible route purpose;
- situation-based explanation;
- what we check;
- how work starts;
- what documents/data may be needed;
- what is not promised;
- parent hub and related routes;
- local contact path;
- FAQ that answers real uncertainty;
- safety notes where needed;
- no generic filler;
- no invented promises;
- no public copy beyond source support.

The text foundation is governed by:

- `docs/content/stage-15-text-quality-standards-v1.md`;
- `docs/content/stage-16-selling-page-block-library-v1.md`;
- source page copy in `docs/content/site/`;
- service passports in `docs/services/passports/`.

## 10. Lead Path

Primary lead path:

```text
problem page -> user understands fit/boundary -> safe next step
```

Allowed next steps:

- `Разобрать ситуацию`;
- `Позвонить`;
- `Построить маршрут`;
- `Показать документы`.

Lead path rules:

- no false success state before backend/CRM acceptance;
- no live form endpoint until accepted;
- no CRM webhook until accepted;
- no analytics/Metrica until accepted;
- no public upload;
- no messaging deep links until owner/privacy/CRM/rendered QA approval;
- no aggressive urgency;
- no guarantee or exact deadline;
- no result promise before review.

Detailed lead architecture is defined in `docs/ux/stage-16-lead-path-and-conversion-architecture-v1.md`.

## 11. Page Block Sequences

Default route sequence:

1. Hero with route role, H1 and safe CTA.
2. Situation recognition or route selector.
3. Problem/risk explanation.
4. What we check.
5. What documents/data may be needed.
6. How work starts.
7. What affects the result or boundary.
8. What is not promised.
9. Parent hub and related routes.
10. Local trust/contact block.
11. FAQ.
12. Safety note.
13. Final CTA.

Route-specific variations:

- homepage: hero, route families, first-step path, priority routes, office/contact, FAQ;
- situation review: first-step triage, intake questions, route outcomes, contact path;
- hub: route-selection hero, child route cards, when to choose each route, FAQ, contact;
- money page: exact fit, documents/data, service boundary, process, related alternatives, final CTA;
- diagnostic: applicability inputs, what can and cannot be concluded, next safe route;
- contact: NAP, phone, route, show-documents safe flow, policy;
- policy: legal/privacy transparency and contact route only.

## 12. Semantic Map By Route Group

Use the Stage 16 semantic coverage document for route-group details:

- `docs/seo/stage-16-route-group-semantic-coverage-v1.md`

The site implementation must not create routes outside `docs/seo/route-registry.md`.

## 13. Mobile-First Layout Requirements

Mobile-first requirements:

- build narrow mobile first;
- support 320px, 360-430px, tablet and desktop evidence;
- use fluid containers;
- avoid horizontal overflow;
- keep readable line length;
- keep tap targets large enough;
- stack route cards and grids on mobile;
- keep CTA visible but not aggressive;
- preserve header/menu/footer usability;
- preserve contact and policy access;
- support keyboard and focus;
- respect reduced motion.

Detailed rules:

- `docs/frontend/stage-15-mobile-layout-standards-v1.md`;
- `docs/frontend/stage-16-route-implementation-checklist-v1.md`.

## 14. Semantic Markup / Accessibility Requirements

Accessibility requirements:

- one visible H1 per page;
- logical heading hierarchy;
- landmarks: header, nav, main, footer;
- real links for route changes;
- buttons only for in-page actions;
- accessible route cards;
- visible focus states;
- keyboard support for nav, menu, CTA, cards, FAQ and any fallback form;
- skip link if needed;
- FAQ markup only for visible FAQ;
- no SEO-only hidden text;
- schema no broader than visible confirmed content.

Detailed rules:

- `docs/frontend/stage-15-semantic-markup-accessibility-standards-v1.md`;
- `docs/frontend/stage-16-route-implementation-checklist-v1.md`.

## 15. Evidence And QA Requirements

Before public launch, the site repository must produce evidence for:

- route manifest vs route registry;
- sitemap and robots;
- canonical and metadata snapshot;
- title/H1/description role alignment;
- no unapproved routes;
- noindex blog/news foundation;
- rendered route text snapshot;
- CTA state and fallback state;
- feature flags closed by default;
- no live forms/CRM/analytics/upload/messaging;
- safe schema;
- forbidden claims/HOLD scan;
- desktop screenshots;
- mobile screenshots;
- horizontal overflow report;
- keyboard/focus report;
- accessibility/axe report;
- static link check;
- finalization readiness check;
- transport protocol proof;
- rollback proof before public live.

Missing future evidence remains `MISSING_EXPECTED`.

## 16. Transport / Deploy Restrictions

Public live remains blocked:

- `PUBLIC_LIVE_ALLOWED = false`;
- public launch remains `NOT_PUBLIC_LAUNCH_READY`;
- paid traffic remains blocked;
- CRM/forms remain blocked;
- analytics/Metrica remains blocked;
- public upload remains blocked;
- FNS/blog/news autopublish remains blocked.

Transport baseline:

- allowed baseline: `HTTPS over TCP/443 with HTTP/1.1 or HTTP/2`;
- blocked by default: `HTTP/3`, `QUIC`, `UDP/443`, `Alt-Svc: h3`, active `listen ... quic`.

This is protocol-specific, not server-brand-specific. Caddy is not banned as software. Nginx is not inherently safe if configured with QUIC. Any HTTP/3/QUIC use requires separate owner/ops approval and proof.

## 17. Site Repo Files To Create / Update

When `dokumenty82-site` becomes available, create or update:

Source-to-site docs:

- `AGENTS.md`;
- `docs/source-to-site/source-to-site-alignment-contract-v1.md`;
- `docs/source-to-site/source-to-site-current-sync-status-v1.md`;
- `docs/source-to-site/site-repo-stage-16-assembly-handoff-v1.md`;
- `docs/launch/stage-15-site-foundation-status-v1.md`;
- `docs/launch/stage-16-source-package-status-v1.md`.

Stage standards:

- `docs/strategy/stage-15-site-seo-content-structure-roadmap-v1.md`;
- `docs/strategy/stage-15-source-to-site-content-matrix-v1.md`;
- `docs/content/stage-15-text-quality-standards-v1.md`;
- `docs/frontend/stage-15-mobile-layout-standards-v1.md`;
- `docs/frontend/stage-15-semantic-markup-accessibility-standards-v1.md`;
- `docs/source-to-site/transport-protocol-launch-gate-sync-v1.md`;
- `docs/content/stage-16-selling-page-block-library-v1.md`;
- `docs/seo/stage-16-route-group-semantic-coverage-v1.md`;
- `docs/ux/stage-16-lead-path-and-conversion-architecture-v1.md`;
- `docs/frontend/stage-16-route-implementation-checklist-v1.md`.

Expected site implementation files to inspect:

- `package.json`;
- `package-lock.json`;
- `.github/workflows/site-ci.yml`;
- `app/layout.tsx`;
- `app/page.tsx`;
- route pages under `app/`;
- `components/`;
- `lib/content.ts`;
- `lib/routes.ts`;
- `lib/feature-flags.ts`;
- `public/robots.txt`;
- `public/sitemap.xml`;
- `scripts/check-p0-semantic-alignment.mjs`;
- `scripts/generate-p0-evidence.mjs`;
- `scripts/check-p0-evidence.mjs`;
- `scripts/check-static-site-links.mjs`;
- `scripts/check-launch-finalization-readiness.mjs`;
- `evidence/`.

## 18. Safe Implementation Order

1. Confirm the current repository is `elena70semen/dokumenty82-site`.
2. Confirm source repository access to `elena70semen/dokumenty-dlya-biznesa`.
3. Read the required source files.
4. Create or update `AGENTS.md` and source-to-site alignment docs in the site repo.
5. Sync Stage 15 and Stage 16 standards into the site repo.
6. Inspect current site implementation.
7. Centralize canon, NAP and CTA labels if duplicated.
8. Strengthen typed route registry and typed page content only from source route registry and content docs.
9. Strengthen feature flags so unsafe/live capabilities are closed by default.
10. Align metadata and sitemap only for approved routes.
11. Keep blog/news foundation noindex and excluded from sitemap.
12. Add defensive checks if missing and clearly scoped.
13. Run package-defined checks where possible.
14. Record missing proof as `MISSING_EXPECTED`.
15. Stop with exact blockers; do not deploy.

If implementation becomes large or risky, document the next prompt instead of forcing a broad rewrite.

## 19. Forbidden Changes

Do not:

- create public routes beyond the route registry;
- alter canon;
- alter NAP without source confirmation;
- add final visual redesign or polish;
- add prices;
- add discounts;
- add guarantees;
- add exact deadlines;
- add reviews, ratings or cases;
- add legal IDs;
- add working hours, office/floor details or representative names;
- add public profile/card data for external platforms;
- add live forms;
- add CRM webhook;
- add analytics/Metrica;
- add public upload;
- add messaging deep links;
- add secrets;
- deploy;
- change DNS;
- enable public live;
- enable HTTP/3/QUIC over UDP/443 without separate approval and proof.

## 20. Final Report Format For Site Implementation Run

Use this report format after the next Codex run in `dokumenty82-site`:

```text
Source-of-truth files reviewed:
- ...

Site repository:
- available: true/false
- path:
- branch:
- remote:

Site files reviewed:
- ...

Site files changed:
- ...

Source-to-site docs:
- AGENTS.md:
- alignment contract:
- current sync status:
- Stage 15 status:
- Stage 16 handoff:
- Stage 16 status:

Stage standards synced:
- Stage 15 roadmap:
- Stage 15 content matrix:
- Stage 15 text standards:
- Stage 15 mobile/layout standards:
- Stage 15 semantic/accessibility standards:
- Stage 16 selling block library:
- Stage 16 semantic coverage:
- Stage 16 lead path:
- Stage 16 route checklist:
- transport gate sync:

Implementation changes:
- ...

Checks run:
- ...

Checks not run:
- ...

Passed checks:
- ...

Failed checks:
- ...

Stage 16 status:
- source-to-site access:
- canon alignment:
- HOLD preservation:
- SEO foundation:
- semantic coverage:
- text foundation:
- code/content model:
- mobile/responsive:
- semantic/accessibility:
- evidence/QA:
- transport/deploy:
- public live:

Remaining blockers:
- ...

Next recommended Codex prompt:
- ...

HOLD preserved:
- public live:
- paid traffic:
- CRM/forms/analytics/upload/messaging:
- prices/guarantees/reviews/legal details:
- design postponed:
- HTTP/3/QUIC blocked by default:

Release verdict:
GO WITH CONDITIONS for source-aligned site foundation work.
PUBLIC_LIVE_ALLOWED = false.
```

## Release Verdict

`GO WITH CONDITIONS`

This Stage 16 handoff is ready with conditions for continued source-aligned work in `dokumenty82-site`.

Current implementation status:

`PARTIAL_SITE_SYNCED_WITH_CONDITIONS`

Public launch remains:

`PUBLIC_LIVE_ALLOWED = false`
