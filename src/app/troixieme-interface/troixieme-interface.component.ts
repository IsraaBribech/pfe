import { Component, type OnInit } from "@angular/core"
import { Router } from "@angular/router"

@Component({
  selector: "app-troixieme-interface",
  templateUrl: "./troixieme-interface.component.html",
  styleUrls: ["./troixieme-interface.component.css"],
})
export class TroixiemeInterfaceComponent implements OnInit {
  // Informations de l'étudiant
  etudiantName = "Israa Bribech"
  etudiantEmail = "israabribech2002@gmail.com"
  etudiantMatricule = "E12345"

  // Informations académiques
  departement = "Informatique"
  specialite = "BIS "
  niveau = "Licence 3"

  // Statistiques
  statsData = {
    cours: 5,
    devoirs: 8,
    quizzes: 3,
    messages: 12,
  }

  // Onglet actif
  activeSemester: "semestre1" | "semestre2" = "semestre1"

  // Liste des matières du semestre 1
  matieresSemestre1 = [
    {
      id: "m1",
      nom: "Programmation Web",
      enseignant: "Dr. Martin Dupont",
      credits: 6,
      heures: 42,
      couleur: "#6366f1",
      icon: "fa-code",
      progression: 75,
      departement: "Informatique",
    },
    {
      id: "m2",
      nom: "Bases de données",
      enseignant: "Prof. Sophie Laurent",
      credits: 6,
      heures: 42,
      couleur: "#f59e0b",
      icon: "fa-database",
      progression: 60,
      departement: "Informatique",
    },
    {
      id: "m3",
      nom: "Algorithmes avancés",
      enseignant: "Dr. Jean Petit",
      credits: 4,
      heures: 36,
      couleur: "#10b981",
      icon: "fa-sitemap",
      progression: 45,
      departement: "Informatique",
    },
    {
      id: "m4",
      nom: "Intelligence artificielle",
      enseignant: "Prof. Marie Leroy",
      credits: 6,
      heures: 48,
      couleur: "#8b5cf6",
      icon: "fa-brain",
      progression: 30,
      departement: "Informatique",
    },
    {
      id: "m5",
      nom: "Machine Learning",
      enseignant: "Dr. Thomas Bernard",
      credits: 6,
      heures: 48,
      couleur: "#ec4899",
      icon: "fa-robot",
      progression: 25,
      departement: "Informatique",
    },
    {
      id: "m6",
      nom: "Algèbre linéaire",
      enseignant: "Prof. Claire Dubois",
      credits: 6,
      heures: 42,
      couleur: "#ef4444",
      icon: "fa-square-root-alt",
      progression: 80,
      departement: "Mathématiques",
    },
    {
      id: "m7",
      nom: "Analyse numérique",
      enseignant: "Dr. Philippe Martin",
      credits: 4,
      heures: 36,
      couleur: "#0ea5e9",
      icon: "fa-chart-line",
      progression: 65,
      departement: "Mathématiques",
    },
    {
      id: "m8",
      nom: "Réseaux informatiques",
      enseignant: "Prof. Luc Moreau",
      credits: 6,
      heures: 42,
      couleur: "#14b8a6",
      icon: "fa-network-wired",
      progression: 50,
      departement: "Informatique",
    },
    {
      id: "m9",
      nom: "Sécurité informatique",
      enseignant: "Dr. Isabelle Blanc",
      credits: 4,
      heures: 36,
      couleur: "#f43f5e",
      icon: "fa-shield-alt",
      progression: 40,
      departement: "Informatique",
    },
    {
      id: "m10",
      nom: "Développement mobile",
      enseignant: "Prof. Antoine Rousseau",
      credits: 6,
      heures: 48,
      couleur: "#84cc16",
      icon: "fa-mobile-alt",
      progression: 55,
      departement: "Informatique",
    },
    {
      id: "m11",
      nom: "Gestion de projet",
      enseignant: "Dr. Nathalie Mercier",
      credits: 4,
      heures: 36,
      couleur: "#a855f7",
      icon: "fa-tasks",
      progression: 70,
      departement: "Gestion",
    },
    {
      id: "m12",
      nom: "Anglais technique",
      enseignant: "Prof. Sarah Johnson",
      credits: 3,
      heures: 30,
      couleur: "#06b6d4",
      icon: "fa-language",
      progression: 85,
      departement: "Langues",
    },
  ]

