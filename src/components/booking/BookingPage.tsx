import { useMemo, useState } from "react";
import { toast } from "sonner";

import { Toaster } from "@/components/ui/sonner";

import { BookingHeader, BookingHero } from "./BookingHeader";
import { BookingSummary } from "./BookingSummary";
import { ConfirmationScreen } from "./ConfirmationScreen";
import { ContactForm } from "./ContactForm";
import { DateTimePicker } from "./DateTimePicker";
import { ServiceSelector } from "./ServiceSelector";
import { SERVICES } from "./data";
import type { BookingErrors, ContactInfo } from "./types";
import { validateBooking } from "./validation";

const EMPTY_CONTACT: ContactInfo = {
  fullName: "",
  phone: "",
  address: "",
  postal: "",
  city: "",
};

export default function BookingPage() {
  const [serviceId, setServiceId] = useState<string>(SERVICES[1].id);
  const [contact, setContact] = useState<ContactInfo>(EMPTY_CONTACT);
  const [date, setDate] = useState<Date | undefined>();
  const [slot, setSlot] = useState<string | undefined>();
  const [errors, setErrors] = useState<BookingErrors>({});
  const [isConfirmed, setIsConfirmed] = useState(false);

  const service = useMemo(
    () => SERVICES.find((s) => s.id === serviceId) ?? SERVICES[0],
    [serviceId],
  );

  const updateContact = (patch: Partial<ContactInfo>) =>
    setContact((prev) => ({ ...prev, ...patch }));

  const handleSelectDate = (nextDate: Date | undefined) => {
    setDate(nextDate);
    setSlot(undefined);
  };

  const handleSubmit = () => {
    const nextErrors = validateBooking(contact, date, slot);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      toast.error("Veuillez corriger les champs manquants");
      return;
    }

    setIsConfirmed(true);
    toast.success("Réservation confirmée !");
  };

  const handleReset = () => {
    setIsConfirmed(false);
    setDate(undefined);
    setSlot(undefined);
  };

  if (isConfirmed) {
    return (
      <>
        <Toaster richColors position="top-center" />
        <ConfirmationScreen
          service={service}
          fullName={contact.fullName}
          date={date}
          slot={slot}
          onReset={handleReset}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster richColors position="top-center" />
      <BookingHeader />
      <BookingHero />

      <main className="mx-auto max-w-6xl px-4 sm:px-6 pb-16 grid lg:grid-cols-[1fr_380px] gap-6">
        <div className="space-y-6">
          <ServiceSelector selectedId={serviceId} onSelect={setServiceId} />

          <ContactForm
            values={contact}
            errors={errors}
            onChange={updateContact}
          />

          <DateTimePicker
            date={date}
            slot={slot}
            errors={{ date: errors.date, slot: errors.slot }}
            onDateChange={handleSelectDate}
            onSlotChange={setSlot}
          />
        </div>

        <BookingSummary
          service={service}
          contact={contact}
          date={date}
          slot={slot}
          onSubmit={handleSubmit}
        />
      </main>
    </div>
  );
}