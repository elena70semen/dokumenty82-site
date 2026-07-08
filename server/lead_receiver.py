#!/usr/bin/env python3
import cgi
import html
import json
import mimetypes
import os
import re
import secrets
import shutil
import threading
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
AMO_CLIENT_ID = os.environ.get("AMO_CLIENT_ID", "").strip()
AMO_CLIENT_SECRET = os.environ.get("AMO_CLIENT_SECRET", "").strip()
AMO_REDIRECT_URI = os.environ.get("AMO_REDIRECT_URI", "https://dokumenty82.ru/api/amo/oauth/callback").strip()
AMO_TOKEN_PATH = Path(os.environ.get("AMO_TOKEN_PATH", str(BASE_DIR / "amo-oauth-token.json")))
AMO_EXTERNAL_STATE = os.environ.get("AMO_EXTERNAL_STATE", "").strip()
AMO_PIPELINE_ID = os.environ.get("AMO_PIPELINE_ID", "").strip()
AMO_STATUS_ID = os.environ.get("AMO_STATUS_ID", "").strip()
AMO_RESPONSIBLE_USER_ID = os.environ.get("AMO_RESPONSIBLE_USER_ID", "").strip()
AMO_TAGS = [tag.strip() for tag in os.environ.get("AMO_TAGS", "site,razbor-situacii").split(",") if tag.strip()]
AMO_ATTACH_FILES = os.environ.get("AMO_ATTACH_FILES", "0") == "1"
AMO_DRIVE_URL = os.environ.get("AMO_DRIVE_URL", "").strip().rstrip("/")
OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY", "").strip()
OPENAI_MODEL = os.environ.get("OPENAI_MODEL", "gpt-5.4-mini").strip()
AI_CHAT_ENABLED = os.environ.get("AI_CHAT_ENABLED", "1") == "1"
AI_MAX_MESSAGES = int(os.environ.get("AI_MAX_MESSAGES", "10"))
AI_MAX_MESSAGE_CHARS = int(os.environ.get("AI_MAX_MESSAGE_CHARS", "900"))
AI_MAX_OUTPUT_TOKENS = int(os.environ.get("AI_MAX_OUTPUT_TOKENS", "420"))
AI_RATE_LIMIT_WINDOW = int(os.environ.get("AI_RATE_LIMIT_WINDOW_SECONDS", "3600"))
AI_RATE_LIMIT_MAX = int(os.environ.get("AI_RATE_LIMIT_MAX", "24"))
TOKEN_LOCK = threading.Lock()
AI_RATE_LOCK = threading.Lock()
AI_RATE_STATE = {}

AI_SYSTEM_PROMPT = """
Ты AI-приемная сайта dokumenty82.ru: "Документы для бизнеса" в Симферополе.
Помогаешь посетителю сориентироваться по документам бизнеса: запросы банка и 115-ФЗ, требования ИФНС, отчетность, регистрация и изменения ООО/ИП, кадровые и бухгалтерские документы.

Правила:
- Отвечай по-русски, спокойно и кратко: 2-5 предложений.
- Не используй Markdown-разметку, звездочки, таблицы или блоки кода; пиши обычным текстом.
- Не обещай юридический или банковский результат, не давай гарантий снятия ограничений, регистрации или решения ИФНС.
- Не составляй окончательный юридический документ в чате и не проси присылать чувствительные персональные данные прямо в чат.
- Если не хватает вводных, задай один главный уточняющий вопрос: что пришло, от кого, какой срок, какой период или какой документ есть.
- Когда ситуация похожа на реальную задачу, предложи передать вопрос специалисту через форму в чате.
- Если вопрос не про услуги сайта, мягко верни к теме документов бизнеса.
""".strip()


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


def normalize_amo_base_url(subdomain):
  subdomain = (subdomain or "").strip()
  if not subdomain:
    return ""
  if subdomain.startswith("http://") or subdomain.startswith("https://"):
    return subdomain.rstrip("/")
  if "." in subdomain:
    return "https://" + subdomain.rstrip("/")
  return "https://" + subdomain + ".amocrm.ru"


def load_token_state():
  try:
    return json.loads(AMO_TOKEN_PATH.read_text(encoding="utf-8"))
  except FileNotFoundError:
    return {}
  except json.JSONDecodeError:
    return {}


def save_token_state(state):
  AMO_TOKEN_PATH.parent.mkdir(parents=True, exist_ok=True)
  try:
    os.chmod(AMO_TOKEN_PATH.parent, 0o700)
  except OSError:
    pass
  temp = AMO_TOKEN_PATH.with_suffix(AMO_TOKEN_PATH.suffix + ".tmp")
  temp.write_text(json.dumps(state, ensure_ascii=False, indent=2), encoding="utf-8")
  os.chmod(temp, 0o600)
  temp.replace(AMO_TOKEN_PATH)


