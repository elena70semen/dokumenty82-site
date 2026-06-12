# Stage 16 Page Block Blueprints V1

Status: `READY_WITH_CONDITIONS`

Release verdict: `GO WITH CONDITIONS`

Public launch: `NOT_PUBLIC_LAUNCH_READY`

`PUBLIC_LIVE_ALLOWED = false`

## Purpose

This document defines source page-block blueprints for `dokumenty82-site` route implementation.

It translates the route registry, semantic coverage, service passports, text standards, lead path architecture and frontend checklist into page-type block rules. It does not approve final public copy, final visual design, public launch, live forms, CRM, analytics, upload, messaging or public SEO launch.

## Source Basis

- `docs/seo/route-registry.md`
- `docs/seo/semantic-core-v1.md`
- `docs/seo/stage-16-route-group-semantic-coverage-v1.md`
- `docs/services/service-catalog-2026-v1.md`
- `docs/services/passports/`
- `docs/content/stage-15-text-quality-standards-v1.md`
- `docs/content/stage-16-selling-page-block-library-v1.md`
- `docs/ux/stage-16-lead-path-and-conversion-architecture-v1.md`
- `docs/frontend/stage-15-mobile-layout-standards-v1.md`
- `docs/frontend/stage-15-semantic-markup-accessibility-standards-v1.md`
- `docs/frontend/stage-16-route-implementation-checklist-v1.md`
- `docs/00-start/hold-register.md`

## Global Block Rules

Every page must preserve:

- one URL = one main intent;
- visible human text, not hidden SEO text;
- one visible H1;
- CTA hierarchy: `Разобрать ситуацию`, `Позвонить`, `Построить маршрут`, `Показать документы`;
- office-first logic and safe document discussion;
- route boundaries and anti-cannibalization;
- schema limited to visible confirmed content;
- `PUBLIC_LIVE_ALLOWED = false`.

Every page must avoid:

- prices, discounts, guarantees, exact deadlines, reviews, ratings, cases and result promises;
- legal identifiers, working hours, office/floor details and unconfirmed legal facts;
- public upload, real form endpoint, CRM webhook, false success and messaging deep links;
- final legal/tax/bank/registry/HR conclusion before review;
- old names, old domains and state-affiliation wording.

## Required Block Families

| Block family | Purpose | Use on |
| --- | --- | --- |
| Hero | Identify route role, H1 and safe next step. | all page types |
| Route intent clarification | Explain when the URL is the right route and what it does not own. | homepage, hubs, money pages, diagnostics |
| When this page fits | Match user state to route. | situation review, hubs, money pages, diagnostics |
| What we check | Show source-safe review items without final conclusion. | situation review, hubs, money pages, diagnostics |
| What documents/data may be needed | Prepare user for call/office discussion without upload. | situation review, money pages, diagnostics, contacts |
| How work starts | Explain safe first step and triage. | all commercial/lead pages |
| What is not promised | Preserve HOLD and review boundaries. | situation review, hubs, money pages, diagnostics |
| Related routes | Route wrong-fit users to parent/sibling/safe next step. | homepage, hubs, money pages, diagnostics |
| FAQ | Answer real uncertainty visibly and safely. | all route pages where source-supported |
| Local/NAP block | Provide confirmed phone/address/local marker only. | homepage, contacts, selected route pages |
| Final safe CTA | Close with allowed CTA only. | all route pages |
| Noindex/foundation notice | Preserve foundation-only status. | blog/news foundation |

## Homepage Blueprint

| Field | Rule |
| --- | --- |
| Page role | Brand/local router, not a service catalogue. |
| User question answered | Where do I start with business documents in Simferopol? |
| SEO role | Own brand/local/category entry and route selection. |
| Conversion role | Move user to `/razbor-situacii/`, a priority route family or `/kontakty/`. |
| Required blocks | Hero; route intent clarification; selected route families; how work starts; local/NAP block; FAQ; final safe CTA. |
| Optional blocks | Compact process overview; documents/materials preview; project format note. |
| Forbidden blocks | Full all-services catalogue; prices; reviews; ratings; cases; working hours; office/floor; state-affiliation wording. |
| CTA rules | Primary `Разобрать ситуацию`; secondary `Позвонить`, `Построить маршрут`. |
| Internal linking rules | Link to `/razbor-situacii/`, `/kontakty/` and selected hubs only. |
| Mobile behavior | First screen must show brand/local role, H1 and primary CTA without a long catalogue. |
| Accessibility notes | One H1; route cards as accessible links; focus visible; no hidden route lists. |
| Source dependencies | Active canon, NAP, route registry, semantic coverage, text standards. |
| HOLD risks | Local/profile claims, hours, office/floor, reviews/ratings, service catalogue drift. |

