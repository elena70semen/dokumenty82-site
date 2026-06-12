# AGENTS.md

Rules for `elena70semen/dokumenty82-site`.

## Repository role

This repository is not an independent product.

It is the standalone website build and deployment-preparation repository for the wider project **Документы для бизнеса**.

The canonical source-of-truth repository remains:

```text
elena70semen/dokumenty-dlya-biznesa
```

All website work must be derived from, checked against and kept consistent with that source-of-truth.

## Source-to-site rule

Before changing site code, content, SEO, routes, UI, deploy logic or evidence, inspect the relevant source-of-truth materials from `elena70semen/dokumenty-dlya-biznesa`.

Required source-of-truth areas:

- active canon;
- NAP;
- HOLD register;
- route registry;
- SEO canon;
- semantic core and page intent boundaries;
- content and text rules;
- UX / lead collector rules;
- CRM and analytics restrictions;
- legal/privacy constraints;
- launch gates and QA requirements.

If source-of-truth access is not available, stop and report:

```text
BLOCKED_SOURCE_OF_TRUTH_NOT_AVAILABLE
```

Do not invent missing facts.

## Standalone site layout

This repository uses a root-level standalone Next.js layout:

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

Do not use `code/` paths in this repository unless a future owner-approved restructuring explicitly reintroduces them.

## Active canon summary

Use only the approved project canon unless the source-of-truth changes it:

- Brand: `Документы для бизнеса`.
- Domain: `https://dokumenty82.ru/`.
- Category: `Центр подготовки документов`.
- Geography: `Симферополь / Республика Крым`.
- Slogan: `Разберём ситуацию и подготовим документы.`
- Local marker: `офис рядом с налоговой`.
- Main CTA: `Разобрать ситуацию`.
- Secondary CTA: `Позвонить`, `Построить маршрут`, `Показать документы`.

## NAP summary

Use only confirmed NAP from source-of-truth:

- Name: `Документы для бизнеса`.
- Address: `Республика Крым, Симферополь, ул. им. Мате Залки, 1`.
- Short address: `Симферополь, ул. Мате Залки, 1`.
- Phone: `+7 (978) 998-72-22`.
- Phone href: `tel:+79789987222`.
- Email: `info@dokumenty82.ru` only as TARGET until domain mail is confirmed.

If NAP differs between repositories, mark the task as HOLD and do not choose a version arbitrarily.

## Non-negotiable rules

- One URL = one main intent.
- Homepage is a router, not a service catalogue.
- Situation review is a safe first step, not a free replacement for a service.
- Office-first logic is preferred over unapproved online promises.
- CTA hierarchy must be preserved.
- Anti-cannibalization is more important than adding a page.
- When in doubt, use HOLD.

## HOLD zones

Do not add without explicit source-of-truth and owner approval:

- working hours;
- office number or floor;
- full legal entity name;
- tax/legal identifiers;
- bank/legal details;
- prices;
- discounts;
- guarantees;
- exact deadlines;
- result promises;
- reviews;
- ratings;
- cases;
- personal or client documents;
- private access data or provider credentials.

Forbidden public framing:

- old names or old domains;
- state affiliation imitation;
- wording that implies official state partner or representative status;
- wording that creates unapproved legal or commercial obligations.

## Stage 15/16/17 source-led foundation

Current Stage 15/16/17 work is a source-led website foundation, repository conformance and readiness pass.

The active source package comes from:

```text
elena70semen/dokumenty-dlya-biznesa
```

Required control files in this site repository:

- `docs/source-to-site/source-to-site-alignment-contract-v1.md`
- `docs/source-to-site/source-to-site-current-sync-status-v1.md`
- `docs/source-to-site/site-repo-stage-16-assembly-handoff-v1.md`
- `docs/launch/stage-15-site-foundation-status-v1.md`
- `docs/launch/stage-16-source-package-status-v1.md`
- `docs/launch/stage-16-selling-seo-content-status-v1.md`
- `docs/launch/stage-17-repository-conformance-checklist-v1.md`

Allowed:

- sync source-backed Stage 15/16 standards;
- strengthen source-to-site docs and traceability;
- maintain Stage 17 repository conformance status;
- improve route/content/metadata guardrails when source-supported;
- keep feature flags closed;
- add defensive checks that prevent HOLD and launch-gate violations.

Not allowed:

- final visual design polish;
- new public routes outside the source route registry;
- public launch;
- live deploy;
- public DNS changes;
- analytics/Metrica;
- CRM/forms;
- public upload;
- paid traffic;
- HTTP/3/QUIC enablement.

If a required source file is missing, record `MISSING_EXPECTED` and continue only when the exact change remains safe.

Design polish is postponed until the SEO, text, code, mobile, accessibility and QA foundation is strong.

## Required checks

Run from repository root when possible:

```bash
npm ci
npm run check:p0-semantic
npm run build
npm run evidence:p0
npm run check:p0-evidence
npm run check:fns-blog-news
npm run check:static-links
npm run check:launch-readiness
npm run check:finalization
npm run check:stage16-source-to-site
npm run brand:check
npm run check:pricing
```

Run `npm run check:local-p0-browser` when browser evidence is in scope and the local preview server is running. If a check is not run, report it as `NOT_RUN` with the reason.

## Final report requirements

Every final report must include:

- files reviewed;
- files changed;
- commands run;
- commands not run;
- passed checks;
- failed checks;
- remaining HOLD;
- source-of-truth files used;
- release verdict.

## Release verdict

`GO WITH CONDITIONS` for Stage 14A CI/build proof, Stage 15/16 source-to-site foundation and Stage 17 repository conformance.

`PUBLIC_LIVE_ALLOWED = false`.
