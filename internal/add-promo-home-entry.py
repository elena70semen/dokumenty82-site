"""Insert the approved promotion entry in the current home design, once."""

from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
HOME = ROOT / "index.html"
html = HOME.read_text(encoding="utf-8")
if 'id="accounting-legal-promo"' not in html:
    marker = '<section aria-labelledby="situations-heading"'
    if html.count(marker) != 1:
        raise SystemExit("Home section anchor changed; inspect before editing")
    entry = '''<section class="home-promo-entry" id="accounting-legal-promo" aria-labelledby="home-promo-title"><div class="container home-promo-inner"><div><p class="eyebrow">Предложение для ИП и малого бизнеса</p><h2 id="home-promo-title">Бухгалтерия + право — скидка 50%</h2><p>По единому договору скидка 50% на общую стоимость сопровождения действует на каждый платёж весь срок договора. С 28 сентября 2026 года, без даты окончания.</p></div><a class="button button-primary" href="/buhgalteriya-pravo-50/">Посмотреть условия акции</a></div></section>'''
    html = html.replace(marker, entry + marker, 1)
css = '<link rel="stylesheet" href="/assets/promo-buh-pravo-50.css?v=20261001-1" />'
if css not in html:
    html = html.replace("</head>", f"    {css}\n  </head>", 1)
HOME.write_text(html, encoding="utf-8")
