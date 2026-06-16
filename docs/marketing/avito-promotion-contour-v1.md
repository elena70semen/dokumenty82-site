# Avito promotion contour v1

Date: 2026-06-16
Project: `dokumenty82.ru` / "Документы для бизнеса"
Channel owner: owner approval required before public launch
Repository status basis: `lib/channels/sales-channel-registry.mjs`, `lib/pricing/service-pricing-matrix.ts`, `lib/feature-flags.ts`, tracking and forms contracts.

## 1. Purpose

Use Avito as a controlled local-demand channel for services in Simferopol and Crimea while strengthening site SEO and increasing qualified conversions.

The contour is not just "post ads". It must connect:

1. Avito profile and listings.
2. Approved site landing routes.
3. Safe public wording.
4. Manual source capture for calls/chats.
5. Yandex Metrica / safe attribution where site links are used.
6. Lead quality review and budget correction.

## 2. Current launch status

Avito remains `STAGED` until the owner approves profile, listings, photos, response scripts and price/wording gates.

Current repository channel registry:

- channel id: `avito`;
- status: `STAGED`;
- allowed landing routes:
  - `/registraciya-ooo/`;
  - `/registraciya-ip/`;
  - `/otvet-na-zapros-banka/`;
  - `/yuridicheskiy-adres-simferopol/`;
- allowed CTA labels:
  - `Позвонить`;
  - `Показать документы`;
  - `Разобрать ситуацию`;
- attribution: `manual_avito_call_or_avito_chat`;
- CRM source: `avito_call`;
- launch blocker: owner listing/photo/response approval and HOLD gate.

Feature gates that matter for Avito:

- `publicLiveAllowed: true`;
- `metricaEnabled: true`;
- `analyticsEnabled: false`;
- `formsLive: false`;
- `crmEnabled: false`;
- `paidTrafficAllowed: false`;
- `localProfilesPublic: false`.

Implication: start with a controlled organic / minimal paid pilot only after owner approval. Do not turn Avito into a scaled paid channel until source capture, call/chat processing and lead quality reporting are proven.

## 3. SEO role of Avito

Avito should support SEO indirectly:

1. Local brand consistency: repeat the same name, phone, address and service topics as the website.
2. Fresh external mentions: profile updates, live listings, photos, service descriptions, reviews.
3. Behavioral demand: people find the service on Avito, then search the brand/site or visit landing pages.
4. Long-tail query coverage: listings can cover practical phrases like "регистрация ООО Симферополь", "ответ на запрос банка", "юридический адрес Симферополь".
5. Trust layer: reviews and response speed can increase confidence before the user calls or goes to the site.

Do not treat Avito as a link-buying or artificial SEO-link tool. The main value is trust, local visibility, demand capture, profile freshness and conversion feedback.

## 4. NAP and profile data

Use one canonical identity everywhere:

- Name: `Документы для бизнеса`.
- Category wording: `Центр подготовки документов`.
- Domain: `https://dokumenty82.ru`.
- Phone: `+7 (978) 998-72-22`.
- Address: `Республика Крым, Симферополь, ул. им. Мате Залки, 1`.
- Short address: `Симферополь, ул. Мате Залки, 1`.
- Local landmark: `офис рядом с налоговой`.

Profile description:

> Документы для бизнеса в Симферополе. Разбираем ситуацию, смотрим исходные документы и помогаем подготовить понятный комплект для следующего действия: регистрация ИП и ООО, документы по запросу банка, юридический адрес и изменения, отчётность и сопроводительные вопросы. Работаем аккуратно: сначала вводные и документы, затем маршрут и состав работ. Не обещаем результат внешнего органа до изучения ситуации.

Profile safety:

- No public claims like "гарантируем регистрацию", "банк точно примет", "разблокируем счёт", "сделаем сегодня".
- No public upload of sensitive documents through unsafe channels.
- No public price promises while pricing is `HOLD`.
- If Avito requires a price field, owner must approve a compliant display value before publication.

## 5. Stage 1 listings

### Listing 1: Registration ООО

Landing route: `/registraciya-ooo/`

Title options:

- `Регистрация ООО в Симферополе: документы и разбор ситуации`
- `Подготовка документов для регистрации ООО`
- `Регистрация ООО: комплект документов после разбора`

Short description:

> Помогаем подготовить документы для вопроса регистрации ООО в Симферополе. Сначала уточняем вводные: состав участников, адрес, вид деятельности, налоговый режим, наличие исходных документов. После разбора понятно, какой комплект нужен и какие шаги безопасны.

CTA:

> Напишите в чат Авито или позвоните. Скажите: "Регистрация ООО" — зафиксируем источник и подскажем, какие вводные подготовить.

Safe negatives:

- no "без отказа";
- no "гарантируем регистрацию";
- no final price before owner approval.

