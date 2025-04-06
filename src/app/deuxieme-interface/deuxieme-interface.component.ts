import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-deuxieme-interface',
  templateUrl: './deuxieme-interface.component.html',
  styleUrls: ['./deuxieme-interface.component.css']
})
export class DeuxiemeInterfaceComponent implements OnInit {
activeComponent: any;
switchComponent(arg0: string) {
throw new Error('Method not implemented.');
}
  // Teacher Information
  id = 'T123';
  enseignantName = 'Israa Bribech';
  enseignantEmail = 'israabribech2002@gmail.com';

  // Statistics
  coursStats = { total: 5 };
  chapitreStats = { total: 10 };
  quizStats = { total: 3 };
  devoirStats = { total: 4 };
  messageStats = { total: 20, unread: 5 };
  voeuxStats = { total: 2 }; // Ajout des statistiques pour les voeux

  // Départements, Niveaux et Spécialités
  departements: any[] = [];
  niveaux: any[] = [];
  specialites: any[] = [];
  filteredSpecialites: any[] = [];
  
  // Cours
  cours: any[] = [];
  filteredCours: any[] = [];

  // Matières pour les voeux
  matieres: any[] = [
    { id: 'm1', nom: 'Programmation Web', departement: 'dep1', specialite: 'spe1', niveau: 'niv3' },
    { id: 'm2', nom: 'Bases de données', departement: 'dep1', specialite: 'spe1', niveau: 'niv2' },
    { id: 'm3', nom: 'Algorithmes avancés', departement: 'dep1', specialite: 'spe1', niveau: 'niv3' },
    { id: 'm4', nom: 'Intelligence artificielle', departement: 'dep1', specialite: 'spe2', niveau: 'niv4' },
    { id: 'm5', nom: 'Machine Learning', departement: 'dep1', specialite: 'spe2', niveau: 'niv4' },
    { id: 'm6', nom: 'Algèbre linéaire', departement: 'dep2', specialite: 'spe3', niveau: 'niv1' },
    { id: 'm7', nom: 'Analyse numérique', departement: 'dep2', specialite: 'spe4', niveau: 'niv3' }
  ];

  // Forms
  courForm!: FormGroup;
  devoirForm!: FormGroup;
  messageForm!: FormGroup;
  quizForm!: FormGroup;
  chapitreForm!: FormGroup;
  voeuxForm!: FormGroup; // Ajout du formulaire pour les voeux

  // File inputs
  @ViewChild('courFileInput') courFileInput!: ElementRef;
  @ViewChild('devoirFileInput') devoirFileInput!: ElementRef;

  // Selected files
  courFile: File | null = null;
  devoirFile: File | null = null;

  // Active Modal
  activeModal: string | null = null;

  constructor(private fb: FormBuilder) {
    this.initializeForms();
  }

  ngOnInit(): void {
    this.loadMockData();
    this.setupFormListeners();
  }

