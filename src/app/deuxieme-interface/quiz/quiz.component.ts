import { Component, type OnInit } from "@angular/core"
import { FormBuilder, type FormGroup, type FormArray, Validators } from "@angular/forms"

interface Quiz {
  _id: string
  title: string
  description?: string
  cour: string
  courTitle?: string
  teacher: string
  duration: number
  createdAt: Date
  submissionsCount?: number
  questionsCount?: number
  questions?: any[]
}

@Component({
  selector: "app-quiz",
  templateUrl: "./quiz.component.html",
  styleUrls: ["./quiz.component.css"],
})
export class QuizComponent implements OnInit {
  // Informations de l'enseignant
  enseignantName = "Israa Bribech"
  enseignantEmail = "israabribech2002@gmail.com"
  teacherId = "T123"

  // États des modales
  activeModal: string | null = null
  editMode = false

  // Données
  quizzes: Quiz[] = []
  filteredQuizzes: Quiz[] = []
  cours: any[] = []

  // Filtres
  filters = {
    departement: "",
    niveau: "",
    specialite: "",
  }

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

  filteredSpecialites = [...this.specialites]

  // Statistiques
  quizStats = {
    total: 3,
    active: 2,
    submissions: 15,
  }

  // Formulaires
  quizForm!: FormGroup

  constructor(private fb: FormBuilder) {
    this.initializeForm()
  }

  ngOnInit(): void {
    // Charger les quiz et les cours
    this.loadMockData()
    this.filteredQuizzes = [...this.quizzes]
  }

  private initializeForm(): void {
    this.quizForm = this.fb.group({
      title: ["", Validators.required],
      description: [""],
      cour: [""],
      duration: [30, [Validators.required, Validators.min(1), Validators.max(180)]],
      questions: this.fb.array([]),
    })
  }

  // Getters pour faciliter l'accès aux contrôles du formulaire
  get questions(): FormArray {
    return this.quizForm.get("questions") as FormArray
  }

  getOptionsFormArray(questionIndex: number): FormArray {
    return this.questions.at(questionIndex).get("options") as FormArray
  }

  // Méthodes pour le filtrage
  onDepartementChange(event: any): void {
    const departementId = event.target.value
    if (!departementId) {
      this.filteredSpecialites = [...this.specialites]
      return
    }

    this.filteredSpecialites = this.specialites.filter((specialite) => specialite.departement === departementId)

    // Si la spécialité sélectionnée n'est plus valide, la réinitialiser
    if (this.filters.specialite) {
      const isValid = this.filteredSpecialites.some((s) => s._id === this.filters.specialite)
      if (!isValid) {
        this.filters.specialite = ""
      }
    }
  }

  filterQuizzes(): void {
    // Dans une implémentation réelle, vous filtreriez les quiz en fonction des critères
    // Pour cette démonstration, nous allons simplement simuler le filtrage

    this.filteredQuizzes = this.quizzes.filter((quiz) => {
      // Simuler l'association des quiz avec des départements, niveaux et spécialités
      const quizDepartement = quiz.cour === "c1" || quiz.cour === "c2" ? "dep1" : quiz.cour === "c3" ? "dep2" : "dep3"

      const quizNiveau = quiz.cour === "c1" ? "niv4" : quiz.cour === "c2" ? "niv2" : "niv3"

      const quizSpecialite = quiz.cour === "c1" || quiz.cour === "c2" ? "spe1" : quiz.cour === "c3" ? "spe3" : "spe5"

      // Appliquer les filtres
      let match = true

      if (this.filters.departement && quizDepartement !== this.filters.departement) {
        match = false
      }

      if (this.filters.niveau && quizNiveau !== this.filters.niveau) {
        match = false
      }

      if (this.filters.specialite && quizSpecialite !== this.filters.specialite) {
        match = false
      }

      return match
    })
  }

  resetFilters(): void {
    this.filters = {
      departement: "",
      niveau: "",
      specialite: "",
    }

    this.filteredSpecialites = [...this.specialites]
    this.filteredQuizzes = [...this.quizzes]
  }

