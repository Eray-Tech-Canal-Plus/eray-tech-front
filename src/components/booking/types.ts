export type Service = {
  id: string;
  name: string;
  description: string;
  price: number;
  promo?: { label: string; price: number };
};

export type Slot = { id: string; label: string };

export type SlotGroup = {
  key: "morning" | "afternoon" | "evening";
  label: string;
  slots: Slot[];
};

export type ContactInfo = {
  fullName: string;
  phone: string;
  address: string;
  postal: string;
  city: string;
};

export type BookingErrors = Partial<Record<
  keyof ContactInfo | "date" | "slot",
  string
>>;