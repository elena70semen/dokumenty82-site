import importlib.util
import os
import tempfile
import unittest
from pathlib import Path
from unittest import mock


os.environ.setdefault("D82_PORTAL_DEV_MODE", "1")
os.environ.setdefault("D82_PORTAL_SECURE_COOKIE", "0")
os.environ.setdefault("D82_PORTAL_HASH_KEY", "test-portal-hash-key-with-enough-entropy")

MODULE_PATH = Path(__file__).with_name("client_portal.py")
SPEC = importlib.util.spec_from_file_location("client_portal", MODULE_PATH)
portal = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(portal)


class PortalStoreTests(unittest.TestCase):
  def setUp(self):
    self.temp_dir = tempfile.TemporaryDirectory()
    self.db_path = Path(self.temp_dir.name) / "portal.db"
    portal.init_db(self.db_path)
    self.demo = portal.seed_demo(self.db_path)

  def tearDown(self):
    self.temp_dir.cleanup()

  def test_dashboard_only_returns_client_organizations(self):
    with portal.database(self.db_path) as connection:
      dashboard = portal.dashboard_for_user(connection, self.demo["user_id"])

    self.assertEqual(dashboard["user"]["email"], "demo@dokumenty82.ru")
    self.assertEqual(len(dashboard["organizations"]), 2)
    self.assertGreaterEqual(len(dashboard["organizations"][0]["cases"]), 1)
    document = dashboard["organizations"][0]["cases"][0]["documents"][0]
    self.assertNotIn("stored_path", document)

  def test_passwordless_login_uses_one_time_code_and_server_session(self):
    with portal.database(self.db_path) as connection:
      request = portal.create_login_code(connection, "demo@dokumenty82.ru", "127.0.0.1")
      self.assertTrue(request["deliver"])

      failed = portal.verify_login_code(
        connection, "demo@dokumenty82.ru", "000000", "127.0.0.1", "test-agent"
      )
      self.assertIsNone(failed)

      session = portal.verify_login_code(
        connection, "demo@dokumenty82.ru", request["code"], "127.0.0.1", "test-agent"
      )
      self.assertIsNotNone(session)
      self.assertGreaterEqual(len(session["token"]), 32)
      self.assertGreaterEqual(len(session["csrf_token"]), 24)
      self.assertIsNotNone(portal.find_session(connection, session["token"]))

      reused = portal.verify_login_code(
        connection, "demo@dokumenty82.ru", request["code"], "127.0.0.1", "test-agent"
      )
      self.assertIsNone(reused)

      second_request = portal.create_login_code(connection, "demo@dokumenty82.ru", "127.0.0.2")
      second_session = portal.verify_login_code(
        connection, "demo@dokumenty82.ru", second_request["code"], "127.0.0.2", "mobile-agent"
      )
      self.assertIsNotNone(second_session)
      self.assertIsNotNone(portal.find_session(connection, session["token"]))
      self.assertIsNotNone(portal.find_session(connection, second_session["token"]))

  def test_unknown_email_does_not_create_a_session(self):
    with portal.database(self.db_path) as connection:
      request = portal.create_login_code(connection, "missing@example.ru", "127.0.0.1")
      self.assertFalse(request["deliver"])
      result = portal.verify_login_code(
        connection, "missing@example.ru", request["code"], "127.0.0.1", "test-agent"
      )
      self.assertIsNone(result)

  def test_case_access_is_isolated_by_membership(self):
    with portal.database(self.db_path) as connection:
      other_user = connection.execute(
        "INSERT INTO users(email, full_name, phone, active, created_at) VALUES (?, ?, '', 1, ?)",
        ("other@example.ru", "Другой клиент", portal.iso_now()),
      ).lastrowid
      other_organization = connection.execute(
        "INSERT INTO organizations(kind, display_name, inn, ogrn, manager_name, manager_phone, manager_email, created_at) "
        "VALUES ('ООО', 'ООО «Чужая организация»', '9102000000', '', '', '', '', ?)",
        (portal.iso_now(),),
      ).lastrowid
      connection.execute(
        "INSERT INTO memberships(user_id, organization_id, role) VALUES (?, ?, 'owner')",
        (other_user, other_organization),
      )
      other_case = connection.execute(
        "INSERT INTO cases(organization_id, title, category, status, stage, progress, next_action, deadline, updated_at) "
        "VALUES (?, 'Закрытая задача', 'Тест', 'В работе', 'Закрытый этап', 10, '', NULL, ?)",
        (other_organization, portal.iso_now()),
      ).lastrowid
      connection.commit()

      self.assertFalse(portal.user_can_access_case(connection, self.demo["user_id"], other_case))
      with self.assertRaises(PermissionError):
        portal.create_client_message(connection, self.demo["user_id"], other_case, "Сообщение")
      dashboard = portal.dashboard_for_user(connection, self.demo["user_id"])
      names = [organization["display_name"] for organization in dashboard["organizations"]]
      self.assertNotIn("ООО «Чужая организация»", names)

  def test_filename_is_reduced_to_a_safe_basename(self):
    self.assertEqual(portal.safe_filename("../../passport<copy>.pdf"), "passport_copy_.pdf")

  def test_multipart_file_parses_named_upload(self):
    boundary = "portal-test-boundary"
    body = (
      f"--{boundary}\r\n"
      'Content-Disposition: form-data; name="file"; filename="акт.pdf"\r\n'
      "Content-Type: application/pdf\r\n\r\n"
    ).encode("utf-8") + b"%PDF-test\r\n" + f"--{boundary}--\r\n".encode("ascii")
    filename, payload = portal.multipart_file(f"multipart/form-data; boundary={boundary}", body)
    self.assertEqual(filename, "акт.pdf")
    self.assertEqual(payload, b"%PDF-test")

  def test_amo_snapshot_upserts_case_without_duplication(self):
    snapshot = {
      "found": True,
      "contact": {"id": 501, "name": "Клиент amoCRM"},
      "companies": [{"id": 601, "name": "ООО Вектор"}],
      "leads": [{
        "id": 701,
        "name": "Бухгалтерское сопровождение",
        "pipeline_id": 801,
        "pipeline_name": "Отдел продаж",
        "status_id": 901,
        "status_name": "В работе",
        "responsible_name": "Елена",
        "progress": 45,
        "closest_task_at": 1800000000,
        "updated_at": 1750000000,
      }],
    }
    with portal.database(self.db_path) as connection:
      first = portal.apply_amo_snapshot(connection, self.demo["user_id"], snapshot)
      snapshot["leads"][0]["status_name"] = "Документы получены"
      snapshot["leads"][0]["progress"] = 70
      second = portal.apply_amo_snapshot(connection, self.demo["user_id"], snapshot)
      rows = connection.execute("SELECT * FROM cases WHERE amo_lead_id = 701").fetchall()

    self.assertEqual(first["synced"], 1)
    self.assertEqual(second["synced"], 1)
    self.assertEqual(len(rows), 1)
    self.assertEqual(rows[0]["status"], "Документы получены")
    self.assertEqual(rows[0]["progress"], 70)
    self.assertEqual(rows[0]["source"], "amocrm")

  def test_dashboard_keeps_local_data_when_bridge_is_unavailable(self):
    with portal.database(self.db_path) as connection, \
         mock.patch.object(portal, "AMO_BRIDGE_TOKEN", ""):
      sync = portal.sync_amo_for_user(connection, self.demo["user_id"])
      dashboard = portal.dashboard_for_user(connection, self.demo["user_id"])

    self.assertEqual(sync["status"], "disabled")
    self.assertEqual(len(dashboard["organizations"]), 2)


class PortalEmailTests(unittest.TestCase):
  def test_login_email_retries_transient_network_errors(self):
    with mock.patch.object(
      portal, "send_login_code", side_effect=[OSError("dns unavailable"), OSError("timeout"), None]
    ) as send, mock.patch.object(portal.time, "sleep") as sleep:
      delivered = portal.send_login_code_safely("client@example.ru", "123456")

    self.assertTrue(delivered)
    self.assertEqual(send.call_count, 3)
    self.assertEqual([call.args[0] for call in sleep.call_args_list], [2, 5])

  def test_login_email_does_not_retry_authentication_errors(self):
    error = portal.smtplib.SMTPAuthenticationError(535, b"authentication failed")
    with mock.patch.object(portal, "send_login_code", side_effect=error) as send, \
         mock.patch.object(portal.time, "sleep") as sleep, \
         mock.patch.object(portal.traceback, "print_exc"):
      delivered = portal.send_login_code_safely("client@example.ru", "123456")

    self.assertFalse(delivered)
    send.assert_called_once()
    sleep.assert_not_called()


if __name__ == "__main__":
  unittest.main()
