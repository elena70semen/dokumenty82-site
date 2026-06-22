# VPS launch handoff for Vitya

## 1. Project summary

- Project: `Документы для бизнеса`.
- Target domain: `https://dokumenty82.ru/`.
- Category: `Центр подготовки документов`.
- Location: Симферополь / Республика Крым.
- Current goal: deploy the strengthened static site safely through staging and owner-approved production.
- Current priority: safe staging, deployment repeatability, rollback proof and checks.
- Final graphics/images can be improved later; the current package is already strong for text, SEO, mobile, structure and static readiness.
- Public live is still blocked.

```text
PUBLIC_LIVE_ALLOWED=false
```

## 2. Repositories and roles

Site repo:

- `elena70semen/dokumenty82-site`
- Deployable implementation repository.
- Root-level Next.js static export site.
- PR #20 is the current strengthened site package.
- Static output is generated into `out/`.

Source repo:

- `elena70semen/dokumenty-dlya-biznesa`
- Source-of-truth for canon, docs, marketing, HOLD zones, SEO, launch gates, CRM/analytics constraints and owner/legal decisions.
- PR #23 is Yandex Direct documentation work. It is not a paid traffic approval and does not authorize spend or launch.

Operational rule:

- Site deployment should come from the site repo, not from the source repo.
- Server changes must be reflected back in GitHub. The VPS must not become the source of truth.
- Access details, private keys, provider credentials, tokens and production-sensitive notes must stay outside GitHub/Codex and move only through an owner-approved secure channel.

## 3. Current PR and branch state

Site:

- PR #20: `https://github.com/elena70semen/dokumenty82-site/pull/20`
- Branch: `stage20/trust-public-info-policy-readiness`
- Latest Stage 20L commit: `0ad4e95 fix: polish rendered premium site experience`
- CI: PASS
- Draft: yes
- Merge state: CLEAN at Stage 20L handoff time
- Not merged
- Not deployed
- Not live

Source:

- PR #74: merged; source static route parity for `/vosstanovlenie-buhucheta/` resolved.
- PR #23: CI green but human-gated; docs-only Yandex Direct package.
- PR #23 is not paid traffic approval, not spend approval and not public launch approval.

## 4. What is ready

- Strong content, SEO, mobile and static version of the site.
- Homepage router, service hubs, money/diagnostic pages, contacts, about and policy-ready pages strengthened.
- Sitemap, canonicals and structured data checked by existing scripts.
- `/vosstanovlenie-buhucheta/` route exists in the static export.
- Mobile/rendered proof has passed in local and CI-backed checks.
- No active analytics, Metrika, CRM, live forms, public uploads or messaging links are enabled.
- No paid traffic is enabled.
- No public live is enabled.

## 5. What is still blocked

- Owner/legal approval.
- `/policy` approval.
- Production deploy approval.
- DNS switch approval.
- Real Metrika counter decision.
- Analytics/no-PII proof.
- CRM/forms decision.
- Staging, rollback and transport proof.
- Search Console/Yandex Webmaster setup.
- ERIR/advertiser/legal decisions for paid traffic.
- Public live.

## 6. Local build commands

Use Node 22 LTS-compatible runtime. The package expects:

```text
node >=22 <23
npm >=10
```

Recent local checks with Node `v25.9.0` produced an engine warning. Use Node 22 for staging/production work. `npm audit` currently reports 2 moderate advisories; do not run force-fixes without a separate task.

Core local build and verification:

```bash
npm ci
npm run build
npm run check:static-links
npm run evidence:p0
npm run check:p0-evidence
npm run check:finalization
npm run brand:check
npm run check:pricing
```

Additional project scripts that exist and are useful for release/staging work:

```bash
npm run check:preview-artifact
npm run check:release-preflight
npm run check:staging-env
npm run check:launch-readiness
npm run check:stage16-source-to-site
```

Local static preview:

```bash
npm run preview:local
```