  private initializeForms(): void {
    this.courForm = this.fb.group({
      title: ['', Validators.required],
      departement: ['', Validators.required],
      niveau: ['', Validators.required],
      specialite: ['', Validators.required]
    });

    this.devoirForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      dueDate: ['', Validators.required],
      departement: ['', Validators.required],
      niveau: ['', Validators.required],
      specialite: ['', Validators.required],
      cour: ['', Validators.required]
    });

    this.chapitreForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      cour: ['', Validators.required]
    });

    this.quizForm = this.fb.group({
      title: ['', Validators.required],
      cour: ['', Validators.required]
    });

    this.messageForm = this.fb.group({
      subject: ['', Validators.required],
      content: ['', Validators.required],
      recipient: ['', Validators.required]
    });

    // Initialisation du formulaire de voeux
    this.voeuxForm = this.fb.group({
      semestre: ['1', Validators.required],
      departement: ['', Validators.required],
      specialite: ['', Validators.required],
      niveau: ['', Validators.required],
      matieres: [[], Validators.required],
      commentaire: ['']
    });
  }

  private setupFormListeners(): void {
    // Cour form listeners
    this.courForm.get('departement')?.valueChanges.subscribe((value) => {
      this.onDepartementChange({ target: { value } });
    });

    // Devoir form listeners
    this.devoirForm.get('departement')?.valueChanges.subscribe((value) => {
      this.onDepartementChange({ target: { value } });
    });

    this.devoirForm.get('niveau')?.valueChanges.subscribe(() => {
      this.filterCours();
    });

    this.devoirForm.get('specialite')?.valueChanges.subscribe(() => {
      this.filterCours();
    });

    // Voeux form listeners
    this.voeuxForm.get('departement')?.valueChanges.subscribe((value) => {
      this.onDepartementChange({ target: { value } });
      this.filterMatieres();
    });

    this.voeuxForm.get('specialite')?.valueChanges.subscribe(() => {
      this.filterMatieres();
    });

    this.voeuxForm.get('niveau')?.valueChanges.subscribe(() => {
      this.filterMatieres();
    });
  }

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
    
    // Charger les cours
    this.cours = [
      { _id: 'c1', title: 'Introduction à Angular', departement: 'dep1', niveau: 'niv3', specialite: 'spe1' },
      { _id: 'c2', title: 'Machine Learning avec Python', departement: 'dep1', niveau: 'niv4', specialite: 'spe2' },
      { _id: 'c3', title: 'Algèbre linéaire avancée', departement: 'dep2', niveau: 'niv4', specialite: 'spe3' },
      { _id: 'c4', title: 'Analyse numérique', departement: 'dep2', niveau: 'niv3', specialite: 'spe4' },
      { _id: 'c5', title: 'Introduction à la mécanique quantique', departement: 'dep3', niveau: 'niv4', specialite: 'spe5' }
    ];
    
    this.filteredCours = [...this.cours];
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

  filterCours(): void {
    const filters = {
      departement: this.devoirForm.get('departement')?.value,
      niveau: this.devoirForm.get('niveau')?.value,
      specialite: this.devoirForm.get('specialite')?.value
    };

    if (!filters.departement && !filters.niveau && !filters.specialite) {
      this.filteredCours = [...this.cours];
      return;
    }

    this.filteredCours = this.cours.filter(cour => {
      let match = true;
      
      if (filters.departement && cour.departement !== filters.departement) {
        match = false;
      }
      
      if (filters.niveau && cour.niveau !== filters.niveau) {
        match = false;
      }
      
      if (filters.specialite && cour.specialite !== filters.specialite) {
        match = false;
      }
      
      return match;
    });
  }

  filterMatieres(): void {
    const filters = {
      departement: this.voeuxForm.get('departement')?.value,
      niveau: this.voeuxForm.get('niveau')?.value,
      specialite: this.voeuxForm.get('specialite')?.value
    };

    if (!filters.departement && !filters.niveau && !filters.specialite) {
      return;
    }

    // Filtrer les matières en fonction des critères sélectionnés
    const filteredMatieres = this.matieres.filter(matiere => {
      let match = true;
      
      if (filters.departement && matiere.departement !== filters.departement) {
        match = false;
      }
      
      if (filters.niveau && matiere.niveau !== filters.niveau) {
        match = false;
      }
      
      if (filters.specialite && matiere.specialite !== filters.specialite) {
        match = false;
      }
      
      return match;
    });

    // Mettre à jour la liste des matières dans le formulaire
    this.voeuxForm.get('matieres')?.setValue([]);
  }

  onCourFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.courFile = input.files[0];
    }
  }

  onDevoirFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.devoirFile = input.files[0];
    }
  }

  showModal(modalType: string): void {
    this.activeModal = modalType;

    // Reset files
    this.courFile = null;
    this.devoirFile = null;

    // Reset forms
    if (modalType === 'cour') {
      this.courForm.reset();
    } else if (modalType === 'devoir') {
      this.devoirForm.reset();
    } else if (modalType === 'chapitre') {
      this.chapitreForm.reset();
    } else if (modalType === 'quiz') {
      this.quizForm.reset();
    } else if (modalType === 'message') {
      this.messageForm.reset();
    } else if (modalType === 'voeux') {
      this.voeuxForm.reset({
        semestre: '1',
        matieres: []
      });
    }
  }

  hideModal(): void {
    this.activeModal = null;
  }

  submitForm(formType: string): void {
    if (formType === 'cour' && this.courForm.valid) {
      const courData = {
        ...this.courForm.value,
        teacher: this.id
      };

      // Dans une implémentation réelle, vous enverriez ces données à une API
      console.log('Cours ajouté:', courData);
      
      // Simuler l'ajout d'un cours
      this.coursStats.total++;
      
      this.hideModal();
      this.courForm.reset();
      this.courFile = null;
      if (this.courFileInput) {
        this.courFileInput.nativeElement.value = '';
      }
    }

    if (formType === 'devoir' && this.devoirForm.valid) {
      const devoirData = {
        ...this.devoirForm.value,
        teacher: this.id
      };

      // Dans une implémentation réelle, vous enverriez ces données à une API
      console.log('Devoir ajouté:', devoirData);
      
      // Simuler l'ajout d'un devoir
      this.devoirStats.total++;
      
      this.hideModal();
      this.devoirForm.reset();
      this.devoirFile = null;
      if (this.devoirFileInput) {
        this.devoirFileInput.nativeElement.value = '';
      }
    }

    if (formType === 'chapitre' && this.chapitreForm.valid) {
      const chapitreData = {
        ...this.chapitreForm.value,
        teacher: this.id
      };

      // Dans une implémentation réelle, vous enverriez ces données à une API
      console.log('Chapitre ajouté:', chapitreData);
      
      // Simuler l'ajout d'un chapitre
      this.chapitreStats.total++;
      
      this.hideModal();
      this.chapitreForm.reset();
    }

    if (formType === 'quiz' && this.quizForm.valid) {
      const quizData = {
        ...this.quizForm.value,
        teacher: this.id
      };

      // Dans une implémentation réelle, vous enverriez ces données à une API
      console.log('Quiz créé:', quizData);
      
      // Simuler l'ajout d'un quiz
      this.quizStats.total++;
      
      this.hideModal();
      this.quizForm.reset();
    }

    if (formType === 'message' && this.messageForm.valid) {
      const messageData = {
        ...this.messageForm.value,
        sender: this.id,
        senderName: this.enseignantName,
        senderEmail: this.enseignantEmail,
        date: new Date()
      };

      // Dans une implémentation réelle, vous enverriez ces données à une API
      console.log('Message envoyé:', messageData);
      
      this.hideModal();
      this.messageForm.reset();
    }

    if (formType === 'voeux' && this.voeuxForm.valid) {
      const voeuxData = {
        ...this.voeuxForm.value,
        teacher: this.id,
        date: new Date()
      };

      // Dans une implémentation réelle, vous enverriez ces données à une API
      console.log('Voeux soumis:', voeuxData);
      
      // Simuler l'ajout d'un voeu
      this.voeuxStats.total++;
      
      this.hideModal();
      this.voeuxForm.reset({
        semestre: '1',
        matieres: []
      });
    }
  }

  createConversation(): void {
    // Méthode vide pour éviter l'erreur dans le composant
  }
}