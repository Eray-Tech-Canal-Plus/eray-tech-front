import expertPortrait from "@/assets/expert-portrait.jpg";

const stats = [
  { value: "+2 500", label: "installations réalisées" },
  { value: "48 h", label: "délai d'intervention" },
  { value: "12 ans", label: "d'expérience terrain" },
];

export function ExpertSection() {
  return (
    <section className="relative overflow-hidden bg-background py-16 md:py-24">
      <div className="pointer-events-none absolute inset-0 opacity-30 [background:radial-gradient(50%_60%_at_15%_50%,theme(colors.primary/25),transparent_70%)]" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 md:grid-cols-2">
        <div className="relative mx-auto w-full max-w-sm">
          <div className="absolute -inset-5 rounded-[2rem] bg-gradient-brand opacity-20 blur-2xl" />
          <img
            src={expertPortrait}
            alt="Julien Marchand, technicien installateur satellite"
            loading="lazy"
            width={1024}
            height={1280}
            className="relative rounded-[2rem] border border-border object-cover shadow-card"
          />
        </div>

        <div>
          <h2 className="text-3xl sm:text-4xl">
            Guillaume, votre{" "}
            <span className="text-gradient-brand">installateur agréé</span>
          </h2>
          <p className="mt-2 text-sm font-semibold uppercase tracking-widest text-primary">
            Spécialiste antenne satellite & Canal+
          </p>

          <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            <p>
              Technicien indépendant depuis plus de{" "}
              <strong className="text-foreground">12 ans</strong>, je me suis
              spécialisé dans la pose d'antennes paraboliques et la mise en
              service des décodeurs Canal+.
            </p>
            <p>
              Chaque installation est réalisée dans les règles de l'art :
              fixation sécurisée, câblage discret, orientation millimétrée du
              satellite et test complet du signal avant de vous laisser la
              télécommande.
            </p>
            <p>
              Mon objectif est simple :{" "}
              <strong className="text-foreground">
                que vous profitiez de toutes vos chaînes, sans coupure, dès le
                jour de mon passage.
              </strong>
            </p>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-border bg-card p-4 text-center"
              >
                <p className="font-display text-2xl text-primary">{s.value}</p>
                <p className="mt-1 text-xs leading-tight text-muted-foreground">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
