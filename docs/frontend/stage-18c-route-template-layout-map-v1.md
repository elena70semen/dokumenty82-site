# Stage 18C Route Template Layout Map V1

Status: `READY_WITH_CONDITIONS`

Release verdict: `GO WITH CONDITIONS`

Public launch: `NOT_PUBLIC_LIVE_READY`

`PUBLIC_LIVE_ALLOWED = false`

## Purpose

This map assigns approved route templates to the current route registry. It does not create routes and does not approve launch.

## Template Families

| Template | Routes | Required sections |
| --- | --- | --- |
| Home router | `/` | Hero, situation selector, start path, priority tasks, route groups, client information, local trust/NAP, FAQ, final CTA. |
| Core triage | `/razbor-situacii/` | Hero, when fits, scope, process, documents/data, placeholder boundary, related routes, local contact, safety note. |
| Contacts/NAP | `/kontakty/` | Hero, confirmed NAP, phone, route, safe document showing, related routes, safety note. |
| Project context | `/o-proekte/` | Project role, source-led boundaries, office-first logic, HOLD list, safe CTA. |
| Policy/legal | `/policy` | Privacy/legal text, no commercial schema, owner/legal pending, safe contact fallback. |
| Hub router | 8 hub routes | Hero, route intent, when fits, child routes, what we check, documents/data, how work starts, boundaries, related routes, FAQ direction, CTA. |
| Money route | 20 money routes | Hero, exact route intent, when fits, what we check, documents/data, how work starts, not promised, parent/sibling links, FAQ direction, CTA. |
| Diagnostic route | 3 diagnostics | Hero, diagnostic scope, input checklist, how checking starts, not promised, parent links, FAQ direction, CTA. |
| Noindex foundation | 3 blog routes | Noindex notice, manual approval, no live fetch, no scheduler, no autopublish, safe contact path. |

## Indexed Route Coverage

The indexed route template universe is 36 routes:

- Core/legal/local: `/`, `/razbor-situacii/`, `/kontakty/`, `/o-proekte/`, `/policy`.
- Hubs: `/srochnye-voprosy/`, `/otchetnost/`, `/nalogi-i-rezhimy/`, `/bank-i-115-fz/`, `/adres-egryul-direktor/`, `/kadry/`, `/soprovozhdenie/`, `/registraciya-i-likvidaciya/`.
- Money pages: `/otvet-na-trebovanie-ifns/`, `/deklaraciya-usn/`, `/otvet-na-zapros-banka/`, `/dokumenty-dlya-banka-115-fz/`, `/yuridicheskiy-adres-simferopol/`, `/nedostovernost-yuridicheskogo-adresa/`, `/smena-yuridicheskogo-adresa-ooo/`, `/smena-direktora-ooo/`, `/srochnoe-oformlenie-sotrudnikov/`, `/perehod-na-ausn/`, `/nulevaya-otchetnost-ooo/`, `/nulevaya-otchetnost-ip/`, `/otchetnost-elektronno/`, `/vosstanovlenie-buhucheta/`, `/buhgalterskoe-soprovozhdenie-ooo/`, `/buhgalterskoe-soprovozhdenie-ip/`, `/kadrovoe-soprovozhdenie/`, `/registraciya-ooo/`, `/registraciya-ip/`, `/likvidaciya-ooo/`.
- Diagnostics: `/ausn-krym/`, `/raschet-nalogovoy-nagruzki/`, `/nds-pri-usn-2026/`.

## Noindex Foundation Coverage

The noindex foundation routes are:

- `/blog/`
- `/blog/obnovleniya-fns/`
- `/blog/razbory/`

They must be excluded from sitemap and primary navigation until separate approval.

## Template Guardrail

Runtime checks must verify:

- all indexed routes have a template and required product blocks;
- noindex foundation routes remain excluded from sitemap;
- core routes do not become service dumps;
- hub templates render child-route navigation without hidden SEO;
- money and diagnostic templates preserve not-promised boundaries.

## Release Boundary

`PUBLIC_LIVE_ALLOWED = false`
