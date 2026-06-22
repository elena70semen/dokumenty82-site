# P1-03 Ad Readiness Site Actions Proof Summary

Checked at: `2026-06-22T11:18:09.788Z`
Branch: `codex/p1-03-ad-readiness-site-actions-audit`
Commit: `493b28d docs: add owner decision intake`
Repository mode: `CURRENT_MAIN_STATIC_SNAPSHOT`
Final verdict: `AD_READINESS_ACTIONS_AUDIT_COMPLETE_NO_GO`
Deploy status: `DEPLOY_NOT_REQUIRED_EVIDENCE_ONLY`
Paid traffic: `HOLD`

## Counts

- Built routes: 38
- Sitemap routes: 30
- Pages audited: 40
- Actions audited: 1607
- Broken links: 0
- Runtime forbidden failing findings: 0

## Limited-Test Candidates

- `/`
- `/kontakty/`
- `/razbor-situacii/`

## Ready With Copy Review

- `/adres-egryul-direktor/`
- `/bank-i-115-fz/`
- `/deklaraciya-usn/`
- `/dokumenty-dlya-banka-115-fz/`
- `/kadry/`
- `/likvidaciya-ooo/`
- `/nedostovernost-yuridicheskogo-adresa/`
- `/nulevaya-otchetnost-ip/`
- `/nulevaya-otchetnost-ooo/`
- `/otchetnost/`
- `/otvet-na-trebovanie-ifns/`
- `/otvet-na-zapros-banka/`
- `/registraciya-i-likvidaciya/`
- `/registraciya-ip/`
- `/registraciya-ooo/`
- `/smena-direktora-ooo/`
- `/smena-yuridicheskogo-adresa-ooo/`
- `/soprovozhdenie/`
- `/srochnye-voprosy/`
- `/vosstanovlenie-buhucheta/`
- `/yuridicheskiy-adres-simferopol/`

## Global Blockers

- `OWNER_GO_NOT_GIVEN`
- `PAID_TRAFFIC_HOLD`
- `DEPLOY_SOURCE_PARTIALLY_PROVEN`
- `METRIKA_WEBVISOR_OWNER_LEGAL_DECISION_REQUIRED`
- `METRIKA_ECOMMERCE_OWNER_LEGAL_DECISION_REQUIRED`
- `SOURCE_REGISTRY_ROUTES_NOT_IN_CURRENT_STATIC_CONTOUR`

## Tracking / Privacy State

- metrikaCounter: `109869928_PRESENT`
- cookieNotice: `PRESENT`
- policyDisclosure: `PRESENT`
- reachGoal: `PRESENT_NEEDS_LK_CONFIRMATION`
- getClientID: `ABSENT`
- webvisor: `PRESENT_OWNER_LEGAL_DECISION_REQUIRED`
- ecommerce: `PRESENT_OWNER_LEGAL_DECISION_REQUIRED`
- tagManager: `ABSENT`
- offlineConversions: `ABSENT`
- formSubmitSuccessGoal: `DOCUMENTED_DISABLED_IN_POLICY`

## Forms / CRM / Upload

- formsLive: `PLACEHOLDER_FORMS_ONLY`
- crm: `NO_CRM_WEBHOOK_FOUND`
- upload: `NO_PUBLIC_UPLOAD`
- falseSuccess: `NO_FALSE_SUCCESS_FOUND`

## Pages Checked

