import { Component, type OnInit, ViewChild, type ElementRef } from "@angular/core"
import { FormBuilder, type FormGroup, Validators } from "@angular/forms"

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
    departement: "",
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

  // File inputs
  @ViewChild("courFileInput") courFileInput!: ElementRef

  // Selected files
  courFile: File | null = null

  constructor(private fb: FormBuilder) {
    this.initForm()
  }

  ngOnInit(): void {
    this.loadMockData()
    this.filteredSpecialites = [...this.specialites]
    this.filterCours()
  }

  initForm(): void {
    // Formulaire pour ajouter un cours (matière)
    this.courForm = this.fb.group({
      title: ["", Validators.required],
      departement: ["", Validators.required],
      niveau: ["", Validators.required],
      specialite: ["", Validators.required],
    })

    // Formulaire pour ajouter un chapitre à une matière
    this.chapitreForm = this.fb.group({
      titre: ["", Validators.required],
      chapitre: ["", Validators.required],
      description: ["", Validators.required],
      fichier: [""],
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

    // Appliquer les filtres de département, niveau et spécialité
    if (this.filters.departement) {
      filtered = filtered.filter((cour) => cour.departement === this.filters.departement)
    }

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

  resetFilters(): void {
    this.filters = {
      departement: "",
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

      // Fermer le modal après soumission
      this.hideModal()
    }
  }
}

