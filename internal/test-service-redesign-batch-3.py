import json
import unittest
from pathlib import Path

from lxml import html


ROOT = Path(__file__).resolve().parents[1]
SPECS = {
    "dokumenty-dlya-banka-115-fz": {
        "h1": "Документы для банка по 115-ФЗ в Симферополе",
        "headings": (1, 8, 21), "forms": 1, "asset": "bank-documents-v1", "images": 1,
        "task": "Документы по 115-ФЗ", "submit": "Получить консультацию",
        "title": "Документы для банка по 115-ФЗ в Симферополе | от 15 000 ₽",
        "description": "Подготовка документов для банка по 115-ФЗ в Симферополе: договоры, операции, контрагенты и экономический смысл. Структурированный комплект от 15 000 ₽.",
        "routes": {"/razbor-situacii/", "/otvet-na-zapros-banka/", "/bank-i-115-fz/", "/srochnye-voprosy/"},
    },
    "otvet-na-zapros-banka": {
        "h1": "Ответ на запрос банка по 115-ФЗ в Симферополе",
        "headings": (1, 8, 21), "forms": 1, "asset": "bank-answer-v1", "images": 1,
        "task": "Ответ на запрос банка", "submit": "Получить консультацию",
        "title": "Ответ на запрос банка по 115-ФЗ в Симферополе | от 10 000 ₽",
        "description": "Подготовка ответа на запрос банка по 115-ФЗ в Симферополе: разберём письмо по пунктам, свяжем операции с документами и оформим пояснения. От 10 000 ₽.",
        "routes": {"/razbor-situacii/", "/dokumenty-dlya-banka-115-fz/", "/bank-i-115-fz/", "/srochnye-voprosy/", "/kontakty/"},
    },
    "bank-i-115-fz": {
        "h1": "Помощь по 115-ФЗ при запросе банка в Симферополе",
        "headings": (1, 8, 23), "forms": 0, "asset": "bank-115-hub-v1", "images": 1,
        "title": "Помощь по 115-ФЗ в Симферополе при запросе банка | от 10 000 ₽",
        "description": "Помощь при запросе банка по 115-ФЗ в Симферополе: определим тип проверки, разберём операции и выберем маршрут — ответ или комплект документов. От 10 000 ₽.",
        "routes": {"/razbor-situacii/", "/ceny/", "/otvet-na-zapros-banka/", "/dokumenty-dlya-banka-115-fz/", "/srochnye-voprosy/", "/otvet-na-trebovanie-ifns/", "/otchetnost/", "/adres-egryul-direktor/", "/kontakty/", "/raschet-nalogovoy-nagruzki/", "/sverka-s-nalogovoy/"},
    },
    "srochnye-voprosy": {
        "h1": "Срочная помощь с документами бизнеса",
        "headings": (1, 10, 27), "forms": 1, "asset": "urgent-questions-v1", "images": 1,
        "task": "Срочный вопрос по документам", "submit": "Передать сведения",
        "title": "Срочная помощь с документами бизнеса | Симферополь",
        "description": "Срочный разбор требования, запроса или уведомления для бизнеса в Симферополе: фиксируем отправителя, дату получения, срок и безопасный первый шаг.",
        "routes": {"/otvet-na-trebovanie-ifns/", "/bank-i-115-fz/", "/kadry/", "/adres-egryul-direktor/", "/otvet-na-zapros-banka/", "/dokumenty-dlya-banka-115-fz/", "/razbor-situacii/"},
    },
    "registraciya-i-likvidaciya": {
        "h1": "Регистрация, изменения и прекращение бизнеса в Симферополе",
        "headings": (1, 8, 21), "forms": 0, "asset": "lifecycle-hub-v1", "images": 5,
        "title": "Регистрация, изменения и прекращение бизнеса в Симферополе",
        "description": "Выберите отдельный маршрут для регистрации ИП или ООО, изменений в ЕГРИП и ЕГРЮЛ, закрытия ИП либо добровольной ликвидации ООО в Симферополе.",
        "routes": {"/ceny/", "/registraciya-ip/", "/registraciya-ooo/", "/adres-egryul-direktor/", "/likvidaciya-ip/", "/likvidaciya-ooo/", "/razbor-situacii/", "/izmenenie-okved-ip/", "/izmenenie-okved-ooo/", "/smena-direktora-ooo/", "/smena-yuridicheskogo-adresa-ooo/", "/yuridicheskiy-adres-simferopol/", "/nedostovernost-yuridicheskogo-adresa/", "/buhgalterskoe-soprovozhdenie-ooo/"},
    },
}


