import re
import unittest
from pathlib import Path

from lxml import html


ROOT = Path(__file__).resolve().parents[1]
SPECS = {
    "smena-yuridicheskogo-adresa-ooo": {
        "h1": "Смена юридического адреса ООО: один или два этапа",
        "headings": (1, 8, 21),
        "forms": 0,
        "assets": "address-change-v1",
        "related": 3,
    },
    "smena-direktora-ooo": {
        "h1": "Смена директора ООО: решение, нотариус и новая запись ЕГРЮЛ",
        "headings": (1, 8, 21),
        "forms": 0,
        "assets": "director-change-v1",
        "related": 3,
    },
    "likvidaciya-ooo": {
        "h1": "Добровольная ликвидация ООО в Симферополе",
        "headings": (1, 8, 17),
        "forms": 1,
        "assets": "liquidation-ooo-v1",
        "related": 6,
    },
    "registraciya-ooo": {
        "h1": "Регистрация ООО в Симферополе",
        "headings": (1, 8, 19),
        "forms": 1,
        "assets": "registration-ooo-v1",
        "related": 6,
    },
}


def normalized_text(node):
    return " ".join(" ".join(node.itertext()).split())


class ServiceRedesignBatchTest(unittest.TestCase):
    def test_page_contracts(self):
        for route, spec in SPECS.items():
            with self.subTest(route=route):
                source = (ROOT / route / "index.html").read_text(encoding="utf-8")
                document = html.fromstring(source)
                main = document.xpath("//main[@id='main']")[0]
                self.assertEqual(
                    tuple(len(main.xpath(f".//{tag}")) for tag in ("h1", "h2", "h3")),
                    spec["headings"],
                )
                self.assertEqual(normalized_text(main.xpath(".//h1")[0]), spec["h1"])
                self.assertEqual(len(main.xpath(".//form")), spec["forms"])
                self.assertEqual(
                    document.xpath("string(//link[@rel='canonical']/@href)"),
                    f"https://dokumenty82.ru/{route}/",
                )
                self.assertEqual(document.xpath("string(//meta[@name='robots']/@content)"), "index, follow")
                self.assertNotIn("noindex", source.lower())
                self.assertNotIn('action="#"', source)
                self.assertNotIn("onsubmit=", source)
                ids = document.xpath("//@id")
                self.assertEqual(len(ids), len(set(ids)))

    def test_assets_and_related_links(self):
        for route, spec in SPECS.items():
            with self.subTest(route=route):
                document = html.fromstring((ROOT / route / "index.html").read_text(encoding="utf-8"))
                main = document.xpath("//main[@id='main']")[0]
                images = main.xpath(".//img[@src]")
                self.assertEqual(len(images), 5)
                for image in images:
                    src = image.get("src")
                    self.assertTrue(src.startswith(f"/assets/{spec['assets']}/"), src)
                    self.assertTrue((ROOT / src.lstrip("/")).is_file(), src)
                self.assertEqual(
                    len(main.xpath(".//nav[contains(@class,'service-related-links')]//a")),
                    spec["related"],
                )
                self.assertEqual(
                    document.xpath(f"//link[contains(@href,'/assets/{spec['assets']}/page.css')]/@href"),
                    [f"/assets/{spec['assets']}/page.css?v=20260922-v1"],
                )

    def test_conversion_contracts(self):
        for route, spec in SPECS.items():
            with self.subTest(route=route):
                source = (ROOT / route / "index.html").read_text(encoding="utf-8")
                document = html.fromstring(source)
                main = document.xpath("//main[@id='main']")[0]
                text = normalized_text(main).lower()
                self.assertIsNone(re.search(r"рассчитать\s+(?:регистрацию|ликвидацию|подготовку)", text))
                self.assertIsNone(re.search(r"получить\s+расч[её]т", text))
                if spec["forms"]:
                    forms = main.xpath(".//form[@action='/api/lead'][@method='post'][@data-lead-form='amo']")
                    self.assertEqual(len(forms), 1)
                    fields = {node.get("name"): node for node in forms[0].xpath(".//input|.//textarea")}
                    self.assertEqual(
                        set(fields),
                        {"source_page", "task_type", "lead_mode", "company_website", "name", "phone", "message", "privacy"},
                    )
                    self.assertEqual(fields["source_page"].get("value"), f"/{route}/")
                    self.assertIsNotNone(fields["phone"].get("required"))
                    self.assertIsNotNone(fields["privacy"].get("required"))
                    self.assertEqual(normalized_text(forms[0].xpath(".//button[@type='submit']")[0]), "Получить консультацию")
                else:
                    self.assertEqual(
                        main.xpath("string(.//a[contains(@class,'hero-consult-button')]/@href)"),
                        "/razbor-situacii/",
                    )


if __name__ == "__main__":
    unittest.main()