Tracking URL if profile/link field is available:

```text
https://dokumenty82.ru/registraciya-ooo/?utm_source=avito&utm_medium=listing&utm_campaign=avito_stage1_simferopol&utm_content=registraciya_ooo_01&from=avito
```

### Listing 2: Registration ИП

Landing route: `/registraciya-ip/`

Title options:

- `Регистрация ИП в Симферополе: документы и порядок действий`
- `Подготовка документов для регистрации ИП`
- `Открытие ИП: разбор вводных и комплект документов`

Short description:

> Помогаем разобраться с документами для регистрации ИП: данные заявителя, вид деятельности, налоговый режим, порядок подачи и сопутствующие вопросы. Начинаем с вводных, затем формируем понятный следующий шаг.

Tracking URL:

```text
https://dokumenty82.ru/registraciya-ip/?utm_source=avito&utm_medium=listing&utm_campaign=avito_stage1_simferopol&utm_content=registraciya_ip_01&from=avito
```

### Listing 3: Bank request response

Landing route: `/otvet-na-zapros-banka/`

Title options:

- `Ответ на запрос банка: документы и пояснения`
- `Документы по запросу банка для бизнеса`
- `Запрос банка: разбор ситуации и подготовка пакета`

Short description:

> Если банк запросил документы или пояснения, сначала важно понять, какие факты нужно подтвердить: операция, контрагент, договоры, акты, платежи, деловая цель. Помогаем структурировать материалы и подготовить понятный пакет под реальную ситуацию.

Safe negatives:

- no "банк примет";
- no "разблокируем счёт";
- no promise of external decision.

Tracking URL:

```text
https://dokumenty82.ru/otvet-na-zapros-banka/?utm_source=avito&utm_medium=listing&utm_campaign=avito_stage1_simferopol&utm_content=bank_request_01&from=avito
```

### Listing 4: Legal address / EGRUL

Landing route: `/yuridicheskiy-adres-simferopol/`

Title options:

- `Юридический адрес в Симферополе: документы и разбор`
- `Юридический адрес и сведения ЕГРЮЛ`
- `Документы по юридическому адресу компании`

Short description:

> Разбираем вопросы юридического адреса и сведений компании в Симферополе: какие документы уже есть, что нужно подтвердить, какой маршрут подходит для регистрации, изменения или проверки данных.

Tracking URL:

```text
https://dokumenty82.ru/yuridicheskiy-adres-simferopol/?utm_source=avito&utm_medium=listing&utm_campaign=avito_stage1_simferopol&utm_content=legal_address_01&from=avito
```

## 6. Stage 2 expansion after proof

Expand only after 14 days of clean source capture and lead quality review.

Candidates:

- `/otvet-na-trebovanie-ifns/` — if urgent tax-request leads appear.
- `/dokumenty-dlya-banka-115-fz/` — if bank-request lead quality is good.
- `/deklaraciya-usn/` — if reporting demand appears.
- `/nulevaya-otchetnost-ooo/` and `/nulevaya-otchetnost-ip/` — if reporting queries are frequent.
- `/smena-yuridicheskogo-adresa-ooo/` — if address listing produces change-related questions.

Expansion rule: add one listing at a time, not all at once.

## 7. Budget contour

Because `paidTrafficAllowed` is false, the first stage should not rely on aggressive paid promotion.

Recommended pilot:

- Duration: 14 days.
- Base setup: profile + 4 listings.
- Budget: minimal platform-required placement costs only; if paid promotion is needed, cap at a small test budget approved by owner.
- Do not use heavy boosts until there is evidence that contacts are qualified.
- Do not scale if calls/chats are not logged by source.

Budget decision ladder:

1. Days 1-3: publish / verify / collect first views and contacts.
2. Days 4-7: improve titles, first photo, opening lines, response script.
3. Days 8-14: test one light promotion only for the best-performing listing.
4. After day 14: keep, pause or scale based on qualified contacts and appointments.

## 8. Tracking and manual CRM contract

Required manual fields for every Avito lead:

- `source`: `avito_call` or `avito_chat`.
- `listing`: one of `registraciya_ooo`, `registraciya_ip`, `bank_request`, `legal_address`.
- `lead_topic`: route/service.
- `client_type`: ИП / ООО / физлицо-представитель / unknown.
- `urgency`: today / this week / not urgent.
- `documents_available`: yes / partial / no / unknown.
- `quality`: qualified / unqualified / spam / unclear.
- `next_step`: office visit / call back / document list / no action.

Site attribution allowed by current tracking contract:

- `utm_source`;
- `utm_medium`;
- `utm_campaign`;
- `utm_content`;
- `utm_term`;
- `yclid`;
- `ysclid`;
- `from`.

Do not send PII in UTM or tracking params. Forbidden: phone, name, message, document text, file name, INN, OGRN, passport, bank details, CRM notes.

