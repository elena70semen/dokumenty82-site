# Stage 16 Route Implementation Checklist V1

Status: `SOURCE_TO_SITE_ROUTE_CHECKLIST_READY_WITH_CONDITIONS`

Release verdict: `GO WITH CONDITIONS`

Public launch: `NOT_PUBLIC_LAUNCH_READY`

`PUBLIC_LIVE_ALLOWED = false`

## Purpose

This checklist defines implementation requirements for every route type in the future `dokumenty82-site` repository.

It is a source-led implementation checklist, not website code and not launch approval.

Use with:

- `docs/seo/route-registry.md`;
- `docs/seo/stage-16-route-group-semantic-coverage-v1.md`;
- `docs/content/stage-15-text-quality-standards-v1.md`;
- `docs/content/stage-16-selling-page-block-library-v1.md`;
- `docs/ux/stage-16-lead-path-and-conversion-architecture-v1.md`;
- `docs/frontend/stage-15-mobile-layout-standards-v1.md`;
- `docs/frontend/stage-15-semantic-markup-accessibility-standards-v1.md`.

## Global Implementation Requirements

Every route must have:

- source route row;
- route type;
- parent/related routes where applicable;
- visible H1;
- metadata tied to route role;
- canonical URL;
- safe CTA labels;
- HOLD scan;
- schema boundary;
- mobile proof requirement;
- accessibility proof requirement;
- evidence artifact requirement.

Do not implement:

- new public routes outside route registry;
- final visual redesign;
- live forms;
- CRM webhook;
- analytics/Metrica;
- public upload;
- messaging deep links;
- public live.

## Homepage Checklist

Source files required:

- `docs/seo/route-registry.md`;
- `docs/content/site/home.md`;
- `docs/ux/pages/home.md`;
- active canon and NAP docs;
- Stage 16 semantic coverage.

Data fields required:

- brand;
- domain/canonical;
- category;
- slogan;
- local marker;
- phone/phone href;
- address/short address;
- priority route families;
- CTA labels.

Metadata requirements:

- brand/local router title;
- description supports local route selection;
- canonical `https://dokumenty82.ru/`;
- no service catalogue title.

H1 requirements:

- one visible H1;
- brand/local route role.

Block requirements:

- hero;
- route selector;
- situation recognition;
- local trust block;
- contact block;
- FAQ;
- final CTA.

CTA requirements:

- primary `Разобрать ситуацию`;
- secondary `Позвонить`, `Построить маршрут`.

Internal link requirements:

- `/razbor-situacii/`;
- `/kontakty/`;
- selected hubs only.

Mobile requirements:

- first screen shows role, H1 and primary CTA;
- route cards stack;
- no horizontal overflow.

Accessibility requirements:

- one H1;
- main landmark;
- route cards are accessible links;
- focus visible.

Schema rules:

- WebSite/WebPage;
- LocalBusiness only with visible confirmed NAP;
- no ratings/reviews/hours.

HOLD checks:

- no working hours;
- no office/floor;
- no ratings/reviews;
- no state affiliation.

Evidence checks:

- rendered screenshot desktop/mobile;
- route manifest;
- metadata snapshot;
- no-overflow report;
- keyboard route-card path.

## Situation Review Checklist

Source files required:

- route registry;
- `docs/content/site/razbor-situacii.md`;
- `docs/ux/pages/razbor-situacii.md`;
- service passport `situation-review.md`;
- Stage 16 lead path.

Data fields required:

- route role;
- situations;
- intake questions;
- next route options;
- CTA labels.

Metadata requirements:

- first-step triage;
- no free full-service substitute.

H1 requirements:

- one visible H1 for situation review.

Block requirements:

- hero;
- situation recognition;
- what we check;
- documents/data;
- how work starts;
- what is not promised;
- related route links;
- contact block;
- FAQ.

CTA requirements:

- primary `Разобрать ситуацию`;
- secondary `Позвонить`, `Показать документы`.

Internal link requirements:

- `/kontakty/`;
- urgent hub;
- relevant hubs.

Mobile requirements:

- intake questions readable;
- no dense generic text;
- CTA not obstructive.

