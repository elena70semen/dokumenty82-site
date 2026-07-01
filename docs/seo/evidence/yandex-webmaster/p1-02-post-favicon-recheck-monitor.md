# P1-02 Yandex Webmaster Post-Favicon Recheck Monitor

## Scope

Record post-deploy monitoring evidence for the Yandex Webmaster favicon
recommendation after P1-01.

This task does not change site code, favicon assets, metadata, SEO copy, forms,
CRM, uploads, paid traffic, messaging links, local profiles, rating widgets,
prices, guarantees, reviews, legal identifiers or business hours.

## Inputs

| Input | Value |
| --- | --- |
| Repository | `elena70semen/dokumenty82-site` |
| Production host | `https://dokumenty82.ru/` |
| P1-01 verdict | `FAVICON_DEPLOYED_AND_VERIFIED` |
| P1-01 PR | `#34` |
| P1-01 merge commit | `6970dc867421f69d079b8511a7415bc871061303` |
| P1-01 production release ID | `20260618-1254-p1-01-favicon-6653f8b5` |
| Monitoring check date | `2026-06-18` |
| Monitoring user agents | regular browser UA and `YandexBot/3.0` compatible UA |

## Current Yandex Webmaster Status

- Recommendation: favicon not found
- Recheck submitted: 18.06.2026
- Current status: checking site
- Expected crawler/cache delay: up to several days

The current Yandex Webmaster state is a waiting state after manual recheck
submission, not an observed site-side failure.

## Live Favicon Technical Check

Fetched with redirects disabled. No tested favicon URL returned a redirect.

| URL | User-agent | Status | Content-type | Bytes | Verdict |
| --- | --- | ---: | --- | ---: | --- |
| `https://dokumenty82.ru/favicon.svg` | regular browser | `200` | `image/svg+xml` | `675` | OK |
| `https://dokumenty82.ru/favicon.svg` | YandexBot | `200` | `image/svg+xml` | `675` | OK |
| `https://dokumenty82.ru/favicon.ico` | regular browser | `200` | `image/x-icon` | `2742` | OK |
| `https://dokumenty82.ru/favicon.ico` | YandexBot | `200` | `image/x-icon` | `2742` | OK |
| `https://dokumenty82.ru/assets/brand/favicon.svg` | regular browser | `200` | `image/svg+xml` | `675` | OK |
| `https://dokumenty82.ru/assets/brand/favicon.svg` | YandexBot | `200` | `image/svg+xml` | `675` | OK |

## Main Page Favicon Discovery Check

Checked URL: `https://dokumenty82.ru/`

| Check | Result |
| --- | --- |
| HTTP status | `200` |
| Redirect issue | none observed |
| Content-type | `text/html` |
| HTML bytes | `184701` |
| `link rel="shortcut icon"` | present, `/favicon.ico` |
| `link rel="icon"` | present, `/favicon.svg` |
| `/favicon.svg` present | yes |
| `/favicon.ico` present | yes |
| Canonical | `https://dokumenty82.ru/` |
| Robots meta | `index, follow` |
| Noindex | absent |
| Metrica | `109869928` present |
| Cookie notice | present |
| Title | present |
| H1 | present |

## Sitemap / Robots Check

| Check | Result |
| --- | --- |
| `https://dokumenty82.ru/robots.txt` status | `200` |
| `robots.txt` content-type | `text/plain` |
| `robots.txt` bytes | `459` |
| `Allow: /` | present |
| `Disallow: /internal/` | present |
| `Sitemap: https://dokumenty82.ru/sitemap.xml` | present |
| `https://dokumenty82.ru/sitemap.xml` status | `200` |
| `sitemap.xml` content-type | `text/xml` |
| `sitemap.xml` bytes | `4981` |
| Sitemap URL count | `30` |
| Sitemap host | all URLs start with `https://dokumenty82.ru/` |
| Held routes in sitemap | none found for `blog`, `news`, `novosti`, `faq`, `internal` |

## YandexBot URL Check

All sitemap URLs were fetched with a YandexBot-compatible user-agent and
redirects disabled.