| Route | Type | Exists | H1 | CTA | Phone | Policy | Status | Risks |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| / | home | yes | Документы для бизнеса в Симферополе | Разобрать ситуацию | yes | yes | READY_FOR_LIMITED_AD_TEST | global owner/legal/Metrika/deploy gates still required |
| /_not-found/ | system | yes | Страница не найдена | Разобрать ситуацию | yes | yes | NOT_READY_FOR_AD_TRAFFIC | not indexable; canonical mismatch |
| /404/ | system | yes | Страница не найдена | Разобрать ситуацию | yes | yes | NOT_READY_FOR_AD_TRAFFIC | not indexable; canonical mismatch |
| /adres-egryul-direktor/ | hub | yes | Адрес, ЕГРЮЛ и изменения в компании | Разобрать ситуацию | yes | yes | READY_WITH_COPY_REVIEW | commercial/sensitive page requires narrow ad copy and legal review |
| /ausn-krym/ | diagnostic | yes | Подходит ли АУСН в Крыму | Разобрать ситуацию | yes | yes | HOLD_DO_NOT_USE_AS_LANDING | tax/legal advice moderation and owner/legal review required |
| /bank-i-115-fz/ | hub | yes | Документы для банка и запросов по 115-ФЗ | Разобрать ситуацию | yes | yes | READY_WITH_COPY_REVIEW | bank/115-FZ copy must avoid unlock/approval guarantees |
| /blog/ | blog | yes | Блог и новости | Разобрать ситуацию | yes | yes | INTERNAL_OR_NOINDEX_DO_NOT_USE | support/content/internal page, not an ad landing |
| /blog/obnovleniya-fns/ | blog | yes | Обновления ФНС | Разобрать ситуацию | yes | yes | INTERNAL_OR_NOINDEX_DO_NOT_USE | support/content/internal page, not an ad landing |
| /blog/razbory/ | blog | yes | Разборы ситуаций | Разобрать ситуацию | yes | yes | INTERNAL_OR_NOINDEX_DO_NOT_USE | support/content/internal page, not an ad landing |
| /deklaraciya-usn/ | money | yes | Декларация УСН в Симферополе | Разобрать ситуацию | yes | yes | READY_WITH_COPY_REVIEW | commercial/sensitive page requires narrow ad copy and legal review |
| /dokumenty-dlya-banka-115-fz/ | money | yes | Документы для банка по 115-ФЗ | Разобрать ситуацию | yes | yes | READY_WITH_COPY_REVIEW | bank/115-FZ copy must avoid unlock/approval guarantees |
| /faq/ | faq | yes | Частые вопросы по документам | Разобрать ситуацию | yes | yes | INTERNAL_OR_NOINDEX_DO_NOT_USE | support/content/internal page, not an ad landing |
| /internal/ | internal | no |  | MISSING | no | no | BROKEN_DO_NOT_USE | route is missing in current static snapshot |
| /internal/graphics-proof/ | internal | yes | Internal graphics applied to real site HTML | Разобрать ситуацию | yes | yes | INTERNAL_OR_NOINDEX_DO_NOT_USE | support/content/internal page, not an ad landing |
| /internal/visual-detail-kit/ | internal | yes | Stage11A visual detail kit for production pages | Разобрать ситуацию | yes | yes | INTERNAL_OR_NOINDEX_DO_NOT_USE | support/content/internal page, not an ad landing |
| /kadry/ | hub | yes | Кадровые документы для бизнеса | Разобрать ситуацию | yes | yes | READY_WITH_COPY_REVIEW | commercial/sensitive page requires narrow ad copy and legal review |
| /kontakty/ | contact | yes | Контакты и передача документов | Разобрать ситуацию | yes | yes | READY_FOR_LIMITED_AD_TEST | global owner/legal/Metrika/deploy gates still required |
| /likvidaciya-ooo/ | money | yes | Ликвидация ООО | Разобрать ситуацию | yes | yes | READY_WITH_COPY_REVIEW | commercial/sensitive page requires narrow ad copy and legal review |
| /nalogi-i-rezhimy/ | hub | yes | Налоги и режимы для бизнеса | Разобрать ситуацию | yes | yes | HOLD_DO_NOT_USE_AS_LANDING | tax/legal advice moderation and owner/legal review required |
| /nds-pri-usn-2026/ | diagnostic | yes | НДС при УСН в 2026 году | Разобрать ситуацию | yes | yes | HOLD_DO_NOT_USE_AS_LANDING | tax/legal advice moderation and owner/legal review required |
| /nedostovernost-yuridicheskogo-adresa/ | money | yes | Недостоверность юридического адреса: что проверить | Разобрать ситуацию | yes | yes | READY_WITH_COPY_REVIEW | commercial/sensitive page requires narrow ad copy and legal review |
| /news/ | unknown | no |  | MISSING | no | no | BROKEN_DO_NOT_USE | route is missing in current static snapshot |
| /nulevaya-otchetnost-ip/ | money | yes | Нулевая отчетность ИП | Разобрать ситуацию | yes | yes | READY_WITH_COPY_REVIEW | commercial/sensitive page requires narrow ad copy and legal review |
| /nulevaya-otchetnost-ooo/ | money | yes | Нулевая отчетность ООО | Разобрать ситуацию | yes | yes | READY_WITH_COPY_REVIEW | commercial/sensitive page requires narrow ad copy and legal review |
| /o-proekte/ | about | yes | Локальный центр подготовки документов | Разобрать ситуацию | yes | yes | HOLD_DO_NOT_USE_AS_LANDING | support/content/internal page, not an ad landing |
| /otchetnost/ | hub | yes | Отчётность и налоговые документы | Разобрать ситуацию | yes | yes | READY_WITH_COPY_REVIEW | commercial/sensitive page requires narrow ad copy and legal review |
| /otvet-na-trebovanie-ifns/ | money | yes | Ответ на требование ИФНС | Разобрать ситуацию | yes | yes | READY_WITH_COPY_REVIEW | commercial/sensitive page requires narrow ad copy and legal review |
| /otvet-na-zapros-banka/ | money | yes | Ответ на запрос банка | Разобрать ситуацию | yes | yes | READY_WITH_COPY_REVIEW | bank/115-FZ copy must avoid unlock/approval guarantees |
| /policy/ | policy | yes | Политика конфиденциальности и обработки данных | Разобрать ситуацию | yes | yes | HOLD_DO_NOT_USE_AS_LANDING | support/content/internal page, not an ad landing |
| /raschet-nalogovoy-nagruzki/ | diagnostic | yes | Расчет налоговой нагрузки | Разобрать ситуацию | yes | yes | HOLD_DO_NOT_USE_AS_LANDING | tax/legal advice moderation and owner/legal review required |
| /razbor-situacii/ | situation_review | yes | Разберём ситуацию и подскажем документальный маршрут | Разобрать ситуацию | yes | yes | READY_FOR_LIMITED_AD_TEST | global owner/legal/Metrika/deploy gates still required |
| /registraciya-i-likvidaciya/ | hub | yes | Регистрация и ликвидация бизнеса | Разобрать ситуацию | yes | yes | READY_WITH_COPY_REVIEW | commercial/sensitive page requires narrow ad copy and legal review |
| /registraciya-ip/ | money | yes | Регистрация ИП в Симферополе | Разобрать ситуацию | yes | yes | READY_WITH_COPY_REVIEW | commercial/sensitive page requires narrow ad copy and legal review |
| /registraciya-ooo/ | money | yes | Регистрация ООО в Симферополе | Разобрать ситуацию | yes | yes | READY_WITH_COPY_REVIEW | commercial/sensitive page requires narrow ad copy and legal review |
| /smena-direktora-ooo/ | money | yes | Смена директора ООО | Разобрать ситуацию | yes | yes | READY_WITH_COPY_REVIEW | commercial/sensitive page requires narrow ad copy and legal review |
| /smena-yuridicheskogo-adresa-ooo/ | money | yes | Смена юридического адреса ООО | Разобрать ситуацию | yes | yes | READY_WITH_COPY_REVIEW | commercial/sensitive page requires narrow ad copy and legal review |
| /soprovozhdenie/ | hub | yes | Сопровождение бизнеса по документам | Разобрать ситуацию | yes | yes | READY_WITH_COPY_REVIEW | commercial/sensitive page requires narrow ad copy and legal review |
| /srochnye-voprosy/ | hub | yes | Срочные и неясные вопросы по документам | Разобрать ситуацию | yes | yes | READY_WITH_COPY_REVIEW | urgent-intent copy must avoid deadline/result promises |
| /vosstanovlenie-buhucheta/ | money | yes | Восстановление бухучёта | Разобрать ситуацию | yes | yes | READY_WITH_COPY_REVIEW | commercial/sensitive page requires narrow ad copy and legal review |
| /yuridicheskiy-adres-simferopol/ | money | yes | Юридический адрес в Симферополе | Разобрать ситуацию | yes | yes | READY_WITH_COPY_REVIEW | commercial/sensitive page requires narrow ad copy and legal review |

