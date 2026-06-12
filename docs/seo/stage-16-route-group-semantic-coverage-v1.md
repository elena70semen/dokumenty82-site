# Stage 16 Route Group Semantic Coverage V1

Status: `SOURCE_TO_SITE_SEMANTIC_COVERAGE_READY_WITH_CONDITIONS`

Release verdict: `GO WITH CONDITIONS`

Public launch: `NOT_PUBLIC_LAUNCH_READY`

`PUBLIC_LIVE_ALLOWED = false`

## Purpose

This document groups approved route semantics by business problem and service group for future implementation in `dokumenty82-site`.

It uses the source route registry and does not create new public routes. Any route, query or page idea outside `docs/seo/route-registry.md` remains `HOLD` or an expansion candidate outside this package.

Use with:

- `docs/seo/route-registry.md`;
- `docs/seo/semantic-core-v1.md`;
- `docs/seo/semantic-analysis-and-priority-plan-v1.md`;
- `docs/seo/route-cannibalization-intent-boundary-audit-v1.md`;
- `docs/services/service-catalog-2026-v1.md`;
- `docs/services/passports/`;
- `docs/content/stage-16-selling-page-block-library-v1.md`.

## Global Rules

- One URL = one primary intent.
- Hubs own route selection and mixed intent.
- Money pages own exact commercial/document intent.
- Diagnostics own applicability/checking/calculation intent without final conclusion.
- `/kontakty/` owns NAP, phone, route and office-first contact.
- `/policy` owns privacy/legal transparency.
- Blog/news routes remain noindex foundation.
- No keyword stuffing.
- No metadata or schema claims wider than visible confirmed content.
- No price, guarantee, deadline, review, rating, offer or case schema.

## 1. Главная / Local Brand Entry

User situation:

- user searches for a local document preparation center or arrives without knowing the exact route.

Primary route:

- `/`

Supporting routes:

- `/razbor-situacii/`
- `/kontakty/`
- priority hubs from the route registry.

Search intent:

- brand/local entry;
- document center in Simferopol;
- route selection.

Commercial intent:

- medium; user may be ready to contact but may not know exact service.

Informational intent:

- what the project does, where it is, what first step is safe.

Client hooks:

- "нужно понять, с чего начать";
- "нужно не ошибиться с маршрутом";
- "нужно собрать документы перед подачей".

Required page blocks:

- hero;
- route selector;
- situation recognition;
- local trust block;
- contact block;
- FAQ;
- final CTA.

Internal links:

- `/razbor-situacii/`;
- `/kontakty/`;
- selected hubs, not a full service dump.

FAQ topics:

- how to choose the route;
- what to bring or describe first;
- whether consultation replaces service.

Metadata direction:

- brand/local router and category;
- no service catalogue title.

Schema boundary:

- WebSite/WebPage and cautious LocalBusiness only with confirmed NAP if visible.

Lead CTA:

- `Разобрать ситуацию`; secondary `Позвонить`, `Построить маршрут`.

HOLD risks:

- working hours, ratings, reviews, official status implication, unconfirmed local profiles.

## 2. Разбор Ситуации

User situation:

- user has a business document/question but does not know which route applies.

Primary route:

- `/razbor-situacii/`

Supporting routes:

- `/srochnye-voprosy/`;
- `/kontakty/`;
- all hubs as next route options.

Search intent:

- first-step triage;
- document situation review.

Commercial intent:

- consideration; user may later move to a money page.

Informational intent:

- what is checked first and what happens after triage.

Client hooks:

- "непонятно, как ответить";
- "нужно понять, что подготовить";
- "нужно понять, с чего начать".

Required page blocks:

- hero;
- situation recognition;
- what we check;
- what documents/data may be needed;
- how work starts;
- what is not promised;
- related route links;
- contact block;
- FAQ.

Internal links:

- `/kontakty/`;
- urgent hub;
- relevant hubs after context.

FAQ topics:

- whether this is consultation or first step;
- what to bring;
- when exact page is better.

Metadata direction:

