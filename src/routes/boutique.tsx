import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  Heart,
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
  Eye,
  ShoppingCart,
  X,
} from "lucide-react";
import {
  products,
  CATEGORIES,
  BRANDS,
  STORAGES,
  COLORS,
  type Product,
} from "@/lib/products";

export const Route = createFileRoute("/boutique")({
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
  component: ShopThemed,
});

const PER_PAGE = 9;
const PRICE_MIN = 0;
const PRICE_MAX = 2000;

// ===== COULEURS PERSONNALISÉES =====
const COLORS_CUSTOM = {
  deep: "#0D0D0D",
  white: "#FFFFFF",
  orange: "#FF4500",
};

function toggle<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((x) => x !== value) : [...list, value];
}

function ShopThemed() {
  return (
    <div style={{ 
      backgroundColor: COLORS_CUSTOM.deep, 
      color: COLORS_CUSTOM.white,
      minHeight: "100vh",
    }}>
      <ShopInner />
    </div>
  );
}

function ShopInner() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selCats, setSelCats] = useState<string[]>([]);
  const [selBrands, setSelBrands] = useState<string[]>([]);
  const [selStorages, setSelStorages] = useState<string[]>([]);
  const [selColors, setSelColors] = useState<string[]>([]);
  const [selRatings, setSelRatings] = useState<number[]>([]);
  const [inStockOnly, setInStockOnly] = useState(true);
  const [outOfStock, setOutOfStock] = useState(false);
  const [priceMax, setPriceMax] = useState(PRICE_MAX);
  const [sort, setSort] = useState("default");

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (search && !`${p.name} ${p.brand}`.toLowerCase().includes(search.toLowerCase())) return false;
      if (selCats.length && !selCats.includes(p.category)) return false;
      if (selBrands.length && !selBrands.includes(p.brand)) return false;
      if (selStorages.length && !p.storages.some((s) => selStorages.includes(s))) return false;
      if (selColors.length && !p.colors.some((c) => selColors.includes(c))) return false;
      if (selRatings.length && !selRatings.some((r) => Math.floor(p.rating) >= r)) return false;
      if (p.price > priceMax) return false;
      if (inStockOnly && !outOfStock && !p.inStock) return false;
      if (!inStockOnly && outOfStock && p.inStock) return false;
      return true;
    });
    if (sort === "asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "new") list = [...list].sort((a, b) => b.id - a.id);
    return list;
  }, [search, selCats, selBrands, selStorages, selColors, selRatings, priceMax, inStockOnly, outOfStock, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  const activeChips: { label: string; onRemove: () => void }[] = [];
  if (priceMax < PRICE_MAX) activeChips.push({ label: `Jusqu'à ${priceMax} €`, onRemove: () => setPriceMax(PRICE_MAX) });
  selCats.forEach((c) => activeChips.push({ label: c, onRemove: () => setSelCats((v) => v.filter((x) => x !== c)) }));
  selBrands.forEach((c) => activeChips.push({ label: c, onRemove: () => setSelBrands((v) => v.filter((x) => x !== c)) }));
  selStorages.forEach((c) => activeChips.push({ label: c, onRemove: () => setSelStorages((v) => v.filter((x) => x !== c)) }));
  selColors.forEach((c) => activeChips.push({ label: c, onRemove: () => setSelColors((v) => v.filter((x) => x !== c)) }));
  selRatings.forEach((c) => activeChips.push({ label: `${c}+ étoiles`, onRemove: () => setSelRatings((v) => v.filter((x) => x !== c)) }));

  const clearAll = () => {
    setSelCats([]); setSelBrands([]); setSelStorages([]); setSelColors([]);
    setSelRatings([]); setPriceMax(PRICE_MAX); setSearch("");
  };

  // Styles communs
  const textOrange = { color: COLORS_CUSTOM.orange };
  const borderOrange = { borderColor: COLORS_CUSTOM.orange };
  const bgOrange = { backgroundColor: COLORS_CUSTOM.orange };
  const bgDeep = { backgroundColor: COLORS_CUSTOM.deep };
  const bgWhite = { backgroundColor: COLORS_CUSTOM.white };
  const textWhite = { color: COLORS_CUSTOM.white };
  const textDeep = { color: COLORS_CUSTOM.deep };

  return (
    <div className="min-h-screen" style={{ backgroundColor: COLORS_CUSTOM.deep, color: COLORS_CUSTOM.white }}>

      {/* Page title */}
      <section style={{ backgroundColor: `rgba(255,255,255,0.03)` }}>
        <div className="mx-auto max-w-7xl px-6 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight" style={{ color: COLORS_CUSTOM.white }}>
            Boutique
          </h1>
          <p className="mt-3 text-sm" style={{ color: `rgba(255,255,255,0.6)` }}>
            Accueil <span className="mx-2" style={{ color: COLORS_CUSTOM.orange }}>/</span> Boutique
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-6 py-12 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10">
        {/* Sidebar */}
        <aside className="space-y-8">
          <FilterBlock 
            title="Catégories" 
            items={CATEGORIES} 
            selected={selCats} 
            onToggle={(v) => { setSelCats(toggle(selCats, v)); setPage(1); }}
            orange={COLORS_CUSTOM.orange}
            white={COLORS_CUSTOM.white}
            deep={COLORS_CUSTOM.deep}
          />
          <FilterBlock 
            title="Marques" 
            items={BRANDS} 
            selected={selBrands} 
            onToggle={(v) => { setSelBrands(toggle(selBrands, v)); setPage(1); }}
            orange={COLORS_CUSTOM.orange}
            white={COLORS_CUSTOM.white}
            deep={COLORS_CUSTOM.deep}
          />

          <div>
            <h3 className="text-sm font-semibold mb-4 border-l-2 pl-3" style={{ color: COLORS_CUSTOM.white, borderColor: COLORS_CUSTOM.orange }}>
              Prix
            </h3>
            <p className="text-xs mb-3" style={{ color: `rgba(255,255,255,0.6)` }}>{PRICE_MIN} € — {priceMax} €</p>
            <input
              type="range"
              min={PRICE_MIN}
              max={PRICE_MAX}
              step={50}
              value={priceMax}
              onChange={(e) => { setPriceMax(Number(e.target.value)); setPage(1); }}
              className="w-full"
              style={{ accentColor: COLORS_CUSTOM.orange }}
            />
          </div>

          <FilterBlock 
            title="Stockage" 
            items={STORAGES} 
            selected={selStorages} 
            onToggle={(v) => { setSelStorages(toggle(selStorages, v)); setPage(1); }}
            orange={COLORS_CUSTOM.orange}
            white={COLORS_CUSTOM.white}
            deep={COLORS_CUSTOM.deep}
          />

          <div>
            <h3 className="text-sm font-semibold mb-4 border-l-2 pl-3" style={{ color: COLORS_CUSTOM.white, borderColor: COLORS_CUSTOM.orange }}>
              Note client
            </h3>
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((n) => (
                <label key={n} className="flex items-center gap-2 text-xs cursor-pointer" style={{ color: COLORS_CUSTOM.white }}>
                  <input
                    type="checkbox"
                    checked={selRatings.includes(n)}
                    onChange={() => { setSelRatings(toggle(selRatings, n)); setPage(1); }}
                    className="accent-orange"
                    style={{ accentColor: COLORS_CUSTOM.orange }}
                  />
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`h-3.5 w-3.5 ${i < n ? "fill-orange text-orange" : "opacity-30"}`} style={{ color: i < n ? COLORS_CUSTOM.orange : COLORS_CUSTOM.white }} />
                    ))}
                  </div>
                  <span style={{ color: `rgba(255,255,255,0.5)` }}>{n}+ étoiles</span>
                </label>
              ))}
            </div>
          </div>

          <FilterBlock 
            title="Couleur" 
            items={COLORS} 
            selected={selColors} 
            onToggle={(v) => { setSelColors(toggle(selColors, v)); setPage(1); }}
            orange={COLORS_CUSTOM.orange}
            white={COLORS_CUSTOM.white}
            deep={COLORS_CUSTOM.deep}
          />

          <div>
            <h3 className="text-sm font-semibold mb-4 border-l-2 pl-3" style={{ color: COLORS_CUSTOM.white, borderColor: COLORS_CUSTOM.orange }}>
              Disponibilité
            </h3>
            <div className="space-y-2 text-xs">
              <label className="flex items-center gap-2 cursor-pointer" style={{ color: COLORS_CUSTOM.white }}>
                <input type="checkbox" checked={inStockOnly} onChange={(e) => setInStockOnly(e.target.checked)} style={{ accentColor: COLORS_CUSTOM.orange }} />
                <span>En stock</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer" style={{ color: COLORS_CUSTOM.white }}>
                <input type="checkbox" checked={outOfStock} onChange={(e) => setOutOfStock(e.target.checked)} style={{ accentColor: COLORS_CUSTOM.orange }} />
                <span>Rupture de stock</span>
              </label>
            </div>
          </div>
        </aside>

        {/* Products area */}
        <main>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <p className="text-sm" style={{ color: `rgba(255,255,255,0.6)` }}>
              Affichage {filtered.length === 0 ? 0 : (currentPage - 1) * PER_PAGE + 1}–{Math.min(currentPage * PER_PAGE, filtered.length)} sur {filtered.length} résultats
            </p>
            <div className="flex items-center gap-2 text-sm">
              <span style={{ color: `rgba(255,255,255,0.6)` }}>Trier par :</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2"
                style={{ 
                  backgroundColor: `rgba(255,255,255,0.05)`,
                  borderColor: `rgba(255,255,255,0.15)`,
                  color: COLORS_CUSTOM.white,
                  focusRingColor: COLORS_CUSTOM.orange,
                }}
              >
                <option value="default" style={{ backgroundColor: COLORS_CUSTOM.deep, color: COLORS_CUSTOM.white }}>Tri par défaut</option>
                <option value="asc" style={{ backgroundColor: COLORS_CUSTOM.deep, color: COLORS_CUSTOM.white }}>Prix croissant</option>
                <option value="desc" style={{ backgroundColor: COLORS_CUSTOM.deep, color: COLORS_CUSTOM.white }}>Prix décroissant</option>
                <option value="new" style={{ backgroundColor: COLORS_CUSTOM.deep, color: COLORS_CUSTOM.white }}>Nouveautés</option>
              </select>
            </div>
          </div>

          {activeChips.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mb-8">
              <span className="text-sm mr-2" style={{ color: `rgba(255,255,255,0.6)` }}>Filtres actifs</span>
              {activeChips.map((f, i) => (
                <button
                  key={i}
                  onClick={f.onRemove}
                  className="inline-flex items-center gap-1.5 rounded-full text-xs font-medium px-3 py-1.5 transition"
                  style={{ 
                    backgroundColor: COLORS_CUSTOM.orange, 
                    color: COLORS_CUSTOM.white 
                  }}
                >
                  {f.label} <X className="h-3 w-3" />
                </button>
              ))}
              <button onClick={clearAll} className="text-xs underline underline-offset-4 ml-2" style={{ color: COLORS_CUSTOM.orange }}>Tout effacer</button>
            </div>
          )}

          {pageItems.length === 0 ? (
            <div className="text-center py-20" style={{ color: `rgba(255,255,255,0.6)` }}>
              Aucun produit ne correspond à vos filtres.
              <div><button onClick={clearAll} className="underline mt-3" style={{ color: COLORS_CUSTOM.orange }}>Réinitialiser</button></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {pageItems.map((p) => <ProductCard key={p.id} product={p} orange={COLORS_CUSTOM.orange} white={COLORS_CUSTOM.white} deep={COLORS_CUSTOM.deep} />)}
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-14">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="h-9 w-9 flex items-center justify-center rounded-full border disabled:opacity-40 transition hover:opacity-70"
                style={{ borderColor: `rgba(255,255,255,0.15)`, color: COLORS_CUSTOM.white }}
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`h-9 w-9 rounded-full text-sm font-medium transition ${
                    currentPage === i + 1 
                      ? "text-white" 
                      : "border hover:opacity-70"
                  }`}
                  style={currentPage === i + 1 
                    ? { backgroundColor: COLORS_CUSTOM.orange, color: COLORS_CUSTOM.white }
                    : { borderColor: `rgba(255,255,255,0.15)`, color: COLORS_CUSTOM.white }
                  }
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="h-9 w-9 flex items-center justify-center rounded-full border disabled:opacity-40 transition hover:opacity-70"
                style={{ borderColor: `rgba(255,255,255,0.15)`, color: COLORS_CUSTOM.white }}
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Perks */}
      <section className="border-t" style={{ borderColor: `rgba(255,255,255,0.08)` }}>
        <div className="mx-auto max-w-7xl px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Truck, title: "Livraison offerte", desc: "Livraison gratuite dès 50 € d'achat" },
            { icon: CreditCard, title: "Paiement LinkMobile", desc: "Payez en toute sécurité via LinkMobile" },
            { icon: Headphones, title: "Support 24 × 7", desc: "Notre équipe vous accompagne à tout moment" },
          ].map((p) => (
            <div key={p.title} className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: COLORS_CUSTOM.orange }}>
                <p.icon className="h-6 w-6" style={{ color: COLORS_CUSTOM.white }} />
              </div>
              <div>
                <h4 className="font-semibold" style={{ color: COLORS_CUSTOM.white }}>{p.title}</h4>
                <p className="text-sm" style={{ color: `rgba(255,255,255,0.6)` }}>{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function FilterBlock({
  title, items, selected, onToggle, orange, white, deep
}: { 
  title: string; 
  items: string[]; 
  selected: string[]; 
  onToggle: (v: string) => void;
  orange: string;
  white: string;
  deep: string;
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold mb-4 border-l-2 pl-3" style={{ color: white, borderColor: orange }}>
        {title}
      </h3>
      <div className="space-y-2 text-xs">
        {items.map((item) => (
          <label key={item} className="flex items-center gap-2 cursor-pointer transition hover:opacity-70" style={{ color: `rgba(255,255,255,0.7)` }}>
            <input type="checkbox" checked={selected.includes(item)} onChange={() => onToggle(item)} style={{ accentColor: orange }} />
            <span>{item}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

function ProductCard({ product, orange, white, deep }: { product: Product; orange: string; white: string; deep: string }) {
  return (
    <div className="group relative">
      <Link to="/product/$id" params={{ id: String(product.id) }} className="block">
        <div className="relative aspect-square overflow-hidden rounded-xl" style={{ backgroundColor: `rgba(255,255,255,0.05)` }}>
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            width={1024}
            height={1024}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
          <span className="absolute top-3 left-3 rounded-md text-primary-foreground text-xs font-semibold px-2.5 py-1" style={{ backgroundColor: orange, color: white }}>
            -{product.discount}%
          </span>
          {!product.inStock && (
            <span className="absolute top-3 right-3 rounded-md text-secondary-foreground text-xs font-semibold px-2.5 py-1" style={{ backgroundColor: `rgba(255,255,255,0.15)`, color: white }}>
              Rupture
            </span>
          )}
          <div className="absolute inset-x-3 bottom-3 flex gap-2 opacity-0 group-hover:opacity-100 transition">
            <span className="flex-1 rounded-md text-xs font-semibold py-2 text-center inline-flex items-center justify-center gap-1.5" style={{ backgroundColor: orange, color: white }}>
              <Eye className="h-3.5 w-3.5" /> Voir plus
            </span>
            <button
              onClick={(e) => { e.preventDefault(); toast.success(`${product.name} ajouté au panier`); }}
              className="h-8 w-8 rounded-md flex items-center justify-center shadow transition hover:opacity-80"
              style={{ backgroundColor: white, color: deep }}
              aria-label="Ajouter au panier"
            >
              <ShoppingCart className="h-4 w-4" />
            </button>
            <button
              onClick={(e) => { e.preventDefault(); toast.success(`${product.name} ajouté aux favoris`); }}
              className="h-8 w-8 rounded-md flex items-center justify-center shadow transition hover:opacity-80"
              style={{ backgroundColor: white, color: deep }}
              aria-label="Favori"
            >
              <Heart className="h-4 w-4" />
            </button>
          </div>
        </div>
      </Link>
      <div className="mt-4 flex items-start justify-between gap-2">
        <div>
          <p className="text-xs" style={{ color: `rgba(255,255,255,0.5)` }}>{product.brand}</p>
          <Link to="/product/$id" params={{ id: String(product.id) }} className="font-medium hover:opacity-70 transition" style={{ color: white }}>
            {product.name}
          </Link>
        </div>
        <div className="flex items-center gap-1 text-xs" style={{ color: white }}>
          <Star className="h-3.5 w-3.5" style={{ fill: orange, color: orange }} />
          <span className="font-medium">{product.rating}</span>
        </div>
      </div>
      <div className="mt-1.5 flex items-baseline gap-2">
        <span className="font-semibold" style={{ color: orange }}>{product.price} €</span>
        <span className="text-xs" style={{ color: `rgba(255,255,255,0.4)` }}><s>{product.oldPrice} €</s></span>
      </div>
    </div>
  );
}
