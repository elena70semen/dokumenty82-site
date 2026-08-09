# dokumenty82 static site

Recovered production snapshot from VPS.

- VPS: `155.212.142.72`
- Server path: `/var/www/dokumenty82/current`
- Recovery source release: `/var/www/dokumenty82/releases/20260707-123713-hashfix-quicknav`
- Archive SHA-256 used for local restore: `2d522e42c2febdaa0b7c364d9ee52371d8b22edd295f7abacf41abcce3341d91`
- Local restore date: `2026-07-07`

This repository currently contains the static production build served by nginx.

## SEO quality and IndexNow

Run the strict local SEO audit before deployment:

```powershell
node internal/site-audit.mjs --strict
```

After the changed pages are live, notify Yandex through its official IndexNow endpoint:

```powershell
node internal/submit-indexnow.mjs --sitemap
```

Pass individual routes instead of `--sitemap` when only a subset changed.

### Yandex review eligibility

The site sends these JavaScript goals to Metrika counter `109869928`:

- `lead_submit_success`
- `contact_phone`
- `contact_email`
- `contact_telegram`
- `contact_max`
- `contact_route`

Create matching JavaScript-event goals in Metrika. In the counter settings, also enable
`Allow data use for surveys and review collection` under the data security settings.

## Lead form endpoint

The `/razbor-situacii/` page posts the lead form to `/api/lead`.

Server files:

- `/opt/dokumenty82-form/lead_receiver.py`
- `/etc/systemd/system/dokumenty82-lead.service`
- `/etc/dokumenty82-form.env` (root-only secrets, not committed)
- `/var/lib/dokumenty82-leads/` (stored submissions and uploaded files)

Required amoCRM values in `/etc/dokumenty82-form.env`:

- `AMO_SUBDOMAIN`
- `AMO_CLIENT_ID`
- `AMO_CLIENT_SECRET`
- `AMO_REDIRECT_URI=https://dokumenty82.ru/api/amo/oauth/callback`

amoCRM external integration settings:

- Redirect URL: `https://dokumenty82.ru/api/amo/oauth/callback`
- Disconnect hook URL: `https://dokumenty82.ru/api/amo/oauth/disconnect`
- Integration name: `dokumenty82.ru - site leads`
- Description: `Lead form on dokumenty82.ru creates an amoCRM lead/contact and stores uploaded files on the server.`

OAuth tokens are stored outside Git at:

- `/var/lib/dokumenty82-leads/amo-oauth-token.json`

The token file must remain owned by `d82lead:d82lead` with mode `0600`. The
systemd unit restores those permissions before each service start.

Optional values:

- `AMO_PIPELINE_ID`
- `AMO_STATUS_ID`
- `AMO_RESPONSIBLE_USER_ID`
- `AMO_ACCESS_TOKEN` as a temporary legacy fallback if OAuth is not ready
- `AMO_ATTACH_FILES=1` when the integration has the files scope

Useful checks after deploy:

- `curl -fsS https://dokumenty82.ru/api/amo/oauth/status`
- `systemctl status dokumenty82-lead --no-pager`

## AI chat endpoint

The floating `AI` button is upgraded by `/assets/ai-chat.js` and posts chat turns to `/api/ai-chat`.

Required server value in `/etc/dokumenty82-form.env`:

- `OPENAI_API_KEY`

Default AI settings:

- `OPENAI_MODEL=gpt-5.4-mini`
- `AI_CHAT_ENABLED=1`
- `AI_RATE_LIMIT_MAX=24`
- `AI_RATE_LIMIT_WINDOW_SECONDS=3600`

When a visitor asks to send the conversation to a specialist, the widget posts the transcript to `/api/lead`, so the request goes into amoCRM through the same lead receiver.

## Qualified leads and offline conversions

`/assets/metrika-goals.js` keeps the first Yandex click ID and UTM values for the browser session and obtains Metrika `ClientID` only through the live counter API. A stored `_ym_uid` cookie is not trusted because it can belong to an earlier visit when the current counter request is blocked. Both the lead form and AI chat send verified attribution to `/api/lead`.

The receiver writes `ClientID` to the amoCRM lead tracking field. Configure its numeric field ID as `AMO_METRIKA_CLIENT_ID_FIELD_ID` in `/etc/dokumenty82-form.env`. For the current amoCRM account this is the built-in `_ym_uid` field. The receiver also writes YCLID and UTM attribution to the lead note for diagnostics.

Use Metrika's official amoCRM connector under `Integrations -> CRM data transfer -> amoCRM`. In that connector:

- map the amoCRM field `_ym_uid` as the Metrika `ClientID` field;
- map `Нужна консультация` to a qualified-lead goal;
- map `Назначена встреча` to a consultation goal;
- map the successful sale status to the paid-order goal.

The official connector imports mapped statuses every hour. Only new deals created after the connection is enabled are imported, and initial attribution is limited to 21 days after the visitor's target session.

## Client portal MVP

The invite-only client portal lives at `/cabinet/`. Its API is a separate Python service so portal authentication and files remain isolated from the public lead form.

Local demo:

```powershell
$env:D82_PORTAL_DEV_MODE="1"
$env:D82_PORTAL_SECURE_COOKIE="0"
$env:D82_PORTAL_HASH_KEY="local-development-key-at-least-32-characters"
$env:D82_PORTAL_DATA_DIR="$PWD\.codex-tmp\portal-data"
$env:D82_PORTAL_STATIC_DIR="$PWD\cabinet"
python server/client_portal.py --seed-demo
python server/client_portal.py
```

Open `http://127.0.0.1:8098/cabinet/` and sign in as `demo@dokumenty82.ru`. Development mode prints and returns the one-time code. Production never returns the code to the browser.
The demo seeder is disabled unless `D82_PORTAL_DEV_MODE=1`.

Production files:

- `/opt/dokumenty82-portal/client_portal.py`
- `/etc/dokumenty82-portal.env` with mode `0600`
- `/etc/systemd/system/dokumenty82-portal.service`
- `/var/lib/dokumenty82-portal/` owned by `d82portal:d82portal` with mode `0700`

Required production settings:

- `D82_PORTAL_HASH_KEY` containing at least 32 random characters;
- SMTP host, sender, username and password for one-time codes;
- `D82_PORTAL_SECURE_COOKIE=1` and an HTTPS public origin.

The nginx API location is documented in `server/dokumenty82-portal.nginx.conf`. Do not expose the SQLite database or portal file directory through nginx. The portal page is `noindex, nofollow`, does not load Metrika, and keeps customer data behind the authenticated API.
