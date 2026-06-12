# Stage 18K Route Quality Matrix V1

Status: `READY_WITH_CONDITIONS`

Release verdict: `GO WITH CONDITIONS`

Public launch: `NOT_PUBLIC_LIVE_READY`

`PUBLIC_LIVE_ALLOWED = false`

## Purpose

This matrix records Stage 18K route-quality readiness for the 36 indexed public routes and 3 noindex foundation routes in the approved route registry.

No route is approved for public live. No route receives final owner/legal approval. The highest route-copy status in this matrix is `READY_FOR_OWNER_REVIEW`.

## Indexed Route Matrix

| URL | Route class | Route group | Parent route | Priority | Current readiness | Route intent clarity | Block completeness | Copy specificity | FAQ specificity | Related route quality | Lead path quality | HOLD risk | Owner/legal review status | Recommended site action |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `/` | homepage | Core/local | `NOT_APPLICABLE` | P0 | `READY_FOR_OWNER_REVIEW` | `PASS` | `READY_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `PASS` | service catalogue drift, local/profile claims | `PENDING_HUMAN_REVIEW` | Deepen homepage situation selector and preserve router role. |
| `/razbor-situacii/` | core_situation_review | Situation review | `/` | P0 | `READY_FOR_OWNER_REVIEW` | `PASS` | `PASS_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `PASS` | free-service implication, public upload | `PENDING_HUMAN_REVIEW` | Emphasize triage boundary, source document and safe next step. |
| `/kontakty/` | contact_page | Contacts/NAP | `/` | P0 | `READY_FOR_OWNER_REVIEW` | `PASS` | `PASS_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `PASS` | hours, office/floor, legal identifiers | `PENDING_HUMAN_REVIEW` | Keep NAP-only contact flow and safe document-showing wording. |
| `/o-proekte/` | about_page | Core/local | `/` | P2 | `READY_FOR_OWNER_REVIEW` | `PASS` | `READY_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `PASS` | proof claims, legal entity details | `PENDING_HUMAN_REVIEW` | Preserve project-context role without proof or rating claims. |
| `/policy` | legal_policy | Policy/legal | `/` | P0 | `READY_FOR_OWNER_REVIEW` | `PASS` | `READY_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `PASS` | final legal wording, provider/cookie claims | `PENDING_HUMAN_REVIEW` | Keep non-commercial policy boundary and owner/legal pending status. |
| `/srochnye-voprosy/` | urgent_hub | Urgent/IFNS | `/` | P1 | `READY_FOR_OWNER_REVIEW` | `PASS` | `READY_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `PASS` | fake urgency, exact timing | `PENDING_HUMAN_REVIEW` | Keep urgent/unclear routing without pressure language. |
| `/otchetnost/` | reporting_hub | Reporting | `/` | P0 | `READY_FOR_OWNER_REVIEW` | `PASS` | `PASS_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `PASS` | tax conclusion, child intent capture | `PENDING_HUMAN_REVIEW` | Strengthen route-choice language for USN, zero, electronic and recovery paths. |
| `/nalogi-i-rezhimy/` | tax_hub | Tax regimes/diagnostics | `/` | P1 | `READY_FOR_OWNER_REVIEW` | `PASS` | `READY_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `PASS` | final tax advice, savings claim | `PENDING_HUMAN_REVIEW` | Preserve transition-vs-diagnostic split and no final tax conclusion. |
| `/bank-i-115-fz/` | bank_hub | Bank/115-ФЗ | `/` | P0 | `READY_FOR_OWNER_REVIEW` | `PASS` | `PASS_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `PASS` | bank outcome, sensitive materials | `PENDING_HUMAN_REVIEW` | Strengthen split between specific bank request and wider 115-ФЗ package. |
| `/adres-egryul-direktor/` | corporate_changes_hub | Address/EGRUL/director | `/` | P1 | `READY_FOR_OWNER_REVIEW` | `PASS` | `READY_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `PASS` | registry result, legal conclusion | `PENDING_HUMAN_REVIEW` | Keep address, unreliability, address-change and director-change split. |
| `/kadry/` | hr_hub | HR | `/` | P2 | `READY_FOR_OWNER_REVIEW` | `PASS` | `READY_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `PASS` | personal data, timing, HR conclusion | `PENDING_HUMAN_REVIEW` | Preserve personal-data boundary and urgent-vs-support split. |
| `/soprovozhdenie/` | support_hub | Support | `/` | P2 | `READY_FOR_OWNER_REVIEW` | `PASS` | `READY_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `PASS` | package/pricing/scope promise | `PENDING_HUMAN_REVIEW` | Clarify support versus one-off reporting/recovery tasks. |
| `/registraciya-i-likvidaciya/` | lifecycle_hub | Registration/liquidation | `/` | P1 | `READY_FOR_OWNER_REVIEW` | `PASS` | `READY_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `PASS` | external result, timing, tax conclusion | `PENDING_HUMAN_REVIEW` | Preserve ООО/IP/liquidation route separation. |
| `/otvet-na-trebovanie-ifns/` | money_page_tax_response | Urgent/IFNS | `/srochnye-voprosy/` | P0 | `READY_FOR_OWNER_REVIEW` | `PASS` | `PASS_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `PASS` | IFNS acceptance, exact timing, tax/legal position | `PENDING_HUMAN_REVIEW` | Deepen source-document, period and attachment wording. |
| `/deklaraciya-usn/` | money_page_reporting | Reporting | `/otchetnost/` | P0 | `READY_FOR_OWNER_REVIEW` | `PASS` | `PASS_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `PASS` | tax calculation, deadline, accepted reporting | `PENDING_HUMAN_REVIEW` | Deepen period, regime and source-data block. |
| `/otvet-na-zapros-banka/` | money_page_bank_response | Bank/115-ФЗ | `/bank-i-115-fz/` | P0 | `READY_FOR_OWNER_REVIEW` | `PASS` | `PASS_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `PASS` | bank acceptance, account result, sensitive materials | `PENDING_HUMAN_REVIEW` | Deepen request-text and operation/contract document blocks. |
| `/dokumenty-dlya-banka-115-fz/` | money_page_bank_documents | Bank/115-ФЗ | `/bank-i-115-fz/` | P0 | `READY_FOR_OWNER_REVIEW` | `PASS` | `PASS_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `PASS` | bank decision, universal package claim | `PENDING_HUMAN_REVIEW` | Deepen package-by-situation and difference from bank request. |
| `/yuridicheskiy-adres-simferopol/` | money_page_legal_address | Address/EGRUL/director | `/adres-egryul-direktor/` | P0 | `READY_FOR_OWNER_REVIEW` | `PASS` | `PASS_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `PASS` | legal details, office/floor, registry outcome | `PENDING_HUMAN_REVIEW` | Deepen address-document and related change boundary. |
| `/nedostovernost-yuridicheskogo-adresa/` | money_page_address_problem | Address/EGRUL/director | `/adres-egryul-direktor/` | P0 | `READY_FOR_OWNER_REVIEW` | `PASS` | `PASS_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `PASS` | guaranteed removal, registry outcome | `PENDING_HUMAN_REVIEW` | Deepen source-of-mark and evidence review without fear pressure. |
| `/smena-yuridicheskogo-adresa-ooo/` | money_page_change_address | Address/EGRUL/director | `/adres-egryul-direktor/` | P1 | `READY_FOR_OWNER_REVIEW` | `PASS` | `READY_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `PASS` | registry result, legal conclusion | `PENDING_HUMAN_REVIEW` | Preserve address-change exact route and source data boundary. |
| `/smena-direktora-ooo/` | money_page_change_director | Address/EGRUL/director | `/adres-egryul-direktor/` | P1 | `READY_FOR_OWNER_REVIEW` | `PASS` | `READY_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `PASS` | registry result, personal data | `PENDING_HUMAN_REVIEW` | Preserve director-change exact route and safe data handling. |
| `/srochnoe-oformlenie-sotrudnikov/` | money_page_hr_urgent | HR | `/kadry/` | P2 | `READY_FOR_OWNER_REVIEW` | `PASS` | `READY_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `PASS` | exact timing, personal data upload | `PENDING_HUMAN_REVIEW` | Keep urgency without exact deadline and no public personal-data collection. |
| `/perehod-na-ausn/` | money_page_ausn_transition | Tax regimes/diagnostics | `/nalogi-i-rezhimy/` | P2 | `READY_FOR_OWNER_REVIEW` | `PASS` | `READY_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `PASS` | savings promise, final applicability conclusion | `PENDING_HUMAN_REVIEW` | Keep transition route separate from diagnostics. |
| `/nulevaya-otchetnost-ooo/` | money_page_zero_reporting_ooo | Reporting | `/otchetnost/` | P1 | `READY_FOR_OWNER_REVIEW` | `PASS` | `READY_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `PASS` | zero-status conclusion, exact deadline | `PENDING_HUMAN_REVIEW` | Preserve ООО-specific zero reporting inputs. |
| `/nulevaya-otchetnost-ip/` | money_page_zero_reporting_ip | Reporting | `/otchetnost/` | P1 | `READY_FOR_OWNER_REVIEW` | `PASS` | `READY_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `PASS` | activity/regime conclusion, exact deadline | `PENDING_HUMAN_REVIEW` | Preserve ИП-specific zero reporting inputs. |
| `/otchetnost-elektronno/` | money_page_e_reporting | Reporting | `/otchetnost/` | P2 | `READY_FOR_OWNER_REVIEW` | `PASS` | `READY_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `PASS` | credential handling, provider promise | `PENDING_HUMAN_REVIEW` | Keep no credential collection and safe material-showing path. |
| `/vosstanovlenie-buhucheta/` | money_page_recovery | Reporting | `/otchetnost/` | P0 | `READY_FOR_OWNER_REVIEW` | `PASS` | `PASS_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `PASS` | exact recovery result, scope overreach | `PENDING_HUMAN_REVIEW` | Deepen period/gap/source-document wording. |
| `/buhgalterskoe-soprovozhdenie-ooo/` | money_page_support_ooo | Support | `/soprovozhdenie/` | P2 | `READY_FOR_OWNER_REVIEW` | `PASS` | `READY_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `PASS` | scope promise, commercial terms | `PENDING_HUMAN_REVIEW` | Preserve support-vs-one-off reporting boundary. |
| `/buhgalterskoe-soprovozhdenie-ip/` | money_page_support_ip | Support | `/soprovozhdenie/` | P2 | `READY_FOR_OWNER_REVIEW` | `PASS` | `READY_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `PASS` | scope promise, tax review | `PENDING_HUMAN_REVIEW` | Preserve ИП support-vs-declaration boundary. |
| `/kadrovoe-soprovozhdenie/` | money_page_support_hr | HR | `/kadry/` | P2 | `READY_FOR_OWNER_REVIEW` | `PASS` | `READY_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `PASS` | personal data, scope/timing | `PENDING_HUMAN_REVIEW` | Preserve regular HR support boundary. |
| `/registraciya-ooo/` | money_page_registration_ooo | Registration/liquidation | `/registraciya-i-likvidaciya/` | P0 | `READY_FOR_OWNER_REVIEW` | `PASS` | `PASS_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `PASS` | registration result, legal/tax conclusion | `PENDING_HUMAN_REVIEW` | Deepen participant/address/activity input wording. |
| `/registraciya-ip/` | money_page_registration_ip | Registration/liquidation | `/registraciya-i-likvidaciya/` | P0 | `READY_FOR_OWNER_REVIEW` | `PASS` | `PASS_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `PASS` | registration result, tax regime conclusion | `PENDING_HUMAN_REVIEW` | Deepen activity/regime and ООО-vs-ИП boundary. |
| `/likvidaciya-ooo/` | money_page_liquidation_ooo | Registration/liquidation | `/registraciya-i-likvidaciya/` | P2 | `READY_FOR_OWNER_REVIEW` | `PASS` | `READY_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `PASS` | liquidation result, exact timing | `PENDING_HUMAN_REVIEW` | Preserve status/document checklist and no result promise. |
| `/ausn-krym/` | diagnostic_page_ausn_fit | Tax regimes/diagnostics | `/nalogi-i-rezhimy/` | P2 | `READY_FOR_OWNER_REVIEW` | `PASS` | `READY_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `PASS` | final tax conclusion, future-rule drift | `PENDING_HUMAN_REVIEW` | Keep diagnostic-only language and parent hub link. |
| `/raschet-nalogovoy-nagruzki/` | diagnostic_page_tax_load | Tax regimes/diagnostics | `/nalogi-i-rezhimy/` | P2 | `READY_FOR_OWNER_REVIEW` | `PASS` | `READY_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `PASS` | final calculation, hidden pricing | `PENDING_HUMAN_REVIEW` | Keep input route, no fake calculator output. |
| `/nds-pri-usn-2026/` | diagnostic_page_vat_usn | Tax regimes/diagnostics | `/nalogi-i-rezhimy/` | P2 | `READY_FOR_OWNER_REVIEW` | `PASS` | `READY_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `READY_WITH_CONDITIONS` | `PASS` | final tax advice, exact obligation claim | `PENDING_HUMAN_REVIEW` | Keep future-rule review boundary and no final advice. |

