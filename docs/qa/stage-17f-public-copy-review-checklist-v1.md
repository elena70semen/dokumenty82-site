# Stage 17F Public Copy Review Checklist V1

Status: `READY_FOR_OWNER_REVIEW`

Release verdict: `GO WITH CONDITIONS`

Public launch: `NOT_PUBLIC_LAUNCH_READY`

`PUBLIC_LIVE_ALLOWED = false`

## Purpose

This checklist prepares the 36 indexed routes for later owner/legal/content review before any public launch decision.

It does not approve public live, final public copy, paid traffic, live forms, CRM, analytics, uploads, messaging, public profiles or HTTP/3/QUIC.

## Stage 17G Owner Review Packet

Use the Stage 17G owner-review layer for practical human review:

- `docs/owner-review/stage-17g-owner-legal-signoff-packet-v1.md`
- `docs/owner-review/stage-17g-route-decision-log-v1.md`
- `docs/owner-review/stage-17g-go-no-go-review-checklist-v1.md`
- `docs/owner-review/stage-17g-owner-review-index-v1.md`

Stage 17G keeps all route decisions review-gated: `READY_FOR_OWNER_REVIEW`, `OWNER_LEGAL_REVIEW_REQUIRED`, `NOT_PUBLIC_LIVE_READY`.

## Review Rules

- Use the source-of-truth repository for canon, route intent, HOLD boundaries and service scope.
- Keep one URL = one main intent.
- Verify title, H1 and description against route role.
- Verify all claims against source docs.
- Keep unresolved facts as `HOLD`, `MISSING_EXPECTED` or `OWNER_LEGAL_REVIEW_REQUIRED`.
- Do not add commercial terms, guarantees, exact deadlines, social proof, legal identifiers, working hours, office/floor details, public uploads, live endpoints, messaging deep links or state-affiliation wording.

## Route Checklist

