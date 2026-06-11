import { HomeHero } from "@/components/home/HomeHero";
import { HomeLocalContact } from "@/components/home/HomeLocalContact";
import { HomeMaterialsPreview } from "@/components/home/HomeMaterialsPreview";
import { HomeProcess } from "@/components/home/HomeProcess";
import { HomeRouteCards } from "@/components/home/HomeRouteCards";

export function HomePage() {
  return (
    <main id="main-content">
      <HomeHero />
      <HomeRouteCards />
      <HomeProcess />
      <HomeMaterialsPreview />
      <HomeLocalContact />
    </main>
  );
}
