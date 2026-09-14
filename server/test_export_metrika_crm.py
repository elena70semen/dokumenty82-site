import copy
import csv
import json
from pathlib import Path
import tempfile
import unittest

from export_metrika_crm import ACCOUNT_ID, TARGET, collect, load_uploaded, verify_account, write_export


class ReceiptExportTests(unittest.TestCase):
    now = 1789372800  # 2026-09-14 08:00 UTC

    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.addCleanup(self.tmp.cleanup)
        self.root = Path(self.tmp.name)
        self.base = {"created_at": "2026-09-11T13:03:42+00:00",
                     "fields": {"yandex_client_id": "1730000000000000000",
                                "name": "Клиент", "phone": "PRIVATE", "email": "PRIVATE"}}
        self.live = {"id": 99, "account_id": ACCOUNT_ID, "created_at": self.now - 2 * 86400,
                     "_embedded": {"tags": [{"name": "site"}]}}

    def add(self, name="one", record=None, receipt=None):
        directory = self.root / name
        directory.mkdir()
        (directory / "lead.json").write_text(json.dumps(record or self.base), encoding="utf-8")
        (directory / "crm.json").write_text(json.dumps(receipt or {"status": "sent", "lead_id": 99}))

    def test_export_contains_only_attribution_and_receipt_time(self):
        self.add()
        rows, entries, _ = collect(self.root, lambda _: self.live, self.now)
        self.assertEqual(rows, [{"ClientId": "1730000000000000000", "Yclid": "",
                                 "Target": TARGET, "DateTime": self.live["created_at"]}])
        destination = self.root / "export"
        write_export(destination, rows, {"entries": entries})
        text = (destination / "conversions-clientid.csv").read_text()
        self.assertNotIn("PRIVATE", text)
        self.assertEqual(len(list(csv.DictReader(text.splitlines()))), 1)
        self.assertNotIn("Price", text)

    def test_qa_excluded_before_api_and_empty_file_not_written(self):
        qa = copy.deepcopy(self.base)
        qa["fields"]["utm_source"] = "owner_qa"
        self.add(record=qa)
        def must_not_call(_):
            self.fail("QA must not reach CRM reads")
        rows, entries, counts = collect(self.root, must_not_call, self.now)
        self.assertEqual(counts, {"qa": 1})
        destination = self.root / "export"
        write_export(destination, rows, {"entries": entries})
        self.assertFalse(list(destination.glob("*.csv")))

    def test_old_account_or_mismatched_receipt_stops_export(self):
        with self.assertRaises(ValueError):
            verify_account({"id": 1, "subdomain": "old"})
        self.add()
        with self.assertRaises(ValueError):
            collect(self.root, lambda _: {**self.live, "account_id": 1}, self.now)

    def test_duplicate_and_confirmed_upload_are_excluded(self):
        self.add("one")
        self.add("two")
        rows, _, counts = collect(self.root, lambda _: self.live, self.now)
        self.assertEqual(len(rows), 1)
        self.assertEqual(counts["duplicate_or_uploaded"], 1)
        rows, _, _ = collect(self.root, lambda _: self.live, self.now, uploaded={99})
        self.assertFalse(rows)

    def test_missing_id_failed_delivery_old_future_and_qa_crm(self):
        for name, changes, receipt, live in [
            ("missing", {"fields": {}}, None, self.live),
            ("failed", {}, {"status": "stored_only"}, self.live),
            ("old", {"created_at": "2026-09-11T10:00:00+00:00"}, None, self.live),
            ("future", {"created_at": "2027-01-01T00:00:00+00:00"}, None, self.live),
            ("crmqa", {}, None, {**self.live, "_embedded": {"tags": [{"name": "owner_qa"}]}}),
        ]:
            with self.subTest(name=name), tempfile.TemporaryDirectory() as work:
                old_root, self.root = self.root, Path(work)
                self.add(record={**self.base, **changes}, receipt=receipt)
                rows, _, _ = collect(self.root, lambda _: live, self.now)
                self.assertFalse(rows)
                self.root = old_root

    def test_yclid_fallback_and_upload_manifest_validation(self):
        self.add(record={**self.base, "fields": {"yclid": "123456789012345"}})
        rows, entries, _ = collect(self.root, lambda _: self.live, self.now)
        self.assertEqual(rows[0]["ClientId"], "")
        self.assertEqual(rows[0]["Yclid"], "123456789012345")
        destination = self.root / "export"
        write_export(destination, rows, {"entries": entries})
        self.assertTrue((destination / "conversions-yclid.csv").exists())
        self.assertFalse((destination / "conversions-clientid.csv").exists())
        self.assertNotIn("ClientId", (destination / "conversions-yclid.csv").read_text())
        manifest = self.root / "accepted.json"
        manifest.write_text(json.dumps({"account_id": ACCOUNT_ID, "target": TARGET, "entries": entries}))
        self.assertEqual(load_uploaded([manifest]), {99})
        manifest.write_text(json.dumps({"account_id": 1, "target": TARGET, "entries": entries}))
        with self.assertRaises(ValueError):
            load_uploaded([manifest])


if __name__ == "__main__":
    unittest.main()
