# Stage 18A Internal Linking And Anti-Cannibalization Map V1

Status: `READY_WITH_CONDITIONS`

Release verdict: `GO WITH CONDITIONS`

Public launch: `NOT_PUBLIC_LIVE_READY`

`PUBLIC_LIVE_ALLOWED = false`

## Purpose

This document defines Stage 18A internal linking and anti-cannibalization rules for source-led SEO hardening.

It keeps one URL = one primary intent, prevents hubs from competing with child money pages, prevents diagnostics from becoming service pages, keeps noindex foundation routes out of sitemap and preserves owner/legal/public-live blockers.

## Route Hierarchy

```text
/ -> /razbor-situacii/ -> hubs -> money pages -> diagnostics -> /kontakty/
```

Operational meaning:

- `/` is the brand/local router, not a complete services catalogue.
- `/razbor-situacii/` owns unclear or mixed demand.
- Hubs own route selection for a route family.
- Money pages own exact commercial/document intents.
- Diagnostics own applicability/checking/input intents.
- `/kontakty/` owns NAP, phone, route and office-first document showing.
- `/policy` owns privacy/legal transparency.
- `/blog/`, `/blog/obnovleniya-fns/` and `/blog/razbory/` remain noindex foundation only.

## Link Principles

| Principle | Status | Rule |
| --- | --- | --- |
| Parent/child links clarify hierarchy | `PASS` | Hubs link to children; money pages link back to parent hub. |
| Related links are selective | `READY_WITH_CONDITIONS` | Use route-neighbor links, not all-route blocks. |
| Ambiguous demand goes to triage | `PASS` | Link to `/razbor-situacii/` when route fit is unclear. |
| Contact path stays available | `PASS` | Use `/kontakty/` or phone where a safe office/contact step is needed. |
| No keyword-stuffed anchors | `PASS` | Anchors must be human-readable route labels. |
| No hidden SEO links/text | `PASS` | All links and explanatory text must be visible and useful. |
| Noindex foundation stays contained | `PASS` | No sitemap inclusion or public navigation emphasis until future gates pass. |

## Hub-To-Money Rules

Hubs must:

- link to child money pages and diagnostics that belong to the hub;
- describe how to choose a route;
- avoid copying child money-page H1/title language as the hub's own promise;
- use route-selection anchors, not repeated exact-match spam;
- include `/razbor-situacii/` and `/kontakty/` as safe fallback routes where relevant.

Hubs must not:

- become all-service catalogues;
- promise external results;
- publish prices, guarantees, exact deadlines, ratings, reviews or cases;
- capture exact child route demand in metadata/H1/FAQ.

## Money-To-Parent Rules

Every money page must link to:

- its parent hub;
- `/razbor-situacii/` or `/kontakty/` as a safe next step;
- 2-4 selected sibling or support routes only when the relationship is source-backed.

Money pages must not:

- link randomly to unrelated services;
- link to all money pages in the project;
- make sibling pages look interchangeable;
- use parent hub language as a substitute for exact route content.

## Diagnostic-To-Hub Rules

Diagnostics must link to:

- `/nalogi-i-rezhimy/`;
- `/razbor-situacii/`;
- exact money page only when source-safe and contextually useful.

Diagnostics must not:

- publish final tax/legal/accounting conclusions;
- act as fake calculators;
- claim savings or exact results;
- compete with `/perehod-na-ausn/`, `/deklaraciya-usn/` or support pages.

## Homepage Router Rules

Homepage links should prioritize:

- `/razbor-situacii/`;
- `/kontakty/`;
- selected hubs for route families;
- a few high-signal exact routes only if they support route choice without catalogue drift.

Homepage must not:

- list every service as a first-screen catalogue;
- use all money-page keywords as visible SEO blocks;
- make the homepage compete with exact money pages.

## Situation-Review Lead Path Rules

`/razbor-situacii/` should link to:

- `/kontakty/`;
- hubs for route-family selection;
- exact money pages only as examples or next options when the source context is clear.

It must preserve the first-step boundary and avoid sounding like a free substitute for service.

## Contacts/NAP Rules

`/kontakty/` should link to:

- `/razbor-situacii/`;
- `/policy`;
- selected route contexts only where the contact/show-documents path needs support.

It must not expose working hours, office/floor, legal identifiers, ratings, reviews, public profile claims or map/provider claims without approval.

## Noindex Foundation Rules

