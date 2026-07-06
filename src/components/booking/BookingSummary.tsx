import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarIcon, Clock, MapPin, Package } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

import { formatAriary } from "./data";
import { SummaryRow } from "./shared";
import type { ContactInfo, Service } from "./types";

type Props = {
  service: Service;
  contact: ContactInfo;
  date: Date | undefined;
  slot: string | undefined;
  onSubmit: () => void;
};

export function BookingSummary({ service, contact, date, slot, onSubmit }: Props) {
  const finalPrice = service.promo ? service.promo.price : service.price;
  const hasAddress = contact.address || contact.postal || contact.city;

  return (
    <aside className="lg:sticky lg:top-24 h-fit">
      <div className="rounded-2xl border border-border bg-card shadow-xl overflow-hidden">
        <div className="bg-foreground text-background px-6 py-5">
          <p className="text-xs uppercase tracking-widest opacity-70">Récapitulatif</p>
          <p className="text-lg font-semibold mt-1">Votre réservation</p>
        </div>

        <div className="p-6 space-y-4 text-sm">
          <SummaryRow icon={Package} label="Service">
            <span className="font-medium">{service.name}</span>
          </SummaryRow>

          <SummaryRow icon={MapPin} label="Adresse">
            <span className="font-medium text-right">
              {hasAddress ? (
                <>
                  {contact.address || "—"}
                  <br />
                  {contact.postal} {contact.city}
                </>
              ) : (
                <span className="text-muted-foreground italic">À compléter</span>
              )}
            </span>
          </SummaryRow>

          <SummaryRow icon={CalendarIcon} label="Date">
            <span className="font-medium">
              {date ? (
                format(date, "d MMM yyyy", { locale: fr })
              ) : (
                <span className="text-muted-foreground italic">À choisir</span>
              )}
            </span>
          </SummaryRow>

          <SummaryRow icon={Clock} label="Heure">
            <span className="font-medium">
              {slot ?? <span className="text-muted-foreground italic">À choisir</span>}
            </span>
          </SummaryRow>

          <Separator />

          <div className="flex items-baseline justify-between">
            <span className="text-muted-foreground">Sous-total</span>
            <span className={cn(service.promo && "line-through text-muted-foreground")}>
              {formatAriary(service.price)}
            </span>
          </div>

          {service.promo && (
            <div className="flex items-baseline justify-between text-pink">
              <span>Promotion {service.promo.label}</span>
              <span>
                -{formatAriary(service.price - service.promo.price)}
              </span>
            </div>
          )}

          <Separator />

          <div className="flex items-baseline justify-between">
            <span className="font-semibold">Total à payer</span>
            <span className="text-2xl font-bold">{formatAriary(finalPrice)}</span>
          </div>

          <Button
            onClick={onSubmit}
            className="w-full h-12 text-base bg-pink text-pink-foreground hover:bg-pink/90 shadow-lg shadow-pink/20"
          >
            Confirmer la réservation
          </Button>

          <p className="text-[11px] text-center text-muted-foreground">
            Aucune carte requise — paiement le jour de l'installation.
          </p>
        </div>
      </div>
    </aside>
  );
}