Browser/accessibility evidence, after a static preview is available:

```bash
npm run check:local-p0-browser
```

Do not use `npm run start` for the first static deployment candidate. The project is configured as a static export through `next.config.ts`.

## 7. Expected static output

The static export output directory is:

```text
out/
```

Expected important files:

```text
out/index.html
out/sitemap.xml
out/robots.txt
out/vosstanovlenie-buhucheta/index.html
```

Expected route groups include:

- `/`
- `/razbor-situacii/`
- `/kontakty/`
- `/o-proekte/`
- `/policy`
- hub pages such as `/otchetnost/`, `/bank-i-115-fz/`, `/adres-egryul-direktor/`, `/registraciya-i-likvidaciya/`, `/nalogi-i-rezhimy/`, `/kadry/`, `/soprovozhdenie/`, `/srochnye-voprosy/`
- money/diagnostic routes including `/otvet-na-trebovanie-ifns/`, `/otvet-na-zapros-banka/`, `/dokumenty-dlya-banka-115-fz/`, `/deklaraciya-usn/`, `/nulevaya-otchetnost-ip/`, `/vosstanovlenie-buhucheta/`, `/registraciya-ooo/`, `/registraciya-ip/`

Current checks expect 36 indexed sitemap URLs. Noindex foundation routes are excluded from the sitemap under current rules.

## 8. VPS staging plan

This is a plan only. Do not put real credentials in GitHub/Codex.

Use placeholders:

```text
<VPS_HOST>
<VPS_USER>
<SSH_KEY_PATH>
<STAGING_DOMAIN>
<PRODUCTION_DOMAIN>
<DEPLOY_PATH>
<RELEASES_PATH>
<CURRENT_SYMLINK>
```

High-level staging flow:

1. Connect to the VPS using owner-approved credentials outside GitHub/Codex.
2. Create a releases directory, for example `<RELEASES_PATH>`.
3. Build locally or in a controlled CI/runner from the approved commit.
4. Upload `out/` contents to a timestamped release folder.
5. Configure an nginx server block for `<STAGING_DOMAIN>` or a temporary staging host.
6. Protect staging from indexing:
   - add a noindex header or staging robots rule;
   - optionally use basic auth if owner approves.
7. Enable HTTPS for staging if a staging domain exists.
8. Run staging QA.
9. Do not point production DNS yet.

## 9. Production deployment plan

Production can happen only after:

- owner/legal approval;
- `/policy` approval;
- staging QA pass;
- rollback proof;
- DNS/SSL plan approval;
- explicit public live authorization.

Production flow:

1. Build from the approved commit.
2. Upload static output to a new release directory.
3. Switch `<CURRENT_SYMLINK>` atomically to the new release.
4. Reload nginx.
5. Verify key routes.
6. Verify sitemap, robots and canonical URLs.
7. Monitor basic errors.
8. Keep the previous release for rollback.

## 10. Nginx checklist

Use the existing reference as the starting point:

```text
server/nginx/dokumenty82.static-tcp-only.reference.conf
```

Checklist:

- Serve static files from the reviewed static export directory.
- Use project-appropriate static fallback:

```nginx
try_files $uri $uri/ $uri/index.html =404;
```

- Cache `/_next/static/` aggressively.
- Cache `/assets/` reasonably.
- Do not cache HTML too aggressively before launch.
- Redirect HTTP to HTTPS after SSL is ready.
- Choose canonical host behavior before production; current canonical is `https://dokumenty82.ru/`.
- Redirect `www` to non-`www` if owner/ops approve that canonical direction.
- Keep HTTPS over TCP/443 using HTTP/1.1 or HTTP/2 as the safe baseline.
- Do not enable HTTP/3, QUIC, UDP/443 or `Alt-Svc: h3` unless separately approved later.
- Do not commit real certificate paths, private keys, server IP-sensitive notes or access details.

Sample only:

