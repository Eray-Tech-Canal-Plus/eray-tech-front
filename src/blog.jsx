import { useState } from "react";
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
} from "lucide-react";

const CATEGORIES = [
  { id: "all", label: "Tout", icon: Sparkles },
  { id: "series", label: "Séries & Films", icon: Tv },
  { id: "tech", label: "Technologie", icon: Zap },
  { id: "sport", label: "Sport", icon: Trophy },
  { id: "musique", label: "Musique", icon: Music },
];

const ARTICLES = [
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
    pattern: "waves",
    content: [
      "Trois ans après le précédent modèle, Eray-Tech dévoile un décodeur pensé pour disparaître dans le salon plutôt que pour l'occuper. Le boîtier perd 40 % de volume, adopte une finition mate et ne conserve qu'un seul port visible en façade.",
      "Sous le capot, le vrai changement est ailleurs : une puce dédiée traite désormais l'upscaling et le HDR en local, sans dépendre du débit internet disponible au moment de la diffusion. Concrètement, une scène sombre garde ses détails même sur une connexion chargée.",
      "Le démarrage, souvent pointé du doigt sur l'ancienne génération, passe de onze secondes à moins de deux. La télécommande, elle, gagne un micro pour la recherche vocale et perd six boutons devenus inutiles avec la nouvelle interface.",
      "Le déploiement commence par les abonnés en renouvellement de contrat avant d'être ouvert à l'ensemble du catalogue d'ici la fin de l'année.",
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
    pattern: "grid",
    content: [
      "L'automne s'annonce chargé côté fiction. Notre rédaction a visionné les premiers épisodes de la rentrée pour établir cette sélection, entre nouveautés et retours attendus.",
      "Du côté des thrillers, une production tournée dans le nord de l'Europe mise sur des décors glacés et un rythme délibérément lent, à contre-courant des séries à cliffhangers permanents. Trois épisodes suffisent à comprendre pourquoi elle fait déjà parler d'elle.",
      "Les amateurs de comédie ne sont pas oubliés : une nouvelle série choisit le format court, vingt-deux minutes par épisode, pour raconter une histoire de reconversion professionnelle sans jamais forcer le trait.",
      "Enfin, la saison très attendue d'une fiction culte revient avec un budget revu à la hausse et une distribution élargie. Sans trop en dévoiler, la première scène pose déjà les enjeux de l'ensemble de la saison.",
      "Le calendrier complet, épisode par épisode, est disponible dans l'application, section « À venir ».",
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
    pattern: "dots",
    content: [
      "16h30, quatre heures avant le coup d'envoi. Le camion régie est déjà branché, les douze caméras positionnées et testées une à une par l'équipe technique. Rien n'est laissé au hasard, chaque angle a été validé la veille sur plan.",
      "Dans le camion, huit personnes se partagent les écrans : un réalisateur pour choisir les plans en direct, un ingénieur son, deux techniciens dédiés au ralenti et à l'arbitrage vidéo, et une équipe graphisme qui incruste scores et statistiques en temps réel.",
      "La difficulté n'est pas technique mais humaine : anticiper une action avant qu'elle n'arrive. Le réalisateur explique choisir son plan environ une seconde et demie avant l'événement, sur la base de la lecture du jeu — un réflexe qui ne s'acquiert qu'avec des centaines de matchs.",
      "À la moindre coupure de signal, une bascule automatique vers un flux de secours prend le relais en moins de 200 millisecondes, invisible pour la plupart des téléspectateurs.",
      "Le match se termine, l'équipe range son matériel : la prochaine retransmission est prévue dans quarante-huit heures, à l'autre bout du pays.",
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
    pattern: "circles",
    content: [
      "L'audio spatial promet de placer l'auditeur au centre du mix plutôt que face à lui. Pour vérifier si la promesse tient sur autre chose qu'une démo constructeur, nous l'avons testé sur trois genres aux exigences très différentes.",
      "Sur un enregistrement de jazz live, l'effet convainc immédiatement : on distingue la position de chaque musicien sur scène, avec une profondeur qu'un mixage stéréo classique ne restitue pas.",
      "Sur une production électronique très travaillée en studio, le résultat est plus inégal : certains titres gagnent en largeur, d'autres perdent la précision qui faisait leur identité sonore d'origine.",
      "Le pop mainstream, enfin, montre les limites de l'exercice : la plupart des titres n'ont pas été pensés pour ce format, et la conversion automatique produit un rendu correct mais rarement mémorable.",
      "Conclusion provisoire : l'audio spatial change vraiment l'expérience d'écoute, mais seulement quand le mixage d'origine a été pensé pour lui — la technologie ne fait pas tout.",
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
    pattern: "lines",
    content: [
      "Une lecture qui tremble gâche n'importe quel contenu, aussi bon soit-il. L'équipe technique d'Eray-Tech a travaillé deux ans sur un système de compression qui s'adapte en continu à la qualité réelle de la connexion, plutôt qu'à une estimation fixée au démarrage.",
      "Concrètement, l'application mesure la stabilité du réseau plusieurs fois par seconde et ajuste la qualité d'image par paliers imperceptibles, plutôt que par sauts brusques de résolution qui attirent l'œil.",
      "Un préchargement discret entre également en jeu : les premières secondes de l'épisode suivant sont mises en mémoire pendant le visionnage du précédent, ce qui explique la quasi-absence de temps de chargement entre deux épisodes.",
      "Ces ajustements restent invisibles par design — l'objectif affiché par l'équipe n'est pas de vous montrer la technologie, mais de vous la faire oublier.",
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
    pattern: "grid",
    content: [
      "Elle a accepté de nous recevoir dans la salle d'écriture, quelques semaines avant la diffusion du premier épisode. Trois ans de travail, une saison bouclée dans le plus grand secret : entretien sans détour sur la création d'une fiction ambitieuse.",
      "« La première version du scénario n'avait presque rien à voir avec ce qui sera diffusé », confie-t-elle. L'équipe d'écriture est repartie de zéro après six mois de travail, une décision rare et coûteuse qu'elle défend encore aujourd'hui.",
      "Sur le choix du secret entourant le tournage : « Ce n'est pas une stratégie marketing. C'est que les acteurs eux-mêmes ne recevaient les scripts que semaine par semaine, pour préserver leurs réactions à l'écran. »",
      "La scénariste revient aussi sur la difficulté de clore une histoire pensée pour durer plusieurs saisons sans trahir les spectateurs les plus fidèles, un exercice qu'elle compare à « démonter un mécanisme d'horlogerie pièce par pièce, sans casser le mouvement ».",
      "La série sera disponible en intégralité dès sa sortie, un choix assumé par la production pour permettre un visionnage au rythme de chacun.",
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
    pattern: "waves",
    content: [
      "Vitesse de balle, probabilité de but, distance parcourue par chaque joueur : ces chiffres qui s'affichent en direct sur votre écran résultent d'une chaîne technique lancée bien avant le coup d'envoi.",
      "Une dizaine de caméras dédiées au tracking, distinctes des caméras de réalisation, suivent en continu la position du ballon et de chaque joueur sur le terrain, à raison de vingt-cinq mesures par seconde.",
      "Ces données brutes transitent par un serveur qui calcule les statistiques dérivées — vitesse, distance, probabilité — en moins d'une seconde, avant d'être transmises à l'équipe graphisme qui les habille pour l'antenne.",
      "L'ensemble de la chaîne, de la mesure à l'affichage, prend environ trois secondes. Un délai jugé imperceptible par la production, mais que l'équipe technique cherche encore à réduire.",
      "Ces mêmes données alimentent aussi les résumés automatiques disponibles quelques minutes après la fin de la rencontre dans l'application.",
    ],
  },
];

function Pattern({ type }) {
  const common = { width: "100%", height: "100%" };
  if (type === "waves") {
    return (
      <svg viewBox="0 0 300 200" {...common} preserveAspectRatio="xMidYMid slice">
        <path d="M0 120 Q 40 90 75 120 T 150 120 T 225 120 T 300 120" fill="none" stroke="#FF2D8D" strokeWidth="3" opacity="0.9" />
        <path d="M0 150 Q 40 120 75 150 T 150 150 T 225 150 T 300 150" fill="none" stroke="#FFFFFF" strokeWidth="2" opacity="0.35" />
        <path d="M0 90 Q 40 60 75 90 T 150 90 T 225 90 T 300 90" fill="none" stroke="#FFFFFF" strokeWidth="2" opacity="0.2" />
      </svg>
    );
  }
  if (type === "grid") {
    return (
      <svg viewBox="0 0 300 200" {...common} preserveAspectRatio="xMidYMid slice">
        {Array.from({ length: 6 }).map((_, i) => (
          <line key={"v" + i} x1={i * 50} y1="0" x2={i * 50} y2="200" stroke="#FFFFFF" strokeWidth="1" opacity="0.18" />
        ))}
        {Array.from({ length: 4 }).map((_, i) => (
          <line key={"h" + i} x1="0" y1={i * 55} x2="300" y2={i * 55} stroke="#FFFFFF" strokeWidth="1" opacity="0.18" />
        ))}
        <circle cx="150" cy="100" r="34" fill="#FF2D8D" opacity="0.9" />
      </svg>
    );
  }
  if (type === "dots") {
    return (
      <svg viewBox="0 0 300 200" {...common} preserveAspectRatio="xMidYMid slice">
        {Array.from({ length: 7 }).map((_, r) =>
          Array.from({ length: 10 }).map((_, c) => {
            const cx = 15 + c * 30;
            const cy = 15 + r * 28;
            const hot = (r === 3 && (c === 4 || c === 5)) || (r === 2 && c === 4) || (r === 4 && c === 5);
            return <circle key={r + "-" + c} cx={cx} cy={cy} r={hot ? 5 : 2.4} fill={hot ? "#FF2D8D" : "#FFFFFF"} opacity={hot ? 0.95 : 0.22} />;
          })
        )}
      </svg>
    );
  }
  if (type === "circles") {
    return (
      <svg viewBox="0 0 300 200" {...common} preserveAspectRatio="xMidYMid slice">
        <circle cx="150" cy="100" r="20" fill="none" stroke="#FF2D8D" strokeWidth="3" />
        <circle cx="150" cy="100" r="45" fill="none" stroke="#FFFFFF" strokeWidth="2" opacity="0.4" />
        <circle cx="150" cy="100" r="70" fill="none" stroke="#FFFFFF" strokeWidth="2" opacity="0.22" />
        <circle cx="150" cy="100" r="95" fill="none" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.12" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 300 200" {...common} preserveAspectRatio="xMidYMid slice">
      {Array.from({ length: 12 }).map((_, i) => (
        <rect key={i} x={i * 26} y={40 + Math.abs(Math.sin(i)) * 90} width="10" height={70 - Math.abs(Math.sin(i)) * 40} fill={i % 5 === 0 ? "#FF2D8D" : "#FFFFFF"} opacity={i % 5 === 0 ? 0.95 : 0.2} />
      ))}
    </svg>
  );
}

function ArticleDetail({ article, onBack, onOpen }) {
  const related = ARTICLES.filter((a) => a.category === article.category && a.id !== article.id).slice(0, 3);

  return (
    <div className="et-fade-up" style={{ fontFamily: "'Inter', sans-serif", background: "#FFFFFF", color: "#1F1F1F" }}>
      <div style={{ background: "#000000" }} className="relative overflow-hidden">
        <div className="et-scan" />
        <div
          className="absolute -top-32 -right-32 w-[420px] h-[420px] rounded-full blur-3xl opacity-20"
          style={{ background: "radial-gradient(circle, #FF2D8D, transparent 70%)" }}
        />
        <div className="max-w-3xl mx-auto px-6 md:px-10 pt-14 pb-16 relative">
          <button
            onClick={onBack}
            className="et-link text-white/70 hover:text-white text-sm font-medium flex items-center gap-1.5 mb-8"
          >
            <ArrowRight size={15} style={{ transform: "rotate(180deg)" }} /> Retour au Mag
          </button>
          <span
            style={{ background: "#FF2D8D" }}
            className="inline-block text-white text-xs font-semibold px-3 py-1 rounded-full mb-5"
          >
            {article.catLabel}
          </span>
          <h1 className="display text-white font-extrabold text-3xl md:text-[44px] leading-[1.1] mb-6">
            {article.title}
          </h1>
          <div className="flex items-center gap-3">
            <div style={{ background: "#FF2D8D" }} className="w-9 h-9 rounded-full flex items-center justify-center text-black text-xs font-bold">
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

      <div className="max-w-3xl mx-auto px-6 md:px-10">
        <div
          className="et-fade-up rounded-[24px] overflow-hidden h-56 md:h-72 -translate-y-10 md:-translate-y-12 shadow-xl"
          style={{ background: "#1F1F1F" }}
        >
          <Pattern type={article.pattern} />
        </div>
      </div>

      <article className="max-w-2xl mx-auto px-6 md:px-10 pb-16 -mt-4 md:-mt-6">
        <p className="text-lg leading-relaxed text-[#1F1F1F] font-medium mb-6">{article.excerpt}</p>
        {article.content.map((p, i) => (
          <p key={i} className="text-[#1F1F1F]/85 text-[15px] leading-[1.85] mb-5">
            {p}
          </p>
        ))}

        <div className="flex items-center justify-between mt-10 pt-8 border-t border-[#E5E7EB]">
          <span
            style={{ background: "#FFE3F0", color: "#FF2D8D" }}
            className="text-xs font-semibold px-3 py-1.5 rounded-full"
          >
            {article.catLabel}
          </span>
          <button onClick={onBack} className="et-btn-secondary text-sm font-semibold px-5 py-2.5 rounded-xl">
            Retour aux articles
          </button>
        </div>
      </article>

      {related.length > 0 && (
        <section style={{ background: "#F5F5F5" }} className="py-16">
          <div className="max-w-5xl mx-auto px-6 md:px-10">
            <h3 className="display text-xl font-bold mb-8">À lire aussi</h3>
            <div className="grid sm:grid-cols-3 gap-6">
              {related.map((a) => (
                <article
                  key={a.id}
                  onClick={() => onOpen(a.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && onOpen(a.id)}
                  className="et-card bg-white rounded-[20px] border border-[#E5E7EB] shadow-sm overflow-hidden flex flex-col cursor-pointer"
                >
                  <div className="et-thumb-wrap relative h-32" style={{ background: "#1F1F1F" }}>
                    <div className="et-thumb absolute inset-0">
                      <Pattern type={a.pattern} />
                    </div>
                  </div>
                  <div className="p-5">
                    <h4 className="display font-bold text-sm leading-snug mb-2">{a.title}</h4>
                    <span className="text-xs text-[#6B7280] flex items-center gap-1">
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

export default function ErayTechBlog() {
  const [active, setActive] = useState("all");
  const [visible, setVisible] = useState(6);
  const [selectedId, setSelectedId] = useState(null);

  const filtered = ARTICLES.filter((a) => active === "all" || a.category === active);
  const featured = ARTICLES[0];
  const rest = filtered.filter((a) => a.id !== featured.id || active !== "all");
  const shown = (active === "all" ? filtered.slice(1) : filtered).slice(0, visible);

  const openArticle = (id) => {
    setSelectedId(id);
    window.scrollTo?.({ top: 0, behavior: "smooth" });
  };

  const selectedArticle = ARTICLES.find((a) => a.id === selectedId);
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
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#FFFFFF", color: "#1F1F1F" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Plus+Jakarta+Sans:wght@500;700;800&display=swap');
        .display { font-family: 'Plus Jakarta Sans', 'Inter', sans-serif; }
        .et-scan {
          position: absolute; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent, #FF2D8D, transparent);
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
        .et-card:hover { transform: translateY(-6px); box-shadow: 0 20px 40px -12px rgba(0,0,0,0.18); border-color: #FF2D8D33; }
        .et-thumb-wrap { overflow: hidden; }
        .et-thumb { transition: transform 0.6s ease; }
        .et-card:hover .et-thumb { transform: scale(1.08); }
        .et-btn-primary { background:#000000; color:#FFFFFF; transition: all 0.3s ease; }
        .et-btn-primary:hover { background:#FF2D8D; box-shadow: 0 8px 22px -6px rgba(255,45,141,0.55); }
        .et-btn-secondary { background:#FFFFFF; color:#000000; border:1.5px solid #000000; transition: all 0.3s ease; }
        .et-btn-secondary:hover { border-color:#FF2D8D; color:#FF2D8D; }
        .et-pill { transition: all 0.25s ease; }
        .et-pill:hover { border-color:#FF2D8D; color:#FF2D8D; }
        .et-pill.active { background:#000000; color:#FFFFFF; border-color:#000000; }
        .et-link { position:relative; }
        .et-link::after {
          content:''; position:absolute; left:0; bottom:-2px; width:0; height:2px; background:#FF2D8D;
          transition: width 0.25s ease;
        }
        .et-link:hover::after { width:100%; }
        .et-fade-up { animation: et-fade-up 0.6s ease both; }
        @keyframes et-fade-up { from { opacity:0; transform: translateY(16px);} to {opacity:1; transform:translateY(0);} }
        input:focus, button:focus, a:focus { outline: 2px solid #FF2D8D; outline-offset: 2px; }
      `}</style>

      {/* HERO */}
      <section style={{ background: "#000000" }} className="relative overflow-hidden">
        <div className="et-scan" />
        <div
          className="absolute -top-32 -right-32 w-[420px] h-[420px] rounded-full blur-3xl opacity-20"
          style={{ background: "radial-gradient(circle, #FF2D8D, transparent 70%)" }}
        />
        <div
          className="absolute -bottom-24 -left-24 w-[320px] h-[320px] rounded-full blur-3xl opacity-10"
          style={{ background: "radial-gradient(circle, #FFFFFF, transparent 70%)" }}
        />

        <div className="max-w-7xl mx-auto px-6 md:px-10 pt-20 pb-28 relative">
          <div className="flex items-center gap-2 mb-6">
            <span style={{ background: "#FF2D8D" }} className="w-2 h-2 rounded-full inline-block" />
            <span className="text-[#FF2D8D] text-xs font-semibold tracking-[0.2em] uppercase">Le Mag Eray-Tech</span>
          </div>
          <h1 className="display text-white font-extrabold text-4xl md:text-6xl leading-[1.05] max-w-3xl">
            Ce qui fait vibrer l'écran, expliqué simplement.
          </h1>
          <p className="text-white/60 text-base md:text-lg mt-6 max-w-xl leading-relaxed">
            Coulisses techniques, actualités séries, sport en direct et culture numérique — décryptés par notre rédaction.
          </p>
        </div>

        {/* Featured card overlapping hero/white section */}
        <div className="max-w-7xl mx-auto px-6 md:px-10 relative">
          <div className="et-card et-fade-up bg-white rounded-[24px] border border-[#E5E7EB] shadow-xl grid md:grid-cols-2 overflow-hidden translate-y-16 md:translate-y-20">
            <div className="et-thumb-wrap relative h-56 md:h-auto" style={{ background: "#1F1F1F" }}>
              <div className="et-thumb absolute inset-0">
                <Pattern type={featured.pattern} />
              </div>
            </div>
            <div className="p-8 md:p-10 flex flex-col justify-center">
              <span
                style={{ background: "#FFE3F0", color: "#FF2D8D" }}
                className="inline-block w-fit text-xs font-semibold px-3 py-1 rounded-full mb-4"
              >
                {featured.catLabel}
              </span>
              <h2 className="display text-2xl md:text-[28px] font-bold leading-tight mb-3">
                {featured.title}
              </h2>
              <p className="text-[#6B7280] text-sm leading-relaxed mb-6">{featured.excerpt}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div style={{ background: "#000000" }} className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                    {featured.author.split(" ")[1]?.[0] || featured.author[0]}
                  </div>
                  <div className="text-xs text-[#6B7280]">
                    <div className="font-medium text-[#1F1F1F]">{featured.author}</div>
                    <div className="flex items-center gap-1">
                      {featured.date} · <Clock size={11} className="inline" /> {featured.read}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => openArticle(featured.id)}
                  className="et-link text-sm font-semibold text-black flex items-center gap-1"
                >
                  Lire <ArrowRight size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SPACER for overlap */}
      <div className="h-16 md:h-20 bg-white" />

      {/* FILTERS */}
      <section className="max-w-7xl mx-auto px-6 md:px-10">
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
                    isActive ? "active" : "border-[#E5E7EB] text-[#1F1F1F] bg-white"
                  }`}
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
              onKeyDown={(e) => e.key === "Enter" && openArticle(a.id)}
              className="et-card bg-white rounded-[22px] border border-[#E5E7EB] shadow-sm overflow-hidden flex flex-col cursor-pointer"
            >
              <div className="et-thumb-wrap relative h-44" style={{ background: "#1F1F1F" }}>
                <div className="et-thumb absolute inset-0">
                  <Pattern type={a.pattern} />
                </div>
                <span
                  style={{ background: "#FF2D8D" }}
                  className="absolute top-3 left-3 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full"
                >
                  {a.catLabel}
                </span>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h4 className="display font-bold text-base leading-snug mb-2">{a.title}</h4>
                <p className="text-[#6B7280] text-sm leading-relaxed mb-5 flex-1">{a.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-[#6B7280] pt-4 border-t border-[#F5F5F5]">
                  <span className="font-medium text-[#1F1F1F]">{a.author}</span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} /> {a.read}
                  </span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openArticle(a.id);
                  }}
                  className="et-link text-xs font-semibold text-black flex items-center gap-1 mt-3 self-start"
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
      <section style={{ background: "#000000" }} className="relative overflow-hidden">
        <div
          className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full blur-3xl opacity-20 -translate-y-1/2"
          style={{ background: "radial-gradient(circle, #FF2D8D, transparent 70%)" }}
        />
        <div className="max-w-4xl mx-auto px-6 md:px-10 py-20 text-center relative">
          <div style={{ background: "#FF2D8D" }} className="w-11 h-11 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Mail size={19} color="#000000" strokeWidth={2.5} />
          </div>
          <h3 className="display text-white text-2xl md:text-3xl font-bold mb-3">
            Un article par semaine, aucune publicité.
          </h3>
          <p className="text-white/55 text-sm mb-8 max-w-md mx-auto">
            Recevez notre meilleure sélection chaque vendredi. Désabonnement en un clic, à tout moment.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="et-email" className="sr-only">
              Adresse e-mail
            </label>
            <input
              id="et-email"
              type="email"
              required
              placeholder="votre@email.com"
              className="flex-1 rounded-xl px-4 py-3 text-sm bg-white/10 text-white placeholder-white/40 border border-white/15 focus:border-[#FF2D8D]"
            />
            <button className="et-btn-primary text-sm font-semibold px-6 py-3 rounded-xl" style={{ background: "#FF2D8D", color: "#000000" }}>
              S'inscrire
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
