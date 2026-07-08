import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Phone,
  ArrowRight,
  Satellite,
  Tv,
  Headphones,
  Users,
  ShieldCheck,
  ThumbsUp,
  MessageCircle,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Home,
});

type ServiceId = "canal" | "phones" | "banking";

type Service = {
  id: ServiceId;
  tag: string;
  title: string;
  short: string;
  description: string;
  cta: string;
  image: string;
  accentClass: string;
  tagClass: string;
  btnClass: string;
  features?: { icon: typeof Satellite; label: string }[];
};

const services: Service[] = [
  {
    id: "canal",
    tag: "SERVICE PRINCIPAL",
    title: "Installation CANAL+",
    short: "Canal+",
    description: "Installation, activation et assistance Canal+ à domicile par des professionnels.",
    cta: "Demander une installation",
    image: "/images/hero-canal.png",
    accentClass: "text-canal",
    tagClass: "bg-canal/20 text-canal border-canal/30",
    btnClass: "bg-gradient-to-r from-[oklch(0.72_0.17_55)] to-[oklch(0.62_0.17_50)] hover:brightness-110",
    features: [
      { icon: Satellite, label: "Installation parabole" },
      { icon: Tv, label: "Activation décodeur" },
      { icon: Headphones, label: "Assistance 7j/7" },
    ],
  },
  {
    id: "phones",
    tag: "SERVICE",
    title: "Boutique Téléphones",
    short: "Téléphones",
    description: "Smartphones neufs et reconditionnés, accessoires et conseils personnalisés.",
    cta: "Voir la boutique",
    image: "/images/service-phones.png",
    accentClass: "text-phones",
    tagClass: "bg-phones/20 text-phones border-phones/30",
    btnClass: "bg-phones hover:brightness-110",
  },
  {
    id: "banking",
    tag: "SERVICE",
    title: "Mobile Banking",
    short: "Mobile Banking",
    description: "Transferts, paiements et gestion de compte depuis votre mobile en toute sécurité.",
    cta: "En savoir plus",
    image: "/images/service-banking.png",
    accentClass: "text-banking",
    tagClass: "bg-banking/20 text-banking border-banking/30",
    btnClass: "bg-banking hover:brightness-110",
  },
];

const features = [
  { icon: Users, label: "1000+ Clients satisfaits" },
  { icon: ShieldCheck, label: "Installation rapide et garantie" },
  { icon: Headphones, label: "Support disponible 7j/7" },
  { icon: ThumbsUp, label: "Services fiables et sécurisés" },
];

