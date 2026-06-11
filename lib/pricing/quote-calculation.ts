import {
  documentReviewServiceIds,
  findServicePricingItem,
} from "./service-pricing-matrix";
import { canUseInQuote } from "./visibility-guards";

export type QuoteCalculationInput = {
  serviceId: string;
  clientType?: "ip" | "ooo" | "unknown";
  urgency?: "normal" | "urgent" | "unknown";
  hasDocuments?: boolean;
  complexity?: "low" | "medium" | "high" | "unknown";
  bundleServiceIds?: string[];
  channel?: string;
  manualAdjustmentReason?: string;
};

export type QuoteCalculationResult =
  | {
      status: "HOLD" | "NEEDS_OWNER_REVIEW" | "NEEDS_DOCUMENT_REVIEW";
      serviceId: string;
      reason: string;
      missingInputs: string[];
      safeClientMessage: string;
    }
  | {
      status: "CALCULATED_INTERNAL";
      serviceId: string;
      amount?: number;
      min?: number;
      max?: number;
      currency: "RUB";
      assumptions: string[];
      warnings: string[];
    };

const safeClientMessage =
  "Стоимость можно определить после уточнения вводных и просмотра документов.";

export function calculateQuote(
  input: QuoteCalculationInput,
): QuoteCalculationResult {
  const item = findServicePricingItem(input.serviceId);

  if (!item) {
    return {
      status: "HOLD",
      serviceId: input.serviceId,
      reason: "Service pricing item was not found in the internal matrix.",
      missingInputs: ["service_id"],
      safeClientMessage,
    };
  }

  const missingInputs = item.quoteInputs.filter((field) => {
    if (field === "client_type") {
      return !input.clientType || input.clientType === "unknown";
    }

    if (field === "documents_available") {
      return input.hasDocuments !== true;
    }

    return false;
  });

  if (
    documentReviewServiceIds.includes(
      input.serviceId as (typeof documentReviewServiceIds)[number],
    ) &&
    input.hasDocuments !== true
  ) {
    return {
      status: "NEEDS_DOCUMENT_REVIEW",
      serviceId: item.id,
      reason: "Document review is required before quote preparation.",
      missingInputs: Array.from(new Set([...missingInputs, "documents_available"])),
      safeClientMessage,
    };
  }

  const quoteGuard = canUseInQuote(item);

  if (!quoteGuard.allowed) {
    return {
      status: "NEEDS_OWNER_REVIEW",
      serviceId: item.id,
      reason: quoteGuard.reason,
      missingInputs,
      safeClientMessage,
    };
  }

  return {
    status: "CALCULATED_INTERNAL",
    serviceId: item.id,
    currency: "RUB",
    assumptions: [
      "Internal approved pricing would be required before numeric output.",
    ],
    warnings: [
      "This skeleton must not expose live prices while any required layer is HOLD.",
    ],
  };
}
