# Hosting Decision Matrix

## Current rule

Recommended current staging approach:

- static hosting over HTTPS/TCP;
- HTTP/2 allowed;
- HTTP/3, QUIC, UDP/443 and h3 Alt-Svc disabled unless separately approved;
- no live CRM/forms/analytics;
- no production public launch until owner/legal/staging/rollback gates pass.

## Matrix

| Option | Static export compatibility | TLS | HTTP/2 over TCP | HTTP/3/QUIC risk | Rollback simplicity | Logs/access control | Privacy/legal | Placeholder forms | Future CRM/backend | Owner burden | Decision |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Simple Nginx static hosting | High | Yes | Yes | Low if not enabled | High | Server-controlled | Owner controls logs and retention | Safe | Medium | Medium | Recommended for current staging review |
| Static object hosting + CDN | High | Yes | Provider-dependent | Must be disabled or reviewed | High with versioned artifacts | Provider-dependent | Provider/CDN logs need review | Safe | Low without extra services | Low to medium | Candidate after provider/legal review |
| Vercel/Netlify-style static hosting | High | Yes | Yes | Provider defaults must be reviewed | High | Provider-dependent | Cross-border/provider review required | Safe if platform forms are not enabled | Medium to high | Low | Not current default until provider review |
| VPS with Nginx | High | Yes | Yes | Low if config stays TCP-only | Medium | Owner-controlled | Ops/access discipline required | Safe | High | High | Good future option with ops owner |
| Future backend-capable hosting | Medium to high | Yes | Yes | Must be controlled explicitly | Depends on release process | Depends on platform | Requires backend, CRM and retention review | Safe only while backend remains disabled | High | Medium to high | Defer until live forms/backend stage |

## Current recommendation

Use static staging over HTTPS/TCP for review. Do not enable HTTP/3/QUIC or h3 Alt-Svc. Keep forms as placeholder-only and keep analytics/Metrica disabled.

## Production note

This matrix does not approve production deploy. Owner/legal/ops approval, staging URL proof and rollback proof on real hosting are still required.
