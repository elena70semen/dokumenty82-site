# P0-01 Production Verification

Date checked: 2026-06-15
Production host: `https://dokumenty82.ru/`
Observed production mode: `PUBLIC_LIVE`
Production verdict: `PUBLIC_LIVE_WITH_GOVERNANCE_DRIFT`

## Method

Checked production with HTTP requests and rendered HTML/head extraction. Server-side stack proof was checked separately through a short `tmux`-backed server verification session without recording credentials.

## Production Stack Observation

- Current release observed: `20260615-202454`.
- Nginx status: active.
- Caddy status: inactive.
- UDP/443 listener: none observed.
- HTTP/3/QUIC config: none observed with `listen ... quic`, `http3` or `alt-svc` search.
- Home page response: `HTTP/2 200`, `server: nginx/1.24.0 (Ubuntu)`.

This proves a static production artifact is live, but it does not prove that the deployed artifact came from a GitHub Actions artifact.

## URL Verification

| URL | Status | Title | Canonical | Robots meta | Noindex | H1 | NAP visible | Phone link | Policy link | Technical stub |
| --- | ---: | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `/` | 200 | `Документы для бизнеса — подготовка документов в Симферополе` | `https://dokumenty82.ru/` | `index, follow` | no | `Документы для бизнеса в Симферополе` | yes | yes | yes | no |
| `/robots.txt` | 200 | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | no |
| `/sitemap.xml` | 200 | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | no |
| `/razbor-situacii/` | 200 | `Разбор ситуации по документам бизнеса в Симферополе` | `https://dokumenty82.ru/razbor-situacii/` | `index, follow` | no | `Разберём ситуацию и подскажем документальный маршрут` | yes | yes | yes | no |
| `/otchetnost/` | 200 | `Отчётность и налоговые документы в Симферополе` | `https://dokumenty82.ru/otchetnost/` | `index, follow` | no | `Отчётность и налоговые документы` | yes | yes | yes | no |
| `/bank-i-115-fz/` | 200 | `Документы для банка и запросов по 115-ФЗ в Симферополе` | `https://dokumenty82.ru/bank-i-115-fz/` | `index, follow` | no | `Документы для банка и запросов по 115-ФЗ` | yes | yes | yes | no |
| `/kontakty/` | 200 | `Контакты — Документы для бизнеса в Симферополе` | `https://dokumenty82.ru/kontakty/` | `index, follow` | no | `Контакты и передача документов` | yes | yes | yes | no |
| `/policy` | 200 | `Политика конфиденциальности` | `https://dokumenty82.ru/policy` | `index, follow` | no | `Политика конфиденциальности и обработки данных` | yes | yes | self | no |
| `/otvet-na-trebovanie-ifns/` | 200 | `Ответ на требование ИФНС` | `https://dokumenty82.ru/otvet-na-trebovanie-ifns/` | `index, follow` | no | `Ответ на требование ИФНС` | yes | yes | yes | no |
| `/deklaraciya-usn/` | 200 | `Декларация УСН в Симферополе` | `https://dokumenty82.ru/deklaraciya-usn/` | `index, follow` | no | `Декларация УСН в Симферополе` | yes | yes | yes | no |
| `/otvet-na-zapros-banka/` | 200 | `Ответ на запрос банка` | `https://dokumenty82.ru/otvet-na-zapros-banka/` | `index, follow` | no | `Ответ на запрос банка` | yes | yes | yes | no |
| `/dokumenty-dlya-banka-115-fz/` | 200 | `Документы для банка по 115-ФЗ` | `https://dokumenty82.ru/dokumenty-dlya-banka-115-fz/` | `index, follow` | no | `Документы для банка по 115-ФЗ` | yes | yes | yes | no |
| `/yuridicheskiy-adres-simferopol/` | 200 | `Юридический адрес в Симферополе` | `https://dokumenty82.ru/yuridicheskiy-adres-simferopol/` | `index, follow` | no | `Юридический адрес в Симферополе` | yes | yes | yes | no |
| `/registraciya-ooo/` | 200 | `Регистрация ООО в Симферополе` | `https://dokumenty82.ru/registraciya-ooo/` | `index, follow` | no | `Регистрация ООО в Симферополе` | yes | yes | yes | no |
| `/registraciya-ip/` | 200 | `Регистрация ИП в Симферополе` | `https://dokumenty82.ru/registraciya-ip/` | `index, follow` | no | `Регистрация ИП в Симферополе` | yes | yes | yes | no |

## Robots And Sitemap

`robots.txt` observed:

- `Allow: /`
- `Disallow: /internal/`
- `Host: dokumenty82.ru`
- `Sitemap: https://dokumenty82.ru/sitemap.xml`
- no full-site `Disallow: /`

`sitemap.xml` observed:

- HTTP status: `200`
- static XML served from production
- 30 canonical public URLs in repository source
- blog/news/FAQ/internal routes excluded from sitemap

## NAP Check

Production HTML includes:

- brand: `Документы для бизнеса`
- phone: `+7 (978) 998-72-22`
- phone href: `tel:+79789987222`
- address marker: `Мате Залки`

Public email was not observed in checked HTML. This preserves the source-of-truth status where `info@dokumenty82.ru` is TARGET until domain mail is confirmed.

## Technical Stub Check

No checked production URL contained the old markers:

- `Business Help`
- `technical launch`

Observed production is not a technical launch placeholder.

## Production Verdict

`PUBLIC_LIVE_WITH_GOVERNANCE_DRIFT`

Reason: production is live and indexable, but source-of-truth launch gates, CI artifact traceability, legal/privacy analytics evidence and rollback drill proof are not fully synchronized.
