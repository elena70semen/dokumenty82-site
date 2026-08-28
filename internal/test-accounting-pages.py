"""Static HTML checks only. No server, browser, network or files written."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote
import json
import unittest

ROOT = Path(__file__).resolve().parents[1]
ROUTES = ["/", "/buhgalterskie-uslugi/", "/soprovozhdenie/",
          "/buhgalterskoe-soprovozhdenie-ooo/", "/ceny/", "/razbor-situacii/"]
TOPICS = {"accounting": "Подбор бухгалтерских услуг", "accounting-ip": "Бухгалтерское сопровождение ИП",
          "accounting-ooo": "Бухгалтерское сопровождение ООО"}


class Page(HTMLParser):
    VOID = set("area base br col embed hr img input link meta param source track wbr".split())

    def __init__(self, route):
        super().__init__(convert_charrefs=True)
        self.route = route
        self.tags, self.stack, self.errors, self.schemas = [], [], [], []
        self.schema = None
        self.feed((ROOT / route.strip("/") / "index.html").read_text(encoding="utf-8"))
        self.close()

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        self.tags.append((tag, attrs))
        if tag not in self.VOID:
            self.stack.append(tag)
        if tag == "script" and attrs.get("type") == "application/ld+json":
            self.schema = ""

    def handle_startendtag(self, tag, attrs):
        self.tags.append((tag, dict(attrs)))

    def handle_data(self, data):
        if self.schema is not None:
            self.schema += data

    def handle_endtag(self, tag):
        if tag == "script" and self.schema is not None:
            self.schemas.append(json.loads(self.schema))
            self.schema = None
        if not self.stack or self.stack[-1] != tag:
            self.errors.append(f"unexpected closing {tag}, stack={self.stack[-3:]}")
        else:
            self.stack.pop()

    def attrs(self, tag):
        return [attrs for name, attrs in self.tags if name == tag]


class AccountingPagesTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.pages = {route: Page(route) for route in ROUTES}

    def test_balanced_html_unique_ids_and_structured_data(self):
        for route, page in self.pages.items():
            with self.subTest(route=route):
                self.assertEqual(page.errors, [])
                self.assertEqual(page.stack, [])
                ids = [attrs["id"] for _, attrs in page.tags if "id" in attrs]
                self.assertEqual(len(ids), len(set(ids)))
                self.assertTrue(page.schemas)

    def test_one_heading_title_and_self_canonical(self):
        for route, page in self.pages.items():
            with self.subTest(route=route):
                self.assertEqual(len(page.attrs("h1")), 1)
                self.assertEqual(len(page.attrs("title")), 1)
                canonical = [a["href"] for a in page.attrs("link") if a.get("rel") == "canonical"]
                self.assertEqual(canonical, ["https://dokumenty82.ru" + route])
                robots = [a["content"] for a in page.attrs("meta") if a.get("name") == "robots"]
                self.assertEqual(robots, ["index, follow"])

    def test_internal_links_and_fragment_targets_exist(self):
        cache = dict(self.pages)
        for route, page in self.pages.items():
            for attrs in page.attrs("a"):
                href = attrs.get("href", "")
                url = urlsplit(href)
                if not href or url.scheme or url.netloc:
                    continue
                target_route = url.path or route
                if not target_route.startswith("/"):
                    continue
                target = ROOT / target_route.lstrip("/")
                if target.is_dir():
                    target = target / "index.html"
                with self.subTest(route=route, href=href):
                    self.assertTrue(target.exists(), str(target))
                    if url.fragment and target.name == "index.html":
                        if target_route not in cache:
                            cache[target_route] = Page(target_route)
                        ids = {a["id"] for _, a in cache[target_route].tags if "id" in a}
                        self.assertIn(unquote(url.fragment), ids)

    def test_accounting_links_reach_form_and_offer_all_topics(self):
        contact = self.pages["/razbor-situacii/"]
        options = {a.get("value") for a in contact.attrs("option")}
        self.assertTrue(set(TOPICS.values()) <= options)
        for route, service in [("/buhgalterskie-uslugi/", "accounting"), ("/soprovozhdenie/", "accounting-ip"),
                               ("/buhgalterskoe-soprovozhdenie-ooo/", "accounting-ooo"), ("/ceny/", "accounting")]:
            page = self.pages[route]
            self.assertTrue(any(a.get("href") == f"/razbor-situacii/?service={service}#route-contact" for a in page.attrs("a")))
            self.assertTrue(any(a.get("src") == "/assets/metrika-goals.js?v=202608271600" for a in page.attrs("script")))
        form = [a for a in contact.attrs("form") if a.get("data-lead-form") == "amo"]
        self.assertEqual(len(form), 1)
        self.assertEqual(form[0]["action"], "/api/lead")
        self.assertEqual(form[0]["method"], "post")
        self.assertEqual(form[0]["enctype"], "multipart/form-data")
        inputs = {a.get("name"): a for a in contact.attrs("input")}
        for name in ["name", "phone", "privacy"]:
            self.assertIn("required", inputs[name])
        self.assertNotIn("checked", inputs["privacy"])

    def test_every_existing_form_consumer_has_new_asset_version(self):
        consumers = []
        for file in ROOT.glob("*/index.html"):
            html = file.read_text(encoding="utf-8")
            if 'src="/assets/lead-form.js?' in html:
                consumers.append(file)
                self.assertIn('src="/assets/lead-form.js?v=202608271600"', html)
        self.assertEqual(len(consumers), 20)


if __name__ == "__main__":
    unittest.main()
