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
      { title: "Canal+ — Landing" },
      { name: "description", content: "Découvrez l'offre Canal+ et réservez votre installation." },
    ],
  }),
  component: CanalLanding,
});

function CanalLanding() {
  return (
    <div className="theme-canal-lp">
      <main className="min-h-screen bg-background">
        <HeroSection />
        <BandeauSection />
        <ForWhoSection />
        <ExpertSection />
        <FinalCta />
        <Toaster />
      </main>
    </div>
  );
}