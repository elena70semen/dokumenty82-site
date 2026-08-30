import json
from pathlib import Path
import subprocess
import sys
import unittest

from lxml import etree, html


ROOT = Path(__file__).resolve().parents[1]


class OfferPageTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.source = json.loads((ROOT / "internal/offer-source.json").read_text(encoding="utf-8"))
        cls.page = html.parse(str(ROOT / "oferta/index.html"))

    def test_approved_text_and_word_numbering(self):
        self.assertEqual(len(self.page.xpath("//*[@data-offer-text]")), 68)
        for index, row in enumerate(self.source["paragraphs"][:68]):
            matches = self.page.xpath('//*[@data-offer-text=$index]', index=str(index))
            self.assertEqual(len(matches), 1)
            self.assertEqual(matches[0].text_content(), row["text"])
            if "number" in row:
                number = matches[0].getprevious()
                self.assertEqual(number.get("class"), "offer-number")
                self.assertEqual(number.text.strip(), row["number"])
        self.assertEqual(self.page.xpath('//h2/span[@class="offer-number"]/text()'), [f"{number}. " for number in range(1, 11)])
        self.assertEqual(len(self.page.xpath('//ul[@class="offer-list"]/li')), 4)

    def test_requisites_match_website(self):
        site = html.parse(str(ROOT / "rekvizity/index.html"))
        schema = json.loads(site.xpath('//script[@type="application/ld+json"]/text()')[0])
        business = schema["@graph"][0]
        expected = [business["legalName"], business["taxID"], next(item["value"] for item in business["identifier"] if item["propertyID"] == "ОГРНИП")]
        for index, value in enumerate(expected, 68):
            self.assertIn(value, self.page.xpath('//*[@data-offer-paragraph=$index]', index=str(index))[0].text_content())
        self.assertEqual(self.page.xpath('//*[@data-offer-paragraph="71"]/a/@href'), ["tel:" + business["telephone"]])
        self.assertEqual(self.page.xpath('//*[@data-offer-paragraph="72"]/a/@href'), ["mailto:" + business["email"]])
        for item in business["identifier"]:
            if item["propertyID"] == "ОГРНИП":
                continue
            rows = self.page.xpath('//*[@data-offer-requisite=$key]', key=item["propertyID"])
            self.assertEqual(len(rows), 1)
            self.assertIn(item["value"], rows[0].text_content())

    def test_current_issuer_is_consistent(self):
        name = "Индивидуальный предприниматель Барков Андрей Андреевич"
        site = html.parse(str(ROOT / "rekvizity/index.html"))
        business = json.loads(site.xpath('//script[@type="application/ld+json"]/text()')[0])["@graph"][0]
        self.assertEqual(business["legalName"], name)
        self.assertEqual(business["taxID"], "672908329933")
        expected = {
            "ОГРНИП": "325670000053721", "ОКПО": "2048471463",
            "ОКТМО": "66701000001", "Регистрационный номер СФР": "1398608057",
            "ЭДО": "2MH019c09de934270e393e2ad87c785e2b3",
        }
        self.assertEqual({row["propertyID"]: row["value"] for row in business["identifier"]}, expected)
        content = site.xpath("//main")[0].text_content()
        self.assertIn("16 декабря 2025 года", content)
        self.assertIn("19 декабря 2025 года", content)
        self.assertIn("УФНС России по Смоленской области", content)
        # The owner explicitly retained this activity after sending new requisites.
        self.assertIn("Основной ОКВЭД: 62.01", content)
        self.assertNotIn("68.20", content)
        for value in expected.values():
            self.assertIn(value, content)
        old_values = ("910216386365", "317910200135408", "Рахима Садыковна", "Рахиму Садыковну")
        paths = subprocess.check_output(["git", "ls-files", "-z", "*.html"], cwd=ROOT).decode().split("\0")
        for path in paths:
            if not path or path.split("/")[0] in {"internal", "server", "cabinet"}:
                continue
            text = (ROOT / path).read_text(encoding="utf-8")
            for old in old_values:
                self.assertNotIn(old, text, path)
        provider = etree.parse(str(ROOT / "services.yml"))
        self.assertEqual(provider.xpath("/yml_catalog/shop/company/text()"), [name])
        feed = etree.parse(str(ROOT / "services-feed.xml"))
        self.assertIn("ИП Барков Андрей Андреевич", feed.xpath("//name/text()"))

    def test_navigation_and_indexing(self):
        self.assertEqual(len(self.page.xpath("//h1")), 1)
        self.assertEqual(self.page.xpath('//link[@rel="canonical"]/@href'), ["https://dokumenty82.ru/oferta/"])
        self.assertEqual(self.page.xpath('//meta[@name="robots"]/@content'), ["index, follow"])
        toc = self.page.xpath('//nav[@class="offer-toc"]//a/@href')
        self.assertEqual(len(toc), 10)
        for target in toc:
            self.assertEqual(len(self.page.xpath('//*[@id=$id]', id=target[1:])), 1)
        registry = json.loads((ROOT / "seo-route-registry.json").read_text(encoding="utf-8"))
        self.assertIn("/oferta/", registry["indexable_routes"])
        self.assertIn("/policy/", registry["indexable_routes"])
        sitemap = etree.parse(str(ROOT / "sitemap.xml"))
        self.assertEqual(len(sitemap.xpath('//*[local-name()="loc" and text()="https://dokumenty82.ru/oferta/"]')), 1)
        prices = html.parse(str(ROOT / "ceny/index.html"))
        self.assertTrue(prices.xpath('//main//a[@href="/oferta/"]'))

    def test_shared_footers(self):
        paths = subprocess.check_output(["git", "ls-files", "-z", "*.html"], cwd=ROOT).decode().split("\0")
        checked = 0
        for name in set(paths + ["oferta/index.html"]):
            if not name or name.split("/")[0] in {"internal", "server", "cabinet"}:
                continue
            tree = html.parse(str(ROOT / name))
            if not tree.xpath('//*[@class="footer-links"]'):
                continue
            self.assertEqual(len(tree.xpath('//footer//a[@class="footer-offer-link" and @href="/oferta/"]')), 1, name)
            self.assertEqual(len(tree.xpath('//*[@class="footer-links"]/a')), 9, name)
            self.assertIn("/assets/site.css?v=202608301415", tree.xpath('//link[@rel="stylesheet"]/@href'), name)
            checked += 1
        self.assertGreaterEqual(checked, 67)

    def test_rebuild_is_deterministic(self):
        target = ROOT / "oferta/index.html"
        before = target.read_bytes()
        subprocess.run([sys.executable, "-X", "utf8", "-B", str(ROOT / "internal/build-offer-page.py")], check=True, capture_output=True)
        self.assertEqual(target.read_bytes(), before)


if __name__ == "__main__":
    unittest.main()
