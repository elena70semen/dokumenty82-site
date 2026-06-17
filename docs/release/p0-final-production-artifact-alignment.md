# P0-FINAL Production Artifact Alignment

Date: `2026-06-17`
Repository: `elena70semen/dokumenty82-site`
Production host: `https://dokumenty82.ru/`

## Scope

Align production with a verified GitHub Actions artifact while strict `main` Actions artifact visibility remains blocked by GitHub authentication / 2FA / private repository access.

This report does not claim that production was aligned to a strict `main` CI artifact. It records production alignment to a verified PR CI artifact and proves that the later `main` delta is documentation-only and does not affect static export inputs.

No SEO copy rewrite, route expansion, visual redesign, new service pages, blog/news opening, paid traffic, CRM/forms/upload activation, Telegram/MAX activation, external profile publication, prices, deadlines, guarantees, reviews, ratings, legal identifiers, office/floor/hours or server architecture changes were made in this step.

## Inputs

| Input | Value |
| --- | --- |
| PR | `#32` |
| PR URL | `https://github.com/elena70semen/dokumenty82-site/pull/32` |
| PR merge SHA | `e775973ee2d93afd17c7a1739bff4bc27a73fd8a` |
| Current `main` SHA | `beac3f0627c373878829564ac91c357eea22ccca` |
| Verified PR CI run ID | `27624125051` |
| PR head SHA | `1d725ee044b261a2375ff59f2074f478143b8bae` |
| PR test merge SHA in artifact names | `21ce176b09893b3a35aa852e1639730ec97cd792` |
| Static export artifact | `dokumenty82-static-export-21ce176b09893b3a35aa852e1639730ec97cd792` |
| Static export artifact ID | `7669651784` |
| Static export artifact digest | `sha256:c001c45d1075f60cb80ce45673e08a5585eb66d3d2127eb882841855f99b6a02` |
| Release proof artifact | `dokumenty82-release-proof-21ce176b09893b3a35aa852e1639730ec97cd792` |
| Release proof artifact ID | `7669652382` |
| Release proof artifact digest | `sha256:7dba4642ec92002f09cd055a68c8869da1510421b2d39d6e1a35d8a7945d0a47` |

## Why PR Artifact Was Used

The strict `main` push artifact was not visible through the available authenticated tooling after PR #32 was merged. GitHub CLI authentication was blocked by the owner-side 2FA flow, and the GitHub connector workflow-run lookup exposed the PR-triggered run but did not expose the `main` push artifact.

To avoid another manual production state, production was aligned to the already verified PR CI static export artifact from run `27624125051`.

This is intentionally recorded as a verified PR artifact deploy, not as a strict `main` CI artifact deploy.

## Main Actions Blocker

Observed blocker:

- `gh` was installed but not authenticated.
- GitHub authentication was blocked by owner-side 2FA / phone app flow.
- Private repository Actions artifacts were not accessible through unauthenticated public API.
- Connector access was sufficient for PR artifact download, but not sufficient to prove the strict `main` push artifact.

Remaining governance blocker:

```text
GitHub main Actions auth/artifact visibility remains unresolved.
```

This blocker no longer blocks production alignment because production now byte-matches the verified PR CI artifact and the `main` delta is docs-only.

## Main Docs-Only Delta Proof

Comparison range:

```text
e775973ee2d93afd17c7a1739bff4bc27a73fd8a..beac3f0627c373878829564ac91c357eea22ccca
```

Changed files after the PR merge:

| Path | Build-affecting |
| --- | --- |
| `docs/release/p0-final-production-artifact-alignment.md` | no |

No files changed under:

- `app/`
- `components/`
- `lib/`
- `public/`
- `scripts/`
- `.github/workflows/`
- `package.json`
- `package-lock.json`
- `next.config.ts`

Conclusion:

```text
MAIN_DELTA_DOCS_ONLY
```

The current `main` differs from the verified PR artifact source only by release documentation updates that do not affect the static export.

## Verified PR Artifact

