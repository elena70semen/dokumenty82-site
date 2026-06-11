import type { Metadata } from "next";
import { VisualDetailKitPage } from "@/components/visual-detail-kit/VisualDetailKitPage";

export const metadata: Metadata = {
  title: "Internal visual detail kit - not public",
  description: "Internal Stage11A visual detail kit for icons, backgrounds, typography, header, footer, blocks and banners.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false
    }
  },
  alternates: {
    canonical: "/internal/visual-detail-kit/"
  }
};

export default function InternalVisualDetailKitRoute() {
  return <VisualDetailKitPage />;
}
