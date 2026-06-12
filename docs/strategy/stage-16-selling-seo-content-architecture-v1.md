# Stage 16 Selling SEO Content Architecture V1

Status: `READY_WITH_CONDITIONS`

Release verdict: `GO WITH CONDITIONS`

Public launch: `NOT_PUBLIC_LAUNCH_READY`

`PUBLIC_LIVE_ALLOWED = false`

## 1. Purpose

This document closes the Stage 16 source package gap for the selling, SEO and content architecture used by `elena70semen/dokumenty82-site`.

It connects route ownership, Yandex-oriented semantic structure, page-block logic, client-need hooks, lead paths, implementation boundaries and QA evidence. It is a source strategy document, not final public copy, not owner/legal approval, not a launch approval and not permission to enable live systems.

## 2. Source-Of-Truth Basis

This architecture is controlled by:

- `AGENTS.md`
- `README.md`
- `docs/00-start/active-canon-index.md`
- `docs/00-start/hold-register.md`
- `docs/strategy/repository-operating-standard-v1.md`
- `docs/strategy/stage-17-unified-work-sequence-v1.md`
- `docs/seo/route-registry.md`
- `docs/seo/seo-canon.md`
- `docs/seo/semantic-core-v1.md`
- `docs/seo/semantic-analysis-and-priority-plan-v1.md`
- `docs/seo/metadata-completion-and-semantic-gap-plan-v1.md`
- `docs/seo/route-cannibalization-intent-boundary-audit-v1.md`
- `docs/seo/seo-structure-strengthening-audit-v1.md`
- `docs/seo/yandex-seo-playbook.md`
- `docs/seo/stage-16-route-group-semantic-coverage-v1.md`
- `docs/seo/stage-16-yandex-semantic-service-map-v1.md`
- `docs/services/service-catalog-2026-v1.md`
- `docs/services/service-source-ledger-2026.md`
- `docs/services/passports/`
- `docs/content/stage-15-text-quality-standards-v1.md`
- `docs/content/stage-16-selling-page-block-library-v1.md`
- `docs/content/stage-16-page-block-blueprints-v1.md`
- `docs/content/stage-16-client-need-hooks-and-lead-path-v1.md`
- `docs/ux/stage-16-lead-path-and-conversion-architecture-v1.md`
- `docs/frontend/stage-15-mobile-layout-standards-v1.md`
- `docs/frontend/stage-15-semantic-markup-accessibility-standards-v1.md`
- `docs/frontend/stage-16-route-implementation-checklist-v1.md`
- `docs/operations/live-launch-gates-v1.md`
- `docs/operations/project-finalization-readiness-v1.md`
- `docs/operations/launch-finalization-roadmap-v1.md`
- `docs/source-to-site/transport-protocol-launch-gate-sync-v1.md`

The site repo Stage 17 artifacts must remain aligned with this source document:

- `docs/qa/stage-17f-owner-legal-content-qa-v1.md`
- `docs/owner-review/stage-17g-owner-legal-signoff-packet-v1.md`
- `docs/owner-review/stage-17g-route-decision-log-v1.md`
- `docs/owner-review/stage-17g-go-no-go-review-checklist-v1.md`
- `docs/owner-review/stage-17g-owner-review-index-v1.md`
- `docs/owner-review/stage-17h-human-decision-intake-protocol-v1.md`
- `docs/launch/stage-17h-blocker-closure-roadmap-v1.md`

## 3. Canon Summary

| Field | Canon |
| --- | --- |
| Brand | `Документы для бизнеса` |
| Domain | `https://dokumenty82.ru/` |
| Canonical URL | `https://dokumenty82.ru/` |
| Category | `Центр подготовки документов` |
| Extended category | `центр подготовки документов для бизнеса` |
| Geography | `Симферополь / Республика Крым` |
| Slogan | `Разберём ситуацию и подготовим документы.` |
| Local marker | `офис рядом с налоговой` |
| Phone | `+7 (978) 998-72-22` |
| Phone href | `tel:+79789987222` |
| Address | `Республика Крым, Симферополь, ул. им. Мате Залки, 1` |
| Short address | `Симферополь, ул. Мате Залки, 1` |
| Email | `info@dokumenty82.ru` as `TARGET` only until domain mail is confirmed |
| Main CTA | `Разобрать ситуацию` |
| Secondary CTAs | `Позвонить`; `Построить маршрут`; `Показать документы` |

