# Analytics And Source Capture Readiness

Status: `FEATURE_GATED_PREP_ONLY`

Release verdict: `GO WITH CONDITIONS`

`PUBLIC_LIVE_ALLOWED = false`

## Scope

This readiness layer prepares attribution and CTA context for future analytics/CRM review without enabling live analytics, live form submit, CRM submission, public upload, messaging deep links, paid traffic or public launch.

## Source-Of-Truth Inputs

- `docs/crm-analytics/metrica-goals-and-crm-contract.md`
- `docs/crm-analytics/events.md`
- `docs/crm-analytics/crm-fields.md`
- `docs/crm-analytics/form-fields.md`
- `docs/crm-analytics/lead-collector-events-v1.md`
- `docs/crm-analytics/source-capture-script.md`
- `docs/marketing/utm-registry.md`
- `docs/marketing/yandex-direct-launch-plan-v1.md`
- `docs/ux/site-lead-collectors-v1.md`
- `docs/ux/contact-actions-v1.md`
- `docs/ux/page-lead-collector-map.md`
- `docs/legal/forms-cookies-analytics-crm-compliance.md`
- `docs/legal/privacy-policy-consent-and-notices.md`

## Captured Fields

The browser-side source capture allowlist is limited to:

- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_content`
- `utm_term`
- `yclid`
- `page_slug`
- `page_type`
- `cta_label`
- `cta_location`
- `lead_topic`

The layer does not collect names, phone numbers, message text, uploaded files, personal documents, credentials, legal IDs or CRM identifiers in analytics params.

## Storage And Dispatch

- URL attribution is preserved in `sessionStorage` with an in-memory fallback.
- CTA data hooks are read from `data-analytics-goal`, `data-page-slug`, `data-page-type`, `data-cta-label`, `data-cta-location` and `data-lead-topic`.
- `analyticsConfig.enabled`, `canLoadScript` and `canSendEvents` remain `false`.
- No Yandex Metrica script, real counter ID, webhook, endpoint, token or secret is committed.
- `NEXT_PUBLIC_ANALYTICS_ENABLED=false` and `NEXT_PUBLIC_METRIKA_ID` remain future deployment configuration only.

## Modeled Goals

- `goal_call_click`
- `goal_route_click`
- `goal_docs_show_click`
- `goal_form_start`
- `goal_form_submit_attempt`
- `goal_form_submit_success`
- `goal_form_submit_fail`
- `goal_related_route_click`

## Submit-Success Gate

`goal_form_submit_success` is modeled but not attached to UI clicks, form starts, validation, placeholder fallback or fake local states. It can only be requested with explicit backend/CRM acceptance, and even then the current dispatcher remains disabled because live analytics is not enabled.

Current placeholders can model only safe local states:

- form draft/start;
- submit attempt;
- fallback/fail while backend/CRM is unavailable.

## Remaining HOLD

- real Yandex Metrica counter ID;
- live analytics script loading;
- CRM endpoint or webhook;
- live form submit;
- public upload;
- Telegram/MAX deep links;
- cookie/analytics notice publication;
- paid traffic and Direct launch;
- public launch.
