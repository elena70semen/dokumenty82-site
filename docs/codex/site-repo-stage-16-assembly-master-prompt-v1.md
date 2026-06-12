# Site Repo Stage 16 Assembly Master Prompt V1

Status: `COPY_PASTE_PROMPT_READY_WITH_CONDITIONS`

Release verdict: `GO WITH CONDITIONS`

Public launch: `NOT_PUBLIC_LAUNCH_READY`

`PUBLIC_LIVE_ALLOWED = false`

## Copy-Paste Prompt

```text
You are working on the project `Документы для бизнеса`.

Implementation target repository:

`elena70semen/dokumenty82-site`

Canonical source-of-truth repository:

`elena70semen/dokumenty-dlya-biznesa`

Current task:
Apply the completed Stage 15 and Stage 16 source-led foundation packages from the source-of-truth repository into the standalone site repository `dokumenty82-site`.

This is a structured implementation/readiness pass. It is not a visual redesign, not final design polish and not a launch.

The site must be assembled in `dokumenty82-site`, but every decision must be verified against `dokumenty-dlya-biznesa`.

Do not work in the wrong repository.

If `dokumenty82-site` is unavailable or the current repository is not the target site repository, stop and report:

`BLOCKED_SITE_REPOSITORY_NOT_AVAILABLE`

If `dokumenty-dlya-biznesa` is unavailable for verification, stop and report:

`BLOCKED_SOURCE_OF_TRUTH_NOT_AVAILABLE`

Do not invent facts. If a required source fact is missing, mark it `HOLD` or `MISSING_EXPECTED`.

Do not launch.
Do not deploy.
Do not change DNS.
Do not enable live features.
Do not enable forms, CRM, analytics, Metrica, upload or messaging deep links.
Do not add secrets.
Do not start final visual design polish.

━━━━━━━━━━━━━━━━━━━━
1. Confirm target repository
━━━━━━━━━━━━━━━━━━━━

In the current working directory, determine:

- current path;
- git root;
- git remote;
- branch;
- whether this is `elena70semen/dokumenty82-site`;
- package root;
- app directory;
- components directory;
- lib directory;
- public directory;
- scripts directory;
- evidence directory;
- workflow directory.

Expected root-level layout:

- `package.json`
- `package-lock.json`
- `app/`
- `components/`
- `lib/`
- `public/`
- `scripts/`
- `evidence/`
- `.github/workflows/site-ci.yml`
- `README.md`

Do not use active `code/` paths inside `dokumenty82-site`.

If the remote is not `elena70semen/dokumenty82-site` and the files do not clearly match the standalone site root layout, stop and report:

`BLOCKED_SITE_REPOSITORY_NOT_AVAILABLE`

━━━━━━━━━━━━━━━━━━━━
2. Verify source-of-truth access
━━━━━━━━━━━━━━━━━━━━

Locate the source repository `elena70semen/dokumenty-dlya-biznesa`.

Read and use these source files before editing anything:

Core:

- `AGENTS.md`
- `README.md`
- `docs/00-start/active-canon-index.md`
- `docs/00-start/hold-register.md`

Routes and SEO:

- `docs/seo/route-registry.md`
- `docs/seo/seo-canon.md`
- `docs/seo/semantic-core-v1.md`
- `docs/seo/semantic-analysis-and-priority-plan-v1.md`
- `docs/seo/metadata-completion-and-semantic-gap-plan-v1.md`
- `docs/seo/route-cannibalization-intent-boundary-audit-v1.md`
- `docs/seo/seo-structure-strengthening-audit-v1.md`
- `docs/seo/yandex-seo-playbook.md`
- `docs/seo/stage-16-route-group-semantic-coverage-v1.md`

Services and content:

- `docs/services/service-catalog-2026-v1.md`
- `docs/services/service-source-ledger-2026.md`
- `docs/services/passports/`
- `docs/content/stage-15-text-quality-standards-v1.md`
- `docs/content/stage-16-selling-page-block-library-v1.md`

Strategy and source-to-site:

- `docs/strategy/source-to-site-traceability-matrix-v1.md`
- `docs/strategy/project-strengthening-audit-v1.md`
- `docs/strategy/seo-product-lead-strengthening-v1.md`
- `docs/strategy/semantic-implementation-alignment-v1.md`
- `docs/strategy/stage-15-site-seo-content-structure-roadmap-v1.md`
- `docs/strategy/stage-15-source-to-site-content-matrix-v1.md`
- `docs/source-to-site/site-repo-stage-16-assembly-handoff-v1.md`
- `docs/source-to-site/transport-protocol-launch-gate-sync-v1.md`

Frontend, UX and QA:

- `docs/frontend/stage-12-wave1-route-page-build-v0.1.md`
- `docs/frontend/stage-12-wave1-route-component-map-v0.1.md`
- `docs/qa/stage-12-wave1-route-qa-checklist-v0.1.md`
- `docs/frontend/stage-15-mobile-layout-standards-v1.md`
- `docs/frontend/stage-15-semantic-markup-accessibility-standards-v1.md`
- `docs/frontend/stage-16-route-implementation-checklist-v1.md`
- `docs/ux/stage-16-lead-path-and-conversion-architecture-v1.md`

Operations and launch:

- `docs/operations/live-launch-gates-v1.md`
- `docs/operations/project-finalization-readiness-v1.md`
- `docs/operations/launch-finalization-roadmap-v1.md`
- `docs/launch/stage-16-source-package-status-v1.md`

Codex prompt packs:

- `docs/codex/stage-15-site-foundation-prompts-v1.md`
- `docs/codex/site-repo-stage-16-assembly-master-prompt-v1.md`

If a source file is missing, mark it `MISSING_EXPECTED`. Continue only if the missing file is not required for the specific change.

━━━━━━━━━━━━━━━━━━━━
3. Preserve canon exactly
━━━━━━━━━━━━━━━━━━━━

Preserve:

- Brand: `Документы для бизнеса`
- Domain: `https://dokumenty82.ru/`
- Canonical URL: `https://dokumenty82.ru/`
- Category: `Центр подготовки документов`
- Extended category: `центр подготовки документов для бизнеса`
- Geography: `Симферополь / Республика Крым`
- Slogan: `Разберём ситуацию и подготовим документы.`
- Local marker: `офис рядом с налоговой`
- Phone: `+7 (978) 998-72-22`
- Phone href: `tel:+79789987222`
- Address: `Республика Крым, Симферополь, ул. им. Мате Залки, 1`
- Short address: `Симферополь, ул. Мате Залки, 1`
- Email: `info@dokumenty82.ru` remains TARGET until domain mail confirmation.

