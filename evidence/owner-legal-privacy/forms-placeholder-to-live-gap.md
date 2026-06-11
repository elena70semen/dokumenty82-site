# Forms Placeholder To Live Gap

## Current

- Placeholder-only forms.
- No real submit.
- No backend endpoint.
- No CRM.
- No analytics.
- No Metrica.
- No upload.
- No success state.
- Fallback to phone or `/kontakty/`.
- Visible text: "Онлайн-отправка пока не подключена".

## Current evidence

- `code/evidence/forms/form-placeholder-proof.json`
- `code/evidence/final-local/safety-proof.json`
- `code/evidence/owner-legal-privacy/owner-legal-privacy-proof.json`

## Needed before live

- backend endpoint decision and implementation;
- CRM acceptance;
- owner/legal approval;
- consent text;
- privacy link near every live form;
- validation rules;
- error states;
- success state only after backend/CRM confirms accepted submission;
- no public upload unless separately approved;
- no false success if backend/CRM is unavailable;
- no-PII analytics plan;
- security and retention rules;
- rendered evidence after enabling.

## Live-form HOLD

Live forms remain disabled. Do not enable submit, backend, CRM, analytics events or success state until this gap is closed and accepted.