## Actions Checked

| Source | Label | Target | Kind | Result | Notes |
| --- | --- | --- | --- | --- | --- |
| / | политика конфиденциальности | /policy/ | link | OK |  |
| / | Перейти к содержанию | #main-content | link | OK |  |
| / | Документы для бизнеса Центр подготовки документов | / | link | OK |  |
| / | Разбор ситуации | /razbor-situacii/ | link | OK |  |
| / | Документы | /#documents | link | OK |  |
| / | Отчётность | /otchetnost/ | link | OK |  |
| / | Банк и 115-ФЗ | /bank-i-115-fz/ | link | OK |  |
| / | Блог | /blog/ | link | OK |  |
| / | Новости | /blog/obnovleniya-fns/ | link | OK |  |
| / | О нас | /o-proekte/ | link | OK |  |
| / | Контакты | /kontakty/ | link | OK |  |
| / | Разобрать ситуацию | /razbor-situacii/ | link | OK |  |
| / | +7 (978) 998-72-22 | tel:+79789987222 | link | OK |  |
| / | Разбор ситуации | /razbor-situacii/ | link | OK |  |
| / | Документы | /#documents | link | OK |  |
| / | Отчётность | /otchetnost/ | link | OK |  |
| / | Банк и 115-ФЗ | /bank-i-115-fz/ | link | OK |  |
| / | Блог | /blog/ | link | OK |  |
| / | Новости | /blog/obnovleniya-fns/ | link | OK |  |
| / | О нас | /o-proekte/ | link | OK |  |
| / | Контакты | /kontakty/ | link | OK |  |
| / | Разобрать ситуацию | /razbor-situacii/ | link | OK |  |
| / | +7 (978) 998-72-22 | tel:+79789987222 | link | OK |  |
| / | Разобрать ситуацию | /razbor-situacii/ | link | OK |  |
| / | Показать документы | #documents | link | OK |  |
| / | Пришло требование или письмо Сначала смотрим документ, период и что именно нужно ответить. → | /otvet-na-trebovanie-ifns/ | link | OK |  |
| / | Банк запросил документы Разбираем запрос и собираем понятный комплект подтверждений. → | /otvet-na-zapros-banka/ | link | OK |  |
| / | Нужна отчётность Фиксируем период, режим и исходные документы перед маршрутом. → | /otchetnost/ | link | OK |  |
| / | Неясно, с чего начать Выберем направление без угадывания названия услуги. → | /razbor-situacii/ | link | OK |  |
| / | Разобрать ситуацию | /razbor-situacii/ | link | OK |  |
| / | Разобрать ситуацию | /otchetnost/ | link | OK |  |
| / | Разобрать ситуацию | /bank-i-115-fz/ | link | OK |  |
| / | Разобрать ситуацию | /registraciya-i-likvidaciya/ | link | OK |  |
| / | Разобрать ситуацию | /kadry/ | link | OK |  |
| / | Разобрать ситуацию | /soprovozhdenie/ | link | OK |  |
| / | +7 (978) 998-72-22 | tel:+79789987222 | link | OK |  |
| / | Позвонить | tel:+79789987222 | link | OK |  |
| / | Построить маршрут | /kontakty/ | link | OK |  |
| / | Разобрать ситуацию | /razbor-situacii/ | link | OK |  |
| / | Документы для бизнеса Центр подготовки документов | / | link | OK |  |
| / | Разбор ситуации | /razbor-situacii/ | link | OK |  |
| / | Документы | /#documents | link | OK |  |
| / | Отчётность | /otchetnost/ | link | OK |  |
| / | Банк и 115-ФЗ | /bank-i-115-fz/ | link | OK |  |
| / | Контакты | /kontakty/ | link | OK |  |
| / | Политика конфиденциальности | /policy/ | link | OK |  |
| / | +7 (978) 998-72-22 | tel:+79789987222 | link | OK |  |
| / | Позвонить | tel:+79789987222 | link | OK |  |
| / | Построить маршрут | /kontakty/ | link | OK |  |
| / | Понятно |  | button | OK |  |
| / | ↑ |  | button | OK |  |
| / | ↓ |  | button | OK |  |
| /_not-found/ | политика конфиденциальности | /policy/ | link | OK |  |
| /_not-found/ | Перейти к содержанию | #main-content | link | OK |  |
| /_not-found/ | Документы для бизнеса Центр подготовки документов | / | link | OK |  |
| /_not-found/ | Разбор ситуации | /razbor-situacii/ | link | OK |  |
| /_not-found/ | Документы | /#documents | link | OK |  |
| /_not-found/ | Отчётность | /otchetnost/ | link | OK |  |
| /_not-found/ | Банк и 115-ФЗ | /bank-i-115-fz/ | link | OK |  |
| /_not-found/ | Блог | /blog/ | link | OK |  |
| /_not-found/ | Новости | /blog/obnovleniya-fns/ | link | OK |  |
| /_not-found/ | О нас | /o-proekte/ | link | OK |  |
| /_not-found/ | Контакты | /kontakty/ | link | OK |  |
| /_not-found/ | Разобрать ситуацию | /razbor-situacii/ | link | OK |  |
| /_not-found/ | +7 (978) 998-72-22 | tel:+79789987222 | link | OK |  |
| /_not-found/ | Разбор ситуации | /razbor-situacii/ | link | OK |  |
| /_not-found/ | Документы | /#documents | link | OK |  |
| /_not-found/ | Отчётность | /otchetnost/ | link | OK |  |
| /_not-found/ | Банк и 115-ФЗ | /bank-i-115-fz/ | link | OK |  |
| /_not-found/ | Блог | /blog/ | link | OK |  |
| /_not-found/ | Новости | /blog/obnovleniya-fns/ | link | OK |  |
| /_not-found/ | О нас | /o-proekte/ | link | OK |  |
| /_not-found/ | Контакты | /kontakty/ | link | OK |  |
| /_not-found/ | Разобрать ситуацию | /razbor-situacii/ | link | OK |  |
| /_not-found/ | +7 (978) 998-72-22 | tel:+79789987222 | link | OK |  |
| /_not-found/ | На главную | / | link | OK |  |
| /_not-found/ | Документы для бизнеса Центр подготовки документов | / | link | OK |  |
| /_not-found/ | Разбор ситуации | /razbor-situacii/ | link | OK |  |
| /_not-found/ | Документы | /#documents | link | OK |  |
| /_not-found/ | Отчётность | /otchetnost/ | link | OK |  |
| /_not-found/ | Банк и 115-ФЗ | /bank-i-115-fz/ | link | OK |  |
| /_not-found/ | Контакты | /kontakty/ | link | OK |  |
| /_not-found/ | Политика конфиденциальности | /policy/ | link | OK |  |
| /_not-found/ | +7 (978) 998-72-22 | tel:+79789987222 | link | OK |  |
| /_not-found/ | Позвонить | tel:+79789987222 | link | OK |  |
| /_not-found/ | Построить маршрут | /kontakty/ | link | OK |  |
| /_not-found/ | Понятно |  | button | OK |  |
| /_not-found/ | ↑ |  | button | OK |  |
| /_not-found/ | ↓ |  | button | OK |  |
| /404/ | политика конфиденциальности | /policy/ | link | OK |  |
| /404/ | Перейти к содержанию | #main-content | link | OK |  |
| /404/ | Документы для бизнеса Центр подготовки документов | / | link | OK |  |
| /404/ | Разбор ситуации | /razbor-situacii/ | link | OK |  |
| /404/ | Документы | /#documents | link | OK |  |
| /404/ | Отчётность | /otchetnost/ | link | OK |  |
| /404/ | Банк и 115-ФЗ | /bank-i-115-fz/ | link | OK |  |
| /404/ | Блог | /blog/ | link | OK |  |
| /404/ | Новости | /blog/obnovleniya-fns/ | link | OK |  |
| /404/ | О нас | /o-proekte/ | link | OK |  |
| /404/ | Контакты | /kontakty/ | link | OK |  |
| /404/ | Разобрать ситуацию | /razbor-situacii/ | link | OK |  |
| /404/ | +7 (978) 998-72-22 | tel:+79789987222 | link | OK |  |
| /404/ | Разбор ситуации | /razbor-situacii/ | link | OK |  |
| /404/ | Документы | /#documents | link | OK |  |
| /404/ | Отчётность | /otchetnost/ | link | OK |  |
| /404/ | Банк и 115-ФЗ | /bank-i-115-fz/ | link | OK |  |
| /404/ | Блог | /blog/ | link | OK |  |
| /404/ | Новости | /blog/obnovleniya-fns/ | link | OK |  |
| /404/ | О нас | /o-proekte/ | link | OK |  |
| /404/ | Контакты | /kontakty/ | link | OK |  |
| /404/ | Разобрать ситуацию | /razbor-situacii/ | link | OK |  |
| /404/ | +7 (978) 998-72-22 | tel:+79789987222 | link | OK |  |
| /404/ | На главную | / | link | OK |  |
| /404/ | Документы для бизнеса Центр подготовки документов | / | link | OK |  |
| /404/ | Разбор ситуации | /razbor-situacii/ | link | OK |  |
| /404/ | Документы | /#documents | link | OK |  |
| /404/ | Отчётность | /otchetnost/ | link | OK |  |
| /404/ | Банк и 115-ФЗ | /bank-i-115-fz/ | link | OK |  |
| /404/ | Контакты | /kontakty/ | link | OK |  |
| /404/ | Политика конфиденциальности | /policy/ | link | OK |  |

Full JSON: `evidence/ads/ad-readiness-site-actions-proof.json`
