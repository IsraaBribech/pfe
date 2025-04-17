import { Component, type OnInit, ViewChild, type ElementRef } from "@angular/core"
import { FormBuilder, type FormGroup, Validators } from "@angular/forms"
import { ActivatedRoute } from "@angular/router"

@Component({
  selector: "app-cour",
  templateUrl: "./cour.component.html",
  styleUrls: ["./cour.component.css"],
})
export class CourComponent implements OnInit {
deleteChapitre() {
throw new Error('Method not implemented.')
}
editChapitre(arg0: any) {
throw new Error('Method not implemented.')
}
submitEditChapitreForm() {
throw new Error('Method not implemented.')
}
onEditFileChange($event: Event) {
throw new Error('Method not implemented.')
}
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
  currentMatiere: any = null

  // Chapitres
  chapitres: any[] = []
  filteredChapitres: any[] = []
  selectedChapitre: any = null

  // Recherche
  searchTerm = ""

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
  activeSemestre = 1 // 1 ou 2

  // Modal
  activeModal: string | null = null

  // Formulaire d'ajout de cours
  courForm!: FormGroup
  chapitreForm!: FormGroup

  // File inputs
  @ViewChild("courFileInput") courFileInput!: ElementRef
@ViewChild("fileInput") fileInput!: ElementRef

// Selected files
courFile: File | null = null

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

      // Si on a un ID de matière, on charge les détails et les chapitres
      if (this.matiereId) {
        this.loadMatiereDetails(this.matiereId)
        this.loadChapitres(this.matiereId)
      }
    })
  }

  // Méthode pour charger les détails d'une matière spécifique
  loadMatiereDetails(matiereId: number): void {
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
      this.currentMatiere = matiere
    }
  }

  // Méthode pour charger les chapitres d'une matière
  loadChapitres(matiereId: number): void {
    // Dans une application réelle, vous feriez un appel API ici
    console.log(`Chargement des chapitres pour la matière ID: ${matiereId}`)

    // Simuler le chargement des chapitres
    this.chapitres = [
      {
        id: 1,
        matiereId: matiereId,
        numero: 1,
        titre: "Introduction à la matière",
        description:
          "Ce chapitre présente les concepts fondamentaux de la matière et donne un aperçu des sujets qui seront abordés tout au long du cours.",
        datePublication: new Date("2023-09-15"),
        fichier: "introduction.pdf",
      },
      {
        id: 2,
        matiereId: matiereId,
        numero: 2,
        titre: "Concepts de base",
        description:
          "Ce chapitre couvre les concepts de base nécessaires pour comprendre les chapitres suivants. Il est essentiel de bien maîtriser ces concepts avant de continuer.",
        datePublication: new Date("2023-09-22"),
        fichier: "concepts_base.pdf",
      },
      {
        id: 3,
        matiereId: matiereId,
        numero: 3,
        titre: "Applications pratiques",
        description:
          "Ce chapitre présente des applications pratiques des concepts vus précédemment. Des exemples concrets sont fournis pour illustrer l'utilité de la matière dans des situations réelles.",
        datePublication: new Date("2023-09-29"),
        fichier: "applications.pdf",
      },
    ]

    this.filteredChapitres = [...this.chapitres]
  }

  initForm(): void {
    // Formulaire pour ajouter un chapitre
    this.chapitreForm = this.fb.group({
      titre: ["", Validators.required],
      numero: ["", [Validators.required, Validators.min(1)]],
      description: ["", Validators.required],
      fichier: [""],
    })
  }

  filterChapitres(): void {
    if (!this.searchTerm.trim()) {
      this.filteredChapitres = [...this.chapitres]
      return
    }

    const term = this.searchTerm.toLowerCase().trim()
    this.filteredChapitres = this.chapitres.filter(
      (chapitre) => chapitre.titre.toLowerCase().includes(term) || chapitre.description.toLowerCase().includes(term),
    )
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

  // Gestion des modals
  showModal(type: string, chapitre?: any): void {
    if (type === "chapitre") {
      this.activeModal = "chapitre"
      this.chapitreForm.reset({
        numero: this.chapitres.length + 1,
      })
    } else if (type === "viewChapitre") {
      this.activeModal = "viewChapitre"
      this.selectedChapitre = chapitre
    } else if (type === "cour") {
      this.activeModal = "cour"
      this.courForm.reset()
    }
  }

  hideModal(): void {
    this.activeModal = null
    this.selectedCour = null
    this.selectedChapitre = null
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
    if (this.courForm && this.courForm.valid) {
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
        matiere: this.currentMatiere,
        formData: this.chapitreForm.value,
      })

      // Simuler l'ajout d'un nouveau chapitre
      const newChapitre = {
        id: this.chapitres.length + 1,
        matiereId: this.matiereId,
        numero: this.chapitreForm.value.numero,
        titre: this.chapitreForm.value.titre,
        description: this.chapitreForm.value.description,
        datePublication: new Date(),
        fichier: this.chapitreForm.value.fichier || null,
      }

      this.chapitres.push(newChapitre)
      this.filteredChapitres = [...this.chapitres]

      // Fermer le modal après soumission
      this.hideModal()
    }
  }

  viewChapitre(chapitre: any): void {
    this.selectedChapitre = chapitre
    this.showModal("viewChapitre")
  }

  downloadChapitre(chapitre: any): void {
    // Dans une application réelle, ceci déclencherait un téléchargement
    console.log(`Téléchargement du fichier: ${chapitre.fichier}`)
    alert(`Téléchargement du fichier: ${chapitre.fichier}`)
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }
}
