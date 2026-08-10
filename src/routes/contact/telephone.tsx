import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Send } from "lucide-react";
import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/services/api";

export const Route = createFileRoute("/contact/telephone")({
  component: ContactTelephone,
});

type TelephoneForm = {
  nom: string;
  prenom: string;
  telephone: string;
  adresse: string;
  email: string;
  marque: string;
};

const initialForm: TelephoneForm = {
  nom: "",
  prenom: "",
  telephone: "",
  adresse: "",
  email: "",
  marque: "",
};

function ContactTelephone() {
  const [form, setForm] = useState<TelephoneForm>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    try {
      await api.sendContact({
        nom: form.nom,
        prenom: form.prenom,
        telephone: form.telephone || "N/A",
        adresse: form.adresse ? `${form.adresse} (Marque: ${form.marque})` : `Demande marque: ${form.marque}`,
        email: form.email || "client@eraytech.com",
      });
      setSubmitted(true);
    } catch (err: any) {
      setErrorMsg(err.message || "Erreur lors de l'envoi.");
    } finally {
      setLoading(false);
    }
  };

  const update = (field: keyof TelephoneForm) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  return (
    <div className="mx-auto w-full max-w-[560px]">
      <Link
        to="/contact"
        className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Retour au choix
      </Link>

      <div className="rounded-3xl border border-border/60 bg-card/40 p-6 sm:p-8">
        <span className="inline-flex rounded-full border border-phones/30 bg-phones/20 px-2.5 py-0.5 text-[10px] font-bold tracking-widest text-phones">
          BOUTIQUE TÉLÉPHONES
        </span>
        <h1 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl">Demande Tecno</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Indiquez le modèle qui vous intéresse. Notre équipe vous répondra sous peu.
        </p>

        {submitted ? (
          <div className="mt-8 rounded-2xl border border-phones/30 bg-phones/10 px-5 py-6 text-center">
            <p className="font-semibold text-phones">Demande envoyée !</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Merci {form.prenom} {form.nom}, nous avons bien reçu votre demande pour un {form.marque}.
            </p>
            <Button asChild variant="outline" className="mt-5 rounded-full">
              <Link to="/contact">Nouvelle demande</Link>
            </Button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-8 space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Nom" id="nom" required>
                <Input id="nom" value={form.nom} onChange={update("nom")} placeholder="Votre nom" required />
              </Field>
              <Field label="Prénom" id="prenom" required>
                <Input id="prenom" value={form.prenom} onChange={update("prenom")} placeholder="Votre prénom" required />
              </Field>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Téléphone" id="telephone" required>
                <Input id="telephone" value={form.telephone} onChange={update("telephone")} placeholder="N° de téléphone" required />
              </Field>
              <Field label="Email" id="email" required>
                <Input id="email" type="email" value={form.email} onChange={update("email")} placeholder="votre@email.com" required />
              </Field>
            </div>

            <Field label="Adresse" id="adresse" required>
              <Input id="adresse" value={form.adresse} onChange={update("adresse")} placeholder="Votre adresse" required />
            </Field>

            <Field label="Marque / Modèle téléphone" id="marque" required>
              <Input
                id="marque"
                value={form.marque}
                onChange={update("marque")}
                placeholder="Ex. Tecno Spark 20, Samsung Galaxy..."
                required
              />
            </Field>

            {errorMsg && (
              <div className="rounded-xl border border-destructive/40 bg-destructive/10 p-3 text-xs text-destructive">
                {errorMsg}
              </div>
            )}

            <Button type="submit" disabled={loading} className="w-full rounded-full bg-phones py-6 text-sm font-semibold hover:bg-phones/90">
              <Send className="h-4 w-4" />
              {loading ? "Envoi en cours..." : "Envoyer la demande"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  id,
  children,
  required,
}: {
  label: string;
  id: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>
        {label}
        {required && <span className="text-primary"> *</span>}
      </Label>
      {children}
    </div>
  );
}
