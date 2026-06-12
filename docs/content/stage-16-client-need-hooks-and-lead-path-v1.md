# Stage 16 Client Need Hooks And Lead Path V1

Status: `READY_WITH_CONDITIONS`

Release verdict: `GO WITH CONDITIONS`

Public launch: `NOT_PUBLIC_LAUNCH_READY`

`PUBLIC_LIVE_ALLOWED = false`

## Purpose

This document maps safe client-need hooks to route groups and lead paths for `dokumenty82-site`.

It helps pages start from the user's real task and move toward a safe office-first next step. It does not approve public live, live forms, CRM, analytics, upload, messaging, paid traffic, FNS automation, final public copy or owner/legal decisions.

## Source Basis

- `docs/00-start/active-canon-index.md`
- `docs/00-start/hold-register.md`
- `docs/seo/route-registry.md`
- `docs/seo/semantic-core-v1.md`
- `docs/seo/semantic-analysis-and-priority-plan-v1.md`
- `docs/seo/stage-16-route-group-semantic-coverage-v1.md`
- `docs/services/service-catalog-2026-v1.md`
- `docs/services/passports/`
- `docs/content/stage-15-text-quality-standards-v1.md`
- `docs/content/stage-16-selling-page-block-library-v1.md`
- `docs/ux/stage-16-lead-path-and-conversion-architecture-v1.md`
- `docs/frontend/stage-16-route-implementation-checklist-v1.md`

## Safe Hook Principles

- Start with the user's situation, not a generic service pitch.
- Use the hook only on routes that own the intent.
- Explain what will be checked before any outcome is discussed.
- Route unclear demand to `/razbor-situacii/`.
- Keep document-heavy demand office-first and safe.
- Use only allowed CTA labels: `Разобрать ситуацию`, `Позвонить`, `Построить маршрут`, `Показать документы`.
- Keep all unresolved facts as `HOLD`, `OWNER_LEGAL_REVIEW_REQUIRED` or `MISSING_EXPECTED`.

## Forbidden Exaggeration

Do not use hooks to imply:

- guaranteed result;
- exact timing;
- urgent-result promise;
- bank, IFNS, registry, legal, tax or HR outcome;
- free full-service replacement;
- public upload;
- real form submission or CRM success;
- price, discount, review, rating, case or public profile proof;
- official state affiliation.

## Client States

| Client state | Safe routing principle | Preferred route |
| --- | --- | --- |
| Exact source document exists | Ask what document/request exists and route to the exact money page if clear. | Exact money page or `/razbor-situacii/` |
| Situation is unclear | Do not force a money page; triage first. | `/razbor-situacii/` |
| Route family is known but exact route is not | Use hub route selector. | relevant hub |
| User wants phone/address/visit | Keep NAP and office-first path. | `/kontakty/` |
| User asks diagnostic/tax applicability question | Gather inputs and avoid final advice. | diagnostic or `/nalogi-i-rezhimy/` |
| User expects content/news | Keep foundation noindex and route to review/contact until content gates pass. | `/blog/` foundation or `/razbor-situacii/` |

## Route Groups

| Route group | Safe hook role | Routes |
| --- | --- | --- |
| Core/local | Start, brand and local trust without catalogue. | `/`, `/o-proekte/` |
| Situation review | Unclear demand and triage. | `/razbor-situacii/` |
| Urgent/tax questions | Requirement, letter or urgent document routing. | `/srochnye-voprosy/`, `/otvet-na-trebovanie-ifns/` |
| Reporting | Reporting, USN, zero reporting, e-reporting and recovery inputs. | `/otchetnost/`, `/deklaraciya-usn/`, `/nulevaya-otchetnost-ooo/`, `/nulevaya-otchetnost-ip/`, `/otchetnost-elektronno/`, `/vosstanovlenie-buhucheta/` |
| Bank/115-ФЗ | Bank request and 115-ФЗ package. | `/bank-i-115-fz/`, `/otvet-na-zapros-banka/`, `/dokumenty-dlya-banka-115-fz/` |
| Address/EGRUL/director | Address, registry and director changes. | `/adres-egryul-direktor/`, `/yuridicheskiy-adres-simferopol/`, `/nedostovernost-yuridicheskogo-adresa/`, `/smena-yuridicheskogo-adresa-ooo/`, `/smena-direktora-ooo/` |
| Registration/liquidation | ООО/ИП start and ООО liquidation. | `/registraciya-i-likvidaciya/`, `/registraciya-ooo/`, `/registraciya-ip/`, `/likvidaciya-ooo/` |
| Tax regimes/diagnostics | Applicability, tax load and future-rule review. | `/nalogi-i-rezhimy/`, `/ausn-krym/`, `/perehod-na-ausn/`, `/raschet-nalogovoy-nagruzki/`, `/nds-pri-usn-2026/` |
| HR | Employee document and HR support routes. | `/kadry/`, `/srochnoe-oformlenie-sotrudnikov/`, `/kadrovoe-soprovozhdenie/` |
| Support | Accounting/business support routes. | `/soprovozhdenie/`, `/buhgalterskoe-soprovozhdenie-ooo/`, `/buhgalterskoe-soprovozhdenie-ip/` |
| Contacts | Phone, route and document-showing contact path. | `/kontakty/` |
| Policy | Privacy/legal transparency. | `/policy` |
| Blog/news foundation | Future noindex content only. | `/blog/`, `/blog/obnovleniya-fns/`, `/blog/razbory/` |

