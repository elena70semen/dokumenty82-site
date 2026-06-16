# Avito campaign setup and promotion manual for Codex v1

Date: 2026-06-16
Project: `dokumenty82.ru` / `Документы для бизнеса`
Repository: `elena70semen/dokumenty82-site`
Related document: `docs/marketing/avito-promotion-contour-v1.md`
Related issue: `#31 Avito: контур продвижения услуг, SEO-усиление и контроль конверсий`
Owner gate: required before publication, payment, profile verification, photos, price display and public promises.
Status target: prepare account and campaign; keep channel `STAGED` until owner approval.

---

## 0. How Codex should use this file

This file is an operational markdown brief for Codex and for the human operator who will set up Avito. It is intentionally written as a full implementation checklist rather than a short marketing idea.

Codex must treat this as a source-of-truth operating instruction for documentation and evidence tasks only. It must not enable live lead collection, CRM submit, paid traffic flags, public pricing or new public guarantees unless a separate owner-approved issue explicitly requests that.

### Codex guardrails

1. Do not change `lib/feature-flags.ts` for Avito unless a separate owner-approved launch task exists.
2. Do not enable `formsLive`, `crmEnabled`, `paidTrafficAllowed`, `localProfilesPublic`, `messagingEnabled` or public file uploads.
3. Do not add public price promises while service pricing is `HOLD`.
4. Do not add wording that promises a result from an external body, bank, registrar, tax office or platform.
5. Do not send PII through UTM, data attributes, hidden form fields, analytics events or example URLs.
6. Do not turn Avito into a scaled paid campaign before a 14-day source-capture pilot is complete.
7. If the current Avito interface differs from this manual, update only the manual/evidence notes, not public site logic.

### Files Codex should inspect before making any change

- `docs/marketing/avito-promotion-contour-v1.md`
- `lib/channels/sales-channel-registry.mjs`
- `lib/feature-flags.ts`
- `lib/tracking/event-context.ts`
- `scripts/check-tracking-no-pii.mjs`
- `scripts/check-forms-crm-contract.mjs`
- `scripts/generate-sales-channel-evidence.mjs`
- `scripts/check-sales-channel-readiness.mjs`
- `lib/pricing/service-pricing-matrix.ts`
- `lib/content.ts`
- `lib/routes.ts`

### Commands Codex should keep green

```bash
npm run evidence:sales-channels
npm run check:sales-channels
npm run check:tracking-no-pii
npm run check:forms-crm-contract
npm run check:finalization
```

---

## 1. Campaign goal

Set up Avito as a controlled local-demand and trust channel for `Документы для бизнеса` in Simferopol and Crimea.

The campaign must produce four outcomes:

1. Qualified local calls and chats from users searching for document-related business services.
2. Safer conversion flow: first situation review, then scope, documents and next step.
3. SEO support for the website through consistent local brand mentions, NAP consistency, long-tail demand, branded searches and review signals.
4. A measurable lead-quality loop that shows which services are worth scaling.

This campaign is not allowed to become a price-race listing set. The business positioning is: local office, document route, careful review, safe next step, no promises before review.

---

## 2. Current website and repository constraints

### 2.1 Current Avito channel status

Current Avito channel is staged, not fully live-scaled.

Expected registry values:

```text
id: avito
status: STAGED
allowedLandingRoutes:
  - /registraciya-ooo/
  - /registraciya-ip/
  - /otvet-na-zapros-banka/
  - /yuridicheskiy-adres-simferopol/
allowedCtaLabels:
  - Позвонить
  - Показать документы
  - Разобрать ситуацию
attributionRequired: manual_avito_call_or_avito_chat
crmSourceValue: avito_call
launchBlocker: owner_listing_photo_response_approval_and_hold_gate
```

### 2.2 Feature flags that affect the campaign

The campaign must respect the current closed gates:

```text
publicLiveAllowed: true
formsLive: false
crmEnabled: false
crmSuccessEnabled: false
analyticsEnabled: false
metricaEnabled: true
paidTrafficAllowed: false
localProfilesPublic: false
messagingEnabled: false
mapEnabled: false
```

Operational meaning:

- website can be public and indexed;
- Yandex Metrica pageview/goal-safe layer can be present;
- non-Metrica analytics remain disabled;
- public lead forms are placeholders, not live submit endpoints;
- Avito leads must be processed manually by phone/chat and logged manually;
- paid promotion is allowed only as an owner-approved small pilot, not a broad paid-traffic launch;
- local profiles and external directory publication must be owner-approved.

### 2.3 Tracking constraints

Allowed URL/source parameters:

```text
utm_source
utm_medium
utm_campaign
utm_content
utm_term
yclid
ysclid
from
```

