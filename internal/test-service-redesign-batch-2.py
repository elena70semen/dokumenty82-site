import json
import unittest
from pathlib import Path

from lxml import html


ROOT = Path(__file__).resolve().parents[1]
SPECS = {
    "izmenenie-okved-ip": {
        "h1": "Изменение ОКВЭД ИП в Симферополе",
        "headings": (1, 10, 27),
        "asset": "okved-ip-v1",
        "task_type": "Изменение ОКВЭД ИП",
        "title": "Изменить ОКВЭД ИП в Симферополе | Р24001 от 5 000 ₽",
        "description": "Изменение ОКВЭД ИП в Симферополе: подберём заявительные коды, проверим режим и подготовим форму Р24001 для ЕГРИП. От 5 000 ₽.",
    },
    "yuridicheskiy-adres-simferopol": {
        "h1": "Юридический адрес в Симферополе",
        "headings": (1, 9, 23),
        "asset": "legal-address-v1",
        "task_type": "Юридический адрес в Симферополе",
        "title": "Юридический адрес в Симферополе для ООО | Документы для бизнеса",
        "description": "Юридический адрес для ООО в Симферополе: проверим помещение, собственника, связь с компанией и комплект для регистрации или смены адреса.",
    },
}


def text(node):
    return " ".join(" ".join(node.itertext()).split())


class ServiceRedesignBatchTwoTest(unittest.TestCase):
    def test_page_and_seo_contracts(self):
        for route, spec in SPECS.items():
            with self.subTest(route=route):
                source = (ROOT / route / "index.html").read_text(encoding="utf-8")
                document = html.fromstring(source)
                main = document.xpath("//main[@id='main']")[0]
                self.assertEqual(tuple(len(main.xpath(f".//{tag}")) for tag in ("h1", "h2", "h3")), spec["headings"])
                self.assertEqual(text(main.xpath(".//h1")[0]), spec["h1"])
                self.assertEqual(document.xpath("string(//title)"), spec["title"])
                self.assertEqual(document.xpath("string(//meta[@name='description']/@content)"), spec["description"])
                self.assertEqual(document.xpath("string(//meta[@name='robots']/@content)"), "index, follow")
                self.assertEqual(document.xpath("string(//meta[@name='googlebot']/@content)"), "index, follow, max-image-preview:large")
                self.assertEqual(document.xpath("string(//link[@rel='canonical']/@href)"), f"https://dokumenty82.ru/{route}/")
                self.assertEqual(document.xpath("string(//meta[@property='og:url']/@content)"), f"https://dokumenty82.ru/{route}/")
                self.assertEqual(len(document.xpath("//script[@type='application/ld+json']")), 2)
                for node in document.xpath("//script[@type='application/ld+json']"):
                    json.loads(node.text)
                self.assertNotIn("noindex", source.lower())
                self.assertNotIn('action="#"', source)
                self.assertNotIn("onsubmit=", source)

    def test_live_form_contract(self):
        expected_fields = {"source_page", "task_type", "lead_mode", "company_website", "name", "phone", "message", "privacy"}
        for route, spec in SPECS.items():
            with self.subTest(route=route):
                document = html.fromstring((ROOT / route / "index.html").read_text(encoding="utf-8"))
                forms = document.xpath("//main//form[@action='/api/lead'][@method='post'][@data-lead-form='amo']")
                self.assertEqual(len(forms), 1)
                fields = {node.get("name"): node for node in forms[0].xpath(".//input|.//textarea")}
                self.assertEqual(set(fields), expected_fields)
                self.assertEqual(fields["source_page"].get("value"), f"/{route}/")
                self.assertEqual(fields["task_type"].get("value"), spec["task_type"])
                self.assertEqual(fields["lead_mode"].get("value"), "quick")
                self.assertIsNotNone(fields["phone"].get("required"))
                self.assertIsNotNone(fields["privacy"].get("required"))
                self.assertFalse(forms[0].xpath(".//input[@type='file']"), "The live receiver deliberately rejects public uploads")
                self.assertEqual(text(forms[0].xpath(".//button[@type='submit']")[0]), "Получить консультацию")

    def test_assets_links_and_unique_ids(self):
        for route, spec in SPECS.items():
            with self.subTest(route=route):
                document = html.fromstring((ROOT / route / "index.html").read_text(encoding="utf-8"))
                main = document.xpath("//main[@id='main']")[0]
                images = main.xpath(".//img[@src]")
                self.assertEqual(len(images), 1)
                self.assertTrue(images[0].get("src").startswith(f"/assets/{spec['asset']}/"))
                for url in main.xpath(".//@src | .//@srcset"):
                    for token in url.split(","):
                        path = token.strip().split(" ")[0]
                        if path.startswith("/assets/"):
                            self.assertTrue((ROOT / path.lstrip("/")).is_file(), path)
                self.assertEqual(len(main.xpath(".//nav[contains(@class,'service-related-links')]//a")), 4)
                self.assertEqual(document.xpath(f"//link[contains(@href,'/assets/{spec['asset']}/page.css')]/@href"), [f"/assets/{spec['asset']}/page.css?v=20260922-v1"])
                ids = document.xpath("//@id")
                self.assertEqual(len(ids), len(set(ids)))
                if route == "yuridicheskiy-adres-simferopol":
                    steps = main.xpath(
                        ".//*[contains(concat(' ',normalize-space(@class),' '),' process-grid ')]"
                        "/*[contains(concat(' ',normalize-space(@class),' '),' step ')]"
                    )
                    self.assertEqual(len(steps), 4)
                    self.assertTrue(all(step.xpath(".//*[contains(concat(' ',normalize-space(@class),' '),' icon-tile ')]/svg") for step in steps))


if __name__ == "__main__":
    unittest.main()
