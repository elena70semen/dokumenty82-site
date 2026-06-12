# Stage 16 Selling Page Block Library V1

Status: `SOURCE_TO_SITE_BLOCK_LIBRARY_READY_WITH_CONDITIONS`

Release verdict: `GO WITH CONDITIONS`

Public launch: `NOT_PUBLIC_LAUNCH_READY`

`PUBLIC_LIVE_ALLOWED = false`

## Purpose

This document defines reusable, source-safe page blocks for future implementation in `elena70semen/dokumenty82-site`.

The blocks help each page sell by clarifying the user's situation, route fit, service boundary and safe next step. They do not create final public copy, new routes, final design, prices, guarantees, reviews, deadlines or legal conclusions.

Use this library with:

- `docs/content/stage-15-text-quality-standards-v1.md`;
- `docs/content/site/*.md`;
- `docs/services/service-catalog-2026-v1.md`;
- `docs/services/passports/`;
- `docs/seo/semantic-core-v1.md`;
- `docs/seo/stage-16-route-group-semantic-coverage-v1.md`;
- `docs/ux/stage-16-lead-path-and-conversion-architecture-v1.md`;
- `docs/frontend/stage-16-route-implementation-checklist-v1.md`.

## Global Rules

Every block must:

- serve the route's primary intent;
- use visible, human text;
- avoid hidden SEO text;
- avoid keyword stuffing;
- avoid unsupported facts;
- preserve CTA hierarchy;
- preserve office-first logic;
- route wrong-fit users to the correct route;
- keep schema within visible confirmed content;
- keep missing facts as `HOLD` or `MISSING_EXPECTED`.

Every block must avoid:

- prices;
- discounts;
- guarantees;
- exact deadlines;
- reviews;
- ratings;
- cases;
- result promises;
- state affiliation imitation;
- legal/tax/bank/HR conclusions without review;
- upload requests or real form submission unless backend/CRM is accepted.

## Block 1. Hero

Purpose:

- identify the route and make the safe next step obvious.

User question it answers:

- "Я попал на нужную страницу?"
- "Что здесь можно сделать дальше?"

SEO role:

- carries the visible H1 and first-screen route intent;
- supports title and description without stuffing.

Conversion role:

- gives the main CTA and a low-friction secondary action.

Allowed content:

- H1 from source route/content docs;
- short route role;
- route fit statement;
- main CTA `Разобрать ситуацию`;
- secondary CTA if suitable: `Позвонить`, `Построить маршрут`, `Показать документы`.

Forbidden content:

- "решим за один день";
- "гарантируем";
- "самые низкие цены";
- state partnership implication;
- hidden keyword text.

Source dependencies:

- route registry;
- page content file;
- semantic core;
- active canon index.

Recommended CTA:

- default: `Разобрать ситуацию`;
- high-document intent: `Показать документы`;
- contact page: `Позвонить`.

Mobile behavior:

- H1 and primary CTA visible without long scroll;
- secondary actions may stack below primary CTA;
- no oversized hero that hides route choice.

Accessibility/markup notes:

- exactly one visible H1 per page;
- CTAs are links if they navigate and buttons only if they trigger in-page UI;
- hero must be inside `main` or immediately lead into `main`.

## Block 2. Route Selector

Purpose:

- help users choose among approved route groups without turning the page into a service catalog.

User question it answers:

- "Куда мне перейти, если ситуация похожа, но не совсем эта?"

SEO role:

- reinforces internal linking and route ownership.

Conversion role:

- recovers wrong-fit visitors and moves them to a better page.

Allowed content:

- route card title;
- one-line route role;
- parent/child/sibling links from route registry;
- human anchors, not stuffed query anchors.

Forbidden content:

- all-service dump;
- unapproved routes;
- duplicate child money-page H1s in hub headings;
- links to live upload, messaging or CRM actions.

Source dependencies:

- route registry;
- route cannibalization audit;
- internal linking plan;
- Stage 16 semantic coverage.

Recommended CTA:

- `Разобрать ситуацию` when route is unclear.

Mobile behavior:

- one-column cards on narrow mobile;
- no horizontal scroll;
- card title and role remain readable.

Accessibility/markup notes:

- cards should be real links;
- focus state visible;
- card accessible name should match the route title plus short role.

## Block 3. Situation Recognition

Purpose:

- show the user which situations belong on the page.

User question it answers:

