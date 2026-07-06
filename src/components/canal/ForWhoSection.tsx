const cards = [
  {
    num: "1",
    image: "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?w=800",
    alt: "Pose d'antenne parabolique sur un toit",
    title: "Pose & orientation d'antenne",
    text: (
      <>
        Installation de votre <strong className="text-primary">antenne parabolique</strong> et
        orientation précise vers le satellite pour capter toutes les chaînes en
        haute qualité.
      </>
    ),
  },
  {
    num: "2",
    image: "https://images.unsplash.com/photo-1461151304267-38535e780c79?w=800",
    alt: "Décodeur Canal+ raccordé à une télévision",
    title: "Décodeur & mise en service",
    text: (
      <>
        Raccordement et <strong className="text-primary">configuration complète</strong> de votre
        décodeur : activation de l'abonnement, chaînes triées et télécommande
        prête à l'emploi.
      </>
    ),
  },
  {
    num: "3",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800",
    alt: "Famille satisfaite regardant la télévision",
    title: "Réglage & garantie signal",
    text: (
      <>
        Test de qualité, réglage du <strong className="text-primary">signal optimal</strong> et
        démonstration. On ne repart qu'une fois que tout fonctionne
        parfaitement.
      </>
    ),
  },
];

export function ForWhoSection() {
  return (
    <section className="bg-surface py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <h2 className="text-center text-3xl sm:text-4xl md:text-5xl">
          Ce que nos <span className="text-gradient-brand">techniciens</span> font pour vous
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
          Une prestation complète, de la fixation de l'antenne jusqu'à la
          première chaîne diffusée.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {cards.map((card) => (
            <article
              key={card.num}
              className="group overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-transform hover:-translate-y-1"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={card.image}
                  alt={card.alt}
                  loading="lazy"
                  width={768}
                  height={1024}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
              </div>
              <div className="p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-brand font-display text-lg text-primary-foreground shadow-brand">
                  {card.num}
                </span>
                <h3 className="mt-4 text-xl">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {card.text}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="#reserver"
            className="inline-block rounded-lg bg-gradient-brand px-10 py-4 text-sm font-extrabold uppercase tracking-wide text-primary-foreground shadow-brand transition-transform hover:scale-[1.03]"
          >
            Oui, je veux mon installation !
          </a>
        </div>
      </div>
    </section>
  );
}
