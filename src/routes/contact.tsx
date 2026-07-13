import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/contact")({
  component: ContactLayout,
});

function ContactLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <main className="flex flex-1 flex-col px-4 py-8 sm:px-6 lg:px-10">
        <Outlet />
      </main>

      <footer className="mt-auto border-t border-border/40 bg-background px-6 py-6 text-center text-xs text-muted-foreground lg:px-10">
        <p>© {new Date().getFullYear()} NEXT TECH &amp; SERVICES. Tous droits réservés.</p>
      </footer>
    </div>
  );
}
