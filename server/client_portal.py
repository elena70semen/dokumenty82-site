#!/usr/bin/env python3
import argparse
import hashlib
import hmac
import json
import mimetypes
import os
import re
import secrets
import smtplib
import sqlite3
import ssl
import threading
import time
import traceback
import urllib.parse
import urllib.error
import urllib.request
from contextlib import contextmanager
from datetime import date, datetime, timedelta, timezone
from email.message import EmailMessage
from email.parser import BytesParser
from email.policy import default as email_policy
from http.cookies import SimpleCookie
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


HOST = os.environ.get("D82_PORTAL_HOST", "127.0.0.1")
PORT = int(os.environ.get("D82_PORTAL_PORT", "8098"))
DATA_DIR = Path(os.environ.get("D82_PORTAL_DATA_DIR", "/var/lib/dokumenty82-portal"))
DB_PATH = Path(os.environ.get("D82_PORTAL_DB_PATH", str(DATA_DIR / "portal.db")))
FILES_DIR = Path(os.environ.get("D82_PORTAL_FILES_DIR", str(DATA_DIR / "files")))
STATIC_DIR = Path(os.environ.get("D82_PORTAL_STATIC_DIR", "")).resolve() if os.environ.get("D82_PORTAL_STATIC_DIR") else None
PUBLIC_ORIGIN = os.environ.get("D82_PORTAL_PUBLIC_ORIGIN", "https://dokumenty82.ru").rstrip("/")
DEV_MODE = os.environ.get("D82_PORTAL_DEV_MODE", "0") == "1"
SECURE_COOKIE = os.environ.get("D82_PORTAL_SECURE_COOKIE", "1") == "1"
TRUST_PROXY = os.environ.get("D82_PORTAL_TRUST_PROXY", "1") == "1"
HASH_KEY = os.environ.get("D82_PORTAL_HASH_KEY", "dev-only-portal-hash-key")
SESSION_TTL_SECONDS = int(os.environ.get("D82_PORTAL_SESSION_TTL_SECONDS", "28800"))
OTP_TTL_SECONDS = int(os.environ.get("D82_PORTAL_OTP_TTL_SECONDS", "600"))
OTP_MAX_ATTEMPTS = int(os.environ.get("D82_PORTAL_OTP_MAX_ATTEMPTS", "5"))
OTP_RATE_WINDOW_SECONDS = int(os.environ.get("D82_PORTAL_OTP_RATE_WINDOW_SECONDS", "3600"))
OTP_RATE_MAX = int(os.environ.get("D82_PORTAL_OTP_RATE_MAX", "5"))
MAX_UPLOAD_BYTES = int(os.environ.get("D82_PORTAL_MAX_UPLOAD_MB", "10")) * 1024 * 1024
AMO_BRIDGE_URL = os.environ.get(
  "D82_PORTAL_AMO_BRIDGE_URL",
  "http://127.0.0.1:8097/api/internal/amo/client",
).strip()
AMO_BRIDGE_TOKEN = os.environ.get("D82_PORTAL_AMO_BRIDGE_TOKEN", "").strip()
AMO_SYNC_TTL_SECONDS = int(os.environ.get("D82_PORTAL_AMO_SYNC_TTL_SECONDS", "300"))

SMTP_HOST = os.environ.get("D82_PORTAL_SMTP_HOST", "").strip()
SMTP_PORT = int(os.environ.get("D82_PORTAL_SMTP_PORT", "465"))
SMTP_USERNAME = os.environ.get("D82_PORTAL_SMTP_USERNAME", "").strip()
SMTP_PASSWORD = os.environ.get("D82_PORTAL_SMTP_PASSWORD", "")
SMTP_FROM = os.environ.get("D82_PORTAL_SMTP_FROM", SMTP_USERNAME).strip()
SMTP_USE_SSL = os.environ.get("D82_PORTAL_SMTP_USE_SSL", "1") == "1"
SMTP_STARTTLS = os.environ.get("D82_PORTAL_SMTP_STARTTLS", "0") == "1"

COOKIE_NAME = "__Host-d82_portal" if SECURE_COOKIE else "d82_portal_dev"
ALLOWED_UPLOAD_EXTENSIONS = {
  ".pdf", ".png", ".jpg", ".jpeg", ".webp", ".doc", ".docx", ".xls", ".xlsx", ".zip",
}
EMAIL_RE = re.compile(r"^[^\s@]+@[^\s@]+\.[^\s@]+$")
STATIC_MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".png": "image/png",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
}


SCHEMA = """
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY,
  email TEXT NOT NULL UNIQUE COLLATE NOCASE,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL DEFAULT '',
  active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL,
  amo_contact_id INTEGER,
  amo_synced_at TEXT
);

CREATE TABLE IF NOT EXISTS organizations (
  id INTEGER PRIMARY KEY,
  kind TEXT NOT NULL CHECK(kind IN ('ИП', 'ООО')),
  display_name TEXT NOT NULL,
  inn TEXT NOT NULL DEFAULT '',
  ogrn TEXT NOT NULL DEFAULT '',
  manager_name TEXT NOT NULL DEFAULT '',
  manager_phone TEXT NOT NULL DEFAULT '',
  manager_email TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL,
  amo_company_id INTEGER,
  amo_synced_at TEXT
);

CREATE TABLE IF NOT EXISTS memberships (
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  organization_id INTEGER NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'owner',
  PRIMARY KEY(user_id, organization_id)
);

CREATE TABLE IF NOT EXISTS cases (
  id INTEGER PRIMARY KEY,
  organization_id INTEGER NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  status TEXT NOT NULL,
  stage TEXT NOT NULL,
  progress INTEGER NOT NULL DEFAULT 0 CHECK(progress BETWEEN 0 AND 100),
  next_action TEXT NOT NULL DEFAULT '',
  deadline TEXT,
  updated_at TEXT NOT NULL,
  source TEXT NOT NULL DEFAULT 'portal',
  amo_lead_id INTEGER,
  amo_pipeline_id INTEGER,
  amo_status_id INTEGER,
  amo_synced_at TEXT
);

CREATE TABLE IF NOT EXISTS tasks (
  id INTEGER PRIMARY KEY,
  case_id INTEGER NOT NULL REFERENCES cases(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  status TEXT NOT NULL CHECK(status IN ('done', 'current', 'waiting')),
  due_date TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS documents (
  id INTEGER PRIMARY KEY,
  case_id INTEGER NOT NULL REFERENCES cases(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  status TEXT NOT NULL,
  kind TEXT NOT NULL,
  filename TEXT,
  stored_path TEXT,
  size INTEGER NOT NULL DEFAULT 0,
  source TEXT NOT NULL DEFAULT 'manager',
  uploaded_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY,
  case_id INTEGER NOT NULL REFERENCES cases(id) ON DELETE CASCADE,
  author_role TEXT NOT NULL CHECK(author_role IN ('client', 'manager', 'system')),
  author_name TEXT NOT NULL,
  body TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS otp_requests (
  id INTEGER PRIMARY KEY,
  email TEXT NOT NULL COLLATE NOCASE,
  code_hash TEXT NOT NULL,
  salt TEXT NOT NULL,
  expires_at INTEGER NOT NULL,
  attempts INTEGER NOT NULL DEFAULT 0,
  used_at INTEGER,
  ip_hash TEXT NOT NULL,
  created_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_otp_email_created ON otp_requests(email, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_otp_ip_created ON otp_requests(ip_hash, created_at DESC);

CREATE TABLE IF NOT EXISTS sessions (
  id INTEGER PRIMARY KEY,
  token_hash TEXT NOT NULL UNIQUE,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  csrf_token TEXT NOT NULL,
  expires_at INTEGER NOT NULL,
  created_at INTEGER NOT NULL,
  last_seen_at INTEGER NOT NULL,
  user_agent_hash TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_sessions_token ON sessions(token_hash);

CREATE TABLE IF NOT EXISTS audit_events (
  id INTEGER PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  event_type TEXT NOT NULL,
  object_type TEXT NOT NULL DEFAULT '',
  object_id TEXT NOT NULL DEFAULT '',
  ip_hash TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL,
  details TEXT NOT NULL DEFAULT '{}'
);
"""


