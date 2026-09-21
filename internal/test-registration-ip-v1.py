import unittest
from pathlib import Path

from lxml import html


ROOT = Path(__file__).resolve().parents[1]
PAGE = ROOT / "registraciya-ip" / "index.html"


def normalized_text(node):
    return " ".join(" ".join(node.itertext()).split())


class RegistrationIpV1ContractTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.source = PAGE.read_text(encoding="utf-8")
        cls.document = html.fromstring(cls.source)
        cls.main = cls.document.xpath("//main[@id='main']")[0]

    def test_production_seo_contract(self):
        self.assertEqual(
            self.document.xpath("string(//title)"),
            "Регистрация ИП в Симферополе | открыть ИП от 5 000 ₽",
        )
        self.assertEqual(
            self.document.xpath("string(//meta[@name='robots']/@content)"),
            "index, follow",
        )
        self.assertEqual(
            self.document.xpath("string(//link[@rel='canonical']/@href)"),
            "https://dokumenty82.ru/registraciya-ip/",
        )
        self.assertEqual(len(self.document.xpath("//script[@type='application/ld+json']")), 2)
        self.assertNotIn("noindex", self.source.lower())

    def test_content_and_heading_contract(self):
        self.assertEqual(len(self.main.xpath(".//h1")), 1)
        self.assertEqual(normalized_text(self.main.xpath(".//h1")[0]), "Регистрация ИП в Симферополе")
        self.assertEqual(len(self.main.xpath(".//h2")), 8)
        self.assertEqual(len(self.main.xpath(".//h3")), 19)
        text = normalized_text(self.main).lower()
        for forbidden in (
            "рассчитать",
            "получить расчёт",
            "мастер открывает ип",
            "регистрация ип и ооо",
            "устав / решение",
        ):
            self.assertNotIn(forbidden, text)

    def test_live_form_contract(self):
        forms = self.main.xpath(".//form[@action='/api/lead'][@method='post'][@data-lead-form='amo']")
        self.assertEqual(len(forms), 1)
        form = forms[0]
        fields = {node.get("name"): node for node in form.xpath(".//input|.//textarea")}
        self.assertEqual(
            set(fields),
            {"source_page", "task_type", "lead_mode", "company_website", "name", "phone", "message", "privacy"},
        )
        self.assertEqual(fields["source_page"].get("value"), "/registraciya-ip/")
        self.assertIsNotNone(fields["phone"].get("required"))
        self.assertIsNotNone(fields["privacy"].get("required"))
        self.assertEqual(normalized_text(form.xpath(".//button[@type='submit']")[0]), "Получить консультацию")
        self.assertNotIn('action="#"', self.source)
        self.assertNotIn("onsubmit=", self.source)

    def test_approved_assets_and_internal_links(self):
        images = self.main.xpath(".//img[@src]")
        self.assertEqual(len(images), 5)
        for image in images:
            src = image.get("src")
            self.assertTrue(src.startswith("/assets/registration-ip-v1/"), src)
            self.assertTrue((ROOT / src.lstrip("/")).is_file(), src)
        hero = self.main.xpath(".//img[contains(@src,'registration-ip-hero-right.webp')]")[0]
        self.assertEqual((hero.get("width"), hero.get("height")), ("1100", "1105"))
        self.assertEqual(len(self.main.xpath(".//nav[contains(@class,'service-related-links')]//a")), 6)

    def test_no_duplicate_ids_and_versioned_css(self):
        ids = self.document.xpath("//@id")
        self.assertEqual(len(ids), len(set(ids)))
        self.assertEqual(
            self.document.xpath("//link[contains(@href,'/assets/registration-ip-v1/page.css')]/@href"),
            ["/assets/registration-ip-v1/page.css?v=20260921-regip1"],
        )


if __name__ == "__main__":
    unittest.main()