The local marker may be used only as a navigation/local-trust cue. It must not imply state affiliation, official partnership or representative status.

## 4. HOLD Summary

Do not add, imply or expose:

- working hours, office number, floor, full legal entity name, INN, OGRN, bank/legal details or representative name;
- legal wording that creates unapproved obligations;
- prices, discounts, guarantees, exact deadlines, urgent-result promises, ratings, reviews or cases;
- comparative claims without proof or result promises before studying documents;
- real form endpoint, CRM webhook, false form success, public upload, messaging deep links, private analytics IDs or secrets;
- old names, old domains, public profile/card data, state-affiliation wording or hidden SEO text;
- schema claims wider than visible confirmed content.

Unknown facts remain `HOLD` or `MISSING_EXPECTED`.

## 5. Site Architecture Model

The site model is:

```text
Главная -> Разбор ситуации -> Хабы -> Money-pages -> Diagnostics -> Контакты
```

The model means:

- `/` is a brand/local router, not a service catalogue.
- `/razbor-situacii/` owns safe first-step triage.
- Hubs route mixed intent and lead to exact child pages.
- Money pages own one exact commercial/document intent.
- Diagnostics own applicability, influence or calculation-input intent without final public conclusions.
- `/kontakty/` owns canonical NAP, phone, route and office-first contact.
- `/policy` owns privacy/legal transparency.
- `/blog/`, `/blog/obnovleniya-fns/` and `/blog/razbory/` remain noindex foundation until separate content, legal, source-attribution and launch gates pass.

## 6. User Journey Model

Every public route should follow this journey:

1. Client arrives with a concrete task or problem.
2. Page confirms the route intent without broadening it.
3. Page explains what matters in the situation.
4. Page shows what can be checked or prepared.
5. Page explains how work starts.
6. Page states what is not promised.
7. Page offers safe related routes.
8. Page leads to a safe next step: `Разобрать ситуацию`, `Позвонить`, `Показать документы` or `Построить маршрут`.
9. Page avoids price, deadline, result and guarantee promises.
10. Page preserves office-first local trust without state affiliation.

If the route is unclear, the journey must move to `/razbor-situacii/` or a parent hub rather than forcing a wrong exact page.

## 7. Page Type Model

| Page type | Role | Selling role | SEO/content rule | CTA rule |
| --- | --- | --- | --- | --- |
| Homepage | Brand/local router | Help users choose a route or first step. | Must not become a full service catalogue. | Primary `Разобрать ситуацию`; selected route links and contact support. |
| Situation review page | Safe first triage | Let unclear users explain the situation safely. | Owns ambiguity, not exact service demand. | Primary `Разобрать ситуацию`; secondary phone/show-documents. |
| Hub page | Mixed-intent route selector | Explain route family and guide to child pages. | Must not duplicate child money-page H1/title or exact promise. | Primary `Разобрать ситуацию`; child route cards; contextual `Показать документы`. |
| Money page | Exact commercial/document intent | Explain route fit, what is checked and what to prepare. | One URL = one exact intent; no sibling capture. | Route-specific `Показать документы` or `Разобрать ситуацию`; phone fallback. |
| Diagnostic page | Applicability/checking/calculation-input intent | Collect inputs and route to review/hub/exact page. | No final public tax/legal/accounting answer or fake calculator output. | Primary `Разобрать ситуацию`; safe related route links. |
| Contacts page | Canonical NAP/contact path | Make phone, route and office-first action clear. | Confirmed NAP only; no unconfirmed local/legal facts. | Primary `Позвонить`; secondary `Построить маршрут`, `Показать документы`. |
| Policy page | Privacy/legal transparency | Support trust and compliance, not sales pressure. | Visible policy content only. | No aggressive CTA; phone only as contact fallback. |
| Noindex foundation page | Future content foundation | Keep future content shell safe. | Noindex, excluded from sitemap, no live feed or Article/news schema. | `Разобрать ситуацию` or contact fallback only. |

