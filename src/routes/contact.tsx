import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/contact")({
  component: ContactLayout,
});

function ContactLayout() {
  return (
    <div className="flex flex-col bg-background text-foreground">
      <main className="flex flex-1 flex-col px-4 py-8 sm:px-6 lg:px-10">
        <Outlet />
      </main>
    </div>
  );
}
