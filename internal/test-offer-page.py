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
            self.assertIn("/assets/site.css?v=202608281630", tree.xpath('//link[@rel="stylesheet"]/@href'), name)
            checked += 1
        self.assertGreaterEqual(checked, 67)

    def test_rebuild_is_deterministic(self):
        target = ROOT / "oferta/index.html"
        before = target.read_bytes()
        subprocess.run([sys.executable, "-X", "utf8", "-B", str(ROOT / "internal/build-offer-page.py")], check=True, capture_output=True)
        self.assertEqual(target.read_bytes(), before)


if __name__ == "__main__":
    unittest.main()
