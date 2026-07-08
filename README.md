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
- `AMO_ACCESS_TOKEN`

Optional values:

- `AMO_PIPELINE_ID`
- `AMO_STATUS_ID`
- `AMO_RESPONSIBLE_USER_ID`
- `AMO_ATTACH_FILES=1` when the integration has the files scope
