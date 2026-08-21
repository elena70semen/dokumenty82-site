import importlib.util
import sys
import types
import unittest
from pathlib import Path
from unittest import mock


if "cgi" not in sys.modules:
  sys.modules["cgi"] = types.ModuleType("cgi")

MODULE_PATH = Path(__file__).with_name("lead_receiver.py")
SPEC = importlib.util.spec_from_file_location("lead_receiver", MODULE_PATH)
receiver = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(receiver)


class AmoLeadAttributionTests(unittest.TestCase):
  def fields(self, client_id="1730000000000000000"):
    return {
      "name": "Test",
      "phone": "+70000000000",
      "email": "test@example.com",
      "task_type": "Test request",
      "message": "Please call me",
      "source_page": "/razbor-situacii/",
      "landing_page": "/?utm_source=yandex",
      "referrer": "https://yandex.ru/",
      "yandex_client_id": client_id,
      "yclid": "test-yclid",
      "utm_source": "yandex",
      "utm_medium": "cpc",
      "utm_campaign": "campaign",
      "utm_content": "content",
      "utm_term": "term",
    }

  def create(self, fields):
    with mock.patch.object(receiver, "AMO_METRIKA_CLIENT_ID_FIELD_ID", "1367613"), \
         mock.patch.object(receiver, "amo_base_url", return_value="https://example.amocrm.ru"), \
         mock.patch.object(receiver, "amo_headers", return_value={"Authorization": "Bearer test"}), \
         mock.patch.object(receiver, "api_request", side_effect=[[{"id": 901}], None]) as api:
      result = receiver.create_amo_lead(fields, [])
    return result, api.call_args_list

  def test_client_id_is_written_to_metrika_tracking_field(self):
    result, calls = self.create(self.fields())
    lead = calls[0].kwargs["payload"][0]

    self.assertEqual(result["lead_id"], 901)
    self.assertEqual(lead["custom_fields_values"], [{
      "field_id": 1367613,
      "values": [{"value": "1730000000000000000"}],
    }])

  def test_empty_client_id_does_not_add_tracking_field(self):
    _, calls = self.create(self.fields(client_id=""))
    lead = calls[0].kwargs["payload"][0]

    self.assertNotIn("custom_fields_values", lead)


class PhoneNormalizationTests(unittest.TestCase):
  def test_formats_russian_phone_for_yandex_crm_import(self):
    cases = {
      "+7 (978) 998-72-22": "79789987222",
      "8 978 998 72 22": "79789987222",
      "9789987222": "79789987222",
      "79789987222": "79789987222",
    }

    for source, expected in cases.items():
      with self.subTest(source=source):
        self.assertEqual(receiver.normalize_phone(source), expected)

  def test_preserves_international_country_code(self):
    self.assertEqual(receiver.normalize_phone("+380 50 123 45 67"), "380501234567")

  def test_rejects_ambiguous_or_invalid_phone(self):
    for source in ("123", "перезвоните", "+7 978 998-72-22 доб. 15"):
      with self.subTest(source=source):
        with self.assertRaises(ValueError):
          receiver.normalize_phone(source)


class RequestClientIpTests(unittest.TestCase):
  def test_uses_nginx_real_ip_for_loopback_proxy(self):
    handler = types.SimpleNamespace(
      client_address=("127.0.0.1", 12345),
      headers={"X-Real-IP": "203.0.113.7"},
    )

    self.assertEqual(receiver.request_client_ip(handler), "203.0.113.7")

  def test_rejects_invalid_forwarded_ip(self):
    handler = types.SimpleNamespace(
      client_address=("127.0.0.1", 12345),
      headers={"X-Real-IP": "not-an-ip"},
    )

    self.assertEqual(receiver.request_client_ip(handler), "127.0.0.1")

  def test_does_not_trust_header_from_non_proxy_peer(self):
    handler = types.SimpleNamespace(
      client_address=("198.51.100.9", 12345),
      headers={"X-Real-IP": "203.0.113.7"},
    )

    self.assertEqual(receiver.request_client_ip(handler), "198.51.100.9")


