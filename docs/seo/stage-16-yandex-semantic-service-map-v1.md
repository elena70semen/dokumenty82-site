# Stage 16 Yandex Semantic Service Map V1

Status: `READY_WITH_CONDITIONS`

Release verdict: `GO WITH CONDITIONS`

Public launch: `NOT_PUBLIC_LAUNCH_READY`

`PUBLIC_LIVE_ALLOWED = false`

## Purpose

This document is the source semantic-service map for Yandex SEO and source-to-site implementation in `elena70semen/dokumenty82-site`.

It connects approved routes, service groups, user intents, page roles, metadata direction, schema limits, FAQ direction and lead CTA rules. It does not create new public routes, approve final public copy, approve Yandex launch, approve paid traffic, approve owner/legal decisions or remove any HOLD gate.

## Source Basis

- `AGENTS.md`
- `README.md`
- `docs/00-start/active-canon-index.md`
- `docs/00-start/hold-register.md`
- `docs/seo/route-registry.md`
- `docs/seo/seo-canon.md`
- `docs/seo/semantic-core-v1.md`
- `docs/seo/semantic-analysis-and-priority-plan-v1.md`
- `docs/seo/metadata-completion-and-semantic-gap-plan-v1.md`
- `docs/seo/route-cannibalization-intent-boundary-audit-v1.md`
- `docs/seo/seo-structure-strengthening-audit-v1.md`
- `docs/seo/yandex-seo-playbook.md`
- `docs/seo/stage-16-route-group-semantic-coverage-v1.md`
- `docs/services/service-catalog-2026-v1.md`
- `docs/services/service-source-ledger-2026.md`
- `docs/services/passports/`
- `docs/content/stage-15-text-quality-standards-v1.md`
- `docs/content/stage-16-selling-page-block-library-v1.md`
- `docs/ux/stage-16-lead-path-and-conversion-architecture-v1.md`
- `docs/frontend/stage-16-route-implementation-checklist-v1.md`

## Canon Summary

| Field | Value |
| --- | --- |
| Brand | `Документы для бизнеса` |
| Canonical host | `https://dokumenty82.ru/` |
| Category | `Центр подготовки документов` |
| Extended category | `центр подготовки документов для бизнеса` |
| Geography | `Симферополь / Республика Крым` |
| Slogan | `Разберём ситуацию и подготовим документы.` |
| Local marker | `офис рядом с налоговой` |
| Main CTA | `Разобрать ситуацию` |
| Secondary CTA | `Позвонить`; `Построить маршрут`; `Показать документы` |

## HOLD Summary

Do not target, publish, imply or add:

- working hours, office number, floor, full legal entity name, INN, OGRN, bank/legal details or representative name;
- prices, discounts, guarantees, exact deadlines, urgent-result promises, reviews, ratings, cases or comparative claims without proof;
- legal, tax, bank, registry or HR outcome promises before reviewing the situation and documents;
- real form endpoint, CRM webhook, private analytics IDs, false success state, public upload or messaging deep links;
- old names, old domains, state affiliation wording, hidden SEO text or schema wider than visible confirmed content.

Allowed local marker: `офис рядом с налоговой`. It must remain a neutral location cue and must not imply official state affiliation, partnership or representative status.

## Route Groups

