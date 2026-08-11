import { createFileRoute } from "@tanstack/react-router";
import Contacts from "@/admin/pages/Contacts";

export const Route = createFileRoute("/admin/_layout/contacts")({
  component: Contacts,
});