## Noindex Foundation Matrix

| URL | Noindex status | Sitemap status | Live automation status | Required next action |
| --- | --- | --- | --- | --- |
| `/blog/` | `NOINDEX_FOUNDATION` | `EXCLUDED_FROM_SITEMAP` | `DISABLED` | Keep noindex, no feed, no Article schema and safe route back to `/razbor-situacii/` or `/kontakty/`. |
| `/blog/obnovleniya-fns/` | `NOINDEX_FOUNDATION` | `EXCLUDED_FROM_SITEMAP` | `DISABLED` | Keep no live FNS fetch, scheduler, rewrite provider, autopublish or indexing until separate approval. |
| `/blog/razbory/` | `NOINDEX_FOUNDATION` | `EXCLUDED_FROM_SITEMAP` | `DISABLED` | Keep no unsupported examples, no Article schema and no public content SEO role until approval. |

## Summary

| Area | Status |
| --- | --- |
| Indexed routes covered | `PASS - 36` |
| Noindex foundation routes covered | `PASS - 3` |
| Priority routes identified | `PASS` |
| Owner/legal approval | `PENDING_HUMAN_REVIEW` |
| Public live | `NOT_PUBLIC_LIVE_READY` |
| Release verdict | `GO WITH CONDITIONS` |

Stage 18K may deepen route quality for owner review. It does not approve final public copy or public live.

`PUBLIC_LIVE_ALLOWED = false`
