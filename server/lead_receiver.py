#!/usr/bin/env python3
import cgi
import json
import mimetypes
import os
import re
import secrets
import shutil
import time
import traceback
import urllib.error
import urllib.parse
import urllib.request
from datetime import datetime, timezone
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


HOST = os.environ.get("D82_FORM_HOST", "127.0.0.1")
PORT = int(os.environ.get("D82_FORM_PORT", "8097"))
BASE_DIR = Path(os.environ.get("D82_LEADS_DIR", "/var/lib/dokumenty82-leads"))
MAX_REQUEST_BYTES = int(os.environ.get("D82_MAX_REQUEST_MB", "25")) * 1024 * 1024
MAX_TOTAL_BYTES = int(os.environ.get("D82_MAX_UPLOAD_MB", "20")) * 1024 * 1024
MAX_FILES = int(os.environ.get("D82_MAX_FILES", "6"))
ACCEPT_LOCAL_ONLY = os.environ.get("D82_ACCEPT_LOCAL_ONLY", "0") == "1"

AMO_SUBDOMAIN = os.environ.get("AMO_SUBDOMAIN", "").strip()
AMO_ACCESS_TOKEN = os.environ.get("AMO_ACCESS_TOKEN", "").strip()
AMO_PIPELINE_ID = os.environ.get("AMO_PIPELINE_ID", "").strip()
AMO_STATUS_ID = os.environ.get("AMO_STATUS_ID", "").strip()
AMO_RESPONSIBLE_USER_ID = os.environ.get("AMO_RESPONSIBLE_USER_ID", "").strip()
AMO_TAGS = [tag.strip() for tag in os.environ.get("AMO_TAGS", "site,razbor-situacii").split(",") if tag.strip()]
AMO_ATTACH_FILES = os.environ.get("AMO_ATTACH_FILES", "0") == "1"
AMO_DRIVE_URL = os.environ.get("AMO_DRIVE_URL", "").strip().rstrip("/")


def text(value):
  if value is None:
    return ""
  if isinstance(value, list):
    value = value[0] if value else ""
  if hasattr(value, "value"):
    value = value.value
  return str(value or "").strip()


def int_or_none(value):
  try:
    return int(value)
  except (TypeError, ValueError):
    return None


def amo_base_url():
  subdomain = AMO_SUBDOMAIN
  if not subdomain:
    return ""
  if subdomain.startswith("http://") or subdomain.startswith("https://"):
    return subdomain.rstrip("/")
  if "." in subdomain:
    return "https://" + subdomain.rstrip("/")
  return "https://" + subdomain + ".amocrm.ru"


def safe_filename(name):
  name = Path(name or "file").name
  name = re.sub(r"[\x00-\x1f<>:\"/\\|?*]+", "_", name).strip(" .")
  return name[:140] or "file"


def json_response(handler, status, payload):
  data = json.dumps(payload, ensure_ascii=False).encode("utf-8")
  handler.send_response(status)
  handler.send_header("Content-Type", "application/json; charset=utf-8")
  handler.send_header("Cache-Control", "no-store")
  handler.send_header("Content-Length", str(len(data)))
  handler.end_headers()
  handler.wfile.write(data)


def api_request(method, url, payload=None, headers=None, raw=None, timeout=20):
  body = raw
  request_headers = dict(headers or {})
  if payload is not None:
    body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
    request_headers.setdefault("Content-Type", "application/json")
  request_headers.setdefault("Accept", "application/json")
  req = urllib.request.Request(url, data=body, headers=request_headers, method=method)
  try:
    with urllib.request.urlopen(req, timeout=timeout) as response:
      response_body = response.read()
      if not response_body:
        return None
      return json.loads(response_body.decode("utf-8"))
  except urllib.error.HTTPError as error:
    detail = error.read().decode("utf-8", "replace")
    raise RuntimeError(f"{method} {url} failed: HTTP {error.code} {detail[:500]}") from error


def amo_headers():
  return {"Authorization": "Bearer " + AMO_ACCESS_TOKEN}


def get_drive_url(base_url):
  if AMO_DRIVE_URL:
    return AMO_DRIVE_URL
  account = api_request(
    "GET",
    base_url + "/api/v4/account?with=drive_url",
    headers=amo_headers(),
  )
  return (account or {}).get("drive_url", "").rstrip("/")


