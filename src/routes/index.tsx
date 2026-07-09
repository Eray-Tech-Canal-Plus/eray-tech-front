import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Phone,
  ArrowRight,
  Satellite,
  Tv,
  Headphones,
  Users,
  ShieldCheck,
  ThumbsUp,
  MessageCircle,
  CheckCircle2,
  Star,
  Clock,
  Wifi,
  ChevronDown,
  Zap,
  Smartphone,
  ShoppingCart,
  CreditCard,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Home,
});

type ServiceId = "canal" | "phones" | "banking";

type Service = {
  id: ServiceId;
  tag: string;
  title: string;
  short: string;
  description: string;
  cta: string;
  href: string;
  image: string;
  accentClass: string;
  tagClass: string;
  btnClass: string;
  features: { icon: typeof Satellite; label: string }[];
};

const services: Service[] = [
  {
    id: "canal",
    tag: "SERVICE PRINCIPAL",
    title: "Installation CANAL+",
    short: "Canal+",
    description: "Installation, activation et assistance Canal+ à domicile par des professionnels.",
    cta: "Demander une installation",
    href: "/reservation",
    image: "https://images.unsplash.com/photo-1774280918099-599d2647621c?w=1200",
    accentClass: "text-canal",
    tagClass: "bg-canal/20 text-canal border-canal/30",
    btnClass:
        "bg-gradient-to-r from-[oklch(0.72_0.17_55)] to-[oklch(0.62_0.17_50)] hover:brightness-110",
    features: [
      { icon: Satellite, label: "Installation parabole" },
      { icon: Tv, label: "Activation décodeur" },
      { icon: Headphones, label: "Assistance 7j/7" },
    ],
  },
  {
    id: "phones",
    tag: "SERVICE",
    title: "Boutique Téléphones",
    short: "Téléphones",
    description: "Smartphones neufs et reconditionnés, accessoires et conseils personnalisés.",
    cta: "Voir la boutique",
    href: "/boutique",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1200",
    accentClass: "text-phones",
    tagClass: "bg-phones/20 text-phones border-phones/30",
    btnClass: "bg-phones hover:brightness-110",
    features: [
      { icon: Smartphone, label: "Dernières marques" },
      { icon: ShieldCheck, label: "Garantie 12 mois" },
      { icon: ThumbsUp, label: "Livraison rapide" },
    ],
  },
  {
    id: "banking",
    tag: "SERVICE",
    title: "Mobile Banking",
    short: "Mobile Banking",
    description:
        "Transferts, paiements et gestion de compte depuis votre mobile en toute sécurité.",
    cta: "En savoir plus",
    href: "/contact",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1200",
    accentClass: "text-banking",
    tagClass: "bg-banking/20 text-banking border-banking/30",
    btnClass: "bg-banking hover:brightness-110",
    features: [
      { icon: ShieldCheck, label: "Transactions sécurisées" },
      { icon: Clock, label: "Disponible 24h/24" },
      { icon: Users, label: "Sans frais cachés" },
    ],
  },
];

const features = [
  { icon: Users, label: "1000+ Clients satisfaits" },
  { icon: ShieldCheck, label: "Service rapide et garanti" },
  { icon: Headphones, label: "Support disponible 7j/7" },
  { icon: ThumbsUp, label: "Partenaires de confiance" },
];

type ProcessStep = {
  num: string;
  icon: typeof Satellite;
  title: string;
  text: string;
};

type ExpertData = {
  name: string;
  role: string;
  image: string;
  bio: string[];
  stats: { value: string; label: string }[];
};

type OfferData = {
  name: string;
  price: string;
  original?: string;
  promo?: string;
  badge?: string;
  features: string[];
  popular?: boolean;
  cta: string;
};

type FaqItem = { q: string; a: string };
type Testimonial = { name: string; text: string; rating: number };

type MarketContent = {
  processBadge: string;
  processTitle: string;
  processSub: string;
  steps: ProcessStep[];
  expertBadge: string;
  expert: ExpertData;
  offersBadge: string;
  offersTitle: string;
  offersSub: string;
  offers: OfferData[];
  faq: FaqItem[];
  testimonials: Testimonial[];
};

