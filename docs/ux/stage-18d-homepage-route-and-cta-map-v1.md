# Stage 18D Homepage Route And CTA Map V1

Status: `READY_WITH_CONDITIONS`

Release verdict: `GO WITH CONDITIONS`

Public launch: `NOT_PUBLIC_LIVE_READY`

`PUBLIC_LIVE_ALLOWED = false`

## Purpose

This map defines homepage navigation and CTA priorities for Stage 18D.

## Homepage Route Priorities

| Priority | Route | Reason |
| --- | --- | --- |
| 1 | `/razbor-situacii/` | Primary safe first step for unclear or mixed situations. |
| 2 | `/kontakty/` | Confirmed NAP, phone and office route. |
| 3 | `/otchetnost/` | High-demand reporting route family. |
| 4 | `/bank-i-115-fz/` | Bank and 115-ФЗ route family. |
| 5 | `/adres-egryul-direktor/` | Address/EGRUL/director route family. |
| 6 | `/registraciya-i-likvidaciya/` | Business lifecycle route family. |
| 7 | `/kadry/` | HR route family. |
| 8 | `/soprovozhdenie/` | Support/recovery route family. |

The homepage may show selected route cards and grouped navigation. It must not list every money page as the first-screen experience.

## CTA Map

| Context | Primary action | Secondary action | Boundary |
| --- | --- | --- | --- |
| Hero | `Разобрать ситуацию` -> `/razbor-situacii/` | `Показать документы` -> safe anchor or contacts | No live upload. |
| Situation selector | Route-group link | `/razbor-situacii/` fallback | No hidden SEO. |
| Start path | `/razbor-situacii/` | `Позвонить` | Triage first. |
| Local trust/NAP | `Позвонить` | `Построить маршрут` -> `/kontakty/` | Confirmed NAP only. |
| Final CTA | `Разобрать ситуацию` | phone/contact | No fake success. |

## Mobile Navigation Requirements

- The menu must expose approved top-level routes without noindex foundation routes.
- CTA links must be tappable and readable.
- The phone link must use `tel:+79789987222`.
- The mobile menu must not rely on hover.

## Homepage FAQ Direction

Allowed FAQ topics:

- what to do if the route is unclear;
- whether the project is connected to a state body;
- how to show documents safely;
- where the office is located;
- why prices/deadlines are not published before review.

Forbidden FAQ topics:

- guarantees;
- exact deadlines;
- reviews/ratings;
- final tax/legal/bank conclusions;
- official state status.

## Release Boundary

`PUBLIC_LIVE_ALLOWED = false`
