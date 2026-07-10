# dokumenty82 static site

Recovered production snapshot from VPS.

- VPS: `155.212.142.72`
- Server path: `/var/www/dokumenty82/current`
- Resolved release: `/var/www/dokumenty82/releases/20260707-123713-hashfix-quicknav`
- Archive SHA-256 used for local restore: `2d522e42c2febdaa0b7c364d9ee52371d8b22edd295f7abacf41abcce3341d91`
- Local restore date: `2026-07-07`

This repository currently contains the static production build served by nginx.

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

Optional values:

- `AMO_PIPELINE_ID`
- `AMO_STATUS_ID`
- `AMO_RESPONSIBLE_USER_ID`
- `AMO_ACCESS_TOKEN` as a temporary legacy fallback if OAuth is not ready
- `AMO_ATTACH_FILES=1` when the integration has the files scope

Useful checks after deploy:

- `curl -fsS https://dokumenty82.ru/api/amo/oauth/status`
- `systemctl status dokumenty82-lead --no-pager`

## Analytics events

Yandex Metrika counter `109869928` is loaded by the static pages. The shared
`/assets/analytics-events.js` file sends allowlisted goal names only; it does not
read or send form values, phone numbers, email addresses, messages or files.

The lead form reports:

- `goal_form_start` after the first form interaction;
- `goal_form_submit_attempt` when the submit control is used;
- `goal_form_submit_success` only after `/api/lead` returns a successful response;
- `goal_form_submit_fail` after validation or delivery failure.

Metrika UI evidence (2026-07-10): goal `580981206`, "Успешная отправка
заявки", listens for `goal_form_submit_success` on counter `109869928`.

Post-deploy SEO and tracking smoke checks:

- `curl -fsS https://dokumenty82.ru/sverka-s-nalogovoy/`
- `curl -fsS https://dokumenty82.ru/sitemap.xml | grep sverka-s-nalogovoy`
- `curl -fsS https://dokumenty82.ru/razbor-situacii/ | grep analytics-events.js`
- confirm the Metrika goal `goal_form_submit_success` remains active before interpreting successful submissions as conversions;
- do not submit a real form or file as an automated smoke test.

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
