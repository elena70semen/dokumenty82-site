"use client";

import Link from "next/link";
import type { MouseEventHandler, ReactNode } from "react";
import { getStoredAttribution } from "@/lib/tracking/attribution";
import { defaultEventNameForCollector } from "@/lib/tracking/event-context";
import { trackSafeEvent } from "@/lib/tracking/tracking-adapter";
import type { CollectorType, SafeTrackingEventName, TrackingContext } from "@/lib/tracking/event-context";

type TrackedActionProps = {
  href?: string;
  children: ReactNode;
  className?: string;
  id?: string;
  type?: "button" | "submit";
  pageSlug: string;
  pageType: string;
  ctaLabel: string;
  ctaLocation: string;
  leadTopic?: string;
  collectorType: CollectorType;
  contactChannel?: string;
  fromPageSlug?: string;
  toPageSlug?: string;
  eventName?: SafeTrackingEventName;
  ariaDescribedBy?: string;
  onClick?: () => void;
};

function isInternalRoute(href: string) {
  return href.startsWith("/") && !href.startsWith("//");
}

export function TrackedAction({
  href,
  children,
  className,
  id,
  type = "button",
  pageSlug,
  pageType,
  ctaLabel,
  ctaLocation,
  leadTopic,
  collectorType,
  contactChannel,
  fromPageSlug,
  toPageSlug,
  eventName,
  ariaDescribedBy,
  onClick
}: TrackedActionProps) {
  const trackingContext: TrackingContext = {
    page_slug: pageSlug,
    page_type: pageType,
    cta_label: ctaLabel,
    cta_location: ctaLocation,
    lead_topic: leadTopic ?? pageSlug,
    collector_type: collectorType,
    ...(contactChannel ? { contact_channel: contactChannel } : {}),
    ...(fromPageSlug ? { from_page_slug: fromPageSlug } : {}),
    ...(toPageSlug ? { to_page_slug: toPageSlug } : {})
  };
  const resolvedEventName = eventName ?? defaultEventNameForCollector(collectorType);
  const trackingAttrs = {
    "data-tracked-action": "true",
    "data-event-name": resolvedEventName,
    "data-page-slug": trackingContext.page_slug,
    "data-page-type": trackingContext.page_type,
    "data-cta-label": trackingContext.cta_label,
    "data-cta-location": trackingContext.cta_location,
    "data-lead-topic": trackingContext.lead_topic,
    "data-collector-type": trackingContext.collector_type,
    ...(contactChannel ? { "data-contact-channel": contactChannel } : {}),
    ...(fromPageSlug ? { "data-from-page-slug": fromPageSlug } : {}),
    ...(toPageSlug ? { "data-to-page-slug": toPageSlug } : {})
  };

  const handleClick: MouseEventHandler<HTMLElement> = () => {
    trackSafeEvent(resolvedEventName, trackingContext, getStoredAttribution());
    onClick?.();
  };

  if (!href) {
    return (
      <button
        id={id}
        type={type}
        className={className}
        aria-describedby={ariaDescribedBy}
        onClick={handleClick as MouseEventHandler<HTMLButtonElement>}
        {...trackingAttrs}
      >
        {children}
      </button>
    );
  }

  if (isInternalRoute(href)) {
    return (
      <Link
        id={id}
        href={href}
        className={className}
        aria-describedby={ariaDescribedBy}
        onClick={handleClick as MouseEventHandler<HTMLAnchorElement>}
        {...trackingAttrs}
      >
        {children}
      </Link>
    );
  }

  return (
    <a
      id={id}
      href={href}
      className={className}
      aria-describedby={ariaDescribedBy}
      onClick={handleClick as MouseEventHandler<HTMLAnchorElement>}
      {...trackingAttrs}
    >
      {children}
    </a>
  );
}