  // Méthodes pour charger les données
  loadMockData(): void {
    // Charger les cours
    this.cours = [
      { _id: "c1", title: "Développement Web Avancé" },
      { _id: "c2", title: "Programmation Web" },
      { _id: "c3", title: "Algorithmes et Structures de Données" },
      { _id: "c4", title: "Bases de données" },
    ]

    // Charger les quiz
    this.quizzes = [
      {
        _id: "q1",
        title: "Introduction à Angular",
        description: "Quiz sur les concepts de base d'Angular",
        cour: "c1",
        courTitle: "Développement Web Avancé",
        teacher: this.teacherId,
        duration: 45,
        createdAt: new Date(2023, 5, 15),
        submissionsCount: 8,
        questionsCount: 10,
        questions: [
          {
            text: "Qu'est-ce qu'Angular ?",
            type: "single",
            options: [
              { text: "Un framework JavaScript", isCorrect: true },
              { text: "Un langage de programmation", isCorrect: false },
              { text: "Une bibliothèque CSS", isCorrect: false },
              { text: "Un serveur web", isCorrect: false },
            ],
            points: 2,
          },
          {
            text: "Quels sont les avantages d'Angular ?",
            type: "multiple",
            options: [
              { text: "Architecture MVC", isCorrect: true },
              { text: "Injection de dépendances", isCorrect: true },
              { text: "Performances limitées", isCorrect: false },
              { text: "Tests unitaires intégrés", isCorrect: true },
            ],
            points: 3,
          },
        ],
      },
      {
        _id: "q2",
        title: "Les bases de TypeScript",
        description: "Quiz sur les fondamentaux de TypeScript",
        cour: "c2",
        courTitle: "Programmation Web",
        teacher: this.teacherId,
        duration: 30,
        createdAt: new Date(2023, 6, 20),
        submissionsCount: 5,
        questionsCount: 8,
        questions: [],
      },
      {
        _id: "q3",
        title: "Structures de données",
        description: "Quiz sur les structures de données fondamentales",
        cour: "c3",
        courTitle: "Algorithmes et Structures de Données",
        teacher: this.teacherId,
        duration: 60,
        createdAt: new Date(2023, 7, 10),
        submissionsCount: 2,
        questionsCount: 12,
        questions: [],
      },
    ]

    this.filteredQuizzes = [...this.quizzes]
  }

  // Méthodes pour gérer les questions et options
  addQuestion(): void {
    const questionGroup = this.fb.group({
      text: ["", Validators.required],
      type: ["single", Validators.required],
      options: this.fb.array([]),
      correctAnswer: [""],
      points: [1, [Validators.required, Validators.min(1), Validators.max(100)]],
    })

    // Ajouter deux options par défaut pour les questions à choix
    this.questions.push(questionGroup)

    if (questionGroup.get("type")?.value === "single" || questionGroup.get("type")?.value === "multiple") {
      this.addOption(this.questions.length - 1)
      this.addOption(this.questions.length - 1)
    }
  }

  removeQuestion(index: number): void {
    this.questions.removeAt(index)
  }

  addOption(questionIndex: number): void {
    const optionsArray = this.getOptionsFormArray(questionIndex)
    optionsArray.push(
      this.fb.group({
        text: ["", Validators.required],
        isCorrect: [false],
      }),
    )
  }

  removeOption(questionIndex: number, optionIndex: number): void {
    const optionsArray = this.getOptionsFormArray(questionIndex)
    optionsArray.removeAt(optionIndex)
  }

  // Méthodes pour gérer les modales
  showModal(modalType: string, quizId?: string): void {
    this.activeModal = modalType

    if (modalType === "quiz") {
      if (quizId) {
        // Mode édition
        this.editMode = true
        // Charger les données du quiz à éditer
        this.loadQuizForEdit(quizId)
      } else {
        // Mode création
        this.editMode = false
        this.quizForm.reset({
          title: "",
          description: "",
          cour: "",
          duration: 30,
        })
        // Réinitialiser les questions
        this.questions.clear()
      }
    }
  }

  hideModal(): void {
    this.activeModal = null
  }

