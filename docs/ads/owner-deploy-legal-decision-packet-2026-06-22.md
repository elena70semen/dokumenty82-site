# Owner / Deploy / Legal Decision Packet — 2026-06-22

Project: `dokumenty82.ru` / `Документы для бизнеса`

Repository: `elena70semen/dokumenty82-site`

PR: `#36 [codex] finalize webmaster readiness before paid traffic`

Status: `DRAFT_DECISION_PACKET`

Paid traffic: `HOLD`

Forms/CRM: `OFF`

Metrika counter: `109869928`

## 1. Current State

- Yandex Webmaster is in observation mode, not the main blocker.
- PR #36 is a Draft decision/evidence PR.
- PR #36 is not a deploy approval.
- PR #36 is not an ads launch approval.
- Current score: `7/10`.
- Current verdict: `BLOCKED_OWNER_DECISION_REQUIRED`.
- Paid traffic remains `HOLD`.
- Forms/CRM remain `OFF`.

## 2. Confirmed Technical Facts

| Area | Status | Notes |
|---|---|---|
| PR #36 | `DRAFT` | Must stay Draft until owner/deploy/legal decision. |
| Mergeability | `MERGEABLE` | Mergeability does not mean launch approval. |
| CI | `NO_CHECKS_REPORTED` | No GitHub green CI is available for this PR. |
| Favicon | `PASS` | Current static contour has `/favicon.svg` and `/favicon.ico`. |
| Robots | `PASS_WITH_DECISION_NOTE` | `/internal/` must remain closed. |
| Sitemap | `30_URL_CONTOUR` | Current static sitemap contour is 30 URLs. |
| Metrika | `PRESENT` | Counter `109869928` is preserved. |
| Webvisor/ecommerce | `OWNER_LEGAL_DECISION_REQUIRED` | Do not change without approval. |
| Safe goals | `NEEDS_LK_CONFIRMATION` | Code markers are not enough; LK confirmation is required. |
| Forms/CRM | `OFF` | Separate approved PR required before enabling. |
| Paid traffic | `HOLD` | Must not start before final owner GO. |

## 3. Owner Decisions Required

### Decision A — Production Deploy Source

Choose one:

- [ ] A1. Current `dokumenty82-site/main` static snapshot is the approved production deploy source.
- [ ] A2. Production deploy source is another repository/branch/server folder and must be documented before merge.
- [ ] A3. Deploy source is unknown; paid traffic remains HOLD.

Recommended default: `A3` until explicitly confirmed.

### Decision B — Sitemap Contour

Current state: static sitemap contour is `30 URLs`.

Choose one:

- [ ] B1. Keep 30 URL sitemap contour for first paid traffic launch.
- [ ] B2. Expand to 36 URL contour in a separate SEO PR before ads.
- [ ] B3. Keep 30 URL contour for ads, but prepare 36 URL expansion later.
- [ ] B4. Decision postponed; paid traffic remains HOLD.

Recommended default: `B1` for first launch, because it reduces launch risk.

### Decision C — Metrika Webvisor / Ecommerce

Current known risk: live/static Metrika configuration includes Webvisor/ecommerce signals or requires owner/legal confirmation.

Choose one:

- [ ] C1. Keep current Webvisor/ecommerce behavior, after owner/legal/privacy approval.
- [ ] C2. Disable Webvisor/ecommerce in a separate analytics/privacy PR before ads.
- [ ] C3. Keep paid traffic HOLD until legal/privacy decision.
- [ ] C4. Request external legal review before any change.

Recommended default: `C3` until owner/legal decision is written.

### Decision D — Approved Landing Pages For Ads

Approved only after all global gates:

- `/`
- `/razbor-situacii/`
- `/kontakty/`
- `/otchetnost/`
- `/bank-i-115-fz/`
- `/otvet-na-trebovanie-ifns/`
- `/otvet-na-zapros-banka/`
- `/dokumenty-dlya-banka-115-fz/`
- `/deklaraciya-usn/`
- `/nulevaya-otchetnost-ooo/`
- `/nulevaya-otchetnost-ip/`
- `/registraciya-ooo/`
- `/registraciya-ip/`
- `/yuridicheskiy-adres-simferopol/`
- `/nedostovernost-yuridicheskogo-adresa/`

Choose one:

- [ ] D1. Approve this list for first paid traffic test after deploy/source/legal gates.
- [ ] D2. Approve only `/`, `/razbor-situacii/`, `/kontakty/` for first test.
- [ ] D3. Require copy/legal review per landing page.
- [ ] D4. Do not approve paid landing pages yet.

Recommended default: `D2` for minimal first test.

### Decision E — Pages Not For Ads

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

- [ ] E1. Confirm blocked list.
- [ ] E2. Request separate copy/legal cleanup PR.
- [ ] E3. Review manually before ads.

Recommended default: `E1`.

### Decision F — Forms / CRM / Lead Capture

Current state: Forms/CRM are OFF.

Choose one:

- [ ] F1. Keep forms/CRM OFF for first paid traffic test; use safe contact routes only.
- [ ] F2. Prepare separate forms/CRM PR before ads.
- [ ] F3. Do not start ads until forms/CRM are ready.

Recommended default: `F1`.

## 4. Recommended Minimal First Launch Path

Recommended path:

1. Keep PR #36 Draft until owner decisions are written.
2. Confirm deploy source.
3. Keep 30 URL sitemap contour.
4. Keep forms/CRM OFF.
5. Do not change Webvisor/ecommerce until owner/legal decision.
6. Start first paid traffic only to:
   - `/`
   - `/razbor-situacii/`
   - `/kontakty/`
7. Confirm Metrika goals in LK before launch.
8. Run post-deploy smoke-check.
9. Final launch verdict must be a new `GO/NO-GO` note.

## Production Deploy Source Verification

A dedicated verification note was added:

`docs/ads/production-deploy-source-verification-2026-06-22.md`

Current deploy-source status:

```text
DEPLOY_SOURCE_PARTIALLY_PROVEN
```

Owner/deployer still must confirm the real deploy source before any merge,
deploy, or ads launch.

## 5. Final Owner Signature Block

Owner decision status:

```text
OWNER_GO: NOT_GIVEN
DEPLOY_SOURCE: NOT_CONFIRMED
SITEMAP_CONTOUR: NOT_CONFIRMED
METRIKA_PRIVACY: NOT_CONFIRMED
LANDING_PAGES: NOT_CONFIRMED
FORMS_CRM: OFF
PAID_TRAFFIC: HOLD
```

Owner can approve only by writing a clear decision in PR #36 comment or separate signed document.

## 6. Codex Recommendation

Current recommendation:

```text
Do not merge, do not deploy, do not start paid traffic yet.
Keep PR #36 Draft.
Use this packet to collect owner/deploy/legal decisions.
```