Forbidden in tracking, URLs, analytics labels and examples:

```text
phone
name
message
document_text
file_name
inn
ogrn
passport
bank
crm_notes
```

Never put client names, phone numbers, bank names, INN, OGRN, passport data, document filenames, request text or chat content into UTM labels.

### 2.4 Pricing constraints

Public pricing is not approved. Pricing is `HOLD` for the service matrix until owner approval.

If Avito requires a price field, use one of these owner-approved approaches only:

1. `Цена по договорённости`, if the interface allows it.
2. A neutral numeric placeholder approved by the owner, with description clearly stating that final scope and cost are determined after review.
3. Hold publication until a compliant price display is approved.

Do not write:

- `регистрация без отказа`;
- `банк примет пакет`;
- `разблокируем счёт`;
- `гарантия результата`;
- `сделаем сегодня`;
- `любой вопрос решим`;
- `цена окончательная без документов`.

---

## 3. Account setup: step-by-step personal cabinet checklist

The exact Avito interface can change. The operator must follow the current Avito UI labels while preserving the decisions in this section.

### 3.1 Before registration

Prepare:

- owner-approved phone number: `+7 (978) 998-72-22`;
- owner-approved email for account access and receipts;
- secure password manager entry;
- backup recovery phone/email;
- company display name: `Документы для бизнеса`;
- site domain: `https://dokumenty82.ru`;
- office address: `Республика Крым, Симферополь, ул. им. Мате Залки, 1`;
- short address: `Симферополь, ул. Мате Залки, 1`;
- working hours and callback rules;
- profile avatar/logo file;
- 5-10 safe photos;
- legal/payment details if the cabinet requires paid services;
- owner decision on price display.

### 3.2 Register or prepare the account

1. Open Avito.
2. Register or log in with the owner-approved phone.
3. Confirm phone and email.
4. Set a strong password if password login is available.
5. Enable every available security option: device notifications, two-factor confirmation, trusted email, recovery controls.
6. Check that the account is not tied to unrelated personal listings that can damage trust.
7. If there is an old account, audit old listings, messages, reviews and profile text before using it for business.

### 3.3 Convert to business/professional use if available

In the cabinet, look for current Avito options such as business profile, professional profile, company profile, tariff, package placements, wallet, balance, documents or verification.

Set only owner-approved values:

- display name: `Документы для бизнеса`;
- business area: document preparation / business documents / accounting and legal-document support;
- city/region: Симферополь, Республика Крым;
- phone: `+7 (978) 998-72-22`;
- site: `https://dokumenty82.ru`, only if a site field is available and allowed;
- address: `ул. им. Мате Залки, 1`;
- description: use the approved text below;
- messenger/chat: enabled only inside Avito; no request to send sensitive documents into unsafe chat.

### 3.4 Profile description

Use this profile description:

```text
Документы для бизнеса в Симферополе. Разбираем ситуацию, смотрим исходные документы и помогаем подготовить понятный комплект для следующего действия: регистрация ИП и ООО, документы по запросу банка, юридический адрес и изменения, отчётность и сопроводительные вопросы.

Работаем аккуратно: сначала вводные и документы, затем маршрут и состав работ. Не обещаем результат внешнего органа до изучения ситуации. Чувствительные документы передаются только согласованным безопасным способом.
```

Short version if the field is limited:

```text
Документы для бизнеса в Симферополе: регистрация ИП/ООО, запросы банка, юридический адрес, отчётность и сопроводительные документы. Сначала разбираем ситуацию и состав документов, затем определяем безопасный следующий шаг.
```

### 3.5 Profile visual setup

Avatar/logo:

- use a clean logo or sign with `Документы для бизнеса`;
- no state emblems;
- no fake seals/stamps;
- no images of passports, bank cards, INN, contracts with readable personal data;
- no exaggerated claims like `100% гарантия`.

Profile photos:

1. Office exterior or entrance, if owner-approved.
2. Office/reception/work desk without personal data.
3. Neutral document folders/checklists.
4. Local route/landmark image if safe.
5. Team/work process photo if people have agreed.

File naming convention for internal storage:

```text
avito_profile_logo_01.png
avito_office_exterior_01.jpg
avito_office_desk_no_pii_01.jpg
avito_documents_neutral_01.jpg
avito_route_landmark_01.jpg
```

### 3.6 Account notification setup

Set notifications so no Avito lead is missed:

- push notifications on operator phone;
- email notifications to owner-approved mailbox;
- missed-call review process;
- daily manual lead-log update;
- backup operator rule if the owner is unavailable.

Recommended SLA:

- Avito chat during working hours: first answer within 15 minutes;
- missed call during working hours: callback within 30 minutes;
- after-hours chat: reply next working morning;
- urgent bank/tax request: respond as soon as possible, but do not promise same-day result.

---

## 4. Category and listing architecture

The exact category names must be checked in Avito at publication time. Use the closest current category under `Услуги`.

Preferred category candidates:

- `Услуги -> Деловые услуги`;
- `Услуги -> Бухгалтерия и финансы`;
- `Услуги -> Юридические услуги`;
- `Услуги -> Регистрация бизнеса`, if available;
- `Услуги -> Документы`, if available.

Do not place business-document services in unrelated categories just for cheaper traffic. Wrong category can produce unqualified leads, moderation issues and trust loss.

### 4.1 Stage 1 listing set

Create four listings first:

| Listing key | Service | Landing route | UTM content | Lead topic |
|---|---|---|---|---|
| `registraciya_ooo` | Регистрация ООО | `/registraciya-ooo/` | `registraciya_ooo_01` | `registration_ooo` |
| `registraciya_ip` | Регистрация ИП | `/registraciya-ip/` | `registraciya_ip_01` | `registration_ip` |
| `bank_request` | Ответ на запрос банка | `/otvet-na-zapros-banka/` | `bank_request_01` | `bank_request` |
| `legal_address` | Юридический адрес | `/yuridicheskiy-adres-simferopol/` | `legal_address_01` | `legal_address` |

Do not publish more than four listings before the operator can reliably log sources and lead quality.

### 4.2 Stage 2 candidates

Add after 14 days only if source capture and lead quality are acceptable:

| Candidate | Route | Trigger to add |
|---|---|---|
| Ответ на требование ИФНС | `/otvet-na-trebovanie-ifns/` | repeated tax-request leads |
| Документы для банка по 115-ФЗ | `/dokumenty-dlya-banka-115-fz/` | bank listing has qualified leads |
| Декларация УСН | `/deklaraciya-usn/` | reporting demand appears |
| Нулевая отчётность ООО | `/nulevaya-otchetnost-ooo/` | ООО reporting leads appear |
| Нулевая отчётность ИП | `/nulevaya-otchetnost-ip/` | ИП reporting leads appear |
| Смена юридического адреса ООО | `/smena-yuridicheskogo-adresa-ooo/` | address leads ask about changes |
| Восстановление бухучёта | `/vosstanovlenie-buhucheta/` | bank/reporting leads show missing accounting data |

Expansion rule: one new listing per week, not a mass upload.

---

## 5. Listing templates: Stage 1

Each listing must have:

- one service-specific title;
- one clear first photo;
- description with safe promises;
- CTA to chat/call;
- safe document-transfer warning;
- no external-result guarantee;
- UTM URL only if the listing/profile allows a site link.

### 5.1 Listing: Registration ООО

Internal key: `registraciya_ooo`
Landing route: `/registraciya-ooo/`
UTM URL:

```text
https://dokumenty82.ru/registraciya-ooo/?utm_source=avito&utm_medium=listing&utm_campaign=avito_stage1_simferopol&utm_content=registraciya_ooo_01&from=avito
```

Title variants:

```text
Регистрация ООО в Симферополе: документы и разбор ситуации
Подготовка документов для регистрации ООО
Регистрация ООО: комплект документов после разбора
```

Recommended title for first publication:

```text
Регистрация ООО в Симферополе: документы и разбор ситуации
```

Description:

```text
Помогаем подготовить документы для вопроса регистрации ООО в Симферополе.

Сначала уточняем вводные:
— состав участников;
— адрес;
— вид деятельности;
— налоговый режим;
— какие документы уже есть;
— есть ли срочность или связанные изменения.

После разбора становится понятно, какой комплект нужен и какой следующий шаг безопасен. Не обещаем регистрацию без отказа: сначала смотрим ситуацию и документы.

Напишите в чат Авито или позвоните. Скажите: «Регистрация ООО» — зафиксируем источник и подскажем, какие вводные подготовить.

Пожалуйста, не отправляйте паспорта и другие чувствительные документы в открытый чат. Сначала согласуем безопасный порядок передачи.
```

Photo brief:

- cover: office desk + neutral folders/checklist;
- text on image, if allowed: `Регистрация ООО — документы и разбор`;
- no fake seals/stamps;
- no passport scans.

Forbidden wording:

```text
без отказа
гарантия регистрации
зарегистрируем точно
ФНС точно внесёт запись
сделаем сегодня
```

### 5.2 Listing: Registration ИП

Internal key: `registraciya_ip`
Landing route: `/registraciya-ip/`
UTM URL:

```text
https://dokumenty82.ru/registraciya-ip/?utm_source=avito&utm_medium=listing&utm_campaign=avito_stage1_simferopol&utm_content=registraciya_ip_01&from=avito
```

