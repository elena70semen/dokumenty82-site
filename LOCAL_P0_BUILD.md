# Local P0 Build

## Paths

Source repo:
C:\new\dokumenty-dlya-biznesa

Site source:
C:\new\dokumenty-dlya-biznesa\code

Standalone proof reference:
C:\new\dokumenty82-site

Static export:
C:\new\dokumenty-dlya-biznesa\code\out

Local copy:
C:\new\dokumenty82-p0-local

Evidence:
C:\new\dokumenty-dlya-biznesa\code\evidence\p0

Browser/accessibility evidence:
C:\new\dokumenty-dlya-biznesa\code\evidence\browser
C:\new\dokumenty-dlya-biznesa\code\evidence\accessibility
C:\new\dokumenty-dlya-biznesa\code\evidence\rendered
C:\new\dokumenty-dlya-biznesa\code\evidence\forms
C:\new\dokumenty-dlya-biznesa\code\evidence\final-local

## Source-of-truth status

Canonical Next.js checkout is present at:
C:\new\dokumenty-dlya-biznesa

The selected site source for the current local P0 build is:
C:\new\dokumenty-dlya-biznesa\code

The standalone proof remains a reference only. It was not copied over as the site architecture.

## Rebuild

```powershell
cd C:\new\dokumenty-dlya-biznesa\code
npm install
npm run check:p0-semantic
npm run build
npm run evidence:p0
npm run check:p0-evidence
npm run check:fns-blog-news
npm run check:launch-readiness
npm run check:finalization
npm run check:p0-full
```

If PowerShell blocks `npm.ps1`, use `npm.cmd` for the same commands.

## Copy local build

```powershell
$Root = "C:\new"
$Repo = "$Root\dokumenty-dlya-biznesa"
$Source = "$Repo\code\out"
$Target = "$Root\dokumenty82-p0-local"

if (!(Test-Path $Source)) {
  throw "Canonical static export not found: $Source"
}

if (Test-Path $Target) {
  Remove-Item "$Target\*" -Recurse -Force
} else {
  New-Item -ItemType Directory -Path $Target | Out-Null
}

Copy-Item "$Source\*" $Target -Recurse -Force
```

## Preview

```powershell
cd C:\new\dokumenty-dlya-biznesa\code
node scripts/serve-static.mjs ..\..\dokumenty82-p0-local 4173
```

Local URL:
http://127.0.0.1:4173/

## Browser and accessibility evidence

Run after the static export has been copied to `C:\new\dokumenty82-p0-local` and the local preview server is available at `http://127.0.0.1:4173/`.

```powershell
cd C:\new\dokumenty-dlya-biznesa\code
npm.cmd run check:local-p0-browser
```

This command generates and verifies:
- browser route evidence;
- Browser/Playwright screenshot smoke evidence;
- form placeholder evidence;
- rendered DOM evidence;
- final-local safety evidence;
- accessibility evidence.

Rendered screenshots are stored at:
`C:\new\dokumenty-dlya-biznesa\code\evidence\rendered\screenshots`

Browser smoke proof:
`C:\new\dokumenty-dlya-biznesa\code\evidence\browser\playwright-smoke-proof.json`

Browser/accessibility report:
`C:\new\dokumenty-dlya-biznesa\code\BROWSER_ACCESSIBILITY_EVIDENCE_REPORT.md`

## Staging / Hosting / Rollback Readiness

Run after the static export has been rebuilt, copied to `C:\new\dokumenty82-p0-local`, and the local preview server is available at `http://127.0.0.1:4173/`.

```powershell
cd C:\new\dokumenty-dlya-biznesa\code
npm.cmd run evidence:staging-hosting-rollback
npm.cmd run check:staging-hosting-rollback
```

Evidence folder:
`C:\new\dokumenty-dlya-biznesa\code\evidence\staging-hosting-rollback`

Report:
`C:\new\dokumenty-dlya-biznesa\code\STAGING_HOSTING_ROLLBACK_REPORT.md`

Nginx TCP-only reference:
`C:\new\dokumenty-dlya-biznesa\code\server\nginx\dokumenty82.static-tcp-only.reference.conf`

Current staging recommendation:
- static hosting over HTTPS/TCP;
- HTTP/2 allowed;
- HTTP/3, QUIC, UDP/443 and h3 Alt-Svc disabled unless separately approved;
- no live CRM/forms/analytics;
- no production public launch until owner/legal/staging/rollback gates pass.

## Form placeholders

Forms are UI placeholders only:
- no real form submit;
- no backend endpoint;
- no CRM;
- no analytics;
- no Metrica;
- no MAX;
- no Telegram;
- no upload;
- no success state;
- fallback is phone or `/kontakty/`;
- button text: `Отправка пока не подключена`;
- explanatory text: `Онлайн-отправка пока не подключена. Чтобы передать вопрос, позвоните или согласуйте способ показа документов.`

Integrated placeholders:
- `/razbor-situacii/` - short situation form;
- `/kontakty/` - callback form;
- document-heavy P0 money-pages - show-documents form without file upload.

## Evidence files

Required canonical evidence:
- `evidence\p0\summary.md`
- `evidence\p0\route-manifest-proof.json`
- `evidence\p0\sitemap-proof.json`
- `evidence\p0\rendered-route-proof.json`
- `evidence\p0\metadata-proof.json`
- `evidence\p0\collector-proof.json`
- `evidence\p0\feature-flags-proof.json`
- `evidence\p0\safety-guard-proof.json`

## HOLD remaining

- PUBLIC_LIVE_ALLOWED = false
- public launch remains HOLD
- production deploy not performed
- legal/privacy review required
- CRM disabled
- analytics disabled
- Metrica disabled
- MAX disabled
- Telegram disabled
- cookie notice disabled
- live map disabled
- forms placeholders only
- no public file upload
- prices, discounts, guarantees, reviews and ratings remain HOLD

## Release verdict

CANONICAL NEXT INTEGRATION PASSED LOCALLY.
PUBLIC RELEASE HOLD.
