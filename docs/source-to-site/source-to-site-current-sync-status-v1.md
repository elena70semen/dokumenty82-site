# Source-To-Site Current Sync Status V1

Status: `READY_WITH_CONDITIONS`

Site repository: `elena70semen/dokumenty82-site`

Source-of-truth repository: `elena70semen/dokumenty-dlya-biznesa`

Public launch: `NOT_PUBLIC_LAUNCH_READY`

`PUBLIC_LIVE_ALLOWED = false`

## Purpose

This document records the current Stage 15/16/17/18A/18B/18C/18D/18E/18H source-to-site sync state inside the standalone site repository.

The site repository is not independent. Every site route, content block, metadata rule, collector, launch gate and deployment decision must remain traceable to the source-of-truth repository.

## Repository Verification

| Area | Status | Evidence |
| --- | --- | --- |
| Site checkout | `PASS` | Current checkout is `/Users/office-9102/Documents/GitHub/dokumenty82-site`. |
| Site remote | `PASS` | `https://github.com/elena70semen/dokumenty82-site.git`. |
| Site branch | `PASS` | `stage18/route-content-blocks-site`. |
| Root layout | `PASS` | `package.json`, `package-lock.json`, `app/`, `components/`, `lib/`, `public/`, `scripts/`, `evidence/`, `.github/workflows/site-ci.yml`, `README.md`. |
| Source checkout | `PASS` | `/Users/office-9102/Documents/Dokumenty-dlya-biznesa`. |
| Source remote | `PASS` | `https://github.com/elena70semen/dokumenty-dlya-biznesa.git`. |

## Source Files Reviewed

Core:

- `AGENTS.md`
- `README.md`
- `docs/00-start/active-canon-index.md`
- `docs/00-start/hold-register.md`

Source-to-site and handoff:

- `docs/source-to-site/final-site-repo-handoff-index-v1.md`
- `docs/source-to-site/site-repo-stage-16-assembly-handoff-v1.md`
- `docs/codex/site-repo-stage-16-assembly-master-prompt-v1.md`
- `docs/source-to-site/site-repo-access-and-owner-action-v1.md`
- `docs/source-to-site/OWNER-RUN-NEXT-CODEX.md`
- `docs/source-to-site/source-to-site-current-blockers-index-v1.md`

SEO, routes and semantics:

- `docs/seo/route-registry.md`
- `docs/seo/seo-canon.md`
- `docs/seo/semantic-core-v1.md`
- `docs/seo/semantic-analysis-and-priority-plan-v1.md`
- `docs/seo/metadata-completion-and-semantic-gap-plan-v1.md`
- `docs/seo/route-cannibalization-intent-boundary-audit-v1.md`
- `docs/seo/seo-structure-strengthening-audit-v1.md`
- `docs/seo/yandex-seo-playbook.md`
- `docs/seo/stage-16-route-group-semantic-coverage-v1.md`
- `docs/seo/stage-18a-semantic-seo-master-audit-v1.md`
- `docs/seo/stage-18a-route-semantic-cluster-map-v1.md`
- `docs/seo/stage-18a-internal-linking-and-anti-cannibalization-map-v1.md`
- `docs/content/stage-18b-page-block-copy-and-leadgen-architecture-v1.md`
- `docs/content/stage-18b-route-group-content-blueprint-v1.md`
- `docs/ux/stage-18b-leadgen-and-client-information-map-v1.md`
- `docs/frontend/stage-18c-layout-foundation-and-component-system-v1.md`
- `docs/frontend/stage-18c-route-template-layout-map-v1.md`
- `docs/qa/stage-18c-layout-accessibility-and-mobile-qa-checklist-v1.md`
- `docs/content/stage-18d-homepage-structure-and-content-architecture-v1.md`
- `docs/ux/stage-18d-homepage-route-and-cta-map-v1.md`
- `docs/content/stage-18d-homepage-copy-blueprint-v1.md`
- `docs/strategy/stage-18e-full-product-site-foundation-master-plan-v1.md`
- `docs/content/stage-18e-public-information-and-content-matrix-v1.md`
- `docs/content/stage-18e-route-content-completeness-matrix-v1.md`
- `docs/content/stage-18e-strong-page-block-library-v1.md`
- `docs/content/stage-18h-route-copy-block-quality-plan-v1.md`
- `docs/ux/stage-18h-navigation-menu-and-route-flow-plan-v1.md`

Services, content and UX:

- `docs/services/service-catalog-2026-v1.md`
- `docs/services/service-source-ledger-2026.md`
- `docs/services/passports/`
- `docs/content/stage-15-text-quality-standards-v1.md`
- `docs/content/stage-16-selling-page-block-library-v1.md`
- `docs/ux/stage-16-lead-path-and-conversion-architecture-v1.md`

