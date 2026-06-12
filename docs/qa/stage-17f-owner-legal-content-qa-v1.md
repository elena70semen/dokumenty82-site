# Stage 17F Owner / Legal / Content QA V1

Status: `READY_WITH_CONDITIONS`

Release verdict: `GO WITH CONDITIONS`

Public launch: `NOT_PUBLIC_LAUNCH_READY`

`PUBLIC_LIVE_ALLOWED = false`

## 1. Purpose

This QA pass reviews the 36 indexed source-approved routes after Stage 17D/E hardening.

The goal is to verify that route copy, metadata direction, page-block structure, lead path and internal linking are safe enough for later owner/legal/content review. This document does not approve public live, paid traffic, live forms, CRM, analytics, uploads, messaging, final public copy, public profiles or transport protocol changes.

## 1.1 Stage 17G Owner Review Packet

Stage 17G prepares the practical owner/legal review layer from this QA pass:

- `docs/owner-review/stage-17g-owner-legal-signoff-packet-v1.md`
- `docs/owner-review/stage-17g-route-decision-log-v1.md`
- `docs/owner-review/stage-17g-go-no-go-review-checklist-v1.md`
- `docs/owner-review/stage-17g-owner-review-index-v1.md`

Stage 17G status is `READY_FOR_OWNER_REVIEW`. It does not approve public live or route approval.

## 2. Source Files Reviewed

- `AGENTS.md`
- `README.md`
- `docs/00-start/active-canon-index.md`
- `docs/00-start/hold-register.md`
- `docs/strategy/repository-operating-standard-v1.md`
- `docs/strategy/stage-17-unified-work-sequence-v1.md`
- `docs/seo/route-registry.md`
- `docs/seo/seo-canon.md`
- `docs/seo/semantic-core-v1.md`
- `docs/seo/semantic-analysis-and-priority-plan-v1.md`
- `docs/seo/metadata-completion-and-semantic-gap-plan-v1.md`
- `docs/seo/route-cannibalization-intent-boundary-audit-v1.md`
- `docs/seo/seo-structure-strengthening-audit-v1.md`
- `docs/seo/yandex-seo-playbook.md`
- `docs/seo/stage-16-route-group-semantic-coverage-v1.md`
- `docs/services/service-catalog-2026-v1.md`
- `docs/services/service-source-ledger-2026.md`
- `docs/services/passports/`
- `docs/content/stage-15-text-quality-standards-v1.md`
- `docs/content/stage-16-selling-page-block-library-v1.md`
- `docs/ux/stage-16-lead-path-and-conversion-architecture-v1.md`
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

Stage 17H and Stage 17I resolved and synced the former `MISSING_EXPECTED` source files:

- `docs/seo/stage-16-yandex-semantic-service-map-v1.md`
- `docs/strategy/stage-16-selling-seo-content-architecture-v1.md`
- `docs/content/stage-16-page-block-blueprints-v1.md`
- `docs/content/stage-16-client-need-hooks-and-lead-path-v1.md`

These files support source review and route QA. They do not approve final public copy, owner/legal decisions or public live.

## 3. Site Files Reviewed

- `AGENTS.md`
- `README.md`
- `package.json`
- `.github/workflows/site-ci.yml`
- `app/layout.tsx`
- `app/page.tsx`
- `app/[slug]/page.tsx`
- route pages under `app/`
- `components/`
- `lib/content.ts`
- `lib/routes.ts`
- `lib/routes/route-page-data.ts`
- `lib/feature-flags.ts`
- `public/robots.txt`
- `public/sitemap.xml`
- `scripts/check-stage16-source-to-site-guardrails.mjs`
- `scripts/check-p0-semantic-alignment.mjs`
- `scripts/generate-p0-evidence.mjs`
- `scripts/check-p0-evidence.mjs`
- `scripts/check-static-site-links.mjs`
- `scripts/check-launch-finalization-readiness.mjs`
- `docs/launch/stage-17-project-vector-audit-v1.md`
- `docs/launch/stage-17-repository-conformance-checklist-v1.md`
- `docs/launch/stage-17-repository-conformance-report-v1.md`
- `docs/seo/stage-17-service-route-coverage-audit-v1.md`
- `docs/source-to-site/source-to-site-current-sync-status-v1.md`
- `docs/launch/stage-16-selling-seo-content-status-v1.md`
- `evidence/`