def amo_base_url(state=None):
  state = state or load_token_state()
  return normalize_amo_base_url(
    AMO_SUBDOMAIN
    or state.get("base_url")
    or state.get("subdomain")
    or state.get("referer")
  )


def oauth_config(state=None):
  state = state or load_token_state()
  return {
    "base_url": amo_base_url(state),
    "client_id": AMO_CLIENT_ID or state.get("client_id", ""),
    "client_secret": AMO_CLIENT_SECRET or state.get("client_secret", ""),
    "redirect_uri": AMO_REDIRECT_URI or state.get("redirect_uri", ""),
  }


def save_oauth_tokens(state, token_payload, base_url=None):
  server_time = int(token_payload.get("server_time") or time.time())
  expires_in = int(token_payload.get("expires_in") or 86400)
  state.update({
    "token_type": token_payload.get("token_type", "Bearer"),
    "access_token": token_payload["access_token"],
    "refresh_token": token_payload["refresh_token"],
    "expires_at": server_time + expires_in,
    "server_time": server_time,
    "expires_in": expires_in,
    "updated_at": datetime.now(timezone.utc).isoformat(),
    "redirect_uri": AMO_REDIRECT_URI,
  })
  if base_url:
    state["base_url"] = base_url
  save_token_state(state)
  return state


def exchange_oauth_token(base_url, payload):
  return api_request(
    "POST",
    base_url.rstrip("/") + "/oauth2/access_token",
    payload=payload,
    headers={"Content-Type": "application/json"},
  )


def refresh_amo_token(state):
  config = oauth_config(state)
  if not config["base_url"] or not config["client_id"] or not config["client_secret"] or not state.get("refresh_token"):
    raise RuntimeError("AmoCRM OAuth не настроен: нужен client_id, client_secret, subdomain и refresh_token.")
  token_payload = exchange_oauth_token(config["base_url"], {
    "client_id": config["client_id"],
    "client_secret": config["client_secret"],
    "grant_type": "refresh_token",
    "refresh_token": state["refresh_token"],
    "redirect_uri": config["redirect_uri"],
  })
  return save_oauth_tokens(state, token_payload, config["base_url"])


def get_amo_access_token():
  if AMO_ACCESS_TOKEN:
    return AMO_ACCESS_TOKEN
  with TOKEN_LOCK:
    state = load_token_state()
    if state.get("disabled_at"):
      raise RuntimeError("AmoCRM интеграция отключена.")
    token = state.get("access_token", "")
    expires_at = int(state.get("expires_at") or 0)
    if token and expires_at > int(time.time()) + 300:
      return token
    state = refresh_amo_token(state)
    return state["access_token"]


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


def html_response(handler, status, title, body):
  page = (
    "<!doctype html><html lang=\"ru\"><head><meta charset=\"utf-8\">"
    "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">"
    f"<title>{html.escape(title)}</title>"
    "<style>body{font-family:system-ui,-apple-system,Segoe UI,Arial,sans-serif;"
    "background:#101b29;color:#f6f2e8;margin:0;padding:32px;line-height:1.5}"
    "main{max-width:720px;margin:auto;background:rgba(255,255,255,.06);"
    "border:1px solid rgba(255,255,255,.14);border-radius:8px;padding:24px}"
    "a{color:#bfe451}</style></head><body><main>"
    f"<h1>{html.escape(title)}</h1><p>{html.escape(body)}</p>"
    "</main></body></html>"
  ).encode("utf-8")
  handler.send_response(status)
  handler.send_header("Content-Type", "text/html; charset=utf-8")
  handler.send_header("Cache-Control", "no-store")
  handler.send_header("Content-Length", str(len(page)))
  handler.end_headers()
  handler.wfile.write(page)


def read_json_or_form(handler, max_bytes=65536):
  length = int(handler.headers.get("Content-Length", "0") or "0")
  if length <= 0 or length > max_bytes:
    return {}
  raw = handler.rfile.read(length)
  content_type = handler.headers.get("Content-Type", "")
  if "application/json" in content_type:
    return json.loads(raw.decode("utf-8") or "{}")
  parsed = urllib.parse.parse_qs(raw.decode("utf-8", "replace"), keep_blank_values=True)
  return {key: values[0] if values else "" for key, values in parsed.items()}


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


def check_ai_rate_limit(ip):
  now = int(time.time())
  cutoff = now - AI_RATE_LIMIT_WINDOW
  with AI_RATE_LOCK:
    hits = [stamp for stamp in AI_RATE_STATE.get(ip, []) if stamp >= cutoff]
    if len(hits) >= AI_RATE_LIMIT_MAX:
      AI_RATE_STATE[ip] = hits
      return False
    hits.append(now)
    AI_RATE_STATE[ip] = hits
    return True