`/blog/`, `/blog/obnovleniya-fns/` and `/blog/razbory/`:

- remain `noindex`;
- remain excluded from sitemap;
- do not run live fetch, scheduler, rewrite provider or autopublish;
- do not use Article/news schema;
- link back to `/razbor-situacii/` and `/kontakty/` as safe exits.

## Prohibited Linking Patterns

- `/otchetnost/` as the owner of exact `Декларация УСН`, `Нулевая отчётность ООО`, `Нулевая отчётность ИП`, `Электронная отчётность` or `Восстановление бухучёта` demand.
- `/bank-i-115-fz/` as the owner of exact `Ответ на запрос банка` or `Документы для банка по 115-ФЗ` demand.
- `/adres-egryul-direktor/` as the owner of exact address/director money-page demand.
- `/nalogi-i-rezhimy/` as the owner of diagnostic or transition exact demand.
- Homepage as a full service catalogue.
- Blog/noindex foundation routes in sitemap or public SEO navigation.
- Hidden SEO-only link blocks.
- Repeated exact-match anchor lists.
- Links that imply state affiliation, outcome guarantees, exact deadlines, prices, reviews, ratings or legal identifiers.

## Route-By-Route Internal Linking Matrix

| URL | Required parent/primary links | Required related links | Safe fallback | Notes |
| --- | --- | --- | --- | --- |
| `/` | `/razbor-situacii/`, `/kontakty/` | selected hubs | phone/contact | Router, not catalogue. |
| `/razbor-situacii/` | `/` | hubs, selected exact routes | `/kontakty/` | Owns ambiguity. |
| `/kontakty/` | `/` | `/razbor-situacii/`, `/policy` | phone | Confirmed NAP only. |
| `/o-proekte/` | `/` | `/razbor-situacii/`, `/kontakty/` | contact | Project context only. |
| `/policy` | `/` | `/kontakty/` | phone if appropriate | Legal/privacy only. |
| `/blog/` | `/razbor-situacii/` | `/kontakty/` | contact | Noindex, no sitemap. |
| `/blog/obnovleniya-fns/` | `/blog/` | `/razbor-situacii/` | contact | No live FNS fetch. |
| `/blog/razbory/` | `/blog/` | `/razbor-situacii/` | contact | No autopublish/indexing. |
| `/srochnye-voprosy/` | `/razbor-situacii/` | `/otvet-na-trebovanie-ifns/`, `/otchetnost/`, `/bank-i-115-fz/` | `/kontakty/` | Urgent/unclear hub. |
| `/otchetnost/` | `/razbor-situacii/` | `/deklaraciya-usn/`, `/nulevaya-otchetnost-ooo/`, `/nulevaya-otchetnost-ip/`, `/otchetnost-elektronno/`, `/vosstanovlenie-buhucheta/`, `/otvet-na-trebovanie-ifns/` | `/kontakty/` | Do not own child exact demand. |
| `/nalogi-i-rezhimy/` | `/razbor-situacii/` | `/perehod-na-ausn/`, `/ausn-krym/`, `/raschet-nalogovoy-nagruzki/`, `/nds-pri-usn-2026/` | `/kontakty/` | No final tax advice. |
| `/bank-i-115-fz/` | `/razbor-situacii/` | `/otvet-na-zapros-banka/`, `/dokumenty-dlya-banka-115-fz/`, `/srochnye-voprosy/` | `/kontakty/` | Split response vs package. |
| `/adres-egryul-direktor/` | `/razbor-situacii/` | `/yuridicheskiy-adres-simferopol/`, `/nedostovernost-yuridicheskogo-adresa/`, `/smena-yuridicheskogo-adresa-ooo/`, `/smena-direktora-ooo/` | `/kontakty/` | No registry result promise. |
| `/kadry/` | `/razbor-situacii/` | `/srochnoe-oformlenie-sotrudnikov/`, `/kadrovoe-soprovozhdenie/`, `/soprovozhdenie/` | `/kontakty/` | Personal-data boundary. |
| `/soprovozhdenie/` | `/razbor-situacii/` | `/buhgalterskoe-soprovozhdenie-ooo/`, `/buhgalterskoe-soprovozhdenie-ip/`, `/kadrovoe-soprovozhdenie/`, `/vosstanovlenie-buhucheta/` | `/kontakty/` | No packages/prices. |
| `/registraciya-i-likvidaciya/` | `/razbor-situacii/` | `/registraciya-ooo/`, `/registraciya-ip/`, `/likvidaciya-ooo/`, `/nalogi-i-rezhimy/` | `/kontakty/` | Lifecycle router. |
| `/otvet-na-trebovanie-ifns/` | `/srochnye-voprosy/` | `/otchetnost/`, `/deklaraciya-usn/` | `/kontakty/`, `/razbor-situacii/` | Exact IFNS response. |
| `/deklaraciya-usn/` | `/otchetnost/` | `/nulevaya-otchetnost-ooo/`, `/nulevaya-otchetnost-ip/`, `/vosstanovlenie-buhucheta/` | `/kontakty/` | Exact USN declaration. |
| `/otvet-na-zapros-banka/` | `/bank-i-115-fz/` | `/dokumenty-dlya-banka-115-fz/`, `/srochnye-voprosy/` | `/kontakty/` | Exact bank request. |
| `/dokumenty-dlya-banka-115-fz/` | `/bank-i-115-fz/` | `/otvet-na-zapros-banka/`, `/srochnye-voprosy/` | `/kontakty/` | Package route, no acceptance promise. |
| `/yuridicheskiy-adres-simferopol/` | `/adres-egryul-direktor/` | `/nedostovernost-yuridicheskogo-adresa/`, `/smena-yuridicheskogo-adresa-ooo/` | `/kontakty/` | Address route only. |
| `/nedostovernost-yuridicheskogo-adresa/` | `/adres-egryul-direktor/` | `/yuridicheskiy-adres-simferopol/`, `/smena-yuridicheskogo-adresa-ooo/` | `/kontakty/` | No removal guarantee. |
| `/smena-yuridicheskogo-adresa-ooo/` | `/adres-egryul-direktor/` | `/yuridicheskiy-adres-simferopol/`, `/nedostovernost-yuridicheskogo-adresa/` | `/kontakty/` | Address-change exact route. |
| `/smena-direktora-ooo/` | `/adres-egryul-direktor/` | `/smena-yuridicheskogo-adresa-ooo/`, `/registraciya-i-likvidaciya/` | `/kontakty/` | Director-change exact route. |
| `/srochnoe-oformlenie-sotrudnikov/` | `/kadry/` | `/kadrovoe-soprovozhdenie/`, `/kontakty/` | `/razbor-situacii/` | No exact timing promise. |
| `/perehod-na-ausn/` | `/nalogi-i-rezhimy/` | `/ausn-krym/`, `/raschet-nalogovoy-nagruzki/`, `/nds-pri-usn-2026/` | `/razbor-situacii/` | Transition, not diagnostic. |
| `/nulevaya-otchetnost-ooo/` | `/otchetnost/` | `/nulevaya-otchetnost-ip/`, `/deklaraciya-usn/`, `/buhgalterskoe-soprovozhdenie-ooo/` | `/kontakty/` | ООО split. |
| `/nulevaya-otchetnost-ip/` | `/otchetnost/` | `/nulevaya-otchetnost-ooo/`, `/deklaraciya-usn/`, `/buhgalterskoe-soprovozhdenie-ip/` | `/kontakty/` | ИП split. |
| `/otchetnost-elektronno/` | `/otchetnost/` | `/deklaraciya-usn/`, zero pages | `/kontakty/` | No credential collection. |
| `/vosstanovlenie-buhucheta/` | `/otchetnost/` | `/deklaraciya-usn/`, `/soprovozhdenie/`, support pages | `/kontakty/` | Recovery vs support. |
| `/buhgalterskoe-soprovozhdenie-ooo/` | `/soprovozhdenie/` | `/buhgalterskoe-soprovozhdenie-ip/`, `/deklaraciya-usn/`, `/vosstanovlenie-buhucheta/` | `/razbor-situacii/` | No package/pricing. |
| `/buhgalterskoe-soprovozhdenie-ip/` | `/soprovozhdenie/` | `/buhgalterskoe-soprovozhdenie-ooo/`, `/deklaraciya-usn/`, `/nulevaya-otchetnost-ip/` | `/razbor-situacii/` | No package/pricing. |
| `/kadrovoe-soprovozhdenie/` | `/kadry/` | `/srochnoe-oformlenie-sotrudnikov/`, `/soprovozhdenie/` | `/razbor-situacii/` | No public personal-data collection. |
| `/registraciya-ooo/` | `/registraciya-i-likvidaciya/` | `/registraciya-ip/`, `/yuridicheskiy-adres-simferopol/` | `/kontakty/` | No registration outcome promise. |
| `/registraciya-ip/` | `/registraciya-i-likvidaciya/` | `/registraciya-ooo/`, `/nalogi-i-rezhimy/` | `/kontakty/` | No tax-regime conclusion. |
| `/likvidaciya-ooo/` | `/registraciya-i-likvidaciya/` | `/registraciya-ooo/`, `/soprovozhdenie/` | `/kontakty/` | No liquidation result/timing. |
| `/ausn-krym/` | `/nalogi-i-rezhimy/` | `/perehod-na-ausn/`, `/raschet-nalogovoy-nagruzki/` | `/razbor-situacii/` | Diagnostic only. |
| `/raschet-nalogovoy-nagruzki/` | `/nalogi-i-rezhimy/` | `/perehod-na-ausn/`, `/nds-pri-usn-2026/` | `/razbor-situacii/` | No fake calculator. |
| `/nds-pri-usn-2026/` | `/nalogi-i-rezhimy/` | `/deklaraciya-usn/`, `/raschet-nalogovoy-nagruzki/` | `/razbor-situacii/` | No final tax advice. |

