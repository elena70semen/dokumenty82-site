# Nginx TCP-Only Reference

Reference config:
`C:\new\dokumenty-dlya-biznesa\code\server\nginx\dokumenty82.static-tcp-only.reference.conf`

## Why TCP-only

The current hosting recommendation is conservative static HTTPS over TCP with HTTP/2 allowed. This avoids introducing HTTP/3/QUIC/UDP behavior before owner/ops review.

## Why HTTP/3/QUIC is not enabled

The project input explicitly notes that QUIC over UDP/443 can be treated differently by some network filtering paths. The reference config therefore does not enable QUIC, does not require UDP/443 and does not publish h3 Alt-Svc.

## Placeholders

- `<STATIC_EXPORT_ROOT>`: reviewed static export root.
- `<OWNER_APPROVED_FULLCHAIN_PEM>`: certificate path to be supplied outside git.
- `<OWNER_APPROVED_PRIVKEY_PEM>`: private key path to be supplied outside git.

No real certificate, private key, token or access value is committed.

## Before real deploy

- owner approves hosting provider;
- ops confirms certificate handling outside git;
- legal/privacy reviews hosting/provider logs;
- staging URL is created and captured as evidence;
- 14 P0 routes are checked on staging;
- sitemap and robots are checked on staging;
- rollback procedure is tested on the real hosting surface;
- HTTP/3/QUIC remains disabled unless separately approved.

## Deployment status

Not deployed. Reference only.
