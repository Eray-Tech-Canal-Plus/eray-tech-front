import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
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

function toggle<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((x) => x !== value) : [...list, value];
}

function ShopThemed() {
  return (<div className="theme-shop"><ShopInner /></div>);
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

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top bar */}
      <div className="bg-secondary text-secondary-foreground text-xs">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2.5">
          <span>Appelez-nous : +33 1 23 45 67 89</span>
          <span className="hidden md:block">
            Inscrivez-vous et obtenez <span className="text-primary font-semibold">20% de réduction</span> sur votre première commande.{" "}
            <button onClick={() => toast.success("Inscription ouverte !")} className="underline underline-offset-2">Inscription</button>
          </span>
          <div className="flex items-center gap-3">
            {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
              <button key={i} onClick={() => toast("Réseaux sociaux à venir")} className="hover:text-primary">
                <Icon className="h-3.5 w-3.5" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="border-b border-border bg-background sticky top-0 z-30">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 gap-6">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">P</div>
            <span className="text-xl font-semibold tracking-tight">PhoneLux<span className="text-primary">.</span></span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link to="/" className="text-primary">Boutique</Link>
            <button onClick={() => setSelCats(["Smartphones"])} className="hover:text-primary transition">Smartphones</button>
            <button onClick={() => setSelCats(["Accessoires"])} className="hover:text-primary transition">Accessoires</button>
            <button onClick={() => toast("Page à venir")} className="hover:text-primary transition">À propos</button>
          </nav>
          <div className="flex items-center gap-3 text-foreground">
            <div className="relative hidden sm:block">
              <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                placeholder="Rechercher..."
                className="pl-9 pr-3 py-2 h-9 rounded-md border border-border bg-background text-sm w-48 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <button onClick={() => toast("Favoris mis à jour")} className="hover:text-primary"><Heart className="h-5 w-5" /></button>
            <button onClick={() => toast("Panier ouvert")} className="hover:text-primary"><ShoppingBag className="h-5 w-5" /></button>
            <button onClick={() => toast("Connexion à venir")} className="hover:text-primary"><User className="h-5 w-5" /></button>
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
        {/* Sidebar */}
        <aside className="space-y-8">
          <FilterBlock title="Catégories" items={CATEGORIES} selected={selCats} onToggle={(v) => { setSelCats(toggle(selCats, v)); setPage(1); }} />
          <FilterBlock title="Marques" items={BRANDS} selected={selBrands} onToggle={(v) => { setSelBrands(toggle(selBrands, v)); setPage(1); }} />

          <div>
            <h3 className="text-sm font-semibold mb-4 border-l-2 border-primary pl-3">Prix</h3>
            <p className="text-xs text-muted-foreground mb-3">{PRICE_MIN} € — {priceMax} €</p>
            <input
              type="range"
              min={PRICE_MIN}
              max={PRICE_MAX}
              step={50}
              value={priceMax}
              onChange={(e) => { setPriceMax(Number(e.target.value)); setPage(1); }}
              className="w-full accent-primary"
            />
          </div>

          <FilterBlock title="Stockage" items={STORAGES} selected={selStorages} onToggle={(v) => { setSelStorages(toggle(selStorages, v)); setPage(1); }} />

          <div>
            <h3 className="text-sm font-semibold mb-4 border-l-2 border-primary pl-3">Note client</h3>
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((n) => (
                <label key={n} className="flex items-center gap-2 text-xs cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selRatings.includes(n)}
                    onChange={() => { setSelRatings(toggle(selRatings, n)); setPage(1); }}
                    className="accent-primary"
                  />
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`h-3.5 w-3.5 ${i < n ? "fill-primary text-primary" : "text-muted-foreground/40"}`} />
                    ))}
                  </div>
                  <span className="text-muted-foreground">{n}+ étoiles</span>
                </label>
              ))}
            </div>
          </div>

          <FilterBlock title="Couleur" items={COLORS} selected={selColors} onToggle={(v) => { setSelColors(toggle(selColors, v)); setPage(1); }} />

          <div>
            <h3 className="text-sm font-semibold mb-4 border-l-2 border-primary pl-3">Disponibilité</h3>
            <div className="space-y-2 text-xs">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={inStockOnly} onChange={(e) => setInStockOnly(e.target.checked)} className="accent-primary" />
                <span>En stock</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={outOfStock} onChange={(e) => setOutOfStock(e.target.checked)} className="accent-primary" />
                <span>Rupture de stock</span>
              </label>
            </div>
          </div>
        </aside>

        {/* Products area */}
        <main>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <p className="text-sm text-muted-foreground">
              Affichage {filtered.length === 0 ? 0 : (currentPage - 1) * PER_PAGE + 1}–{Math.min(currentPage * PER_PAGE, filtered.length)} sur {filtered.length} résultats
            </p>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Trier par :</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="border border-border rounded-md px-3 py-2 bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="default">Tri par défaut</option>
                <option value="asc">Prix croissant</option>
                <option value="desc">Prix décroissant</option>
                <option value="new">Nouveautés</option>
              </select>
            </div>
          </div>

          {activeChips.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mb-8">
              <span className="text-sm text-muted-foreground mr-2">Filtres actifs</span>
              {activeChips.map((f, i) => (
                <button
                  key={i}
                  onClick={f.onRemove}
                  className="inline-flex items-center gap-1.5 rounded-full bg-accent text-primary text-xs font-medium px-3 py-1.5 hover:bg-primary hover:text-primary-foreground transition"
                >
                  {f.label} <X className="h-3 w-3" />
                </button>
              ))}
              <button onClick={clearAll} className="text-xs text-primary underline underline-offset-4 ml-2">Tout effacer</button>
            </div>
          )}

          {pageItems.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              Aucun produit ne correspond à vos filtres.
              <div><button onClick={clearAll} className="text-primary underline mt-3">Réinitialiser</button></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {pageItems.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-14">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="h-9 w-9 flex items-center justify-center rounded-full border border-border hover:bg-muted disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`h-9 w-9 rounded-full text-sm font-medium transition ${
                    currentPage === i + 1 ? "bg-primary text-primary-foreground" : "border border-border hover:bg-muted"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="h-9 w-9 flex items-center justify-center rounded-full border border-border hover:bg-muted disabled:opacity-40"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Perks */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Truck, title: "Livraison offerte", desc: "Livraison gratuite dès 50 € d'achat" },
            { icon: CreditCard, title: "Paiement LinkMobile", desc: "Payez en toute sécurité via LinkMobile" },
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

      <footer className="bg-secondary text-secondary-foreground/80 text-sm">
        <div className="mx-auto max-w-7xl px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-3">
          <p>© 2026 PhoneLux. Tous droits réservés.</p>
          <div className="flex gap-6">
            <button onClick={() => toast("Mentions légales")} className="hover:text-primary">Mentions légales</button>
            <button onClick={() => toast("Confidentialité")} className="hover:text-primary">Confidentialité</button>
            <button onClick={() => toast("Contact : contact@phonelux.fr")} className="hover:text-primary">Contact</button>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FilterBlock({
  title, items, selected, onToggle,
}: { title: string; items: string[]; selected: string[]; onToggle: (v: string) => void }) {
  return (
    <div>
      <h3 className="text-sm font-semibold mb-4 border-l-2 border-primary pl-3">{title}</h3>
      <div className="space-y-2 text-xs">
        {items.map((item) => (
          <label key={item} className="flex items-center gap-2 cursor-pointer text-muted-foreground hover:text-foreground">
            <input type="checkbox" checked={selected.includes(item)} onChange={() => onToggle(item)} className="accent-primary" />
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
      <Link to="/product/$id" params={{ id: String(product.id) }} className="block">
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
          {!product.inStock && (
            <span className="absolute top-3 right-3 rounded-md bg-secondary text-secondary-foreground text-xs font-semibold px-2.5 py-1">
              Rupture
            </span>
          )}
          <div className="absolute inset-x-3 bottom-3 flex gap-2 opacity-0 group-hover:opacity-100 transition">
            <span className="flex-1 rounded-md bg-primary text-primary-foreground text-xs font-semibold py-2 text-center inline-flex items-center justify-center gap-1.5">
              <Eye className="h-3.5 w-3.5" /> Voir plus
            </span>
            <button
              onClick={(e) => { e.preventDefault(); toast.success(`${product.name} ajouté au panier`); }}
              className="h-8 w-8 rounded-md bg-background text-foreground flex items-center justify-center shadow hover:bg-primary hover:text-primary-foreground"
              aria-label="Ajouter au panier"
            >
              <ShoppingCart className="h-4 w-4" />
            </button>
            <button
              onClick={(e) => { e.preventDefault(); toast.success(`${product.name} ajouté aux favoris`); }}
              className="h-8 w-8 rounded-md bg-background text-foreground flex items-center justify-center shadow hover:bg-primary hover:text-primary-foreground"
              aria-label="Favori"
            >
              <Heart className="h-4 w-4" />
            </button>
          </div>
        </div>
      </Link>
      <div className="mt-4 flex items-start justify-between gap-2">
        <div>
          <p className="text-xs text-muted-foreground">{product.brand}</p>
          <Link to="/product/$id" params={{ id: String(product.id) }} className="font-medium hover:text-primary">
            {product.name}
          </Link>
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