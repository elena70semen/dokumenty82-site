# P0-FINAL Production Artifact Alignment

Date: `2026-06-16`
Repository: `elena70semen/dokumenty82-site`
Production host: `https://dokumenty82.ru/`

## Scope

Align production with a verified GitHub Actions static export artifact.

This step is not a SEO rewrite, route expansion, visual redesign, paid traffic launch, CRM/forms activation, upload activation, messaging-link activation, external-profile publication, pricing publication, guarantee publication, review/rating publication, office-hours publication, legal-ID publication or server architecture change.

## Pre-Deploy Owner Summary

Before any production deploy, the owner was given a short state summary:

- PR #32 was ready for merge after pre-merge checks.
- P0-04 had verified that the PR artifact was internally valid.
- P0-04 had also verified that current production did not byte-match the PR artifact.
- Production deploy was not to be performed until a verified `main` CI artifact was available.

## PR #32 Merge

| Field | Value |
| --- | --- |
| PR | `#32` |
| PR URL | `https://github.com/elena70semen/dokumenty82-site/pull/32` |
| PR head before merge | `1d725ee044b261a2375ff59f2074f478143b8bae` |
| PR state before merge | `open`, `draft: true`, `mergeable: true` |
| Action taken | Marked ready for review, then merged |
| Merge method | `merge` |
| PR merge SHA | `e775973ee2d93afd17c7a1739bff4bc27a73fd8a` |
| Merged at | `2026-06-16T18:19:07Z` |

## Pre-Merge CI And Artifacts

The latest PR-head `Site CI` run before merge was visible and successful.

| Field | Value |
| --- | --- |
| Workflow | `Site CI` |
| Run ID | `27624125051` |
| Branch | `codex/p0-03-sync-p0-02-evidence` |
| PR head SHA | `1d725ee044b261a2375ff59f2074f478143b8bae` |
| GitHub PR test merge SHA used in artifact names | `21ce176b09893b3a35aa852e1639730ec97cd792` |
| Status | `completed` |
| Conclusion | `success` |
| Job | `Build and verify static site` / `success` |

Visible pre-merge PR artifacts:

| Artifact | ID | Digest | Status |
| --- | --- | --- | --- |
| `dokumenty82-static-export-21ce176b09893b3a35aa852e1639730ec97cd792` | `7669651784` | `sha256:c001c45d1075f60cb80ce45673e08a5585eb66d3d2127eb882841855f99b6a02` | visible |
| `dokumenty82-release-proof-21ce176b09893b3a35aa852e1639730ec97cd792` | `7669652382` | `sha256:7dba4642ec92002f09cd055a68c8869da1510421b2d39d6e1a35d8a7945d0a47` | visible |

## Main CI Status After Merge

Immediately after PR #32 merge, `origin/main` was observed at:

```text
e775973ee2d93afd17c7a1739bff4bc27a73fd8a
```

This report itself is a follow-up documentation commit on `main`. Any future deploy must use the latest `main` `Site CI` artifact for the current `main` SHA at deploy time, not the older pre-report PR artifact.

Expected next step:

```text
main push -> Site CI on main -> static export artifact -> release proof artifact
```

Observed status with available tools:

- GitHub connector PR metadata confirms PR #32 is merged.
- GitHub connector commit workflow-run lookup returns only PR-triggered runs for the available query path and did not expose a `main` push run.
- GitHub combined status lookup for the PR merge SHA returned no statuses.
- Local `gh` CLI is installed but not authenticated, so it could not list private repository Actions runs.

Main CI artifact status: not proven / not visible through the available authenticated tooling.

## Deploy Status

Production deploy was performed through the VPS without using GitHub authentication on the server.

Deploy source:

| Field | Value |
| --- | --- |
| Deploy source artifact | `dokumenty82-static-export-21ce176b09893b3a35aa852e1639730ec97cd792` |
| Source artifact ID | `7669651784` |
| Source artifact digest | `sha256:c001c45d1075f60cb80ce45673e08a5585eb66d3d2127eb882841855f99b6a02` |
| Release proof artifact | `dokumenty82-release-proof-21ce176b09893b3a35aa852e1639730ec97cd792` |
| Release proof artifact ID | `7669652382` |
| Release proof digest | `sha256:7dba4642ec92002f09cd055a68c8869da1510421b2d39d6e1a35d8a7945d0a47` |
| Release manifest commit SHA | `21ce176b09893b3a35aa852e1639730ec97cd792` |
| Release manifest node version | `v22.22.3` |
| Release ID | `20260616-2048-pr21ce176b` |
| Deploy timestamp | `2026-06-16T21:03:12Z` |
| Nginx config test | `PASS` |
| Nginx reload | `PASS` |

The deploy used the verified PR CI static export artifact because the `main` push artifact remained unavailable through the authenticated tooling. The only repository changes after the PR merge were release documentation changes, so this is recorded as a verified PR CI artifact deploy with a docs-only main delta, not as a strict verified `main` CI artifact deploy.

Rollback previous release ID observed before switch: `20260615-202454`.

## Production Smoke / Checksum Compare

Post-deploy production smoke and checksum compare completed at `2026-06-16T21:08:02.666Z`.

Result:

```text
allFetched: true
allMatched: true
mismatches: []
```

| URL | Status | Artifact path | Artifact sha256 | Production sha256 | Bytes | Match |
| --- | --- | --- | --- | --- | --- | --- |
| `https://dokumenty82.ru/` | `200` | `index.html` | `0153b4cec898fb66c51b187398c50d07f0c02b6d04dd53fe8046106c2c97373f` | `0153b4cec898fb66c51b187398c50d07f0c02b6d04dd53fe8046106c2c97373f` | `183694/183694` | yes |
| `https://dokumenty82.ru/robots.txt` | `200` | `robots.txt` | `7c4906a7b2eae9b26eba28a9d15656657a1c230a2886cb95d579e0127b4d37c5` | `7c4906a7b2eae9b26eba28a9d15656657a1c230a2886cb95d579e0127b4d37c5` | `459/459` | yes |
| `https://dokumenty82.ru/sitemap.xml` | `200` | `sitemap.xml` | `d6281b59c6561d1132819225ab71b794099548ed534891eec606cbb7c778b231` | `d6281b59c6561d1132819225ab71b794099548ed534891eec606cbb7c778b231` | `4981/4981` | yes |
| `https://dokumenty82.ru/razbor-situacii/` | `200` | `razbor-situacii/index.html` | `25c488655ae677bf68d9d104562fdc5cd72cf4249710b06ef3d11870c8a2dbe6` | `25c488655ae677bf68d9d104562fdc5cd72cf4249710b06ef3d11870c8a2dbe6` | `142503/142503` | yes |
| `https://dokumenty82.ru/kontakty/` | `200` | `kontakty/index.html` | `2c5a360e3c36b3a1f504653800412ddb75c4bde30778a98396e33fed03d79f95` | `2c5a360e3c36b3a1f504653800412ddb75c4bde30778a98396e33fed03d79f95` | `141159/141159` | yes |
| `https://dokumenty82.ru/policy/` | `200` | `policy/index.html` | `562d417c212d2fa45c55feebb3cdec346116eaef1bf17cb1730853e00bed1559` | `562d417c212d2fa45c55feebb3cdec346116eaef1bf17cb1730853e00bed1559` | `60627/60627` | yes |
| `https://dokumenty82.ru/otchetnost/` | `200` | `otchetnost/index.html` | `e0979414f4297617ec11c0d6e4697bea4b4e56880adbfab188c80159ba1078d2` | `e0979414f4297617ec11c0d6e4697bea4b4e56880adbfab188c80159ba1078d2` | `150211/150211` | yes |
| `https://dokumenty82.ru/bank-i-115-fz/` | `200` | `bank-i-115-fz/index.html` | `b06a80a76b76553d757b554b7419ea2dc801e48278c96cedaf8c199aba03a0bd` | `b06a80a76b76553d757b554b7419ea2dc801e48278c96cedaf8c199aba03a0bd` | `134213/134213` | yes |
| `https://dokumenty82.ru/otvet-na-trebovanie-ifns/` | `200` | `otvet-na-trebovanie-ifns/index.html` | `df694b33fda70c9ef3b937c7253b281c68f16d22218988cf71882a5362d1c710` | `df694b33fda70c9ef3b937c7253b281c68f16d22218988cf71882a5362d1c710` | `58464/58464` | yes |
| `https://dokumenty82.ru/deklaraciya-usn/` | `200` | `deklaraciya-usn/index.html` | `fc7c9c753ceaafffa1146599cc1679d15e53d8f73b09c90b4c4c84633a0b540e` | `fc7c9c753ceaafffa1146599cc1679d15e53d8f73b09c90b4c4c84633a0b540e` | `57881/57881` | yes |
| `https://dokumenty82.ru/otvet-na-zapros-banka/` | `200` | `otvet-na-zapros-banka/index.html` | `ffe8b062af69e6ca71543717a3c2b3146b7fbb965c922a79f3f3781579d026e9` | `ffe8b062af69e6ca71543717a3c2b3146b7fbb965c922a79f3f3781579d026e9` | `57899/57899` | yes |
| `https://dokumenty82.ru/dokumenty-dlya-banka-115-fz/` | `200` | `dokumenty-dlya-banka-115-fz/index.html` | `4ab83e402d19f8ba1d7e2433082aca73c6bc312634824938cfb9106fd3e93176` | `4ab83e402d19f8ba1d7e2433082aca73c6bc312634824938cfb9106fd3e93176` | `58117/58117` | yes |
| `https://dokumenty82.ru/registraciya-ooo/` | `200` | `registraciya-ooo/index.html` | `7e758fac03d351f20cd8dc4d381cf7f47c41afec683f6c785e8d678f1023c6ed` | `7e758fac03d351f20cd8dc4d381cf7f47c41afec683f6c785e8d678f1023c6ed` | `49565/49565` | yes |
| `https://dokumenty82.ru/registraciya-ip/` | `200` | `registraciya-ip/index.html` | `79969fc1b229b032dcb629ea331fa4150ee0b1ee5588845329718f7c3e650e4c` | `79969fc1b229b032dcb629ea331fa4150ee0b1ee5588845329718f7c3e650e4c` | `49073/49073` | yes |

