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


if __name__ == "__main__":
  unittest.main()
