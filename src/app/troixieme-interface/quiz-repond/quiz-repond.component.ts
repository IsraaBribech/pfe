import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

interface Notification {
  id: number;
  type: "cours" | "devoir" | "quiz";
  title: string;
  message: string;
  date: Date;
  read: boolean;
}

interface Question {
  id: string;
  texte: string;
  type: 'choix_unique' | 'choix_multiple' | 'texte';
  options?: {
    id: string;
    texte: string;
    estCorrect: boolean;
  }[];
  reponseTexte?: string;
  reponseUtilisateur?: string | string[];
  points: number;
}

interface Quiz {
  id: string;
  titre: string;
  description: string;
  matiere: string;
  dateCreation: Date;
  dateLimite: Date;
  duree: number; // en minutes
  fichierConsigne: string;
  estTermine: boolean;
  score?: number;
  dateCompletion?: Date;
  questions: Question[];
  type: 'cours' | 'td' | 'tp'; // Type de cours: Cours, TD ou TP
}

interface Matiere {
  nom: string;
  couleur: string;
  icon: string;
  enseignants: {
    cours: string;
    td: string;
    tp: string;
  };
}

@Component({
  selector: 'app-quiz-repond',
  templateUrl: './quiz-repond.component.html',
  styleUrls: ['./quiz-repond.component.css']
})
export class QuizRepondComponent implements OnInit {
  // Informations de l'étudiant
  etudiantName = 'Israa Bribech';
  etudiantEmail = 'israabribech2002@gmail.com';
  etudiantMatricule = 'E12345';

  // Onglet actif
  activeSemester: 'semestre1' | 'semestre2' = 'semestre1';

  // Filtres
  searchTerm = '';
  matiereFilter = '';
  typeFilter = '';

  // Tri
  sortColumn = 'dateLimite';
  sortDirection = 'asc';

  // Modal de quiz
  showQuizModal = false;
  selectedQuiz: Quiz | null = null;
  quizStarted = false;
  quizCompleted = false;
  currentQuestion = 0;
  isSubmitting = false;
  confirmationMessage = '';
  timerInterval: any = null;

  // Ajout pour les notifications
  notifications: Notification[] = [];
  showNotificationDropdown = false;

  // Matières du semestre 1
  matieresSemestre1: Matiere[] = [
    {
      nom: 'Programmation Web',
      couleur: '#6366f1',
      icon: 'fa-code',
      enseignants: {
        cours: 'Dr. Martin Dupont',
        td: 'Mme. Sophie Laurent',
        tp: 'M. Jean Petit'
      }
    },
    {
      nom: 'Bases de données',
      couleur: '#f59e0b',
      icon: 'fa-database',
      enseignants: {
        cours: 'Prof. Claire Dubois',
        td: 'M. Thomas Bernard',
        tp: 'Mme. Marie Leroy'
      }
    },
    {
      nom: 'Algorithmes avancés',
      couleur: '#10b981',
      icon: 'fa-sitemap',
      enseignants: {
        cours: 'Dr. Philippe Martin',
        td: 'M. Alexandre Blanc',
        tp: 'Mme. Julie Moreau'
      }
    }
  ];

  // Matières du semestre 2
  matieresSemestre2: Matiere[] = [
    {
      nom: 'Frameworks JavaScript',
      couleur: '#8b5cf6',
      icon: 'fa-js',
      enseignants: {
        cours: 'Dr. Julien Moreau',
        td: 'Mme. Claire Dubois',
        tp: 'M. Thomas Bernard'
      }
    },
    {
      nom: 'Développement Backend',
      couleur: '#10b981',
      icon: 'fa-server',
      enseignants: {
        cours: 'Prof. Lucie Girard',
        td: 'M. Philippe Martin',
        tp: 'Dr. Marc Dubois'
      }
    },
    {
      nom: 'Architecture logicielle',
      couleur: '#f59e0b',
      icon: 'fa-cubes',
      enseignants: {
        cours: 'Dr. Marc Dubois',
        td: 'Prof. Antoine Rousseau',
        tp: 'Mme. Nathalie Mercier'
      }
    }
  ];

  // Quiz du semestre 1
  quizzesSemestre1: Quiz[] = [];

  // Quiz du semestre 2
  quizzesSemestre2: Quiz[] = [];

