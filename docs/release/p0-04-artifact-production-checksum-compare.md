# P0-04 Artifact Production Checksum Compare

Date: `2026-06-16`
Repository: `elena70semen/dokumenty82-site`
Branch: `codex/p0-03-sync-p0-02-evidence`

## Scope

Verification only: download the CI artifacts from GitHub Actions run `27617184778`, inspect the release manifest, verify internal artifact checksums, fetch decoded live production HTTP bodies from `https://dokumenty82.ru/`, and compare production body checksums with the extracted static export artifact.

No PR merge, production deploy, production config change, SEO copy edit, route edit, design edit, forms/CRM activation, paid traffic, uploads, messaging links, local profiles, prices, guarantees, reviews, ratings, office hours, legal IDs, secrets or provider credentials were changed.

## Inputs

| Input | Value |
| --- | --- |
| PR number | `32` |
| PR URL | `https://github.com/elena70semen/dokumenty82-site/pull/32` |
| GitHub Actions run ID | `27617184778` |
| Run status | `completed / success` |
| Branch head SHA | `db279df0f895785d78725b8c7736e16a14960ba9` |
| Base main SHA | `6a3d390e7588e777454c2d2898b980d5244af543` |
| PR test merge SHA | `1b502ed59fe7add1181aaa28b095bc171bf82fd9` |
| Production host | `https://dokumenty82.ru/` |

Important SHA nuance: the branch head is `db279df0f895785d78725b8c7736e16a14960ba9`, while the artifact names and manifest commit use the GitHub pull-request test/merge SHA `1b502ed59fe7add1181aaa28b095bc171bf82fd9`.

## Artifact Download

| Artifact | Status | Artifact ID | Digest | Size |
| --- | --- | --- | --- | --- |
| `dokumenty82-static-export-1b502ed59fe7add1181aaa28b095bc171bf82fd9` | Downloaded and extracted | `7666623909` | `sha256:e09c2d394c6fab867261165a6e4951a09ee10d157e553d7de1b271ffac81a1b1` | `29915155` |
| `dokumenty82-release-proof-1b502ed59fe7add1181aaa28b095bc171bf82fd9` | Downloaded and extracted | `7666624442` | `sha256:36552157ffd18f018a32275c7dff01138d6e6be2c90bb752f3b9a0317cf4f476` | `1315` |

Extraction path used for local verification: `.tmp/p0-04/`.

Download verdict: artifacts downloaded successfully.

Forbidden file / credential scan:

- Forbidden filenames: PASS, no `.env`, private key, SSH key or secret-named files found in extracted static artifact.
- Strict credential token patterns: PASS, no OpenAI, GitHub, Slack, AWS, private-key block or webhook-token literals found.
- A broad generic word scan matched generated Next.js chunks containing terms such as `token`/`secret` in bundled framework code; this was reviewed as false positive noise, not credential material.

## Release Manifest Inspection

Manifest path inside release-proof artifact: `artifact-manifest.json`.

| Field | Value |
| --- | --- |
| `schemaVersion` | `p0-01.release-artifact-manifest.v1` |
| `commitSha` | `1b502ed59fe7add1181aaa28b095bc171bf82fd9` |
| `generatedAt` | `2026-06-16T12:23:24.156Z` |
| `nodeVersion` | `v22.22.3` |
| `packageName` | `dokumenty82` |
| `outDirExists` | `true` |
| `htmlFileCount` | `39` |
| `assetFileCount` | `316` |
| `sitemapExists` | `true` |
| `robotsExists` | `true` |
| Manifest commit equals branch head SHA | `false` |
| Manifest commit equals PR test merge SHA | `true` |
| Manifest commit equals artifact-name SHA | `true` |

Manifest verdict: valid and tied to the PR test/merge SHA, not to the branch head SHA.

## Artifact Internal Checksum Verification

