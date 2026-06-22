# Production Deploy Source Verification — 2026-06-22

Project: `dokumenty82.ru` / `Документы для бизнеса`

Repository: `elena70semen/dokumenty82-site`

PR: `#36`

Status: `DEPLOY_SOURCE_PARTIALLY_PROVEN`

Paid traffic: `HOLD`

Forms/CRM: `OFF`

Metrika counter: `109869928`

## 1. Executive Summary

The current `origin/main` branch is a static production snapshot, not a full
Next.js source tree. Live `https://dokumenty82.ru/` strongly matches this static
snapshot by root HTML, robots, sitemap, favicon files and Metrika markers.

The deploy source is therefore partially proven at the artifact level, but the
production deploy workflow is not proven: live is served by `nginx/1.24.0
(Ubuntu)`, GitHub Pages is not exposed by the API, and the current `main`
snapshot has no `.github` workflow files.

Do not merge, do not deploy, do not start paid traffic until owner/deployer
confirms the production deploy source and release procedure.

## 2. Repository Main Classification

| Check | Result |
|---|---|
| Default branch | `main` |
| package.json | `ABSENT` |
| Static snapshot files | `PRESENT` |
| .github workflows | `ABSENT_IN_CURRENT_MAIN` |
| Classification | `STATIC_SNAPSHOT` |

Evidence:

- Root static files are present: `index.html`, `404.html`, `robots.txt`,
  `sitemap.xml`, `favicon.svg`, `favicon.ico`.
- Route-level static HTML files are present.
- `package.json` is absent from current `origin/main`.
- `.github` workflow files are absent from current `origin/main`.

## 3. GitHub Hosting Signals

| Signal | Result |
|---|---|
| Repository | `elena70semen/dokumenty82-site` |
| Visibility | `PUBLIC` |
| Default branch | `main` |
| Last pushed | `2026-06-22T09:34:04Z` |
| GitHub Pages API | `DISABLED_OR_NOT_CONFIGURED_HTTP_404` |
| Pages source branch | `UNKNOWN` |
| Pages source path | `UNKNOWN` |
| Custom domain | `UNKNOWN` |
| CNAME file | `CNAME_NOT_PRESENT` |
| Workflow list | `NONE_VISIBLE_IN_CURRENT_MAIN` |
| Recent runs | `HISTORICAL_SITE_CI_RUNS_PRESENT` |

Recent GitHub runs show historical `Site CI` activity, including successful
`main` push runs on 2026-06-18. Those runs do not prove the current production
deploy workflow.

GitHub Pages API response:

```text
HTTP 404 Not Found
```

## 4. Live Hosting Signals

| URL | Status | Notes |
|---|---|---|
| `/` | `200` | `text/html`, `content-length: 184701` |
| `/favicon.svg` | `200` | `image/svg+xml`, `content-length: 675` |
| `/favicon.ico` | `200` | `image/x-icon`, `content-length: 2742` |
| `/robots.txt` | `200` | `text/plain`, `content-length: 459` |
| `/sitemap.xml` | `200` | `text/xml`, `content-length: 4981` |
| fake URL | `404` | `text/html`, `content-length: 162`; status is 404, but the custom static 404 page is not served for this fake URL. |

Hosting hints:

```text
server: nginx/1.24.0 (Ubuntu)
last-modified: Thu, 18 Jun 2026 09:19:32 GMT
etag: present on root/favicon/robots/sitemap
cache-control: public, max-age=300
```

Metrika markers in live root HTML:

```text
109869928: present
mc.yandex.ru: present
ym(109869928, ...): present
/watch/109869928: present
webvisor:true: present
ecommerce:\"dataLayer\": present
reachGoal in root HTML: absent
```

## 5. Live vs Main Static Snapshot

| Artifact | Match | Notes |
|---|---|---|
| `robots.txt` | `YES` | Same size and hash. |
| `sitemap.xml` | `YES` | Same size, hash and 30 URL contour. |
| `favicon.svg` | `YES` | Same size and hash. |
| `favicon.ico` | `YES` | Same size and hash after binary download. |
| Root `index.html` | `YES` | Same size and hash. |
| Metrika markers | `YES_FOR_ROOT_HTML` | Counter/init/watch/Webvisor/ecommerce markers match root HTML. |
| 404 behavior | `PARTIAL` | Fake URL returns HTTP 404, but nginx default 162 byte body, not the static `404.html` body from `main`. |

Sitemap count:

```text
live: 30
main: 30

main-only:

live-only:
```

Artifact hashes:

```text
robots.txt: live/main sha256 prefix 7c4906a7b2eae9b2
sitemap.xml: live/main sha256 prefix d6281b59c6561d11
favicon.svg: live/main sha256 prefix 3b76442d56fa009f
favicon.ico: live/main sha256 prefix b91327e4af68d9df
index.html: live/main sha256 prefix 86b23e69fc28c5f0
```

## 6. Deploy Source Verdict

Current verdict:

```text
DEPLOY_SOURCE_PARTIALLY_PROVEN
```

Reason:

```text
Live artifacts match current origin/main static snapshot strongly enough to
identify main as the likely current production artifact source. The deployment
mechanism remains unproven because live is served by nginx, GitHub Pages is not
configured/exposed, no current-main workflows are visible, and no owner/deployer
confirmation has been recorded.
```

This is not a merge, deploy, or paid traffic approval.

## Owner Intake Link

Owner decision intake was added:

`docs/ads/owner-decision-intake-2026-06-22.md`

Deploy-source status remains:

`DEPLOY_SOURCE_PARTIALLY_PROVEN`

Owner/deployer must explicitly confirm the deploy source before merge/deploy/ads.

## 7. Owner / Deployer Confirmation Needed

Owner/deployer must confirm:

- [ ] Which branch/folder/server is the real production deploy source.
- [ ] Whether `main` static snapshot is the approved production source.
- [ ] Whether GitHub Pages, VPS, Beget, or another workflow is used.
- [ ] Who performs deploy.
- [ ] What exact smoke-check is required after deploy.
- [ ] Whether PR #36 can remain documentation-only or must be merged before
  final owner GO.

## 8. Recommendation

Recommended current status:

```text
Paid traffic: HOLD
PR #36: Draft
Merge: NO
Deploy: NO
Ads: NO
```

Next:

```text
Collect explicit owner/deployer confirmation in PR #36 comment or signed owner
document.
```
