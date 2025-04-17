import { Component, type OnInit, HostListener } from "@angular/core"
import { Router } from "@angular/router"

interface Notification {
  id: number
  type: "cours" | "devoir" | "quiz"
  title: string
  message: string
  date: Date
  read: boolean
}

interface Chapitre {
  id: string
  titre: string
  description: string
  fichierPdf: string
  dateCreation: Date
  taille?: string
}

interface TypeCours {
  enseignant: string
  chapitres: Chapitre[]
  disponible: boolean
}

interface Matiere {
  id: string
  nom: string
  credits: number
  heures: number
  couleur: string
  icon: string
  departement: string
  description?: string
  cours: TypeCours
  td: TypeCours
  tp: TypeCours
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

  // Type de contenu actif (cours, td, tp)
  activeContentType: "cours" | "td" | "tp" = "cours"

  // Matière sélectionnée
  selectedMatiere: Matiere | null = null

  // Ajout pour les notifications
  notifications: Notification[] = []
  showNotificationDropdown = false

  // Liste des matières du semestre 1
  matieresSemestre1: Matiere[] = [
    {
      id: "m1",
      nom: "Programmation Web",
      credits: 6,
      heures: 42,
      couleur: "#6366f1",
      icon: "fa-code",
      departement: "Informatique",
      description: "Introduction aux technologies du web moderne et aux frameworks de développement.",
      cours: {
        enseignant: "Dr. Martin Dupont",
        disponible: true,
        chapitres: [
          {
            id: "c1m1",
            titre: "Introduction au HTML5",
            description: "Bases du langage de balisage HTML et structure des pages web.",
            fichierPdf: "assets/cours/prog-web/cours/chapitre1.pdf",
            dateCreation: new Date(2023, 8, 5),
            taille: "2.4 Mo",
          },
          {
            id: "c2m1",
            titre: "CSS et mise en forme",
            description: "Styliser les pages web avec CSS et principes de design responsive.",
            fichierPdf: "assets/cours/prog-web/cours/chapitre2.pdf",
            dateCreation: new Date(2023, 8, 12),
            taille: "1.8 Mo",
          },
          {
            id: "c3m1",
            titre: "JavaScript fondamentaux",
            description: "Introduction à la programmation côté client avec JavaScript.",
            fichierPdf: "assets/cours/prog-web/cours/chapitre3.pdf",
            dateCreation: new Date(2023, 8, 19),
            taille: "3.2 Mo",
          },
          {
            id: "c4m1",
            titre: "Frameworks front-end",
            description: "Introduction aux frameworks modernes comme Angular, React et Vue.",
            fichierPdf: "assets/cours/prog-web/cours/chapitre4.pdf",
            dateCreation: new Date(2023, 8, 26),
            taille: "4.1 Mo",
          },
        ],
      },
      td: {
        enseignant: "Mme. Sophie Laurent",
        disponible: true,
        chapitres: [
          {
            id: "td1m1",
            titre: "Exercices HTML/CSS",
            description: "Série d'exercices pratiques sur HTML5 et CSS3.",
            fichierPdf: "assets/cours/prog-web/td/td1.pdf",
            dateCreation: new Date(2023, 8, 7),
            taille: "1.5 Mo",
          },
          {
            id: "td2m1",
            titre: "Manipulation du DOM",
            description: "Travaux dirigés sur la manipulation du DOM avec JavaScript.",
            fichierPdf: "assets/cours/prog-web/td/td2.pdf",
            dateCreation: new Date(2023, 8, 14),
            taille: "2.2 Mo",
          },
        ],
      },
      tp: {
        enseignant: "M. Jean Petit",
        disponible: true,
        chapitres: [
          {
            id: "tp1m1",
            titre: "Création d'un site responsive",
            description: "TP guidé pour créer un site web responsive avec HTML/CSS.",
            fichierPdf: "assets/cours/prog-web/tp/tp1.pdf",
            dateCreation: new Date(2023, 8, 9),
            taille: "3.5 Mo",
          },
          {
            id: "tp2m1",
            titre: "Application JavaScript",
            description: "Développement d'une application web interactive avec JavaScript.",
            fichierPdf: "assets/cours/prog-web/tp/tp2.pdf",
            dateCreation: new Date(2023, 8, 16),
            taille: "2.9 Mo",
          },
        ],
      },
    },
    {
      id: "m2",
      nom: "Bases de données",
      credits: 6,
      heures: 42,
      couleur: "#f59e0b",
      icon: "fa-database",
      departement: "Informatique",
      description: "Conception, modélisation et implémentation de bases de données relationnelles.",
      cours: {
        enseignant: "Prof. Claire Dubois",
        disponible: true,
        chapitres: [
          {
            id: "c1m2",
            titre: "Modèle relationnel",
            description: "Introduction aux concepts de bases de données relationnelles.",
            fichierPdf: "assets/cours/bdd/cours/chapitre1.pdf",
            dateCreation: new Date(2023, 8, 6),
            taille: "2.7 Mo",
          },
          {
            id: "c2m2",
            titre: "SQL fondamental",
            description: "Requêtes SQL de base pour la manipulation des données.",
            fichierPdf: "assets/cours/bdd/cours/chapitre2.pdf",
            dateCreation: new Date(2023, 8, 13),
            taille: "3.3 Mo",
          },
          {
            id: "c3m2",
            titre: "Normalisation",
            description: "Principes de normalisation et conception de schémas.",
            fichierPdf: "assets/cours/bdd/cours/chapitre3.pdf",
            dateCreation: new Date(2023, 8, 20),
            taille: "2.1 Mo",
          },
        ],
      },
      td: {
        enseignant: "M. Thomas Bernard",
        disponible: true,
        chapitres: [
          {
            id: "td1m2",
            titre: "Modélisation E/A",
            description: "Exercices de modélisation Entité-Association.",
            fichierPdf: "assets/cours/bdd/td/td1.pdf",
            dateCreation: new Date(2023, 8, 8),
            taille: "1.5 Mo",
          },
          {
            id: "td2m2",
            titre: "Exercices SQL",
            description: "Série d'exercices sur les requêtes SQL.",
            fichierPdf: "assets/cours/bdd/td/td2.pdf",
            dateCreation: new Date(2023, 8, 15),
            taille: "1.9 Mo",
          },
        ],
      },
      tp: {
        enseignant: "Mme. Marie Leroy",
        disponible: false,
        chapitres: [],
      },
    },
    {
      id: "m3",
      nom: "Algorithmes avancés",
      credits: 4,
      heures: 36,
      couleur: "#10b981",
      icon: "fa-sitemap",
      departement: "Informatique",
      description: "Étude des algorithmes complexes et analyse de leur efficacité.",
      cours: {
        enseignant: "Dr. Philippe Martin",
        disponible: true,
        chapitres: [
          {
            id: "c1m3",
            titre: "Complexité algorithmique",
            description: "Analyse de la complexité temporelle et spatiale des algorithmes.",
            fichierPdf: "assets/cours/algo/cours/chapitre1.pdf",
            dateCreation: new Date(2023, 8, 7),
            taille: "2.2 Mo",
          },
          {
            id: "c2m3",
            titre: "Algorithmes de tri",
            description: "Étude comparative des algorithmes de tri avancés.",
            fichierPdf: "assets/cours/algo/cours/chapitre2.pdf",
            dateCreation: new Date(2023, 8, 14),
            taille: "3.0 Mo",
          },
        ],
      },
      td: {
        enseignant: "M. Luc Moreau",
        disponible: false,
        chapitres: [],
      },
      tp: {
        enseignant: "Mme. Isabelle Blanc",
        disponible: false,
        chapitres: [],
      },
    },
    {
      id: "m4",
      nom: "Intelligence artificielle",
      credits: 6,
      heures: 48,
      couleur: "#8b5cf6",
      icon: "fa-brain",
      departement: "Informatique",
      description: "Fondamentaux de l'IA et applications dans divers domaines.",
      cours: {
        enseignant: "Prof. Antoine Rousseau",
        disponible: true,
        chapitres: [
          {
            id: "c1m4",
            titre: "Introduction à l'IA",
            description: "Histoire et concepts fondamentaux de l'intelligence artificielle.",
            fichierPdf: "assets/cours/ia/cours/chapitre1.pdf",
            dateCreation: new Date(2023, 8, 8),
            taille: "3.8 Mo",
          },
          {
            id: "c2m4",
            titre: "Apprentissage supervisé",
            description: "Méthodes et applications de l'apprentissage supervisé.",
            fichierPdf: "assets/cours/ia/cours/chapitre2.pdf",
            dateCreation: new Date(2023, 8, 15),
            taille: "4.5 Mo",
          },
        ],
      },
      td: {
        enseignant: "Mme. Nathalie Mercier",
        disponible: true,
        chapitres: [
          {
            id: "td1m4",
            titre: "Exercices sur les algorithmes d'IA",
            description: "Problèmes et solutions sur les algorithmes classiques d'IA.",
            fichierPdf: "assets/cours/ia/td/td1.pdf",
            dateCreation: new Date(2023, 8, 10),
            taille: "2.1 Mo",
          },
        ],
      },
      tp: {
        enseignant: "M. François Petit",
        disponible: true,
        chapitres: [
          {
            id: "tp1m4",
            titre: "Implémentation d'un réseau de neurones",
            description: "TP guidé pour implémenter un réseau de neurones simple.",
            fichierPdf: "assets/cours/ia/tp/tp1.pdf",
            dateCreation: new Date(2023, 8, 12),
            taille: "3.2 Mo",
          },
        ],
      },
    },
    {
      id: "m5",
      nom: "Machine Learning",
      credits: 6,
      heures: 48,
      couleur: "#ec4899",
      icon: "fa-robot",
      departement: "Informatique",
      description: "Techniques et algorithmes d'apprentissage automatique.",
      cours: {
        enseignant: "Dr. Thomas Bernard",
        disponible: true,
        chapitres: [
          {
            id: "c1m5",
            titre: "Régression linéaire",
            description: "Principes et applications de la régression linéaire.",
            fichierPdf: "assets/cours/ml/cours/chapitre1.pdf",
            dateCreation: new Date(2023, 8, 9),
            taille: "2.8 Mo",
          },
          {
            id: "c2m5",
            titre: "Classification",
            description: "Algorithmes de classification et évaluation des modèles.",
            fichierPdf: "assets/cours/ml/cours/chapitre2.pdf",
            dateCreation: new Date(2023, 8, 16),
            taille: "3.5 Mo",
          },
        ],
      },
      td: {
        enseignant: "Mme. Sophie Laurent",
        disponible: true,
        chapitres: [
          {
            id: "td1m5",
            titre: "Exercices de régression",
            description: "Travaux dirigés sur les modèles de régression.",
            fichierPdf: "assets/cours/ml/td/td1.pdf",
            dateCreation: new Date(2023, 8, 11),
            taille: "1.7 Mo",
          },
        ],
      },
      tp: {
        enseignant: "M. Jean Petit",
        disponible: true,
        chapitres: [
          {
            id: "tp1m5",
            titre: "Classification avec scikit-learn",
            description: "TP sur l'utilisation de scikit-learn pour la classification.",
            fichierPdf: "assets/cours/ml/tp/tp1.pdf",
            dateCreation: new Date(2023, 8, 13),
            taille: "2.9 Mo",
          },
        ],
      },
    },
  ]

