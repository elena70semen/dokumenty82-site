import json
import unittest
from pathlib import Path

from lxml import html


ROOT = Path(__file__).resolve().parents[1]
PAGE = ROOT / "sdacha-otchetnosti-ip" / "index.html"


def text(node):
    return " ".join(" ".join(node.itertext()).split())


class IpReportingV1Test(unittest.TestCase):
    def setUp(self):
        self.source = PAGE.read_text(encoding="utf-8")
        self.document = html.fromstring(self.source)
        self.main = self.document.xpath("//main[@id='main'][contains(@class,'ip-reporting-page')]")[0]

    def test_seo_and_content_contract(self):
        self.assertEqual(tuple(len(self.main.xpath(f".//{tag}")) for tag in ("h1", "h2", "h3")), (1, 10, 27))
        self.assertEqual(text(self.main.xpath(".//h1")[0]), "Сдача отчётности ИП в Симферополе")
        self.assertEqual(self.document.xpath("string(//title)"), "Сдача отчётности ИП в Симферополе | от 3 000 ₽")
        self.assertEqual(
            self.document.xpath("string(//meta[@name='description']/@content)"),
            "Сдача отчётности ИП в Симферополе: УСН, патент, ОСНО и формы по сотрудникам. Проверим период, операции и данные, подготовим комплект. От 3 000 ₽.",
        )
        self.assertEqual(self.document.xpath("string(//meta[@name='robots']/@content)"), "index, follow")
        self.assertEqual(self.document.xpath("string(//meta[@name='googlebot']/@content)"), "index, follow, max-image-preview:large")
        canonical = "https://dokumenty82.ru/sdacha-otchetnosti-ip/"
        self.assertEqual(self.document.xpath("string(//link[@rel='canonical']/@href)"), canonical)
        self.assertEqual(self.document.xpath("string(//meta[@property='og:url']/@content)"), canonical)
        schemas = self.document.xpath("//script[@type='application/ld+json']")
        self.assertEqual(len(schemas), 2)
        for schema in schemas:
            json.loads(schema.text)
        page_text = text(self.main)
        for phrase in ("УСН", "ПСН", "ОСНО", "АУСН", "НДС", "РСВ", "6‑НДФЛ", "ЕФС‑1", "квитанции"):
            self.assertIn(phrase, page_text)
        self.assertIn("Определить комплект", page_text)
        self.assertIn("от 3 000 ₽", page_text)
        self.assertNotIn("production", page_text.lower())

    def test_production_form_contract(self):
        forms = self.main.xpath(".//form[@action='/api/lead'][@method='post'][@data-lead-form='amo']")
        self.assertEqual(len(forms), 1)
        form = forms[0]
        fields = {node.get("name"): node for node in form.xpath(".//input|.//textarea")}
        self.assertEqual(set(fields), {"source_page", "task_type", "lead_mode", "company_website", "name", "phone", "message", "privacy"})
        self.assertEqual(fields["source_page"].get("value"), "/sdacha-otchetnosti-ip/")
        self.assertEqual(fields["task_type"].get("value"), "Сдача отчётности ИП")
        self.assertEqual(fields["lead_mode"].get("value"), "quick")
        self.assertIsNotNone(fields["phone"].get("required"))
        self.assertIsNotNone(fields["privacy"].get("required"))
        self.assertFalse(form.xpath(".//input[@type='file']"))
        self.assertNotIn("enctype", form.attrib)
        self.assertEqual(text(form.xpath(".//button[@type='submit']")[0]), "Получить состав и стоимость")
        self.assertEqual(len(form.xpath(".//*[@role='status'][@aria-live='polite']")), 1)

    def test_assets_links_and_ids(self):
        self.assertEqual(
            self.document.xpath("//link[contains(@href,'/assets/ip-reporting-v1/page.css')]/@href"),
            ["/assets/ip-reporting-v1/page.css?v=20260924-v1"],
        )
        images = self.main.xpath(".//img[contains(@src,'/assets/ip-reporting-v1/')]")
        self.assertEqual(len(images), 5)
        for image in images:
            self.assertTrue((ROOT / image.get("src").lstrip("/")).is_file(), image.get("src"))
        for srcset in self.main.xpath(".//@srcset"):
            for item in srcset.split(","):
                path = item.strip().split(" ")[0]
                self.assertTrue((ROOT / path.lstrip("/")).is_file(), path)
        hrefs = set(self.main.xpath(".//a/@href"))
        self.assertTrue({"#reporting-request", "tel:+79789987222", "/policy/"}.issubset(hrefs))
        ids = self.document.xpath("//@id")
        self.assertEqual(len(ids), len(set(ids)))
        self.assertNotIn('action="#"', self.source)


if __name__ == "__main__":
    unittest.main()
