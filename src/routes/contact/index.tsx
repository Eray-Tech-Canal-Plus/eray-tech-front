import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Satellite, Smartphone } from "lucide-react";

export const Route = createFileRoute("/contact/")({
  component: ContactIndex,
});

const choices = [
  {
    to: "/contact/installation" as const,
    title: "Installation CANAL+",
    description: "Demandez une installation ou une assistance à domicile.",
    icon: Satellite,
    accentClass: "text-canal",
    tagClass: "bg-canal/20 text-canal border-canal/30",
    btnClass: "bg-gradient-to-r from-[oklch(0.72_0.17_55)] to-[oklch(0.62_0.17_50)] hover:brightness-110",
    image: "/images/hero-canal.png",
  },
  {
    to: "/contact/telephone" as const,
    title: "Boutique Téléphones",
    description: "Renseignez-vous sur nos smartphones et modèles disponibles.",
    icon: Smartphone,
    accentClass: "text-phones",
    tagClass: "bg-phones/20 text-phones border-phones/30",
    btnClass: "bg-phones hover:brightness-110",
    image: "/images/service-phones.png",
  },
];

function ContactIndex() {
  return (
    <div className="mx-auto w-full max-w-[900px]">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-black tracking-tight sm:text-4xl">Contact</h1>
        <p className="mt-3 text-sm text-muted-foreground sm:text-base">
          Choisissez le service qui correspond à votre demande.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {choices.map((choice) => (
          <Link
            key={choice.to}
            to={choice.to}
            className="group relative flex min-h-[280px] flex-col justify-end overflow-hidden rounded-3xl text-left transition-transform hover:scale-[1.01]"
          >
            <img src={choice.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30" />

            <div className="relative z-10 p-6">
              <span
                className={`inline-flex rounded-full border px-2.5 py-0.5 text-[10px] font-bold tracking-widest ${choice.tagClass}`}
              >
                FORMULAIRE
              </span>
              <div className="mt-3 flex items-center gap-2">
                <choice.icon className={`h-5 w-5 ${choice.accentClass}`} strokeWidth={1.75} />
                <h2 className="text-xl font-bold text-white">{choice.title}</h2>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-white/75">{choice.description}</p>
              <span
                className={`mt-5 inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold text-white ${choice.btnClass}`}
              >
                Remplir le formulaire
                <ArrowRight className="h-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