  // Liste des matières du semestre 2
  matieresSemestre2: Matiere[] = [
    {
      id: "m13",
      nom: "Frameworks JavaScript",
      credits: 6,
      heures: 42,
      couleur: "#8b5cf6",
      icon: "fa-js",
      departement: "Informatique",
      description: "Étude des frameworks JavaScript modernes pour le développement web.",
      cours: {
        enseignant: "Dr. Julien Moreau",
        disponible: true,
        chapitres: [
          {
            id: "c1m13",
            titre: "Introduction à React",
            description: "Concepts fondamentaux de React et composants.",
            fichierPdf: "assets/cours/frameworks/cours/chapitre1.pdf",
            dateCreation: new Date(2024, 1, 5),
            taille: "3.2 Mo",
          },
          {
            id: "c2m13",
            titre: "Angular avancé",
            description: "Architecture et fonctionnalités avancées d'Angular.",
            fichierPdf: "assets/cours/frameworks/cours/chapitre2.pdf",
            dateCreation: new Date(2024, 1, 12),
            taille: "4.1 Mo",
          },
        ],
      },
      td: {
        enseignant: "Mme. Claire Dubois",
        disponible: true,
        chapitres: [
          {
            id: "td1m13",
            titre: "Exercices React",
            description: "Travaux dirigés sur React et son écosystème.",
            fichierPdf: "assets/cours/frameworks/td/td1.pdf",
            dateCreation: new Date(2024, 1, 7),
            taille: "2.3 Mo",
          },
          {
            id: "td2m13",
            titre: "Exercices Angular",
            description: "Travaux dirigés sur Angular et TypeScript.",
            fichierPdf: "assets/cours/frameworks/td/td2.pdf",
            dateCreation: new Date(2024, 1, 14),
            taille: "2.5 Mo",
          },
        ],
      },
      tp: {
        enseignant: "M. Thomas Bernard",
        disponible: true,
        chapitres: [
          {
            id: "tp1m13",
            titre: "Projet React",
            description: "Développement d'une application React complète.",
            fichierPdf: "assets/cours/frameworks/tp/tp1.pdf",
            dateCreation: new Date(2024, 1, 9),
            taille: "3.7 Mo",
          },
          {
            id: "tp2m13",
            titre: "Projet Angular",
            description: "Développement d'une application Angular complète.",
            fichierPdf: "assets/cours/frameworks/tp/tp2.pdf",
            dateCreation: new Date(2024, 1, 16),
            taille: "3.9 Mo",
          },
        ],
      },
    },
    {
      id: "m14",
      nom: "Développement Backend",
      credits: 6,
      heures: 48,
      couleur: "#10b981",
      icon: "fa-server",
      departement: "Informatique",
      description: "Conception et développement d'applications backend et d'APIs.",
      cours: {
        enseignant: "Prof. Lucie Girard",
        disponible: true,
        chapitres: [
          {
            id: "c1m14",
            titre: "Node.js et Express",
            description: "Création d'APIs RESTful avec Node.js et Express.",
            fichierPdf: "assets/cours/backend/cours/chapitre1.pdf",
            dateCreation: new Date(2024, 1, 6),
            taille: "2.9 Mo",
          },
          {
            id: "c2m14",
            titre: "Sécurité des APIs",
            description: "Bonnes pratiques de sécurité pour les applications backend.",
            fichierPdf: "assets/cours/backend/cours/chapitre2.pdf",
            dateCreation: new Date(2024, 1, 13),
            taille: "3.1 Mo",
          },
        ],
      },
      td: {
        enseignant: "M. Philippe Martin",
        disponible: true,
        chapitres: [
          {
            id: "td1m14",
            titre: "Exercices Express",
            description: "Travaux dirigés sur Express et les middlewares.",
            fichierPdf: "assets/cours/backend/td/td1.pdf",
            dateCreation: new Date(2024, 1, 8),
            taille: "1.8 Mo",
          },
        ],
      },
      tp: {
        enseignant: "Mme. Marie Leroy",
        disponible: false,
        chapitres: [],
      },
    },
    {
      id: "m15",
      nom: "Architecture logicielle",
      credits: 4,
      heures: 36,
      couleur: "#f59e0b",
      icon: "fa-cubes",
      departement: "Informatique",
      description: "Principes et patterns d'architecture pour les applications modernes.",
      cours: {
        enseignant: "Dr. Marc Dubois",
        disponible: true,
        chapitres: [
          {
            id: "c1m15",
            titre: "Patterns de conception",
            description: "Design patterns et leur application dans le développement logiciel.",
            fichierPdf: "assets/cours/architecture/cours/chapitre1.pdf",
            dateCreation: new Date(2024, 1, 7),
            taille: "2.5 Mo",
          },
          {
            id: "c2m15",
            titre: "Architecture microservices",
            description: "Principes et mise en œuvre d'architectures microservices.",
            fichierPdf: "assets/cours/architecture/cours/chapitre2.pdf",
            dateCreation: new Date(2024, 1, 14),
            taille: "3.3 Mo",
          },
        ],
      },
      td: {
        enseignant: "Mme. Isabelle Blanc",
        disponible: false,
        chapitres: [],
      },
      tp: {
        enseignant: "M. Luc Moreau",
        disponible: false,
        chapitres: [],
      },
    },
  ]

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Charger les notifications
    this.loadNotifications()
  }

  // Écouteur d'événement pour fermer le dropdown quand on clique ailleurs
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    // Vérifier si le clic est en dehors du dropdown
    const target = event.target as HTMLElement;
    if (!target.closest('.notification-btn') && !target.closest('.notification-dropdown')) {
      this.closeNotificationDropdown();
    }
  }

  // Méthode pour charger les notifications
  loadNotifications(): void {
    const now = new Date()
    const yesterday = new Date(now)
    yesterday.setDate(yesterday.getDate() - 1)
    
    // Simuler quelques notifications
    this.notifications = [
      {
        id: 1,
        type: "cours",
        title: "Nouveau chapitre disponible",
        message: 'Le chapitre "Introduction aux bases de données relationnelles" a été ajouté.',
        date: now,
        read: false
      },
      {
        id: 2,
        type: "devoir",
        title: "Nouveau devoir assigné",
        message: 'Un nouveau devoir "Implémentation d\'un algorithme de tri" a été assigné.',
        date: yesterday,
        read: false
      },
      {
        id: 3,
        type: "quiz",
        title: "Nouveau quiz disponible",
        message: 'Un nouveau quiz sur "Les réseaux de neurones" est maintenant disponible.',
        date: yesterday,
        read: false
      }
    ]
  }

  // Méthode pour afficher/masquer le dropdown de notifications
  toggleNotificationDropdown(event?: MouseEvent): void {
    if (event) {
      event.stopPropagation();
    }
    this.showNotificationDropdown = !this.showNotificationDropdown
  }

  // Méthode pour fermer le dropdown si on clique ailleurs
  closeNotificationDropdown(): void {
    this.showNotificationDropdown = false
  }

  // Méthode pour marquer une notification comme lue
  markAsRead(notification: Notification): void {
    notification.read = true
  }

  // Méthode pour obtenir le nombre de notifications non lues
  getUnreadNotificationsCount(): number {
    return this.notifications.filter(n => !n.read).length
  }

  // Méthode pour obtenir l'icône en fonction du type de notification
  getNotificationIcon(type: string): string {
    switch (type) {
      case "cours":
        return "fa-book"
      case "devoir":
        return "fa-tasks"
      case "quiz":
        return "fa-question-circle"
      default:
        return "fa-bell"
    }
  }

  // Méthode pour formater le temps écoulé
  formatTimeAgo(date: Date): string {
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diffInSeconds < 60) {
      return "À l'instant"
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60)
    if (diffInMinutes < 60) {
      return `Il y a ${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""}`
    }

    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) {
      return `Il y a ${diffInHours} heure${diffInHours > 1 ? "s" : ""}`
    }

    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) {
      return `Il y a ${diffInDays} jour${diffInDays > 1 ? "s" : ""}`
    }

    return this.formatDate(date)
  }

  // Méthode pour naviguer vers la page de notifications
  navigateToNotifications(): void {
    this.router.navigate(["/troixieme-interface/notification"])
    this.closeNotificationDropdown()
  }

  // Méthode pour changer de semestre
  changeSemester(semester: "semestre1" | "semestre2"): void {
    this.activeSemester = semester
    this.selectedMatiere = null // Réinitialiser la matière sélectionnée lors du changement de semestre
  }

  // Méthode pour sélectionner une matière
  selectMatiere(matiere: Matiere): void {
    this.selectedMatiere = matiere

    // Sélectionner le premier type de contenu disponible
    if (matiere.cours.disponible) {
      this.activeContentType = "cours"
    } else if (matiere.td.disponible) {
      this.activeContentType = "td"
    } else if (matiere.tp.disponible) {
      this.activeContentType = "tp"
    }
  }

  // Méthode pour changer le type de contenu actif
  changeContentType(type: "cours" | "td" | "tp"): void {
    if (this.selectedMatiere && this.isContentTypeAvailable(type)) {
      this.activeContentType = type
    }
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

  // Méthode pour obtenir la taille du fichier
  getFileSize(chapitre: Chapitre): string {
    return chapitre.taille || "1 Mo" // Retourne la taille si définie, sinon une valeur par défaut
  }

  // Méthode pour vérifier si un type de contenu est disponible
  isContentTypeAvailable(type: "cours" | "td" | "tp"): boolean {
    if (!this.selectedMatiere) return false

    switch (type) {
      case "cours":
        return this.selectedMatiere.cours.disponible
      case "td":
        return this.selectedMatiere.td.disponible
      case "tp":
        return this.selectedMatiere.tp.disponible
      default:
        return false
    }
  }

  // Méthode pour obtenir les chapitres du type de contenu actif
  getActiveChapitres(): Chapitre[] {
    if (!this.selectedMatiere) return []

    switch (this.activeContentType) {
      case "cours":
        return this.selectedMatiere.cours.chapitres
      case "td":
        return this.selectedMatiere.td.chapitres
      case "tp":
        return this.selectedMatiere.tp.chapitres
      default:
        return []
    }
  }

  // Méthode pour obtenir l'enseignant du type de contenu actif
  getActiveEnseignant(): string {
    if (!this.selectedMatiere) return ""

    switch (this.activeContentType) {
      case "cours":
        return this.selectedMatiere.cours.enseignant
      case "td":
        return this.selectedMatiere.td.enseignant
      case "tp":
        return this.selectedMatiere.tp.enseignant
      default:
        return ""
    }
  }

  // Méthode pour obtenir le nombre de chapitres disponibles par type
  getChapitresCount(type: "cours" | "td" | "tp"): number {
    if (!this.selectedMatiere) return 0

    switch (type) {
      case "cours":
        return this.selectedMatiere.cours.chapitres.length
      case "td":
        return this.selectedMatiere.td.chapitres.length
      case "tp":
        return this.selectedMatiere.tp.chapitres.length
      default:
        return 0
    }
  }
}