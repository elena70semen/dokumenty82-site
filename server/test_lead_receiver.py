import importlib.util
import io
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
    self.assertIn({
      "field_id": 1367613,
      "values": [{"value": "1730000000000000000"}],
    }, lead["custom_fields_values"])
    self.assertIn({"field_code": "UTM_SOURCE", "values": [{"value": "yandex"}]}, lead["custom_fields_values"])
    self.assertIn({"field_code": "YCLID", "values": [{"value": "test-yclid"}]}, lead["custom_fields_values"])

  def test_empty_client_id_does_not_add_tracking_field(self):
    _, calls = self.create(self.fields(client_id=""))
    lead = calls[0].kwargs["payload"][0]

    self.assertFalse(any(x.get("field_id") == 1367613 for x in lead["custom_fields_values"]))

  def test_owner_qa_is_explicitly_tagged(self):
    fields = {**self.fields(), "utm_source": "owner_qa"}
    _, calls = self.create(fields)
    self.assertIn({"name": "owner_qa"}, calls[0].kwargs["payload"][0]["_embedded"]["tags"])


class AmoFollowupTaskTests(unittest.TestCase):
  def test_creates_task_for_configured_owner_and_marks_qa(self):
    with mock.patch.object(receiver, "AMO_RESPONSIBLE_USER_ID", "61"), \
         mock.patch.object(receiver, "AMO_FOLLOWUP_TASK_SECONDS", 3600), \
         mock.patch.object(receiver.time, "time", return_value=1000), \
         mock.patch.object(receiver, "amo_headers", return_value={}), \
         mock.patch.object(receiver, "api_request", side_effect=[None, {"_embedded": {"tasks": [{"id": 71}]}}]) as api:
      result = receiver.ensure_amo_followup_task("https://example.amocrm.ru", 901, {"utm_source": "owner_qa", "task_type": "ИФНС"})
    task = api.call_args.kwargs["payload"][0]
    self.assertEqual((task["entity_id"], task["responsible_user_id"], task["complete_till"]), (901, 61, 4600))
    self.assertIn("клиенту не звонить", task["text"])
    self.assertEqual(result, {"status": "created", "task_id": 71})

  def test_keeps_existing_open_task_instead_of_duplicating(self):
    existing = {"_embedded": {"tasks": [{"id": 71, "entity_id": 901, "responsible_user_id": 61, "is_completed": False}]}}
    with mock.patch.object(receiver, "AMO_RESPONSIBLE_USER_ID", "61"), \
         mock.patch.object(receiver, "AMO_FOLLOWUP_TASK_SECONDS", 3600), \
         mock.patch.object(receiver, "amo_headers", return_value={}), \
         mock.patch.object(receiver, "api_request", return_value=existing) as api:
      result = receiver.ensure_amo_followup_task("https://example.amocrm.ru", 901, {})
    self.assertEqual(api.call_count, 1)
    self.assertEqual(result["status"], "existing")

  def test_task_failure_does_not_turn_created_lead_into_form_error(self):
    with mock.patch.object(receiver, "AMO_FOLLOWUP_TASK_SECONDS", 3600), \
         mock.patch.object(receiver, "ensure_amo_followup_task", side_effect=RuntimeError("unavailable")):
      result, calls = AmoLeadAttributionTests().create(AmoLeadAttributionTests().fields())
    self.assertEqual(result["status"], "sent")
    self.assertEqual(result["followup_task"]["status"], "failed")
    self.assertEqual(sum("leads/complex" in c.args[1] for c in calls), 1)


