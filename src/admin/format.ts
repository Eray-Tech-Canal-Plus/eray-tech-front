export function formatPrice(prix: number | string | null | undefined): string {
  if (prix == null || prix === "") return "-";
  const num = typeof prix === "string" ? parseFloat(prix) : prix;
  if (isNaN(num)) return "-";
  return new Intl.NumberFormat("fr-FR").format(num) + " ARIARY";
}

export function formatDate(date: string | null | undefined): string {
  if (!date) return "-";
  try {
    return new Date(date).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  } catch {
    return date;
  }
}

export function formatDateTime(date: string | null | undefined): string {
  if (!date) return "-";
  try {
    return new Date(date).toLocaleString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return date;
  }
}