## Cannibalization Risk Matrix

| Risk pair | Status | Guardrail |
| --- | --- | --- |
| `/otchetnost/` vs `/deklaraciya-usn/` | `NEEDS_SEMANTIC_HARDENING` | Hub says "choose reporting route"; money page owns USN declaration. |
| `/otchetnost/` vs `/nulevaya-otchetnost-ooo/` | `NEEDS_SEMANTIC_HARDENING` | Hub routes; money page owns ООО zero reporting. |
| `/otchetnost/` vs `/nulevaya-otchetnost-ip/` | `NEEDS_SEMANTIC_HARDENING` | Hub routes; money page owns ИП zero reporting. |
| `/otchetnost/` vs `/otchetnost-elektronno/` | `READY_WITH_CONDITIONS` | Hub routes; money page owns electronic reporting flow. |
| `/bank-i-115-fz/` vs `/otvet-na-zapros-banka/` | `READY_WITH_CONDITIONS` | Hub explains split; money page owns specific request response. |
| `/bank-i-115-fz/` vs `/dokumenty-dlya-banka-115-fz/` | `READY_WITH_CONDITIONS` | Hub explains split; money page owns package by situation. |
| `/adres-egryul-direktor/` vs address/director money pages | `READY_WITH_CONDITIONS` | Hub routes family; money pages own exact address/director tasks. |
| `/nalogi-i-rezhimy/` vs diagnostics | `READY_WITH_CONDITIONS` | Hub routes; diagnostics own input/checking demand. |
| `/perehod-na-ausn/` vs `/ausn-krym/` | `READY_WITH_CONDITIONS` | Transition route vs applicability diagnostic. |
| Homepage vs all money pages | `READY_WITH_CONDITIONS` | Homepage remains brand/local router and selected route entry. |
| Blog/noindex foundation vs indexed routes | `PASS` | Noindex and sitemap exclusion. |