| Group | Route role | Routes | Yandex semantic role | Lead CTA |
| --- | --- | --- | --- | --- |
| Core/local brand entry | Brand/local router and trust context | `/`, `/o-proekte/` | Explain project, local category and safe first step without becoming a service catalogue. | `Разобрать ситуацию` |
| Situation review | First-step triage | `/razbor-situacii/` | Own unclear demand and route selection before exact page choice. | `Разобрать ситуацию` |
| Contacts | Canonical NAP/contact path | `/kontakty/` | Own phone, address, route and safe document-showing path. | `Позвонить` |
| Policy | Legal/privacy transparency | `/policy` | Own privacy and data-handling transparency, not commercial SEO. | `Позвонить` only if contextually needed |
| Urgent/tax questions | Mixed urgent document routing | `/srochnye-voprosy/`, `/otvet-na-trebovanie-ifns/` | Split urgent/unclear demand from exact IFNS requirement response. | `Разобрать ситуацию`; `Показать документы` |
| Reporting/USN/zero reporting | Reporting routes | `/otchetnost/`, `/deklaraciya-usn/`, `/nulevaya-otchetnost-ooo/`, `/nulevaya-otchetnost-ip/`, `/otchetnost-elektronno/`, `/vosstanovlenie-buhucheta/` | Separate hub selection, USN declaration, zero reporting, electronic reporting and recovery. | `Показать документы`; `Разобрать ситуацию` |
| Bank/115-ФЗ | Bank request and package routes | `/bank-i-115-fz/`, `/otvet-na-zapros-banka/`, `/dokumenty-dlya-banka-115-fz/` | Split bank request response from broader 115-ФЗ package. | `Показать документы`; `Разобрать ситуацию` |
| Address/EGRUL/director | Corporate address and registry change routes | `/adres-egryul-direktor/`, `/yuridicheskiy-adres-simferopol/`, `/nedostovernost-yuridicheskogo-adresa/`, `/smena-yuridicheskogo-adresa-ooo/`, `/smena-direktora-ooo/` | Separate legal address, address unreliability, address change and director change. | `Разобрать ситуацию`; `Показать документы` |
| Registration/liquidation | Lifecycle routes | `/registraciya-i-likvidaciya/`, `/registraciya-ooo/`, `/registraciya-ip/`, `/likvidaciya-ooo/` | Split ООО, ИП and liquidation intents; route tax questions to diagnostics when needed. | `Разобрать ситуацию` |
| Tax regimes/diagnostics | Tax route selection and diagnostics | `/nalogi-i-rezhimy/`, `/ausn-krym/`, `/perehod-na-ausn/`, `/raschet-nalogovoy-nagruzki/`, `/nds-pri-usn-2026/` | Explain inputs and review boundaries without final public tax advice. | `Разобрать ситуацию` |
| HR | HR document routing | `/kadry/`, `/srochnoe-oformlenie-sotrudnikov/`, `/kadrovoe-soprovozhdenie/` | Split urgent employee documents from HR support. | `Разобрать ситуацию`; `Показать документы` |
| Support | Accounting/business support routes | `/soprovozhdenie/`, `/buhgalterskoe-soprovozhdenie-ooo/`, `/buhgalterskoe-soprovozhdenie-ip/` | Split regular support from one-off reporting/recovery routes. | `Разобрать ситуацию` |
| Blog/news noindex foundation | Future content foundation | `/blog/`, `/blog/obnovleniya-fns/`, `/blog/razbory/` | Noindex foundation only; no live fetch, autopublish or indexing. | `Разобрать ситуацию`; `Контакты` |

## Approved Route Map

