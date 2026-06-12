# Stage 17H Human Decision Intake Protocol V1

Status: `READY_FOR_OWNER_REVIEW`

Release verdict: `GO WITH CONDITIONS`

Public launch: `NOT_PUBLIC_LIVE_READY`

`PUBLIC_LIVE_ALLOWED = false`

## 1. Purpose

This protocol explains how future human owner/legal/backend/ops decisions must be recorded safely in `elena70semen/dokumenty82-site`.

It prevents fake approvals, preserves source-to-site traceability and keeps public-live gates closed until explicit evidence exists.

## 2. What Counts As An Explicit Human Decision

An explicit human decision must include:

- decision source, such as owner-provided text, reviewed document, signed checklist, issue comment, PR review, meeting note or other recorded artifact;
- decision maker role: owner, legal, backend/CRM, analytics, ops or SEO;
- date of decision;
- exact scope: route, file, gate, provider, flow or blocker;
- decision status from the allowed status list;
- notes or limitations if approval is conditional;
- link or path to evidence artifact.

## 3. What Does Not Count As Approval

The following do not count as approval:

- a Codex summary without human-provided decision evidence;
- an existing checklist that says `READY_FOR_OWNER_REVIEW`;
- passing build, QA, browser, accessibility or guardrail checks;
- route implementation in code;
- source docs becoming complete;
- owner review packet preparation;
- staging proof by itself;
- legal approval for copy without backend/CRM/analytics proof;
- owner approval for routes without public-live go/no-go;
- absence of objections.

## 4. Required Decision Evidence

Every recorded decision must point to evidence:

| Decision area | Required evidence |
| --- | --- |
| Route/copy owner decision | Route row, owner note and exact accepted/revised/held scope. |
| Legal/privacy decision | Reviewed `/policy`, consent/data notes and legal scope. |
| CRM/forms decision | Backend/CRM flow acceptance or disabled fallback decision. |
| Analytics/Metrica decision | No-PII payload proof and owner/legal acceptance. |
| Staging proof | Staging URL/build proof without DNS/public-live change. |
| Rollback proof | Reproducible rollback drill record. |
| Transport proof | HTTPS over TCP/443 with HTTP/1.1 or HTTP/2 baseline; no unapproved HTTP/3/QUIC/UDP/443/Alt-Svc h3/listen quic. |
| Search Console/Yandex Webmaster | Verification/submission/setup proof or explicit setup plan. |
| Public live | Explicit owner go/no-go after all blocking gates are resolved. |

## 5. Route Decision Statuses

Allowed route decision statuses:

- `PENDING_HUMAN_REVIEW`
- `APPROVED_BY_OWNER`
- `APPROVED_BY_LEGAL`
- `APPROVED_WITH_NOTES`
- `REJECTED`
- `NEEDS_REVISION`
- `SOURCE_CLARIFICATION_REQUIRED`
- `NOT_PUBLIC_LIVE_READY`

Route-level approval can only apply to the route/copy scope stated in the evidence. It does not approve public live, legal/privacy, backend/CRM, analytics, staging, rollback or transport.

## 6. Owner/Legal Statuses

Allowed owner/legal statuses:

- `PENDING_HUMAN_REVIEW`
- `APPROVED_BY_OWNER`
- `APPROVED_BY_LEGAL`
- `APPROVED_WITH_NOTES`
- `REJECTED`
- `NEEDS_REVISION`
- `SOURCE_CLARIFICATION_REQUIRED`
- `NOT_PUBLIC_LIVE_READY`

Owner approval does not replace legal/backend/ops proof.

Legal approval does not enable CRM/forms/analytics automatically.

## 7. CRM/Forms/Analytics Statuses

Allowed CRM/forms/analytics statuses:

- `PENDING_HUMAN_REVIEW`
- `BACKEND_CRM_REVIEW_REQUIRED`
- `APPROVED_WITH_NOTES`
- `REJECTED`
- `NEEDS_REVISION`
- `SOURCE_CLARIFICATION_REQUIRED`
- `NOT_PUBLIC_LIVE_READY`

CRM/forms/analytics cannot be marked approved unless the evidence proves:

- no false success;
- real backend/CRM behavior or accepted disabled fallback;
- no public upload unless separately approved and proven;
- no private IDs or secrets in repo;
- no-PII analytics payload if analytics is approved later.

## 8. Staging/Rollback/Transport Proof Statuses

