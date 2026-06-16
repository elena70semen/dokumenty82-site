# P0-03 Main Sync And Actions Visibility

Date: `2026-06-16`
Repository: `elena70semen/dokumenty82-site`
Branch: `codex/p0-03-sync-p0-02-evidence`

## Scope

Sync the local P0-02 evidence work onto the current remote `main`, preserve the P0-02 evidence, rerun launch gates on the current base, publish the branch, and check whether Site CI / release artifacts are visible.

No SEO copy, public routes, design, live forms, CRM, upload, paid traffic, messaging links, prices, guarantees, ratings, reviews, office hours, legal IDs, secrets or provider credentials were intentionally added.

## Starting State

- Local HEAD before sync: `9152826d2410049ea8170c7370de410c868a82f9`
- Remote `origin/main` observed before sync: `6a3d390e7588e777454c2d2898b980d5244af543`
- P0-02 files found:
  - `docs/release/p0-02-ci-artifact-production-compare.md`
  - `docs/source-to-site/p1-brand-domain-entity-consolidation.md`
- Checkpoint method used: branch `codex/p0-03-sync-p0-02-evidence` plus local checkpoint commit.
- Checkpoint commit before rebase: `9eaca5f docs: checkpoint P0-02 artifact comparison evidence`
- Checkpoint commit after rebase: `fe4e432 docs: checkpoint P0-02 artifact comparison evidence`

## Remote Main Changes Reviewed

Commits between P0-01 and remote `main`:

| Commit | Subject |
| --- | --- |
| `6a3d390` | `docs: fix Avito campaign route typo` |
| `a813870` | `docs: add Avito campaign setup manual for Codex` |
| `ff4d8dd` | `docs: add yandex services seo handoff` |
| `c371fc7` | `docs: add Avito promotion contour` |
| `7a1ec06` | `SEO foundation for Yandex Webmaster` |
| `854d9eb` | `Merge pull request #29 from elena70semen/metrica-reachgoal` |
| `433ee56` | `Enable Yandex.Metrica reachGoal bridge` |

Changed files summary:

| File | Remote-main change area |
| --- | --- |
| `app/policy/page.tsx` | Policy metadata/canonical handling |
| `components/Footer.tsx` | Policy footer link |
| `lib/tracking/tracking-adapter.ts` | Metrica reachGoal bridge |
| `public/robots.txt` | Yandex/Webmaster SEO foundation |
| `public/sitemap.xml` | Policy sitemap entry |
| `docs/marketing/avito-campaign-codex-setup-v1.md` | Avito setup documentation |
| `docs/marketing/avito-promotion-contour-v1.md` | Avito channel contour |
| `docs/seo/yandex-services-seo-handoff.md` | Yandex services handoff |
| `docs/seo/yandex-webmaster-foundation.md` | Yandex Webmaster foundation |

Risk notes found during local gate replay:

- The remote policy URL uses `https://dokumenty82.ru/policy/`, consistent with `next.config.ts` `trailingSlash: true`.
- Older P0 checks still expected `https://dokumenty82.ru/policy` without the trailing slash.
- The Metrica reachGoal bridge used a direct `ym(...)` call; `check:tracking-no-pii` treats direct external-send call patterns as forbidden in tracking runtime.
- The branch keeps Metrica reachGoal behavior but moves the call behind a typed `metrica.call(...)` bridge, preserving the safe allowlist payload and feature flag gate.
- The P0 semantic/evidence checks were updated to accept the actual trailing-slash policy canonical and sitemap entry.

## P0-02 Evidence Preservation

- Files preserved: `docs/release/p0-02-ci-artifact-production-compare.md`, `docs/source-to-site/p1-brand-domain-entity-consolidation.md`
- Rebase result: `git rebase origin/main` succeeded.
- Conflicts: none.
- P0-02 release evidence now records the newer remote `main` SHA and marks the original local findings as pre-sync.
- The brand/domain entity note now states that `business-helps.ru` DNS cleanup is an external follow-up and not a P0-03 production-code blocker.

