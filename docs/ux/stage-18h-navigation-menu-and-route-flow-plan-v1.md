# Stage 18H Navigation Menu And Route Flow Plan V1

Status: `READY_WITH_CONDITIONS`

Release verdict: `GO WITH CONDITIONS`

Public launch: `NOT_PUBLIC_LIVE_READY`

`PUBLIC_LIVE_ALLOWED = false`

## Purpose

This plan defines the Stage 18H public navigation, menu and route-flow gate for the site implementation.

It prepares a stronger route-selection experience for owner/legal review without approving public launch, final copy, live integrations or transport changes.

## Top-Level Menu Contract

The public top-level menu and footer route navigation should expose the approved route families:

| Label | Target | Role |
| --- | --- | --- |
| `Разбор ситуации` | `/razbor-situacii/` | Safe first-step triage. |
| `Отчётность` | `/otchetnost/` | Reporting hub. |
| `Банк и 115-ФЗ` | `/bank-i-115-fz/` | Bank/request hub. |
| `Адрес и ЕГРЮЛ` | `/adres-egryul-direktor/` | Address, EGRUL and director hub. |
| `Регистрация` | `/registraciya-i-likvidaciya/` | Registration and liquidation hub. |
| `Налоги и режимы` | `/nalogi-i-rezhimy/` | Tax/regime diagnostics hub. |
| `Кадры` | `/kadry/` | HR documents hub. |
| `Сопровождение` | `/soprovozhdenie/` | Regular support route. |
| `Контакты` | `/kontakty/` | Confirmed NAP and office path. |

Noindex foundation routes must not appear in public menu, footer route navigation, route cards or sitemap:

- `/blog/`;
- `/blog/obnovleniya-fns/`;
- `/blog/razbory/`;
- `/internal/graphics-proof/`;
- `/internal/visual-detail-kit/`;
- `/faq/` until separately approved.

## Route Flow

The intended user flow is:

```text
Homepage router
-> safe first step or route-family hub
-> exact money/diagnostic route
-> related route only when intent changes
-> contacts or phone as office-first continuation
```

The homepage may show selected route cards and situation prompts. It must not become a full services catalogue or expose every money page as the first-screen experience.

## CTA Flow

Approved CTA hierarchy remains:

1. `Разобрать ситуацию`
2. `Позвонить`
3. `Построить маршрут`
4. `Показать документы`

`Показать документы` is a safe document-showing path only. It must not create a public upload, automatic CRM submission or fake success state.

## Accessibility And Layout Requirements

- Header has a skip link to `#main-content`.
- Header and footer expose named navigation landmarks.
- Mobile navigation remains disclosure-based and keyboard reachable.
- Route templates expose a stable `<main id="main-content">`.
- Navigation labels should not wrap into unusable controls on desktop or mobile.
- Related-route cards must link to approved routes only.

## Anti-Cannibalization Rules

- Hub pages route users to narrower pages instead of absorbing exact money-page intent.
- Money pages link to siblings/parent routes only to clarify neighbouring intents.
- Diagnostics pages keep "check applicability" language and do not give final public conclusions.
- Contacts page remains NAP and safe document-showing path, not a service landing page.
- Policy route remains legal/privacy transparency, not a commercial CTA route.

## Guardrail Evidence

The site repository should generate:

```text
evidence/content/stage18-route-content-and-navigation.json
```

The guardrail should fail if:

- a required top-level navigation item is missing;
- a noindex foundation route appears in public navigation or sitemap;
- route templates lose `main-content`, product foundation or safe lead-path markers;
- live forms, uploads, CRM success, analytics, messaging, map or public live are enabled;
- HTTP/3/QUIC/UDP/443 launch gates are weakened;
- owner/legal approval is implied without explicit human evidence.

## Remaining HOLD

- owner/legal acceptance: `MISSING_EXPECTED`;
- final public copy approval: `MISSING_EXPECTED`;
- `/policy` final legal acceptance: `MISSING_EXPECTED`;
- live CRM/forms/analytics/upload/messaging: `BLOCKED`;
- FNS/blog/news live fetch/autopublish/indexing: `BLOCKED`;
- staging, rollback and transport proof: `MISSING_EXPECTED`;
- public-live go/no-go: `NOT_PUBLIC_LIVE_READY`.

## Release Verdict

`GO WITH CONDITIONS`

Stage 18H navigation and route flow are ready as a source-to-site hardening plan only.

`PUBLIC_LIVE_ALLOWED = false`
