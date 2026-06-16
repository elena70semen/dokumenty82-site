# Yandex Webmaster SEO foundation

Дата фиксации: 2026-06-16  
Домен: `https://dokumenty82.ru`

## 1. Что уже есть в GitHub и должно быть подключено в Вебмастере

### Sitemap

Основной файл карты сайта:

```text
https://dokumenty82.ru/sitemap.xml
```

Файл в репозитории: `public/sitemap.xml`.

В Яндекс.Вебмастере добавить в разделе:

```text
Индексирование → Файлы Sitemap → Добавить файл Sitemap
```

### Robots.txt

Файл robots:

```text
https://dokumenty82.ru/robots.txt
```

Файл в репозитории: `public/robots.txt`.

Ключевые директивы:

```text
User-agent: *
Allow: /
Disallow: /internal/
Host: dokumenty82.ru
Sitemap: https://dokumenty82.ru/sitemap.xml
Clean-param: utm_source&utm_medium&utm_campaign&utm_content&utm_term&utm_id&utm_referrer&yclid&ysclid&from&gclid&fbclid
```

Смысл: публичные коммерческие страницы открыты, внутренние proof-страницы закрыты, карта сайта указана явно, рекламные и трекинговые GET-параметры очищаются для Яндекса.

## 2. Важные страницы для мониторинга в Яндекс.Вебмастере

Добавить в:

```text
Индексирование → Мониторинг важных страниц
```

### Ядро сайта

```text
https://dokumenty82.ru/
https://dokumenty82.ru/razbor-situacii/
https://dokumenty82.ru/kontakty/
```

### Главные коммерческие направления

```text
https://dokumenty82.ru/otvet-na-trebovanie-ifns/
https://dokumenty82.ru/otvet-na-zapros-banka/
https://dokumenty82.ru/dokumenty-dlya-banka-115-fz/
https://dokumenty82.ru/deklaraciya-usn/
https://dokumenty82.ru/nulevaya-otchetnost-ooo/
https://dokumenty82.ru/nulevaya-otchetnost-ip/
https://dokumenty82.ru/yuridicheskiy-adres-simferopol/
https://dokumenty82.ru/smena-yuridicheskogo-adresa-ooo/
https://dokumenty82.ru/nedostovernost-yuridicheskogo-adresa/
https://dokumenty82.ru/registraciya-ooo/
https://dokumenty82.ru/registraciya-ip/
```

### Разделы-хабы для распределения веса

```text
https://dokumenty82.ru/srochnye-voprosy/
https://dokumenty82.ru/otchetnost/
https://dokumenty82.ru/nalogi-i-rezhimy/
https://dokumenty82.ru/bank-i-115-fz/
https://dokumenty82.ru/adres-egryul-direktor/
https://dokumenty82.ru/registraciya-i-likvidaciya/
```

## 3. GET-параметры для настройки в Вебмастере

В разделе:

```text
Индексирование → Настройка GET-параметров
```

пометить как не меняющие содержание страницы:

```text
utm_source
utm_medium
utm_campaign
utm_content
utm_term
utm_id
utm_referrer
yclid
ysclid
from
gclid
fbclid
```

Смысл: рекламные метки должны сохраняться в аналитике, но не создавать дубли страниц в индексе.

## 4. Что не включать в sitemap

Не включать held/noindex маршруты:

```text
/blog/
/blog/obnovleniya-fns/
/blog/razbory/
/faq/
/internal/graphics-proof/
```

`/blog/obnovleniya-fns/` сейчас имеет page-level `robots: { index: false, follow: true }` и не должен попадать в sitemap.

## 5. Технические проверки после деплоя

После merge и деплоя проверить в Вебмастере:

```text
Инструменты → Проверка ответа сервера
```

Минимальный набор:

```text
https://dokumenty82.ru/robots.txt → 200
https://dokumenty82.ru/sitemap.xml → 200
https://dokumenty82.ru/ → 200
https://dokumenty82.ru/razbor-situacii/ → 200
https://dokumenty82.ru/nonexistent-404-check → 404
```

Дополнительно проверить редиректы зеркал:

```text
http://dokumenty82.ru/ → https://dokumenty82.ru/
https://www.dokumenty82.ru/ → https://dokumenty82.ru/
```

## 6. Цель настройки

Цель не просто добавить sitemap, а собрать SEO-контур:

1. Яндекс видит полный список публичных коммерческих URL.
2. Дубли от рекламных GET-параметров не раздувают индекс.
3. Главные страницы стоят на мониторинге.
4. Noindex/held-разделы не попадают в sitemap.
5. Вебмастер используется как контроль индексации, а не просто как техническая панель.
