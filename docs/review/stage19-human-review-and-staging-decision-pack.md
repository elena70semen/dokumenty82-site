# Stage 19 Human Review And Staging Decision Pack

Status: `READY_FOR_HUMAN_DECISION_PACKET`

Release status: `NOT_PUBLIC_LIVE_READY`

`PUBLIC_LIVE_ALLOWED=false`

## 1. Artifact To Review

Review the verified CI artifact, not a local build:

- PR: `#17`
- Workflow run: `27441114733`
- Artifact name: `dokumenty82-static-preview`
- Artifact id: `7601874824`
- Artifact status: `VERIFIED`

Artifact scope:

- 36 indexed URLs in sitemap
- 3 noindex foundation routes excluded from sitemap
- 66 browser checks: 22 routes x 3 viewports
- no deploy
- no public URL
- no Pages
- no cloud auth
- no public live

## 2. Ready For Human Review

The current artifact is ready for human review of:

- homepage copy, structure and route flow;
- `/razbor-situacii/` as safe first-step triage;
- `/kontakty/` contact and NAP wording;
- `/policy` as a separate legal/privacy decision;
- hub pages and route-group navigation;
- priority service and diagnostic pages;
- noindex foundation pages;
- CTA wording and hierarchy;
- contact/NAP consistency;
- mobile/browser rendering from the verified artifact.

## 3. Human Review Decisions Needed

Manual decision checklist:

- [ ] Homepage copy and structure: approve / revise / reject
- [ ] `/razbor-situacii/`: approve / revise / reject
- [ ] Contacts/NAP: approve / revise / reject
- [ ] `/policy`: approve / revise / reject
- [ ] Service route copy: approve / revise / reject
- [ ] CTA wording: approve / revise / reject
- [ ] Noindex foundation pages: approve / revise / reject
- [ ] Local trust wording: approve / revise / reject

Decision notes to fill manually:

- decision scope: all reviewed routes or only named routes;
- route-specific notes and required edits;
- separate `/policy` decision;
- CTA wording notes;
- NAP/contact wording notes.

Do not pre-fill approvals. Do not infer approval from CI.

## 4. Staging Decisions Needed

Provider-neutral staging checklist:

- [ ] staging provider chosen
- [ ] staging URL will be non-indexed
- [ ] staging access rules decided
- [ ] rollback method chosen
- [ ] transport proof owner assigned
- [ ] HTTP/3/QUIC remains disabled unless separately approved
- [ ] analytics remains disabled on staging unless approved
- [ ] CRM/forms remain disabled on staging unless approved

No staging provider is selected in this packet. No deploy config or DNS instruction is added.

Transport baseline for the first candidate remains HTTPS over TCP/443 with HTTP/1.1 or HTTP/2. HTTP/3, QUIC, UDP/443, `Alt-Svc: h3` and active `listen ... quic` remain blocked by default unless separately approved and proved.

## 5. Analytics And Webmaster Decisions Needed

Decision checklist:

- [ ] real Yandex Metrika counter provided
- [ ] analytics/no-PII approval granted
- [ ] Webvisor/session replay decision: disabled unless explicitly approved
- [ ] Yandex Webmaster verification method chosen
- [ ] Google Search Console verification method chosen
- [ ] no real tokens committed to repo

Current state:

- analytics mode is `stub`
- Metrika ID is `00000000`
- no Metrika script loads
- no analytics events send
- Yandex Webmaster verification value is empty
- Google Search Console verification value is empty

## 6. CRM And Forms Decisions Needed

Decision checklist:

- [ ] whether site will use forms or only phone/contact path
- [ ] backend/CRM provider chosen
- [ ] webhook handling approved
- [ ] personal data handling approved
- [ ] `/policy` updated and approved before any live form

Current state:

- forms disabled
- webhook empty
- uploads disabled
- messaging disabled
- no false success path enabled

## 7. Explicit Blockers

The following still block public live:

- owner/legal approval
- `/policy`
- real Metrika counter
- analytics/no-PII approval
- CRM/forms backend decision
- staging provider decision
- rollback provider proof
- transport provider proof
- Search Console/Yandex Webmaster
- public live go/no-go

## 8. Non-Approval Statements

Green CI is not owner/legal approval.

Artifact proof is not public-live approval.

Absence of comments is not approval.

Draft PR status remains until explicit decision.

PUBLIC_LIVE_ALLOWED=false.

## 9. Review Route List

Core:

- `/`
- `/razbor-situacii/`
- `/kontakty/`
- `/policy`
- `/o-proekte/`

Hubs:

- `/otchetnost/`
- `/bank-i-115-fz/`
- `/adres-egryul-direktor/`
- `/registraciya-i-likvidaciya/`
- `/soprovozhdenie/`

Priority money/diagnostic:

- `/otvet-na-trebovanie-ifns/`
- `/deklaraciya-usn/`
- `/otvet-na-zapros-banka/`
- `/dokumenty-dlya-banka-115-fz/`
- `/yuridicheskiy-adres-simferopol/`
- `/nedostovernost-yuridicheskogo-adresa/`
- `/registraciya-ooo/`
- `/registraciya-ip/`
- `/vosstanovlenie-buhucheta/`
- `/nulevaya-otchetnost-ooo/`
- `/nulevaya-otchetnost-ip/`
- `/raschet-nalogovoy-nagruzki/`

Noindex foundation:

- `/blog/`
- `/blog/obnovleniya-fns/`
- `/blog/razbory/`