## Checks Run

Local environment warning:

- `npm ci` reported `EBADENGINE`: current local Node `v24.16.0`, project requires `>=22 <23`.
- `npm ci` reported `2 moderate severity vulnerabilities`.

| Command | Result | Notes |
| --- | --- | --- |
| `npm ci` | PASS_WITH_WARNING | Engine warning on Node v24.16.0; 2 moderate vulnerabilities. |
| `npm run build` | PASS | Next static build generated 38 static pages. |
| `npm run release:manifest` | PASS | Generated `release-proof/artifact-manifest.json`. |
| `npm run check:static-links` | PASS | 39 HTML files checked; 30 sitemap URLs verified. |
| `npm run check:launch-live-config` | PASS | Public live/indexing/Metrica live; unsafe gates remain closed. |
| `npm run check:public-live-config` | PASS | Same live config guard passed. |
| `npm run check:tracking-no-pii` | PASS_AFTER_FIX | Initially failed on direct `ym(...)`; passed after typed Metrica bridge adjustment. |
| `npm run check:forms-crm-contract` | PASS | Forms disabled, no upload/live submit. |
| `npm run check:launch-readiness` | PASS_WITH_REMAINING_BLOCKERS | Existing staging/rollback/legal/CRM/Search Console blockers remain. |
| `npm run check:finalization` | PASS_AFTER_FIX | Initially failed through P0 semantic/evidence checks; passed after trailing-slash gate alignment. |
| `npm run brand:check` | PASS_WITH_WARNINGS | No fail-zone public claims; Avito/docs warning-zone matches remain. |
| `npm run check:p0-semantic` | PASS_AFTER_FIX | Now accepts `/policy/` canonical/sitemap for `trailingSlash: true`. |
| `npm run evidence:p0` | PASS | Regenerated P0 evidence. |
| `npm run check:p0-evidence` | PASS_AFTER_FIX | Metadata/sitemap proof now matches `/policy/`. |
| `npm run check:fns-blog-news` | PASS | Planned routes remain noindex/excluded; no live fetch/autopublish. |

## GitHub Actions Visibility

Pre-push tooling status:

- `gh` installed: `2.94.0`
- `gh auth status`: not logged into any GitHub hosts.
- GitHub connector tools are available for PR creation and workflow visibility checks after branch push.

Post-push check target:

- Branch: `codex/p0-03-sync-p0-02-evidence`
- Expected artifacts:
  - `dokumenty82-static-export-<sha>`
  - `dokumenty82-release-proof-<sha>`
- Run found: `PENDING_POST_PUSH_CHECK`
- Run URL: `PENDING_POST_PUSH_CHECK`
- Commit SHA: `PENDING_POST_PUSH_CHECK`
- Artifacts: `PENDING_POST_PUSH_CHECK`
- Artifact verdict: `CI_ARTIFACT_NOT_VISIBLE` until a workflow run and artifacts are visible.

## Verdict

`MAIN_SYNCED_P0_02_PUSHED_ACTIONS_NOT_VISIBLE`

This is the conservative release-state verdict until the post-push PR/Actions check proves a visible Site CI run and downloadable release artifacts for the pushed commit.

## Remaining HOLD

- CRM
- live forms
- upload
- paid traffic
- messaging links
- local profiles
- cookie/legal decision
- rollback drill
- owner/legal acceptance
- Search Console / Yandex Webmaster setup proof
- CI artifact traceability if Site CI artifacts remain invisible

## Next Recommended Task

If Actions and artifacts are visible after the PR is opened: `P0-04 - download artifacts and compare release manifest with production snapshot`.

If Actions are not visible after the PR is opened: `P0-04 - GitHub Actions settings / workflow visibility unblock`.

If artifacts are visible but production match is not proven: `P0-04 - production snapshot checksum compare`.
