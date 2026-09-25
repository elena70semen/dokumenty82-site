import importlib.util
import io
import json
import sys
import tempfile
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


class PublicLeadUploadPolicyTests(unittest.TestCase):
  def test_public_file_part_is_rejected_by_policy(self):
    form = types.SimpleNamespace(list=[
      types.SimpleNamespace(name="phone", filename=None),
      types.SimpleNamespace(name="files", filename="document.pdf"),
    ])
    self.assertTrue(receiver.has_public_upload(form))

  def test_regular_lead_without_file_remains_allowed(self):
    form = types.SimpleNamespace(list=[types.SimpleNamespace(name="phone", filename=None)])
    self.assertFalse(receiver.has_public_upload(form))
    fields = AmoLeadAttributionTests().fields()
    with mock.patch.object(receiver, "amo_base_url", return_value="https://example.amocrm.ru"), \
         mock.patch.object(receiver, "amo_headers", return_value={"Authorization": "Bearer test"}), \
         mock.patch.object(receiver, "api_request", side_effect=[[{"id": 901}], None]) as api:
      result = receiver.create_amo_lead(fields)
    self.assertEqual(result, {"status": "sent", "lead_id": 901})
    note = api.call_args_list[1].kwargs["payload"][0]["params"]["text"]
    self.assertNotIn("Файлы:", note)
    self.assertNotIn("document.pdf", note)


class AiCommercialGuidanceTests(unittest.TestCase):
  def test_prompt_covers_the_five_price_dialogues_without_inventing_a_quote(self):
    prompt = receiver.AI_SYSTEM_PROMPT
    for fact in (
      "ИП — от 5 000 ₽ в месяц",
      "ООО — от 10 000 ₽ в месяц",
      "Бесплатна только экспресс-диагностика",
      "начинаться от 3 000 ₽",
      "индивидуальной или разовой задачи",
    ):
      self.assertIn(fact, prompt)
    self.assertIn("Точный состав и цену определяет специалист", prompt)
    self.assertIn("Не называй разовый стартовый платёж", prompt)
    self.assertIn("Не придумывай скидки", prompt)


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

  def test_promotion_id_is_visible_in_crm_note(self):
    fields = {**self.fields(), "offer_id": "accounting-legal-50-20260928"}
    _, calls = self.create(fields)
    note = calls[1].kwargs["payload"][0]["params"]["text"]
    self.assertIn("Акция: accounting-legal-50-20260928", note)


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
         mock.patch.object(receiver, "queue_amo_followup_task", return_value=Path("unused")), \
         mock.patch.object(receiver, "process_amo_followup_job", return_value={"status": "queued"}):
      result, calls = AmoLeadAttributionTests().create(AmoLeadAttributionTests().fields())
    self.assertEqual(result["status"], "sent")
    self.assertEqual(result["followup_task"]["status"], "queued")
    self.assertEqual(sum("leads/complex" in c.args[1] for c in calls), 1)


