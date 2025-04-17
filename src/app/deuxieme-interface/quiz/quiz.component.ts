import { Component, OnInit, HostListener } from "@angular/core";
import { FormBuilder, FormGroup, FormArray, Validators } from "@angular/forms";
import { Router } from "@angular/router";

interface Student {
  id: string;
  name: string;
  group: string;
  hasResponded: boolean;
  submissionDate?: Date;
  score?: number;
}

interface Question {
  id: string;
  text: string;
  type: "single" | "multiple" | "text";
  options?: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  correctAnswer?: string;
  points: number;
}

interface Quiz {
  id: string;
  title: string;
  description: string;
  subject: string;
  type: "TD" | "TP" | "Cours";
  createdAt: Date;
  dueDate: Date;
  duration: number;
  isActive: boolean;
  questions: Question[];
  students?: Student[];
  responseCount?: number;
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
  id: number;
  sender: string;
  message: string;
  time: string;
  read: boolean;
  avatar?: string;
}

@Component({
  selector: "app-quiz",
  templateUrl: "./quiz.component.html",
  styleUrls: ["./quiz.component.css"],
})
export class QuizComponent implements OnInit {
  // Informations de l'enseignant
  enseignantName = "Israa Bribech";
  enseignantEmail = "israabribech2002@gmail.com";

  // États des modales
  showQuizModal = false;
  showStudentModal = false;
  showResponseModal = false;
  editMode = false;

  // Données
  quizzes: Quiz[] = [];
  filteredQuizzes: Quiz[] = [];
  selectedQuiz: Quiz | null = null;
  selectedStudent: Student | null = null;

  // Filtres
  searchTerm = "";
  subjectFilter = "";

  // Statistiques
  quizStats = {
    total: 0,
    active: 0,
    completed: 0,
    responseRate: 0,
  };

  // Ajouter les propriétés de notification
  showNotifications = false;
  notifications: Notification[] = [
    {
      id: 1,
      sender: "Ahmed Benali",
      message: "J'ai soumis mon quiz de programmation web",
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
      message: "Demande d'extension pour le délai du quiz",
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
  ];
  messageStats = {
    unread: 0,
  };

  // Formulaires
  quizForm!: FormGroup;

  // Propriétés pour les sous-menus
  showCourSubmenu = false;
  showSemestreSubmenu: { [key: number]: boolean } = { 1: false, 2: false };
  
  // Matières pour les semestres
  matieresSemestre1: Matiere[] = [
    { id: "m1", nom: "Programmation Web", niveau: "L3", type: "Cours" },
    { id: "m2", nom: "Programmation Web", niveau: "L3", type: "TD" },
    { id: "m3", nom: "Programmation Web", niveau: "L3", type: "TP" },
    { id: "m4", nom: "Bases de données", niveau: "L3", type: "Cours" },
    { id: "m5", nom: "Bases de données", niveau: "L3", type: "TD" },
    { id: "m6", nom: "Bases de données", niveau: "L3", type: "TP" },
  ];
  
  matieresSemestre2: Matiere[] = [
    { id: "m7", nom: "Intelligence Artificielle", niveau: "L3", type: "Cours" },
    { id: "m8", nom: "Intelligence Artificielle", niveau: "L3", type: "TD" },
    { id: "m9", nom: "Intelligence Artificielle", niveau: "L3", type: "TP" },
    { id: "m10", nom: "Réseaux", niveau: "L3", type: "Cours" },
    { id: "m11", nom: "Réseaux", niveau: "L3", type: "TD" },
    { id: "m12", nom: "Réseaux", niveau: "L3", type: "TP" },
  ];

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadMockData();
    this.updateStats();
    this.filterQuizzes();
    this.updateUnreadCount(); // Ajouter l'initialisation du compteur de notifications
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

  private initializeForm(): void {
    this.quizForm = this.fb.group({
      title: ["", Validators.required],
      description: ["", Validators.required],
      subject: ["", Validators.required],
      type: ["Cours", Validators.required],
      duration: [30, [Validators.required, Validators.min(5), Validators.max(180)]],
      dueDate: ["", Validators.required],
      questions: this.fb.array([]),
    });
  }

  // Getters pour faciliter l'accès aux contrôles du formulaire
  get questions(): FormArray {
    return this.quizForm.get("questions") as FormArray;
  }

  getOptionsFormArray(questionIndex: number): FormArray {
    return this.questions.at(questionIndex).get("options") as FormArray;
  }

  // Méthodes pour le filtrage
  filterQuizzes(): void {
    this.filteredQuizzes = this.quizzes.filter((quiz) => {
      // Filtre par recherche
      if (
        this.searchTerm &&
        !quiz.title.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
        !quiz.description.toLowerCase().includes(this.searchTerm.toLowerCase())
      ) {
        return false;
      }

      // Filtre par matière
      if (this.subjectFilter && quiz.subject !== this.subjectFilter) {
        return false;
      }

      return true;
    });
  }

  resetFilters(): void {
    this.searchTerm = "";
    this.subjectFilter = "";
    this.filterQuizzes();
  }

  // Méthodes pour charger les données
  loadMockData(): void {
    // Générer des données de quiz fictives
    const subjects = ["Programmation Web", "Bases de données", "Algorithmes", "Intelligence Artificielle", "Réseaux"];
    const groups = ["G1.1", "G1.2", "G1.3", "G2.1", "G2.2", "G2.3"];

    // Générer des étudiants fictifs
    const generateStudents = (count: number, responseRate: number): Student[] => {
      const students: Student[] = [];
      const firstNames = ["Mohamed", "Ahmed", "Fatima", "Aisha", "Omar", "Ali", "Nour", "Leila", "Karim", "Yasmine"];
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
      ];

      for (let i = 0; i < count; i++) {
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        const group = groups[Math.floor(Math.random() * groups.length)];
        const hasResponded = Math.random() < responseRate;

        students.push({
          id: `S${i + 100}`,
          name: `${firstName} ${lastName}`,
          group,
          hasResponded,
          submissionDate: hasResponded ? new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000) : undefined,
          score: hasResponded ? Math.floor(Math.random() * 41) + 60 : undefined, // Score entre 60 et 100
        });
      }

      return students;
    };

