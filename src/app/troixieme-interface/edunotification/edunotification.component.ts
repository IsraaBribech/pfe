import { Component, type OnInit } from "@angular/core"
import { Router } from "@angular/router"

interface Alert {
  id: number
  type: "cours" | "devoir" | "quiz"
  title: string
  message: string
  description?: string
  course: string
  teacher: string
  date: Date
  dueDate?: Date
  read: boolean
  isNew?: boolean
}

@Component({
  selector: "app-edunotification",
  templateUrl: "./edunotification.component.html",
  styleUrls: ["./edunotification.component.css"],
})
export class EdunotificationComponent implements OnInit {
  alerts: Alert[] = []
  filteredAlerts: Alert[] = []
  selectedAlert: Alert | null = null
  selectedFilter = "all"

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Simuler le chargement des alertes
    setTimeout(() => {
      this.loadAlerts()
      this.applyFilter()
    }, 500)
  }

  loadAlerts(): void {
    // Données de démonstration
    const now = new Date()
    const yesterday = new Date(now)
    yesterday.setDate(yesterday.getDate() - 1)
    const twoDaysAgo = new Date(now)
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2)
    const threeDaysAgo = new Date(now)
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3)
    const oneWeekAgo = new Date(now)
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

    // Date limite pour les devoirs
    const nextWeek = new Date(now)
    nextWeek.setDate(nextWeek.getDate() + 7)
    const twoWeeksLater = new Date(now)
    twoWeeksLater.setDate(twoWeeksLater.getDate() + 14)

    this.alerts = [
      {
        id: 1,
        type: "cours",
        title: "Nouveau chapitre disponible",
        message: 'Le chapitre "Introduction aux bases de données relationnelles" a été ajouté à votre cours.',
        description:
          "Ce chapitre couvre les concepts fondamentaux des bases de données relationnelles, y compris les modèles de données, les clés primaires et étrangères, et les principes de normalisation. Vous apprendrez également les bases du langage SQL pour interroger et manipuler des données.",
        course: "Bases de données",
        teacher: "Prof. Sophie Laurent",
        date: now,
        read: false,
        isNew: true,
      },
      {
        id: 2,
        type: "devoir",
        title: "Nouveau devoir assigné",
        message: 'Un nouveau devoir "Implémentation d\'un algorithme de tri" a été assigné.',
        description:
          "Dans ce devoir, vous devrez implémenter trois algorithmes de tri différents (tri à bulles, tri par insertion et tri rapide) et comparer leurs performances sur différents jeux de données. Vous devrez également analyser la complexité temporelle et spatiale de chaque algorithme.",
        course: "Algorithmes avancés",
        teacher: "Dr. Jean Petit",
        date: yesterday,
        dueDate: nextWeek,
        read: false,
      },
      {
        id: 3,
        type: "quiz",
        title: "Nouveau quiz disponible",
        message: 'Un nouveau quiz sur "Les réseaux de neurones" est maintenant disponible.',
        description:
          "Ce quiz teste vos connaissances sur les réseaux de neurones artificiels, y compris les perceptrons, les réseaux à propagation avant, les fonctions d'activation et les algorithmes d'apprentissage. Vous avez 30 minutes pour compléter ce quiz.",
        course: "Intelligence artificielle",
        teacher: "Prof. Marie Leroy",
        date: yesterday,
        read: false,
      },
      {
        id: 4,
        type: "cours",
        title: "Mise à jour du cours",
        message: 'Le cours "Programmation Web" a été mis à jour avec de nouveaux exemples.',
        description:
          "De nouveaux exemples pratiques ont été ajoutés au cours, notamment des démonstrations de frameworks modernes comme React et Vue.js. Ces exemples vous aideront à mieux comprendre les concepts théoriques présentés dans le cours.",
        course: "Programmation Web",
        teacher: "Dr. Martin Dupont",
        date: twoDaysAgo,
        read: true,
      },
      {
        id: 5,
        type: "devoir",
        title: "Rappel de devoir",
        message: 'N\'oubliez pas de soumettre votre devoir "Analyse de données" avant la date limite.',
        description:
          "Ce rappel concerne le devoir d'analyse de données qui doit être soumis avant la fin de la semaine. Assurez-vous d'avoir complété toutes les parties de l'analyse et de fournir des visualisations appropriées pour vos résultats.",
        course: "Machine Learning",
        teacher: "Dr. Thomas Bernard",
        date: twoDaysAgo,
        dueDate: twoWeeksLater,
        read: true,
      },
      {
        id: 6,
        type: "quiz",
        title: "Résultats du quiz",
        message: 'Les résultats du quiz "Algèbre linéaire" sont maintenant disponibles.',
        description:
          "Vous pouvez maintenant consulter vos résultats pour le quiz d'algèbre linéaire. Le quiz comprenait des questions sur les vecteurs, les matrices, les transformations linéaires et les espaces vectoriels.",
        course: "Algèbre linéaire",
        teacher: "Prof. Claire Dubois",
        date: threeDaysAgo,
        read: true,
      },
      {
        id: 7,
        type: "cours",
        title: "Nouveau matériel de cours",
        message: 'De nouveaux documents ont été ajoutés au cours "Réseaux informatiques".',
        description:
          "Des documents supplémentaires ont été ajoutés au cours, y compris des guides pratiques sur la configuration des routeurs et des commutateurs, ainsi que des études de cas sur la conception de réseaux d'entreprise.",
        course: "Réseaux informatiques",
        teacher: "Prof. Luc Moreau",
        date: oneWeekAgo,
        read: true,
      },
    ]
  }

  applyFilter(): void {
    if (this.selectedFilter === "all") {
      this.filteredAlerts = [...this.alerts]
    } else if (this.selectedFilter === "unread") {
      this.filteredAlerts = this.alerts.filter((n) => !n.read)
    } else {
      this.filteredAlerts = this.alerts.filter((n) => n.type === this.selectedFilter)
    }
  }

  getFilteredAlerts(unread: boolean): Alert[] {
    return this.filteredAlerts.filter((n) => n.read !== unread)
  }

  hasUnreadAlerts(): boolean {
    return this.filteredAlerts.some((n) => !n.read)
  }

  getUnreadCount(): number {
    return this.alerts.filter((n) => !n.read).length
  }

  getReadCount(): number {
    return this.filteredAlerts.filter((n) => n.read).length
  }

  getTypeCount(type: string): number {
    return this.alerts.filter((n) => n.type === type).length
  }

  markAsRead(alert: Alert): void {
    if (!alert.read) {
      alert.read = true
      // Dans une application réelle, vous enverriez une requête au serveur ici
      console.log(`Alerte ${alert.id} marquée comme lue`)
    }
  }

  markAllAsRead(): void {
    this.alerts.forEach((alert) => {
      alert.read = true
    })
    // Dans une application réelle, vous enverriez une requête au serveur ici
    console.log("Toutes les alertes marquées comme lues")
    this.applyFilter()
  }

  viewDetails(alert: Alert, event?: Event): void {
    if (event) {
      event.stopPropagation()
    }
    this.selectedAlert = alert
    if (!alert.read) {
      this.markAsRead(alert)
    }
  }

  closeModal(event: Event): void {
    if (event.target === event.currentTarget) {
      this.selectedAlert = null
    }
  }

  submitAssignment(alert: Alert, event?: Event): void {
    if (event) {
      event.stopPropagation()
    }
    // Logique pour soumettre un devoir
    console.log(`Soumettre le devoir: ${alert.title}`)
    // Rediriger vers la page de soumission de devoir
    this.router.navigate(["/troixieme-interface/devoir-realiser"])
  }

  startQuiz(alert: Alert, event?: Event): void {
    if (event) {
      event.stopPropagation()
    }
    // Logique pour commencer un quiz
    console.log(`Commencer le quiz: ${alert.title}`)
    // Rediriger vers la page du quiz
    this.router.navigate(["/troixieme-interface/quiz-repond"])
  }

  viewCourse(alert: Alert): void {
    // Logique pour accéder au cours
    console.log(`Accéder au cours: ${alert.course}`)
    // Rediriger vers la page du cours
    this.router.navigate(["/troixieme-interface/cour-suivie"])
  }

  getAlertTypeIcon(type: string): string {
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

  // Méthode ajoutée pour résoudre l'erreur
  getAlertClasses(alert: Alert): string[] {
    const classes: (typeof alert.type | 'unread')[] = [alert.type]
    if (!alert.read) {
      classes.push('unread')
    }
    return classes
  }

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

  formatDate(date: Date): string {
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }
}