## 8. Route Group Model

| Route group | Routes | Role |
| --- | --- | --- |
| Core/local brand entry | `/`, `/o-proekte/` | Brand/local context, project explanation and safe first route choice. |
| Situation review | `/razbor-situacii/` | First-step triage for unclear or mixed demand. |
| Urgent/tax questions | `/srochnye-voprosy/`, `/otvet-na-trebovanie-ifns/` | Urgent/problem route selection and IFNS requirement response without timing/result promises. |
| Reporting/USN/zero reporting | `/otchetnost/`, `/deklaraciya-usn/`, `/nulevaya-otchetnost-ooo/`, `/nulevaya-otchetnost-ip/`, `/otchetnost-elektronno/`, `/vosstanovlenie-buhucheta/` | Reporting route selection, document preparation and accounting gap review. |
| Bank/115-ФЗ | `/bank-i-115-fz/`, `/otvet-na-zapros-banka/`, `/dokumenty-dlya-banka-115-fz/` | Bank request and 115-ФЗ document route separation without bank-outcome promises. |
| Address/EGRUL/director | `/adres-egryul-direktor/`, `/yuridicheskiy-adres-simferopol/`, `/nedostovernost-yuridicheskogo-adresa/`, `/smena-yuridicheskogo-adresa-ooo/`, `/smena-direktora-ooo/` | Address, unreliability and corporate change route separation without registry-result promises. |
| Registration/liquidation | `/registraciya-i-likvidaciya/`, `/registraciya-ooo/`, `/registraciya-ip/`, `/likvidaciya-ooo/` | Lifecycle route selection and exact registration/liquidation document routes. |
| Tax regimes/diagnostics | `/nalogi-i-rezhimy/`, `/ausn-krym/`, `/perehod-na-ausn/`, `/raschet-nalogovoy-nagruzki/`, `/nds-pri-usn-2026/` | Tax regime routing and diagnostics without final public tax advice. |
| HR | `/kadry/`, `/srochnoe-oformlenie-sotrudnikov/`, `/kadrovoe-soprovozhdenie/` | Employee document and HR support routes with personal-data boundaries. |
| Support | `/soprovozhdenie/`, `/buhgalterskoe-soprovozhdenie-ooo/`, `/buhgalterskoe-soprovozhdenie-ip/` | Business/accounting support route selection and entity-specific support pages without public scope/pricing promises. |
| Contacts | `/kontakty/` | Confirmed NAP, phone, route and office-first document-showing path. |
| Policy | `/policy` | Privacy/legal transparency. |
| Blog/news noindex foundation | `/blog/`, `/blog/obnovleniya-fns/`, `/blog/razbory/` | Future content foundation only: noindex, excluded from sitemap and no live FNS/news automation. |

No new routes are approved by this document.

## 9. SEO Architecture

The SEO architecture is safe only when all of the following hold:

- one URL owns one main intent;
- route structure follows `docs/seo/route-registry.md`;
- hubs, money pages and diagnostics stay separated;
- internal links clarify route choice rather than creating a flat catalogue;
- all public text is visible, useful and route-specific;
- no keyword stuffing, hidden text, doorway text or unsupported schema is used;
- sitemap includes only approved indexable routes;
- noindex foundation routes stay excluded from sitemap and do not use Article/news schema;
- live Yandex/SERP/Webmaster conclusions remain `MISSING_EXPECTED` until real proof exists.

## 10. Yandex Semantic Architecture

Yandex-oriented structure must be based on usefulness, regional clarity and visible answers, not spam.

Each route should show:

- page role and route intent in the first screen;
- what situation the route fits;
- what documents/data may matter;
- what can be checked or prepared;
- how the route differs from nearby routes;
- safe related routes;
- local office-first context where relevant;
- CTA that matches the route role.

Yandex semantic expansion must not create new URLs until separate intent, parent hub, anti-cannibalization and owner/source review are proven.

## 11. Selling Architecture

The selling architecture is safe and office-first:

- useful explanation first;
- route-specific help, not broad catalogue language;
- clear next step;
- no pressure;
- no fake urgency;
- no guarantee;
- no fake success;
- no hidden SEO;
- no overclaiming;
- no public upload or live CRM promise.