## Situation Review Page Blueprint

| Field | Rule |
| --- | --- |
| Page role | Safe first-step triage. |
| User question answered | I do not know which document route applies; what should be checked first? |
| SEO role | Own ambiguous/situation-review demand without replacing exact service pages. |
| Conversion role | Collect context safely and route to contact, document-showing path or exact page. |
| Required blocks | Hero; when this page fits; what we check; documents/data may be needed; how work starts; what is not promised; related routes; FAQ; final safe CTA. |
| Optional blocks | Simple route chooser; office-first explanation. |
| Forbidden blocks | Free full-service promise; final legal/tax/bank answer; upload request; false success. |
| CTA rules | Primary `Разобрать ситуацию`; secondary `Позвонить`, `Показать документы`. |
| Internal linking rules | Link to `/kontakty/`, `/srochnye-voprosy/` and relevant hubs. |
| Mobile behavior | Intake and route-choice blocks stay short and stack before secondary content. |
| Accessibility notes | Labels visible if forms/placeholders appear; submit success disabled until backend/CRM acceptance. |
| Source dependencies | Situation-review passport, lead path architecture, text standards. |
| HOLD risks | Free substitute implication, sensitive-data collection, unsupported conclusion. |

## Hub Page Blueprint

| Field | Rule |
| --- | --- |
| Page role | Mixed-intent route selector. |
| User question answered | Which exact route should I choose inside this service group? |
| SEO role | Own route-family demand and internal linking without capturing child money-page intent. |
| Conversion role | Move user to child route, `/razbor-situacii/` or `/kontakty/`. |
| Required blocks | Hero; route intent clarification; when this page fits; child route selector; what we check; related routes; FAQ; final safe CTA. |
| Optional blocks | Situation recognition; local contact bridge; safety note. |
| Forbidden blocks | Duplicate child H1/title; all-route dump; price/package table; broad outcome promise. |
| CTA rules | Primary `Разобрать ситуацию`; child cards are route links; `Показать документы` only if route group supports it. |
| Internal linking rules | Link to child routes, `/razbor-situacii/`, `/kontakty/`; avoid unrelated route walls. |
| Mobile behavior | Child cards stack; route names wrap; no horizontal overflow. |
| Accessibility notes | Cards are links with clear names and visible focus. |
| Source dependencies | Route registry, semantic coverage, cannibalization audit, block library. |
| HOLD risks | Service catalogue drift, child intent cannibalization, unsupported scope. |

## Money Page Blueprint

| Field | Rule |
| --- | --- |
| Page role | Exact commercial/document route. |
| User question answered | Is this the exact route for my document situation, and what should I prepare? |
| SEO role | Own one exact intent and provide useful visible depth. |
| Conversion role | Move user to document review/contact without promising outcome. |
| Required blocks | Hero; route intent clarification; when this page fits; what we check; documents/data may be needed; how work starts; what affects result; what is not promised; parent/related routes; FAQ; local/contact block; final safe CTA. |
| Optional blocks | Problem/risk explanation where source-safe; support follow-up note if it does not broaden the public scope. |
| Forbidden blocks | Outcome promise; exact deadlines; prices; guarantees; reviews; ratings; cases; public upload; legal/tax/bank conclusion. |
| CTA rules | Use route-specific source CTA: often `Показать документы` for document-heavy routes or `Разобрать ситуацию` for review/support routes; fallback `Позвонить`. |
| Internal linking rules | Link to parent hub, 2-4 useful sibling/related routes and `/kontakty/` or `/razbor-situacii/`. |
| Mobile behavior | Document/check lists stay compact; related cards stack; no tables that overflow. |
| Accessibility notes | One H1; lists and FAQs visible; no hidden disclaimers; focusable controls only when interactive. |
| Source dependencies | Route registry row, service catalog row, service passport, semantic coverage, lead path. |
| HOLD risks | Exact result, timing, scope, sensitive documents, public claims needing owner/legal/tax review. |

## Diagnostic Page Blueprint

| Field | Rule |
| --- | --- |
| Page role | Applicability, influence or calculation intent without final public answer. |
| User question answered | What inputs affect the answer and where should I go next? |
| SEO role | Own diagnostic/checking intent without becoming a money page or tax-advice page. |
| Conversion role | Move user to safe review, parent hub or exact route after inputs are known. |
| Required blocks | Hero; route intent clarification; when this page fits; what we check; data needed; what affects result; what is not promised; related routes; FAQ; final safe CTA. |
| Optional blocks | Diagnostic examples phrased as inputs, not conclusions. |
| Forbidden blocks | Final calculator output, universal tax answer, savings promise, hidden formula, exact obligation claim. |
| CTA rules | Primary `Разобрать ситуацию`; no false diagnostic result. |
| Internal linking rules | Parent hub, `/razbor-situacii/`, relevant money page only when contextually safe. |
| Mobile behavior | Data/input lists stack; no fake calculator or wide comparison table. |
| Accessibility notes | If future calculators exist, they require separate accessible proof; none is approved here. |
| Source dependencies | Tax/regime passports, semantic coverage, route implementation checklist. |
| HOLD risks | Tax/legal conclusion, future-rule drift, public formula or savings claim. |

