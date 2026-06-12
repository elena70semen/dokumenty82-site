import { analyticsConfig } from "@/lib/integrations/analytics-config";

export function YandexMetrika() {
  if (!analyticsConfig.canLoadScript) return null;

  return null;
}
