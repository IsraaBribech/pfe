import { Component, type OnInit, HostListener } from "@angular/core"
import { FormBuilder, type FormGroup, type FormArray, Validators, FormControl } from "@angular/forms"
import { Router, NavigationEnd, ActivatedRoute } from "@angular/router"
import { Location } from "@angular/common"

interface Matiere {
  id: string
  nom: string
  departement: string
  specialite: string
  niveau: string
  credits: number
  heures: number
}

interface Notification {
  id: number
  sender: string
  message: string
  time: string
  read: boolean
  avatar?: string
}

@Component({
  selector: "app-voeux",
  templateUrl: "./voeux.component.html",
  styleUrls: ["./voeux.component.css"],
})
export class VoeuxComponent implements OnInit {
  // Informations de l'enseignant
  enseignantName = "Israa Bribech"
  enseignantEmail = "israabribech2002@gmail.com"
  enseignantCIN = "12345678"
  departement = "Informatique"
  specialite = "Développement Web"
  grade = "Professeur"
  experience = "15"

  // Statistiques
  coursStats = {
    total: 12,
    active: 8,
    draft: 4,
  }

  chapitreStats = {
    total: 45,
    published: 40,
    draft: 5,
  }

  devoirStats = {
    total: 18,
    pending: 5,
    graded: 13,
  }

  quizStats = {
    total: 10,
    active: 6,
    completed: 4,
  }

  messageStats = {
    total: 24,
    unread: 8,
    sent: 16,
  }

  voeuxStats = {
    total: 3,
    approved: 2,
    pending: 1,
  }

  // Formulaires pour les semestres
  semestre1Form!: FormGroup
  semestre2Form!: FormGroup

  // Liste des matières disponibles
  matieres: Matiere[] = []

  // Liste des matières déjà attribuées (non disponibles)
  unavailableMatieres: string[] = ["m2", "m5", "m8", "m11", "m14"]

  // Filtres
  filteredMatieresSemestre1: Matiere[] = []
  filteredMatieresSemestre2: Matiere[] = []

  // Départements, Niveaux et Spécialités
  departements = [
    { _id: "dep1", name: "Informatique" },
    { _id: "dep2", name: "Mathématiques" },
    { _id: "dep3", name: "Physique" },
  ]

  niveaux = [
    { _id: "niv1", name: "Licence 1" },
    { _id: "niv2", name: "Licence 2" },
    { _id: "niv3", name: "Licence 3" },
    { _id: "niv4", name: "Master 1" },
    { _id: "niv5", name: "Master 2" },
  ]

  specialites = [
    { _id: "spe1", name: "Développement Web", departement: "dep1" },
    { _id: "spe2", name: "Intelligence Artificielle", departement: "dep1" },
    { _id: "spe3", name: "Algèbre", departement: "dep2" },
    { _id: "spe4", name: "Analyse", departement: "dep2" },
    { _id: "spe5", name: "Mécanique Quantique", departement: "dep3" },
  ]

  // Statut de soumission
  semestre1Submitted = false
  semestre2Submitted = false

  // Onglet actif
  activeTab: "semestre1" | "semestre2" = "semestre1"

  // Notifications
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

  // Modal actif
  activeModal: string | null = null

  // Semestre sélectionné
  selectedSemestre: number | null = null

  // États du menu - tous fermés par défaut
  showCourSubmenu = false
  showSemestreSubmenu: { [key: number]: boolean } = { 1: false, 2: false }

  // Matières par semestre avec ajout du type (Cours, TD, TP)
  matieresSemestre1 = [
    { id: 1, nom: "Programmation Web", departement: "Informatique", niveau: "Licence 3", type: "Cours", icon: "code" },
    { id: 2, nom: "Bases de données", departement: "Informatique", niveau: "Licence 2", type: "TD", icon: "database" },
    { id: 3, nom: "Algorithmes", departement: "Informatique", niveau: "Licence 1", type: "TP", icon: "microchip" },
    { id: 4, nom: "Comptabilité", departement: "Gestion", niveau: "Licence 2", type: "Cours", icon: "file-invoice" },
  ]