| Item | Artifact path | Manifest sha256 | Extracted sha256 | Bytes | Match | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| important file | `index.html` | `8462f4294b4b9393dd3c4f512a35b82b9956e22832492d244bb0410d8b956c67` | `8462f4294b4b9393dd3c4f512a35b82b9956e22832492d244bb0410d8b956c67` | `183694/183694` | yes | OK |
| important file | `robots.txt` | `7c4906a7b2eae9b26eba28a9d15656657a1c230a2886cb95d579e0127b4d37c5` | `7c4906a7b2eae9b26eba28a9d15656657a1c230a2886cb95d579e0127b4d37c5` | `459/459` | yes | OK |
| important file | `sitemap.xml` | `d6281b59c6561d1132819225ab71b794099548ed534891eec606cbb7c778b231` | `d6281b59c6561d1132819225ab71b794099548ed534891eec606cbb7c778b231` | `4981/4981` | yes | OK |
| route `/` | `index.html` | `8462f4294b4b9393dd3c4f512a35b82b9956e22832492d244bb0410d8b956c67` | `8462f4294b4b9393dd3c4f512a35b82b9956e22832492d244bb0410d8b956c67` | `183694/183694` | yes | OK |
| route `/razbor-situacii/` | `razbor-situacii/index.html` | `f1d913396175444ada4c2cf4ffd53b8480f6d11ebc8a79f84f1eb384fbeaa68a` | `f1d913396175444ada4c2cf4ffd53b8480f6d11ebc8a79f84f1eb384fbeaa68a` | `142503/142503` | yes | OK |
| route `/kontakty/` | `kontakty/index.html` | `7678256fcf2480781af412ad4254bd40efc20e9e857c8bfb0bba4a78d0446db9` | `7678256fcf2480781af412ad4254bd40efc20e9e857c8bfb0bba4a78d0446db9` | `141159/141159` | yes | OK |
| route `/policy` | `policy/index.html` | `eed5e133da44bf5ded3c88ed97682267cd4a33cd97f4ae40f9eb2e773c0a9b1f` | `eed5e133da44bf5ded3c88ed97682267cd4a33cd97f4ae40f9eb2e773c0a9b1f` | `60627/60627` | yes | OK |
| route `/otchetnost/` | `otchetnost/index.html` | `d21d26a4536a56f1ef204527bfb05c023deffbc4df467102e05137ff5410c945` | `d21d26a4536a56f1ef204527bfb05c023deffbc4df467102e05137ff5410c945` | `150211/150211` | yes | OK |
| route `/bank-i-115-fz/` | `bank-i-115-fz/index.html` | `0a93f6b728b574b48cbd07953a04055ec8933ecdd3d0d28df131ec3049a679dc` | `0a93f6b728b574b48cbd07953a04055ec8933ecdd3d0d28df131ec3049a679dc` | `134213/134213` | yes | OK |
| route `/otvet-na-trebovanie-ifns/` | `otvet-na-trebovanie-ifns/index.html` | `4a13595156d8225bff3886d4e29d86e454cb576998b5501932c8bcc34a394f6d` | `4a13595156d8225bff3886d4e29d86e454cb576998b5501932c8bcc34a394f6d` | `58464/58464` | yes | OK |
| route `/deklaraciya-usn/` | `deklaraciya-usn/index.html` | `0eca5e4c213de8043d36c6d721bd83f3a2be754a17b92e3e50193b3ff7603b0c` | `0eca5e4c213de8043d36c6d721bd83f3a2be754a17b92e3e50193b3ff7603b0c` | `57881/57881` | yes | OK |
| route `/otvet-na-zapros-banka/` | `otvet-na-zapros-banka/index.html` | `56f784dc79de52db91c63beee0fa051c541efea38eec83bc874f6c39f20c9c54` | `56f784dc79de52db91c63beee0fa051c541efea38eec83bc874f6c39f20c9c54` | `57899/57899` | yes | OK |
| route `/dokumenty-dlya-banka-115-fz/` | `dokumenty-dlya-banka-115-fz/index.html` | `86bdf8a4f331253e1ccbdcaab061eacdd586a3c4c0f46022cbe3087c8c6ee640` | `86bdf8a4f331253e1ccbdcaab061eacdd586a3c4c0f46022cbe3087c8c6ee640` | `58117/58117` | yes | OK |
| route `/registraciya-ooo/` | `registraciya-ooo/index.html` | `dace0c6492cc90da45c48adf86ff8e894272adc12135897a2393035d61c60d7c` | `dace0c6492cc90da45c48adf86ff8e894272adc12135897a2393035d61c60d7c` | `49565/49565` | yes | OK |
| route `/registraciya-ip/` | `registraciya-ip/index.html` | `c5c437448d6f0564cb46751299e550fa588626dc44537ea72f3689e59d2c27c2` | `c5c437448d6f0564cb46751299e550fa588626dc44537ea72f3689e59d2c27c2` | `49073/49073` | yes | OK |

Internal checksum result: all manifest-listed important files and key routes matched the extracted static export artifact.

## Production HTTP Snapshot

Decoded production response bodies were fetched from `https://dokumenty82.ru/` on `2026-06-16`.

