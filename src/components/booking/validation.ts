import type { BookingErrors, ContactInfo } from "./types";

export function validateBooking(
  contact: ContactInfo,
  date: Date | undefined,
  slot: string | undefined,
): BookingErrors {
  const errors: BookingErrors = {};

  if (!contact.fullName.trim()) errors.fullName = "Nom complet requis";
  if (!contact.address.trim()) errors.address = "Adresse requise";
  if (!contact.city.trim()) errors.city = "Ville requise";
  if (!/^\d{3}$/.test(contact.postal)) errors.postal = "Code postal invalide";
  if (!/^(?:\+?\d{9,13})$/.test(contact.phone.replace(/\s/g, ""))) {
    errors.phone = "Téléphone invalide";
  }
  if (!date) errors.date = "Sélectionnez une date";
  if (!slot) errors.slot = "Sélectionnez un créneau";

  return errors;
}