const marketContent: Record<ServiceId, MarketContent> = {
  canal: {
    processBadge: "INSTALLATION EN 3 ÉTAPES",
    processTitle: 'Ce que nos <span class="text-primary">techniciens</span> font pour vous',
    processSub:
        "Une prestation complète, de la fixation de l'antenne jusqu'à la première chaîne diffusée.",
    steps: [
      {
        num: "1",
        icon: Satellite,
        title: "Pose & orientation d'antenne",
        text: "Installation de votre antenne parabolique et orientation précise vers le satellite pour capter toutes les chaînes en haute qualité.",
      },
      {
        num: "2",
        icon: Tv,
        title: "Décodeur & mise en service",
        text: "Raccordement et configuration complète de votre décodeur : activation de l'abonnement, chaînes triées et télécommande prête à l'emploi.",
      },
      {
        num: "3",
        icon: Wifi,
        title: "Réglage & garantie signal",
        text: "Test de qualité, réglage du signal optimal et démonstration. On ne repart qu'une fois que tout fonctionne parfaitement.",
      },
    ],
    expertBadge: "VOTRE TECHNICIEN",
    expert: {
      name: "Faly",
      role: "Spécialiste antenne satellite & Canal+",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
      bio: [
        'Technicien indépendant depuis plus de <strong class="text-foreground">12 ans</strong>, je me suis spécialisé dans la pose d\'antennes paraboliques et la mise en service des décodeurs Canal+.',
        "Chaque installation est réalisée dans les règles de l'art : fixation sécurisée, câblage discret, orientation millimétrée du satellite et test complet du signal avant de vous laisser la télécommande.",
        'Mon objectif : <strong class="text-foreground">que vous profitiez de toutes vos chaînes, sans coupure, dès le jour de mon passage.</strong>',
      ],
      stats: [
        { value: "+2 500", label: "installations" },
        { value: "48 h", label: "délai d'intervention" },
        { value: "12 ans", label: "d'expérience" },
      ],
    },
    offersBadge: "NOS OFFRES",
    offersTitle: 'Choisissez votre <span class="text-primary">pack</span>',
    offersSub:
        "Des solutions adaptées à vos besoins, avec une installation professionnelle incluse.",
    offers: [
      {
        name: "Essentiel",
        price: "245 000 Ar",
        promo: "Activation offerte",
        features: ["Décodeur Canal+ HD", "Paramétrage complet", "Test des chaînes"],
        cta: "Choisir",
      },
      {
        name: "Canal+ 4K",
        price: "198 000 Ar",
        original: "395 000 Ar",
        badge: "-50%",
        features: ["Décodeur 4K UHD", "Câblage optimisé", "Configuration WiFi"],
        popular: true,
        cta: "Je réserve",
      },
      {
        name: "Multi-écrans",
        price: "645 000 Ar",
        features: ["Installation multi-pièces", "Application mobile", "Canal+ sur tous vos écrans"],
        cta: "Choisir",
      },
    ],
    faq: [
      {
        q: "Combien de temps dure l'installation ?",
        a: "Comptez entre 1h et 2h selon la configuration de votre logement. La pose d'antenne, le câblage et le réglage du signal sont inclus.",
      },
      {
        q: "Quels documents faut-il fournir ?",
        a: "Un justificatif de domicile et votre pièce d'identité. Votre contrat Canal+ peut être souscrit le jour même si vous ne l'avez pas encore fait.",
      },
      {
        q: "Puis-je garder mon ancien décodeur ?",
        a: "Oui, nous pouvons le raccorder au nouveau système. Pour une qualité optimale, nous recommandons les derniers modèles Canal+.",
      },
      {
        q: "Intervenez-vous dans toute la région ?",
        a: "Nous couvrons toute la région. Un déplacement peut être facturé au-delà de 50 km — contactez-nous pour un devis personnalisé.",
      },
    ],
    testimonials: [
      {
        name: "Miangaly R.",
        rating: 5,
        text: "Technicien ponctuel et très professionnel. L'installation a été faite en moins d'1h30, le signal est parfait depuis. Je recommande vivement !",
      },
      {
        name: "Tolotra H.",
        rating: 5,
        text: "Excellent service du début à la fin. Le technicien a pris le temps de tout m'expliquer et de vérifier la qualité du signal dans chaque pièce.",
      },
      {
        name: "Fenitra S.",
        rating: 5,
        text: "Je pensais que ce serait compliqué mais tout a été fait rapidement et proprement. Plus aucune coupure, toutes mes chaînes sont impeccables !",
      },
    ],
  },
  phones: {
    processBadge: "ACHAT EN 3 ÉTAPES",
    processTitle: 'Comment <span class="text-primary">commander</span> votre téléphone',
    processSub: "Un processus simple et sécurisé pour obtenir votre nouveau smartphone rapidement.",
    steps: [
      {
        num: "1",
        icon: Smartphone,
        title: "Choisissez votre modèle",
        text: "Parcourez notre catalogue de smartphones neufs et reconditionnés. Filtrez par marque, prix ou caractéristiques pour trouver le modèle idéal.",
      },
      {
        num: "2",
        icon: ShoppingCart,
        title: "Paiement sécurisé",
        text: "Commandez en toute simplicité avec notre paiement sécurisé. Plusieurs options : carte bancaire, Mobile Banking ou paiement à la livraison.",
      },
      {
        num: "3",
        icon: ThumbsUp,
        title: "Livraison rapide",
        text: "Recevez votre téléphone chez vous ou en point relais sous 24 à 48h. Colis soigné avec garantie et accessoires inclus.",
      },
    ],
    expertBadge: "NOTRE EXPERT",
    expert: {
      name: "Tafita",
      role: "Conseiller télécoms & nouveaux médias",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800",
      bio: [
        'Passionné de technologie depuis <strong class="text-foreground">plus de 10 ans</strong>, je conseille nos clients pour trouver le smartphone parfait selon leur budget et leurs besoins.',
        "Chaque appareil est vérifié, testé et configuré avant expédition. Nous ne proposons que des modèles garantis et compatibles avec les réseaux locaux.",
        'Ma promesse : <strong class="text-foreground">le meilleur rapport qualité-prix, avec un suivi personnalisé avant et après votre achat.</strong>',
      ],
      stats: [
        { value: "+500", label: "clients servis" },
        { value: "24-48h", label: "livraison" },
        { value: "4.8★", label: "satisfaction" },
      ],
    },
    offersBadge: "NOS TÉLÉPHONES",
    offersTitle: 'Trouvez le <span class="text-primary">smartphone</span> qu\'il vous faut',
    offersSub: "Neufs et reconditionnés, tous nos téléphones sont garantis et prêts à l'emploi.",
    offers: [
      {
        name: "iPhone 15",
        price: "1 200 000 Ar",
        features: ['Écran Super Retina 6,1"', "Appareil photo 48 Mpx", "Garantie 12 mois"],
        cta: "Voir l'offre",
      },
      {
        name: "Samsung Galaxy S24",
        price: "950 000 Ar",
        badge: "Populaire",
        features: ['Écran Dynamic AMOLED 6,2"', "IA Galaxy intégrée", "Garantie 12 mois"],
        popular: true,
        cta: "Je le veux",
      },
      {
        name: "Xiaomi Redmi Note 13",
        price: "450 000 Ar",
        promo: "Meilleur rapport qualité-prix",
        features: ['Écran AMOLED 6,67"', "Batterie 5000 mAh", "Garantie 12 mois"],
        cta: "Voir l'offre",
      },
    ],
    faq: [
      {
        q: "Quelle est la garantie sur les téléphones ?",
        a: "Tous nos téléphones bénéficient d'une garantie de 12 mois. Les accessoires sont garantis 6 mois. En cas de problème, contactez-nous pour un échange ou un remboursement.",
      },
      {
        q: "Proposez-vous des téléphones reconditionnés ?",
        a: "Oui, nous proposons une sélection de smartphones reconditionnés de qualité. Chaque appareil est testé, nettoyé et classé en état excellent ou très bon.",
      },
      {
        q: "Quels sont les délais de livraison ?",
        a: "La livraison prend généralement 24 à 48h ouvrées selon votre localisation. Nous livrons dans toute la région via nos partenaires logistiques.",
      },
      {
        q: "Puis-je retourner un téléphone ?",
        a: "Vous disposez de 14 jours pour retourner votre téléphone s'il ne vous convient pas. L'appareil doit être dans son état d'origine, avec tous les accessoires.",
      },
    ],
    testimonials: [
      {
        name: "Njiva M.",
        rating: 5,
        text: "Commande arrivée en 24h, téléphone impeccable et conforme à la description. Je recommande cette boutique !",
      },
      {
        name: "Lalaina F.",
        rating: 5,
        text: "Excellent conseil pour choisir mon nouveau smartphone. Le rapport qualité-prix est imbattable. Merci !",
      },
      {
        name: "Rivo T.",
        rating: 5,
        text: "Site fiable, paiement sécurisé et livraison rapide. Mon troisième achat ici, toujours satisfait.",
      },
    ],
  },
  banking: {
    processBadge: "INSCRIPTION EN 3 ÉTAPES",
    processTitle: 'Commencez à <span class="text-primary">gérer votre argent</span> simplement',
    processSub:
        "Ouvrez un compte Mobile Banking en quelques minutes et profitez de la liberté financière.",
    steps: [
      {
        num: "1",
        icon: Users,
        title: "Inscription gratuite",
        text: "Téléchargez l'application et créez votre compte en moins de 5 minutes. Pièce d'identité suffisante, aucun frais d'ouverture.",
      },
      {
        num: "2",
        icon: ShieldCheck,
        title: "Activation sécurisée",
        text: "Activez votre compte via un code de confirmation reçu par SMS. Votre identité est vérifiée de bout en bout pour garantir la sécurité.",
      },
      {
        num: "3",
        icon: CreditCard,
        title: "Transactions au quotidien",
        text: "Transférez de l'argent, payez vos factures, rechargez vos crédits et gérez votre budget, le tout depuis votre téléphone.",
      },
    ],
    expertBadge: "NOTRE CONSEILLER",
    expert: {
      name: "Miora",
      role: "Conseillère en solutions financières digitales",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800",
      bio: [
        'Experte en finance digitale depuis <strong class="text-foreground">plus de 8 ans</strong>, j\'accompagne nos clients dans la transition vers une gestion de compte 100% mobile.',
        "Notre service Mobile Banking est conçu pour être accessible à tous : interface simple, assistance en direct et sécurité maximale des transactions.",
        'Ma mission : <strong class="text-foreground">vous offrir une liberté financière totale, sans agence, sans file d\'attente, sans stress.</strong>',
      ],
      stats: [
        { value: "+1 000", label: "comptes ouverts" },
        { value: "0 Ar", label: "frais de tenue" },
        { value: "5★", label: "satisfaction" },
      ],
    },
    offersBadge: "NOS FORMULES",
    offersTitle: 'Choisissez votre <span class="text-primary">compte</span>',
    offersSub:
        "Des formules adaptées à vos besoins, sans engagement et avec une sécurité renforcée.",
    offers: [
      {
        name: "Compte Basic",
        price: "Gratuit",
        features: ["Transferts illimités", "Paiement de factures", "Recharge crédit"],
        cta: "Ouvrir un compte",
      },
      {
        name: "Comte Pro",
        price: "5 000 Ar/mois",
        badge: "Populaire",
        features: ["Tout le Basic +", "Paiements marchands", "Virement international"],
        popular: true,
        cta: "Je passe au Pro",
      },
      {
        name: "Compte Premium",
        price: "10 000 Ar/mois",
        features: ["Tout le Pro +", "Assurance incluse", "Service prioritaire"],
        cta: "Devenir Premium",
      },
    ],
    faq: [
      {
        q: "Est-ce que le Mobile Banking est sécurisé ?",
        a: "Absolument. Toutes les transactions sont chiffrées et protégées par une authentification à deux facteurs. Nous utilisons les dernières technologies de sécurité bancaire.",
      },
      {
        q: "Y a-t-il des frais cachés ?",
        a: "Non, tous nos tarifs sont transparents. Le compte Basic est entièrement gratuit. Les formules Pro et Premium n'ont pas de frais cachés — contactez-nous pour un détail complet.",
      },
      {
        q: "Puis-je transférer de l'argent à l'étranger ?",
        a: "Oui, les virements internationaux sont disponibles dans la formule Pro et Premium. Les délais varient selon les pays destinataires.",
      },
      {
        q: "Comment puis-je déposer de l'argent sur mon compte ?",
        a: "Vous pouvez déposer de l'argent via nos points de dépôt partenaires, par virements bancaires, ou en agence. Le dépôt est immédiatement crédité sur votre compte mobile.",
      },
    ],
    testimonials: [
      {
        name: "Aina R.",
        rating: 5,
        text: "Application intuitive, transferts instantanés, service client réactif. J'ai remplacé ma banque traditionnelle sans regret !",
      },
      {
        name: "Soatiana N.",
        rating: 5,
        text: "Enfin un service bancaire qui comprend nos besoins. Zéro frais, tout se fait depuis le téléphone. Génial !",
      },
      {
        name: "Fandresena M.",
        rating: 5,
        text: "Je peux payer mes factures et envoyer de l'argent à ma famille en un clic. Simple, rapide, sécurisé.",
      },
    ],
  },
};

