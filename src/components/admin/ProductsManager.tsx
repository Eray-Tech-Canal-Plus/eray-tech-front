import React, { useEffect, useState } from "react";
import { apiService, Product } from "../../lib/api";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Package,
  Loader2,
  X,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { toast } from "sonner";
import DeleteConfirmModal from "./DeleteConfirmModal";

const ITEMS_PER_PAGE = 5;

export const ProductsManager: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [formNom, setFormNom] = useState("");
  const [formPrix, setFormPrix] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formImage, setFormImage] = useState("");
  const [formStock, setFormStock] = useState("");

  // Delete Modal State
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await apiService.getProducts();
      setProducts(res.data);
    } catch (error) {
      toast.error("Erreur lors de la récupération des produits.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Open Modal for Create
  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setFormNom("");
    setFormPrix("");
    setFormDescription("");
    setFormImage("");
    setFormStock("10");
    setIsModalOpen(true);
  };

  // Open Modal for Edit
  const handleOpenEditModal = (prod: Product) => {
    setEditingProduct(prod);
    setFormNom(prod.nom);
    setFormPrix(prod.prix.toString());
    setFormDescription(prod.description);
    setFormImage(prod.image);
    setFormStock(prod.stock.toString());
    setIsModalOpen(true);
  };

  // Submit Handler (Add / Edit)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formNom.trim() || !formPrix || !formStock) {
      toast.error("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    setSubmitting(true);
    try {
      if (editingProduct) {
        // Edit existing product
        await apiService.updateProduct(editingProduct.id, {
          nom: formNom,
          prix: Number(formPrix),
          description: formDescription,
          image: formImage || "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&w=600&q=80",
          stock: Number(formStock),
        });
        toast.success("Produit modifié avec succès !");
      } else {
        // Create new product
        await apiService.createProduct({
          nom: formNom,
          prix: Number(formPrix),
          description: formDescription,
          image: formImage || "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&w=600&q=80",
          stock: Number(formStock),
        });
        toast.success("Nouveau produit ajouté à la boutique !");
      }
      setIsModalOpen(false);
      fetchProducts();
    } catch (error) {
      toast.error("Une erreur est survenue lors de l'enregistrement.");
    } finally {
      setSubmitting(false);
    }
  };

  // Delete Handler
  const handleConfirmDelete = async () => {
    if (!deletingId) return;
    setIsDeleting(true);
    try {
      await apiService.deleteProduct(deletingId);
      toast.success("Produit supprimé avec succès !");
      setDeletingId(null);
      fetchProducts();
    } catch (error) {
      toast.error("Impossible de supprimer ce produit.");
    } finally {
      setIsDeleting(false);
    }
  };

  // Filter & Pagination logic
  const filteredProducts = products.filter(
    (p) =>
      p.nom.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE) || 1;
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Gestion des Produits (Boutique)
          </h2>
          <p className="text-sm text-muted-foreground">
            Gérez votre catalogue de téléphones, accessoires et décodeurs.
          </p>
        </div>
        <Button
          onClick={handleOpenAddModal}
          className="rounded-xl font-semibold shadow-sm hover:shadow transition-all"
        >
          <Plus className="mr-2 h-4 w-4" /> Ajouter un produit
        </Button>
      </div>

      {/* Filter / Search Bar */}
      <div className="flex items-center gap-3 rounded-2xl border border-border/60 bg-card p-3 shadow-sm">
        <Search className="h-4 w-4 text-muted-foreground ml-2" />
        <Input
          placeholder="Rechercher par nom ou description..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-sm"
        />
      </div>

      {/* Table Section */}
      <div className="rounded-2xl border border-border/60 bg-card overflow-hidden shadow-sm">
        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : paginatedProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-center">
            <Package className="h-12 w-12 text-muted-foreground/50 mb-3" />
            <p className="font-semibold text-foreground">Aucun produit trouvé</p>
            <p className="text-sm text-muted-foreground mt-1">
              Essayez de modifier votre recherche ou ajoutez un nouveau produit.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted/50 border-b border-border/60 text-xs uppercase font-semibold text-muted-foreground">
                <tr>
                  <th className="px-6 py-4">Produit</th>
                  <th className="px-6 py-4">Description</th>
                  <th className="px-6 py-4">Prix</th>
                  <th className="px-6 py-4">Stock</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {paginatedProducts.map((prod) => (
                  <tr key={prod.id} className="hover:bg-accent/40 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={prod.image}
                          alt={prod.nom}
                          className="h-12 w-12 rounded-xl object-cover border border-border shadow-xs"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&w=600&q=80";
                          }}
                        />
                        <div>
                          <p className="font-bold text-foreground">{prod.nom}</p>
                          <span className="text-xs text-muted-foreground">ID: {prod.id}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 max-w-xs truncate text-muted-foreground">
                      {prod.description || "Aucune description"}
                    </td>
                    <td className="px-6 py-4 font-extrabold text-foreground">
                      {prod.prix.toLocaleString("fr-FR")} FCFA
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        variant="outline"
                        className={`font-bold ${
                          prod.stock <= 5
                            ? "bg-rose-500/10 text-rose-600 border-rose-500/30"
                            : "bg-emerald-500/10 text-emerald-600 border-emerald-500/30"
                        }`}
                      >
                        {prod.stock} en stock
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => handleOpenEditModal(prod)}
                          className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => setDeletingId(prod.id)}
                          className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Footer */}
        {!loading && filteredProducts.length > 0 && (
          <div className="flex items-center justify-between border-t border-border/60 px-6 py-4 bg-card">
            <span className="text-xs text-muted-foreground">
              Affichage de {Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, filteredProducts.length)} à{" "}
              {Math.min(currentPage * ITEMS_PER_PAGE, filteredProducts.length)} sur{" "}
              {filteredProducts.length} produits
            </span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="rounded-lg text-xs"
              >
                <ChevronLeft className="mr-1 h-3.5 w-3.5" /> Précédent
              </Button>
              <span className="text-xs font-semibold px-2">
                {currentPage} / {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="rounded-lg text-xs"
              >
                Suivant <ChevronRight className="ml-1 h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Create / Edit Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="relative w-full max-w-lg rounded-2xl border border-border/80 bg-card p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 rounded-full p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="text-xl font-bold text-foreground">
              {editingProduct ? "Modifier le produit" : "Ajouter un nouveau produit"}
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              {editingProduct
                ? "Mettez à jour les détails du produit."
                : "Remplissez les informations pour créer un article dans la boutique."}
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="nom" className="text-xs font-semibold">
                  Nom du produit *
                </Label>
                <Input
                  id="nom"
                  placeholder="ex: iPhone 15 Pro Max"
                  value={formNom}
                  onChange={(e) => setFormNom(e.target.value)}
                  className="rounded-xl"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="prix" className="text-xs font-semibold">
                    Prix (FCFA) *
                  </Label>
                  <Input
                    id="prix"
                    type="number"
                    placeholder="850000"
                    value={formPrix}
                    onChange={(e) => setFormPrix(e.target.value)}
                    className="rounded-xl"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="stock" className="text-xs font-semibold">
                    Quantité Stock *
                  </Label>
                  <Input
                    id="stock"
                    type="number"
                    placeholder="10"
                    value={formStock}
                    onChange={(e) => setFormStock(e.target.value)}
                    className="rounded-xl"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="image" className="text-xs font-semibold">
                  URL de l'image
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="image"
                    placeholder="https://..."
                    value={formImage}
                    onChange={(e) => setFormImage(e.target.value)}
                    className="rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="description" className="text-xs font-semibold">
                  Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Description détaillée du produit..."
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="rounded-xl rows-3"
                />
              </div>

              <div className="mt-6 flex justify-end gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl"
                >
                  Annuler
                </Button>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="rounded-xl font-semibold"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Enregistrement...
                    </>
                  ) : editingProduct ? (
                    "Mettre à jour"
                  ) : (
                    "Créer le produit"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      <DeleteConfirmModal
        isOpen={!!deletingId}
        onClose={() => setDeletingId(null)}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
        title="Supprimer ce produit ?"
        description="Ce produit sera définitivement supprimé de la boutique Eray Tech."
      />
    </div>
  );
};

export default ProductsManager;
