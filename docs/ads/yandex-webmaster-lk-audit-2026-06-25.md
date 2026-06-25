# Yandex Webmaster LK audit - 2026-06-25

Project: `dokumenty82.ru` / `Документы для бизнеса`

Scope: Yandex Webmaster readiness and safe SEO/indexing cleanup for active paid traffic.

Verdict: `READY_FOR_OBSERVATION_WITH_ROBOTS_CLEAN_PARAM_FIX`

Score: `9/10` after this PR is merged and deployed. Current live score stays `8.5/10` until the updated `robots.txt` is visible on production.

## LK status

- Diagnostics/checklist: no critical errors or recommendations shown in Yandex Webmaster.
- Sitemap: `https://dokumenty82.ru/sitemap.xml`, status `ok`, last loaded `2026-06-21 18:31`, `30` links.
- Site structure: root shows `30` loaded URLs and `29` URLs in search.
- Pages in search: key pages are canonical and indexable; Webmaster shows `29` added and `0` removed.
- Reindexing: previously submitted sitemap URLs are processed/tracked; no mass resubmission is needed.
- Crawl history: YandexBot sees paid-click URLs with long `?etext=...` parameters returning `200`.

## Change made

`robots.txt` now includes `etext` in `Clean-param`:

```text
Clean-param: utm_source&utm_medium&utm_campaign&utm_content&utm_term&utm_id&utm_referrer&yclid&ysclid&from&gclid&fbclid&etext
```

This keeps ad-click technical parameters from polluting crawl/indexing views while preserving page access, canonical URLs, sitemap and Metrika behavior.

## What was not changed

- Paid traffic was not enabled, paused, expanded or repriced.
- Forms/CRM were not enabled.
- Yandex Metrika counter `109869928` was not changed.
- Sitemap URL set was not changed.
- Page copy, legal promises, prices, reviews, ratings and service scope were not changed.
- Webmaster URLs were not mass-resubmitted.

## Webmaster actions

No immediate LK mutation is required.

After this PR is deployed:

1. Open Yandex Webmaster robots.txt analysis for `https://dokumenty82.ru/robots.txt`.
2. Confirm the fetched production file contains `&etext` in `Clean-param`.
3. Keep sitemap in observation mode; do not delete/re-add it while status remains `ok`.
4. Monitor crawl history for `?etext=...` URLs over the next 1-3 crawl cycles.

## Landing status

Allowed for ongoing ads/Webmaster monitoring:

- `/`
- `/razbor-situacii/`
- `/kontakty/`
- `/otchetnost/`
- `/otvet-na-trebovanie-ifns/`
- `/bank-i-115-fz/`
- `/otvet-na-zapros-banka/`
- `/dokumenty-dlya-banka-115-fz/`
- `/registraciya-ip/`
- `/registraciya-ooo/`

Do not use as ad landings:

- `/policy/`
- `/faq/`
- `/blog/*`
- `/internal/*`

Watch/legal-sensitive:

- `/yuridicheskiy-adres-simferopol/`
- `/nedostovernost-yuridicheskogo-adresa/`
- tax-sensitive pages unless copy remains fact-based and without result guarantees.

## Post-deploy smoke check

```bash
curl -fsSL https://dokumenty82.ru/robots.txt | grep 'Clean-param:.*etext'
curl -fsSI https://dokumenty82.ru/sitemap.xml
curl -fsSI https://dokumenty82.ru/favicon.svg
curl -fsSI https://dokumenty82.ru/favicon.ico
curl -fsSI https://dokumenty82.ru/non-existing-check-20260625/
```

Expected:

- `robots.txt` includes `etext`.
- `sitemap.xml` returns `200`.
- `favicon.svg` and `favicon.ico` return `200`.
- unknown URL returns `404`.

## Sources

- Yandex Webmaster sitemap guidance: https://yandex.ru/support/webmaster/ru/indexing-options/sitemap
- Yandex Webmaster indexing recommendations: https://yandex.ru/support/webmaster/ru/recommendations/indexing
- Yandex Webmaster reindexing guidance: https://yandex.ru/support/webmaster/ru/robot-workings/site-reindex
- Yandex Webmaster service data update notes: https://yandex.ru/support/webmaster/ru/service/site-indexing