function Home() {
  const [index, setIndex] = useState(0);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [tel, setTel] = useState("");
  const total = services.length;

  function go(i: number) {
    setIndex(((i % total) + total) % total);
  }
  function next() {
    go(index + 1);
  }
  function prev() {
    go(index - 1);
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight") setIndex((i) => (((i + 1) % total) + total) % total);
      if (e.key === "ArrowLeft") setIndex((i) => (((i - 1) % total) + total) % total);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [total]);

  const hero = services[index];
  const sideServices = services.filter((s) => s.id !== hero.id);
  const current = marketContent[hero.id];

  const [touchStart, setTouchStart] = useState<number | null>(null);
  function onTouchStart(e: React.TouchEvent) {
    setTouchStart(e.touches[0].clientX);
  }
  function onTouchEnd(e: React.TouchEvent) {
    if (touchStart == null) return;
    const dx = e.changedTouches[0].clientX - touchStart;
    if (Math.abs(dx) > 40) dx < 0 ? next() : prev();
    setTouchStart(null);
  }

  const promoContent: Record<ServiceId, { badge: string; text: string }> = {
    canal: {
      badge: "Intervention rapide",
      text: 'Une installation propre et professionnelle pour <strong class="text-foreground">regarder Canal+ sans coupure</strong>, partout chez vous.',
    },
    phones: {
      badge: "Livraison 24-48h",
      text: 'Commandez votre smartphone et recevez-le rapidement chez vous, <strong class="text-foreground">neuf ou reconditionné avec garantie</strong>.',
    },
    banking: {
      badge: "Zéro frais",
      text: 'Ouvrez un compte Mobile Banking gratuitement et gérez votre argent <strong class="text-foreground">sans frais cachés</strong>, partout.',
    },
  };
  const promo = promoContent[hero.id];

  const topCta: Record<ServiceId, { title: string; text: string; btn: string; href: string }> = {
    canal: {
      title: "Prêt à passer à l'action ?",
      text: "Réservez votre installation dès maintenant. Devis gratuit, intervention rapide et satisfaction garantie.",
      btn: "Je réserve mon installation",
      href: "/reservation",
    },
    phones: {
      title: "Trouvez votre prochain smartphone",
      text: "Des centaines de modèles disponibles. Livraison rapide, paiement sécurisé et garantie 12 mois incluse.",
      btn: "Voir la boutique",
      href: "/boutique",
    },
    banking: {
      title: "Rejoignez la banque mobile",
      text: "Ouvrez un compte en 5 minutes. Transferts, paiements et gestion, le tout depuis votre téléphone.",
      btn: "Ouvrir un compte",
      href: "/contact",
    },
  };
  const cta = topCta[hero.id];

  return (
      <div className="flex min-h-screen flex-col bg-background text-foreground">
        <header className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm">
          <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 lg:px-10">
            <a href="/" className="flex items-center gap-3">
              <img
                  src="/images/logo-area.svg"
                  alt="NEXT TECH & SERVICES"
                  className="h-10 w-auto object-contain object-left"
              />
            </a>

            <nav className="hidden items-center gap-8 text-sm font-medium text-foreground/90 md:flex">
              <a href="#" className="transition-colors hover:text-primary">
                Accueil
              </a>
              <a href="#services" className="transition-colors hover:text-primary">
                Services
              </a>
              <a href="#process" className="transition-colors hover:text-primary">
                Comment ça marche
              </a>
              <a href="#offers" className="transition-colors hover:text-primary">
                Offres
              </a>
              <a href="/contact" className="transition-colors hover:text-primary">
                Contact
              </a>
            </nav>

            <div className="flex items-center gap-3">
              <a
                  href="tel:+221000000000"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-2 text-sm font-medium transition-colors hover:border-primary/40 hover:bg-card"
              >
                <Phone className="h-4 w-4 text-primary" />
                <span className="hidden sm:inline">Nous appeler</span>
              </a>
              <a
                  href="https://wa.me/221000000000"
                  aria-label="WhatsApp"
                  className="grid h-10 w-10 place-items-center rounded-full bg-[oklch(0.62_0.19_145)] text-white transition-transform hover:scale-105"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>
        </header>

        <main
            id="services"
            className="relative flex flex-1 flex-col px-4 py-6 sm:px-6 lg:px-10"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
        >
          <div className="mx-auto w-full max-w-[1400px]">
            <div className="grid gap-4 lg:grid-cols-[1fr_380px] lg:gap-5">
              <HeroCarousel
                  service={hero}
                  onPrev={prev}
                  onNext={next}
                  index={index}
                  total={total}
                  onSelect={go}
              />

              <div className="hidden flex-col gap-4 lg:flex">
                {sideServices.map((service) => (
                    <SideServiceCard
                        key={service.id}
                        service={service}
                        onSelect={() => go(services.indexOf(service))}
                    />
                ))}
              </div>
            </div>

            <div className="mt-4 lg:hidden">
              <div className="flex gap-3 overflow-x-auto pb-2">
                {services.map((service, i) => (
                    <button
                        key={service.id}
                        onClick={() => go(i)}
                        className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                            i === index
                                ? "bg-primary text-primary-foreground"
                                : "bg-card text-muted-foreground"
                        }`}
                    >
                      {service.short}
                    </button>
                ))}
              </div>
            </div>

            <FeatureBar currentId={hero.id} />
          </div>
        </main>

        <section className="border-t border-border/40 bg-background/80">
          <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6 lg:px-10 lg:py-14">
            <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left md:gap-8">
              <div className="flex items-center gap-3 rounded-full bg-primary/10 px-5 py-2 text-sm font-semibold text-primary">
                <Zap className="h-4 w-4" />
                {promo.badge}
              </div>
              <p
                  className="text-lg text-muted-foreground sm:text-xl"
                  dangerouslySetInnerHTML={{ __html: promo.text }}
              />
              <div className="sm:ml-auto">
                <a
                    href="tel:+221000000000"
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
                >
                  <Phone className="h-4 w-4" />
                  Appeler maintenant
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="process" className="border-t border-border/40">
          <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
            <div className="text-center">
            <span className="inline-flex rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-xs font-bold tracking-widest text-primary">
              {current.processBadge}
            </span>
              <h2
                  className="mt-4 text-3xl font-black tracking-tight sm:text-4xl"
                  dangerouslySetInnerHTML={{ __html: current.processTitle }}
              />
              <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">{current.processSub}</p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {current.steps.map((step, i) => {
                const Icon = step.icon;
                return (
                    <article
                        key={step.num}
                        className="group relative overflow-hidden rounded-3xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/30 sm:p-8"
                    >
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                        <Icon className="h-7 w-7" />
                      </div>
                      <span className="mt-5 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {step.num}
                  </span>
                      <h3 className="mt-3 text-xl font-bold">{step.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
                      {i < current.steps.length - 1 && (
                          <div className="absolute right-6 top-1/2 hidden -translate-y-1/2 text-primary/30 md:block">
                            <ArrowRight className="h-6 w-6" />
                          </div>
                      )}
                    </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-t border-border/40 bg-card/30">
          <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
            <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
              <div className="relative mx-auto w-full max-w-sm">
                <div className="absolute -inset-4 rounded-[2rem] bg-primary/10 blur-2xl" />
                <img
                    src={current.expert.image}
                    alt={current.expert.name}
                    loading="lazy"
                    width={1024}
                    height={1280}
                    className="relative rounded-[2rem] border border-border object-cover"
                />
              </div>

              <div>
              <span className="inline-flex rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-xs font-bold tracking-widest text-primary">
                {current.expertBadge}
              </span>
                <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
                  {current.expert.name}, votre{" "}
                  <span className="text-primary">{current.expert.role.toLowerCase()}</span>
                </h2>
                <p className="mt-1 text-sm font-semibold uppercase tracking-widest text-primary/70">
                  {current.expert.role}
                </p>

                <div className="mt-5 space-y-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {current.expert.bio.map((p, i) => (
                      <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
                  ))}
                </div>

                <div className="mt-8 grid grid-cols-3 gap-3">
                  {current.expert.stats.map((s) => (
                      <div
                          key={s.label}
                          className="rounded-xl border border-border bg-background p-4 text-center"
                      >
                        <p className="text-2xl font-black text-primary">{s.value}</p>
                        <p className="mt-1 text-xs leading-tight text-muted-foreground">{s.label}</p>
                      </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="offers" className="border-t border-border/40">
          <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
            <div className="text-center">
            <span className="inline-flex rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-xs font-bold tracking-widest text-primary">
              {current.offersBadge}
            </span>
              <h2
                  className="mt-4 text-3xl font-black tracking-tight sm:text-4xl"
                  dangerouslySetInnerHTML={{ __html: current.offersTitle }}
              />
              <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">{current.offersSub}</p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {current.offers.map((offer) => (
                  <article
                      key={offer.name}
                      className={`relative flex flex-col rounded-3xl border p-6 transition-all hover:-translate-y-1 sm:p-8 ${
                          offer.popular
                              ? "border-primary/50 bg-primary/5 shadow-lg shadow-primary/10"
                              : "border-border bg-card"
                      }`}
                  >
                    {offer.popular && (
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-bold text-primary-foreground">
                    Le plus populaire
                  </span>
                    )}
                    <h3 className="text-lg font-bold">{offer.name}</h3>
                    <div className="mt-3 flex items-baseline gap-2">
                      <span className="text-3xl font-black">{offer.price}</span>
                      {offer.original && (
                          <span className="text-sm text-muted-foreground line-through">
                      {offer.original}
                    </span>
                      )}
                    </div>
                    {offer.promo && (
                        <p className="mt-1 text-xs font-semibold text-primary">{offer.promo}</p>
                    )}
                    {offer.badge && (
                        <span className="mt-2 inline-flex w-fit rounded-full bg-primary/20 px-3 py-0.5 text-xs font-bold text-primary">
                    {offer.badge}
                  </span>
                    )}
                    <ul className="mt-6 flex-1 space-y-3">
                      {offer.features.map((f) => (
                          <li key={f} className="flex items-start gap-2.5 text-sm">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                            {f}
                          </li>
                      ))}
                    </ul>
                    <a
                        href={hero.href}
                        className={`mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-transform hover:scale-[1.02] ${
                            offer.popular
                                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                                : "border border-primary/30 text-primary hover:bg-primary/10"
                        }`}
                    >
                      {offer.cta}
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-border/40 bg-card/30">
          <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
            <div className="text-center">
            <span className="inline-flex rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-xs font-bold tracking-widest text-primary">
              TÉMOIGNAGES
            </span>
              <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
                Ils nous ont <span className="text-primary">fait confiance</span>
              </h2>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {current.testimonials.map((t) => (
                  <article
                      key={t.name}
                      className="flex flex-col rounded-3xl border border-border bg-card p-6 sm:p-8"
                  >
                    <div className="flex gap-1">
                      {Array.from({ length: t.rating }).map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                      "{t.text}"
                    </p>
                    <div className="mt-5 flex items-center gap-3 border-t border-border/60 pt-4">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
                        {t.name.charAt(0)}
                      </div>
                      <span className="text-sm font-semibold">{t.name}</span>
                    </div>
                  </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-border/40">
          <div className="mx-auto max-w-[800px] px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
            <div className="text-center">
            <span className="inline-flex rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-xs font-bold tracking-widest text-primary">
              FAQ
            </span>
              <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
                Questions <span className="text-primary">fréquentes</span>
              </h2>
            </div>

            <div className="mt-10 space-y-3">
              {current.faq.map((item, i) => (
                  <div
                      key={i}
                      className="rounded-2xl border border-border bg-card overflow-hidden transition-all"
                  >
                    <button
                        onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                        className="flex w-full items-center justify-between px-6 py-5 text-left text-sm font-semibold sm:text-base"
                    >
                      {item.q}
                      <ChevronDown
                          className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${
                              faqOpen === i ? "rotate-180" : ""
                          }`}
                      />
                    </button>
                    <div
                        className={`overflow-hidden transition-all ${
                            faqOpen === i ? "max-h-96" : "max-h-0"
                        }`}
                    >
                      <p className="border-t border-border/60 px-6 py-4 text-sm leading-relaxed text-muted-foreground">
                        {item.a}
                      </p>
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-border/40 bg-primary">
          <div className="mx-auto max-w-[1400px] px-4 py-14 sm:px-6 lg:px-10 lg:py-16">
            <div className="grid items-center gap-8 md:grid-cols-2">
              <div>
                <h2 className="text-3xl font-black leading-tight text-primary-foreground sm:text-4xl">
                  {cta.title}
                </h2>
                <p className="mt-3 max-w-md text-primary-foreground/85">{cta.text}</p>
                <div className="mt-6 flex flex-wrap gap-4">
                  <a
                      href={hero.href}
                      className="inline-flex items-center gap-2 rounded-full bg-primary-foreground px-6 py-3 text-sm font-semibold text-primary transition-transform hover:scale-105"
                  >
                    <ArrowRight className="h-4 w-4" />
                    {cta.btn}
                  </a>
                  <a
                      href="tel:+221000000000"
                      className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:bg-primary-foreground/10 hover:scale-105"
                  >
                    <Phone className="h-4 w-4" />
                    Appeler
                  </a>
                </div>
              </div>

              <div className="rounded-2xl border border-primary-foreground/20 bg-primary-foreground/10 p-6 backdrop-blur sm:p-8">
                <p className="text-sm font-semibold uppercase tracking-widest text-primary-foreground/90">
                  Être rappelé gratuitement
                </p>
                <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                  <input
                      type="tel"
                      value={tel}
                      onChange={(e) => setTel(e.target.value)}
                      placeholder="Votre numéro de téléphone"
                      className="w-full rounded-full border border-primary-foreground/30 bg-primary-foreground/10 px-5 py-3 text-sm text-primary-foreground outline-none placeholder:text-primary-foreground/60 focus:border-primary-foreground"
                  />
                  <button className="shrink-0 rounded-full bg-primary-foreground px-6 py-3 text-sm font-bold text-primary transition-transform hover:scale-105">
                    Me rappeler
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="border-t border-border/40 bg-background px-6 py-8 text-center text-xs text-muted-foreground lg:px-10">
          <div className="mx-auto max-w-[1400px]">
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
              <img
                  src="/images/logo-area.svg"
                  alt="NEXT TECH & SERVICES"
                  className="h-8 w-auto object-contain"
              />
              <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
                <a href="#" className="transition-colors hover:text-primary">
                  Accueil
                </a>
                <a href="#services" className="transition-colors hover:text-primary">
                  Services
                </a>
                <a href="#process" className="transition-colors hover:text-primary">
                  Guide
                </a>
                <a href="#offers" className="transition-colors hover:text-primary">
                  Offres
                </a>
                <a href="/contact" className="transition-colors hover:text-primary">
                  Contact
                </a>
              </nav>
            </div>
            <p className="mt-6">
              © {new Date().getFullYear()} NEXT TECH &amp; SERVICES. Tous droits réservés.
            </p>
          </div>
        </footer>
      </div>
  );
}

function HeroCarousel({
                        service,
                        onPrev,
                        onNext,
                        index,
                        total,
                        onSelect,
                      }: {
  service: Service;
  onPrev: () => void;
  onNext: () => void;
  index: number;
  total: number;
  onSelect: (i: number) => void;
}) {
  return (
      <article className="relative min-h-[420px] overflow-hidden rounded-3xl sm:min-h-[520px] lg:min-h-[580px]">
        <img src={service.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

        <button
            onClick={onPrev}
            aria-label="Précédent"
            className="absolute left-3 top-1/2 z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60 sm:left-5 sm:h-12 sm:w-12"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
            onClick={onNext}
            aria-label="Suivant"
            className="absolute right-3 top-1/2 z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60 sm:right-5 sm:h-12 sm:w-12"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        <div className="relative z-10 flex h-full flex-col justify-end p-6 sm:p-10 lg:max-w-[70%] lg:p-12">
        <span
            className={`mb-4 inline-flex w-fit rounded-full border px-3 py-1 text-[10px] font-bold tracking-widest sm:text-xs ${service.tagClass}`}
        >
          {service.tag}
        </span>
          <h1 className="text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            {service.title}
          </h1>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/80 sm:text-base">
            {service.description}
          </p>

          <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
            {service.features.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-2 text-xs text-white/75 sm:text-sm">
                  <Icon className="h-4 w-4 text-primary" strokeWidth={1.75} />
                  {label}
                </li>
            ))}
          </ul>

          <a
              href={service.href}
              className={`mt-6 inline-flex w-fit items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-[1.02] ${service.btnClass}`}
          >
            {service.cta}
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
          {Array.from({ length: total }).map((_, i) => (
              <button
                  key={i}
                  aria-label={`Aller au service ${i + 1}`}
                  onClick={() => onSelect(i)}
                  className={`rounded-full transition-all ${
                      i === index ? "h-2.5 w-8 bg-primary" : "h-2.5 w-2.5 bg-white/50 hover:bg-white/80"
                  }`}
              />
          ))}
        </div>
      </article>
  );
}