def clean_chat_message(value):
  value = text(value)
  value = re.sub(r"\s+", " ", value).strip()
  return value[:AI_MAX_MESSAGE_CHARS]


def build_ai_input(payload):
  page = clean_chat_message(payload.get("page") or payload.get("source_page") or "")
  raw_messages = payload.get("messages", [])
  if not isinstance(raw_messages, list):
    raw_messages = []

  normalized = []
  for item in raw_messages[-AI_MAX_MESSAGES:]:
    if not isinstance(item, dict):
      continue
    role = text(item.get("role")).lower()
    if role not in ("user", "assistant"):
      continue
    content = clean_chat_message(item.get("content"))
    if content:
      normalized.append({"role": role, "content": content})

  if not normalized or normalized[-1]["role"] != "user":
    raise ValueError("Напишите вопрос.")

  lines = []
  if page:
    lines.append("Страница сайта: " + page)
  lines.append("История диалога:")
  for item in normalized:
    speaker = "Посетитель" if item["role"] == "user" else "AI-приемная"
    lines.append(f"{speaker}: {item['content']}")
  return "\n".join(lines)


def extract_openai_text(result):
  if isinstance(result, dict) and isinstance(result.get("output_text"), str):
    return result["output_text"].strip()

  parts = []
  for item in (result or {}).get("output", []):
    if not isinstance(item, dict):
      continue
    for block in item.get("content", []):
      if not isinstance(block, dict):
        continue
      value = block.get("text") or block.get("content")
      if isinstance(value, str) and value.strip():
        parts.append(value.strip())
  return "\n".join(parts).strip()


def create_ai_response(payload):
  if not AI_CHAT_ENABLED:
    raise RuntimeError("AI chat is disabled")
  if not OPENAI_API_KEY:
    raise RuntimeError("OPENAI_API_KEY is not configured")

  user_input = build_ai_input(payload)
  response = api_request(
    "POST",
    "https://api.openai.com/v1/responses",
    payload={
      "model": OPENAI_MODEL,
      "instructions": AI_SYSTEM_PROMPT,
      "input": user_input,
      "reasoning": {"effort": "low"},
      "text": {"verbosity": "low"},
      "max_output_tokens": AI_MAX_OUTPUT_TOKENS,
      "store": False,
    },
    headers={
      "Authorization": "Bearer " + OPENAI_API_KEY,
      "Content-Type": "application/json",
    },
    timeout=35,
  )
  answer = extract_openai_text(response)
  if not answer:
    raise RuntimeError("OpenAI returned an empty response")
  return answer


