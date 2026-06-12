# Stage 18H Route Copy Block Quality Plan V1

Status: `READY_WITH_CONDITIONS`

Release verdict: `GO WITH CONDITIONS`

Public launch: `NOT_PUBLIC_LIVE_READY`

`PUBLIC_LIVE_ALLOWED = false`

## Purpose

This plan defines the Stage 18H route-by-route copy and content-block quality gate for `dokumenty82.ru`.

It strengthens public page structure for owner/legal review preparation. It does not approve final public copy, public launch, CRM/forms, analytics, uploads, messaging, FNS/blog/news automation, staging, rollback or transport changes.

## Scope

Stage 18H applies to the 36 indexed public routes already approved in the route registry and represented in the site runtime.

The site must keep:

- one URL = one primary intent;
- homepage as a router, not a services catalogue;
- consultation/разбор as safe first-step triage, not a free substitute for service;
- office-first logic;
- CTA hierarchy: `Разобрать ситуацию`, then `Позвонить`, `Построить маршрут`, `Показать документы`;
- no final owner/legal approval markers until explicit human decisions exist.

## Required Route Block Contract

Every indexed public route must have a visible or runtime-backed structure that supports:

| Block | Requirement | Safety boundary |
| --- | --- | --- |
| Route intent | Clarify the single primary user task for the URL. | Do not broaden into a neighbouring route. |
| Situation / when it fits | Explain when the route is relevant. | Do not promise that the route always solves the issue. |
| Included scope | Name what can be checked or prepared from confirmed inputs. | Do not add unconfirmed service scope. |
| Excluded / boundary scope | State what is not promised or remains dependent on inputs. | No guarantees, exact deadlines, ratings or result claims. |
| Process | Show a calm first-step sequence. | No false success, no automatic CRM/submission implication. |
| Documents / data | Ask for a safe description or list of existing documents. | No public upload, no sensitive document collection through the page. |
| Safety note | Preserve HOLD boundaries for legal, tax, bank and authority decisions. | No final legal/tax conclusion in public copy. |
| Safe CTA | Use approved CTA hierarchy only. | No pressure, urgency or hidden conversion copy. |
| Related routes | Link only to approved routes and clarify the difference. | No cannibalization, no noindex routes in public navigation. |
| Local contact | Use confirmed NAP and neutral local marker only. | No working hours, office/floor, legal IDs or state affiliation. |

## Route Families

| Family | Routes | Stage 18H direction |
| --- | --- | --- |
| Core/local | `/`, `/razbor-situacii/`, `/kontakty/`, `/o-proekte/`, `/policy` | Keep brand/local entry, safe triage, confirmed NAP and privacy transparency separated. |
| Reporting | `/otchetnost/`, `/deklaraciya-usn/`, `/nulevaya-otchetnost-ooo/`, `/nulevaya-otchetnost-ip/`, `/otchetnost-elektronno/`, `/vosstanovlenie-buhucheta/` | Separate reporting type, input data and document preparation boundaries. |
| Bank and 115-FZ | `/bank-i-115-fz/`, `/otvet-na-zapros-banka/`, `/dokumenty-dlya-banka-115-fz/` | Keep bank decision outside the promise; focus on documents and explanations. |
| IFNS and urgent inputs | `/srochnye-voprosy/`, `/otvet-na-trebovanie-ifns/` | Keep response preparation separate from guaranteed authority outcome. |
| Address, EGRUL and director | `/adres-egryul-direktor/`, `/yuridicheskiy-adres-simferopol/`, `/smena-yuridicheskogo-adresa-ooo/`, `/nedostovernost-yuridicheskogo-adresa/`, `/smena-direktora-ooo/`, `/vnesenie-izmeneniy-v-egryul/` | Keep address, director and registry-change intents distinct. |
| Registration and liquidation | `/registraciya-i-likvidaciya/`, `/registraciya-ooo/`, `/registraciya-ip/`, `/likvidaciya-ooo/` | Separate company/IP creation and liquidation routes; no state-registration guarantee. |
| Taxes and regimes | `/nalogi-i-rezhimy/`, `/ausn-krym/`, `/perehod-na-ausn/`, `/nds-pri-usn-2026/`, `/raschet-nalogovoy-nagruzki/` | Diagnostics only; no final public tax advice or savings promise. |
| HR and support | `/kadry/`, `/kadrovye-dokumenty/`, `/soprovozhdenie/`, `/abonentskoe-soprovozhdenie/` | Keep HR documents and regular support separate from broad accounting/legal outsourcing claims. |

## Copy Quality Rules

- Use confirmed project language from the source canon.
- Use concrete route words only when the route owns that intent.
- Prefer "разберём", "проверим вводные", "подготовим документы" over outcome claims.
- Mention external decisions only as external decisions.
- Do not add prices, discounts, exact deadlines, ratings, reviews, cases, legal identifiers or working hours.
- Do not imply state affiliation through the local marker `офис рядом с налоговой`.
- Treat `info@dokumenty82.ru` as a target only unless domain mail is confirmed.
- Keep public copy in `PENDING_HUMAN_REVIEW` until explicit owner/legal decisions exist.

## Runtime Guardrail

The site repository should include a route-content/navigation guardrail that checks:

- 36 indexed routes and 3 noindex foundation routes remain aligned with semantic route data;
- required route block families are present in runtime components/data;
- top-level navigation includes approved route families;
- no noindex foundation route is exposed in public navigation or sitemap;
- live forms, CRM, analytics, messaging, uploads and public live remain disabled;
- owner/legal approval is not inferred from passing local checks.

Expected evidence:

```text
evidence/content/stage18-route-content-and-navigation.json
```

## Remaining HOLD

- owner/legal acceptance: `MISSING_EXPECTED`;
- final public copy approval: `MISSING_EXPECTED`;
- `/policy` final legal acceptance: `MISSING_EXPECTED`;
- CRM/forms/backend acceptance: `MISSING_EXPECTED`;
- analytics/Metrica/no-PII proof: `MISSING_EXPECTED`;
- staging and rollback proof: `MISSING_EXPECTED`;
- transport proof: `MISSING_EXPECTED`;
- Search Console/Yandex Webmaster setup: `MISSING_EXPECTED`;
- public-live go/no-go: `NOT_PUBLIC_LIVE_READY`.

## Release Verdict

`GO WITH CONDITIONS`

Stage 18H route copy block quality is ready as a source-to-site hardening plan. It does not approve final public copy or public live.

`PUBLIC_LIVE_ALLOWED = false`
