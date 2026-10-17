"""Install the shared menu treatment without changing labels, links or content."""
from pathlib import Path
import re
import subprocess

ROOT = Path(__file__).resolve().parents[1]
STYLE = '/assets/menu-crystal.css?v=20261017-2'


def apply():
    files = subprocess.check_output(['git', 'ls-files', '*.html'], cwd=ROOT, text=True).splitlines()
    changed = []
    for name in files:
        if name.startswith('internal/'):
            continue
        page = ROOT / name
        old = page.read_text(encoding='utf-8')
        if not re.search(r'<header\b[^>]*class="(?:uh|site-header)\b', old):
            continue
        text = re.sub(r'^[ \t]*<link[^>]*href="/assets/menu-crystal\.css(?:\?[^"<>]*)?"[^>]*>[ \t]*\n?', '', old, flags=re.M)
        text = text.replace('</head>', f'    <link rel="stylesheet" href="{STYLE}" />\n</head>', 1)
        if text != old:
            page.write_text(text, encoding='utf-8', newline='\n')
            changed.append(name)
    print(f'Crystal menu installed: {len(changed)} pages changed')


if __name__ == '__main__':
    apply()