## Hook-To-Route Map

| Hook | Safe use | Forbidden exaggeration | Related route group | Likely user state | Useful information to show | Recommended CTA | Related route | HOLD risks |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `пришло требование` | Use when a concrete IFNS/tax document exists or the user needs to identify a requirement. | Do not promise to avoid penalties, meet a deadline or prepare an answer without seeing the document. | Urgent/tax questions | Has a document and feels time pressure. | Source of document, period, attachments, what to show first. | `Показать документы` | `/otvet-na-trebovanie-ifns/`; `/srochnye-voprosy/` | exact deadlines, tax/legal conclusion, IFNS acceptance promise. |
| `банк запросил документы` | Use for bank request and 115-ФЗ pages. | Do not promise bank acceptance, unblocking or account result. | Bank/115-ФЗ | Has bank letter/request or package demand. | What the bank asked, activity confirmations, missing materials. | `Показать документы` | `/otvet-na-zapros-banka/`; `/dokumenty-dlya-banka-115-fz/` | bank outcome, sensitive documents, upload. |
| `нужно понять, что подготовить` | Use across route pages before document/data checklist. | Do not claim a complete list without seeing the situation. | All commercial groups | Wants a practical first checklist. | Document/data categories, period/status, route fit. | `Разобрать ситуацию` | `/razbor-situacii/` or exact route | exhaustive list, final conclusion. |
| `нужно не ошибиться с маршрутом` | Use on homepage, hubs and diagnostics. | Do not imply all routes are interchangeable. | Core, hubs, diagnostics | Knows the topic but not the exact route. | Route differences, parent/child links, safe fallback. | `Разобрать ситуацию` | `/`, hubs, `/razbor-situacii/` | cannibalization, service catalogue drift. |
| `нужно собрать документы перед подачей` | Use for registration, address, reporting and HR document routes. | Do not promise external acceptance or exact timing. | Registration/liquidation; address/EGRUL; reporting; HR | Preparing for submission/filing/action. | What inputs are usually checked, what affects route choice. | `Показать документы` | exact money page or parent hub | registry/reporting result, deadlines, legal conclusion. |
| `нужно понять, подходит ли режим` | Use for tax regime and AУСН diagnostics. | Do not give final tax advice publicly. | Tax regimes/diagnostics | Wants applicability check. | Inputs needed, tax/review boundary, next route. | `Разобрать ситуацию` | `/nalogi-i-rezhimy/`; `/ausn-krym/`; `/perehod-na-ausn/` | final tax conclusion, savings promise. |
| `есть риск отказа, приостановки или недостоверности` | Use carefully where source supports a risk category. | Do not state that the risk will happen or can be fully removed. | Address/EGRUL; bank; urgent/IFNS | Worried about external authority/bank/registry response. | What source/request says, what facts are checked, route options. | `Разобрать ситуацию` | `/nedostovernost-yuridicheskogo-adresa/`; `/bank-i-115-fz/`; `/srochnye-voprosy/` | fear pressure, guaranteed removal/unblocking, legal conclusion. |
| `ситуация срочная, но нужен разбор документов` | Use for urgent routes without timing promises. | Do not promise instant/same-day result or create panic. | Urgent/tax questions; HR urgent | Feels urgency but route depends on document/context. | Source document, event date, safe first step. | `Показать документы` | `/srochnye-voprosy/`; `/srochnoe-oformlenie-sotrudnikov/` | exact timing, urgent-result promise. |
| `нужно понять, с чего начать` | Use for homepage, situation review and broad hubs. | Do not present triage as a free substitute for a full service. | Core/local; situation review; hubs | Entry-stage or confused visitor. | Route families, safe first action, contact path. | `Разобрать ситуацию` | `/`; `/razbor-situacii/` | free-service implication, broad catalogue. |
| `нужно показать документы` | Use as office-first/document discussion path, not upload. | Do not expose public upload or imply form success. | Contacts; document-heavy money pages | Has documents and wants specialist review. | Phone/contact path, what to have ready, no public upload boundary. | `Показать документы` | `/kontakty/`; exact route | public upload, sensitive data, false success. |
| `нужно построить маршрут` | Use only for contact/location action. | Do not imply map/provider integration if not approved. | Contacts | Wants to visit/call. | Confirmed address and phone. | `Построить маршрут` | `/kontakty/` | unapproved provider/profile, hours, office/floor. |