## Contacts Page Blueprint

| Field | Rule |
| --- | --- |
| Page role | Canonical NAP and safe contact path. |
| User question answered | How do I call, find the office or prepare to show documents? |
| SEO role | Own contact, phone, route and local NAP demand. |
| Conversion role | Provide phone, route/contact action and policy path without unconfirmed details. |
| Required blocks | Hero; NAP block; phone CTA; address/route text; show-documents safe flow; policy link; final safe CTA. |
| Optional blocks | Provider-gated map fallback; what to prepare before contact. |
| Forbidden blocks | Working hours, office/floor, legal identifiers, public profile claims, unapproved map/provider claims. |
| CTA rules | Primary `Позвонить`; secondary `Построить маршрут`, `Показать документы`. |
| Internal linking rules | `/razbor-situacii/`, `/policy`, `/`. |
| Mobile behavior | Phone/address wrap; tap targets comfortable; no map overflow. |
| Accessibility notes | Phone link has readable accessible name; address remains text; route action clear. |
| Source dependencies | Active canon, NAP, contacts passport, lead path, policy/legal docs. |
| HOLD risks | Hours, office/floor, legal entity/requisites, provider/profile data. |

## Policy Page Blueprint

| Field | Rule |
| --- | --- |
| Page role | Legal/privacy transparency. |
| User question answered | What privacy/data-handling information is available and how can I contact the project? |
| SEO role | Minimal legal transparency; not a commercial SEO page. |
| Conversion role | Support trust and compliance; no aggressive conversion. |
| Required blocks | Policy hero/H1; visible policy text; contact fallback; footer/contact link. |
| Optional blocks | Short contact note if source-approved. |
| Forbidden blocks | Service route selector, commercial pressure, unapproved provider/cookie/analytics claims, legal identifiers. |
| CTA rules | No aggressive CTA; `Позвонить` only as contact fallback. |
| Internal linking rules | `/kontakty/`, `/`. |
| Mobile behavior | Long text readable; headings/lists wrap. |
| Accessibility notes | Logical heading structure and readable paragraphs/lists. |
| Source dependencies | Legal/privacy source docs, route registry, policy content. |
| HOLD risks | Owner/legal acceptance, legal entity details, provider/cookie/analytics statements. |

## Noindex Foundation Page Blueprint

| Field | Rule |
| --- | --- |
| Page role | Future content foundation only. |
| User question answered | Where future updates/explainers may live after approval. |
| SEO role | None while noindex; excluded from sitemap. |
| Conversion role | Route users back to `/razbor-situacii/` or `/kontakty/`. |
| Required blocks | Hero; foundation/noindex notice if internal context needs it; safe route back; no live feed. |
| Optional blocks | Placeholder category description without news claims. |
| Forbidden blocks | Live FNS fetch, copied source text, autopublish, Article/news schema, indexing, `/novosti/` or `/news/` route. |
| CTA rules | `Разобрать ситуацию`; `Контакты`. |
| Internal linking rules | No public navigation emphasis unless separately approved. |
| Mobile behavior | Basic readability; no content feed layout needed. |
| Accessibility notes | Same heading/nav/focus rules as other pages. |
| Source dependencies | Route registry content section, blog/news gates, launch gates. |
| HOLD risks | Indexing, source attribution, legal/tax claims, stale news, automation. |

## Acceptance Criteria

This blueprint is complete when:

- each page type has role, user question, SEO role, conversion role, required/optional/forbidden blocks, CTA rules, internal linking rules, mobile behavior, accessibility notes, source dependencies and HOLD risks;
- every required block family is represented;
- no new routes, final public copy, final visual polish or launch approval are created;
- site sync can replace the previous placeholder.

## Source-To-Site Sync Rule

Copy this file to `dokumenty82-site` at the same relative path. Site implementation and QA may use it as a source document for block completeness, but final owner/legal approval remains separate.

## Release Verdict

`GO WITH CONDITIONS`

Stage 16 page block blueprints are resolved in source and ready to sync to site with public-live gates closed.

`PUBLIC_LIVE_ALLOWED = false`
