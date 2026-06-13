import { siteFeatureFlags } from "@/lib/feature-flags";
import { forbiddenTrackingParamKeys, safeTrackingEventNames, safeTrackingParamKeys } from "@/lib/tracking/event-context";
import type { AttributionState } from "@/lib/tracking/attribution";
import type { SafeTrackingEventName, TrackingContext } from "@/lib/tracking/event-context";

function isAllowedEventName(eventName: string): eventName is SafeTrackingEventName {
  return safeTrackingEventNames.includes(eventName as SafeTrackingEventName);
}

export function buildSafeTrackingPayload(context: TrackingContext, attribution: AttributionState = {}) {
  const rawPayload = {
    ...context,
    ...attribution
  };
  const safePayload: Record<string, string> = {};

  for (const key of safeTrackingParamKeys) {
    const value = rawPayload[key];
    if (typeof value === "string" && value.trim()) {
      safePayload[key] = value.trim().slice(0, 180);
    }
  }

  for (const forbiddenKey of forbiddenTrackingParamKeys) {
    delete safePayload[forbiddenKey];
  }

  return safePayload;
}

export function trackSafeEvent(eventName: SafeTrackingEventName, context: TrackingContext, attribution: AttributionState = {}) {
  if (!isAllowedEventName(eventName)) return;

  const payload = buildSafeTrackingPayload(context, attribution);

  if (!siteFeatureFlags.analyticsEnabled && !siteFeatureFlags.metricaEnabled) {
    return;
  }

  // Future provider hook goes here after owner/legal/CRM/no-PII acceptance.
  // Do not call external analytics while analyticsEnabled/metricaEnabled remain false.
  void payload;
}
