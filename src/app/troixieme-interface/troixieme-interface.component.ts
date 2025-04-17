import { Component, type OnInit, HostListener } from "@angular/core"
import { Router, NavigationEnd } from "@angular/router"
import { filter } from 'rxjs/operators'

interface Notification {
  id: number
  type: "cours" | "devoir" | "quiz"
  title: string
  message: string
  date: Date
  read: boolean
}

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
  specialite = "BIS"
  niveau = "Licence 3"
  groupe = "G1.2" // Ajout du groupe de l'étudiant

  // Statistiques
  statsData = {
    cours: 5,
    devoirs: 8,
    quizzes: 3,
    messages: 12,
    notifications: 7, // Ajout des notifications
  }

  // Onglet actif
  activeSemester: "semestre1" | "semestre2" = "semestre1"

  messageStats: any

  // Ajout pour les notifications
  notifications: Notification[] = []
  showNotificationDropdown = false

  constructor(private router: Router) {
    // Écouter les événements de navigation pour mettre à jour le titre de la page
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        // Vous pouvez mettre à jour le titre de la page ici si nécessaire
        // Ne pas fermer le dropdown de notifications lors de la navigation
      });
  }

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

  // Méthode pour vérifier si on est sur la page d'accueil
  isHomePage(): boolean {
    return this.router.url === '/troixieme-interface';
  }

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
      case "notification":
        return "notifications"
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
      case "notification":
        return "fa-bell"
      default:
        return "fa-calendar"
    }
  }

  // Méthode pour naviguer vers le profil
  navigateToProfile(): void {
    this.router.navigate(["/eduprofil"])
  }

  // Méthode pour naviguer vers la page de notifications
  navigateToNotifications(): void {
    this.router.navigate(["/troixieme-interface/notification"])
    this.closeNotificationDropdown()
  }
}