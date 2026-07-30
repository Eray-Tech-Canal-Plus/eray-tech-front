import React, { useState } from "react";
import { Lock, Mail, Eye, EyeOff, ShieldCheck, ArrowRight, Loader2, Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { toast } from "sonner";

interface AdminLoginFormProps {
  onLoginSuccess: () => void;
}

export const AdminLoginForm: React.FC<AdminLoginFormProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("admin@eraytech.com");
  const [password, setPassword] = useState("admin123");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Veuillez remplir tous les champs de connexion.");
      return;
    }

    setLoading(true);

    // Simulation de délai d'authentification (500ms)
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Simulation de validation des identifiants
    if (email.toLowerCase() === "admin@eraytech.com" && password === "admin123") {
      if (typeof window !== "undefined") {
        localStorage.setItem("eray_admin_authenticated", "true");
        if (rememberMe) {
          localStorage.setItem("eray_admin_user", email);
        }
      }
      toast.success("Connexion réussie ! Bienvenue dans votre espace Admin.");
      setLoading(false);
      onLoginSuccess();
    } else {
      setLoading(false);
      setError("Identifiants incorrects. Testez avec admin@eraytech.com / admin123");
      toast.error("Échec de la connexion. Vérifiez vos identifiants.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/40 to-background p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md space-y-6">
        {/* Logo & Heading Header */}
        <div className="text-center space-y-3">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 text-primary shadow-sm">
            <ShieldCheck className="h-7 w-7" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary mb-2">
              <Sparkles className="h-3.5 w-3.5" /> Eray Tech Backoffice
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              Connexion Administrateur
            </h1>
            <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground">
              Entrez vos identifiants pour accéder à la gestion du site.
            </p>
          </div>
        </div>

        {/* Card Form */}
        <div className="rounded-3xl border border-border/80 bg-card/90 backdrop-blur-md p-6 sm:p-8 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-3.5 text-xs font-semibold text-rose-600 dark:text-rose-400 animate-in fade-in duration-200">
                ⚠️ {error}
              </div>
            )}

            {/* Field Email */}
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs font-semibold text-foreground">
                Adresse e-mail admin
              </Label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@eraytech.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 rounded-xl bg-background/50 text-sm focus-visible:ring-primary"
                  required
                />
              </div>
            </div>

            {/* Field Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-xs font-semibold text-foreground">
                  Mot de passe
                </Label>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 rounded-xl bg-background/50 text-sm focus-visible:ring-primary"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(!!checked)}
                  className="rounded-md"
                />
                <label
                  htmlFor="remember"
                  className="text-xs font-medium text-muted-foreground leading-none cursor-pointer"
                >
                  Se souvenir de moi
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl py-6 font-bold shadow-md shadow-primary/20 hover:shadow-lg transition-all text-sm mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Vérification en cours...
                </>
              ) : (
                <>
                  Se connecter
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          {/* Demo Info Banner */}
          <div className="mt-6 pt-5 border-t border-border/50 text-center">
            <p className="text-[11px] font-semibold text-muted-foreground">
              💡 <span className="text-foreground">Identifiants de démonstration :</span>
            </p>
            <div className="mt-1.5 inline-block rounded-xl bg-muted/60 px-3 py-1.5 text-[11px] font-mono text-foreground/80 border border-border/40">
              admin@eraytech.com / admin123
            </div>
          </div>
        </div>

        {/* Back to Home Link */}
        <div className="text-center">
          <a
            href="/"
            className="text-xs font-semibold text-muted-foreground hover:text-primary transition-colors"
          >
            ← Retour au site Eray Tech
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginForm;
