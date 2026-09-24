import json
import unittest
from pathlib import Path
from urllib.parse import urlparse

from lxml import etree, html


ROOT = Path(__file__).resolve().parents[1]
SITEMAP_NS = {"s": "http://www.sitemaps.org/schemas/sitemap/0.9"}


class SitewideShellTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        sitemap = etree.parse(str(ROOT / "sitemap.xml"))
        cls.urls = sitemap.xpath("//s:loc/text()", namespaces=SITEMAP_NS)

    def page_file(self, url):
        relative = urlparse(url).path.strip("/")
        return ROOT / relative / "index.html" if relative else ROOT / "index.html"

    def test_every_internal_public_page_loads_shared_shell(self):
        self.assertEqual(len(self.urls), 65)
        for url in self.urls[1:]:
            text = self.page_file(url).read_text(encoding="utf-8")
            with self.subTest(url=url):
                self.assertIn('/assets/home-v11/shell.css?v=20260924-shell1', text)
                self.assertIn('/assets/home-v11/shell.js?v=20260921-v11c', text)

    def test_seo_structure_is_still_parseable(self):
        for url in self.urls:
            document = html.fromstring(self.page_file(url).read_text(encoding="utf-8"))
            with self.subTest(url=url):
                self.assertEqual(len(document.xpath("//h1")), 1)
                canonical = document.xpath("//link[@rel='canonical']/@href")
                self.assertEqual(canonical, [url])
                for block in document.xpath("//script[@type='application/ld+json']/text()"):
                    json.loads(block)

    def test_shared_assets_exist(self):
        for relative in [
            "assets/home-v11/shell.css",
            "assets/home-v11/shell.js",
            "assets/home-v11/header-lockup.png",
            "assets/home-v11/brand-inverse.png",
        ]:
            self.assertTrue((ROOT / relative).is_file(), relative)

    def test_every_public_footer_has_yandex_rating_badge(self):
        badge_url = "https://yandex.ru/sprav/widget/rating-badge/1302424560?type=rating"
        for url in self.urls:
            document = html.fromstring(self.page_file(url).read_text(encoding="utf-8"))
            with self.subTest(url=url):
                if url == "https://dokumenty82.ru/":
                    self.assertEqual(document.xpath("//footer//a[@href=$url]/@class", url=badge_url), ["rating-link"])
                else:
                    self.assertEqual(
                        document.xpath("//footer//iframe[@src=$url]/@title", url=badge_url),
                        ["Рейтинг организации в Яндексе"],
                    )
        shell = (ROOT / "assets/home-v11/shell.js").read_text(encoding="utf-8")
        home_script = (ROOT / "assets/home-v11/site.js").read_text(encoding="utf-8")
        self.assertIn(badge_url, shell)
        self.assertIn(badge_url, home_script)


if __name__ == "__main__":
    unittest.main()