  // Méthode pour charger un quiz à éditer
  loadQuizForEdit(quizId: string): void {
    const quiz = this.quizzes.find((q) => q._id === quizId)

    if (quiz) {
      this.quizForm.patchValue({
        title: quiz.title,
        description: quiz.description || "",
        cour: quiz.cour || "",
        duration: quiz.duration || 30,
      })

      // Charger les questions
      this.questions.clear()
      if (quiz.questions && quiz.questions.length > 0) {
        quiz.questions.forEach((question) => {
          const questionGroup = this.fb.group({
            text: [question.text, Validators.required],
            type: [question.type, Validators.required],
            options: this.fb.array([]),
            correctAnswer: [question.correctAnswer || ""],
            points: [question.points, [Validators.required, Validators.min(1), Validators.max(100)]],
          })

          this.questions.push(questionGroup)

          // Ajouter les options si c'est une question à choix
          if (question.type === "single" || question.type === "multiple") {
            const optionsArray = this.getOptionsFormArray(this.questions.length - 1)
            question.options.forEach((option: any) => {
              optionsArray.push(
                this.fb.group({
                  text: [option.text, Validators.required],
                  isCorrect: [option.isCorrect],
                }),
              )
            })
          }
        })
      }
    }
  }

  // Méthodes pour les actions sur les quiz
  submitQuiz(): void {
    if (this.quizForm.invalid || this.questions.length === 0) {
      return
    }

    const quizData = {
      ...this.quizForm.value,
      teacher: this.teacherId,
    }

    if (this.editMode) {
      // Mettre à jour un quiz existant
      console.log("Mise à jour du quiz:", quizData)
      // Dans une implémentation réelle, vous enverriez ces données à une API

      // Simuler la mise à jour
      const index = this.quizzes.findIndex((q) => q._id === this.quizzes[0]._id) // Supposons que nous modifions le premier quiz
      if (index !== -1) {
        this.quizzes[index] = {
          ...this.quizzes[index],
          title: quizData.title,
          description: quizData.description,
          cour: quizData.cour,
          courTitle: this.cours.find((c) => c._id === quizData.cour)?.title,
          duration: quizData.duration,
          questionsCount: quizData.questions.length,
          questions: quizData.questions,
        }
      }
    } else {
      // Créer un nouveau quiz
      console.log("Création d'un nouveau quiz:", quizData)
      // Dans une implémentation réelle, vous enverriez ces données à une API

      // Simuler la création
      const newQuiz: Quiz = {
        _id: `q${this.quizzes.length + 1}`,
        title: quizData.title,
        description: quizData.description,
        cour: quizData.cour,
        courTitle: this.cours.find((c) => c._id === quizData.cour)?.title,
        teacher: this.teacherId,
        duration: quizData.duration,
        createdAt: new Date(),
        submissionsCount: 0,
        questionsCount: quizData.questions.length,
        questions: quizData.questions,
      }

      this.quizzes.push(newQuiz)
      this.quizStats.total = this.quizzes.length
    }

    this.filteredQuizzes = [...this.quizzes]
    this.hideModal()
  }

  viewQuizResults(quizId: string): void {
    console.log("Affichage des résultats du quiz:", quizId)
    // Dans une implémentation réelle, vous navigueriez vers la page des résultats
    alert(`Affichage des résultats du quiz: ${quizId}`)
  }

  editQuiz(quizId: string): void {
    this.showModal("quiz", quizId)
  }

  deleteQuiz(quizId: string): void {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce quiz ?")) {
      console.log("Suppression du quiz:", quizId)

      // Simuler la suppression
      const index = this.quizzes.findIndex((q) => q._id === quizId)
      if (index !== -1) {
        this.quizzes.splice(index, 1)
        this.quizStats.total = this.quizzes.length
        this.filteredQuizzes = [...this.quizzes]
      }
    }
  }

  previewQuiz(quizId: string): void {
    console.log("Aperçu du quiz:", quizId)
    // Dans une implémentation réelle, vous navigueriez vers la page d'aperçu
    alert(`Aperçu du quiz: ${quizId}`)
  }

  // Méthodes utilitaires
  formatDate(date: string | Date): string {
    const d = new Date(date)
    return d.toLocaleDateString()
  }
}

