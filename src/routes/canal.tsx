import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { HeroSection } from "@/components/canal/HeroSection";
import { BandeauSection } from "@/components/canal/BandeauSection";
import { ForWhoSection } from "@/components/canal/ForWhoSection";
import { ExpertSection } from "@/components/canal/ExpertSection";
import { FinalCta } from "@/components/canal/FinalCta";
export const Route = createFileRoute("/canal")({
  head: () => ({
    meta: [
      { title: "Installation Canal+ | Pose d'antenne satellite & décodeur" },
      {
        name: "description",
        content:
          "Découvrez l'offre Canal+ et réservez votre installation : pose d'antenne parabolique, réglage satellite et mise en service du décodeur par des experts.",
      },
      { property: "og:title", content: "Installation Canal+ | Pose d'antenne satellite & décodeur" },
      {
        property: "og:description",
        content:
          "Réservez votre installation Canal+ : pose d'antenne, réglage satellite et mise en service du décodeur. Devis gratuit et intervention rapide.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CanalLanding,
});
function CanalLanding() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <BandeauSection />
      <ForWhoSection />
      <ExpertSection />
      <FinalCta />
      <Toaster />
    </main>
  );
}