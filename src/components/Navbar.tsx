import { Link } from "@tanstack/react-router";
import { MessageCircle, Phone } from "lucide-react";

const NAV_ITEMS = [
  { label: "Accueil", to: "/" as const },
  { label: "Services", to: "/" as const, hash: "services" as const },
  { label: "Boutique", to: "/boutique" as const },
  { label: "Blog", to: "/blog" as const },
  { label: "Canal+", to: "/canal" as const },
  { label: "Contact", to: "/contact" as const },
];

export default function Navbar() {
  return (
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
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              {...(item.hash ? { hash: item.hash } : {})}
              activeProps={{ className: "text-primary" }}
              activeOptions={{ exact: item.to === "/", includeHash: !!item.hash }}
              className="transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
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
  );
}