```nginx
server {
  listen 443 ssl;
  http2 on;
  server_name <STAGING_DOMAIN>;

  root <CURRENT_SYMLINK>;
  index index.html;

  add_header X-Robots-Tag "noindex, nofollow" always;

  location /_next/static/ {
    try_files $uri =404;
    add_header Cache-Control "public, max-age=31536000, immutable" always;
  }

  location /assets/ {
    try_files $uri =404;
    add_header Cache-Control "public, max-age=604800" always;
  }

  location / {
    try_files $uri $uri/ $uri/index.html =404;
    add_header Cache-Control "public, max-age=300" always;
  }
}
```

## 11. SSL/DNS checklist

- Identify DNS manager and who is allowed to change records.
- Decide A/AAAA records.
- Decide `www` versus non-`www` behavior.
- Issue SSL only after the staging/production host plan is approved.
- Verify certificate renewal.
- Test staging before switching production.
- Do not change DNS without owner approval.

## 12. Rollback plan

Keep previous release directories.

Placeholder rollback flow:

```bash
ssh <VPS_USER>@<VPS_HOST>
cd <DEPLOY_PATH>
ln -sfn <RELEASES_PATH>/<PREVIOUS_RELEASE> <CURRENT_SYMLINK>
nginx -t
systemctl reload nginx
```

After rollback:

- verify homepage;
- verify `/razbor-situacii/`;
- verify `/kontakty/`;
- verify `/policy`;
- verify `/vosstanovlenie-buhucheta/`;
- notify owner with what changed and why.

## 13. Post-deploy QA checklist

- Homepage loads.
- `/razbor-situacii/` loads.
- `/kontakty/` loads.
- `/o-proekte/` loads.
- `/policy` loads.
- Key hubs load.
- `/vosstanovlenie-buhucheta/` loads.
- `sitemap.xml` loads.
- `robots.txt` loads.
- Canonical URLs point to `https://dokumenty82.ru/`.
- Mobile 390px view has no horizontal overflow.
- Phone link works as `tel:+79789987222`.
- No live forms.
- No public uploads.
- No active Metrika unless separately approved.
- No CRM webhook.
- No public-live mismatch.

## 14. Forbidden actions for integrator

- Do not commit secrets, passwords, SSH keys, API tokens, provider credentials, private keys or production access details.
- Do not edit directly on VPS without reflecting the change back in GitHub.
- Do not enable public live without explicit approval.
- Do not change DNS without explicit approval.
- Do not enable Metrika without approval.
- Do not enable CRM, live forms or public uploads.
- Do not enable messaging links.
- Do not enable paid traffic.
- Do not add prices, guarantees, reviews, ratings, legal IDs, working hours, floor or office number.
- Do not mark `/policy` approved without owner/legal approval.
- Do not merge PR #20 without explicit owner decision.
- Do not mark PR #20 ready without explicit owner decision.
- Do not use the server as the source of truth.

## 15. Working protocol for Vitya

- Work in GitHub branches and PRs.
- Keep PRs draft until reviewed.
- Run checks before push.
- Document deployment commands without secrets.
- Use staging before production.
- Production requires explicit owner go/no-go.
- If an emergency server fix is made, immediately backport the change to GitHub.
- Keep deployment notes operational: what commit, what release directory, what checks, what rollback path.

## 16. Handoff prompt for Vitya

```text
You are helping deploy `Документы для бизнеса`.

Site repo:
`elena70semen/dokumenty82-site`

Current branch/PR:
PR #20, branch `stage20/trust-public-info-policy-readiness`.

Task:
Prepare staging deployment on Beget VPS without production live.

Rules:
- do not commit secrets;
- do not change DNS;
- do not enable public live;
- do not enable analytics/Metrika;
- do not enable CRM/forms/uploads;
- do not merge PR #20;
- do not mark PR #20 ready;
- use placeholders for credentials;
- run build/checks first;
- produce staging plan, rollback plan and QA report.

Start by inspecting package scripts, build output and current PR state.
```
