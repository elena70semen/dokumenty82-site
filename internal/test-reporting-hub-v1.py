import json
import re
import unittest
from pathlib import Path

from lxml import html


ROOT = Path(__file__).resolve().parents[1]
PAGE = ROOT / "otchetnost" / "index.html"
EXPECTED_ROUTES = {
    "/sdacha-otchetnosti-ip/",
    "/sdacha-otchetnosti-ooo/",
    "/nulevaya-otchetnost-ip/",
    "/nulevaya-otchetnost-ooo/",
    "/deklaraciya-usn/",
    "/razbor-situacii/?service=one-off-report",
    "/vosstanovlenie-buhucheta/",
}
EXPECTED_NEWS = {
    "/novosti/sroki-uvedomleniy-i-platezhey-iyul-2026/",
    "/novosti/formaty-nds-s-1-iyulya-2026/",
    "/novosti/otvetstvennost-za-prosrochku-otchetnosti-2026/",
    "/novosti/kachestvo-nalogovogo-administrirovaniya-2026/",
}


def text(node):
    return " ".join(" ".join(node.itertext()).split())


class ReportingHubV1Test(unittest.TestCase):
    def setUp(self):
        self.source = PAGE.read_text(encoding="utf-8")
        self.document = html.fromstring(self.source)
        self.main = self.document.xpath("//main[@id='main'][contains(@class,'reporting-hub-page')]")[0]

    def test_seo_contract_and_heading_structure(self):
        self.assertEqual(tuple(len(self.main.xpath(f".//{tag}")) for tag in ("h1", "h2", "h3")), (1, 9, 17))
        self.assertEqual(text(self.main.xpath(".//h1")[0]), "Сдача отчётности в Симферополе для ИП и ООО")
        self.assertEqual(self.document.xpath("string(//title)"), "Сдача отчётности в Симферополе для ИП и ООО | от 3 000 ₽")
        self.assertEqual(
            self.document.xpath("string(//meta[@name='description']/@content)"),
            "Сдача отчётности для ИП и ООО в Симферополе: определим формы по режиму и периоду, проверим данные и подготовим комплект. Стоимость от 3 000 ₽.",
        )
        self.assertEqual(self.document.xpath("string(//meta[@name='robots']/@content)"), "index, follow")
        self.assertEqual(self.document.xpath("string(//meta[@name='googlebot']/@content)"), "index, follow, max-image-preview:large")
        self.assertEqual(self.document.xpath("string(//link[@rel='canonical']/@href)"), "https://dokumenty82.ru/otchetnost/")
        self.assertEqual(self.document.xpath("string(//meta[@property='og:url']/@content)"), "https://dokumenty82.ru/otchetnost/")
        schemas = self.document.xpath("//script[@type='application/ld+json']")
        self.assertEqual(len(schemas), 2)
        for schema in schemas:
            json.loads(schema.text)

    def test_routes_materials_and_assets(self):
        hrefs = set(self.main.xpath(".//a[@href]/@href"))
        self.assertTrue(EXPECTED_ROUTES.issubset(hrefs), EXPECTED_ROUTES - hrefs)
        self.assertIn("Выбрать отчётность", text(self.main))
        self.assertIn("Описать задачу", text(self.main))
        self.assertEqual(len(self.main.xpath(".//form")), 0)
        self.assertEqual(len(self.main.xpath(".//input[@type='file']")), 0)
        self.assertEqual(
            self.document.xpath("//link[contains(@href,'/assets/reporting-hub-v1/page.css')]/@href"),
            ["/assets/reporting-hub-v1/page.css?v=20260923-v1"],
        )

        images = self.main.xpath(".//img[contains(@src,'/assets/reporting-hub-v1/')]")
        self.assertEqual(len(images), 5)
        for image in images:
            self.assertTrue((ROOT / image.get("src").lstrip("/")).is_file(), image.get("src"))
        for srcset in self.main.xpath(".//@srcset"):
            for item in srcset.split(","):
                path = item.strip().split(" ")[0]
                self.assertTrue((ROOT / path.lstrip("/")).is_file(), path)

        materials = self.main.xpath(".//*[@data-cms-slot='reporting-latest-materials']")[0]
        news_hrefs = set(materials.xpath(".//a/@href"))
        self.assertEqual(news_hrefs, EXPECTED_NEWS)
        self.assertEqual(len(materials.xpath(".//a[contains(@class,'news-card')]")), 4)
        self.assertNotIn("cms", text(self.main).lower())
        self.assertNotRegex(text(self.main).lower(), r"актуально на\s+\d")

    def test_document_ids_are_unique(self):
        ids = self.document.xpath("//@id")
        self.assertEqual(len(ids), len(set(ids)))
        self.assertNotIn('action="#"', self.source)
        self.assertNotRegex(self.source, r'<input\b[^>]*\btype=["\']file["\']')


if __name__ == "__main__":
    unittest.main()
