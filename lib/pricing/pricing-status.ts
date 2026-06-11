export const pricingStatuses = [
  "HOLD",
  "DRAFT_INTERNAL",
  "REVIEW",
  "APPROVED_INTERNAL",
  "PUBLIC_REVIEW",
  "PUBLIC_APPROVED",
  "DEPRECATED",
  "BLOCKED",
] as const;

export type PricingStatus = (typeof pricingStatuses)[number];

export const priceVisibilityScopes = [
  "internal_note",
  "quote_calculation",
  "commercial_proposal",
  "contract",
  "public_site",
  "public_ads",
  "crm",
] as const;

export type PriceVisibilityScope = (typeof priceVisibilityScopes)[number];

export const pricingDecisionStatuses = [
  "OWNER_REVIEW_PENDING",
  "CHANGES_REQUESTED",
  "READY_FOR_REVIEW",
  "READY_TO_MERGE",
  "BLOCKED",
] as const;

export type PricingDecisionStatus = (typeof pricingDecisionStatuses)[number];

export function isInternalApproved(status: PricingStatus): boolean {
  return (
    status === "APPROVED_INTERNAL" ||
    status === "PUBLIC_REVIEW" ||
    status === "PUBLIC_APPROVED"
  );
}

export function isPublicApproved(status: PricingStatus): boolean {
  return status === "PUBLIC_APPROVED";
}

export function isBlockedOrHold(status: PricingStatus): boolean {
  return status === "HOLD" || status === "BLOCKED";
}
