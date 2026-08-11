import { createFileRoute } from "@tanstack/react-router";
import Services from "@/admin/pages/Services";

export const Route = createFileRoute("/admin/_layout/services")({
  component: Services,
});
