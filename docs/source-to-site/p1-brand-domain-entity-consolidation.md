# P1 Brand / Domain / Entity Consolidation

Status: `INVESTIGATION`
Date: `2026-06-16`
P0-03 handling: `EXTERNAL_FOLLOW_UP_NOT_P0_03_BLOCKER`

Primary site repository: `elena70semen/dokumenty82-site`

Source-of-truth repository: `elena70semen/dokumenty-dlya-biznesa`

Production domain: `https://dokumenty82.ru/`

## Executive Summary

The current site repository is not the main cause of the brand/domain ambiguity.

The active website canon is consistent around:

- public brand: `Документы для бизнеса`;
- public domain: `https://dokumenty82.ru/`;
- public category: `Центр подготовки документов`;
- public phone: `+7 (978) 998-72-22`;
- public address: `Республика Крым, Симферополь, ул. им. Мате Залки, 1`.

The ambiguity comes from external/public entity signals that reuse the same or similar NAP under different names and domains.

This document is a P1/P0 follow-up note. It does not require an immediate production code change during P0-03, and it must not block the main-sync / CI-visibility task.

## Observed Public Signals

Observed on 2026-06-16.

| Signal | Public URL / source | Observed role | Risk |
| --- | --- | --- | --- |
| Primary production site | `https://dokumenty82.ru/` | Active public site for `Документы для бизнеса` | Should remain the canonical public source |
| Old or parallel domain | `https://business-helps.ru/` | Search-visible site for `РАХИМА КОНСАЛТИНГ - Центр Подготовки Документов` | Competes with primary brand/domain and may expose conflicting facts |
| Old or parallel about page | `https://business-helps.ru/about/` | Search-visible NAP/details page | Same phone/address can split local entity confidence |
| Old or parallel hours page | `https://business-helps.ru/grafic/` | Search-visible work-hours page | Hours are not part of current site canon and can create stale-data risk |
| Parallel domain | `https://rahima-consulting.ru/` | Separate site for `Rahima Consulting` / accounting and automation positioning | May be a separate brand or legal/backend entity; relationship is not encoded in current canon |
| Local profile / maps signal | `https://yandex.ru/maps-reviews-widget/1302424560?comments` | Yandex canonical points to `dokumenty_dlya_biznesa` reviews page | Needs owner-controlled profile strategy before schema/sameAs expansion |
| Local profile / maps signal | `https://yandex.ru/maps-reviews-widget/222520239597?comments` | Another Yandex reviews widget/entity signal | Potential duplicate/local entity ambiguity |
| Directory/map signal | `https://2gis.ru/simferopol/firm/70000001058132272` | Public directory signal for the same local business area | Needs owner verification before being used as a public sameAs/profile source |

Resolver check on 2026-06-16 showed these public DNS answers:

- `dokumenty82.ru` -> `155.212.142.72`;
- `business-helps.ru` -> `159.194.216.36`;
- `rahima-consulting.ru` -> `155.212.186.233`.

Therefore this cannot be fully fixed by changing only the `dokumenty82-site` codebase.

Follow-up check on 2026-06-16:

- owner reported `rahima-consulting.ru` was turned off;
- `business-helps.ru` WHOIS: registrar `REGRU-RU`, nameservers `ns1.reg.ru` and `ns2.reg.ru`;
- public resolver answer for `business-helps.ru` DNS A: `159.194.216.36`;
- RIPE RDAP / IP ownership for `159.194.216.36`: `RU-BEGET`, `Beget LLC`;
- operational conclusion at that time: the public DNS answer still pointed to a Beget-hosted IP.

Additional follow-up check on 2026-06-16:

- owner reported that the old server had been blocked/deleted and DNS records were removed in the REG.RU control panel;
- owner screenshot showed no visible resource records in the REG.RU DNS zone UI;
- external resolver checks still returned `A 159.194.216.36` for `business-helps.ru`;
- `nslookup` responses for `ns1.reg.ru` / `ns2.reg.ru` were non-authoritative recursive answers with approximately 4-5 hours TTL remaining;
- `TXT yandex-verification: e712c03ad84a53a2` was also still visible through resolver checks;
- corrected operational conclusion: the active REG.RU UI appears empty, while public recursive DNS caches can still return the old Beget IP until TTL/propagation clears. This is not proof that the owner-visible REG.RU zone is still connected to an IP.

Post-stage recheck requirement:

- after P0-02 / the next release-proof stage, repeat public resolver checks and, if tooling is available, a non-recursive authoritative DNS check;
- expected result after owner-side DNS deletion propagates: no `A 159.194.216.36` answer for `business-helps.ru`;
- if public resolvers still return the A record after TTL expiry, check whether REG.RU template/parking or another active DNS zone restored it.
- this DNS/entity cleanup is an external consolidation follow-up and does not require a `dokumenty82-site` production code change during P0-03.

