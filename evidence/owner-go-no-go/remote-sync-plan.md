# Remote Sync Plan

## Current mode

`REMOTE_SYNC_ALLOWED=false`

No push and no PR creation are allowed in the current run.

## Option A - Recommended: Draft PR

Purpose: send the local readiness pack for review without merging or launching.

Commands to run only after explicit owner approval:

```powershell
cd C:\new\dokumenty-dlya-biznesa
git switch -c p0-local-readiness-pack
git push -u origin p0-local-readiness-pack
```

Then create a draft PR:

- base: `main`
- head: `p0-local-readiness-pack`
- title: `P0 local readiness pack: placeholders, evidence, legal/privacy and staging readiness`
- body: use `code/evidence/owner-go-no-go/pr-description-draft.md`

Rules:

- do not merge;
- do not mark ready;
- do not enable auto-merge;
- public launch remains HOLD.

## Option B - Direct main push

Not recommended. Push directly to `main` only if owner explicitly approves direct main sync.

This option requires separate confirmation and should not be performed automatically.

## Option C - No push

Keep all commits local. Continue review locally.

## Cleanup-first option

If owner wants lighter remote history, decide whether screenshots remain in git:

- `KEEP_SCREENSHOT_EVIDENCE_IN_GIT`
- `MOVE_SCREENSHOTS_TO_EXTERNAL_EVIDENCE_STORAGE`

Current screenshot evidence size is approximately 1.17 MB total, with the largest PNG under 116 KB.

## Current recommendation

Use Option A: Draft PR.