- first-step document situation review, not free service replacement.

Schema boundary:

- WebPage/BreadcrumbList/visible FAQ only.

Lead CTA:

- `Разобрать ситуацию`; secondary `Позвонить`, `Показать документы`.

HOLD risks:

- free substitute promise, final result promise, legal/tax conclusion.

## 3. Срочные Вопросы / ИФНС

User situation:

- user received a requirement, letter, notification or unclear urgent document.

Primary route:

- `/srochnye-voprosy/`

Supporting routes:

- `/otvet-na-trebovanie-ifns/`;
- `/razbor-situacii/`;
- `/kontakty/`.

Search intent:

- urgent document routing;
- IFNS response when source is known.

Commercial intent:

- high for exact IFNS requirement page; medium for urgent hub.

Informational intent:

- identify source, deadline sensitivity, what to prepare.

Client hooks:

- "пришло требование";
- "непонятно, как ответить";
- "ситуация срочная, но нужен разбор документов".

Required page blocks:

- hero;
- situation recognition;
- problem/risk explanation;
- what we check;
- documents/data;
- what affects result;
- safety note;
- parent/related routes;
- contact block.

Internal links:

- hub to IFNS money page;
- exact IFNS page back to urgent hub and `/razbor-situacii/`;
- contact path for showing documents.

FAQ topics:

- what to check in a requirement;
- whether page replaces a response;
- what to bring for review.

Metadata direction:

- hub: urgent route choice;
- money page: response to IFNS requirement.

Schema boundary:

- no deadline schema unless source-confirmed and reviewed;
- no legal/tax conclusion.

Lead CTA:

- `Показать документы` or `Разобрать ситуацию` depending on route.

HOLD risks:

- exact deadlines, guaranteed avoidance of penalties, final tax advice.

## 4. Отчётность / УСН / Нулевая Отчётность

User situation:

- user needs reporting route, USN declaration, zero reporting or electronic reporting/recovery.

Primary route:

- `/otchetnost/`

Supporting routes:

- `/deklaraciya-usn/`;
- `/nulevaya-otchetnost-ooo/`;
- `/nulevaya-otchetnost-ip/`;
- `/otchetnost-elektronno/`;
- `/vosstanovlenie-buhucheta/`;
- `/buhgalterskoe-soprovozhdenie-ooo/`;
- `/buhgalterskoe-soprovozhdenie-ip/`.

Search intent:

- reporting route selection;
- exact USN/zero/e-reporting/recovery needs.

Commercial intent:

- high for exact money pages; route-selection for hub.

Informational intent:

- what inputs are needed; whether zero reporting applies; when recovery/support is the next route.

Client hooks:

- "нужно понять, что подготовить";
- "нужно не ошибиться с маршрутом";
- "нужно собрать документы перед подачей".

Required page blocks:

- route selector;
- what we check;
- documents/data;
- how work starts;
- what affects the result;
- what is not promised;
- related routes;
- FAQ.

Internal links:

- hub to reporting children;
- declaration to zero pages where relevant;
- zero pages to declaration/support if not zero;
- recovery to support routes.

FAQ topics:

- when declaration vs zero reporting;
- ООО vs ИП split;
- what data is needed;
- why upload is not public.

Metadata direction:

- exact route terms but no final calculation or universal advice.

Schema boundary:

- WebPage/BreadcrumbList/visible FAQ only; no offer/price/deadline.

Lead CTA:

- `Показать документы` for document-heavy routes;
- `Разобрать ситуацию` for support/recovery or unclear cases.

HOLD risks:

- tax conclusion, exact deadlines, prices, guarantee of accepted reporting.

## 5. Банк / 115-ФЗ

User situation:

- bank requested documents, explanations or 115-ФЗ package.

Primary route:

- `/bank-i-115-fz/`

Supporting routes:

- `/otvet-na-zapros-banka/`;
- `/dokumenty-dlya-banka-115-fz/`;
- `/razbor-situacii/`;
- `/kontakty/`.

Search intent:

- bank request and 115-ФЗ document preparation.

Commercial intent:

- high for exact bank pages.

Informational intent:

- what the request asks for, which documents may be needed, how to avoid sending sensitive data publicly.

Client hooks:

- "банк запросил документы";
- "нужно понять, что подготовить";
- "есть риск отказа, приостановки или недостоверности".

Required page blocks:

- hero;
- situation recognition;
- problem/risk explanation;
- what we check;
- document/material preview;
- what is not promised;
- related routes;
- safety note;
- contact block.

Internal links:

- hub to exact bank request and 115-ФЗ package pages;
- exact pages back to bank hub and contact.

FAQ topics:

- what to show first;
- whether response can be prepared without seeing request;
- what not to send via open channels.

Metadata direction:

- bank request or 115-ФЗ package exact intent; no bank outcome promise.

Schema boundary:

- no guarantee, no bank decision claim, no sensitive data exposure.

Lead CTA:

- `Показать документы` or `Разобрать ситуацию`.

HOLD risks:

- promise to unblock account, bank result, exact timing, client document upload.

## 6. Адрес / ЕГРЮЛ / Директор

User situation:

- user needs legal address, address problem, address change or director change.

Primary route:

- `/adres-egryul-direktor/`

Supporting routes:

- `/yuridicheskiy-adres-simferopol/`;
- `/nedostovernost-yuridicheskogo-adresa/`;
- `/smena-yuridicheskogo-adresa-ooo/`;
- `/smena-direktora-ooo/`;
- `/kontakty/`.

Search intent:

- legal address and registry change routes.

Commercial intent:

- high for exact money pages.

Informational intent:

- what to check before action and which route matches.

Client hooks:

- "есть риск отказа, приостановки или недостоверности";
- "нужно собрать документы перед подачей";
- "нужно понять, что подготовить".

Required page blocks:

- route selector;
- situation recognition;
- what we check;
- documents/data;
- what affects result;
- what is not promised;
- parent/related routes;
- local trust/contact block.

Internal links:

- hub to address/director pages;
- exact pages to parent hub and contact;
- address problem to change/legal address sibling only if useful.

FAQ topics:

- how to distinguish address route vs address problem;
- what to prepare before registry action;
- why result cannot be promised publicly.

Metadata direction:

- exact route role; no state affiliation.

Schema boundary:

- no legal guarantee; no registry outcome promise; no unconfirmed legal entity details.

Lead CTA:

- `Разобрать ситуацию` or `Показать документы`.

HOLD risks:

- state affiliation, legal conclusion, guaranteed registry result, office details.

## 7. Регистрация / Ликвидация

User situation:

- user plans ООО/ИП registration or ООО liquidation and needs document route.

Primary route:

- `/registraciya-i-likvidaciya/`

Supporting routes:

- `/registraciya-ooo/`;
- `/registraciya-ip/`;
- `/likvidaciya-ooo/`;
- `/nalogi-i-rezhimy/`;
- `/kontakty/`.

Search intent:

- lifecycle route selection and exact registration/liquidation pages.

Commercial intent:

- high for exact money pages.

Informational intent:

- what inputs are needed; where tax regime diagnosis may be needed.

Client hooks:

- "нужно собрать документы перед подачей";
- "нужно понять, подходит ли режим";
- "нужно не ошибиться с маршрутом".

Required page blocks:

- route selector;
- what documents/data may be needed;
- how work starts;
- what affects result;
- what is not promised;
- related routes;
- FAQ.

Internal links:

- hub to ООО/ИП/liquidation pages;
- registration pages to tax diagnostics where appropriate;
- exact pages to contact.

FAQ topics:

- ООО vs ИП route;
- when tax regime review is needed;
- what cannot be promised before review.

Metadata direction:

- exact entity/action route; no guarantee of registration/liquidation result.

Schema boundary:

- no legal result promise; no public legal entity details.

Lead CTA:

- `Разобрать ситуацию`.

HOLD risks:

- legal conclusion, guarantee, exact timing, tax advice without review.

