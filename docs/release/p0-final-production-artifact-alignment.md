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

Production deploy was not performed.

Reason:

- The requested deploy target is the verified `main` CI artifact.
- No `main` CI run ID, static export artifact or release-proof artifact was available for download and verification at this step.
- Deploying the older PR artifact or a local build would not satisfy the requested production-to-verified-main-artifact chain.

Production release ID: not created.

Rollback release ID: not created in this step.

## Production Smoke / Checksum Compare

Not run after deploy because deploy was not performed.

The most recent completed production comparison remains P0-04:

```text
ARTIFACTS_DOWNLOADED_INTERNAL_CHECKSUMS_MATCH_PRODUCTION_NOT_MATCHED
```

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

- Production deploy command.
- Post-deploy production smoke check.
- Post-deploy production checksum compare.
- Rollback drill.

## Final Verdict

`ACTIONS_NOT_VISIBLE_AFTER_MERGE`

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
- Verified `main` CI artifact download.
- Production deploy from verified `main` CI artifact.
- Post-deploy production checksum comparison.

## Next Recommended Task

Unblock visibility for the `main` `Site CI` run after merge:

1. Authorize `gh` locally, or provide the `main` `Site CI` run ID for SHA `e775973ee2d93afd17c7a1739bff4bc27a73fd8a`.
2. Download the `main` static export and release-proof artifacts.
3. Verify `artifact-manifest.json` and artifact checksums.
4. Give a final owner pre-deploy summary.
5. Deploy only the verified `main` static export artifact.
6. Run production smoke and checksum compare.
7. Update this report with the deploy result and final verdict.