Release manifest from the release-proof artifact:

| Field | Value |
| --- | --- |
| `schemaVersion` | `p0-01.release-artifact-manifest.v1` |
| `commitSha` | `21ce176b09893b3a35aa852e1639730ec97cd792` |
| `generatedAt` | `2026-06-16T14:18:01.062Z` |
| `nodeVersion` | `v22.22.3` |
| `htmlFileCount` | `39` |
| `assetFileCount` | `316` |
| `sitemapExists` | `true` |
| `robotsExists` | `true` |

Artifact verification:

| Check | Result |
| --- | --- |
| Release manifest exists | PASS |
| Manifest commit SHA equals artifact SHA | PASS |
| Manifest Node version is Node 22.x | PASS |
| Internal manifest checksums match extracted artifact | PASS |
| Required key route files exist | PASS |
| `.env` files found | none |
| Secret/token/private-key patterns found | none |
| Sensitive key files found | none |
| Client document / personal data filenames found | none |
| Extracted artifact file count | `355` |

## Deploy Record

Production release status:

| Field | Value |
| --- | --- |
| Deploy status | deployed and re-verified |
| Production release ID | `20260616-2048-pr21ce176b` |
| Previous rollback release ID observed before switch | `20260615-202454` |
| Deploy source | verified PR static export artifact |
| Nginx config test | PASS |
| Current server release check | current release is `20260616-2048-pr21ce176b` |

No server access details are recorded in this repository.

## Post-Deploy Smoke Check

Post-deploy smoke check was repeated on `2026-06-17T08:03:52.248Z`.

| URL | Status | Final URL | Title | Canonical | Robots | Noindex | H1 | Phone | Policy | Stub |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| https://dokumenty82.ru/ | 200 | https://dokumenty82.ru/ | Документы для бизнеса — подготовка документов в Симферополе | https://dokumenty82.ru/ | index, follow | no | Документы для бизнеса в Симферополе | yes | yes | no |
| https://dokumenty82.ru/robots.txt | 200 | https://dokumenty82.ru/robots.txt | N/A | N/A | N/A | no | N/A | n/a | n/a | no |
| https://dokumenty82.ru/sitemap.xml | 200 | https://dokumenty82.ru/sitemap.xml | N/A | N/A | N/A | no | N/A | n/a | yes | no |
| https://dokumenty82.ru/razbor-situacii/ | 200 | https://dokumenty82.ru/razbor-situacii/ | Разбор ситуации по документам бизнеса в Симферополе \| Документы для бизнеса | https://dokumenty82.ru/razbor-situacii/ | index, follow | no | Разберём ситуацию и подскажем документальный маршрут | yes | yes | no |
| https://dokumenty82.ru/kontakty/ | 200 | https://dokumenty82.ru/kontakty/ | Контакты — Документы для бизнеса в Симферополе \| Документы для бизнеса | https://dokumenty82.ru/kontakty/ | index, follow | no | Контакты и передача документов | yes | yes | no |
| https://dokumenty82.ru/policy/ | 200 | https://dokumenty82.ru/policy/ | Политика конфиденциальности \| Документы для бизнеса | https://dokumenty82.ru/policy/ | index, follow | no | Политика конфиденциальности и обработки данных | yes | yes | no |
| https://dokumenty82.ru/otchetnost/ | 200 | https://dokumenty82.ru/otchetnost/ | Отчётность и налоговые документы в Симферополе \| Документы для бизнеса | https://dokumenty82.ru/otchetnost/ | index, follow | no | Отчётность и налоговые документы | yes | yes | no |
| https://dokumenty82.ru/bank-i-115-fz/ | 200 | https://dokumenty82.ru/bank-i-115-fz/ | Документы для банка и запросов по 115-ФЗ в Симферополе \| Документы для бизнеса | https://dokumenty82.ru/bank-i-115-fz/ | index, follow | no | Документы для банка и запросов по 115-ФЗ | yes | yes | no |
| https://dokumenty82.ru/otvet-na-trebovanie-ifns/ | 200 | https://dokumenty82.ru/otvet-na-trebovanie-ifns/ | Ответ на требование ИФНС \| Документы для бизнеса | https://dokumenty82.ru/otvet-na-trebovanie-ifns/ | index, follow | no | Ответ на требование ИФНС | yes | yes | no |
| https://dokumenty82.ru/deklaraciya-usn/ | 200 | https://dokumenty82.ru/deklaraciya-usn/ | Декларация УСН в Симферополе \| Документы для бизнеса | https://dokumenty82.ru/deklaraciya-usn/ | index, follow | no | Декларация УСН в Симферополе | yes | yes | no |
| https://dokumenty82.ru/otvet-na-zapros-banka/ | 200 | https://dokumenty82.ru/otvet-na-zapros-banka/ | Ответ на запрос банка \| Документы для бизнеса | https://dokumenty82.ru/otvet-na-zapros-banka/ | index, follow | no | Ответ на запрос банка | yes | yes | no |
| https://dokumenty82.ru/dokumenty-dlya-banka-115-fz/ | 200 | https://dokumenty82.ru/dokumenty-dlya-banka-115-fz/ | Документы для банка по 115-ФЗ \| Документы для бизнеса | https://dokumenty82.ru/dokumenty-dlya-banka-115-fz/ | index, follow | no | Документы для банка по 115-ФЗ | yes | yes | no |
| https://dokumenty82.ru/registraciya-ooo/ | 200 | https://dokumenty82.ru/registraciya-ooo/ | Регистрация ООО в Симферополе \| Документы для бизнеса | https://dokumenty82.ru/registraciya-ooo/ | index, follow | no | Регистрация ООО в Симферополе | yes | yes | no |
| https://dokumenty82.ru/registraciya-ip/ | 200 | https://dokumenty82.ru/registraciya-ip/ | Регистрация ИП в Симферополе \| Документы для бизнеса | https://dokumenty82.ru/registraciya-ip/ | index, follow | no | Регистрация ИП в Симферополе | yes | yes | no |

