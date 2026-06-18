# P1-01 Favicon Yandex Webmaster Cleanup

## Scope

Fix the root favicon paths in the actual production site repository, `elena70semen/dokumenty82-site`, while preserving the P0-07 production-safe contour:

- Yandex Metrica remains enabled.
- Cookie notice remains enabled.
- Policy analytics/cookies disclosure remains present.
- Footer Yandex rating badge remains absent.
- Live forms, CRM, upload, paid traffic, messaging and local profiles remain closed.

This task does not change SEO copy, money pages, routes, prices, deadlines, public claims, legal identifiers, office/floor/hours or server credentials.

## Inputs

| Item | Value |
| --- | --- |
| Repository | `elena70semen/dokumenty82-site` |
| Branch | `codex/p1-01-favicon-yandex-webmaster-cleanup` |
| PR | `#34` |
| Production baseline | P0-07, production aligned to verified P0-06 artifact |
| Existing safe favicon source | `public/assets/brand/favicon.svg` |

## Why source repo PR #95 is not deploy source

The production site currently corresponds to `elena70semen/dokumenty82-site`, not to `elena70semen/dokumenty-dlya-biznesa/code`.

The source-of-truth repository may contain planning, canonical text and governance material, but it is not the deployable production artifact for the current site. Deploying source repo code directly could regress the current live P0-07 contour, including Yandex Metrica `109869928`, the cookie notice and no-PII tracking safeguards.

## Pre-change production favicon status

Checked from live production before this change:

| URL | Status | Notes |
| --- | --- | --- |
| `https://dokumenty82.ru/favicon.svg` | `404` | Root SVG favicon absent |
| `https://dokumenty82.ru/favicon.ico` | `404` | Root ICO favicon absent |
| `https://dokumenty82.ru/assets/brand/favicon.svg` | `200` | Existing nested brand favicon source present |

## Favicon assets added

| Asset | Status | Source |
| --- | --- | --- |
| `public/favicon.svg` | Added | Copied from the existing site-safe `public/assets/brand/favicon.svg` shape |
| `public/favicon.ico` | Added | Generated from `public/favicon.svg` as a multi-size ICO: `16`, `32`, `48`, `64` |
| `public/assets/brand/favicon.svg` | Updated metadata only | Removed internal draft wording from `<title>` and `<desc>` |

The favicon remains a neutral `ДБ` mark in the existing site colors. It does not use the old `R` / Rahima identity and does not imitate an official, government, tax-service or banking status.

## Metadata changes

`app/layout.tsx` now points favicon metadata to root assets:

| Metadata field | Value |
| --- | --- |
| `icons.icon` | `/favicon.svg` |
| `icons.shortcut` | `/favicon.ico` |

No `metadataBase`, robots or Yandex Metrica script behavior was changed.

## Metrica / Cookie / No-PII Preservation

Rendered static HTML after build confirmed:

| Check | Result |
| --- | --- |
| `109869928` present | PASS |
| Approved Yandex Metrica init present | PASS |
| Metrica noscript image present | PASS |
| Cookie notice marker/text present | PASS |
| `/policy/` contains `Аналитика, cookies и технические события` | PASS |
| Footer Yandex rating badge absent | PASS |
| Public reviews/ratings block absent | PASS |
| Live POST/action forms absent | PASS |
| Public upload input absent | PASS |
| CRM/webhook endpoint pattern absent | PASS |
| `goal_form_submit_success` not active in runtime event layer | PASS |

## Checks run

Local Node warning: `npm ci` ran on Node `v24.16.0`, while the project declares `>=22 <23`. This is an expected local warning; Site CI should continue to use Node 22.

| Command | Result |
| --- | --- |
| `npm ci --prefer-offline --no-audit --no-fund --loglevel=warn` | PASS with local Node version warning |
| `npm run build` | PASS |
| Rendered favicon/Metrica/cookie/no-PII HTML check | PASS |
| `npm run check:tracking-no-pii` | PASS |
| `npm run evidence:owner-legal-privacy` | PASS |
| `npm run check:owner-legal-privacy` | PASS |
| `npm run check:forms-crm-contract` | PASS |
| `npm run check:launch-live-config` | PASS |
| `npm run check:public-live-config` | PASS |
| `npm run check:launch-readiness` | PASS with existing HOLD blockers |
| `npm run check:finalization` | PASS with existing HOLD blockers |
| `npm run brand:check` | PASS, warning-zone documentation matches only |
| `npm run check:static-links` | PASS |
| `npm run release:manifest` | PASS |
| GitHub Site CI | PASS on PR head before deploy |

CI run IDs and artifact digests are intentionally not hard-coded in this tracked
release note. They are self-referential for a PR branch and become stale after
any documentation-only amend. Use the GitHub Actions run attached to the final
PR head as the deploy artifact source.

## Deploy status

`NOT_DEPLOYED_IN_THIS_TASK`

PR #34 Site CI passed. Production deploy should happen only after review, merge and verified artifact selection.

## Post-deploy production verification

Not run yet because this task has not been deployed.

Required after deploy:

| Check | Expected |
| --- | --- |
| `/favicon.svg` | `200` |
| `/favicon.ico` | `200` |
| `/assets/brand/favicon.svg` | `200` |
| `/` | `200`, still contains Metrica `109869928` and cookie notice |
| `/robots.txt` | `200` |
| `/sitemap.xml` | `200` |
| 14 key URLs | `200`, index/follow |
| Footer rating badge | absent |
| CRM/forms/upload | absent/closed |
| Production checksum compare | pending, must match deployed artifact |

## Verdict

`FAVICON_READY_NOT_DEPLOYED`

Both root favicon assets are present locally, metadata points to them, and PR #34 Site CI passed. The current production favicon issue is expected to close after the reviewed PR is merged and the verified artifact is deployed.

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
- deadline/result promises
- public review/rating widgets
- legal IDs
- office/floor/hours
- rollback drill if still required
- post-deploy favicon verification in Yandex Webmaster

## Next recommended task

Open the PR, wait for Site CI, then merge/deploy the verified artifact and run the production favicon + P0-07 preservation smoke check.
