# Live Launch Gates V1

## Purpose

This document is the final live-launch gate map for `Документы для бизнеса`. It defines required evidence and current blocking status before public LIVE, paid traffic, channel publication or autopublish.

## Gate matrix

| Gate | Required status | Evidence file | Owner | Blocking level | Current status |
| --- | --- | --- | --- | --- | --- |
| Source-of-truth gates | accepted with HOLD preserved | README, AGENTS, `docs/00-start/*` | Owner / QA | `BLOCKS_PUBLIC_LIVE` | `READY_WITH_CONDITIONS` |
| Code/build gates | static build passes | `code/out`, build log, `code/evidence/p0/summary.md` | Frontend | `BLOCKS_PUBLIC_LIVE` | `READY_WITH_CONDITIONS` |
| Browser QA gates | desktop/mobile browser proof passes | `code/evidence/browser/summary.md` | QA / frontend | `BLOCKS_PUBLIC_LIVE` | `NOT_STARTED` |
| Accessibility gates | axe/keyboard/focus proof passes | accessibility report | QA / frontend | `BLOCKS_PUBLIC_LIVE` | `NOT_STARTED` |
| SEO/indexing gates | canonical/robots/sitemap/Webmaster plan accepted | browser metadata proof, sitemap proof, Webmaster plan | SEO | `BLOCKS_PUBLIC_LIVE` | `PARTIAL` |
| Legal/privacy gates | owner/legal review accepted | legal sign-off checklist | Owner / legal | `BLOCKS_PUBLIC_LIVE` | `BLOCKED` |
| CRM/forms/analytics gates | no false success, CRM accepted, no-PII proof | CRM acceptance, no-PII proof | CRM / analytics | `BLOCKS_PUBLIC_LIVE` | `BLOCKED` |
| Hosting/deploy gates | staging and production SOP accepted | staging deploy proof, transport proof | Ops / frontend | `BLOCKS_PUBLIC_LIVE` | `NOT_STARTED` |
| Rollback gates | rollback drill passes | rollback proof | Ops | `BLOCKS_PUBLIC_LIVE` | `NOT_STARTED` |
| Sales-channel gates | channel-specific gates accepted | sales-channel readiness, source capture proof | Marketing / CRM | `BLOCKS_PAID_TRAFFIC` | `BLOCKED` |
| Blog/news gates | noindex foundation reviewed; no autopublish | PR #49 or later evidence | Content / SEO / legal | `BLOCKS_AUTOPUBLISH` | `MERGED_FOUNDATION_ONLY` |
| Owner acceptance gates | explicit go/no-go | owner acceptance record | Owner | `BLOCKS_PUBLIC_LIVE` | `NOT_STARTED` |

## Source-of-truth gates

| Gate | Required status | Evidence file | Owner | Blocking level | Current status |
| --- | --- | --- | --- | --- | --- |
| Active canon preserved | `PASS` | `AGENTS.md`, README | QA | `BLOCKS_PUBLIC_LIVE` | `PASS_WITH_NOTES` |
| HOLD zones preserved | `PASS` | hold register and safety scans | QA / legal | `BLOCKS_PUBLIC_LIVE` | `PASS_WITH_NOTES` |
| One URL = one intent | `PASS` | route registry | SEO | `BLOCKS_PUBLIC_LIVE` | `PASS_WITH_NOTES` |

## Code/build gates

| Gate | Required status | Evidence file | Owner | Blocking level | Current status |
| --- | --- | --- | --- | --- | --- |
| Static build | `PASS` | build output | Frontend | `BLOCKS_PUBLIC_LIVE` | `READY_WITH_CONDITIONS` |
| P0 semantic check | `PASS` | `npm run check:p0-semantic` | Frontend / QA | `BLOCKS_PUBLIC_LIVE` | `READY_WITH_CONDITIONS` |
| P0 evidence check | `PASS` | `npm run check:p0-evidence` | QA | `BLOCKS_PUBLIC_LIVE` | `READY_WITH_CONDITIONS` |
| Finalization readiness check | `PASS` | `npm run check:launch-readiness` | QA | `BLOCKS_PUBLIC_LIVE` | `READY_WITH_CONDITIONS` |

## Browser QA gates