Smoke result:

```text
allFetched: true
technicalStub: false
```

## Production Checksum Compare

Production body checksums were compared to the verified PR static export artifact.

| URL | Artifact path | Artifact sha256 | Production sha256 | Bytes | Match |
| --- | --- | --- | --- | --- | --- |
| https://dokumenty82.ru/ | index.html | 0153b4cec898fb66c51b187398c50d07f0c02b6d04dd53fe8046106c2c97373f | 0153b4cec898fb66c51b187398c50d07f0c02b6d04dd53fe8046106c2c97373f | 183694/183694 | yes |
| https://dokumenty82.ru/robots.txt | robots.txt | 7c4906a7b2eae9b26eba28a9d15656657a1c230a2886cb95d579e0127b4d37c5 | 7c4906a7b2eae9b26eba28a9d15656657a1c230a2886cb95d579e0127b4d37c5 | 459/459 | yes |
| https://dokumenty82.ru/sitemap.xml | sitemap.xml | d6281b59c6561d1132819225ab71b794099548ed534891eec606cbb7c778b231 | d6281b59c6561d1132819225ab71b794099548ed534891eec606cbb7c778b231 | 4981/4981 | yes |
| https://dokumenty82.ru/razbor-situacii/ | razbor-situacii/index.html | 25c488655ae677bf68d9d104562fdc5cd72cf4249710b06ef3d11870c8a2dbe6 | 25c488655ae677bf68d9d104562fdc5cd72cf4249710b06ef3d11870c8a2dbe6 | 142503/142503 | yes |
| https://dokumenty82.ru/kontakty/ | kontakty/index.html | 2c5a360e3c36b3a1f504653800412ddb75c4bde30778a98396e33fed03d79f95 | 2c5a360e3c36b3a1f504653800412ddb75c4bde30778a98396e33fed03d79f95 | 141159/141159 | yes |
| https://dokumenty82.ru/policy/ | policy/index.html | 562d417c212d2fa45c55feebb3cdec346116eaef1bf17cb1730853e00bed1559 | 562d417c212d2fa45c55feebb3cdec346116eaef1bf17cb1730853e00bed1559 | 60627/60627 | yes |
| https://dokumenty82.ru/otchetnost/ | otchetnost/index.html | e0979414f4297617ec11c0d6e4697bea4b4e56880adbfab188c80159ba1078d2 | e0979414f4297617ec11c0d6e4697bea4b4e56880adbfab188c80159ba1078d2 | 150211/150211 | yes |
| https://dokumenty82.ru/bank-i-115-fz/ | bank-i-115-fz/index.html | b06a80a76b76553d757b554b7419ea2dc801e48278c96cedaf8c199aba03a0bd | b06a80a76b76553d757b554b7419ea2dc801e48278c96cedaf8c199aba03a0bd | 134213/134213 | yes |
| https://dokumenty82.ru/otvet-na-trebovanie-ifns/ | otvet-na-trebovanie-ifns/index.html | df694b33fda70c9ef3b937c7253b281c68f16d22218988cf71882a5362d1c710 | df694b33fda70c9ef3b937c7253b281c68f16d22218988cf71882a5362d1c710 | 58464/58464 | yes |
| https://dokumenty82.ru/deklaraciya-usn/ | deklaraciya-usn/index.html | fc7c9c753ceaafffa1146599cc1679d15e53d8f73b09c90b4c4c84633a0b540e | fc7c9c753ceaafffa1146599cc1679d15e53d8f73b09c90b4c4c84633a0b540e | 57881/57881 | yes |
| https://dokumenty82.ru/otvet-na-zapros-banka/ | otvet-na-zapros-banka/index.html | ffe8b062af69e6ca71543717a3c2b3146b7fbb965c922a79f3f3781579d026e9 | ffe8b062af69e6ca71543717a3c2b3146b7fbb965c922a79f3f3781579d026e9 | 57899/57899 | yes |
| https://dokumenty82.ru/dokumenty-dlya-banka-115-fz/ | dokumenty-dlya-banka-115-fz/index.html | 4ab83e402d19f8ba1d7e2433082aca73c6bc312634824938cfb9106fd3e93176 | 4ab83e402d19f8ba1d7e2433082aca73c6bc312634824938cfb9106fd3e93176 | 58117/58117 | yes |
| https://dokumenty82.ru/registraciya-ooo/ | registraciya-ooo/index.html | 7e758fac03d351f20cd8dc4d381cf7f47c41afec683f6c785e8d678f1023c6ed | 7e758fac03d351f20cd8dc4d381cf7f47c41afec683f6c785e8d678f1023c6ed | 49565/49565 | yes |
| https://dokumenty82.ru/registraciya-ip/ | registraciya-ip/index.html | 79969fc1b229b032dcb629ea331fa4150ee0b1ee5588845329718f7c3e650e4c | 79969fc1b229b032dcb629ea331fa4150ee0b1ee5588845329718f7c3e650e4c | 49073/49073 | yes |

Checksum result:

```text
allMatched: true
mismatches: 0
```

## Final Verdict

`PRODUCTION_ALIGNED_TO_VERIFIED_PR_ARTIFACT_WITH_MAIN_DOCS_ONLY_DELTA`

## Remaining HOLD

- CRM.
- Live forms.
- Upload.
- Paid traffic.
- Messaging links.
- Local profiles.
- Cookie/legal decision.
- Rollback drill.
- Owner/legal acceptance.
- GitHub main Actions auth/artifact visibility.

## Next Recommended Task

Recommended next task:

1. Keep production as aligned to the verified PR CI artifact.
2. Resolve GitHub main Actions authentication / artifact visibility separately.
3. If strict `main` artifact governance is still required, download the future `main` static export and release-proof artifacts, compare them with current production, and record whether a redeploy is needed.
4. Keep all HOLD areas closed until separate owner/legal acceptance.
