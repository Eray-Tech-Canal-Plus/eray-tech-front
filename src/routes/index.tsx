import { createFileRoute } from "@tanstack/react-router";
import BookingPage from "@/components/booking/BookingPage";

export const Route = createFileRoute("/")({
  component: BookingPage,
  head: () => ({
    meta: [
      { title: "Canal+ — Réserver votre installation à domicile" },
      {
        name: "description",
        content:
          "Réservez en quelques clics l'installation Canal+ chez vous : choisissez la date, l'heure et confirmez votre rendez-vous.",
      },
    ],
  }),
});