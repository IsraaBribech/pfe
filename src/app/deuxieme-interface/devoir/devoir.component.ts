import { Component, type OnInit, ViewChild, type ElementRef, HostListener } from "@angular/core"
import { FormBuilder, type FormGroup, Validators } from "@angular/forms"
import { Router } from "@angular/router"

interface Student {
  id: string
  name: string
  group: string
  hasResponded: boolean
  submissionDate?: Date
  score?: number
  file?: string
  fileName?: string
  feedback?: string
}

interface Devoir {
  id: string
  title: string
  description: string
  subject: string
  type: "TD" | "TP" | "Cours" // Type de devoir
  createdAt: Date
  dueDate: Date
  isActive: boolean
  file?: string
  fileName?: string
  students?: Student[]
  responseCount?: number
}

// Interface pour les matières
interface Matiere {
  id: string;
  nom: string;
  niveau: string;
  type: "Cours" | "TD" | "TP";
}

// Ajouter l'interface Notification
interface Notification {
  id: number
  sender: string
  message: string
  time: string
  read: boolean
  avatar?: string
}

@Component({
  selector: "app-devoir",
  templateUrl: "./devoir.component.html",
  styleUrls: ["./devoir.component.css"],
})
export class DevoirComponent implements OnInit {
  // Informations de l'enseignant
  enseignantName = "Israa Bribech"
  enseignantEmail = "israabribech2002@gmail.com"

  // États des modales
  showDevoirModal = false
  showStudentModal = false
  showResponseModal = false
  showPdfPreviewModal = false
  editMode = false

  // Données
  devoirs: Devoir[] = []
  filteredDevoirs: Devoir[] = []
  selectedDevoir: Devoir | null = null
  selectedStudent: Student | null = null
  previewFile: string | null = null
  previewFileName: string | null = null

  // Filtres
  searchTerm = ""
  subjectFilter = ""
  typeFilter = ""

  // Propriétés pour les sous-menus
  showCourSubmenu = false
  showSemestreSubmenu: { [key: number]: boolean } = { 1: false, 2: false }
  
  // Matières pour les semestres
  matieresSemestre1: Matiere[] = [
    { id: "m1", nom: "Programmation Web", niveau: "L3", type: "Cours" },
    { id: "m2", nom: "Programmation Web", niveau: "L3", type: "TD" },
    { id: "m3", nom: "Programmation Web", niveau: "L3", type: "TP" },
    { id: "m4", nom: "Bases de données", niveau: "L3", type: "Cours" },
    { id: "m5", nom: "Bases de données", niveau: "L3", type: "TD" },
    { id: "m6", nom: "Bases de données", niveau: "L3", type: "TP" },
  ]
  
  matieresSemestre2: Matiere[] = [
    { id: "m7", nom: "Intelligence Artificielle", niveau: "L3", type: "Cours" },
    { id: "m8", nom: "Intelligence Artificielle", niveau: "L3", type: "TD" },
    { id: "m9", nom: "Intelligence Artificielle", niveau: "L3", type: "TP" },
    { id: "m10", nom: "Réseaux", niveau: "L3", type: "Cours" },
    { id: "m11", nom: "Réseaux", niveau: "L3", type: "TD" },
    { id: "m12", nom: "Réseaux", niveau: "L3", type: "TP" },
  ]

  // Ajouter les propriétés de notification
  showNotifications = false
  notifications: Notification[] = [
    {
      id: 1,
      sender: "Ahmed Benali",
      message: "J'ai soumis mon devoir de programmation web",
      time: "Il y a 10 minutes",
      read: false,
      avatar: "A",
    },
    {
      id: 2,
      sender: "Fatima Zahra",
      message: "Question concernant le TP de bases de données",
      time: "Il y a 30 minutes",
      read: false,
      avatar: "F",
    },
    {
      id: 3,
      sender: "Mohamed Tazi",
      message: "Demande de rendez-vous pour discuter du projet",
      time: "Il y a 2 heures",
      read: false,
      avatar: "M",
    },
    {
      id: 4,
      sender: "Leila Kadiri",
      message: "Confirmation de présence pour la séance de rattrapage",
      time: "Il y a 5 heures",
      read: true,
      avatar: "L",
    },
    {
      id: 5,
      sender: "Karim Alaoui",
      message: "Problème avec l'accès au quiz en ligne",
      time: "Hier",
      read: true,
      avatar: "K",
    },
    {
      id: 6,
      sender: "Yasmine Berrada",
      message: "Demande d'extension pour le délai du devoir",
      time: "Hier",
      read: true,
      avatar: "Y",
    },
    {
      id: 7,
      sender: "Omar Idrissi",
      message: "Question sur le chapitre 3 du cours",
      time: "Il y a 2 jours",
      read: true,
      avatar: "O",
    },
    {
      id: 8,
      sender: "Nour El Houda",
      message: "Partage d'un article intéressant lié au cours",
      time: "Il y a 3 jours",
      read: true,
      avatar: "N",
    },
  ]
  messageStats = {
    unread: 0,
  }