| Gate | Required status | Evidence file | Owner | Blocking level | Current status |
| --- | --- | --- | --- | --- | --- |
| Desktop screenshots | `PASS` | `code/evidence/browser/` | QA | `BLOCKS_PUBLIC_LIVE` | `NOT_STARTED` |
| Mobile screenshots | `PASS` | `code/evidence/browser/` | QA | `BLOCKS_PUBLIC_LIVE` | `NOT_STARTED` |
| Console/overflow proof | `PASS` | browser evidence JSON | QA / frontend | `BLOCKS_PUBLIC_LIVE` | `NOT_STARTED` |

## Accessibility gates

| Gate | Required status | Evidence file | Owner | Blocking level | Current status |
| --- | --- | --- | --- | --- | --- |
| Axe/browser accessibility | `PASS` | accessibility report | QA | `BLOCKS_PUBLIC_LIVE` | `NOT_STARTED` |
| Keyboard/focus/manual check | `PASS` | keyboard notes | QA | `BLOCKS_PUBLIC_LIVE` | `NOT_STARTED` |

## SEO/indexing gates

| Gate | Required status | Evidence file | Owner | Blocking level | Current status |
| --- | --- | --- | --- | --- | --- |
| Canonical and robots in browser DOM | `PASS` | browser metadata proof | SEO / QA | `BLOCKS_PUBLIC_LIVE` | `NOT_STARTED` |
| Sitemap submission plan | `APPROVED` | Webmaster plan | SEO / owner | `BLOCKS_PUBLIC_LIVE` | `NOT_STARTED` |
| Blog/news noindex decision | `APPROVED_FOUNDATION_ONLY` | PR #49 noindex notes | SEO / legal | `BLOCKS_AUTOPUBLISH` | `MERGED_FOUNDATION_ONLY` |

## Legal/privacy gates

| Gate | Required status | Evidence file | Owner | Blocking level | Current status |
| --- | --- | --- | --- | --- | --- |
| `/policy` accepted | `OWNER_LEGAL_ACCEPTED` | legal sign-off | Owner / legal | `BLOCKS_PUBLIC_LIVE` | `BLOCKED` |
| Consent/cookie decision | `OWNER_LEGAL_ACCEPTED` | notice decision | Owner / legal | `BLOCKS_PUBLIC_LIVE` | `BLOCKED` |
| Third-party/provider register | `APPROVED` | provider register | Owner / legal | `BLOCKS_PUBLIC_LIVE` | `BLOCKED` |

## CRM/forms/analytics gates

| Gate | Required status | Evidence file | Owner | Blocking level | Current status |
| --- | --- | --- | --- | --- | --- |
| Live forms | `ACCEPTED_OR_DISABLED_WITH_FALLBACK` | form evidence | Backend / CRM | `BLOCKS_PUBLIC_LIVE` | `BLOCKED` |
| CRM submission | `ACCEPTED` | CRM acceptance | CRM implementer | `BLOCKS_PAID_TRAFFIC` | `BLOCKED` |
| Analytics/Metrica | `ACCEPTED_WITH_NO_PII_PROOF` | no-PII proof | Analytics / legal | `BLOCKS_PAID_TRAFFIC` | `BLOCKED` |

## Hosting/deploy gates

| Gate | Required status | Evidence file | Owner | Blocking level | Current status |
| --- | --- | --- | --- | --- | --- |
| Staging deploy | `PASS` | staging URL/proof | Ops / frontend | `BLOCKS_PUBLIC_LIVE` | `NOT_STARTED` |
| Transport protocol baseline | `PASS` | staging/production SOP, network proof | Ops / frontend | `BLOCKS_PUBLIC_LIVE` | `NOT_STARTED` |
| Production hosting decision | `APPROVED` | deploy SOP | Owner / ops | `BLOCKS_PUBLIC_LIVE` | `NOT_STARTED` |

## Transport protocol gate

The launch risk is transport-level, not a blanket server-brand rule.

Controlling rule:

`HTTP/3 / QUIC over UDP/443 requires separate owner/ops approval and proof. The baseline safe launch mode is HTTPS over TCP/443 using HTTP/1.1 or HTTP/2.`

`HTTP/3` / `QUIC` over `UDP/443` may be blocked or blackholed by provider filtering equipment, while `HTTP/1.1` or `HTTP/2` over `TCP/443` is the safer baseline.

