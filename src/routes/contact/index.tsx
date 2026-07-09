import { createFileRoute } from "@tanstack/react-router";
import { Mail, MessageCircle, Phone } from "lucide-react";

export const Route = createFileRoute("/contact/")({
  component: ContactIndex,
});

function ContactIndex() {
  return (
    <div className="mx-auto w-full max-w-[720px]">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-black tracking-tight sm:text-4xl">Contact</h1>
        <p className="mt-3 text-sm text-muted-foreground sm:text-base">
          Nous sommes à votre écoute pour toute demande.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <a
          href="tel:+221000000000"
          className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-card/40 p-6 text-center transition-colors hover:border-primary/40"
        >
          <Phone className="h-6 w-6 text-primary" />
          <span className="text-sm font-semibold">Téléphone</span>
          <span className="text-xs text-muted-foreground">+221 00 000 00 00</span>
        </a>
        <a
          href="https://wa.me/221000000000"
          className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-card/40 p-6 text-center transition-colors hover:border-primary/40"
        >
          <MessageCircle className="h-6 w-6 text-[oklch(0.62_0.19_145)]" />
          <span className="text-sm font-semibold">WhatsApp</span>
          <span className="text-xs text-muted-foreground">Discutez avec nous</span>
        </a>
        <a
          href="mailto:contact@example.com"
          className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-card/40 p-6 text-center transition-colors hover:border-primary/40"
        >
          <Mail className="h-6 w-6 text-primary" />
          <span className="text-sm font-semibold">E-mail</span>
          <span className="text-xs text-muted-foreground">contact@example.com</span>
        </a>
      </div>
    </div>
  );
}
