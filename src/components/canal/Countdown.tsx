import { useEffect, useState } from "react";

function getRemaining(target: number) {
  const diff = Math.max(0, target - Date.now());
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

export function Countdown() {
  // Prochaine échéance de réservation : 13 jours à partir du premier rendu.
  const [target] = useState(() => Date.now() + 13 * 24 * 60 * 60 * 1000);
  const [time, setTime] = useState(() => getRemaining(target));

  useEffect(() => {
    const id = setInterval(() => setTime(getRemaining(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <div className="flex items-baseline gap-2 font-display text-2xl leading-none text-primary-foreground sm:text-3xl md:text-4xl">
      <span>{time.days} j</span>
      <span className="opacity-60">|</span>
      <span>{pad(time.hours)} h</span>
      <span>{pad(time.minutes)} min</span>
      <span>{pad(time.seconds)} s</span>
    </div>
  );
}