Server positioning:

- Caddy is not banned as software.
- Caddy can be risky for first launch if it serves or advertises `HTTP/3` / `QUIC` without explicit control.
- Nginx is preferred for the first static launch candidate only because the intended config is classic HTTPS over TCP with `HTTP/1.1` or `HTTP/2`.
- Nginx can also support `HTTP/3` / `QUIC` if configured to do so, so the rule is protocol-specific, not brand-specific.

Stage baseline:

| Transport item | Status |
| --- | --- |
| `HTTPS over TCP/443 with HTTP/1.1 or HTTP/2` | `ALLOWED_BASELINE` |
| `HTTP/3` | `BLOCKED_BY_DEFAULT` |
| `QUIC` | `BLOCKED_BY_DEFAULT` |
| `UDP/443` | `BLOCKED_BY_DEFAULT` |
| `Alt-Svc: h3` | `BLOCKED_BY_DEFAULT` |
| `listen ... quic` | `BLOCKED_BY_DEFAULT` |

Launch SOP must prove:

- production HTTPS is served through `TCP/443` with `HTTP/1.1` or `HTTP/2`;
- `HTTP/3` / `QUIC` is not enabled by default;
- `UDP/443` is closed or intentionally blocked unless owner/ops explicitly approve a later HTTP/3 experiment;
- responses do not advertise `Alt-Svc: h3` unless owner/ops explicitly approve a later HTTP/3 experiment;
- Caddy is not used with default automatic HTTP/3 behavior unless `HTTP/3` / `QUIC` is disabled and verified;
- Nginx must not use `listen ... quic` unless a separate owner/ops decision approves it.

Source-to-site sync package: `docs/source-to-site/transport-protocol-launch-gate-sync-v1.md`.

## Rollback gates

| Gate | Required status | Evidence file | Owner | Blocking level | Current status |
| --- | --- | --- | --- | --- | --- |
| Rollback drill | `PASS` | rollback proof | Ops | `BLOCKS_PUBLIC_LIVE` | `NOT_STARTED` |

## Sales-channel gates

| Gate | Required status | Evidence file | Owner | Blocking level | Current status |
| --- | --- | --- | --- | --- | --- |
| Paid traffic | `BLOCKED_UNTIL_ACCEPTANCE` | sales-channel readiness | Marketing / CRM | `BLOCKS_PAID_TRAFFIC` | `BLOCKED` |
| Local profiles | `OWNER_REQUIRED` | local gate | Owner / marketing | `BLOCKS_ONLY_SPECIFIC_CHANNEL` | `BLOCKED` |
| Messaging channels | `OWNER_REQUIRED` | channel sign-off | Owner / CRM / legal | `BLOCKS_ONLY_SPECIFIC_CHANNEL` | `BLOCKED` |

## Blog/news gates

| Gate | Required status | Evidence file | Owner | Blocking level | Current status |
| --- | --- | --- | --- | --- | --- |
| PR #49 foundation | `MERGED_FOUNDATION_ONLY` | PR #49 | Content / SEO | `BLOCKS_AUTOPUBLISH` | `MERGED_FOUNDATION_ONLY` |
| FNS fetch/scheduler | `DISABLED` | feature flags / architecture | Ops | `BLOCKS_AUTOPUBLISH` | `BLOCKED` |
| Blog/news indexing | `DISABLED_UNTIL_APPROVED` | noindex proof | SEO / legal | `BLOCKS_AUTOPUBLISH` | `BLOCKED` |

PR #49 is merged into main as FNS blog/news foundation only. It does not enable live fetch, scheduler, rewrite provider, autopublish, indexing, public launch, paid traffic, forms, analytics or CRM submission.

## Owner acceptance gates

| Gate | Required status | Evidence file | Owner | Blocking level | Current status |
| --- | --- | --- | --- | --- | --- |
| Public LIVE go/no-go | `EXPLICIT_OWNER_APPROVAL` | acceptance record | Owner | `BLOCKS_PUBLIC_LIVE` | `NOT_STARTED` |

## Final decision

`PUBLIC_LIVE_ALLOWED = false`

Release verdict remains `GO WITH CONDITIONS`.
