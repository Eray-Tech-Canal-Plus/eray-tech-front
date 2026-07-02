import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { HeroSection } from "@/components/canal/HeroSection";
import { BandeauSection } from "@/components/canal/BandeauSection";
import { ForWhoSection } from "@/components/canal/ForWhoSection";
import { ExpertSection } from "@/components/canal/ExpertSection";
import { FinalCta } from "@/components/canal/FinalCta";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
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