| Route URL | Page role | Title/H1/description | Main client task | Claims to verify | HOLD risks | Legal/privacy risks | Source docs used | Owner/legal approval status | Copy status | Final decision |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `/` | Core router | `READY_FOR_OWNER_REVIEW` | Choose safe route from brand/local entry | Brand/category/local marker | Local facts, public profile claims | Local/state-imitation | Canon, route registry, semantic core | `OWNER_LEGAL_REVIEW_REQUIRED` | `READY_FOR_OWNER_REVIEW` | `NOT_READY_FOR_PUBLIC_LIVE` |
| `/razbor-situacii/` | Core triage | `READY_FOR_OWNER_REVIEW` | Start with safe first review | Triage scope, next-step wording | Free-service implication | Personal data handling | Situation passport, UX lead path | `OWNER_LEGAL_REVIEW_REQUIRED` | `READY_FOR_OWNER_REVIEW` | `NOT_READY_FOR_PUBLIC_LIVE` |
| `/kontakty/` | Contacts/NAP | `READY_FOR_OWNER_REVIEW` | Call, route, safe document showing | NAP, phone, address, local marker | Local details, extra channels | Privacy/contact flow | NAP/canon, contacts passport | `OWNER_LEGAL_REVIEW_REQUIRED` | `READY_FOR_OWNER_REVIEW` | `NOT_READY_FOR_PUBLIC_LIVE` |
| `/policy` | Legal/privacy | `READY_FOR_OWNER_REVIEW` | Read privacy/legal contact info | Policy wording and data handling | Legal final wording | Privacy/legal acceptance | Policy route, hold register | `OWNER_LEGAL_REVIEW_REQUIRED` | `READY_FOR_OWNER_REVIEW` | `NOT_READY_FOR_PUBLIC_LIVE` |
| `/o-proekte/` | Project context | `READY_FOR_OWNER_REVIEW` | Understand format and boundaries | Work format, local marker explanation | Public proof claims | State-imitation wording | Canon, semantic core | `OWNER_LEGAL_REVIEW_REQUIRED` | `READY_FOR_OWNER_REVIEW` | `NOT_READY_FOR_PUBLIC_LIVE` |
| `/srochnye-voprosy/` | Hub | `READY_FOR_OWNER_REVIEW` | Choose route for urgent/mixed question | Urgency wording, first-step boundary | Exact timing, pressure | Outcome promise | Route registry, semantic coverage, urgent passport | `OWNER_LEGAL_REVIEW_REQUIRED` | `READY_FOR_OWNER_REVIEW` | `NOT_READY_FOR_PUBLIC_LIVE` |
| `/otchetnost/` | Hub | `READY_FOR_OWNER_REVIEW` | Select reporting route | Reporting route separation | Scope overreach | Tax conclusion | Route registry, reporting coverage | `OWNER_LEGAL_REVIEW_REQUIRED` | `READY_FOR_OWNER_REVIEW` | `NOT_READY_FOR_PUBLIC_LIVE` |
| `/nalogi-i-rezhimy/` | Hub | `READY_FOR_OWNER_REVIEW` | Select tax/regime route | Transition vs diagnostic boundary | Tax advice | Tax/legal conclusion | Tax semantic docs, service catalog | `OWNER_LEGAL_REVIEW_REQUIRED` | `READY_FOR_OWNER_REVIEW` | `NOT_READY_FOR_PUBLIC_LIVE` |
| `/bank-i-115-fz/` | Hub | `READY_FOR_OWNER_REVIEW` | Select bank/115-ФЗ route | Bank request vs package split | Bank outcome | Sensitive materials | Bank passports, UX lead path | `OWNER_LEGAL_REVIEW_REQUIRED` | `READY_FOR_OWNER_REVIEW` | `NOT_READY_FOR_PUBLIC_LIVE` |
| `/adres-egryul-direktor/` | Hub | `READY_FOR_OWNER_REVIEW` | Select address/EGRUL/director route | Company-change split | Registry outcome | Legal conclusion | Address passports, route registry | `OWNER_LEGAL_REVIEW_REQUIRED` | `READY_FOR_OWNER_REVIEW` | `NOT_READY_FOR_PUBLIC_LIVE` |
| `/kadry/` | Hub | `READY_FOR_OWNER_REVIEW` | Select HR route | HR route separation | Timing/scope | Personal data | HR passports, UX lead path | `OWNER_LEGAL_REVIEW_REQUIRED` | `READY_FOR_OWNER_REVIEW` | `NOT_READY_FOR_PUBLIC_LIVE` |
| `/soprovozhdenie/` | Hub | `READY_FOR_OWNER_REVIEW` | Select support route | Regular vs one-off support | Scope/commercial terms | Backend/live workflow | Support passport, semantic coverage | `OWNER_LEGAL_REVIEW_REQUIRED` | `READY_FOR_OWNER_REVIEW` | `NOT_READY_FOR_PUBLIC_LIVE` |
| `/registraciya-i-likvidaciya/` | Hub | `READY_FOR_OWNER_REVIEW` | Select lifecycle route | Registration vs liquidation split | External result | Legal conclusion | Route registry, lifecycle passports | `OWNER_LEGAL_REVIEW_REQUIRED` | `READY_FOR_OWNER_REVIEW` | `NOT_READY_FOR_PUBLIC_LIVE` |
| `/otvet-na-trebovanie-ifns/` | Money page | `READY_FOR_OWNER_REVIEW` | Prepare route for IFNS requirement | Response scope, source documents | Exact timing | Tax/legal position | IFNS passport, service ledger | `OWNER_LEGAL_REVIEW_REQUIRED` | `READY_FOR_OWNER_REVIEW` | `NOT_READY_FOR_PUBLIC_LIVE` |
| `/deklaraciya-usn/` | Money page | `READY_FOR_OWNER_REVIEW` | Prepare USN declaration route | Period/input wording | Tax outcome | Tax conclusion | USN passport, reporting coverage | `OWNER_LEGAL_REVIEW_REQUIRED` | `READY_FOR_OWNER_REVIEW` | `NOT_READY_FOR_PUBLIC_LIVE` |
| `/otvet-na-zapros-banka/` | Money page | `READY_FOR_OWNER_REVIEW` | Prepare bank response route | Request-specific package wording | Bank acceptance | Sensitive materials | Bank request passport, UX lead path | `OWNER_LEGAL_REVIEW_REQUIRED` | `READY_FOR_OWNER_REVIEW` | `NOT_READY_FOR_PUBLIC_LIVE` |
| `/dokumenty-dlya-banka-115-fz/` | Money page | `READY_FOR_OWNER_REVIEW` | Prepare 115-ФЗ document package | Package by real situation | Bank outcome | Sensitive materials | Bank 115-ФЗ passport, service catalog | `OWNER_LEGAL_REVIEW_REQUIRED` | `READY_FOR_OWNER_REVIEW` | `NOT_READY_FOR_PUBLIC_LIVE` |
| `/yuridicheskiy-adres-simferopol/` | Money page | `READY_FOR_OWNER_REVIEW` | Prepare legal-address route | Address/document wording | Local/legal details | Legal conclusion | Legal address passport, route registry | `OWNER_LEGAL_REVIEW_REQUIRED` | `READY_FOR_OWNER_REVIEW` | `NOT_READY_FOR_PUBLIC_LIVE` |
| `/nedostovernost-yuridicheskogo-adresa/` | Money page | `READY_FOR_OWNER_REVIEW` | Review address unreliability route | Source of mark, safe next path | Registry result | Legal conclusion | Address unreliability passport | `OWNER_LEGAL_REVIEW_REQUIRED` | `READY_FOR_OWNER_REVIEW` | `NOT_READY_FOR_PUBLIC_LIVE` |
| `/smena-yuridicheskogo-adresa-ooo/` | Money page | `READY_FOR_OWNER_REVIEW` | Prepare address-change route | Current/new address inputs | Registry result | Legal conclusion | Change address passport | `OWNER_LEGAL_REVIEW_REQUIRED` | `READY_FOR_OWNER_REVIEW` | `NOT_READY_FOR_PUBLIC_LIVE` |
| `/smena-direktora-ooo/` | Money page | `READY_FOR_OWNER_REVIEW` | Prepare director-change route | Company documents, change scope | Registry result | Corporate conclusion | Change director passport | `OWNER_LEGAL_REVIEW_REQUIRED` | `READY_FOR_OWNER_REVIEW` | `NOT_READY_FOR_PUBLIC_LIVE` |
| `/srochnoe-oformlenie-sotrudnikov/` | Money page | `READY_FOR_OWNER_REVIEW` | Prepare urgent HR route | Event/input wording | Exact timing | Personal data | Urgent employee passport, HR docs | `OWNER_LEGAL_REVIEW_REQUIRED` | `READY_FOR_OWNER_REVIEW` | `NOT_READY_FOR_PUBLIC_LIVE` |
| `/perehod-na-ausn/` | Money page | `READY_FOR_OWNER_REVIEW` | Review AUSN transition route | Transition vs diagnostic wording | Tax savings/outcome | Tax conclusion | AUSN transition passport | `OWNER_LEGAL_REVIEW_REQUIRED` | `READY_FOR_OWNER_REVIEW` | `NOT_READY_FOR_PUBLIC_LIVE` |
| `/nulevaya-otchetnost-ooo/` | Money page | `READY_FOR_OWNER_REVIEW` | Prepare zero reporting ООО route | Activity/period inputs | Tax outcome | Tax conclusion | Zero reporting ООО passport | `OWNER_LEGAL_REVIEW_REQUIRED` | `READY_FOR_OWNER_REVIEW` | `NOT_READY_FOR_PUBLIC_LIVE` |
| `/nulevaya-otchetnost-ip/` | Money page | `READY_FOR_OWNER_REVIEW` | Prepare zero reporting ИП route | Activity/regime/period inputs | Tax outcome | Tax conclusion | Zero reporting ИП passport | `OWNER_LEGAL_REVIEW_REQUIRED` | `READY_FOR_OWNER_REVIEW` | `NOT_READY_FOR_PUBLIC_LIVE` |
| `/otchetnost-elektronno/` | Money page | `READY_FOR_OWNER_REVIEW` | Prepare e-reporting route | Channel/access wording | Provider/channel promises | Credential handling | Electronic reporting passport | `OWNER_LEGAL_REVIEW_REQUIRED` | `READY_FOR_OWNER_REVIEW` | `NOT_READY_FOR_PUBLIC_LIVE` |
| `/vosstanovlenie-buhucheta/` | Money page | `READY_FOR_OWNER_REVIEW` | Review accounting recovery route | Period/gap wording | Scope overreach | Document sensitivity | Accounting recovery passport | `OWNER_LEGAL_REVIEW_REQUIRED` | `READY_FOR_OWNER_REVIEW` | `NOT_READY_FOR_PUBLIC_LIVE` |
| `/buhgalterskoe-soprovozhdenie-ooo/` | Money page | `READY_FOR_OWNER_REVIEW` | Review support ООО route | Support scope wording | Commercial terms/scope | Backend workflow | Accounting support ООО passport | `OWNER_LEGAL_REVIEW_REQUIRED` | `READY_FOR_OWNER_REVIEW` | `NOT_READY_FOR_PUBLIC_LIVE` |
| `/buhgalterskoe-soprovozhdenie-ip/` | Money page | `READY_FOR_OWNER_REVIEW` | Review support ИП route | Support scope wording | Commercial terms/scope | Backend workflow | Accounting support ИП passport | `OWNER_LEGAL_REVIEW_REQUIRED` | `READY_FOR_OWNER_REVIEW` | `NOT_READY_FOR_PUBLIC_LIVE` |
| `/kadrovoe-soprovozhdenie/` | Money page | `READY_FOR_OWNER_REVIEW` | Review HR support route | One-off vs regular HR wording | Scope/timing | Personal data | HR support passport | `OWNER_LEGAL_REVIEW_REQUIRED` | `READY_FOR_OWNER_REVIEW` | `NOT_READY_FOR_PUBLIC_LIVE` |
| `/registraciya-ooo/` | Money page | `READY_FOR_OWNER_REVIEW` | Prepare ООО registration route | Registration input wording | External result | Legal conclusion | Registration ООО passport | `OWNER_LEGAL_REVIEW_REQUIRED` | `READY_FOR_OWNER_REVIEW` | `NOT_READY_FOR_PUBLIC_LIVE` |
| `/registraciya-ip/` | Money page | `READY_FOR_OWNER_REVIEW` | Prepare ИП registration route | Registration input wording | External result | Tax/legal conclusion | Registration ИП passport | `OWNER_LEGAL_REVIEW_REQUIRED` | `READY_FOR_OWNER_REVIEW` | `NOT_READY_FOR_PUBLIC_LIVE` |
| `/likvidaciya-ooo/` | Money page | `READY_FOR_OWNER_REVIEW` | Review liquidation ООО route | Lifecycle/status wording | External result/timing | Legal conclusion | Liquidation ООО passport | `OWNER_LEGAL_REVIEW_REQUIRED` | `READY_FOR_OWNER_REVIEW` | `NOT_READY_FOR_PUBLIC_LIVE` |
| `/ausn-krym/` | Diagnostic | `READY_FOR_OWNER_REVIEW` | Review AUSN applicability diagnostic | Diagnostic boundary | Tax outcome | Tax conclusion | AUSN Krym diagnostic passport | `OWNER_LEGAL_REVIEW_REQUIRED` | `READY_FOR_OWNER_REVIEW` | `NOT_READY_FOR_PUBLIC_LIVE` |
| `/raschet-nalogovoy-nagruzki/` | Diagnostic | `READY_FOR_OWNER_REVIEW` | Review tax-load diagnostic | Input/calculation boundary | Final calculation | Tax conclusion | Tax-load calculation passport | `OWNER_LEGAL_REVIEW_REQUIRED` | `READY_FOR_OWNER_REVIEW` | `NOT_READY_FOR_PUBLIC_LIVE` |
| `/nds-pri-usn-2026/` | Diagnostic | `READY_FOR_OWNER_REVIEW` | Review VAT/USN diagnostic | 2026 applicability wording | Future-rule conclusion | Tax conclusion | VAT/USN 2026 passport | `OWNER_LEGAL_REVIEW_REQUIRED` | `READY_FOR_OWNER_REVIEW` | `NOT_READY_FOR_PUBLIC_LIVE` |

## Global Final Decision

| Area | Status |
| --- | --- |
| Public copy checklist completeness | `READY_FOR_OWNER_REVIEW` |
| Final owner/legal approval | `OWNER_LEGAL_REVIEW_REQUIRED` |
| Public live | `NOT_READY_FOR_PUBLIC_LIVE` |
| CRM/forms/analytics/upload/messaging | `BLOCKED` |
| Paid traffic | `BLOCKED` |
| HTTP/3/QUIC | `BLOCKED` |

`PUBLIC_LIVE_ALLOWED = false`
