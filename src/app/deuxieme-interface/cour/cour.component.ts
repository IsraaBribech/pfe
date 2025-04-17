import { Component, type OnInit, ViewChild, type ElementRef } from "@angular/core"
import { FormBuilder, type FormGroup, Validators } from "@angular/forms"
import { ActivatedRoute } from "@angular/router"

@Component({
  selector: "app-cour",
  templateUrl: "./cour.component.html",
  styleUrls: ["./cour.component.css"],
})
export class CourComponent implements OnInit {
  // Teacher Information
  id = "T123"
  enseignantName = "Israa Bribech"
  enseignantEmail = "israabribech2002@gmail.com"

  // Statistics
  coursStats = { total: 0 }
  chapitreStats = { total: 0 }
  etudiantStats = { total: 0 }

  // Cours
  cours: any[] = []
  filteredCours: any[] = []
  selectedCour: any = null

  // Paramètres de l'URL
  matiereId: number | null = null
  semestre: number | null = null

  // Informations sur la matière
  matiere: any = null

  // Liste des chapitres
  chapitres: any[] = []

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

  filteredSpecialites: { _id: string; name: string; departement: string }[] = []

  // Filters
  filters = {
    niveau: "",
    specialite: "",
  }
  searchTerm = ""
  activeSemestre = 1 // 1 ou 2

  // Modal
  activeModal: string | null = null

  // Formulaire d'ajout de cours
  courForm!: FormGroup
  chapitreForm!: FormGroup
  editChapitreForm!: FormGroup

  // File inputs
  @ViewChild("courFileInput") courFileInput!: ElementRef
  @ViewChild("fileInput") fileInput!: ElementRef
  @ViewChild("editFileInput") editFileInput!: ElementRef

  // Selected files
  courFile: File | null = null