Accessibility requirements:

- form/fallback states accessible if present;
- no false success state.

Schema rules:

- WebPage/BreadcrumbList/visible FAQ only.

HOLD checks:

- no final answer;
- no legal/tax conclusion;
- no upload.

Evidence checks:

- CTA state proof;
- fallback state proof;
- text snapshot.

## Hub Page Checklist

Source files required:

- route registry;
- matching `docs/content/site/*.md`;
- matching `docs/ux/pages/*.md`;
- Stage 16 semantic coverage.

Data fields required:

- hub route;
- child route cards;
- fit statements;
- parent/root relationship;
- fallback CTA.

Metadata requirements:

- route-selection title/description;
- no child money-page title duplication.

H1 requirements:

- one visible H1 that describes the route family.

Block requirements:

- hero;
- route selector;
- situation recognition;
- child route previews;
- what we check;
- related routes;
- contact block;
- FAQ.

CTA requirements:

- primary `Разобрать ситуацию`;
- child cards as route links;
- secondary contact action if source supports.

Internal link requirements:

- child money/diagnostic routes;
- `/razbor-situacii/`;
- `/kontakty/`.

Mobile requirements:

- child cards stack;
- no catalog dump;
- route labels do not truncate.

Accessibility requirements:

- child cards are accessible links;
- nav order logical.

Schema rules:

- WebPage/BreadcrumbList;
- FAQ only if visible.

HOLD checks:

- no broad service promises;
- no prices/guarantees.

Evidence checks:

- child route links match registry;
- no duplicate H1/title against children.

## Money Page Checklist

Source files required:

- route registry money-page row;
- matching content file;
- matching UX page spec;
- service catalog row;
- matching service passport;
- source ledger IDs where applicable.

Data fields required:

- exact route intent;
- parent hub;
- situations;
- what we check;
- documents/data;
- process steps;
- boundaries;
- related routes;
- CTA label.

Metadata requirements:

- exact commercial/document intent;
- no hub duplication;
- no price/guarantee/deadline claims.

H1 requirements:

- one visible H1 matching exact route.

Block requirements:

- hero;
- situation recognition;
- problem/risk explanation if source-safe;
- what we check;
- documents/data;
- how work starts;
- what affects result;
- what is not promised;
- parent hub link;
- related route links;
- local/contact block;
- FAQ;
- safety note;
- final CTA.

CTA requirements:

- route-specific from route registry;
- fallback `Разобрать ситуацию` or `Позвонить`.

Internal link requirements:

- parent hub;
- 2-4 sibling/related routes;
- `/kontakty/` or `/razbor-situacii/`.

Mobile requirements:

- block sequence remains clear;
- related cards stack;
- document lists do not overflow.

Accessibility requirements:

- no hidden boundary text;
- FAQ accordion accessible if used.

Schema rules:

- WebPage/BreadcrumbList/visible FAQ;
- no Offer, price, review, rating or guarantee schema.

HOLD checks:

- no result promise;
- no exact deadlines;
- no sensitive documents;
- no legal/tax/bank conclusion without review.

Evidence checks:

- service-to-route mapping proof;
- forbidden-claim scan;
- schema snapshot.

## Diagnostic Page Checklist

Source files required:

- route registry diagnostic row;
- matching content file;
- matching UX spec;
- tax/legal service passport if applicable;
- Stage 16 semantic coverage.

Data fields required:

- diagnostic question;
- inputs/data needed;
- what can be checked;
- what cannot be concluded;
- next safe route.

Metadata requirements:

- diagnostic/applicability title;
- no final public advice.

H1 requirements:

- one visible diagnostic H1.

Block requirements:

- hero;
- what we check;
- data needed;
- what affects result;
- what is not promised;
- next safe route;
- FAQ;
- safety note.

CTA requirements:

- `Разобрать ситуацию`.

Internal link requirements:

- parent hub;
- relevant money page only where contextually safe;
- `/razbor-situacii/`.

Mobile requirements:

- data/input lists stack;
- no fake calculator overflow.

Accessibility requirements:

- no inaccessible calculator;
- no hidden output.

