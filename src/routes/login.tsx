import { createFileRoute, useNavigate } from "@tanstack/react-router";
import AdminLoginForm from "../components/admin/AdminLoginForm";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

export default function LoginPage() {
  const navigate = useNavigate();

  return (
    <AdminLoginForm
      onLoginSuccess={() => {
        navigate({ to: "/admin" });
      }}
    />
  );
}
