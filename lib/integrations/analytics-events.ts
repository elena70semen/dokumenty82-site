import { analyticsConfig } from "@/lib/integrations/analytics-config";
import { buildSafeSourcePayload, type SafeSourceContext } from "@/lib/integrations/source-capture";

export const analyticsGoalNames = {
  callClick: "goal_call_click",
  routeClick: "goal_route_click",
  docsShowClick: "goal_docs_show_click",
  formStart: "goal_form_start",
  formSubmitAttempt: "goal_form_submit_attempt",
  formSubmitSuccess: "goal_form_submit_success",
  formSubmitFail: "goal_form_submit_fail",
  relatedRouteClick: "goal_related_route_click"
} as const;

export type AnalyticsGoalName = (typeof analyticsGoalNames)[keyof typeof analyticsGoalNames];

export type SafeAnalyticsEventPayload = SafeSourceContext & {
  related_href?: string;
  failure_reason?: "backend_unavailable" | "validation_error" | "backend_rejected";
};

export type SafeAnalyticsEvent = {
  goal: AnalyticsGoalName;
  params: SafeAnalyticsEventPayload;
};

const allowedGoals = new Set<string>(Object.values(analyticsGoalNames));

function isAnalyticsGoalName(goal: string): goal is AnalyticsGoalName {
  return allowedGoals.has(goal);
}

function sanitizeEventPayload(payload: Record<string, unknown> = {}) {
  const safePayload = buildSafeSourcePayload(payload) as SafeAnalyticsEventPayload;

  if (typeof payload.related_href === "string") {
    safePayload.related_href = payload.related_href.slice(0, 160);
  }

  if (
    payload.failure_reason === "backend_unavailable" ||
    payload.failure_reason === "validation_error" ||
    payload.failure_reason === "backend_rejected"
  ) {
    safePayload.failure_reason = payload.failure_reason;
  }

  return safePayload;
}

export function buildAnalyticsEvent(goal: AnalyticsGoalName, payload: Record<string, unknown> = {}): SafeAnalyticsEvent {
  return {
    goal,
    params: sanitizeEventPayload(payload)
  };
}

export function trackAnalyticsGoal(
  goal: AnalyticsGoalName,
  payload: Record<string, unknown> = {},
  options: { backendAccepted?: boolean } = {}
) {
  if (!isAnalyticsGoalName(goal)) {
    return { sent: false, reason: "unknown_goal" as const };
  }

  const event = buildAnalyticsEvent(goal, payload);

  if (goal === analyticsGoalNames.formSubmitSuccess && options.backendAccepted !== true) {
    return { sent: false, reason: "backend_acceptance_required" as const, event };
  }

  if (!analyticsConfig.canSendEvents) {
    return { sent: false, reason: "analytics_disabled" as const, event };
  }

  return { sent: false, reason: "live_dispatch_not_implemented" as const, event };
}

export function trackCallClick(payload?: Record<string, unknown>) {
  return trackAnalyticsGoal(analyticsGoalNames.callClick, payload);
}

export function trackRouteClick(payload?: Record<string, unknown>) {
  return trackAnalyticsGoal(analyticsGoalNames.routeClick, payload);
}

export function trackDocsShowClick(payload?: Record<string, unknown>) {
  return trackAnalyticsGoal(analyticsGoalNames.docsShowClick, payload);
}

export function trackFormStart(payload?: Record<string, unknown>) {
  return trackAnalyticsGoal(analyticsGoalNames.formStart, payload);
}

export function trackFormSubmitAttempt(payload?: Record<string, unknown>) {
  return trackAnalyticsGoal(analyticsGoalNames.formSubmitAttempt, payload);
}

export function trackFormSubmitFail(payload?: Record<string, unknown>) {
  return trackAnalyticsGoal(analyticsGoalNames.formSubmitFail, {
    failure_reason: "backend_unavailable",
    ...payload
  });
}

export function trackFormSubmitSuccess(payload?: Record<string, unknown>, options?: { backendAccepted?: boolean }) {
  return trackAnalyticsGoal(analyticsGoalNames.formSubmitSuccess, payload, options);
}

export function trackRelatedRouteClick(payload?: Record<string, unknown>) {
  return trackAnalyticsGoal(analyticsGoalNames.relatedRouteClick, payload);
}
