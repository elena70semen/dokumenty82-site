#!/usr/bin/env python3
"""Manually export confirmed website receipts in Presentation for Metrika CSV import.

No CRM writes, no Yandex upload, no scheduler. Run with the lead service's environment.
This records delivery to CRM, not qualification, payment, or a unique new customer.
"""
import argparse
from collections import Counter
import csv
from datetime import datetime, timezone
import importlib.util
import json
import os
from pathlib import Path
import re
import sys

ACCOUNT_ID = 32965862
SUBDOMAIN = "presentationrc"
TARGET = "crm_presentation_lead_received"
MIGRATED_AT = int(datetime(2026, 9, 11, 12, 59, tzinfo=timezone.utc).timestamp())
COLUMNS = ("ClientId", "Yclid", "Target", "DateTime")


def timestamp(value):
    date = datetime.fromisoformat(str(value).replace("Z", "+00:00"))
    if date.tzinfo is None:
        raise ValueError("Timestamp must include a timezone")
    return int(date.timestamp())


def qa_fields(fields):
    return (str(fields.get("utm_source", "")).lower() == "owner_qa"
            or str(fields.get("utm_medium", "")).lower() == "test"
            or any(re.match(r"^\s*(?:тест|test|qa)\b", str(fields.get(key, "")), re.I)
                   for key in ("name", "message", "task_type")))


def verify_account(account):
    if account.get("id") != ACCOUNT_ID or account.get("subdomain") != SUBDOMAIN:
        raise ValueError("Expected Presentation account; export stopped")


def collect(submissions, get_lead, now, since=MIGRATED_AT, uploaded=()):
    """Return private CSV rows, a manifest without visitor IDs, and skip counts."""
    rows, entries, counts = [], [], Counter()
    seen = set(uploaded)
    earliest = max(since, MIGRATED_AT, now - 21 * 86400)
    for path in sorted(Path(submissions).glob("*/lead.json")):
        record = json.loads(path.read_text(encoding="utf-8"))
        created = timestamp(record["created_at"])
        if created < earliest or created > now:
            counts["outside_window"] += 1
            continue
        fields = record["fields"]
        if qa_fields(fields):
            counts["qa"] += 1
            continue
        crm_path = path.with_name("crm.json")
        if not crm_path.exists():
            counts["not_sent"] += 1
            continue
        receipt = json.loads(crm_path.read_text(encoding="utf-8"))
        if receipt.get("status") != "sent" or not isinstance(receipt.get("lead_id"), int):
            counts["not_sent"] += 1
            continue
        lead_id = receipt["lead_id"]
        if lead_id in seen:
            counts["duplicate_or_uploaded"] += 1
            continue
        client = str(fields.get("yandex_client_id", ""))
        yclid = str(fields.get("yclid", ""))
        client = client if re.fullmatch(r"[0-9]{6,80}", client) else ""
        yclid = yclid if re.fullmatch(r"[0-9]{6,128}", yclid) else ""
        if not client and not yclid:
            counts["missing_attribution"] += 1
            continue
        live = get_lead(lead_id)
        if live.get("id") != lead_id or live.get("account_id") != ACCOUNT_ID:
            raise ValueError("CRM receipt does not match Presentation")
        tags = {str(tag.get("name", "")).lower()
                for tag in live.get("_embedded", {}).get("tags", [])}
        if tags.intersection({"owner_qa", "test", "qa", "тест"}):
            counts["qa_crm"] += 1
            continue
        live_time = live.get("created_at", 0)
        if (live.get("is_deleted") or "site" not in tags
                or not isinstance(live_time, int)
                or not max(earliest, created - 300) <= live_time <= now):
            counts["unverified_receipt"] += 1
            continue
        rows.append(dict(zip(COLUMNS, (client, "" if client else yclid, TARGET, live_time))))
        entries.append({"submission_id": path.parent.name, "lead_id": lead_id,
                        "event_time": live_time})
        seen.add(lead_id)
    return rows, entries, dict(counts)


def load_uploaded(paths):
    ids = set()
    for path in paths:
        manifest = json.loads(Path(path).read_text(encoding="utf-8"))
        if manifest.get("account_id") != ACCOUNT_ID or manifest.get("target") != TARGET:
            raise ValueError("Uploaded manifest belongs to another account or goal")
        ids.update(item["lead_id"] for item in manifest["entries"])
    return ids


def write_export(directory, rows, manifest):
    # A new private directory prevents replacement of an earlier reviewed export.
    directory = Path(directory)
    directory.mkdir(mode=0o700, parents=False, exist_ok=False)
    os.chmod(directory, 0o700)
    # The web upload dialog asks for one attribution type per file.
    for identifier in ("ClientId", "Yclid"):
        selected = [row for row in rows if row[identifier]]
        if not selected:
            continue
        columns = (identifier, "Target", "DateTime")
        filename = "conversions-" + identifier.lower() + ".csv"
        with (directory / filename).open("x", encoding="utf-8", newline="") as output:
            os.chmod(output.name, 0o600)
            writer = csv.DictWriter(output, fieldnames=columns)
            writer.writeheader()
            writer.writerows({key: row[key] for key in columns} for row in selected)
    path = directory / "manifest.json"
    with path.open("x", encoding="utf-8") as output:
        os.chmod(path, 0o600)
        json.dump(manifest, output, ensure_ascii=False, indent=2)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--receiver", default="/opt/dokumenty82-form/lead_receiver.py")
    parser.add_argument("--output-dir", required=True, help="New directory under a private parent")
    parser.add_argument("--uploaded-manifest", action="append", default=[],
                        help="Exclude ONLY exports already accepted by Metrika; repeatable")
    args = parser.parse_args()
    spec = importlib.util.spec_from_file_location("lead_receiver", args.receiver)
    receiver = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(receiver)
    base = receiver.amo_base_url()
    if base != "https://presentationrc.amocrm.ru":
        raise ValueError("Expected Presentation URL")
    headers = receiver.amo_headers()
    verify_account(receiver.api_request("GET", base + "/api/v4/account", headers=headers))
    now = int(datetime.now(timezone.utc).timestamp())
    rows, entries, skipped = collect(
        receiver.BASE_DIR / "submissions",
        lambda lead_id: receiver.api_request("GET", base + f"/api/v4/leads/{lead_id}", headers=headers),
        now, uploaded=load_uploaded(args.uploaded_manifest))
    manifest = {"account_id": ACCOUNT_ID, "target": TARGET, "generated_at": now,
                "count": len(rows), "skipped": skipped, "entries": entries,
                "uploaded": False}
    write_export(args.output_dir, rows, manifest)
    print(json.dumps({"account_id": ACCOUNT_ID, "count": len(rows), "skipped": skipped,
                      "csv_written": bool(rows), "uploaded": False}))


if __name__ == "__main__":
    try:
        main()
    except Exception as error:
        # Exceptions from API clients may contain response text; never dump it.
        print("Export failed: " + type(error).__name__, file=sys.stderr)
        sys.exit(1)