Allowed ops statuses:

- `PENDING_HUMAN_REVIEW`
- `OPS_REVIEW_REQUIRED`
- `APPROVED_WITH_NOTES`
- `REJECTED`
- `NEEDS_REVISION`
- `SOURCE_CLARIFICATION_REQUIRED`
- `NOT_PUBLIC_LIVE_READY`

Staging proof does not enable public live automatically.

Transport proof must keep the protocol-specific rule:

```text
HTTP/3 / QUIC over UDP/443 requires separate owner/ops approval and proof.
The baseline safe launch mode is HTTPS over TCP/443 using HTTP/1.1 or HTTP/2.
```

## 9. Search Console/Yandex Webmaster Statuses

Allowed SEO/ops statuses:

- `PENDING_HUMAN_REVIEW`
- `OPS_REVIEW_REQUIRED`
- `APPROVED_WITH_NOTES`
- `REJECTED`
- `NEEDS_REVISION`
- `SOURCE_CLARIFICATION_REQUIRED`
- `NOT_PUBLIC_LIVE_READY`

Search Console or Yandex Webmaster setup proof can close an SEO setup blocker only for the exact scope proven. It does not approve indexing for blog/news foundation routes, paid traffic or public live.

## 10. Public Live Statuses

Allowed public-live statuses:

- `NOT_PUBLIC_LIVE_READY`
- `PENDING_HUMAN_REVIEW`
- `REJECTED`
- `NEEDS_REVISION`
- `SOURCE_CLARIFICATION_REQUIRED`

Do not record public live as approved in this protocol unless a later task provides explicit owner go/no-go evidence after all public-live blockers are closed.

Public live cannot become true from route approval alone.

## 11. How To Update Route Decision Log After Review

When human route decisions arrive:

1. Verify evidence source and decision maker.
2. Update only the exact route rows covered by evidence in `docs/owner-review/stage-17g-route-decision-log-v1.md`.
3. Keep `Public-live decision` as `NOT_PUBLIC_LIVE_READY` unless a separate public-live go/no-go exists.
4. Add notes for `APPROVED_WITH_NOTES`, `NEEDS_REVISION` or `SOURCE_CLARIFICATION_REQUIRED`.
5. Update `docs/owner-review/stage-17g-go-no-go-review-checklist-v1.md` only for blockers with real evidence.
6. Run required checks after applying decisions.

## 12. How To Avoid Fake Approvals

- No decision can be recorded as approved without explicit human-provided evidence.
- Never infer approval from completed docs or passing checks.
- Never convert `READY_FOR_OWNER_REVIEW` into approved.
- Never mark a blocker closed because it is listed in a roadmap.
- Never treat owner approval as legal/backend/ops approval.
- Never treat legal approval as CRM/forms/analytics approval.
- Never treat staging proof as public-live approval.
- Keep all unproven items as `MISSING_EXPECTED`, `PENDING_HUMAN_REVIEW`, `NEEDS_REVISION`, `SOURCE_CLARIFICATION_REQUIRED`, `BACKEND_CRM_REVIEW_REQUIRED`, `OPS_REVIEW_REQUIRED` or `NOT_PUBLIC_LIVE_READY`.

## 13. Stop Conditions

Stop and report if:

- decision evidence is missing or ambiguous;
- decision scope is broader than the evidence;
- approval would expose HOLD data;
- approval would enable public live, deploy, DNS, paid traffic, CRM/forms, analytics, upload, messaging, FNS automation or HTTP/3/QUIC without separate proof;
- route changes would create a new URL or cannibalize an existing route;
- legal/privacy or backend/ops evidence conflicts with source-of-truth.

## 14. Required Checks After Applying Decisions

After recording any future decision, run the relevant available checks:

- `npm run check:p0-semantic`
- `npm run build`
- `npm run evidence:p0`
- `npm run check:p0-evidence`
- `npm run check:fns-blog-news`
- `npm run check:static-links`
- `npm run check:launch-readiness`
- `npm run check:finalization`
- `npm run check:stage16-source-to-site`
- `npm run brand:check`
- `npm run check:pricing`
- `npm run check:local-p0-browser` when preview is running
- forbidden-content scan over runtime/source areas
- `git diff --check`

## Release Verdict

`GO WITH CONDITIONS`

This protocol is ready for controlled human decision intake. It records no approval by itself.

`PUBLIC_LIVE_ALLOWED = false`