function SideServiceCard({ service, onSelect }: { service: Service; onSelect: () => void }) {
  return (
      <button
          onClick={onSelect}
          className="group relative flex min-h-[270px] flex-1 flex-col justify-end overflow-hidden rounded-3xl text-left transition-transform hover:scale-[1.01]"
      >
        <img src={service.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div
            className={`absolute inset-0 ${
                service.id === "phones"
                    ? "bg-gradient-to-br from-[oklch(0.35_0.15_260)]/90 via-black/70 to-black/90"
                    : "bg-gradient-to-br from-[oklch(0.35_0.12_145)]/90 via-black/70 to-black/90"
            }`}
        />
        <div className="relative z-10 p-6">
        <span
            className={`inline-flex rounded-full border px-2.5 py-0.5 text-[10px] font-bold tracking-widest ${service.tagClass}`}
        >
          {service.tag}
        </span>
          <h3 className="mt-2 text-xl font-bold text-white">{service.title}</h3>
          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-white/70">
            {service.description}
          </p>
          <span
              className={`mt-4 inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold text-white ${service.btnClass}`}
          >
          {service.cta}
            <ArrowRight className="h-3.5 w-3.5" />
        </span>
        </div>
      </button>
  );
}

function FeatureBar({ currentId }: { currentId: ServiceId }) {
  const labelMap: Record<ServiceId, string[]> = {
    canal: [
      "1000+ Clients satisfaits",
      "Installation rapide et garantie",
      "Support disponible 7j/7",
      "Techniciens certifiés",
    ],
    phones: ["500+ Clients servis", "Garantie 12 mois", "Livraison 24-48h", "Paiement sécurisé"],
    banking: [
      "1000+ Comptes ouverts",
      "Transactions sécurisées",
      "Service 24h/24",
      "Zéro frais cachés",
    ],
  };
  const labels = labelMap[currentId];
  const icons = [Users, ShieldCheck, Headphones, ThumbsUp];
  return (
      <section
          id="about"
          className="mt-5 grid grid-cols-2 gap-4 rounded-3xl bg-feature-bar px-6 py-6 text-feature-bar-foreground sm:grid-cols-4 sm:gap-6 sm:px-10 sm:py-7"
      >
        {labels.map((label, i) => {
          const Icon = icons[i];
          return (
              <div
                  key={label}
                  className="flex flex-col items-center gap-2 text-center sm:flex-row sm:text-left"
              >
                <Icon className="h-5 w-5 shrink-0 text-muted-foreground" strokeWidth={1.75} />
                <span className="text-xs font-medium leading-snug sm:text-sm">{label}</span>
              </div>
          );
        })}
      </section>
  );
}