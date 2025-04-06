import { Component, type OnInit } from "@angular/core"

interface Devoir {
  id: string
  titre: string
  description: string
  dateLimite: Date
  fichierConsigne: string
  soumis: boolean
  dateCreation: Date
  note?: number
  commentaire?: string
  fichierSoumis?: string
  dateSoumission?: Date
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
  devoirs: Devoir[]
}

@Component({
  selector: "app-devoir-realiser",
  templateUrl: "./devoir-realiser.component.html",
  styleUrls: ["./devoir-realiser.component.css"],
})
export class DevoirRealiserComponent implements OnInit {
replaceSpaces(arg0: string) {
throw new Error('Method not implemented.')
}
  // Informations de l'étudiant
  etudiantName = "Israa Bribech"
  etudiantEmail = "israabribech2002@gmail.com"
  etudiantMatricule = "E12345"

  // Onglet actif
  activeSemester: "semestre1" | "semestre2" = "semestre1"

  // Matière sélectionnée
  selectedMatiere: Matiere | null = null

  // Devoir sélectionné pour soumission
  selectedDevoir: Devoir | null = null

  // Fichier à soumettre
  fichierAEnvoyer: File | null = null

  // Message de confirmation
  confirmationMessage = ""

  // État de soumission
  isSubmitting = false

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
      devoirs: [
        {
          id: "d1m1",
          titre: "Création d'une page web responsive",
          description: "Développer une page web responsive en utilisant HTML, CSS et JavaScript.",
          dateLimite: new Date(2023, 9, 15),
          fichierConsigne: "assets/devoirs/prog-web/devoir1.pdf",
          soumis: false,
          dateCreation: new Date(2023, 8, 5),
        },
        {
          id: "d2m1",
          titre: "Intégration d'une API REST",
          description: "Créer une application web qui consomme une API REST et affiche les données.",
          dateLimite: new Date(2023, 10, 10),
          fichierConsigne: "assets/devoirs/prog-web/devoir2.pdf",
          soumis: true,
          dateCreation: new Date(2023, 9, 20),
          dateSoumission: new Date(2023, 10, 5),
          fichierSoumis: "assets/soumissions/prog-web/devoir2.pdf",
          note: 16,
          commentaire: "Excellent travail, bonne utilisation des promesses et gestion des erreurs.",
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
      devoirs: [
        {
          id: "d1m2",
          titre: "Modélisation d'une base de données",
          description: "Concevoir un modèle entité-association pour un système de gestion de bibliothèque.",
          dateLimite: new Date(2023, 9, 20),
          fichierConsigne: "assets/devoirs/bdd/devoir1.pdf",
          soumis: true,
          dateCreation: new Date(2023, 8, 10),
          dateSoumission: new Date(2023, 9, 18),
          fichierSoumis: "assets/soumissions/bdd/devoir1.pdf",
          note: 14,
          commentaire: "Bon travail, mais quelques relations pourraient être optimisées.",
        },
        {
          id: "d2m2",
          titre: "Requêtes SQL avancées",
          description: "Écrire des requêtes SQL complexes pour extraire des informations spécifiques.",
          dateLimite: new Date(2023, 10, 15),
          fichierConsigne: "assets/devoirs/bdd/devoir2.pdf",
          soumis: false,
          dateCreation: new Date(2023, 9, 25),
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
      devoirs: [
        {
          id: "d1m3",
          titre: "Implémentation d'algorithmes de tri",
          description: "Implémenter et comparer les performances de différents algorithmes de tri.",
          dateLimite: new Date(2023, 9, 25),
          fichierConsigne: "assets/devoirs/algo/devoir1.pdf",
          soumis: true,
          dateCreation: new Date(2023, 8, 15),
          dateSoumission: new Date(2023, 9, 22),
          fichierSoumis: "assets/soumissions/algo/devoir1.pdf",
          note: 18,
          commentaire: "Excellent travail d'analyse et d'implémentation.",
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
      devoirs: [
        {
          id: "d1m4",
          titre: "Implémentation d'un algorithme de recherche",
          description: "Implémenter l'algorithme A* pour résoudre un problème de recherche de chemin.",
          dateLimite: new Date(2023, 10, 5),
          fichierConsigne: "assets/devoirs/ia/devoir1.pdf",
          soumis: false,
          dateCreation: new Date(2023, 9, 1),
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
      devoirs: [
        {
          id: "d1m5",
          titre: "Classification d'images",
          description: "Développer un modèle de classification d'images en utilisant des réseaux de neurones.",
          dateLimite: new Date(2023, 10, 10),
          fichierConsigne: "assets/devoirs/ml/devoir1.pdf",
          soumis: false,
          dateCreation: new Date(2023, 9, 5),
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
      devoirs: [
        {
          id: "d1m6",
          titre: "Résolution de systèmes linéaires",
          description: "Résoudre des systèmes d'équations linéaires en utilisant différentes méthodes.",
          dateLimite: new Date(2023, 9, 30),
          fichierConsigne: "assets/devoirs/algebre/devoir1.pdf",
          soumis: true,
          dateCreation: new Date(2023, 8, 20),
          dateSoumission: new Date(2023, 9, 28),
          fichierSoumis: "assets/soumissions/algebre/devoir1.pdf",
          note: 15,
          commentaire: "Bon travail, mais quelques erreurs dans la méthode de Gauss-Jordan.",
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
      devoirs: [
        {
          id: "d1m7",
          titre: "Méthodes d'intégration numérique",
          description: "Implémenter et comparer différentes méthodes d'intégration numérique.",
          dateLimite: new Date(2023, 10, 5),
          fichierConsigne: "assets/devoirs/analyse/devoir1.pdf",
          soumis: false,
          dateCreation: new Date(2023, 9, 10),
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
      devoirs: [
        {
          id: "d1m8",
          titre: "Configuration d'un réseau local",
          description: "Configurer un réseau local virtuel avec différentes sous-réseaux.",
          dateLimite: new Date(2023, 10, 15),
          fichierConsigne: "assets/devoirs/reseaux/devoir1.pdf",
          soumis: false,
          dateCreation: new Date(2023, 9, 15),
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
      devoirs: [
        {
          id: "d1m9",
          titre: "Analyse de vulnérabilités",
          description: "Identifier et analyser les vulnérabilités d'une application web.",
          dateLimite: new Date(2023, 10, 20),
          fichierConsigne: "assets/devoirs/securite/devoir1.pdf",
          soumis: false,
          dateCreation: new Date(2023, 9, 20),
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
      devoirs: [
        {
          id: "d1m10",
          titre: "Création d'une application mobile",
          description: "Développer une application mobile simple avec React Native.",
          dateLimite: new Date(2023, 10, 25),
          fichierConsigne: "assets/devoirs/mobile/devoir1.pdf",
          soumis: false,
          dateCreation: new Date(2023, 9, 25),
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
      devoirs: [
        {
          id: "d1m11",
          titre: "Planification de projet",
          description: "Élaborer un plan de projet complet pour un développement logiciel.",
          dateLimite: new Date(2023, 10, 30),
          fichierConsigne: "assets/devoirs/gestion/devoir1.pdf",
          soumis: false,
          dateCreation: new Date(2023, 9, 30),
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
      devoirs: [
        {
          id: "d1m12",
          titre: "Rédaction technique en anglais",
          description: "Rédiger un rapport technique en anglais sur un sujet informatique.",
          dateLimite: new Date(2023, 11, 5),
          fichierConsigne: "assets/devoirs/anglais/devoir1.pdf",
          soumis: false,
          dateCreation: new Date(2023, 10, 5),
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
      devoirs: [
        {
          id: "d1m13",
          titre: "Application React",
          description: "Développer une application web complète avec React et Redux.",
          dateLimite: new Date(2024, 2, 15),
          fichierConsigne: "assets/devoirs/frameworks/devoir1.pdf",
          soumis: false,
          dateCreation: new Date(2024, 1, 15),
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
      devoirs: [
        {
          id: "d1m14",
          titre: "API RESTful avec Node.js",
          description: "Créer une API RESTful complète avec Node.js et Express.",
          dateLimite: new Date(2024, 2, 20),
          fichierConsigne: "assets/devoirs/backend/devoir1.pdf",
          soumis: false,
          dateCreation: new Date(2024, 1, 20),
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
      devoirs: [
        {
          id: "d1m15",
          titre: "Conception d'architecture microservices",
          description: "Concevoir une architecture microservices pour une application e-commerce.",
          dateLimite: new Date(2024, 2, 25),
          fichierConsigne: "assets/devoirs/architecture/devoir1.pdf",
          soumis: false,
          dateCreation: new Date(2024, 1, 25),
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
      devoirs: [
        {
          id: "d1m16",
          titre: "Pipeline CI/CD",
          description: "Mettre en place un pipeline CI/CD complet pour une application web.",
          dateLimite: new Date(2024, 3, 1),
          fichierConsigne: "assets/devoirs/devops/devoir1.pdf",
          soumis: false,
          dateCreation: new Date(2024, 2, 1),
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
      devoirs: [
        {
          id: "d1m17",
          titre: "Déploiement sur AWS",
          description: "Déployer une application web sur AWS en utilisant différents services.",
          dateLimite: new Date(2024, 3, 5),
          fichierConsigne: "assets/devoirs/cloud/devoir1.pdf",
          soumis: false,
          dateCreation: new Date(2024, 2, 5),
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
      devoirs: [
        {
          id: "d1m18",
          titre: "Analyse statistique de données",
          description: "Réaliser une analyse statistique complète d'un jeu de données.",
          dateLimite: new Date(2024, 3, 10),
          fichierConsigne: "assets/devoirs/stats/devoir1.pdf",
          soumis: false,
          dateCreation: new Date(2024, 2, 10),
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
      devoirs: [
        {
          id: "d1m19",
          titre: "Visualisation de données",
          description: "Créer des visualisations interactives pour un jeu de données complexe.",
          dateLimite: new Date(2024, 3, 15),
          fichierConsigne: "assets/devoirs/analyse-donnees/devoir1.pdf",
          soumis: false,
          dateCreation: new Date(2024, 2, 15),
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
      devoirs: [
        {
          id: "d1m20",
          titre: "Smart Contract Ethereum",
          description: "Développer et déployer un smart contract sur la blockchain Ethereum.",
          dateLimite: new Date(2024, 3, 20),
          fichierConsigne: "assets/devoirs/blockchain/devoir1.pdf",
          soumis: false,
          dateCreation: new Date(2024, 2, 20),
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
      devoirs: [
        {
          id: "d1m21",
          titre: "Conception d'interface utilisateur",
          description: "Concevoir une interface utilisateur complète pour une application mobile.",
          dateLimite: new Date(2024, 3, 25),
          fichierConsigne: "assets/devoirs/ux-ui/devoir1.pdf",
          soumis: false,
          dateCreation: new Date(2024, 2, 25),
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
      devoirs: [
        {
          id: "d1m22",
          titre: "Proposition de projet",
          description: "Rédiger une proposition détaillée pour le projet de fin d'études.",
          dateLimite: new Date(2024, 3, 30),
          fichierConsigne: "assets/devoirs/projet/devoir1.pdf",
          soumis: false,
          dateCreation: new Date(2024, 2, 30),
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
      devoirs: [
        {
          id: "d1m23",
          titre: "Étude de cas éthique",
          description: "Analyser un cas éthique lié aux technologies de l'information.",
          dateLimite: new Date(2024, 4, 5),
          fichierConsigne: "assets/devoirs/ethique/devoir1.pdf",
          soumis: false,
          dateCreation: new Date(2024, 3, 5),
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
      devoirs: [
        {
          id: "d1m24",
          titre: "Présentation technique",
          description: "Préparer et enregistrer une présentation technique sur un sujet informatique.",
          dateLimite: new Date(2024, 4, 10),
          fichierConsigne: "assets/devoirs/communication/devoir1.pdf",
          soumis: false,
          dateCreation: new Date(2024, 3, 10),
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
    this.selectedDevoir = null // Réinitialiser le devoir sélectionné
    this.confirmationMessage = "" // Réinitialiser le message de confirmation
  }

  // Méthode pour sélectionner une matière
  selectMatiere(matiere: Matiere): void {
    this.selectedMatiere = matiere
    this.selectedDevoir = null // Réinitialiser le devoir sélectionné
    this.confirmationMessage = "" // Réinitialiser le message de confirmation
  }

  // Méthode pour revenir à la liste des matières
  backToMatieres(): void {
    this.selectedMatiere = null
    this.selectedDevoir = null // Réinitialiser le devoir sélectionné
    this.confirmationMessage = "" // Réinitialiser le message de confirmation
  }

  // Méthode pour sélectionner un devoir pour soumission
  selectDevoir(devoir: Devoir): void {
    this.selectedDevoir = devoir
    this.fichierAEnvoyer = null // Réinitialiser le fichier à envoyer
    this.confirmationMessage = "" // Réinitialiser le message de confirmation
  }

  // Méthode pour revenir à la liste des devoirs
  backToDevoirs(): void {
    this.selectedDevoir = null
    this.fichierAEnvoyer = null // Réinitialiser le fichier à envoyer
    this.confirmationMessage = "" // Réinitialiser le message de confirmation
  }

  // Méthode pour gérer le fichier sélectionné
  onFileSelected(event: any): void {
    const file = event.target.files[0]
    if (file) {
      // Vérifier le type de fichier (PDF ou image)
      if (file.type === "application/pdf" || file.type.startsWith("image/")) {
        this.fichierAEnvoyer = file
      } else {
        alert("Veuillez sélectionner un fichier PDF ou une image.")
        event.target.value = "" // Réinitialiser l'input file
      }
    }
  }

  // Méthode pour soumettre un devoir
  soumettreDevoir(): void {
    if (!this.fichierAEnvoyer) {
      alert("Veuillez sélectionner un fichier à soumettre.")
      return
    }

    this.isSubmitting = true

    // Simuler un délai de soumission
    setTimeout(() => {
      if (this.selectedDevoir && this.selectedMatiere) {
        // Dans une application réelle, vous enverriez le fichier à un serveur
        console.log("Soumission du devoir:", {
          matiere: this.selectedMatiere.nom,
          devoir: this.selectedDevoir.titre,
          fichier: this.fichierAEnvoyer,
          email: this.etudiantEmail,
          date: new Date(),
        })

        // Mettre à jour l'état du devoir
        this.selectedDevoir.soumis = true
        this.selectedDevoir.dateSoumission = new Date()
        if (this.fichierAEnvoyer) {
          this.selectedDevoir.fichierSoumis = URL.createObjectURL(this.fichierAEnvoyer)
        }

        // Afficher un message de confirmation
        this.confirmationMessage = "Votre devoir a été soumis avec succès !"

        this.isSubmitting = false
      }
    }, 2000)
  }

  // Méthode pour formater les dates
  formatDate(date: Date): string {
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  // Méthode pour vérifier si un devoir est en retard
  isLate(devoir: Devoir): boolean {
    const today = new Date()
    return !devoir.soumis && today > devoir.dateLimite
  }

  // Méthode pour vérifier si un devoir est proche de la date limite
  isCloseToDeadline(devoir: Devoir): boolean {
    const today = new Date()
    const diffTime = devoir.dateLimite.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return !devoir.soumis && diffDays <= 3 && diffDays > 0
  }

  // Méthode pour obtenir la taille du fichier (simulée)
  getFileSize(fichier: string): string {
    // Simuler une taille de fichier entre 1 et 5 Mo
    const size = Math.floor(Math.random() * 4) + 1
    return `${size} Mo`
  }

  // Méthode pour obtenir le nombre de jours restants
  getJoursRestants(dateLimite: Date): number {
    const today = new Date()
    const diffTime = dateLimite.getTime() - today.getTime()
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }
}