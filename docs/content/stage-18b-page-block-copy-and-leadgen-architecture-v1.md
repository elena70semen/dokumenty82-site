# Stage 18B Page Block Copy And Leadgen Architecture V1

Status: `READY_WITH_CONDITIONS`

Release verdict: `GO WITH CONDITIONS`

Public launch: `NOT_PUBLIC_LIVE_READY`

`PUBLIC_LIVE_ALLOWED = false`

## Purpose

This document defines the Stage 18B source-led page block, copy and lead-generation architecture for `Документы для бизнеса`.

It is a product foundation standard for the standalone site repository `elena70semen/dokumenty82-site`. It is not final public copy approval, owner/legal approval, CRM/forms approval, analytics approval or public-live approval.

## Source Basis

- `AGENTS.md`
- `README.md`
- `docs/00-start/active-canon-index.md`
- `docs/00-start/hold-register.md`
- `docs/seo/route-registry.md`
- `docs/seo/seo-canon.md`
- `docs/seo/stage-18a-semantic-seo-master-audit-v1.md`
- `docs/seo/stage-18a-route-semantic-cluster-map-v1.md`
- `docs/seo/stage-18a-internal-linking-and-anti-cannibalization-map-v1.md`
- `docs/content/stage-15-text-quality-standards-v1.md`
- `docs/content/stage-16-selling-page-block-library-v1.md`
- `docs/content/stage-16-page-block-blueprints-v1.md`
- `docs/content/stage-16-client-need-hooks-and-lead-path-v1.md`
- `docs/ux/stage-16-lead-path-and-conversion-architecture-v1.md`
- `docs/source-to-site/transport-protocol-launch-gate-sync-v1.md`

## Required Public Route Blocks

Every indexed public route must visibly answer the user questions below. The wording may be concise, but the block family must be present in runtime content or rendered page structure.

| Block | Required purpose | Copy boundary |
| --- | --- | --- |
| Route intent | Explain what situation the page owns. | One URL = one main intent; no sibling route capture. |
| When this page fits | Help the user recognize whether this route is appropriate. | No pressure, fake urgency or universal promises. |
| What we check | Show practical review points before document work. | Check inputs and context, not final legal/tax/bank conclusions. |
| Documents/data that may help | Name safe input categories. | No public upload, no request for secrets or access credentials. |
| How work starts | Describe the safe first step. | Keep office-first and triage-first logic. |
| What is not promised | State route boundaries. | No guarantees, exact deadlines, outcomes or external-party decisions. |
| Related routes | Link to parent, child or sibling routes. | No flat service dump and no noindex routes in public nav. |
| FAQ direction | Provide route-specific questions or a route-specific FAQ angle. | Visible useful content only; no hidden SEO. |
| Safe final CTA | End with approved CTA path. | Use only approved CTA hierarchy. |
| Local contact/NAP | Use confirmed contact data where appropriate. | No working hours, office/floor, legal identifiers or active email claim. |

## Copy Quality Rules

- Use clear client-language situations, not keyword lists.
- Keep page text specific to the route's primary intent.
- Use hub language for hubs: choose, separate, route, compare the next step.
- Use exact service language for money pages only when source-backed by the route registry and service passports.
- Use diagnostic language for diagnostics: check, assess applicability, collect inputs.
- Avoid shallow repeated filler; each route should have at least one route-specific input or boundary.
- Do not create fake search volume, hidden text, doorway text, reviews, ratings, cases or comparative claims.

## Safe Lead-Generation Model

Allowed lead paths:

- `/razbor-situacii/`
- `tel:+79789987222`
- `/kontakty/`
- safe `Показать документы` wording without upload

Forbidden lead behavior:

- real form endpoint;
- CRM webhook;
- upload input;
- messaging deep link;
- fake success message;
- analytics event;
- hidden collection of personal data;
- promise that a submitted website form has reached an operator.

Form placeholders may exist only if they clearly say online submission is not connected and provide phone/contact fallback.

## CTA Hierarchy

| CTA | Use | Boundary |
| --- | --- | --- |
| `Разобрать ситуацию` | Primary first step for ambiguous, mixed or route-selection needs. | It is triage, not a free replacement for service. |
| `Позвонить` | Phone fallback and contact action. | Do not promise availability by hours. |
| `Построить маршрут` | Contact/local route action. | Use only confirmed address and neutral local marker. |
| `Показать документы` | Safe document-review path. | Must not imply public upload. |

Non-commercial policy/contact fallback may use `Контакты` as a navigation label to `/kontakty/`. It is not a commercial CTA and must not replace the approved CTA hierarchy on service routes.

## Owner/Legal Boundary

Stage 18B copy is `READY_FOR_OWNER_REVIEW`, not approved for public live.

The following remain blocked:

- prices;
- discounts;
- guarantees;
- exact deadlines;
- reviews, ratings, cases;
- legal identifiers;
- working hours;
- final legal/tax/bank conclusions;
- owner/legal approval claims.

## Runtime Guardrail Requirements

The site repo must check runtime/source files for:

- required block family presence across all 36 indexed routes;
- allowed CTA labels and destinations;
- disabled live forms/CRM/analytics/upload/messaging;
- no fake success;
- no hidden SEO;
- no unsafe public-live true marker;
- no active HTTP/3/QUIC/UDP/443 launch enablement.

## Release Boundary

This standard supports product foundation and owner review only.

`PUBLIC_LIVE_ALLOWED = false`
