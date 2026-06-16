# P0-02 CI Artifact / Production Compare

Date checked: `2026-06-16`
Repository: `elena70semen/dokumenty82-site`
Target P0-01 commit: `9152826d2410049ea8170c7370de410c868a82f9`
Latest remote main observed during P0-03: `6a3d390e7588e777454c2d2898b980d5244af543`
Production: `https://dokumenty82.ru/`

## Scope

P0-02 verifies whether the release chain can be proven end to end:

```text
GitHub main commit
-> GitHub Actions Site CI run
-> static export artifact
-> release-proof artifact
-> production artifact currently served by https://dokumenty82.ru/
```

This pass did not change SEO content, routes, visual design, production deploy settings, live forms, CRM, uploads, paid traffic, messaging links or local profiles.

## Inputs

Reviewed files:

- `AGENTS.md`
- `README.md`
- `package.json`
- `.github/workflows/site-ci.yml`
- `scripts/generate-release-artifact-manifest.mjs`
- `docs/release/p0-01-release-state-matrix.md`
- `docs/release/p0-01-production-verification.md`
- `docs/release/p0-01-ci-artifact-proof.md`
- `docs/release/p0-01-rollback-runbook.md`

Additional checks:

- local git state;
- GitHub connector workflow-run lookup;
- GitHub unauthenticated REST visibility;
- local static export build;
- local release manifest generation;
- public production HTTP smoke check.

P0-03 sync note:

- this P0-02 evidence was first collected before syncing local work onto the latest `origin/main`;
- `origin/main` was later confirmed ahead of P0-01 by seven commits ending at `6a3d390e7588e777454c2d2898b980d5244af543`;
- those later commits touch policy/canonical SEO, robots/sitemap, tracking bridge and marketing/SEO handoff docs;
- artifact visibility remains `NOT_PROVEN` until a visible Site CI run and artifacts are checked for the post-sync branch or final main commit;
- production match remains `NOT_PROVEN` until CI artifact checksums are compared against a safe production snapshot.

## GitHub Actions Run Verification

Target commit:

```text
9152826d2410049ea8170c7370de410c868a82f9
```

Local checkout:

- local `HEAD`: `9152826d2410049ea8170c7370de410c868a82f9`;
- local branch: `main`;
- local `gh` CLI: `NOT_INSTALLED`;
- GitHub REST unauthenticated API for repo actions/commit: `403 Forbidden`;
- GitHub connector `_fetch_commit_workflow_runs` for `9152826d2410049ea8170c7370de410c868a82f9`: returned empty `workflow_runs`;
- GitHub connector `_fetch_commit_workflow_runs` for remote SHA observed by `git ls-remote`: returned empty `workflow_runs`.

Remote observation:

```text
git ls-remote origin refs/heads/main
6a3d390e7588e777454c2d2898b980d5244af543 refs/heads/main
```

During the first P0-02 pass, `git fetch origin --prune` failed during the network connection to GitHub, so the local tracking ref was not safely updated then. During P0-03, `git fetch origin` succeeded and confirmed `origin/main` at `6a3d390e7588e777454c2d2898b980d5244af543`.

Required Site CI run for the target P0-01 commit was not visible in available tooling.

| Required field | Result |
| --- | --- |
| Site CI run exists for `9152826...` | `NOT_PROVEN` |
| Run status | `NOT_AVAILABLE` |
| Run conclusion | `NOT_AVAILABLE` |
| Run ID | `NOT_AVAILABLE` |
| Run URL | `NOT_AVAILABLE` |
| Run commit SHA | `NOT_AVAILABLE` |
| Run branch | `NOT_AVAILABLE` |
| Static export artifact | `NOT_VISIBLE` |
| Release proof artifact | `NOT_VISIBLE` |

Manual recovery steps:

1. Reconcile local `main` and GitHub `main`.
2. Confirm whether commit `9152826d2410049ea8170c7370de410c868a82f9` should be on GitHub `main`.
3. If it should, push or restore that commit through the owner-approved Git workflow.
4. In GitHub: `Actions -> Site CI -> Run workflow -> main`.
5. Re-run P0-02 after the workflow completes.
6. If Actions are not visible, check repository Actions settings and GitHub app/token permissions.

## Static Export Artifact Verification

GitHub artifact:

- expected name: `dokumenty82-static-export-9152826d2410049ea8170c7370de410c868a82f9`;
- status: `NOT_VISIBLE`;
- download: `NOT_RUN`;
- contents: `NOT_PROVEN`.

