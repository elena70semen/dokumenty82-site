import type { Metadata } from "next";
import { GraphicsProofPage } from "@/components/graphics-proof/GraphicsProofPage";

export const metadata: Metadata = {
  title: "Internal graphics proof - not public",
  description: "Internal Stage 09 proof route for applying the graphics system. Not for public release.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false
    }
  },
  alternates: {
    canonical: "/internal/graphics-proof/"
  }
};

export default function InternalGraphicsProofRoute() {
  return <GraphicsProofPage />;
}
