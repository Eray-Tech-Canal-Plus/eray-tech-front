import { createFileRoute } from "@tanstack/react-router";
import Reservations from "@/admin/pages/Reservations";

export const Route = createFileRoute("/admin/_layout/reservations")({
  component: Reservations,
});