## 9. Response scripts

### First chat reply

> Здравствуйте. Напишите, пожалуйста, по какому вопросу: регистрация ООО/ИП, запрос банка, юридический адрес или другое. Для старта достаточно кратко описать ситуацию — документы и персональные данные в чат лучше не отправлять, сначала подскажем безопасный способ передачи.

### Call intake

> Уточню, вы нашли нас на Авито? По какому объявлению: регистрация ООО, регистрация ИП, запрос банка или юридический адрес? Сначала разберём вводные и состав документов, после этого будет понятно, какой следующий шаг нужен.

### Bad-fit / price-only lead

> Точную стоимость и состав работ можно назвать только после вводных и понимания документов. Если удобно, сначала коротко опишите ситуацию, а мы скажем, какие материалы нужны для разбора.

### Sensitive-documents reminder

> Не отправляйте в открытый чат паспорта, банковские документы и другие чувствительные материалы. Сначала согласуем безопасный порядок передачи и перечень того, что действительно нужно.

## 10. Metrics

Daily metrics:

- listing views;
- contacts / chats / calls;
- contact rate = contacts / views;
- response time;
- qualified contact count;
- appointment / office visit count;
- source capture completeness;
- spam / irrelevant contacts.

Weekly metrics:

- cost per qualified contact;
- qualified contact to appointment conversion;
- listing-level conversion comparison;
- wording/photo changes and result;
- SEO side-effects: branded searches, direct visits, Avito referral/UTM visits where available, new reviews.

Stop signals:

- platform asks for unsafe price/guarantee wording;
- repeated unqualified leads after title/description correction;
- no source capture;
- negative rating/review risk;
- user expectations differ from service scope.

## 11. Review and rating work

After completed interaction, ask for an honest Avito review only if the client is satisfied and the service was actually delivered.

Approved review request:

> Спасибо, что обратились. Если вам было удобно работать с нами, будем благодарны за честный отзыв на Авито — это помогает другим предпринимателям понять, как мы работаем с документами.

Never:

- buy reviews;
- ask for fake reviews;
- promise discounts for positive reviews;
- pressure the client.

## 12. Site/Codex implementation tasks

No high-risk code changes are needed before publication because the repo already supports safe UTM/from attribution and has no-PII checks.

Codex tasks for a controlled Avito contour:

1. Add Avito to sales-channel evidence comments/reporting copy if needed.
2. Keep `avito` status `STAGED` until owner approval.
3. Do not enable `formsLive`, `crmEnabled`, `paidTrafficAllowed`, `localProfilesPublic` just for Avito.
4. Add a small internal markdown checklist for Avito launch evidence if this document is not enough.
5. Optionally add a static list of Avito UTM templates to docs/evidence, not to public UI.
6. Ensure `npm run check:finalization` remains green.

Codex prompt:

```text
Изучи репозиторий elena70semen/dokumenty82-site и документ docs/marketing/avito-promotion-contour-v1.md. Нужна безопасная подготовка сайта к Avito-каналу без включения live forms/CRM и без передачи PII. Проверь, что текущие approved landing routes для канала avito соответствуют /registraciya-ooo/, /registraciya-ip/, /otvet-na-zapros-banka/, /yuridicheskiy-adres-simferopol/. Проверь, что UTM/from параметры Avito не нарушают scripts/check-tracking-no-pii.mjs и что формы остаются закрытыми по scripts/check-forms-crm-contract.mjs. Если нужно, добавь только документацию/evidence checklist, не меняй публичные обещания, цены, гарантии и feature flags. После изменений запусти или опиши ожидаемый результат: npm run evidence:sales-channels, npm run check:sales-channels, npm run check:tracking-no-pii, npm run check:forms-crm-contract, npm run check:finalization.
```

## 13. Definition of done

Avito contour is ready for owner approval when:

- profile NAP matches site exactly;
- 4 stage-1 listings are drafted;
- each listing has safe wording and no forbidden promises;
- price display is approved or publication is held;
- photos/screens are approved;
- Avito chats/calls have response scripts;
- every lead can be tagged as `avito_call` or `avito_chat`;
- first 14-day pilot budget is capped;
- daily metric table exists;
- owner approves launch.

## 14. First operating checklist

Day 0:

- approve profile fields;
- approve listing wording;
- approve price handling;
- upload photos;
- prepare response scripts;
- prepare lead log.

Days 1-3:

- publish profile/listings;
- check moderation;
- record views and contacts;
- correct unclear titles or categories.

Days 4-7:

- compare 4 listings;
- improve first line and photo;
- pause obviously bad wording;
- keep response time low.

Days 8-14:

- test one light promotion only if contacts are qualified;
- evaluate cost per qualified contact;
- decide keep/pause/scale.
