"""Put topic-specific live text over the existing illustrated hero assets."""

from __future__ import annotations

import html
import re
from pathlib import Path

from apply_remaining_heroes import LABELS


ROOT = Path(__file__).resolve().parents[1]
OVERRIDES = {
    "akcii": ("Предложения центра", ("Проверим условия", "Согласуем состав", "Назовём цену до старта")),
    "blog": ("Практические разборы", ("Факты из ситуации", "Официальный источник", "Понятный маршрут")),
    "ceny": ("Расчёт стоимости", ("Объём задачи", "Состав документов", "Цена до начала")),
    "kadry": ("Кадровый комплект", ("Приём и договор", "Кадровые события", "Отчётность работодателя")),
    "novosti": ("Обзор сообщений ФНС", ("Источник и дата", "Налоги, формы, сроки", "Что проверить ИП и ООО")),
    "uslugi": ("Направления работы", ("Учёт и отчётность", "Регистрация и изменения", "Банк и ИФНС")),
    "o-proekte": ("Как работает центр", ("Разбор задачи", "Проверка экспертом", "Готовый комплект")),
    "kontakty": ("Связаться с центром", ("Позвонить в офис", "Написать специалисту", "Передать документы")),
    "otzyvy": ("Опыт клиентов", ("Исходная задача", "Как шла работа", "Результат для клиента")),
    "faq": ("Частые вопросы", ("Уточняем ситуацию", "Проверяем документы", "Объясняем следующий шаг")),
}


def art(slug: str) -> str:
    title, steps = OVERRIDES.get(slug, LABELS[slug])
    rows = "".join(
        f'<li><span aria-hidden="true">✓</span>{html.escape(step)}</li>'
        for step in steps
    )
    return (
        '<div class="remaining-hero-art-text" aria-hidden="true">'
        '<span class="remaining-art-kicker">Документы для бизнеса</span>'
        f'<strong>{html.escape(title)}</strong>'
        f'<ul>{rows}</ul>'
        '</div>'
    )


def main() -> None:
    changed = 0
    for slug in LABELS:
        parts = slug.split("-")
        if slug.startswith("novosti-"):
            path = ROOT / "novosti" / slug.removeprefix("novosti-") / "index.html"
        elif slug == "blog-razbory":
            path = ROOT / "blog" / "razbory" / "index.html"
        else:
            path = ROOT / slug / "index.html"
        if not path.exists():
            # The slugs in LABELS correspond to sitemap paths but a few
            # hyphenated news filenames require a direct lookup below.
            candidates = [p for p in ROOT.rglob("index.html") if p.parent.relative_to(ROOT).as_posix().replace("/", "-") == slug]
            if len(candidates) != 1:
                raise ValueError(f"Cannot resolve {slug}: {candidates}")
            path = candidates[0]
        source = path.read_text(encoding="utf-8")
        match = re.search(r'<figure class="remaining-hero-visual">([\s\S]*?)</figure>', source)
        if not match:
            raise ValueError(f"Missing art figure: {slug}")
        figure = match.group()
        if "remaining-hero-art-text" in figure:
            continue
        old = re.search(r'<div class="remaining-hero-diagram">[\s\S]*</div></figure>', figure)
        if not old:
            raise ValueError(f"Missing prior diagram: {slug}")
        new_figure = figure[:old.start()] + art(slug) + '</figure>'
        source = source[:match.start()] + new_figure + source[match.end():]
        path.write_text(source, encoding="utf-8", newline="\n")
        changed += 1
    print(f"Added exact live art copy to {changed} illustrated heroes")


if __name__ == "__main__":
    main()
