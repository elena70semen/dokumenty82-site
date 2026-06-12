# Stage 18B Leadgen And Client Information Map V1

Status: `READY_WITH_CONDITIONS`

Release verdict: `GO WITH CONDITIONS`

Public launch: `NOT_PUBLIC_LIVE_READY`

`PUBLIC_LIVE_ALLOWED = false`

## Purpose

This map defines what client information the public site may ask for or describe during Stage 18B/C/D/E product foundation.

It protects the office-first lead path while live forms, CRM, analytics, uploads and messaging remain blocked.

## Approved Lead Paths

| Path | Use | Runtime boundary |
| --- | --- | --- |
| `/razbor-situacii/` | Primary triage path. | Can show placeholder form only with no submit endpoint. |
| `tel:+79789987222` | Phone fallback. | No hours or availability promise. |
| `/kontakty/` | NAP, route and safe document-showing path. | Confirmed address and phone only. |
| `Показать документы` | Safe document review wording. | No file input, no upload endpoint, no hidden collection. |

## Client Information Model

Allowed public information prompts:

- short description of situation;
- type of letter, request or document;
- business form or route context where relevant;
- period or topic if the route requires it;
- list of documents the client already has, without upload;
- preferred safe next step: call, office visit, route review.

Forbidden public information prompts:

- passport or personal document uploads;
- client files through public form;
- tax/legal identifiers unless separately approved;
- credentials, tokens, bank access or account access;
- messaging deep links;
- CRM-connected hidden fields;
- analytics identifiers tied to private data.

## Placeholder Form Rules

If a form-like UI exists, it must:

- prevent default live submission;
- have no `action` endpoint;
- have no upload input;
- state that online submission is not connected;
- route to phone/contact fallback;
- avoid success wording that implies delivery to CRM or operator;
- avoid analytics events.

Allowed placeholder message:

`Онлайн-отправка пока не подключена. Чтобы передать вопрос, позвоните или согласуйте способ показа документов.`

## Client Information Blocks By Route Class

| Route class | Useful client information | Boundary |
| --- | --- | --- |
| Homepage | Situation selector, start path, local trust and route groups. | Not a full catalogue. |
| Situation review | What happened, what document/request exists, what is unclear. | Triage only. |
| Contacts | Phone, route, safe document showing. | NAP only; no hours, floor or legal IDs. |
| Hub | Form/business type, topic, source of question, child route choice. | Do not capture exact child route copy. |
| Money page | Route-specific input categories and document/data list. | No external outcome promise. |
| Diagnostic | Inputs for checking applicability or calculation context. | No final tax/legal conclusion. |
| Policy | Privacy contact and data boundary. | Non-commercial. |
| Noindex foundation | Manual editorial and no-live-fetch status. | No indexing, no autopublish. |

## CTA Safety

Only these public CTA labels are approved:

- `Разобрать ситуацию`
- `Позвонить`
- `Построить маршрут`
- `Показать документы`

The `/policy` fallback may use `Контакты` as a non-commercial navigation label to the confirmed NAP/contact route.

Operational labels such as `Отправка пока не подключена` may appear only inside a placeholder and must not be styled or recorded as a successful submission.

## Evidence Requirements

The site repo must produce:

- `evidence/ux/stage18-page-blocks-and-lead-path.json`;
- runtime guardrail proof that unsafe lead features remain disabled;
- route coverage for all 36 indexed routes;
- noindex foundation proof for content routes.

## Release Boundary

This map supports review-ready UX foundation only.

`PUBLIC_LIVE_ALLOWED = false`
