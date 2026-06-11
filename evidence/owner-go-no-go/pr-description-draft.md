# P0 local readiness pack: placeholders, evidence, legal/privacy and staging readiness

## Summary

This PR would bring the local P0 readiness work into GitHub for review. It does not approve public launch and does not enable live forms, CRM, analytics, Metrica, MAX, Telegram, cookie notice or live map.

## Scope

- canonical Next.js P0 integration;
- placeholder-only forms;
- browser/accessibility/rendered evidence;
- owner/legal/privacy review pack;
- staging/hosting/rollback readiness pack;
- remote sync owner go/no-go preparation.

## What changed

- Added safe form placeholder components.
- Integrated placeholders into selected P0 routes.
- Added local evidence generation/check scripts.
- Added browser/accessibility/forms/final-local evidence.
- Added owner/legal/privacy review pack.
- Added staging/hosting/rollback readiness pack.
- Added TCP-only Nginx reference config.

## Evidence packs

- `code/evidence/browser`
- `code/evidence/accessibility`
- `code/evidence/forms`
- `code/evidence/final-local`
- `code/evidence/owner-legal-privacy`
- `code/evidence/staging-hosting-rollback`
- `code/evidence/owner-go-no-go`

## Commands passed

- `npm run check:p0-semantic`
- `npm run build`
- `npm run evidence:p0`
- `npm run check:p0-evidence`
- `npm run check:fns-blog-news`
- `npm run check:launch-readiness`
- `npm run check:finalization`
- `npm run check:p0-full`
- `npm run check:local-p0-browser`
- `npm run check:owner-legal-privacy`
- `npm run check:staging-hosting-rollback`
- `npm run check:owner-go-no-go`

## HOLD remaining

- `PUBLIC_LIVE_ALLOWED = false`
- public launch remains HOLD
- production deploy not performed
- staging URL proof required
- owner approval required
- legal/privacy final sign-off required
- rollback proof on real hosting required
- live forms disabled
- CRM disabled
- analytics disabled
- Metrica disabled
- cookie notice disabled
- MAX disabled
- Telegram disabled
- live map disabled
- no real form submit
- no public file upload
- prices, discounts, guarantees, reviews and ratings remain HOLD

## What is NOT enabled

- no deploy;
- no public launch;
- no live forms;
- no form submit;
- no backend endpoint;
- no CRM;
- no analytics;
- no Metrica;
- no MAX;
- no Telegram;
- no cookie notice;
- no live map;
- no upload;
- no success state.

## Release verdict

`PUBLIC_RELEASE_HOLD`

## Reviewer checklist

- [ ] Review placeholder form behavior.
- [ ] Review browser/accessibility evidence.
- [ ] Review owner/legal/privacy pack.
- [ ] Review staging/hosting/rollback pack.
- [ ] Confirm no forbidden files are included.
- [ ] Confirm screenshots are acceptable as committed evidence.
- [ ] Confirm public launch remains HOLD.

## Owner decisions required

- [ ] Approve draft PR sync.
- [ ] Decide whether screenshot evidence remains in git.
- [ ] Decide next stage after PR review.
- [ ] Keep `PUBLIC_LIVE_ALLOWED=false` until separate launch approval.