MIGRATION_COLUMNS = {
  "users": {
    "amo_contact_id": "INTEGER",
    "amo_synced_at": "TEXT",
  },
  "organizations": {
    "amo_company_id": "INTEGER",
    "amo_synced_at": "TEXT",
  },
  "cases": {
    "source": "TEXT NOT NULL DEFAULT 'portal'",
    "amo_lead_id": "INTEGER",
    "amo_pipeline_id": "INTEGER",
    "amo_status_id": "INTEGER",
    "amo_synced_at": "TEXT",
  },
}


def migrate_schema(connection):
  for table, columns in MIGRATION_COLUMNS.items():
    existing = {row["name"] for row in connection.execute(f"PRAGMA table_info({table})")}
    for column, definition in columns.items():
      if column not in existing:
        connection.execute(f"ALTER TABLE {table} ADD COLUMN {column} {definition}")
  connection.execute(
    "CREATE UNIQUE INDEX IF NOT EXISTS idx_users_amo_contact ON users(amo_contact_id) "
    "WHERE amo_contact_id IS NOT NULL"
  )
  connection.execute(
    "CREATE UNIQUE INDEX IF NOT EXISTS idx_organizations_amo_company ON organizations(amo_company_id) "
    "WHERE amo_company_id IS NOT NULL"
  )
  connection.execute(
    "CREATE UNIQUE INDEX IF NOT EXISTS idx_cases_amo_lead ON cases(amo_lead_id) "
    "WHERE amo_lead_id IS NOT NULL"
  )


def iso_now():
  return datetime.now(timezone.utc).isoformat()


def normalize_email(value):
  email = str(value or "").strip().lower()
  if len(email) > 254 or not EMAIL_RE.fullmatch(email):
    raise ValueError("Укажите корректный email.")
  return email


def clipped(value, limit):
  return str(value or "").strip()[:limit]


def sha256(value):
  return hashlib.sha256(value.encode("utf-8")).hexdigest()


def private_hash(value):
  return hmac.new(HASH_KEY.encode("utf-8"), str(value or "").encode("utf-8"), hashlib.sha256).hexdigest()


def otp_hash(code, salt):
  digest = hashlib.pbkdf2_hmac("sha256", code.encode("utf-8"), bytes.fromhex(salt), 120000)
  return digest.hex()


def safe_filename(value):
  name = Path(str(value or "file")).name
  name = re.sub(r"[\x00-\x1f<>:\"/\\|?*]+", "_", name).strip(" .")
  return name[:140] or "file"


def multipart_file(content_type, body):
  if not content_type.lower().startswith("multipart/form-data;"):
    raise ValueError("Ожидается загрузка файла.")
  header = content_type.encode("ascii", "strict")
  message = BytesParser(policy=email_policy).parsebytes(
    b"Content-Type: " + header + b"\r\nMIME-Version: 1.0\r\n\r\n" + body
  )
  if not message.is_multipart():
    raise ValueError("Не удалось прочитать файл.")
  for part in message.iter_parts():
    if part.get_param("name", header="content-disposition") != "file":
      continue
    filename = part.get_filename()
    if filename:
      return filename, part.get_payload(decode=True) or b""
    break
  raise ValueError("Выберите файл.")


def connect_db(path=None):
  db_path = Path(path or DB_PATH)
  db_path.parent.mkdir(parents=True, exist_ok=True)
  connection = sqlite3.connect(db_path, timeout=10)
  connection.row_factory = sqlite3.Row
  connection.execute("PRAGMA foreign_keys = ON")
  connection.execute("PRAGMA busy_timeout = 5000")
  return connection


@contextmanager
def database(path=None):
  connection = connect_db(path)
  try:
    yield connection
    connection.commit()
  except Exception:
    connection.rollback()
    raise
  finally:
    connection.close()


def init_db(path=None):
  with database(path) as connection:
    connection.executescript(SCHEMA)
    migrate_schema(connection)
    connection.execute("PRAGMA journal_mode = WAL")


def audit(connection, event_type, user_id=None, object_type="", object_id="", ip_hash="", details=None):
  connection.execute(
    "INSERT INTO audit_events(user_id, event_type, object_type, object_id, ip_hash, created_at, details) "
    "VALUES (?, ?, ?, ?, ?, ?, ?)",
    (user_id, event_type, object_type, str(object_id or ""), ip_hash, iso_now(), json.dumps(details or {}, ensure_ascii=False)),
  )