class AmoFollowupQueueTests(unittest.TestCase):
  def setUp(self):
    directory = tempfile.TemporaryDirectory()
    self.addCleanup(directory.cleanup)
    for name, value in (("BASE_DIR", Path(directory.name)), ("AMO_EXPECTED_ACCOUNT_ID", "42"),
                        ("AMO_RESPONSIBLE_USER_ID", "61"), ("AMO_FOLLOWUP_TASK_SECONDS", 3600),
                        ("ACCEPT_LOCAL_ONLY", False)):
      patch = mock.patch.object(receiver, name, value)
      patch.start()
      self.addCleanup(patch.stop)
    for name, value in (("amo_base_url", "https://example.amocrm.ru"), ("amo_headers", {})):
      patch = mock.patch.object(receiver, name, return_value=value)
      patch.start()
      self.addCleanup(patch.stop)
    clock_patch = mock.patch.object(receiver.time, "time", return_value=1000)
    self.clock = clock_patch.start()
    self.addCleanup(clock_patch.stop)

  def queue(self):
    return receiver.queue_amo_followup_task("https://example.amocrm.ru", 901,
                                          {"task_type": "ИФНС", "utm_source": "owner_qa", "phone": "private"})

  def api(self, status=88168838, owner=61):
    return [{"id": 42}, {"id": 901, "status_id": status, "responsible_user_id": owner}]

  def test_failure_is_durable_backed_off_and_recovers_without_new_lead(self):
    path = self.queue()
    with mock.patch.object(receiver, "api_request", side_effect=self.api() + [TimeoutError()]) as api:
      self.assertEqual(receiver.process_amo_followup_job(path)["status"], "queued")
      self.assertTrue(all(call.args[0] == "GET" for call in api.call_args_list))
    saved = json.loads(path.read_text(encoding="utf-8"))
    self.assertEqual((saved["attempts"], saved["next_attempt_at"]), (1, 1060))
    self.assertNotIn("phone", saved["fields"])
    with mock.patch.object(receiver, "api_request") as api:
      receiver.retry_amo_followup_tasks()
      api.assert_not_called()
    self.clock.return_value = 1060
    with mock.patch.object(receiver, "api_request", side_effect=self.api() + [None, {"_embedded": {"tasks": [{"id": 71}]}}]) as api:
      # A fresh scan uses only files, as after a process restart.
      receiver.retry_amo_followup_tasks()
      self.assertEqual(api.call_args.kwargs["payload"][0]["complete_till"], 4600)
      self.assertEqual(sum(call.args[0] == "POST" for call in api.call_args_list), 1)
      receiver.retry_amo_followup_tasks()
      self.assertEqual(api.call_count, 4)
    self.assertEqual(json.loads(path.read_text(encoding="utf-8"))["result"], {"status": "created", "task_id": 71})

  def test_ambiguous_post_does_not_duplicate_completed_reassigned_task(self):
    path = self.queue()
    with mock.patch.object(receiver, "api_request", side_effect=self.api() + [None, TimeoutError()]):
      receiver.process_amo_followup_job(path)
    self.clock.return_value = 1060
    task = {"id": 71, "entity_id": 901, "responsible_user_id": 999,
            "is_completed": True, "text": "Done [d82-followup:901]"}
    with mock.patch.object(receiver, "api_request", side_effect=self.api() + [{"_embedded": {"tasks": [task]}}]) as api:
      result = receiver.process_amo_followup_job(path)
    self.assertEqual(result, {"status": "existing", "task_id": 71})
    self.assertTrue(all(call.args[0] == "GET" for call in api.call_args_list))

  def test_checks_later_task_pages_before_posting(self):
    pages = [{"_links": {"next": {"href": "https://irrelevant.invalid"}}, "_embedded": {"tasks": []}},
             {"_embedded": {"tasks": [{"id": 71, "entity_id": 901, "responsible_user_id": 61, "is_completed": False}]}}]
    with mock.patch.object(receiver, "api_request", side_effect=pages) as api:
      self.assertEqual(receiver.ensure_amo_followup_task("https://example.amocrm.ru", 901, {})["status"], "existing")
      self.assertIn("page=2", api.call_args.args[1])
      self.assertTrue(api.call_args.args[1].startswith("https://example.amocrm.ru/"))

  def test_closed_or_reassigned_lead_is_not_contacted_again(self):
    for status, owner, expected in ((142, 61, "skipped_closed"), (143, 61, "skipped_closed"),
                                    (88168838, 999, "skipped_reassigned")):
      with self.subTest(status=status, owner=owner):
        path = self.queue()
        with mock.patch.object(receiver, "api_request", side_effect=self.api(status, owner)) as api:
          self.assertEqual(receiver.process_amo_followup_job(path)["status"], expected)
          self.assertEqual(api.call_count, 2)
        path.unlink()

  def test_changed_destination_and_local_only_never_send_queue_data(self):
    path = self.queue()
    for name, value in (("AMO_EXPECTED_ACCOUNT_ID", "99"), ("AMO_RESPONSIBLE_USER_ID", "99"),
                        ("ACCEPT_LOCAL_ONLY", True), ("AMO_FOLLOWUP_TASK_SECONDS", 0)):
      with self.subTest(name=name), mock.patch.object(receiver, name, value), \
           mock.patch.object(receiver, "api_request") as api:
        self.assertEqual(receiver.process_amo_followup_job(path)["status"], "queued")
        api.assert_not_called()
      self.clock.return_value += 3600

  def test_wrong_account_api_response_keeps_job_pending(self):
    path = self.queue()
    with mock.patch.object(receiver, "api_request", return_value={"id": 99}) as api:
      self.assertEqual(receiver.process_amo_followup_job(path)["status"], "queued")
      self.assertEqual(api.call_count, 1)
      self.assertTrue(api.call_args.args[1].endswith("/account"))

  def test_queue_is_not_overwritten_and_busy_worker_does_not_block_form(self):
    path = self.queue()
    original = path.read_bytes()
    self.clock.return_value = 9000
    self.queue()
    self.assertEqual(path.read_bytes(), original)
    receiver.FOLLOWUP_PROCESS_LOCK.acquire()
    try:
      with mock.patch.object(receiver, "api_request") as api:
        self.assertEqual(receiver.process_amo_followup_job(path)["status"], "queued")
        api.assert_not_called()
    finally:
      receiver.FOLLOWUP_PROCESS_LOCK.release()


  def test_repeated_failures_back_off_to_one_hour_and_preserve_job(self):
    path = self.queue()
    with mock.patch.object(receiver, "api_request", side_effect=TimeoutError()):
      for delay in (60, 120, 240, 480, 960, 1920, 3600, 3600):
        receiver.process_amo_followup_job(path)
        job = json.loads(path.read_text(encoding="utf-8"))
        self.assertEqual(job["status"], "pending")
        self.assertEqual(job["next_attempt_at"], self.clock.return_value + delay)
        self.clock.return_value = job["next_attempt_at"]

  def test_corrupt_job_does_not_stop_other_jobs(self):
    path = self.queue()
    path.with_name("0-corrupt.json").write_text("{", encoding="utf-8")
    with mock.patch.object(receiver, "api_request", side_effect=self.api(status=142)):
      receiver.retry_amo_followup_tasks()
    self.assertEqual(json.loads(path.read_text(encoding="utf-8"))["result"]["status"], "skipped_closed")


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