| URL | Status | Final URL | Title | Canonical | Robots | H1 | Body sha256 | Bytes | Technical stub |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `https://dokumenty82.ru/` | `200` | `https://dokumenty82.ru/` | `Документы для бизнеса — подготовка документов в Симферополе` | `https://dokumenty82.ru/` | `index, follow` | `Документы для бизнеса в Симферополе` | `4e2c005ab6ec32b149a94dfd5169cb5b4dde9440d0bef95a43213489ae646fcf` | `183693` | no |
| `https://dokumenty82.ru/robots.txt` | `200` | `https://dokumenty82.ru/robots.txt` | `N/A` | `N/A` | `N/A` | `N/A` | `13bd1f4769cf61e79bfd621ac4f12c95ace2b6a0205b66a01a22e0d42f54df72` | `321` | no |
| `https://dokumenty82.ru/sitemap.xml` | `200` | `https://dokumenty82.ru/sitemap.xml` | `N/A` | `N/A` | `N/A` | `N/A` | `0edc328f6fd7d6708afadf2d28cb04b93bfa5de56518bb85c260fb6982dcfff6` | `5022` | no |
| `https://dokumenty82.ru/razbor-situacii/` | `200` | `https://dokumenty82.ru/razbor-situacii/` | `Разбор ситуации по документам для бизнеса — Документы для бизнеса` | `https://dokumenty82.ru/razbor-situacii/` | `index, follow` | `Разберём ситуацию и подскажем документальный маршрут` | `bdd8c5f611d4a9da8075ca7d91dbf484c612d7d3c4222164d674d6d2af891c51` | `142502` | no |
| `https://dokumenty82.ru/kontakty/` | `200` | `https://dokumenty82.ru/kontakty/` | `Контакты — Документы для бизнеса в Симферополе` | `https://dokumenty82.ru/kontakty/` | `index, follow` | `Контакты` | `5500f82ef1915b8e4bbf8ced2baa12e6a123d9373699a964bdef398b43d3df19` | `141158` | no |
| `https://dokumenty82.ru/policy/` | `200` | `https://dokumenty82.ru/policy/` | `Политика конфиденциальности — Документы для бизнеса` | `https://dokumenty82.ru/policy` | `index, follow` | `Политика конфиденциальности` | `1583ddc59990f66a32b3be909b5ab39f93d6c4ea0315e28f7c09e1d103df6b9a` | `60581` | no |
| `https://dokumenty82.ru/otchetnost/` | `200` | `https://dokumenty82.ru/otchetnost/` | `Отчётность и налоговые вопросы — Документы для бизнеса` | `https://dokumenty82.ru/otchetnost/` | `index, follow` | `Отчётность зависит от формы бизнеса и периода` | `117dbd53bdec40bda72445809ac170e618ff8d39344e13ac18fa536c86062803` | `150210` | no |
| `https://dokumenty82.ru/bank-i-115-fz/` | `200` | `https://dokumenty82.ru/bank-i-115-fz/` | `Банк и 115-ФЗ — Документы для бизнеса` | `https://dokumenty82.ru/bank-i-115-fz/` | `index, follow` | `Банк и 115-ФЗ: спокойный разбор запроса` | `458751c8a1ed8df1ae389f9f5991a405e86d850f917b2f553d2e338957438ed8` | `134212` | no |
| `https://dokumenty82.ru/otvet-na-trebovanie-ifns/` | `200` | `https://dokumenty82.ru/otvet-na-trebovanie-ifns/` | `Ответ на требование ИФНС — Документы для бизнеса` | `https://dokumenty82.ru/otvet-na-trebovanie-ifns/` | `index, follow` | `Ответ на требование ИФНС` | `ce585e7d9b057fbb5ad725c6343320d2b34cf4553e11eda0f40e089f18685813` | `58463` | no |
| `https://dokumenty82.ru/deklaraciya-usn/` | `200` | `https://dokumenty82.ru/deklaraciya-usn/` | `Декларация УСН — Документы для бизнеса` | `https://dokumenty82.ru/deklaraciya-usn/` | `index, follow` | `Декларация УСН` | `3b16c07e13ecb6f701ffaef68d4e6659967db8693fb1487030fc8071d6cfc14e` | `57880` | no |
| `https://dokumenty82.ru/otvet-na-zapros-banka/` | `200` | `https://dokumenty82.ru/otvet-na-zapros-banka/` | `Ответ на запрос банка — Документы для бизнеса` | `https://dokumenty82.ru/otvet-na-zapros-banka/` | `index, follow` | `Ответ на запрос банка` | `0da6515fd26cc88321c6d21ff49913a014ec20b2fd100bfc90df49a8518603ce` | `57898` | no |
| `https://dokumenty82.ru/dokumenty-dlya-banka-115-fz/` | `200` | `https://dokumenty82.ru/dokumenty-dlya-banka-115-fz/` | `Документы для банка по 115-ФЗ — Документы для бизнеса` | `https://dokumenty82.ru/dokumenty-dlya-banka-115-fz/` | `index, follow` | `Документы для банка по 115-ФЗ` | `86e40cb82694bfdbcb2265dedba76eab6ada84c8c79dd270dfe99549e98f932d` | `58116` | no |
| `https://dokumenty82.ru/registraciya-ooo/` | `200` | `https://dokumenty82.ru/registraciya-ooo/` | `Регистрация ООО — Документы для бизнеса` | `https://dokumenty82.ru/registraciya-ooo/` | `index, follow` | `Регистрация ООО` | `f776eca3aafad3cea6c2afeff23df94dbb18216c176263af8509ce3bf30bc06e` | `49564` | no |
| `https://dokumenty82.ru/registraciya-ip/` | `200` | `https://dokumenty82.ru/registraciya-ip/` | `Регистрация ИП — Документы для бизнеса` | `https://dokumenty82.ru/registraciya-ip/` | `index, follow` | `Регистрация ИП` | `5e27c873ca2c4de05e5ad4a56c67de4638206ed8bf14b2e9d1923ce392aae3a9` | `49072` | no |