## 4. QA Scope

In scope:

- 36 indexed source-approved routes;
- route intent, title/H1/description safety;
- visible page-block usefulness;
- safe CTA and lead path;
- parent/child and related route logic;
- HOLD, legal/privacy, SEO safety and public-live gates.

Out of scope:

- public live approval;
- final owner/legal sign-off;
- final public copy approval;
- deployment, DNS, hosting, staging or rollback proof;
- live forms, CRM, analytics, uploads, messaging or paid traffic;
- final visual design polish;
- HTTP/3/QUIC enablement.

## 5. Canon Checks

| Check | Status | Finding |
| --- | --- | --- |
| Brand/domain/canonical | `READY_WITH_CONDITIONS` | Site data keeps `Документы для бизнеса` and `https://dokumenty82.ru/`. |
| NAP | `READY_WITH_CONDITIONS` | Confirmed phone and address are centralized; no extra local facts approved. |
| CTA hierarchy | `READY_WITH_CONDITIONS` | Main CTA remains `Разобрать ситуацию`; secondary CTAs remain safe. |
| Site model | `READY_WITH_CONDITIONS` | Homepage router, situation review, hubs, money-pages, diagnostics and contacts remain separated. |
| Route registry | `READY_WITH_CONDITIONS` | 36 indexed routes are present; 3 content foundation routes remain noindex/excluded. |

## 6. HOLD Checks

| HOLD area | Status | Finding |
| --- | --- | --- |
| Commercial terms | `READY_WITH_CONDITIONS` | Runtime scan found no active public commercial term claims. |
| Outcome promises | `READY_WITH_CONDITIONS` | Routes use review boundaries and do not promise external decisions. |
| Local/legal details | `READY_WITH_CONDITIONS` | No office/floor, legal identifiers or bank details are exposed. |
| Social proof | `READY_WITH_CONDITIONS` | No active public social-proof blocks are added. |
| Exact timing | `READY_WITH_CONDITIONS` | No exact completion timing is exposed. |
| Upload/CRM/forms | `READY_WITH_CONDITIONS` | Placeholder-only; no public upload or live endpoint is enabled. |
| Messaging/analytics | `READY_WITH_CONDITIONS` | Messaging and analytics remain disabled/gated. |

## 7. Legal / Privacy Checks

| Area | Status | Finding |
| --- | --- | --- |
| Policy route | `READY_WITH_CONDITIONS` | `/policy` exists and stays legal/privacy focused. |
| Personal data | `READY_WITH_CONDITIONS` | Public pages do not collect personal files; HR routes tell users to use a safe agreed channel. |
| Bank/tax/legal routes | `READY_WITH_CONDITIONS` | Pages frame work as document preparation and review, not final legal/tax/bank conclusions. |
| Owner/legal sign-off | `MISSING_EXPECTED` | Final owner/legal approval is not present. |

## 8. Content Usefulness Checks

| Area | Status | Finding |
| --- | --- | --- |
| Client task clarity | `READY_WITH_CONDITIONS` | Stage 17D/E hardening blocks explain what is checked, what inputs are needed, how work starts and what is not promised. |
| Page role clarity | `READY_WITH_CONDITIONS` | Hubs, money pages and diagnostics retain distinct roles. |
| Route specificity | `READY_WITH_CONDITIONS` | Money pages target exact route intent and link to parent hubs. |
| Final copy polish | `NEEDS_REVIEW` | Final public copy review remains required before launch. |

## 9. SEO Safety Checks

| Area | Status | Finding |
| --- | --- | --- |
| One URL = one intent | `READY_WITH_CONDITIONS` | Route matrix and related links preserve intent boundaries. |
| Hidden SEO text | `READY_WITH_CONDITIONS` | Hardening blocks are visible client content, not hidden keyword text. |
| Sitemap/indexing | `READY_WITH_CONDITIONS` | 36 approved indexed URLs; blog/news foundation remains excluded. |
| Schema boundary | `READY_WITH_CONDITIONS` | Service schema is limited to visible confirmed content. |
| Yandex live proof | `MISSING_EXPECTED` | Search Console/Yandex Webmaster and live SERP proof remain missing. |