## 8. Налоги И Режимы / Diagnostics

User situation:

- user needs to understand tax regime, AУСН applicability, tax load or VAT/USN issue.

Primary route:

- `/nalogi-i-rezhimy/`

Supporting routes:

- `/ausn-krym/`;
- `/perehod-na-ausn/`;
- `/raschet-nalogovoy-nagruzki/`;
- `/nds-pri-usn-2026/`;
- `/deklaraciya-usn/`.

Search intent:

- tax route selection and diagnostics.

Commercial intent:

- consideration; may lead to reporting, support or tax review route.

Informational intent:

- what data is needed before a conclusion.

Client hooks:

- "нужно понять, подходит ли режим";
- "нужно не ошибиться с маршрутом";
- "нужно понять, с чего начать".

Required page blocks:

- diagnostic hero;
- what we check;
- data needed;
- what affects result;
- what is not promised;
- next safe route;
- FAQ.

Internal links:

- diagnostics to parent hub and `/razbor-situacii/`;
- AУСН diagnostic to transition route;
- VAT/USN diagnostic to declaration or tax load where safe.

FAQ topics:

- whether page gives a final answer;
- what data is required;
- when to move to exact service page.

Metadata direction:

- diagnostic/evaluation, not final public tax advice.

Schema boundary:

- no calculator output unless verified; no final tax conclusion; no guarantee of savings.

Lead CTA:

- `Разобрать ситуацию`.

HOLD risks:

- tax conclusion, public formulas, exact calculation, savings promise.

## 9. Кадры

User situation:

- user needs HR documents, urgent employee onboarding or HR support.

Primary route:

- `/kadry/`

Supporting routes:

- `/srochnoe-oformlenie-sotrudnikov/`;
- `/kadrovoe-soprovozhdenie/`;
- `/razbor-situacii/`;
- `/kontakty/`.

Search intent:

- HR route selection and exact urgent/support pages.

Commercial intent:

- high for urgent onboarding, medium for support.

Informational intent:

- which HR route applies and what documents may be needed.

Client hooks:

- "нужно собрать документы перед подачей";
- "ситуация срочная, но нужен разбор документов";
- "нужно понять, что подготовить".

Required page blocks:

- route selector;
- situation recognition;
- documents/data;
- how work starts;
- safety note;
- related routes;
- contact block.

Internal links:

- hub to urgent HR and HR support;
- exact pages to hub and contact.

FAQ topics:

- urgent onboarding boundary;
- what documents may be checked;
- why exact timing/result is not promised.

Metadata direction:

- HR documents route without legal overclaim.

Schema boundary:

- no employment-law conclusion; no deadline guarantee.

Lead CTA:

- `Показать документы` for urgent route;
- `Разобрать ситуацию` for support.

HOLD risks:

- exact deadlines, legal conclusion, guaranteed compliant result.

## 10. Сопровождение

User situation:

- user needs ongoing business/accounting support or follow-up after one-off issue.

Primary route:

- `/soprovozhdenie/`

Supporting routes:

- `/buhgalterskoe-soprovozhdenie-ooo/`;
- `/buhgalterskoe-soprovozhdenie-ip/`;
- `/kadrovoe-soprovozhdenie/`;
- `/vosstanovlenie-buhucheta/`;
- `/otchetnost/`;
- `/kontakty/`.

Search intent:

- support route selection and recurring support.

Commercial intent:

- medium/high for support routes.

Informational intent:

- when one-off issue becomes support; what boundaries exist.

Client hooks:

- "нужно понять, что подготовить";
- "нужно не ошибиться с маршрутом";
- "нужно понять, с чего начать".

Required page blocks:

- hub selector;
- what we check;
- support boundary;
- what is not promised;
- related routes;
- local contact;
- FAQ.

Internal links:

- hub to ООО/ИП/accounting/HR support pages;
- support pages to recovery/reporting if historical gaps exist.

FAQ topics:

- support vs one-off work;
- what data is reviewed first;
- why scope cannot be universal publicly.

Metadata direction:

- support route without package/pricing promise.

Schema boundary:

- no offer/price/package schema.

Lead CTA:

- `Разобрать ситуацию`.

HOLD risks:

- package prices, unlimited scope, guarantee, recurring service promises beyond source.

## 11. Контакты

User situation:

- user wants phone, address, route or office-first document discussion.

Primary route:

- `/kontakty/`

Supporting routes:

- `/razbor-situacii/`;
- `/policy`;
- homepage.

Search intent:

- NAP/contact/route.

Commercial intent:

- conversion.

Informational intent:

- how to reach the office and what action is safe.

Client hooks:

- "нужно показать документы";
- "нужно построить маршрут";
- "нужно позвонить".

Required page blocks:

- contact hero;
- NAP block;
- phone/action block;
- route/map safe block;
- show-documents safe flow;
- policy link.

Internal links:

- `/razbor-situacii/`;
- `/policy`;
- root.

FAQ topics:

- what to prepare before visit/call;
- whether upload is available;
- how email is handled if still TARGET.

Metadata direction:

- canonical NAP/contact page.

Schema boundary:

- confirmed NAP only; no hours, ratings, reviews, legal IDs.

Lead CTA:

- `Позвонить`; secondary `Построить маршрут`, `Показать документы`.

HOLD risks:

- hours, office/floor, legal entity, local profile claims, map provider dependency.

## 12. Policy

User situation:

- user needs privacy, consent and data processing information.

Primary route:

- `/policy`

Supporting routes:

- `/kontakty/`;
- root.

Search intent:

- legal/privacy transparency, not commercial SEO.

Commercial intent:

- none.

Informational intent:

- what data policy applies and how to contact.

Client hooks:

- "нужно понять обработку данных";
- "нужно найти контакт по privacy".

Required page blocks:

- policy H1;
- visible policy text;
- contact link;
- no commercial route selector.

Internal links:

- `/kontakty/`;
- root/footer.

FAQ topics:

- only if source-approved and visible; otherwise no FAQ.

Metadata direction:

- privacy/legal page; no commercial keywords.

Schema boundary:

- WebPage only; no LocalBusiness unless visible and appropriate.

Lead CTA:

- `Позвонить` only if contextually needed.

HOLD risks:

- legal entity details, unconfirmed data processors, analytics IDs, cookie claims before implementation.

## 13. Blog / News Noindex Foundation

User situation:

- future users may read updates or explanations, but foundation is not approved for live publication/indexing.

Primary routes:

- `/blog/`
- `/blog/obnovleniya-fns/`
- `/blog/razbory/`

Supporting routes:

- `/razbor-situacii/`;
- `/kontakty/`.

Search intent:

- future content hub, currently noindex.

Commercial intent:

- none until approved.

Informational intent:

- future explanations with source attribution after gates.

Client hooks:

- "нужно понять обновление";
- "нужно разобрать ситуацию".

Required page blocks:

- noindex notice internally if needed;
- safe route back to situation review/contact;
- no live feed.

Internal links:

- no public navigation emphasis unless approved;
- excluded from sitemap.

FAQ topics:

- none required at foundation stage.

Metadata direction:

- `noindex`; not a public SEO landing.

Schema boundary:

- no Article/news schema until publication model and source attribution are approved.

Lead CTA:

- `Разобрать ситуацию`, `Контакты`.

HOLD risks:

- live fetch, scheduler, rewrite provider, autopublish, indexing, stale news, unsupported legal/tax claims.

## Acceptance Criteria

This semantic coverage is accepted when:

- all approved route groups are represented;
- no new routes are created;
- every group has primary route, supporting routes, intent, blocks, links, FAQ direction, metadata direction, schema boundary, CTA and HOLD risks;
- blog/news remain noindex foundation;
- public live remains blocked.

## Release Verdict

`GO WITH CONDITIONS`

Semantic coverage is ready for future site assembly after `dokumenty82-site` access is granted.

Public launch remains:

`PUBLIC_LIVE_ALLOWED = false`
