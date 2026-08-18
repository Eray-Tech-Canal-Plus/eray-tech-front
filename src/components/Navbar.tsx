import { Link } from "@tanstack/react-router";
import { MessageCircle, Phone, Menu, X } from "lucide-react";
import { useState } from "react";

const NAV_ITEMS = [
  { label: "Accueil", to: "/" as const },
  { label: "Boutique", to: "/boutique" as const },
  { label: "Blog", to: "/blog" as const },
  { label: "Services", to: "/canal" as const },
  { label: "Contact", to: "/contact" as const },
] as const;

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 lg:px-10">
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/images/logo-area.png"
            alt="NEXT TECH & SERVICES"
            className="h-14 w-auto object-contain object-left md:h-16"
          />
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-foreground/90 md:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              activeProps={{ className: "text-primary" }}
              activeOptions={{ exact: item.to === "/" }}
              className="transition-colors hover:text-primary focus:outline-none"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="tel:+221000000000"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-2 text-sm font-medium transition-colors hover:border-primary/40 hover:bg-card focus:outline-none"
          >
            <Phone className="h-4 w-4 text-primary" />
            <span className="hidden sm:inline">Nous appeler</span>
          </a>
          <a
            href="https://wa.me/221000000000"
            aria-label="WhatsApp"
            className="grid h-10 w-10 place-items-center rounded-full bg-[oklch(0.62_0.19_145)] text-white transition-transform hover:scale-105 focus:outline-none"
          >
            <MessageCircle className="h-5 w-5" />
          </a>
          <button
            onClick={() => setOpen(!open)}
            className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card/60 text-foreground transition-colors hover:bg-card focus:outline-none md:hidden"
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur-sm">
          <nav className="flex flex-col px-6 py-4 gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                activeProps={{ className: "text-primary bg-primary/5" }}
                activeOptions={{ exact: item.to === "/" }}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-medium text-foreground/80 transition-colors hover:text-primary hover:bg-primary/5 focus:outline-none"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
