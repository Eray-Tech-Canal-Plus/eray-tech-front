import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Star,
  ChevronLeft,
  ChevronRight,
  Truck,
  CreditCard,
  Headphones,
  Maximize2,
  ShoppingCart,
} from "lucide-react";
import phone1 from "@/assets/phone-1.jpg";
import phone2 from "@/assets/phone-2.jpg";
import phone3 from "@/assets/phone-3.jpg";
import phone4 from "@/assets/phone-4.jpg";
import phone5 from "@/assets/phone-5.jpg";
import phone6 from "@/assets/phone-6.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Boutique — PhoneLux" },
      {
        name: "description",
        content:
          "Parcourez notre catalogue de smartphones : iPhone, Samsung Galaxy, Google Pixel, Xiaomi. Filtres par marque, prix, stockage et couleur.",
      },
    ],
  }),
  component: Shop,
});

type Product = {
  id: number;
  name: string;
  brand: string;
  price: number;
  oldPrice: number;
  discount: number;
  rating: number;
  image: string;
};

const products: Product[] = [
  { id: 1, name: "iPhone 15 Pro", brand: "Apple", price: 1299, oldPrice: 1499, discount: 15, rating: 4.9, image: phone1 },
  { id: 2, name: "Galaxy S24 Ultra", brand: "Samsung", price: 1199, oldPrice: 1399, discount: 20, rating: 4.8, image: phone2 },
  { id: 3, name: "Pixel 8 Rouge", brand: "Google", price: 799, oldPrice: 999, discount: 20, rating: 5.0, image: phone3 },
  { id: 4, name: "Galaxy Z Fold 5", brand: "Samsung", price: 1899, oldPrice: 2099, discount: 10, rating: 4.7, image: phone4 },
  { id: 5, name: "Xiaomi 14 Pro", brand: "Xiaomi", price: 899, oldPrice: 1099, discount: 20, rating: 4.6, image: phone5 },
  { id: 6, name: "iPhone 15 Or", brand: "Apple", price: 1099, oldPrice: 1299, discount: 15, rating: 4.9, image: phone6 },
  { id: 7, name: "OnePlus 12", brand: "OnePlus", price: 749, oldPrice: 899, discount: 17, rating: 4.7, image: phone1 },
  { id: 8, name: "Pixel 8 Pro", brand: "Google", price: 999, oldPrice: 1199, discount: 17, rating: 4.8, image: phone2 },
  { id: 9, name: "Galaxy A55", brand: "Samsung", price: 449, oldPrice: 549, discount: 18, rating: 4.5, image: phone5 },
  { id: 10, name: "Xiaomi Redmi Note 13", brand: "Xiaomi", price: 299, oldPrice: 399, discount: 25, rating: 4.4, image: phone4 },
  { id: 11, name: "iPhone 14", brand: "Apple", price: 799, oldPrice: 999, discount: 20, rating: 4.7, image: phone3 },
  { id: 12, name: "Nothing Phone 2", brand: "Nothing", price: 599, oldPrice: 749, discount: 20, rating: 4.6, image: phone6 },
];

const categories = ["Smartphones", "Pliables", "Reconditionnés", "Gaming", "Basiques", "Accessoires"];
const brands = ["Apple", "Samsung", "Google", "Xiaomi", "OnePlus", "Nothing"];
const storages = ["64 Go", "128 Go", "256 Go", "512 Go", "1 To"];
const colors = ["Noir", "Blanc", "Rose", "Or", "Argent"];

