# Transport Protocol Launch Gate Sync V1

## Purpose

This is the source-to-site sync package for the transport protocol launch gate. It defines the exact source materials that must stay aligned in `elena70semen/dokumenty82-site`.

This package does not approve public launch, hosting deployment, paid traffic, analytics, CRM, live forms, public upload, FNS autopublish or any provider credential.

## Current status

| Area | Status |
| --- | --- |
| Source repository | `elena70semen/dokumenty-dlya-biznesa` |
| Site repository | `elena70semen/dokumenty82-site` |
| Site repository availability in current Codex environment | `PASS` for `/Users/office-9102/Documents/GitHub/dokumenty82-site` |
| Source package status | `SOURCE_READY_WITH_CONDITIONS` |
| Public launch | `NOT_PUBLIC_LAUNCH_READY` |
| Public live allowed | `false` |

## Controlling rule

`HTTP/3 / QUIC over UDP/443 requires separate owner/ops approval and proof. The baseline safe launch mode is HTTPS over TCP/443 using HTTP/1.1 or HTTP/2.`

This is a protocol/deploy gate, not a web-server-brand claim.

## Server positioning

- Caddy is not banned as software.
- Caddy can be risky for first launch if it serves or advertises `HTTP/3` / `QUIC` without explicit control.
- Nginx is preferred for the first static launch candidate only because the intended config is classic HTTPS over TCP with `HTTP/1.1` or `HTTP/2`.
- Nginx can also support `HTTP/3` / `QUIC` if configured to do so, so the rule is protocol-specific, not brand-specific.

## Stage baseline

| Transport item | Status | Notes |
| --- | --- | --- |
| `HTTPS over TCP/443 with HTTP/1.1 or HTTP/2` | `ALLOWED_BASELINE` | Required baseline for first static launch candidate. |
| `HTTP/3` | `BLOCKED_BY_DEFAULT` | Requires separate owner/ops approval and proof. |
| `QUIC` | `BLOCKED_BY_DEFAULT` | Requires separate owner/ops approval and proof. |
| `UDP/443` | `BLOCKED_BY_DEFAULT` | Must be closed or intentionally blocked unless separately approved. |
| `Alt-Svc: h3` | `BLOCKED_BY_DEFAULT` | Must not be advertised unless separately approved. |
| `listen ... quic` | `BLOCKED_BY_DEFAULT` | Must not appear as an active Nginx directive unless separately approved. |

## Source materials to sync

| Source path in `dokumenty-dlya-biznesa` | Target path in standalone `dokumenty82-site` | Required action |
| --- | --- | --- |
| `docs/source-to-site/transport-protocol-launch-gate-sync-v1.md` | `docs/source-to-site/transport-protocol-launch-gate-sync-v1.md` | Copy as the transport sync contract. |
| `docs/operations/live-launch-gates-v1.md` | `docs/operations/live-launch-gates-v1.md` | Preserve transport protocol gate and `PUBLIC_LIVE_ALLOWED = false`. |
| `docs/operations/project-finalization-readiness-v1.md` | `docs/operations/project-finalization-readiness-v1.md` | Preserve transport proof as a public-live blocker. |
| `docs/operations/launch-finalization-roadmap-v1.md` | `docs/operations/launch-finalization-roadmap-v1.md` | Preserve PR D as staging, transport and rollback proof. |
| `code/evidence/finalization/summary.md` | `evidence/finalization/summary.md` | Drop the `code/` prefix for standalone root layout. |
| `code/evidence/finalization/launch-readiness-proof.json` | `evidence/finalization/launch-readiness-proof.json` | Drop the `code/` prefix for standalone root layout. |
| `code/scripts/check-launch-finalization-readiness.mjs` | `scripts/check-launch-finalization-readiness.mjs` | Adapt paths only for standalone root layout; preserve assertions. |
| `nginx/dokumenty82.ru.conf` | `nginx/dokumenty82.ru.conf` or deployment SOP | Preserve the no-QUIC guardrail if the site repo carries deploy templates. |

If the target site repository uses a different folder layout, map paths explicitly in the site PR and keep the source meaning unchanged.

## Required site-repo checks after sync

The site repository must prove:

- launch readiness check passes with public live still blocked;
- `HTTP/3`, `QUIC`, `UDP/443`, `Alt-Svc: h3` and active `listen ... quic` remain blocked by default;
- any Caddy config explicitly disables or avoids HTTP/3/QUIC behavior before first launch;
- any Nginx config has no active `listen ... quic` directive;
- no response advertises `Alt-Svc: h3` unless owner/ops separately approved it;
- evidence keeps transport proof as `MISSING_EXPECTED` until staging/production network proof exists;
- no deploy action, SSH/SFTP action, provider secret or public-live step is added by this sync.

## Evidence requirements

Before public LIVE, the site repository must produce evidence for:

- HTTPS reachable over `TCP/443`;
- negotiated protocol is `HTTP/1.1` or `HTTP/2`;
- `HTTP/3` / `QUIC` is not enabled by default;
- `UDP/443` is closed or intentionally blocked unless separately approved;
- no `Alt-Svc: h3` advertisement is present;
- deployment template has no active `listen ... quic`;
- rollback still works after the transport configuration is applied.

Until that evidence exists, the transport protocol proof remains `MISSING_EXPECTED` and `BLOCKS_PUBLIC_LIVE`.

## HOLD boundaries

Do not add or infer:

- hosting provider;
- server IP;
- CDN provider;
- TLS certificate provider;
- firewall provider;
- SSH user, host, key, token or credential;
- production deploy path beyond existing documented templates;
- public-live approval.

Unknown provider and network facts remain `HOLD` or `MISSING_EXPECTED`.

## Release verdict

`GO WITH CONDITIONS`

Transport sync package verdict: `SOURCE_READY_WITH_CONDITIONS`.

Public launch remains `NOT_PUBLIC_LAUNCH_READY`.
