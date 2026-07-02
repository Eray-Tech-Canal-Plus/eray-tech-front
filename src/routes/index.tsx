import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { Tv, Smartphone, Wallet, ChevronLeft, ChevronRight, Phone, Mail, Facebook, Instagram, Twitter } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Home,
});

type Service = {
  id: string;
  title: string;
  short: string;
  Icon: typeof Tv;
  subtitles?: string[];
  cta?: string;
};

const services: Service[] = [
  {
    id: "canal",
    title: "Installation Canal+",
    short: "Canal+",
    Icon: Tv,
    subtitles: ["Activation", "Réactivation", "Assistance"],
    cta: "Demander une installation",
  },
  { id: "phones", title: "Boutique Téléphones", short: "Téléphones", Icon: Smartphone },
  { id: "banking", title: "Mobile Banking", short: "Mobile Banking", Icon: Wallet },
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

  const left = services[(index - 1 + total) % total];
  const right = services[(index + 1) % total];
  const center = services[index];

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
      <header className="sticky top-0 z-30 border-b border-border/60 bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="/" className="flex items-center gap-2 font-black tracking-tight">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground">C+</span>
            <span className="hidden text-lg sm:inline">Canal Services</span>
          </a>
          <nav className="flex items-center gap-2 sm:gap-6 text-sm font-medium">
            <a href="#services" className="hidden text-muted-foreground transition-colors hover:text-foreground sm:inline">Services</a>
            <a href="#contact" className="hidden text-muted-foreground transition-colors hover:text-foreground sm:inline">Contact</a>
            <a href="tel:+221000000000" className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-primary-foreground shadow-sm transition-transform hover:scale-[1.02]">
              <Phone className="h-4 w-4" />
              <span>Nous appeler</span>
            </a>
          </nav>
        </div>
      </header>

      <main
        id="services"
        className="relative flex min-h-[100svh] flex-1 flex-col justify-center px-4 py-10 sm:px-8"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className="mx-auto hidden w-full max-w-7xl md:block">
          <div className="grid grid-cols-[17.5%_65%_17.5%] items-stretch gap-8">
            <SideCard service={left} onClick={prev} side="left" />
            <CenterCard service={center} />
            <SideCard service={right} onClick={next} side="right" />
          </div>
          <div className="mt-10 flex items-center justify-center gap-6">
            <NavBtn label="Précédent" onClick={prev}><ChevronLeft className="h-5 w-5" /></NavBtn>
            <Dots total={total} index={index} onSelect={go} />
            <NavBtn label="Suivant" onClick={next}><ChevronRight className="h-5 w-5" /></NavBtn>
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-md flex-col md:hidden">
          <MobileCard service={center} />
          <div className="mt-6 flex items-center justify-between gap-4">
            <NavBtn label="Précédent" onClick={prev}><ChevronLeft className="h-5 w-5" /></NavBtn>
            <Dots total={total} index={index} onSelect={go} />
            <NavBtn label="Suivant" onClick={next}><ChevronRight className="h-5 w-5" /></NavBtn>
          </div>
        </div>
      </main>

      <footer id="contact" className="border-t border-border/60 bg-secondary text-secondary-foreground">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 sm:grid-cols-3">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest opacity-70">Contact</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> +221 00 000 00 00</li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> contact@canalservices.app</li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest opacity-70">Suivez-nous</h3>
            <div className="mt-3 flex gap-3">
              <a href="#" aria-label="Facebook" className="grid h-9 w-9 place-items-center rounded-full bg-white/10 transition-colors hover:bg-primary"><Facebook className="h-4 w-4" /></a>
              <a href="#" aria-label="Instagram" className="grid h-9 w-9 place-items-center rounded-full bg-white/10 transition-colors hover:bg-primary"><Instagram className="h-4 w-4" /></a>
              <a href="#" aria-label="Twitter" className="grid h-9 w-9 place-items-center rounded-full bg-white/10 transition-colors hover:bg-primary"><Twitter className="h-4 w-4" /></a>
            </div>
          </div>
          <div className="sm:text-right">
            <p className="text-xs opacity-70">© {new Date().getFullYear()} Canal Services. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function NavBtn({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      aria-label={label}
      onClick={onClick}
      className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-border bg-card text-foreground shadow-sm transition-colors hover:bg-primary hover:text-primary-foreground"
    >
      {children}
    </button>
  );
}

function CenterCard({ service }: { service: Service }) {
  const { Icon } = service;
  return (
    <article className="relative flex flex-col items-center justify-center gap-6 rounded-3xl bg-card p-8 text-center shadow-[0_20px_60px_-20px_oklch(0.7_0.19_45/0.35)] ring-1 ring-border sm:p-12">
      <div className="grid h-28 w-28 place-items-center rounded-3xl bg-primary/10 text-primary sm:h-36 sm:w-36">
        <Icon className="h-14 w-14 sm:h-20 sm:w-20" strokeWidth={1.75} />
      </div>
      <h1 className="text-3xl font-black tracking-tight sm:text-5xl">{service.title}</h1>
      {service.subtitles && (
        <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm font-medium text-muted-foreground sm:text-base">
          {service.subtitles.map((s, i) => (
            <span key={s} className="flex items-center gap-3">
              {i > 0 && <span className="text-primary">•</span>}
              {s}
            </span>
          ))}
        </p>
      )}
      {service.cta && (
        <button className="mt-2 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-transform hover:scale-[1.03]">
          {service.cta}
        </button>
      )}
    </article>
  );
}

function SideCard({ service, onClick, side }: { service: Service; onClick: () => void; side: "left" | "right" }) {
  const { Icon } = service;
  return (
    <button
      onClick={onClick}
      aria-label={`Voir ${service.title}`}
      className={`group relative flex flex-col items-center justify-center gap-3 rounded-3xl bg-card/70 p-6 text-center opacity-70 ring-1 ring-border transition-all hover:opacity-100 hover:shadow-lg ${
        side === "left" ? "hover:-translate-x-1" : "hover:translate-x-1"
      }`}
    >
      <div className="grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-primary">
        <Icon className="h-7 w-7" strokeWidth={1.75} />
      </div>
      <h3 className="text-sm font-bold sm:text-base">{service.short}</h3>
    </button>
  );
}

function MobileCard({ service }: { service: Service }) {
  const { Icon } = service;
  return (
    <article className="flex flex-col items-center gap-5 rounded-3xl bg-card p-8 text-center shadow-xl ring-1 ring-border">
      <div className="grid h-24 w-24 place-items-center rounded-3xl bg-primary/10 text-primary">
        <Icon className="h-12 w-12" strokeWidth={1.75} />
      </div>
      <h1 className="text-2xl font-black tracking-tight">{service.title}</h1>
      {service.subtitles && (
        <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs font-medium text-muted-foreground">
          {service.subtitles.map((s, i) => (
            <span key={s} className="flex items-center gap-2">
              {i > 0 && <span className="text-primary">•</span>}
              {s}
            </span>
          ))}
        </p>
      )}
      {service.cta && (
        <button className="mt-1 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25">
          {service.cta}
        </button>
      )}
    </article>
  );
}

function Dots({ total, index, onSelect }: { total: number; index: number; onSelect: (i: number) => void }) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          aria-label={`Aller au service ${i + 1}`}
          onClick={() => onSelect(i)}
          className={`h-2.5 rounded-full transition-all ${i === index ? "w-8 bg-primary" : "w-2.5 bg-border hover:bg-muted-foreground"}`}
        />
      ))}
    </div>
  );
}