Production fetch result: all target URLs returned HTTP `200`. No technical launch stub marker was detected in the fetched production bodies.

## Artifact vs Production Compare

| URL | Artifact path | Artifact sha256 | Production sha256 | Exact match | Notes |
| --- | --- | --- | --- | --- | --- |
| `https://dokumenty82.ru/` | `index.html` | `8462f4294b4b9393dd3c4f512a35b82b9956e22832492d244bb0410d8b956c67` | `4e2c005ab6ec32b149a94dfd5169cb5b4dde9440d0bef95a43213489ae646fcf` | no | Body differs; PR #32 artifact is not byte-matched to production. |
| `https://dokumenty82.ru/robots.txt` | `robots.txt` | `7c4906a7b2eae9b26eba28a9d15656657a1c230a2886cb95d579e0127b4d37c5` | `13bd1f4769cf61e79bfd621ac4f12c95ace2b6a0205b66a01a22e0d42f54df72` | no | Body differs; PR #32 artifact is not byte-matched to production. |
| `https://dokumenty82.ru/sitemap.xml` | `sitemap.xml` | `d6281b59c6561d1132819225ab71b794099548ed534891eec606cbb7c778b231` | `0edc328f6fd7d6708afadf2d28cb04b93bfa5de56518bb85c260fb6982dcfff6` | no | Body differs; PR #32 artifact is not byte-matched to production. |
| `https://dokumenty82.ru/razbor-situacii/` | `razbor-situacii/index.html` | `f1d913396175444ada4c2cf4ffd53b8480f6d11ebc8a79f84f1eb384fbeaa68a` | `bdd8c5f611d4a9da8075ca7d91dbf484c612d7d3c4222164d674d6d2af891c51` | no | Body differs; PR #32 artifact is not byte-matched to production. |
| `https://dokumenty82.ru/kontakty/` | `kontakty/index.html` | `7678256fcf2480781af412ad4254bd40efc20e9e857c8bfb0bba4a78d0446db9` | `5500f82ef1915b8e4bbf8ced2baa12e6a123d9373699a964bdef398b43d3df19` | no | Body differs; PR #32 artifact is not byte-matched to production. |
| `https://dokumenty82.ru/policy/` | `policy/index.html` | `eed5e133da44bf5ded3c88ed97682267cd4a33cd97f4ae40f9eb2e773c0a9b1f` | `1583ddc59990f66a32b3be909b5ab39f93d6c4ea0315e28f7c09e1d103df6b9a` | no | Body differs; PR #32 artifact is not byte-matched to production. |
| `https://dokumenty82.ru/otchetnost/` | `otchetnost/index.html` | `d21d26a4536a56f1ef204527bfb05c023deffbc4df467102e05137ff5410c945` | `117dbd53bdec40bda72445809ac170e618ff8d39344e13ac18fa536c86062803` | no | Body differs; PR #32 artifact is not byte-matched to production. |
| `https://dokumenty82.ru/bank-i-115-fz/` | `bank-i-115-fz/index.html` | `0a93f6b728b574b48cbd07953a04055ec8933ecdd3d0d28df131ec3049a679dc` | `458751c8a1ed8df1ae389f9f5991a405e86d850f917b2f553d2e338957438ed8` | no | Body differs; PR #32 artifact is not byte-matched to production. |
| `https://dokumenty82.ru/otvet-na-trebovanie-ifns/` | `otvet-na-trebovanie-ifns/index.html` | `4a13595156d8225bff3886d4e29d86e454cb576998b5501932c8bcc34a394f6d` | `ce585e7d9b057fbb5ad725c6343320d2b34cf4553e11eda0f40e089f18685813` | no | Body differs; PR #32 artifact is not byte-matched to production. |
| `https://dokumenty82.ru/deklaraciya-usn/` | `deklaraciya-usn/index.html` | `0eca5e4c213de8043d36c6d721bd83f3a2be754a17b92e3e50193b3ff7603b0c` | `3b16c07e13ecb6f701ffaef68d4e6659967db8693fb1487030fc8071d6cfc14e` | no | Body differs; PR #32 artifact is not byte-matched to production. |
| `https://dokumenty82.ru/otvet-na-zapros-banka/` | `otvet-na-zapros-banka/index.html` | `56f784dc79de52db91c63beee0fa051c541efea38eec83bc874f6c39f20c9c54` | `0da6515fd26cc88321c6d21ff49913a014ec20b2fd100bfc90df49a8518603ce` | no | Body differs; PR #32 artifact is not byte-matched to production. |
| `https://dokumenty82.ru/dokumenty-dlya-banka-115-fz/` | `dokumenty-dlya-banka-115-fz/index.html` | `86bdf8a4f331253e1ccbdcaab061eacdd586a3c4c0f46022cbe3087c8c6ee640` | `86e40cb82694bfdbcb2265dedba76eab6ada84c8c79dd270dfe99549e98f932d` | no | Body differs; PR #32 artifact is not byte-matched to production. |
| `https://dokumenty82.ru/registraciya-ooo/` | `registraciya-ooo/index.html` | `dace0c6492cc90da45c48adf86ff8e894272adc12135897a2393035d61c60d7c` | `f776eca3aafad3cea6c2afeff23df94dbb18216c176263af8509ce3bf30bc06e` | no | Body differs; PR #32 artifact is not byte-matched to production. |
| `https://dokumenty82.ru/registraciya-ip/` | `registraciya-ip/index.html` | `c5c437448d6f0564cb46751299e550fa588626dc44537ea72f3689e59d2c27c2` | `5e27c873ca2c4de05e5ad4a56c67de4638206ed8bf14b2e9d1923ce392aae3a9` | no | Body differs; PR #32 artifact is not byte-matched to production. |