Title variants:

```text
Регистрация ИП в Симферополе: документы и порядок действий
Подготовка документов для регистрации ИП
Открытие ИП: разбор вводных и комплект документов
```

Recommended title:

```text
Регистрация ИП в Симферополе: документы и порядок действий
```

Description:

```text
Помогаем разобраться с документами для регистрации ИП в Симферополе.

На первом шаге уточняем:
— данные заявителя без передачи чувствительных документов в открытый чат;
— вид деятельности;
— предполагаемый налоговый режим;
— способ подачи;
— наличие сопутствующих вопросов по отчётности и сопровождению.

Начинаем с вводных, затем формируем понятный следующий шаг и список документов. Не обещаем результат внешнего органа до изучения ситуации.

Напишите в чат Авито или позвоните. Скажите: «Регистрация ИП».
```

Photo brief:

- cover: neutral folder/checklist for ИП;
- optional second image: office/reception;
- optional third image: route/contacts.

Forbidden wording:

```text
откроем ИП гарантированно
без отказа
за один день точно
любые документы не нужны
```

### 5.3 Listing: Bank request response

Internal key: `bank_request`
Landing route: `/otvet-na-зapрос-banka/`
UTM URL:

```text
https://dokumenty82.ru/otvet-na-zapros-banka/?utm_source=avito&utm_medium=listing&utm_campaign=avito_stage1_simferopol&utm_content=bank_request_01&from=avito
```

Title variants:

```text
Ответ на запрос банка: документы и пояснения
Документы по запросу банка для бизнеса
Запрос банка: разбор ситуации и подготовка пакета
```

Recommended title:

```text
Ответ на запрос банка: документы и пояснения
```

Description:

```text
Если банк запросил документы или пояснения, важно сначала понять, какие факты нужно подтвердить.

Разбираем:
— текст запроса;
— операцию или период;
— договоры, акты, счета, платежи;
— контрагента и деловую цель;
— какие материалы уже есть и чего не хватает.

Помогаем структурировать документы и подготовить понятный пакет под реальную деловую ситуацию. Не обещаем, что банк примет пакет или примет конкретное решение: это зависит от внешнего органа и фактических обстоятельств.

Напишите в чат Авито или позвоните. Скажите: «Запрос банка». Чувствительные документы сначала не отправляйте — согласуем безопасный порядок передачи.
```

Photo brief:

- cover: documents + laptop/office without readable banking data;
- no bank logos unless they are generic and not client-specific;
- no screenshots of real bank requests.

Forbidden wording:

```text
банк примет
разблокируем счёт
снимем блокировку
гарантируем ответ
сделаем любой 115-ФЗ
```

### 5.4 Listing: Legal address in Simferopol

Internal key: `legal_address`
Landing route: `/yuridicheskiy-adres-simferopol/`
UTM URL:

```text
https://dokumenty82.ru/yuridicheskiy-adres-simferopol/?utm_source=avito&utm_medium=listing&utm_campaign=avito_stage1_simferopol&utm_content=legal_address_01&from=avito
```

Title variants:

```text
Юридический адрес в Симферополе: документы и разбор
Юридический адрес и сведения ЕГРЮЛ
Документы по юридическому адресу компании
```

Recommended title:

```text
Юридический адрес в Симферополе: документы и разбор
```

Description:

```text
Разбираем вопросы юридического адреса и сведений компании в Симферополе.

Подходит, если нужно понять:
— какие документы по адресу уже есть;
— что нужно подтвердить;
— связан ли вопрос с регистрацией ООО;
— есть ли изменения в ЕГРЮЛ;
— есть ли риск или отметка по адресу.

Сначала смотрим исходную ситуацию, затем определяем маршрут и состав документов. Не обещаем внешнее решение без разбора.

Напишите в чат Авито или позвоните. Скажите: «Юридический адрес».
```

Photo brief:

- cover: office/address-related neutral image;
- optional: safe exterior/landmark photo if owner-approved;
- no private premises info beyond approved public address.

Forbidden wording:

```text
адрес без проверки
адрес без рисков
ФНС точно примет
массовый адрес без последствий
```

---

## 6. Promotion setup inside Avito

The names of paid tools can change in Avito. Treat the following as a decision framework rather than a claim about exact button names.

### 6.1 Initial launch mode

Because `paidTrafficAllowed` is false in the site repository, the first launch mode is:

```text
Mode: organic/staged pilot
Duration: 14 days
Listings: 4
Paid boosts: none or one owner-approved light test after first data
Budget cap: owner-approved small test budget only
Goal: prove lead quality and source capture, not maximize views
```