## Lead Path By Page Type

| Page type | Lead path | CTA safety rule |
| --- | --- | --- |
| Homepage | Recognize brand/local context -> choose route family or safe first step -> `/razbor-situacii/`, hub or `/kontakty/`. | Do not turn into service catalogue; main CTA `Разобрать ситуацию`. |
| Situation review | Identify context -> explain what is checked -> move to exact route/contact/show-documents. | No free full-service promise; no final conclusion. |
| Hub | Recognize route family -> choose child route -> fallback to situation review/contact if unclear. | Child cards are links; no duplicate child H1/title. |
| Money page | Confirm exact route fit -> show documents/data and boundaries -> contact/show documents/review. | No outcome, price, guarantee, deadline or public upload. |
| Diagnostic | Show inputs and factors -> explain no final public answer -> route to review, hub or exact page. | No fake calculator output or final tax/legal conclusion. |
| Contacts | Show phone/address -> call/route/show documents safely -> policy available. | Confirmed NAP only; no hours/office/floor/legal IDs. |
| Policy | Read policy -> contact if needed. | No aggressive commercial CTA or unapproved legal/provider claims. |
| Noindex foundation | Explain future content foundation -> route to review/contact. | No indexing, live feed, autopublish or source-less news claims. |

## CTA Safety Rules

- `Разобрать ситуацию` means safe triage and route selection, not guaranteed result.
- `Позвонить` uses confirmed phone only.
- `Построить маршрут` must not imply unapproved map/provider/profile data.
- `Показать документы` means discuss/show through safe contact or office-first path, not public upload.
- `form_submit` is not allowed until real backend/CRM acceptance exists.
- Analytics/Metrica goals remain disabled until accepted with no-PII proof.

## Objection And Risk Handling

| Objection/risk | Safe response pattern | Stop condition |
| --- | --- | --- |
| "Can you say the result now?" | Explain that the result depends on documents, period, status and route context. | If public text would give a final legal/tax/bank/registry conclusion. |
| "Can I upload documents?" | Route to phone/office-first contact; no public upload unless separately approved. | If upload input or public document storage appears. |
| "How fast?" | Say timing depends on the document and route after review. | If exact deadline or urgent-result promise is introduced. |
| "How much?" | Keep public page without prices; pricing remains HOLD. | If price/range/discount/promo is introduced. |
| "Will bank/IFNS/registry accept it?" | Say external result cannot be promised before review and external decision. | If outcome promise appears. |

## What Must Not Be Promised

- external acceptance or approval;
- registration, liquidation, bank, IFNS, registry, tax or HR outcome;
- exact timing;
- savings or lower tax result;
- public secure upload unless separately approved and proven;
- live CRM/form success;
- public profile/channel readiness;
- legal/privacy acceptance;
- public launch.

## Owner/Legal Review Boundary

This document prepares safe source-to-site implementation. It does not record owner/legal approval.

Route copy, `/policy`, privacy/consent, CRM/forms/analytics, public profile data, channel publication and public live remain review-gated. Human decisions must be recorded only through explicit human-provided evidence.

## Source-To-Site Sync Rule

Copy this file to `dokumenty82-site` at the same relative path. If source and site differ, source controls unless a later owner decision updates the source.

## Release Verdict

`GO WITH CONDITIONS`

Stage 16 client-need hooks and lead path map is resolved in source and ready to sync to site with public-live gates closed.

`PUBLIC_LIVE_ALLOWED = false`
