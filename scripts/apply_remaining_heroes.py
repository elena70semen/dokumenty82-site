"""Apply the shared illustrated hero to public pages without the service hero."""

from __future__ import annotations

import html
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "assets" / "remaining-heroes-v1"
STYLESHEET = '<link rel="stylesheet" href="/assets/remaining-heroes-v1/page.css?v=20260925-1" />'
IMAGE_VARIANTS = {
    "ausn-krym": "ausn-krym-v2",
    "novosti-nalogovyy-kalendar": "novosti-nalogovyy-kalendar-v2",
    "novosti-porog-nds-usn-20-mln-do-2029": "novosti-porog-nds-usn-20-mln-do-2029-v3",
}


def tidy(source: str) -> str:
    return re.sub(r"(?m)^[ \t]+$", "", source)
LABELS: dict[str, tuple[str, tuple[str, str, str]]] = {
    "akcii": ("Акции для бизнеса", ("Проверка условий", "Подбор услуги", "Ясная стоимость")),
    "ausn-krym": ("АУСН в Крыму", ("Право на режим", "Расчёт налогов", "План перехода")),
    "blog": ("База знаний", ("Разбор вопроса", "Практический ответ", "Следующий шаг")),
    "blog-razbory": ("Разборы ситуаций", ("Факты и документы", "Риски и сроки", "Решение по делу")),
    "deklaraciya-usn": ("Декларация УСН", ("Проверка данных", "Расчёт показателей", "Готовая декларация")),
    "faq": ("Ответы на вопросы", ("Ваш вопрос", "Проверка деталей", "Понятный ответ")),
    "kadry": ("Кадровые документы", ("Приём и договор", "Учёт изменений", "Порядок в кадрах")),
    "kontakty": ("Связь с центром", ("Выберите канал", "Опишите задачу", "Получите ответ")),
    "nalogi-i-rezhimy": ("Налоговый режим", ("Данные бизнеса", "Сравнение режимов", "Обоснованный выбор")),
    "nds-pri-usn-2026": ("НДС при УСН", ("Проверка порога", "Расчёт НДС", "План действий")),
    "nedostovernost-yuridicheskogo-adresa": ("Адрес под проверкой", ("Причина записи", "Подтверждения", "Исправление ЕГРЮЛ")),
    "novosti": ("Новости для бизнеса", ("Что изменилось", "Кого касается", "Что делать")),
    "novosti-nalogovyy-kalendar": ("Налоговый календарь", ("Сроки отчётов", "Сроки платежей", "План на месяц")),
    "novosti-otchetnost-sfr-kep-do-1-sentyabrya-2026": ("Отчётность СФР", ("Проверить КЭП", "Уточнить срок", "Сдать отчёт")),
    "novosti-sroki-otchetnosti-i-platezhey-avgust-2026": ("Сроки августа", ("Отчётные даты", "Платежи", "Контроль срока")),
    "novosti-nalogovye-uvedomleniya-gosuslugi-s-1-avgusta-2026": ("Уведомления онлайн", ("Новый канал", "Проверка доступа", "Получение письма")),
    "novosti-edinaya-forma-uvedomleniya-usn-s-1-iyulya-2026": ("Форма УСН", ("Что обновилось", "Какие данные", "Как подать")),
    "novosti-sroki-uvedomleniy-i-platezhey-iyul-2026": ("Сроки июля", ("Уведомления", "Платежи", "Календарь действий")),
    "novosti-porog-nds-usn-20-mln-do-2029": ("Порог НДС и УСН", ("Контроль дохода", "Проверка порога", "План по НДС")),
    "novosti-doverennye-lica-inostrannyh-organizaciy-tks": ("Доверенное лицо", ("Полномочия", "Канал ТКС", "Подача документов")),
    "novosti-kachestvo-nalogovogo-administrirovaniya-2026": ("Налоговое администрирование", ("Показатели", "Что меняется", "Влияние на бизнес")),
    "novosti-nalogovye-vebinary-iyul-2026": ("Налоговые вебинары", ("Темы июля", "Регистрация", "Полезные разъяснения")),
    "novosti-ndfl-2025-deklaracii-posle-kampanii": ("Декларация НДФЛ", ("После кампании", "Проверка данных", "Подача формы")),
    "novosti-servis-vypiski-na-nalogovyy-vychet": ("Выписка для вычета", ("Онлайн-запрос", "Проверка данных", "Готовая выписка")),
    "novosti-uplata-nalogov-i-poshlin-razdel-fns": ("Налоги и пошлины", ("Выбор платежа", "Проверка реквизитов", "Оплата онлайн")),
    "nulevaya-otchetnost-ip": ("Нулевая отчётность ИП", ("Проверка периода", "Нужные формы", "Сдача без ошибок")),
    "nulevaya-otchetnost-ooo": ("Нулевая отчётность ООО", ("Проверка операций", "Комплект форм", "Сдача в срок")),
    "o-proekte": ("Центр документов", ("Ваша задача", "Проверка экспертом", "Готовое решение")),
    "otvet-na-trebovanie-ifns": ("Требование ИФНС", ("Разобрать запрос", "Собрать документы", "Подготовить ответ")),
    "policy": ("Защита данных", ("Какие данные", "Как храним", "Ваши права")),
    "raschet-nalogovoy-nagruzki": ("Налоговая нагрузка", ("Исходные цифры", "Расчёт показателя", "Оценка риска")),
    "rekvizity": ("Реквизиты центра", ("Данные организации", "Проверка деталей", "Для договора и оплаты")),
    "razbor-situacii": ("Разбор ситуации", ("Факты и сроки", "Проверка рисков", "План решения")),
    "soprovozhdenie": ("Сопровождение бизнеса", ("Текущие задачи", "Контроль сроков", "Поддержка команды")),
    "sverka-s-nalogovoy": ("Сверка с налоговой", ("Данные учёта", "Сравнение с ФНС", "Устранение расхождений")),
    "uslugi": ("Услуги центра", ("Выберите задачу", "Уточним состав", "Подготовим результат")),
    "otzyvy": ("Опыт клиентов", ("Реальная задача", "Как помогли", "Результат работы")),
    "ceny": ("Цены на услуги", ("Состав работы", "Стоимость и срок", "Без скрытых услуг")),
    "novosti-formaty-nds-s-1-iyulya-2026": ("Форматы НДС", ("Новые документы", "Проверка системы", "Готовность к сдаче")),
    "novosti-otvetstvennost-za-prosrochku-otchetnosti-2026": ("Срок отчётности", ("Что просрочено", "Последствия", "Как исправить")),
    "novosti-podderzhka-biznesa-krym-chrezvychaynaya-situaciya": ("Поддержка бизнеса", ("Меры в Крыму", "Условия помощи", "Порядок обращения")),
    "likvidaciya-ip": ("Закрытие ИП", ("Проверка обязательств", "Документы в ФНС", "Завершение статуса")),
    "sdacha-otchetnosti-ooo": ("Отчётность ООО", ("Собрать данные", "Проверить формы", "Сдать в срок")),
    "izmenenie-okved-ooo": ("ОКВЭД для ООО", ("Выбрать коды", "Оформить решение", "Внести в ЕГРЮЛ")),
    "oferta": ("Публичная оферта", ("Условия услуг", "Права сторон", "Порядок работы")),
    "smena-buhgaltera": ("Смена бухгалтера", ("Передача базы", "Проверка учёта", "Новый порядок работы")),
}


