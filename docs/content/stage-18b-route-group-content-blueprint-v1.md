# Stage 18B Route Group Content Blueprint V1

Status: `READY_WITH_CONDITIONS`

Release verdict: `GO WITH CONDITIONS`

Public launch: `NOT_PUBLIC_LIVE_READY`

`PUBLIC_LIVE_ALLOWED = false`

## Purpose

This blueprint defines how route groups must present content without cannibalizing child pages or inventing unsupported claims.

It applies to the approved route registry only and does not create new routes.

## Route Group Model

| Group | Parent role | Child role | Content boundary |
| --- | --- | --- | --- |
| Core/local | `/`, `/razbor-situacii/`, `/kontakty/`, `/o-proekte/`, `/policy` | N/A | Brand, first step, NAP, project context and privacy only. |
| Urgent/IFNS | `/srochnye-voprosy/` | `/otvet-na-trebovanie-ifns/` | Hub owns unclear urgency; money page owns exact IFNS requirement. |
| Reporting | `/otchetnost/` | USN, zero reporting, e-reporting, recovery | Hub chooses route by form/period/data; children own exact tasks. |
| Bank/115-FZ | `/bank-i-115-fz/` | bank request, 115-ФЗ package | Hub separates answer vs package; children own exact bank routes. |
| Address/EGRUL/director | `/adres-egryul-direktor/` | address, unreliability, address change, director change | Hub routes company-change topics; children own exact changes. |
| Registration/liquidation | `/registraciya-i-likvidaciya/` | registration ООО/IP, liquidation ООО | Hub owns lifecycle choice; children own exact route. |
| Tax regimes/diagnostics | `/nalogi-i-rezhimy/` | AУСН, tax load, NDS/USN diagnostics | Hub owns route choice; diagnostics own checking questions. |
| HR | `/kadry/` | urgent employee documents, HR support | Hub separates urgent event from support; children keep personal-data boundary. |
| Support | `/soprovozhdenie/` | accounting support ООО/IP, HR support, recovery | Hub owns support format; children own concrete support routes. |
| Noindex content foundation | `/blog/`, `/blog/obnovleniya-fns/`, `/blog/razbory/` | N/A | Noindex, no sitemap, no live fetch, no article/news schema. |

## Hub Page Requirements

Hubs must include:

- route intent as a selector;
- when the hub fits;
- child route cards;
- what to check before choosing a child route;
- documents/data that help choose;
- anti-cannibalization note where useful;
- safe final CTA.

Hubs must not:

- claim to perform every child service directly;
- use every child query as a keyword list;
- become a full catalogue above the fold;
- outrank child intent by repeating exact child H1/title wording.

## Money Page Requirements

Money pages must include:

- exact route intent;
- when this page fits;
- what we check;
- documents/data that may help;
- how work starts;
- what is not promised;
- parent hub link;
- selected sibling or fallback route links;
- safe final CTA.

Money pages must not:

- promise result of IFNS, bank, registry or other external side;
- publish prices or deadlines;
- ask for public uploads;
- imply final legal/tax/bank advice before document review.

## Diagnostic Page Requirements

Diagnostics must include:

- diagnostic scope;
- inputs needed for checking;
- what is not concluded automatically;
- link to parent `/nalogi-i-rezhimy/`;
- link to `/razbor-situacii/`;
- safe CTA.

Diagnostics must not:

- publish final tax calculation as a promise;
- imply official advice;
- use fake calculator outputs;
- create hidden SEO blocks.

## Core Route Requirements

| Route | Content role |
| --- | --- |
| `/` | Local brand/router and safe start path. |
| `/razbor-situacii/` | First-step triage and route selection. |
| `/kontakty/` | Confirmed NAP, phone, route, safe document showing. |
| `/o-proekte/` | Project context without unsupported proof claims. |
| `/policy` | Privacy/legal transparency, non-commercial. |

## Link Rules

- Homepage links to `/razbor-situacii/`, selected hubs and `/kontakty/`.
- Hub links to its child routes and fallback `/razbor-situacii/`.
- Money page links to parent hub, relevant sibling routes and safe fallback.
- Diagnostics link to `/nalogi-i-rezhimy/` and `/razbor-situacii/`.
- Contacts and policy do not become SEO doorway pages.
- Noindex content foundation routes stay out of main navigation and sitemap.

## Release Boundary

This blueprint is approved for site foundation implementation with conditions.

It does not approve public live.

`PUBLIC_LIVE_ALLOWED = false`
