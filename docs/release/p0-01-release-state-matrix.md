# P0-01 Release-State Matrix

Date: 2026-06-15
Production: `https://dokumenty82.ru/`
Site repository: `elena70semen/dokumenty82-site`
Source-of-truth repository reviewed: `elena70semen/dokumenty-dlya-biznesa` at local mirror `C:\new\dokumenty-dlya-biznesa-origin-main`

## Verdict

`PUBLIC_LIVE_WITH_GOVERNANCE_DRIFT`

Production is serving the full public site with indexable public pages. The site repository now models this as `PUBLIC_LIVE`, but source-of-truth release gates still describe public live as `HOLD / NOT_PUBLIC_LAUNCH_READY`. The correct current truth is not a technical launch; it is live production with governance, legal/privacy, CI artifact and rollback traceability still incomplete.

## Sources Reviewed

Source-of-truth:

- `AGENTS.md`
- `docs/00-start/source-of-truth.md`
- `docs/00-start/active-canon-index.md`
- `docs/00-start/hold-register.md`
- `docs/seo/route-registry.md`
- `docs/seo/yandex-seo-playbook.md`
- `docs/qa/yandex-seo-release-gate.md`
- `docs/operations/live-launch-gates-v1.md`
- `docs/launch/live-launch-roadmap-v1.md`
- `docs/legal/forms-cookies-analytics-crm-compliance.md`

Site repository:

- `AGENTS.md`
- `README.md`
- `package.json`
- `next.config.ts`
- `lib/feature-flags.ts`
- `app/layout.tsx`
- `public/robots.txt`
- `public/sitemap.xml`
- `.github/workflows/site-ci.yml`
- `scripts/check-launch-live-config.mjs`
- `scripts/check-static-site-links.mjs`
- `scripts/generate-p0-evidence.mjs`
- `scripts/check-p0-evidence.mjs`
- `STAGING_HOSTING_ROLLBACK_REPORT.md`
- `LOCAL_P0_BUILD.md`
- `CANONICAL_INTEGRATION_REPORT.md`
- `BROWSER_ACCESSIBILITY_EVIDENCE_REPORT.md`
- `evidence/owner-go-no-go/*`
- `evidence/staging-hosting-rollback/*`

## Matrix

