import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import {
  ChevronLeft, ChevronRight, Star, Heart, Share2, Facebook, Twitter, Instagram,
  ShoppingCart, Minus, Plus, Search, ShoppingBag, User, Smartphone, Shield, X, Check,
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

const COLORS_CUSTOM = {
  deep: "#0D0D0D",
  white: "#FFFFFF",
  orange: "#FF4500",
};

const REVIEWS = [
  { name: "Kristin Watson", verified: true, when: "il y a 1 mois", rating: 5, title: "J'adore ce téléphone !", body: "Qualité incroyable, appareil photo au top, batterie qui tient toute la journée. Livraison rapide et emballage soigné." },
  { name: "Jenny Wilson", verified: true, when: "il y a 2 mois", rating: 5, title: "Parfait pour un usage quotidien !", body: "Fluidité irréprochable, écran magnifique. Le rose rouge est vraiment élégant. Je recommande vivement." },
  { name: "Darlene Robertson", verified: true, when: "il y a 2 mois", rating: 4, title: "Très bon rapport qualité/prix", body: "Un excellent smartphone pour ce prix, quelques petits détails à améliorer mais rien de bloquant." },
  { name: "Marc Dupont", verified: true, when: "il y a 3 mois", rating: 5, title: "Design premium", body: "Finition impeccable, performances au rendez-vous. Le SAV PhoneLux est également très réactif." },
];

const ratingDist = [
  { star: 5, pct: 70 }, { star: 4, pct: 20 }, { star: 3, pct: 6 },
  { star: 2, pct: 3 }, { star: 1, pct: 1 },
];

function ProductPageThemed() {
  return (
    <div style={{ backgroundColor: COLORS_CUSTOM.deep, minHeight: "100vh", color: COLORS_CUSTOM.white }}>
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

  const priceMap: Record<string, number> = { "128 Go": 0, "256 Go": 100, "512 Go": 250, "1 To": 450, "64 Go": -50 };
  const priceExtra = priceMap[storage] ?? 0;
  const unitPrice = product.price + priceExtra;
  const total = unitPrice * qty;

  const nextImg = () => setActiveImg((i) => (i + 1) % product.gallery.length);
  const prevImg = () => setActiveImg((i) => (i - 1 + product.gallery.length) % product.gallery.length);

  return (
    <div style={{ backgroundColor: COLORS_CUSTOM.deep, color: COLORS_CUSTOM.white, minHeight: "100vh" }}>




      {/* Product */}
      <div className="mx-auto max-w-6xl px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <div className="relative aspect-square rounded-xl overflow-hidden" style={{ backgroundColor: `rgba(255,255,255,0.05)` }}>
            <img src={product.gallery[activeImg]} alt={product.name} className="w-full h-full object-cover" />
            <button onClick={prevImg} className="absolute left-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full flex items-center justify-center shadow transition hover:opacity-80" style={{ backgroundColor: COLORS_CUSTOM.white, color: COLORS_CUSTOM.deep }}>
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button onClick={nextImg} className="absolute right-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full flex items-center justify-center shadow transition hover:opacity-80" style={{ backgroundColor: COLORS_CUSTOM.orange, color: COLORS_CUSTOM.white }}>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          <div className="grid grid-cols-4 gap-3 mt-4">
            {product.gallery.map((g, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={`aspect-square rounded-lg overflow-hidden border-2 transition hover:opacity-80`}
                style={{ 
                  backgroundColor: `rgba(255,255,255,0.05)`,
                  borderColor: activeImg === i ? COLORS_CUSTOM.orange : `rgba(255,255,255,0.08)`
                }}
              >
                <img src={g} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm" style={{ color: `rgba(255,255,255,0.5)` }}>{product.category}</p>
          <div className="flex items-center gap-3 mt-1">
            <h2 className="text-3xl font-bold" style={{ color: COLORS_CUSTOM.white }}>{product.name}</h2>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${product.inStock ? "text-white" : "text-white/50"}`} style={{ backgroundColor: product.inStock ? COLORS_CUSTOM.orange : `rgba(255,255,255,0.15)` }}>
              {product.inStock ? "En stock" : "Rupture"}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-3">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-orange text-orange" : "opacity-30"}`} style={{ color: i < Math.floor(product.rating) ? COLORS_CUSTOM.orange : COLORS_CUSTOM.white }} />
              ))}
            </div>
            <span className="text-sm" style={{ color: `rgba(255,255,255,0.6)` }}>{product.rating} ({product.reviews} avis)</span>
          </div>
          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-3xl font-bold" style={{ color: COLORS_CUSTOM.orange }}>{unitPrice} €</span>
            <span className="text-sm line-through" style={{ color: `rgba(255,255,255,0.4)` }}>{product.oldPrice} €</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded" style={{ backgroundColor: COLORS_CUSTOM.orange, color: COLORS_CUSTOM.white }}>-{product.discount}%</span>
          </div>
          <p className="mt-4 text-sm" style={{ color: `rgba(255,255,255,0.6)` }}>{product.description}</p>

          <div className="mt-6">
            <p className="text-sm font-semibold mb-2" style={{ color: COLORS_CUSTOM.white }}>Stockage</p>
            <div className="flex flex-wrap gap-2">
              {product.storages.map((s) => (
                <button key={s} onClick={() => setStorage(s)}
                  className={`px-4 py-2 rounded-md border text-sm font-medium transition ${storage === s ? "text-white" : "hover:opacity-70"}`}
                  style={storage === s 
                    ? { backgroundColor: COLORS_CUSTOM.orange, borderColor: COLORS_CUSTOM.orange, color: COLORS_CUSTOM.white }
                    : { borderColor: `rgba(255,255,255,0.15)`, color: COLORS_CUSTOM.white }
                  }>
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <p className="text-sm font-semibold mb-2" style={{ color: COLORS_CUSTOM.white }}>Couleur</p>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((c) => (
                <button key={c} onClick={() => setColor(c)}
                  className={`px-4 py-2 rounded-md border text-sm font-medium transition ${color === c ? "text-white" : "hover:opacity-70"}`}
                  style={color === c
                    ? { backgroundColor: COLORS_CUSTOM.orange, borderColor: COLORS_CUSTOM.orange, color: COLORS_CUSTOM.white }
                    : { borderColor: `rgba(255,255,255,0.15)`, color: COLORS_CUSTOM.white }
                  }>
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="flex items-center rounded-full border" style={{ borderColor: `rgba(255,255,255,0.15)` }}>
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="h-10 w-10 flex items-center justify-center hover:opacity-70 transition" style={{ color: COLORS_CUSTOM.white }}><Minus className="h-4 w-4" /></button>
              <span className="w-10 text-center font-semibold" style={{ color: COLORS_CUSTOM.white }}>{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="h-10 w-10 flex items-center justify-center hover:opacity-70 transition" style={{ color: COLORS_CUSTOM.white }}><Plus className="h-4 w-4" /></button>
            </div>
            <button
              onClick={() => toast.success(`${qty}× ${product.name} (${storage}, ${color}) ajouté au panier`)}
              className="inline-flex items-center gap-2 rounded-full font-semibold px-6 h-10 transition hover:opacity-80"
              style={{ backgroundColor: COLORS_CUSTOM.white, color: COLORS_CUSTOM.deep }}
            >
              <ShoppingCart className="h-4 w-4" /> Ajouter au panier
            </button>
            <button
              onClick={() => setCheckoutOpen(true)}
              className="inline-flex items-center gap-2 rounded-full font-semibold px-6 h-10 transition hover:opacity-80"
              style={{ backgroundColor: COLORS_CUSTOM.orange, color: COLORS_CUSTOM.white }}
            >
              Acheter maintenant
            </button>
            <button onClick={() => toast.success("Ajouté aux favoris")} className="h-10 w-10 rounded-full border flex items-center justify-center hover:opacity-70 transition" style={{ borderColor: `rgba(255,255,255,0.15)`, color: COLORS_CUSTOM.white }}>
              <Heart className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-6 text-sm space-y-1.5">
            <p><span className="text-muted-foreground" style={{ color: `rgba(255,255,255,0.5)` }}>SKU :</span> <span className="font-medium" style={{ color: COLORS_CUSTOM.white }}>{product.sku}</span></p>
            <p><span className="text-muted-foreground" style={{ color: `rgba(255,255,255,0.5)` }}>Tags :</span> <span className="font-medium" style={{ color: COLORS_CUSTOM.white }}>{product.brand}, {product.category}, Smartphone</span></p>
            <div className="flex items-center gap-3">
              <span className="text-muted-foreground" style={{ color: `rgba(255,255,255,0.5)` }}>Partager :</span>
              {[Facebook, Twitter, Instagram, Share2].map((Icon, i) => (
                <button key={i} onClick={() => toast("Lien copié")} className="h-8 w-8 rounded-full flex items-center justify-center transition hover:opacity-70" style={{ backgroundColor: `rgba(255,255,255,0.05)`, color: COLORS_CUSTOM.white }}>
                  <Icon className="h-3.5 w-3.5" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mx-auto max-w-6xl px-6 pb-12">
        <div className="flex items-center justify-center gap-8 border-b" style={{ borderColor: `rgba(255,255,255,0.08)` }}>
          {([["desc", "Description"], ["info", "Informations"], ["review", "Avis"]] as const).map(([k, l]) => (
            <button key={k} onClick={() => setTab(k)}
              className={`pb-4 text-sm font-semibold transition ${tab === k ? "border-b-2 -mb-px" : "hover:opacity-70"}`}
              style={tab === k 
                ? { color: COLORS_CUSTOM.orange, borderColor: COLORS_CUSTOM.orange }
                : { color: `rgba(255,255,255,0.5)`, borderColor: "transparent" }
              }>
              {l}
            </button>
          ))}
        </div>

        <div className="py-8">
          {tab === "desc" && (
            <div className="max-w-3xl mx-auto text-sm leading-7" style={{ color: `rgba(255,255,255,0.6)` }}>
              <p>{product.description}</p>
              <p className="mt-3">Livré avec câble USB-C, documentation et adaptateur SIM. Garantie 2 ans PhoneLux. Compatible LinkMobile pour un paiement instantané depuis votre téléphone.</p>
            </div>
          )}
          {tab === "info" && (
            <div className="max-w-3xl mx-auto">
              <table className="w-full text-sm">
                <tbody>
                  {product.specs.map((s) => (
                    <tr key={s.label} className="border-b" style={{ borderColor: `rgba(255,255,255,0.08)` }}>
                      <td className="py-3 w-1/3" style={{ color: `rgba(255,255,255,0.5)` }}>{s.label}</td>
                      <td className="py-3 font-medium" style={{ color: COLORS_CUSTOM.white }}>{s.value}</td>
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
                  <p className="text-5xl font-bold" style={{ color: COLORS_CUSTOM.orange }}>{product.rating}</p>
                  <p className="text-xs mt-1" style={{ color: `rgba(255,255,255,0.5)` }}>sur 5</p>
                  <div className="flex justify-center mt-2">
                    {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4" style={{ fill: COLORS_CUSTOM.orange, color: COLORS_CUSTOM.orange }} />)}
                  </div>
                  <p className="text-xs mt-1" style={{ color: `rgba(255,255,255,0.5)` }}>({product.reviews} avis)</p>
                </div>
                <div className="space-y-2">
                  {ratingDist.map((r) => (
                    <div key={r.star} className="flex items-center gap-3 text-xs">
                      <span className="w-14" style={{ color: `rgba(255,255,255,0.5)` }}>{r.star} étoiles</span>
                      <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ backgroundColor: `rgba(255,255,255,0.1)` }}>
                        <div className="h-full" style={{ width: `${r.pct}%`, backgroundColor: COLORS_CUSTOM.orange }} />
                      </div>
                      <span className="w-10 text-right" style={{ color: `rgba(255,255,255,0.5)` }}>{r.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <h3 className="font-semibold mb-4" style={{ color: COLORS_CUSTOM.white }}>Liste des avis</h3>
              <div className="space-y-6">
                {REVIEWS.map((r, i) => (
                  <div key={i} className="border-b pb-6" style={{ borderColor: `rgba(255,255,255,0.08)` }}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full flex items-center justify-center font-semibold" style={{ backgroundColor: COLORS_CUSTOM.orange, color: COLORS_CUSTOM.white }}>{r.name[0]}</div>
                        <div>
                          <p className="font-medium text-sm" style={{ color: COLORS_CUSTOM.white }}>{r.name}</p>
                          <p className="text-xs" style={{ color: `rgba(255,255,255,0.5)` }}>{r.verified ? "Vérifié" : ""}</p>
                        </div>
                      </div>
                      <span className="text-xs" style={{ color: `rgba(255,255,255,0.5)` }}>{r.when}</span>
                    </div>
                    <p className="mt-3 font-medium text-sm" style={{ color: COLORS_CUSTOM.white }}>{r.title}</p>
                    <p className="mt-1 text-sm" style={{ color: `rgba(255,255,255,0.6)` }}>{r.body}</p>
                    <div className="flex gap-0.5 mt-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`h-3.5 w-3.5 ${i < r.rating ? "fill-orange" : "opacity-30"}`} style={{ color: i < r.rating ? COLORS_CUSTOM.orange : COLORS_CUSTOM.white }} />
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
      <section className="border-t" style={{ borderColor: `rgba(255,255,255,0.08)` }}>
        <div className="mx-auto max-w-6xl px-6 py-12">
          <h3 className="text-xl font-bold mb-6" style={{ color: COLORS_CUSTOM.white }}>Produits similaires</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products.filter((p) => p.id !== product.id).slice(0, 4).map((p) => (
              <Link key={p.id} to="/product/$id" params={{ id: String(p.id) }} className="group">
                <div className="aspect-square rounded-xl overflow-hidden" style={{ backgroundColor: `rgba(255,255,255,0.05)` }}>
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition" />
                </div>
                <p className="text-xs mt-3" style={{ color: `rgba(255,255,255,0.5)` }}>{p.brand}</p>
                <p className="font-medium group-hover:opacity-70 transition" style={{ color: COLORS_CUSTOM.white }}>{p.name}</p>
                <p className="font-semibold text-sm" style={{ color: COLORS_CUSTOM.orange }}>{p.price} €</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <footer className="text-sm" style={{ backgroundColor: `rgba(255,255,255,0.03)` }}>
        <div className="mx-auto max-w-7xl px-6 py-8 flex items-center justify-between">
          <p style={{ color: `rgba(255,255,255,0.6)` }}>© 2026 PhoneLux. Tous droits réservés.</p>
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
  product, storage, color, qty, total, onClose,
}: {
  product: { name: string }; storage: string; color: string; qty: number; total: number; onClose: () => void;
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
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4" onClick={onClose}>
      <div className="rounded-2xl w-full max-w-md p-6 relative" style={{ backgroundColor: COLORS_CUSTOM.deep, border: `1px solid rgba(255,255,255,0.08)` }} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute right-4 top-4 h-8 w-8 rounded-full hover:opacity-70 flex items-center justify-center transition" style={{ color: COLORS_CUSTOM.white }}>
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="h-11 w-11 rounded-xl flex items-center justify-center" style={{ backgroundColor: COLORS_CUSTOM.orange, color: COLORS_CUSTOM.white }}>
            <Smartphone className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-bold text-lg" style={{ color: COLORS_CUSTOM.white }}>Paiement LinkMobile</h3>
            <p className="text-xs" style={{ color: `rgba(255,255,255,0.5)` }}>Paiement sécurisé mobile</p>
          </div>
        </div>

        <div className="rounded-lg p-4 mb-5 text-sm" style={{ backgroundColor: `rgba(255,255,255,0.05)` }}>
          <div className="flex justify-between"><span style={{ color: `rgba(255,255,255,0.5)` }}>Produit</span><span className="font-medium" style={{ color: COLORS_CUSTOM.white }}>{product.name}</span></div>
          <div className="flex justify-between"><span style={{ color: `rgba(255,255,255,0.5)` }}>Options</span><span className="font-medium" style={{ color: COLORS_CUSTOM.white }}>{storage} · {color}</span></div>
          <div className="flex justify-between"><span style={{ color: `rgba(255,255,255,0.5)` }}>Quantité</span><span className="font-medium" style={{ color: COLORS_CUSTOM.white }}>{qty}</span></div>
          <div className="flex justify-between pt-2 mt-2 border-t" style={{ borderColor: `rgba(255,255,255,0.08)` }}><span className="font-semibold" style={{ color: COLORS_CUSTOM.white }}>Total</span><span className="font-bold" style={{ color: COLORS_CUSTOM.orange }}>{total} €</span></div>
        </div>

        {step === "form" && (
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold" style={{ color: COLORS_CUSTOM.white }}>Numéro LinkMobile</label>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+33 6 12 34 56 78"
                className="mt-1 w-full h-11 rounded-lg border px-3 focus:outline-none focus:ring-2 transition"
                style={{ 
                  backgroundColor: `rgba(255,255,255,0.05)`,
                  borderColor: `rgba(255,255,255,0.15)`,
                  color: COLORS_CUSTOM.white,
                  focusRingColor: COLORS_CUSTOM.orange,
                }} />
            </div>
            <div>
              <label className="text-xs font-semibold" style={{ color: COLORS_CUSTOM.white }}>Code PIN LinkMobile</label>
              <input type="password" value={pin} onChange={(e) => setPin(e.target.value)} placeholder="••••"
                className="mt-1 w-full h-11 rounded-lg border px-3 focus:outline-none focus:ring-2 transition"
                style={{ 
                  backgroundColor: `rgba(255,255,255,0.05)`,
                  borderColor: `rgba(255,255,255,0.15)`,
                  color: COLORS_CUSTOM.white,
                  focusRingColor: COLORS_CUSTOM.orange,
                }} />
            </div>
            <p className="text-xs flex items-start gap-2" style={{ color: `rgba(255,255,255,0.5)` }}>
              <Shield className="h-3.5 w-3.5 mt-0.5" style={{ color: COLORS_CUSTOM.orange }} /> Vos informations LinkMobile sont chiffrées de bout en bout.
            </p>
            <button type="submit" disabled={loading}
              className="w-full h-11 rounded-full font-semibold transition hover:opacity-80 disabled:opacity-60"
              style={{ backgroundColor: COLORS_CUSTOM.orange, color: COLORS_CUSTOM.white }}>
              {loading ? "Vérification..." : `Payer ${total} €`}
            </button>
          </form>
        )}

        {step === "confirm" && (
          <div className="text-center space-y-4">
            <p className="text-sm" style={{ color: `rgba(255,255,255,0.6)` }}>Un code de confirmation a été envoyé au <b style={{ color: COLORS_CUSTOM.white }}>{phone}</b>. Confirmez sur votre application LinkMobile.</p>
            <button onClick={confirm} disabled={loading}
              className="w-full h-11 rounded-full font-semibold transition hover:opacity-80 disabled:opacity-60"
              style={{ backgroundColor: COLORS_CUSTOM.orange, color: COLORS_CUSTOM.white }}>
              {loading ? "En attente..." : "J'ai confirmé sur LinkMobile"}
            </button>
          </div>
        )}

        {step === "success" && (
          <div className="text-center space-y-4 py-4">
            <div className="mx-auto h-14 w-14 rounded-full flex items-center justify-center" style={{ backgroundColor: COLORS_CUSTOM.orange }}>
              <Check className="h-7 w-7" style={{ color: COLORS_CUSTOM.white }} />
            </div>
            <div>
              <p className="font-bold text-lg" style={{ color: COLORS_CUSTOM.white }}>Paiement réussi</p>
              <p className="text-sm mt-1" style={{ color: `rgba(255,255,255,0.6)` }}>Votre commande de {total} € a été confirmée. Vous recevrez un SMS LinkMobile de suivi.</p>
            </div>
            <button onClick={onClose} className="w-full h-11 rounded-full font-semibold transition hover:opacity-80" style={{ backgroundColor: COLORS_CUSTOM.orange, color: COLORS_CUSTOM.white }}>
              Retour à la boutique
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
