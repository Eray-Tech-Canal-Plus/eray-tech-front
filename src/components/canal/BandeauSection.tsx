import { Countdown } from "./Countdown";

export function BandeauSection() {
  return (
    <section className="bg-gradient-brand">
      <div className="mx-auto grid max-w-6xl items-center gap-6 px-5 py-10 text-primary-foreground md:grid-cols-2">
        <p className="text-lg font-semibold leading-snug sm:text-xl md:text-2xl">
          Une intervention rapide et propre pour{" "}
          <span className="font-extrabold underline decoration-primary-foreground/40 underline-offset-4">
            regarder Canal+ sans coupure
          </span>
          , partout chez vous.
        </p>
        <div className="md:text-right">
          <p className="mb-1 text-sm font-semibold uppercase tracking-widest opacity-80">
            Offre d'installation valable encore
          </p>
          <div className="md:flex md:justify-end">
            <Countdown />
          </div>
        </div>
      </div>
    </section>
  );
}
