import json
import unittest
from pathlib import Path

from lxml import html


ROOT = Path(__file__).resolve().parents[1]
ROUTE = "adres-egryul-direktor"


def text(node):
    return " ".join(" ".join(node.itertext()).split())


class EgrulHubV1Test(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.source = (ROOT / ROUTE / "index.html").read_text(encoding="utf-8")
        cls.document = html.fromstring(cls.source)
        cls.main = cls.document.xpath("//main[@id='main']")[0]

    def test_content_and_heading_contract(self):
        self.assertEqual(tuple(len(self.main.xpath(f".//{tag}")) for tag in ("h1", "h2", "h3")), (1, 7, 16))
        self.assertEqual(text(self.main.xpath(".//h1")[0]), "Адрес, ЕГРЮЛ и изменения в компании")
        self.assertEqual(len(self.main.xpath(".//form")), 0)
        self.assertIn("от 3 000 ₽", text(self.main))
        self.assertEqual(text(self.main.xpath(".//a[@href='/razbor-situacii/'][1]")[0]), "Описать задачу")
        self.assertEqual(text(self.main.xpath(".//a[@href='/kontakty/'][1]")[0]), "Контакты")

    def test_production_seo_contract(self):
        self.assertEqual(self.document.xpath("string(//title)"), "Адрес, ЕГРЮЛ и изменения в компании | Документы для бизнеса")
        self.assertEqual(
            self.document.xpath("string(//meta[@name='description']/@content)"),
            "Раздел для юридического адреса, изменений сведений, директора и связанных документов компании. Документы для бизнеса, Симферополь, ул. Мате Залки, 1.",
        )
        self.assertEqual(self.document.xpath("string(//meta[@name='robots']/@content)"), "index, follow")
        self.assertEqual(self.document.xpath("string(//meta[@name='googlebot']/@content)"), "index, follow, max-image-preview:large")
        self.assertEqual(self.document.xpath("string(//link[@rel='canonical']/@href)"), "https://dokumenty82.ru/adres-egryul-direktor/")
        self.assertEqual(self.document.xpath("string(//meta[@property='og:url']/@content)"), "https://dokumenty82.ru/adres-egryul-direktor/")
        self.assertEqual(len(self.document.xpath("//script[@type='application/ld+json']")), 2)
        for node in self.document.xpath("//script[@type='application/ld+json']"):
            json.loads(node.text)
        self.assertNotIn("noindex", self.source.lower())

    def test_assets_and_route_links(self):
        images = self.main.xpath(".//img[@src]")
        self.assertEqual(len(images), 5)
        for image in images:
            src = image.get("src")
            self.assertTrue(src.startswith("/assets/egrul-hub-v1/"), src)
            self.assertTrue((ROOT / src.lstrip("/")).is_file(), src)
        for srcset in self.main.xpath(".//@srcset"):
            for item in srcset.split(","):
                src = item.strip().split(" ")[0]
                self.assertTrue((ROOT / src.lstrip("/")).is_file(), src)
        expected_routes = {
            "/yuridicheskiy-adres-simferopol/",
            "/smena-yuridicheskogo-adresa-ooo/",
            "/smena-direktora-ooo/",
            "/nedostovernost-yuridicheskogo-adresa/",
            "/izmenenie-okved-ooo/",
            "/registraciya-ooo/",
        }
        self.assertTrue(expected_routes.issubset(set(self.main.xpath(".//a[@href]/@href"))))
        self.assertEqual(
            self.document.xpath("//link[contains(@href,'/assets/egrul-hub-v1/page.css')]/@href"),
            ["/assets/egrul-hub-v1/page.css?v=20260922-v1"],
        )
        ids = self.document.xpath("//@id")
        self.assertEqual(len(ids), len(set(ids)))


if __name__ == "__main__":
    unittest.main()
