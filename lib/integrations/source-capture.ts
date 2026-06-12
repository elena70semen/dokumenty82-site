export const sourceCaptureKeys = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "yclid"
] as const;

export const ctaContextKeys = [
  "page_slug",
  "page_type",
  "cta_label",
  "cta_location",
  "lead_topic"
] as const;

export const safeSourceContextKeys = [...sourceCaptureKeys, ...ctaContextKeys] as const;

export type SafeSourceContextKey = (typeof safeSourceContextKeys)[number];
export type SafeSourceContext = Partial<Record<SafeSourceContextKey, string>>;

const STORAGE_KEY = "d82_source_capture_v1";
const MAX_VALUE_LENGTH = 160;

let memorySourceContext: SafeSourceContext = {};

function normalizeValue(value: unknown) {
  if (typeof value !== "string" && typeof value !== "number") return undefined;

  const normalized = String(value)
    .trim()
    .replace(/[\u0000-\u001f\u007f<>`{}]/g, "")
    .slice(0, MAX_VALUE_LENGTH);

  return normalized.length > 0 ? normalized : undefined;
}

function isSafeKey(key: string): key is SafeSourceContextKey {
  return safeSourceContextKeys.includes(key as SafeSourceContextKey);
}

function canUseSessionStorage() {
  try {
    if (typeof window === "undefined") return false;
    const storage = window.sessionStorage;
    const probeKey = `${STORAGE_KEY}_probe`;
    storage.setItem(probeKey, "1");
    storage.removeItem(probeKey);
    return true;
  } catch {
    return false;
  }
}

function readSessionContext(): SafeSourceContext {
  if (!canUseSessionStorage()) return memorySourceContext;

  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return memorySourceContext;

    const parsed = JSON.parse(raw) as SafeSourceContext;
    return sanitizeSourceContext(parsed);
  } catch {
    return memorySourceContext;
  }
}

function writeSessionContext(context: SafeSourceContext) {
  memorySourceContext = context;

  if (!canUseSessionStorage()) return;

  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(context));
  } catch {
    memorySourceContext = context;
  }
}

export function sanitizeSourceContext(input: Record<string, unknown> = {}) {
  const safeContext: SafeSourceContext = {};

  for (const [key, value] of Object.entries(input)) {
    if (!isSafeKey(key)) continue;

    const normalized = normalizeValue(value);
    if (normalized) safeContext[key] = normalized;
  }

  return safeContext;
}

export function readSourceContextFromSearch(search: string | URLSearchParams) {
  const params = search instanceof URLSearchParams ? search : new URLSearchParams(search.replace(/^\?/, ""));
  const context: SafeSourceContext = {};

  for (const key of safeSourceContextKeys) {
    const value = normalizeValue(params.get(key));
    if (value) context[key] = value;
  }

  return context;
}

export function readStoredSourceContext() {
  return readSessionContext();
}

export function preserveSourceContext(input: Record<string, unknown> = {}) {
  const current = readStoredSourceContext();
  const next = {
    ...current,
    ...sanitizeSourceContext(input)
  };

  writeSessionContext(next);

  return next;
}

export function captureSourceFromLocation(extra: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return preserveSourceContext(extra);

  return preserveSourceContext({
    ...readSourceContextFromSearch(window.location.search),
    ...extra
  });
}

export function captureSourceFromDataset(dataset: DOMStringMap | Record<string, string | undefined>) {
  return preserveSourceContext({
    page_slug: dataset.pageSlug,
    page_type: dataset.pageType,
    cta_label: dataset.ctaLabel,
    cta_location: dataset.ctaLocation,
    lead_topic: dataset.leadTopic
  });
}

export function buildSafeSourcePayload(input: Record<string, unknown> = {}) {
  return {
    ...readStoredSourceContext(),
    ...sanitizeSourceContext(input)
  };
}