Frontend, QA and operations:

- `docs/frontend/stage-15-mobile-layout-standards-v1.md`
- `docs/frontend/stage-15-semantic-markup-accessibility-standards-v1.md`
- `docs/frontend/stage-16-route-implementation-checklist-v1.md`
- `docs/frontend/stage-12-wave1-route-page-build-v0.1.md`
- `docs/frontend/stage-12-wave1-route-component-map-v0.1.md`
- `docs/qa/stage-12-wave1-route-qa-checklist-v0.1.md`
- `docs/operations/live-launch-gates-v1.md`
- `docs/operations/project-finalization-readiness-v1.md`
- `docs/operations/launch-finalization-roadmap-v1.md`
- `docs/source-to-site/transport-protocol-launch-gate-sync-v1.md`

## Stage 16 Source Doc Closure

Stage 17H and Stage 17I resolved and synced these former `MISSING_EXPECTED` Stage 16 source docs:

- `docs/seo/stage-16-yandex-semantic-service-map-v1.md`
- `docs/content/stage-16-page-block-blueprints-v1.md`
- `docs/content/stage-16-client-need-hooks-and-lead-path-v1.md`
- `docs/strategy/stage-16-selling-seo-content-architecture-v1.md`

They are now source-backed operational docs with `READY_WITH_CONDITIONS` status. They do not approve public copy, owner/legal decisions, public SEO launch or public live.

## Site Files Reviewed

- `AGENTS.md`
- `README.md`
- `.github/workflows/site-ci.yml`
- `package.json`
- `app/layout.tsx`
- `app/page.tsx`
- route pages under `app/`
- `components/`
- `lib/content.ts`
- `lib/routes.ts`
- `lib/seo/semantic-route-data.json`
- `lib/seo/semantic-route-data.ts`
- `lib/routes/route-page-data.ts`
- `lib/feature-flags.ts`
- `public/robots.txt`
- `public/sitemap.xml`
- `scripts/`
- `docs/`
- `evidence/`
- `server/nginx/dokumenty82.static-tcp-only.reference.conf`

## Alignment Status