Preserve CTA hierarchy:

- Main CTA: `Разобрать ситуацию`
- Secondary CTAs: `Позвонить`, `Построить маршрут`, `Показать документы`

CTA must not promise a result before the situation and documents are reviewed.

Preserve site model:

`Главная -> Разбор ситуации -> Хабы -> Money-pages -> Diagnostics -> Контакты`

Preserve route roles:

- `/` is a brand/local router, not a service catalogue.
- `/razbor-situacii/` is safe first triage.
- Hubs route users by mixed intent.
- Money pages target one exact commercial intent.
- Diagnostics answer applicability/influence/calculation intent.
- `/kontakty/` is canonical NAP page.
- `/policy` is legal/privacy page and keeps the no-trailing-slash exception.
- `/blog/`, `/blog/obnovleniya-fns/` and `/blog/razbory/` are foundation noindex only.

━━━━━━━━━━━━━━━━━━━━
4. Preserve HOLD boundaries
━━━━━━━━━━━━━━━━━━━━

Do not add or imply:

- working hours;
- office number;
- floor;
- full legal entity name;
- INN;
- OGRN;
- bank/legal details;
- representative name;
- legal wording creating obligations;
- prices;
- discounts;
- guarantees;
- exact deadlines;
- urgent-result promises;
- ratings;
- reviews;
- cases;
- comparative claims without proof;
- result promises before studying documents;
- `.env`;
- tokens;
- SSH keys;
- API keys;
- server access data;
- Yandex/Google/VK/CRM access data;
- backend credentials;
- client documents;
- document scans;
- sensitive logs;
- real form endpoint;
- CRM webhook;
- false form success messages;
- private analytics IDs;
- schema/metadata claims wider than confirmed visible content;
- public profile/card data for Yandex / 2GIS / VK / Avito / Yandex Services;
- advertising promises;
- old names or old domains;
- state affiliation imitation.