def create_amo_lead(fields, files):
  base_url = amo_base_url()
  if not base_url or not AMO_ACCESS_TOKEN:
    if ACCEPT_LOCAL_ONLY:
      return {"status": "stored_only", "lead_id": None, "message": "AmoCRM is not configured"}
    raise RuntimeError("AmoCRM не настроена: нужен AMO_SUBDOMAIN и AMO_ACCESS_TOKEN.")

  contact_fields = []
  if fields["phone"]:
    contact_fields.append({
      "field_code": "PHONE",
      "values": [{"value": fields["phone"], "enum_code": "WORK"}],
    })
  if fields["email"]:
    contact_fields.append({
      "field_code": "EMAIL",
      "values": [{"value": fields["email"], "enum_code": "WORK"}],
    })

  lead = {
    "name": "Заявка с сайта: " + fields["task_type"],
    "_embedded": {
      "contacts": [{
        "name": fields["name"] or "Посетитель сайта",
        "custom_fields_values": contact_fields or None,
      }],
      "tags": [{"name": tag} for tag in AMO_TAGS],
    },
  }

  for key, env_value in (
    ("pipeline_id", AMO_PIPELINE_ID),
    ("status_id", AMO_STATUS_ID),
    ("responsible_user_id", AMO_RESPONSIBLE_USER_ID),
  ):
    parsed = int_or_none(env_value)
    if parsed is not None:
      lead[key] = parsed

  result = api_request(
    "POST",
    base_url + "/api/v4/leads/complex",
    payload=[lead],
    headers=amo_headers(),
  )
  lead_id = result[0].get("id") if isinstance(result, list) and result else None
  if not lead_id:
    raise RuntimeError("AmoCRM не вернула ID сделки.")

  file_lines = []
  for item in files:
    file_lines.append(f"- {item['original_name']} ({item['size']} bytes), сохранен на сервере: {item['stored_path']}")

  note_text = "\n".join([
    "Заявка с сайта dokumenty82.ru",
    f"Страница: {fields['source_page']}",
    f"Тема: {fields['task_type']}",
    f"Имя: {fields['name']}",
    f"Телефон: {fields['phone']}",
    f"Email: {fields['email'] or '-'}",
    "",
    "Описание:",
    fields["message"],
    "",
    "Файлы:",
    "\n".join(file_lines) if file_lines else "- не приложены",
  ])
  api_request(
    "POST",
    base_url + f"/api/v4/leads/{lead_id}/notes",
    payload=[{"note_type": "common", "params": {"text": note_text}}],
    headers=amo_headers(),
  )

  attached = []
  if AMO_ATTACH_FILES and files:
    try:
      drive_url = get_drive_url(base_url)
      attached = attach_files_to_lead(base_url, drive_url, lead_id, files)
    except Exception as error:
      api_request(
        "POST",
        base_url + f"/api/v4/leads/{lead_id}/notes",
        payload=[{
          "note_type": "common",
          "params": {"text": "Файлы сохранены на сервере, но не прикреплены через Files API: " + str(error)},
        }],
        headers=amo_headers(),
      )

  return {"status": "sent", "lead_id": lead_id, "attached_files": attached}


def attach_files_to_lead(base_url, drive_url, lead_id, files):
  if not drive_url:
    raise RuntimeError("drive_url not found")
  attached = []
  for item in files:
    path = Path(item["stored_path"])
    mime = item.get("content_type") or mimetypes.guess_type(item["original_name"])[0] or "application/octet-stream"
    session = api_request(
      "POST",
      drive_url + "/v1.0/sessions",
      payload={"file_name": item["original_name"], "file_size": item["size"], "content_type": mime},
      headers=amo_headers(),
    )
    upload_url = session.get("upload_url")
    max_part_size = int(session.get("max_part_size") or 524288)
    if not upload_url:
      raise RuntimeError("upload_url not returned")

    upload_result = None
    with path.open("rb") as source:
      while True:
        chunk = source.read(max_part_size)
        if not chunk:
          break
        upload_result = api_request(
          "POST",
          upload_url,
          raw=chunk,
          headers={**amo_headers(), "Content-Type": "application/octet-stream"},
          timeout=40,
        )
        upload_url = (upload_result or {}).get("next_url") or upload_url

    file_uuid = (upload_result or {}).get("uuid")
    if not file_uuid:
      raise RuntimeError("file uuid not returned")

    api_request(
      "PUT",
      base_url + f"/api/v4/leads/{lead_id}/files",
      payload=[{"file_uuid": file_uuid}],
      headers=amo_headers(),
    )
    attached.append({"file_uuid": file_uuid, "name": item["original_name"]})
  return attached


