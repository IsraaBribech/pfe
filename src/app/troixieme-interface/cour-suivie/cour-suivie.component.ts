import { Component, type OnInit } from "@angular/core"

interface Chapitre {
  id: string
  titre: string
  description: string
  fichierPdf: string
  dateCreation: Date
}

interface Matiere {
  id: string
  nom: string
  enseignant: string
  credits: number
  heures: number
  couleur: string
  icon: string
  departement: string
  chapitres: Chapitre[]
}

@Component({
  selector: "app-cour-suivie",
  templateUrl: "./cour-suivie.component.html",
  styleUrls: ["./cour-suivie.component.css"],
})
export class CourSuivieComponent implements OnInit {
  // Informations de l'étudiant
  etudiantName = "Israa Bribech"
  etudiantEmail = "israabribech2002@gmail.com"
  etudiantMatricule = "E12345"

  // Onglet actif
  activeSemester: "semestre1" | "semestre2" = "semestre1"

  // Matière sélectionnée
  selectedMatiere: Matiere | null = null

  // Liste des matières du semestre 1
  matieresSemestre1: Matiere[] = [
    {
      id: "m1",
      nom: "Programmation Web",
      enseignant: "Dr. Martin Dupont",
      credits: 6,
      heures: 42,
      couleur: "#6366f1",
      icon: "fa-code",
      departement: "Informatique",
      chapitres: [
        {
          id: "c1m1",
          titre: "Introduction au HTML",
          description: "Bases du langage de balisage HTML et structure des pages web.",
          fichierPdf: "assets/cours/prog-web/chapitre1.pdf",
          dateCreation: new Date(2023, 8, 5),
        },
        {
          id: "c2m1",
          titre: "CSS et mise en forme",
          description: "Styliser les pages web avec CSS et principes de design responsive.",
          fichierPdf: "assets/cours/prog-web/chapitre2.pdf",
          dateCreation: new Date(2023, 8, 12),
        },
        {
          id: "c3m1",
          titre: "JavaScript fondamentaux",
          description: "Introduction à la programmation côté client avec JavaScript.",
          fichierPdf: "assets/cours/prog-web/chapitre3.pdf",
          dateCreation: new Date(2023, 8, 19),
        },
        {
          id: "c4m1",
          titre: "Frameworks front-end",
          description: "Introduction aux frameworks modernes comme Angular, React et Vue.",
          fichierPdf: "assets/cours/prog-web/chapitre4.pdf",
          dateCreation: new Date(2023, 8, 26),
        },
      ],
    },
    {
      id: "m2",
      nom: "Bases de données",
      enseignant: "Prof. Sophie Laurent",
      credits: 6,
      heures: 42,
      couleur: "#f59e0b",
      icon: "fa-database",
      departement: "Informatique",
      chapitres: [
        {
          id: "c1m2",
          titre: "Modèle relationnel",
          description: "Introduction aux concepts de bases de données relationnelles.",
          fichierPdf: "assets/cours/bdd/chapitre1.pdf",
          dateCreation: new Date(2023, 8, 6),
        },
        {
          id: "c2m2",
          titre: "SQL fondamental",
          description: "Requêtes SQL de base pour la manipulation des données.",
          fichierPdf: "assets/cours/bdd/chapitre2.pdf",
          dateCreation: new Date(2023, 8, 13),
        },
        {
          id: "c3m2",
          titre: "Normalisation",
          description: "Principes de normalisation et conception de schémas.",
          fichierPdf: "assets/cours/bdd/chapitre3.pdf",
          dateCreation: new Date(2023, 8, 20),
        },
      ],
    },
    {
      id: "m3",
      nom: "Algorithmes avancés",
      enseignant: "Dr. Jean Petit",
      credits: 4,
      heures: 36,
      couleur: "#10b981",
      icon: "fa-sitemap",
      departement: "Informatique",
      chapitres: [
        {
          id: "c1m3",
          titre: "Complexité algorithmique",
          description: "Analyse de la complexité temporelle et spatiale des algorithmes.",
          fichierPdf: "assets/cours/algo/chapitre1.pdf",
          dateCreation: new Date(2023, 8, 7),
        },
        {
          id: "c2m3",
          titre: "Algorithmes de tri",
          description: "Étude comparative des algorithmes de tri avancés.",
          fichierPdf: "assets/cours/algo/chapitre2.pdf",
          dateCreation: new Date(2023, 8, 14),
        },
      ],
    },
    {
      id: "m4",
      nom: "Intelligence artificielle",
      enseignant: "Prof. Marie Leroy",
      credits: 6,
      heures: 48,
      couleur: "#8b5cf6",
      icon: "fa-brain",
      departement: "Informatique",
      chapitres: [
        {
          id: "c1m4",
          titre: "Introduction à l'IA",
          description: "Histoire et concepts fondamentaux de l'intelligence artificielle.",
          fichierPdf: "assets/cours/ia/chapitre1.pdf",
          dateCreation: new Date(2023, 8, 8),
        },
        {
          id: "c2m4",
          titre: "Apprentissage supervisé",
          description: "Méthodes et applications de l'apprentissage supervisé.",
          fichierPdf: "assets/cours/ia/chapitre2.pdf",
          dateCreation: new Date(2023, 8, 15),
        },
      ],
    },
    {
      id: "m5",
      nom: "Machine Learning",
      enseignant: "Dr. Thomas Bernard",
      credits: 6,
      heures: 48,
      couleur: "#ec4899",
      icon: "fa-robot",
      departement: "Informatique",
      chapitres: [
        {
          id: "c1m5",
          titre: "Régression linéaire",
          description: "Principes et applications de la régression linéaire.",
          fichierPdf: "assets/cours/ml/chapitre1.pdf",
          dateCreation: new Date(2023, 8, 9),
        },
        {
          id: "c2m5",
          titre: "Classification",
          description: "Algorithmes de classification et évaluation des modèles.",
          fichierPdf: "assets/cours/ml/chapitre2.pdf",
          dateCreation: new Date(2023, 8, 16),
        },
      ],
    },
    {
      id: "m6",
      nom: "Algèbre linéaire",
      enseignant: "Prof. Claire Dubois",
      credits: 6,
      heures: 42,
      couleur: "#ef4444",
      icon: "fa-square-root-alt",
      departement: "Mathématiques",
      chapitres: [
        {
          id: "c1m6",
          titre: "Espaces vectoriels",
          description: "Définition et propriétés des espaces vectoriels.",
          fichierPdf: "assets/cours/algebre/chapitre1.pdf",
          dateCreation: new Date(2023, 8, 10),
        },
        {
          id: "c2m6",
          titre: "Matrices et transformations",
          description: "Opérations matricielles et transformations linéaires.",
          fichierPdf: "assets/cours/algebre/chapitre2.pdf",
          dateCreation: new Date(2023, 8, 17),
        },
      ],
    },
    {
      id: "m7",
      nom: "Analyse numérique",
      enseignant: "Dr. Philippe Martin",
      credits: 4,
      heures: 36,
      couleur: "#0ea5e9",
      icon: "fa-chart-line",
      departement: "Mathématiques",
      chapitres: [
        {
          id: "c1m7",
          titre: "Méthodes numériques",
          description: "Introduction aux méthodes numériques pour la résolution de problèmes.",
          fichierPdf: "assets/cours/analyse/chapitre1.pdf",
          dateCreation: new Date(2023, 8, 11),
        },
        {
          id: "c2m7",
          titre: "Interpolation",
          description: "Techniques d'interpolation et approximation de fonctions.",
          fichierPdf: "assets/cours/analyse/chapitre2.pdf",
          dateCreation: new Date(2023, 8, 18),
        },
      ],
    },
    {
      id: "m8",
      nom: "Réseaux informatiques",
      enseignant: "Prof. Luc Moreau",
      credits: 6,
      heures: 42,
      couleur: "#14b8a6",
      icon: "fa-network-wired",
      departement: "Informatique",
      chapitres: [
        {
          id: "c1m8",
          titre: "Modèle OSI",
          description: "Les 7 couches du modèle OSI et leurs fonctions.",
          fichierPdf: "assets/cours/reseaux/chapitre1.pdf",
          dateCreation: new Date(2023, 9, 1),
        },
        {
          id: "c2m8",
          titre: "Protocoles TCP/IP",
          description: "Étude des protocoles de la suite TCP/IP.",
          fichierPdf: "assets/cours/reseaux/chapitre2.pdf",
          dateCreation: new Date(2023, 9, 8),
        },
      ],
    },
    {
      id: "m9",
      nom: "Sécurité informatique",
      enseignant: "Dr. Isabelle Blanc",
      credits: 4,
      heures: 36,
      couleur: "#f43f5e",
      icon: "fa-shield-alt",
      departement: "Informatique",
      chapitres: [
        {
          id: "c1m9",
          titre: "Principes de cryptographie",
          description: "Fondamentaux de la cryptographie et chiffrement.",
          fichierPdf: "assets/cours/securite/chapitre1.pdf",
          dateCreation: new Date(2023, 9, 2),
        },
        {
          id: "c2m9",
          titre: "Sécurité des réseaux",
          description: "Protection des infrastructures réseau et détection d'intrusions.",
          fichierPdf: "assets/cours/securite/chapitre2.pdf",
          dateCreation: new Date(2023, 9, 9),
        },
      ],
    },
    {
      id: "m10",
      nom: "Développement mobile",
      enseignant: "Prof. Antoine Rousseau",
      credits: 6,
      heures: 48,
      couleur: "#84cc16",
      icon: "fa-mobile-alt",
      departement: "Informatique",
      chapitres: [
        {
          id: "c1m10",
          titre: "Introduction au développement mobile",
          description: "Vue d'ensemble des plateformes et approches de développement.",
          fichierPdf: "assets/cours/mobile/chapitre1.pdf",
          dateCreation: new Date(2023, 9, 3),
        },
        {
          id: "c2m10",
          titre: "Développement Android",
          description: "Création d'applications pour l'écosystème Android.",
          fichierPdf: "assets/cours/mobile/chapitre2.pdf",
          dateCreation: new Date(2023, 9, 10),
        },
      ],
    },
    {
      id: "m11",
      nom: "Gestion de projet",
      enseignant: "Dr. Nathalie Mercier",
      credits: 4,
      heures: 36,
      couleur: "#a855f7",
      icon: "fa-tasks",
      departement: "Gestion",
      chapitres: [
        {
          id: "c1m11",
          titre: "Méthodologies de gestion",
          description: "Approches traditionnelles et agiles de gestion de projet.",
          fichierPdf: "assets/cours/gestion/chapitre1.pdf",
          dateCreation: new Date(2023, 9, 4),
        },
        {
          id: "c2m11",
          titre: "Planification et suivi",
          description: "Techniques de planification et outils de suivi de projet.",
          fichierPdf: "assets/cours/gestion/chapitre2.pdf",
          dateCreation: new Date(2023, 9, 11),
        },
      ],
    },
    {
      id: "m12",
      nom: "Anglais technique",
      enseignant: "Prof. Sarah Johnson",
      credits: 3,
      heures: 30,
      couleur: "#06b6d4",
      icon: "fa-language",
      departement: "Langues",
      chapitres: [
        {
          id: "c1m12",
          titre: "Vocabulaire technique",
          description: "Terminologie spécifique aux domaines scientifiques et techniques.",
          fichierPdf: "assets/cours/anglais/chapitre1.pdf",
          dateCreation: new Date(2023, 9, 5),
        },
        {
          id: "c2m12",
          titre: "Communication professionnelle",
          description: "Rédaction de documents techniques et présentations en anglais.",
          fichierPdf: "assets/cours/anglais/chapitre2.pdf",
          dateCreation: new Date(2023, 9, 12),
        },
      ],
    },
  ]