- "Это про мою ситуацию?"

SEO role:

- uses natural semantic phrases from the source semantic map.

Conversion role:

- increases confidence without overpromising.

Allowed content:

- route-specific situations;
- source-backed examples;
- "если пришло требование", "если банк запросил документы", "если нужно понять маршрут" style hooks.

Forbidden content:

- fabricated cases;
- panic framing;
- guarantee language;
- exact deadlines.

Source dependencies:

- service passport client situation;
- semantic core user situation;
- content source page.

Recommended CTA:

- `Разобрать ситуацию` or `Показать документы`.

Mobile behavior:

- use short bullets or cards;
- avoid dense paragraph blocks.

Accessibility/markup notes:

- use headings and lists when listing situations;
- avoid using icons as the only meaning carrier.

## Block 4. Problem / Risk Explanation

Purpose:

- explain what can go wrong if the route is ignored or misunderstood, without scare tactics.

User question it answers:

- "Почему это важно проверить?"

SEO role:

- adds useful context for the route's problem intent.

Conversion role:

- motivates the safe next step.

Allowed content:

- neutral risk categories from source docs;
- "может потребоваться проверить";
- "важно понять источник запроса";
- route boundary.

Forbidden content:

- "штраф неизбежен";
- "счёт точно заблокируют";
- "ФНС гарантированно откажет";
- any final legal/tax/bank conclusion.

Source dependencies:

- service risk and boundary docs;
- service passports;
- SEO semantic passports.

Recommended CTA:

- `Разобрать ситуацию`.

Mobile behavior:

- place after fit/situation block;
- keep warnings concise.

Accessibility/markup notes:

- do not use color alone to indicate risk;
- risk text must remain readable and not hidden in tooltips only.

## Block 5. What We Check

Purpose:

- make the work process concrete without promising a result.

User question it answers:

- "Что вы будете смотреть?"

SEO role:

- supports visible usefulness and route-specific depth.

Conversion role:

- lowers uncertainty before contact.

Allowed content:

- document/source of request;
- entity type;
- period;
- source IDs where internal;
- route fit and sibling routes.

Forbidden content:

- final conclusions;
- self-service legal/tax instruction;
- statements that replace professional review.

Source dependencies:

- service passports sections "What we need" and "Procedure";
- service source ledger;
- route content docs.

Recommended CTA:

- `Показать документы` when document review is the natural next action.

Mobile behavior:

- list 3-6 check items;
- avoid tables unless they collapse cleanly.

Accessibility/markup notes:

- use lists or definition lists;
- no hidden checklist content used only for SEO.

## Block 6. What Documents / Data May Be Needed

Purpose:

- prepare the user for contact without asking for upload.

User question it answers:

- "Что держать под рукой?"

SEO role:

- adds source-backed document context.

Conversion role:

- encourages a useful call/visit and reduces failed leads.

Allowed content:

- generic categories from source docs;
- "сам документ/запрос";
- "период";
- "статус ООО/ИП";
- "данные для сверки".

Forbidden content:

- public upload;
- request for scans;
- request for sensitive data in open form;
- exact full document list unless source-confirmed and route-safe.

Source dependencies:

- service passports;
- service inputs/documents register if used;
- content source.

Recommended CTA:

- `Показать документы` or `Позвонить`.

Mobile behavior:

- show as compact bullets;
- keep privacy note close.

Accessibility/markup notes:

- if an upload placeholder exists, it must be disabled/gated and honestly labeled as unavailable.

## Block 7. How Work Starts

Purpose:

- describe safe first action and triage.

User question it answers:

- "Что будет после обращения?"

SEO role:

- supports process clarity.

Conversion role:

- reduces friction and sets expectation.

Allowed content:

- "сначала разбираем ситуацию";
- "смотрим источник запроса";
- "уточняем документы";
- "выбираем маршрут".

Forbidden content:

- false instant success;
- automated CRM success before backend acceptance;
- "оставьте заявку и мы всё сделаем" without boundary.

Source dependencies:

- Stage 15 text standards;
- service passports;
- UX lead collectors.

Recommended CTA:

- `Разобрать ситуацию`.

Mobile behavior:

- 3-4 steps max before related route/contact blocks.

Accessibility/markup notes:

- ordered list if sequence matters.

## Block 8. What Affects The Result

Purpose:

- explain variables that must be reviewed before any outcome can be discussed.

