import json
import unittest
from pathlib import Path

from lxml import html


ROOT = Path(__file__).resolve().parents[1]
REFERENCE = (
    ROOT
    / ".codex-tmp"
    / "task-package-20260920"
    / "dokumenty82_redesign_package_v1_1_aligned"
    / "01_REFERENCE_V2"
    / "index.html"
)


def normalized_text(node):
    return " ".join(" ".join(node.itertext()).split())


class HomeV11ContractTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.document = html.fromstring((ROOT / "index.html").read_text(encoding="utf-8"))
        cls.main = cls.document.xpath("//main[@id='main']")[0]
        cls.reference = html.fromstring(REFERENCE.read_text(encoding="utf-8"))

    def test_heading_and_section_contract(self):
        self.assertEqual(len(self.main.xpath("./section")), 5)
        self.assertEqual(len(self.main.xpath(".//h1")), 1)
        self.assertEqual(len(self.main.xpath(".//h2")), 4)
        self.assertEqual(len(self.main.xpath(".//h3")), 4)

    def test_all_controlled_copy_matches_reference(self):
        expected = {
            node.get("data-copy"): normalized_text(node)
            for node in self.reference.xpath("//main//*[@data-copy]")
        }
        actual = {
            node.get("data-copy"): normalized_text(node)
            for node in self.main.xpath(".//*[@data-copy]")
        }
        self.assertEqual(len(expected), 78)
        self.assertEqual(actual, expected)

    def test_link_contract_and_local_preview_routing(self):
        reference_keys = [node.get("data-link") for node in self.reference.xpath("//*[@data-link]")]
        actual_keys = [node.get("data-link") for node in self.document.xpath("//*[@data-link]")]
        self.assertEqual(len(reference_keys), 55)
        self.assertEqual(actual_keys, reference_keys)
        for node in self.document.xpath("//*[@data-link][@href]"):
            href = node.get("href")
            self.assertFalse(href.startswith("https://dokumenty82.ru/"), href)

    def test_service_order_and_approved_assets(self):
        self.assertEqual(
            [normalized_text(node) for node in self.main.xpath("//*[@id='services']//strong[@data-copy]")],
            [
                "Требование ИФНС",
                "Запрос банка",
                "Нулевая отчётность",
                "Декларация УСН",
                "Восстановление учёта",
                "Бухгалтерия",
                "Регистрация ИП",
                "Ликвидация ООО",
                "Закрытие ИП",
                "Кадровые документы",
            ],
        )
        images = self.main.xpath(".//img[@src]")
        self.assertEqual(len(images), 23)
        for image in images:
            src = image.get("src")
            self.assertTrue(src.startswith("/assets/home-v11/"), src)
            self.assertTrue((ROOT / src.lstrip("/")).is_file(), src)

    def test_header_footer_and_public_safety(self):
        self.assertEqual(len(self.document.xpath("//header[contains(@class,'uh')]")), 1)
        self.assertEqual(len(self.document.xpath("//footer[contains(@class,'db-footer')]")), 1)
        self.assertEqual(len(self.document.xpath("//footer//a[@data-footer-link]")), 12)
        self.assertEqual(len(self.document.xpath("//input[@type='file']")), 0)
        self.assertEqual(
            self.document.xpath("//link[contains(@href, '/assets/home-v11/glass.css')]/@href"),
            ["/assets/home-v11/glass.css?v=20260924-hero6"],
        )
        self.assertEqual(
            normalized_text(self.main.xpath("//*[@data-copy='services.5.price']")[0]),
            "старт 10 000 ₽ один раз; далее от 15 000 ₽ /месяц",
        )


if __name__ == "__main__":
    unittest.main()
