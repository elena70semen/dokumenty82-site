# Stage 15 Mobile Layout Standards V1

Status: `SOURCE_OF_TRUTH_DRAFT`

Release verdict: `GO WITH CONDITIONS`

Public launch: `NOT_PUBLIC_LAUNCH_READY`

`PUBLIC_LIVE_ALLOWED = false`

## Purpose

This document defines structural mobile-first layout requirements for the website foundation. It does not start final visual design.

## Mobile-First Principle

Build the page so the narrow mobile version is complete, readable and task-friendly first. Desktop may enhance density and comparison, but must not carry information that mobile users cannot access.

## Supported Viewport Ranges

Future QA should cover at least:

- narrow mobile around 320px;
- common mobile around 360-430px;
- tablet around 768px;
- laptop around 1024-1366px;
- desktop around 1440px+.

If a viewport cannot be tested, record `MISSING_EXPECTED`.

## Fluid Layout

Requirements:

- no fixed-width page shell that causes overflow;
- containers use responsive max-widths;
- grids collapse predictably;
- media and SVGs stay within container;
- long words, phone numbers and URLs wrap safely;
- route cards do not change page width.

## Readable Line Lengths

Text should remain readable:

- body copy should not become too wide on desktop;
- narrow mobile paragraphs should avoid long dense blocks;
- headings should wrap naturally;
- labels should not truncate important route names;
- line height should support Cyrillic readability.

## Spacing Rhythm

Spacing should create clear page sections without final visual polish:

- first screen shows page role, H1 and primary CTA quickly;
- related route blocks have enough separation from main content;
- FAQ and safety notes are not buried after unrelated content;
- contact block remains easy to find.

## Tap Target Minimums

Interactive targets should be comfortable:

- primary and secondary CTA targets at least 44px high where possible;
- links inside cards have enough spacing;
- mobile menu items are not cramped;
- phone and route actions are easy to tap.

## Card And Grid Behavior

Route cards:

- stack to one column on narrow mobile;
- use two columns only when text still fits;
- keep the whole clickable area accessible if the card acts as a link;
- show route role, not long SEO text;
- avoid turning homepage or hubs into an all-service wall.

## Section Stacking

Mobile order should follow decision flow:

1. Route role / H1.
2. Main CTA.
3. Fit or route-choice block.
4. What is checked / what to prepare.
5. Related route correction.
6. Local contact or fallback.
7. FAQ / safety note.

Desktop may place supporting blocks beside content only if the mobile order remains logical.

## Header / Menu Behavior

Header requirements:

- brand is visible;
- phone or safe contact path remains reachable;
- menu opens and closes by keyboard and touch;
- menu does not become a full route catalogue;
- route groups use human labels;
- focus returns predictably after menu close.

## CTA Behavior

CTA requirements:

- primary CTA appears early;
- secondary CTAs support the page role;
- sticky CTA, if used later, must not hide content;
- `Показать документы` never creates public upload;
- form success never appears without backend/CRM acceptance;
- messaging links remain gated until approved.

## Footer Behavior

Footer requirements:

- include contact and policy route;
- keep NAP consistent;
- avoid unconfirmed hours, floor, office number, legal data or requisites;
- include recovery links without creating a service catalogue;
- remain readable and keyboard reachable.

## No Horizontal Overflow

Public candidates must prove:

- no horizontal scroll at required mobile widths;
- no card, table, code block, map, image or long route title exceeds viewport;
- mobile menu does not overflow;
- focus outline does not force overflow.

## Typography Hierarchy

Typography should be structural:

- H1 clearly identifies route intent;
- H2s divide the task;
- H3s label cards or subtopics;
- body text remains readable;
- small helper text is not used for important safety notes.

Do not use final visual styling as a substitute for structure.

## Forms / Placeholders If Present

If forms appear in future:

- labels are visible;
- placeholders do not replace labels;
- required state is clear;
- error text is accessible;
- submit success is disabled until accepted;
- no document upload field is public.

## Policy / Contact Visibility

Every route should preserve:

- contact path;
- `/policy` access from footer or relevant legal notice;
- no hidden privacy route.

## Keyboard / Focus

Requirements:

- all interactive elements are reachable by keyboard;
- focus is visible;
- focus order follows visual order;
- no keyboard trap;
- skip link reaches main content;
- drawer/menu focus is managed.

## Reduced Motion

Future implementation should respect reduced-motion preferences. Animations must not be required to understand content.

## Browser / Device Evidence Requirements

Before public launch, evidence must include:

- desktop screenshots;
- mobile screenshots;
- console error report;
- horizontal overflow report;
- menu open/close proof;
- CTA visibility proof;
- keyboard/focus proof;
- accessibility report.

Missing evidence remains `MISSING_EXPECTED`.

## Non-Goals

Do not:

- start final visual design;
- add new brand assets;
- change colors or tokens;
- create marketing hero visuals;
- enable live maps, forms, CRM, analytics or messaging.

## Release Verdict

`GO WITH CONDITIONS`

Mobile layout standards are ready for future implementation. Public launch remains `NOT_PUBLIC_LAUNCH_READY`.
