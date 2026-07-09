import { useState } from "react";
import { toast } from "sonner";
export function HeroSection() {
  const [nom, setNom] = useState("");
  const [tel, setTel] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nom.trim() || !tel.trim()) {
      toast.error("Merci de renseigner votre nom et votre téléphone.");
      return;
    }
    toast.success("Demande envoyée ! Un technicien vous rappelle sous 24 h.");
    setNom("");
    setTel("");
  };

  return (
    <section className="relative overflow-hidden bg-hero">
      <div className="pointer-events-none absolute inset-0 opacity-40 [background:radial-gradient(60%_60%_at_80%_10%,theme(colors.primary/25),transparent_70%)]" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 py-14 md:grid-cols-2 md:py-20">
        {/* Colonne texte + formulaire */}
        <div className="max-w-xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
            Service certifié
          </span>

          <h1 className="mt-5 text-4xl leading-[1.05] sm:text-5xl md:text-6xl">
            Installation <span className="text-gradient-brand">Canal+</span>
            <br /> chez vous
          </h1>

          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Pose d'antenne parabolique, réglage satellite et mise en service de votre décodeur. Nos
            techniciens vous garantissent un{" "}
            <span className="font-semibold text-foreground">signal parfait</span> et toutes vos
            chaînes en HD dès aujourd'hui.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-3 rounded-2xl border border-border bg-card/70 p-5 shadow-card backdrop-blur"
          >
            <input
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              type="text"
              placeholder="Votre nom"
              className="w-full rounded-lg border border-input bg-secondary px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-ring"
            />
            <input
              value={tel}
              onChange={(e) => setTel(e.target.value)}
              type="tel"
              placeholder="Votre numéro de téléphone"
              className="w-full rounded-lg border border-input bg-secondary px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-ring"
            />
            <button
              type="submit"
              className="w-full rounded-lg bg-gradient-brand px-6 py-3.5 text-sm font-extrabold uppercase tracking-wide text-primary-foreground shadow-brand transition-transform hover:scale-[1.02] active:scale-100"
            >
              Réserver mon installation
            </button>
            <p className="text-center text-xs text-muted-foreground">
              Devis gratuit • Intervention sous 48 h • Sans engagement
            </p>
          </form>
        </div>

        {/* Colonne image */}
        <div className="relative mx-auto w-full max-w-md">
          <div className="absolute -inset-6 rounded-[2rem] bg-gradient-brand opacity-20 blur-2xl" />
          <img
            src={"https://images.unsplash.com/photo-1521790361543-f645cf042ec4?w=1600"}
            alt="Technicien installateur Canal+ avec antenne satellite"
            width={1024}
            height={1152}
            className="relative rounded-[2rem] border border-border object-cover shadow-card"
          />
        </div>
      </div>
    </section>
  );
}
