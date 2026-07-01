# Owner Decision Intake — 2026-06-22

Project: `dokumenty82.ru` / `Документы для бизнеса`

Repository: `elena70semen/dokumenty82-site`

PR: `#36 [codex] finalize webmaster readiness before paid traffic`

Status: `OWNER_GO_NOT_GIVEN`

Paid traffic: `HOLD`

Forms/CRM: `OFF`

Metrika counter: `109869928`

## 1. Purpose

This document is the owner decision intake for the first paid traffic readiness gate.

It does not approve launch by itself.

It collects decisions needed before:

- merge;
- deploy;
- Metrika goal validation;
- Yandex Direct / paid traffic launch.

Current recommendation:

```text
No merge.
No deploy.
No ads.
Keep PR #36 Draft until owner/deployer/legal decisions are written.
```

## 2. Current Evidence Status

| Area | Status |
|---|---|
| PR #36 | `DRAFT` |
| Mergeability | `MERGEABLE` |
| GitHub checks | `NO_CHECKS_REPORTED` |
| Deploy source | `DEPLOY_SOURCE_PARTIALLY_PROVEN` |
| Sitemap contour | `30_URL_CURRENT` |
| Metrika counter | `109869928_PRESENT` |
| Webvisor/ecommerce | `OWNER_LEGAL_DECISION_REQUIRED` |
| Metrika goals | `LK_CONFIRMATION_REQUIRED` |
| Forms/CRM | `OFF` |
| Paid traffic | `HOLD` |
| Final owner GO | `NOT_GIVEN` |

## 3. Recommended Safe Defaults

These are recommendations only. They are not approval.

| Decision | Recommended default | Reason |
|---|---|---|
| Deploy source | `CONFIRM_CURRENT_STATIC_MAIN_WITH_DEPLOYER_BEFORE_MERGE` | Live matches current static snapshot, but workflow is not proven. |
| Sitemap | `KEEP_30_URL_CONTOUR_FOR_FIRST_TEST` | Lower risk; 36 URL expansion should be separate SEO decision. |
| Metrika Webvisor/ecommerce | `LEGAL_OWNER_REVIEW_BEFORE_CHANGE` | Do not change analytics privacy behavior without written decision. |
| First landing pages | `ONLY_CORE_3_FOR_FIRST_TEST` | Start with safest pages: `/`, `/razbor-situacii/`, `/kontakty/`. |
| Blocked pages | `CONFIRM_BLOCKED_LIST` | Avoid tax-sensitive/blog/policy/internal pages in ads. |
| Forms/CRM | `KEEP_OFF_FOR_FIRST_TEST` | Avoid lead-processing/privacy risk. |
| Paid traffic | `HOLD_UNTIL_POST_DEPLOY_SMOKE_AND_METRIKA_LK` | Need final proof before spend. |

## 4. Decisions Owner Must Make

### A. Production deploy source

Current verdict: `DEPLOY_SOURCE_PARTIALLY_PROVEN`.

Evidence:

- Live appears to match current static snapshot.
- Live is served through `nginx/1.24.0 (Ubuntu)`.
- GitHub Pages API returned `404`.
- Current main has no package/build workflow.
- Actual release workflow is still not proven.

Choose one:

- [ ] A1 — Approve current `dokumenty82-site/main` static snapshot as production deploy source.
- [ ] A2 — Confirm a different deploy source: repository/branch/server folder must be documented.
- [ ] A3 — Deploy source is not confirmed; keep paid traffic HOLD.

Recommended safe default: `A3` until deployer confirms.

Owner selection:

```text
DEPLOY_SOURCE_DECISION: NOT_SELECTED
DEPLOY_SOURCE_COMMENT:
```

### B. Sitemap contour

Current state: `30_URL_CURRENT`.

Choose one:

- [ ] B1 — Keep current 30 URL sitemap for first paid traffic test.
- [ ] B2 — Expand to 36 URLs in a separate SEO PR before ads.
- [ ] B3 — Keep 30 URLs for ads, prepare 36 URL expansion later.
- [ ] B4 — Decision postponed; keep paid traffic HOLD.

Recommended safe default: `B1`.

Owner selection:

```text
SITEMAP_CONTOUR_DECISION: NOT_SELECTED
SITEMAP_CONTOUR_COMMENT:
```

