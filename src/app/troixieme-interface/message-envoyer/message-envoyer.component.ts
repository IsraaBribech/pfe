import { Component, type OnInit, ViewEncapsulation, HostListener } from "@angular/core"
import { Router } from "@angular/router"

interface Message {
  id: string
  expediteur: "etudiant" | "enseignant"
  nomExpediteur: string
  avatarExpediteur: string
  destinataire: string
  matiere: string
  sujet: string
  contenu: string
  dateEnvoi: Date
  lu: boolean
  reponses?: Message[]
}

interface Matiere {
  id: string
  nom: string
  enseignant: string
  couleur: string
  icon: string
}

interface Notification {
  id: number
  type: "cours" | "devoir" | "quiz"
  title: string
  message: string
  date: Date
  read: boolean
}

@Component({
  selector: "app-message-envoyer",
  templateUrl: "./message-envoyer.component.html",
  styleUrls: ["./message-envoyer.component.css"],
  encapsulation: ViewEncapsulation.None, // Désactive l'encapsulation des styles
})
export class MessageEnvoyerComponent implements OnInit {
  // Informations de l'étudiant
  etudiantName = "Israa Bribech"
  etudiantEmail = "israabribech2002@gmail.com"
  etudiantMatricule = "E12345"

  // Onglet actif
  activeTab: "recus" | "envoyes" | "nouveau" = "recus"

  // Matière sélectionnée pour le nouveau message
  selectedMatiere: Matiere | null = null

  // Message sélectionné
  selectedMessage: Message | null = null

  // Nouveau message
  nouveauMessage = {
    sujet: "",
    contenu: "",
    matiere: "",
  }

  // État d'envoi
  isSubmitting = false
  messageEnvoye = false

  // Recherche
  searchTerm = ""

  // Notifications
  notifications: Notification[] = []
  showNotificationDropdown = false

  // Liste des matières (12 matières au lieu de 6)
  matieres: Matiere[] = [
    {
      id: "m1",
      nom: "Programmation Web",
      enseignant: "Dr. Martin Dupont",
      couleur: "#6366f1",
      icon: "fa-code",
    },
    {
      id: "m2",
      nom: "Bases de données",
      enseignant: "Prof. Sophie Laurent",
      couleur: "#f59e0b",
      icon: "fa-database",
    },
    {
      id: "m3",
      nom: "Algorithmes avancés",
      enseignant: "Dr. Jean Petit",
      couleur: "#10b981",
      icon: "fa-sitemap",
    },
    {
      id: "m4",
      nom: "Intelligence artificielle",
      enseignant: "Prof. Marie Leroy",
      couleur: "#8b5cf6",
      icon: "fa-brain",
    },
    {
      id: "m5",
      nom: "Machine Learning",
      enseignant: "Dr. Thomas Bernard",
      couleur: "#ec4899",
      icon: "fa-robot",
    },
    {
      id: "m6",
      nom: "Algèbre linéaire",
      enseignant: "Prof. Claire Dubois",
      couleur: "#ef4444",
      icon: "fa-square-root-alt",
    },
    // Nouvelles matières ajoutées (6 de plus)
    {
      id: "m7",
      nom: "Réseaux informatiques",
      enseignant: "Dr. Philippe Martin",
      couleur: "#0ea5e9",
      icon: "fa-network-wired",
    },
    {
      id: "m8",
      nom: "Cybersécurité",
      enseignant: "Prof. Nathalie Blanc",
      couleur: "#14b8a6",
      icon: "fa-shield-alt",
    },
    {
      id: "m9",
      nom: "Développement mobile",
      enseignant: "Dr. Antoine Rousseau",
      couleur: "#f97316",
      icon: "fa-mobile-alt",
    },
    {
      id: "m10",
      nom: "Systèmes d'exploitation",
      enseignant: "Prof. Isabelle Moreau",
      couleur: "#84cc16",
      icon: "fa-laptop-code",
    },
    {
      id: "m11",
      nom: "Architecture des ordinateurs",
      enseignant: "Dr. François Lemoine",
      couleur: "#a855f7",
      icon: "fa-microchip",
    },
    {
      id: "m12",
      nom: "Analyse de données",
      enseignant: "Prof. Émilie Durand",
      couleur: "#06b6d4",
      icon: "fa-chart-bar",
    },
  ]