Schema rules:

- no calculator/answer schema unless future proof exists;
- FAQ only if visible.

HOLD checks:

- no final tax/legal conclusion;
- no savings promise.

Evidence checks:

- diagnostic boundary proof;
- no hidden SEO/fake calculator scan.

## Contact Page Checklist

Source files required:

- active canon;
- NAP source;
- route registry contact row;
- contact content/UX specs;
- legal/privacy docs where relevant.

Data fields required:

- phone;
- phone href;
- address;
- short address;
- local marker;
- route action label;
- policy link.

Metadata requirements:

- canonical NAP/contact page;
- no unconfirmed local details.

H1 requirements:

- one visible contact H1.

Block requirements:

- contact hero;
- NAP block;
- phone block;
- route/map safe block;
- show-documents safe flow;
- policy link;
- fallback if provider unavailable.

CTA requirements:

- primary `Позвонить`;
- secondary `Построить маршрут`, `Показать документы`.

Internal link requirements:

- `/razbor-situacii/`;
- `/policy`;
- root.

Mobile requirements:

- phone/route buttons easy to tap;
- address wraps;
- no map overflow.

Accessibility requirements:

- phone link accessible;
- route link accessible;
- address text readable.

Schema rules:

- LocalBusiness only with confirmed NAP;
- no hours, ratings, reviews, legal IDs.

HOLD checks:

- no working hours;
- no office/floor;
- no unconfirmed email public use beyond TARGET rules.

Evidence checks:

- NAP snapshot;
- contact action proof;
- no unconfirmed local field scan.

## Policy Page Checklist

Source files required:

- route registry policy row;
- policy content file;
- legal/privacy source docs.

Data fields required:

- policy title;
- visible policy text;
- contact path if source-supported.

Metadata requirements:

- legal/privacy role;
- no commercial SEO target.

H1 requirements:

- one visible policy H1.

Block requirements:

- policy content;
- contact link;
- no route selector.

CTA requirements:

- no aggressive CTA;
- `Позвонить` only as safe contact if appropriate.

Internal link requirements:

- `/kontakty/`;
- root/footer.

Mobile requirements:

- long text readable;
- no horizontal overflow.

Accessibility requirements:

- heading structure;
- readable paragraphs/lists.

Schema rules:

- WebPage only unless source supports more.

HOLD checks:

- no unconfirmed legal entity, processor, analytics ID or cookie claim.

Evidence checks:

- footer link proof;
- metadata/canonical proof;
- policy text snapshot.

## Noindex Blog / News Checklist

Source files required:

- route registry content section;
- FNS/blog/news foundation docs if used;
- launch gates.

Data fields required:

- noindex flag;
- sitemap exclusion;
- no live feed/fetch/scheduler;
- safe route back to `/razbor-situacii/` or `/kontakty/`.

Metadata requirements:

- noindex;
- no public SEO landing title.

H1 requirements:

- one visible H1 if route exists.

Block requirements:

- foundation/noindex content only;
- no live news feed;
- no autopublish.

CTA requirements:

- `Разобрать ситуацию`, `Контакты`.

Internal link requirements:

- no public nav emphasis unless approved.

Mobile requirements:

- basic readability.

Accessibility requirements:

- same heading/nav/focus rules.

Schema rules:

- no Article/news schema until approved.

HOLD checks:

- no live FNS rewrite;
- no indexing;
- no source-less news claims.

Evidence checks:

- robots/noindex proof;
- sitemap exclusion proof;
- feature flag proof.

## Checks To Add Or Run In Site Repo

Future implementation should run available package scripts for:

- route manifest alignment;
- sitemap/robots/noindex;
- metadata snapshot;
- source-to-rendered text snapshot;
- feature flag snapshot;
- schema safety;
- forbidden claims;
- static link check;
- build/static export;
- evidence generation;
- launch finalization readiness.

If a check cannot run, report `NOT_RUN - <reason>`.

## Release Verdict

`GO WITH CONDITIONS`

The route implementation checklist is ready for future use in `dokumenty82-site`.

Public launch remains:

`PUBLIC_LIVE_ALLOWED = false`