## Current Site State

The site already sends the right primary signals:

- `robots.txt` points to `Host: dokumenty82.ru`;
- `robots.txt` points to `https://dokumenty82.ru/sitemap.xml`;
- sitemap URLs use only `https://dokumenty82.ru/`;
- page metadata uses `Документы для бизнеса`;
- homepage canonical is `https://dokumenty82.ru/`;
- homepage schema uses `@id: https://dokumenty82.ru/#business`;
- no `sameAs`, ratings, reviews, hours, legal identifiers or old-domain links were found in production site code during this pass.

This means the first problem is not "make the site say the brand louder".
The first problem is "stop other public sources from saying different things with the same NAP".

## Risk Model

### SEO / Entity Risk

Search engines may see several candidates for the same real-world entity:

- `Документы для бизнеса` on `dokumenty82.ru`;
- `РАХИМА КОНСАЛТИНГ / Центр Подготовки Документов` on `business-helps.ru`;
- `Rahima Consulting` on `rahima-consulting.ru`;
- map/profile/directory entries with overlapping phone and address.

That can weaken:

- branded query confidence;
- local pack confidence;
- NAP consistency;
- canonical domain authority;
- topical authority for document-preparation pages.

### Content / Governance Risk

Old or parallel public sources may expose fields that are not in the current site canon:

- work hours;
- office/floor details;
- old emails;
- old company names;
- broader service claims;
- ratings/reviews or directory data.

This can make the public graph inconsistent even when `dokumenty82.ru` itself is clean.

## Recommended Decision

Recommended public entity model:

- primary public brand: `Документы для бизнеса`;
- primary public domain: `https://dokumenty82.ru/`;
- public descriptor/category: `Центр подготовки документов`;
- local NAP: phone/address from active canon;
- `Rahima Consulting` and `business-helps.ru` are not referenced from the site until the owner defines their relationship.

## Consolidation Plan

### Step 1: Owner Relationship Decision

Owner must classify each external signal:

| External signal | Decision needed |
| --- | --- |
| `business-helps.ru` | old brand, redirect candidate, separate service, or archive/noindex candidate |
| `rahima-consulting.ru` | separate business, legal/backend entity, old brand, or related brand |
| Yandex profile `1302424560` | primary card, duplicate card, or profile to update |
| Yandex profile `222520239597` | primary card, duplicate card, or profile to merge/remove |
| 2GIS profile | primary profile, duplicate profile, or profile to update |

### Step 2: Domain Strategy

Recommended if owner controls `business-helps.ru`:

1. Decide whether it should be retired as a public brand.
2. If retired, configure a 301 redirect to `https://dokumenty82.ru/` or to the closest matching route.
3. If redirect is not immediately possible, set canonical/noindex on the old site and remove stale NAP/HOLD data.
4. Keep `dokumenty82.ru` as the only canonical sitemap/robots host.

Recommended if owner controls `rahima-consulting.ru`:

1. Decide whether it is a separate business line.
2. If separate, avoid sharing the same public page intent and avoid cross-domain duplication.
3. If it is a parent/legal/backend brand, do not add it to public schema until legal/owner approves wording.

### Step 3: Local Profiles

For Yandex/2GIS and directories:

1. Pick one primary public name: `Документы для бизнеса`.
2. Use one site URL: `https://dokumenty82.ru/`.
3. Use one phone and one address from active canon.
4. Remove or merge duplicates where the platform allows it.
5. Do not publish ratings/reviews/hours/legal data on the website schema until owner approval.

### Step 4: Site Schema After External Cleanup

Only after owner confirms profile ownership and relationship:

- consider adding controlled `sameAs` links to confirmed profiles;
- do not add `aggregateRating`, `review`, `openingHours`, `legalName`, `taxID`, prices or guarantees unless explicitly approved;
- keep `@id` anchored to `https://dokumenty82.ru/#business`.

## What Not To Do Now

- Do not add `business-helps.ru` or `rahima-consulting.ru` to the footer, schema or public copy.
- Do not add old brand names as `alternateName` unless owner decides they are public aliases.
- Do not add Yandex/2GIS profile links as `sameAs` until the primary profile is selected.
- Do not copy work hours, office/floor, legal details, ratings or reviews from old profiles into the site.
- Do not solve duplicate public entities by adding more synonyms to the new site.

## Verdict

`dokumenty82.ru` should be treated as the canonical public website and the main entity anchor.

The brand/domain ambiguity should be handled as an external entity consolidation task, not as a normal website copy task.

Priority: `P1`

Recommended next owner action: decide whether `business-helps.ru` and `rahima-consulting.ru` are old brands, separate brands, or redirect/archive candidates.
