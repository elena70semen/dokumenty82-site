# Stage 15 Site SEO Content Structure Roadmap V1

Status: `SOURCE_OF_TRUTH_DRAFT`

Release verdict: `GO WITH CONDITIONS`

Public launch: `NOT_PUBLIC_LAUNCH_READY`

`PUBLIC_LIVE_ALLOWED = false`

## 1. Purpose

Stage 15 creates the source-led website foundation standards package before any further implementation, public launch, paid traffic, final visual design, live forms, CRM, analytics, public upload or FNS/blog/news autopublish.

The goal is a strong website base:

- strong SEO base;
- strong semantic structure;
- high-quality text foundation;
- useful modern page blocks;
- maintainable code/content architecture requirements;
- strong layout requirements;
- mobile-first responsive requirements;
- semantic markup and accessibility requirements;
- evidence requirements.

This roadmap is a control layer for future `dokumenty82-site` or in-repo `code/` work. It does not create website code.

## 2. Source-Of-Truth Basis

The website is not an independent project. It must be formed from, checked against and kept aligned with `elena70semen/dokumenty-dlya-biznesa`.

Source basis:

- `AGENTS.md`;
- `README.md`;
- `docs/00-start/active-canon-index.md`;
- `docs/00-start/hold-register.md`;
- `docs/seo/route-registry.md`;
- `docs/seo/seo-canon.md`;
- `docs/seo/semantic-core-v1.md`;
- `docs/seo/semantic-analysis-and-priority-plan-v1.md`;
- `docs/seo/metadata-completion-and-semantic-gap-plan-v1.md`;
- `docs/seo/route-cannibalization-intent-boundary-audit-v1.md`;
- `docs/seo/seo-structure-strengthening-audit-v1.md`;
- `docs/seo/yandex-seo-playbook.md`;
- `docs/strategy/source-to-site-traceability-matrix-v1.md`;
- `docs/strategy/project-strengthening-audit-v1.md`;
- `docs/strategy/seo-product-lead-strengthening-v1.md`;
- `docs/strategy/semantic-implementation-alignment-v1.md`;
- `docs/frontend/stage-12-wave1-route-page-build-v0.1.md`;
- `docs/frontend/stage-12-wave1-route-component-map-v0.1.md`;
- `docs/qa/stage-12-wave1-route-qa-checklist-v0.1.md`;
- `docs/operations/live-launch-gates-v1.md`;
- `docs/operations/project-finalization-readiness-v1.md`;
- `docs/operations/launch-finalization-roadmap-v1.md`;
- `docs/source-to-site/transport-protocol-launch-gate-sync-v1.md`.

If any required source is unavailable in a future environment, mark it `MISSING_EXPECTED` and do not invent substitute facts.

## 3. Current Blocker

`dokumenty82-site` is unavailable in the current Codex environment unless proven otherwise.

Status:

| Item | Status |
| --- | --- |
| Source repository | `AVAILABLE` |
| Standalone site repository | `MISSING_EXPECTED` |
| Public launch proof | `MISSING_EXPECTED` |
| Browser/mobile evidence | `MISSING_EXPECTED` |
| Accessibility evidence | `MISSING_EXPECTED` |
| Staging deploy proof | `MISSING_EXPECTED` |
| Rollback proof | `MISSING_EXPECTED` |
| Transport protocol proof | `MISSING_EXPECTED` |

No implementation should proceed without the correct target repository or owner-confirmed implementation folder.

## 4. Canon And HOLD

Preserve:

- Brand: `Документы для бизнеса`;
- Domain: `https://dokumenty82.ru/`;
- Canonical URL: `https://dokumenty82.ru/`;
- Category: `Центр подготовки документов`;
- Geography: `Симферополь / Республика Крым`;
- Slogan: `Разберём ситуацию и подготовим документы.`;
- Local marker: `офис рядом с налоговой`;
- Phone: `+7 (978) 998-72-22`;
- Phone href: `tel:+79789987222`;
- Address: `Республика Крым, Симферополь, ул. им. Мате Залки, 1`;
- Short address: `Симферополь, ул. Мате Залки, 1`;
- Email: `info@dokumenty82.ru` remains `TARGET` until domain mail confirmation.