Allowed local marker:

`офис рядом с налоговой`

But it must never imply state affiliation, official partnership or representative status.

Preserve launch restrictions:

- `PUBLIC_LIVE_ALLOWED = false`
- public launch remains `NOT_PUBLIC_LAUNCH_READY`
- paid traffic blocked
- CRM/forms blocked
- analytics/Metrica blocked
- public upload blocked
- FNS/blog/news autopublish blocked
- HTTP/3/QUIC over UDP/443 blocked by default until separate owner/ops approval and proof.

━━━━━━━━━━━━━━━━━━━━
5. Create or update source-to-site docs in site repo
━━━━━━━━━━━━━━━━━━━━

Create or update:

- `AGENTS.md`
- `docs/source-to-site/source-to-site-alignment-contract-v1.md`
- `docs/source-to-site/source-to-site-current-sync-status-v1.md`
- `docs/source-to-site/site-repo-stage-16-assembly-handoff-v1.md`
- `docs/launch/stage-15-site-foundation-status-v1.md`
- `docs/launch/stage-16-source-package-status-v1.md`

`AGENTS.md` must state:

- site repo is not independent;
- source-of-truth is `elena70semen/dokumenty-dlya-biznesa`;
- all site changes must verify source first;
- if source unavailable, stop as `BLOCKED_SOURCE_OF_TRUTH_NOT_AVAILABLE`;
- if current repo is not the site repo, stop as `BLOCKED_SITE_REPOSITORY_NOT_AVAILABLE`;
- if a fact is missing, mark HOLD;
- preserve canon, route model, HOLD, launch gates;
- public live remains false;
- final visual design is postponed until structure/content/SEO/mobile/QA are strong.

The alignment contract must define:

- source-of-truth areas;
- site impact areas;
- traceability requirements;
- required source files for each stage;
- stop conditions;
- final report requirements.

The current sync status must record:

- source files reviewed;
- site files reviewed;
- alignment status;
- drift found;
- HOLD risks;
- current blockers;
- next stage;
- release verdict.

Stage 15 status must classify:

- source-to-site access;
- source canon alignment;
- HOLD preservation;
- route registry alignment;
- SEO canon alignment;
- semantic core alignment;
- text standards;
- content model;
- code structure;
- static export compatibility;
- sitemap/robots;
- metadata;
- schema safety;
- feature flags;
- forms/CRM/analytics/upload;
- mobile layout standards;
- semantic markup/accessibility standards;
- evidence scripts;
- CI;
- staging;
- transport proof;
- public live.

Stage 16 status must classify:

- source-to-site handoff;
- site repo access;
- selling block library;
- route semantic coverage;
- lead path architecture;
- route implementation checklist;
- source-to-site master prompt;
- transport sync;
- implementation status;
- public live.

Use statuses:

- `PASS`
- `READY_WITH_CONDITIONS`
- `PARTIAL`
- `MISSING_EXPECTED`
- `BLOCKED`
- `NOT_STARTED`

Do not mark unverified areas as passed.

━━━━━━━━━━━━━━━━━━━━
6. Sync Stage 15 and Stage 16 standards into site repo
━━━━━━━━━━━━━━━━━━━━

From source repo, create or update in the site repo:

Stage 15:

- `docs/strategy/stage-15-site-seo-content-structure-roadmap-v1.md`
- `docs/strategy/stage-15-source-to-site-content-matrix-v1.md`
- `docs/content/stage-15-text-quality-standards-v1.md`
- `docs/frontend/stage-15-mobile-layout-standards-v1.md`
- `docs/frontend/stage-15-semantic-markup-accessibility-standards-v1.md`
- `docs/source-to-site/transport-protocol-launch-gate-sync-v1.md`

Stage 16:

- `docs/source-to-site/site-repo-stage-16-assembly-handoff-v1.md`
- `docs/codex/site-repo-stage-16-assembly-master-prompt-v1.md`
- `docs/content/stage-16-selling-page-block-library-v1.md`
- `docs/seo/stage-16-route-group-semantic-coverage-v1.md`
- `docs/ux/stage-16-lead-path-and-conversion-architecture-v1.md`
- `docs/frontend/stage-16-route-implementation-checklist-v1.md`
- `docs/launch/stage-16-source-package-status-v1.md`

Keep them aligned with source repo. Do not alter canon. Do not add live approvals. Do not mark final design active.

━━━━━━━━━━━━━━━━━━━━
7. Inspect current site implementation
━━━━━━━━━━━━━━━━━━━━

Inspect:

- `package.json`
- `.github/workflows/site-ci.yml`
- `app/layout.tsx`
- `app/page.tsx`
- route pages under `app/`
- `components/`
- `lib/content.ts`
- `lib/routes.ts`
- `lib/feature-flags.ts`
- `public/robots.txt`
- `public/sitemap.xml`
- `scripts/check-p0-semantic-alignment.mjs`
- `scripts/generate-p0-evidence.mjs`
- `scripts/check-p0-evidence.mjs`
- `scripts/check-static-site-links.mjs`
- `scripts/check-launch-finalization-readiness.mjs`
- existing evidence files.

Determine whether the site already supports:

- source-driven route model;
- typed route data;
- typed page content data;
- centralized NAP;
- centralized CTAs;
- feature flags closed by default;
- route metadata;
- route relationships;
- sitemap/noindex rules;
- safe schema;
- static export compatibility;
- no live forms;
- no analytics/Metrica;
- no CRM webhook;
- no public upload;
- no messaging deep links;
- mobile-first structure;
- semantic markup;
- accessibility basics.

━━━━━━━━━━━━━━━━━━━━
8. Safe implementation improvements allowed
━━━━━━━━━━━━━━━━━━━━

If implementation is safe to edit, make only source-supported improvements that strengthen the foundation.

Allowed:

- centralize canon/NAP if duplicated;
- centralize CTA labels;
- add or improve typed route registry/data;
- add or improve typed page content structures;
- add explicit source-to-site comments where useful;
- add route relationships from source registry;
- add service/source references from service catalog and passports where safe;
- ensure feature flags remain false for unsafe/live capabilities;
- ensure no live forms/CRM/analytics/upload;
- ensure sitemap only includes approved indexable routes;
- ensure noindex routes stay excluded;
- ensure metadata follows source SEO canon where already present;
- add defensive checks if missing;
- align README/AGENTS/docs with source repo rule.

Not allowed:

- new public routes beyond source registry;
- public launch;
- live deploy;
- paid traffic;
- live forms;
- CRM;
- analytics/Metrica;
- public upload;
- messaging deep links;
- final visual redesign;
- prices;
- guarantees;
- exact deadlines;
- reviews;
- ratings;
- cases;
- legal IDs;
- working hours;
- office/floor details.

If implementation changes would become large/risky, document them as next prompt instead of doing them.

━━━━━━━━━━━━━━━━━━━━
9. SEO/text/mobile/markup foundation requirements
━━━━━━━━━━━━━━━━━━━━

SEO:

- one URL = one intent;
- homepage router;
- hub vs money-page separation;
- diagnostics separation;
- canonical host;
- title/H1/description role alignment;
- no duplicated title/H1 between hubs and money pages;
- no keyword stuffing;
- useful snippets;
- local SEO without state-imitation;
- schema only from visible confirmed content;
- no price/rating/review/offer schema;
- blog/news noindex until approved.

