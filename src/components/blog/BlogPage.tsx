import { useState } from "react";
import type { KeyboardEvent, MouseEvent, FormEvent } from "react";
import {
  ArrowRight,
  Clock,
  Zap,
  Tv,
  Music,
  Trophy,
  Sparkles,
  Mail,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";

type CategoryId = "all" | "series" | "tech" | "sport" | "musique";

interface Category {
  id: CategoryId;
  label: string;
  icon: LucideIcon;
}

interface Article {
  id: number;
  category: Exclude<CategoryId, "all">;
  catLabel: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  read: string;
  image: string;
  imageAlt: string;
  content: string[];
  gallery: { src: string; alt: string }[];
}

const CATEGORIES: Category[] = [
  { id: "all", label: "Tout", icon: Sparkles },
  { id: "series", label: "Séries & Films", icon: Tv },
  { id: "tech", label: "Technologie", icon: Zap },
  { id: "sport", label: "Sport", icon: Trophy },
  { id: "musique", label: "Musique", icon: Music },
];

const ARTICLES: Article[] = [
  {
    id: 1,
    category: "tech",
    catLabel: "Technologie",
    title: "Le décodeur nouvelle génération arrive chez vous",
    excerpt:
      "Design repensé, démarrage instantané et une puce dédiée à l'image 4K HDR : voici ce qui change avec le nouveau boîtier Eray-Tech.",
    author: "L. Andriamora",
    date: "28 juin 2026",
    read: "5 min",
    image: "https://picsum.photos/seed/eraytech-decodeur/900/600",
    imageAlt: "Décodeur nouvelle génération posé sous un téléviseur allumé",
    content: [
      "Trois ans après le précédent modèle, Eray-Tech dévoile un décodeur pensé pour disparaître dans le salon plutôt que pour l'occuper. Le boîtier perd 40 % de volume, adopte une finition mate et ne conserve qu'un seul port visible en façade.",
      "Sous le capot, le vrai changement est ailleurs : une puce dédiée traite désormais l'upscaling et le HDR en local, sans dépendre du débit internet disponible au moment de la diffusion. Concrètement, une scène sombre garde ses détails même sur une connexion chargée.",
      "Le démarrage, souvent pointé du doigt sur l'ancienne génération, passe de onze secondes à moins de deux. La télécommande, elle, gagne un micro pour la recherche vocale et perd six boutons devenus inutiles avec la nouvelle interface.",
      "Le déploiement commence par les abonnés en renouvellement de contrat avant d'être ouvert à l'ensemble du catalogue d'ici la fin de l'année.",
    ],
    gallery: [
      { src: "https://picsum.photos/seed/decodeur-1/600/400", alt: "Vue de face du décodeur nouvelle génération" },
      { src: "https://picsum.photos/seed/decodeur-2/600/400", alt: "Détail des ports arrière du décodeur" },
      { src: "https://picsum.photos/seed/decodeur-3/600/400", alt: "Télécommande avec micro intégré" },
      { src: "https://picsum.photos/seed/decodeur-4/600/400", alt: "Le décodeur installé sous un téléviseur" },
    ],
  },
  {
    id: 2,
    category: "series",
    catLabel: "Séries & Films",
    title: "Rentrée automne : sept séries à ne pas manquer",
    excerpt:
      "Thrillers nordiques, comédies romantiques et un retour très attendu : notre sélection des fictions qui vont marquer la saison.",
    author: "R. Rakoto",
    date: "26 juin 2026",
    read: "7 min",
    image: "https://picsum.photos/seed/eraytech-serie/900/600",
    imageAlt: "Trois amis regardant une série ensemble installés sur un canapé",
    content: [
      "L'automne s'annonce chargé côté fiction. Notre rédaction a visionné les premiers épisodes de la rentrée pour établir cette sélection, entre nouveautés et retours attendus.",
      "Du côté des thrillers, une production tournée dans le nord de l'Europe mise sur des décors glacés et un rythme délibérément lent, à contre-courant des séries à cliffhangers permanents. Trois épisodes suffisent à comprendre pourquoi elle fait déjà parler d'elle.",
      "Les amateurs de comédie ne sont pas oubliés : une nouvelle série choisit le format court, vingt-deux minutes par épisode, pour raconter une histoire de reconversion professionnelle sans jamais forcer le trait.",
      "Enfin, la saison très attendue d'une fiction culte revient avec un budget revu à la hausse et une distribution élargie. Sans trop en dévoiler, la première scène pose déjà les enjeux de l'ensemble de la saison.",
      "Le calendrier complet, épisode par épisode, est disponible dans l'application, section « À venir ».",
    ],
    gallery: [
      { src: "https://picsum.photos/seed/serie-1/600/400", alt: "Scène de thriller nordique dans un décor enneigé" },
      { src: "https://picsum.photos/seed/serie-2/600/400", alt: "Deux acteurs sur le plateau de tournage" },
      { src: "https://picsum.photos/seed/serie-3/600/400", alt: "Affiche promotionnelle de la série événement" },
      { src: "https://picsum.photos/seed/serie-4/600/400", alt: "L'équipe technique en coulisses" },
    ],
  },
  {
    id: 3,
    category: "sport",
    catLabel: "Sport",
    title: "Dans les coulisses d'une retransmission en direct",
    excerpt:
      "Douze caméras, une régie mobile et zéro droit à l'erreur : on a suivi l'équipe technique un soir de grand match.",
    author: "H. Rasoanaivo",
    date: "24 juin 2026",
    read: "6 min",
    image: "https://picsum.photos/seed/eraytech-regie/900/600",
    imageAlt: "Régie de retransmission avec plusieurs écrans de contrôle vidéo",
    content: [
      "16h30, quatre heures avant le coup d'envoi. Le camion régie est déjà branché, les douze caméras positionnées et testées une à une par l'équipe technique. Rien n'est laissé au hasard, chaque angle a été validé la veille sur plan.",
      "Dans le camion, huit personnes se partagent les écrans : un réalisateur pour choisir les plans en direct, un ingénieur son, deux techniciens dédiés au ralenti et à l'arbitrage vidéo, et une équipe graphisme qui incruste scores et statistiques en temps réel.",
      "La difficulté n'est pas technique mais humaine : anticiper une action avant qu'elle n'arrive. Le réalisateur explique choisir son plan environ une seconde et demie avant l'événement, sur la base de la lecture du jeu — un réflexe qui ne s'acquiert qu'avec des centaines de matchs.",
      "À la moindre coupure de signal, une bascule automatique vers un flux de secours prend le relais en moins de 200 millisecondes, invisible pour la plupart des téléspectateurs.",
      "Le match se termine, l'équipe range son matériel : la prochaine retransmission est prévue dans quarante-huit heures, à l'autre bout du pays.",
    ],
    gallery: [
      { src: "https://picsum.photos/seed/regie-1/600/400", alt: "Vue intérieure de la camion régie mobile" },
      { src: "https://picsum.photos/seed/regie-2/600/400", alt: "Écrans de contrôle vidéo en direct" },
      { src: "https://picsum.photos/seed/regie-3/600/400", alt: "Caméra de retransmission sportive" },
      { src: "https://picsum.photos/seed/regie-4/600/400", alt: "L'équipe technique pendant le match" },
    ],
  },
  {
    id: 4,
    category: "musique",
    catLabel: "Musique",
    title: "Le son spatial, vraie révolution ou effet de mode ?",
    excerpt:
      "On a testé l'audio immersif sur trois genres musicaux très différents. Résultat : ça dépend surtout de votre casque.",
    author: "M. Randria",
    date: "21 juin 2026",
    read: "4 min",
    image: "https://picsum.photos/seed/eraytech-concert/900/600",
    imageAlt: "Foule à un concert éclairée par des jeux de lumière de scène",
    content: [
      "L'audio spatial promet de placer l'auditeur au centre du mix plutôt que face à lui. Pour vérifier si la promesse tient sur autre chose qu'une démo constructeur, nous l'avons testé sur trois genres aux exigences très différentes.",
      "Sur un enregistrement de jazz live, l'effet convainc immédiatement : on distingue la position de chaque musicien sur scène, avec une profondeur qu'un mixage stéréo classique ne restitue pas.",
      "Sur une production électronique très travaillée en studio, le résultat est plus inégal : certains titres gagnent en largeur, d'autres perdent la précision qui faisait leur identité sonore d'origine.",
      "Le pop mainstream, enfin, montre les limites de l'exercice : la plupart des titres n'ont pas été pensés pour ce format, et la conversion automatique produit un rendu correct mais rarement mémorable.",
      "Conclusion provisoire : l'audio spatial change vraiment l'expérience d'écoute, mais seulement quand le mixage d'origine a été pensé pour lui — la technologie ne fait pas tout.",
    ],
    gallery: [
      { src: "https://picsum.photos/seed/concert-1/600/400", alt: "Scène de concert avec éclairage LED" },
      { src: "https://picsum.photos/seed/concert-2/600/400", alt: "Casque audio haute fidélité posé sur une console" },
      { src: "https://picsum.photos/seed/concert-3/600/400", alt: "Studio d'enregistrement avec micros professionnels" },
      { src: "https://picsum.photos/seed/concert-4/600/400", alt: "Foule lors d'un festival de musique" },
    ],
  },
  {
    id: 5,
    category: "tech",
    catLabel: "Technologie",
    title: "Comment l'appli s'adapte à votre connexion",
    excerpt:
      "Compression intelligente, préchargement discret : les petites optimisations qui évitent les tampons de lecture.",
    author: "L. Andriamora",
    date: "18 juin 2026",
    read: "5 min",
    image: "https://picsum.photos/seed/eraytech-connexion/900/600",
    imageAlt: "Smartphone affichant une application de streaming à côté d'un routeur",
    content: [
      "Une lecture qui tremble gâche n'importe quel contenu, aussi bon soit-il. L'équipe technique d'Eray-Tech a travaillé deux ans sur un système de compression qui s'adapte en continu à la qualité réelle de la connexion, plutôt qu'à une estimation fixée au démarrage.",
      "Concrètement, l'application mesure la stabilité du réseau plusieurs fois par seconde et ajuste la qualité d'image par paliers imperceptibles, plutôt que par sauts brusques de résolution qui attirent l'œil.",
      "Un préchargement discret entre également en jeu : les premières secondes de l'épisode suivant sont mises en mémoire pendant le visionnage du précédent, ce qui explique la quasi-absence de temps de chargement entre deux épisodes.",
      "Ces ajustements restent invisibles par design — l'objectif affiché par l'équipe n'est pas de vous montrer la technologie, mais de vous la faire oublier.",
    ],
    gallery: [
      { src: "https://picsum.photos/seed/connexion-1/600/400", alt: "Application de streaming sur écran de smartphone" },
      { src: "https://picsum.photos/seed/connexion-2/600/400", alt: "Routeur Wi-Fi avec indicateur de signal" },
      { src: "https://picsum.photos/seed/connexion-3/600/400", alt: "Graphique de qualité de flux vidéo" },
      { src: "https://picsum.photos/seed/connexion-4/600/400", alt: "Comparaison avant/après compression intelligente" },
    ],
  },
  {
    id: 6,
    category: "series",
    catLabel: "Séries & Films",
    title: "Rencontre avec la scénariste derrière la série événement",
    excerpt:
      "Trois ans d'écriture, une saison bouclée en secret : entretien sans filtre sur la création d'une fiction ambitieuse.",
    author: "R. Rakoto",
    date: "15 juin 2026",
    read: "8 min",
    image: "https://picsum.photos/seed/eraytech-scenariste/900/600",
    imageAlt: "Bureau d'écrivain avec ordinateur portable et carnet de notes",
    content: [
      "Elle a accepté de nous recevoir dans la salle d'écriture, quelques semaines avant la diffusion du premier épisode. Trois ans de travail, une saison bouclée dans le plus grand secret : entretien sans détour sur la création d'une fiction ambitieuse.",
      "« La première version du scénario n'avait presque rien à voir avec ce qui sera diffusé », confie-t-elle. L'équipe d'écriture est repartie de zéro après six mois de travail, une décision rare et coûteuse qu'elle défend encore aujourd'hui.",
      "Sur le choix du secret entourant le tournage : « Ce n'est pas une stratégie marketing. C'est que les acteurs eux-mêmes ne recevaient les scripts que semaine par semaine, pour préserver leurs réactions à l'écran. »",
      "La scénariste revient aussi sur la difficulté de clore une histoire pensée pour durer plusieurs saisons sans trahir les spectateurs les plus fidèles, un exercice qu'elle compare à « démonter un mécanisme d'horlogerie pièce par pièce, sans casser le mouvement ».",
      "La série sera disponible en intégralité dès sa sortie, un choix assumé par la production pour permettre un visionnage au rythme de chacun.",
    ],
    gallery: [
      { src: "https://picsum.photos/seed/scenariste-1/600/400", alt: "Bureau d'écriture avec scripts et notes" },
      { src: "https://picsum.photos/seed/scenariste-2/600/400", alt: "Plan de travail avec feuillets de scénario" },
      { src: "https://picsum.photos/seed/scenariste-3/600/400", alt: "Clap de tournage en studio" },
      { src: "https://picsum.photos/seed/scenariste-4/600/400", alt: "Écran d'édition de script numérisé" },
    ],
  },
  {
    id: 7,
    category: "sport",
    catLabel: "Sport",
    title: "Statistiques en direct : la donnée au service du jeu",
    excerpt:
      "Vitesse de balle, probabilité de but, distance parcourue : comment ces chiffres arrivent sur votre écran en un instant.",
    author: "H. Rasoanaivo",
    date: "12 juin 2026",
    read: "5 min",
    image: "https://picsum.photos/seed/eraytech-stade/900/600",
    imageAlt: "Stade de football éclairé de nuit par les projecteurs",
    content: [
      "Vitesse de balle, probabilité de but, distance parcourue par chaque joueur : ces chiffres qui s'affichent en direct sur votre écran résultent d'une chaîne technique lancée bien avant le coup d'envoi.",
      "Une dizaine de caméras dédiées au tracking, distinctes des caméras de réalisation, suivent en continu la position du ballon et de chaque joueur sur le terrain, à raison de vingt-cinq mesures par seconde.",
      "Ces données brutes transitent par un serveur qui calcule les statistiques dérivées — vitesse, distance, probabilité — en moins d'une seconde, avant d'être transmises à l'équipe graphisme qui les habille pour l'antenne.",
      "L'ensemble de la chaîne, de la mesure à l'affichage, prend environ trois secondes. Un délai jugé imperceptible par la production, mais que l'équipe technique cherche encore à réduire.",
      "Ces mêmes données alimentent aussi les résumés automatiques disponibles quelques minutes après la fin de la rencontre dans l'application.",
    ],
    gallery: [
      { src: "https://picsum.photos/seed/stade-1/600/400", alt: "Caméras de tracking positionnées autour du terrain" },
      { src: "https://picsum.photos/seed/stade-2/600/400", alt: "Écran affichant les statistiques en temps réel" },
      { src: "https://picsum.photos/seed/stade-3/600/400", alt: "Vue aérienne du stade éclairé" },
      { src: "https://picsum.photos/seed/stade-4/600/400", alt: "Équipe technique analysant les données" },
    ],
  },
];

interface ArticleDetailProps {
  article: Article;
  onBack: () => void;
  onOpen: (id: number) => void;
}

function ArticleDetail({ article, onBack, onOpen }: ArticleDetailProps) {
  const related = ARTICLES.filter((a) => a.category === article.category && a.id !== article.id).slice(0, 3);

  return (
    <div className="et-fade-up w-full" style={{ fontFamily: "'Inter', sans-serif", background: "#FFFFFF", color: "#0D0D0D" }}>
      <div className="relative overflow-hidden" style={{ background: "#0D0D0D" }}>
        <div className="et-scan" />
        <div
          className="absolute -top-32 -right-32 w-[420px] h-[420px] rounded-full blur-3xl opacity-20"
          style={{ background: "radial-gradient(circle, #FF4500, transparent 70%)" }}
        />
        <div className="w-full px-6 md:px-10 pt-14 pb-16 relative">
          <button
            onClick={onBack}
            className="et-link text-white/70 hover:text-white text-sm font-medium flex items-center gap-1.5 mb-8"
          >
            <ArrowRight size={15} style={{ transform: "rotate(180deg)" }} /> Retour au Mag
          </button>
          <span
            style={{ background: "#FF4500" }}
            className="inline-block text-white text-xs font-semibold px-3 py-1 rounded-full mb-5"
          >
            {article.catLabel}
          </span>
          <h1 className="display text-white font-extrabold text-3xl md:text-[44px] leading-[1.1] mb-6 max-w-3xl">
            {article.title}
          </h1>
          <div className="flex items-center gap-3">
            <div style={{ background: "#FF4500" }} className="w-9 h-9 rounded-full flex items-center justify-center text-black text-xs font-bold">
              {article.author.split(" ")[1]?.[0] || article.author[0]}
            </div>
            <div className="text-xs text-white/55">
              <div className="font-medium text-white/85">{article.author}</div>
              <div className="flex items-center gap-1">
                {article.date} · <Clock size={11} className="inline" /> {article.read} de lecture
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full px-6 md:px-10 py-12 md:py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          <div className="flex flex-col gap-5">
            <div
              className="et-fade-up rounded-[20px] overflow-hidden aspect-[4/3] bg-neutral-100 shadow-lg"
              style={{ background: "#0D0D0D" }}
            >
              <img
                src={article.image}
                alt={article.imageAlt}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>

            {article.gallery.length > 0 && (
              <div className="grid grid-cols-2 gap-3">
                {article.gallery.map((img, i) => (
                  <div
                    key={i}
                    className="et-fade-up rounded-xl overflow-hidden aspect-[3/2] bg-neutral-100"
                    style={{ animationDelay: `${i * 80}ms` }}
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <article className="flex flex-col justify-center">
            <p className="text-xl leading-relaxed font-semibold mb-6" style={{ color: "#0D0D0D" }}>{article.excerpt}</p>
            <div className="space-y-5">
              {article.content.map((p, i) => (
                <p key={i} className="text-[15px] leading-[1.9] text-neutral-600">
                  {p}
                </p>
              ))}
            </div>

            <div className="flex items-center justify-between mt-10 pt-8 border-t border-gray-200">
              <span
                style={{ background: "#FFE0D1", color: "#FF4500" }}
                className="text-xs font-semibold px-3 py-1.5 rounded-full"
              >
                {article.catLabel}
              </span>
              <button onClick={onBack} className="et-btn-secondary text-sm font-semibold px-5 py-2.5 rounded-xl">
                Retour aux articles
              </button>
            </div>
          </article>
        </div>
      </div>

      {related.length > 0 && (
        <section className="py-16 bg-neutral-100">
          <div className="w-full px-6 md:px-10">
            <h3 className="display text-xl font-bold mb-8">À lire aussi</h3>
            <div className="grid sm:grid-cols-3 gap-6">
              {related.map((a) => (
                <article
                  key={a.id}
                  onClick={() => onOpen(a.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e: KeyboardEvent<HTMLElement>) => e.key === "Enter" && onOpen(a.id)}
                  className="et-card bg-white rounded-[20px] border border-gray-200 shadow-sm overflow-hidden flex flex-col cursor-pointer"
                >
                  <div className="et-thumb-wrap relative h-32" style={{ background: "#0D0D0D" }}>
                    <div className="et-thumb absolute inset-0">
                      <img
                        src={a.image}
                        alt={a.imageAlt}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="p-5">
                    <h4 className="display font-bold text-sm leading-snug mb-2">{a.title}</h4>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Clock size={11} /> {a.read}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

import { api, type BlogApiData } from "@/services/api";
import { useEffect } from "react";

export default function ErayTechBlog() {
  const [articlesList, setArticlesList] = useState<Article[]>(ARTICLES);
  const [active, setActive] = useState<CategoryId>("all");
  const [visible, setVisible] = useState<number>(6);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    let isMounted = true;
    api.getBlogs()
      .then((data) => {
        if (!isMounted || !Array.isArray(data) || data.length === 0) return;
        const mapped: Article[] = data.map((b) => {
          const typeLower = (b.type || "").toLowerCase();
          let cat: Exclude<CategoryId, "all"> = "tech";
          if (typeLower.includes("serie") || typeLower.includes("film")) cat = "series";
          else if (typeLower.includes("sport")) cat = "sport";
          else if (typeLower.includes("music") || typeLower.includes("musique")) cat = "musique";

          return {
            id: b.id,
            category: cat,
            catLabel: b.type || "Technologie",
            title: b.titre,
            excerpt: b.contenu.slice(0, 140) + "...",
            author: b.auteur || "Eray Tech",
            date: b.date_publication || "2026",
            read: "5 min",
            image: b.image || "https://picsum.photos/seed/eraytech/900/600",
            imageAlt: b.titre,
            content: [b.contenu],
            gallery: b.image ? [{ src: b.image, alt: b.titre }] : [],
          };
        });
        setArticlesList(mapped);
      })
      .catch((err) => {
        console.warn("Using fallback static articles:", err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const filtered = articlesList.filter((a) => active === "all" || a.category === active);
  const featured = articlesList[0] || ARTICLES[0];
  const shown = (active === "all" ? filtered.slice(1) : filtered).slice(0, visible);

  const openArticle = (id: number) => {
    setSelectedId(id);
    window.scrollTo?.({ top: 0, behavior: "smooth" });
  };

  const selectedArticle = articlesList.find((a) => a.id === selectedId) || ARTICLES.find((a) => a.id === selectedId);
  if (selectedArticle) {
    return (
      <ArticleDetail
        article={selectedArticle}
        onBack={() => {
          setSelectedId(null);
          window.scrollTo?.({ top: 0, behavior: "smooth" });
        }}
        onOpen={openArticle}
      />
    );
  }

  return (
    <div className="w-full" style={{ fontFamily: "'Inter', sans-serif", background: "#FFFFFF", color: "#0D0D0D" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Plus+Jakarta+Sans:wght@500;700;800&display=swap');
        .display { font-family: 'Plus Jakarta Sans', 'Inter', sans-serif; }
        .et-scan {
          position: absolute; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent, #FF4500, transparent);
          animation: et-scan-move 5s ease-in-out infinite;
          opacity: 0.8;
        }
        @keyframes et-scan-move {
          0%, 100% { top: 18%; opacity: 0; }
          10% { opacity: 0.9; }
          50% { top: 78%; opacity: 0.5; }
          90% { opacity: 0.9; }
        }
        .et-card { transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease; }
        .et-card:hover { transform: translateY(-6px); box-shadow: 0 20px 40px -12px rgba(0,0,0,0.18); border-color: #FF450033; }
        .et-thumb-wrap { overflow: hidden; }
        .et-thumb { transition: transform 0.6s ease; }
        .et-card:hover .et-thumb { transform: scale(1.08); }
        .et-btn-primary { background:#0D0D0D; color:#FFFFFF; transition: all 0.3s ease; }
        .et-btn-primary:hover { background:#FF4500; box-shadow: 0 8px 22px -6px rgba(255,69,0,0.55); }
        .et-btn-secondary { background:#FFFFFF; color:#0D0D0D; border:1.5px solid #0D0D0D; transition: all 0.3s ease; }
        .et-btn-secondary:hover { border-color:#FF4500; color:#FF4500; }
        .et-pill { transition: all 0.25s ease; }
        .et-pill:hover { border-color:#FF4500; color:#FF4500; }
        .et-pill.active { background:#0D0D0D; color:#FFFFFF; border-color:#0D0D0D; }
        .et-link { position:relative; }
        .et-link::after {
          content:''; position:absolute; left:0; bottom:-2px; width:0; height:2px; background:#FF4500;
          transition: width 0.25s ease;
        }
        .et-link:hover::after { width:100%; }
        .et-fade-up { animation: et-fade-up 0.6s ease both; }
        @keyframes et-fade-up { from { opacity:0; transform: translateY(16px);} to {opacity:1; transform:translateY(0);} }
        input:focus, button:focus, a:focus { outline: 2px solid #FF4500; outline-offset: 2px; }
      `}</style>

      {/* HERO */}
      <section className="relative overflow-hidden" style={{ background: "#0D0D0D" }}>
        <div className="et-scan" />
        <div
          className="absolute -top-32 -right-32 w-[420px] h-[420px] rounded-full blur-3xl opacity-20"
          style={{ background: "radial-gradient(circle, #FF4500, transparent 70%)" }}
        />
        <div
          className="absolute -bottom-24 -left-24 w-[320px] h-[320px] rounded-full blur-3xl opacity-10"
          style={{ background: "radial-gradient(circle, #FFFFFF, transparent 70%)" }}
        />

        <div className="w-full px-6 md:px-10 pt-20 pb-24 relative">
          <div className="flex items-center gap-2 mb-6">
            <span style={{ background: "#FF4500" }} className="w-2 h-2 rounded-full inline-block" />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: "#FF4500" }}>Le Mag Eray-Tech</span>
          </div>
          <h1 className="display text-white font-extrabold text-4xl md:text-6xl leading-[1.05] max-w-3xl">
            Ce qui fait vibrer l'écran, expliqué simplement.
          </h1>
          <p className="text-white/60 text-base md:text-lg mt-6 max-w-xl leading-relaxed">
            Coulisses techniques, actualités séries, sport en direct et culture numérique — décryptés par notre rédaction.
          </p>
        </div>
      </section>

      {/* Featured card overlapping hero/white section — kept outside the hero's
          overflow-hidden box so it never gets clipped, with a light negative margin
          to sit just over the hero/white seam. */}
      <div className="w-full px-6 md:px-10 relative z-10 -mt-10 md:-mt-12">
        <div className="et-card et-fade-up bg-white rounded-[24px] border border-gray-200 shadow-xl grid md:grid-cols-2 overflow-hidden">
          <div className="et-thumb-wrap relative h-56 md:h-auto" style={{ background: "#0D0D0D" }}>
            <div className="et-thumb absolute inset-0">
              <img
                src={featured.image}
                alt={featured.imageAlt}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="p-8 md:p-10 flex flex-col justify-center">
            <span
              style={{ background: "#FFE0D1", color: "#FF4500" }}
              className="inline-block w-fit text-xs font-semibold px-3 py-1 rounded-full mb-4"
            >
              {featured.catLabel}
            </span>
            <h2 className="display text-2xl md:text-[28px] font-bold leading-tight mb-3">
              {featured.title}
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">{featured.excerpt}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold" style={{ background: "#0D0D0D" }}>
                  {featured.author.split(" ")[1]?.[0] || featured.author[0]}
                </div>
                <div className="text-xs text-gray-500">
                  <div className="font-medium" style={{ color: "#0D0D0D" }}>{featured.author}</div>
                  <div className="flex items-center gap-1">
                    {featured.date} · <Clock size={11} className="inline" /> {featured.read}
                  </div>
                </div>
              </div>
              <button
                onClick={() => openArticle(featured.id)}
                className="et-link text-sm font-semibold flex items-center gap-1"
                style={{ color: "#0D0D0D" }}
              >
                Lire <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SPACER below the overlapping card */}
      <div className="h-10 md:h-12 bg-white" />

      {/* FILTERS */}
      <section className="w-full px-6 md:px-10">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-10">
          <h3 className="display text-xl font-bold">Tous les articles</h3>
          <div className="flex items-center gap-2 flex-wrap">
            {CATEGORIES.map((c) => {
              const Icon = c.icon;
              const isActive = active === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => {
                    setActive(c.id);
                    setVisible(6);
                  }}
                  className={`et-pill flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-xl border ${
                    isActive ? "active" : "border-gray-200 bg-white"
                  }`}
                  style={!isActive ? { color: "#0D0D0D" } : undefined}
                >
                  <Icon size={13} /> {c.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7 pb-8">
          {shown.map((a) => (
            <article
              key={a.id}
              onClick={() => openArticle(a.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e: KeyboardEvent<HTMLElement>) => e.key === "Enter" && openArticle(a.id)}
              className="et-card bg-white rounded-[22px] border border-gray-200 shadow-sm overflow-hidden flex flex-col cursor-pointer"
            >
              <div className="et-thumb-wrap relative h-44" style={{ background: "#0D0D0D" }}>
                <div className="et-thumb absolute inset-0">
                  <img
                    src={a.image}
                    alt={a.imageAlt}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span
                  style={{ background: "#FF4500" }}
                  className="absolute top-3 left-3 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full"
                >
                  {a.catLabel}
                </span>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h4 className="display font-bold text-base leading-snug mb-2">{a.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed mb-5 flex-1">{a.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-neutral-100">
                  <span className="font-medium" style={{ color: "#0D0D0D" }}>{a.author}</span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} /> {a.read}
                  </span>
                </div>
                <button
                  onClick={(e: MouseEvent<HTMLButtonElement>) => {
                    e.stopPropagation();
                    openArticle(a.id);
                  }}
                  className="et-link text-xs font-semibold flex items-center gap-1 mt-3 self-start"
                  style={{ color: "#0D0D0D" }}
                >
                  Lire l'article <ArrowRight size={13} />
                </button>
              </div>
            </article>
          ))}
        </div>

        {visible < filtered.length - (active === "all" ? 1 : 0) && (
          <div className="flex justify-center pb-20">
            <button
              onClick={() => setVisible((v) => v + 3)}
              className="et-btn-secondary text-sm font-semibold px-6 py-3 rounded-xl flex items-center gap-1.5"
            >
              Voir plus d'articles <ChevronRight size={15} />
            </button>
          </div>
        )}
      </section>

      {/* NEWSLETTER */}
      <section className="relative overflow-hidden" style={{ background: "#0D0D0D" }}>
        <div
          className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full blur-3xl opacity-20 -translate-y-1/2"
          style={{ background: "radial-gradient(circle, #FF4500, transparent 70%)" }}
        />
        <div className="w-full px-6 md:px-10 py-20 text-center relative">
          <div style={{ background: "#FF4500" }} className="w-11 h-11 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Mail size={19} color="#0D0D0D" strokeWidth={2.5} />
          </div>
          <h3 className="display text-white text-2xl md:text-3xl font-bold mb-3">
            Un article par semaine, aucune publicité.
          </h3>
          <p className="text-white/55 text-sm mb-8 max-w-md mx-auto">
            Recevez notre meilleure sélection chaque vendredi. Désabonnement en un clic, à tout moment.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e: FormEvent<HTMLFormElement>) => e.preventDefault()}>
            <label htmlFor="et-email" className="sr-only">
              Adresse e-mail
            </label>
            <input
              id="et-email"
              type="email"
              required
              placeholder="votre@email.com"
              className="flex-1 rounded-xl px-4 py-3 text-sm bg-white/10 text-white placeholder-white/40 border border-white/15"
              style={{ borderColor: "rgba(255,255,255,0.15)" }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#FF4500")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)")}
            />
            <button className="et-btn-primary text-sm font-semibold px-6 py-3 rounded-xl" style={{ background: "#FF4500", color: "#0D0D0D" }}>
              S'inscrire
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