Local static export from the target checkout was generated successfully with:

```text
npm.cmd run build
```

Local static export observations:

- `out/index.html`: present;
- `out/robots.txt`: present;
- `out/sitemap.xml`: present;
- key route HTML files: present;
- Next.js static export structure: present;
- HTML file count from manifest: `39`;
- asset file count from manifest: `316`.

Forbidden file-name scan under `out/` found no `.env`, key, certificate, credential, token, client-document or personal-document file names.

Targeted secret regex scan under `out/` found no matches for private keys, OpenAI-style keys, GitHub tokens, Slack tokens, password assignments, API key assignments or webhook URL assignments.

## Release-Proof Artifact Verification

GitHub artifact:

- expected name: `dokumenty82-release-proof-9152826d2410049ea8170c7370de410c868a82f9`;
- status: `NOT_VISIBLE`;
- download: `NOT_RUN`;
- `release-proof/artifact-manifest.json` from GitHub artifact: `NOT_PROVEN`.

Local release manifest was generated successfully with:

```text
npm.cmd run release:manifest
```

Local manifest summary:

| Field | Value |
| --- | --- |
| `schemaVersion` | `p0-01.release-artifact-manifest.v1` |
| `commitSha` | `9152826d2410049ea8170c7370de410c868a82f9` |
| `nodeVersion` | `v24.16.0` |
| `packageName` | `dokumenty82` |
| `outDirExists` | `true` |
| `htmlFileCount` | `39` |
| `assetFileCount` | `316` |
| `sitemapExists` | `true` |
| `robotsExists` | `true` |

Important file checksums from local manifest:

| Path | Exists | Bytes | SHA-256 |
| --- | --- | ---: | --- |
| `out/index.html` | true | 183693 | `b53ee3487e7c7502ec11f44955741a5c8a159398873eef079ab1aefdb5829059` |
| `out/robots.txt` | true | 321 | `13bd1f4769cf61e79bfd621ac4f12c95ace2b6a0205b66a01a22e0d42f54df72` |
| `out/sitemap.xml` | true | 5022 | `0edc328f6fd7d6708afadf2d28cb04b93bfa5de56518bb85c260fb6982dcfff6` |

Key route checksums from local manifest:

| Route | Path | Exists | SHA-256 |
| --- | --- | --- | --- |
| `/` | `out/index.html` | true | `b53ee3487e7c7502ec11f44955741a5c8a159398873eef079ab1aefdb5829059` |
| `/razbor-situacii/` | `out/razbor-situacii/index.html` | true | `8baf6e96cf3a609f5b329abef03c8bc2129fdce9ac47487b5736ebca5d1b80d0` |
| `/kontakty/` | `out/kontakty/index.html` | true | `0350cdac8f5c9050338fbb95c1ca24dd75dcb5ffb0aa24bd1c099c16e2b7ac52` |
| `/policy` | `out/policy/index.html` | true | `101cea2c86d44320600bc134a281638ca11d0dc342eacf147351851b821e408f` |
| `/otchetnost/` | `out/otchetnost/index.html` | true | `f0452b0447b8d642f3b2e6ce1e2dec7e818c1eb655f822abdd827a3fd3cadfa7` |
| `/bank-i-115-fz/` | `out/bank-i-115-fz/index.html` | true | `6fdc1a68541a1a8f68b7e2f3a01f36cbd64a4f37ce9595807ee3e349c0b72480` |
| `/otvet-na-trebovanie-ifns/` | `out/otvet-na-trebovanie-ifns/index.html` | true | `27af45bc34ae56b42eb7073bea019c6f9fe2630a188f70517b5183077954c568` |
| `/deklaraciya-usn/` | `out/deklaraciya-usn/index.html` | true | `cc4ba2ce65ac21ce890c8ce056ce9b56bd4ea5430415afbb32fcc39e7938ecc0` |
| `/otvet-na-zapros-banka/` | `out/otvet-na-zapros-banka/index.html` | true | `4fcdcbfb003aa1c362efce5b1a359949c88fa8870b91b59b2df5acfec8a8499d` |
| `/dokumenty-dlya-banka-115-fz/` | `out/dokumenty-dlya-banka-115-fz/index.html` | true | `c25127cdae6b6c47edcc56ec6e78a42bfa05edc2fe6570dad0166b88cc85f115` |
| `/registraciya-ooo/` | `out/registraciya-ooo/index.html` | true | `70ca4644eafc59e68444e79f0b355a503c8df70b4487823cdd35149f181e829e` |
| `/registraciya-ip/` | `out/registraciya-ip/index.html` | true | `6e78c98e27d2a082f37e2d8b24dc49153e8dbe104dd171689db0c857682a1cd6` |

