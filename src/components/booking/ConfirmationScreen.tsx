import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { Service } from "./types";

type Props = {
  service: Service;
  fullName: string;
  date: Date | undefined;
  slot: string | undefined;
  onReset: () => void;
};

export function ConfirmationScreen({ service, fullName, date, slot, onReset }: Props) {
  const firstName = fullName.split(" ")[0];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="max-w-lg w-full text-center bg-card border border-border rounded-2xl p-10 shadow-xl">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-pink/10 text-pink mb-6">
          <CheckCircle2 className="h-9 w-9" />
        </div>

        <h1 className="text-3xl font-bold tracking-tight">Réservation confirmée</h1>

        <p className="mt-3 text-muted-foreground">
          Merci {firstName}. Votre installation <strong>{service.name}</strong> est
          programmée le{" "}
          <strong>
            {date && format(date, "EEEE d MMMM yyyy", { locale: fr })}
          </strong>{" "}
          — créneau <strong>{slot}</strong>.
        </p>

        <p className="mt-2 text-sm text-muted-foreground">
          Un email de confirmation vous a été envoyé.
        </p>

        <Button
          className="mt-8 bg-pink text-pink-foreground hover:bg-pink/90"
          onClick={onReset}
        >
          Nouvelle réservation
        </Button>
      </div>
    </div>
  );
}