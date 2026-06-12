# Stage 16 Lead Path And Conversion Architecture V1

Status: `SOURCE_TO_SITE_LEAD_PATH_READY_WITH_CONDITIONS`

Release verdict: `GO WITH CONDITIONS`

Public launch: `NOT_PUBLIC_LAUNCH_READY`

`PUBLIC_LIVE_ALLOWED = false`

## Purpose

This document defines safe selling and lead path architecture for future implementation in `dokumenty82-site`.

The conversion model is office-first and source-led. It moves users from a problem page to understanding and then to a safe next step. It does not approve live forms, CRM, analytics, uploads, messaging deep links, paid traffic or public launch.

## Primary Path

```text
problem page -> understanding -> safe next step
```

The page must help the user understand:

- whether this route fits;
- what is checked first;
- what documents/data may be needed;
- what is not promised;
- where to go if this route is wrong;
- how to contact safely.

## CTA Hierarchy

Main CTA:

- `Разобрать ситуацию`

Secondary CTAs:

- `Позвонить`
- `Построить маршрут`
- `Показать документы`

CTA must not promise a result before the situation and documents are reviewed.

Disallowed CTA patterns:

- "Получить гарантию";
- "Решить срочно";
- "Отправить документы сейчас" with upload;
- false success after local-only form;
- messaging deep links without owner/privacy/CRM/rendered QA approval.

## CTA Placement By Page Type

Homepage:

- hero primary CTA;
- route selector recovery CTA;
- local contact CTA near end.

Situation review:

- hero primary CTA;
- after intake/what-we-check block;
- final CTA.

Hub:

- hero primary CTA;
- child route cards as route links;
- fallback `Разобрать ситуацию`;
- contact CTA near end.

Money page:

- hero route-specific CTA;
- after documents/check block;
- after boundary/what-is-not-promised block;
- final CTA.

Diagnostic:

- hero `Разобрать ситуацию`;
- after data-needed block;
- next route CTA after diagnostic boundary.

Contact:

- phone and route CTAs first;
- show-documents safe path;
- policy link visible.

Policy:

- no aggressive commercial CTA;
- contact link only where appropriate.

## Safe Phone / Contact Path

The phone path may use:

- visible phone `+7 (978) 998-72-22`;
- `tel:+79789987222`;
- context label `Позвонить`.

Do not add:

- call tracking numbers without source/CRM/legal approval;
- unapproved messenger alternatives;
- working hours;
- representative name.

## Situation Review Path

The situation review path should:

- route ambiguous users to `/razbor-situacii/`;
- explain that review is a first triage step;
- avoid presenting triage as free replacement for service;
- ask for situation context without sensitive data in public UI;
- move to exact route only after route fit is clear.

## Show Documents Path

`Показать документы` is safe only when it means:

- show the document during a call or office-first contact;
- prepare to discuss the document;
- identify what kind of document/request exists.

It must not mean:

- upload client documents publicly;
- send scans through an unapproved form;
- trigger a live CRM webhook;
- produce false success.

If no backend/CRM/upload flow is accepted, the UI must show honest fallback.

## Route / Map Path

`Построить маршрут` may point to a safe route/map action only after owner/provider/privacy acceptance.

Until provider details are confirmed:

- preserve the contact page path;
- show address as text;
- do not claim live map integration if it is not present.

## No False Success

`form_submit` may mean only real submitted application in an accepted backend/CRM channel.

Before backend/CRM acceptance:

- form success must not appear;
- use fallback text;
- clicks may be tracked only after analytics acceptance and no-PII proof;
- missing proof remains `MISSING_EXPECTED`.

## Pressure Boundaries

Do not use:

- aggressive urgency;
- manipulative pressure;
- fake scarcity;
- unapproved guarantees;
- unapproved deadlines;
- fear-based outcome claims;
- "we solve everything" generic promises.

Acceptable urgency framing:

- "ситуация срочная, но нужен разбор документов";
- "важно понять источник запроса";
- "сроки смотрим по конкретному документу".

## Lead Path By Page Type

### Homepage

Role:

- brand/local router.

Lead path:

1. Recognize brand/local office.
2. Choose route family or safe first step.
3. Move to `/razbor-situacii/`, a hub or `/kontakty/`.

Primary CTA:

- `Разобрать ситуацию`

Secondary CTAs:

- `Позвонить`, `Построить маршрут`.

Forbidden:

- turning homepage into full service catalogue;
- public pricing;
- reviews/ratings.

### Situation Review

Role:

- first-step triage.

Lead path:

1. User describes/identifies the situation.
2. Page explains what is checked.
3. User moves to phone/contact/show-documents or exact route.

Primary CTA:

- `Разобрать ситуацию`