## Site Implementation Requirements

The site repository should prove:

- 36 indexed source-approved routes have semantic data;
- 3 noindex foundation routes have semantic data and are excluded from sitemap;
- hubs expose child links;
- money pages expose parent hub links;
- diagnostics expose parent hub and `/razbor-situacii/`;
- indexed routes have title, H1 direction and description;
- related routes are present or the exception is documented;
- route data includes HOLD risks and schema boundaries;
- no hidden SEO-only blocks exist;
- no public-live true marker exists;
- HTTP/3/QUIC over UDP/443 remains blocked by default.

## QA Checks

Required site-side checks:

- `npm run check:semantic-seo`;
- `npm run check:p0-semantic`;
- `npm run build`;
- `npm run check:static-links`;
- `npm run check:launch-readiness`;
- `npm run check:finalization`;
- source-to-site `cmp` checks for Stage 18A docs;
- forbidden runtime/source scans excluding docs/scripts/pricing internals that only mention prohibitions.

## Release Verdict

`GO WITH CONDITIONS`

Internal linking: `READY_WITH_CONDITIONS`.

Anti-cannibalization: `READY_WITH_CONDITIONS`.

Public live: `NOT_PUBLIC_LIVE_READY`.

`PUBLIC_LIVE_ALLOWED = false`
