# P0-07 P0-06 Production Deploy

## Scope

Merge PR #33 and deploy the verified P0-06 cookie/Metrica/no-PII static export to production.

This step did not change SEO copy, routes, design, live forms, CRM, upload, paid traffic, messaging links, local profiles, prices, guarantees, deadlines, reviews, ratings, legal identifiers or office/floor/hours.

No server IPs, SSH connection strings, usernames, passwords, key paths or provider panel details are recorded in this repository.

## Inputs

| Item | Value |
| --- | --- |
| Repository | `elena70semen/dokumenty82-site` |
| PR | `#33` |
| PR URL | `https://github.com/elena70semen/dokumenty82-site/pull/33` |
| PR head SHA | `abb39a9d6a3c89197421cfd4e7041d7cef91246a` |
| PR test merge SHA in artifact names | `c2d6324e9aac1e295ed38132a6ffaf4c21c80ffe` |
| PR Site CI run | `27684171699` |
| P0-06 verdict | `PUBLIC_LIVE_METRICA_NO_PII_WITH_COOKIE_NOTICE_OWNER_LEGAL_REVIEW_REQUIRED` |

Pre-merge checks confirmed PR #33 was open, draft, mergeable and limited to P0-06 scope: cookie notice, policy analytics/cookies disclosure, `cookieNoticeEnabled=true`, no-PII tracking guards, owner/legal/privacy evidence and CI/finalization alignment, plus removal of the footer Yandex rating badge because ratings remain HOLD.

Closed gates remained closed: CRM, live forms, `crmSuccessEnabled`, upload, paid traffic, messaging, local profiles, map publication, prices, guarantees, reviews/ratings and legal IDs/hours.

## PR #33 Merge

| Item | Value |
| --- | --- |
| Draft transition | Marked ready for review |
| Merge method | Merge commit |
| Merge SHA | `a4c075027cc893599c49b55467080e0f9f5c5469` |
| New main SHA after merge | `a4c075027cc893599c49b55467080e0f9f5c5469` |
| Merge timestamp | `2026-06-17T13:02:53Z` |
| Local timestamp captured | `2026-06-17T16:03:24+03:00` |

Main push Actions artifact was not visible through the available tooling after merge. The GitHub connector exposed the PR-triggered run and artifacts but not the strict `main` push artifact; unauthenticated GitHub REST returned private-repo `404`.

Fallback basis:

- PR #33 CI run `27684171699` completed successfully.
- The PR static export and release-proof artifacts were visible and downloadable.
- The local merge commit tree matched the PR head tree exactly:
  - PR head tree: `a8a786d69e68d61d59784dbfe72503975d8ce394`
  - Merge commit tree: `a8a786d69e68d61d59784dbfe72503975d8ce394`
- The diff from PR head to merge SHA was empty.

This report therefore does not claim a strict `main` artifact deploy. It records production alignment to the verified PR CI artifact, with zero build-affecting delta at merge time and only release documentation delta after this report commit.

## Artifact Used

| Artifact | Status | ID | Digest |
| --- | --- | --- | --- |
| `dokumenty82-static-export-c2d6324e9aac1e295ed38132a6ffaf4c21c80ffe` | Downloaded and extracted | `7693393524` | `sha256:5253fe296c3f1730f2bd789cdfdc1318540b542a723f68e189384b6c2c141d0b` |
| `dokumenty82-release-proof-c2d6324e9aac1e295ed38132a6ffaf4c21c80ffe` | Downloaded and extracted | `7693393953` | `sha256:f0c657d7bcab6d42f491f5bdd8a0998f6a2b7636047865ad35e6e0afe67d494d` |

Release manifest:

| Field | Value |
| --- | --- |
| `schemaVersion` | `p0-01.release-artifact-manifest.v1` |
| `commitSha` | `c2d6324e9aac1e295ed38132a6ffaf4c21c80ffe` |
| `nodeVersion` | `v22.22.3` |
| `htmlFileCount` | `39` |
| `assetFileCount` | `316` |
| `robotsExists` | `true` |
| `sitemapExists` | `true` |
| `generatedAt` | `2026-06-17T11:00:48.530Z` |

Artifact scan:

| Check | Result |
| --- | --- |
| `index.html` | PASS |
| `robots.txt` | PASS |
| `sitemap.xml` | PASS |
| Key route HTML files | PASS |
| Forbidden filenames such as `.env`, private keys, SSH keys, client docs or PII-like files | PASS |
| Secret-like token/webhook scan | PASS |