def first_section(source: str) -> tuple[int, int]:
    main = re.search(r"<main\b[^>]*>", source)
    if main is None:
        raise ValueError("main missing")
    start = source.find("<section", main.end())
    if start < 0:
        raise ValueError("section missing")
    depth = 0
    for match in re.finditer(r"</?section\b[^>]*>", source[start:], re.I):
        depth += -1 if match.group().startswith("</") else 1
        if depth == 0:
            return start, start + match.end()
    raise ValueError("unclosed section")


def plain_h1(section: str) -> str:
    match = re.search(r"<h1\b[^>]*>(.*?)</h1>", section, re.S | re.I)
    if match is None:
        raise ValueError("hero h1 missing")
    return html.unescape(re.sub(r"<[^>]+>", "", match.group(1))).strip()


def diagram(slug: str) -> str:
    heading, steps = LABELS[slug]
    items = "".join(
        f'<span><b>{number:02d}</b>{html.escape(step)}</span>'
        for number, step in enumerate(steps, 1)
    )
    return (
        '<div class="remaining-hero-diagram">'
        f'<strong class="remaining-hero-diagram-title">{html.escape(heading)}</strong>'
        f'<div class="remaining-hero-diagram-steps">{items}</div>'
        '</div>'
    )


def visual(slug: str, title: str) -> str:
    escaped = html.escape(title, quote=True)
    image_name = IMAGE_VARIANTS.get(slug, slug)
    return (
        '\n        <figure class="remaining-hero-visual">'
        f'<img src="/assets/remaining-heroes-v1/{image_name}.webp" '
        f'srcset="/assets/remaining-heroes-v1/{image_name}-640.webp 640w, '
        f'/assets/remaining-heroes-v1/{image_name}.webp 1024w" '
        'sizes="(max-width: 980px) calc(100vw - 76px), (max-width: 1536px) 45vw, 680px" '
        f'alt="Иллюстрация к теме: {escaped}" width="1024" height="576" '
        'loading="eager" fetchpriority="high" decoding="async" />'
        + diagram(slug)
        + "</figure>\n      "
    )


def special_hero(source: str, slug: str) -> str:
    match = re.search(r'<h1 class="visually-hidden">(.*?)</h1>', source, re.S)
    if match is None:
        raise ValueError(f"{slug}: hidden h1 missing")
    title = html.unescape(match.group(1)).strip()
    if slug == "rekvizity":
        start, end = first_section(source)
        source = source[:start] + source[end:]
        match = re.search(r'<h1 class="visually-hidden">(.*?)</h1>', source, re.S)
        assert match is not None
    if slug == "kontakty":
        eyebrow = "Связаться с нами"
        lead = "Выберите удобный способ связи. Поможем разобраться с задачей и подскажем следующий шаг."
    else:
        eyebrow = "Официальные данные"
        lead = "Реквизиты центра подготовки документов и сведения для договоров и оплаты."
    hero = (
        '<section class="hero hero-inner remaining-hero">\n'
        '        <div class="remaining-hero-copy">\n'
        f'          <p class="eyebrow">{eyebrow}</p>\n'
        f'          <h1>{html.escape(title)}</h1>\n'
        f'          <p>{lead}</p>\n'
        '        </div>'
        + visual(slug, title)
        + "</section>"
    )
    source = source[: match.start()] + hero + source[match.end() :]
    return source