def seed_demo(path=None, email="demo@dokumenty82.ru"):
  init_db(path)
  today = date.today()
  with database(path) as connection:
    existing = connection.execute("SELECT id FROM users WHERE email = ?", (email,)).fetchone()
    if existing:
      user_id = existing["id"]
      org_ids = [row["organization_id"] for row in connection.execute(
        "SELECT organization_id FROM memberships WHERE user_id = ?", (user_id,)
      )]
      connection.execute("DELETE FROM users WHERE id = ?", (user_id,))
      for organization_id in org_ids:
        connection.execute("DELETE FROM organizations WHERE id = ?", (organization_id,))

    cursor = connection.execute(
      "INSERT INTO users(email, full_name, phone, active, created_at) VALUES (?, ?, ?, 1, ?)",
      (email, "Алексей Воронов", "+7 978 555-24-80", iso_now()),
    )
    user_id = cursor.lastrowid

    organizations = [
      ("ООО", "ООО «Вектор Крым»", "9102294381", "1249100004387"),
      ("ИП", "ИП Воронов Алексей Сергеевич", "910212845930", "326910200018421"),
    ]
    organization_ids = []
    for kind, name, inn, ogrn in organizations:
      cursor = connection.execute(
        "INSERT INTO organizations(kind, display_name, inn, ogrn, manager_name, manager_phone, manager_email, created_at) "
        "VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        (kind, name, inn, ogrn, "Елена Семёнова", "+7 (978) 998-72-22", "info@dokumenty82.ru", iso_now()),
      )
      organization_ids.append(cursor.lastrowid)
      connection.execute(
        "INSERT INTO memberships(user_id, organization_id, role) VALUES (?, ?, 'owner')",
        (user_id, cursor.lastrowid),
      )

    case_rows = [
      (organization_ids[0], "Бухгалтерское сопровождение", "Бухгалтерия", "В работе", "Закрываем июль", 72,
       "Подтвердить выписку банка", today + timedelta(days=3)),
      (organization_ids[0], "Ответ на требование ИФНС", "Налоги", "Нужны документы", "Собираем подтверждения", 38,
       "Загрузить договор с поставщиком", today + timedelta(days=1)),
      (organization_ids[1], "Отчётность ИП", "Отчётность", "По графику", "Следующий расчёт подготовлен", 84,
       "Согласовать сумму взносов", today + timedelta(days=7)),
    ]
    case_ids = []
    for row in case_rows:
      cursor = connection.execute(
        "INSERT INTO cases(organization_id, title, category, status, stage, progress, next_action, deadline, updated_at) "
        "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        (*row[:-1], row[-1].isoformat(), iso_now()),
      )
      case_ids.append(cursor.lastrowid)

    tasks = [
      (case_ids[0], "Получить банковскую выписку", "done", today - timedelta(days=1), 10),
      (case_ids[0], "Проверить первичные документы", "done", today, 20),
      (case_ids[0], "Подтвердить итоговую выписку", "current", today + timedelta(days=3), 30),
      (case_ids[0], "Закрыть отчётный период", "waiting", today + timedelta(days=5), 40),
      (case_ids[1], "Получить требование ИФНС", "done", today - timedelta(days=2), 10),
      (case_ids[1], "Загрузить договор и акт", "current", today + timedelta(days=1), 20),
      (case_ids[1], "Подготовить пояснения", "waiting", today + timedelta(days=4), 30),
      (case_ids[2], "Проверить операции за квартал", "done", today - timedelta(days=2), 10),
      (case_ids[2], "Согласовать сумму взносов", "current", today + timedelta(days=7), 20),
    ]
    for case_id, title, status, due_date, sort_order in tasks:
      connection.execute(
        "INSERT INTO tasks(case_id, title, status, due_date, sort_order) VALUES (?, ?, ?, ?, ?)",
        (case_id, title, status, due_date.isoformat(), sort_order),
      )

    documents = [
      (case_ids[0], "Оборотно-сальдовая ведомость", "Готов", "PDF", "osv-iyul.pdf", "manager"),
      (case_ids[0], "Банковская выписка за июль", "Ожидается", "XLSX", None, "client"),
      (case_ids[1], "Требование ИФНС", "Получен", "PDF", "trebovanie-ifns.pdf", "client"),
      (case_ids[1], "Договор с поставщиком", "Ожидается", "PDF", None, "client"),
      (case_ids[2], "Расчёт страховых взносов", "На согласовании", "PDF", "raschet-vznosov.pdf", "manager"),
    ]
    for case_id, title, status, kind, filename, source in documents:
      connection.execute(
        "INSERT INTO documents(case_id, title, status, kind, filename, stored_path, size, source, uploaded_at) "
        "VALUES (?, ?, ?, ?, ?, NULL, 0, ?, ?)",
        (case_id, title, status, kind, filename, source, iso_now()),
      )

    messages = [
      (case_ids[0], "manager", "Елена Семёнова", "Проверила документы за июль. Нужна итоговая выписка по расчётному счёту."),
      (case_ids[0], "client", "Алексей Воронов", "Подготовлю и загружу до конца дня."),
      (case_ids[1], "manager", "Елена Семёнова", "Требование принято в работу. Прикрепите договор и акт по операции из пункта 2."),
    ]
    for case_id, role, name, body in messages:
      connection.execute(
        "INSERT INTO messages(case_id, author_role, author_name, body, created_at) VALUES (?, ?, ?, ?, ?)",
        (case_id, role, name, body, iso_now()),
      )

  return {"email": email, "user_id": user_id, "organizations": organization_ids}


def create_login_code(connection, email, remote_ip):
  email = normalize_email(email)
  now = int(time.time())
  ip_hash = private_hash(remote_ip)
  window_start = now - OTP_RATE_WINDOW_SECONDS
  recent_email = connection.execute(
    "SELECT COUNT(*) AS count FROM otp_requests WHERE email = ? AND created_at >= ?", (email, window_start)
  ).fetchone()["count"]
  recent_ip = connection.execute(
    "SELECT COUNT(*) AS count FROM otp_requests WHERE ip_hash = ? AND created_at >= ?", (ip_hash, window_start)
  ).fetchone()["count"]
  if recent_email >= OTP_RATE_MAX or recent_ip >= OTP_RATE_MAX * 3:
    audit(connection, "auth_code_rate_limited", ip_hash=ip_hash)
    connection.commit()
    return {"limited": True, "email": email, "code": "", "deliver": False}

  code = f"{secrets.randbelow(1000000):06d}"
  salt = secrets.token_hex(16)
  connection.execute(
    "INSERT INTO otp_requests(email, code_hash, salt, expires_at, attempts, used_at, ip_hash, created_at) "
    "VALUES (?, ?, ?, ?, 0, NULL, ?, ?)",
    (email, otp_hash(code, salt), salt, now + OTP_TTL_SECONDS, ip_hash, now),
  )
  user = connection.execute("SELECT id FROM users WHERE email = ? AND active = 1", (email,)).fetchone()
  audit(connection, "auth_code_requested", user_id=user["id"] if user else None, ip_hash=ip_hash)
  connection.commit()
  return {"limited": False, "email": email, "code": code, "deliver": bool(user)}