Artifact-production compare result: production does not byte-match the PR #32 static export artifact. This is not a failure of the PR artifact itself; it means production-to-PR-artifact equality is not matched/proven, consistent with PR #32 not being deployed as the live production body set at verification time.

## Commands Run

Local environment caveat: Node `v24.16.0` was available locally; project engine is `>=22 <23`. The CI release manifest itself was generated with Node `v22.22.3`.

| Command | Result | Notes |
| --- | --- | --- |
| `npm ci` | PASS_WITH_WARNING | Exit `0`; local Node engine warning on `v24.16.0`; npm audit reported 2 moderate vulnerabilities. |
| `npm run build` | PASS | Exit `0`. |
| `npm run release:manifest` | PASS | Exit `0`. |
| `npm run check:static-links` | PASS | Exit `0`. |
| `npm run check:launch-live-config` | PASS | Exit `0`. |
| `npm run check:public-live-config` | PASS | Exit `0`. |
| `npm run check:tracking-no-pii` | PASS | Exit `0`. |
| `npm run check:forms-crm-contract` | PASS | Exit `0`. |
| `npm run check:launch-readiness` | PASS | Exit `0`. |
| `npm run check:finalization` | PASS | Exit `0`. |
| `npm run brand:check` | PASS | Exit `0`. |

Commands NOT_RUN: none from the requested list.

Passed checks: all requested local commands exited `0`; artifact internal checksum verification passed; all production URLs fetched with HTTP `200`.

Failed checks: none. Production body comparison is a verified mismatch, not a command failure.

## Verdict

`ARTIFACTS_DOWNLOADED_INTERNAL_CHECKSUMS_MATCH_PRODUCTION_NOT_MATCHED`

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
- Production deploy from CI artifact if production-to-artifact equality is required.

## Next Recommended Task

P0-05 — decide whether to merge PR #32 and deploy the verified artifact, or keep production as the current manual release and record that production is intentionally not byte-matched to the PR #32 artifact.
