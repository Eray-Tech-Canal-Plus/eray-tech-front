import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { MessageCircle, Phone } from "lucide-react";

export const Route = createFileRoute("/contact")({
  component: ContactLayout,
});

function ContactLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 lg:px-10">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/images/logo-area.svg"
              alt="NEXT TECH & SERVICES"
              className="h-10 w-auto object-contain object-left"
            />
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-medium text-foreground/90 md:flex">
            <Link to="/" className="transition-colors hover:text-primary">
              Accueil
            </Link>
            <Link to="/" hash="services" className="transition-colors hover:text-primary">
              Services
            </Link>
            <Link to="/" hash="about" className="transition-colors hover:text-primary">
              À propos
            </Link>
            <Link to="/contact" className="text-primary">
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="tel:+221000000000"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-2 text-sm font-medium transition-colors hover:border-primary/40 hover:bg-card"
            >
              <Phone className="h-4 w-4 text-primary" />
              <span className="hidden sm:inline">Nous appeler</span>
            </a>
            <a
              href="https://wa.me/221000000000"
              aria-label="WhatsApp"
              className="grid h-10 w-10 place-items-center rounded-full bg-[oklch(0.62_0.19_145)] text-white transition-transform hover:scale-105"
            >
              <MessageCircle className="h-5 w-5" />
            </a>
          </div>
        </div>
      </header>

      <main className="flex flex-1 flex-col px-4 py-8 sm:px-6 lg:px-10">
        <Outlet />
      </main>

      <footer className="mt-auto border-t border-border/40 bg-background px-6 py-6 text-center text-xs text-muted-foreground lg:px-10">
        <p>© {new Date().getFullYear()} NEXT TECH &amp; SERVICES. Tous droits réservés.</p>
      </footer>
    </div>
  );
}