def verify_login_code(connection, email, code, remote_ip, user_agent):
  email = normalize_email(email)
  code = re.sub(r"\D", "", str(code or ""))[:6]
  now = int(time.time())
  ip_hash = private_hash(remote_ip)
  request = connection.execute(
    "SELECT * FROM otp_requests WHERE email = ? ORDER BY created_at DESC, id DESC LIMIT 1", (email,)
  ).fetchone()
  user = connection.execute("SELECT * FROM users WHERE email = ? AND active = 1", (email,)).fetchone()
  salt = request["salt"] if request else "0" * 32
  submitted_hash = otp_hash(code, salt)
  valid = bool(
    request and user and len(code) == 6 and request["used_at"] is None
    and request["expires_at"] >= now and request["attempts"] < OTP_MAX_ATTEMPTS
    and hmac.compare_digest(request["code_hash"], submitted_hash)
  )
  if not valid:
    if request and request["used_at"] is None:
      connection.execute("UPDATE otp_requests SET attempts = attempts + 1 WHERE id = ?", (request["id"],))
    audit(connection, "auth_code_failed", user_id=user["id"] if user else None, ip_hash=ip_hash)
    connection.commit()
    return None

  connection.execute("UPDATE otp_requests SET used_at = ? WHERE id = ?", (now, request["id"]))
  connection.execute("DELETE FROM sessions WHERE expires_at < ?", (now,))
  token = secrets.token_urlsafe(32)
  csrf_token = secrets.token_urlsafe(24)
  connection.execute(
    "INSERT INTO sessions(token_hash, user_id, csrf_token, expires_at, created_at, last_seen_at, user_agent_hash) "
    "VALUES (?, ?, ?, ?, ?, ?, ?)",
    (sha256(token), user["id"], csrf_token, now + SESSION_TTL_SECONDS, now, now, private_hash(user_agent)),
  )
  audit(connection, "auth_login_success", user_id=user["id"], ip_hash=ip_hash)
  connection.commit()
  return {"token": token, "csrf_token": csrf_token, "user": dict(user)}


def find_session(connection, token):
  if not token:
    return None
  now = int(time.time())
  row = connection.execute(
    "SELECT sessions.*, users.email, users.full_name, users.phone FROM sessions "
    "JOIN users ON users.id = sessions.user_id "
    "WHERE sessions.token_hash = ? AND sessions.expires_at >= ? AND users.active = 1",
    (sha256(token), now),
  ).fetchone()
  if row:
    connection.execute("UPDATE sessions SET last_seen_at = ? WHERE id = ?", (now, row["id"]))
    connection.commit()
  return row


def user_can_access_case(connection, user_id, case_id):
  return connection.execute(
    "SELECT cases.id FROM cases "
    "JOIN memberships ON memberships.organization_id = cases.organization_id "
    "WHERE cases.id = ? AND memberships.user_id = ?",
    (case_id, user_id),
  ).fetchone() is not None


def amo_bridge_configured():
  return bool(AMO_BRIDGE_URL and len(AMO_BRIDGE_TOKEN) >= 32)


def fetch_amo_snapshot(email, phone=""):
  if not amo_bridge_configured():
    raise RuntimeError("amoCRM bridge is not configured")
  body = json.dumps({"email": email, "phone": phone}, ensure_ascii=False).encode("utf-8")
  request = urllib.request.Request(
    AMO_BRIDGE_URL,
    data=body,
    headers={
      "Accept": "application/json",
      "Authorization": "Bearer " + AMO_BRIDGE_TOKEN,
      "Content-Type": "application/json",
    },
    method="POST",
  )
  try:
    with urllib.request.urlopen(request, timeout=20) as response:
      payload = json.loads(response.read().decode("utf-8"))
  except urllib.error.HTTPError as error:
    detail = error.read().decode("utf-8", "replace")
    raise RuntimeError(f"amoCRM bridge returned HTTP {error.code}: {detail[:300]}") from error
  if not isinstance(payload, dict) or not payload.get("ok"):
    raise RuntimeError("amoCRM bridge returned an invalid response")
  return payload


def timestamp_iso(value):
  try:
    stamp = int(value or 0)
  except (TypeError, ValueError):
    stamp = 0
  return datetime.fromtimestamp(stamp, timezone.utc).isoformat() if stamp > 0 else iso_now()


def timestamp_date(value):
  try:
    stamp = int(value or 0)
  except (TypeError, ValueError):
    stamp = 0
  return datetime.fromtimestamp(stamp, timezone.utc).date().isoformat() if stamp > 0 else None


def infer_organization_kind(name):
  normalized = re.sub(r"[^А-Яа-яA-Za-z]", "", str(name or "")).upper()
  return "ИП" if normalized.startswith("ИП") else "ООО"


def organization_for_amo_snapshot(connection, user_id, contact, company):
  company_id = int(company.get("id")) if company and company.get("id") else None
  company_name = clipped(company.get("name"), 180) if company else ""
  organization = None
  if company_id:
    organization = connection.execute(
      "SELECT * FROM organizations WHERE amo_company_id = ?", (company_id,)
    ).fetchone()
  if not organization and company_name:
    organization = connection.execute(
      "SELECT organizations.* FROM organizations "
      "JOIN memberships ON memberships.organization_id = organizations.id "
      "WHERE memberships.user_id = ? AND lower(organizations.display_name) = lower(?) LIMIT 1",
      (user_id, company_name),
    ).fetchone()
  if not organization:
    existing = connection.execute(
      "SELECT organizations.* FROM organizations "
      "JOIN memberships ON memberships.organization_id = organizations.id "
      "WHERE memberships.user_id = ? ORDER BY organizations.id LIMIT 1",
      (user_id,),
    ).fetchone()
    if existing and not existing["amo_company_id"]:
      organization = existing

  synced_at = iso_now()
  if organization:
    organization_id = organization["id"]
    connection.execute(
      "UPDATE organizations SET amo_company_id = COALESCE(amo_company_id, ?), "
      "display_name = CASE WHEN ? <> '' THEN ? ELSE display_name END, amo_synced_at = ? WHERE id = ?",
      (company_id, company_name, company_name, synced_at, organization_id),
    )
  else:
    contact_name = clipped((contact or {}).get("name"), 160) or "Клиент"
    display_name = company_name or ("ИП " + contact_name)
    cursor = connection.execute(
      "INSERT INTO organizations(kind, display_name, inn, ogrn, manager_name, manager_phone, manager_email, "
      "created_at, amo_company_id, amo_synced_at) VALUES (?, ?, '', '', '', '', '', ?, ?, ?)",
      (infer_organization_kind(display_name), display_name, synced_at, company_id, synced_at),
    )
    organization_id = cursor.lastrowid
  connection.execute(
    "INSERT OR IGNORE INTO memberships(user_id, organization_id, role) VALUES (?, ?, 'owner')",
    (user_id, organization_id),
  )
  return organization_id


