# Stage 18C Layout Foundation And Component System V1

Status: `READY_WITH_CONDITIONS`

Release verdict: `GO WITH CONDITIONS`

Public launch: `NOT_PUBLIC_LIVE_READY`

`PUBLIC_LIVE_ALLOWED = false`

## Purpose

This document defines the Stage 18C layout and component foundation for the standalone site.

It is not final visual design polish. It defines stable, accessible, mobile-first page structure that can later receive owner-approved visual refinement.

## Component Families

| Component family | Required role |
| --- | --- |
| Site shell | Header, main landmark, footer and skip link. |
| Header | Brand, structured top-level navigation, mobile-safe menu, primary CTA and phone fallback. |
| Footer | Confirmed NAP, safe routes and policy link. |
| Main landmark | One visible route experience per URL. |
| Hero | Route role, H1, safe CTA, support text and optional route image. |
| Route intent block | Explain page ownership and anti-cannibalization boundary. |
| When fits block | Help users self-select without pressure. |
| What we check block | Surface practical review points. |
| Documents/data block | Show safe input categories, no upload. |
| How work starts block | Explain first-step workflow. |
| Not promised block | Preserve legal and commercial boundaries. |
| Related routes | Parent/child/sibling links, not all-route dump. |
| FAQ | Visible route-specific FAQ or direction. |
| Safe CTA | Approved CTA hierarchy only. |
| Route cards | Compact child or related route selection. |
| Lead path block | Phone/contact/situation review paths. |
| Local trust block | Confirmed NAP and neutral local marker. |
| Policy/noindex notices | Non-commercial, noindex and no-live-fetch boundaries. |

## Layout Principles

- Mobile-first: every block must fit on narrow screens without horizontal overflow.
- Stable spacing: use shared section/container/card primitives where possible.
- One H1 per route.
- Use semantic landmarks and accessible labels.
- Use visible focus states.
- Keep CTA groups readable and tap-safe.
- Do not hide content for SEO-only reasons.
- Avoid final visual polish claims; Stage 18C is structure and QA foundation.

## Navigation Requirements

Main navigation must include clear paths to:

- `/razbor-situacii/`
- `/otchetnost/`
- `/bank-i-115-fz/`
- `/adres-egryul-direktor/`
- `/registraciya-i-likvidaciya/`
- `/kadry/`
- `/soprovozhdenie/`
- `/kontakty/`

Noindex foundation routes must not be included in primary public navigation or sitemap.

## CTA And Lead Components

CTA components must use approved labels and destinations:

- `/razbor-situacii/`
- `tel:+79789987222`
- `/kontakty/`
- safe document-showing anchors without upload.

They must not trigger live form submission, CRM webhook, analytics event, upload, messaging or fake success.

## Accessibility Requirements

- Skip link targets `main`.
- Header and footer use named navigation landmarks.
- Route card links have descriptive link text.
- Form placeholders have labels and explanatory disabled/live-offline notice.
- Images have meaningful alt text when informative.
- Policy/noindex pages avoid aggressive commercial CTA hierarchy.

## Evidence Requirements

The site repo must produce:

- `evidence/frontend/stage18-layout-foundation.json`;
- runtime/source guardrail for layout components;
- proof that public navigation excludes noindex foundation routes;
- proof that live integrations remain disabled.

## Release Boundary

Stage 18C approves implementation foundation only.

`PUBLIC_LIVE_ALLOWED = false`
