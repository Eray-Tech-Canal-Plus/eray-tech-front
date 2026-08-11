import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AuthProvider } from "@/admin/auth";

export const Route = createFileRoute("/admin")({
  component: AdminRoute,
});

function AdminRoute() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}