function Shop() {
  const [page, setPage] = useState(1);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top bar */}
      <div className="bg-secondary text-secondary-foreground text-xs">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2.5">
          <span>Appelez-nous : +33 1 23 45 67 89</span>
          <span className="hidden md:block">
            Inscrivez-vous et obtenez <span className="text-primary font-semibold">20% de réduction</span> sur votre première commande.{" "}
            <a href="#" className="underline underline-offset-2">Inscription</a>
          </span>
          <div className="flex items-center gap-3">
            <Facebook className="h-3.5 w-3.5" />
            <Twitter className="h-3.5 w-3.5" />
            <Instagram className="h-3.5 w-3.5" />
            <Youtube className="h-3.5 w-3.5" />
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a href="#" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
              P
            </div>
            <span className="text-xl font-semibold tracking-tight">PhoneLux<span className="text-primary">.</span></span>
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#" className="hover:text-primary transition">Accueil</a>
            <a href="#" className="text-primary">Boutique</a>
            <a href="#" className="hover:text-primary transition">Smartphones</a>
            <a href="#" className="hover:text-primary transition">Accessoires</a>
            <a href="#" className="hover:text-primary transition">À propos</a>
            <a href="#" className="hover:text-primary transition">Blog</a>
          </nav>
          <div className="flex items-center gap-4 text-foreground">
            <Search className="h-5 w-5 cursor-pointer hover:text-primary" />
            <Heart className="h-5 w-5 cursor-pointer hover:text-primary" />
            <ShoppingBag className="h-5 w-5 cursor-pointer hover:text-primary" />
            <User className="h-5 w-5 cursor-pointer hover:text-primary" />
          </div>
        </div>
      </header>

      {/* Page title */}
      <section className="bg-muted">
        <div className="mx-auto max-w-7xl px-6 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Boutique</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Accueil <span className="mx-2 text-primary">/</span> Boutique
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-6 py-12 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10">
        {/* Sidebar filters */}
        <aside className="space-y-8">
          <FilterBlock title="Catégories" items={categories} />
          <FilterBlock title="Marques" items={brands} defaultChecked={["Apple"]} />

          <div>
            <h3 className="text-sm font-semibold mb-4 border-l-2 border-primary pl-3">Prix</h3>
            <p className="text-xs text-muted-foreground mb-3">299 € — 1 899 €</p>
            <div className="relative h-1.5 rounded-full bg-muted">
              <div className="absolute left-[10%] right-[15%] h-1.5 rounded-full bg-primary" />
              <div className="absolute left-[10%] -top-1 h-3.5 w-3.5 rounded-full bg-primary border-2 border-background shadow" />
              <div className="absolute right-[15%] -top-1 h-3.5 w-3.5 rounded-full bg-primary border-2 border-background shadow" />
            </div>
          </div>

          <FilterBlock title="Stockage" items={storages} defaultChecked={["256 Go"]} />

          <div>
            <h3 className="text-sm font-semibold mb-4 border-l-2 border-primary pl-3">Note client</h3>
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((n) => (
                <label key={n} className="flex items-center gap-2 text-xs cursor-pointer">
                  <input type="checkbox" className="accent-primary" />
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3.5 w-3.5 ${i < n ? "fill-primary text-primary" : "text-muted-foreground/40"}`}
                      />
                    ))}
                  </div>
                  <span className="text-muted-foreground">{n} étoiles</span>
                </label>
              ))}
            </div>
          </div>

          <FilterBlock title="Couleur" items={colors} defaultChecked={["Noir"]} />

          <div>
            <h3 className="text-sm font-semibold mb-4 border-l-2 border-primary pl-3">Disponibilité</h3>
            <div className="space-y-2 text-xs">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="accent-primary" />
                <span>En stock</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="accent-primary" />
                <span>Rupture de stock</span>
              </label>
            </div>
          </div>
        </aside>

        {/* Products area */}
        <main>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <p className="text-sm text-muted-foreground">Affichage 1–12 sur 2 560 résultats</p>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Trier par :</span>
              <select className="border border-border rounded-md px-3 py-2 bg-background focus:outline-none focus:ring-2 focus:ring-primary">
                <option>Tri par défaut</option>
                <option>Prix croissant</option>
                <option>Prix décroissant</option>
                <option>Nouveautés</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 mb-8">
            <span className="text-sm text-muted-foreground mr-2">Filtres actifs</span>
            {["Prix : 200 € – 1 900 €", "Apple", "En stock"].map((f) => (
              <span
                key={f}
                className="inline-flex items-center gap-1.5 rounded-full bg-accent text-primary text-xs font-medium px-3 py-1.5"
              >
                {f} <span className="cursor-pointer">×</span>
              </span>
            ))}
            <button className="text-xs text-primary underline underline-offset-4 ml-2">Tout effacer</button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-2 mt-14">
            <button className="h-9 w-9 flex items-center justify-center rounded-full border border-border hover:bg-muted">
              <ChevronLeft className="h-4 w-4" />
            </button>
            {[1, 2, 3].map((n) => (
              <button
                key={n}
                onClick={() => setPage(n)}
                className={`h-9 w-9 rounded-full text-sm font-medium transition ${
                  page === n
                    ? "bg-primary text-primary-foreground"
                    : "border border-border hover:bg-muted"
                }`}
              >
                {n}
              </button>
            ))}
            <span className="px-2 text-muted-foreground">…</span>
            <button className="h-9 w-9 rounded-full border border-border hover:bg-muted text-sm">10</button>
            <button className="h-9 w-9 flex items-center justify-center rounded-full border border-border hover:bg-muted">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </main>
      </div>

      {/* Perks */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Truck, title: "Livraison offerte", desc: "Livraison gratuite dès 50 € d'achat" },
            { icon: CreditCard, title: "Paiement flexible", desc: "Plusieurs options de paiement sécurisées" },
            { icon: Headphones, title: "Support 24 × 7", desc: "Notre équipe vous accompagne à tout moment" },
          ].map((p) => (
            <div key={p.title} className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-accent text-primary flex items-center justify-center">
                <p.icon className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-semibold">{p.title}</h4>
                <p className="text-sm text-muted-foreground">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary text-secondary-foreground/80 text-sm">
        <div className="mx-auto max-w-7xl px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-3">
          <p>© 2026 PhoneLux. Tous droits réservés.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary">Mentions légales</a>
            <a href="#" className="hover:text-primary">Confidentialité</a>
            <a href="#" className="hover:text-primary">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FilterBlock({
  title,
  items,
  defaultChecked = [],
}: {
  title: string;
  items: string[];
  defaultChecked?: string[];
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold mb-4 border-l-2 border-primary pl-3">{title}</h3>
      <div className="space-y-2 text-xs">
        {items.map((item) => (
          <label key={item} className="flex items-center gap-2 cursor-pointer text-muted-foreground hover:text-foreground">
            <input
              type="checkbox"
              defaultChecked={defaultChecked.includes(item)}
              className="accent-primary"
            />
            <span>{item}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group relative">
      <div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={1024}
          height={1024}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute top-3 left-3 rounded-md bg-primary text-primary-foreground text-xs font-semibold px-2.5 py-1">
          -{product.discount}%
        </span>
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition">
          <IconBubble><Heart className="h-4 w-4" /></IconBubble>
          <IconBubble><Maximize2 className="h-4 w-4" /></IconBubble>
          <IconBubble><ShoppingCart className="h-4 w-4" /></IconBubble>
        </div>
      </div>
      <div className="mt-4 flex items-start justify-between gap-2">
        <div>
          <p className="text-xs text-muted-foreground">{product.brand}</p>
          <h3 className="font-medium">{product.name}</h3>
        </div>
        <div className="flex items-center gap-1 text-xs">
          <Star className="h-3.5 w-3.5 fill-primary text-primary" />
          <span className="font-medium">{product.rating}</span>
        </div>
      </div>
      <div className="mt-1.5 flex items-baseline gap-2">
        <span className="text-primary font-semibold">{product.price} €</span>
        <span className="text-xs text-muted-foreground line-through">{product.oldPrice} €</span>
      </div>
    </div>
  );
}

function IconBubble({ children }: { children: React.ReactNode }) {
  return (
    <button className="h-8 w-8 rounded-full bg-background/95 backdrop-blur flex items-center justify-center shadow hover:bg-primary hover:text-primary-foreground transition">
      {children}
    </button>
  );
}