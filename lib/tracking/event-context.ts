export const attributionParamKeys = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "yclid",
  "ysclid",
  "from"
] as const;

export const safeTrackingParamKeys = [
  "page_slug",
  "page_type",
  "cta_label",
  "cta_location",
  "lead_topic",
  "collector_type",
  "contact_channel",
  "from_page_slug",
  "to_page_slug",
  ...attributionParamKeys
] as const;

export const forbiddenTrackingParamKeys = [
  "phone",
  "name",
  "message",
  "document_text",
  "file_name",
  "inn",
  "ogrn",
  "passport",
  "bank",
  "crm_notes"
] as const;

export const safeTrackingEventNames = [
  "goal_call_click",
  "goal_route_click",
  "goal_docs_show_click",
  "goal_form_start",
  "goal_form_submit_attempt",
  "goal_form_submit_fail",
  "goal_related_route_click",
  "consultation_cta_click",
  "hero_cta_click",
  "scenario_card_click",
  "service_card_click",
  "support_bridge_click",
  "fallback_contact_click"
] as const;

export type AttributionParamKey = (typeof attributionParamKeys)[number];
export type SafeTrackingParamKey = (typeof safeTrackingParamKeys)[number];
export type SafeTrackingEventName = (typeof safeTrackingEventNames)[number];

export type CollectorType =
  | "situation_review"
  | "show_documents"
  | "phone"
  | "route"
  | "related_route"
  | "form_placeholder"
  | "fallback";

export type TrackingContext = Partial<Record<SafeTrackingParamKey, string>> & {
  page_slug: string;
  page_type: string;
  cta_label: string;
  cta_location: string;
  collector_type: CollectorType;
};

export function defaultEventNameForCollector(collectorType: CollectorType): SafeTrackingEventName {
  switch (collectorType) {
    case "phone":
      return "goal_call_click";
    case "route":
      return "goal_route_click";
    case "show_documents":
      return "goal_docs_show_click";
    case "related_route":
      return "goal_related_route_click";
    case "form_placeholder":
      return "goal_form_submit_attempt";
    case "fallback":
      return "fallback_contact_click";
    case "situation_review":
    default:
      return "consultation_cta_click";
  }
}
