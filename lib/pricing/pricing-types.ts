import type { PricingStatus, PriceVisibilityScope } from "./pricing-status";

export type CurrencyCode = "RUB";

export type HoldPriceAmount = {
  status: "HOLD";
  currency: CurrencyCode;
  note: string;
  value?: never;
  min?: never;
  max?: never;
  approvedBy?: never;
  approvedAt?: never;
  source?: never;
};

export type ApprovedPriceAmount = {
  status: "APPROVED_INTERNAL" | "PUBLIC_APPROVED";
  currency: CurrencyCode;
  value?: number;
  min?: number;
  max?: number;
  note?: string;
  approvedBy: string;
  approvedAt: string;
  source: string;
};

export type PriceAmount = HoldPriceAmount | ApprovedPriceAmount;

export type PricingModel =
  | "fixed"
  | "from"
  | "range"
  | "custom_after_review"
  | "subscription"
  | "package"
  | "diagnostic_first"
  | "not_public";

export type RouteStatus =
  | "approved_route"
  | "route_candidate"
  | "no_public_route"
  | "route_hold";

export type PriceLayer = {
  entryPrice: PriceAmount;
  diagnosticPrice: PriceAmount;
  quotePrice: PriceAmount;
  contractPrice: PriceAmount;
  packagePrice: PriceAmount;
  subscriptionPrice: PriceAmount;
};

export type PriceDriver = {
  key: string;
  title: string;
  description: string;
  status: "HOLD" | "DRAFT_INTERNAL" | "APPROVED_INTERNAL";
  affects: "increase" | "decrease" | "range" | "qualification";
};

export type ServicePricingItem = {
  id: string;
  title: string;
  contourKey: string;
  route?: string;
  routeStatus: RouteStatus;
  pricingModel: PricingModel;
  publicStatus: PricingStatus;
  quoteStatus: PricingStatus;
  contractStatus: PricingStatus;
  allowedVisibility: PriceVisibilityScope[];
  priceLayers: PriceLayer;
  priceDrivers: PriceDriver[];
  quoteInputs: string[];
  safePublicWording: string[];
  forbiddenPublicWording: string[];
  sequenceCandidates: string[];
  leadHookCandidates: string[];
  ownerQuestions: string[];
  notes?: string;
};

export function holdPrice(note: string): HoldPriceAmount {
  return {
    status: "HOLD",
    currency: "RUB",
    note,
  };
}
