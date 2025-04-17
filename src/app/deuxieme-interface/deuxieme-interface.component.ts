import { Component, type OnInit, HostListener } from "@angular/core"
import { FormBuilder, type FormGroup, Validators } from "@angular/forms"
import { Router, NavigationEnd, ActivatedRoute } from "@angular/router"
import { Location } from "@angular/common"

interface Notification {
  id: number
  sender: string
  message: string
  time: string
  read: boolean
  avatar?: string
}

@Component({
  selector: "app-deuxieme-interface",
  templateUrl: "./deuxieme-interface.component.html",
  styleUrls: ["./deuxieme-interface.component.css"],
})
export class DeuxiemeInterfaceComponent implements OnInit {
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

  // États du menu
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

  // Formulaires
  courForm!: FormGroup
  devoirForm!: FormGroup
  chapitreForm!: FormGroup
  quizForm!: FormGroup
  messageForm!: FormGroup
  voeuxForm!: FormGroup

  // Données pour les formulaires
  departements: any[] = [
    { _id: "1", name: "Informatique" },
    { _id: "2", name: "Gestion" },
    { _id: "3", name: "Finance" },
  ]

  niveaux: any[] = [
    { _id: "1", name: "Licence 1" },
    { _id: "2", name: "Licence 2" },
    { _id: "3", name: "Licence 3" },
    { _id: "4", name: "Master 1" },
    { _id: "5", name: "Master 2" },
  ]

  specialites: any[] = [
    { _id: "1", name: "Développement Web", departement: "1" },
    { _id: "2", name: "Réseaux", departement: "1" },
    { _id: "3", name: "Comptabilité", departement: "2" },
    { _id: "4", name: "Marketing", departement: "2" },
    { _id: "5", name: "Banque", departement: "3" },
  ]

  filteredSpecialites: any[] = []
  filteredCours: any[] = []

  // Fichiers
  courFile: File | null = null
  devoirFile: File | null = null

  // Matières pour les voeux
  matieres = [
    { id: "1", nom: "Programmation Web" },
    { id: "2", nom: "Bases de données" },
    { id: "3", nom: "Algorithmes" },
    { id: "4", nom: "Réseaux" },
    { id: "5", nom: "Sécurité informatique" },
    { id: "6", nom: "Intelligence artificielle" },
    { id: "7", nom: "Développement mobile" },
    { id: "8", nom: "Systèmes d'exploitation" },
  ]

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
    this.initForms();
    this.updateUnreadCount();
    
    // Initialiser l'état actif en fonction de l'URL actuelle
    this.updateActiveState(this.router.url);
    
    // Vérifier si nous sommes sur une page spécifique au chargement
    if (this.router.url.includes('/cour')) {
      this.showCourSubmenu = true;
      
      // Extraire les paramètres de l'URL pour déterminer quel semestre est actif
      this.route.queryParams.subscribe(params => {
        if (params['semestre']) {
          const semestre = parseInt(params['semestre']);
          if (semestre === 1 || semestre === 2) {
            this.showSemestreSubmenu[semestre] = true;
          }
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

  // Initialisation des formulaires
  initForms(): void {
    this.courForm = this.fb.group({
      title: ["", Validators.required],
      departement: ["", Validators.required],
      niveau: ["", Validators.required],
      specialite: ["", Validators.required],
    });

    this.devoirForm = this.fb.group({
      title: ["", Validators.required],
      departement: ["", Validators.required],
      niveau: ["", Validators.required],
      specialite: ["", Validators.required],
      cour: ["", Validators.required],
      description: ["", Validators.required],
      dueDate: ["", Validators.required],
    });

    this.chapitreForm = this.fb.group({
      cour: ["", Validators.required],
      title: ["", Validators.required],
      content: ["", Validators.required],
    });

    this.quizForm = this.fb.group({
      title: ["", Validators.required],
      cour: ["", Validators.required],
    });

    this.messageForm = this.fb.group({
      recipient: ["", Validators.required],
      subject: ["", Validators.required],
      content: ["", Validators.required],
    });

    this.voeuxForm = this.fb.group({
      semestre: ["1", Validators.required],
      departement: ["", Validators.required],
      specialite: ["", Validators.required],
      niveau: ["", Validators.required],
      matieres: [[], Validators.required],
      commentaire: [""],
    });
  }

  // Afficher un modal
  showModal(modalType: string): void {
    this.activeModal = modalType;
  }

  // Cacher le modal actif
  hideModal(): void {
    this.activeModal = null;
  }

  // Sélectionner un semestre
  selectSemestre(semestre: number): void {
    this.selectedSemestre = semestre;
    this.showMatieresList = true;
  }

  // Retourner à la sélection de semestre
  backToSemestreSelection(): void {
    this.selectedSemestre = null;
    this.showMatieresList = false;
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

  // Gérer le changement de département
  onDepartementChange(event: any): void {
    const departementId = event.target.value;
    this.filteredSpecialites = this.specialites.filter((spec) => spec.departement === departementId);
  }

  // Gérer le changement de fichier pour le cours
  onCourFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.courFile = event.target.files[0];
    }
  }

  // Gérer le changement de fichier pour le devoir
  onDevoirFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.devoirFile = event.target.files[0];
    }
  }

  // Soumettre un formulaire
  submitForm(formType: string): void {
    switch (formType) {
      case "cour":
        if (this.courForm.valid) {
          console.log("Soumission du formulaire de cours:", this.courForm.value);
          // Logique pour soumettre le formulaire
          this.hideModal();
        }
        break;
      case "devoir":
        if (this.devoirForm.valid) {
          console.log("Soumission du formulaire de devoir:", this.devoirForm.value);
          // Logique pour soumettre le formulaire
          this.hideModal();
        }
        break;
      case "chapitre":
        if (this.chapitreForm.valid) {
          console.log("Soumission du formulaire de chapitre:", this.chapitreForm.value);
          // Logique pour soumettre le formulaire
          this.hideModal();
        }
        break;
      case "quiz":
        if (this.quizForm.valid) {
          console.log("Soumission du formulaire de quiz:", this.quizForm.value);
          // Logique pour soumettre le formulaire
          this.hideModal();
        }
        break;
      case "message":
        if (this.messageForm.valid) {
          console.log("Soumission du formulaire de message:", this.messageForm.value);
          // Logique pour soumettre le formulaire
          this.hideModal();
        }
        break;
      case "voeux":
        if (this.voeuxForm.valid) {
          console.log("Soumission du formulaire de voeux:", this.voeuxForm.value);
          // Logique pour soumettre le formulaire
          this.hideModal();
        }
        break;
    }
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
}