| URL | Class | Parent | Indexing | Primary intent | CTA |
| --- | --- | --- | --- | --- | --- |
| `/` | core | none | indexed | Brand/local router for document preparation in Simferopol. | `Разобрать ситуацию` |
| `/razbor-situacii/` | core | `/` | indexed | Safe first-step triage for unclear document situations. | `Разобрать ситуацию` |
| `/kontakty/` | contact | `/` | indexed | Confirmed NAP, phone, route and office-first contact path. | `Позвонить` |
| `/o-proekte/` | core | `/` | indexed | Project format and safe work boundaries. | `Разобрать ситуацию` |
| `/policy` | legal | `/` | indexed | Privacy/legal transparency. | `Позвонить` |
| `/blog/` | noindex foundation | `/` | noindex/excluded | Future content hub foundation only. | `Разобрать ситуацию` |
| `/blog/obnovleniya-fns/` | noindex foundation | `/blog/` | noindex/excluded | Future FNS/IFNS updates foundation only. | `Разобрать ситуацию` |
| `/blog/razbory/` | noindex foundation | `/blog/` | noindex/excluded | Future evergreen explanations foundation only. | `Разобрать ситуацию` |
| `/srochnye-voprosy/` | hub | `/` | indexed | Urgent/unclear document route selection. | `Разобрать ситуацию` |
| `/otchetnost/` | hub | `/` | indexed | Reporting route selection. | `Разобрать ситуацию` |
| `/nalogi-i-rezhimy/` | hub | `/` | indexed | Tax regimes and diagnostics router. | `Разобрать ситуацию` |
| `/bank-i-115-fz/` | hub | `/` | indexed | Bank request and 115-ФЗ router. | `Разобрать ситуацию` |
| `/adres-egryul-direktor/` | hub | `/` | indexed | Address, EGRUL and director route selector. | `Разобрать ситуацию` |
| `/kadry/` | hub | `/` | indexed | HR route selector. | `Разобрать ситуацию` |
| `/soprovozhdenie/` | hub | `/` | indexed | Support route selector. | `Разобрать ситуацию` |
| `/registraciya-i-likvidaciya/` | hub | `/` | indexed | Registration and liquidation route selector. | `Разобрать ситуацию` |
| `/otvet-na-trebovanie-ifns/` | money page | `/srochnye-voprosy/` | indexed | Response route for an IFNS requirement. | `Показать документы` |
| `/deklaraciya-usn/` | money page | `/otchetnost/` | indexed | USN declaration route by period and inputs. | `Показать документы` |
| `/otvet-na-zapros-banka/` | money page | `/bank-i-115-fz/` | indexed | Response route for a specific bank request. | `Показать документы` |
| `/dokumenty-dlya-banka-115-fz/` | money page | `/bank-i-115-fz/` | indexed | 115-ФЗ document package route by situation. | `Разобрать ситуацию` |
| `/yuridicheskiy-adres-simferopol/` | money page | `/adres-egryul-direktor/` | indexed | Legal address route in Simferopol. | `Разобрать ситуацию` |
| `/nedostovernost-yuridicheskogo-adresa/` | money page | `/adres-egryul-direktor/` | indexed | Address unreliability route. | `Показать документы` |
| `/smena-yuridicheskogo-adresa-ooo/` | money page | `/adres-egryul-direktor/` | indexed | Change legal address for ООО. | `Показать документы` |
| `/smena-direktora-ooo/` | money page | `/adres-egryul-direktor/` | indexed | Change director for ООО. | `Показать документы` |
| `/srochnoe-oformlenie-sotrudnikov/` | money page | `/kadry/` | indexed | Urgent employee document route without timing promise. | `Показать документы` |
| `/perehod-na-ausn/` | money page | `/nalogi-i-rezhimy/` | indexed | AУСН transition route, separated from diagnostics. | `Разобрать ситуацию` |
| `/nulevaya-otchetnost-ooo/` | money page | `/otchetnost/` | indexed | Zero reporting route for ООО. | `Показать документы` |
| `/nulevaya-otchetnost-ip/` | money page | `/otchetnost/` | indexed | Zero reporting route for ИП. | `Показать документы` |
| `/otchetnost-elektronno/` | money page | `/otchetnost/` | indexed | Electronic reporting route without public access collection. | `Разобрать ситуацию` |
| `/vosstanovlenie-buhucheta/` | money page | `/otchetnost/` | indexed | Accounting recovery route by period and gaps. | `Разобрать ситуацию` |
| `/buhgalterskoe-soprovozhdenie-ooo/` | money page | `/soprovozhdenie/` | indexed | Accounting support route for ООО. | `Разобрать ситуацию` |
| `/buhgalterskoe-soprovozhdenie-ip/` | money page | `/soprovozhdenie/` | indexed | Accounting support route for ИП. | `Разобрать ситуацию` |
| `/kadrovoe-soprovozhdenie/` | money page | `/kadry/` | indexed | HR support route. | `Разобрать ситуацию` |
| `/registraciya-ooo/` | money page | `/registraciya-i-likvidaciya/` | indexed | ООО registration document route. | `Разобрать ситуацию` |
| `/registraciya-ip/` | money page | `/registraciya-i-likvidaciya/` | indexed | ИП registration document route. | `Разобрать ситуацию` |
| `/likvidaciya-ooo/` | money page | `/registraciya-i-likvidaciya/` | indexed | ООО liquidation route. | `Разобрать ситуацию` |
| `/ausn-krym/` | diagnostic | `/nalogi-i-rezhimy/` | indexed | AУСН applicability diagnostic in Crimea. | `Разобрать ситуацию` |
| `/raschet-nalogovoy-nagruzki/` | diagnostic | `/nalogi-i-rezhimy/` | indexed | Tax-load diagnostic input route. | `Разобрать ситуацию` |
| `/nds-pri-usn-2026/` | diagnostic | `/nalogi-i-rezhimy/` | indexed | VAT/USN 2026 diagnostic route. | `Разобрать ситуацию` |

