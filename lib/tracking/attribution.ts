import { attributionParamKeys } from "@/lib/tracking/event-context";
import type { AttributionParamKey } from "@/lib/tracking/event-context";

const storageKey = "dokumenty82_attribution_v1";

export type AttributionState = Partial<Record<AttributionParamKey, string>>;

function sanitizeValue(value: string) {
  return value.trim().slice(0, 180);
}

function isBrowser() {
  return typeof window !== "undefined";
}

export function readAttributionFromSearch(search: string): AttributionState {
  const params = new URLSearchParams(search);
  const attribution: AttributionState = {};

  for (const key of attributionParamKeys) {
    const value = params.get(key);
    if (value) {
      attribution[key] = sanitizeValue(value);
    }
  }

  return attribution;
}

export function getStoredAttribution(): AttributionState {
  if (!isBrowser()) return {};

  try {
    const raw = window.sessionStorage.getItem(storageKey);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    const attribution: AttributionState = {};

    for (const key of attributionParamKeys) {
      const value = parsed[key];
      if (typeof value === "string" && value) {
        attribution[key] = sanitizeValue(value);
      }
    }

    return attribution;
  } catch {
    return {};
  }
}

export function captureAttributionFromLocation() {
  if (!isBrowser()) return {};

  const current = readAttributionFromSearch(window.location.search);
  const hasCurrent = Object.keys(current).length > 0;
  if (!hasCurrent) return getStoredAttribution();

  const merged = {
    ...getStoredAttribution(),
    ...current
  } satisfies AttributionState;

  try {
    window.sessionStorage.setItem(storageKey, JSON.stringify(merged));
  } catch {
    // Storage may be unavailable. Attribution is best-effort and must not block the page.
  }

  return merged;
}
