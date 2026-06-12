# Source-to-Site Alignment Contract V1

Status: `ACTIVE`

Project: **Документы для бизнеса**

Site repository: `elena70semen/dokumenty82-site`

Source-of-truth repository: `elena70semen/dokumenty-dlya-biznesa`

## Purpose

This document defines how the site repository must use the main project repository.

`dokumenty82-site` is not a separate project. It is the website build, proof and deployment contour of the wider **Документы для бизнеса** project.

All site decisions must be traceable to the source-of-truth repository.

## Core rule

Before changing website code, content, SEO, routes, UI, lead collectors, evidence or deployment logic, the worker must inspect the relevant source-of-truth files from:

```text
elena70semen/dokumenty-dlya-biznesa
```

If source-of-truth files are unavailable, the task must stop with:

```text
BLOCKED_SOURCE_OF_TRUTH_NOT_AVAILABLE
```

Do not invent missing facts.

## Required source-of-truth zones

### 1. Active canon

Use for:

- brand;
- domain;
- canonical URL;
- category;
- geography;
- slogan;
- local marker;
- phone;
- address;
- email status.

Site impact:

- header;
- footer;
- metadata;
- schema;
- contact page;
- local blocks;
- CTA labels.

### 2. HOLD register

Use for:

- facts that cannot be published;
- legal/commercial constraints;
- privacy and channel restrictions;
- launch-sensitive details.

Site impact:

- no prices;
- no discounts;
- no guarantees;
- no exact deadlines;
- no reviews/ratings/cases;
- no legal identifiers;
- no working hours;
- no office/floor details;
- no client documents;
- no secrets or provider credentials.

### 3. Route registry and site model

Use for:

- route list;
- route intent;
- index/noindex status;
- sitemap inclusion;
- parent/child relationships;
- anti-cannibalization.

Site impact:

- app routes;
- sitemap;
- robots;
- breadcrumbs;
- related links;
- route cards;
- navigation.

### 4. SEO canon and semantic core

Use for:

- page role;
- title/H1/description direction;
- Yandex-oriented page intent;
- internal linking;
- hub vs money-page boundaries;
- metadata and schema limits.

Site impact:

- metadata;
- headings;
- page copy;
- schema;
- internal links;
- FAQ blocks;
- sitemap.

### 5. Content and text rules

Use for:

- tone;
- safe phrasing;
- page structure;
- service explanation;
- FAQ answers;
- call-to-action boundaries.

Site impact:

- hero text;
- situation blocks;
- service blocks;
- documents blocks;
- process blocks;
- safety notes;
- FAQ.

### 6. UX and lead collector rules

Use for:

- CTA hierarchy;
- collector types;
- contact paths;
- placeholder forms;
- no false success behavior.

Site impact:

- buttons;
- contact sections;
- form placeholders;
- data attributes;
- phone/contact fallbacks.

### 7. CRM and analytics restrictions

Use for:

- disabled live submit;
- disabled CRM success;
- disabled analytics/Metrica;
- no-PII requirements;
- future goal naming.

Site impact:

- feature flags;
- scripts;
- forms;
- event placeholders;
- launch gates.

### 8. Legal/privacy constraints

Use for:

- policy page;
- consent language;
- public owner/legal info;
- personal data boundaries;
- third-party services;
- maps, fonts and media rules.

Site impact:

- `/policy`;
- footer links;
- form notices;
- cookie/analytics gates;
- external service use.

### 9. Launch gates and QA requirements

Use for:

- CI gates;
- browser evidence;
- accessibility evidence;
- staging proof;
- rollback proof;
- owner/legal go-no-go.

Site impact:

- evidence scripts;
- deploy runbook;
- release candidate package;
- public live decision.

## Required traceability in work reports

Every meaningful PR, Codex task or final report must include:

```text
Source-of-truth files reviewed:
- ...

Site files reviewed:
- ...

Site files changed:
- ...

Alignment result:
- aligned / partially aligned / blocked

Remaining HOLD:
- ...
```

If no source-of-truth files were reviewed, the task is incomplete unless it is a purely mechanical repository maintenance task and that exception is stated.

## Stage-specific use

### Stage 14A — CI/build proof

Source-of-truth usage is limited to:

- repository role;
- HOLD boundaries;
- launch gates;
- build/deploy safety.

Do not start text/SEO changes in Stage 14A.

### Stage 14B — Yandex technical SEO

Must review source-of-truth SEO canon, route registry, semantic core and HOLD register before changing metadata, sitemap, schema or internal links.

### Stage 14C — text and structure strengthening

Must review source-of-truth content rules, semantic passports, route intent boundaries, UX collector map and HOLD register before changing page copy.

### Stage 14D — code hardening

Must review route/component contracts and source-to-site traceability before refactoring route components or route data.

### Stage 14E and later — QA, staging and release

Must review launch gates, QA evidence requirements, legal/privacy constraints and deployment runbooks before marking anything ready.

### Stage 15 — source-led site foundation

Must review and sync the Stage 15 source package before changing SEO/content structure, text standards, mobile layout rules or semantic/accessibility standards.

Required Stage 15 source package:

- `docs/strategy/stage-15-site-seo-content-structure-roadmap-v1.md`
- `docs/strategy/stage-15-source-to-site-content-matrix-v1.md`
- `docs/content/stage-15-text-quality-standards-v1.md`
- `docs/frontend/stage-15-mobile-layout-standards-v1.md`
- `docs/frontend/stage-15-semantic-markup-accessibility-standards-v1.md`

### Stage 16 — selling, SEO and content assembly

Must review and sync the Stage 16 source package before changing route semantics, selling blocks, lead paths, route implementation rules or transport gates.

Required Stage 16 source package:

- `docs/source-to-site/site-repo-stage-16-assembly-handoff-v1.md`
- `docs/codex/site-repo-stage-16-assembly-master-prompt-v1.md`
- `docs/content/stage-16-selling-page-block-library-v1.md`
- `docs/seo/stage-16-route-group-semantic-coverage-v1.md`
- `docs/ux/stage-16-lead-path-and-conversion-architecture-v1.md`
- `docs/frontend/stage-16-route-implementation-checklist-v1.md`
- `docs/source-to-site/transport-protocol-launch-gate-sync-v1.md`

If a requested Stage 16 source file is missing from `dokumenty-dlya-biznesa`, record `MISSING_EXPECTED`. Do not invent replacement canon, page copy, service scope or design polish.

## Release rule

The site can only move toward public live when both are true:

```text
SITE_REPO_CHECKS_PASS = true
SOURCE_OF_TRUTH_ALIGNMENT_CONFIRMED = true
```

Even then, public live remains blocked unless final launch gates explicitly pass.

## Current verdict

`GO WITH CONDITIONS` for Stage 15/16 source-led foundation with public live blocked.

`PUBLIC_LIVE_ALLOWED = false`.
