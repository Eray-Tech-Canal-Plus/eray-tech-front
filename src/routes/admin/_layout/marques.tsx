import { createFileRoute } from "@tanstack/react-router";
import Marques from "@/admin/pages/Marques";

export const Route = createFileRoute("/admin/_layout/marques")({
  component: Marques,
});