## Deploy Record

| Item | Value |
| --- | --- |
| Previous production release ID | `20260616-2048-pr21ce176b` |
| New production release ID | `20260617-1608-p0-06-c2d6324` |
| Deploy source | Verified PR static export artifact |
| Release proof source | Verified PR release-proof artifact |
| Deploy status | Deployed |
| Nginx config test | PASS |
| Production release pointer after deploy | `20260617-1608-p0-06-c2d6324` |

The deploy was executed through a persistent server-side terminal session so an SSH disconnect would not interrupt the release switch. No server access details are recorded here.

## Post-Deploy Smoke Check

Production smoke check was run on `2026-06-18T09:05:01Z`.

| Route | Status | Final URL | Title | Canonical | Robots | Noindex | H1 | Phone | Policy | Technical stub |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `/` | `200` | `https://dokumenty82.ru/` | `Документы для бизнеса — подготовка документов в Симферополе` | `https://dokumenty82.ru/` | `index, follow` | no | `Документы для бизнеса в Симферополе` | yes | yes | no |
| `/robots.txt` | `200` | `https://dokumenty82.ru/robots.txt` | `N/A` | `N/A` | `N/A` | no | `N/A` | n/a | n/a | no |
| `/sitemap.xml` | `200` | `https://dokumenty82.ru/sitemap.xml` | `N/A` | `N/A` | `N/A` | no | `N/A` | n/a | n/a | no |
| `/razbor-situacii/` | `200` | `https://dokumenty82.ru/razbor-situacii/` | `Разбор ситуации по документам бизнеса в Симферополе | Документы для бизнеса` | `https://dokumenty82.ru/razbor-situacii/` | `index, follow` | no | `Разберём ситуацию и подскажем документальный маршрут` | yes | yes | no |
| `/kontakty/` | `200` | `https://dokumenty82.ru/kontakty/` | `Контакты — Документы для бизнеса в Симферополе | Документы для бизнеса` | `https://dokumenty82.ru/kontakty/` | `index, follow` | no | `Контакты и передача документов` | yes | yes | no |
| `/policy/` | `200` | `https://dokumenty82.ru/policy/` | `Политика конфиденциальности | Документы для бизнеса` | `https://dokumenty82.ru/policy/` | `index, follow` | no | `Политика конфиденциальности и обработки данных` | yes | self | no |
| `/otchetnost/` | `200` | `https://dokumenty82.ru/otchetnost/` | `Отчётность и налоговые документы в Симферополе | Документы для бизнеса` | `https://dokumenty82.ru/otchetnost/` | `index, follow` | no | `Отчётность и налоговые документы` | yes | yes | no |
| `/bank-i-115-fz/` | `200` | `https://dokumenty82.ru/bank-i-115-fz/` | `Документы для банка и запросов по 115-ФЗ в Симферополе | Документы для бизнеса` | `https://dokumenty82.ru/bank-i-115-fz/` | `index, follow` | no | `Документы для банка и запросов по 115-ФЗ` | yes | yes | no |
| `/otvet-na-trebovanie-ifns/` | `200` | `https://dokumenty82.ru/otvet-na-trebovanie-ifns/` | `Ответ на требование ИФНС | Документы для бизнеса` | `https://dokumenty82.ru/otvet-na-trebovanie-ifns/` | `index, follow` | no | `Ответ на требование ИФНС` | yes | yes | no |
| `/deklaraciya-usn/` | `200` | `https://dokumenty82.ru/deklaraciya-usn/` | `Декларация УСН в Симферополе | Документы для бизнеса` | `https://dokumenty82.ru/deklaraciya-usn/` | `index, follow` | no | `Декларация УСН в Симферополе` | yes | yes | no |
| `/otvet-na-zapros-banka/` | `200` | `https://dokumenty82.ru/otvet-na-zapros-banka/` | `Ответ на запрос банка | Документы для бизнеса` | `https://dokumenty82.ru/otvet-na-zapros-banka/` | `index, follow` | no | `Ответ на запрос банка` | yes | yes | no |
| `/dokumenty-dlya-banka-115-fz/` | `200` | `https://dokumenty82.ru/dokumenty-dlya-banka-115-fz/` | `Документы для банка по 115-ФЗ | Документы для бизнеса` | `https://dokumenty82.ru/dokumenty-dlya-banka-115-fz/` | `index, follow` | no | `Документы для банка по 115-ФЗ` | yes | yes | no |
| `/registraciya-ooo/` | `200` | `https://dokumenty82.ru/registraciya-ooo/` | `Регистрация ООО в Симферополе | Документы для бизнеса` | `https://dokumenty82.ru/registraciya-ooo/` | `index, follow` | no | `Регистрация ООО в Симферополе` | yes | yes | no |
| `/registraciya-ip/` | `200` | `https://dokumenty82.ru/registraciya-ip/` | `Регистрация ИП в Симферополе | Документы для бизнеса` | `https://dokumenty82.ru/registraciya-ip/` | `index, follow` | no | `Регистрация ИП в Симферополе` | yes | yes | no |