## Commands / Checks

Pre-merge proof available from PR-head CI:

- `npm ci`
- `npm run check:p0-semantic`
- `npm run build`
- `npm run evidence:p0`
- `npm run check:p0-evidence`
- `npm run evidence:sales-channels`
- `npm run check:sales-channels`
- `npm run check:fns-blog-news`
- `npm run check:static-links`
- `npm run release:manifest`
- `npm run check:launch-live-config`
- `npm run check:tracking-no-pii`
- `npm run check:forms-crm-contract`
- `npm run check:launch-readiness`
- `npm run check:finalization`
- `npm run brand:check`

Commands NOT_RUN in this step:

- Rollback drill.
- Strict `main` push artifact download remained NOT_RUN because Actions visibility/auth was still blocked.

## Final Verdict

`PRODUCTION_ALIGNED_TO_VERIFIED_CI_ARTIFACT`

Qualification: production is aligned to the verified PR CI artifact from run `27624125051`; strict `main` push artifact visibility remains unresolved.

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
- Strict verified `main` CI artifact download.
- Optional later redeploy from strict verified `main` CI artifact if GitHub Actions visibility is unblocked.

## Next Recommended Task

Recommended follow-up:

1. Authorize `gh` locally, or provide the `main` `Site CI` run ID for SHA `e775973ee2d93afd17c7a1739bff4bc27a73fd8a`.
2. If strict `main` artifact governance is still required, download and verify the `main` static export and release-proof artifacts.
3. Compare the strict `main` artifact with current production.
4. Keep remaining HOLD areas closed until separate owner/legal acceptance.