class LeadHandler(BaseHTTPRequestHandler):
  server_version = "D82LeadReceiver/1.0"

  def log_message(self, fmt, *args):
    print("%s %s" % (self.log_date_time_string(), fmt % args), flush=True)

  def do_GET(self):
    if self.path == "/health":
      json_response(self, 200, {"ok": True})
      return
    json_response(self, 404, {"ok": False, "message": "Not found"})

  def do_POST(self):
    if urllib.parse.urlparse(self.path).path != "/api/lead":
      json_response(self, 404, {"ok": False, "message": "Not found"})
      return

    try:
      length = int(self.headers.get("Content-Length", "0"))
      if length <= 0 or length > MAX_REQUEST_BYTES:
        json_response(self, 413, {"ok": False, "message": "Слишком большой запрос."})
        return

      form = cgi.FieldStorage(
        fp=self.rfile,
        headers=self.headers,
        environ={
          "REQUEST_METHOD": "POST",
          "CONTENT_TYPE": self.headers.get("Content-Type", ""),
          "CONTENT_LENGTH": str(length),
        },
        keep_blank_values=True,
      )

      if text(form.getfirst("company_website")):
        json_response(self, 200, {"ok": True})
        return

      fields = {
        "name": text(form.getfirst("name")),
        "phone": text(form.getfirst("phone")),
        "email": text(form.getfirst("email")),
        "task_type": text(form.getfirst("task_type")) or "Разбор ситуации",
        "message": text(form.getfirst("message")),
        "source_page": text(form.getfirst("source_page")) or "/razbor-situacii/",
      }
      if not fields["name"] or not fields["phone"] or not fields["message"] or text(form.getfirst("privacy")) != "1":
        json_response(self, 400, {"ok": False, "message": "Заполните обязательные поля."})
        return

      submission_id = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%SZ") + "-" + secrets.token_hex(4)
      submission_dir = BASE_DIR / "submissions" / submission_id
      upload_dir = submission_dir / "files"
      upload_dir.mkdir(parents=True, exist_ok=False)
      os.chmod(submission_dir, 0o700)
      os.chmod(upload_dir, 0o700)

      files = self.save_files(form, upload_dir)
      metadata = {
        "id": submission_id,
        "created_at": datetime.now(timezone.utc).isoformat(),
        "remote_addr": self.client_address[0],
        "fields": fields,
        "files": files,
      }
      (submission_dir / "lead.json").write_text(json.dumps(metadata, ensure_ascii=False, indent=2), encoding="utf-8")
      os.chmod(submission_dir / "lead.json", 0o600)

      crm = create_amo_lead(fields, files)
      (submission_dir / "crm.json").write_text(json.dumps(crm, ensure_ascii=False, indent=2), encoding="utf-8")
      os.chmod(submission_dir / "crm.json", 0o600)

      status = 200 if crm["status"] == "sent" else 202
      json_response(self, status, {"ok": True, "id": submission_id, "crm_status": crm["status"]})
    except ValueError as error:
      json_response(self, 400, {"ok": False, "message": str(error)})
    except Exception as error:
      traceback.print_exc()
      message = str(error)
      if "AmoCRM не настроена" in message:
        json_response(self, 503, {"ok": False, "message": "Форма подключается к CRM. Пока напишите в Telegram или позвоните."})
      else:
        json_response(self, 500, {"ok": False, "message": "Не удалось принять заявку. Позвоните или напишите в мессенджер."})

  def save_files(self, form, upload_dir):
    file_fields = form["files"] if "files" in form else []
    if not isinstance(file_fields, list):
      file_fields = [file_fields]

    saved = []
    total_size = 0
    for index, item in enumerate(file_fields, start=1):
      if not getattr(item, "filename", ""):
        continue
      if len(saved) >= MAX_FILES:
        raise ValueError("Можно приложить не больше 6 файлов.")
      original = safe_filename(item.filename)
      target = upload_dir / f"{index:02d}-{original}"
      with target.open("wb") as output:
        shutil.copyfileobj(item.file, output)
      size = target.stat().st_size
      total_size += size
      if total_size > MAX_TOTAL_BYTES:
        raise ValueError("Суммарный размер файлов больше 20 МБ.")
      os.chmod(target, 0o600)
      saved.append({
        "original_name": original,
        "stored_path": str(target),
        "size": size,
        "content_type": item.type or mimetypes.guess_type(original)[0] or "application/octet-stream",
      })
    return saved


def main():
  BASE_DIR.mkdir(parents=True, exist_ok=True)
  os.chmod(BASE_DIR, 0o700)
  server = ThreadingHTTPServer((HOST, PORT), LeadHandler)
  print(f"Listening on {HOST}:{PORT}", flush=True)
  server.serve_forever()


if __name__ == "__main__":
  main()
