import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SpecialitesService } from '../specialites.service';
import { DepartementsService } from '../departements.service';
import { StatsService, Stats, UserDistribution, DeptSpecialty, Activity } from '../stats.service';
import { NiveauxService } from '../niveaux.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
filteredSpecialties: any;
niveaux: any;
loadSpecialtiesForDepartment(arg0: any) {
throw new Error('Method not implemented.');
}
  activeModal: string | null = null;

  // Déclaration des formulaires
  userForm!: FormGroup;
  levelForm!: FormGroup;
  specialtyForm!: FormGroup;
  regimeForm!: FormGroup;
  departmentForm!: FormGroup;

  // Ajout de la propriété departments
  departments: any[] = [];

  // Statistiques
  userStats: any = { total: 0, growth: 0, chart: 0 };
  levelStats: any = { total: 0, growth: 0, chart: 0 };
  specialtyStats: any = { total: 0, growth: 0, chart: 0 };
  departmentStats: any = { total: 0, growth: 0, chart: 0 };
  
  // Données graphiques
  userDistribution: UserDistribution[] = [];
  deptSpecialties: DeptSpecialty[] = [];
  recentActivities: Activity[] = [];

  constructor(
    private fb: FormBuilder,
    private specialitesService: SpecialitesService,
    private departementsService: DepartementsService,
    private userService: UserService,
    private statsService: StatsService,
    private snackBar: MatSnackBar,
    private niveauService: NiveauxService  // Corrected from 'niveauxService' to 'niveauService'
  ) {}

  ngOnInit(): void {
    this.initForms();
    this.loadStatistics();
    this.loadNiveaux();  // Appeler la méthode pour charger les niveaux

    // Ajout de l'appel pour charger les départements
    this.loadDepartments();
  }


  
  loadNiveaux(): void {
    this.niveauService.getNiveaux().subscribe(
      (niveaux: any) => {  // Explicitly typed 'niveaux' as 'any'
        // Remplir les statistiques avec les données récupérées
        this.levelStats.total = niveaux.length;
        this.levelStats.growth = (niveaux.length / 100) * 5;  // Exemple de calcul de croissance
        this.levelStats.chart = (niveaux.length * 100) / 20;  // Exemple de calcul pour le graphique
      },
      (error: any) => {  // Explicitly typed 'error' as 'any'
        console.error('Erreur lors du chargement des niveaux:', error);
      }
    );
  }
 
  // Méthode pour charger les départements
  loadDepartments(): void {
    this.departementsService.getDepartements().subscribe(
      (data) => {
        console.log('Départements chargés:', data);
        this.departments = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des départements:', error);
      }
    );
  }

  // Initialisation des formulaires
  private initForms(): void {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      cin: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      level: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.specialtyForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      department: ['', Validators.required]
    });

    this.levelForm = this.fb.group({
      name: ['', Validators.required],
      description: ['']
    });

    this.regimeForm = this.fb.group({
      name: ['', Validators.required],
      description: ['']
    });

    this.departmentForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      head: ['']
    });
  }

  // Charger toutes les statistiques
  loadStatistics(): void {
    // Statistiques globales
    this.statsService.getStats().subscribe(
      (data: Stats) => {
        this.userStats = data.users;
        this.specialtyStats = data.specialties;
        this.departmentStats = data.departments;
      },
      error => console.error('Erreur lors du chargement des statistiques:', error)
    );
    
    // Distribution des utilisateurs
    this.statsService.getUserDistribution().subscribe(
      data => this.userDistribution = data,
      error => console.error('Erreur lors du chargement de la distribution des utilisateurs:', error)
    );
    
    // Spécialités par département
    this.statsService.getDeptSpecialties().subscribe(
      data => this.deptSpecialties = data,
      error => console.error('Erreur lors du chargement des spécialités par département:', error)
    );
    
    // Activités récentes
    this.statsService.getRecentActivities().subscribe(
      data => this.recentActivities = data,
      error => console.error('Erreur lors du chargement des activités récentes:', error)
    );
  }

  // Afficher la modale
  showModal(type: string): void {
    this.activeModal = type;
  }

  // Cacher la modale
  hideModal(): void {
    this.activeModal = null;
  }

  // Affichage des notifications
  private showNotification(message: string, isError: boolean = false): void {
    this.snackBar.open(message, 'Fermer', {
      duration: isError ? 5000 : 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: isError ? ['error-notification'] : ['success-notification']
    });
  }


  toggleSubmenu(event: Event) {
    const target = event.currentTarget as HTMLElement;
    const parent = target.parentElement!; // Note the ! operator
    parent.classList.toggle('open');
    
    // Prevent navigation when clicking on the parent menu with submenu
    event.preventDefault();
    event.stopPropagation();
  }


  // Soumission des formulaires
  submitForm(type: string): void {
    if (type === 'user' && this.userForm.valid) {
      const userData = { ...this.userForm.value, level: Number(this.userForm.value.level) };

      this.userService.addUser(userData).subscribe(
        () => {
          this.showNotification('Utilisateur ajouté avec succès!');
          this.userForm.reset();
          this.hideModal();
        },
        (error) => {
          this.showNotification('Erreur lors de l\'ajout de l\'utilisateur: ' + error.message, true);
        }
      );
    } else if (type === 'specialty' && this.specialtyForm.valid) {
      this.specialitesService.addSpecialite(this.specialtyForm.value).subscribe(
        () => {
          this.showNotification('Spécialité ajoutée avec succès!');
          this.specialtyForm.reset();
          this.hideModal();
        },
        (error) => {
          this.showNotification('Erreur lors de l\'ajout de la spécialité: ' + error.message, true);
        }
      );
    } else  if (type === 'level' && this.levelForm.valid) {
      const niveauData = this.levelForm.value;
  
      this.niveauService.addNiveau(niveauData).subscribe({
        next: (response) => {
          this.showNotification('Niveau ajouté avec succès!');
          this.levelForm.reset();
          this.hideModal();
        },
        error: (error) => {
          console.error('Erreur lors de l\'ajout du niveau :', error);
          this.showNotification('Une erreur s\'est produite. Veuillez réessayer.');
        }
      });
    
    } else if (type === 'regime' && this.regimeForm.valid) {
      this.showNotification('Régime ajouté avec succès!');
      this.regimeForm.reset();
      this.hideModal();
    } else if (type === 'department' && this.departmentForm.valid) {
      this.departementsService.addDepartement(this.departmentForm.value).subscribe(
        () => {
          this.showNotification('Département ajouté avec succès!');
          this.departmentForm.reset();
          this.hideModal();
          // Rechargement des départements après ajout
          this.loadDepartments();
        },
        (error) => {
          this.showNotification('Erreur lors de l\'ajout du département: ' + error.message, true);
        }
      );
    } else {
      this.showNotification('Veuillez remplir tous les champs obligatoires.', true);
    }
  }
}