  // Liste des messages reçus
  messagesRecus: Message[] = [
    {
      id: "msg1",
      expediteur: "enseignant",
      nomExpediteur: "Dr. Martin Dupont",
      avatarExpediteur: "MD",
      destinataire: "Ahmed Benali",
      matiere: "Programmation Web",
      sujet: "Retour sur votre dernier TP",
      contenu:
        "Bonjour Ahmed,\n\nJ'ai examiné votre dernier TP sur les frameworks JavaScript. Votre travail est très prometteur, mais j'aimerais que vous approfondissiez la partie sur les hooks React.\n\nN'hésitez pas à me contacter si vous avez des questions.\n\nCordialement,\nDr. Martin Dupont",
      dateEnvoi: new Date(2023, 9, 15, 14, 30),
      lu: true,
    },
    {
      id: "msg2",
      expediteur: "enseignant",
      nomExpediteur: "Prof. Sophie Laurent",
      avatarExpediteur: "SL",
      destinataire: "Ahmed Benali",
      matiere: "Bases de données",
      sujet: "Préparation à l'examen final",
      contenu:
        "Cher Ahmed,\n\nL'examen final approche rapidement. Je vous recommande de revoir particulièrement les chapitres sur les jointures SQL et la normalisation des bases de données.\n\nUne séance de révision est prévue le 20 novembre à 14h en salle B204.\n\nBien cordialement,\nProf. Sophie Laurent",
      dateEnvoi: new Date(2023, 10, 10, 9, 15),
      lu: false,
    },
    {
      id: "msg3",
      expediteur: "enseignant",
      nomExpediteur: "Dr. Jean Petit",
      avatarExpediteur: "JP",
      destinataire: "Ahmed Benali",
      matiere: "Algorithmes avancés",
      sujet: "Documentation pour le projet final",
      contenu:
        "Bonjour Ahmed,\n\nJe vous envoie les ressources supplémentaires pour vous aider dans votre projet final sur les algorithmes de graphes.\n\nVous trouverez ci-joint plusieurs articles scientifiques qui pourront vous être utiles.\n\nN'hésitez pas à me contacter si vous avez besoin d'aide.\n\nCordialement,\nDr. Jean Petit",
      dateEnvoi: new Date(2023, 10, 5, 16, 45),
      lu: true,
    },
  ]