class AmoAccountDestinationTests(unittest.TestCase):
  def test_wrong_account_prevents_lead_and_contact_creation(self):
    with mock.patch.object(receiver, "ACCEPT_LOCAL_ONLY", False), \
         mock.patch.object(receiver, "AMO_EXPECTED_ACCOUNT_ID", "32965862"), \
         mock.patch.object(receiver, "amo_base_url", return_value="https://presentationrc.amocrm.ru"), \
         mock.patch.object(receiver, "amo_headers", return_value={"Authorization": "Bearer test"}), \
         mock.patch.object(receiver, "api_request", return_value={"id": 111}) as api:
      with self.assertRaisesRegex(RuntimeError, "Передача данных остановлена"):
        receiver.create_amo_lead(AmoLeadAttributionTests().fields(), [])
    self.assertEqual(len(api.call_args_list), 1)
    self.assertEqual(api.call_args.args, ("GET", "https://presentationrc.amocrm.ru/api/v4/account"))
    self.assertNotIn("payload", api.call_args.kwargs)

  def test_wrong_account_prevents_contact_search_in_portal(self):
    with mock.patch.object(receiver, "AMO_EXPECTED_ACCOUNT_ID", "32965862"), \
         mock.patch.object(receiver, "amo_base_url", return_value="https://presentationrc.amocrm.ru"), \
         mock.patch.object(receiver, "amo_headers", return_value={"Authorization": "Bearer test"}), \
         mock.patch.object(receiver, "api_request", return_value={"id": 111}) as api:
      with self.assertRaisesRegex(RuntimeError, "Передача данных остановлена"):
        receiver.fetch_amo_portal_snapshot("test@example.com")
    self.assertEqual(len(api.call_args_list), 1)
    self.assertTrue(api.call_args.args[1].endswith("/account"))

  def test_expected_account_allows_delivery(self):
    with mock.patch.object(receiver, "ACCEPT_LOCAL_ONLY", False), \
         mock.patch.object(receiver, "AMO_EXPECTED_ACCOUNT_ID", "32965862"), \
         mock.patch.object(receiver, "amo_base_url", return_value="https://presentationrc.amocrm.ru"), \
         mock.patch.object(receiver, "amo_headers", return_value={"Authorization": "Bearer test"}), \
         mock.patch.object(receiver, "api_request", side_effect=[{"id": 32965862}, [{"id": 901}], None]) as api:
      result = receiver.create_amo_lead(AmoLeadAttributionTests().fields(), [])
    self.assertEqual(result["status"], "sent")
    self.assertEqual(api.call_args_list[1].args[0], "POST")

  def test_callback_rejects_wrong_host_before_token_exchange(self):
    handler = object.__new__(receiver.LeadHandler)
    handler.path = "/api/amo/oauth/callback?state=test-state&code=test-code&referer=wrong.amocrm.ru"
    with mock.patch.object(receiver, "AMO_EXTERNAL_STATE", "test-state"), \
         mock.patch.object(receiver, "AMO_SUBDOMAIN", "presentationrc.amocrm.ru"), \
         mock.patch.object(receiver, "exchange_oauth_token") as exchange, \
         mock.patch.object(receiver, "save_token_state") as save, \
         mock.patch.object(receiver, "html_response") as response:
      handler.handle_oauth_callback()
    self.assertEqual(response.call_args.args[1], 403)
    exchange.assert_not_called()
    save.assert_not_called()

  def test_callback_requires_configured_state(self):
    handler = object.__new__(receiver.LeadHandler)
    handler.path = "/api/amo/oauth/callback?code=test-code"
    with mock.patch.object(receiver, "AMO_EXTERNAL_STATE", "test-state"), \
         mock.patch.object(receiver, "exchange_oauth_token") as exchange, \
         mock.patch.object(receiver, "html_response") as response:
      handler.handle_oauth_callback()
    self.assertEqual(response.call_args.args[1], 403)
    exchange.assert_not_called()


class AmoSetupLinkTests(unittest.TestCase):
  def request(self, supplied="s" * 40, expires="2000", state=None):
    handler = object.__new__(receiver.LeadHandler)
    handler.path = "/api/amo/oauth/connect?setup=" + supplied
    handler.wfile = io.BytesIO()
    handler.send_response = mock.Mock()
    handler.send_header = mock.Mock()
    handler.end_headers = mock.Mock()
    with mock.patch.object(receiver, "AMO_SETUP_TOKEN", "s" * 40), \
         mock.patch.object(receiver, "AMO_SETUP_EXPIRES_AT", expires), \
         mock.patch.object(receiver, "AMO_EXTERNAL_STATE", 'private\"state'), \
         mock.patch.object(receiver, "AMO_EXPECTED_ACCOUNT_ID", "32965862"), \
         mock.patch.object(receiver, "amo_base_url", return_value="https://presentationrc.amocrm.ru"), \
         mock.patch.object(receiver.time, "time", return_value=1000), \
         mock.patch.object(receiver, "load_token_state", return_value=state or {}):
      handler.handle_oauth_connect()
    return handler

  def test_rejects_wrong_expired_and_used_links(self):
    for kwargs in ({"supplied": "wrong"}, {"expires": "1000"}, {"state": {"access_token": "already-connected"}}):
      with self.subTest(kwargs=kwargs):
        handler = self.request(**kwargs)
        handler.send_response.assert_called_once_with(404)
        self.assertNotIn(b"button.min.js", handler.wfile.getvalue())

  def test_valid_link_names_pinned_account_and_disables_caching(self):
    handler = self.request()
    handler.send_response.assert_called_once_with(200)
    handler.send_header.assert_any_call("Cache-Control", "no-store")
    handler.send_header.assert_any_call("Referrer-Policy", "no-referrer")
    body = handler.wfile.getvalue().decode("utf-8")
    self.assertIn("https://presentationrc.amocrm.ru", body)
    self.assertIn("32965862", body)
    self.assertIn('data-state="private&quot;state"', body)
    self.assertIn('src="https://www.amocrm.ru/auth/button.min.js"', body)


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


class QuickLeadDefaultsTests(unittest.TestCase):
  def test_quick_lead_requires_only_contact_and_keeps_context(self):
    fields = {
      "name": "",
      "phone": "79789987222",
      "task_type": "Регистрация ИП",
      "message": "",
    }

    prepared = receiver.complete_quick_lead(fields, True)

    self.assertEqual(prepared["name"], "Клиент с сайта")
    self.assertIn("Регистрация ИП", prepared["message"])
    self.assertEqual(fields["name"], "")

  def test_detailed_lead_is_not_filled_implicitly(self):
    fields = {"name": "", "task_type": "Разбор ситуации", "message": ""}
    self.assertEqual(receiver.complete_quick_lead(fields, False), fields)


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
