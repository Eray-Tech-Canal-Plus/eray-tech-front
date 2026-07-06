import { Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function BookingHeader() {
  return (
    <header className="border-b border-border bg-background/80 backdrop-blur sticky top-0 z-40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-foreground text-background grid place-items-center font-black">
            C+
          </div>
          <span className="font-semibold tracking-tight">CANAL+ Installation</span>
        </div>

        <Badge className="bg-pink/10 text-pink hover:bg-pink/15 border-0">
          <Sparkles className="h-3 w-3 mr-1" /> Offres en cours
        </Badge>
      </div>
    </header>
  );
}

export function BookingHero() {
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 pt-10 pb-6">
      <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
        Réservez votre <span className="text-pink">installation</span> à domicile
      </h1>
      <p className="mt-3 text-muted-foreground max-w-2xl">
        Un technicien Canal+ certifié se déplace chez vous. Choisissez la date, le
        créneau et confirmez en quelques secondes.
      </p>
    </section>
  );
}