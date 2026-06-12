# Stage 15 Semantic Markup Accessibility Standards V1

Status: `SOURCE_OF_TRUTH_DRAFT`

Release verdict: `GO WITH CONDITIONS`

Public launch: `NOT_PUBLIC_LAUNCH_READY`

`PUBLIC_LIVE_ALLOWED = false`

## Purpose

This document defines semantic markup and accessibility requirements for the website foundation before implementation and launch.

It does not create code, final design, live forms, CRM, analytics or public upload.

## HTML Landmarks

Each page should use clear landmarks:

- `header` for site header;
- `nav` for primary navigation and breadcrumbs where appropriate;
- `main` for page-specific content;
- `section` or equivalent grouping for major page blocks;
- `footer` for footer links, NAP and policy access.

There should be one main content area.

## One H1 Rule

Each route must have exactly one visible H1.

H1 must:

- match the route's primary intent;
- be visible text, not image-only;
- not duplicate a hub/money sibling intent;
- not contain unsupported claims.

## Heading Hierarchy

Headings should form a logical outline:

- H2 for major sections;
- H3 for cards, steps and FAQ items when needed;
- do not skip levels only for visual sizing;
- do not use headings for decorative emphasis;
- do not hide SEO headings off-screen.

## Navigation Structure

Navigation must:

- use real links for route changes;
- use buttons only for toggles, drawers or disclosure controls;
- keep labels human-readable;
- avoid all-route catalog dumps;
- expose `/kontakty/` and `/policy`;
- preserve keyboard operation.

## Links Vs Buttons

Use:

- link for navigation to another URL;
- button for an action on the current page;
- submit button only for forms that have accepted backend/CRM behavior;
- no fake buttons built from non-interactive elements.

Accessible names must match visible intent.

## Cards As Accessible Links

If a card is clickable:

- either wrap the card in one clear link or provide one clear link inside;
- avoid multiple competing click targets;
- make focus state visible;
- include route title and short role text;
- do not make unrelated decorative content focusable.

## ARIA Rules

Prefer native HTML.

Use ARIA only when:

- native semantics are insufficient;
- state must be communicated, for example `aria-expanded`;
- labels are needed for icon-only controls.

Do not use ARIA to hide bad structure, fake buttons or invisible SEO text.

## Focus States

Requirements:

- visible focus indicator on every interactive element;
- focus order matches reading order;
- mobile menu/drawer focus is contained only while open and returns on close;
- no focus trap;
- no focusable hidden elements.

## Skip Link

Provide a skip link to main content for keyboard users. It must become visible on focus and land at the main content.

## Keyboard Support

Keyboard path must cover:

- header navigation;
- menu open/close;
- route cards;
- primary and secondary CTAs;
- FAQ or disclosure controls;
- forms if present;
- footer and policy link.

## FAQ Markup

FAQ may be static or interactive.

Requirements:

- questions and answers are visible;
- interactive FAQ uses accessible disclosure controls;
- schema is added only if the same FAQ is visible;
- answers stay within source-supported facts;
- no hidden schema-only FAQ.

## Schema Boundaries

Schema must describe visible and confirmed content only.

Do not include:

- prices;
- ratings;
- reviews;
- legal name;
- tax IDs;
- opening hours;
- guarantees;
- exact deadlines;
- claims wider than visible page content.

LocalBusiness schema may use confirmed NAP only where appropriate.

## Hidden Text Restrictions

Do not use hidden text for SEO. Hidden text is allowed only for accessibility when it labels controls or improves screen-reader context without adding new public claims.

## Accessibility Evidence Requirements

Before public launch, produce:

- semantic DOM snapshot;
- one-H1 check;
- heading order check;
- axe or equivalent report;
- keyboard/focus notes;
- mobile menu keyboard proof;
- FAQ disclosure proof if interactive;
- link/button role scan;
- no hidden SEO text scan.

Missing evidence remains `MISSING_EXPECTED`.

## Acceptance Criteria

Semantic/accessibility foundation is acceptable when:

- page outline is logical;
- links and buttons use correct roles;
- keyboard users can complete core paths;
- focus is visible;
- schema stays within visible confirmed content;
- public launch remains blocked until evidence exists.

## Release Verdict

`GO WITH CONDITIONS`

Semantic markup and accessibility standards are ready for future implementation. Public launch remains `NOT_PUBLIC_LAUNCH_READY`.
