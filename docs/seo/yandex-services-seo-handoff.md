# Яндекс Исполнители / Яндекс Услуги: SEO-handoff для сайта

Дата фиксации: `2026-06-16`  
Домен: `https://dokumenty82.ru`  
Канал: `yandex_services`  
Связанный бизнес-документ: `docs/marketing/yandex-business/yandex-services/README.md` в репозитории `dokumenty-dlya-biznesa`

## 1. Цель handoff

Профиль в Яндекс Исполнителях должен усиливать сайт не отдельной doorway-страницей, а аккуратной связкой:

```text
профиль / услуга в Яндекс Исполнителях
  -> точная посадочная сайта
  -> безопасный CTA
  -> Метрика / UTM / ручной source capture
  -> CRM quality review
  -> SEO-корректировки страниц по фактическому спросу
```

Важно: не фиксируем обещание прямого SEO-роста от профиля. Контур работает как внешний локальный/entity-сигнал, источник конверсий и источник языка реальных запросов.

## 2. Основные правила для сайта

- Не создавать тонкую страницу под `Яндекс Услуги` только ради канала.
- Вести пользователей на уже существующие intent-pages.
- Не дублировать тексты карточек услуг на сайте дословно.
- Не добавлять в `<title>` и `<h1>` упоминание Яндекс Исполнителей без пользовательского интента.
- Не индексировать UTM-дубли; canonical остается чистым URL.
- Сохранять Clean-param для `utm_*`, `yclid`, `ysclid`, `from`, `gclid`, `fbclid`.
- Все формы и CTA должны оставаться безопасными: без обещания результата до изучения документов.

## 3. Route mapping

| Профиль / услуга | Посадочная сайта | Тип страницы | UTM campaign |
| --- | --- | --- | --- |
| Профиль: Документы для бизнеса | `/razbor-situacii/` | core | `profile_main` |
| Контакты / маршрут | `/kontakty/` | core | `office_route` |
| Разбор ситуации по документам бизнеса | `/razbor-situacii/` | core | `razbor_situacii` |
| Ответ на требование ИФНС | `/otvet-na-trebovanie-ifns/` | money | `otvet_na_trebovanie_ifns` |
| Ответ на запрос банка | `/otvet-na-zapros-banka/` | money | `otvet_na_zapros_banka` |
| Документы для банка по 115-ФЗ | `/dokumenty-dlya-banka-115-fz/` | money | `dokumenty_dlya_banka_115_fz` |
| Декларация УСН | `/deklaraciya-usn/` | money | `deklaraciya_usn` |
| Нулевая отчетность ООО | `/nulevaya-otchetnost-ooo/` | money | `nulevaya_otchetnost_ooo` |
| Нулевая отчетность ИП | `/nulevaya-otchetnost-ip/` | money | `nulevaya_otchetnost_ip` |
| Регистрация ООО | `/registraciya-ooo/` | money | `registraciya_ooo` |
| Регистрация ИП | `/registraciya-ip/` | money | `registraciya_ip` |
| Юридический адрес в Симферополе | `/yuridicheskiy-adres-simferopol/` | money | `yuridicheskiy_adres` |
| Смена юридического адреса ООО | `/smena-yuridicheskogo-adresa-ooo/` | money | `smena_yuridicheskogo_adresa_ooo` |
| Недостоверность юридического адреса | `/nedostovernost-yuridicheskogo-adresa/` | money | `nedostovernost_yuridicheskogo_adresa` |
| Восстановление бухучета | `/vosstanovlenie-buhucheta/` | money | `vosstanovlenie_buhucheta` |
| Документальное сопровождение бизнеса | `/soprovozhdenie/` | hub | `soprovozhdenie` |

## 4. UTM-шаблоны

Главный профиль:

```text
https://dokumenty82.ru/razbor-situacii/?utm_source=yandex_services&utm_medium=marketplace&utm_campaign=profile_main&utm_content=site_button&utm_term=first_step
```

Точная услуга:

```text
https://dokumenty82.ru/otvet-na-trebovanie-ifns/?utm_source=yandex_services&utm_medium=marketplace&utm_campaign=otvet_na_trebovanie_ifns&utm_content=service_card&utm_term=ifns_requirement
```

Контакты / маршрут:

```text
https://dokumenty82.ru/kontakty/?utm_source=yandex_services&utm_medium=marketplace&utm_campaign=office_route&utm_content=profile_contact&utm_term=route
```

Если площадка не принимает UTM, сайт не меняется: источник фиксируется вручную в CRM как `yandex_services_profile`, `yandex_services_order`, `yandex_services_chat` или `yandex_services_call`.

## 5. SEO-задачи после запуска профиля

### 5.1. Проверка индексации

- [ ] Все посадочные из route mapping дают `200`.
- [ ] Все посадочные включены в sitemap, если они approved/index.
- [ ] `/faq/`, `/blog/` и `/internal/` не используются как посадочные для профиля.
- [ ] Canonical у посадочных не содержит UTM.
- [ ] Robots/Clean-param не создает конфликтов с аналитикой.

### 5.2. Проверка контента

- [ ] Заголовки страниц совпадают по смыслу с услугами, но не копируют карточки дословно.
- [ ] На странице есть понятный первый шаг: `Разобрать ситуацию`, `Показать документы`, `Позвонить`.
- [ ] Нет обещаний результата, цен, сроков и гарантий без утверждения.
- [ ] На странице есть внутренняя связка с родительским хабом.
- [ ] Локальная привязка к Симферополю используется естественно, без переспама.

### 5.3. Проверка аналитики

- [ ] UTM попадает в Метрику.
- [ ] Клик по телефону и форме фиксируется.
- [ ] CRM получает source или manual source.
- [ ] Можно отделить переход из профиля от перехода из карточки услуги.
- [ ] Есть weekly review по качественным лидам.

## 6. Как использовать спрос из Яндекс Исполнителей для SEO

1. Еженедельно выгружать или вручную фиксировать темы обращений.
2. Сопоставлять темы с посадочными страницами.
3. Если много смешанного спроса - усиливать `/razbor-situacii/`, а не создавать новые тонкие страницы.
4. Если повторяется конкретный интент и он уже есть на сайте - доработать money-page: добавить блок `что взять`, `как проходит разбор`, `частые ошибки`, `следующий шаг`.
5. Если интента нет на сайте - сначала добавить в route review, а не сразу публиковать страницу.
6. Нельзя использовать клиентские документы как публичный контент.

## 7. Stop / no-go

Не внедрять изменения на сайт, если:

- канал не прошел owner approval;
- профиль требует обещаний, цен или сроков, которых нет в каноне;
- источник лида невозможно отличить от других каналов;
- запрашивается отдельная SEO-страница без самостоятельного поискового интента;
- тексты превращаются в doorway под площадку;
- требуется раскрыть клиентские документы, персональные данные или кейсы.

## 8. Acceptance criteria

- [ ] `docs/marketing/yandex-business/yandex-services/service_matrix.csv` синхронизирован с route mapping.
- [ ] UTM-примеры есть в UTM-реестре.
- [ ] Посадочные страницы проходят техническую проверку.
- [ ] Метрика и CRM могут отличить `yandex_services`.
- [ ] Нет новых thin/doorway pages.
- [ ] Все изменения идут через обычный SEO/release gate сайта.
