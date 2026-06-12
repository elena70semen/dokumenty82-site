import { analyticsConfig } from "@/lib/integrations/analytics-config";

export const analyticsGoalNames = {
  leadRazborSituaciiClick: "lead_razbor_situacii_click",
  phoneClick: "phone_click",
  routeClick: "route_click",
  showDocumentsClick: "show_documents_click",
  contactsOpen: "contacts_open",
  policyOpen: "policy_open"
} as const;

export type AnalyticsGoalName = (typeof analyticsGoalNames)[keyof typeof analyticsGoalNames];

export type SafeAnalyticsEvent = {
  goal: AnalyticsGoalName;
  pageSlug?: string;
  pageType?: string;
  ctaLocation?: string;
  ctaLabel?: string;
};

const allowedGoals = new Set<string>(Object.values(analyticsGoalNames));

export function trackAnalyticsGoal(goal: AnalyticsGoalName, _payload: Omit<SafeAnalyticsEvent, "goal"> = {}) {
  if (!analyticsConfig.canSendEvents) return;
  if (!allowedGoals.has(goal)) return;

  return;
}

export function trackLeadRazborSituaciiClick(payload?: Omit<SafeAnalyticsEvent, "goal">) {
  trackAnalyticsGoal(analyticsGoalNames.leadRazborSituaciiClick, payload);
}

export function trackPhoneClick(payload?: Omit<SafeAnalyticsEvent, "goal">) {
  trackAnalyticsGoal(analyticsGoalNames.phoneClick, payload);
}

export function trackRouteClick(payload?: Omit<SafeAnalyticsEvent, "goal">) {
  trackAnalyticsGoal(analyticsGoalNames.routeClick, payload);
}

export function trackShowDocumentsClick(payload?: Omit<SafeAnalyticsEvent, "goal">) {
  trackAnalyticsGoal(analyticsGoalNames.showDocumentsClick, payload);
}

export function trackContactsOpen(payload?: Omit<SafeAnalyticsEvent, "goal">) {
  trackAnalyticsGoal(analyticsGoalNames.contactsOpen, payload);
}

export function trackPolicyOpen(payload?: Omit<SafeAnalyticsEvent, "goal">) {
  trackAnalyticsGoal(analyticsGoalNames.policyOpen, payload);
}
