import phone1 from "@/assets/phone-1.jpg";
import phone2 from "@/assets/phone-2.jpg";
import phone3 from "@/assets/phone-3.jpg";
import phone4 from "@/assets/phone-4.jpg";
import phone5 from "@/assets/phone-5.jpg";
import phone6 from "@/assets/phone-6.jpg";

export type Product = {
  id: number;
  name: string;
  brand: string;
  category: string;
  price: number;
  oldPrice: number;
  discount: number;
  rating: number;
  reviews: number;
  image: string;
  gallery: string[];
  colors: string[];
  storages: string[];
  inStock: boolean;
  sku: string;
  description: string;
  specs: { label: string; value: string }[];
};

const gallery = [phone1, phone2, phone3, phone4, phone5, phone6];

function build(
  id: number,
  name: string,
  brand: string,
  category: string,
  price: number,
  oldPrice: number,
  rating: number,
  reviews: number,
  image: string,
  colors: string[],
  storages: string[],
  inStock = true,
): Product {
  const discount = Math.round(((oldPrice - price) / oldPrice) * 100);
  const idx = gallery.indexOf(image);
  const rest = gallery.filter((_, i) => i !== idx).slice(0, 3);
  return {
    id,
    name,
    brand,
    category,
    price,
    oldPrice,
    discount,
    rating,
    reviews,
    image,
    gallery: [image, ...rest],
    colors,
    storages,
    inStock,
    sku: `PL-${brand.slice(0, 3).toUpperCase()}-${id.toString().padStart(4, "0")}`,
    description: `Le ${name} de ${brand} incarne la nouvelle génération de smartphones premium. Écran haute définition, processeur ultra-rapide, appareil photo professionnel et autonomie longue durée. Design raffiné en noir, blanc et rose rouge.`,
    specs: [
      { label: "Marque", value: brand },
      { label: "Catégorie", value: category },
      { label: "Stockage", value: storages.join(" / ") },
      { label: "Couleurs", value: colors.join(", ") },
      { label: "Écran", value: "6.7\" AMOLED 120 Hz" },
      { label: "Batterie", value: "5000 mAh — charge rapide 65W" },
      { label: "Garantie", value: "2 ans constructeur" },
    ],
  };
}

export const products: Product[] = [
  build(1, "iPhone 15 Pro", "Apple", "Smartphones", 1299, 1499, 4.9, 245, phone1, ["Noir", "Argent"], ["128 Go", "256 Go", "512 Go", "1 To"]),
  build(2, "Galaxy S24 Ultra", "Samsung", "Smartphones", 1199, 1399, 4.8, 187, phone2, ["Noir", "Blanc"], ["256 Go", "512 Go", "1 To"]),
  build(3, "Pixel 8 Rouge", "Google", "Smartphones", 799, 999, 5.0, 132, phone3, ["Rose", "Noir"], ["128 Go", "256 Go"]),
  build(4, "Galaxy Z Fold 5", "Samsung", "Pliables", 1899, 2099, 4.7, 98, phone4, ["Noir", "Or"], ["256 Go", "512 Go", "1 To"]),
  build(5, "Xiaomi 14 Pro", "Xiaomi", "Smartphones", 899, 1099, 4.6, 156, phone5, ["Blanc", "Noir"], ["128 Go", "256 Go", "512 Go"]),
  build(6, "iPhone 15 Or", "Apple", "Smartphones", 1099, 1299, 4.9, 210, phone6, ["Or", "Rose"], ["128 Go", "256 Go", "512 Go"]),
  build(7, "OnePlus 12", "OnePlus", "Smartphones", 749, 899, 4.7, 88, phone1, ["Noir", "Argent"], ["128 Go", "256 Go"]),
  build(8, "Pixel 8 Pro", "Google", "Smartphones", 999, 1199, 4.8, 121, phone2, ["Noir", "Blanc"], ["128 Go", "256 Go", "512 Go"]),
  build(9, "Galaxy A55", "Samsung", "Basiques", 449, 549, 4.5, 73, phone5, ["Blanc", "Noir"], ["64 Go", "128 Go", "256 Go"]),
  build(10, "Xiaomi Redmi Note 13", "Xiaomi", "Basiques", 299, 399, 4.4, 64, phone4, ["Noir", "Blanc"], ["64 Go", "128 Go"]),
  build(11, "iPhone 14", "Apple", "Reconditionnés", 799, 999, 4.7, 199, phone3, ["Rose", "Noir"], ["128 Go", "256 Go"]),
  build(12, "Nothing Phone 2", "Nothing", "Gaming", 599, 749, 4.6, 55, phone6, ["Blanc", "Or"], ["128 Go", "256 Go"], false),
];

export function getProduct(id: number) {
  return products.find((p) => p.id === id);
}

export const CATEGORIES = ["Smartphones", "Pliables", "Reconditionnés", "Gaming", "Basiques", "Accessoires"];
export const BRANDS = ["Apple", "Samsung", "Google", "Xiaomi", "OnePlus", "Nothing"];
export const STORAGES = ["64 Go", "128 Go", "256 Go", "512 Go", "1 To"];
export const COLORS = ["Noir", "Blanc", "Rose", "Or", "Argent"];