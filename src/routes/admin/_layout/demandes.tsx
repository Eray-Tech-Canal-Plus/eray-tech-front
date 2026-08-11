import { createFileRoute } from "@tanstack/react-router";
import Demandes from "@/admin/pages/Demandes";

export const Route = createFileRoute("/admin/_layout/demandes")({
  component: Demandes,
});