## 10. Lead Path Checks

| Area | Status | Finding |
| --- | --- | --- |
| Safe first step | `READY_WITH_CONDITIONS` | Ambiguous or mixed questions route to `/razbor-situacii/`. |
| Show-documents CTA | `READY_WITH_CONDITIONS` | Means safe agreed showing only; no public upload. |
| Phone/contact | `READY_WITH_CONDITIONS` | Phone is present; extra channels remain gated. |
| Live submissions | `BLOCKED` | Backend/CRM/live form success remains blocked. |

## 11. Route-By-Route QA Matrix

| Route | Role | QA status | Source intent | HOLD / legal finding | Owner/legal gate | Public-live decision |
| --- | --- | --- | --- | --- | --- | --- |
| `/` | Core router | `READY_WITH_CONDITIONS` | Brand/local router | Safe router, no service catalog expansion | `OWNER_LEGAL_REVIEW_REQUIRED` | `NOT_APPLICABLE` |
| `/razbor-situacii/` | Core triage | `READY_WITH_CONDITIONS` | Safe first step | Does not replace service; CTA safe | `OWNER_LEGAL_REVIEW_REQUIRED` | `NOT_APPLICABLE` |
| `/kontakty/` | Core NAP | `READY_WITH_CONDITIONS` | Contact/office route | Confirmed NAP only; extra local facts held | `OWNER_LEGAL_REVIEW_REQUIRED` | `NOT_APPLICABLE` |
| `/policy` | Legal/privacy | `READY_WITH_CONDITIONS` | Privacy/legal transparency | Needs final legal text approval | `OWNER_LEGAL_REVIEW_REQUIRED` | `NOT_APPLICABLE` |
| `/o-proekte/` | Project context | `READY_WITH_CONDITIONS` | Work format/context | No public proof or legal claim expansion | `OWNER_LEGAL_REVIEW_REQUIRED` | `NOT_APPLICABLE` |
| `/srochnye-voprosy/` | Hub | `READY_WITH_CONDITIONS` | Urgent/mixed route selector | No instant-result promise | `OWNER_LEGAL_REVIEW_REQUIRED` | `NOT_APPLICABLE` |
| `/otchetnost/` | Hub | `READY_WITH_CONDITIONS` | Reporting route selector | Does not cannibalize exact reporting pages | `OWNER_LEGAL_REVIEW_REQUIRED` | `NOT_APPLICABLE` |
| `/nalogi-i-rezhimy/` | Hub | `READY_WITH_CONDITIONS` | Tax regime router | No final tax conclusion | `OWNER_LEGAL_REVIEW_REQUIRED` | `NOT_APPLICABLE` |
| `/bank-i-115-fz/` | Hub | `READY_WITH_CONDITIONS` | Bank/115-ФЗ router | No bank decision promise | `OWNER_LEGAL_REVIEW_REQUIRED` | `NOT_APPLICABLE` |
| `/adres-egryul-direktor/` | Hub | `READY_WITH_CONDITIONS` | Address/EGRUL/director router | No registry outcome promise | `OWNER_LEGAL_REVIEW_REQUIRED` | `NOT_APPLICABLE` |
| `/kadry/` | Hub | `READY_WITH_CONDITIONS` | HR route selector | Personal data boundary present | `OWNER_LEGAL_REVIEW_REQUIRED` | `NOT_APPLICABLE` |
| `/soprovozhdenie/` | Hub | `READY_WITH_CONDITIONS` | Support router | Scope remains review-gated | `OWNER_LEGAL_REVIEW_REQUIRED` | `NOT_APPLICABLE` |
| `/registraciya-i-likvidaciya/` | Hub | `READY_WITH_CONDITIONS` | Lifecycle router | No external-result promise | `OWNER_LEGAL_REVIEW_REQUIRED` | `NOT_APPLICABLE` |
| `/otvet-na-trebovanie-ifns/` | Money page | `READY_WITH_CONDITIONS` | IFNS requirement response | No final tax position or timing promise | `OWNER_LEGAL_REVIEW_REQUIRED` | `NOT_APPLICABLE` |
| `/deklaraciya-usn/` | Money page | `READY_WITH_CONDITIONS` | USN declaration documents | No tax conclusion without inputs | `OWNER_LEGAL_REVIEW_REQUIRED` | `NOT_APPLICABLE` |
| `/otvet-na-zapros-banka/` | Money page | `READY_WITH_CONDITIONS` | Bank request response | No bank acceptance claim | `OWNER_LEGAL_REVIEW_REQUIRED` | `NOT_APPLICABLE` |
| `/dokumenty-dlya-banka-115-fz/` | Money page | `READY_WITH_CONDITIONS` | 115-ФЗ document package | Package framed by actual situation | `OWNER_LEGAL_REVIEW_REQUIRED` | `NOT_APPLICABLE` |
| `/yuridicheskiy-adres-simferopol/` | Money page | `READY_WITH_CONDITIONS` | Legal address route | No unsupported local/legal details | `OWNER_LEGAL_REVIEW_REQUIRED` | `NOT_APPLICABLE` |
| `/nedostovernost-yuridicheskogo-adresa/` | Money page | `READY_WITH_CONDITIONS` | Address unreliability route | No removal/outcome promise | `OWNER_LEGAL_REVIEW_REQUIRED` | `NOT_APPLICABLE` |
| `/smena-yuridicheskogo-adresa-ooo/` | Money page | `READY_WITH_CONDITIONS` | Change legal address ООО | Registry result remains review-gated | `OWNER_LEGAL_REVIEW_REQUIRED` | `NOT_APPLICABLE` |
| `/smena-direktora-ooo/` | Money page | `READY_WITH_CONDITIONS` | Change director ООО | Corporate change conclusions held | `OWNER_LEGAL_REVIEW_REQUIRED` | `NOT_APPLICABLE` |
| `/srochnoe-oformlenie-sotrudnikov/` | Money page | `READY_WITH_CONDITIONS` | Urgent employee documents | No exact timing; no public personal data flow | `OWNER_LEGAL_REVIEW_REQUIRED` | `NOT_APPLICABLE` |
| `/perehod-na-ausn/` | Money page | `READY_WITH_CONDITIONS` | AUSN transition route | No final tax conclusion | `OWNER_LEGAL_REVIEW_REQUIRED` | `NOT_APPLICABLE` |
| `/nulevaya-otchetnost-ooo/` | Money page | `READY_WITH_CONDITIONS` | Zero reporting ООО | Activity/status conclusion gated | `OWNER_LEGAL_REVIEW_REQUIRED` | `NOT_APPLICABLE` |
| `/nulevaya-otchetnost-ip/` | Money page | `READY_WITH_CONDITIONS` | Zero reporting ИП | Activity/status conclusion gated | `OWNER_LEGAL_REVIEW_REQUIRED` | `NOT_APPLICABLE` |
| `/otchetnost-elektronno/` | Money page | `READY_WITH_CONDITIONS` | Electronic reporting route | No access collection through public page | `OWNER_LEGAL_REVIEW_REQUIRED` | `NOT_APPLICABLE` |
| `/vosstanovlenie-buhucheta/` | Money page | `READY_WITH_CONDITIONS` | Accounting recovery | Scope depends on source documents | `OWNER_LEGAL_REVIEW_REQUIRED` | `NOT_APPLICABLE` |
| `/buhgalterskoe-soprovozhdenie-ooo/` | Money page | `READY_WITH_CONDITIONS` | Accounting support ООО | Regular scope not promised publicly | `OWNER_LEGAL_REVIEW_REQUIRED` | `NOT_APPLICABLE` |
| `/buhgalterskoe-soprovozhdenie-ip/` | Money page | `READY_WITH_CONDITIONS` | Accounting support ИП | Regular scope not promised publicly | `OWNER_LEGAL_REVIEW_REQUIRED` | `NOT_APPLICABLE` |
| `/kadrovoe-soprovozhdenie/` | Money page | `READY_WITH_CONDITIONS` | HR support | Personal data and scope remain gated | `OWNER_LEGAL_REVIEW_REQUIRED` | `NOT_APPLICABLE` |
| `/registraciya-ooo/` | Money page | `READY_WITH_CONDITIONS` | Registration ООО | No registration result promise | `OWNER_LEGAL_REVIEW_REQUIRED` | `NOT_APPLICABLE` |
| `/registraciya-ip/` | Money page | `READY_WITH_CONDITIONS` | Registration ИП | No tax-choice conclusion | `OWNER_LEGAL_REVIEW_REQUIRED` | `NOT_APPLICABLE` |
| `/likvidaciya-ooo/` | Money page | `READY_WITH_CONDITIONS` | Liquidation ООО | No external-result or timing promise | `OWNER_LEGAL_REVIEW_REQUIRED` | `NOT_APPLICABLE` |
| `/ausn-krym/` | Diagnostic | `READY_WITH_CONDITIONS` | AUSN applicability diagnostic | Diagnostic does not replace review | `OWNER_LEGAL_REVIEW_REQUIRED` | `NOT_APPLICABLE` |
| `/raschet-nalogovoy-nagruzki/` | Diagnostic | `READY_WITH_CONDITIONS` | Tax load diagnostic | No final calculation without inputs | `OWNER_LEGAL_REVIEW_REQUIRED` | `NOT_APPLICABLE` |
| `/nds-pri-usn-2026/` | Diagnostic | `READY_WITH_CONDITIONS` | VAT/USN 2026 diagnostic | No final public tax advice | `OWNER_LEGAL_REVIEW_REQUIRED` | `NOT_APPLICABLE` |