User question it answers:

- "От чего зависит решение?"

SEO role:

- adds nuanced content and prevents thin pages.

Conversion role:

- protects against overpromising while encouraging review.

Allowed content:

- source of request;
- document completeness;
- period;
- legal form;
- tax regime;
- bank/tax authority context;
- prior actions.

Forbidden content:

- final "will/won't work" claims;
- guaranteed outcome;
- private advice without review.

Source dependencies:

- service passports;
- tax/legal/bank review flags;
- semantic core HOLD notes.

Recommended CTA:

- `Разобрать ситуацию`.

Mobile behavior:

- short explanatory cards or bullets.

Accessibility/markup notes:

- avoid complex comparison grids on mobile unless they stack correctly.

## Block 9. What Is Not Promised

Purpose:

- preserve legal/commercial safety and user trust.

User question it answers:

- "Что эта page/service does not guarantee?"

SEO role:

- clarifies route boundary and reduces misleading impressions.

Conversion role:

- qualifies leads and protects office-first triage.

Allowed content:

- no result before review;
- no guarantee;
- no exact deadline unless confirmed by source and reviewed;
- no public legal/tax/bank conclusion.

Forbidden content:

- soft guarantees disguised as "usually always";
- broad disclaimers that contradict visible CTA.

Source dependencies:

- HOLD register;
- service passports "What is not included / not promised";
- legal/compliance docs.

Recommended CTA:

- `Разобрать ситуацию`.

Mobile behavior:

- quiet but visible note, not hidden.

Accessibility/markup notes:

- do not hide critical boundary text behind hover-only UI.

## Block 10. Parent Hub Link

Purpose:

- show broader context and prevent route dead ends.

User question it answers:

- "Где посмотреть соседние варианты?"

SEO role:

- supports hierarchy and anti-cannibalization.

Conversion role:

- recovers users who chose the wrong exact route.

Allowed content:

- parent hub title;
- short parent route role;
- one link to parent hub.

Forbidden content:

- parent hub as duplicate landing page;
- exact money-page title reused as hub section heading.

Source dependencies:

- route registry;
- Stage 16 semantic coverage.

Recommended CTA:

- route link; keep main CTA separate.

Mobile behavior:

- compact link block after main route explanation.

Accessibility/markup notes:

- use descriptive link text, not "click here".

## Block 11. Related Route Links

Purpose:

- clarify close alternatives and sibling choices.

User question it answers:

- "А если мой случай немного другой?"

SEO role:

- supports internal linking without cannibalization.

Conversion role:

- keeps user within safe route system.

Allowed content:

- sibling and next-safe route cards;
- 2-4 related routes unless a hub selector is the page purpose.

Forbidden content:

- every approved route on every page;
- unrelated services;
- unsupported expansion candidates.

Source dependencies:

- route registry;
- internal linking map;
- route cannibalization audit.

Recommended CTA:

- route card links; fallback `Разобрать ситуацию`.

Mobile behavior:

- one-column route cards;
- no horizontal overflow.

Accessibility/markup notes:

- related routes should be inside a named section.

## Block 12. Local Trust Block

Purpose:

- reinforce office-first local presence with confirmed NAP.

User question it answers:

- "Где вы находитесь и можно ли обратиться локально?"

SEO role:

- supports local relevance and NAP consistency.

Conversion role:

- moves user toward phone, route and office visit.

Allowed content:

- brand;
- phone;
- confirmed address;
- short address;
- local marker `офис рядом с налоговой`;
- route/contact link.

Forbidden content:

- working hours;
- office/floor;
- state affiliation;
- unapproved local profile details;
- unconfirmed photos or ratings.

Source dependencies:

- active canon index;
- NAP source;
- HOLD register.

Recommended CTA:

- `Позвонить`, `Построить маршрут`.

Mobile behavior:

- phone and route actions large enough to tap;
- no embedded live map dependency unless approved.

Accessibility/markup notes:

- phone link uses `tel:+79789987222`;
- address is readable text;
- map link must have clear accessible name.

## Block 13. Contact Block

Purpose:

- provide the safe conversion endpoint.

User question it answers:

- "Как связаться или куда приехать?"

SEO role:

- reinforces contact route and office-first model.

Conversion role:

- final step for phone/route/show-documents.

Allowed content:

- phone;
- address;
- route action;
- show-documents safe instruction without upload;
- policy link where appropriate.