| Area | Status | Note |
| --- | --- | --- |
| Source-to-site rule | `PASS` | Site AGENTS and alignment contract require source verification before site work. |
| Canon and NAP | `PASS` | Centralized in `lib/content.ts`; no conflicting NAP found in the edited scope. |
| Route model | `READY_WITH_CONDITIONS` | Current route manifest follows source registry, includes Stage 17D/E route metadata, page-block, FAQ, schema-boundary and HOLD-risk fields, and keeps noindex/internal routes out of sitemap. |
| Stage 16 Yandex semantic service map | `READY_WITH_CONDITIONS` | `docs/seo/stage-16-yandex-semantic-service-map-v1.md` resolved in source and synced during Stage 17H. |
| Stage 16 selling SEO content architecture | `READY_WITH_CONDITIONS` | `docs/strategy/stage-16-selling-seo-content-architecture-v1.md` resolved in source and synced during Stage 17I. |
| Stage 16 page block blueprints | `READY_WITH_CONDITIONS` | `docs/content/stage-16-page-block-blueprints-v1.md` resolved in source and synced during Stage 17H. |
| Stage 16 client need hooks and lead path | `READY_WITH_CONDITIONS` | `docs/content/stage-16-client-need-hooks-and-lead-path-v1.md` resolved in source and synced during Stage 17H. |
| Full service coverage | `READY_WITH_CONDITIONS` | `docs/seo/stage-17-service-route-coverage-audit-v1.md`: 36 indexed routes hardened with conditions, 3 foundation noindex routes, 0 source-approved routes missing from the site code. |
| Owner/legal/content QA | `READY_WITH_CONDITIONS` | `docs/qa/stage-17f-owner-legal-content-qa-v1.md`: 36 indexed routes reviewed for owner/legal/content readiness; final approval remains gated. |
| Public copy review checklist | `READY_FOR_OWNER_REVIEW` | `docs/qa/stage-17f-public-copy-review-checklist-v1.md`: route-by-route checklist complete; every route remains `NOT_READY_FOR_PUBLIC_LIVE`. |
| Stage 17G owner/legal sign-off packet | `READY_FOR_OWNER_REVIEW` | `docs/owner-review/stage-17g-owner-legal-signoff-packet-v1.md`: prepares human review and does not approve public live. |
| Stage 17G route decision log | `READY_FOR_OWNER_REVIEW` | `docs/owner-review/stage-17g-route-decision-log-v1.md`: all 36 indexed routes included, all remain `NOT_PUBLIC_LIVE_READY`. |
| Stage 17G go/no-go checklist | `READY_WITH_CONDITIONS` | `docs/owner-review/stage-17g-go-no-go-review-checklist-v1.md`: public-live blockers remain active. |
| Stage 17G owner review index | `READY_FOR_OWNER_REVIEW` | `docs/owner-review/stage-17g-owner-review-index-v1.md`: short owner/legal review entry point. |
| Stage 17H human decision intake protocol | `READY_FOR_OWNER_REVIEW` | `docs/owner-review/stage-17h-human-decision-intake-protocol-v1.md`: defines how future human decisions may be recorded without fake approvals. |
| Stage 17H blocker closure roadmap | `READY_WITH_CONDITIONS` | `docs/launch/stage-17h-blocker-closure-roadmap-v1.md`: lists safe closure path for remaining blockers without closing them. |
| Stage 17I commit readiness worktree audit | `READY_WITH_CONDITIONS` | `docs/launch/stage-17i-commit-readiness-worktree-audit-v1.md`: records commit-readiness conditions without staging, committing, pushing or launching. |
| Stage 17J worktree integration and local commit readiness | `READY_WITH_CONDITIONS` | `docs/launch/stage-17j-worktree-integration-and-local-commit-readiness-v1.md`: inventories source/site dirty worktrees and permits local commits only after checks pass; push, merge, deploy and public live remain blocked. |
| Stage 18A semantic SEO foundation | `READY_WITH_CONDITIONS` | Three Stage 18A source docs are synced byte-for-byte; site route manifest now consumes `lib/seo/semantic-route-data.json`; `npm run check:semantic-seo` writes `evidence/seo/stage18-semantic-seo-quality.json`. |
| Stage 18B/C/D/E product foundation | `READY_WITH_CONDITIONS` | 13 source docs are synced byte-for-byte; runtime product-foundation layer, homepage structure, route block support, page-block/layout/homepage/public-foundation guardrails and evidence are present. |
| Stage 18H route content/navigation foundation | `READY_WITH_CONDITIONS` | 2 source docs are synced byte-for-byte; top-level route-family navigation includes `Налоги и режимы`; route templates and product foundation expose Stage 18H markers; `npm run check:route-content` writes `evidence/content/stage18-route-content-and-navigation.json`. |
| Feature flags | `PASS` | Live forms, CRM success, analytics, Metrica, messaging, map and cookie notice remain false. |
| Forms/uploads | `PASS` | Placeholder-only; no live upload or false success is enabled. |
| SEO/indexing | `READY_WITH_CONDITIONS` | Sitemap excludes blog/news, FAQ and internal proof routes; Stage 18A semantic route data covers 36 indexed and 3 noindex foundation routes; Webmaster/indexing evidence still required before live. |
| Project vector | `VECTOR_ALIGNED_WITH_CONDITIONS` | `docs/launch/stage-17-project-vector-audit-v1.md`; no major drift detected. |
| Transport gate | `READY_WITH_CONDITIONS / PROOF_MISSING` | TCP HTTPS baseline preserved; HTTP/3/QUIC/UDP/443/Alt-Svc h3/listen quic remain blocked by default. |
| Public live | `BLOCKED` | `PUBLIC_LIVE_ALLOWED = false`. |

## Drift Found

- Source handoff/status docs copied from `dokumenty-dlya-biznesa` still describe the earlier access blocker as historical source context.
- Current site-side status supersedes that operational blocker for this checkout: site access is now verified.
- Public live, transport proof, owner/legal, CRM/forms/analytics and staging evidence blockers remain active.

## Current Blockers

- `PUBLIC_LIVE_ALLOWED = false`
- final public copy and owner/legal approval remain required for hardened indexed routes;
- Stage 17G owner/legal acceptance remains `MISSING_EXPECTED`;
- CRM/forms/analytics acceptance remains `MISSING_EXPECTED`;
- browser/mobile/accessibility evidence still requires current proof after material site changes;
- staging deploy and rollback proof remain `MISSING_EXPECTED`;
- HTTP/3/QUIC transport proof remains `MISSING_EXPECTED`;
- Search Console/Yandex Webmaster setup remains `MISSING_EXPECTED`;
- Stage 18A semantic SEO evidence is local QA evidence only and does not approve live indexing;
- Stage 18B/C/D/E product foundation evidence is local QA evidence only and does not approve owner/legal acceptance, CRM/forms/analytics acceptance, staging, transport or public live;
- Stage 18H route content/navigation evidence is local QA evidence only and does not approve final public copy, owner/legal acceptance, route copy, `/policy`, CRM/forms/analytics acceptance, staging, transport or public live;
- no known Stage 16 source document placeholder remains after Stage 17I.

## Release Verdict

`GO WITH CONDITIONS`

Stage 15/16/17/18A/18B/18C/18D/18E/18H source-to-site sync is ready with conditions for local/build QA and later owner/legal route review. It does not approve public live.

`PUBLIC_LIVE_ALLOWED = false`