| Control | Source-of-truth expected state | Site repo implementation state | Production observed state | Verdict | Severity | Required action |
| --- | --- | --- | --- | --- | --- | --- |
| `publicLiveAllowed` | `false` in live launch gates / roadmap until final approvals | `true` in `lib/feature-flags.ts` | Public pages return `200` and `index, follow` | Drift accepted as current production truth | P0 | Sync source-of-truth release gates to explicit production-live-with-conditions state. |
| `siteRuntimeMode` | `STATIC_CONTACT_ONLY_LAUNCH_CANDIDATE` / HOLD | `PUBLIC_LIVE` | Full public static site is live | Drift | P0 | Keep site runtime as `PUBLIC_LIVE`; document remaining gates. |
| robots meta | Public indexing only after gates | Root metadata gates robots by `publicLiveAllowed`; current value produces index/follow | Production public pages return `index, follow` | Live confirmed | P0 | Keep public pages indexable; keep held routes noindex. |
| `robots.txt` | Public pages open only after approved live | `Allow: /`, `Disallow: /internal/`, canonical sitemap | Production `robots.txt` returns `200` and same policy | Live confirmed | P0 | Keep internal proof routes blocked. |
| `sitemap.xml` | Only approved canonical routes; no content foundation routes | `public/sitemap.xml` contains 30 canonical URLs; blog/news/FAQ/internal excluded | Production `sitemap.xml` returns `200` | Pass with governance drift | P1 | Keep sitemap generated/static proof and exclude held routes. |
| canonical host | `https://dokumenty82.ru/` only | Metadata base and sitemap use `https://dokumenty82.ru/` | Production canonicals use `https://dokumenty82.ru/` | Pass | P0 | Continue blocking old-domain and alias usage. |
| canonical per P0 page | Each P0 page has canonical route | P0 evidence checks route canonicals | Production checked P0 URLs have canonical tags; `/policy` canonical is `/policy` while served final URL normalizes to `/policy/` | Pass with minor serving drift | P2 | Decide later whether to adjust `/policy` serving slash; canonical remains correct. |
| NAP: brand | `Документы для бизнеса` ACTIVE | Header/footer/content use current brand | Brand visible in production HTML | Pass | P0 | Do not mix old names/domains into public site or schema. |
| NAP: phone | `+7 (978) 998-72-22`, `tel:+79789987222` ACTIVE | Phone text and tel links present | Phone visible and `tel:` link present | Pass | P0 | Keep as single public phone unless source changes. |
| NAP: address | `Республика Крым, Симферополь, ул. им. Мате Залки, 1` ACTIVE | Address appears in content/contact areas | Address marker `Мате Залки` visible in production HTML | Pass | P0 | Do not add office/floor/hours/legal IDs without approval. |
| NAP: email | `info@dokumenty82.ru` TARGET only | No public `mailto:` or visible email found | No public email observed in checked production HTML | Pass | P1 | Publish email only after domain mail confirmation. |
| Metrica / analytics | Metrica requires legal/no-PII/cookie evidence; generic analytics gated | `metricaEnabled=true`, `analyticsEnabled=false`; no live form success | Production contains Yandex Metrica counter `109869928` | Live with evidence drift | P0 | Keep no-PII tracking check; document cookie/legal decision; do not enable form success goals. |
| `formsLive` | Disabled until backend/CRM acceptance | `false`; placeholders enabled | Forms are placeholders; no live submit proof | Pass | P0 | Keep placeholders until backend/CRM acceptance. |
| `crmEnabled` | Disabled until CRM acceptance | `false` | No CRM endpoint/public success observed | Pass | P0 | Do not add webhooks/endpoints. |
| `paidTrafficAllowed` | Blocked until sales/legal/CRM gates | `false` | No paid traffic enablement in site repo | Pass | P0 | Keep blocked. |
| `localProfilesPublic` | Owner-approved only | `false` | No local profile publication code observed | Pass | P1 | Separate owner-approved local entity/profile task required. |
| messaging flags | MAX/Telegram require privacy/CRM/rendered QA | `maxEnabled=false`, `telegramEnabled=false`, `messagingEnabled=false` | No public messaging deep links observed | Pass | P0 | Keep blocked. |
| `cookieNoticeEnabled` | Requires owner/legal decision | `false` | No cookie notice observed | Drift with Metrica live | P0 | Owner/legal decision required because Metrica is live. |
| policy/legal status | `/policy` route exists; legal review required | `/policy` published and indexable; legal/privacy evidence still says review required | Production `/policy` returns `200`, index/follow | Live with legal-review drift | P0 | Do not claim legal approved until owner/legal proof exists. |
| production deployment proof | Source says deploy/staging/rollback not started | Site has manual VPS release evidence from current ops | Server proof observed current release `20260615-202454`, Nginx active, Caddy inactive, no UDP/443/QUIC config | Manual deploy observed | P0 | Store deployment proof without secrets; establish CI artifact traceability. |
| CI workflow proof | Site CI should build/export/check/upload artifact | Workflow uses Node 22, `npm ci`, build, checks, artifact upload; P0-01 adds release manifest upload | GitHub Actions run/artifacts not visible through unauthenticated API; connector returned no runs for checked commit | Config pass, run NOT_PROVEN | P0 | Verify next GitHub Actions run in GitHub UI or authenticated tooling. |
| rollback proof | Rollback drill required | Historical local rollback evidence exists; P0-01 runbook added | Production rollback drill not executed in this task | Runbook pass, drill NOT_PROVEN | P0 | Perform owner-approved rollback drill separately. |
| sitemap source: static or generated | Only approved URLs | Static `public/sitemap.xml`, copied to `out/` on build | Production `sitemap.xml` served as static XML | Pass | P1 | Keep static sitemap under review until generation is automated. |
| noindex pages | Blog/news foundation, FAQ/internal proof excluded/noindex | `lib/routes.ts` and page metadata mark held routes noindex; static-link check excludes them from sitemap | Not in production sitemap; public checks focused on approved routes | Pass | P1 | Keep content foundation noindex until approval. |
| indexed pages | Approved public routes only | 30 sitemap URLs | Production public routes checked return index/follow | Pass | P0 | Monitor Yandex Webmaster after submission. |
| route registry coverage | Core, hubs, money-pages, diagnostics, legal route | Static export contains 39 HTML files; sitemap has 30 approved indexable URLs | Production priority routes return `200` | Pass with evidence drift | P1 | Keep route registry coverage in evidence; do not add new URLs in P0-01. |

## Remaining Gates

- Source-of-truth governance update for production live state.
- Owner/legal privacy decision for Metrica/cookie disclosure and `/policy`.
- CRM/forms acceptance before any live submit or success state.
- GitHub Actions artifact proof after the updated workflow runs.
- Production rollback drill proof.
- Paid traffic, local profile publication and messaging links remain blocked.

## Final Release-State Verdict

`PUBLIC_LIVE_WITH_GOVERNANCE_DRIFT`
