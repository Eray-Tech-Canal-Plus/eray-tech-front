import { useState } from "react";
import { toast } from "sonner";

export function FinalCta() {
  const [tel, setTel] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tel.trim()) {
      toast.error("Merci d'indiquer votre numéro de téléphone.");
      return;
    }
    toast.success("Merci ! On vous rappelle pour planifier l'installation.");
    setTel("");
  };

  return (
    <section id="reserver" className="bg-gradient-brand">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-5 py-16 text-primary-foreground md:grid-cols-2">
        <div>
          <h2 className="text-4xl leading-[1.05] sm:text-5xl">
            Passez à l'action
            <br /> et branchez Canal+
          </h2>
          <p className="mt-4 max-w-md text-primary-foreground/90">
            Réservez votre créneau dès maintenant. Devis gratuit, intervention rapide et
            satisfaction garantie.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-primary-foreground/20 bg-background/20 p-5 backdrop-blur"
        >
          <label className="text-sm font-semibold uppercase tracking-widest">
            Être rappelé gratuitement
          </label>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row">
            <input
              value={tel}
              onChange={(e) => setTel(e.target.value)}
              type="tel"
              placeholder="Votre téléphone"
              className="w-full rounded-lg border border-primary-foreground/30 bg-background/40 px-4 py-3 text-sm text-primary-foreground outline-none placeholder:text-primary-foreground/60 focus:border-primary-foreground"
            />
            <button
              type="submit"
              className="whitespace-nowrap rounded-lg bg-foreground px-6 py-3 text-sm font-extrabold uppercase tracking-wide text-background transition-transform hover:scale-[1.02]"
            >
              Me rappeler
            </button>
          </div>
        </form>
      </div>

      <div className="border-t border-primary-foreground/20">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-5 py-6 text-center text-sm text-primary-foreground/80 sm:flex-row sm:text-left">
          <p className="font-display text-lg tracking-wide">INSTALLATION CANAL+</p>
          <p>Intervention 7j/7 • Antenne · Décodeur · Réglage signal</p>
        </div>
      </div>
    </section>
  );
}