## Service-To-Route Map

| Service contour | Primary routes | Boundary |
| --- | --- | --- |
| Situation review | `/razbor-situacii/` | First step only; not a free substitute for service. |
| IFNS/urgent documents | `/srochnye-voprosy/`, `/otvet-na-trebovanie-ifns/` | No final tax/legal conclusion or deadline promise. |
| Reporting | `/otchetnost/`, `/deklaraciya-usn/`, `/nulevaya-otchetnost-ooo/`, `/nulevaya-otchetnost-ip/`, `/otchetnost-elektronno/`, `/vosstanovlenie-buhucheta/` | No public final calculation, accepted-reporting promise or access collection. |
| Bank/115-ФЗ | `/bank-i-115-fz/`, `/otvet-na-zapros-banka/`, `/dokumenty-dlya-banka-115-fz/` | No bank decision, unblocking or acceptance promise. |
| Address/EGRUL/director | `/adres-egryul-direktor/`, `/yuridicheskiy-adres-simferopol/`, `/nedostovernost-yuridicheskogo-adresa/`, `/smena-yuridicheskogo-adresa-ooo/`, `/smena-direktora-ooo/` | No registry result promise, legal details or state affiliation. |
| Lifecycle | `/registraciya-i-likvidaciya/`, `/registraciya-ooo/`, `/registraciya-ip/`, `/likvidaciya-ooo/` | No external result, timing or tax conclusion. |
| Tax regimes/diagnostics | `/nalogi-i-rezhimy/`, `/ausn-krym/`, `/perehod-na-ausn/`, `/raschet-nalogovoy-nagruzki/`, `/nds-pri-usn-2026/` | No final public tax advice, savings claim or fake calculator output. |
| HR | `/kadry/`, `/srochnoe-oformlenie-sotrudnikov/`, `/kadrovoe-soprovozhdenie/` | No employment-law conclusion, timing promise or personal-data upload. |
| Support | `/soprovozhdenie/`, `/buhgalterskoe-soprovozhdenie-ooo/`, `/buhgalterskoe-soprovozhdenie-ip/` | No package/pricing/unlimited-scope claims. |
| Contact/NAP | `/kontakty/` | Confirmed NAP only; no hours, office/floor or legal identifiers. |
| Policy | `/policy` | Legal/privacy transparency only; owner/legal acceptance still required. |

## Route-To-Intent Map

| Route type | Intent ownership | Must not capture |
| --- | --- | --- |
| Homepage | Brand/local entry and route selection. | Exact service/money-page intent, full service catalogue. |
| Situation review | Ambiguous demand and safe triage. | Final legal/tax/bank decision or free full service. |
| Hub | Mixed route-choice intent. | Child money-page exact H1/title and exact commercial promise. |
| Money page | One exact commercial/document intent. | Sibling intents, hub-wide catalogue, price/guarantee/deadline demand. |
| Diagnostic | Applicability/checking/calculation input intent. | Final public advice, result, savings, exact calculation. |
| Contacts | NAP, phone, route and office-first visit/contact. | Service catalogue, hours, office/floor, legal identifiers. |
| Policy | Privacy/legal transparency. | Commercial conversion page or service SEO target. |
| Noindex foundation | Future content shell only. | Indexed news, autopublish, live FNS fetch or Article schema. |

## Hub Vs Money-Page Intent Boundaries

- Hubs explain how to choose a route and link to children.
- Hubs must not duplicate a child money-page title, H1 or exact commercial promise.
- Money pages answer the exact route question, show what is checked, what documents/data may be needed and what is not promised.
- If a query could belong to multiple routes, lead it to `/razbor-situacii/` or the parent hub instead of forcing a wrong exact page.