  matieresSemestre2 = [
    {
      id: 5,
      nom: "Développement Mobile",
      departement: "Informatique",
      niveau: "Licence 3",
      type: "Cours",
      icon: "mobile-alt",
    },
    {
      id: 6,
      nom: "Intelligence Artificielle",
      departement: "Informatique",
      niveau: "Master 1",
      type: "TD",
      icon: "brain",
    },
    { id: 7, nom: "Réseaux", departement: "Informatique", niveau: "Licence 2", type: "TP", icon: "network-wired" },
    { id: 8, nom: "Marketing Digital", departement: "Gestion", niveau: "Licence 3", type: "Cours", icon: "chart-line" },
  ]

  // Afficher la liste des matières
  showMatieresList = false

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {
    // Écouter les événements de navigation pour mettre à jour l'état actif
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateActiveState(event.url);
      }
    });
  }

  ngOnInit(): void {
    this.loadMockData();
    this.initForms();
    this.updateUnreadCount();
    
    // Initialiser l'état actif en fonction de l'URL actuelle
    this.updateActiveState(this.router.url);
    
    // Vérifier si nous sommes sur une page spécifique au chargement
    // Mais ne pas ouvrir automatiquement les menus
    if (this.router.url.includes('/cour')) {
      // Ne pas ouvrir automatiquement le menu Cours
      // this.showCourSubmenu = true;
      
      // Extraire les paramètres de l'URL pour déterminer quel semestre est actif
      // Mais ne pas ouvrir automatiquement les sous-menus
      this.route.queryParams.subscribe(params => {
        if (params['semestre']) {
          const semestre = parseInt(params['semestre']);
          // Ne pas ouvrir automatiquement les sous-menus de semestre
          // if (semestre === 1 || semestre === 2) {
          //   this.showSemestreSubmenu[semestre] = true;
          // }
        }
      });
    }
  }

  // Mettre à jour l'état actif en fonction de l'URL
  updateActiveState(url: string): void {
    // Réinitialiser les états des sous-menus si on n'est pas sur la page correspondante
    if (!url.includes('/cour')) {
      this.showCourSubmenu = false;
      this.showSemestreSubmenu = { 1: false, 2: false };
    }
  }

  // Fermer les notifications quand on clique ailleurs
  @HostListener("document:click", ["$event"])
  clickOutside(event: Event): void {
    const notificationIcon = document.querySelector(".notification-icon");
    const notificationDropdown = document.querySelector(".notification-dropdown");

    if (notificationIcon && notificationDropdown) {
      if (!notificationIcon.contains(event.target as Node) && !notificationDropdown.contains(event.target as Node)) {
        this.showNotifications = false;
      }
    }
  }

  // Basculer l'affichage des notifications
  toggleNotifications(event: Event): void {
    event.stopPropagation();
    this.showNotifications = !this.showNotifications;
  }

  // Marquer une notification comme lue
  markAsRead(notification: Notification): void {
    notification.read = true;
    this.updateUnreadCount();
  }

  // Marquer toutes les notifications comme lues
  markAllAsRead(): void {
    this.notifications.forEach((notification) => {
      notification.read = true;
    });
    this.updateUnreadCount();
  }

  // Mettre à jour le compteur de messages non lus
  updateUnreadCount(): void {
    this.messageStats.unread = this.notifications.filter((n) => !n.read).length;
  }

  // Supprimer une notification
  deleteNotification(id: number, event: Event): void {
    event.stopPropagation();
    this.notifications = this.notifications.filter((n) => n.id !== id);
    this.updateUnreadCount();
  }

  // Méthode pour basculer l'affichage du sous-menu Cours
  toggleCourSubmenu(event: Event): void {
    event.stopPropagation(); // Empêcher la propagation de l'événement
    this.showCourSubmenu = !this.showCourSubmenu;

    // Fermer les sous-menus de semestre si on ferme le menu cours
    if (!this.showCourSubmenu) {
      this.showSemestreSubmenu = { 1: false, 2: false };
    }
  }

  // Méthode pour basculer l'affichage du sous-menu Semestre
  toggleSemestreSubmenu(event: Event, semestre: number): void {
    event.stopPropagation(); // Empêcher la propagation de l'événement
    this.showSemestreSubmenu[semestre] = !this.showSemestreSubmenu[semestre];
  }

  // Naviguer vers la page de cours pour une matière spécifique
  navigateToMatiere(event: Event, matiereId: number, semestre: number): void {
    event.stopPropagation(); // Empêcher la propagation de l'événement
    console.log(`Navigating to matiere: ${matiereId}, semestre: ${semestre}`);
    this.router.navigate(["/cour"], {
      queryParams: {
        matiereId: matiereId,
        semestre: semestre,
      },
    });
  }

  // Méthode pour obtenir la couleur de fond selon le type de cours
  getCoursColor(type: string): string {
    switch (type) {
      case "Cours":
        return "#6366f1";
      case "TD":
        return "#f59e0b";
      case "TP":
        return "#10b981";
      default:
        return "#6366f1";
    }
  }

  loadMockData(): void {
    // Charger les matières disponibles
    this.matieres = [
      {
        id: "m1",
        nom: "Programmation Web",
        departement: "dep1",
        specialite: "spe1",
        niveau: "niv2",
        credits: 6,
        heures: 42,
      },
      {
        id: "m2",
        nom: "Bases de données",
        departement: "dep1",
        specialite: "spe1",
        niveau: "niv2",
        credits: 6,
        heures: 42,
      },
      {
        id: "m3",
        nom: "Algorithmes avancés",
        departement: "dep1",
        specialite: "spe1",
        niveau: "niv3",
        credits: 4,
        heures: 36,
      },
      {
        id: "m4",
        nom: "Intelligence artificielle",
        departement: "dep1",
        specialite: "spe2",
        niveau: "niv4",
        credits: 6,
        heures: 48,
      },
      {
        id: "m5",
        nom: "Machine Learning",
        departement: "dep1",
        specialite: "spe2",
        niveau: "niv4",
        credits: 6,
        heures: 48,
      },
      {
        id: "m6",
        nom: "Algèbre linéaire",
        departement: "dep2",
        specialite: "spe3",
        niveau: "niv1",
        credits: 6,
        heures: 42,
      },
      {
        id: "m7",
        nom: "Algèbre avancée",
        departement: "dep2",
        specialite: "spe3",
        niveau: "niv3",
        credits: 4,
        heures: 36,
      },
      {
        id: "m8",
        nom: "Analyse réelle",
        departement: "dep2",
        specialite: "spe4",
        niveau: "niv2",
        credits: 6,
        heures: 42,
      },
      {
        id: "m9",
        nom: "Équations différentielles",
        departement: "dep2",
        specialite: "spe4",
        niveau: "niv3",
        credits: 4,
        heures: 36,
      },
      {
        id: "m10",
        nom: "Mécanique quantique fondamentale",
        departement: "dep3",
        specialite: "spe5",
        niveau: "niv3",
        credits: 6,
        heures: 48,
      },
      {
        id: "m11",
        nom: "Physique statistique",
        departement: "dep3",
        specialite: "spe5",
        niveau: "niv4",
        credits: 4,
        heures: 36,
      },
      {
        id: "m12",
        nom: "Programmation orientée objet",
        departement: "dep1",
        specialite: "spe1",
        niveau: "niv2",
        credits: 6,
        heures: 42,
      },
      {
        id: "m13",
        nom: "Réseaux informatiques",
        departement: "dep1",
        specialite: "spe1",
        niveau: "niv3",
        credits: 4,
        heures: 36,
      },
      {
        id: "m14",
        nom: "Deep Learning",
        departement: "dep1",
        specialite: "spe2",
        niveau: "niv5",
        credits: 6,
        heures: 48,
      },
      {
        id: "m15",
        nom: "Traitement du signal",
        departement: "dep3",
        specialite: "spe5",
        niveau: "niv3",
        credits: 4,
        heures: 36,
      },
    ]

    // Initialiser les matières filtrées
    this.filteredMatieresSemestre1 = [...this.matieres]
    this.filteredMatieresSemestre2 = [...this.matieres]
  }

  initForms(): void {
    // Initialiser le formulaire pour le semestre 1
    this.semestre1Form = this.fb.group({
      departement: [""],
      specialite: [""],
      niveau: [""],
      matieres: this.fb.array([]),
    })

    // Initialiser le formulaire pour le semestre 2
    this.semestre2Form = this.fb.group({
      departement: [""],
      specialite: [""],
      niveau: [""],
      matieres: this.fb.array([]),
    })

    // Ajouter des écouteurs pour les changements de valeurs
    this.semestre1Form.get("departement")?.valueChanges.subscribe((value) => {
      this.onDepartementChange(1, value)
    })

    this.semestre1Form.get("specialite")?.valueChanges.subscribe(() => {
      this.filterMatieres(1)
    })

    this.semestre1Form.get("niveau")?.valueChanges.subscribe(() => {
      this.filterMatieres(1)
    })

    this.semestre2Form.get("departement")?.valueChanges.subscribe((value) => {
      this.onDepartementChange(2, value)
    })

    this.semestre2Form.get("specialite")?.valueChanges.subscribe(() => {
      this.filterMatieres(2)
    })

    this.semestre2Form.get("niveau")?.valueChanges.subscribe(() => {
      this.filterMatieres(2)
    })
  }

  setActiveTab(tab: "semestre1" | "semestre2"): void {
    this.activeTab = tab
  }

  onDepartementChange(semestre: number, departementId: string): void {
    // Filtrer les spécialités en fonction du département sélectionné
    const filteredSpecialites = departementId
      ? this.specialites.filter((s) => s.departement === departementId)
      : this.specialites

    // Réinitialiser la spécialité si elle n'est plus valide
    const form = semestre === 1 ? this.semestre1Form : this.semestre2Form
    const currentSpecialite = form.get("specialite")?.value

    if (currentSpecialite) {
      const isValid = filteredSpecialites.some((s) => s._id === currentSpecialite)
      if (!isValid) {
        form.get("specialite")?.setValue("")
      }
    }

    // Filtrer les matières
    this.filterMatieres(semestre)
  }

  filterMatieres(semestre: number): void {
    const form = semestre === 1 ? this.semestre1Form : this.semestre2Form
    const departement = form.get("departement")?.value
    const specialite = form.get("specialite")?.value
    const niveau = form.get("niveau")?.value

    let filtered = [...this.matieres]

    if (departement) {
      filtered = filtered.filter((m) => m.departement === departement)
    }

    if (specialite) {
      filtered = filtered.filter((m) => m.specialite === specialite)
    }

    if (niveau) {
      filtered = filtered.filter((m) => m.niveau === niveau)
    }

    if (semestre === 1) {
      this.filteredMatieresSemestre1 = filtered
    } else {
      this.filteredMatieresSemestre2 = filtered
    }
  }

  toggleMatiere(semestre: number, matiere: Matiere): void {
    const form = semestre === 1 ? this.semestre1Form : this.semestre2Form
    const matieresArray = form.get("matieres") as FormArray

    // Vérifier si la matière est déjà sélectionnée
    const index = matieresArray.controls.findIndex((control) => control.get("id")?.value === matiere.id)

    if (index >= 0) {
      // Si la matière est déjà sélectionnée, la supprimer
      matieresArray.removeAt(index)
    } else {
      // Sinon, l'ajouter avec le nouveau champ typeSeance
      matieresArray.push(
        this.fb.group({
          id: [matiere.id],
          nom: [matiere.nom],
          credits: [matiere.credits],
          heures: [matiere.heures],
          commentaire: [""],
          typeSeance: ["Cours"] // Valeur par défaut pour le type de séance
        }),
      )
    }
  }

  // Méthode pour gérer le changement de type de séance
  onTypeSeanceChange(event: Event, semestre: number, index: number): void {
    const selectElement = event.target as HTMLSelectElement;
    if (selectElement) {
      const value = selectElement.value;
      this.updateTypeSeance(semestre, index, value);
    }
  }

  // Mettre à jour le type de séance
  updateTypeSeance(semestre: number, index: number, value: string): void {
    const form = semestre === 1 ? this.semestre1Form : this.semestre2Form
    const matieresArray = form.get("matieres") as FormArray
    const matiereGroup = matieresArray.at(index) as FormGroup
    matiereGroup.get("typeSeance")?.setValue(value)
  }

  // Vérifier si une matière est indisponible (déjà attribuée)
  isUnavailable(matiereId: string): boolean {
    return this.unavailableMatieres.includes(matiereId)
  }

  // Calculer les points en fonction des heures
  calculatePoints(heures: number): number {
    // Formule simple: 1 point pour 3 heures de cours
    return Math.ceil(heures / 3)
  }

  // Méthodes pour gérer la priorité des matières
  moveUp(semestre: number, index: number): void {
    if (index <= 0) return;

    const form = semestre === 1 ? this.semestre1Form : this.semestre2Form
    const matieresArray = form.get("matieres") as FormArray
    
    // Échanger avec l'élément précédent
    const temp = matieresArray.at(index - 1).value
    matieresArray.at(index - 1).patchValue(matieresArray.at(index).value)
    matieresArray.at(index).patchValue(temp)
  }

  moveDown(semestre: number, index: number): void {
    const form = semestre === 1 ? this.semestre1Form : this.semestre2Form
    const matieresArray = form.get("matieres") as FormArray
    
    if (index >= matieresArray.length - 1) return
    
    // Échanger avec l'élément suivant
    const temp = matieresArray.at(index + 1).value
    matieresArray.at(index + 1).patchValue(matieresArray.at(index).value)
    matieresArray.at(index).patchValue(temp)
  }

  updateCommentaire(semestre: number, index: number, value: string): void {
    const form = semestre === 1 ? this.semestre1Form : this.semestre2Form
    const matieresArray = form.get("matieres") as FormArray
    const matiereGroup = matieresArray.at(index) as FormGroup
    matiereGroup.get("commentaire")?.setValue(value)
  }

  isSelected(semestre: number, matiereId: string): boolean {
    const form = semestre === 1 ? this.semestre1Form : this.semestre2Form
    const matieresArray = form.get("matieres") as FormArray

    return matieresArray.controls.some((control) => control.get("id")?.value === matiereId)
  }

  getMatieresControls(semestre: number): FormGroup[] {
    const form = semestre === 1 ? this.semestre1Form : this.semestre2Form
    return (form.get("matieres") as FormArray).controls as FormGroup[]
  }

  getDepartementName(id: string): string {
    const dept = this.departements.find((d) => d._id === id)
    return dept ? dept.name : ""
  }

  getSpecialiteName(id: string): string {
    const specialite = this.specialites.find((s) => s._id === id)
    return specialite ? specialite.name : ""
  }

  getNiveauName(id: string): string {
    const niveau = this.niveaux.find((n) => n._id === id)
    return niveau ? niveau.name : ""
  }

  getMatiereById(id: string): Matiere | undefined {
    return this.matieres.find((m) => m.id === id)
  }

  getTotalCredits(semestre: number): number {
    const form = semestre === 1 ? this.semestre1Form : this.semestre2Form
    const matieresArray = form.get("matieres") as FormArray

    return matieresArray.controls.reduce((total, control) => total + (control.get("credits")?.value || 0), 0)
  }

  getTotalHeures(semestre: number): number {
    const form = semestre === 1 ? this.semestre1Form : this.semestre2Form
    const matieresArray = form.get("matieres") as FormArray

    return matieresArray.controls.reduce((total, control) => total + (control.get("heures")?.value || 0), 0)
  }

  getTotalPoints(semestre: number): number {
    const form = semestre === 1 ? this.semestre1Form : this.semestre2Form
    const matieresArray = form.get("matieres") as FormArray

    return matieresArray.controls.reduce(
      (total, control) => total + this.calculatePoints(control.get("heures")?.value || 0), 
      0
    )
  }

  submitVoeux(semestre: number): void {
    const form = semestre === 1 ? this.semestre1Form : this.semestre2Form

    if ((form.get("matieres") as FormArray).length > 0) {
      // Vérifier que le total des points ne dépasse pas 16
      if (this.getTotalPoints(semestre) > 16) {
        alert("Le total des points ne doit pas dépasser 16.")
        return
      }

      // Dans une implémentation réelle, vous enverriez ces données à une API
      console.log(`Voeux pour le semestre ${semestre} soumis:`, form.value)

      // Marquer comme soumis
      if (semestre === 1) {
        this.semestre1Submitted = true
      } else {
        this.semestre2Submitted = true
      }
    } else {
      // Afficher un message d'erreur
      alert("Veuillez sélectionner au moins une matière.")
    }
  }

  resetForm(semestre: number): void {
    if (semestre === 1) {
      this.semestre1Form.get("departement")?.setValue("")
      this.semestre1Form.get("specialite")?.setValue("")
      this.semestre1Form.get("niveau")?.setValue("")
      ;(this.semestre1Form.get("matieres") as FormArray).clear()
      this.semestre1Submitted = false
    } else {
      this.semestre2Form.get("departement")?.setValue("")
      this.semestre2Form.get("specialite")?.setValue("")
      this.semestre2Form.get("niveau")?.setValue("")
      ;(this.semestre2Form.get("matieres") as FormArray).clear()
      this.semestre2Submitted = false
    }
  }

  // Afficher un modal
  showModal(modalType: string): void {
    this.activeModal = modalType;
  }

  // Cacher le modal actif
  hideModal(): void {
    this.activeModal = null;
  }
}
