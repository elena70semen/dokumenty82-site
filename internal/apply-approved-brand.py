"""Apply the approved light brand to the existing static pages without rebuilding content.

Run after generating pages. Assets live in assets/brand; the supplied ZIP is
only needed when first installing those assets, not when regenerating pages.
"""
from pathlib import Path
import json
import re
import subprocess

ROOT = Path(__file__).resolve().parents[1]
RELEASE = "buh-pravo-20261009"
LOGO = f"/assets/brand/logo-site-{RELEASE}.svg"
STYLE = f"/assets/brand/logo-site-{RELEASE}.css?v=20261012-1"
ALT = "Документы для бизнеса — Бухгалтерия и право"
ICONS = """<link rel="icon" href="/favicon.ico?v=20261012-buh-pravo" sizes="any" />
    <link rel="icon" type="image/png" sizes="32x32" href="/assets/brand/icons/favicon-32.png?v=20261012-buh-pravo" />
    <link rel="icon" type="image/png" sizes="16x16" href="/assets/brand/icons/favicon-16.png?v=20261012-buh-pravo" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=20261012-buh-pravo" />"""


def branded_anchor(match, *, footer=False, portal=False):
    anchor = match.group(0)
    opening = anchor[:anchor.index(">") + 1]
    opening = re.sub(r'\s+aria-label="[^"]*"', "", opening)
    opening = opening[:-1] + ' aria-label="Документы для бизнеса — бухгалтерия и право, главная">'
    if "d82-brand-approved" not in opening:
        opening = re.sub(r'class="([^"]*)"', r'class="\1 d82-brand-approved"', opening)
    image_class = "uh-logo d82-site-logo" if not footer and not portal else "d82-site-logo"
    loading = "lazy" if footer else "eager"
    image = (f'<img src="{LOGO}" class="{image_class}" width="504" height="144" '
             f'alt="{ALT}" loading="{loading}" decoding="async">')
    context = '<span class="portal-brand-context">Личный кабинет</span>' if portal else ""
    return opening + image + context + "</a>"


def apply():
    files = set(subprocess.check_output(["git", "ls-files", "*.html"], cwd=ROOT, text=True).splitlines())
    registry = json.loads((ROOT / "seo-route-registry.json").read_text(encoding="utf-8"))
    for key in ["indexable_routes", "noindex_follow_routes", "noindex_nofollow_routes"]:
        for route in registry[key]:
            relative = route.strip("/")
            name = relative + "/index.html" if relative else "index.html"
            if (ROOT / name).is_file():
                files.add(name)
    changed = []
    for name in sorted(files):
        if name.startswith("internal/"):
            continue
        page = ROOT / name
        old = page.read_text(encoding="utf-8")
        if '<header class="uh"' not in old and 'class="portal-header"' not in old and 'class="site-header"' not in old:
            continue
        text = re.sub(r'<a\b[^>]*class="[^"]*\buh-brand\b[^"]*"[^>]*>.*?</a>',
                      branded_anchor, old, flags=re.S)
        text = re.sub(r'<a\b[^>]*class="[^"]*\bfooter-brand\b[^"]*"[^>]*>.*?</a>',
                      lambda m: branded_anchor(m, footer=True), text, flags=re.S)
        text = re.sub(r'<a\b[^>]*class="[^"]*\bportal-brand\b[^"]*"[^>]*>.*?</a>',
                      lambda m: branded_anchor(m, portal=True), text, flags=re.S)
        for tag in ["header", "footer"]:
            text = re.sub(rf'<{tag}\b.*?</{tag}>',
                          lambda m: re.sub(r'<a\b[^>]*class="brand(?: d82-brand-approved)?"[^>]*>.*?</a>',
                                           lambda a: branded_anchor(a, footer=tag == "footer"), m[0], flags=re.S),
                          text, flags=re.S)
        text = re.sub(r'(<header class="uh"[^>]*)(>)',
                      lambda m: m[0] if 'data-logo-release=' in m[1] else m[1] + f' data-logo-release="{RELEASE}">', text)
        icon_pattern = r'^[ \t]*<link\b[^>]*rel="(?:icon|shortcut icon|apple-touch-icon)"[^>]*>[ \t]*(?:\r?\n)?'
        text = re.sub(icon_pattern, "", text, flags=re.M)
        text = re.sub(r'^[ \t]*<link[^>]*href="' + re.escape(STYLE) + r'"[^>]*>[ \t]*(?:\r?\n)?', "", text, flags=re.M)
        text = text.replace('</head>', f'    {ICONS}\n    <link rel="stylesheet" href="{STYLE}" />\n</head>', 1)
        text = text.replace('/assets/home-v11/shell.js?v=20260927-footer1',
                            '/assets/home-v11/shell.js?v=20261012-brand1')
        # Only Organization logo values; no article copy, OG image or service data changes.
        text = re.sub(r'("logo"\s*:\s*")https://dokumenty82\.ru/[^"\s]+(")',
                      lambda m: m[1] + "https://dokumenty82.ru" + LOGO + m[2], text)
        if text != old:
            page.write_text(text, encoding="utf-8", newline="\n")
            changed.append(name)
    # Internal pages install their shared shell from these existing constants.
    # Preserve every handler and link; only synchronize the approved brand markup.
    home = (ROOT / "index.html").read_text(encoding="utf-8")
    shell_file = ROOT / "assets/home-v11/shell.js"
    shell = shell_file.read_text(encoding="utf-8")
    for constant, tag in [("HEADER", "header"), ("FOOTER", "footer")]:
        markup = re.search(rf'<{tag}\b.*?</{tag}>', home, re.S)[0] + "\n    "
        shell = re.sub(rf'  const {constant} = .*?;\n',
                       lambda m: f"  const {constant} = {json.dumps(markup, ensure_ascii=False)};\n", shell, count=1)
    if shell != shell_file.read_text(encoding="utf-8"):
        shell_file.write_text(shell, encoding="utf-8", newline="\n")
    print(f"Approved brand applied: {len(changed)} pages changed")


if __name__ == "__main__":
    apply()
