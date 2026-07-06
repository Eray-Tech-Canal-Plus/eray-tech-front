import { User } from "lucide-react";
import { Input } from "@/components/ui/input";

import { Field, SectionCard } from "./shared";
import type { BookingErrors, ContactInfo } from "./types";

type Props = {
  values: ContactInfo;
  errors: BookingErrors;
  onChange: (patch: Partial<ContactInfo>) => void;
};

export function ContactForm({ values, errors, onChange }: Props) {
  return (
    <SectionCard title="2. Vos coordonnées" icon={User}>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Nom complet" error={errors.fullName}>
          <Input
            value={values.fullName}
            onChange={(e) => onChange({ fullName: e.target.value })}
            placeholder="Jean Rakoto"
          />
        </Field>

        <Field label="Téléphone" error={errors.phone}>
          <Input
            value={values.phone}
            onChange={(e) => onChange({ phone: e.target.value })}
            placeholder="034 12 345 67"
          />
        </Field>

        <Field label="Adresse" error={errors.address} className="sm:col-span-2">
          <Input
            value={values.address}
            onChange={(e) => onChange({ address: e.target.value })}
            placeholder="Lot II K 45 Ankorondrano"
          />
        </Field>

        <Field label="Code postal" error={errors.postal}>
          <Input
            value={values.postal}
            onChange={(e) => onChange({ postal: e.target.value })}
            placeholder="101"
            maxLength={3}
          />
        </Field>

        <Field label="Ville" error={errors.city}>
          <Input
            value={values.city}
            onChange={(e) => onChange({ city: e.target.value })}
            placeholder="Antananarivo"
          />
        </Field>
      </div>
    </SectionCard>
  );
}