### 6.2 When paid promotion can be used

Paid promotion may be used only if all conditions are true:

- owner approved payment and budget;
- listing text passed safety review;
- price display is owner-approved;
- profile photos are owner-approved;
- operator can answer chats/calls quickly;
- manual lead log is ready;
- no PII appears in UTM or analytics labels;
- no false guarantees appear in the listing;
- the listing already received some organic data or has a clear reason for testing.

### 6.3 Promotion decision tree

1. Publish all four listings without aggressive paid promotion.
2. Wait for moderation and first views.
3. If there are zero views after 48-72 hours, check category, geo, title and photos before paying.
4. If there are views but no contacts, improve the first photo and first 250 characters of the description.
5. If there are contacts but they are unqualified, narrow wording and remove broad phrases.
6. If one listing gets qualified leads, test one light paid boost only for that listing.
7. If paid test produces qualified leads at acceptable cost, extend for another 7 days.
8. If paid test produces spam/price-only leads, pause promotion and revise listing.

### 6.4 Suggested 14-day budget logic

Use exact numbers only after owner approval. The budget below is a planning model.

| Period | Action | Budget rule | Decision |
|---|---|---|---|
| Day 0 | Setup, profile, photos, listings | no scale spend | approve or hold |
| Days 1-3 | Publish and observe | no paid boost unless required | fix moderation/category |
| Days 4-7 | Improve photos/titles | small spend only if owner approves | choose best listing |
| Days 8-14 | One light boost test | cap by owner | keep/pause/scale |
| Day 15 | Review | no automatic renewal | decide stage 2 |

Recommended first boost candidate order:

1. `bank_request` if urgent qualified leads appear.
2. `registraciya_ooo` if registration demand is clear.
3. `legal_address` if local address demand appears.
4. `registraciya_ip` if ИП leads are qualified and not price-only.

### 6.5 What not to do

Do not:

- boost all listings at once;
- buy the most expensive option before organic data;
- use low-price bait;
- publish duplicate listings with the same text;
- rotate titles daily without tracking;
- hide source by sending users directly to untracked phone/chat;
- direct users to send sensitive documents in Avito chat;
- push people into external messengers before source and topic are logged.

---

## 7. UTM and site integration

### 7.1 UTM naming convention

Use stable, lowercase, non-PII labels.

Base pattern:

```text
utm_source=avito
utm_medium=listing
utm_campaign=avito_stage1_simferopol
utm_content=<listing_key>_01
from=avito
```

Allowed listing keys:

```text
registraciya_ooo_01
registraciya_ip_01
bank_request_01
legal_address_01
```

Stage 2 examples:

```text
ifns_request_01
bank_115fz_docs_01
deklaraciya_usn_01
zero_report_ooo_01
zero_report_ip_01
change_address_ooo_01
accounting_recovery_01
```

### 7.2 Approved Stage 1 URLs

```text
https://dokumenty82.ru/registraciya-ooo/?utm_source=avito&utm_medium=listing&utm_campaign=avito_stage1_simferopol&utm_content=registraciya_ooo_01&from=avito
https://dokumenty82.ru/registraciya-ip/?utm_source=avito&utm_medium=listing&utm_campaign=avito_stage1_simferopol&utm_content=registraciya_ip_01&from=avito
https://dokumenty82.ru/otvet-na-zapros-banka/?utm_source=avito&utm_medium=listing&utm_campaign=avito_stage1_simferopol&utm_content=bank_request_01&from=avito
https://dokumenty82.ru/yuridicheskiy-adres-simferopol/?utm_source=avito&utm_medium=listing&utm_campaign=avito_stage1_simferopol&utm_content=legal_address_01&from=avito
```

### 7.3 If Avito blocks links or hides URLs

If the platform does not allow clickable links in the listing:

1. Keep the website in the profile if the profile field allows it.
2. Ask the operator to manually log the source and listing.
3. Use call script: `Вы нашли нас на Авито? По какому объявлению?`
4. Watch for branded/direct traffic in Metrica as an indirect signal.
5. Do not bypass platform rules with broken links or masked URLs.

### 7.4 Metrica and goal checks

For site visits from Avito links, check:

- sessions with `utm_source=avito`;
- route visits by landing page;
- call click events if available;
- docs-show click events if available;
- situation-review CTA clicks;
- bounce/engagement by landing page;
- branded/direct visits during the pilot.

Because live forms are disabled, do not count form submission success as an Avito KPI.

---

## 8. Manual lead log

Until CRM is enabled, every lead is logged manually.

Create a spreadsheet or CRM draft with these columns:

```text
date
time
operator
source
listing_key
lead_topic
contact_type
client_type
city
urgency
documents_available
question_summary_safe
next_step
quality
appointment_status
cost_spend_to_date
notes_no_pii
```

