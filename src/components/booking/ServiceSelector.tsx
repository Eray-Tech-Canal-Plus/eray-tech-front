import { Package } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

import { SERVICES, formatAriary } from "./data";
import { SectionCard } from "./shared";

type Props = {
  selectedId: string;
  onSelect: (id: string) => void;
};

export function ServiceSelector({ selectedId, onSelect }: Props) {
  return (
    <SectionCard title="1. Choisissez votre service" icon={Package}>
      <RadioGroup value={selectedId} onValueChange={onSelect} className="grid gap-3">
        {SERVICES.map((service) => {
          const isSelected = service.id === selectedId;

          return (
            <label
              key={service.id}
              htmlFor={service.id}
              className={cn(
                "flex items-start gap-4 rounded-xl border p-4 cursor-pointer transition-all",
                isSelected
                  ? "border-pink bg-pink/5 shadow-sm"
                  : "border-border hover:border-foreground/30",
              )}
            >
              <RadioGroupItem id={service.id} value={service.id} className="mt-1" />

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-semibold">{service.name}</p>
                  {service.promo && (
                    <Badge className="bg-pink text-pink-foreground border-0 hover:bg-pink">
                      {service.promo.label}
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {service.description}
                </p>
              </div>

              <div className="text-right shrink-0">
                {service.promo ? (
                  <div>
                    <p className="text-xs text-muted-foreground line-through">
                      {formatAriary(service.price)}
                    </p>
                    <p className="font-bold text-pink">
                      {formatAriary(service.promo.price)}
                    </p>
                  </div>
                ) : (
                  <p className="font-bold">{formatAriary(service.price)}</p>
                )}
              </div>
            </label>
          );
        })}
      </RadioGroup>
    </SectionCard>
  );
}