Text:

- useful full blocks;
- situation-based explanation;
- what we check;
- how work starts;
- what documents/data may be needed without upload;
- what is not promised;
- related routes;
- local contact;
- FAQ;
- safety notes;
- no generic filler;
- no invented promises;
- no guarantees/deadlines/prices/reviews/cases.

Mobile/layout:

- mobile-first layout;
- fluid containers;
- readable line length;
- safe spacing;
- tap targets;
- no horizontal overflow;
- card/grid stacking;
- route grids collapse cleanly;
- CTA visibility without aggression;
- header/menu/footer usability;
- policy/contact access;
- reduced motion;
- device/browser evidence requirements.

Semantic/accessibility:

- one H1 per page;
- logical headings;
- landmarks;
- accessible navigation;
- links vs buttons correctly used;
- accessible cards;
- visible focus states;
- keyboard support;
- skip link if needed;
- FAQ markup safe;
- no SEO-only hidden text;
- schema not broader than visible content.

━━━━━━━━━━━━━━━━━━━━
10. Checks to run
━━━━━━━━━━━━━━━━━━━━

Run checks appropriate for `dokumenty82-site`.

Use scripts defined in `package.json`.

If available, run:

- dependency install using lockfile;
- semantic check;
- build;
- evidence generation after build;
- P0 evidence check;
- static link check after build;
- finalization/readiness checks;
- brand checks if available.

If a command cannot run, report:

`NOT_RUN - <reason>`

Do not claim a check passed unless it actually ran.

Do not deploy.
Do not upload.
Do not change DNS.
Do not enable public live.

━━━━━━━━━━━━━━━━━━━━
11. Final report format
━━━━━━━━━━━━━━━━━━━━

Use this exact final report format:

Source-of-truth files reviewed:
- ...

Site repository:
- available: true/false
- path:
- branch:
- remote:

Site files reviewed:
- ...

Site files changed:
- ...

Source-to-site docs:
- AGENTS.md:
- source-to-site contract:
- current sync status:
- Stage 15 status:
- Stage 16 handoff:
- Stage 16 status:

Stage standards synced:
- Stage 15 roadmap:
- Stage 15 content matrix:
- Stage 15 text standards:
- Stage 15 mobile/layout standards:
- Stage 15 semantic/accessibility standards:
- Stage 16 selling block library:
- Stage 16 semantic coverage:
- Stage 16 lead path:
- Stage 16 route checklist:
- transport gate sync:

Implementation changes:
- ...

Checks run:
- ...

Checks not run:
- ...

Passed checks:
- ...

Failed checks:
- ...

Stage 16 status:
- source-to-site access:
- canon alignment:
- HOLD preservation:
- SEO foundation:
- semantic coverage:
- text foundation:
- code/content model:
- mobile/responsive:
- semantic/accessibility:
- evidence/QA:
- transport/deploy:
- public live:

Remaining blockers:
- ...

Next recommended Codex prompt:
- ...

HOLD preserved:
- public live: yes/no
- paid traffic: yes/no
- CRM/forms/analytics/upload/messaging: yes/no
- prices/guarantees/reviews/legal details: yes/no
- design postponed: yes/no
- HTTP/3/QUIC blocked by default: yes/no

Release verdict:
GO WITH CONDITIONS for source-aligned site foundation work.
PUBLIC_LIVE_ALLOWED = false.
```

## Notes For The Next Codex Run

This prompt intentionally instructs the next run to stop if either repository is unavailable. It does not authorize broad rewrites. It authorizes only source-backed foundation work in the verified site repository.

If the site repo has a different framework or folder names, adapt only after confirming that the repository is still `elena70semen/dokumenty82-site` and the source-to-site contract remains intact.

If there is user work in the site repo, do not revert it. Work with it and report drift.

## Release Verdict

`GO WITH CONDITIONS`

This master prompt is ready to copy into a future Codex run inside `dokumenty82-site`.

Public launch remains:

`PUBLIC_LIVE_ALLOWED = false`
