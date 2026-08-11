import { createFileRoute } from "@tanstack/react-router";
import Phones from "@/admin/pages/Phones";

export const Route = createFileRoute("/admin/_layout/phones")({
  component: Phones,
});
