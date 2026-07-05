import { useMemo, useState } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import {
  CalendarIcon,
  CheckCircle2,
  Clock,
  MapPin,
  Package,
  Sparkles,
  Sun,
  Sunrise,
  Sunset,
  User,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

type Service = {
  id: string;
  name: string;
  description: string;
  price: number;
  promo?: { label: string; price: number };
};

const SERVICES: Service[] = [
  {
    id: "essentiel",
    name: "Installation Essentiel",
    description: "Décodeur Canal+ HD, paramétrage & test des chaînes",
    price: 245000,
    promo: { label: "Offert", price: 0 },
  },
  {
    id: "plus",
    name: "Installation Canal+ 4K",
    description: "Décodeur 4K UHD, câblage optimisé, configuration wifi",
    price: 395000,
    promo: { label: "-50%", price: 198000 },
  },
  {
    id: "premium",
    name: "Pack Multi-écrans",
    description: "Installation multi-pièces + application mobile & TV",
    price: 645000,
  },
];

type Slot = { id: string; label: string };

const SLOTS: { key: "morning" | "afternoon" | "evening"; label: string; icon: typeof Sun; slots: Slot[] }[] = [
  {
    key: "morning",
    label: "Matin",
    icon: Sunrise,
    slots: [
      { id: "08:00", label: "08:00 — 10:00" },
      { id: "10:00", label: "10:00 — 12:00" },
    ],
  },
  {
    key: "afternoon",
    label: "Après-midi",
    icon: Sun,
    slots: [
      { id: "13:00", label: "13:00 — 15:00" },
      { id: "15:00", label: "15:00 — 17:00" },
    ],
  },
  {
    key: "evening",
    label: "Soirée",
    icon: Sunset,
    slots: [
      { id: "17:30", label: "17:30 — 19:30" },
      { id: "19:30", label: "19:30 — 21:00" },
    ],
  },
];

// Deterministic pseudo-availability: some slots taken depending on date
function isSlotTaken(date: Date | undefined, slotId: string) {
  if (!date) return false;
  const seed = (date.getDate() + date.getMonth()) % 7;
  const map: Record<number, string[]> = {
    0: ["10:00", "19:30"],
    1: ["08:00"],
    2: ["15:00", "17:30"],
    3: ["13:00"],
    4: ["19:30"],
    5: ["08:00", "15:00"],
    6: [],
  };
  return map[seed]?.includes(slotId) ?? false;
}

export default function BookingPage() {
  const [serviceId, setServiceId] = useState<string>(SERVICES[1].id);
  const [date, setDate] = useState<Date | undefined>();
  const [slot, setSlot] = useState<string | undefined>();
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postal, setPostal] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmed, setConfirmed] = useState(false);

  const service = useMemo(
    () => SERVICES.find((s) => s.id === serviceId) ?? SERVICES[0],
    [serviceId],
  );
  const finalPrice = service.promo ? service.promo.price : service.price;

  const validate = () => {
    const e: Record<string, string> = {};
    if (!fullName.trim()) e.fullName = "Nom complet requis";
    if (!address.trim()) e.address = "Adresse requise";
    if (!city.trim()) e.city = "Ville requise";
    if (!/^\d{3}$/.test(postal)) e.postal = "Code postal invalide";
    if (!/^(?:\+?\d{9,13})$/.test(phone.replace(/\s/g, ""))) e.phone = "Téléphone invalide";
    if (!date) e.date = "Sélectionnez une date";
    if (!slot) e.slot = "Sélectionnez un créneau";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) {
      toast.error("Veuillez corriger les champs manquants");
      return;
    }
    setConfirmed(true);
    toast.success("Réservation confirmée !");
  };

  if (confirmed) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
        <Toaster richColors position="top-center" />
        <div className="max-w-lg w-full text-center bg-card border border-border rounded-2xl p-10 shadow-xl">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-pink/10 text-pink mb-6">
            <CheckCircle2 className="h-9 w-9" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Réservation confirmée</h1>
          <p className="mt-3 text-muted-foreground">
            Merci {fullName.split(" ")[0]}. Votre installation <strong>{service.name}</strong> est
            programmée le{" "}
            <strong>{date && format(date, "EEEE d MMMM yyyy", { locale: fr })}</strong> — créneau{" "}
            <strong>{slot}</strong>.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Un email de confirmation vous a été envoyé.
          </p>
          <Button
            className="mt-8 bg-pink text-pink-foreground hover:bg-pink/90"
            onClick={() => {
              setConfirmed(false);
              setDate(undefined);
              setSlot(undefined);
            }}
          >
            Nouvelle réservation
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster richColors position="top-center" />

      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur sticky top-0 z-40">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-foreground text-background grid place-items-center font-black">
              C+
            </div>
            <span className="font-semibold tracking-tight">CANAL+ Installation</span>
          </div>
          <Badge className="bg-pink/10 text-pink hover:bg-pink/15 border-0">
            <Sparkles className="h-3 w-3 mr-1" /> Offres en cours
          </Badge>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 pt-10 pb-6">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
          Réservez votre <span className="text-pink">installation</span> à domicile
        </h1>
        <p className="mt-3 text-muted-foreground max-w-2xl">
          Un technicien Canal+ certifié se déplace chez vous. Choisissez la date, le créneau et
          confirmez en quelques secondes.
        </p>
      </section>

      <main className="mx-auto max-w-6xl px-4 sm:px-6 pb-16 grid lg:grid-cols-[1fr_380px] gap-6">
        {/* Left column: form */}
        <div className="space-y-6">
          {/* Service */}
          <Card title="1. Choisissez votre service" icon={Package}>
            <RadioGroup value={serviceId} onValueChange={setServiceId} className="grid gap-3">
              {SERVICES.map((s) => {
                const selected = s.id === serviceId;
                return (
                  <label
                    key={s.id}
                    htmlFor={s.id}
                    className={cn(
                      "flex items-start gap-4 rounded-xl border p-4 cursor-pointer transition-all",
                      selected
                        ? "border-pink bg-pink/5 shadow-sm"
                        : "border-border hover:border-foreground/30",
                    )}
                  >
                    <RadioGroupItem id={s.id} value={s.id} className="mt-1" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-semibold">{s.name}</p>
                        {s.promo && (
                          <Badge className="bg-pink text-pink-foreground border-0 hover:bg-pink">
                            {s.promo.label}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{s.description}</p>
                    </div>
                    <div className="text-right shrink-0">
                      {s.promo ? (
                        <div>
                          <p className="text-xs text-muted-foreground line-through">{s.price} €</p>
                          <p className="font-bold text-pink">
                            {s.promo.price === 0 ? "Gratuit" : `${s.promo.price} €`}
                          </p>
                        </div>
                      ) : (
                        <p className="font-bold">{s.price} €</p>
                      )}
                    </div>
                  </label>
                );
              })}
            </RadioGroup>
          </Card>

          {/* Contact & address */}
          <Card title="2. Vos coordonnées" icon={User}>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Nom complet" error={errors.fullName}>
                <Input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Jean Rakoto" />
              </Field>
              <Field label="Téléphone" error={errors.phone}>
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="034 12 345 67" />
              </Field>
              <Field label="Adresse" error={errors.address} className="sm:col-span-2">
                <Input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Lot II K 45 Ankorondrano" />
              </Field>
              <Field label="Code postal" error={errors.postal}>
                <Input value={postal} onChange={(e) => setPostal(e.target.value)} placeholder="101" maxLength={3} />
              </Field>
              <Field label="Ville" error={errors.city}>
                <Input value={city} onChange={(e) => setCity(e.target.value)} placeholder="Antananarivo" />
              </Field>
            </div>
          </Card>

          {/* Date */}
          <Card title="3. Choisissez une date" icon={CalendarIcon}>
            <div className="grid md:grid-cols-[auto_1fr] gap-6">
              <div className="rounded-xl border border-border p-2 bg-background">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(d) => {
                    setDate(d);
                    setSlot(undefined);
                  }}
                  disabled={(d) => {
                    const t = new Date();
                    t.setHours(0, 0, 0, 0);
                    return d < t;
                  }}
                  locale={fr}
                  className="pointer-events-auto"
                />
              </div>
              <div>
                <p className="text-sm font-medium mb-3">
                  {date ? (
                    <>Créneaux du <span className="text-pink">{format(date, "EEEE d MMMM", { locale: fr })}</span></>
                  ) : (
                    <span className="text-muted-foreground">Sélectionnez une date pour voir les créneaux disponibles</span>
                  )}
                </p>
                <div className="space-y-4">
                  {SLOTS.map((group) => {
                    const Icon = group.icon;
                    return (
                      <div key={group.key}>
                        <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground mb-2">
                          <Icon className="h-3.5 w-3.5" />
                          {group.label}
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {group.slots.map((s) => {
                            const taken = isSlotTaken(date, s.id);
                            const active = slot === s.id;
                            return (
                              <button
                                key={s.id}
                                type="button"
                                disabled={!date || taken}
                                onClick={() => setSlot(s.id)}
                                className={cn(
                                  "rounded-lg border px-3 py-2 text-sm transition-all text-left",
                                  "disabled:opacity-40 disabled:cursor-not-allowed",
                                  active
                                    ? "border-pink bg-pink text-pink-foreground"
                                    : "border-border hover:border-foreground/40 hover:bg-muted",
                                )}
                              >
                                <span className="flex items-center gap-2">
                                  <Clock className="h-3.5 w-3.5" />
                                  {s.label}
                                </span>
                                {taken && (
                                  <span className="text-[10px] block mt-0.5 opacity-70">Complet</span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
                {(errors.date || errors.slot) && (
                  <p className="mt-3 text-sm text-destructive">
                    {errors.date ?? errors.slot}
                  </p>
                )}
              </div>
            </div>
          </Card>
        </div>

        {/* Right column: summary */}
        <aside className="lg:sticky lg:top-24 h-fit">
          <div className="rounded-2xl border border-border bg-card shadow-xl overflow-hidden">
            <div className="bg-foreground text-background px-6 py-5">
              <p className="text-xs uppercase tracking-widest opacity-70">Récapitulatif</p>
              <p className="text-lg font-semibold mt-1">Votre réservation</p>
            </div>
            <div className="p-6 space-y-4 text-sm">
              <Row icon={Package} label="Service">
                <span className="font-medium">{service.name}</span>
              </Row>
              <Row icon={MapPin} label="Adresse">
                <span className="font-medium text-right">
                  {address || postal || city ? (
                    <>
                      {address || "—"}
                      <br />
                      {postal} {city}
                    </>
                  ) : (
                    <span className="text-muted-foreground italic">À compléter</span>
                  )}
                </span>
              </Row>
              <Row icon={CalendarIcon} label="Date">
                <span className="font-medium">
                  {date ? format(date, "d MMM yyyy", { locale: fr }) : (
                    <span className="text-muted-foreground italic">À choisir</span>
                  )}
                </span>
              </Row>
              <Row icon={Clock} label="Heure">
                <span className="font-medium">
                  {slot ?? <span className="text-muted-foreground italic">À choisir</span>}
                </span>
              </Row>
              <Separator />
              <div className="flex items-baseline justify-between">
                <span className="text-muted-foreground">Sous-total</span>
                <span className={cn(service.promo && "line-through text-muted-foreground")}>
                  {service.price} €
                </span>
              </div>
              {service.promo && (
                <div className="flex items-baseline justify-between text-pink">
                  <span>Promotion {service.promo.label}</span>
                  <span>-{service.price - service.promo.price} €</span>
                </div>
              )}
              <Separator />
              <div className="flex items-baseline justify-between">
                <span className="font-semibold">Total à payer</span>
                <span className="text-2xl font-bold">
                  {finalPrice === 0 ? "Gratuit" : `${finalPrice} €`}
                </span>
              </div>
              <Button
                onClick={handleSubmit}
                className="w-full h-12 text-base bg-pink text-pink-foreground hover:bg-pink/90 shadow-lg shadow-pink/20"
              >
                Confirmer la réservation
              </Button>
              <p className="text-[11px] text-center text-muted-foreground">
                Aucune carte requise — paiement le jour de l'installation.
              </p>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}

function Card({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-5">
        <div className="h-8 w-8 rounded-lg bg-foreground text-background grid place-items-center">
          <Icon className="h-4 w-4" />
        </div>
        <h2 className="font-semibold tracking-tight">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function Field({
  label,
  error,
  children,
  className,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <Label className="text-xs uppercase tracking-wider text-muted-foreground">{label}</Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

function Row({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Icon className="h-4 w-4" />
        <span>{label}</span>
      </div>
      <div className="text-right max-w-[60%]">{children}</div>
    </div>
  );
}