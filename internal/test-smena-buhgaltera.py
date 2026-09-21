import json
import unittest
from pathlib import Path

from lxml import etree, html


ROOT = Path(__file__).resolve().parents[1]
ROUTE = "/smena-buhgaltera/"
URL = "https://dokumenty82.ru/smena-buhgaltera/"
SAFE_NOTE = (
    "Для первого обращения документы не нужны. После уточнения задачи согласуем "
    "защищённый способ передачи через личный кабинет или другой подходящий канал."
)


class SmenaBuhgalteraPageTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.text = (ROOT / "smena-buhgaltera" / "index.html").read_text(encoding="utf-8")
        cls.document = html.fromstring(cls.text)

    def test_metadata_and_heading_match_approved_package(self):
        self.assertEqual(
            self.document.xpath("string(//title)"),
            "Смена бухгалтера в Симферополе для ИП и ООО | Передача учёта",
        )
        self.assertEqual(
            self.document.xpath("//meta[@name='description']/@content"),
            [
                "Организуем переход от прежнего бухгалтера: фиксируем базу, доступы, "
                "незакрытые периоды, отчётность и ближайшие сроки. Работаем по Крыму."
            ],
        )
        self.assertEqual(self.document.xpath("//link[@rel='canonical']/@href"), [URL])
        self.assertEqual(
            self.document.xpath("//h1/text()"),
            ["Смена бухгалтера для ИП и ООО в Симферополе"],
        )

    def test_form_is_safe_and_uses_current_public_flow(self):
        forms = self.document.xpath("//form[@action='/api/lead' and @method='post']")
        self.assertEqual(len(forms), 1)
        self.assertFalse(self.document.xpath("//input[@type='file']"))
        self.assertIn(SAFE_NOTE, " ".join(self.document.xpath("//text()")))
        self.assertTrue(self.document.xpath("//form//a[@href='/policy/']"))
        self.assertIn('/assets/lead-form.js?v=20260921-v11a', self.text)

    def test_schema_contains_faq_and_service(self):
        blocks = [
            json.loads(block)
            for block in self.document.xpath("//script[@type='application/ld+json']/text()")
        ]
        faq = next(block for block in blocks if block.get("@type") == "FAQPage")
        self.assertEqual(len(faq["mainEntity"]), 6)
        graphs = [node for block in blocks for node in block.get("@graph", [])]
        service = next(node for node in graphs if node.get("@type") == "Service")
        self.assertEqual(service["url"], URL)

    def test_related_routes_and_incoming_links(self):
        for route in [
            "/buhgalterskie-uslugi/",
            "/soprovozhdenie/",
            "/buhgalterskoe-soprovozhdenie-ooo/",
            "/ceny/",
            "/vosstanovlenie-buhucheta/",
        ]:
            self.assertTrue(self.document.xpath(f"//a[@href='{route}']"), route)

        for source in [
            "akcii/index.html",
            "buhgalterskie-uslugi/index.html",
            "soprovozhdenie/index.html",
            "buhgalterskoe-soprovozhdenie-ooo/index.html",
            "ceny/index.html",
        ]:
            source_document = html.fromstring((ROOT / source).read_text(encoding="utf-8"))
            self.assertTrue(source_document.xpath(f"//a[@href='{ROUTE}']"), source)

    def test_registry_sitemap_and_shared_shell(self):
        registry = json.loads((ROOT / "seo-route-registry.json").read_text(encoding="utf-8"))
        self.assertIn(ROUTE, registry["indexable_routes"])
        self.assertIn(ROUTE, registry["owner_decisions"])

        sitemap = etree.parse(str(ROOT / "sitemap.xml"))
        urls = sitemap.xpath("//*[local-name()='loc']/text()")
        self.assertEqual(len(urls), 65)
        self.assertEqual(urls.count(URL), 1)

        self.assertIn('/assets/home-v11/shell.css?v=20260921-v11c', self.text)
        self.assertIn('/assets/home-v11/shell.js?v=20260921-v11c', self.text)


if __name__ == "__main__":
    unittest.main()