## Production Snapshot / Compare

Production server artifact snapshot was not collected during this pass.

Reasons:

- no safe, authenticated production artifact access was used in this task;
- no server paths, SSH hosts, keys, passwords or provider credentials should be recorded in this repository;
- GitHub CI artifact was not visible, so an artifact-to-production checksum match cannot be proven.

Production compare status:

```text
PRODUCTION_MATCH_NOT_PROVEN
```

Safe ops command pattern for a future server-side checksum snapshot:

```bash
tmux new -s p0-02-compare
cd <current-production-static-release>
sha256sum index.html robots.txt sitemap.xml \
  razbor-situacii/index.html \
  kontakty/index.html \
  policy/index.html \
  otchetnost/index.html \
  bank-i-115-fz/index.html \
  otvet-na-trebovanie-ifns/index.html \
  deklaraciya-usn/index.html \
  otvet-na-zapros-banka/index.html \
  dokumenty-dlya-banka-115-fz/index.html \
  registraciya-ooo/index.html \
  registraciya-ip/index.html
```

Do not paste private paths, SSH connection strings, keys, passwords or provider panel data into public/repo evidence.

## URL Smoke Check

Checked production URLs after local artifact verification.

| URL | Status | Title | Canonical | Robots | Noindex | H1 | Phone visible | Policy link | Technical stub |
| --- | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| `/` | 200 | `Документы для бизнеса — подготовка документов в Симферополе` | `https://dokumenty82.ru/` | `index, follow` | no | `Документы для бизнеса в Симферополе` | yes | yes | no |
| `/robots.txt` | 200 | n/a | n/a | n/a | n/a | n/a | n/a | n/a | no |
| `/sitemap.xml` | 200 | n/a | n/a | n/a | n/a | n/a | n/a | n/a | no |
| `/razbor-situacii/` | 200 | `Разбор ситуации по документам бизнеса в Симферополе | Документы для бизнеса` | `https://dokumenty82.ru/razbor-situacii/` | `index, follow` | no | `Разберём ситуацию и подскажем документальный маршрут` | yes | yes | no |
| `/otchetnost/` | 200 | `Отчётность и налоговые документы в Симферополе | Документы для бизнеса` | `https://dokumenty82.ru/otchetnost/` | `index, follow` | no | `Отчётность и налоговые документы` | yes | yes | no |
| `/bank-i-115-fz/` | 200 | `Документы для банка и запросов по 115-ФЗ в Симферополе | Документы для бизнеса` | `https://dokumenty82.ru/bank-i-115-fz/` | `index, follow` | no | `Документы для банка и запросов по 115-ФЗ` | yes | yes | no |
| `/kontakty/` | 200 | `Контакты — Документы для бизнеса в Симферополе | Документы для бизнеса` | `https://dokumenty82.ru/kontakty/` | `index, follow` | no | `Контакты и передача документов` | yes | yes | no |
| `/policy` | 200 | `Политика конфиденциальности | Документы для бизнеса` | `https://dokumenty82.ru/policy` | `index, follow` | no | `Политика конфиденциальности и обработки данных` | yes | self | no |
| `/otvet-na-trebovanie-ifns/` | 200 | `Ответ на требование ИФНС | Документы для бизнеса` | `https://dokumenty82.ru/otvet-na-trebovanie-ifns/` | `index, follow` | no | `Ответ на требование ИФНС` | yes | yes | no |
| `/deklaraciya-usn/` | 200 | `Декларация УСН в Симферополе | Документы для бизнеса` | `https://dokumenty82.ru/deklaraciya-usn/` | `index, follow` | no | `Декларация УСН в Симферополе` | yes | yes | no |
| `/otvet-na-zapros-banka/` | 200 | `Ответ на запрос банка | Документы для бизнеса` | `https://dokumenty82.ru/otvet-na-zapros-banka/` | `index, follow` | no | `Ответ на запрос банка` | yes | yes | no |
| `/dokumenty-dlya-banka-115-fz/` | 200 | `Документы для банка по 115-ФЗ | Документы для бизнеса` | `https://dokumenty82.ru/dokumenty-dlya-banka-115-fz/` | `index, follow` | no | `Документы для банка по 115-ФЗ` | yes | yes | no |
| `/registraciya-ooo/` | 200 | `Регистрация ООО в Симферополе | Документы для бизнеса` | `https://dokumenty82.ru/registraciya-ooo/` | `index, follow` | no | `Регистрация ООО в Симферополе` | yes | yes | no |
| `/registraciya-ip/` | 200 | `Регистрация ИП в Симферополе | Документы для бизнеса` | `https://dokumenty82.ru/registraciya-ip/` | `index, follow` | no | `Регистрация ИП в Симферополе` | yes | yes | no |