class AmoPortalBridgeTests(unittest.TestCase):
  def test_snapshot_uses_exact_contact_and_returns_sanitized_leads(self):
    responses = [
      {"_embedded": {"contacts": [{
        "id": 11,
        "name": "Тестовый клиент",
        "updated_at": 100,
        "custom_fields_values": [{
          "field_code": "EMAIL",
          "values": [{"value": "client@example.com"}],
        }],
        "_embedded": {
          "companies": [{"id": 21}],
          "leads": [{"id": 31}],
        },
      }]}},
      {"_embedded": {"companies": [{"id": 21, "name": "ООО Тест"}]}},
      {"_embedded": {"leads": [{
        "id": 31,
        "name": "Бухгалтерское сопровождение",
        "pipeline_id": 41,
        "status_id": 52,
        "responsible_user_id": 61,
        "closest_task_at": 1800000000,
        "created_at": 1700000000,
        "updated_at": 1750000000,
        "closed_at": 0,
      }]}},
      {"_embedded": {"pipelines": [{
        "id": 41,
        "name": "Отдел продаж",
        "_embedded": {"statuses": [
          {"id": 51, "name": "Новая", "sort": 10},
          {"id": 52, "name": "В работе", "sort": 20},
          {"id": 142, "name": "Успешно реализовано", "sort": 10000},
        ]},
      }]}},
      {"_embedded": {"users": [{"id": 61, "name": "Ответственный"}]}},
    ]
    with mock.patch.object(receiver, "amo_base_url", return_value="https://example.amocrm.ru"), \
         mock.patch.object(receiver, "amo_headers", return_value={"Authorization": "Bearer test"}), \
         mock.patch.object(receiver, "api_request", side_effect=responses):
      snapshot = receiver.fetch_amo_portal_snapshot("client@example.com")

    self.assertTrue(snapshot["found"])
    self.assertEqual(snapshot["contact"], {"id": 11, "name": "Тестовый клиент"})
    self.assertEqual(snapshot["companies"], [{"id": 21, "name": "ООО Тест"}])
    self.assertEqual(snapshot["leads"][0]["status_name"], "В работе")
    self.assertEqual(snapshot["leads"][0]["responsible_name"], "Ответственный")
    self.assertNotIn("custom_fields_values", snapshot["contact"])

  def test_snapshot_rejects_loose_search_result(self):
    response = {"_embedded": {"contacts": [{
      "id": 11,
      "name": "Похожий контакт",
      "custom_fields_values": [{
        "field_code": "EMAIL",
        "values": [{"value": "other@example.com"}],
      }],
    }]}}
    with mock.patch.object(receiver, "amo_base_url", return_value="https://example.amocrm.ru"), \
         mock.patch.object(receiver, "amo_headers", return_value={"Authorization": "Bearer test"}), \
         mock.patch.object(receiver, "api_request", return_value=response):
      snapshot = receiver.fetch_amo_portal_snapshot("client@example.com")

    self.assertFalse(snapshot["found"])
    self.assertEqual(snapshot["leads"], [])

  def test_bridge_requires_long_shared_secret(self):
    with mock.patch.object(receiver, "AMO_PORTAL_BRIDGE_TOKEN", "x" * 40):
      self.assertTrue(receiver.portal_bridge_authorized("127.0.0.1", "Bearer " + "x" * 40))
      self.assertFalse(receiver.portal_bridge_authorized("127.0.0.1", "Bearer wrong"))
    with mock.patch.object(receiver, "AMO_PORTAL_BRIDGE_TOKEN", "short"):
      self.assertFalse(receiver.portal_bridge_authorized("127.0.0.1", "Bearer short"))


if __name__ == "__main__":
  unittest.main()
