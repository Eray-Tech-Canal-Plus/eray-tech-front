import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Send } from "lucide-react";
import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/contact/installation")({
  component: ContactInstallation,
});

type InstallationForm = {
  nom: string;
  prenom: string;
  numero: string;
  adresse: string;
  email: string;
};

const initialForm: InstallationForm = {
  nom: "",
  prenom: "",
  numero: "",
  adresse: "",
  email: "",
};

function ContactInstallation() {
  const [form, setForm] = useState<InstallationForm>(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const update = (field: keyof InstallationForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
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
        <span className="inline-flex rounded-full border border-canal/30 bg-canal/20 px-2.5 py-0.5 text-[10px] font-bold tracking-widest text-canal">
          INSTALLATION CANAL+
        </span>
        <h1 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl">Demande d&apos;installation</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Remplissez le formulaire ci-dessous. Nous vous recontacterons rapidement.
        </p>

        {submitted ? (
          <div className="mt-8 rounded-2xl border border-canal/30 bg-canal/10 px-5 py-6 text-center">
            <p className="font-semibold text-canal">Demande envoyée !</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Merci {form.prenom} {form.nom}, nous avons bien reçu votre demande d&apos;installation.
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

            <Field label="Numéro" id="numero" required>
              <Input
                id="numero"
                type="tel"
                value={form.numero}
                onChange={update("numero")}
                placeholder="+221 XX XXX XX XX"
                required
              />
            </Field>

            <Field label="Adresse" id="adresse" required>
              <Textarea
                id="adresse"
                value={form.adresse}
                onChange={update("adresse")}
                placeholder="Votre adresse complète"
                rows={3}
                required
              />
            </Field>

            <Field label="E-mail" id="email" required>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={update("email")}
                placeholder="exemple@email.com"
                required
              />
            </Field>

            <Button type="submit" className="w-full rounded-full py-6 text-sm font-semibold">
              <Send className="h-4 w-4" />
              Envoyer la demande
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