    // Générer des questions fictives
    const generateQuestions = (count: number): Question[] => {
      const questions: Question[] = [];
      const questionTypes: ("single" | "multiple" | "text")[] = ["single", "multiple", "text"];

      for (let i = 0; i < count; i++) {
        const type = questionTypes[Math.floor(Math.random() * questionTypes.length)];
        const question: Question = {
          id: `Q${i + 1}`,
          text: `Question ${i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit?`,
          type,
          points: Math.floor(Math.random() * 5) + 1,
        };

        if (type === "single" || type === "multiple") {
          question.options = [];
          const optionCount = 4;
          const correctIndex = type === "single" ? Math.floor(Math.random() * optionCount) : -1; // Pour multiple, on définira aléatoirement

          for (let j = 0; j < optionCount; j++) {
            const isCorrect = type === "single" ? j === correctIndex : Math.random() > 0.5; // Pour multiple, aléatoire

            question.options.push({
              id: `Q${i + 1}O${j + 1}`,
              text: `Option ${j + 1}: Lorem ipsum dolor sit amet`,
              isCorrect,
            });
          }
        } else if (type === "text") {
          question.correctAnswer = "Réponse modèle pour la question à texte libre";
        }

        questions.push(question);
      }

      return questions;
    };

    // Générer des quiz
    const quizTypes: ("TD" | "TP" | "Cours")[] = ["TD", "TP", "Cours"];
    for (let i = 0; i < 6; i++) {
      const subject = subjects[Math.floor(Math.random() * subjects.length)];
      const isActive = Math.random() > 0.3;
      const studentCount = Math.floor(Math.random() * 20) + 15; // Entre 15 et 35 étudiants
      const responseRate = Math.random() * 0.6 + 0.2; // Entre 20% et 80%
      const students = generateStudents(studentCount, responseRate);
      const questionCount = Math.floor(Math.random() * 8) + 3; // Entre 3 et 10 questions
      const quizType = quizTypes[Math.floor(Math.random() * quizTypes.length)];

      this.quizzes.push({
        id: `quiz-${i + 1}`,
        title: `Quiz ${i + 1}: ${subject}`,
        description: `Description du quiz sur ${subject}. Ce quiz couvre les concepts fondamentaux de la matière.`,
        subject,
        type: quizType,
        createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000), // Dans les 30 derniers jours
        dueDate: isActive
          ? new Date(Date.now() + Math.random() * 14 * 24 * 60 * 60 * 1000) // Dans les 14 prochains jours
          : new Date(Date.now() - Math.random() * 14 * 24 * 60 * 60 * 1000), // Dans les 14 derniers jours
        duration: Math.floor(Math.random() * 60) + 15, // Entre 15 et 75 minutes
        isActive,
        questions: generateQuestions(questionCount),
        students,
        responseCount: students.filter((s) => s.hasResponded).length,
      });
    }
  }

  // Mettre à jour les statistiques
  updateStats(): void {
    this.quizStats.total = this.quizzes.length;
    this.quizStats.active = this.quizzes.filter((q) => q.isActive).length;
    this.quizStats.completed = this.quizzes.filter((q) => !q.isActive).length;

    // Calculer le taux de réponse moyen
    let totalStudents = 0;
    let totalResponses = 0;

    this.quizzes.forEach((quiz) => {
      if (quiz.students) {
        totalStudents += quiz.students.length;
        totalResponses += quiz.students.filter((s) => s.hasResponded).length;
      }
    });

    this.quizStats.responseRate = totalStudents > 0 ? Math.round((totalResponses / totalStudents) * 100) : 0;
  }

  // Méthodes pour gérer les questions et options
  addQuestion(): void {
    const questionGroup = this.fb.group({
      text: ["", Validators.required],
      type: ["single", Validators.required],
      options: this.fb.array([]),
      correctAnswer: [""],
      points: [1, [Validators.required, Validators.min(1), Validators.max(10)]],
    });

    this.questions.push(questionGroup);

    // Ajouter deux options par défaut pour les questions à choix
    if (questionGroup.get("type")?.value === "single" || questionGroup.get("type")?.value === "multiple") {
      this.addOption(this.questions.length - 1);
      this.addOption(this.questions.length - 1);
    }
  }

  removeQuestion(index: number): void {
    this.questions.removeAt(index);
  }

  addOption(questionIndex: number): void {
    const optionsArray = this.getOptionsFormArray(questionIndex);
    optionsArray.push(
      this.fb.group({
        text: ["", Validators.required],
        isCorrect: [false],
      })
    );
  }

  removeOption(questionIndex: number, optionIndex: number): void {
    const optionsArray = this.getOptionsFormArray(questionIndex);
    optionsArray.removeAt(optionIndex);
  }

  // Méthodes pour gérer les modales
  openQuizModal(quiz?: Quiz): void {
    if (quiz) {
      // Mode édition
      this.editMode = true;
      this.selectedQuiz = quiz;
      this.loadQuizForEdit(quiz);
    } else {
      // Mode création
      this.editMode = false;
      this.selectedQuiz = null;
      this.quizForm.reset({
        title: "",
        description: "",
        subject: "",
        type: "Cours",
        duration: 30,
        dueDate: this.formatDateForInput(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)), // +7 jours par défaut
      });

      // Réinitialiser les questions
      while (this.questions.length) {
        this.questions.removeAt(0);
      }
    }

    this.showQuizModal = true;
  }

  closeQuizModal(): void {
    this.showQuizModal = false;
  }

  openStudentModal(quiz: Quiz): void {
    this.selectedQuiz = quiz;
    this.showStudentModal = true;
  }

  closeStudentModal(): void {
    this.showStudentModal = false;
  }

  openResponseModal(student: Student): void {
    this.selectedStudent = student;
    this.showResponseModal = true;
  }

  closeResponseModal(): void {
    this.showResponseModal = false;
  }

  loadQuizForEdit(quiz: Quiz): void {
    this.quizForm.patchValue({
      title: quiz.title,
      description: quiz.description,
      subject: quiz.subject,
      type: quiz.type,
      duration: quiz.duration,
      dueDate: this.formatDateForInput(quiz.dueDate),
    });

    // Charger les questions
    while (this.questions.length) {
      this.questions.removeAt(0);
    }

    quiz.questions.forEach((question) => {
      const questionGroup = this.fb.group({
        text: [question.text, Validators.required],
        type: [question.type, Validators.required],
        options: this.fb.array([]),
        correctAnswer: [question.correctAnswer || ""],
        points: [question.points, [Validators.required, Validators.min(1), Validators.max(10)]],
      });

      this.questions.push(questionGroup);

      // Ajouter les options si c'est une question à choix
      if (question.type === "single" || question.type === "multiple") {
        const optionsArray = this.getOptionsFormArray(this.questions.length - 1);
        question.options?.forEach((option) => {
          optionsArray.push(
            this.fb.group({
              text: [option.text, Validators.required],
              isCorrect: [option.isCorrect],
            })
          );
        });
      }
    });
  }

  // Méthodes pour les actions sur les quiz
  submitQuiz(): void {
    if (this.quizForm.invalid) {
      // Marquer tous les champs comme touchés pour afficher les erreurs
      Object.keys(this.quizForm.controls).forEach((key) => {
        const control = this.quizForm.get(key);
        control?.markAsTouched();
      });
      return;
    }

    const formValue = this.quizForm.value;

    if (this.editMode && this.selectedQuiz) {
      // Mettre à jour un quiz existant
      const updatedQuiz: Quiz = {
        ...this.selectedQuiz,
        title: formValue.title,
        description: formValue.description,
        subject: formValue.subject,
        type: formValue.type,
        duration: formValue.duration,
        dueDate: new Date(formValue.dueDate),
        questions: this.mapFormQuestionsToModel(formValue.questions),
      };

      // Mettre à jour le quiz dans la liste
      const index = this.quizzes.findIndex((q) => q.id === this.selectedQuiz?.id);
      if (index !== -1) {
        this.quizzes[index] = updatedQuiz;
      }
    } else {
      // Créer un nouveau quiz
      const newQuiz: Quiz = {
        id: `quiz-${this.quizzes.length + 1}`,
        title: formValue.title,
        description: formValue.description,
        subject: formValue.subject,
        type: formValue.type,
        createdAt: new Date(),
        dueDate: new Date(formValue.dueDate),
        duration: formValue.duration,
        isActive: true,
        questions: this.mapFormQuestionsToModel(formValue.questions),
        students: [],
        responseCount: 0,
      };

      this.quizzes.push(newQuiz);
    }

    // Mettre à jour les statistiques et filtrer
    this.updateStats();
    this.filterQuizzes();
    this.closeQuizModal();
  }

  mapFormQuestionsToModel(formQuestions: any[]): Question[] {
    return formQuestions.map((q, index) => {
      const question: Question = {
        id: `Q${index + 1}`,
        text: q.text,
        type: q.type,
        points: q.points,
      };

      if (q.type === "single" || q.type === "multiple") {
        question.options = q.options.map((o: any, optIndex: number) => ({
          id: `Q${index + 1}O${optIndex + 1}`,
          text: o.text,
          isCorrect: o.isCorrect,
        }));
      } else if (q.type === "text") {
        question.correctAnswer = q.correctAnswer;
      }

      return question;
    });
  }

  deleteQuiz(quiz: Quiz): void {
    if (confirm(`Êtes-vous sûr de vouloir supprimer le quiz "${quiz.title}" ?`)) {
      const index = this.quizzes.findIndex((q) => q.id === quiz.id);
      if (index !== -1) {
        this.quizzes.splice(index, 1);
        this.updateStats();
        this.filterQuizzes();
      }
    }
  }

  // Méthodes utilitaires
  formatDate(date: Date): string {
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }

  formatDateForInput(date: Date): string {
    return date.toISOString().split("T")[0];
  }

  formatTime(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}min` : `${mins} minutes`;
  }

  getUniqueSubjects(): string[] {
    const subjects = new Set<string>();
    this.quizzes.forEach((quiz) => subjects.add(quiz.subject));
    return Array.from(subjects).sort();
  }

  getResponseRate(quiz: Quiz): number {
    if (!quiz.students || quiz.students.length === 0) return 0;
    return Math.round(((quiz.responseCount || 0) / quiz.students.length) * 100);
  }

  getDaysLeft(date: Date): number {
    const now = new Date();
    return Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  }
}