Forbidden content:

- false form success;
- real backend endpoint before acceptance;
- unapproved messengers;
- live upload.

Source dependencies:

- active canon;
- contact page source;
- legal/privacy docs.

Recommended CTA:

- `Позвонить`, `Построить маршрут`, `Показать документы`.

Mobile behavior:

- actions stack and remain touch-friendly.

Accessibility/markup notes:

- contact actions must be keyboard reachable;
- no link opens an unsafe third-party flow without label.

## Block 14. Document / Material Preview

Purpose:

- let users understand what types of materials may be discussed without exposing client files.

User question it answers:

- "Что показать или подготовить?"

SEO role:

- gives route-specific document vocabulary.

Conversion role:

- encourages prepared contact and office visit.

Allowed content:

- generic document categories;
- examples from source docs;
- no personal data;
- no file upload.

Forbidden content:

- sample client documents;
- scans;
- download promises not supported by source;
- sensitive details.

Source dependencies:

- service passports;
- service inputs/documents register;
- content docs.

Recommended CTA:

- `Показать документы`.

Mobile behavior:

- use short cards/list.

Accessibility/markup notes:

- document names are text, not image-only labels.

## Block 15. FAQ

Purpose:

- answer real route uncertainty and support schema only when visible.

User question it answers:

- common hesitation before contact.

SEO role:

- visible FAQ can support snippets and FAQ schema boundaries.

Conversion role:

- removes ambiguity without replacing review.

Allowed content:

- source-backed questions;
- route-specific answers;
- safe next route;
- HOLD notes where fact is missing.

Forbidden content:

- hidden schema-only FAQ;
- exact legal/tax/bank advice;
- price/deadline/guarantee answers;
- generic FAQ copied to every page.

Source dependencies:

- semantic core FAQ ideas;
- page content docs;
- service passports;
- Stage 15 text standards.

Recommended CTA:

- `Разобрать ситуацию` after FAQ.

Mobile behavior:

- accordion allowed if accessible;
- all answers reachable without hover.

Accessibility/markup notes:

- native disclosure or accessible accordion;
- FAQ schema only mirrors visible FAQ.

## Block 16. Safety Note

Purpose:

- make limitations and review gates explicit without weakening trust.

User question it answers:

- "Почему нельзя обещать ответ сразу?"

SEO role:

- protects content quality and compliance.

Conversion role:

- frames review as a responsible first step.

Allowed content:

- "итог зависит от документов";
- "сроки и порядок смотрим по конкретной ситуации";
- "публичная страница не заменяет разбор";
- route-specific review boundary.

Forbidden content:

- overly broad legal disclaimer that contradicts service positioning;
- hidden safety text.

Source dependencies:

- HOLD register;
- service passports;
- legal/compliance docs.

Recommended CTA:

- `Разобрать ситуацию`.

Mobile behavior:

- quiet strip or compact note; do not bury it below footer.

Accessibility/markup notes:

- sufficient contrast;
- not color-only.

## Block 17. Final CTA

Purpose:

- close the page with a safe next step.

User question it answers:

- "Что делать теперь?"

SEO role:

- none beyond visible user path and route clarity.

Conversion role:

- directs prepared users to the primary action.

Allowed content:

- short recap of route fit;
- main CTA;
- safe secondary CTA.

Forbidden content:

- urgency pressure;
- fake scarcity;
- result guarantee;
- automatic success.

Source dependencies:

- route registry CTA;
- lead path architecture;
- active canon.

Recommended CTA:

- `Разобрать ситуацию` by default;
- `Позвонить` or `Показать документы` where source route CTA says so.

Mobile behavior:

- CTA stack; no sticky aggressive overlay that hides content.

Accessibility/markup notes:

- accessible names must be explicit;
- focus visible;
- links/buttons used correctly.

## Acceptance Criteria

The block library is acceptable when:

- every block has purpose, user question, SEO role, conversion role and source dependencies;
- every block preserves HOLD;
- no block requires hidden SEO text;
- no block requires prices, guarantees, reviews, deadlines or legal details;
- mobile and accessibility notes are present;
- next site implementation can map blocks to typed content structures.

## Release Verdict

`GO WITH CONDITIONS`

The block library is ready for source-aligned site assembly after `dokumenty82-site` access is granted.

Public launch remains:

`PUBLIC_LIVE_ALLOWED = false`
