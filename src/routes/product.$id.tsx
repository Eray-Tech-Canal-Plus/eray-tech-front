import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Heart,
  Share2,
  Facebook,
  Twitter,
  Instagram,
  ShoppingCart,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  User,
  Smartphone,
  Shield,
  X,
  Check,
} from "lucide-react";
import { getProduct, products, type Product } from "@/lib/products";

export const Route = createFileRoute("/product/$id")({
  head: ({ params }) => {
    const p = getProduct(Number(params.id));
    return {
      meta: [
        { title: p ? `${p.name} — PhoneLux` : "Produit — PhoneLux" },
        { name: "description", content: p?.description ?? "Détail du produit PhoneLux." },
      ],
    };
  },
  loader: ({ params }) => {
    const product = getProduct(Number(params.id));
    if (!product) throw notFound();
    return { product };
  },
  component: ProductPageThemed,
});

const REVIEWS = [
  {
    name: "Maminirina R.",
    verified: true,
    when: "il y a 1 mois",
    rating: 5,
    title: "J'adore ce téléphone !",
    body: "Qualité incroyable, appareil photo au top, batterie qui tient toute la journée. Livraison rapide et emballage soigné.",
  },
  {
    name: "Haritiana S.",
    verified: true,
    when: "il y a 2 mois",
    rating: 5,
    title: "Parfait pour un usage quotidien !",
    body: "Fluidité irréprochable, écran magnifique. Le rose rouge est vraiment élégant. Je recommande vivement.",
  },
  {
    name: "Miangaly T.",
    verified: true,
    when: "il y a 2 mois",
    rating: 4,
    title: "Très bon rapport qualité/prix",
    body: "Un excellent smartphone pour ce prix, quelques petits détails à améliorer mais rien de bloquant.",
  },
  {
    name: "Haja F.",
    verified: true,
    when: "il y a 3 mois",
    rating: 5,
    title: "Design premium",
    body: "Finition impeccable, performances au rendez-vous. Le SAV PhoneLux est également très réactif.",
  },
];

