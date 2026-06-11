# Stage 14A Source-to-Site Review V1

Status: `SOURCE_REVIEW_RECORDED`

Stage: `14A_CI_BUILD_PROOF`

Site repository: `elena70semen/dokumenty82-site`

Source-of-truth repository: `elena70semen/dokumenty-dlya-biznesa`

Public live: `HOLD`

## Purpose

This document records the source-of-truth review for Stage 14A.

Stage 14A is limited to CI stabilization and build proof. It does not authorize SEO/content rewrites, route expansion, visual redesign, staging deployment, public DNS or public live.

## Source-of-truth files reviewed

Reviewed from `elena70semen/dokumenty-dlya-biznesa`:

1. `docs/00-start/active-canon-index.md`
2. `docs/00-start/hold-register.md`
3. `docs/operations/live-launch-gates-v1.md`

These files are sufficient for Stage 14A because the current task is build/deploy-safety proof, not SEO/content/page-structure work.

Future stages must review additional source-of-truth documents:

- Stage 14B: SEO canon, route registry, semantic core, Yandex playbooks.
- Stage 14C: content rules, semantic passports, UX/lead collector maps.
- Stage 14D: frontend/component contracts and route data contracts.
- Stage 14E+: QA, legal/privacy, staging, rollback and owner go/no-go documents.

## Source findings

### Active canon

The source-of-truth active canon confirms:

- Brand: `Документы для бизнеса`.
- Domain: `https://dokumenty82.ru/`.
- Canonical URL: `https://dokumenty82.ru/`.
- Category: `Центр подготовки документов`.
- Geography: `Симферополь / Республика Крым`.
- Slogan: `Разберём ситуацию и подготовим документы.`
- Local marker: `офис рядом с налоговой`.
- Phone: `+7 (978) 998-72-22`.
- Phone href: `tel:+79789987222`.
- Address: `Республика Крым, Симферополь, ул. им. Мате Залки, 1`.
- Short address: `Симферополь, ул. Мате Залки, 1`.
- Email: `info@dokumenty82.ru` is TARGET until confirmed.

Stage 14A impact:

- CI/build proof must not change public canon.
- CI/build proof must not add or alter public NAP.
- Any NAP/content differences found during CI work must be marked HOLD, not guessed.

### Repository split

The source-of-truth identifies:

- `dokumenty-dlya-biznesa` as the source-of-truth repository for canon, docs, SEO, marketing, CRM/analytics, backlog and QA.
- `dokumenty82-site` as the site code repository for `https://dokumenty82.ru/`.

Stage 14A impact:

- `dokumenty82-site` is not an independent product.
- The site repository may use a standalone root layout, but its rules, content, SEO, HOLD and launch gates must remain traceable to the main project repository.

### Site model and publication rules

Source-of-truth confirms:

```text
Главная -> Разбор ситуации -> Хабы -> Money-pages -> Diagnostics -> Контакты
```

Source publication rules include:

- one URL = one main intent;
- no old names or old domains;
- no HOLD data without confirmation;
- no state-status imitation;
- consultation does not replace the service;
- office-first logic remains;
- schema must not be broader than visible confirmed content;
- `form_submit` is allowed only when real submission exists.

Stage 14A impact:

- no route or content changes in this stage;
- no form success behavior changes;
- no schema/content expansion;
- build checks should preserve these rules.

### HOLD register

The HOLD register confirms that unconfirmed data cannot be published or moved into site, schema, footer, FAQ, ads, cards, profiles or public channels.

HOLD areas include:

- working hours;
- office number/floor;
- full legal entity name;
- tax/legal identifiers;
- legal/bank details;
- prices;
- discounts;
- guarantees;
- exact deadlines;
- urgent result promises;
- ratings;
- reviews;
- cases;
- comparative claims without proof;
- result promises before studying documents;
- private access data;
- provider/account credentials;
- client documents;
- scans;
- sensitive logs;
- form endpoints;
- CRM webhooks;
- false success messages;
- analytics IDs when private;
- schema claims wider than confirmed content.