  // Liste des matières du semestre 2
  matieresSemestre2: Matiere[] = [
    {
      id: "m13",
      nom: "Frameworks JavaScript",
      enseignant: "Dr. Julien Moreau",
      credits: 6,
      heures: 42,
      couleur: "#8b5cf6",
      icon: "fa-js",
      departement: "Informatique",
      chapitres: [
        {
          id: "c1m13",
          titre: "Introduction à React",
          description: "Concepts fondamentaux de React et composants.",
          fichierPdf: "assets/cours/frameworks/chapitre1.pdf",
          dateCreation: new Date(2024, 1, 5),
        },
        {
          id: "c2m13",
          titre: "Angular avancé",
          description: "Architecture et fonctionnalités avancées d'Angular.",
          fichierPdf: "assets/cours/frameworks/chapitre2.pdf",
          dateCreation: new Date(2024, 1, 12),
        },
      ],
    },
    {
      id: "m14",
      nom: "Développement Backend",
      enseignant: "Prof. Lucie Girard",
      credits: 6,
      heures: 48,
      couleur: "#10b981",
      icon: "fa-server",
      departement: "Informatique",
      chapitres: [
        {
          id: "c1m14",
          titre: "Node.js et Express",
          description: "Création d'APIs RESTful avec Node.js et Express.",
          fichierPdf: "assets/cours/backend/chapitre1.pdf",
          dateCreation: new Date(2024, 1, 6),
        },
        {
          id: "c2m14",
          titre: "Sécurité des APIs",
          description: "Bonnes pratiques de sécurité pour les applications backend.",
          fichierPdf: "assets/cours/backend/chapitre2.pdf",
          dateCreation: new Date(2024, 1, 13),
        },
      ],
    },
    {
      id: "m15",
      nom: "Architecture logicielle",
      enseignant: "Dr. Marc Dubois",
      credits: 4,
      heures: 36,
      couleur: "#f59e0b",
      icon: "fa-cubes",
      departement: "Informatique",
      chapitres: [
        {
          id: "c1m15",
          titre: "Patterns de conception",
          description: "Design patterns et leur application dans le développement logiciel.",
          fichierPdf: "assets/cours/architecture/chapitre1.pdf",
          dateCreation: new Date(2024, 1, 7),
        },
        {
          id: "c2m15",
          titre: "Architecture microservices",
          description: "Principes et mise en œuvre d'architectures microservices.",
          fichierPdf: "assets/cours/architecture/chapitre2.pdf",
          dateCreation: new Date(2024, 1, 14),
        },
      ],
    },
    {
      id: "m16",
      nom: "DevOps & CI/CD",
      enseignant: "Prof. Émilie Blanc",
      credits: 4,
      heures: 36,
      couleur: "#ef4444",
      icon: "fa-sync-alt",
      departement: "Informatique",
      chapitres: [
        {
          id: "c1m16",
          titre: "Intégration continue",
          description: "Principes et outils d'intégration continue.",
          fichierPdf: "assets/cours/devops/chapitre1.pdf",
          dateCreation: new Date(2024, 1, 8),
        },
        {
          id: "c2m16",
          titre: "Déploiement continu",
          description: "Automatisation du déploiement et gestion des environnements.",
          fichierPdf: "assets/cours/devops/chapitre2.pdf",
          dateCreation: new Date(2024, 1, 15),
        },
      ],
    },
    {
      id: "m17",
      nom: "Cloud Computing",
      enseignant: "Dr. Pierre Lambert",
      credits: 4,
      heures: 36,
      couleur: "#0ea5e9",
      icon: "fa-cloud",
      departement: "Informatique",
      chapitres: [
        {
          id: "c1m17",
          titre: "Services cloud",
          description: "Types de services cloud (IaaS, PaaS, SaaS) et fournisseurs.",
          fichierPdf: "assets/cours/cloud/chapitre1.pdf",
          dateCreation: new Date(2024, 1, 9),
        },
        {
          id: "c2m17",
          titre: "Déploiement sur AWS",
          description: "Utilisation des services AWS pour le déploiement d'applications.",
          fichierPdf: "assets/cours/cloud/chapitre2.pdf",
          dateCreation: new Date(2024, 1, 16),
        },
      ],
    },
    {
      id: "m18",
      nom: "Statistiques appliquées",
      enseignant: "Prof. Hélène Martin",
      credits: 6,
      heures: 42,
      couleur: "#a855f7",
      icon: "fa-chart-bar",
      departement: "Mathématiques",
      chapitres: [
        {
          id: "c1m18",
          titre: "Statistiques descriptives",
          description: "Méthodes de description et visualisation des données.",
          fichierPdf: "assets/cours/stats/chapitre1.pdf",
          dateCreation: new Date(2024, 1, 10),
        },
        {
          id: "c2m18",
          titre: "Tests d'hypothèses",
          description: "Principes et applications des tests statistiques.",
          fichierPdf: "assets/cours/stats/chapitre2.pdf",
          dateCreation: new Date(2024, 1, 17),
        },
      ],
    },
    {
      id: "m19",
      nom: "Analyse de données",
      enseignant: "Dr. François Petit",
      credits: 6,
      heures: 48,
      couleur: "#ec4899",
      icon: "fa-table",
      departement: "Informatique",
      chapitres: [
        {
          id: "c1m19",
          titre: "Prétraitement des données",
          description: "Techniques de nettoyage et préparation des données.",
          fichierPdf: "assets/cours/analyse-donnees/chapitre1.pdf",
          dateCreation: new Date(2024, 1, 11),
        },
        {
          id: "c2m19",
          titre: "Visualisation avancée",
          description: "Création de visualisations interactives avec des bibliothèques modernes.",
          fichierPdf: "assets/cours/analyse-donnees/chapitre2.pdf",
          dateCreation: new Date(2024, 1, 18),
        },
      ],
    },
    {
      id: "m20",
      nom: "Blockchain & Cryptomonnaies",
      enseignant: "Prof. Nicolas Roux",
      credits: 4,
      heures: 36,
      couleur: "#6366f1",
      icon: "fa-link",
      departement: "Informatique",
      chapitres: [
        {
          id: "c1m20",
          titre: "Fondamentaux de la blockchain",
          description: "Principes cryptographiques et consensus distribué.",
          fichierPdf: "assets/cours/blockchain/chapitre1.pdf",
          dateCreation: new Date(2024, 2, 1),
        },
        {
          id: "c2m20",
          titre: "Smart contracts",
          description: "Développement et déploiement de contrats intelligents.",
          fichierPdf: "assets/cours/blockchain/chapitre2.pdf",
          dateCreation: new Date(2024, 2, 8),
        },
      ],
    },
    {
      id: "m21",
      nom: "UX/UI Design",
      enseignant: "Dr. Sophie Mercier",
      credits: 4,
      heures: 36,
      couleur: "#84cc16",
      icon: "fa-paint-brush",
      departement: "Design",
      chapitres: [
        {
          id: "c1m21",
          titre: "Principes de l'UX",
          description: "Fondamentaux de l'expérience utilisateur et recherche utilisateur.",
          fichierPdf: "assets/cours/ux-ui/chapitre1.pdf",
          dateCreation: new Date(2024, 2, 2),
        },
        {
          id: "c2m21",
          titre: "Design d'interfaces",
          description: "Création d'interfaces utilisateur efficaces et esthétiques.",
          fichierPdf: "assets/cours/ux-ui/chapitre2.pdf",
          dateCreation: new Date(2024, 2, 9),
        },
      ],
    },
    {
      id: "m22",
      nom: "Projet de fin d'études",
      enseignant: "Prof. Michel Durand",
      credits: 8,
      heures: 60,
      couleur: "#14b8a6",
      icon: "fa-project-diagram",
      departement: "Informatique",
      chapitres: [
        {
          id: "c1m22",
          titre: "Méthodologie de recherche",
          description: "Techniques de recherche et rédaction scientifique.",
          fichierPdf: "assets/cours/projet/chapitre1.pdf",
          dateCreation: new Date(2024, 2, 3),
        },
        {
          id: "c2m22",
          titre: "Gestion de projet avancée",
          description: "Planification et exécution de projets complexes.",
          fichierPdf: "assets/cours/projet/chapitre2.pdf",
          dateCreation: new Date(2024, 2, 10),
        },
      ],
    },
    {
      id: "m23",
      nom: "Éthique & Informatique",
      enseignant: "Dr. Claire Fontaine",
      credits: 3,
      heures: 30,
      couleur: "#f43f5e",
      icon: "fa-balance-scale",
      departement: "Sciences Humaines",
      chapitres: [
        {
          id: "c1m23",
          titre: "Enjeux éthiques du numérique",
          description: "Questions éthiques liées aux technologies de l'information.",
          fichierPdf: "assets/cours/ethique/chapitre1.pdf",
          dateCreation: new Date(2024, 2, 4),
        },
        {
          id: "c2m23",
          titre: "Responsabilité professionnelle",
          description: "Responsabilités des professionnels de l'informatique.",
          fichierPdf: "assets/cours/ethique/chapitre2.pdf",
          dateCreation: new Date(2024, 2, 11),
        },
      ],
    },
    {
      id: "m24",
      nom: "Communication professionnelle",
      enseignant: "Prof. Jean-Paul Martin",
      credits: 3,
      heures: 30,
      couleur: "#06b6d4",
      icon: "fa-comments",
      departement: "Communication",
      chapitres: [
        {
          id: "c1m24",
          titre: "Communication écrite",
          description: "Techniques de rédaction professionnelle et rapports techniques.",
          fichierPdf: "assets/cours/communication/chapitre1.pdf",
          dateCreation: new Date(2024, 2, 5),
        },
        {
          id: "c2m24",
          titre: "Présentations efficaces",
          description: "Conception et réalisation de présentations professionnelles.",
          fichierPdf: "assets/cours/communication/chapitre2.pdf",
          dateCreation: new Date(2024, 2, 12),
        },
      ],
    },
  ]

  constructor() {}

  ngOnInit(): void {}

  // Méthode pour changer de semestre
  changeSemester(semester: "semestre1" | "semestre2"): void {
    this.activeSemester = semester
    this.selectedMatiere = null // Réinitialiser la matière sélectionnée lors du changement de semestre
  }

  // Méthode pour sélectionner une matière
  selectMatiere(matiere: Matiere): void {
    this.selectedMatiere = matiere
  }

  // Méthode pour revenir à la liste des matières
  backToMatieres(): void {
    this.selectedMatiere = null
  }

  // Méthode pour formater les dates
  formatDate(date: Date): string {
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  // Méthode pour obtenir la taille du fichier (simulée)
  getFileSize(chapitre: Chapitre): string {
    // Simuler une taille de fichier entre 1 et 5 Mo
    const size = Math.floor(Math.random() * 4) + 1
    return `${size} Mo`
  }
}