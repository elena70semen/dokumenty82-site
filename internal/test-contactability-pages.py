"""Check that the contact fallback works consistently across public pages."""
from pathlib import Path
import subprocess
from lxml import html

ROOT = Path(__file__).resolve().parent.parent
pages = subprocess.check_output(["git", "ls-files", "*.html"], cwd=ROOT, text=True).splitlines()
runtime_pages = 0
forms_checked = 0
for relative in pages:
    if relative.startswith(("internal/", "server/")):
        continue
    source = (ROOT / relative).read_text(encoding="utf-8")
    page = html.fromstring(source)
    dependencies = page.xpath('//script[contains(@src, "/assets/lead-form.js") or contains(@src, "/assets/ai-chat.js")]/@src')
    if not dependencies:
        continue
    runtime_pages += 1
    helpers = page.xpath('//script[contains(@src, "/assets/contact-fields.js")]/@src')
    assert len(helpers) == 1, relative
    assert source.index(helpers[0]) < min(source.index(dependency) for dependency in dependencies), relative
    assert page.xpath('//link[contains(@href, "/assets/contact-fields.css")]'), relative
    assert all("20261007-contact1" in dependency for dependency in dependencies), relative
    ids = page.xpath('//*[@id]/@id')
    assert len(ids) == len(set(ids)), relative
    for form in page.xpath('//form[@data-lead-form="amo"]'):
        forms_checked += 1
        emails = form.xpath('.//input[@name="email"]')
        assert len(emails) == 1, relative
        assert emails[0].get("type") == "email" and "required" not in emails[0].attrib, relative
        assert emails[0].get("autocomplete") == "email", relative
        for field in form.xpath('.//input[@name="phone" or @name="email"]'):
            hint = field.get("aria-describedby")
            assert hint and page.xpath('//*[@id=$hint]', hint=hint), relative
        receipts = form.xpath('.//div[contains(concat(" ", normalize-space(@class), " "), " lead-receipt ")]')
        assert len(receipts) == 1 and "hidden" in receipts[0].attrib, relative
        assert receipts[0].xpath('.//p[contains(@class, "ym-hide-content")]'), relative
        links = receipts[0].xpath('.//a/@href')
        assert links == ["https://t.me/+79789987222", "mailto:info@dokumenty82.ru"], relative
assert forms_checked == 26, forms_checked
print(f"PASS: {runtime_pages} public widget pages, {forms_checked} forms, optional backup email and dependency order.")