  // Liste des matières du semestre 2
  matieresSemestre2 = [
    {
      id: "m13",
      nom: "Frameworks JavaScript",
      enseignant: "Dr. Julien Moreau",
      credits: 6,
      heures: 42,
      couleur: "#8b5cf6",
      icon: "fa-js",
      progression: 65,
      departement: "Informatique",
    },
    {
      id: "m14",
      nom: "Développement Backend",
      enseignant: "Prof. Lucie Girard",
      credits: 6,
      heures: 48,
      couleur: "#10b981",
      icon: "fa-server",
      progression: 55,
      departement: "Informatique",
    },
    {
      id: "m15",
      nom: "Architecture logicielle",
      enseignant: "Dr. Marc Dubois",
      credits: 4,
      heures: 36,
      couleur: "#f59e0b",
      icon: "fa-cubes",
      progression: 40,
      departement: "Informatique",
    },
    {
      id: "m16",
      nom: "DevOps & CI/CD",
      enseignant: "Prof. Émilie Blanc",
      credits: 4,
      heures: 36,
      couleur: "#ef4444",
      icon: "fa-sync-alt",
      progression: 30,
      departement: "Informatique",
    },
    {
      id: "m17",
      nom: "Cloud Computing",
      enseignant: "Dr. Pierre Lambert",
      credits: 4,
      heures: 36,
      couleur: "#0ea5e9",
      icon: "fa-cloud",
      progression: 45,
      departement: "Informatique",
    },
    {
      id: "m18",
      nom: "Statistiques appliquées",
      enseignant: "Prof. Hélène Martin",
      credits: 6,
      heures: 42,
      couleur: "#a855f7",
      icon: "fa-chart-bar",
      progression: 70,
      departement: "Mathématiques",
    },
    {
      id: "m19",
      nom: "Analyse de données",
      enseignant: "Dr. François Petit",
      credits: 6,
      heures: 48,
      couleur: "#ec4899",
      icon: "fa-table",
      progression: 60,
      departement: "Informatique",
    },
    {
      id: "m20",
      nom: "Blockchain & Cryptomonnaies",
      enseignant: "Prof. Nicolas Roux",
      credits: 4,
      heures: 36,
      couleur: "#6366f1",
      icon: "fa-link",
      progression: 35,
      departement: "Informatique",
    },
    {
      id: "m21",
      nom: "UX/UI Design",
      enseignant: "Dr. Sophie Mercier",
      credits: 4,
      heures: 36,
      couleur: "#84cc16",
      icon: "fa-paint-brush",
      progression: 75,
      departement: "Design",
    },
    {
      id: "m22",
      nom: "Projet de fin d'études",
      enseignant: "Prof. Michel Durand",
      credits: 8,
      heures: 60,
      couleur: "#14b8a6",
      icon: "fa-project-diagram",
      progression: 25,
      departement: "Informatique",
    },
    {
      id: "m23",
      nom: "Éthique & Informatique",
      enseignant: "Dr. Claire Fontaine",
      credits: 3,
      heures: 30,
      couleur: "#f43f5e",
      icon: "fa-balance-scale",
      progression: 80,
      departement: "Sciences Humaines",
    },
    {
      id: "m24",
      nom: "Communication professionnelle",
      enseignant: "Prof. Jean-Paul Martin",
      credits: 3,
      heures: 30,
      couleur: "#06b6d4",
      icon: "fa-comments",
      progression: 90,
      departement: "Communication",
    },
  ]
  messageStats: any

  constructor(private router: Router) {}

  ngOnInit(): void {}

  // Méthode pour formater les dates
  formatDate(date: Date): string {
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  // Méthode pour obtenir la classe CSS en fonction du type d'événement
  getEventClass(type: string): string {
    switch (type) {
      case "devoir":
        return "assignments"
      case "quiz":
        return "quizzes"
      case "cours":
        return "courses"
      case "message":
        return "messages"
      default:
        return ""
    }
  }

  // Méthode pour obtenir l'icône en fonction du type d'événement
  getEventIcon(type: string): string {
    switch (type) {
      case "devoir":
        return "fa-tasks"
      case "quiz":
        return "fa-question-circle"
      case "cours":
        return "fa-book"
      case "message":
        return "fa-envelope"
      default:
        return "fa-calendar"
    }
  }

  // Méthode pour obtenir la classe CSS pour la progression
  getProgressClass(progression: number): string {
    if (progression >= 75) {
      return "excellent"
    } else if (progression >= 50) {
      return "good"
    } else if (progression >= 25) {
      return "average"
    } else {
      return "poor"
    }
  }

  // Méthode pour changer de semestre
  changeSemester(semester: "semestre1" | "semestre2"): void {
    this.activeSemester = semester
  }

  // Méthode pour naviguer vers le profil
  navigateToProfile(): void {
    this.router.navigate(["/eduprofil"])
  }
}