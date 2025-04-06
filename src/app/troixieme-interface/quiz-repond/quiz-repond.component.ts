import { Component, type OnInit } from "@angular/core"

interface Question {
  id: string
  texte: string
  type: "choix_unique" | "choix_multiple" | "texte"
  options?: {
    id: string
    texte: string
    estCorrect: boolean
  }[]
  reponseTexte?: string
  reponseUtilisateur?: string | string[]
  points: number
}

interface Quiz {
  id: string
  titre: string
  description: string
  dateCreation: Date
  dateLimite: Date
  duree: number // en minutes
  questions: Question[]
  estTermine: boolean
  score?: number
  dateCompletion?: Date
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
  quiz: Quiz[]
}

@Component({
  selector: "app-quiz-repond",
  templateUrl: "./quiz-repond.component.html",
  styleUrls: ["./quiz-repond.component.css"],
})
export class QuizRepondComponent implements OnInit {
  // Informations de l'étudiant
  etudiantName = "Israa Bribech"
  etudiantEmail = "israabribech2002@gmail.com"
  etudiantMatricule = "E12345"

  // Onglet actif
  activeSemester: "semestre1" | "semestre2" = "semestre1"

  // Matière sélectionnée
  selectedMatiere: Matiere | null = null

  // Quiz sélectionné
  selectedQuiz: Quiz | null = null

