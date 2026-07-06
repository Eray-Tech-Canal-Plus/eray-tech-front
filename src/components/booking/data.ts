import type { Service, SlotGroup } from "./types";

export const SERVICES: Service[] = [
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

export const SLOT_GROUPS: SlotGroup[] = [
  {
    key: "morning",
    label: "Matin",
    slots: [
      { id: "08:00", label: "08:00 — 10:00" },
      { id: "10:00", label: "10:00 — 12:00" },
    ],
  },
  {
    key: "afternoon",
    label: "Après-midi",
    slots: [
      { id: "13:00", label: "13:00 — 15:00" },
      { id: "15:00", label: "15:00 — 17:00" },
    ],
  },
  {
    key: "evening",
    label: "Soirée",
    slots: [
      { id: "17:30", label: "17:30 — 19:30" },
      { id: "19:30", label: "19:30 — 21:00" },
    ],
  },
];

// Availability simulée : certains créneaux sont "complets" selon la date.
const TAKEN_SLOTS_BY_SEED: Record<number, string[]> = {
  0: ["10:00", "19:30"],
  1: ["08:00"],
  2: ["15:00", "17:30"],
  3: ["13:00"],
  4: ["19:30"],
  5: ["08:00", "15:00"],
  6: [],
};

export function isSlotTaken(date: Date | undefined, slotId: string): boolean {
  if (!date) return false;
  const seed = (date.getDate() + date.getMonth()) % 7;
  return TAKEN_SLOTS_BY_SEED[seed]?.includes(slotId) ?? false;
}

export function formatAriary(amount: number): string {
  if (amount === 0) return "Gratuit";
  return `${amount.toLocaleString("fr-FR")} Ar`;
}