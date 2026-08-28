"""Build the public offer from the approved Word text and live-site requisites."""

import argparse
import hashlib
from html import escape
import json
from pathlib import Path
import re
from zipfile import ZipFile

from lxml import etree, html


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "internal" / "offer-source.json"
URL = "https://dokumenty82.ru/oferta/"
NS = {"w": "http://schemas.openxmlformats.org/wordprocessingml/2006/main"}
REQUISITE_FIELDS = ("legalName", "taxID", "registration", "telephone", "email")
LABELS = ("Полное наименование", "ИНН", "ОГРНИП", "Контактный телефон", "Контактный e-mail")


def import_docx(path):
    with ZipFile(path) as archive:
        document = etree.fromstring(archive.read("word/document.xml"))
        numbering = etree.fromstring(archive.read("word/numbering.xml"))
    if document.xpath("//w:tbl | //w:drawing | //w:altChunk", namespaces=NS):
        raise ValueError("Review non-paragraph content before importing")
    paragraphs = []
    counters = {}
    for paragraph in document.xpath("/w:document/w:body/w:p", namespaces=NS):
        text = "".join(paragraph.xpath(".//w:t/text()", namespaces=NS)).strip()
        if not text:
            continue
        row = {"text": text}
        num_id = paragraph.xpath("./w:pPr/w:numPr/w:numId/@w:val", namespaces=NS)
        if num_id:
            level = int(paragraph.xpath("./w:pPr/w:numPr/w:ilvl/@w:val", namespaces=NS)[0])
            abstract = numbering.xpath("./w:num[@w:numId=$id]/w:abstractNumId/@w:val", id=num_id[0], namespaces=NS)[0]
            definition = numbering.xpath("./w:abstractNum[@w:abstractNumId=$id]/w:lvl[@w:ilvl=$level]", id=abstract, level=str(level), namespaces=NS)[0]
            fmt = definition.xpath("./w:numFmt/@w:val", namespaces=NS)[0]
            if fmt == "bullet":
                row["bullet"] = True
            elif fmt == "decimal":
                levels = counters.setdefault(num_id[0], [0] * 9)
                start = int(definition.xpath("./w:start/@w:val", namespaces=NS)[0])
                levels[level] = levels[level] + 1 if levels[level] else start
                levels[level + 1:] = [0] * (8 - level)
                label = definition.xpath("./w:lvlText/@w:val", namespaces=NS)[0]
                row["number"] = re.sub(r"%(\d)", lambda match: str(levels[int(match[1]) - 1]), label)
                row["level"] = level
            else:
                raise ValueError("Unsupported Word numbering")
        paragraphs.append(row)
    if len(paragraphs) != 73 or paragraphs[67]["number"] != "10.":
        raise ValueError("The source structure changed; review before importing")
    # Contact values come only from the website, not the old Word contact block.
    for index, field in enumerate(REQUISITE_FIELDS, 68):
        paragraphs[index] = {"requisite": field}
    source = {
        "published": "2026-08-28",
        "source_sha256": hashlib.sha256(path.read_bytes()).hexdigest(),
        "paragraphs": paragraphs,
    }
    SOURCE.write_text(json.dumps(source, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def build():
    source = json.loads(SOURCE.read_text(encoding="utf-8"))
    template = (ROOT / "rekvizity" / "index.html").read_text(encoding="utf-8")
    tree = html.fromstring(template)
    schema_element = tree.xpath('//script[@type="application/ld+json"]')[0]
    schema = json.loads(schema_element.text)
    business = next(item for item in schema["@graph"] if item.get("@id") == "https://dokumenty82.ru/#business")
    requisites = {field: business[field] for field in ("legalName", "taxID", "email")}
    requisites["registration"] = next(item["value"] for item in business["identifier"] if item["propertyID"] == "ОГРНИП")
    phone = tree.xpath('//a[@href="tel:' + business["telephone"] + '"]')[0]
    requisites["telephone"] = phone.text_content().strip()
    paragraphs = source["paragraphs"]
    section_links = []
    body = []
    opened = False
    for index, row in enumerate(paragraphs[2:], 2):
        number = row.get("number", "")
        prefix = f'<span class="offer-number">{escape(number)} </span>' if number else ""
        if "requisite" in row:
            field = row["requisite"]
            label = LABELS[REQUISITE_FIELDS.index(field)]
            value = escape(requisites[field])
            if field == "telephone":
                value = f'<a href="tel:{escape(business["telephone"], quote=True)}">{value}</a>'
            elif field == "email":
                value = f'<a href="mailto:{escape(requisites[field], quote=True)}">{value}</a>'
            body.append(f'<p data-offer-paragraph="{index}"><strong>{label}:</strong> {value}</p>')
            continue
        content = f'{prefix}<span data-offer-text="{index}">{escape(row["text"])}</span>'
        if row.get("level") == 0:
            if opened:
                body.append("</section>")
            section_id = "offer-section-" + number.rstrip(".")
            body.append(f'<section class="offer-section" aria-labelledby="{section_id}">')
            body.append(f'<h2 id="{section_id}">{content}</h2>')
            section_links.append(f'<li><a href="#{section_id}">{escape(number)} {escape(row["text"])}</a></li>')
            opened = True
        elif index in (7, 24, 30):
            body.append(f"<h3>{content}</h3>")
        elif row.get("bullet"):
            if not paragraphs[index - 1].get("bullet"):
                body.append('<ul class="offer-list">')
            body.append(f"<li>{content}</li>")
            if not paragraphs[index + 1].get("bullet"):
                body.append("</ul>")
        else:
            body.append(f"<p>{content}</p>")
    body.append("</section>")
    main = f'''<main class="offer-page">
      <section class="hero hero-inner">
        <div class="glass-panel hero-copy">
          <p class="eyebrow">Условия оказания услуг</p>
          <h1 data-offer-text="0">{escape(paragraphs[0]["text"])}</h1>
          <p class="offer-subtitle" data-offer-text="1">{escape(paragraphs[1]["text"])}</p>
          <p class="offer-date">Опубликовано: <time datetime="{source["published"]}">28 августа 2026 года</time></p>
          <nav class="offer-toc" aria-label="Содержание оферты"><ol>{"".join(section_links)}</ol></nav>
        </div>
      </section>
      <article class="section offer-document" aria-label="Текст публичной оферты">
        {chr(10).join(body)}
      </article>
    </main>'''
    title = "Публичная оферта | Документы для бизнеса"
    description = "Публичная оферта на оказание услуг: порядок заключения договора, оплаты и оказания услуг, права и обязанности сторон, реквизиты исполнителя."
    result = re.sub(r"<main>[\s\S]*?</main>", lambda _: main, template, count=1)
    result = re.sub(r"<title>.*?</title>", lambda _: f"<title>{title}</title>", result, count=1)
    for attribute, key, value in (
        ("name", "description", description),
        ("property", "og:title", title),
        ("property", "og:description", description),
        ("property", "og:url", URL),
    ):
        pattern = rf'<meta {attribute}="{re.escape(key)}" content="[^"]*" />'
        result, count = re.subn(pattern, lambda _: f'<meta {attribute}="{key}" content="{escape(value, quote=True)}" />', result, count=1)
        if count != 1:
            raise ValueError("Template metadata changed: " + key)
    result = result.replace('<link rel="canonical" href="https://dokumenty82.ru/rekvizity/" />', f'<link rel="canonical" href="{URL}" />')
    schema["@graph"] = [business, {
        "@type": "WebPage", "@id": URL + "#webpage", "url": URL,
        "name": "Публичная оферта", "description": description,
        "inLanguage": "ru-RU", "datePublished": source["published"],
        "about": {"@id": business["@id"]},
    }]
    result = re.sub(r'(<script type="application/ld\+json">)[\s\S]*?(</script>)', lambda match: match[1] + "\n" + json.dumps(schema, ensure_ascii=False, indent=2) + "\n    " + match[2], result, count=1)
    target = ROOT / "oferta" / "index.html"
    target.parent.mkdir(exist_ok=True)
    target.write_text(result, encoding="utf-8")
    print(json.dumps({"page": "oferta/index.html", "paragraphs": len(paragraphs), "sections": len(section_links), "requisites": "rekvizity/index.html"}))


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--import-docx", type=Path)
    args = parser.parse_args()
    if args.import_docx:
        import_docx(args.import_docx)
    build()