## Diagnostics Boundaries

Diagnostics pages may explain:

- what data affects applicability or calculation;
- what should be checked before a conclusion;
- which next route may be relevant.

Diagnostics pages must not publish:

- final tax/legal advice;
- fake calculator output;
- savings or reduction promises;
- universal 2026 conclusions without review.

## Noindex Content Foundation Boundaries

The content foundation routes `/blog/`, `/blog/obnovleniya-fns/` and `/blog/razbory/` remain:

- noindex;
- excluded from sitemap;
- without live fetch;
- without scheduler;
- without rewrite provider;
- without autopublish;
- without Article/news schema;
- without public indexing approval.

## Internal Linking Principles

- Every money page links to its parent hub.
- Every money page has a safe next step: `/razbor-situacii/` or `/kontakty/`.
- Hubs link to child routes and do not become all-route catalogues.
- Diagnostics link to parent hub, relevant exact route only where source-safe, and `/razbor-situacii/`.
- Contacts and policy remain reachable from footer and relevant legal/contact blocks.
- Anchors must be human-readable and route-specific, not keyword-stuffed.

## Metadata Direction

- Title must match one route intent and may include brand/local context only where natural.
- H1 must be visible, unique and aligned with route role.
- Description must help the user choose the page without widening the intent.
- No metadata may include prices, discounts, guarantees, reviews, ratings, exact deadlines, legal identifiers, old domains or state-affiliation claims.
- Content foundation routes must remain noindex until a later approved content model exists.

## H1 Direction

| Route type | H1 direction |
| --- | --- |
| Homepage | Brand/local first step in Simferopol. |
| Situation review | Safe triage and route selection by documents/situation. |
| Hub | Route family and choice language. |
| Money page | Exact service/document route. |
| Diagnostic | Question/checking language, not final answer language. |
| Contacts | Contact/NAP language. |
| Policy | Privacy/legal page language. |
| Noindex foundation | Foundation/content label only while noindex. |

## FAQ Direction

FAQ may be used when answers are visible and source-supported. FAQ should answer:

- when this route fits;
- what to prepare before contact;
- how it differs from sibling routes;
- why a final outcome cannot be promised before review;
- what safe next step exists.

FAQ must not answer with prices, exact deadlines, guarantees, reviews, hidden schema-only text or final legal/tax/bank conclusions.

## Schema Boundary

- WebPage and BreadcrumbList are the default safe schema surfaces.
- LocalBusiness/Organization data may use only visible confirmed NAP where appropriate.
- FAQPage may be used only when the same FAQ is visible.
- Service schema may describe only visible route content and must not add Offer, price, rating, review, guarantee, legalName, taxID, openingHours or unsupported service scope.
- Blog/news routes must not use Article/news schema while foundation-only and noindex.

## Lead CTA By Page Type

| Page type | Primary CTA | Secondary CTA |
| --- | --- | --- |
| Homepage | `Разобрать ситуацию` | `Позвонить`; `Построить маршрут` |
| Situation review | `Разобрать ситуацию` | `Позвонить`; `Показать документы` |
| Hub | `Разобрать ситуацию` | route cards; `Позвонить`; `Показать документы` where appropriate |
| Money page | route-specific: `Показать документы` or `Разобрать ситуацию` | `Позвонить`; parent hub; related route |
| Diagnostic | `Разобрать ситуацию` | parent hub; relevant route where safe |
| Contacts | `Позвонить` | `Построить маршрут`; `Показать документы` |
| Policy | no aggressive CTA | `Позвонить` only as contact fallback |
| Noindex foundation | `Разобрать ситуацию` | `Контакты` |

## Route-Level HOLD Risks