## Secrets / Forbidden Data Check

Static export artifact local scan:

- forbidden file-name scan under `out/`: `PASS`, no matching files found;
- targeted secret regex scan under `out/`: `PASS`, no matches found;
- no `.env`, private key, certificate, credential, token, archive, database, client-document or personal-document files were observed in `out/`.

GitHub artifact secret scan:

- `NOT_RUN`, because GitHub artifacts were not visible/downloadable in available tooling.

## Commands Run

Initial PowerShell `npm` run failed because Windows execution policy blocked `npm.ps1`. The commands were then re-run through `npm.cmd`.

Passed:

- `npm.cmd ci`
- `npm.cmd run build`
- `npm.cmd run release:manifest`
- `npm.cmd run check:static-links`
- `npm.cmd run check:launch-live-config`
- `npm.cmd run check:public-live-config`
- `npm.cmd run check:tracking-no-pii`
- `npm.cmd run check:forms-crm-contract`
- `npm.cmd run check:launch-readiness`
- `npm.cmd run check:finalization`
- `npm.cmd run brand:check`

Notes:

- local Node was `v24.16.0`; project engine expects `>=22 <23`; CI workflow is configured to use Node `22`;
- `npm ci` reported `2 moderate severity vulnerabilities`;
- `brand:claims` completed with warning-zone matches and no active fail-zone claims.

## Commands NOT_RUN

| Command / action | Reason |
| --- | --- |
| `gh run list` / `gh run download` | GitHub CLI is not installed locally. |
| GitHub artifact download | No visible workflow run/artifact ID was available. |
| CI artifact checksum scan | GitHub artifact was not visible/downloadable. |
| Production server artifact checksum snapshot | No safe authenticated server artifact access was used in this task. |
| CI artifact vs production checksum compare | Requires both downloadable CI artifact and production snapshot; neither was available in a safe proof form. |

## Verdict

```text
CI_ARTIFACT_NOT_VISIBLE
```

Supporting status:

- local build/export/manifest/checks: `PASS`;
- production public URL smoke check: `PASS`;
- GitHub Actions run for target commit: `NOT_VISIBLE`;
- GitHub artifacts for target commit: `NOT_VISIBLE`;
- production artifact match against CI artifact: `NOT_PROVEN`.

Do not state that production is matched to the GitHub Actions artifact until the workflow run and artifacts are visible and the artifact checksums are compared against a production snapshot.

## Remaining Blockers

- Confirm whether `9152826d2410049ea8170c7370de410c868a82f9` is intended to be the GitHub `main` release commit.
- Reconcile/publish this P0-02 evidence branch against remote `main`; P0-03 rebased the evidence over `6a3d390e7588e777454c2d2898b980d5244af543`.
- Run or locate GitHub Actions `Site CI` for the intended `main` commit.
- Download/verify `dokumenty82-static-export-<commitSha>`.
- Download/verify `dokumenty82-release-proof-<commitSha>`.
- Compare CI artifact manifest/checksums to the production release snapshot.
- Owner/legal/privacy, CRM/forms, rollback drill, Yandex/Webmaster and remaining governance gates are still separate HOLD items.

## Next Task Recommendation

P0-03 should reconcile GitHub `main` vs local `main`, run `Site CI` for the intended release commit, download both artifacts, and perform a checksum comparison against a safe production snapshot.

After P0-02/P0-03, repeat the DNS check for `business-helps.ru`. Owner-side REG.RU UI shows no visible resource records, while public recursive resolvers can still return the old `A 159.194.216.36` answer until TTL/propagation clears. If the A answer remains after TTL expiry, check REG.RU templates/parking or another active DNS zone.
