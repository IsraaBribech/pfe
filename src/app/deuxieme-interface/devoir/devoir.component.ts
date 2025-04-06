import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Devoir {
  _id: string;
  title: string;
  description: string;
  cour: string;
  departement: string;
  niveau: string;
  specialite: string;
  dueDate: Date;
  createdAt: Date;
  assignedCount?: number;
  submissionsCount?: number;
  submissions?: any[];
  etudiants?: any[];
  file?: string;
  fileName?: string;
}

interface Submission {
  _id: string;
  devoirId: string;
  etudiantId: string;
  etudiantName: string;
  submittedAt: Date;
  file?: string;
  fileName?: string;
  comment?: string;
  evaluated: boolean;
  note?: number;
  feedback?: string;
}

@Component({
  selector: 'app-devoir',
  templateUrl: './devoir.component.html',
  styleUrls: ['./devoir.component.css']
})
export class DevoirComponent implements OnInit {
  // Teacher Information
  id = 'T123';
  enseignantName = 'Israa Bribech';
  enseignantEmail = 'israabribech2002@gmail.com';

  // Statistics
  devoirsStats = { 
    total: 0,
    active: 0,
    submissions: 0
  };
  activeCount = 0;
  submissionsCount = 0;

  // Devoirs
  devoirs: Devoir[] = [];
  filteredDevoirs: Devoir[] = [];
  selectedDevoir: Devoir | null = null;

  // Cours
  cours: any[] = [];
  filteredCours: any[] = [];

  // Départements, Niveaux et Spécialités
  departements: any[] = [];
  niveaux: any[] = [];
  specialites: any[] = [];
  filteredSpecialites: any[] = [];
  formFilteredSpecialites: any[] = [];

  // Étudiants
  etudiants: any[] = [];
  filteredEtudiants: any[] = [];
  etudiantSearchTerm = '';

  // Submissions
  submissions: Submission[] = [];
  filteredSubmissions: Submission[] = [];
  selectedSubmission: Submission | null = null;
  submissionSearchTerm = '';

  // Filters
  filters = {
    departement: '',
    niveau: '',
    specialite: '',
    status: ''
  };
  searchTerm = '';

  // View Mode
  viewMode = 'grid'; // 'grid' or 'list'
  activeTab = 'all'; // 'all', 'active', 'submitted'
  detailsTab = 'submissions'; // 'submissions', 'etudiants'

  // Forms
  devoirForm!: FormGroup;
  evaluationForm!: FormGroup;
  editMode = false;
  devoirToEdit: Devoir | null = null;

  // File inputs
  @ViewChild('devoirFileInput') devoirFileInput!: ElementRef;
  devoirFile: File | null = null;

  // Active Modal
  activeModal: string | null = null;

  constructor(private fb: FormBuilder) {
    this.initializeForms();
  }

  ngOnInit(): void {
    this.loadMockData();
    this.filterDevoirs();
  }