  // Ajout des propriétés manquantes
  currentMatiere: any = null
  filteredChapitres: any[] = []
  selectedChapitre: any = null
  chapitreToDelete: any = null

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
  ) {
    this.initForm()
  }

  ngOnInit(): void {
    // Récupérer les paramètres de l'URL
    this.route.queryParams.subscribe((params) => {
      this.matiereId = params["matiereId"] ? Number(params["matiereId"]) : null
      this.semestre = params["semestre"] ? Number(params["semestre"]) : null

      if (this.matiereId && this.semestre) {
        this.loadMatiereDetails(this.matiereId)
        this.loadChapitres()
      }

      // Si on a un ID de matière, on peut charger les détails spécifiques
      if (this.matiereId) {
        this.loadMatiereDetails(this.matiereId)
      }

      // Définir le semestre actif
      if (this.semestre) {
        this.activeSemestre = this.semestre
      }
    })

    this.loadMockData()
    this.filteredSpecialites = [...this.specialites]
    this.filterCours()
    this.loadMockChapitres() // Charger les chapitres mock
  }

  // Charger les détails de la matière
  loadMatiereDetails(matiereId: number): void {
    // Simuler le chargement des données depuis une API
    const matieresSemestre1 = [
      { id: 1, nom: "Programmation Web", departement: "Informatique", niveau: "Licence 3", type: "Cours" },
      { id: 2, nom: "Bases de données", departement: "Informatique", niveau: "Licence 2", type: "TD" },
      { id: 3, nom: "Algorithmes", departement: "Informatique", niveau: "Licence 1", type: "TP" },
      { id: 4, nom: "Comptabilité", departement: "Gestion", niveau: "Licence 2", type: "Cours" },
    ]

    const matieresSemestre2 = [
      { id: 5, nom: "Développement Mobile", departement: "Informatique", niveau: "Licence 3", type: "Cours" },
      { id: 6, nom: "Intelligence Artificielle", departement: "Informatique", niveau: "Master 1", type: "TD" },
      { id: 7, nom: "Réseaux", departement: "Informatique", niveau: "Licence 2", type: "TP" },
      { id: 8, nom: "Marketing Digital", departement: "Gestion", niveau: "Licence 3", type: "Cours" },
    ]

    // Sélectionner la liste de matières en fonction du semestre
    const matieres = this.semestre === 1 ? matieresSemestre1 : matieresSemestre2
    // Trouver la matière correspondante
    this.matiere = matieres.find((m) => m.id === this.matiereId)

    console.log("Matière chargée:", this.matiere)
  }

  // Charger les chapitres de la matière
  loadChapitres(): void {
    // Simuler le chargement des chapitres depuis une API
    this.chapitres = [
      {
        id: 1,
        titre: "Introduction",
        description: "Présentation générale du cours et des objectifs",
        dateCreation: new Date("2023-09-10"),
      },
      {
        id: 2,
        titre: "Concepts fondamentaux",
        description: "Les concepts de base et la terminologie essentielle",
        dateCreation: new Date("2023-09-17"),
      },
      {
        id: 3,
        titre: "Applications pratiques",
        description: "Mise en pratique des concepts à travers des exercices",
        dateCreation: new Date("2023-09-24"),
      },
    ]

    console.log("Chapitres chargés:", this.chapitres)
  }

  // Méthode pour charger les détails d'une matière spécifique
  /*loadMatiereDetails(matiereId: number): void {
    // Dans une application réelle, vous feriez un appel API ici
    console.log(`Chargement des détails pour la matière ID: ${matiereId}`)

    // Simuler le chargement des détails
    const matieresSemestre1 = [
      { id: 1, nom: "Programmation Web", departement: "Informatique", niveau: "Licence 3" },
      { id: 2, nom: "Bases de données", departement: "Informatique", niveau: "Licence 2" },
      { id: 3, nom: "Algorithmes", departement: "Informatique", niveau: "Licence 1" },
      { id: 4, nom: "Comptabilité", departement: "Gestion", niveau: "Licence 2" },
    ]

    const matieresSemestre2 = [
      { id: 5, nom: "Développement Mobile", departement: "Informatique", niveau: "Licence 3" },
      { id: 6, nom: "Intelligence Artificielle", departement: "Informatique", niveau: "Master 1" },
      { id: 7, nom: "Réseaux", departement: "Informatique", niveau: "Licence 2" },
      { id: 8, nom: "Marketing Digital", departement: "Gestion", niveau: "Licence 3" },
    ]

    // Trouver la matière dans le semestre approprié
    const allMatieres = [...matieresSemestre1, ...matieresSemestre2]
    const matiere = allMatieres.find((m) => m.id === matiereId)

    if (matiere) {
      console.log(`Matière trouvée: ${matiere.nom}`)
      this.currentMatiere = matiere // Définir la matière courante
    }
  }*/

  initForm(): void {
    // Formulaire pour ajouter un cours (matière)
    this.courForm = this.fb.group({
      title: ["", Validators.required],
      departement: ["", Validators.required],
      niveau: ["", Validators.required],
      specialite: ["", Validators.required],
    })

    // Formulaire pour ajouter un chapitre à une matière avec les nouveaux champs
    this.chapitreForm = this.fb.group({
      titre: ["", Validators.required],
      description: ["", Validators.required],
      fichier: [""],
      numero: ["", Validators.required],
      nombreSeances: ["", Validators.required], // Nombre de séances
      lienClassroom: [""], // Lien Classroom
      contientQuiz: [false], // Contient un quiz
      contientDevoir: [false], // Contient un devoir
    })

    // Formulaire pour modifier un chapitre
    this.editChapitreForm = this.fb.group({
      titre: ["", Validators.required],
      description: ["", Validators.required],
      fichier: [""],
      numero: ["", Validators.required],
      nombreSeances: ["", Validators.required],
      lienClassroom: [""],
      contientQuiz: [false],
      contientDevoir: [false],
    })
  }

  // Méthode pour charger les données mock
  loadMockData(): void {
    // Charger les cours
    this.cours = [
      {
        _id: "c1",
        title: "Introduction à Angular",
        departement: "dep1",
        niveau: "niv3",
        specialite: "spe1",
        description: "Un cours sur les bases du framework Angular",
        teacher: this.id,
        semestre: 1,
        etudiantsCount: 25,
        chapitres: [],
        devoirs: [],
        etudiants: [],
        createdAt: new Date("2023-09-01"),
      },
      {
        _id: "c2",
        title: "Machine Learning avec Python",
        departement: "dep1",
        niveau: "niv4",
        specialite: "spe2",
        description: "Un cours sur les bases du machine learning avec Python et scikit-learn",
        teacher: this.id,
        semestre: 1,
        etudiantsCount: 18,
        chapitres: [],
        devoirs: [],
        etudiants: [],
        createdAt: new Date("2023-10-15"),
      },
      {
        _id: "c3",
        title: "Algèbre linéaire avancée",
        departement: "dep2",
        niveau: "niv4",
        specialite: "spe3",
        description: "Un cours avancé sur l'algèbre linéaire",
        teacher: this.id,
        semestre: 2,
        etudiantsCount: 15,
        chapitres: [],
        devoirs: [],
        etudiants: [],
        createdAt: new Date("2023-11-10"),
      },
      {
        _id: "c4",
        title: "Développement Web Frontend",
        departement: "dep1",
        niveau: "niv3",
        specialite: "spe1",
        description: "Un cours sur le développement web frontend avec HTML, CSS et JavaScript",
        teacher: this.id,
        semestre: 2,
        etudiantsCount: 30,
        chapitres: [],
        devoirs: [],
        etudiants: [],
        createdAt: new Date("2023-12-05"),
      },
    ]

    this.filteredCours = [...this.cours]

    // Mettre à jour les statistiques
    this.coursStats.total = this.cours.length
    this.chapitreStats.total = this.cours.reduce((acc, cour) => acc + (cour.chapitres?.length || 0), 0)
    this.etudiantStats.total = this.cours.reduce((acc, cour) => acc + (cour.etudiantsCount || 0), 0)
  }

  // Méthode pour charger les chapitres mock avec les nouvelles informations
  loadMockChapitres(): void {
    // Simuler le chargement des chapitres
    const chapitres = [
      {
        id: 1,
        titre: "Introduction à Angular",
        numero: 1,
        description: "Ce chapitre présente les concepts de base d'Angular et son architecture.",
        datePublication: new Date("2023-09-10"),
        fichier: "intro-angular.pdf",
        nombreSeances: 2,
        lienClassroom: "https://classroom.google.com/c/abc123",
        contientQuiz: true,
        contientDevoir: false,
      },
      {
        id: 2,
        titre: "Composants et Templates",
        numero: 2,
        description: "Ce chapitre explique comment créer des composants et utiliser les templates en Angular.",
        datePublication: new Date("2023-09-17"),
        fichier: "composants-templates.pdf",
        nombreSeances: 3,
        lienClassroom: "https://classroom.google.com/c/def456",
        contientQuiz: false,
        contientDevoir: true,
      },
      {
        id: 3,
        titre: "Services et Injection de Dépendances",
        numero: 3,
        description: "Ce chapitre couvre les services et le système d'injection de dépendances d'Angular.",
        datePublication: new Date("2023-09-24"),
        fichier: "services-di.pdf",
        nombreSeances: 2,
        lienClassroom: "https://classroom.google.com/c/ghi789",
        contientQuiz: true,
        contientDevoir: true,
      },
    ]

    this.filteredChapitres = [...chapitres]
  }

  onDepartementChange(event: any): void {
    const departementId = event.target.value
    if (!departementId) {
      this.filteredSpecialites = [...this.specialites]
      return
    }

    this.filteredSpecialites = this.specialites.filter((specialite) => specialite.departement === departementId)

    // Réinitialiser la spécialité si elle n'est plus disponible
    if (this.filters.specialite && !this.filteredSpecialites.some((s) => s._id === this.filters.specialite)) {
      this.filters.specialite = ""
    }

    this.filterCours()
  }

  filterCours(): void {
    let filtered = [...this.cours]

    // Filtrer par semestre
    filtered = filtered.filter((cour) => cour.semestre === this.activeSemestre)

    // Appliquer les filtres de niveau et spécialité
    if (this.filters.niveau) {
      filtered = filtered.filter((cour) => cour.niveau === this.filters.niveau)
    }

    if (this.filters.specialite) {
      filtered = filtered.filter((cour) => cour.specialite === this.filters.specialite)
    }

    // Appliquer le filtre de recherche
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase().trim()
      filtered = filtered.filter((cour) => cour.title.toLowerCase().includes(term))
    }

    this.filteredCours = filtered
  }

  // Méthode pour filtrer les chapitres
  filterChapitres(): void {
    if (!this.searchTerm.trim()) {
      this.loadMockChapitres() // Recharger tous les chapitres si la recherche est vide
      return
    }

    const term = this.searchTerm.toLowerCase().trim()
    this.filteredChapitres = this.filteredChapitres.filter(
      (chapitre) => chapitre.titre.toLowerCase().includes(term) || chapitre.description.toLowerCase().includes(term),
    )
  }

  resetFilters(): void {
    this.filters = {
      niveau: "",
      specialite: "",
    }
    this.searchTerm = ""
    this.filterCours()
  }

  changeSemestre(semestre: number): void {
    this.activeSemestre = semestre
    this.filterCours()
  }

  // Méthodes utilitaires
  getDepartementName(id: string): string {
    const departement = this.departements.find((d) => d._id === id)
    return departement ? departement.name : "Non spécifié"
  }

  getNiveauName(id: string): string {
    const niveau = this.niveaux.find((n) => n._id === id)
    return niveau ? niveau.name : "Non spécifié"
  }

  getSpecialiteName(id: string): string {
    const specialite = this.specialites.find((s) => s._id === id)
    return specialite ? specialite.name : "Non spécifié"
  }

  getRandomColor(id: string): string {
    // Générer une couleur pseudo-aléatoire basée sur l'ID du cours
    const colors = [
      "#6366f1", // primary
      "#f59e0b", // secondary
      "#10b981", // success
      "#8b5cf6", // purple
      "#ec4899", // pink
      "#14b8a6", // teal
      "#f97316", // orange
    ]

    // Utiliser la somme des codes de caractères de l'ID pour choisir une couleur
    const sum = id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
    return colors[sum % colors.length]
  }

  // Méthode pour formater les dates
  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  // Méthode pour visualiser un chapitre
  viewChapitre(chapitre: any): void {
    this.selectedChapitre = chapitre
    this.activeModal = "viewChapitre"
  }

  // Méthode pour modifier un chapitre
  editChapitre(chapitre: any): void {
    this.selectedChapitre = chapitre
    this.editChapitreForm.patchValue({
      titre: chapitre.titre,
      description: chapitre.description,
      fichier: chapitre.fichier,
      numero: chapitre.numero,
      nombreSeances: chapitre.nombreSeances,
      lienClassroom: chapitre.lienClassroom,
      contientQuiz: chapitre.contientQuiz,
      contientDevoir: chapitre.contientDevoir,
    })
    this.activeModal = "editChapitre"
  }

  // Méthode pour confirmer la suppression d'un chapitre
  confirmDeleteChapitre(chapitre: any): void {
    this.chapitreToDelete = chapitre
    this.activeModal = "confirmDelete"
  }

  // Méthode pour supprimer un chapitre
  deleteChapitre(): void {
    if (this.chapitreToDelete) {
      // Dans une application réelle, vous feriez un appel API ici
      console.log(`Suppression du chapitre: ${this.chapitreToDelete.titre}`)

      // Simuler la suppression
      this.filteredChapitres = this.filteredChapitres.filter((chapitre) => chapitre.id !== this.chapitreToDelete.id)

      this.hideModal()
      this.chapitreToDelete = null
    }
  }

  // Gestion des modals
  showModal(type: string, matiere?: any): void {
    if (type === "cour") {
      this.activeModal = "cour"
      this.courForm.reset()
    } else if (type === "chapitre") {
      this.activeModal = "chapitre"
      this.selectedCour = matiere
      this.chapitreForm.reset()
    }
  }

  hideModal(): void {
    this.activeModal = null
    this.selectedCour = null
    this.selectedChapitre = null
    this.chapitreToDelete = null
  }

  onCourFileChange(event: Event): void {
    const input = event.target as HTMLInputElement
    if (input.files && input.files.length > 0) {
      this.courFile = input.files[0]
    }
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement
    if (input.files && input.files.length > 0) {
      this.chapitreForm.patchValue({
        fichier: input.files[0].name,
      })
    }
  }

  onEditFileChange(event: Event): void {
    const input = event.target as HTMLInputElement
    if (input.files && input.files.length > 0) {
      this.editChapitreForm.patchValue({
        fichier: input.files[0].name,
      })
    }
  }

  submitCourForm(): void {
    if (this.courForm.valid) {
      // Ici, vous implémenteriez la logique pour envoyer les données au serveur
      console.log("Formulaire de cours soumis:", {
        formData: this.courForm.value,
        file: this.courFile,
      })

      // Fermer le modal après soumission
      this.hideModal()
    }
  }

  submitChapitreForm(): void {
    if (this.chapitreForm.valid) {
      // Ici, vous implémenteriez la logique pour envoyer les données au serveur
      console.log("Formulaire de chapitre soumis:", {
        matiere: this.selectedCour,
        formData: this.chapitreForm.value,
      })

      // Simuler l'ajout d'un nouveau chapitre
      const newChapitre = {
        id: this.filteredChapitres.length + 1,
        titre: this.chapitreForm.value.titre,
        numero: this.chapitreForm.value.numero,
        description: this.chapitreForm.value.description,
        datePublication: new Date(),
        fichier: this.chapitreForm.value.fichier,
        nombreSeances: this.chapitreForm.value.nombreSeances,
        lienClassroom: this.chapitreForm.value.lienClassroom,
        contientQuiz: this.chapitreForm.value.contientQuiz,
        contientDevoir: this.chapitreForm.value.contientDevoir,
      }

      this.filteredChapitres.push(newChapitre)

      // Fermer le modal après soumission
      this.hideModal()
    }
  }

  submitEditChapitreForm(): void {
    if (this.editChapitreForm.valid && this.selectedChapitre) {
      // Dans une application réelle, vous feriez un appel API ici
      console.log("Modification du chapitre:", {
        chapitre: this.selectedChapitre,
        formData: this.editChapitreForm.value,
      })

      // Simuler la mise à jour
      const index = this.filteredChapitres.findIndex((c) => c.id === this.selectedChapitre.id)
      if (index !== -1) {
        const updatedChapitre = {
          ...this.selectedChapitre,
          ...this.editChapitreForm.value,
        }
        this.filteredChapitres[index] = updatedChapitre
      }

      // Fermer le modal après soumission
      this.hideModal()
    }
  }
}
