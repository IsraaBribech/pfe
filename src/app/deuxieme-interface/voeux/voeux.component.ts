import { Component, type OnInit } from "@angular/core"
import { FormBuilder, type FormGroup, type FormArray } from "@angular/forms"

interface Matiere {
  id: string
  nom: string
  departement: string
  specialite: string
  niveau: string
  credits: number
  heures: number
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

  // Formulaires pour les semestres
  semestre1Form!: FormGroup
  semestre2Form!: FormGroup

  // Liste des matières disponibles
  matieres: Matiere[] = []

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

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadMockData()
    this.initForms()
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
      // Sinon, l'ajouter
      matieresArray.push(
        this.fb.group({
          id: [matiere.id],
          nom: [matiere.nom],
          credits: [matiere.credits],
          heures: [matiere.heures],
          commentaire: [""],
        }),
      )
    }
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

  getTotalVoeux(): number {
    // Dans une implémentation réelle, cette valeur viendrait d'une API
    return 5
  }

  getAcceptedVoeux(): number {
    // Dans une implémentation réelle, cette valeur viendrait d'une API
    return 3
  }

  getPendingVoeux(): number {
    // Dans une implémentation réelle, cette valeur viendrait d'une API
    return 2
  }

  getTotalMatieres(): number {
    return this.matieres.length
  }

  submitVoeux(semestre: number): void {
    const form = semestre === 1 ? this.semestre1Form : this.semestre2Form

    if ((form.get("matieres") as FormArray).length > 0) {
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
}

