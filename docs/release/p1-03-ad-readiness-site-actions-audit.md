# P1-03 Ad Readiness Site Actions Audit

## Status

`AD_READINESS_ACTIONS_AUDIT_COMPLETE_NO_GO`

## Scope

This is an audit and evidence task. It does not approve ad launch, paid traffic, CRM, forms, upload, messaging, Yandex Business publication, legal-data publication, deploy, DNS changes or production server changes.

## Inputs

- Branch: `codex/p1-03-ad-readiness-site-actions-audit`
- Commit: `493b28d0849a8c0b62218db3ac23f0f5a04e9159`
- Repository mode: `CURRENT_MAIN_STATIC_SNAPSHOT`
- Sitemap routes: 30
- Built static routes: 38

Source docs read:

- `AGENTS.md`
- `docs/00-start/source-of-truth.md`
- `docs/00-start/active-canon-index.md`
- `docs/00-start/hold-register.md`
- `docs/seo/route-registry.md`
- `docs/seo/yandex-seo-playbook.md`
- `docs/qa/yandex-seo-release-gate.md`
- `docs/legal/forms-cookies-analytics-crm-compliance.md`

Site files read:

- `robots.txt`
- `sitemap.xml`
- `docs/ads/final-paid-traffic-go-no-go-2026-06-22.md`
- `docs/ads/owner-deploy-legal-decision-packet-2026-06-22.md`
- `docs/ads/owner-decision-intake-2026-06-22.md`
- `docs/ads/production-deploy-source-verification-2026-06-22.md`
- `route index.html files`
- `_next static chunks`

Missing expected site source files in this static snapshot:

| File | Status |
| --- | --- |
| AGENTS.md | MISSING_EXPECTED_IN_CURRENT_STATIC_SNAPSHOT |
| README.md | MISSING_EXPECTED_IN_CURRENT_STATIC_SNAPSHOT |
| next.config.ts | MISSING_EXPECTED_IN_CURRENT_STATIC_SNAPSHOT |
| app/layout.tsx | MISSING_EXPECTED_IN_CURRENT_STATIC_SNAPSHOT |
| app/page.tsx | MISSING_EXPECTED_IN_CURRENT_STATIC_SNAPSHOT |
| app/[slug]/page.tsx | MISSING_EXPECTED_IN_CURRENT_STATIC_SNAPSHOT |
| components/Header.tsx | MISSING_EXPECTED_IN_CURRENT_STATIC_SNAPSHOT |
| components/Footer.tsx | MISSING_EXPECTED_IN_CURRENT_STATIC_SNAPSHOT |
| lib/feature-flags.ts | MISSING_EXPECTED_IN_CURRENT_STATIC_SNAPSHOT |
| lib/content.ts | MISSING_EXPECTED_IN_CURRENT_STATIC_SNAPSHOT |
| lib/routes.ts | MISSING_EXPECTED_IN_CURRENT_STATIC_SNAPSHOT |
| lib/routes/route-page-data.ts | MISSING_EXPECTED_IN_CURRENT_STATIC_SNAPSHOT |
| lib/tracking/* | MISSING_EXPECTED_IN_CURRENT_STATIC_SNAPSHOT |
| public/robots.txt | MISSING_EXPECTED_IN_CURRENT_STATIC_SNAPSHOT |
| public/sitemap.xml | MISSING_EXPECTED_IN_CURRENT_STATIC_SNAPSHOT |

## Current Site State

- Production source repo for this task: `elena70semen/dokumenty82-site`.
- Current checked tree is a static production snapshot, not a full Next.js source tree.
- Metrika: `109869928_PRESENT`.
- Cookie notice: `PRESENT`.
- Policy disclosure: `PRESENT`.
- Forms/CRM/upload: `PLACEHOLDER_FORMS_ONLY`, `NO_CRM_WEBHOOK_FOUND`, `NO_PUBLIC_UPLOAD`.
- Paid traffic: `HOLD`.
- Local/Yandex Business profile publication: `HOLD / UNKNOWN`.

## Pages Checked

| Route | Type | Status | H1 | CTA | Phone | Policy | Landing Status | Risk Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| / | home | BUILT_STATIC_200_CANDIDATE | Документы для бизнеса в Симферополе | Разобрать ситуацию | yes | yes | READY_FOR_LIMITED_AD_TEST | global owner/legal/Metrika/deploy gates still required |
| /_not-found/ | system | BUILT_STATIC_200_CANDIDATE | Страница не найдена | Разобрать ситуацию | yes | yes | NOT_READY_FOR_AD_TRAFFIC | not indexable; canonical mismatch |
| /404/ | system | BUILT_STATIC_200_CANDIDATE | Страница не найдена | Разобрать ситуацию | yes | yes | NOT_READY_FOR_AD_TRAFFIC | not indexable; canonical mismatch |
| /adres-egryul-direktor/ | hub | BUILT_STATIC_200_CANDIDATE | Адрес, ЕГРЮЛ и изменения в компании | Разобрать ситуацию | yes | yes | READY_WITH_COPY_REVIEW | commercial/sensitive page requires narrow ad copy and legal review |
| /ausn-krym/ | diagnostic | BUILT_STATIC_200_CANDIDATE | Подходит ли АУСН в Крыму | Разобрать ситуацию | yes | yes | HOLD_DO_NOT_USE_AS_LANDING | tax/legal advice moderation and owner/legal review required |
| /bank-i-115-fz/ | hub | BUILT_STATIC_200_CANDIDATE | Документы для банка и запросов по 115-ФЗ | Разобрать ситуацию | yes | yes | READY_WITH_COPY_REVIEW | bank/115-FZ copy must avoid unlock/approval guarantees |
| /blog/ | blog | BUILT_STATIC_200_CANDIDATE | Блог и новости | Разобрать ситуацию | yes | yes | INTERNAL_OR_NOINDEX_DO_NOT_USE | support/content/internal page, not an ad landing |
| /blog/obnovleniya-fns/ | blog | BUILT_STATIC_200_CANDIDATE | Обновления ФНС | Разобрать ситуацию | yes | yes | INTERNAL_OR_NOINDEX_DO_NOT_USE | support/content/internal page, not an ad landing |
| /blog/razbory/ | blog | BUILT_STATIC_200_CANDIDATE | Разборы ситуаций | Разобрать ситуацию | yes | yes | INTERNAL_OR_NOINDEX_DO_NOT_USE | support/content/internal page, not an ad landing |
| /deklaraciya-usn/ | money | BUILT_STATIC_200_CANDIDATE | Декларация УСН в Симферополе | Разобрать ситуацию | yes | yes | READY_WITH_COPY_REVIEW | commercial/sensitive page requires narrow ad copy and legal review |
| /dokumenty-dlya-banka-115-fz/ | money | BUILT_STATIC_200_CANDIDATE | Документы для банка по 115-ФЗ | Разобрать ситуацию | yes | yes | READY_WITH_COPY_REVIEW | bank/115-FZ copy must avoid unlock/approval guarantees |
| /faq/ | faq | BUILT_STATIC_200_CANDIDATE | Частые вопросы по документам | Разобрать ситуацию | yes | yes | INTERNAL_OR_NOINDEX_DO_NOT_USE | support/content/internal page, not an ad landing |
| /internal/ | internal | MISSING |  | MISSING | no | no | BROKEN_DO_NOT_USE | route is missing in current static snapshot |
| /internal/graphics-proof/ | internal | BUILT_STATIC_200_CANDIDATE | Internal graphics applied to real site HTML | Разобрать ситуацию | yes | yes | INTERNAL_OR_NOINDEX_DO_NOT_USE | support/content/internal page, not an ad landing |
| /internal/visual-detail-kit/ | internal | BUILT_STATIC_200_CANDIDATE | Stage11A visual detail kit for production pages | Разобрать ситуацию | yes | yes | INTERNAL_OR_NOINDEX_DO_NOT_USE | support/content/internal page, not an ad landing |
| /kadry/ | hub | BUILT_STATIC_200_CANDIDATE | Кадровые документы для бизнеса | Разобрать ситуацию | yes | yes | READY_WITH_COPY_REVIEW | commercial/sensitive page requires narrow ad copy and legal review |
| /kontakty/ | contact | BUILT_STATIC_200_CANDIDATE | Контакты и передача документов | Разобрать ситуацию | yes | yes | READY_FOR_LIMITED_AD_TEST | global owner/legal/Metrika/deploy gates still required |
| /likvidaciya-ooo/ | money | BUILT_STATIC_200_CANDIDATE | Ликвидация ООО | Разобрать ситуацию | yes | yes | READY_WITH_COPY_REVIEW | commercial/sensitive page requires narrow ad copy and legal review |
| /nalogi-i-rezhimy/ | hub | BUILT_STATIC_200_CANDIDATE | Налоги и режимы для бизнеса | Разобрать ситуацию | yes | yes | HOLD_DO_NOT_USE_AS_LANDING | tax/legal advice moderation and owner/legal review required |
| /nds-pri-usn-2026/ | diagnostic | BUILT_STATIC_200_CANDIDATE | НДС при УСН в 2026 году | Разобрать ситуацию | yes | yes | HOLD_DO_NOT_USE_AS_LANDING | tax/legal advice moderation and owner/legal review required |
| /nedostovernost-yuridicheskogo-adresa/ | money | BUILT_STATIC_200_CANDIDATE | Недостоверность юридического адреса: что проверить | Разобрать ситуацию | yes | yes | READY_WITH_COPY_REVIEW | commercial/sensitive page requires narrow ad copy and legal review |
| /news/ | unknown | MISSING |  | MISSING | no | no | BROKEN_DO_NOT_USE | route is missing in current static snapshot |
| /nulevaya-otchetnost-ip/ | money | BUILT_STATIC_200_CANDIDATE | Нулевая отчетность ИП | Разобрать ситуацию | yes | yes | READY_WITH_COPY_REVIEW | commercial/sensitive page requires narrow ad copy and legal review |
| /nulevaya-otchetnost-ooo/ | money | BUILT_STATIC_200_CANDIDATE | Нулевая отчетность ООО | Разобрать ситуацию | yes | yes | READY_WITH_COPY_REVIEW | commercial/sensitive page requires narrow ad copy and legal review |
| /o-proekte/ | about | BUILT_STATIC_200_CANDIDATE | Локальный центр подготовки документов | Разобрать ситуацию | yes | yes | HOLD_DO_NOT_USE_AS_LANDING | support/content/internal page, not an ad landing |
| /otchetnost/ | hub | BUILT_STATIC_200_CANDIDATE | Отчётность и налоговые документы | Разобрать ситуацию | yes | yes | READY_WITH_COPY_REVIEW | commercial/sensitive page requires narrow ad copy and legal review |
| /otvet-na-trebovanie-ifns/ | money | BUILT_STATIC_200_CANDIDATE | Ответ на требование ИФНС | Разобрать ситуацию | yes | yes | READY_WITH_COPY_REVIEW | commercial/sensitive page requires narrow ad copy and legal review |
| /otvet-na-zapros-banka/ | money | BUILT_STATIC_200_CANDIDATE | Ответ на запрос банка | Разобрать ситуацию | yes | yes | READY_WITH_COPY_REVIEW | bank/115-FZ copy must avoid unlock/approval guarantees |
| /policy/ | policy | BUILT_STATIC_200_CANDIDATE | Политика конфиденциальности и обработки данных | Разобрать ситуацию | yes | yes | HOLD_DO_NOT_USE_AS_LANDING | support/content/internal page, not an ad landing |
| /raschet-nalogovoy-nagruzki/ | diagnostic | BUILT_STATIC_200_CANDIDATE | Расчет налоговой нагрузки | Разобрать ситуацию | yes | yes | HOLD_DO_NOT_USE_AS_LANDING | tax/legal advice moderation and owner/legal review required |
| /razbor-situacii/ | situation_review | BUILT_STATIC_200_CANDIDATE | Разберём ситуацию и подскажем документальный маршрут | Разобрать ситуацию | yes | yes | READY_FOR_LIMITED_AD_TEST | global owner/legal/Metrika/deploy gates still required |
| /registraciya-i-likvidaciya/ | hub | BUILT_STATIC_200_CANDIDATE | Регистрация и ликвидация бизнеса | Разобрать ситуацию | yes | yes | READY_WITH_COPY_REVIEW | commercial/sensitive page requires narrow ad copy and legal review |
| /registraciya-ip/ | money | BUILT_STATIC_200_CANDIDATE | Регистрация ИП в Симферополе | Разобрать ситуацию | yes | yes | READY_WITH_COPY_REVIEW | commercial/sensitive page requires narrow ad copy and legal review |
| /registraciya-ooo/ | money | BUILT_STATIC_200_CANDIDATE | Регистрация ООО в Симферополе | Разобрать ситуацию | yes | yes | READY_WITH_COPY_REVIEW | commercial/sensitive page requires narrow ad copy and legal review |
| /smena-direktora-ooo/ | money | BUILT_STATIC_200_CANDIDATE | Смена директора ООО | Разобрать ситуацию | yes | yes | READY_WITH_COPY_REVIEW | commercial/sensitive page requires narrow ad copy and legal review |
| /smena-yuridicheskogo-adresa-ooo/ | money | BUILT_STATIC_200_CANDIDATE | Смена юридического адреса ООО | Разобрать ситуацию | yes | yes | READY_WITH_COPY_REVIEW | commercial/sensitive page requires narrow ad copy and legal review |
| /soprovozhdenie/ | hub | BUILT_STATIC_200_CANDIDATE | Сопровождение бизнеса по документам | Разобрать ситуацию | yes | yes | READY_WITH_COPY_REVIEW | commercial/sensitive page requires narrow ad copy and legal review |
| /srochnye-voprosy/ | hub | BUILT_STATIC_200_CANDIDATE | Срочные и неясные вопросы по документам | Разобрать ситуацию | yes | yes | READY_WITH_COPY_REVIEW | urgent-intent copy must avoid deadline/result promises |
| /vosstanovlenie-buhucheta/ | money | BUILT_STATIC_200_CANDIDATE | Восстановление бухучёта | Разобрать ситуацию | yes | yes | READY_WITH_COPY_REVIEW | commercial/sensitive page requires narrow ad copy and legal review |
| /yuridicheskiy-adres-simferopol/ | money | BUILT_STATIC_200_CANDIDATE | Юридический адрес в Симферополе | Разобрать ситуацию | yes | yes | READY_WITH_COPY_REVIEW | commercial/sensitive page requires narrow ad copy and legal review |

## Actions Checked

| Source Route | Label | href/action | Type | Result | Notes |
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
| / | Понятно | (button) | button | OK |  |
| / | ↑ | (button) | button | OK |  |
| / | ↓ | (button) | button | OK |  |
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
| /_not-found/ | Понятно | (button) | button | OK |  |
| /_not-found/ | ↑ | (button) | button | OK |  |
| /_not-found/ | ↓ | (button) | button | OK |  |
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
| /404/ | +7 (978) 998-72-22 | tel:+79789987222 | link | OK |  |
| /404/ | Позвонить | tel:+79789987222 | link | OK |  |
| /404/ | Построить маршрут | /kontakty/ | link | OK |  |
| /404/ | Понятно | (button) | button | OK |  |
| /404/ | ↑ | (button) | button | OK |  |
| /404/ | ↓ | (button) | button | OK |  |
| /adres-egryul-direktor/ | политика конфиденциальности | /policy/ | link | OK |  |
| /adres-egryul-direktor/ | Перейти к содержанию | #main-content | link | OK |  |
| /adres-egryul-direktor/ | Документы для бизнеса Центр подготовки документов | / | link | OK |  |
| /adres-egryul-direktor/ | Разбор ситуации | /razbor-situacii/ | link | OK |  |
| /adres-egryul-direktor/ | Документы | /#documents | link | OK |  |
| /adres-egryul-direktor/ | Отчётность | /otchetnost/ | link | OK |  |
| /adres-egryul-direktor/ | Банк и 115-ФЗ | /bank-i-115-fz/ | link | OK |  |
| /adres-egryul-direktor/ | Блог | /blog/ | link | OK |  |
| /adres-egryul-direktor/ | Новости | /blog/obnovleniya-fns/ | link | OK |  |
| /adres-egryul-direktor/ | О нас | /o-proekte/ | link | OK |  |
| /adres-egryul-direktor/ | Контакты | /kontakty/ | link | OK |  |
| /adres-egryul-direktor/ | Разобрать ситуацию | /razbor-situacii/ | link | OK |  |
| /adres-egryul-direktor/ | +7 (978) 998-72-22 | tel:+79789987222 | link | OK |  |
| /adres-egryul-direktor/ | Разбор ситуации | /razbor-situacii/ | link | OK |  |
| /adres-egryul-direktor/ | Документы | /#documents | link | OK |  |
| /adres-egryul-direktor/ | Отчётность | /otchetnost/ | link | OK |  |
| /adres-egryul-direktor/ | Банк и 115-ФЗ | /bank-i-115-fz/ | link | OK |  |
| /adres-egryul-direktor/ | Блог | /blog/ | link | OK |  |
| /adres-egryul-direktor/ | Новости | /blog/obnovleniya-fns/ | link | OK |  |
| /adres-egryul-direktor/ | О нас | /o-proekte/ | link | OK |  |
| /adres-egryul-direktor/ | Контакты | /kontakty/ | link | OK |  |
| /adres-egryul-direktor/ | Разобрать ситуацию | /razbor-situacii/ | link | OK |  |
| /adres-egryul-direktor/ | +7 (978) 998-72-22 | tel:+79789987222 | link | OK |  |
| /adres-egryul-direktor/ | Главная | / | link | OK |  |
| /adres-egryul-direktor/ | Разобрать ситуацию | /razbor-situacii/ | link | OK |  |
| /adres-egryul-direktor/ | Позвонить | tel:+79789987222 | link | OK |  |
| /adres-egryul-direktor/ | Документы для бизнеса Центр подготовки документов | / | link | OK |  |
| /adres-egryul-direktor/ | Разбор ситуации | /razbor-situacii/ | link | OK |  |
| /adres-egryul-direktor/ | Документы | /#documents | link | OK |  |
| /adres-egryul-direktor/ | Отчётность | /otchetnost/ | link | OK |  |
| /adres-egryul-direktor/ | Банк и 115-ФЗ | /bank-i-115-fz/ | link | OK |  |
| /adres-egryul-direktor/ | Контакты | /kontakty/ | link | OK |  |
| /adres-egryul-direktor/ | Политика конфиденциальности | /policy/ | link | OK |  |
| /adres-egryul-direktor/ | +7 (978) 998-72-22 | tel:+79789987222 | link | OK |  |

## CTA / Phone / Contact Flow

- Primary CTA resolves to safe internal route paths, primarily `/razbor-situacii/`, `/kontakty/`, phone, or document-review wording.
- Phone actions use `tel:+79789987222` when present.
- Route/map action currently resolves through `/kontakty/` rather than an unapproved external profile link.
- `Показать документы` is treated as an agreed safe review path and does not create a public upload path.
- Cookie notice action is a local acknowledgement button, not a submit/lead action.

## Forms / CRM / Upload Status

- Public form count: 10.
- POST form actions: 0.
- File inputs: 0.
- Webhook/CRM markers: 0.
- False success markers: 0.
- Lead flow remains phone/contact-first unless separately approved.

## Cookie / Policy / Metrika Status

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

## Yandex Direct Landing Risk Review

Safe limited-test candidates after global gates:

- `/`
- `/kontakty/`
- `/razbor-situacii/`

Use only after copy/legal review:

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

Do-not-use / blocked landing pages:

- `/_not-found/` - `NOT_READY_FOR_AD_TRAFFIC` (not indexable; canonical mismatch)
- `/404/` - `NOT_READY_FOR_AD_TRAFFIC` (not indexable; canonical mismatch)
- `/ausn-krym/` - `HOLD_DO_NOT_USE_AS_LANDING` (tax/legal advice moderation and owner/legal review required)
- `/blog/` - `INTERNAL_OR_NOINDEX_DO_NOT_USE` (support/content/internal page, not an ad landing)
- `/blog/obnovleniya-fns/` - `INTERNAL_OR_NOINDEX_DO_NOT_USE` (support/content/internal page, not an ad landing)
- `/blog/razbory/` - `INTERNAL_OR_NOINDEX_DO_NOT_USE` (support/content/internal page, not an ad landing)
- `/faq/` - `INTERNAL_OR_NOINDEX_DO_NOT_USE` (support/content/internal page, not an ad landing)
- `/internal/` - `BROKEN_DO_NOT_USE` (route is missing in current static snapshot)
- `/internal/graphics-proof/` - `INTERNAL_OR_NOINDEX_DO_NOT_USE` (support/content/internal page, not an ad landing)
- `/internal/visual-detail-kit/` - `INTERNAL_OR_NOINDEX_DO_NOT_USE` (support/content/internal page, not an ad landing)
- `/nalogi-i-rezhimy/` - `HOLD_DO_NOT_USE_AS_LANDING` (tax/legal advice moderation and owner/legal review required)
- `/nds-pri-usn-2026/` - `HOLD_DO_NOT_USE_AS_LANDING` (tax/legal advice moderation and owner/legal review required)
- `/news/` - `BROKEN_DO_NOT_USE` (route is missing in current static snapshot)
- `/o-proekte/` - `HOLD_DO_NOT_USE_AS_LANDING` (support/content/internal page, not an ad landing)
- `/policy/` - `HOLD_DO_NOT_USE_AS_LANDING` (support/content/internal page, not an ad landing)
- `/raschet-nalogovoy-nagruzki/` - `HOLD_DO_NOT_USE_AS_LANDING` (tax/legal advice moderation and owner/legal review required)

Global blockers:

- `OWNER_GO_NOT_GIVEN`
- `PAID_TRAFFIC_HOLD`
- `DEPLOY_SOURCE_PARTIALLY_PROVEN`
- `METRIKA_WEBVISOR_OWNER_LEGAL_DECISION_REQUIRED`
- `METRIKA_ECOMMERCE_OWNER_LEGAL_DECISION_REQUIRED`
- `SOURCE_REGISTRY_ROUTES_NOT_IN_CURRENT_STATIC_CONTOUR`

## Yandex Business Readiness Review

- brandName: `Документы для бизнеса`
- categoryRecommendation: `Центр подготовки документов`
- address: `Республика Крым, Симферополь, ул. им. Мате Залки, 1`
- phone: `+7 (978) 998-72-22`
- routeCta: `available through /kontakty/ and internal route CTA`
- profileConfirmation: `UNKNOWN_HOLD`
- hours: `HOLD_OWNER_REQUIRED`
- officeFloor: `HOLD_OWNER_REQUIRED`
- legalIds: `HOLD_OWNER_LEGAL_REQUIRED`
- photosSignageInterior: `NEEDS_OWNER_PROVIDED_ASSETS`
- ratingsReviews: `ABSENT_AND_SHOULD_REMAIN_ABSENT_UNTIL_VERIFIED`

## Landing Page Recommendations

| Route | Recommended Campaign Use | Ad Copy Limits | Status |
| --- | --- | --- | --- |
| / | use for limited test only after global gates | global owner/legal/Metrika/deploy gates still required | READY_FOR_LIMITED_AD_TEST |
| /_not-found/ | do not use | not indexable; canonical mismatch | NOT_READY_FOR_AD_TRAFFIC |
| /404/ | do not use | not indexable; canonical mismatch | NOT_READY_FOR_AD_TRAFFIC |
| /adres-egryul-direktor/ | use only after copy/legal review | commercial/sensitive page requires narrow ad copy and legal review | READY_WITH_COPY_REVIEW |
| /ausn-krym/ | do not use | tax/legal advice moderation and owner/legal review required | HOLD_DO_NOT_USE_AS_LANDING |
| /bank-i-115-fz/ | use only after copy/legal review | bank/115-FZ copy must avoid unlock/approval guarantees | READY_WITH_COPY_REVIEW |
| /blog/ | do not use | support/content/internal page, not an ad landing | INTERNAL_OR_NOINDEX_DO_NOT_USE |
| /blog/obnovleniya-fns/ | do not use | support/content/internal page, not an ad landing | INTERNAL_OR_NOINDEX_DO_NOT_USE |
| /blog/razbory/ | do not use | support/content/internal page, not an ad landing | INTERNAL_OR_NOINDEX_DO_NOT_USE |
| /deklaraciya-usn/ | use only after copy/legal review | commercial/sensitive page requires narrow ad copy and legal review | READY_WITH_COPY_REVIEW |
| /dokumenty-dlya-banka-115-fz/ | use only after copy/legal review | bank/115-FZ copy must avoid unlock/approval guarantees | READY_WITH_COPY_REVIEW |
| /faq/ | do not use | support/content/internal page, not an ad landing | INTERNAL_OR_NOINDEX_DO_NOT_USE |
| /internal/ | do not use | route is missing in current static snapshot | BROKEN_DO_NOT_USE |
| /internal/graphics-proof/ | do not use | support/content/internal page, not an ad landing | INTERNAL_OR_NOINDEX_DO_NOT_USE |
| /internal/visual-detail-kit/ | do not use | support/content/internal page, not an ad landing | INTERNAL_OR_NOINDEX_DO_NOT_USE |
| /kadry/ | use only after copy/legal review | commercial/sensitive page requires narrow ad copy and legal review | READY_WITH_COPY_REVIEW |
| /kontakty/ | use for limited test only after global gates | global owner/legal/Metrika/deploy gates still required | READY_FOR_LIMITED_AD_TEST |
| /likvidaciya-ooo/ | use only after copy/legal review | commercial/sensitive page requires narrow ad copy and legal review | READY_WITH_COPY_REVIEW |
| /nalogi-i-rezhimy/ | do not use | tax/legal advice moderation and owner/legal review required | HOLD_DO_NOT_USE_AS_LANDING |
| /nds-pri-usn-2026/ | do not use | tax/legal advice moderation and owner/legal review required | HOLD_DO_NOT_USE_AS_LANDING |
| /nedostovernost-yuridicheskogo-adresa/ | use only after copy/legal review | commercial/sensitive page requires narrow ad copy and legal review | READY_WITH_COPY_REVIEW |
| /news/ | do not use | route is missing in current static snapshot | BROKEN_DO_NOT_USE |
| /nulevaya-otchetnost-ip/ | use only after copy/legal review | commercial/sensitive page requires narrow ad copy and legal review | READY_WITH_COPY_REVIEW |
| /nulevaya-otchetnost-ooo/ | use only after copy/legal review | commercial/sensitive page requires narrow ad copy and legal review | READY_WITH_COPY_REVIEW |
| /o-proekte/ | do not use | support/content/internal page, not an ad landing | HOLD_DO_NOT_USE_AS_LANDING |
| /otchetnost/ | use only after copy/legal review | commercial/sensitive page requires narrow ad copy and legal review | READY_WITH_COPY_REVIEW |
| /otvet-na-trebovanie-ifns/ | use only after copy/legal review | commercial/sensitive page requires narrow ad copy and legal review | READY_WITH_COPY_REVIEW |
| /otvet-na-zapros-banka/ | use only after copy/legal review | bank/115-FZ copy must avoid unlock/approval guarantees | READY_WITH_COPY_REVIEW |
| /policy/ | do not use | support/content/internal page, not an ad landing | HOLD_DO_NOT_USE_AS_LANDING |
| /raschet-nalogovoy-nagruzki/ | do not use | tax/legal advice moderation and owner/legal review required | HOLD_DO_NOT_USE_AS_LANDING |
| /razbor-situacii/ | use for limited test only after global gates | global owner/legal/Metrika/deploy gates still required | READY_FOR_LIMITED_AD_TEST |
| /registraciya-i-likvidaciya/ | use only after copy/legal review | commercial/sensitive page requires narrow ad copy and legal review | READY_WITH_COPY_REVIEW |
| /registraciya-ip/ | use only after copy/legal review | commercial/sensitive page requires narrow ad copy and legal review | READY_WITH_COPY_REVIEW |
| /registraciya-ooo/ | use only after copy/legal review | commercial/sensitive page requires narrow ad copy and legal review | READY_WITH_COPY_REVIEW |
| /smena-direktora-ooo/ | use only after copy/legal review | commercial/sensitive page requires narrow ad copy and legal review | READY_WITH_COPY_REVIEW |
| /smena-yuridicheskogo-adresa-ooo/ | use only after copy/legal review | commercial/sensitive page requires narrow ad copy and legal review | READY_WITH_COPY_REVIEW |
| /soprovozhdenie/ | use only after copy/legal review | commercial/sensitive page requires narrow ad copy and legal review | READY_WITH_COPY_REVIEW |
| /srochnye-voprosy/ | use only after copy/legal review | urgent-intent copy must avoid deadline/result promises | READY_WITH_COPY_REVIEW |
| /vosstanovlenie-buhucheta/ | use only after copy/legal review | commercial/sensitive page requires narrow ad copy and legal review | READY_WITH_COPY_REVIEW |
| /yuridicheskiy-adres-simferopol/ | use only after copy/legal review | commercial/sensitive page requires narrow ad copy and legal review | READY_WITH_COPY_REVIEW |

## Evidence Scripts

- `scripts/generate-ad-readiness-site-actions-evidence.mjs`
- `scripts/check-ad-readiness-site-actions-evidence.mjs`
- `evidence/ads/ad-readiness-site-actions-proof.json`
- `evidence/ads/ad-readiness-site-actions-proof-summary.md`

## Checks Run

| Command | Result | Notes |
| --- | --- | --- |
| `git status --short` | `PASS` | Shows only this P1-03 evidence/package scope before commit. |
| `git branch --show-current` | `PASS` | `codex/p1-03-ad-readiness-site-actions-audit`. |
| `git log -1 --oneline` | `PASS` | Base before P1-03 commit: `493b28d docs: add owner decision intake`. |
| `git diff --check` | `PASS` | No whitespace errors. |
| `npm ci` | `PASS` | Minimal static-snapshot package; no dependencies, no vulnerabilities. |
| `npm run evidence:ad-readiness-actions` | `PASS` | Generated JSON, summary and this release doc. |
| `npm run check:ad-readiness-actions` | `PASS_WITH_WARNINGS` | Warnings are owner/legal gates: Webvisor/ecommerce, reachGoal LK confirmation, Yandex Business unknown, source-registry routes outside current 30-URL contour. |
| `npm run build` | `SKIPPED_WITH_REASON` | No `build` script in current static snapshot repository layer. |
| `npm run check:static-links` | `SKIPPED_WITH_REASON` | No script in current static snapshot repository layer; internal links covered by P1-03 checker. |
| `npm run check:tracking-no-pii` | `SKIPPED_WITH_REASON` | No script in current static snapshot repository layer; tracking markers covered by P1-03 checker. |
| `npm run evidence:owner-legal-privacy` | `SKIPPED_WITH_REASON` | No script in current static snapshot repository layer. |
| `npm run check:owner-legal-privacy` | `SKIPPED_WITH_REASON` | No script in current static snapshot repository layer. |
| `npm run check:forms-crm-contract` | `SKIPPED_WITH_REASON` | No script in current static snapshot repository layer; placeholder forms/CRM/upload covered by P1-03 checker. |
| `npm run check:launch-live-config` | `SKIPPED_WITH_REASON` | No script in current static snapshot repository layer. |
| `npm run check:public-live-config` | `SKIPPED_WITH_REASON` | No script in current static snapshot repository layer. |
| `npm run check:finalization` | `SKIPPED_WITH_REASON` | No script in current static snapshot repository layer. |
| `npm run brand:check` | `SKIPPED_WITH_REASON` | No script in current static snapshot repository layer. |
| `npm run release:manifest` | `SKIPPED_WITH_REASON` | No script in current static snapshot repository layer. |

## Forbidden Scan Results

| Finding | File | Severity | Context |
| --- | --- | --- | --- |
| ECOMMERCE | 404.html | WARN | /metrika/tag.js?id=109869928', 'ym');\n\n ym(109869928, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:\"dataLayer\", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});\n ","id":"yandex-metrika"}])</script><noscript>< |
| WEBVISOR | 404.html | WARN | 'script','https://mc.yandex.ru/metrika/tag.js?id=109869928', 'ym');\n\n ym(109869928, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:\"dataLayer\", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});\n ","id":"yandex-m |
| ECOMMERCE | 404/index.html | WARN | /metrika/tag.js?id=109869928', 'ym');\n\n ym(109869928, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:\"dataLayer\", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});\n ","id":"yandex-metrika"}])</script><noscript>< |
| WEBVISOR | 404/index.html | WARN | 'script','https://mc.yandex.ru/metrika/tag.js?id=109869928', 'ym');\n\n ym(109869928, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:\"dataLayer\", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});\n ","id":"yandex-m |
| ECOMMERCE | __next._full.txt | WARN | /metrika/tag.js?id=109869928', 'ym');\n\n ym(109869928, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:\"dataLayer\", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});\n "}],["$","noscript",null,{"children":"$3"}]],[ |
| WEBVISOR | __next._full.txt | WARN | 'script','https://mc.yandex.ru/metrika/tag.js?id=109869928', 'ym');\n\n ym(109869928, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:\"dataLayer\", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});\n "}],["$","noscri |
| ECOMMERCE | __next._index.txt | WARN | /metrika/tag.js?id=109869928', 'ym');\n\n ym(109869928, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:\"dataLayer\", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});\n "}],["$","noscript",null,{"children":"$3"}]],[ |
| WEBVISOR | __next._index.txt | WARN | 'script','https://mc.yandex.ru/metrika/tag.js?id=109869928', 'ym');\n\n ym(109869928, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:\"dataLayer\", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});\n "}],["$","noscri |
| REACH_GOAL | _next/static/chunks/0n3t274nt-s3i.js | WARN | s.metricaEnabled)&&a.siteFeatureFlags.metricaEnabled&&1){let t=window.ym;"function"==typeof t&&t.call(window,0x68c7b68,"reachGoal",e,n)}}(k,E,(0,n.getStoredAttribution)()),P?.()};return e?e.startsWith("/")&&!e.startsWith("//")?(0,t.jsx)(r.default,{id:c,href:e,className:i,"aria-describedby":v,onClick |
| ECOMMERCE | _not-found/__next._full.txt | WARN | /metrika/tag.js?id=109869928', 'ym');\n\n ym(109869928, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:\"dataLayer\", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});\n "}],["$","noscript",null,{"children":"$3"}]],[ |
| WEBVISOR | _not-found/__next._full.txt | WARN | 'script','https://mc.yandex.ru/metrika/tag.js?id=109869928', 'ym');\n\n ym(109869928, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:\"dataLayer\", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});\n "}],["$","noscri |
| ECOMMERCE | _not-found/__next._index.txt | WARN | /metrika/tag.js?id=109869928', 'ym');\n\n ym(109869928, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:\"dataLayer\", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});\n "}],["$","noscript",null,{"children":"$3"}]],[ |
| WEBVISOR | _not-found/__next._index.txt | WARN | 'script','https://mc.yandex.ru/metrika/tag.js?id=109869928', 'ym');\n\n ym(109869928, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:\"dataLayer\", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});\n "}],["$","noscri |
| ECOMMERCE | _not-found/index.html | WARN | /metrika/tag.js?id=109869928', 'ym');\n\n ym(109869928, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:\"dataLayer\", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});\n ","id":"yandex-metrika"}])</script><noscript>< |
| WEBVISOR | _not-found/index.html | WARN | 'script','https://mc.yandex.ru/metrika/tag.js?id=109869928', 'ym');\n\n ym(109869928, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:\"dataLayer\", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});\n ","id":"yandex-m |
| ECOMMERCE | _not-found/index.txt | WARN | /metrika/tag.js?id=109869928', 'ym');\n\n ym(109869928, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:\"dataLayer\", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});\n "}],["$","noscript",null,{"children":"$3"}]],[ |
| WEBVISOR | _not-found/index.txt | WARN | 'script','https://mc.yandex.ru/metrika/tag.js?id=109869928', 'ym');\n\n ym(109869928, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:\"dataLayer\", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});\n "}],["$","noscri |
| ECOMMERCE | adres-egryul-direktor/__next._full.txt | WARN | /metrika/tag.js?id=109869928', 'ym');\n\n ym(109869928, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:\"dataLayer\", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});\n "}],["$","noscript",null,{"children":"$3"}]],[ |
| WEBVISOR | adres-egryul-direktor/__next._full.txt | WARN | 'script','https://mc.yandex.ru/metrika/tag.js?id=109869928', 'ym');\n\n ym(109869928, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:\"dataLayer\", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});\n "}],["$","noscri |
| ECOMMERCE | adres-egryul-direktor/__next._index.txt | WARN | /metrika/tag.js?id=109869928', 'ym');\n\n ym(109869928, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:\"dataLayer\", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});\n "}],["$","noscript",null,{"children":"$3"}]],[ |
| WEBVISOR | adres-egryul-direktor/__next._index.txt | WARN | 'script','https://mc.yandex.ru/metrika/tag.js?id=109869928', 'ym');\n\n ym(109869928, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:\"dataLayer\", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});\n "}],["$","noscri |
| ECOMMERCE | adres-egryul-direktor/index.html | WARN | /metrika/tag.js?id=109869928', 'ym');\n\n ym(109869928, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:\"dataLayer\", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});\n ","id":"yandex-metrika"}])</script><noscript>< |
| WEBVISOR | adres-egryul-direktor/index.html | WARN | 'script','https://mc.yandex.ru/metrika/tag.js?id=109869928', 'ym');\n\n ym(109869928, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:\"dataLayer\", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});\n ","id":"yandex-m |
| ECOMMERCE | adres-egryul-direktor/index.txt | WARN | /metrika/tag.js?id=109869928', 'ym');\n\n ym(109869928, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:\"dataLayer\", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});\n "}],["$","noscript",null,{"children":"$3"}]],[ |
| WEBVISOR | adres-egryul-direktor/index.txt | WARN | 'script','https://mc.yandex.ru/metrika/tag.js?id=109869928', 'ym');\n\n ym(109869928, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:\"dataLayer\", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});\n "}],["$","noscri |
| ECOMMERCE | ausn-krym/__next._full.txt | WARN | /metrika/tag.js?id=109869928', 'ym');\n\n ym(109869928, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:\"dataLayer\", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});\n "}],["$","noscript",null,{"children":"$3"}]],[ |
| WEBVISOR | ausn-krym/__next._full.txt | WARN | 'script','https://mc.yandex.ru/metrika/tag.js?id=109869928', 'ym');\n\n ym(109869928, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:\"dataLayer\", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});\n "}],["$","noscri |
| ECOMMERCE | ausn-krym/__next._index.txt | WARN | /metrika/tag.js?id=109869928', 'ym');\n\n ym(109869928, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:\"dataLayer\", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});\n "}],["$","noscript",null,{"children":"$3"}]],[ |
| WEBVISOR | ausn-krym/__next._index.txt | WARN | 'script','https://mc.yandex.ru/metrika/tag.js?id=109869928', 'ym');\n\n ym(109869928, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:\"dataLayer\", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});\n "}],["$","noscri |
| ECOMMERCE | ausn-krym/index.html | WARN | /metrika/tag.js?id=109869928', 'ym');\n\n ym(109869928, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:\"dataLayer\", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});\n ","id":"yandex-metrika"}])</script><noscript>< |
| WEBVISOR | ausn-krym/index.html | WARN | 'script','https://mc.yandex.ru/metrika/tag.js?id=109869928', 'ym');\n\n ym(109869928, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:\"dataLayer\", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});\n ","id":"yandex-m |
| ECOMMERCE | ausn-krym/index.txt | WARN | /metrika/tag.js?id=109869928', 'ym');\n\n ym(109869928, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:\"dataLayer\", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});\n "}],["$","noscript",null,{"children":"$3"}]],[ |
| WEBVISOR | ausn-krym/index.txt | WARN | 'script','https://mc.yandex.ru/metrika/tag.js?id=109869928', 'ym');\n\n ym(109869928, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:\"dataLayer\", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});\n "}],["$","noscri |
| ECOMMERCE | bank-i-115-fz/__next._full.txt | WARN | /metrika/tag.js?id=109869928', 'ym');\n\n ym(109869928, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:\"dataLayer\", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});\n "}],["$","noscript",null,{"children":"$3"}]],[ |
| WEBVISOR | bank-i-115-fz/__next._full.txt | WARN | 'script','https://mc.yandex.ru/metrika/tag.js?id=109869928', 'ym');\n\n ym(109869928, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:\"dataLayer\", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});\n "}],["$","noscri |
| ECOMMERCE | bank-i-115-fz/__next._index.txt | WARN | /metrika/tag.js?id=109869928', 'ym');\n\n ym(109869928, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:\"dataLayer\", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});\n "}],["$","noscript",null,{"children":"$3"}]],[ |
| WEBVISOR | bank-i-115-fz/__next._index.txt | WARN | 'script','https://mc.yandex.ru/metrika/tag.js?id=109869928', 'ym');\n\n ym(109869928, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:\"dataLayer\", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});\n "}],["$","noscri |
| ECOMMERCE | bank-i-115-fz/index.html | WARN | /metrika/tag.js?id=109869928', 'ym');\n\n ym(109869928, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:\"dataLayer\", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});\n ","id":"yandex-metrika"}])</script><noscript>< |
| WEBVISOR | bank-i-115-fz/index.html | WARN | 'script','https://mc.yandex.ru/metrika/tag.js?id=109869928', 'ym');\n\n ym(109869928, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:\"dataLayer\", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});\n ","id":"yandex-m |
| ECOMMERCE | bank-i-115-fz/index.txt | WARN | /metrika/tag.js?id=109869928', 'ym');\n\n ym(109869928, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:\"dataLayer\", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});\n "}],["$","noscript",null,{"children":"$3"}]],[ |
| WEBVISOR | bank-i-115-fz/index.txt | WARN | 'script','https://mc.yandex.ru/metrika/tag.js?id=109869928', 'ym');\n\n ym(109869928, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:\"dataLayer\", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});\n "}],["$","noscri |
| ECOMMERCE | blog/__next._full.txt | WARN | /metrika/tag.js?id=109869928', 'ym');\n\n ym(109869928, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:\"dataLayer\", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});\n "}],["$","noscript",null,{"children":"$3"}]],[ |
| WEBVISOR | blog/__next._full.txt | WARN | 'script','https://mc.yandex.ru/metrika/tag.js?id=109869928', 'ym');\n\n ym(109869928, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:\"dataLayer\", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});\n "}],["$","noscri |
| ECOMMERCE | blog/__next._index.txt | WARN | /metrika/tag.js?id=109869928', 'ym');\n\n ym(109869928, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:\"dataLayer\", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});\n "}],["$","noscript",null,{"children":"$3"}]],[ |
| WEBVISOR | blog/__next._index.txt | WARN | 'script','https://mc.yandex.ru/metrika/tag.js?id=109869928', 'ym');\n\n ym(109869928, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:\"dataLayer\", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});\n "}],["$","noscri |
| ECOMMERCE | blog/index.html | WARN | /metrika/tag.js?id=109869928', 'ym');\n\n ym(109869928, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:\"dataLayer\", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});\n ","id":"yandex-metrika"}])</script><noscript>< |
| WEBVISOR | blog/index.html | WARN | 'script','https://mc.yandex.ru/metrika/tag.js?id=109869928', 'ym');\n\n ym(109869928, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:\"dataLayer\", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});\n ","id":"yandex-m |
| ECOMMERCE | blog/index.txt | WARN | /metrika/tag.js?id=109869928', 'ym');\n\n ym(109869928, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:\"dataLayer\", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});\n "}],["$","noscript",null,{"children":"$3"}]],[ |
| WEBVISOR | blog/index.txt | WARN | 'script','https://mc.yandex.ru/metrika/tag.js?id=109869928', 'ym');\n\n ym(109869928, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:\"dataLayer\", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});\n "}],["$","noscri |
| ECOMMERCE | blog/obnovleniya-fns/__next._full.txt | WARN | /metrika/tag.js?id=109869928', 'ym');\n\n ym(109869928, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:\"dataLayer\", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});\n "}],["$","noscript",null,{"children":"$3"}]],[ |
| WEBVISOR | blog/obnovleniya-fns/__next._full.txt | WARN | 'script','https://mc.yandex.ru/metrika/tag.js?id=109869928', 'ym');\n\n ym(109869928, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:\"dataLayer\", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});\n "}],["$","noscri |
| ECOMMERCE | blog/obnovleniya-fns/__next._index.txt | WARN | /metrika/tag.js?id=109869928', 'ym');\n\n ym(109869928, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:\"dataLayer\", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});\n "}],["$","noscript",null,{"children":"$3"}]],[ |
| WEBVISOR | blog/obnovleniya-fns/__next._index.txt | WARN | 'script','https://mc.yandex.ru/metrika/tag.js?id=109869928', 'ym');\n\n ym(109869928, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:\"dataLayer\", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});\n "}],["$","noscri |
| ECOMMERCE | blog/obnovleniya-fns/index.html | WARN | /metrika/tag.js?id=109869928', 'ym');\n\n ym(109869928, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:\"dataLayer\", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});\n ","id":"yandex-metrika"}])</script><noscript>< |
| WEBVISOR | blog/obnovleniya-fns/index.html | WARN | 'script','https://mc.yandex.ru/metrika/tag.js?id=109869928', 'ym');\n\n ym(109869928, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:\"dataLayer\", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});\n ","id":"yandex-m |
| ECOMMERCE | blog/obnovleniya-fns/index.txt | WARN | /metrika/tag.js?id=109869928', 'ym');\n\n ym(109869928, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:\"dataLayer\", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});\n "}],["$","noscript",null,{"children":"$3"}]],[ |
| WEBVISOR | blog/obnovleniya-fns/index.txt | WARN | 'script','https://mc.yandex.ru/metrika/tag.js?id=109869928', 'ym');\n\n ym(109869928, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:\"dataLayer\", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});\n "}],["$","noscri |
| ECOMMERCE | blog/razbory/__next._full.txt | WARN | /metrika/tag.js?id=109869928', 'ym');\n\n ym(109869928, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:\"dataLayer\", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});\n "}],["$","noscript",null,{"children":"$3"}]],[ |
| WEBVISOR | blog/razbory/__next._full.txt | WARN | 'script','https://mc.yandex.ru/metrika/tag.js?id=109869928', 'ym');\n\n ym(109869928, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:\"dataLayer\", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});\n "}],["$","noscri |
| ECOMMERCE | blog/razbory/__next._index.txt | WARN | /metrika/tag.js?id=109869928', 'ym');\n\n ym(109869928, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:\"dataLayer\", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});\n "}],["$","noscript",null,{"children":"$3"}]],[ |
| WEBVISOR | blog/razbory/__next._index.txt | WARN | 'script','https://mc.yandex.ru/metrika/tag.js?id=109869928', 'ym');\n\n ym(109869928, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:\"dataLayer\", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});\n "}],["$","noscri |
| ECOMMERCE | blog/razbory/index.html | WARN | /metrika/tag.js?id=109869928', 'ym');\n\n ym(109869928, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:\"dataLayer\", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});\n ","id":"yandex-metrika"}])</script><noscript>< |
| WEBVISOR | blog/razbory/index.html | WARN | 'script','https://mc.yandex.ru/metrika/tag.js?id=109869928', 'ym');\n\n ym(109869928, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:\"dataLayer\", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});\n ","id":"yandex-m |
| ECOMMERCE | blog/razbory/index.txt | WARN | /metrika/tag.js?id=109869928', 'ym');\n\n ym(109869928, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:\"dataLayer\", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});\n "}],["$","noscript",null,{"children":"$3"}]],[ |
| WEBVISOR | blog/razbory/index.txt | WARN | 'script','https://mc.yandex.ru/metrika/tag.js?id=109869928', 'ym');\n\n ym(109869928, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:\"dataLayer\", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});\n "}],["$","noscri |
| ECOMMERCE | deklaraciya-usn/__next._full.txt | WARN | /metrika/tag.js?id=109869928', 'ym');\n\n ym(109869928, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:\"dataLayer\", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});\n "}],["$","noscript",null,{"children":"$3"}]],[ |
| WEBVISOR | deklaraciya-usn/__next._full.txt | WARN | 'script','https://mc.yandex.ru/metrika/tag.js?id=109869928', 'ym');\n\n ym(109869928, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:\"dataLayer\", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});\n "}],["$","noscri |
| ECOMMERCE | deklaraciya-usn/__next._index.txt | WARN | /metrika/tag.js?id=109869928', 'ym');\n\n ym(109869928, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:\"dataLayer\", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});\n "}],["$","noscript",null,{"children":"$3"}]],[ |
| WEBVISOR | deklaraciya-usn/__next._index.txt | WARN | 'script','https://mc.yandex.ru/metrika/tag.js?id=109869928', 'ym');\n\n ym(109869928, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:\"dataLayer\", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});\n "}],["$","noscri |
| ECOMMERCE | deklaraciya-usn/index.html | WARN | /metrika/tag.js?id=109869928', 'ym');\n\n ym(109869928, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:\"dataLayer\", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});\n ","id":"yandex-metrika"}])</script><noscript>< |
| WEBVISOR | deklaraciya-usn/index.html | WARN | 'script','https://mc.yandex.ru/metrika/tag.js?id=109869928', 'ym');\n\n ym(109869928, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:\"dataLayer\", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});\n ","id":"yandex-m |
| ECOMMERCE | deklaraciya-usn/index.txt | WARN | /metrika/tag.js?id=109869928', 'ym');\n\n ym(109869928, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:\"dataLayer\", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});\n "}],["$","noscript",null,{"children":"$3"}]],[ |
| WEBVISOR | deklaraciya-usn/index.txt | WARN | 'script','https://mc.yandex.ru/metrika/tag.js?id=109869928', 'ym');\n\n ym(109869928, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:\"dataLayer\", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});\n "}],["$","noscri |
| ECOMMERCE | dokumenty-dlya-banka-115-fz/__next._full.txt | WARN | /metrika/tag.js?id=109869928', 'ym');\n\n ym(109869928, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:\"dataLayer\", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});\n "}],["$","noscript",null,{"children":"$3"}]],[ |
| WEBVISOR | dokumenty-dlya-banka-115-fz/__next._full.txt | WARN | 'script','https://mc.yandex.ru/metrika/tag.js?id=109869928', 'ym');\n\n ym(109869928, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:\"dataLayer\", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});\n "}],["$","noscri |
| ECOMMERCE | dokumenty-dlya-banka-115-fz/__next._index.txt | WARN | /metrika/tag.js?id=109869928', 'ym');\n\n ym(109869928, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:\"dataLayer\", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});\n "}],["$","noscript",null,{"children":"$3"}]],[ |
| WEBVISOR | dokumenty-dlya-banka-115-fz/__next._index.txt | WARN | 'script','https://mc.yandex.ru/metrika/tag.js?id=109869928', 'ym');\n\n ym(109869928, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:\"dataLayer\", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});\n "}],["$","noscri |
| ECOMMERCE | dokumenty-dlya-banka-115-fz/index.html | WARN | /metrika/tag.js?id=109869928', 'ym');\n\n ym(109869928, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:\"dataLayer\", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});\n ","id":"yandex-metrika"}])</script><noscript>< |
| WEBVISOR | dokumenty-dlya-banka-115-fz/index.html | WARN | 'script','https://mc.yandex.ru/metrika/tag.js?id=109869928', 'ym');\n\n ym(109869928, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:\"dataLayer\", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});\n ","id":"yandex-m |
| ECOMMERCE | dokumenty-dlya-banka-115-fz/index.txt | WARN | /metrika/tag.js?id=109869928', 'ym');\n\n ym(109869928, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:\"dataLayer\", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});\n "}],["$","noscript",null,{"children":"$3"}]],[ |

## Required Pre-Launch Decisions

- owner/legal approval;
- ad positioning decision;
- legal entity/contact data decision;
- privacy/forms decision;
- Metrika/Webvisor/Tag Manager decision;
- CRM/forms decision;
- call handling decision;
- Yandex Business card decision;
- paid traffic go/no-go;
- budget limit;
- rollback/staging decision.

## Final Verdict

`AD_READINESS_ACTIONS_AUDIT_COMPLETE_NO_GO`

Reason: this audit finds technically usable landing candidates, but paid traffic remains blocked by owner/legal/deploy/Metrika/Yandex Business decisions. This PR does not approve launch.