| URL | HOLD risks |
| --- | --- |
| `/` | service catalogue drift, unconfirmed local/profile claims, state-affiliation wording. |
| `/razbor-situacii/` | free-service implication, final conclusion, sensitive-data collection. |
| `/kontakty/` | hours, office/floor, legal identifiers, unapproved map/profile data. |
| `/o-proekte/` | reviews, ratings, cases, legal proof claims. |
| `/policy` | unapproved legal wording, provider/cookie/analytics claims. |
| `/blog/` | indexing, live feed, unsupported public content. |
| `/blog/obnovleniya-fns/` | live FNS fetch, copied source text, stale news, indexing. |
| `/blog/razbory/` | unsupported legal/tax explanations, indexing before approval. |
| `/srochnye-voprosy/` | pressure wording, exact deadlines, urgent-result promise. |
| `/otchetnost/` | final tax conclusion, hub capturing child page intent. |
| `/nalogi-i-rezhimy/` | final tax advice, savings/outcome claims. |
| `/bank-i-115-fz/` | bank outcome promise, sensitive document handling. |
| `/adres-egryul-direktor/` | registry outcome promise, state-affiliation wording. |
| `/kadry/` | personal data, timing and employment-law conclusions. |
| `/soprovozhdenie/` | package/pricing/unlimited-scope claims. |
| `/registraciya-i-likvidaciya/` | registration/liquidation outcome promise, timing, tax conclusion. |
| `/otvet-na-trebovanie-ifns/` | tax/legal position, exact response timing, IFNS acceptance promise. |
| `/deklaraciya-usn/` | final tax calculation, exact deadline, accepted-reporting promise. |
| `/otvet-na-zapros-banka/` | bank acceptance, account result, sensitive materials. |
| `/dokumenty-dlya-banka-115-fz/` | bank decision, broad package promise, sensitive materials. |
| `/yuridicheskiy-adres-simferopol/` | legal details, office/floor, commercial terms, registry outcome. |
| `/nedostovernost-yuridicheskogo-adresa/` | guaranteed removal, legal conclusion, registry outcome. |
| `/smena-yuridicheskogo-adresa-ooo/` | registry result, legal conclusion, unconfirmed address data. |
| `/smena-direktora-ooo/` | registry result, representative/personal data, corporate conclusion. |
| `/srochnoe-oformlenie-sotrudnikov/` | exact timing, personal data, HR legal conclusion. |
| `/perehod-na-ausn/` | savings promise, final applicability conclusion. |
| `/nulevaya-otchetnost-ooo/` | zero-status conclusion, exact deadline, accepted-reporting promise. |
| `/nulevaya-otchetnost-ip/` | regime/activity conclusion, exact deadline, accepted-reporting promise. |
| `/otchetnost-elektronno/` | provider/access promise, credential handling, access collection. |
| `/vosstanovlenie-buhucheta/` | exact recovery result, scope overreach, sensitive documents. |
| `/buhgalterskoe-soprovozhdenie-ooo/` | price/package/scope promise, unlimited support implication. |
| `/buhgalterskoe-soprovozhdenie-ip/` | price/package/scope promise, unlimited support implication. |
| `/kadrovoe-soprovozhdenie/` | personal data, scope/timing, employment-law conclusion. |
| `/registraciya-ooo/` | registration result, legal conclusion, tax choice promise. |
| `/registraciya-ip/` | registration result, tax/regime conclusion. |
| `/likvidaciya-ooo/` | liquidation result, exact timing, legal conclusion. |
| `/ausn-krym/` | final tax conclusion, future-rule drift, universal applicability. |
| `/raschet-nalogovoy-nagruzki/` | final calculation, savings promise, hidden pricing. |
| `/nds-pri-usn-2026/` | final public tax advice, future-rule conclusion, exact obligation claim. |

## Source-To-Site Sync Rule

This file is source-of-truth. The site repository may copy it to the same relative path and use it for guardrails, route QA, metadata reviews and owner/legal review preparation.

If source and site copies differ, the source repo controls unless a later owner decision explicitly updates the source.

## Release Status

`READY_WITH_CONDITIONS`

This semantic-service map can replace the previous `MISSING_EXPECTED` placeholder after it is synced to `dokumenty82-site`.

It does not approve public launch, owner/legal sign-off, paid traffic, Search Console/Yandex Webmaster activation, live forms, CRM, analytics, upload, messaging, FNS automation or HTTP/3/QUIC.

`PUBLIC_LIVE_ALLOWED = false`