## 12. Issues Found

| Issue | Severity | Status |
| --- | --- | --- |
| Runtime contact route boundary used a direct HOLD phrase for visit-time facts in the "not added" list. | Low | `FIXED` |
| Runtime schema-boundary strings used English social-proof terms as prohibitions. | Low | `FIXED` |
| Final owner/legal approval is missing for every indexed route. | Gate | `OWNER_LEGAL_REVIEW_REQUIRED` |
| Public-live, staging/rollback and transport proof are missing. | Gate | `BLOCKED` |

No route-blocking content issue was found that requires removal from the indexed route set.

## 13. Fixes Applied

- Reworded the contacts boundary in `lib/routes/route-page-data.ts` from a direct visit-time HOLD phrase to a neutral "unconfirmed visit data" boundary.
- Reworded schema-boundary text in `lib/content.ts` and `lib/routes.ts` from explicit social-proof terms to neutral `public proof claims`.
- Added this Stage 17F QA file and the public-copy review checklist.
- Updated Stage 17 status docs and source-to-site guardrails to require Stage 17F QA artifacts.

## 14. Remaining Owner / Legal Review Items

- Final public copy approval for all 36 indexed routes.
- Final privacy/legal review for `/policy`, contact flows and placeholder forms.
- Owner review for all local profile facts, photos, public profile text and public directory/channel claims.
- Tax/legal review for tax, reporting, registration, liquidation, address and HR routes.
- Bank route review for 115-ФЗ and bank request wording.
- Confirmation that no live form, CRM, analytics, upload or messaging action is enabled before acceptance.

## 15. Public-Live Blockers

- `PUBLIC_LIVE_ALLOWED = false`
- final owner/legal approval: `MISSING_EXPECTED`
- CRM/forms/analytics acceptance: `MISSING_EXPECTED`
- no-PII analytics proof: `MISSING_EXPECTED`
- staging deploy proof: `MISSING_EXPECTED`
- rollback proof: `MISSING_EXPECTED`
- transport network proof: `MISSING_EXPECTED`
- Search Console/Yandex Webmaster setup: `MISSING_EXPECTED`
- FNS live fetch, scheduler, rewrite provider, autopublish and indexing: `BLOCKED`

## 16. Release Verdict

`GO WITH CONDITIONS`

Stage 17F owner/legal/content QA preparation is complete enough for later owner/legal review. It does not approve public live.

`PUBLIC_LIVE_ALLOWED = false`