def text(node):
    return " ".join(" ".join(node.itertext()).split())


class ServiceRedesignBatchThreeTest(unittest.TestCase):
    def test_page_and_seo_contracts(self):
        for route, spec in SPECS.items():
            with self.subTest(route=route):
                source = (ROOT / route / "index.html").read_text(encoding="utf-8")
                document = html.fromstring(source)
                main = document.xpath("//main[@id='main']")[0]
                self.assertEqual(tuple(len(main.xpath(f".//{tag}")) for tag in ("h1", "h2", "h3")), spec["headings"])
                self.assertEqual(text(main.xpath(".//h1")[0]), spec["h1"])
                self.assertEqual(len(main.xpath(".//form")), spec["forms"])
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

    def test_live_forms(self):
        expected = {"source_page", "task_type", "lead_mode", "company_website", "name", "phone", "message", "privacy"}
        for route, spec in SPECS.items():
            if not spec["forms"]:
                continue
            with self.subTest(route=route):
                document = html.fromstring((ROOT / route / "index.html").read_text(encoding="utf-8"))
                forms = document.xpath("//main//form[@action='/api/lead'][@method='post'][@data-lead-form='amo']")
                self.assertEqual(len(forms), 1)
                fields = {node.get("name"): node for node in forms[0].xpath(".//input|.//textarea")}
                self.assertEqual(set(fields), expected)
                self.assertEqual(fields["source_page"].get("value"), f"/{route}/")
                self.assertEqual(fields["task_type"].get("value"), spec["task"])
                self.assertEqual(fields["lead_mode"].get("value"), "quick")
                self.assertIsNotNone(fields["phone"].get("required"))
                self.assertIsNotNone(fields["privacy"].get("required"))
                self.assertFalse(forms[0].xpath(".//input[@type='file']"), "The live receiver deliberately rejects public uploads")
                self.assertEqual(text(forms[0].xpath(".//button[@type='submit']")[0]), spec["submit"])

    def test_assets_routes_and_unique_ids(self):
        for route, spec in SPECS.items():
            with self.subTest(route=route):
                document = html.fromstring((ROOT / route / "index.html").read_text(encoding="utf-8"))
                main = document.xpath("//main[@id='main']")[0]
                images = main.xpath(".//img[@src]")
                self.assertEqual(len(images), spec["images"])
                for image in images:
                    src = image.get("src")
                    self.assertTrue(src.startswith(f"/assets/{spec['asset']}/"), src)
                    self.assertTrue((ROOT / src.lstrip("/")).is_file(), src)
                for srcset in main.xpath(".//@srcset"):
                    for item in srcset.split(","):
                        src = item.strip().split(" ")[0]
                        self.assertTrue((ROOT / src.lstrip("/")).is_file(), src)
                self.assertTrue(spec["routes"].issubset(set(main.xpath(".//a[@href]/@href"))))
                self.assertEqual(document.xpath(f"//link[contains(@href,'/assets/{spec['asset']}/page.css')]/@href"), [f"/assets/{spec['asset']}/page.css?v=20260923-v1"])
                ids = document.xpath("//@id")
                self.assertEqual(len(ids), len(set(ids)))


if __name__ == "__main__":
    unittest.main()
