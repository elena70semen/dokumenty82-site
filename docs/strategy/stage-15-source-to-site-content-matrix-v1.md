# Stage 15 Source To Site Content Matrix V1

Status: `SOURCE_OF_TRUTH_DRAFT`

Release verdict: `GO WITH CONDITIONS`

Public launch: `NOT_PUBLIC_LAUNCH_READY`

`PUBLIC_LIVE_ALLOWED = false`

## Purpose

This matrix maps the source-of-truth areas that must control future website foundation work. It is for `dokumenty82-site` or owner-confirmed implementation work only after the correct target is available.

Do not use this matrix to create new public routes, launch, enable live features or invent missing facts.

## Matrix

| Source-of-truth area | Source files | Site impact | Target site files or future site files | Stage | Required checks | HOLD risks | Acceptance criteria |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Active canon | `AGENTS.md`, `README.md`, `docs/00-start/active-canon-index.md` | Brand, domain, category, geography, slogan, CTA hierarchy and office-first logic. | `lib/site-config.*`, `lib/brand.*`, layout shell, footer, metadata constants. | 15A, 15B | Canon diff; rendered brand/NAP snapshot. | Old names, old domains, wrong CTA, catalog homepage. | Visible site uses active canon only. |
| NAP | `docs/brand/nap.md`, `docs/00-start/active-canon-index.md` | Phone, address, short address, local marker, contact page and LocalBusiness schema. | `lib/nap.*`, `/kontakty/`, footer, schema config. | 15B, 15C, 15D | NAP snapshot; schema scan; contact page proof. | Working hours, office/floor, legal entity, unconfirmed email use. | NAP matches source exactly; email remains `TARGET`. |
| HOLD register | `docs/00-start/hold-register.md`, `AGENTS.md` | Blocks unsupported public facts and unsafe features. | Safety scanner, content QA, schema generator, form states. | 15A-J | Forbidden-claims scan; schema scan; UI text scan. | Prices, guarantees, reviews, legal IDs, secrets, endpoints. | HOLD facts absent or marked `HOLD`. |
| Route registry | `docs/seo/route-registry.md` | Defines approved URLs, classes, phases, route roles and linking rules. | `lib/routes.*`, app routes/pages, sitemap generator. | 15B, 15C | Route manifest diff; sitemap diff; no unapproved route check. | Route sprawl, `/news/`, `/novosti/`, duplicate intent. | Every public URL exists in registry and has one intent. |
| SEO canon | `docs/seo/seo-canon.md`, `docs/seo/yandex-seo-playbook.md` | Titles, H1s, descriptions, canonical, robots, sitemap, schema and local SEO. | `lib/seo.*`, `HeadMeta`, sitemap, robots, schema helpers. | 15D | Rendered head snapshot; robots/sitemap check; canonical check. | Keyword stuffing, schema overreach, unconfirmed local facts. | Metadata supports route role and visible content only. |
| Semantic core | `docs/seo/semantic-core-v1.md`, `docs/seo/semantic-analysis-and-priority-plan-v1.md` | Owner URL, visible semantic questions, FAQ ideas, CTA and `lead_topic`. | Route content data, related links, CRM topic config. | 15C, 15D, 15E | Owner URL check; semantic block check; lead topic snapshot. | Query volume invention, live SERP facts, wrong owner URL. | Each priority query maps to one source-approved URL. |
| Anti-cannibalization | `docs/seo/route-cannibalization-intent-boundary-audit-v1.md`, `docs/seo/query-to-page-map*.md` | Protects hub/money/diagnostic/contact boundaries. | Internal link config, navigation, route cards, related blocks. | 15C, 15D | Boundary pair review; duplicate H1/title scan; related link check. | Homepage or hubs becoming service catalogues. | Parent, sibling and fallback links clarify rather than blur intent. |
| Content rules | `docs/content/site/*.md`, `docs/content/route-to-copy-coverage.md`, `docs/content/stage-15-text-quality-standards-v1.md` | H1, blocks, FAQ, process, documents and safe conversion language. | `content/*`, typed page content, templates. | 15B, 15E | H1/copy snapshot; HOLD scan; block presence check. | Final public copy invented beyond source, generic filler, overpromises. | Text is useful, source-backed and route-specific. |
| UX / lead collectors | `docs/ux/site-lead-collectors-v1.md`, `docs/ux/contact-actions-v1.md`, `docs/ux/page-lead-collector-map.md`, `docs/ux/pages/*.md` | CTA placement, safe first step, no public upload, route/contact flows. | CTA components, route templates, collector config. | 15C, 15F | Collector map diff; CTA event check; no-upload scan. | False success, public upload, messaging deep links, lost source. | CTA hierarchy and collector rules match source. |
| CRM / analytics restrictions | `docs/crm-analytics/events.md`, `docs/crm-analytics/lead-collector-events-v1.md`, `docs/crm-analytics/metrica-goals-and-crm-contract.md` | Event names, parameters, no-PII payloads and success gating. | `lib/analytics.*`, CRM adapter, form state machine, tests. | 15B, 15H | Event allowlist; no-PII payload proof; success/fail tests. | Private IDs, PII, real CRM webhook, false `form_submit`. | Analytics/CRM remain disabled until accepted. |
| Legal/privacy | `docs/legal/*.md`, `docs/qa/site-legal-compliance-qa-checklist.md` | `/policy`, consent/cookies/forms, privacy notices, provider review. | `/policy`, legal UI notices, feature gates. | 15B, 15G, 15H | Legal checklist; policy link check; feature flag proof. | Legal entity, INN/OGRN, requisites, unsupported obligations. | Policy exists as transparency route; legal review remains required. |
| Launch gates | `docs/operations/live-launch-gates-v1.md`, `docs/operations/project-finalization-readiness-v1.md`, `docs/operations/launch-finalization-roadmap-v1.md` | Blocks public live until evidence and sign-off pass. | Release checklist, evidence folder, CI gates. | 15H, 15I | Launch readiness check; finalization proof; blocker list. | Public launch, paid traffic, live forms, analytics, CRM. | `PUBLIC_LIVE_ALLOWED = false` remains preserved. |
| Transport protocol | `docs/source-to-site/transport-protocol-launch-gate-sync-v1.md` | First static launch transport baseline and deploy proof. | `nginx/*`, deploy SOP, evidence/finalization, readiness check. | 15I | No active `listen ... quic`; no `Alt-Svc: h3`; TCP HTTPS proof later. | HTTP/3/QUIC/UDP/443 enabled without approval. | HTTP/1.1 or HTTP/2 over TCP/443 baseline is preserved. |
| Mobile/responsive layout | `docs/frontend/stage-15-mobile-layout-standards-v1.md`, `docs/frontend/site-frontend-layout-standards-v1.md` | Mobile-first layout, stacking, tap targets and no overflow. | Layout components, CSS, screenshots, Playwright checks. | 15F, 15H | Mobile screenshots; overflow check; tap target review. | Desktop-only pages, text overflow, hidden CTA, inaccessible menu. | Pages are usable across mobile/tablet/desktop. |
| Accessibility/markup | `docs/frontend/stage-15-semantic-markup-accessibility-standards-v1.md`, `docs/frontend/html-semantics-and-accessibility-standards.md` | Landmarks, H1, headings, links/buttons, focus and keyboard. | Page templates, nav, cards, FAQ components, axe tests. | 15G, 15H | Axe; keyboard/focus; semantic DOM snapshot. | Fake buttons, hidden SEO text, keyboard trap, missing labels. | Semantics and keyboard path pass before launch. |
| Evidence/QA | `docs/qa/*.md`, `docs/operations/p0-implementation-proof-plan.md`, `docs/qa/rendered-qa-evidence-requirements-v1.md` | Proof artifacts, screenshots, metadata, schema, accessibility and release evidence. | `evidence/*`, CI artifacts, screenshots, reports. | 15H | CI/build; static links; browser; accessibility; metadata proof. | Missing evidence marked as passed. | Missing evidence stays `MISSING_EXPECTED`; proof blocks launch until present. |

## Use In Future Site PRs

Every site PR should include:

- source files used;
- target site files changed;
- stage covered;
- checks run;
- evidence produced;
- remaining `HOLD` and `MISSING_EXPECTED`;
- release verdict.

## Release Verdict

`GO WITH CONDITIONS`

This matrix is ready as source material. Public launch remains `NOT_PUBLIC_LAUNCH_READY`.