  // Liste des messages envoyés
  messagesEnvoyes: Message[] = [
    {
      id: "msg4",
      expediteur: "etudiant",
      nomExpediteur: "Ahmed Benali",
      avatarExpediteur: "AB",
      destinataire: "Dr. Martin Dupont",
      matiere: "Programmation Web",
      sujet: "Question sur le TP React",
      contenu:
        "Bonjour Dr. Dupont,\n\nJ'ai une question concernant l'utilisation des hooks dans React. Je n'arrive pas à comprendre comment utiliser useEffect correctement pour les appels API.\n\nPourriez-vous m'éclairer sur ce point ?\n\nMerci d'avance,\nAhmed Benali",
      dateEnvoi: new Date(2023, 9, 12, 10, 20),
      lu: true,
      reponses: [
        {
          id: "msg1",
          expediteur: "enseignant",
          nomExpediteur: "Dr. Martin Dupont",
          avatarExpediteur: "MD",
          destinataire: "Ahmed Benali",
          matiere: "Programmation Web",
          sujet: "Re: Question sur le TP React",
          contenu:
            "Bonjour Ahmed,\n\nPour les appels API avec useEffect, il est important de comprendre le tableau de dépendances. Voici un exemple :\n\n```jsx\nuseEffect(() => {\n  // Votre code d'appel API ici\n  fetch('https://api.example.com/data')\n    .then(response => response.json())\n    .then(data => setData(data));\n}, []);\n```\n\nLe tableau vide [] signifie que l'effet ne s'exécutera qu'une seule fois après le premier rendu.\n\nJ'espère que cela vous aide. N'hésitez pas à me poser d'autres questions.\n\nCordialement,\nDr. Martin Dupont",
          dateEnvoi: new Date(2023, 9, 13, 14, 30),
          lu: true,
        },
      ],
    },
    {
      id: "msg5",
      expediteur: "etudiant",
      nomExpediteur: "Ahmed Benali",
      avatarExpediteur: "AB",
      destinataire: "Prof. Sophie Laurent",
      matiere: "Bases de données",
      sujet: "Demande de rendez-vous",
      contenu:
        "Bonjour Professeur Laurent,\n\nJ'aimerais solliciter un rendez-vous avec vous pour discuter de mon projet de base de données. J'ai quelques difficultés avec la conception du schéma relationnel.\n\nSeriez-vous disponible la semaine prochaine ?\n\nCordialement,\nAhmed Benali",
      dateEnvoi: new Date(2023, 10, 8, 11, 45),
      lu: true,
    },
  ]

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Charger les notifications
    this.loadNotifications()
  }

  // Écouteur d'événement pour fermer le dropdown quand on clique ailleurs
  @HostListener("document:click", ["$event"])
  onDocumentClick(event: MouseEvent): void {
    // Vérifier si le clic est en dehors du dropdown
    const target = event.target as HTMLElement
    if (!target.closest(".notification-btn") && !target.closest(".notification-dropdown")) {
      this.closeNotificationDropdown()
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
        read: false,
      },
      {
        id: 2,
        type: "devoir",
        title: "Nouveau devoir assigné",
        message: 'Un nouveau devoir "Implémentation d\'un algorithme de tri" a été assigné.',
        date: yesterday,
        read: false,
      },
      {
        id: 3,
        type: "quiz",
        title: "Nouveau quiz disponible",
        message: 'Un nouveau quiz sur "Les réseaux de neurones" est maintenant disponible.',
        date: yesterday,
        read: false,
      },
    ]
  }

  // Méthode pour afficher/masquer le dropdown de notifications
  toggleNotificationDropdown(event?: MouseEvent): void {
    if (event) {
      event.stopPropagation()
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
    return this.notifications.filter((n) => !n.read).length
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

  // Changer d'onglet
  changeTab(tab: "recus" | "envoyes" | "nouveau"): void {
    this.activeTab = tab
    this.selectedMessage = null
  }

  // Sélectionner un message
  selectMessage(message: Message): void {
    this.selectedMessage = message

    // Marquer comme lu si c'est un message reçu
    if (message.expediteur === "enseignant" && !message.lu) {
      message.lu = true
    }
  }

  // Revenir à la liste des messages
  backToMessages(): void {
    this.selectedMessage = null
  }

  // Sélectionner une matière pour un nouveau message
  selectMatiere(matiere: Matiere): void {
    this.selectedMatiere = matiere
    this.nouveauMessage.matiere = matiere.id
  }

  // Envoyer un nouveau message
  envoyerMessage(): void {
    if (!this.nouveauMessage.sujet || !this.nouveauMessage.contenu || !this.nouveauMessage.matiere) {
      return
    }

    this.isSubmitting = true

    // Simuler un délai d'envoi
    setTimeout(() => {
      const matiere = this.matieres.find((m) => m.id === this.nouveauMessage.matiere)

      if (matiere) {
        const nouveauMsg: Message = {
          id: "msg" + (this.messagesEnvoyes.length + this.messagesRecus.length + 1),
          expediteur: "etudiant",
          nomExpediteur: this.etudiantName,
          avatarExpediteur: "AB",
          destinataire: matiere.enseignant,
          matiere: matiere.nom,
          sujet: this.nouveauMessage.sujet,
          contenu: this.nouveauMessage.contenu,
          dateEnvoi: new Date(),
          lu: false,
        }

        this.messagesEnvoyes.unshift(nouveauMsg)
        this.messageEnvoye = true
        this.isSubmitting = false

        // Réinitialiser le formulaire après 2 secondes
        setTimeout(() => {
          this.nouveauMessage = {
            sujet: "",
            contenu: "",
            matiere: "",
          }
          this.selectedMatiere = null
          this.messageEnvoye = false
          this.changeTab("envoyes")
        }, 2000)
      }
    }, 1500)
  }

  // Répondre à un message
  repondreMessage(message: Message, reponse: string): void {
    if (!reponse.trim()) {
      return
    }

    this.isSubmitting = true

    // Simuler un délai d'envoi
    setTimeout(() => {
      const nouvelleReponse: Message = {
        id: "msg" + (this.messagesEnvoyes.length + this.messagesRecus.length + 1),
        expediteur: "etudiant",
        nomExpediteur: this.etudiantName,
        avatarExpediteur: "AB",
        destinataire: message.nomExpediteur,
        matiere: message.matiere,
        sujet: "Re: " + message.sujet,
        contenu: reponse,
        dateEnvoi: new Date(),
        lu: false,
      }

      // Ajouter la réponse au message original
      if (!message.reponses) {
        message.reponses = []
      }
      message.reponses.push(nouvelleReponse)

      // Ajouter également aux messages envoyés
      this.messagesEnvoyes.unshift(nouvelleReponse)

      this.isSubmitting = false
    }, 1000)
  }

  // Formater la date
  formatDate(date: Date): string {
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // Formater le contenu du message
  formatMessageContent(content: string): string {
    return content.replace(/\n/g, "<br>")
  }

  // Formater le contenu
  formatContent(content: string): string {
    return content.replace(/\n/g, "<br>")
  }

  // Obtenir les messages filtrés par recherche
  getFilteredMessages(messages: Message[]): Message[] {
    if (!this.searchTerm.trim()) {
      return messages
    }

    const term = this.searchTerm.toLowerCase()
    return messages.filter(
      (msg) =>
        msg.sujet.toLowerCase().includes(term) ||
        msg.contenu.toLowerCase().includes(term) ||
        msg.matiere.toLowerCase().includes(term) ||
        msg.nomExpediteur.toLowerCase().includes(term),
    )
  }

  // Vérifier si un message est non lu
  isUnread(message: Message): boolean {
    return message.expediteur === "enseignant" && !message.lu
  }

  // Obtenir le nombre de messages non lus
  getUnreadCount(): number {
    return this.messagesRecus.filter((msg) => !msg.lu).length
  }
}