## Cookie Notice Production Check

Production check run on `2026-06-18T09:10:53Z`.

| Check | Result |
| --- | --- |
| Cookie notice marker: `<aside role="status" aria-label="Уведомление об аналитике и cookies">` | PASS |
| Cookie notice text exists | PASS |
| `/policy/` link exists | PASS |
| `Понятно` button exists | PASS |

## Policy Disclosure Production Check

| Check | Result |
| --- | --- |
| `/policy/` contains `Аналитика, cookies и технические события` | PASS |
| Policy states click events are intent/action signals, not confirmed leads or accepted applications | PASS |
| Policy states `goal_form_submit_success` is disabled until backend/CRM acceptance | PASS |
| Policy states public document upload is absent | PASS |

## Tracking No-PII Production Guard

| Check | Result |
| --- | --- |
| Footer Yandex rating badge absent | PASS |
| Public reviews/ratings block absent | PASS |
| `data-forms-live="true"` absent | PASS |
| Live POST/action forms absent | PASS |
| Public upload input absent | PASS |
| CRM/webhook endpoint patterns absent from runtime artifact | PASS |
| `goal_form_submit_success` absent from runtime event layer | PASS |

Static placeholder forms exist on some document-heavy pages, but they are closed placeholders: no `data-forms-live="true"`, no POST/action endpoint and no file input.

## Checksum Compare

Production body checksums were compared against the deployed verified PR static export artifact. All requested routes matched byte-for-byte.

| Route | Artifact file | Match |
| --- | --- | --- |
| `/` | `index.html` | yes |
| `/robots.txt` | `robots.txt` | yes |
| `/sitemap.xml` | `sitemap.xml` | yes |
| `/razbor-situacii/` | `razbor-situacii/index.html` | yes |
| `/kontakty/` | `kontakty/index.html` | yes |
| `/policy/` | `policy/index.html` | yes |
| `/otchetnost/` | `otchetnost/index.html` | yes |
| `/bank-i-115-fz/` | `bank-i-115-fz/index.html` | yes |
| `/otvet-na-trebovanie-ifns/` | `otvet-na-trebovanie-ifns/index.html` | yes |
| `/deklaraciya-usn/` | `deklaraciya-usn/index.html` | yes |
| `/otvet-na-zapros-banka/` | `otvet-na-zapros-banka/index.html` | yes |
| `/dokumenty-dlya-banka-115-fz/` | `dokumenty-dlya-banka-115-fz/index.html` | yes |
| `/registraciya-ooo/` | `registraciya-ooo/index.html` | yes |
| `/registraciya-ip/` | `registraciya-ip/index.html` | yes |

## Final Verdict

`PRODUCTION_ALIGNED_TO_VERIFIED_PR_ARTIFACT_WITH_MAIN_DOCS_ONLY_DELTA_P0_06`

Production is aligned to the verified PR CI artifact from run `27684171699`. This is not recorded as a strict `main` CI artifact deploy because the strict main artifact was not visible through the available tooling.

## Remaining HOLD

- owner/legal acceptance
- final legal wording
- live forms
- CRM
- form success goals
- public upload
- paid traffic
- messaging links
- local profiles
- prices
- guarantees
- deadlines
- reviews
- ratings
- legal IDs
- office/floor/hours
- rollback drill, if a real rollback exercise is still required
- strict main Actions artifact visibility

## Next Recommended Task

Resolve strict `main` Actions artifact visibility for private-repository workflows or accept the verified-PR-artifact deployment model as the current production-governance pattern, then perform an owner-approved rollback drill if required.