def apply_amo_snapshot(connection, user_id, snapshot):
  if not snapshot.get("found") or not snapshot.get("contact"):
    connection.execute("UPDATE users SET amo_synced_at = ? WHERE id = ?", (iso_now(), user_id))
    return {"status": "not_found", "synced": 0}

  contact = snapshot["contact"]
  contact_id = int(contact.get("id")) if contact.get("id") else None
  contact_name = clipped(contact.get("name"), 180)
  companies = snapshot.get("companies") or []
  primary_company = companies[0] if companies else None
  organization_id = organization_for_amo_snapshot(connection, user_id, contact, primary_company)
  synced_at = iso_now()
  connection.execute(
    "UPDATE users SET amo_contact_id = ?, amo_synced_at = ?, "
    "full_name = CASE WHEN full_name = '' AND ? <> '' THEN ? ELSE full_name END WHERE id = ?",
    (contact_id, synced_at, contact_name, contact_name, user_id),
  )

  synced = 0
  manager_name = ""
  for lead in snapshot.get("leads") or []:
    lead_id = int(lead.get("id")) if lead.get("id") else None
    if not lead_id:
      continue
    title = clipped(lead.get("name"), 180) or f"Сделка {lead_id}"
    category = clipped(lead.get("pipeline_name"), 120) or "Сделки"
    status = clipped(lead.get("status_name"), 120) or "В работе"
    stage = status
    progress = max(0, min(100, int(lead.get("progress") or 0)))
    responsible = clipped(lead.get("responsible_name"), 180)
    manager_name = manager_name or responsible
    next_action = (
      "Ближайшая задача назначена ответственному специалисту"
      if lead.get("closest_task_at") else "Следующий шаг уточняет ответственный специалист"
    )
    deadline = timestamp_date(lead.get("closest_task_at"))
    updated_at = timestamp_iso(lead.get("updated_at"))
    existing = connection.execute("SELECT id FROM cases WHERE amo_lead_id = ?", (lead_id,)).fetchone()
    values = (
      organization_id, title, category, status, stage, progress, next_action, deadline, updated_at,
      int(lead.get("pipeline_id")) if lead.get("pipeline_id") else None,
      int(lead.get("status_id")) if lead.get("status_id") else None,
      synced_at,
    )
    if existing:
      connection.execute(
        "UPDATE cases SET organization_id = ?, title = ?, category = ?, status = ?, stage = ?, progress = ?, "
        "next_action = ?, deadline = ?, updated_at = ?, source = 'amocrm', amo_pipeline_id = ?, "
        "amo_status_id = ?, amo_synced_at = ? WHERE id = ?",
        (*values, existing["id"]),
      )
    else:
      connection.execute(
        "INSERT INTO cases(organization_id, title, category, status, stage, progress, next_action, deadline, "
        "updated_at, source, amo_lead_id, amo_pipeline_id, amo_status_id, amo_synced_at) "
        "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'amocrm', ?, ?, ?, ?)",
        (*values[:9], lead_id, *values[9:]),
      )
    synced += 1

  if manager_name:
    connection.execute(
      "UPDATE organizations SET manager_name = ?, amo_synced_at = ? WHERE id = ?",
      (manager_name, synced_at, organization_id),
    )
  audit(
    connection,
    "amocrm_snapshot_synced",
    user_id=user_id,
    object_type="contact",
    object_id=contact_id,
    details={"leads": synced},
  )
  return {"status": "synced", "synced": synced}


def should_sync_amo(last_synced_at):
  if not last_synced_at:
    return True
  try:
    synced = datetime.fromisoformat(str(last_synced_at).replace("Z", "+00:00"))
  except ValueError:
    return True
  if synced.tzinfo is None:
    synced = synced.replace(tzinfo=timezone.utc)
  return (datetime.now(timezone.utc) - synced).total_seconds() >= AMO_SYNC_TTL_SECONDS


def sync_amo_for_user(connection, user_id, force=False):
  if not amo_bridge_configured():
    return {"status": "disabled", "synced": 0}
  user = connection.execute(
    "SELECT id, email, phone, amo_synced_at FROM users WHERE id = ?", (user_id,)
  ).fetchone()
  if not user:
    return {"status": "missing_user", "synced": 0}
  if not force and not should_sync_amo(user["amo_synced_at"]):
    return {"status": "cached", "synced": 0}
  snapshot = fetch_amo_snapshot(user["email"], user["phone"])
  return apply_amo_snapshot(connection, user_id, snapshot)


def provision_amo_user(connection, email):
  email = normalize_email(email)
  existing = connection.execute("SELECT id FROM users WHERE email = ?", (email,)).fetchone()
  if existing:
    result = sync_amo_for_user(connection, existing["id"], force=True)
    return {"user_id": existing["id"], **result}

  snapshot = fetch_amo_snapshot(email)
  if not snapshot.get("found") or not snapshot.get("contact"):
    return {"user_id": None, "status": "not_found", "synced": 0}
  full_name = clipped(snapshot["contact"].get("name"), 180) or email
  cursor = connection.execute(
    "INSERT INTO users(email, full_name, phone, active, created_at) VALUES (?, ?, '', 1, ?)",
    (email, full_name, iso_now()),
  )
  result = apply_amo_snapshot(connection, cursor.lastrowid, snapshot)
  audit(
    connection,
    "amocrm_user_provisioned",
    user_id=cursor.lastrowid,
    object_type="user",
    object_id=cursor.lastrowid,
  )
  return {"user_id": cursor.lastrowid, **result}