The page should help the visitor understand whether this route fits and what to discuss next. It must not promise an external result before the situation and documents are reviewed.

## 12. Content Architecture

Public content should answer practical client tasks:

- what page this is;
- when this route fits;
- what is usually checked;
- what documents/data may matter;
- what affects the next step;
- how work starts;
- what is not promised;
- where to go if this page is not the right route.

Content must remain plain, visible and specific. If a fact is missing from source, use `HOLD`, `MISSING_EXPECTED`, `OWNER_LEGAL_REVIEW_REQUIRED` or route to a safe review path.

## 13. Page-Block Architecture

Use the block model from `docs/content/stage-16-page-block-blueprints-v1.md` and `docs/content/stage-16-selling-page-block-library-v1.md`.

Required block families:

- hero with route role and safe CTA;
- route intent clarification;
- when this page fits;
- what we check;
- documents/data that may be needed;
- how work starts;
- what affects the route/result;
- what is not promised;
- related routes;
- FAQ where visible and source-supported;
- local/contact block where relevant;
- final safe CTA.

Forbidden block patterns:

- outcome promise;
- exact deadlines;
- prices, discounts or offers;
- guarantee/review/rating/case proof;
- public upload;
- legal/tax/bank conclusion;
- service catalogue block on homepage or hubs.

## 14. Lead Path Architecture

Lead path follows `docs/ux/stage-16-lead-path-and-conversion-architecture-v1.md` and `docs/content/stage-16-client-need-hooks-and-lead-path-v1.md`.

Allowed CTAs:

- `Разобрать ситуацию`
- `Позвонить`
- `Построить маршрут`
- `Показать документы`

CTA meaning:

- `Разобрать ситуацию` = safe triage/route selection, not guaranteed result.
- `Позвонить` = phone contact, not booked consultation or instant answer promise.
- `Построить маршрут` = route/contact action, not public profile approval.
- `Показать документы` = safe agreed showing path, not public upload.

Live forms, CRM, analytics, upload and messaging remain blocked until separate evidence and owner/legal/backend/ops acceptance exist.

## 15. Internal Linking And Anti-Cannibalization

Internal links should preserve route boundaries:

- homepage links to `/razbor-situacii/`, key hubs and contacts without listing every service as a catalogue;
- `/razbor-situacii/` links to hubs or exact routes only after the route context is clear;
- hubs link to child money pages and diagnostics without duplicating their H1/title;
- money pages link to parent hub, selected related routes and contacts/review paths;
- diagnostics link to parent hub, `/razbor-situacii/` and exact routes only where contextually safe;
- contacts and policy remain support routes, not SEO landing pages;
- noindex foundation pages link back to safe routes without encouraging indexing.

Related route anchors must be human-readable and route-specific. They must not be keyword-stuffed.

## 16. Metadata/H1/Description Rules

Metadata must support the route role:

- title matches one route intent and may include brand/local context only where natural;
- H1 is visible, unique and aligned with route type;
- description explains the safe next step and route value without price, guarantee, deadline or result promises;
- hubs use route-selection language;
- money pages use exact document/service route language;
- diagnostics use checking/applicability language, not final answer language;
- contacts use confirmed NAP/contact language only;
- policy uses privacy/legal transparency language;
- noindex foundation routes avoid public SEO landing language.

Metadata must not expand scope beyond visible confirmed content.

## 17. FAQ And Schema Boundaries

FAQ can be used only when the same questions and answers are visible on the page and source-supported.

FAQ may answer:

- when this route fits;
- what to prepare before contact;
- how the page differs from sibling routes;
- why a review is needed before conclusions;
- what happens if the situation is unclear.

FAQ must not answer with prices, exact deadlines, guarantees, reviews, ratings, cases, hidden schema-only text or final legal/tax/bank conclusions.

Safe schema surfaces:

- WebPage;
- BreadcrumbList;
- FAQPage only for visible FAQ;
- Service only for visible, confirmed route scope.

Schema must not add Offer, price, rating, review, guarantee, legalName, taxID, openingHours or unsupported service scope. Blog/news foundation routes must not use Article/news schema while noindex foundation only.