Secondary CTAs:

- `Позвонить`, `Показать документы`.

Forbidden:

- free substitute promise;
- final conclusion.

### Hub

Role:

- mixed-intent route selector.

Lead path:

1. User sees route family.
2. Chooses child money/diagnostic route.
3. If unclear, goes to situation review or contact.

Primary CTA:

- `Разобрать ситуацию`

Secondary CTAs:

- route cards, `Позвонить`, `Показать документы` if route group supports it.

Forbidden:

- duplicating child money-page H1/title;
- service catalogue dump.

### Money Page

Role:

- exact commercial/document intent.

Lead path:

1. User confirms exact fit.
2. Page explains documents/data and boundary.
3. User shows documents, calls or starts situation review.

Primary CTA:

- route-specific from registry, often `Показать документы` or `Разобрать ситуацию`.

Secondary CTAs:

- `Позвонить`, parent hub/related route.

Forbidden:

- outcome promise;
- price/discount;
- guarantee;
- exact deadline.

### Diagnostic Page

Role:

- applicability/checking/calculation intent.

Lead path:

1. User sees what inputs are needed.
2. Page explains no final answer without review.
3. User goes to situation review, relevant hub or money page.

Primary CTA:

- `Разобрать ситуацию`

Forbidden:

- public calculator output without proof;
- final tax/legal conclusion.

### Contact Page

Role:

- canonical NAP page.

Lead path:

1. User sees phone/address.
2. User calls, routes or prepares to show documents.
3. User can access policy.

Primary CTA:

- `Позвонить`

Secondary CTAs:

- `Построить маршрут`, `Показать документы`.

Forbidden:

- working hours;
- office/floor;
- legal entity IDs;
- unapproved map/profile claims.

### Policy Page

Role:

- privacy/legal transparency.

Lead path:

1. User reads policy.
2. User can return to contact if needed.

Primary CTA:

- none required; `Позвонить` only as safe contact action.

Forbidden:

- commercial pressure;
- schema overreach.

## Acceptable Hooks

| Hook | Safe use | Forbidden exaggeration | Related route group | Recommended CTA |
| --- | --- | --- | --- | --- |
| `непонятно, как ответить` | Use for unclear letters, requirements or mixed document situations. | Do not imply an answer can be produced without seeing the document. | Разбор ситуации; Срочные вопросы / ИФНС | `Разобрать ситуацию` |
| `пришло требование` | Use when a tax/IFNS document exists and needs route identification. | Do not promise to avoid penalties or meet exact deadline. | Срочные вопросы / ИФНС | `Показать документы` |
| `банк запросил документы` | Use for bank request and 115-ФЗ pages. | Do not promise bank acceptance or account unblocking. | Банк / 115-ФЗ | `Показать документы` |
| `нужно понять, что подготовить` | Use across route pages before document/data checklist. | Do not create exhaustive list if source does not confirm it. | All groups | `Разобрать ситуацию` |
| `нужно не ошибиться с маршрутом` | Use on homepage, hubs and diagnostics. | Do not imply all routes are interchangeable. | Homepage; Hubs; Diagnostics | `Разобрать ситуацию` |
| `нужно собрать документы перед подачей` | Use for registration, address, reporting and HR routes. | Do not promise registry/reporting acceptance. | Registration; Address; Reporting; HR | `Показать документы` |
| `нужно понять, подходит ли режим` | Use for tax regime and AУСН diagnostics. | Do not give final tax advice publicly. | Налоги и режимы | `Разобрать ситуацию` |
| `есть риск отказа, приостановки или недостоверности` | Use carefully where source supports a risk category. | Do not state the risk will happen. | Address; Bank; IFNS | `Разобрать ситуацию` |
| `ситуация срочная, но нужен разбор документов` | Use for urgent routes without exact deadline promises. | Do not promise instant or same-day result. | Срочные вопросы; HR urgent | `Показать документы` |
| `нужно понять, с чего начать` | Use for homepage, situation review and broad hubs. | Do not turn triage into free full service. | Homepage; Разбор ситуации | `Разобрать ситуацию` |

## Evidence Requirements

Future site implementation must prove:

- CTA labels match source;
- no false success;
- live forms/CRM/analytics/upload/messaging are feature-gated off;
- contact actions use confirmed NAP only;
- no forbidden hooks or pressure phrases appear;
- route-specific CTAs match route roles;
- mobile CTA behavior is usable and not obstructive;
- keyboard users can reach all lead actions.

Missing evidence remains `MISSING_EXPECTED`.

## Release Verdict

`GO WITH CONDITIONS`

Lead path architecture is ready for future source-aligned implementation.

Public launch remains:

`PUBLIC_LIVE_ALLOWED = false`
