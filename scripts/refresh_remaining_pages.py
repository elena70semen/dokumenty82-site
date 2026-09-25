"""Give legacy public sections the same full-width rhythm as archive pages.

Only adds a presentational wrapper and a class. Existing copy, links, forms,
headings, and structured data remain byte-for-byte inside the wrapper.
"""

from __future__ import annotations

import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
STYLE = '<link rel="stylesheet" href="/assets/remaining-heroes-v1/content.css?v=20260925-2" />'
TAG = re.compile(r"</?section\b[^>]*>", re.I)


def transform(source: str) -> str:
    if 'class="remaining-page' not in source and ' remaining-page' not in source:
        return source
    main_start = re.search(r"<main\b[^>]*>", source, re.I)
    main_end = re.search(r"</main>", source, re.I)
    if not main_start or not main_end:
        raise ValueError("main element missing")
    body = source[main_start.end():main_end.start()]
    sections: list[tuple[int, int]] = []
    depth = 0
    start = -1
    for tag in TAG.finditer(body):
        if tag.group().startswith("</"):
            depth -= 1
            if depth == 0:
                sections.append((start, tag.end()))
        else:
            if depth == 0:
                start = tag.start()
            depth += 1
        if depth < 0:
            raise ValueError("unbalanced sections")
    if depth:
        raise ValueError("unclosed section")
    for start, end in reversed(sections):
        section = body[start:end]
        opening = re.match(r"<section\b[^>]*>", section, re.I)
        if not opening or not re.search(r'\bclass="[^"]*\bsection\b', opening.group()):
            continue
        if "remaining-content-section" in opening.group():
            continue
        head = opening.group().replace('class="', 'class="remaining-content-section ', 1)
        content = section[opening.end():section.rfind("</section>")]
        replacement = (
            head
            + '\n      <div class="remaining-section-inner">'
            + content
            + "\n      </div>\n    </section>"
        )
        body = body[:start] + replacement + body[end:]
    source = source[:main_start.end()] + body + source[main_end.start():]
    if STYLE not in source:
        source = source.replace("</head>", f"  {STYLE}\n  </head>", 1)
    return source


def main() -> None:
    changed = 0
    for path in ROOT.rglob("index.html"):
        if any(part.startswith(".") for part in path.relative_to(ROOT).parts):
            continue
        source = path.read_text(encoding="utf-8")
        new = transform(source)
        if new != source:
            path.write_text(new, encoding="utf-8", newline="\n")
            changed += 1
    print(f"Updated {changed} remaining public pages")


if __name__ == "__main__":
    main()