def apply_page(path: Path) -> None:
    slug = path.parent.relative_to(ROOT).as_posix().replace("/", "-")
    asset = ASSETS / f"{IMAGE_VARIANTS.get(slug, slug)}.webp"
    if not asset.exists():
        raise FileNotFoundError(asset)
    source = path.read_text(encoding="utf-8")
    if "remaining-hero" in source:
        raise ValueError(f"{slug}: already converted")
    if slug in {"kontakty", "rekvizity"}:
        source = special_hero(source, slug)
    else:
        start, end = first_section(source)
        section = source[start:end]
        if not re.search(r'<section class="[^"]*\bhero\b', section):
            raise ValueError(f"{slug}: first section is not a hero")
        title = plain_h1(section)
        followup = ""
        aside = re.search(r"\s*<aside\b[\s\S]*?</aside>", section)
        if aside:
            followup = aside.group().strip()
            followup = re.sub(
                r'(<aside\b[^>]*class=")([^"]*)',
                r"\1\2 remaining-hero-followup",
                followup,
                count=1,
            )
            section = section[: aside.start()] + section[aside.end() :]
        if slug == "oferta":
            toc = re.search(r"\s*<nav class=\"offer-toc\"[\s\S]*?</nav>", section)
            if toc is None:
                raise ValueError("offer table of contents missing")
            followup = toc.group().strip().replace(
                'class="offer-toc"', 'class="offer-toc remaining-hero-followup"', 1
            )
            section = section[: toc.start()] + section[toc.end() :]
        section = re.sub(
            r'(<section\s+class=")([^"]*)',
            r"\1\2 remaining-hero",
            section,
            count=1,
        )
        close = section.rfind("</section>")
        section = section[:close] + visual(slug, title) + section[close:]
        if followup:
            section += "\n      " + followup
        source = source[:start] + section + source[end:]
    if STYLESHEET not in source:
        source = source.replace("</head>", f"  {STYLESHEET}\n  </head>", 1)
    path.write_text(tidy(source), encoding="utf-8", newline="\n")


def move_hero_details(source: str) -> str:
    if "remaining-hero-details" in source:
        return source
    start, end = first_section(source)
    section = source[start:end]
    if "remaining-hero" not in section:
        return source
    patterns = (
        r'\s*<p class="hero-location-badge"[\s\S]*?</p>',
        r'\s*<div class="service-price-note"[\s\S]*?</div>',
        r'\s*<p class="conversion-one-off-link"[\s\S]*?</p>',
    )
    details = []
    for pattern in patterns:
        match = re.search(pattern, section)
        if match:
            details.append(match.group().strip())
            section = section[: match.start()] + section[match.end() :]
    if not details:
        return source
    bar = '\n      <div class="remaining-hero-details">' + "".join(details) + "</div>"
    return source[:start] + section + bar + source[end:]


def main() -> None:
    pages = sorted(ROOT.glob("**/index.html"))
    converted = []
    for path in pages:
        if any(part.startswith(".") for part in path.relative_to(ROOT).parts):
            continue
        source = path.read_text(encoding="utf-8")
        if "<main" not in source:
            continue
        slug = path.parent.relative_to(ROOT).as_posix().replace("/", "-")
        if "remaining-hero-visual" in source:
            if slug in IMAGE_VARIANTS:
                source = re.sub(
                    rf"/assets/remaining-heroes-v1/{re.escape(slug)}(?=\.webp|-640\.webp)",
                    f"/assets/remaining-heroes-v1/{IMAGE_VARIANTS[slug]}",
                    source,
                )
            if slug in LABELS and "remaining-hero-diagram" not in source:
                source, count = re.subn(
                    r'(<figure class="remaining-hero-visual">[\s\S]*?)(</figure>)',
                    lambda match: match.group(1) + diagram(slug) + match.group(2),
                    source,
                    count=1,
                )
                if count != 1:
                    raise ValueError(f"{slug}: visual figure missing")
            source = move_hero_details(source)
            path.write_text(tidy(source), encoding="utf-8", newline="\n")
            continue
        first = re.search(r"<main\b[^>]*>[\s\S]*?<section\b[^>]*>", source)
        if first is None:
            continue
        if 'class="service-hero"' in first.group() or path == ROOT / "index.html":
            continue
        if not (ASSETS / f"{IMAGE_VARIANTS.get(slug, slug)}.webp").exists():
            continue
        apply_page(path)
        converted.append(slug)
    print(f"Converted {len(converted)} pages")
    print("\n".join(converted))


if __name__ == "__main__":
    main()