Stage 14A impact:

- CI/build scripts must not introduce these items;
- workflow must not include secrets or deployment credentials;
- public live remains blocked;
- forms, analytics, CRM and upload remain disabled.

### Live launch gates

The live-launch gates confirm that public live is blocked by multiple gates:

- source-of-truth gates;
- code/build gates;
- browser QA gates;
- accessibility gates;
- SEO/indexing gates;
- legal/privacy gates;
- CRM/forms/analytics gates;
- hosting/deploy gates;
- rollback gates;
- sales-channel gates;
- blog/news gates;
- owner acceptance gates.

The final decision remains:

```text
PUBLIC_LIVE_ALLOWED = false
```

Stage 14A impact:

- Stage 14A can only prove code/build readiness.
- Stage 14A cannot approve public live.
- Missing browser/accessibility/staging/legal/owner evidence must remain blockers for live, not be marked passed.

## Site files reviewed for alignment

Reviewed in `dokumenty82-site`:

1. `AGENTS.md`
2. `README.md`
3. `docs/source-to-site/source-to-site-alignment-contract-v1.md`
4. `docs/launch/stage-14a-ci-build-proof-status.md`
5. `.github/workflows/site-ci.yml`
6. `package.json`
7. `scripts/check-static-site-links.mjs`
8. `scripts/check-p0-semantic-alignment.mjs`
9. `scripts/generate-p0-evidence.mjs`
10. `scripts/check-launch-finalization-readiness.mjs`
11. `evidence/finalization/summary.md`
12. `evidence/finalization/launch-readiness-proof.json`

## Alignment result

`PARTIALLY_ALIGNED_WITH_BLOCKER`

Aligned:

- site repository role now states that it is part of the wider project;
- source-to-site contract exists;
- standalone root layout is documented;
- Stage 14A is limited to CI/build proof;
- public live remains blocked;
- HOLD boundaries are preserved;
- workflow uses root project layout;
- artifact path is `out/`;
- unsafe future-stage evidence remains a blocker, not a pass.

Blocking item:

```text
SITE_CI_EXECUTION_NOT_PROVEN
```

A visible GitHub Actions `Site CI` run has not yet been observed.

## Manual action required

Run in GitHub UI:

```text
dokumenty82-site -> Actions -> Site CI -> Run workflow -> main
```

Then verify:

- `Site CI` is visible;
- the job starts;
- the job passes or gives a clear failing step;
- artifact `dokumenty82-static-export-<commit-sha>` is produced from `out/`.

If the workflow is not visible, record:

```text
GITHUB_ACTIONS_WORKFLOW_NOT_VISIBLE
```

## Stage 14A not authorized to do

Do not use Stage 14A to perform:

- Yandex SEO changes;
- content strengthening;
- route expansion;
- metadata rewrites;
- visual redesign;
- Beget staging;
- public DNS;
- public live;
- analytics/Metrica;
- CRM/forms;
- public upload;
- messaging links;
- paid traffic.

## Completion condition

Stage 14A is complete when either:

```text
SITE_CI_VISIBLE = true
SITE_CI_GREEN = true
STATIC_EXPORT_ARTIFACT_PRESENT = true
STATIC_LINK_CHECK_PASS = true
SOURCE_TO_SITE_ALIGNMENT_CONFIRMED = true
PUBLIC_LIVE_ALLOWED = false
```

or:

```text
SITE_CI_CONFIGURED = true
GITHUB_ACTIONS_BLOCKER_DOCUMENTED = true
SOURCE_TO_SITE_ALIGNMENT_CONFIRMED = true
PUBLIC_LIVE_ALLOWED = false
```

## Current verdict

`GO WITH CONDITIONS` for Stage 14A CI/build proof.

`PUBLIC_LIVE_ALLOWED = false`.
