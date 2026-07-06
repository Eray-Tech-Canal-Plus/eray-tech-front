import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarIcon, Clock, Sun, Sunrise, Sunset } from "lucide-react";

import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

import { SLOT_GROUPS, isSlotTaken } from "./data";
import { SectionCard } from "./shared";
import type { SlotGroup } from "./types";

const GROUP_ICONS = {
  morning: Sunrise,
  afternoon: Sun,
  evening: Sunset,
} as const;

type Props = {
  date: Date | undefined;
  slot: string | undefined;
  errors: { date?: string; slot?: string };
  onDateChange: (date: Date | undefined) => void;
  onSlotChange: (slotId: string) => void;
};

export function DateTimePicker({
  date,
  slot,
  errors,
  onDateChange,
  onSlotChange,
}: Props) {
  const isPastDate = (candidate: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return candidate < today;
  };

  return (
    <SectionCard title="3. Choisissez une date" icon={CalendarIcon}>
      <div className="grid md:grid-cols-[auto_1fr] gap-6">
        <div className="rounded-xl border border-border p-2 bg-background">
          <Calendar
            mode="single"
            selected={date}
            onSelect={onDateChange}
            disabled={isPastDate}
            locale={fr}
            className="pointer-events-auto"
          />
        </div>

        <div>
          <p className="text-sm font-medium mb-3">
            {date ? (
              <>
                Créneaux du{" "}
                <span className="text-pink">
                  {format(date, "EEEE d MMMM", { locale: fr })}
                </span>
              </>
            ) : (
              <span className="text-muted-foreground">
                Sélectionnez une date pour voir les créneaux disponibles
              </span>
            )}
          </p>

          <div className="space-y-4">
            {SLOT_GROUPS.map((group) => (
              <SlotGroupBlock
                key={group.key}
                group={group}
                date={date}
                selectedSlot={slot}
                onSelect={onSlotChange}
              />
            ))}
          </div>

          {(errors.date || errors.slot) && (
            <p className="mt-3 text-sm text-destructive">
              {errors.date ?? errors.slot}
            </p>
          )}
        </div>
      </div>
    </SectionCard>
  );
}

function SlotGroupBlock({
  group,
  date,
  selectedSlot,
  onSelect,
}: {
  group: SlotGroup;
  date: Date | undefined;
  selectedSlot: string | undefined;
  onSelect: (id: string) => void;
}) {
  const Icon = GROUP_ICONS[group.key];

  return (
    <div>
      <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground mb-2">
        <Icon className="h-3.5 w-3.5" />
        {group.label}
      </div>

      <div className="grid grid-cols-2 gap-2">
        {group.slots.map((s) => {
          const taken = isSlotTaken(date, s.id);
          const active = selectedSlot === s.id;

          return (
            <button
              key={s.id}
              type="button"
              disabled={!date || taken}
              onClick={() => onSelect(s.id)}
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
}