def amo_headers():
  return {"Authorization": "Bearer " + get_amo_access_token()}


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
  if ACCEPT_LOCAL_ONLY:
    state = load_token_state()
    has_oauth = bool(
      (AMO_ACCESS_TOKEN or state.get("access_token") or state.get("refresh_token"))
      and (AMO_CLIENT_ID or state.get("client_id"))
      and (AMO_CLIENT_SECRET or state.get("client_secret"))
    )
    if not base_url or not has_oauth:
      return {"status": "stored_only", "lead_id": None, "message": "AmoCRM is not configured"}

  if not base_url:
    if ACCEPT_LOCAL_ONLY:
      return {"status": "stored_only", "lead_id": None, "message": "AmoCRM is not configured"}
    raise RuntimeError("AmoCRM не настроена: нужен AMO_SUBDOMAIN или OAuth-подключение.")

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
    path = urllib.parse.urlparse(self.path).path
    if path == "/health":
      json_response(self, 200, {"ok": True})
      return
    if path == "/api/amo/oauth/status":
      self.handle_oauth_status()
      return
    if path == "/api/amo/oauth/callback":
      self.handle_oauth_callback()
      return
    json_response(self, 404, {"ok": False, "message": "Not found"})

  def do_POST(self):
    path = urllib.parse.urlparse(self.path).path
    if path == "/api/amo/external/credentials":
      self.handle_external_credentials()
      return
    if path == "/api/amo/oauth/disconnect":
      self.handle_oauth_disconnect()
      return
    if path == "/api/ai-chat":
      self.handle_ai_chat()
      return
    if path != "/api/lead":
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

  def handle_ai_chat(self):
    try:
      if not check_ai_rate_limit(self.client_address[0]):
        json_response(self, 429, {
          "ok": False,
          "message": "Чат временно ограничил частоту вопросов. Оставьте телефон, и специалист вернется к ситуации.",
        })
        return

      payload = read_json_or_form(self)
      answer = create_ai_response(payload)
      json_response(self, 200, {
        "ok": True,
        "answer": answer,
        "suggest_lead": True,
      })
    except ValueError as error:
      json_response(self, 400, {"ok": False, "message": str(error)})
    except Exception as error:
      traceback.print_exc()
      if "OPENAI_API_KEY" in str(error):
        message = "AI-чат подключается. Пока напишите вопрос и телефон, специалист посмотрит ситуацию."
      else:
        message = "AI-чат временно не ответил. Оставьте телефон, и специалист вернется к ситуации."
      json_response(self, 503, {"ok": False, "message": message})

  def handle_oauth_status(self):
    state = load_token_state()
    config = oauth_config(state)
    connected = bool(state.get("access_token") or state.get("refresh_token"))
    json_response(self, 200, {
      "ok": True,
      "connected": connected,
      "base_url": config["base_url"],
      "has_client": bool(config["client_id"] and config["client_secret"]),
      "expires_at": state.get("expires_at"),
      "disabled_at": state.get("disabled_at"),
    })

  def handle_oauth_callback(self):
    query = urllib.parse.parse_qs(urllib.parse.urlparse(self.path).query)
    code = text(query.get("code"))
    referer = text(query.get("referer")) or text(query.get("account"))
    state_param = text(query.get("state"))
    if AMO_EXTERNAL_STATE and state_param and state_param != AMO_EXTERNAL_STATE:
      html_response(self, 403, "amoCRM не подключена", "Параметр state не совпал. Подключение остановлено.")
      return
    if not code:
      html_response(self, 400, "amoCRM не подключена", "amoCRM не передала authorization code.")
      return

    with TOKEN_LOCK:
      state = load_token_state()
      if referer:
        state["referer"] = referer
        state["base_url"] = normalize_amo_base_url(referer)
      config = oauth_config(state)
      if not config["base_url"] or not config["client_id"] or not config["client_secret"]:
        save_token_state(state)
        html_response(
          self,
          503,
          "amoCRM почти готова",
          "Код авторизации пришел, но на сервере еще нет client_id/client_secret. Сохраните ключи интеграции в /etc/dokumenty82-form.env и повторите подключение.",
        )
        return
      try:
        token_payload = exchange_oauth_token(config["base_url"], {
          "client_id": config["client_id"],
          "client_secret": config["client_secret"],
          "grant_type": "authorization_code",
          "code": code,
          "redirect_uri": config["redirect_uri"],
        })
      except Exception as error:
        html_response(
          self,
          400,
          "amoCRM не подключена",
          "amoCRM не приняла код авторизации. Откройте OAuth-ссылку установки заново и подтвердите доступ, старый код из карточки интеграции не подойдет.",
        )
        print("amoCRM OAuth callback failed: %s" % error, flush=True)
        return
      state.update({
        "client_id": config["client_id"],
        "client_secret": config["client_secret"],
        "redirect_uri": config["redirect_uri"],
        "disabled_at": None,
      })
      save_oauth_tokens(state, token_payload, config["base_url"])

    html_response(self, 200, "amoCRM подключена", "Готово. Токены сохранены на сервере, форму можно отправлять в amoCRM.")

  def handle_external_credentials(self):
    try:
      payload = read_json_or_form(self)
      if not AMO_EXTERNAL_STATE:
        json_response(self, 503, {"ok": False, "message": "AMO_EXTERNAL_STATE is not configured"})
        return
      if text(payload.get("state")) != AMO_EXTERNAL_STATE:
        json_response(self, 403, {"ok": False, "message": "Bad state"})
        return
      client_id = text(payload.get("client_id"))
      client_secret = text(payload.get("client_secret"))
      if not client_id or not client_secret:
        json_response(self, 400, {"ok": False, "message": "client_id and client_secret are required"})
        return
      with TOKEN_LOCK:
        state = load_token_state()
        state.update({
          "client_id": client_id,
          "client_secret": client_secret,
          "external_state": AMO_EXTERNAL_STATE,
          "redirect_uri": AMO_REDIRECT_URI,
          "credentials_updated_at": datetime.now(timezone.utc).isoformat(),
        })
        save_token_state(state)
      json_response(self, 200, {"ok": True})
    except Exception:
      traceback.print_exc()
      json_response(self, 500, {"ok": False, "message": "Cannot save amoCRM credentials"})

  def handle_oauth_disconnect(self):
    try:
      payload = read_json_or_form(self)
      with TOKEN_LOCK:
        state = load_token_state()
        state["disabled_at"] = datetime.now(timezone.utc).isoformat()
        if payload:
          state["disconnect_payload"] = payload
        save_token_state(state)
      json_response(self, 200, {"ok": True})
    except Exception:
      traceback.print_exc()
      json_response(self, 500, {"ok": False, "message": "Cannot mark amoCRM as disconnected"})

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