def dashboard_for_user(connection, user_id):
  user = connection.execute("SELECT id, email, full_name, phone FROM users WHERE id = ?", (user_id,)).fetchone()
  organizations = []
  for organization in connection.execute(
    "SELECT organizations.*, memberships.role FROM organizations "
    "JOIN memberships ON memberships.organization_id = organizations.id "
    "WHERE memberships.user_id = ? ORDER BY organizations.kind DESC, organizations.display_name",
    (user_id,),
  ):
    organization_data = dict(organization)
    cases = []
    for case in connection.execute(
      "SELECT * FROM cases WHERE organization_id = ? ORDER BY progress < 100 DESC, deadline, updated_at DESC",
      (organization["id"],),
    ):
      case_data = dict(case)
      case_data["tasks"] = [dict(row) for row in connection.execute(
        "SELECT id, title, status, due_date, sort_order FROM tasks WHERE case_id = ? ORDER BY sort_order, id",
        (case["id"],),
      )]
      document_rows = connection.execute(
        "SELECT id, title, status, kind, filename, stored_path, size, source, uploaded_at FROM documents "
        "WHERE case_id = ? ORDER BY uploaded_at DESC, id DESC",
        (case["id"],),
      )
      case_data["documents"] = []
      for row in document_rows:
        document = dict(row)
        document["download_available"] = bool(document.pop("stored_path", None))
        case_data["documents"].append(document)
      case_data["messages"] = [dict(row) for row in connection.execute(
        "SELECT id, author_role, author_name, body, created_at FROM messages "
        "WHERE case_id = ? ORDER BY created_at, id",
        (case["id"],),
      )]
      cases.append(case_data)
    organization_data["cases"] = cases
    organizations.append(organization_data)
  return {"user": dict(user), "organizations": organizations}


def create_client_message(connection, user_id, case_id, body):
  if not user_can_access_case(connection, user_id, case_id):
    raise PermissionError("Недостаточно прав.")
  body = clipped(body, 2000)
  if len(body) < 2:
    raise ValueError("Напишите сообщение.")
  user = connection.execute("SELECT full_name FROM users WHERE id = ?", (user_id,)).fetchone()
  cursor = connection.execute(
    "INSERT INTO messages(case_id, author_role, author_name, body, created_at) VALUES (?, 'client', ?, ?, ?)",
    (case_id, user["full_name"], body, iso_now()),
  )
  audit(connection, "message_created", user_id=user_id, object_type="case", object_id=case_id)
  connection.commit()
  return cursor.lastrowid


def client_ip(handler):
  if TRUST_PROXY and handler.client_address[0] in {"127.0.0.1", "::1"}:
    forwarded = handler.headers.get("X-Forwarded-For", "").split(",", 1)[0].strip()
    if forwarded:
      return forwarded[:80]
  return handler.client_address[0]


def send_login_code(email, code):
  if DEV_MODE:
    print(f"Portal login code for {email}: {code}", flush=True)
    return
  if not SMTP_HOST or not SMTP_FROM:
    raise RuntimeError("Portal SMTP is not configured")
  message = EmailMessage()
  message["Subject"] = "Код входа в личный кабинет"
  message["From"] = SMTP_FROM
  message["To"] = email
  message.set_content(
    "Код входа в личный кабинет «Документы для бизнеса»: " + code + "\n\n"
    "Код действует 10 минут. Если вы не запрашивали вход, просто удалите письмо."
  )
  context = ssl.create_default_context()
  if SMTP_USE_SSL:
    with smtplib.SMTP_SSL(SMTP_HOST, SMTP_PORT, context=context, timeout=20) as server:
      if SMTP_USERNAME:
        server.login(SMTP_USERNAME, SMTP_PASSWORD)
      server.send_message(message)
  else:
    with smtplib.SMTP(SMTP_HOST, SMTP_PORT, timeout=20) as server:
      if SMTP_STARTTLS:
        server.starttls(context=context)
      if SMTP_USERNAME:
        server.login(SMTP_USERNAME, SMTP_PASSWORD)
      server.send_message(message)


def send_login_code_safely(email, code):
  try:
    send_login_code(email, code)
  except Exception:
    traceback.print_exc()


def security_headers(handler, content_security_policy=False):
  handler.send_header("X-Content-Type-Options", "nosniff")
  handler.send_header("X-Frame-Options", "DENY")
  handler.send_header("Referrer-Policy", "no-referrer")
  handler.send_header("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=()")
  if content_security_policy:
    handler.send_header(
      "Content-Security-Policy",
      "default-src 'self'; img-src 'self' data:; style-src 'self'; script-src 'self'; "
      "connect-src 'self'; font-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'self'",
    )


def json_response(handler, status, payload, headers=None):
  data = json.dumps(payload, ensure_ascii=False).encode("utf-8")
  handler.send_response(status)
  handler.send_header("Content-Type", "application/json; charset=utf-8")
  handler.send_header("Cache-Control", "no-store")
  security_headers(handler)
  for name, value in (headers or []):
    handler.send_header(name, value)
  handler.send_header("Content-Length", str(len(data)))
  handler.end_headers()
  handler.wfile.write(data)


