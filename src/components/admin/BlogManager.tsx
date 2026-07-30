import React, { useEffect, useState } from "react";
import { apiService, Post } from "../../lib/api";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  FileText,
  Loader2,
  X,
  ChevronLeft,
  ChevronRight,
  Calendar,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { toast } from "sonner";
import DeleteConfirmModal from "./DeleteConfirmModal";

const ITEMS_PER_PAGE = 4;

export const BlogManager: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Form fields
  const [formTitre, setFormTitre] = useState("");
  const [formContenu, setFormContenu] = useState("");
  const [formImage, setFormImage] = useState("");

  // Delete state
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await apiService.getPosts();
      setPosts(res.data);
    } catch (error) {
      toast.error("Erreur lors de la récupération des articles du blog.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleOpenAdd = () => {
    setEditingPost(null);
    setFormTitre("");
    setFormContenu("");
    setFormImage("");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (post: Post) => {
    setEditingPost(post);
    setFormTitre(post.titre);
    setFormContenu(post.contenu);
    setFormImage(post.image);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitre.trim() || !formContenu.trim()) {
      toast.error("Le titre et le contenu de l'article sont requis.");
      return;
    }

    setSubmitting(true);
    try {
      if (editingPost) {
        await apiService.updatePost(editingPost.id, {
          titre: formTitre,
          contenu: formContenu,
          image: formImage || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=600&q=80",
        });
        toast.success("Article mis à jour avec succès !");
      } else {
        await apiService.createPost({
          titre: formTitre,
          contenu: formContenu,
          image: formImage || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=600&q=80",
        });
        toast.success("Nouvel article publié sur le blog !");
      }
      setIsModalOpen(false);
      fetchPosts();
    } catch (error) {
      toast.error("Erreur lors de l'enregistrement de l'article.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deletingId) return;
    setIsDeleting(true);
    try {
      await apiService.deletePost(deletingId);
      toast.success("Article supprimé du blog !");
      setDeletingId(null);
      fetchPosts();
    } catch (error) {
      toast.error("Impossible de supprimer cet article.");
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredPosts = posts.filter(
    (p) =>
      p.titre.toLowerCase().includes(search.toLowerCase()) ||
      p.contenu.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE) || 1;
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="space-y-6">
      {/* Header & Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Gestion du Blog (Articles)
          </h2>
          <p className="text-sm text-muted-foreground">
            Publiez et modifiez les actualités et conseils Eray Tech.
          </p>
        </div>
        <Button
          onClick={handleOpenAdd}
          className="rounded-xl font-semibold shadow-sm hover:shadow transition-all"
        >
          <Plus className="mr-2 h-4 w-4" /> Créer article
        </Button>
      </div>

      {/* Search Input */}
      <div className="flex items-center gap-3 rounded-2xl border border-border/60 bg-card p-3 shadow-sm">
        <Search className="h-4 w-4 text-muted-foreground ml-2" />
        <Input
          placeholder="Rechercher un article..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-sm"
        />
      </div>

      {/* Articles Grid / List */}
      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : paginatedPosts.length === 0 ? (
        <div className="rounded-2xl border border-border/60 bg-card flex flex-col items-center justify-center p-12 text-center shadow-sm">
          <FileText className="h-12 w-12 text-muted-foreground/50 mb-3" />
          <p className="font-semibold text-foreground">Aucun article trouvé</p>
          <p className="text-sm text-muted-foreground mt-1">
            Rédigez votre premier article de blog dès maintenant.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {paginatedPosts.map((post) => (
            <div
              key={post.id}
              className="flex flex-col justify-between rounded-2xl border border-border/60 bg-card overflow-hidden shadow-xs hover:shadow-md transition-all"
            >
              <div className="relative h-48 w-full overflow-hidden bg-muted">
                <img
                  src={post.image}
                  alt={post.titre}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=600&q=80";
                  }}
                />
                <div className="absolute top-3 right-3 flex gap-1.5">
                  <Button
                    size="icon"
                    variant="secondary"
                    onClick={() => handleOpenEdit(post)}
                    className="h-8 w-8 rounded-full bg-background/90 backdrop-blur-md hover:bg-background shadow-sm text-foreground"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="destructive"
                    onClick={() => setDeletingId(post.id)}
                    className="h-8 w-8 rounded-full shadow-sm"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
                    <Calendar className="h-3.5 w-3.5 text-primary" />
                    <span>Publié le {post.date}</span>
                  </div>
                  <h3 className="text-lg font-bold text-foreground line-clamp-2">
                    {post.titre}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                    {post.contenu}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between text-xs text-muted-foreground">
                  <span>ID: {post.id}</span>
                  <button
                    onClick={() => handleOpenEdit(post)}
                    className="font-semibold text-primary hover:underline"
                  >
                    Éditer l'article →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {!loading && filteredPosts.length > 0 && (
        <div className="flex items-center justify-between rounded-2xl border border-border/60 bg-card px-6 py-4 shadow-sm">
          <span className="text-xs text-muted-foreground">
            Page {currentPage} sur {totalPages} ({filteredPosts.length} articles au total)
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

      {/* Modal Form */}
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
              {editingPost ? "Modifier l'article" : "Créer un nouvel article"}
            </h3>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="titre" className="text-xs font-semibold">
                  Titre de l'article *
                </Label>
                <Input
                  id="titre"
                  placeholder="ex: Nouveautés Canal+ du mois"
                  value={formTitre}
                  onChange={(e) => setFormTitre(e.target.value)}
                  className="rounded-xl"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="image" className="text-xs font-semibold">
                  URL de la vignette d'illustration
                </Label>
                <Input
                  id="image"
                  placeholder="https://..."
                  value={formImage}
                  onChange={(e) => setFormImage(e.target.value)}
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="contenu" className="text-xs font-semibold">
                  Contenu de l'article *
                </Label>
                <Textarea
                  id="contenu"
                  placeholder="Rédigez ici le corps de votre article de blog..."
                  value={formContenu}
                  onChange={(e) => setFormContenu(e.target.value)}
                  className="rounded-xl rows-6 min-h-[140px]"
                  required
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
                      Publication...
                    </>
                  ) : editingPost ? (
                    "Mettre à jour"
                  ) : (
                    "Publier l'article"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <DeleteConfirmModal
        isOpen={!!deletingId}
        onClose={() => setDeletingId(null)}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
        title="Supprimer cet article ?"
        description="Cet article sera définitivement retiré du blog Eray Tech."
      />
    </div>
  );
};

export default BlogManager;
