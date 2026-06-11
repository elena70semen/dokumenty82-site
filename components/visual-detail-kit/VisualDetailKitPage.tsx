import { AvatarBadgeShowcase } from "@/components/visual-detail-kit/AvatarBadgeShowcase";
import { BackgroundSurfaceShowcase } from "@/components/visual-detail-kit/BackgroundSurfaceShowcase";
import { BannerElementsShowcase } from "@/components/visual-detail-kit/BannerElementsShowcase";
import { BlockElementsShowcase } from "@/components/visual-detail-kit/BlockElementsShowcase";
import { HeaderFooterShowcase } from "@/components/visual-detail-kit/HeaderFooterShowcase";
import { IconSystemShowcase } from "@/components/visual-detail-kit/IconSystemShowcase";
import { MicrodetailsShowcase } from "@/components/visual-detail-kit/MicrodetailsShowcase";
import { TypographyShowcase } from "@/components/visual-detail-kit/TypographyShowcase";
import { VisualDetailDecisionPanel } from "@/components/visual-detail-kit/VisualDetailDecisionPanel";
import { VisualDetailHero } from "@/components/visual-detail-kit/VisualDetailHero";

export function VisualDetailKitPage() {
  return (
    <main className="overflow-hidden">
      <VisualDetailHero />
      <IconSystemShowcase />
      <AvatarBadgeShowcase />
      <BackgroundSurfaceShowcase />
      <TypographyShowcase />
      <MicrodetailsShowcase />
      <HeaderFooterShowcase />
      <BlockElementsShowcase />
      <BannerElementsShowcase />
      <VisualDetailDecisionPanel />
    </main>
  );
}