class PortalHandler(BaseHTTPRequestHandler):
  server_version = "D82ClientPortal"

  def version_string(self):
    return self.server_version

  def log_message(self, fmt, *args):
    print("%s %s" % (self.log_date_time_string(), fmt % args), flush=True)

  def do_GET(self):
    path = urllib.parse.urlparse(self.path).path
    if path == "/health":
      json_response(self, 200, {"ok": True})
      return
    if path == "/api/cabinet/session":
      self.handle_session()
      return
    if path == "/api/cabinet/dashboard":
      self.handle_dashboard()
      return
    document_match = re.fullmatch(r"/api/cabinet/documents/(\d+)/download", path)
    if document_match:
      self.handle_document_download(int(document_match.group(1)))
      return
    if path == "/cabinet" or path.startswith("/cabinet/"):
      self.handle_static(path)
      return
    json_response(self, 404, {"ok": False, "message": "Not found"})

  def do_POST(self):
    if not self.origin_allowed():
      json_response(self, 403, {"ok": False, "message": "Запрос отклонён."})
      return
    path = urllib.parse.urlparse(self.path).path
    if path == "/api/cabinet/auth/request":
      self.handle_auth_request()
      return
    if path == "/api/cabinet/auth/verify":
      self.handle_auth_verify()
      return
    if path == "/api/cabinet/logout":
      self.handle_logout()
      return
    message_match = re.fullmatch(r"/api/cabinet/cases/(\d+)/messages", path)
    if message_match:
      self.handle_message(int(message_match.group(1)))
      return
    upload_match = re.fullmatch(r"/api/cabinet/cases/(\d+)/documents", path)
    if upload_match:
      self.handle_document_upload(int(upload_match.group(1)))
      return
    json_response(self, 404, {"ok": False, "message": "Not found"})

  def origin_allowed(self):
    origin = self.headers.get("Origin", "").rstrip("/")
    if origin == PUBLIC_ORIGIN:
      return True
    if DEV_MODE and origin in {f"http://127.0.0.1:{PORT}", f"http://localhost:{PORT}"}:
      return True
    return not origin and self.client_address[0] in {"127.0.0.1", "::1"}

  def read_json(self, max_bytes=65536):
    content_type = self.headers.get("Content-Type", "")
    length = int(self.headers.get("Content-Length", "0") or "0")
    if "application/json" not in content_type or length <= 0 or length > max_bytes:
      raise ValueError("Некорректный запрос.")
    return json.loads(self.rfile.read(length).decode("utf-8"))

  def cookie_token(self):
    cookie = SimpleCookie()
    try:
      cookie.load(self.headers.get("Cookie", ""))
      return cookie[COOKIE_NAME].value if COOKIE_NAME in cookie else ""
    except Exception:
      return ""

  def require_session(self, connection):
    session = find_session(connection, self.cookie_token())
    if not session:
      json_response(self, 401, {"ok": False, "message": "Требуется вход."})
      return None
    return session

  def csrf_valid(self, session):
    supplied = self.headers.get("X-CSRF-Token", "")
    return bool(supplied and hmac.compare_digest(supplied, session["csrf_token"]))

  def handle_auth_request(self):
    try:
      payload = self.read_json()
      with database() as connection:
        result = create_login_code(connection, payload.get("email"), client_ip(self))
      if result["deliver"]:
        threading.Thread(
          target=send_login_code_safely,
          args=(result["email"], result["code"]),
          daemon=True,
        ).start()
      response = {
        "ok": True,
        "message": "Если email подключён к кабинету, код уже отправлен.",
        "retry_after": 60,
      }
      if DEV_MODE and result["deliver"]:
        response["dev_code"] = result["code"]
      json_response(self, 200, response)
    except (ValueError, json.JSONDecodeError) as error:
      json_response(self, 400, {"ok": False, "message": str(error)})
    except Exception:
      traceback.print_exc()
      json_response(self, 500, {"ok": False, "message": "Не удалось отправить код."})

  def handle_auth_verify(self):
    try:
      payload = self.read_json()
      with database() as connection:
        result = verify_login_code(
          connection,
          payload.get("email"),
          payload.get("code"),
          client_ip(self),
          self.headers.get("User-Agent", "")[:500],
        )
      if not result:
        json_response(self, 401, {"ok": False, "message": "Код неверный или срок его действия истёк."})
        return
      cookie = f"{COOKIE_NAME}={result['token']}; Path=/; HttpOnly; SameSite=Strict"
      if SECURE_COOKIE:
        cookie += "; Secure"
      json_response(
        self,
        200,
        {"ok": True, "csrf_token": result["csrf_token"]},
        headers=[("Set-Cookie", cookie)],
      )
    except (ValueError, json.JSONDecodeError) as error:
      json_response(self, 400, {"ok": False, "message": str(error)})
    except Exception:
      traceback.print_exc()
      json_response(self, 500, {"ok": False, "message": "Не удалось выполнить вход."})

  def handle_session(self):
    with database() as connection:
      session = find_session(connection, self.cookie_token())
      if not session:
        json_response(self, 200, {"ok": True, "authenticated": False})
        return
      json_response(self, 200, {
        "ok": True,
        "authenticated": True,
        "csrf_token": session["csrf_token"],
        "user": {"id": session["user_id"], "email": session["email"], "full_name": session["full_name"]},
      })

  def handle_dashboard(self):
    with database() as connection:
      session = self.require_session(connection)
      if not session:
        return
      sync_result = {"status": "disabled", "synced": 0}
      try:
        sync_result = sync_amo_for_user(connection, session["user_id"])
      except Exception:
        traceback.print_exc()
        sync_result = {"status": "unavailable", "synced": 0}
      json_response(self, 200, {
        "ok": True,
        "crm_sync": sync_result,
        **dashboard_for_user(connection, session["user_id"]),
      })

  def handle_logout(self):
    with database() as connection:
      session = self.require_session(connection)
      if not session:
        return
      if not self.csrf_valid(session):
        json_response(self, 403, {"ok": False, "message": "Сессия страницы устарела."})
        return
      connection.execute("DELETE FROM sessions WHERE id = ?", (session["id"],))
      audit(connection, "auth_logout", user_id=session["user_id"], ip_hash=private_hash(client_ip(self)))
      connection.commit()
    cookie = f"{COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0"
    if SECURE_COOKIE:
      cookie += "; Secure"
    json_response(self, 200, {"ok": True}, headers=[("Set-Cookie", cookie)])

  def handle_message(self, case_id):
    try:
      payload = self.read_json()
      with database() as connection:
        session = self.require_session(connection)
        if not session:
          return
        if not self.csrf_valid(session):
          json_response(self, 403, {"ok": False, "message": "Сессия страницы устарела."})
          return
        message_id = create_client_message(connection, session["user_id"], case_id, payload.get("body"))
      json_response(self, 201, {"ok": True, "id": message_id})
    except PermissionError as error:
      json_response(self, 403, {"ok": False, "message": str(error)})
    except (ValueError, json.JSONDecodeError) as error:
      json_response(self, 400, {"ok": False, "message": str(error)})
    except Exception:
      traceback.print_exc()
      json_response(self, 500, {"ok": False, "message": "Не удалось отправить сообщение."})

  def handle_document_upload(self, case_id):
    try:
      with database() as connection:
        session = self.require_session(connection)
        if not session:
          return
        if not self.csrf_valid(session):
          json_response(self, 403, {"ok": False, "message": "Сессия страницы устарела."})
          return
        if not user_can_access_case(connection, session["user_id"], case_id):
          json_response(self, 403, {"ok": False, "message": "Недостаточно прав."})
          return

        length = int(self.headers.get("Content-Length", "0") or "0")
        if length <= 0 or length > MAX_UPLOAD_BYTES + 65536:
          json_response(self, 413, {"ok": False, "message": "Файл слишком большой."})
          return
        body = self.rfile.read(length)
        filename, payload = multipart_file(self.headers.get("Content-Type", ""), body)
        original = safe_filename(filename)
        extension = Path(original).suffix.lower()
        if extension not in ALLOWED_UPLOAD_EXTENSIONS:
          raise ValueError("Этот формат файла не поддерживается.")
        if not payload:
          raise ValueError("Файл пустой.")
        if len(payload) > MAX_UPLOAD_BYTES:
          raise ValueError("Файл слишком большой.")

        target_dir = FILES_DIR / str(case_id)
        target_dir.mkdir(parents=True, exist_ok=True)
        os.chmod(target_dir, 0o700)
        stored_name = secrets.token_hex(16) + extension
        target = target_dir / stored_name
        with target.open("wb") as output:
          output.write(payload)
        size = len(payload)
        os.chmod(target, 0o600)
        cursor = connection.execute(
          "INSERT INTO documents(case_id, title, status, kind, filename, stored_path, size, source, uploaded_at) "
          "VALUES (?, ?, 'Получен', ?, ?, ?, ?, 'client', ?)",
          (case_id, original, extension.lstrip(".").upper(), original, str(target), size, iso_now()),
        )
        audit(connection, "document_uploaded", user_id=session["user_id"], object_type="case", object_id=case_id)
        connection.commit()
      json_response(self, 201, {"ok": True, "id": cursor.lastrowid})
    except ValueError as error:
      json_response(self, 400, {"ok": False, "message": str(error)})
    except Exception:
      traceback.print_exc()
      json_response(self, 500, {"ok": False, "message": "Не удалось загрузить файл."})

  def handle_document_download(self, document_id):
    with database() as connection:
      session = self.require_session(connection)
      if not session:
        return
      row = connection.execute(
        "SELECT documents.*, cases.organization_id FROM documents "
        "JOIN cases ON cases.id = documents.case_id "
        "JOIN memberships ON memberships.organization_id = cases.organization_id "
        "WHERE documents.id = ? AND memberships.user_id = ?",
        (document_id, session["user_id"]),
      ).fetchone()
      if not row or not row["stored_path"]:
        json_response(self, 404, {"ok": False, "message": "Файл пока недоступен."})
        return
      target = Path(row["stored_path"])
      try:
        target.resolve().relative_to(FILES_DIR.resolve())
      except (ValueError, FileNotFoundError):
        json_response(self, 404, {"ok": False, "message": "Файл не найден."})
        return
      if not target.is_file():
        json_response(self, 404, {"ok": False, "message": "Файл не найден."})
        return
      data = target.read_bytes()
      filename = safe_filename(row["filename"] or row["title"])
      self.send_response(200)
      self.send_header("Content-Type", mimetypes.guess_type(filename)[0] or "application/octet-stream")
      self.send_header("Content-Disposition", "attachment; filename*=UTF-8''" + urllib.parse.quote(filename))
      self.send_header("Cache-Control", "no-store")
      security_headers(self)
      self.send_header("Content-Length", str(len(data)))
      self.end_headers()
      self.wfile.write(data)

  def handle_static(self, path):
    if not STATIC_DIR:
      json_response(self, 404, {"ok": False, "message": "Not found"})
      return
    relative = "index.html" if path in {"/cabinet", "/cabinet/"} else path.removeprefix("/cabinet/")
    target = (STATIC_DIR / relative).resolve()
    try:
      target.relative_to(STATIC_DIR)
    except ValueError:
      json_response(self, 404, {"ok": False, "message": "Not found"})
      return
    if not target.is_file():
      json_response(self, 404, {"ok": False, "message": "Not found"})
      return
    data = target.read_bytes()
    self.send_response(200)
    self.send_header("Content-Type", STATIC_MIME_TYPES.get(target.suffix.lower(), "application/octet-stream"))
    self.send_header("Cache-Control", "no-store")
    self.send_header("X-Robots-Tag", "noindex, nofollow, noarchive")
    security_headers(self, content_security_policy=target.suffix.lower() == ".html")
    self.send_header("Content-Length", str(len(data)))
    self.end_headers()
    self.wfile.write(data)


