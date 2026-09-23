import json
import unittest
from pathlib import Path

from lxml import html


ROOT = Path(__file__).resolve().parents[1]
SPECS = {
    "buhgalterskoe-soprovozhdenie-ooo": {
        "headings": (1, 11, 22),
        "h1": "Бухгалтер для ООО в Симферополе",
        "price": "от 10 000 ₽ в месяц",
        "title": "Бухгалтер для ООО в Симферополе | старт 10 000 ₽",
        "description": "Бухгалтер для ООО в Симферополе: стартовый полный период 10 000 ₽ один раз, далее сопровождение от 15 000 ₽ в месяц.",
        "task_type": "Бухгалтерское сопровождение ООО",
        "submit": "Подобрать тариф для ООО",
        "namespace": "ooo-accounting-v1",
        "routes": {
            "/buhgalterskie-uslugi/", "/soprovozhdenie/", "/vosstanovlenie-buhucheta/",
            "/sdacha-otchetnosti-ooo/", "/nulevaya-otchetnost-ooo/", "/deklaraciya-usn/",
            "/ceny/#tarify", "/razbor-situacii/?service=accounting-ooo#route-contact",
        },
    },
    "vosstanovlenie-buhucheta": {
        "headings": (1, 9, 23),
        "h1": "Восстановление бухучёта",
        "price": "от 20 000 ₽",
        "title": "Восстановление бухгалтерского учёта | Симферополь",
        "description": "Восстановление бухучёта в Симферополе: определим периоды и пробелы, соберём первичку, восстановим регистры, налоги и отчётность.",
        "task_type": "Восстановление бухгалтерского учёта",
        "submit": "Получить план восстановления",
        "namespace": "accounting-recovery-v1",
        "routes": {
            "/buhgalterskie-uslugi/", "/soprovozhdenie/", "/buhgalterskoe-soprovozhdenie-ooo/",
            "/sdacha-otchetnosti-ooo/", "/nulevaya-otchetnost-ooo/", "/sverka-s-nalogovoy/",
            "/razbor-situacii/#route-contact",
        },
    },
}


def node_text(node):
    return " ".join(" ".join(node.itertext()).split())


class AccountingRedesignBatch2Test(unittest.TestCase):
    def test_page_seo_form_assets_and_routes(self):
        for route, spec in SPECS.items():
            with self.subTest(route=route):
                source = (ROOT / route / "index.html").read_text(encoding="utf-8")
                document = html.fromstring(source)
                main = document.xpath("//main[@id='main'][contains(@class,'accounting-page')]")[0]

                self.assertEqual(tuple(len(main.xpath(f".//{tag}")) for tag in ("h1", "h2", "h3")), spec["headings"])
                self.assertEqual(node_text(main.xpath(".//h1")[0]), spec["h1"])
                self.assertIn(spec["price"], node_text(main))
                self.assertEqual(document.xpath("string(//title)"), spec["title"])
                self.assertEqual(document.xpath("string(//meta[@name='description']/@content)"), spec["description"])
                self.assertEqual(document.xpath("string(//meta[@name='robots']/@content)"), "index, follow")
                self.assertEqual(document.xpath("string(//meta[@name='googlebot']/@content)"), "index, follow, max-image-preview:large")
                canonical = f"https://dokumenty82.ru/{route}/"
                self.assertEqual(document.xpath("string(//link[@rel='canonical']/@href)"), canonical)
                self.assertEqual(document.xpath("string(//meta[@property='og:url']/@content)"), canonical)
                schemas = document.xpath("//script[@type='application/ld+json']")
                self.assertEqual(len(schemas), 2)
                for schema in schemas:
                    json.loads(schema.text)
                self.assertNotIn("noindex", source.lower())
                self.assertNotIn('action="#"', source)

                forms = main.xpath(".//form[@action='/api/lead'][@method='post'][@data-lead-form='amo']")
                self.assertEqual(len(forms), 1)
                form = forms[0]
                fields = {node.get("name"): node for node in form.xpath(".//input|.//textarea")}
                self.assertEqual(set(fields), {"source_page", "task_type", "lead_mode", "company_website", "name", "phone", "message", "privacy"})
                self.assertEqual(fields["source_page"].get("value"), f"/{route}/")
                self.assertEqual(fields["task_type"].get("value"), spec["task_type"])
                self.assertEqual(fields["lead_mode"].get("value"), "quick")
                self.assertIsNotNone(fields["phone"].get("required"))
                self.assertIsNotNone(fields["privacy"].get("required"))
                self.assertFalse(form.xpath(".//input[@type='file']"))
                self.assertNotIn("enctype", form.attrib)
                self.assertEqual(node_text(form.xpath(".//button[@type='submit']")[0]), spec["submit"])
                self.assertRegex(node_text(form).lower(), r"безопасн|защищ")

                self.assertEqual(document.xpath(f"//link[contains(@href,'/assets/{spec['namespace']}/page.css')]/@href"), [f"/assets/{spec['namespace']}/page.css?v=20260923-v1"])
                images = main.xpath(f".//img[contains(@src,'/assets/{spec['namespace']}/')]")
                self.assertEqual(len(images), 5)
                for image in images:
                    self.assertTrue((ROOT / image.get("src").lstrip("/")).is_file(), image.get("src"))
                for srcset in main.xpath(".//@srcset"):
                    for item in srcset.split(","):
                        path = item.strip().split(" ")[0]
                        self.assertTrue((ROOT / path.lstrip("/")).is_file(), path)
                hrefs = set(main.xpath(".//a[@href]/@href"))
                self.assertTrue(spec["routes"].issubset(hrefs), spec["routes"] - hrefs)
                hero_ctas = main.xpath(".//a[@href='#quick-lead'][@data-event-name='hero_cta_click']")
                self.assertEqual(len(hero_ctas), 1)
                ids = document.xpath("//@id")
                self.assertEqual(len(ids), len(set(ids)))


if __name__ == "__main__":
    unittest.main()
