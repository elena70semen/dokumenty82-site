import re
import unittest
from pathlib import Path

from lxml import html


ROOT = Path(__file__).resolve().parents[1]
ROUTES = (
    "",
    "registraciya-ip",
    "smena-yuridicheskogo-adresa-ooo",
    "smena-direktora-ooo",
    "likvidaciya-ooo",
    "registraciya-ooo",
    "izmenenie-okved-ip",
    "yuridicheskiy-adres-simferopol",
    "adres-egryul-direktor",
    "dokumenty-dlya-banka-115-fz",
    "otvet-na-zapros-banka",
    "bank-i-115-fz",
    "srochnye-voprosy",
    "registraciya-i-likvidaciya",
    "buhgalterskie-uslugi",
    "buhgalterskoe-soprovozhdenie-ooo",
    "vosstanovlenie-buhucheta",
)
BANNED_VISIBLE_TEXT = (
    "динамический блок",
    "обновляются через cms",
    "production",
    "backend",
    "codex",
)


def compact_text(node):
    return " ".join(" ".join(node.itertext()).split())


class RedesignedPagesQualityTest(unittest.TestCase):
    def test_all_redesigned_pages_have_clean_content_and_structure(self):
        for route in ROUTES:
            with self.subTest(route=f"/{route}/" if route else "/"):
                path = ROOT / route / "index.html" if route else ROOT / "index.html"
                source = path.read_text(encoding="utf-8")
                document = html.fromstring(source)
                main = document.xpath("//main")[0]
                visible_text = compact_text(main)

                self.assertEqual(len(main.xpath(".//h1")), 1)
                self.assertGreater(len(visible_text), 1200)
                self.assertNotIn("�", source)
                self.assertNotIn('action="#"', source)
                self.assertNotRegex(source, r'<input\b[^>]*\btype=["\']file["\']')
                for phrase in BANNED_VISIBLE_TEXT:
                    self.assertNotIn(phrase, visible_text.lower())

                headings = main.xpath(".//h1|.//h2|.//h3")
                self.assertTrue(headings)
                for heading in headings:
                    self.assertTrue(compact_text(heading), html.tostring(heading, encoding="unicode"))

                ids = document.xpath("//@id")
                self.assertEqual(len(ids), len(set(ids)))
                self.assertEqual(document.xpath("string(//meta[@name='robots']/@content)"), "index, follow")
                expected = "https://dokumenty82.ru/" + (f"{route}/" if route else "")
                self.assertEqual(document.xpath("string(//link[@rel='canonical']/@href)"), expected)

                related_links = main.xpath(
                    ".//*[contains(concat(' ',normalize-space(@class),' '),' service-related-links ')]//a"
                )
                for link in related_links:
                    label = compact_text(link)
                    self.assertTrue(label)
                    self.assertLessEqual(len(label), 45, label)

                cards = main.xpath(
                    ".//*[contains(concat(' ',normalize-space(@class),' '),' glass-card ') "
                    "or contains(concat(' ',normalize-space(@class),' '),' service-card ') "
                    "or contains(concat(' ',normalize-space(@class),' '),' result-card ') "
                    "or contains(concat(' ',normalize-space(@class),' '),' faq-card ') "
                    "or contains(concat(' ',normalize-space(@class),' '),' news-card ')]"
                )
                for card in cards:
                    self.assertTrue(
                        compact_text(card) or card.xpath(".//img|.//svg"),
                        html.tostring(card, encoding="unicode"),
                    )

                for src in main.xpath(".//img[starts-with(@src,'/')]/@src"):
                    clean_src = re.split(r"[?#]", src, maxsplit=1)[0]
                    self.assertTrue((ROOT / clean_src.lstrip("/")).is_file(), src)


if __name__ == "__main__":
    unittest.main()