Allowed `source` values:

```text
avito_call
avito_chat
avito_profile
avito_unknown
```

Allowed `listing_key` values:

```text
registraciya_ooo
registraciya_ip
bank_request
legal_address
ifns_request
bank_115fz_docs
deklaraciya_usn
zero_report_ooo
zero_report_ip
change_address_ooo
accounting_recovery
unknown
```

Allowed `quality` values:

```text
qualified
unclear
unqualified
spam
wrong_region
price_only
duplicate
```

Safe `question_summary_safe` examples:

```text
ООО registration, asks about address and tax regime
Bank request, documents partial, urgent this week
Legal address question, existing ООО, needs route review
```

Unsafe notes, do not write:

```text
Иван Иванов, phone ..., INN ..., bank ..., passport ..., exact request text ...
```

---

## 9. Sales and response scripts

### 9.1 First Avito chat reply

```text
Здравствуйте. Напишите, пожалуйста, по какому вопросу: регистрация ООО/ИП, запрос банка, юридический адрес или другое.

Для старта достаточно кратко описать ситуацию. Документы и персональные данные в чат лучше не отправлять — сначала подскажем безопасный способ передачи и перечень того, что действительно нужно.
```

### 9.2 Phone intake

```text
Здравствуйте. Уточню, вы нашли нас на Авито?

По какому объявлению обращаетесь: регистрация ООО, регистрация ИП, запрос банка или юридический адрес?

Сначала разберём вводные и состав документов, после этого будет понятно, какой следующий шаг нужен.
```

### 9.3 Price-only lead

```text
Точную стоимость и состав работ можно назвать только после вводных и понимания документов. Если удобно, коротко опишите ситуацию: что нужно сделать, какие документы уже есть и есть ли срок. После этого скажем, какой следующий шаг возможен.
```

### 9.4 Urgent request

```text
Понимаю, что вопрос срочный. Чтобы не дать неправильный ответ, сначала нужно понять, какой документ или запрос у вас на руках и какой срок указан. В чат не отправляйте чувствительные данные — опишите тип документа и срок, дальше согласуем безопасный порядок разбора.
```

### 9.5 Bank request

```text
По запросу банка сначала важно понять, что именно банк просит подтвердить: операцию, контрагента, договор, платежи или деловую цель. Мы не обещаем решение банка, но можем помочь структурировать документы и пояснения под вашу ситуацию.
```

### 9.6 Legal address

```text
По юридическому адресу сначала смотрим, какая задача: регистрация, смена адреса, подтверждение сведений или риск недостоверности. После этого определяем, какие документы нужны и какой маршрут безопаснее.
```

### 9.7 Sensitive documents reminder

```text
Пожалуйста, не отправляйте в открытый чат паспорта, банковские документы, полные реквизиты, ИНН/ОГРН и другие чувствительные материалы. Сначала согласуем безопасный порядок передачи и перечень документов.
```

### 9.8 Bad-fit polite refusal

```text
Похоже, что ваш вопрос выходит за наш текущий формат или требует другого специалиста. Чтобы не вводить вас в заблуждение, не будем обещать результат. Можем подсказать, какой тип специалиста или документа вам стоит искать.
```

### 9.9 Review request after completed work

```text
Спасибо, что обратились. Если вам было удобно работать с нами, будем благодарны за честный отзыв на Авито — это помогает другим предпринимателям понять, как мы работаем с документами.
```

Never buy, script, pressure or trade for positive reviews.

---

## 10. SEO support through Avito

Avito supports the site indirectly. It should not be used for artificial backlink manipulation.

### 10.1 What helps SEO and conversion quality

- NAP consistency: same name, phone, address and city as the site.
- Long-tail coverage: listing titles match real service queries.
- Freshness: profile photos, active listings and updated descriptions.
- Trust: honest reviews, fast responses and clear profile.
- Behavioral demand: users see Avito, then search the brand or open the site.
- Landing relevance: each listing points to a matching page, not just the homepage.

### 10.2 What can harm SEO/trust

- inconsistent phone/address/name;
- low-quality duplicate listings;
- aggressive claims and guarantees;
- fake reviews;
- low prices that conflict with later conversation;
- linking to wrong pages;
- external links placed in violation of platform rules;
- client documents visible in photos/screens.

### 10.3 Landing page pairing rule

Each Avito listing must point to the closest matching route:

```text
Registration ООО -> /registraciya-ooo/
Registration ИП -> /registraciya-ip/
Bank request -> /otvet-na-zapros-banka/
Legal address -> /yuridicheskiy-adres-simferopol/
```

Do not send all listings to `/` unless Avito does not allow separate links.