  // Formulaires
  devoirForm!: FormGroup

  // Fichier
  @ViewChild("fileInput") fileInput!: ElementRef
  selectedFile: File | null = null

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.initializeForm()
    this.loadMockData()
    this.filterDevoirs()
    this.updateUnreadCount() // Ajouter l'initialisation du compteur de notifications
  }

  // Méthodes pour gérer les sous-menus
  toggleCourSubmenu(event: Event): void {
    event.stopPropagation();
    this.showCourSubmenu = !this.showCourSubmenu;
    
    // Fermer les sous-menus de semestre si on ferme le menu cours
    if (!this.showCourSubmenu) {
      this.showSemestreSubmenu = { 1: false, 2: false };
    }
  }
  
  toggleSemestreSubmenu(event: Event, semestre: number): void {
    event.stopPropagation();
    this.showSemestreSubmenu[semestre] = !this.showSemestreSubmenu[semestre];
  }
  
  navigateToMatiere(event: Event, matiereId: string, semestre: number): void {
    event.stopPropagation();
    // Naviguer vers la page de la matière
    this.router.navigate(['/matiere', matiereId, semestre]);
  }

  // Ajouter les méthodes de gestion des notifications
  // Fermer les notifications quand on clique ailleurs
  @HostListener("document:click", ["$event"])
  clickOutside(event: Event): void {
    const notificationIcon = document.querySelector(".notification-icon")
    const notificationDropdown = document.querySelector(".notification-dropdown")

    if (notificationIcon && notificationDropdown) {
      if (!notificationIcon.contains(event.target as Node) && !notificationDropdown.contains(event.target as Node)) {
        this.showNotifications = false
      }
    }
  }

  // Basculer l'affichage des notifications
  toggleNotifications(event: Event): void {
    event.stopPropagation()
    this.showNotifications = !this.showNotifications
  }

  // Marquer une notification comme lue
  markAsRead(notification: Notification): void {
    notification.read = true
    this.updateUnreadCount()
  }

  // Marquer toutes les notifications comme lues
  markAllAsRead(): void {
    this.notifications.forEach((notification) => {
      notification.read = true
    })
    this.updateUnreadCount()
  }

  // Mettre à jour le compteur de messages non lus
  updateUnreadCount(): void {
    this.messageStats.unread = this.notifications.filter((n) => !n.read).length
  }

  // Supprimer une notification
  deleteNotification(id: number, event: Event): void {
    event.stopPropagation()
    this.notifications = this.notifications.filter((n) => n.id !== id)
    this.updateUnreadCount()
  }

  // Initialiser le formulaire
  private initializeForm(): void {
    this.devoirForm = this.fb.group({
      title: ["", Validators.required],
      description: ["", Validators.required],
      subject: ["", Validators.required],
      type: ["Cours", Validators.required], // Type de devoir avec valeur par défaut
      dueDate: ["", Validators.required],
      file: [""],
    })
  }

  // Méthodes pour le filtrage
  filterDevoirs(): void {
    this.filteredDevoirs = this.devoirs.filter((devoir) => {
      // Filtre par recherche
      if (
        this.searchTerm &&
        !devoir.title.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
        !devoir.description.toLowerCase().includes(this.searchTerm.toLowerCase())
      ) {
        return false
      }

      // Filtre par matière
      if (this.subjectFilter && devoir.subject !== this.subjectFilter) {
        return false
      }

      // Filtre par type
      if (this.typeFilter && devoir.type !== this.typeFilter) {
        return false
      }

      return true
    })
  }

  resetFilters(): void {
    this.searchTerm = ""
    this.subjectFilter = ""
    this.typeFilter = ""
    this.filterDevoirs()
  }

  // Méthodes pour charger les données
  loadMockData(): void {
    // Générer des données de devoirs fictives
    const subjects = ["Programmation Web", "Bases de données", "Algorithmes", "Intelligence Artificielle", "Réseaux"]
    const groups = ["G1.1", "G1.2", "G1.3", "G2.1", "G2.2", "G2.3"]
    const types: ("TD" | "TP" | "Cours")[] = ["TD", "TP", "Cours"]

    // Générer des étudiants fictifs
    const generateStudents = (count: number, responseRate: number): Student[] => {
      const students: Student[] = []
      const firstNames = ["Mohamed", "Ahmed", "Fatima", "Aisha", "Omar", "Ali", "Nour", "Leila", "Karim", "Yasmine"]
      const lastNames = [
        "Ben Ali",
        "Trabelsi",
        "Bouazizi",
        "Mansouri",
        "Jebali",
        "Riahi",
        "Mejri",
        "Gharbi",
        "Chaabane",
        "Zouari",
      ]

      for (let i = 0; i < count; i++) {
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
        const group = groups[Math.floor(Math.random() * groups.length)]
        const hasResponded = Math.random() < responseRate

        students.push({
          id: `S${i + 100}`,
          name: `${firstName} ${lastName}`,
          group,
          hasResponded,
          submissionDate: hasResponded ? new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000) : undefined,
          score: hasResponded ? Math.floor(Math.random() * 41) + 60 : undefined, // Score entre 60 et 100
          file: hasResponded ? "devoir-file.pdf" : undefined,
          fileName: hasResponded ? `devoir_${firstName.toLowerCase()}_${lastName.toLowerCase()}.pdf` : undefined,
          feedback: hasResponded ? "Bon travail, mais quelques améliorations possibles." : undefined,
        })
      }

      return students
    }

    // Générer des devoirs
    for (let i = 0; i < 6; i++) {
      const subject = subjects[Math.floor(Math.random() * subjects.length)]
      const isActive = Math.random() > 0.3
      const studentCount = Math.floor(Math.random() * 20) + 15 // Entre 15 et 35 étudiants
      const responseRate = Math.random() * 0.6 + 0.2 // Entre 20% et 80%
      const students = generateStudents(studentCount, responseRate)
      const devoirType = types[Math.floor(Math.random() * types.length)]

      this.devoirs.push({
        id: `devoir-${i + 1}`,
        title: `Devoir ${i + 1}: ${subject}`,
        description: `Description du devoir sur ${subject}. Ce devoir couvre les concepts fondamentaux de la matière.`,
        subject,
        type: devoirType,
        createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000), // Dans les 30 derniers jours
        dueDate: isActive
          ? new Date(Date.now() + Math.random() * 14 * 24 * 60 * 60 * 1000) // Dans les 14 prochains jours
          : new Date(Date.now() - Math.random() * 14 * 24 * 60 * 60 * 1000), // Dans les 14 derniers jours
        isActive,
        file: Math.random() > 0.3 ? "devoir-file.pdf" : undefined,
        fileName: Math.random() > 0.3 ? `devoir_${i + 1}_${subject.toLowerCase().replace(/\s+/g, "_")}.pdf` : undefined,
        students,
        responseCount: students.filter((s) => s.hasResponded).length,
      })
    }
  }

  // Méthodes pour gérer les modales
  openDevoirModal(devoir?: Devoir): void {
    if (devoir) {
      // Mode édition
      this.editMode = true
      this.selectedDevoir = devoir
      this.loadDevoirForEdit(devoir)
    } else {
      // Mode création
      this.editMode = false
      this.selectedDevoir = null
      this.devoirForm.reset({
        title: "",
        description: "",
        subject: "",
        type: "Cours",
        dueDate: this.formatDateForInput(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)), // +7 jours par défaut
      })
      this.selectedFile = null
    }

    this.showDevoirModal = true
  }

  closeDevoirModal(): void {
    this.showDevoirModal = false
  }

  openStudentModal(devoir: Devoir): void {
    this.selectedDevoir = devoir
    this.showStudentModal = true
  }

  closeStudentModal(): void {
    this.showStudentModal = false
  }

  openResponseModal(student: Student): void {
    this.selectedStudent = student
    this.showResponseModal = true
  }

  closeResponseModal(): void {
    this.showResponseModal = false
  }

  // Nouvelle méthode pour ouvrir la modale d'aperçu PDF
  openPdfPreviewModal(file: string, fileName: string): void {
    this.previewFile = file
    this.previewFileName = fileName
    this.showPdfPreviewModal = true
  }

  // Nouvelle méthode pour fermer la modale d'aperçu PDF
  closePdfPreviewModal(): void {
    this.showPdfPreviewModal = false
    this.previewFile = null
    this.previewFileName = null
  }

  loadDevoirForEdit(devoir: Devoir): void {
    this.devoirForm.patchValue({
      title: devoir.title,
      description: devoir.description,
      subject: devoir.subject,
      type: devoir.type,
      dueDate: this.formatDateForInput(devoir.dueDate),
    })
  }

  // Méthodes pour les actions sur les devoirs
  submitDevoir(): void {
    if (this.devoirForm.invalid) {
      // Marquer tous les champs comme touchés pour afficher les erreurs
      Object.keys(this.devoirForm.controls).forEach((key) => {
        const control = this.devoirForm.get(key)
        control?.markAsTouched()
      })
      return
    }

    const formValue = this.devoirForm.value

    if (this.editMode && this.selectedDevoir) {
      // Mettre à jour un devoir existant
      const updatedDevoir: Devoir = {
        ...this.selectedDevoir,
        title: formValue.title,
        description: formValue.description,
        subject: formValue.subject,
        type: formValue.type,
        dueDate: new Date(formValue.dueDate),
        file: this.selectedFile ? this.selectedFile.name : this.selectedDevoir.file,
        fileName: this.selectedFile ? this.selectedFile.name : this.selectedDevoir.fileName,
      }

      // Mettre à jour le devoir dans la liste
      const index = this.devoirs.findIndex((q) => q.id === this.selectedDevoir?.id)
      if (index !== -1) {
        this.devoirs[index] = updatedDevoir
      }
    } else {
      // Créer un nouveau devoir
      const newDevoir: Devoir = {
        id: `devoir-${this.devoirs.length + 1}`,
        title: formValue.title,
        description: formValue.description,
        subject: formValue.subject,
        type: formValue.type,
        createdAt: new Date(),
        dueDate: new Date(formValue.dueDate),
        isActive: true,
        file: this.selectedFile ? this.selectedFile.name : undefined,
        fileName: this.selectedFile ? this.selectedFile.name : undefined,
        students: [],
        responseCount: 0,
      }

      this.devoirs.push(newDevoir)
    }

    // Filtrer les devoirs
    this.filterDevoirs()
    this.closeDevoirModal()
  }

  deleteDevoir(devoir: Devoir): void {
    if (confirm(`Êtes-vous sûr de vouloir supprimer le devoir "${devoir.title}" ?`)) {
      const index = this.devoirs.findIndex((q) => q.id === devoir.id)
      if (index !== -1) {
        this.devoirs.splice(index, 1)
        this.filterDevoirs()
      }
    }
  }

  // Gestion des fichiers
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0]
    }
  }

  downloadFile(file: string, fileName: string): void {
    // Dans une application réelle, ceci déclencherait un téléchargement
    console.log(`Téléchargement du fichier: ${fileName}`)
    alert(`Téléchargement du fichier: ${fileName}`)
  }

  // Méthodes utilitaires
  formatDate(date: Date | undefined): string {
    if (!date) return "-"
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  formatDateForInput(date: Date): string {
    return date.toISOString().split("T")[0]
  }

  getUniqueSubjects(): string[] {
    const subjects = new Set<string>()
    this.devoirs.forEach((devoir) => subjects.add(devoir.subject))
    return Array.from(subjects).sort()
  }

  getResponseRate(devoir: Devoir): number {
    if (!devoir.students || devoir.students.length === 0) return 0
    return Math.round(((devoir.responseCount || 0) / devoir.students.length) * 100)
  }

  getTypeClass(type: string): string {
    switch (type) {
      case "Cours":
        return "cours"
      case "TD":
        return "td"
      case "TP":
        return "tp"
      default:
        return ""
    }
  }

  // Navigation vers les autres pages
  navigateTo(route: string): void {
    this.router.navigate([`/deuxieme-interface/${route}`])
  }
}