| URL | Status | Noindex | Canonical self | Title | H1 | Verdict |
| --- | ---: | --- | --- | --- | --- | --- |
| `https://dokumenty82.ru/` | `200` | no | yes | yes | yes | OK |
| `https://dokumenty82.ru/razbor-situacii/` | `200` | no | yes | yes | yes | OK |
| `https://dokumenty82.ru/kontakty/` | `200` | no | yes | yes | yes | OK |
| `https://dokumenty82.ru/policy/` | `200` | no | yes | yes | yes | OK |
| `https://dokumenty82.ru/o-proekte/` | `200` | no | yes | yes | yes | OK |
| `https://dokumenty82.ru/srochnye-voprosy/` | `200` | no | yes | yes | yes | OK |
| `https://dokumenty82.ru/otchetnost/` | `200` | no | yes | yes | yes | OK |
| `https://dokumenty82.ru/nalogi-i-rezhimy/` | `200` | no | yes | yes | yes | OK |
| `https://dokumenty82.ru/bank-i-115-fz/` | `200` | no | yes | yes | yes | OK |
| `https://dokumenty82.ru/adres-egryul-direktor/` | `200` | no | yes | yes | yes | OK |
| `https://dokumenty82.ru/kadry/` | `200` | no | yes | yes | yes | OK |
| `https://dokumenty82.ru/soprovozhdenie/` | `200` | no | yes | yes | yes | OK |
| `https://dokumenty82.ru/registraciya-i-likvidaciya/` | `200` | no | yes | yes | yes | OK |
| `https://dokumenty82.ru/otvet-na-trebovanie-ifns/` | `200` | no | yes | yes | yes | OK |
| `https://dokumenty82.ru/deklaraciya-usn/` | `200` | no | yes | yes | yes | OK |
| `https://dokumenty82.ru/nulevaya-otchetnost-ooo/` | `200` | no | yes | yes | yes | OK |
| `https://dokumenty82.ru/nulevaya-otchetnost-ip/` | `200` | no | yes | yes | yes | OK |
| `https://dokumenty82.ru/vosstanovlenie-buhucheta/` | `200` | no | yes | yes | yes | OK |
| `https://dokumenty82.ru/otvet-na-zapros-banka/` | `200` | no | yes | yes | yes | OK |
| `https://dokumenty82.ru/dokumenty-dlya-banka-115-fz/` | `200` | no | yes | yes | yes | OK |
| `https://dokumenty82.ru/yuridicheskiy-adres-simferopol/` | `200` | no | yes | yes | yes | OK |
| `https://dokumenty82.ru/nedostovernost-yuridicheskogo-adresa/` | `200` | no | yes | yes | yes | OK |
| `https://dokumenty82.ru/smena-yuridicheskogo-adresa-ooo/` | `200` | no | yes | yes | yes | OK |
| `https://dokumenty82.ru/smena-direktora-ooo/` | `200` | no | yes | yes | yes | OK |
| `https://dokumenty82.ru/registraciya-ooo/` | `200` | no | yes | yes | yes | OK |
| `https://dokumenty82.ru/registraciya-ip/` | `200` | no | yes | yes | yes | OK |
| `https://dokumenty82.ru/likvidaciya-ooo/` | `200` | no | yes | yes | yes | OK |
| `https://dokumenty82.ru/ausn-krym/` | `200` | no | yes | yes | yes | OK |
| `https://dokumenty82.ru/raschet-nalogovoy-nagruzki/` | `200` | no | yes | yes | yes | OK |
| `https://dokumenty82.ru/nds-pri-usn-2026/` | `200` | no | yes | yes | yes | OK |

Summary: `30/30` sitemap URLs passed YandexBot HTTP, noindex, canonical, title
and H1 checks.

## Remaining Yandex-side Waiting Items

- Yandex Webmaster recommendation status must refresh from `checking site`.
- Yandex crawler/cache may need several days to remove the stale favicon warning.
- No site-side favicon, metadata, robots or sitemap blocker is observed in this
  monitoring pass.

## Owner Manual Actions

- Favicon recommendation recheck has been submitted in Yandex Webmaster.
- Wait for the Yandex Webmaster status update.
- If the recommendation is still present after 72 hours, request recrawl of the
  home page again.
- Do not start paid traffic only because the favicon is technically fixed; paid
  traffic gates remain `HOLD`.

## Verdict

`YANDEX_RECHECK_PENDING_SITE_TECHNICALLY_OK`

The site-side favicon implementation is technically OK for both regular browser
and YandexBot-compatible requests. The remaining work is to wait for Yandex
Webmaster to finish the submitted recheck and refresh cached recommendation
state.

## Next Recommended Task

Re-check Yandex Webmaster after the crawler/cache delay. If the favicon warning
is cleared, record `YANDEX_FAVICON_RECHECK_PASSED`. If it remains after 72
hours while the technical checks still pass, request a home page recrawl and
record `YANDEX_FAVICON_STILL_FAILING_SITE_TECHNICALLY_OK`.