def validate_production_config():
  if DEV_MODE:
    return
  if len(HASH_KEY) < 32 or HASH_KEY == "dev-only-portal-hash-key":
    raise RuntimeError("D82_PORTAL_HASH_KEY must contain at least 32 characters")
  if not SMTP_HOST or not SMTP_FROM:
    raise RuntimeError("Portal SMTP settings are required outside development mode")
  if not SECURE_COOKIE or not PUBLIC_ORIGIN.startswith("https://"):
    raise RuntimeError("Production portal requires HTTPS and secure cookies")


def main():
  parser = argparse.ArgumentParser(description="dokumenty82 client portal")
  parser.add_argument("--init-db", action="store_true")
  parser.add_argument("--seed-demo", action="store_true")
  parser.add_argument("--demo-email", default=os.environ.get("D82_PORTAL_DEMO_EMAIL", "demo@dokumenty82.ru"))
  parser.add_argument("--sync-email", default="", help="Create or refresh one portal user from amoCRM")
  args = parser.parse_args()

  if args.seed_demo:
    if not DEV_MODE:
      parser.error("--seed-demo is available only when D82_PORTAL_DEV_MODE=1")
    init_db()
    print(json.dumps(seed_demo(email=args.demo_email), ensure_ascii=False, indent=2))
    return

  if args.sync_email:
    init_db()
    with database() as connection:
      result = provision_amo_user(connection, args.sync_email)
    print(json.dumps(result, ensure_ascii=False, indent=2))
    return

  validate_production_config()
  init_db()
  if args.init_db:
    print(str(DB_PATH))
    return

  DATA_DIR.mkdir(parents=True, exist_ok=True)
  FILES_DIR.mkdir(parents=True, exist_ok=True)
  os.chmod(DATA_DIR, 0o700)
  os.chmod(FILES_DIR, 0o700)
  server = ThreadingHTTPServer((HOST, PORT), PortalHandler)
  print(f"Client portal listening on {HOST}:{PORT}", flush=True)
  server.serve_forever()


if __name__ == "__main__":
  main()