  // Quiz filtrés
  filteredQuizzes: Quiz[] = [];

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.initializeQuizzes();
    this.filterQuizzes();
    this.loadNotifications();
  }

  // Écouteur d'événement pour fermer le dropdown quand on clique ailleurs
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    // Vérifier si le clic est en dehors du dropdown
    const target = event.target as HTMLElement;
    if (!target.closest('.notification-btn') && !target.closest('.notification-dropdown')) {
      this.closeNotificationDropdown();
    }
  }

  // Méthode pour charger les notifications
  loadNotifications(): void {
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    
    // Simuler quelques notifications
    this.notifications = [
      {
        id: 1,
        type: "cours",
        title: "Nouveau chapitre disponible",
        message: 'Le chapitre "Introduction aux bases de données relationnelles" a été ajouté.',
        date: now,
        read: false
      },
      {
        id: 2,
        type: "devoir",
        title: "Nouveau devoir assigné",
        message: 'Un nouveau devoir "Implémentation d\'un algorithme de tri" a été assigné.',
        date: yesterday,
        read: false
      },
      {
        id: 3,
        type: "quiz",
        title: "Nouveau quiz disponible",
        message: 'Un nouveau quiz sur "Les réseaux de neurones" est maintenant disponible.',
        date: yesterday,
        read: false
      }
    ];
  }

  // Méthode pour afficher/masquer le dropdown de notifications
  toggleNotificationDropdown(event?: MouseEvent): void {
    if (event) {
      event.stopPropagation();
    }
    this.showNotificationDropdown = !this.showNotificationDropdown;
  }

  // Méthode pour fermer le dropdown si on clique ailleurs
  closeNotificationDropdown(): void {
    this.showNotificationDropdown = false;
  }

  // Méthode pour marquer une notification comme lue
  markAsRead(notification: Notification): void {
    notification.read = true;
  }

  // Méthode pour obtenir le nombre de notifications non lues
  getUnreadNotificationsCount(): number {
    return this.notifications.filter(n => !n.read).length;
  }

  // Méthode pour obtenir l'icône en fonction du type de notification
  getNotificationIcon(type: string): string {
    switch (type) {
      case "cours":
        return "fa-book";
      case "devoir":
        return "fa-tasks";
      case "quiz":
        return "fa-question-circle";
      default:
        return "fa-bell";
    }
  }

  // Méthode pour formater le temps écoulé
  formatTimeAgo(date: Date): string {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) {
      return "À l'instant";
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `Il y a ${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""}`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `Il y a ${diffInHours} heure${diffInHours > 1 ? "s" : ""}`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) {
      return `Il y a ${diffInDays} jour${diffInDays > 1 ? "s" : ""}`;
    }

    return this.formatDate(date);
  }

  // Méthode pour naviguer vers la page de notifications
  navigateToNotifications(): void {
    this.router.navigate(["/troixieme-interface/notification"]);
    this.closeNotificationDropdown();
  }

  // Initialiser les quiz
  initializeQuizzes(): void {
    // Générer les quiz pour le semestre 1
    this.quizzesSemestre1 = [];
    this.matieresSemestre1.forEach(matiere => {
      // Quiz de cours
      this.quizzesSemestre1.push(this.createQuiz(
        `quiz-s1-${this.slugify(matiere.nom)}-cours`,
        `Quiz sur ${matiere.nom}`,
        `Ce quiz évalue vos connaissances sur les concepts fondamentaux de ${matiere.nom}.`,
        matiere.nom,
        new Date(2023, 8, 15),
        new Date(2023, 9, 15),
        30,
        `assets/quiz/${this.slugify(matiere.nom)}/cours/quiz.pdf`,
        false,
        'cours'
      ));

      // Quiz de TD
      this.quizzesSemestre1.push(this.createQuiz(
        `quiz-s1-${this.slugify(matiere.nom)}-td`,
        `TD - Exercices pratiques sur ${matiere.nom}`,
        `Ce quiz contient des exercices pratiques sur l'application des concepts de ${matiere.nom}.`,
        matiere.nom,
        new Date(2023, 8, 20),
        new Date(2023, 9, 20),
        45,
        `assets/quiz/${this.slugify(matiere.nom)}/td/quiz.pdf`,
        Math.random() > 0.7, // Aléatoirement terminé ou non
        'td'
      ));

      // Quiz de TP
      this.quizzesSemestre1.push(this.createQuiz(
        `quiz-s1-${this.slugify(matiere.nom)}-tp`,
        `TP - Projet pratique sur ${matiere.nom}`,
        `Ce quiz évalue votre capacité à appliquer les concepts de ${matiere.nom} dans un projet pratique.`,
        matiere.nom,
        new Date(2023, 8, 25),
        new Date(2023, 9, 25),
        60,
        `assets/quiz/${this.slugify(matiere.nom)}/tp/quiz.pdf`,
        false,
        'tp'
      ));
    });

    // Générer les quiz pour le semestre 2
    this.quizzesSemestre2 = [];
    this.matieresSemestre2.forEach(matiere => {
      // Quiz de cours
      this.quizzesSemestre2.push(this.createQuiz(
        `quiz-s2-${this.slugify(matiere.nom)}-cours`,
        `Quiz sur ${matiere.nom}`,
        `Ce quiz évalue vos connaissances sur les concepts fondamentaux de ${matiere.nom}.`,
        matiere.nom,
        new Date(2024, 1, 15),
        new Date(2024, 2, 15),
        30,
        `assets/quiz/${this.slugify(matiere.nom)}/cours/quiz.pdf`,
        false,
        'cours'
      ));

      // Quiz de TD
      this.quizzesSemestre2.push(this.createQuiz(
        `quiz-s2-${this.slugify(matiere.nom)}-td`,
        `TD - Exercices pratiques sur ${matiere.nom}`,
        `Ce quiz contient des exercices pratiques sur l'application des concepts de ${matiere.nom}.`,
        matiere.nom,
        new Date(2024, 1, 20),
        new Date(2024, 2, 20),
        45,
        `assets/quiz/${this.slugify(matiere.nom)}/td/quiz.pdf`,
        false,
        'td'
      ));

      // Quiz de TP
      this.quizzesSemestre2.push(this.createQuiz(
        `quiz-s2-${this.slugify(matiere.nom)}-tp`,
        `TP - Projet pratique sur ${matiere.nom}`,
        `Ce quiz évalue votre capacité à appliquer les concepts de ${matiere.nom} dans un projet pratique.`,
        matiere.nom,
        new Date(2024, 1, 25),
        new Date(2024, 2, 25),
        60,
        `assets/quiz/${this.slugify(matiere.nom)}/tp/quiz.pdf`,
        false,
        'tp'
      ));
    });
  }

  // Créer un quiz
  createQuiz(id: string, titre: string, description: string, matiere: string, dateCreation: Date, dateLimite: Date, duree: number, fichierConsigne: string, estTermine: boolean, type: 'cours' | 'td' | 'tp'): Quiz {
    const quiz: Quiz = {
      id,
      titre,
      description,
      matiere,
      dateCreation,
      dateLimite,
      duree,
      fichierConsigne,
      estTermine,
      type,
      questions: []
    };

    // Ajouter des questions au quiz
    quiz.questions = this.generateQuestions(quiz.id, quiz.matiere, quiz.type);

    // Si le quiz est terminé, ajouter une date de complétion et un score
    if (estTermine) {
      quiz.dateCompletion = new Date(dateLimite.getTime() - Math.random() * 5 * 24 * 60 * 60 * 1000); // Entre 0 et 5 jours avant la date limite
      quiz.score = Math.floor(Math.random() * 31) + 70; // Score entre 70 et 100
    }

    return quiz;
  }

  // Générer des questions pour un quiz
  generateQuestions(quizId: string, matiere: string, type: 'cours' | 'td' | 'tp'): Question[] {
    const questions: Question[] = [];
    const nbQuestions = Math.floor(Math.random() * 3) + 3; // Entre 3 et 5 questions

    for (let i = 1; i <= nbQuestions; i++) {
      const questionType = this.getRandomQuestionType();
      const question: Question = {
        id: `${quizId}-q${i}`,
        texte: this.generateQuestionText(i, matiere, type),
        type: questionType,
        points: questionType === 'texte' ? 5 : (questionType === 'choix_multiple' ? 3 : 2)
      };

      if (questionType === 'choix_unique' || questionType === 'choix_multiple') {
        question.options = this.generateOptions(question.id);
      }

      questions.push(question);
    }

    return questions;
  }

  // Générer un texte de question
  generateQuestionText(index: number, matiere: string, type: 'cours' | 'td' | 'tp'): string {
    const typeLabel = this.getTypeLabel(type);
    const questions = [
      `Question ${index}: Expliquez le concept principal de ${matiere} abordé dans ce ${typeLabel}.`,
      `Question ${index}: Quels sont les avantages et inconvénients de l'approche présentée en ${matiere}?`,
      `Question ${index}: Comment appliquer les principes de ${matiere} dans un contexte professionnel?`,
      `Question ${index}: Analysez les différentes méthodes utilisées en ${matiere}.`,
      `Question ${index}: Quelles sont les tendances actuelles dans le domaine de ${matiere}?`
    ];
    return questions[Math.floor(Math.random() * questions.length)];
  }

  // Générer des options pour une question à choix
  generateOptions(questionId: string): { id: string; texte: string; estCorrect: boolean; }[] {
    const options = [];
    const nbOptions = 4;
    const correctOptionIndex = Math.floor(Math.random() * nbOptions);

    for (let i = 0; i < nbOptions; i++) {
      options.push({
        id: `${questionId}-o${i + 1}`,
        texte: `Option ${i + 1}`,
        estCorrect: i === correctOptionIndex
      });
    }

    return options;
  }

  // Obtenir un type de question aléatoire
  getRandomQuestionType(): 'choix_unique' | 'choix_multiple' | 'texte' {
    const types: ('choix_unique' | 'choix_multiple' | 'texte')[] = ['choix_unique', 'choix_multiple', 'texte'];
    return types[Math.floor(Math.random() * types.length)];
  }

  // Convertir un nom en slug pour les chemins de fichiers
  slugify(text: string): string {
    return text
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  }

  // Changer de semestre
  changeSemester(semester: 'semestre1' | 'semestre2'): void {
    this.activeSemester = semester;
    this.filterQuizzes();
  }

  // Filtrer les quiz
  filterQuizzes(): void {
    let quizzes = this.activeSemester === 'semestre1' ? this.quizzesSemestre1 : this.quizzesSemestre2;

    // Filtre par recherche
    if (this.searchTerm) {
      const searchLower = this.searchTerm.toLowerCase();
      quizzes = quizzes.filter(quiz => 
        quiz.titre.toLowerCase().includes(searchLower) || 
        quiz.description.toLowerCase().includes(searchLower) ||
        quiz.matiere.toLowerCase().includes(searchLower) ||
        this.getEnseignantByType(quiz.matiere, quiz.type).toLowerCase().includes(searchLower)
      );
    }

    // Filtre par matière
    if (this.matiereFilter) {
      quizzes = quizzes.filter(quiz => quiz.matiere === this.matiereFilter);
    }

    // Filtre par type
    if (this.typeFilter) {
      quizzes = quizzes.filter(quiz => quiz.type === this.typeFilter);
    }

    // Tri
    quizzes = this.sortQuizzes(quizzes);

    this.filteredQuizzes = quizzes;
  }

  // Trier les quiz
  sortTable(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.filterQuizzes();
  }

  // Obtenir l'icône de tri
  getSortIcon(column: string): string {
    if (this.sortColumn !== column) {
      return 'fa-sort';
    }
    return this.sortDirection === 'asc' ? 'fa-sort-up' : 'fa-sort-down';
  }

  // Trier les quiz
  sortQuizzes(quizzes: Quiz[]): Quiz[] {
    return quizzes.sort((a, b) => {
      let comparison = 0;
      
      switch (this.sortColumn) {
        case 'enseignant':
          comparison = this.getEnseignantByType(a.matiere, a.type).localeCompare(this.getEnseignantByType(b.matiere, b.type));
          break;
        case 'matiere':
          comparison = a.matiere.localeCompare(b.matiere);
          break;
        case 'type':
          comparison = a.type.localeCompare(b.type);
          break;
        case 'dateCreation':
          comparison = a.dateCreation.getTime() - b.dateCreation.getTime();
          break;
        case 'dateLimite':
          comparison = a.dateLimite.getTime() - b.dateLimite.getTime();
          break;
        default:
          comparison = a.dateLimite.getTime() - b.dateLimite.getTime();
      }
      
      return this.sortDirection === 'asc' ? comparison : -comparison;
    });
  }

  // Obtenir les matières uniques pour le semestre actif
  getUniqueMatieresForSemester(): string[] {
    const quizzes = this.activeSemester === 'semestre1' ? this.quizzesSemestre1 : this.quizzesSemestre2;
    const matieres = new Set<string>();
    quizzes.forEach(quiz => matieres.add(quiz.matiere));
    return Array.from(matieres).sort();
  }

  // Obtenir l'enseignant selon le type de cours
  getEnseignantByType(matiereName: string, type: 'cours' | 'td' | 'tp'): string {
    const matieres = [...this.matieresSemestre1, ...this.matieresSemestre2];
    const matiere = matieres.find(m => m.nom === matiereName);
    
    if (matiere && matiere.enseignants) {
      return matiere.enseignants[type];
    }
    
    return 'Enseignant inconnu';
  }

  // Obtenir l'initiale de l'enseignant
  getEnseignantInitial(quiz: Quiz): string {
    const enseignant = this.getEnseignantByType(quiz.matiere, quiz.type);
    return enseignant.charAt(0);
  }

  // Obtenir la couleur de la matière
  getMatiereCouleur(matiereName: string): string {
    const matieres = [...this.matieresSemestre1, ...this.matieresSemestre2];
    const matiere = matieres.find(m => m.nom === matiereName);
    return matiere ? matiere.couleur : '#6366f1';
  }

  // Obtenir l'icône de la matière
  getMatiereIcon(matiereName: string): string {
    const matieres = [...this.matieresSemestre1, ...this.matieresSemestre2];
    const matiere = matieres.find(m => m.nom === matiereName);
    return matiere ? matiere.icon : 'fa-book';
  }

  // Obtenir le libellé pour un type de cours
  getTypeLabel(type: string): string {
    switch (type) {
      case 'cours':
        return 'Cours';
      case 'td':
        return 'TD';
      case 'tp':
        return 'TP';
      default:
        return type;
    }
  }

  // Commencer un quiz
  commencerQuiz(quiz: Quiz): void {
    this.selectedQuiz = quiz;
    this.showQuizModal = true;
    this.quizStarted = false;
    this.quizCompleted = false;
    this.currentQuestion = 0;
    this.confirmationMessage = '';
  }

  // Fermer le modal de quiz
  closeQuizModal(event: Event): void {
    if (
      event.target === event.currentTarget || 
      (event.target as HTMLElement).classList.contains('modal-close') ||
      (event.target as HTMLElement).classList.contains('btn-cancel')
    ) {
      this.showQuizModal = false;
      this.selectedQuiz = null;
      this.quizStarted = false;
      this.quizCompleted = false;
      this.confirmationMessage = '';
      this.stopTimer();
    }
  }

  // Démarrer le quiz
  startQuiz(): void {
    if (this.selectedQuiz) {
      this.quizStarted = true;
      this.quizCompleted = false;
      this.currentQuestion = 0;

      // Initialiser les réponses utilisateur
      this.selectedQuiz.questions.forEach(question => {
        if (question.type === 'choix_unique') {
          question.reponseUtilisateur = '';
        } else if (question.type === 'choix_multiple') {
          question.reponseUtilisateur = [];
        } else if (question.type === 'texte') {
          question.reponseUtilisateur = '';
        }
      });

      // Démarrer le timer
      this.startTimer();
    }
  }

  // Démarrer le timer
  startTimer(): void {
    if (this.selectedQuiz) {
      const endTime = new Date().getTime() + this.selectedQuiz.duree * 60 * 1000;
      
      this.timerInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = endTime - now;
        
        if (distance <= 0) {
          this.terminerQuiz();
        }
      }, 1000);
    }
  }

  // Arrêter le timer
  stopTimer(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  // Passer à la question suivante
  nextQuestion(): void {
    if (this.selectedQuiz && this.currentQuestion < this.selectedQuiz.questions.length - 1) {
      this.currentQuestion++;
    }
  }

  // Revenir à la question précédente
  previousQuestion(): void {
    if (this.currentQuestion > 0) {
      this.currentQuestion--;
    }
  }

  // Terminer le quiz
  terminerQuiz(): void {
    this.stopTimer();
    this.quizStarted = false;
    this.quizCompleted = true;

    if (this.selectedQuiz) {
      // Calculer le score
      let pointsTotal = 0;
      let pointsObtenus = 0;

      this.selectedQuiz.questions.forEach(question => {
        pointsTotal += question.points;

        if (question.type === 'choix_unique') {
          const reponseUtilisateur = question.reponseUtilisateur as string;
          const optionSelectionnee = question.options?.find(option => option.id === reponseUtilisateur);
          if (optionSelectionnee && optionSelectionnee.estCorrect) {
            pointsObtenus += question.points;
          }
        } else if (question.type === 'choix_multiple') {
          const reponsesUtilisateur = question.reponseUtilisateur as string[];
          const optionsCorrectes = question.options?.filter(option => option.estCorrect).map(option => option.id) || [];
          const optionsSelectionnees = reponsesUtilisateur || [];

          // Vérifier si toutes les options correctes sont sélectionnées et aucune incorrecte
          const toutesCorrectesSelectionnees = optionsCorrectes.every(id => optionsSelectionnees.includes(id));
          const aucuneIncorrecteSelectionnee = optionsSelectionnees.every(id => optionsCorrectes.includes(id));

          if (toutesCorrectesSelectionnees && aucuneIncorrecteSelectionnee) {
            pointsObtenus += question.points;
          } else if (toutesCorrectesSelectionnees || aucuneIncorrecteSelectionnee) {
            // Points partiels si certaines bonnes réponses
            pointsObtenus += question.points / 2;
          }
        }
        // Pour les questions de type texte, elles seront évaluées par l'enseignant
      });

      // Calculer le pourcentage
      const pourcentage = Math.round((pointsObtenus / pointsTotal) * 100);

      // Mettre à jour le quiz
      this.selectedQuiz.score = pourcentage;
    }
  }

  // Soumettre le quiz
  soumettreQuiz(): void {
    this.isSubmitting = true;

    // Simuler un délai de soumission
    setTimeout(() => {
      if (this.selectedQuiz) {
        // Dans une application réelle, vous enverriez les réponses à un serveur
        console.log('Soumission du quiz:', {
          matiere: this.selectedQuiz.matiere,
          quiz: this.selectedQuiz.titre,
          reponses: this.selectedQuiz.questions.map(q => ({
            id: q.id,
            reponse: q.reponseUtilisateur
          })),
          email: this.etudiantEmail,
          date: new Date()
        });

        // Mettre à jour l'état du quiz
        this.selectedQuiz.estTermine = true;
        this.selectedQuiz.dateCompletion = new Date();

        // Mettre à jour les quiz filtrés
        this.filterQuizzes();

        // Afficher un message de confirmation
        this.confirmationMessage = 'Votre quiz a été soumis avec succès !';

        this.isSubmitting = false;
      }
    }, 2000);
  }

  // Gérer les réponses à choix unique
  onChoixUnique(questionId: string, optionId: string): void {
    if (this.selectedQuiz) {
      const question = this.selectedQuiz.questions.find(q => q.id === questionId);
      if (question) {
        question.reponseUtilisateur = optionId;
      }
    }
  }

  // Gérer les réponses à choix multiple
  onChoixMultiple(questionId: string, optionId: string, event: any): void {
    if (this.selectedQuiz) {
      const question = this.selectedQuiz.questions.find(q => q.id === questionId);
      if (question) {
        const reponses = (question.reponseUtilisateur as string[]) || [];

        if (event.target.checked) {
          if (!reponses.includes(optionId)) {
            question.reponseUtilisateur = [...reponses, optionId];
          }
        } else {
          question.reponseUtilisateur = reponses.filter(id => id !== optionId);
        }
      }
    }
  }

  // Gérer les réponses textuelles
  onTextareaInput(event: Event, questionId: string): void {
    const target = event.target as HTMLTextAreaElement;
    if (target && this.selectedQuiz) {
      const question = this.selectedQuiz.questions.find(q => q.id === questionId);
      if (question) {
        question.reponseUtilisateur = target.value;
      }
    }
  }

  // Vérifier si une option est sélectionnée (choix unique)
  isOptionSelected(questionId: string, optionId: string): boolean {
    if (this.selectedQuiz) {
      const question = this.selectedQuiz.questions.find(q => q.id === questionId);
      if (question && question.reponseUtilisateur) {
        return question.reponseUtilisateur === optionId;
      }
    }
    return false;
  }

  // Vérifier si une option est sélectionnée (choix multiple)
  isOptionChecked(questionId: string, optionId: string): boolean {
    if (this.selectedQuiz) {
      const question = this.selectedQuiz.questions.find(q => q.id === questionId);
      if (question && question.reponseUtilisateur) {
        const reponses = question.reponseUtilisateur as string[];
        return reponses.includes(optionId);
      }
    }
    return false;
  }

  // Obtenir le texte d'une option
  getOptionTexte(question: Question, optionId: string | string[]): string {
    if (!question.options) return 'Non répondu';

    if (typeof optionId === 'string') {
      const option = question.options.find(o => o.id === optionId);
      return option ? option.texte : 'Non répondu';
    }

    return 'Non répondu';
  }

  // Vérifier si une question a des réponses
  hasResponses(question: Question): boolean {
    if (!question.reponseUtilisateur) return false;

    if (Array.isArray(question.reponseUtilisateur)) {
      return question.reponseUtilisateur.length > 0;
    }

    return question.reponseUtilisateur !== '';
  }

  // Obtenir un tableau de réponses
  getResponseArray(question: Question): string[] {
    if (!question.reponseUtilisateur) return [];

    if (Array.isArray(question.reponseUtilisateur)) {
      return question.reponseUtilisateur;
    }

    return [];
  }

  // Formater les dates
  formatDate(date: Date): string {
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }

  // Vérifier si un quiz est en retard
  isLate(quiz: Quiz): boolean {
    const today = new Date();
    return !quiz.estTermine && today > quiz.dateLimite;
  }

  // Vérifier si un quiz est proche de la date limite
  isCloseToDeadline(quiz: Quiz): boolean {
    const today = new Date();
    const diffTime = quiz.dateLimite.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return !quiz.estTermine && diffDays <= 3 && diffDays > 0;
  }

  // Obtenir le nombre de jours restants
  getJoursRestants(dateLimite: Date): number {
    const today = new Date();
    const diffTime = dateLimite.getTime() - today.getTime();
    return Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  }

  // Obtenir la classe CSS pour une ligne de tableau
  getRowClass(quiz: Quiz): string {
    if (quiz.estTermine) {
      return 'row-termine';
    } else if (this.isLate(quiz)) {
      return 'row-retard';
    } else if (this.isCloseToDeadline(quiz)) {
      return 'row-proche';
    }
    return '';
  }

  // Générer un quiz IA
  genererQuizIA(): void {
    // Sélectionner une matière aléatoire du semestre actif
    const matieres = this.activeSemester === 'semestre1' ? this.matieresSemestre1 : this.matieresSemestre2;
    const matiere = matieres[Math.floor(Math.random() * matieres.length)];
    
    // Sélectionner un type aléatoire
    const types: ('cours' | 'td' | 'tp')[] = ['cours', 'td', 'tp'];
    const type = types[Math.floor(Math.random() * types.length)];
    
    // Créer un nouveau quiz IA
    const newQuiz = this.createQuiz(
      `quiz-ia-${this.slugify(matiere.nom)}-${type}-${Date.now()}`,
      `Quiz IA sur ${matiere.nom} (${this.getTypeLabel(type)})`,
      `Ce quiz généré par l'IA teste vos connaissances sur ${matiere.nom} (${this.getTypeLabel(type)}).`,
      matiere.nom,
      new Date(),
      new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000), // +7 jours
      30,
      `assets/quiz/${this.slugify(matiere.nom)}/${type}/quiz-ia.pdf`,
      false,
      type
    );
    
    // Ajouter le quiz à la liste correspondante
    if (this.activeSemester === 'semestre1') {
      this.quizzesSemestre1.push(newQuiz);
    } else {
      this.quizzesSemestre2.push(newQuiz);
    }
    
    // Mettre à jour les quiz filtrés
    this.filterQuizzes();
    
    // Afficher un message de confirmation
    alert(`Un nouveau quiz IA sur ${matiere.nom} (${this.getTypeLabel(type)}) a été généré avec succès !`);
  }
}