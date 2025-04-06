import { Component, type OnInit } from "@angular/core"
import { Router } from "@angular/router"

interface Notification {
  id: string
  type: "message" | "info" | "warning"
  title: string
  content: string
  time: string
  read: boolean
}

@Component({
  selector: "app-notification",
  templateUrl: "./notification.component.html",
  styleUrls: ["./notification.component.css"],
})
export class NotificationComponent implements OnInit {
  showNotifications = false
  activeTab: "all" | "unread" = "all"

  notifications: Notification[] = [
    {
      id: "1",
      type: "info",
      title: "Mise à jour du système",
      content: "Une nouvelle version de la base de données est disponible jusqu'au 15 novembre.",
      time: "Il y a 5 heures",
      read: false,
    },
    {
      id: "2",
      type: "message",
      title: "Nouveau message",
      content: "Dr. Martin Dupont vous a envoyé un message concernant votre dernier TP.",
      time: "Il y a 1 jour",
      read: false,
    },
    {
      id: "3",
      type: "warning",
      title: "Maintenance planifiée",
      content: "EduSpace sera en maintenance le 20 novembre de 2h à 4h du matin.",
      time: "Il y a 2 jours",
      read: true,
    },
  ]

  constructor(private router: Router) {}

  ngOnInit(): void {}

  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications
  }

  changeTab(tab: "all" | "unread"): void {
    this.activeTab = tab
  }

  markAllAsRead(): void {
    this.notifications.forEach((notification) => {
      notification.read = true
    })
  }

  markAsRead(notification: Notification): void {
    notification.read = true
  }

  getUnreadCount(): number {
    return this.notifications.filter((notification) => !notification.read).length
  }

  getFilteredNotifications(): Notification[] {
    if (this.activeTab === "unread") {
      return this.notifications.filter((notification) => !notification.read)
    }
    return this.notifications
  }

  // Méthode pour naviguer vers la page des messages
  viewAllNotifications(): void {
    this.showNotifications = false
    this.router.navigate(["/troixieme-interface/message-envoyer"])
  }
}