function ProductPageThemed() {
  return (
    <div className="theme-shop">
      <ProductPageInner />
    </div>
  );
}
function ProductPageInner() {
  const { product } = Route.useLoaderData() as { product: Product };
  const navigate = useNavigate();
  const [activeImg, setActiveImg] = useState(0);
  const [storage, setStorage] = useState(product.storages[0]);
  const [color, setColor] = useState(product.colors[0]);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<"desc" | "info" | "review">("desc");
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const priceMap: Record<string, number> = {
    "128 Go": 0,
    "256 Go": 100,
    "512 Go": 250,
    "1 To": 450,
    "64 Go": -50,
  };
  const priceExtra = priceMap[storage] ?? 0;
  const unitPrice = product.price + priceExtra;
  const total = unitPrice * qty;

  const nextImg = () => setActiveImg((i) => (i + 1) % product.gallery.length);
  const prevImg = () =>
    setActiveImg((i) => (i - 1 + product.gallery.length) % product.gallery.length);

  const ratingDist = [
    { star: 5, pct: 70 },
    { star: 4, pct: 20 },
    { star: 3, pct: 6 },
    { star: 2, pct: 3 },
    { star: 1, pct: 1 },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top bar */}
      <div className="bg-secondary text-secondary-foreground text-xs">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2.5">
          <span>Appelez-nous : +33 1 23 45 67 89</span>
          <span className="hidden md:block">
            Inscrivez-vous et obtenez{" "}
            <span className="text-primary font-semibold">20% de réduction</span>.{" "}
            <button onClick={() => toast.success("Inscription ouverte !")} className="underline">
              Inscription
            </button>
          </span>
          <div className="flex items-center gap-3">
            <Facebook className="h-3.5 w-3.5" />
            <Twitter className="h-3.5 w-3.5" />
            <Instagram className="h-3.5 w-3.5" />
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="border-b border-border bg-background sticky top-0 z-30">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
              P
            </div>
            <span className="text-xl font-semibold tracking-tight">
              PhoneLux<span className="text-primary">.</span>
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link to="/">Accueil</Link>
            <Link to="/" className="text-primary">
              Boutique
            </Link>
            <Link to="/">Smartphones</Link>
            <Link to="/">Accessoires</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Search
              className="h-5 w-5 cursor-pointer hover:text-primary"
              onClick={() => navigate({ to: "/" })}
            />
            <Heart
              className="h-5 w-5 cursor-pointer hover:text-primary"
              onClick={() => toast("Favoris")}
            />
            <ShoppingBag
              className="h-5 w-5 cursor-pointer hover:text-primary"
              onClick={() => toast("Panier")}
            />
            <User
              className="h-5 w-5 cursor-pointer hover:text-primary"
              onClick={() => toast("Compte")}
            />
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <section className="bg-muted">
        <div className="mx-auto max-w-7xl px-6 py-14 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Boutique</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            <Link to="/">Accueil</Link> <span className="mx-2 text-primary">/</span>
            <Link to="/">Boutique</Link> <span className="mx-2 text-primary">/</span>
            Détail produit
          </p>
        </div>
      </section>

      {/* Product */}
      <div className="mx-auto max-w-6xl px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <div className="relative aspect-square rounded-xl overflow-hidden bg-muted">
            <img
              src={product.gallery[activeImg]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <button
              onClick={prevImg}
              className="absolute left-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-background/90 flex items-center justify-center shadow hover:bg-primary hover:text-primary-foreground"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={nextImg}
              className="absolute right-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          <div className="grid grid-cols-4 gap-3 mt-4">
            {product.gallery.map((g, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={`aspect-square rounded-lg overflow-hidden bg-muted border-2 transition ${activeImg === i ? "border-primary" : "border-transparent hover:border-border"}`}
              >
                <img src={g} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">{product.category}</p>
          <div className="flex items-center gap-3 mt-1">
            <h2 className="text-3xl font-bold">{product.name}</h2>
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-full ${product.inStock ? "bg-accent text-primary" : "bg-secondary text-secondary-foreground"}`}
            >
              {product.inStock ? "En stock" : "Rupture"}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-3">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-muted-foreground/40"}`}
                />
              ))}
            </div>
            <span className="text-sm">
              {product.rating} ({product.reviews} avis)
            </span>
          </div>
          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-3xl font-bold text-primary">{unitPrice} €</span>
            <span className="text-muted-foreground line-through">{product.oldPrice} €</span>
            <span className="text-xs font-semibold bg-primary text-primary-foreground px-2 py-0.5 rounded">
              -{product.discount}%
            </span>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">{product.description}</p>

          <div className="mt-6">
            <p className="text-sm font-semibold mb-2">Stockage</p>
            <div className="flex flex-wrap gap-2">
              {product.storages.map((s) => (
                <button
                  key={s}
                  onClick={() => setStorage(s)}
                  className={`px-4 py-2 rounded-md border text-sm font-medium transition ${storage === s ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary"}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <p className="text-sm font-semibold mb-2">Couleur</p>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`px-4 py-2 rounded-md border text-sm font-medium transition ${color === c ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary"}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="flex items-center border border-border rounded-full">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="h-10 w-10 flex items-center justify-center hover:text-primary"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-10 text-center font-semibold">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="h-10 w-10 flex items-center justify-center hover:text-primary"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <button
              onClick={() =>
                toast.success(`${qty}× ${product.name} (${storage}, ${color}) ajouté au panier`)
              }
              className="inline-flex items-center gap-2 rounded-full border border-foreground bg-foreground text-background font-semibold px-6 h-10 hover:bg-foreground/90"
            >
              <ShoppingCart className="h-4 w-4" /> Ajouter au panier
            </button>
            <button
              onClick={() => setCheckoutOpen(true)}
              className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground font-semibold px-6 h-10 hover:bg-primary/90"
            >
              Acheter maintenant
            </button>
            <button
              onClick={() => toast.success("Ajouté aux favoris")}
              className="h-10 w-10 border border-border rounded-full flex items-center justify-center hover:text-primary"
            >
              <Heart className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-6 text-sm space-y-1.5">
            <p>
              <span className="text-muted-foreground">SKU :</span>{" "}
              <span className="font-medium">{product.sku}</span>
            </p>
            <p>
              <span className="text-muted-foreground">Tags :</span>{" "}
              <span className="font-medium">
                {product.brand}, {product.category}, Smartphone
              </span>
            </p>
            <div className="flex items-center gap-3">
              <span className="text-muted-foreground">Partager :</span>
              {[Facebook, Twitter, Instagram, Share2].map((Icon, i) => (
                <button
                  key={i}
                  onClick={() => toast("Lien copié")}
                  className="h-8 w-8 rounded-full bg-accent text-primary flex items-center justify-center hover:bg-primary hover:text-primary-foreground"
                >
                  <Icon className="h-3.5 w-3.5" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mx-auto max-w-6xl px-6 pb-12">
        <div className="flex items-center justify-center gap-8 border-b border-border">
          {(
            [
              ["desc", "Description"],
              ["info", "Informations"],
              ["review", "Avis"],
            ] as const
          ).map(([k, l]) => (
            <button
              key={k}
              onClick={() => setTab(k)}
              className={`pb-4 text-sm font-semibold transition ${tab === k ? "text-primary border-b-2 border-primary -mb-px" : "text-muted-foreground hover:text-foreground"}`}
            >
              {l}
            </button>
          ))}
        </div>

        <div className="py-8">
          {tab === "desc" && (
            <div className="max-w-3xl mx-auto text-sm text-muted-foreground leading-7">
              <p>{product.description}</p>
              <p className="mt-3">
                Livré avec câble USB-C, documentation et adaptateur SIM. Garantie 2 ans PhoneLux.
                Compatible LinkMobile pour un paiement instantané depuis votre téléphone.
              </p>
            </div>
          )}
          {tab === "info" && (
            <div className="max-w-3xl mx-auto">
              <table className="w-full text-sm">
                <tbody>
                  {product.specs.map((s) => (
                    <tr key={s.label} className="border-b border-border">
                      <td className="py-3 text-muted-foreground w-1/3">{s.label}</td>
                      <td className="py-3 font-medium">{s.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {tab === "review" && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8 mb-10">
                <div className="text-center">
                  <p className="text-5xl font-bold">{product.rating}</p>
                  <p className="text-xs text-muted-foreground mt-1">sur 5</p>
                  <div className="flex justify-center mt-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">({product.reviews} avis)</p>
                </div>
                <div className="space-y-2">
                  {ratingDist.map((r) => (
                    <div key={r.star} className="flex items-center gap-3 text-xs">
                      <span className="w-14 text-muted-foreground">{r.star} étoiles</span>
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: `${r.pct}%` }} />
                      </div>
                      <span className="w-10 text-right text-muted-foreground">{r.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <h3 className="font-semibold mb-4">Liste des avis</h3>
              <div className="space-y-6">
                {REVIEWS.map((r, i) => (
                  <div key={i} className="border-b border-border pb-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-accent text-primary flex items-center justify-center font-semibold">
                          {r.name[0]}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{r.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {r.verified ? "Vérifié" : ""}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground">{r.when}</span>
                    </div>
                    <p className="mt-3 font-medium text-sm">{r.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{r.body}</p>
                    <div className="flex gap-0.5 mt-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3.5 w-3.5 ${i < r.rating ? "fill-primary text-primary" : "text-muted-foreground/40"}`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <h3 className="text-xl font-bold mb-6">Produits similaires</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products
              .filter((p) => p.id !== product.id)
              .slice(0, 4)
              .map((p) => (
                <Link key={p.id} to="/product/$id" params={{ id: String(p.id) }} className="group">
                  <div className="aspect-square rounded-xl overflow-hidden bg-muted">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">{p.brand}</p>
                  <p className="font-medium group-hover:text-primary">{p.name}</p>
                  <p className="text-primary font-semibold text-sm">{p.price} €</p>
                </Link>
              ))}
          </div>
        </div>
      </section>

      <footer className="bg-secondary text-secondary-foreground/80 text-sm">
        <div className="mx-auto max-w-7xl px-6 py-8 flex items-center justify-between">
          <p>© 2026 PhoneLux. Tous droits réservés.</p>
        </div>
      </footer>

      {checkoutOpen && (
        <LinkMobileCheckout
          product={product}
          storage={storage}
          color={color}
          qty={qty}
          total={total}
          onClose={() => setCheckoutOpen(false)}
        />
      )}
    </div>
  );
}

function LinkMobileCheckout({
  product,
  storage,
  color,
  qty,
  total,
  onClose,
}: {
  product: { name: string };
  storage: string;
  color: string;
  qty: number;
  total: number;
  onClose: () => void;
}) {
  const [step, setStep] = useState<"form" | "confirm" | "success">("form");
  const [phone, setPhone] = useState("");
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\+?\d{8,}$/.test(phone.replace(/\s/g, ""))) {
      toast.error("Numéro LinkMobile invalide");
      return;
    }
    if (pin.length < 4) {
      toast.error("Code PIN LinkMobile requis (4 chiffres min.)");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("confirm");
    }, 1200);
  };

  const confirm = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("success");
      toast.success("Paiement LinkMobile réussi !");
    }, 1000);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-background rounded-2xl w-full max-w-md p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 h-8 w-8 rounded-full hover:bg-muted flex items-center justify-center"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="h-11 w-11 rounded-xl bg-primary text-primary-foreground flex items-center justify-center">
            <Smartphone className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-bold text-lg">Paiement LinkMobile</h3>
            <p className="text-xs text-muted-foreground">Paiement sécurisé mobile</p>
          </div>
        </div>

        <div className="rounded-lg bg-muted p-4 mb-5 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Produit</span>
            <span className="font-medium">{product.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Options</span>
            <span className="font-medium">
              {storage} · {color}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Quantité</span>
            <span className="font-medium">{qty}</span>
          </div>
          <div className="flex justify-between pt-2 mt-2 border-t border-border">
            <span className="font-semibold">Total</span>
            <span className="font-bold text-primary">{total} €</span>
          </div>
        </div>

        {step === "form" && (
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold">Numéro LinkMobile</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+33 6 12 34 56 78"
                className="mt-1 w-full h-11 rounded-lg border border-border px-3 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="text-xs font-semibold">Code PIN LinkMobile</label>
              <input
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="••••"
                className="mt-1 w-full h-11 rounded-lg border border-border px-3 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <p className="text-xs text-muted-foreground flex items-start gap-2">
              <Shield className="h-3.5 w-3.5 mt-0.5 text-primary" /> Vos informations LinkMobile
              sont chiffrées de bout en bout.
            </p>
            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 disabled:opacity-60"
            >
              {loading ? "Vérification..." : `Payer ${total} €`}
            </button>
          </form>
        )}

        {step === "confirm" && (
          <div className="text-center space-y-4">
            <p className="text-sm">
              Un code de confirmation a été envoyé au <b>{phone}</b>. Confirmez sur votre
              application LinkMobile.
            </p>
            <button
              onClick={confirm}
              disabled={loading}
              className="w-full h-11 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 disabled:opacity-60"
            >
              {loading ? "En attente..." : "J'ai confirmé sur LinkMobile"}
            </button>
          </div>
        )}

        {step === "success" && (
          <div className="text-center space-y-4 py-4">
            <div className="mx-auto h-14 w-14 rounded-full bg-accent text-primary flex items-center justify-center">
              <Check className="h-7 w-7" />
            </div>
            <div>
              <p className="font-bold text-lg">Paiement réussi</p>
              <p className="text-sm text-muted-foreground mt-1">
                Votre commande de {total} € a été confirmée. Vous recevrez un SMS LinkMobile de
                suivi.
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-full h-11 rounded-full bg-primary text-primary-foreground font-semibold"
            >
              Retour à la boutique
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
