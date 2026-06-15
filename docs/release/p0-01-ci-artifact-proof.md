# P0-01 CI Artifact Proof

Date checked: 2026-06-15
Repository: `elena70semen/dokumenty82-site`
Workflow file: `.github/workflows/site-ci.yml`
CI artifact verdict: `NOT_PROVEN_FOR_LATEST_PUSH`

## Latest Main Commit Checked

Latest pushed `origin/main` before P0-01 documentation/CI changes:

```text
2221123f95406d16c2b31c3a079bbb6590000144
```

The P0-01 commit itself must be verified by the next GitHub Actions run after push. The release manifest generated in CI uses `GITHUB_SHA`, so the immutable CI artifact is the source for the final commit SHA.

## Workflow Configuration Proof

The workflow is configured to:

- use Node.js `22`;
- run `npm ci`;
- run P0 semantic alignment;
- build the static export with `npm run build`;
- generate and check P0 evidence;
- generate and check sales-channel readiness evidence;
- check FNS blog/news foundation;
- check static export links after build;
- check public live launch config;
- check no-PII tracking;
- check forms/CRM contract;
- check launch readiness/finalization gates;
- run brand checks;
- upload the static export artifact from `out/`;
- generate `release-proof/artifact-manifest.json`;
- upload the release proof artifact from `release-proof/`.

## Artifact Configuration

Static export artifact:

```text
dokumenty82-static-export-${{ github.sha }}
path: out
```

Release proof artifact:

```text
dokumenty82-release-proof-${{ github.sha }}
path: release-proof
```

Release manifest generator:

```text
npm run release:manifest
```

Manifest path:

```text
release-proof/artifact-manifest.json
```

The manifest includes:

- `commitSha` from `GITHUB_SHA` or local git fallback;
- `generatedAt`;
- `nodeVersion`;
- `packageName`;
- `outDirExists`;
- `htmlFileCount`;
- `assetFileCount`;
- `sitemapExists`;
- `robotsExists`;
- checksums for `out/index.html`, `robots.txt`, `sitemap.xml` and key route HTML files.

## Workflow Runs Checked

| Source | Result | Notes |
| --- | --- | --- |
| GitHub REST unauthenticated API | `NOT_PROVEN` | API returned `404 Not Found`; repository/workflow run is not publicly visible through this method. |
| GitHub connector `_fetch_commit_workflow_runs` for commit `2221123f...` | `NOT_PROVEN` | Returned an empty workflow run list for the checked commit. |
| Local workflow file inspection | `PASS_CONFIG_ONLY` | Workflow file exists and contains required build/check/upload steps after P0-01 updates. |
| Local command execution | `PASS_LOCAL_ONLY` | Commands listed below passed locally. |

## Commands Passed Locally

- `npm.cmd ci` (passed with engine warning: local Node v24.16.0, project expects Node `>=22 <23`; CI uses Node 22)
- `npm.cmd run check:p0-semantic`
- `npm.cmd run build`
- `npm.cmd run evidence:p0`
- `npm.cmd run check:p0-evidence`
- `npm.cmd run check:fns-blog-news`
- `npm.cmd run check:static-links`
- `npm.cmd run release:manifest`
- `npm.cmd run check:launch-live-config`
- `npm.cmd run check:public-live-config`
- `npm.cmd run check:tracking-no-pii`
- `npm.cmd run check:forms-crm-contract`
- `npm.cmd run check:launch-readiness`
- `npm.cmd run check:finalization`
- `npm.cmd run brand:check` (passed with warning-zone matches, no active fail-zone claims)

## Commands NOT_RUN In CI Proof

| Command or proof | Status | Reason |
| --- | --- | --- |
| Latest GitHub Actions run logs | `NOT_RUN / NOT_PROVEN` | `gh` CLI is not installed locally; unauthenticated REST could not see the repository/workflow. |
| Artifact download and checksum comparison | `NOT_RUN / NOT_PROVEN` | No visible workflow run/artifact ID was available through the checked methods. |
| Production-to-CI artifact checksum match | `NOT_RUN / NOT_PROVEN` | Current production was deployed manually from local `out/`, not from a proven GitHub Actions artifact. |

## CI Artifact Verdict

`NOT_PROVEN_FOR_LATEST_PUSH`

The repository now has the required workflow and release manifest generation. The next required action is to verify the GitHub Actions run after this commit lands on `main`, then compare the uploaded `release-proof/artifact-manifest.json` to the production artifact or deployment manifest.
