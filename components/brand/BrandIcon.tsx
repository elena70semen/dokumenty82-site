import type { ReactNode, SVGProps } from "react";

export type BrandIconName =
  | "document"
  | "reporting"
  | "bank"
  | "registration"
  | "hr"
  | "recovery"
  | "route"
  | "location"
  | "phone"
  | "folder"
  | "shield"
  | "question";

export type BrandIconProps = {
  name: BrandIconName;
  size?: 16 | 20 | 24 | 32;
  decorative?: boolean;
  title?: string;
  className?: string;
};

const iconPaths: Record<BrandIconName, ReactNode> = {
  document: (
    <>
      <path d="M7 3.5h7l3 3V20.5H7z" />
      <path d="M14 3.5v4h4" />
      <path d="M9.5 11h5" />
      <path d="M9.5 15h4" />
    </>
  ),
  reporting: (
    <>
      <path d="M5 19V5" />
      <path d="M5 19h15" />
      <path d="M8 16v-4" />
      <path d="M12 16V8" />
      <path d="M16 16v-6" />
    </>
  ),
  bank: (
    <>
      <path d="M4.5 9h15" />
      <path d="M6 18.5h12" />
      <path d="M7 9v8" />
      <path d="M12 9v8" />
      <path d="M17 9v8" />
      <path d="M5 7.5 12 4l7 3.5" />
    </>
  ),
  registration: (
    <>
      <path d="M5 6.5h8" />
      <path d="M5 11h7" />
      <path d="M5 15.5h5" />
      <path d="M15 14.5h4" />
      <path d="M17 12.5v4" />
      <path d="M4 3.5h12.5L20 7v13H4z" />
    </>
  ),
  hr: (
    <>
      <path d="M9 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
      <path d="M4.5 19.5c.7-3.3 2.2-5 4.5-5s3.8 1.7 4.5 5" />
      <path d="M15.5 8.5h4" />
      <path d="M17.5 6.5v4" />
      <path d="M15.5 15h4" />
    </>
  ),
  recovery: (
    <>
      <path d="M7 8.2A6 6 0 1 1 6.5 16" />
      <path d="M7 4.8v3.4H3.6" />
      <path d="M9.5 12h5" />
      <path d="M12 9.5v5" />
    </>
  ),
  route: (
    <>
      <path d="M5 6.5h5.5c2 0 3 1 3 2.7s-1 2.8-3 2.8h-1c-2 0-3 1-3 2.8s1 2.7 3 2.7H19" />
      <path d="M5 6.5l2-2" />
      <path d="M5 6.5l2 2" />
      <path d="M19 17.5l-2-2" />
      <path d="M19 17.5l-2 2" />
    </>
  ),
  location: (
    <>
      <path d="M12 21s6-5.4 6-11a6 6 0 0 0-12 0c0 5.6 6 11 6 11Z" />
      <path d="M12 12.5a2.3 2.3 0 1 0 0-4.6 2.3 2.3 0 0 0 0 4.6Z" />
    </>
  ),
  phone: (
    <>
      <path d="M7 4.5 9.4 4l2 4-1.7 1.3a10.5 10.5 0 0 0 5 5L16 12.6l4 2-.5 2.4c-.2 1.2-1.2 2-2.4 2A12.1 12.1 0 0 1 5 6.9c0-1.2.8-2.2 2-2.4Z" />
    </>
  ),
  folder: (
    <>
      <path d="M4 6.5h6l1.6 2H20v9.5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" />
      <path d="M4 10h16" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3.5 19 6v5.2c0 4-2.4 7.1-7 9.3-4.6-2.2-7-5.3-7-9.3V6z" />
      <path d="m9.2 12.2 1.9 1.9 3.8-4" />
    </>
  ),
  question: (
    <>
      <path d="M9.2 9a3 3 0 1 1 4.8 2.4c-1.2.8-1.8 1.4-1.8 2.8" />
      <path d="M12 18h.01" />
      <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" />
    </>
  )
};

export function BrandIcon({ name, size = 24, decorative = true, title, className }: BrandIconProps) {
  const ariaProps: SVGProps<SVGSVGElement> = decorative
    ? { "aria-hidden": true }
    : { role: "img", "aria-label": title ?? name };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...ariaProps}
    >
      {!decorative && title ? <title>{title}</title> : null}
      {iconPaths[name]}
    </svg>
  );
}
