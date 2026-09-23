import json
import unittest
from pathlib import Path

from lxml import html


ROOT = Path(__file__).resolve().parents[1]
ROUTE = "buhgalterskie-uslugi"
REQUIRED_ROUTES = {
    "/soprovozhdenie/",
    "/buhgalterskoe-soprovozhdenie-ooo/",
    "/vosstanovlenie-buhucheta/",
    "/otchetnost/",
    "/sdacha-otchetnosti-ip/",
    "/sdacha-otchetnosti-ooo/",
    "/nulevaya-otchetnost-ip/",
    "/nulevaya-otchetnost-ooo/",
    "/deklaraciya-usn/",
    "/ceny/#tarify",
    "/razbor-situacii/",
    "/smena-buhgaltera/",
    "/nalogi-i-rezhimy/",
    "/sverka-s-nalogovoy/",
    "/otvet-na-trebovanie-ifns/",
    "/kadry/",
    "/raschet-nalogovoy-nagruzki/",
}


def node_text(node):
    return " ".join(" ".join(node.itertext()).split())


class AccountingServicesV1Test(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.source = (ROOT / ROUTE / "index.html").read_text(encoding="utf-8")
        cls.document = html.fromstring(cls.source)
        cls.main = cls.document.xpath("//main[@id='main'][contains(@class,'accounting-page')]")[0]

    def test_page_and_seo_contract(self):
        self.assertEqual(tuple(len(self.main.xpath(f".//{tag}")) for tag in ("h1", "h2", "h3")), (1, 10, 16))
        self.assertEqual(node_text(self.main.xpath(".//h1")[0]), "Бухгалтерские услуги для ИП и ООО в Симферополе")
        self.assertIn("от 10 000 ₽ / месяц", node_text(self.main))
        self.assertEqual(self.document.xpath("string(//title)"), "Бухгалтерские услуги в Симферополе для ИП и ООО | старт 10 000 ₽")
        self.assertEqual(self.document.xpath("string(//meta[@name='description']/@content)"), "Бухгалтерские услуги для ИП и ООО в Симферополе: стартовый полный период 10 000 ₽ один раз, далее сопровождение от 15 000 ₽ в месяц.")
        self.assertEqual(self.document.xpath("string(//meta[@name='robots']/@content)"), "index, follow")
        self.assertEqual(self.document.xpath("string(//meta[@name='googlebot']/@content)"), "index, follow, max-image-preview:large")
        self.assertEqual(self.document.xpath("string(//link[@rel='canonical']/@href)"), "https://dokumenty82.ru/buhgalterskie-uslugi/")
        self.assertEqual(self.document.xpath("string(//meta[@property='og:url']/@content)"), "https://dokumenty82.ru/buhgalterskie-uslugi/")
        schemas = self.document.xpath("//script[@type='application/ld+json']")
        self.assertEqual(len(schemas), 2)
        for schema in schemas:
            json.loads(schema.text)
        self.assertNotIn("noindex", self.source.lower())
        self.assertNotIn('action="#"', self.source)

    def test_form_uses_live_safe_contract(self):
        forms = self.main.xpath(".//form[@action='/api/lead'][@method='post'][@data-lead-form='amo']")
        self.assertEqual(len(forms), 1)
        form = forms[0]
        fields = {node.get("name"): node for node in form.xpath(".//input|.//textarea")}
        self.assertEqual(set(fields), {"source_page", "task_type", "lead_mode", "company_website", "name", "phone", "message", "privacy"})
        self.assertEqual(fields["source_page"].get("value"), "/buhgalterskie-uslugi/")
        self.assertEqual(fields["task_type"].get("value"), "Подбор бухгалтерских услуг")
        self.assertEqual(fields["lead_mode"].get("value"), "quick")
        self.assertIsNotNone(fields["phone"].get("required"))
        self.assertIsNotNone(fields["privacy"].get("required"))
        self.assertFalse(form.xpath(".//input[@type='file']"))
        self.assertNotIn("enctype", form.attrib)
        self.assertEqual(node_text(form.xpath(".//button[@type='submit']")[0]), "Получить расчёт стоимости")
        self.assertIn("Для первого обращения документы не нужны.", node_text(form))

    def test_assets_routes_dynamic_region_and_ids(self):
        images = self.main.xpath(".//img[contains(@src,'/assets/accounting-services-v1/')]")
        self.assertEqual(len(images), 1)
        for image in images:
            self.assertTrue((ROOT / image.get("src").lstrip("/")).is_file())
        for srcset in self.main.xpath(".//@srcset"):
            for item in srcset.split(","):
                source = item.strip().split(" ")[0]
                self.assertTrue((ROOT / source.lstrip("/")).is_file(), source)
        hrefs = set(self.main.xpath(".//a[@href]/@href"))
        self.assertTrue(REQUIRED_ROUTES.issubset(hrefs), REQUIRED_ROUTES - hrefs)
        self.assertEqual(self.document.xpath("//link[contains(@href,'/assets/accounting-services-v1/page.css')]/@href"), ["/assets/accounting-services-v1/page.css?v=20260923-v1"])
        self.assertEqual(self.main.xpath(".//section[@data-content-source]/@data-content-source"), ["latest-fns-materials"])
        self.assertGreaterEqual(len(self.main.xpath(".//a[@href='#quick-lead']")), 2)
        ids = self.document.xpath("//@id")
        self.assertEqual(len(ids), len(set(ids)))


if __name__ == "__main__":
    unittest.main()
