import { Link } from "@tanstack/react-router";
import { MessageCircle, Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";

const NAV_LINKS = [
  { label: "Accueil", to: "/" as const },
  { label: "Boutique", to: "/boutique" as const },
  { label: "Blog", to: "/blog" as const },
  { label: "Services", to: "/canal" as const },
  { label: "Contact", to: "/contact" as const },
];

const SERVICE_LINKS = [
  { label: "Installation Canal+", to: "/contact/installation" as const },
  { label: "Boutique Téléphones", to: "/contact/telephone" as const },
  { label: "Réservation", to: "/reservation" as const },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-border/40 bg-surface">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="inline-flex items-center gap-3">
              <img
                src="/images/logo-area.svg"
                alt="NEXT TECH & SERVICES"
                className="h-9 w-auto object-contain"
              />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Votre partenaire technologie au Sénégal. Installation Canal+, smartphones et services à domicile.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href="tel:+221000000000"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-card/50 text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                aria-label="Téléphone"
              >
                <Phone className="h-4 w-4" />
              </a>
              <a
                href="https://wa.me/221000000000"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-card/50 text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                aria-label="WhatsApp"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
              <a
                href="mailto:contact@nexttech.sn"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-card/50 text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                aria-label="Email"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-foreground">
              Navigation
            </h3>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="group inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-foreground">
              Nos services
            </h3>
            <ul className="mt-4 space-y-2.5">
              {SERVICE_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="group inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-foreground">
              Contact
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href="tel:+221000000000"
                  className="flex items-start gap-3 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  +221 00 000 00 00
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/221000000000"
                  className="flex items-start gap-3 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@nexttech.sn"
                  className="flex items-start gap-3 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  contact@nexttech.sn
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                Dakar, Sénégal
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-border/40 py-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} NEXT TECH &amp; SERVICES. Tous droits réservés.</p>
          <div className="flex gap-5">
            <button className="transition-colors hover:text-primary">Mentions légales</button>
            <button className="transition-colors hover:text-primary">Politique de confidentialité</button>
            <button className="transition-colors hover:text-primary">CGV</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
