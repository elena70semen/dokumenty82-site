# Stage 14A CI Build Proof Status

Status: `CONFIGURED_EXECUTION_NOT_PROVEN`

Public live: `HOLD`

Repository: `elena70semen/dokumenty82-site`

Source-of-truth repository: `elena70semen/dokumenty-dlya-biznesa`

## Purpose

This document records the current Stage 14A status for the standalone site repository.

Stage 14A is limited to CI stabilization and build proof. It does not authorize SEO/content rewrites, route expansion, visual changes, staging deployment or public live.

## Source-to-site requirement

The site repository is not an independent project. It is the website build/proof/deployment contour of the wider project **Документы для бизнеса**.

All site work must remain aligned with the source-of-truth repository:

```text
elena70semen/dokumenty-dlya-biznesa
```

For Stage 14A, source-of-truth usage is limited to:

- repository role;
- HOLD boundaries;
- launch gates;
- build/deploy safety;
- public-live restrictions.

## Site repository layout

The active site repository layout is standalone root-level Next.js:

```text
package.json
package-lock.json
app/
components/
lib/
public/
scripts/
evidence/
out/
.github/workflows/site-ci.yml
```

Do not use `code/` paths in this repository unless the owner explicitly approves a future restructuring.

## Current implementation status

Configured:

- `.github/workflows/site-ci.yml` exists.
- Workflow has `workflow_dispatch`.
- Workflow runs on `pull_request` and push to `main`.
- Workflow uses Node 22.
- Workflow uses root `package-lock.json` for npm cache.
- Workflow runs from repository root.
- Workflow builds before static link check.
- Workflow uploads artifact from `out/`.
- Artifact name includes commit SHA.
- `check:static-links` exists in `package.json`.
- `check:p0-full` includes `check:static-links` after build.
- `check:finalization` includes `check:static-links` and launch readiness.
- `AGENTS.md` defines source-to-site rules.
- `docs/source-to-site/source-to-site-alignment-contract-v1.md` defines alignment contract.

Not proven yet:

- A visible GitHub Actions `Site CI` run has not been observed through the API.
- Static export artifact has not yet been observed from a successful workflow run.
- CI green status is not yet proven.

## Required manual action

Open GitHub UI:

```text
dokumenty82-site -> Actions -> Site CI -> Run workflow -> main
```

Then verify:

- the run appears;
- the job `Build and verify static site` starts;
- the job passes or records a clear failing step;
- artifact `dokumenty82-static-export-<commit-sha>` is produced from `out/`.

## If the workflow is not visible

If `Site CI` is not visible in GitHub Actions, record the blocker as:

```text
GITHUB_ACTIONS_WORKFLOW_NOT_VISIBLE
```

Then check repository Actions settings manually.

## If the workflow fails

Record:

- failing step;
- command output summary;
- changed files needed;
- whether failure is Stage 14A-related or future-stage evidence-related.

Do not hide missing future evidence. Mark it as `MISSING_EXPECTED` when it is not required for Stage 14A public-live proof.

## Stage 14A completion condition

Stage 14A is complete only when one of these is true.

### Success

```text
SITE_CI_VISIBLE = true
SITE_CI_GREEN = true
STATIC_EXPORT_ARTIFACT_PRESENT = true
STATIC_LINK_CHECK_PASS = true
SOURCE_TO_SITE_ALIGNMENT_CONFIRMED = true
PUBLIC_LIVE_ALLOWED = false
```

### Explicit blocker

```text
SITE_CI_CONFIGURED = true
LOCAL_OR_REVIEW_CHECKS_DOCUMENTED = true
GITHUB_ACTIONS_BLOCKER_DOCUMENTED = true
SOURCE_TO_SITE_ALIGNMENT_CONFIRMED_OR_BLOCKED = true
PUBLIC_LIVE_ALLOWED = false
```

## Strict non-goals

Do not proceed in Stage 14A to:

- Yandex SEO changes;
- content strengthening;
- route expansion;
- page copy rewrites;
- visual redesign;
- Beget staging;
- public DNS;
- public live;
- analytics/Metrica;
- CRM/forms;
- public upload;
- messaging links;
- paid traffic.

## Current blocker

```text
SITE_CI_EXECUTION_NOT_PROVEN
```

## Current verdict

`GO WITH CONDITIONS` for Stage 14A CI/build proof.

`PUBLIC_LIVE_ALLOWED = false`.