  // État du quiz
  quizEnCours = false
  quizTermine = false
  tempsRestant = 0 // en secondes
  intervalId: any = null
  questionCourante = 0

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
      quiz: [
        {
          id: "q1m1",
          titre: "Quiz sur HTML et CSS",
          description: "Ce quiz évalue vos connaissances sur les bases du HTML et CSS.",
          dateCreation: new Date(2023, 8, 15),
          dateLimite: new Date(2023, 9, 15),
          duree: 30,
          estTermine: false,
          questions: [
            {
              id: "q1m1q1",
              texte: "Quelle balise HTML est utilisée pour créer un lien hypertexte?",
              type: "choix_unique",
              options: [
                { id: "q1m1q1o1", texte: "<a>", estCorrect: true },
                { id: "q1m1q1o2", texte: "<link>", estCorrect: false },
                { id: "q1m1q1o3", texte: "<href>", estCorrect: false },
                { id: "q1m1q1o4", texte: "<url>", estCorrect: false },
              ],
              points: 2,
            },
            {
              id: "q1m1q2",
              texte: "Quelles propriétés CSS peuvent être utilisées pour centrer un élément horizontalement?",
              type: "choix_multiple",
              options: [
                { id: "q1m1q2o1", texte: "margin: 0 auto;", estCorrect: true },
                { id: "q1m1q2o2", texte: "text-align: center;", estCorrect: true },
                { id: "q1m1q2o3", texte: "align: center;", estCorrect: false },
                { id: "q1m1q2o4", texte: "display: flex; justify-content: center;", estCorrect: true },
              ],
              points: 3,
            },
            {
              id: "q1m1q3",
              texte: "Expliquez la différence entre les positionnements 'relative' et 'absolute' en CSS.",
              type: "texte",
              reponseTexte: "",
              points: 5,
            },
          ],
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
      quiz: [
        {
          id: "q1m2",
          titre: "Quiz sur SQL",
          description: "Ce quiz évalue vos connaissances sur les requêtes SQL de base.",
          dateCreation: new Date(2023, 8, 20),
          dateLimite: new Date(2023, 9, 20),
          duree: 45,
          estTermine: true,
          dateCompletion: new Date(2023, 9, 18),
          score: 85,
          questions: [
            {
              id: "q1m2q1",
              texte: "Quelle commande SQL est utilisée pour extraire des données d'une base de données?",
              type: "choix_unique",
              options: [
                { id: "q1m2q1o1", texte: "SELECT", estCorrect: true },
                { id: "q1m2q1o2", texte: "EXTRACT", estCorrect: false },
                { id: "q1m2q1o3", texte: "GET", estCorrect: false },
                { id: "q1m2q1o4", texte: "OPEN", estCorrect: false },
              ],
              reponseUtilisateur: "q1m2q1o1",
              points: 2,
            },
            {
              id: "q1m2q2",
              texte: "Quelles clauses peuvent être utilisées avec une requête SELECT?",
              type: "choix_multiple",
              options: [
                { id: "q1m2q2o1", texte: "WHERE", estCorrect: true },
                { id: "q1m2q2o2", texte: "HAVING", estCorrect: true },
                { id: "q1m2q2o3", texte: "SORT", estCorrect: false },
                { id: "q1m2q2o4", texte: "GROUP BY", estCorrect: true },
              ],
              reponseUtilisateur: ["q1m2q2o1", "q1m2q2o2", "q1m2q2o4"],
              points: 3,
            },
          ],
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
      quiz: [],
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
      quiz: [],
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
      quiz: [],
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
      quiz: [],
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
      quiz: [],
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
      quiz: [],
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
      quiz: [],
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
      quiz: [],
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
      quiz: [],
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
      quiz: [],
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
      quiz: [
        {
          id: "q1m13",
          titre: "Quiz sur React et Angular",
          description: "Ce quiz évalue vos connaissances sur les frameworks JavaScript modernes.",
          dateCreation: new Date(2024, 1, 15),
          dateLimite: new Date(2024, 2, 15),
          duree: 40,
          estTermine: false,
          questions: [
            {
              id: "q1m13q1",
              texte: "Quel hook React est utilisé pour gérer l'état local d'un composant?",
              type: "choix_unique",
              options: [
                { id: "q1m13q1o1", texte: "useState", estCorrect: true },
                { id: "q1m13q1o2", texte: "useEffect", estCorrect: false },
                { id: "q1m13q1o3", texte: "useContext", estCorrect: false },
                { id: "q1m13q1o4", texte: "useReducer", estCorrect: false },
              ],
              points: 2,
            },
            {
              id: "q1m13q2",
              texte: "Quels sont les décorateurs couramment utilisés dans Angular?",
              type: "choix_multiple",
              options: [
                { id: "q1m13q2o1", texte: "@Component", estCorrect: true },
                { id: "q1m13q2o2", texte: "@Injectable", estCorrect: true },
                { id: "q1m13q2o3", texte: "@React", estCorrect: false },
                { id: "q1m13q2o4", texte: "@Input", estCorrect: true },
              ],
              points: 3,
            },
          ],
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
      quiz: [],
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
      quiz: [],
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
      quiz: [],
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
      quiz: [],
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
      quiz: [],
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
      quiz: [],
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
      quiz: [],
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
      quiz: [],
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
      quiz: [],
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
      quiz: [],
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
      quiz: [],
    },
  ]

  constructor() {}

  ngOnInit(): void {}

  // Méthode pour obtenir le texte d'une option
  getOptionTexte(question: Question, optionId: string | string[]): string {
    if (!question.options) return "Non répondu"

    if (typeof optionId === "string") {
      const option = question.options.find((o) => o.id === optionId)
      return option ? option.texte : "Non répondu"
    }

    return "Non répondu"
  }

  // Méthode pour vérifier si une question a des réponses
  hasResponses(question: Question): boolean {
    if (!question.reponseUtilisateur) return false

    if (Array.isArray(question.reponseUtilisateur)) {
      return question.reponseUtilisateur.length > 0
    }

    return question.reponseUtilisateur !== ""
  }

  // Méthode pour obtenir un tableau de réponses
  getResponseArray(question: Question): string[] {
    if (!question.reponseUtilisateur) return []

    if (Array.isArray(question.reponseUtilisateur)) {
      return question.reponseUtilisateur
    }

    return []
  }

  // Méthode pour changer de semestre
  changeSemester(semester: "semestre1" | "semestre2"): void {
    this.activeSemester = semester
    this.selectedMatiere = null
    this.selectedQuiz = null
    this.quizEnCours = false
    this.quizTermine = false
    this.confirmationMessage = ""
    this.arreterQuiz()
  }

  // Méthode pour sélectionner une matière
  selectMatiere(matiere: Matiere): void {
    this.selectedMatiere = matiere
    this.selectedQuiz = null
    this.quizEnCours = false
    this.quizTermine = false
    this.confirmationMessage = ""
  }

  // Méthode pour revenir à la liste des matières
  backToMatieres(): void {
    this.selectedMatiere = null
    this.selectedQuiz = null
    this.quizEnCours = false
    this.quizTermine = false
    this.confirmationMessage = ""
    this.arreterQuiz()
    // Ne pas naviguer vers le tableau de bord, rester sur l'interface des quiz
  }

  // Méthode pour sélectionner un quiz
  selectQuiz(quiz: Quiz): void {
    this.selectedQuiz = quiz
    this.quizEnCours = false
    this.quizTermine = false
    this.confirmationMessage = ""
  }

  // Méthode pour revenir à la liste des quiz
  backToQuizzes(): void {
    this.selectedQuiz = null
    this.quizEnCours = false
    this.quizTermine = false
    this.confirmationMessage = ""
    this.arreterQuiz()
  }

  // Méthode pour démarrer un quiz
  demarrerQuiz(): void {
    if (this.selectedQuiz) {
      this.quizEnCours = true
      this.quizTermine = false
      this.questionCourante = 0
      this.tempsRestant = this.selectedQuiz.duree * 60

      // Initialiser les réponses utilisateur
      this.selectedQuiz.questions.forEach((question) => {
        if (question.type === "choix_unique") {
          question.reponseUtilisateur = ""
        } else if (question.type === "choix_multiple") {
          question.reponseUtilisateur = []
        } else if (question.type === "texte") {
          question.reponseUtilisateur = ""
        }
      })

      // Démarrer le timer
      this.intervalId = setInterval(() => {
        this.tempsRestant--
        if (this.tempsRestant <= 0) {
          this.terminerQuiz()
        }
      }, 1000)
    }
  }

  // Méthode pour arrêter le quiz
  arreterQuiz(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId)
      this.intervalId = null
    }
  }

  // Méthode pour terminer le quiz
  terminerQuiz(): void {
    this.arreterQuiz()
    this.quizEnCours = false
    this.quizTermine = true

    if (this.selectedQuiz) {
      // Calculer le score
      let pointsTotal = 0
      let pointsObtenus = 0

      this.selectedQuiz.questions.forEach((question) => {
        pointsTotal += question.points

        if (question.type === "choix_unique") {
          const reponseUtilisateur = question.reponseUtilisateur as string
          const optionSelectionnee = question.options?.find((option) => option.id === reponseUtilisateur)
          if (optionSelectionnee && optionSelectionnee.estCorrect) {
            pointsObtenus += question.points
          }
        } else if (question.type === "choix_multiple") {
          const reponsesUtilisateur = question.reponseUtilisateur as string[]
          const optionsCorrectes =
            question.options?.filter((option) => option.estCorrect).map((option) => option.id) || []
          const optionsSelectionnees = reponsesUtilisateur || []

          // Vérifier si toutes les options correctes sont sélectionnées et aucune incorrecte
          const toutesCorrectesSelectionnees = optionsCorrectes.every((id) => optionsSelectionnees.includes(id))
          const aucuneIncorrecteSelectionnee = optionsSelectionnees.every((id) => optionsCorrectes.includes(id))

          if (toutesCorrectesSelectionnees && aucuneIncorrecteSelectionnee) {
            pointsObtenus += question.points
          } else if (toutesCorrectesSelectionnees || aucuneIncorrecteSelectionnee) {
            // Points partiels si certaines bonnes réponses
            pointsObtenus += question.points / 2
          }
        }
        // Pour les questions de type texte, elles seront évaluées par l'enseignant
      })

      // Calculer le pourcentage
      const pourcentage = Math.round((pointsObtenus / pointsTotal) * 100)

      // Mettre à jour le quiz
      this.selectedQuiz.estTermine = true
      this.selectedQuiz.dateCompletion = new Date()
      this.selectedQuiz.score = pourcentage
    }
  }

  // Méthode pour soumettre le quiz
  soumettreQuiz(): void {
    this.isSubmitting = true

    // Simuler un délai de soumission
    setTimeout(() => {
      if (this.selectedQuiz && this.selectedMatiere) {
        // Dans une application réelle, vous enverriez les réponses à un serveur
        console.log("Soumission du quiz:", {
          matiere: this.selectedMatiere.nom,
          quiz: this.selectedQuiz.titre,
          reponses: this.selectedQuiz.questions.map((q) => ({
            id: q.id,
            reponse: q.reponseUtilisateur,
          })),
          email: this.etudiantEmail,
          date: new Date(),
        })

        // Afficher un message de confirmation
        this.confirmationMessage = "Votre quiz a été soumis avec succès !"

        this.isSubmitting = false
      }
    }, 2000)
  }

  // Méthode pour passer à la question suivante
  questionSuivante(): void {
    if (this.selectedQuiz && this.questionCourante < this.selectedQuiz.questions.length - 1) {
      this.questionCourante++
    }
  }

  // Méthode pour revenir à la question précédente
  questionPrecedente(): void {
    if (this.questionCourante > 0) {
      this.questionCourante--
    }
  }

  // Méthode pour gérer les réponses à choix unique
  onChoixUnique(questionId: string, optionId: string): void {
    if (this.selectedQuiz) {
      const question = this.selectedQuiz.questions.find((q) => q.id === questionId)
      if (question) {
        question.reponseUtilisateur = optionId
      }
    }
  }

  // Méthode pour gérer les réponses à choix multiple
  onChoixMultiple(questionId: string, optionId: string, event: any): void {
    if (this.selectedQuiz) {
      const question = this.selectedQuiz.questions.find((q) => q.id === questionId)
      if (question) {
        const reponses = (question.reponseUtilisateur as string[]) || []

        if (event.target.checked) {
          if (!reponses.includes(optionId)) {
            question.reponseUtilisateur = [...reponses, optionId]
          }
        } else {
          question.reponseUtilisateur = reponses.filter((id) => id !== optionId)
        }
      }
    }
  }

  // Méthode pour gérer les réponses textuelles
  onReponseTexte(questionId: string, texte: string): void {
    if (this.selectedQuiz) {
      const question = this.selectedQuiz.questions.find((q) => q.id === questionId)
      if (question) {
        question.reponseUtilisateur = texte
      }
    }
  }

  // Ajouter cette méthode pour gérer l'événement input de manière sécurisée
  onTextareaInput(event: Event, questionId: string): void {
    const target = event.target as HTMLTextAreaElement
    if (target && target.value !== undefined) {
      this.onReponseTexte(questionId, target.value)
    }
  }

  // Méthode pour vérifier si une option est sélectionnée (choix unique)
  isOptionSelected(questionId: string, optionId: string): boolean {
    if (this.selectedQuiz) {
      const question = this.selectedQuiz.questions.find((q) => q.id === questionId)
      if (question && question.reponseUtilisateur) {
        return question.reponseUtilisateur === optionId
      }
    }
    return false
  }

  // Méthode pour vérifier si une option est sélectionnée (choix multiple)
  isOptionChecked(questionId: string, optionId: string): boolean {
    if (this.selectedQuiz) {
      const question = this.selectedQuiz.questions.find((q) => q.id === questionId)
      if (question && question.reponseUtilisateur) {
        const reponses = question.reponseUtilisateur as string[]
        return reponses.includes(optionId)
      }
    }
    return false
  }

  // Méthode pour formater le temps restant
  formatTempsRestant(): string {
    const minutes = Math.floor(this.tempsRestant / 60)
    const secondes = this.tempsRestant % 60
    return `${minutes.toString().padStart(2, "0")}:${secondes.toString().padStart(2, "0")}`
  }

  // Méthode pour formater les dates
  formatDate(date: Date): string {
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }
  isAnyQuizCloseToDeadline(quizzes: Quiz[]): boolean {
    return quizzes.some(q => this.isCloseToDeadline(q));
  }
  
  isAnyQuizLate(quizzes: Quiz[]): boolean {
    return quizzes.some(q => this.isLate(q));
  }
  // Méthode pour vérifier si un quiz est en retard
  isLate(quiz: Quiz): boolean {
    const today = new Date()
    return !quiz.estTermine && today > quiz.dateLimite
  }

  // Méthode pour vérifier si un quiz est proche de la date limite
  isCloseToDeadline(quiz: Quiz): boolean {
    const today = new Date()
    const diffTime = quiz.dateLimite.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return !quiz.estTermine && diffDays <= 3 && diffDays > 0
  }

  // Méthode pour obtenir le nombre de jours restants
  getJoursRestants(dateLimite: Date): number {
    const today = new Date()
    const diffTime = dateLimite.getTime() - today.getTime()
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  // Méthode pour générer un quiz IA
  genererQuizIA(): void {
    if (this.selectedMatiere) {
      // Simuler la génération d'un quiz IA
      const nouveauQuiz: Quiz = {
        id: `qia${this.selectedMatiere.id}`,
        titre: `Quiz IA sur ${this.selectedMatiere.nom}`,
        description: `Quiz généré par l'IA pour tester vos connaissances sur ${this.selectedMatiere.nom}.`,
        dateCreation: new Date(),
        dateLimite: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000), // +7 jours
        duree: 30,
        estTermine: false,
        questions: [
          {
            id: `qia${this.selectedMatiere.id}q1`,
            texte: `Question 1 sur ${this.selectedMatiere.nom}`,
            type: "choix_unique",
            options: [
              { id: `qia${this.selectedMatiere.id}q1o1`, texte: "Option 1", estCorrect: true },
              { id: `qia${this.selectedMatiere.id}q1o2`, texte: "Option 2", estCorrect: false },
              { id: `qia${this.selectedMatiere.id}q1o3`, texte: "Option 3", estCorrect: false },
              { id: `qia${this.selectedMatiere.id}q1o4`, texte: "Option 4", estCorrect: false },
            ],
            points: 2,
          },
          {
            id: `qia${this.selectedMatiere.id}q2`,
            texte: `Question 2 sur ${this.selectedMatiere.nom}`,
            type: "choix_multiple",
            options: [
              { id: `qia${this.selectedMatiere.id}q2o1`, texte: "Option 1", estCorrect: true },
              { id: `qia${this.selectedMatiere.id}q2o2`, texte: "Option 1", estCorrect: true },
              { id: `qia${this.selectedMatiere.id}q2o2`, texte: "Option 2", estCorrect: true },
              { id: `qia${this.selectedMatiere.id}q2o3`, texte: "Option 3", estCorrect: false },
              { id: `qia${this.selectedMatiere.id}q2o4`, texte: "Option 4", estCorrect: false },
            ],
            points: 3,
          },
          {
            id: `qia${this.selectedMatiere.id}q3`,
            texte: `Question 3 sur ${this.selectedMatiere.nom}`,
            type: "texte",
            reponseTexte: "",
            points: 5,
          },
        ],
      }

      // Ajouter le quiz à la matière
      this.selectedMatiere.quiz.push(nouveauQuiz)

      // Sélectionner le nouveau quiz
      this.selectedQuiz = nouveauQuiz
    }
  }
}