---

## 11. Metrics and KPI

### 11.1 Daily dashboard

Track daily:

```text
listing_views
profile_views
chats
calls
missed_calls
site_clicks_if_available
qualified_leads
unclear_leads
unqualified_leads
spam_leads
appointments
source_capture_rate
average_response_time
spend
```

### 11.2 Weekly formulas

```text
contact_rate = (chats + calls) / listing_views
qualified_rate = qualified_leads / (chats + calls)
appointment_rate = appointments / qualified_leads
cost_per_contact = spend / (chats + calls)
cost_per_qualified_lead = spend / qualified_leads
source_capture_rate = leads_with_source_and_listing / total_leads
```

### 11.3 Minimum success criteria for Stage 1

After 14 days, the pilot is acceptable if:

- at least 90% of Avito leads have a captured source and listing key;
- there is at least one qualified lead from any listing, or enough data to improve wording;
- spam/unqualified share is not dominant after corrections;
- operator response time is controlled;
- no unsafe document transfer occurred;
- no false price/guarantee claim was published;
- owner can identify which listing to keep, pause or boost.

### 11.4 Stop signals

Stop or pause if:

- platform requires unsafe price/guarantee wording;
- unqualified leads dominate after two rounds of copy correction;
- source is not captured;
- operator cannot respond quickly;
- reviews/rating risk appears;
- users expect legal/financial guarantees outside the service scope;
- paid promotion spends without qualified contacts;
- any PII appears in public listing photos, descriptions, UTM or screenshots.

---

## 12. Review management

### 12.1 Good review workflow

1. Complete the interaction or service.
2. Make sure the client is satisfied or at least not in conflict.
3. Ask once for an honest review.
4. Do not ask for a specific rating.
5. Do not offer reward for positive review.
6. If review appears, thank briefly.
7. If review is negative, respond calmly and move details to private channel without exposing PII.

### 12.2 Negative review response template

```text
Здравствуйте. Спасибо за обратную связь. Нам важно разобраться в ситуации, но в публичном ответе мы не можем обсуждать документы и персональные данные. Пожалуйста, свяжитесь с нами по телефону профиля или в чате Авито — проверим обращение и постараемся корректно разобраться.
```

### 12.3 Review risk rules

Never:

- buy reviews;
- create fake accounts;
- ask relatives/employees for fake reviews;
- threaten users;
- expose client documents or personal data in replies;
- argue emotionally in public.

---

## 13. Risk and compliance checklist

### 13.1 Platform moderation risks

- Wrong category.
- Duplicate listings.
- Prohibited guarantees.
- Suspicious price display.
- External links where not allowed.
- Photos with readable personal data.
- Claims implying affiliation with government bodies or banks.

Mitigation: category check, owner approval, safe wording, no PII visuals, moderation screenshot archive.

### 13.2 Legal and advertising risks

This manual is not legal advice. Before scaled paid promotion, owner should review current legal requirements for advertising, online advertising marking and platform rules.

Operational safe defaults:

- avoid misleading claims;
- identify the service clearly;
- do not impersonate tax office, bank, registrar or government body;
- do not use official emblems/logos unless legally permitted;
- do not cold-message users outside Avito without consent;
- do not publish client data or document examples;
- keep payment/receipt documents for Avito spend if the business needs accounting proof.

### 13.3 Data safety risks

Main risk: users may send sensitive documents through Avito chat.

Required mitigation:

- every listing says not to send sensitive documents first;
- first chat reply repeats this;
- operator offers safe transfer only after deciding what is needed;
- no public upload is enabled on the site;
- no CRM live submit is enabled until approved.

---

## 14. Operating calendar

### Day -3 to Day -1: preparation

- [ ] Owner approves this manual.
- [ ] Owner approves profile NAP.
- [ ] Owner approves profile description.
- [ ] Owner approves account phone/email.
- [ ] Owner approves price-display approach.
- [ ] Prepare photos.
- [ ] Prepare manual lead log.
- [ ] Prepare response scripts.
- [ ] Check current Avito categories and publication rules.

### Day 0: account and profile setup

- [ ] Register/login.
- [ ] Secure account.
- [ ] Fill profile.
- [ ] Add avatar/logo.
- [ ] Add photos.
- [ ] Add website only if allowed.
- [ ] Set notifications.
- [ ] Verify profile if owner approves.
- [ ] Screenshot profile draft before publication.

### Day 1: publish Stage 1 listings

- [ ] Create `registraciya_ooo` listing.
- [ ] Create `registraciya_ip` listing.
- [ ] Create `bank_request` listing.
- [ ] Create `legal_address` listing.
- [ ] Add UTM links where allowed.
- [ ] Screenshot each listing draft.
- [ ] Submit for moderation.
- [ ] Record publication/moderation status.

