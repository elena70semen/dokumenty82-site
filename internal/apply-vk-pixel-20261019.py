"""Install the shared public analytics include; safe to rerun after page generation.

Only published public routes from the route registry are included. Cabinet,
authentication, internal and error pages deliberately do not load advertising.
"""
from pathlib import Path
import json
import os
import re

ROOT = Path(__file__).resolve().parents[1]
routes = json.loads((ROOT / 'seo-route-registry.json').read_text(encoding='utf-8'))['indexable_routes']
script = '<script src="/assets/vk-pixel.js?v=20261019-1" defer></script>'
fallback = '<noscript><div><img src="https://top-fwz1.mail.ru/counter?id=3805909;js=na" width="1" height="1" style="position:absolute;left:-9999px" referrerpolicy="origin" alt="" /></div></noscript>'
changed = []
for route in routes:
    file = (ROOT / route.strip('/') / 'index.html').resolve()
    assert file.is_relative_to(ROOT)
    original = file.read_text(encoding='utf-8')
    html = original
    if script not in html:
        assert 'vk-pixel.js' not in html and '3805909' not in html, file
        html = html.replace('</head>', '  ' + script + '\n</head>', 1)
        html, count = re.subn(r'(<body\b[^>]*>)', r'\1\n    ' + fallback, html, count=1)
        assert count == 1
    html = re.sub(r'(/assets/lead-form\.js)\?v=[^"\s]+', r'\1?v=20261019-vk-1', html)
    html = re.sub(r'(/assets/ai-chat\.js)\?v=[^"\s]+', r'\1?v=20261019-vk-1', html)
    if route == '/policy/':
        old = 'Сайт может использовать cookies и техническую аналитику для понимания посещаемости и ошибок интерфейса.'
        new = ('Сайт использует Яндекс Метрику (счётчик 109869928) и пиксель VK Рекламы (3805909) '
               'для анализа посещаемости и эффективности рекламы. Сервисы могут использовать cookies и технические сведения о посещении. '
               'В пиксель VK передаётся событие подтверждённой доставки заявки в CRM; имя, телефон, email, текст обращения и файлы из формы в него не передаются.')
        html = html.replace(old, new)
        html = re.sub(r'(<strong>Аналитика и cookies</strong><small>).*?(</small>)',
                      r'\1Яндекс Метрика и пиксель VK: посещаемость и подтверждённые заявки. Контакты и файлы в VK не передаём.\2', html, count=1)
    assert html.count(script) == 1 and html.count(fallback) == 1, file
    if html != original:
        temporary = file.with_name(file.name + '.vk-tmp')
        temporary.write_text(html, encoding='utf-8', newline='')
        os.replace(temporary, file)
        changed.append(str(file.relative_to(ROOT)))
print(json.dumps({'publicRoutes': len(routes), 'changedFiles': changed}, ensure_ascii=False))
