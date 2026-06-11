import { isInternalApproved, isPublicApproved } from "./pricing-status";
import type { ServicePricingItem } from "./pricing-types";

export type VisibilityGuardResult = {
  allowed: boolean;
  reason: string;
};

function blocked(reason: string): VisibilityGuardResult {
  return { allowed: false, reason };
}

function allowed(reason: string): VisibilityGuardResult {
  return { allowed: true, reason };
}

export function canUseInQuote(
  item: ServicePricingItem,
): VisibilityGuardResult {
  if (!isInternalApproved(item.quoteStatus)) {
    return blocked(
      `Quote use is blocked for ${item.id}: quoteStatus is ${item.quoteStatus}.`,
    );
  }

  return allowed(`Quote use is allowed for ${item.id}.`);
}

export function canUseInCommercialProposal(
  item: ServicePricingItem,
): VisibilityGuardResult {
  const quoteGuard = canUseInQuote(item);

  if (!quoteGuard.allowed) {
    return blocked(
      `Commercial proposal use is blocked for ${item.id}: ${quoteGuard.reason}`,
    );
  }

  return allowed(`Commercial proposal use is allowed for ${item.id}.`);
}

export function canUseInContract(
  item: ServicePricingItem,
): VisibilityGuardResult {
  if (!isInternalApproved(item.contractStatus)) {
    return blocked(
      `Contract use is blocked for ${item.id}: contractStatus is ${item.contractStatus}.`,
    );
  }

  return allowed(`Contract use is allowed for ${item.id}.`);
}

export function canUseOnPublicSite(
  item: ServicePricingItem,
): VisibilityGuardResult {
  if (!isPublicApproved(item.publicStatus)) {
    return blocked(
      `Public site use is blocked for ${item.id}: publicStatus is ${item.publicStatus}.`,
    );
  }

  return allowed(`Public site use is allowed for ${item.id}.`);
}

export function canUseInPublicAds(
  item: ServicePricingItem,
): VisibilityGuardResult {
  if (!isPublicApproved(item.publicStatus)) {
    return blocked(
      `Public ads use is blocked for ${item.id}: publicStatus is ${item.publicStatus}.`,
    );
  }

  return allowed(`Public ads use is allowed for ${item.id}.`);
}

export function assertNoPublicPriceWithoutApproval(
  item: ServicePricingItem,
): void {
  const siteGuard = canUseOnPublicSite(item);
  const adsGuard = canUseInPublicAds(item);

  if (!siteGuard.allowed || !adsGuard.allowed) {
    throw new Error(
      `Public pricing is blocked for ${item.id}: ${siteGuard.reason} ${adsGuard.reason}`,
    );
  }
}