function Home() {
  const [index, setIndex] = useState(0);
  const total = services.length;
  const go = useCallback((i: number) => setIndex(((i % total) + total) % total), [total]);
  const next = useCallback(() => go(index + 1), [go, index]);
  const prev = useCallback(() => go(index - 1), [go, index]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  const hero = services[index];
  const sideServices = services.filter((s) => s.id !== hero.id);

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientX);
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStart == null) return;
    const dx = e.changedTouches[0].clientX - touchStart;
    if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
    setTouchStart(null);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 lg:px-10">
          <a href="/" className="flex items-center gap-3">
            <img
              src="/images/logo-area.png"
              alt="NEXT TECH & SERVICES"
              className="h-10 w-auto object-contain object-left"
            />
          </a>

          <nav className="hidden items-center gap-8 text-sm font-medium text-foreground/90 md:flex">
            <a href="#" className="transition-colors hover:text-primary">
              Accueil
            </a>
            <a href="#services" className="transition-colors hover:text-primary">
              Services
            </a>
            <a href="#about" className="transition-colors hover:text-primary">
              À propos
            </a>
            <a href="/contact" className="transition-colors hover:text-primary">
              Contact
            </a>
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

      <main
        id="services"
        className="relative flex flex-1 flex-col px-4 py-6 sm:px-6 lg:px-10"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className="mx-auto w-full max-w-[1400px]">
          <div className="grid gap-4 lg:grid-cols-[1fr_380px] lg:gap-5">
            <HeroCarousel service={hero} onPrev={prev} onNext={next} index={index} total={total} onSelect={go} />

            <div className="hidden flex-col gap-4 lg:flex">
              {sideServices.map((service) => (
                <SideServiceCard key={service.id} service={service} onSelect={() => go(services.indexOf(service))} />
              ))}
            </div>
          </div>

          <div className="mt-4 lg:hidden">
            <div className="flex gap-3 overflow-x-auto pb-2">
              {services.map((service, i) => (
                <button
                  key={service.id}
                  onClick={() => go(i)}
                  className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                    i === index ? `${service.btnClass} text-white` : "bg-card text-muted-foreground"
                  }`}
                >
                  {service.short}
                </button>
              ))}
            </div>
          </div>

          <FeatureBar />
        </div>
      </main>

      <footer id="contact" className="mt-auto border-t border-border/40 bg-background px-6 py-6 text-center text-xs text-muted-foreground lg:px-10">
        <p>© {new Date().getFullYear()} NEXT TECH &amp; SERVICES. Tous droits réservés.</p>
      </footer>
    </div>
  );
}

function HeroCarousel({
  service,
  onPrev,
  onNext,
  index,
  total,
  onSelect,
}: {
  service: Service;
  onPrev: () => void;
  onNext: () => void;
  index: number;
  total: number;
  onSelect: (i: number) => void;
}) {
  return (
    <article className="relative min-h-[420px] overflow-hidden rounded-3xl sm:min-h-[520px] lg:min-h-[580px]">
      <img src={service.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

      <button
        onClick={onPrev}
        aria-label="Précédent"
        className="absolute left-3 top-1/2 z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60 sm:left-5 sm:h-12 sm:w-12"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={onNext}
        aria-label="Suivant"
        className="absolute right-3 top-1/2 z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60 sm:right-5 sm:h-12 sm:w-12"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <div className="relative z-10 flex h-full flex-col justify-end p-6 sm:p-10 lg:max-w-[70%] lg:p-12">
        <span
          className={`mb-4 inline-flex w-fit rounded-full border px-3 py-1 text-[10px] font-bold tracking-widest sm:text-xs ${service.tagClass}`}
        >
          {service.tag}
        </span>
        <h1 className="text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
          {service.title}
        </h1>
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/80 sm:text-base">{service.description}</p>

        {service.features && (
          <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
            {service.features.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2 text-xs text-white/75 sm:text-sm">
                <Icon className={`h-4 w-4 ${service.accentClass}`} strokeWidth={1.75} />
                {label}
              </li>
            ))}
          </ul>
        )}

        <button
          className={`mt-6 inline-flex w-fit items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-[1.02] ${service.btnClass}`}
        >
          {service.cta}
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            aria-label={`Aller au service ${i + 1}`}
            onClick={() => onSelect(i)}
            className={`rounded-full transition-all ${
              i === index
                ? service.id === "canal"
                  ? "h-2.5 w-8 bg-canal"
                  : service.id === "phones"
                  ? "h-2.5 w-8 bg-phones"
                  : "h-2.5 w-8 bg-banking"
                : "h-2.5 w-2.5 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </article>
  );
}

function SideServiceCard({ service, onSelect }: { service: Service; onSelect: () => void }) {
  return (
    <button
      onClick={onSelect}
      className="group relative flex min-h-[270px] flex-1 flex-col justify-end overflow-hidden rounded-3xl text-left transition-transform hover:scale-[1.01]"
    >
      <img src={service.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div
        className={`absolute inset-0 ${
          service.id === "phones"
            ? "bg-gradient-to-br from-[oklch(0.35_0.15_260)]/90 via-black/70 to-black/90"
            : service.id === "canal"
            ? "bg-gradient-to-br from-[oklch(0.72_0.17_55)]/90 via-black/70 to-black/90"
            : "bg-gradient-to-br from-[oklch(0.35_0.12_145)]/90 via-black/70 to-black/90"
        }`}
      />
      <div className="relative z-10 p-6">
        <span
          className={`inline-flex rounded-full border px-2.5 py-0.5 text-[10px] font-bold tracking-widest ${service.tagClass}`}
        >
          {service.tag}
        </span>
        <h3 className="mt-2 text-xl font-bold text-white">{service.title}</h3>
        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-white/70">{service.description}</p>
        <span
          className={`mt-4 inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold text-white ${service.btnClass}`}
        >
          {service.cta}
          <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </button>
  );
}

function FeatureBar() {
  return (
    <section
      id="about"
      className="mt-5 grid grid-cols-2 gap-4 rounded-3xl bg-feature-bar px-6 py-6 text-feature-bar-foreground sm:grid-cols-4 sm:gap-6 sm:px-10 sm:py-7"
    >
      {features.map(({ icon: Icon, label }) => (
        <div key={label} className="flex flex-col items-center gap-2 text-center sm:flex-row sm:text-left">
          <Icon className="h-5 w-5 shrink-0 text-muted-foreground" strokeWidth={1.75} />
          <span className="text-xs font-medium leading-snug sm:text-sm">{label}</span>
        </div>
      ))}
    </section>
  );
}