  private initializeForms(): void {
    this.devoirForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      cour: ['', Validators.required],
      departement: ['', Validators.required],
      niveau: ['', Validators.required],
      specialite: ['', Validators.required],
      dueDate: ['', Validators.required],
      notifyEtudiants: [true]
    });

    this.evaluationForm = this.fb.group({
      note: ['', [Validators.required, Validators.min(0), Validators.max(20)]],
      feedback: ['', Validators.required],
      notifyEtudiant: [true]
    });

    // Listen for form changes
    this.devoirForm.get('departement')?.valueChanges.subscribe((value) => {
      this.onFormDepartementChange({ target: { value } });
    });

    this.devoirForm.get('cour')?.valueChanges.subscribe((value) => {
      if (value) {
        const selectedCour = this.cours.find(c => c._id === value);
        if (selectedCour) {
          this.devoirForm.patchValue({
            departement: selectedCour.departement,
            niveau: selectedCour.niveau,
            specialite: selectedCour.specialite
          }, { emitEvent: false });
        }
      }
    });
  }

  // Méthode pour charger les données mock
  loadMockData(): void {
    // Charger les départements
    this.departements = [
      { _id: 'dep1', name: 'Informatique' },
      { _id: 'dep2', name: 'Mathématiques' },
      { _id: 'dep3', name: 'Physique' }
    ];
    
    // Charger les niveaux
    this.niveaux = [
      { _id: 'niv1', name: 'Licence 1' },
      { _id: 'niv2', name: 'Licence 2' },
      { _id: 'niv3', name: 'Licence 3' },
      { _id: 'niv4', name: 'Master 1' },
      { _id: 'niv5', name: 'Master 2' }
    ];
    
    // Charger les spécialités
    this.specialites = [
      { _id: 'spe1', name: 'Développement Web', departement: 'dep1' },
      { _id: 'spe2', name: 'Intelligence Artificielle', departement: 'dep1' },
      { _id: 'spe3', name: 'Algèbre', departement: 'dep2' },
      { _id: 'spe4', name: 'Analyse', departement: 'dep2' },
      { _id: 'spe5', name: 'Mécanique Quantique', departement: 'dep3' }
    ];
    
    this.filteredSpecialites = [...this.specialites];
    this.formFilteredSpecialites = [...this.specialites];
    
    // Charger les cours
    this.cours = [
      { _id: 'c1', title: 'Introduction à Angular', departement: 'dep1', niveau: 'niv3', specialite: 'spe1' },
      { _id: 'c2', title: 'Machine Learning avec Python', departement: 'dep1', niveau: 'niv4', specialite: 'spe2' },
      { _id: 'c3', title: 'Algèbre linéaire avancée', departement: 'dep2', niveau: 'niv4', specialite: 'spe3' }
    ];
    
    this.filteredCours = [...this.cours];
    
    // Charger les étudiants
    this.etudiants = [
      { _id: 'e1', name: 'Jean Dupont', email: 'jean.dupont@email.com', matricule: 'E12345', niveau: 'niv3', specialite: 'spe1' },
      { _id: 'e2', name: 'Marie Martin', email: 'marie.martin@email.com', matricule: 'E12346', niveau: 'niv3', specialite: 'spe1' },
      { _id: 'e3', name: 'Pierre Durand', email: 'pierre.durand@email.com', matricule: 'E12347', niveau: 'niv4', specialite: 'spe2' }
    ];
    
    // Charger les devoirs
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);
    const lastWeek = new Date(today);
    lastWeek.setDate(today.getDate() - 7);
    const nextMonth = new Date(today);
    nextMonth.setMonth(today.getMonth() + 1);
    
    this.devoirs = [
      {
        _id: 'd1',
        title: 'Projet Angular',
        description: 'Créer une application de gestion de tâches avec Angular',
        cour: 'c1',
        departement: 'dep1',
        niveau: 'niv3',
        specialite: 'spe1',
        dueDate: nextWeek,
        createdAt: lastWeek,
        assignedCount: 25,
        submissionsCount: 15,
        submissions: [
          {
            _id: 's1',
            devoirId: 'd1',
            etudiantId: 'e1',
            etudiantName: 'Jean Dupont',
            submittedAt: new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000),
            fileName: 'projet-angular-jean.zip',
            comment: 'Voici mon projet Angular',
            evaluated: true,
            note: 18,
            feedback: 'Excellent travail, très bonne structure du code.'
          },
          {
            _id: 's2',
            devoirId: 'd1',
            etudiantId: 'e2',
            etudiantName: 'Marie Martin',
            submittedAt: new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000),
            fileName: 'projet-angular-marie.zip',
            comment: 'J\'ai ajouté des fonctionnalités supplémentaires',
            evaluated: false
          }
        ],
        etudiants: [
          { 
            _id: 'e1', 
            name: 'Jean Dupont', 
            email: 'jean.dupont@email.com', 
            matricule: 'E12345', 
            niveau: 'niv3', 
            specialite: 'spe1',
            submitted: true
          },
          { 
            _id: 'e2', 
            name: 'Marie Martin', 
            email: 'marie.martin@email.com', 
            matricule: 'E12346', 
            niveau: 'niv3', 
            specialite: 'spe1',
            submitted: true
          }
        ],
        file: 'devoir-angular.pdf',
        fileName: 'Projet Angular - Instructions.pdf'
      },
      {
        _id: 'd2',
        title: 'Algorithmes de Machine Learning',
        description: 'Implémenter différents algorithmes de classification',
        cour: 'c2',
        departement: 'dep1',
        niveau: 'niv4',
        specialite: 'spe2',
        dueDate: nextMonth,
        createdAt: today,
        assignedCount: 18,
        submissionsCount: 0,
        submissions: [],
        etudiants: [
          { 
            _id: 'e3', 
            name: 'Pierre Durand', 
            email: 'pierre.durand@email.com', 
            matricule: 'E12347', 
            niveau: 'niv4', 
            specialite: 'spe2',
            submitted: false
          }
        ],
        file: 'devoir-ml.pdf',
        fileName: 'Algorithmes ML - Instructions.pdf'
      },
      {
        _id: 'd3',
        title: 'Exercices d\'algèbre',
        description: 'Résoudre les exercices du chapitre 5',
        cour: 'c3',
        departement: 'dep2',
        niveau: 'niv4',
        specialite: 'spe3',
        dueDate: lastWeek,
        createdAt: new Date(lastWeek.getTime() - 7 * 24 * 60 * 60 * 1000),
        assignedCount: 15,
        submissionsCount: 12,
        submissions: [],
        etudiants: [],
        file: 'exercices-algebre.pdf',
        fileName: 'Exercices Algèbre - Chapitre 5.pdf'
      }
    ];
    
    this.filteredDevoirs = [...this.devoirs];
    
    // Mettre à jour les statistiques
    this.updateStats();
  }

  updateStats(): void {
    const now = new Date();
    
    this.devoirsStats.total = this.devoirs.length;
    
    this.devoirsStats.active = this.devoirs.filter(d => {
      const dueDate = new Date(d.dueDate);
      return dueDate > now && new Date(d.createdAt) <= now;
    }).length;
    
    this.devoirsStats.submissions = this.devoirs.reduce((acc, devoir) => {
      return acc + (devoir.submissions?.filter(s => !s.evaluated)?.length || 0);
    }, 0);
    
    this.activeCount = this.devoirsStats.active;
    this.submissionsCount = this.devoirsStats.submissions;
  }

  onDepartementChange(event: any): void {
    const departementId = event.target.value;
    if (!departementId) {
      this.filteredSpecialites = [...this.specialites];
      return;
    }

    this.filteredSpecialites = this.specialites.filter(
      (specialite) => specialite.departement === departementId
    );
  }

  onFormDepartementChange(event: any): void {
    const departementId = event.target.value;
    if (!departementId) {
      this.formFilteredSpecialites = [...this.specialites];
      return;
    }

    this.formFilteredSpecialites = this.specialites.filter(
      (specialite) => specialite.departement === departementId
    );
  }

  onCourChange(event: any): void {
    const courId = event.target.value;
    if (!courId) return;

    const selectedCour = this.cours.find(c => c._id === courId);
    if (selectedCour) {
      this.devoirForm.patchValue({
        departement: selectedCour.departement,
        niveau: selectedCour.niveau,
        specialite: selectedCour.specialite
      });
    }
  }

  filterDevoirs(): void {
    let filtered = [...this.devoirs];

    // Filtrer par onglet actif
    if (this.activeTab === 'active') {
      filtered = filtered.filter(d => this.isDevoirActive(d));
    } else if (this.activeTab === 'submitted') {
      filtered = filtered.filter(d => (d.submissions?.some(s => !s.evaluated) || false));
    }

    // Appliquer les filtres de département, niveau et spécialité
    if (this.filters.departement) {
      filtered = filtered.filter(
        (devoir) => devoir.departement === this.filters.departement
      );
    }

    if (this.filters.niveau) {
      filtered = filtered.filter(
        (devoir) => devoir.niveau === this.filters.niveau
      );
    }

    if (this.filters.specialite) {
      filtered = filtered.filter(
        (devoir) => devoir.specialite === this.filters.specialite
      );
    }

    // Appliquer le filtre de statut
    if (this.filters.status) {
      if (this.filters.status === 'active') {
        filtered = filtered.filter(d => this.isDevoirActive(d));
      } else if (this.filters.status === 'expired') {
        filtered = filtered.filter(d => this.isDevoirExpired(d));
      } else if (this.filters.status === 'upcoming') {
        filtered = filtered.filter(d => this.isDevoirUpcoming(d));
      }
    }

    // Appliquer le filtre de recherche
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase().trim();
      filtered = filtered.filter(
        (devoir) => 
          devoir.title.toLowerCase().includes(term) ||
          devoir.description.toLowerCase().includes(term) ||
          this.getCourTitle(devoir.cour).toLowerCase().includes(term)
      );
    }

    this.filteredDevoirs = filtered;
  }

  resetFilters(): void {
    this.filters = {
      departement: '',
      niveau: '',
      specialite: '',
      status: ''
    };
    this.searchTerm = '';
    this.filterDevoirs();
  }

  filterSubmissions(): void {
    if (!this.selectedDevoir || !this.selectedDevoir.submissions) {
      this.filteredSubmissions = [];
      return;
    }

    if (!this.submissionSearchTerm.trim()) {
      this.filteredSubmissions = [...this.selectedDevoir.submissions];
      return;
    }

    const term = this.submissionSearchTerm.toLowerCase().trim();
    this.filteredSubmissions = this.selectedDevoir.submissions.filter(
      (submission) => submission.etudiantName.toLowerCase().includes(term)
    );
  }

  filterEtudiants(): void {
    if (!this.selectedDevoir || !this.selectedDevoir.etudiants) {
      this.filteredEtudiants = [];
      return;
    }

    if (!this.etudiantSearchTerm.trim()) {
      this.filteredEtudiants = [...this.selectedDevoir.etudiants];
      return;
    }

    const term = this.etudiantSearchTerm.toLowerCase().trim();
    this.filteredEtudiants = this.selectedDevoir.etudiants.filter(
      (etudiant) =>
        etudiant.name.toLowerCase().includes(term) ||
        etudiant.email.toLowerCase().includes(term) ||
        etudiant.matricule.toLowerCase().includes(term)
    );
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
    this.filterDevoirs();
  }

  setDetailsTab(tab: string): void {
    this.detailsTab = tab;
    if (tab === 'submissions') {
      this.submissionSearchTerm = '';
      this.filterSubmissions();
    } else if (tab === 'etudiants') {
      this.etudiantSearchTerm = '';
      this.filterEtudiants();
    }
  }

  getTabTitle(): string {
    switch (this.activeTab) {
      case 'active':
        return 'Devoirs actifs';
      case 'submitted':
        return 'Soumissions à évaluer';
      default:
        return 'Tous les devoirs';
    }
  }

  showModal(modalType: string): void {
    this.activeModal = modalType;

    if (modalType === 'nouveauDevoir') {
      if (!this.editMode) {
        this.devoirForm.reset({
          notifyEtudiants: true
        });
        this.devoirFile = null;
        if (this.devoirFileInput) {
          this.devoirFileInput.nativeElement.value = '';
        }
      }
    }
  }

  hideModal(): void {
    this.activeModal = null;
    this.editMode = false;
    this.devoirToEdit = null;
    this.selectedSubmission = null;
  }

  onDevoirFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.devoirFile = input.files[0];
    }
  }

  submitDevoirForm(): void {
    if (this.devoirForm.valid) {
      const devoirData = {
        ...this.devoirForm.value,
        teacher: this.id
      };

      if (this.editMode && this.devoirToEdit) {
        // Mise à jour du devoir existant
        const index = this.devoirs.findIndex(d => d._id === this.devoirToEdit?._id);
        if (index !== -1) {
          this.devoirs[index] = {
            ...this.devoirs[index],
            ...devoirData,
            file: this.devoirFile ? 'mock-file-path' : this.devoirs[index].file,
            fileName: this.devoirFile ? this.devoirFile.name : this.devoirs[index].fileName
          };
          console.log('Devoir mis à jour:', this.devoirs[index]);
        }
      } else {
        // Ajout d'un nouveau devoir
        const newDevoir: Devoir = {
          _id: 'd' + (this.devoirs.length + 1),
          ...devoirData,
          createdAt: new Date(),
          assignedCount: 0,
          submissionsCount: 0,
          submissions: [],
          etudiants: [],
          file: this.devoirFile ? 'mock-file-path' : undefined,
          fileName: this.devoirFile ? this.devoirFile.name : undefined
        };
        this.devoirs.push(newDevoir);
        console.log('Devoir ajouté:', newDevoir);
      }

      this.hideModal();
      this.updateStats();
      this.filterDevoirs();
    }
  }

  editDevoir(devoir: Devoir): void {
    this.editMode = true;
    this.devoirToEdit = devoir;
    
    // Format the date to YYYY-MM-DD for the input field
    const dueDate = new Date(devoir.dueDate);
    const formattedDate = dueDate.toISOString().split('T')[0];
    
    this.devoirForm.patchValue({
      title: devoir.title,
      description: devoir.description,
      cour: devoir.cour,
      departement: devoir.departement,
      niveau: devoir.niveau,
      specialite: devoir.specialite,
      dueDate: formattedDate,
      notifyEtudiants: false
    });
    
    this.onFormDepartementChange({ target: { value: devoir.departement } });
    this.showModal('nouveauDevoir');
  }

  deleteDevoir(devoir: Devoir): void {
    this.devoirToEdit = devoir;
    this.showModal('confirmation');
  }

  confirmDeleteDevoir(): void {
    if (this.devoirToEdit) {
      const index = this.devoirs.findIndex(d => d._id === this.devoirToEdit?._id);
      if (index !== -1) {
        this.devoirs.splice(index, 1);
        console.log('Devoir supprimé avec succès');
      }
      this.hideModal();
      this.updateStats();
      this.filterDevoirs();
    }
  }

  viewDevoirDetails(devoir: Devoir): void {
    // Trouver le devoir complet avec tous les détails
    const devoirComplet = this.devoirs.find(d => d._id === devoir._id);
    if (devoirComplet) {
      this.selectedDevoir = devoirComplet;
      this.detailsTab = 'submissions';
      this.filteredSubmissions = devoirComplet.submissions || [];
      this.filteredEtudiants = devoirComplet.etudiants || [];
      this.showModal('devoirDetails');
    }
  }

  viewSubmission(submission: Submission): void {
    this.selectedSubmission = submission;
    this.evaluationForm.patchValue({
      note: submission.note || '',
      feedback: submission.feedback || '',
      notifyEtudiant: true
    });
    this.showModal('evaluation');
  }

  evaluateSubmission(submission: Submission): void {
    this.selectedSubmission = submission;
    this.evaluationForm.patchValue({
      note: submission.note || '',
      feedback: submission.feedback || '',
      notifyEtudiant: true
    });
    this.showModal('evaluation');
  }

  submitEvaluation(): void {
    if (this.evaluationForm.valid && this.selectedSubmission) {
      const evaluationData = this.evaluationForm.value;

      // Mettre à jour la soumission dans la liste
      if (this.selectedDevoir && this.selectedDevoir.submissions) {
        const index = this.selectedDevoir.submissions.findIndex(s => s._id === this.selectedSubmission?._id);
        if (index !== -1) {
          this.selectedDevoir.submissions[index] = {
            ...this.selectedDevoir.submissions[index],
            evaluated: true,
            note: evaluationData.note,
            feedback: evaluationData.feedback
          };
          console.log('Évaluation enregistrée:', this.selectedDevoir.submissions[index]);
          this.filterSubmissions();
        }
      }
      
      // Mettre à jour les statistiques
      this.updateStats();
      this.hideModal();
    }
  }

  downloadDevoirFile(devoir: Devoir): void {
    if (devoir.file) {
      console.log('Téléchargement du fichier:', devoir.fileName);
      // Dans une implémentation réelle, cela déclencherait un téléchargement
      alert(`Téléchargement simulé du fichier: ${devoir.fileName}`);
    }
  }

  downloadSubmission(submission: Submission): void {
    if (submission.file) {
      console.log('Téléchargement de la soumission:', submission.fileName);
      // Dans une implémentation réelle, cela déclencherait un téléchargement
      alert(`Téléchargement simulé du fichier: ${submission.fileName}`);
    }
  }

  viewEtudiantDetails(etudiant: any): void {
    console.log('Voir les détails de l\'étudiant:', etudiant);
    // Dans une implémentation réelle, cela ouvrirait une modal avec les détails
    alert(`Détails de l'étudiant: ${etudiant.name}`);
  }

  sendReminderToEtudiant(etudiant: any): void {
    if (this.selectedDevoir) {
      console.log('Rappel envoyé à:', etudiant.name, 'pour le devoir:', this.selectedDevoir.title);
      // Dans une implémentation réelle, cela enverrait un email
      alert(`Rappel envoyé à ${etudiant.name} pour le devoir: ${this.selectedDevoir.title}`);
    }
  }

  // Méthodes utilitaires
  getDepartementName(id: string): string {
    const departement = this.departements.find(d => d._id === id);
    return departement ? departement.name : 'Non spécifié';
  }

  getNiveauName(id: string): string {
    const niveau = this.niveaux.find(n => n._id === id);
    return niveau ? niveau.name : 'Non spécifié';
  }

  getSpecialiteName(id: string): string {
    const specialite = this.specialites.find(s => s._id === id);
    return specialite ? specialite.name : 'Non spécifié';
  }

  getCourTitle(id: string): string {
    const cour = this.cours.find(c => c._id === id);
    return cour ? cour.title : 'Non spécifié';
  }

  isDevoirActive(devoir: Devoir): boolean {
    const now = new Date();
    const dueDate = new Date(devoir.dueDate);
    const createdAt = new Date(devoir.createdAt);
    return dueDate > now && createdAt <= now;
  }

  isDevoirExpired(devoir: Devoir): boolean {
    const now = new Date();
    const dueDate = new Date(devoir.dueDate);
    return dueDate <= now;
  }

  isDevoirUpcoming(devoir: Devoir): boolean {
    const now = new Date();
    const createdAt = new Date(devoir.createdAt);
    return createdAt > now;
  }

  getDevoirStatus(devoir: Devoir): string {
    if (this.isDevoirActive(devoir)) {
      return 'Actif';
    } else if (this.isDevoirExpired(devoir)) {
      return 'Expiré';
    } else if (this.isDevoirUpcoming(devoir)) {
      return 'À venir';
    }
    return 'Inconnu';
  }
}