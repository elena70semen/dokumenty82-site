"use client";

import { useEffect } from "react";
import { captureAttributionFromLocation } from "@/lib/tracking/attribution";

export function AttributionCapture() {
  useEffect(() => {
    captureAttributionFromLocation();
  }, []);

  return null;
}