### C. Metrika Webvisor / ecommerce

Current status: `OWNER_LEGAL_DECISION_REQUIRED`.

Known issue:

- Current live/static Metrika behavior includes or may include Webvisor/ecommerce markers.
- This PR does not change analytics behavior.
- Owner/legal/privacy decision is required before relying on this for ads.

Choose one:

- [ ] C1 — Keep current Webvisor/ecommerce behavior after owner/legal/privacy approval.
- [ ] C2 — Prepare separate analytics/privacy PR to disable Webvisor/ecommerce before ads.
- [ ] C3 — Keep paid traffic HOLD until legal/privacy decision.
- [ ] C4 — Request external legal/privacy review.

Recommended safe default: `C3`.

Owner selection:

```text
METRIKA_PRIVACY_DECISION: NOT_SELECTED
METRIKA_PRIVACY_COMMENT:
```

### D. First landing pages

Recommended first-test pages:

- `/`
- `/razbor-situacii/`
- `/kontakty/`

Broader after-gates landing list remains documented in the go/no-go report, but first launch should be narrower.

Choose one:

- [ ] D1 — Approve only core 3 pages for first test: `/`, `/razbor-situacii/`, `/kontakty/`.
- [ ] D2 — Approve full documented landing list after global gates.
- [ ] D3 — Require copy/legal review per landing page.
- [ ] D4 — Do not approve landing pages yet.

Recommended safe default: `D1`.

Owner selection:

```text
LANDING_PAGES_DECISION: NOT_SELECTED
LANDING_PAGES_COMMENT:
```

### E. Blocked pages for ads

Blocked before review:

- `/policy`
- `/o-proekte/`
- `/blog/*`
- `/faq/`
- `/internal/*`
- `/nalogi-i-rezhimy/`
- `/ausn-krym/`
- `/raschet-nalogovoy-nagruzki/`
- `/nds-pri-usn-2026/`
- `/srochnye-voprosy/` — `NEEDS_COPY_FIX`

Choose one:

- [ ] E1 — Confirm blocked list.
- [ ] E2 — Request separate copy/legal cleanup PR.
- [ ] E3 — Review manually before ads.

Recommended safe default: `E1`.

Owner selection:

```text
BLOCKED_PAGES_DECISION: NOT_SELECTED
BLOCKED_PAGES_COMMENT:
```

### F. Forms / CRM

Current state: `OFF`.

Choose one:

- [ ] F1 — Keep forms/CRM OFF for first paid traffic test; use contact routes only.
- [ ] F2 — Prepare separate forms/CRM PR before ads.
- [ ] F3 — Do not start ads until forms/CRM are ready.

Recommended safe default: `F1`.

Owner selection:

```text
FORMS_CRM_DECISION: NOT_SELECTED
FORMS_CRM_COMMENT:
```

### G. Final owner GO

Final owner GO can only be given after A-F are selected and post-deploy/Metrika checks are complete.

Choose one:

- [ ] G1 — Keep HOLD.
- [ ] G2 — Move to deploy-source confirmation stage only, not ads.
- [ ] G3 — Move to post-deploy smoke-check stage only, not ads.
- [ ] G4 — Paid traffic GO after all gates are proven separately.

Recommended safe default now: `G1`.

Owner selection:

```text
FINAL_OWNER_GO_DECISION: NOT_SELECTED
FINAL_OWNER_GO_COMMENT:
```

## 5. Owner Signature Block

Owner must write explicit selections.

```text
OWNER_NAME:
OWNER_DATE:
DEPLOY_SOURCE_DECISION:
SITEMAP_CONTOUR_DECISION:
METRIKA_PRIVACY_DECISION:
LANDING_PAGES_DECISION:
BLOCKED_PAGES_DECISION:
FORMS_CRM_DECISION:
FINAL_OWNER_GO_DECISION:
```

Until this block is completed:

```text
OWNER_GO: NOT_GIVEN
PAID_TRAFFIC: HOLD
PR_36: DRAFT
```

## 6. Codex Recommendation

Recommended next state:

```text
PR #36: Draft
Merge: NO
Deploy: NO
Paid traffic: HOLD
Next: collect owner/deployer/legal decisions in PR comment.
```
