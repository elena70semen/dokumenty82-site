import {
  approvedPricingRoutes,
  servicePricingMatrix,
} from "./service-pricing-matrix";
import { isInternalApproved, isPublicApproved } from "./pricing-status";
import type { PriceAmount, ServicePricingItem } from "./pricing-types";

export type PricingInvariantIssue = {
  serviceId: string;
  issue: string;
  severity: "error" | "warning";
};

const priceLayerKeys = [
  "entryPrice",
  "diagnosticPrice",
  "quotePrice",
  "contractPrice",
  "packagePrice",
  "subscriptionPrice",
] as const;

function hasNumericPriceData(price: PriceAmount): boolean {
  return (
    Object.prototype.hasOwnProperty.call(price, "value") ||
    Object.prototype.hasOwnProperty.call(price, "min") ||
    Object.prototype.hasOwnProperty.call(price, "max")
  );
}

function validateItem(
  item: ServicePricingItem,
  seenIds: Set<string>,
): PricingInvariantIssue[] {
  const issues: PricingInvariantIssue[] = [];

  if (seenIds.has(item.id)) {
    issues.push({
      serviceId: item.id,
      issue: "Service pricing item id is duplicated.",
      severity: "error",
    });
  }

  seenIds.add(item.id);

  if (isPublicApproved(item.publicStatus)) {
    issues.push({
      serviceId: item.id,
      issue: "Matrix item must not be PUBLIC_APPROVED during Stage 3A.",
      severity: "error",
    });
  }

  if (isInternalApproved(item.quoteStatus)) {
    issues.push({
      serviceId: item.id,
      issue: "Matrix item must not have internal-approved quote status during Stage 3A.",
      severity: "error",
    });
  }

  if (isInternalApproved(item.contractStatus)) {
    issues.push({
      serviceId: item.id,
      issue: "Matrix item must not have internal-approved contract status during Stage 3A.",
      severity: "error",
    });
  }

  for (const layerKey of priceLayerKeys) {
    const amount = item.priceLayers[layerKey];

    if (amount.status === "HOLD" && hasNumericPriceData(amount)) {
      issues.push({
        serviceId: item.id,
        issue: `HOLD price layer ${layerKey} contains numeric price data.`,
        severity: "error",
      });
    }
  }

  if (
    !isPublicApproved(item.publicStatus) &&
    (item.allowedVisibility.includes("public_site") ||
      item.allowedVisibility.includes("public_ads"))
  ) {
    issues.push({
      serviceId: item.id,
      issue: "Public visibility is present while public status is not approved.",
      severity: "error",
    });
  }

  if (item.route && !approvedPricingRoutes.includes(item.route as never)) {
    issues.push({
      serviceId: item.id,
      issue: `Route ${item.route} is not listed in the approved pricing route set.`,
      severity: "error",
    });
  }

  if (item.safePublicWording.length === 0) {
    issues.push({
      serviceId: item.id,
      issue: "Safe public wording is missing.",
      severity: "warning",
    });
  }

  if (item.forbiddenPublicWording.length === 0) {
    issues.push({
      serviceId: item.id,
      issue: "Forbidden public wording is missing.",
      severity: "warning",
    });
  }

  return issues;
}

export function validatePricingMatrix(): PricingInvariantIssue[] {
  const seenIds = new Set<string>();

  return servicePricingMatrix.flatMap((item) => validateItem(item, seenIds));
}