### Days 2-3: moderation and first signal review

- [ ] Fix moderation comments.
- [ ] Check views and contacts.
- [ ] Check source capture.
- [ ] Confirm operator response SLA.
- [ ] Do not boost yet unless owner approves a tiny test.

### Days 4-7: optimization pass 1

- [ ] Compare views by listing.
- [ ] Compare contact rate.
- [ ] Compare lead quality.
- [ ] Rewrite first 250 characters where needed.
- [ ] Replace weak cover photos.
- [ ] Pause obviously bad listing if it attracts wrong intent.

### Days 8-14: controlled promotion test

- [ ] Choose only one listing for light boost.
- [ ] Confirm owner budget cap.
- [ ] Start short paid test.
- [ ] Track spend daily.
- [ ] Stop if no qualified leads.
- [ ] Keep if qualified contacts are acceptable.

### Day 15: owner review

- [ ] Summarize metrics.
- [ ] Choose keep/pause/scale per listing.
- [ ] Decide Stage 2 candidate.
- [ ] Decide whether to keep `avito` as `STAGED` or create a new issue for owner-approved status change.

---

## 15. Owner approval checklist

Publication is allowed only after all are true:

- [ ] Profile name is approved.
- [ ] Phone and address match the site.
- [ ] Description is approved.
- [ ] Photos are approved and contain no PII.
- [ ] Four listing texts are approved.
- [ ] Price fields are approved or held.
- [ ] UTM links contain no PII.
- [ ] Response scripts are ready.
- [ ] Lead log is ready.
- [ ] Operator knows source-capture script.
- [ ] Budget cap is approved.
- [ ] Review policy is approved.
- [ ] Stop signals are understood.

---

## 16. Codex task pack

Use this prompt in Codex when asking it to validate repository readiness:

```text
Изучи репозиторий elena70semen/dokumenty82-site и документы:
- docs/marketing/avito-promotion-contour-v1.md
- docs/marketing/avito-campaign-codex-setup-v1.md

Нужно проверить техническую готовность сайта к контролируемому Avito-пилоту без включения live forms/CRM/paidTrafficAllowed/localProfilesPublic. Не менять публичные обещания, цены, feature flags и маршруты без отдельного owner approval.

Проверь:
1. В lib/channels/sales-channel-registry.mjs канал avito остаётся STAGED.
2. У Avito разрешены только routes: /registraciya-ooo/, /registraciya-ip/, /otvet-na-zapros-banka/, /yuridicheskiy-adres-simferopol/.
3. allowedCtaLabels соответствуют: Позвонить, Показать документы, Разобрать ситуацию.
4. UTM/from параметры из avito-campaign-codex-setup-v1.md используют только safeTrackingParamKeys и не содержат PII.
5. scripts/check-tracking-no-pii.mjs остаётся зелёным.
6. scripts/check-forms-crm-contract.mjs остаётся зелёным, формы не отправляют payload и не имеют upload.
7. service-pricing-matrix.ts не публикует цены и не нарушает HOLD.
8. docs/evidence можно дополнить чек-листом, если это помогает owner go/no-go.

Запусти или опиши ожидаемый результат:
- npm run evidence:sales-channels
- npm run check:sales-channels
- npm run check:tracking-no-pii
- npm run check:forms-crm-contract
- npm run check:finalization

Вывод: список найденных рисков, список безопасных изменений документации, подтверждение что no-PII/no-live-forms gates сохранены.
```

---

## 17. Definition of done

The Avito campaign setup document is complete when:

- [ ] this markdown file exists in `docs/marketing/`;
- [ ] issue `#31` references it or is updated with it;
- [ ] operator can set up the Avito account using only this manual;
- [ ] four Stage 1 listings are ready to paste;
- [ ] UTM links are ready;
- [ ] lead log columns are defined;
- [ ] response scripts are ready;
- [ ] owner approval checklist is explicit;
- [ ] Codex prompt is included;
- [ ] repository guardrails are explicit;
- [ ] no instruction asks to enable closed feature gates.

---

## 18. Future improvements after the pilot

Create separate issues only after the pilot:

1. Avito Stage 2 listing expansion.
2. Avito lead-log template as CSV in `/docs/marketing/templates/`.
3. Owner-approved visual checklist with actual filenames/screenshots.
4. Evidence generator for Avito launch proof.
5. Avito source value split: `avito_call`, `avito_chat`, `avito_profile`.
6. Metrica report note for `utm_source=avito`.
7. Public site copy adjustment only if real Avito queries show repeated intent gaps.
8. Review/rating operating policy after first completed jobs.