## 18. Mobile-First And Accessibility Requirements

Implementation must follow:

- `docs/frontend/stage-15-mobile-layout-standards-v1.md`
- `docs/frontend/stage-15-semantic-markup-accessibility-standards-v1.md`
- `docs/frontend/stage-16-route-implementation-checklist-v1.md`

Minimum requirements:

- first screen shows page role, H1 and primary CTA on mobile;
- no horizontal overflow at required mobile widths;
- route cards and CTA targets remain usable;
- one visible H1 per page;
- headings follow logical hierarchy;
- keyboard users can reach navigation, CTAs, related routes and policy/contact links;
- hidden text is allowed only for accessibility labels, not SEO expansion;
- missing browser/mobile/accessibility proof remains `MISSING_EXPECTED`.

## 19. Source-To-Site Implementation Rules

The site repo must not become an independent canon.

Implementation rules:

- copy this document into `dokumenty82-site` at the same relative path;
- keep route registry, canon, HOLD, CTA and launch gates source-led;
- do not invent missing facts in site code or docs;
- record missing source/evidence as `MISSING_EXPECTED`;
- use source route groups and page type rules for implementation checks;
- keep `/blog/`, `/blog/obnovleniya-fns/` and `/blog/razbory/` noindex/excluded until future approval;
- keep public-live blockers active;
- do not stage, deploy, enable DNS/public live, CRM/forms/analytics/upload/messaging or HTTP/3/QUIC from this document.

## 20. Evidence And QA Requirements

Before public live, evidence must prove:

- route registry and sitemap match;
- canonical and robots are correct;
- noindex foundation routes are excluded from sitemap;
- metadata/H1/description support one URL = one intent;
- content blocks are visible and useful;
- no hidden SEO text or unsupported schema is present;
- CTA labels match source;
- no false form success, live CRM webhook, upload or messaging deep link is active;
- runtime has no forbidden public claims;
- browser/mobile/accessibility proof is current;
- staging, rollback and transport proof exist;
- `HTTP/3` / `QUIC` over `UDP/443`, `Alt-Svc: h3` and active `listen ... quic` remain blocked by default unless separately approved and proven.

Missing evidence remains `MISSING_EXPECTED`.

## 21. Owner/Legal Review Boundaries

This architecture prepares review. It does not record approval.

Owner/legal review must remain separate for:

- final route copy and public claims;
- `/policy`;
- contacts and personal-data handling;
- route-specific tax/legal/bank/accounting boundaries;
- public profiles/cards;
- CRM/forms/analytics;
- Search Console/Yandex Webmaster;
- staging/rollback/transport;
- public-live go/no-go.

Future decisions in the site repo must follow `docs/owner-review/stage-17h-human-decision-intake-protocol-v1.md`. No decision can be marked approved without explicit human-provided evidence.

## 22. Launch And Public-Live Boundaries

This document does not approve:

- public launch;
- paid traffic;
- final public copy;
- owner/legal sign-off;
- Search Console/Yandex Webmaster activation;
- live forms;
- CRM;
- analytics/Metrica;
- upload;
- messaging;
- FNS/blog/news live fetch, scheduler, rewrite provider, autopublish or indexing;
- HTTP/3/QUIC/UDP/443/Alt-Svc h3/active `listen ... quic`.

Transport rule:

`HTTP/3 / QUIC over UDP/443 requires separate owner/ops approval and proof. The baseline safe launch mode is HTTPS over TCP/443 using HTTP/1.1 or HTTP/2.`

`PUBLIC_LIVE_ALLOWED = false`

## 23. Release Status

`READY_WITH_CONDITIONS`

This Stage 16 selling SEO content architecture document resolves the final known Stage 16 source package gap after it is synced byte-for-byte into `dokumenty82-site`.

It is ready for source-to-site consistency checks, Stage 17 owner-review preparation and implementation guardrails.

It does not approve public live, deployment, owner/legal acceptance, CRM/forms/analytics, public upload, messaging, paid traffic, Search Console/Yandex Webmaster activation, FNS/blog/news automation or HTTP/3/QUIC.

`PUBLIC_LIVE_ALLOWED = false`