Preserve CTA hierarchy:

- main CTA: `Разобрать ситуацию`;
- secondary CTAs: `Позвонить`, `Построить маршрут`, `Показать документы`.

Do not add prices, discounts, guarantees, exact deadlines, reviews, ratings, cases, working hours, office/floor details, legal identifiers, requisites, old names, old domains, state-affiliation claims, secrets, client documents, live endpoints, CRM webhooks, private analytics IDs or false success states.

The allowed local marker `офис рядом с налоговой` must never sound like official state affiliation, state partnership or representative status.

## 5. Route Model

Preserve:

```text
Главная -> Разбор ситуации -> Хабы -> Money-pages -> Diagnostics -> Контакты
```

Route roles:

- `/` is brand/local router, not a service catalogue;
- `/razbor-situacii/` is the safe first triage step, not a free substitute for service;
- hubs route mixed intent;
- money pages target one exact commercial intent;
- diagnostics answer applicability, influence or calculation intent without final public conclusions;
- `/kontakty/` is canonical NAP page;
- `/policy` is legal/privacy page.

One URL must own one primary intent. Route expansion requires separate route registry decision, anti-cannibalization proof, parent hub, source copy and QA gates.

## 6. SEO Foundation

SEO foundation requirements:

- canonical host is `https://dokumenty82.ru/`;
- every public route must exist in `docs/seo/route-registry.md`;
- title, H1 and description must support the route role without broadening intent;
- homepage must not rank by becoming a service catalogue;
- hubs must not duplicate exact money-page H1/title;
- metadata must not include HOLD facts;
- robots and sitemap must include only approved indexable canonical routes;
- `/blog/`, `/blog/obnovleniya-fns/` and `/blog/razbory/` remain noindex/excluded until approved;
- `/novosti/` and `/news/` are not created;
- schema must describe only visible and confirmed content;
- FAQ schema is allowed only for visible FAQ text;
- local SEO uses confirmed NAP and safe marker only;
- Yandex SERP observations are filled only after live checks.

## 7. Semantic Structure

Semantic structure requirements:

- one query intent maps to one owner URL;
- ambiguous demand goes to `/razbor-situacii/`;
- exact commercial demand goes to money pages;
- mixed demand goes to hubs;
- diagnostics stay diagnostic, not final advice;
- `/kontakty/` owns NAP, phone and route intent;
- `/policy` owns privacy and data handling intent;
- every route needs visible semantic questions, FAQ candidates, related route anchors, main CTA, fallback CTA and CRM `lead_topic`;
- `SERP_CHECK_REQUIRED` must remain unfilled until live Yandex evidence exists.

## 8. Text / Content Foundation

Text must be useful before it is persuasive.

Each page should answer:

- what situation this URL covers;
- when the page fits;
- what inputs or documents may be needed;
- what can be checked publicly;
- what remains unresolved until review;
- what safe next step follows;
- which related route is more accurate if this page does not fit.

Text must avoid generic filler, keyword stuffing, unsupported legal/tax/bank/registry conclusions, free-service implication, price language, guarantees, exact deadlines, reviews, ratings and case claims.

Detailed rules: `docs/content/stage-15-text-quality-standards-v1.md`.

## 9. Code / Content Architecture Requirements

Future implementation must use:

- typed route registry or generated route manifest;
- typed page content data from source files;
- reusable sections for hero, fit, situation, checks, documents, process, boundaries, related routes, contact and FAQ;
- centralized NAP constants;
- centralized CTA labels and event names;
- centralized feature flags;
- source-to-site traceability for each page;
- static export compatibility;
- no live forms by default;
- no CRM submission by default;
- no analytics/Metrica by default;
- no public upload;
- no final messaging deep links until gates pass.

Code must be structured so checks can diff source docs against rendered pages and evidence artifacts.

## 10. Layout And Markup Requirements

Layout must be structural first, not final design.

Requirements:

- one visible H1 per page;
- logical heading order;
- semantic landmarks;
- predictable header, nav, main and footer;
- readable text and scannable sections;
- route cards that preserve route intent;
- breadcrumbs where hierarchy exists;
- contact and policy visibility;
- no nested decorative card complexity that hides the task;
- no SEO-only hidden text;
- no fake buttons for links or links for state changes.

## 11. Mobile-First Responsive Requirements

Mobile-first requirements:

- content must work from narrow mobile to desktop;
- no horizontal overflow;
- readable line length;
- stable tap targets;
- route cards stack cleanly;
- CTA placement remains reachable without blocking content;
- header/menu/footer stay keyboard and touch usable;
- contact path is visible on small screens;
- policy link is reachable;
- form placeholders, if present later, do not replace labels;
- reduced motion is respected.

Detailed rules: `docs/frontend/stage-15-mobile-layout-standards-v1.md`.

## 12. Accessibility Requirements

Accessibility requirements:

- semantic landmarks;
- one H1;
- logical headings;
- accessible link and button names;
- visible focus;
- keyboard support;
- skip link;
- no keyboard traps;
- FAQ controls with states if interactive;
- cards as accessible links when the whole card is clickable;
- ARIA only when native HTML is insufficient;
- visible text must match accessible names;
- no hidden SEO text.

Detailed rules: `docs/frontend/stage-15-semantic-markup-accessibility-standards-v1.md`.

## 13. Evidence And QA

Required evidence before public launch:

- CI/build proof;
- static export proof;
- route manifest diff against source registry;
- semantic alignment checks;
- static link checks;
- metadata proof;
- rendered route proof;
- sitemap/robots/canonical proof;
- collector proof;
- feature flag proof;
- desktop browser screenshots;
- mobile screenshots;
- console and overflow proof;
- accessibility/axe evidence;
- keyboard/focus evidence;
- no-PII analytics payload proof before analytics;
- CRM/backend acceptance before real form success;
- owner/legal acceptance;
- staging deploy proof;
- rollback proof;
- transport protocol proof.

Missing proof remains `MISSING_EXPECTED`.

## 14. Deployment Restrictions

Deployment restrictions:

- `PUBLIC_LIVE_ALLOWED = false`;
- public launch remains `NOT_PUBLIC_LAUNCH_READY`;
- paid traffic remains blocked;
- CRM/forms remain blocked;
- analytics/Metrica remain blocked;
- public upload remains blocked;
- FNS/blog/news autopublish remains blocked;
- HTTP/3/QUIC over UDP/443 remains blocked by default until separate owner/ops approval and proof;
- no deploy action, SSH/SFTP action, provider secret or public-live step is approved by Stage 15.

Baseline transport: HTTPS over TCP/443 using HTTP/1.1 or HTTP/2.

Blocked by default: `HTTP/3`, `QUIC`, `UDP/443`, `Alt-Svc: h3`, active `listen ... quic`.

## 15. Stage Sequence

### Stage 15A - Source-To-Site Readiness

Cover:

- confirm site repo or implementation folder;
- confirm source-to-site alignment;
- document `MISSING_EXPECTED` if site repo is unavailable;
- no implementation without correct target;
- preserve route registry, canon, HOLD, launch gates and transport gate.

Acceptance:

- target location is explicit;
- source docs are listed;
- missing target is documented;
- no public site changes are made.

### Stage 15B - Code And Content Model Foundation

Cover:

- typed routes;
- typed page content;
- reusable sections;
- centralized NAP;
- centralized CTA;
- centralized feature flags;
- static export compatibility;
- no live forms;
- no CRM;
- no analytics;
- no public upload.

Acceptance:

- future implementation can generate route manifest and evidence;
- unsafe features are false by default;
- content source can be traced to source docs.

### Stage 15C - Route Architecture And Internal Linking

Cover:

- homepage router;
- situation review;
- hubs;
- money pages;
- diagnostics;
- contacts;
- policy;
- breadcrumbs;
- parent/child links;
- related links;
- sitemap/noindex;
- anti-cannibalization;
- one URL = one intent.

Acceptance:

- every link supports route ownership;
- homepage and hubs do not become catalogs;
- sitemap excludes held/noindex routes.

### Stage 15D - Yandex SEO Foundation

Cover:

- route intent;
- title/H1/description;
- canonical;
- robots;
- sitemap;
- Clean-param;
- schema limits;
- internal linking;
- snippet usefulness;
- local SEO without state-imitation;
- no keyword stuffing;
- no blog/news indexing until approved.

Acceptance:

- metadata supports route intent;
- Yandex facts are not invented;
- schema matches visible confirmed content.

### Stage 15E - Text And Content Quality

Cover:

- useful full page blocks;
- safe conversion language;
- high-quality page text;
- FAQ;
- document/process blocks;
- uncertainty handling;
- no generic filler;
- no promises beyond source;
- no prices;
- no guarantees;
- no reviews.

Acceptance:

- every page explains fit, inputs, limits and next step;
- public copy does not over-solve or overclaim.

### Stage 15F - Mobile-First Structure And Layout

Cover:

- fluid layout;
- responsive sections;
- readable text;
- no horizontal overflow;
- tap targets;
- card grids;
- CTA placement;
- header/menu/footer behavior;
- all-device usability.

Acceptance:

- mobile screenshots show no overflow;
- CTAs remain usable;
- content order remains logical.

### Stage 15G - Semantic Markup And Accessibility

Cover:

- one H1;
- logical headings;
- landmarks;
- accessible links/buttons;
- keyboard/focus;
- skip link;
- no fake buttons;
- no SEO-only hidden text.

Acceptance:

- accessibility checks pass;
- keyboard path reaches navigation, content, CTAs, FAQ and footer.

### Stage 15H - Evidence And QA

Cover:

- CI/build;
- static export;
- semantic checks;
- static links;
- metadata proof;
- rendered route proof;
- browser screenshots;
- mobile screenshots;
- console/overflow;
- accessibility;
- keyboard/focus.

Acceptance:

- proof artifacts exist and remain linked to source docs;
- missing future evidence is marked `MISSING_EXPECTED`.

### Stage 15I - Staging / Deploy Readiness

Cover:

- static artifact;
- Nginx static baseline;
- transport protocol baseline;
- no HTTP/3/QUIC by default;
- no secrets;
- staging proof;
- rollback proof.

Acceptance:

- staging deploy proof exists;
- rollback proof exists;
- transport proof exists or remains blocking.

### Stage 15J - Final Design Polish Placeholder

Design is postponed.

Only after structure, texts, SEO, mobile, markup and QA are strong may final visual polish be planned. Stage 15J does not start final design.

Acceptance:

- design work remains `HOLD` until structure and evidence are accepted.

## 16. Acceptance Criteria

Stage 15 package is accepted when:

- all Stage 15 source docs exist;
- source-to-site matrix covers canon, NAP, HOLD, routes, SEO, semantic core, content, UX, CRM, legal, launch gates, transport, mobile, accessibility and evidence;
- prompt pack has complete prompts for Stage 15A-J;
- text standards define strong useful page blocks without final route copy;
- mobile/layout standards define structure without final design;
- semantic/accessibility standards define markup and evidence;
- no implementation code, route content, metadata, sitemap, visual styles, deploy scripts or feature flags are changed for Stage 15;
- launch restrictions remain unchanged.

## 17. Strict Non-Goals

Do not:

- modify `dokumenty82-site`;
- start final visual design;
- launch publicly;
- enable paid traffic;
- enable live forms;
- enable CRM;
- enable analytics/Metrica;
- enable public upload;
- enable FNS/blog/news autopublish;
- add routes;
- rewrite final public copy for every route;
- add prices, guarantees, reviews, ratings, exact deadlines or legal identifiers;
- add secrets, endpoints, keys, credentials or provider data.

## 18. Release Verdict

`GO WITH CONDITIONS`

Stage 15 source foundation package may guide later implementation.

Public launch remains `NOT_PUBLIC_LAUNCH_READY`.

`PUBLIC_LIVE_ALLOWED = false`.
