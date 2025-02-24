import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  activeModal: string | null = null;
  
  // Formulaires
  userForm!: FormGroup;
  levelForm!: FormGroup;
  specialtyForm!: FormGroup;
  regimeForm!: FormGroup;
  departmentForm!: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private userService: UserService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.initForms();
  }

  initForms(): void {
    // Initialisation du formulaire utilisateur
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      level: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    
    // Initialisation du formulaire niveau
    this.levelForm = this.fb.group({
      name: ['', Validators.required],
      description: ['']
    });
    
    // Initialisation du formulaire spécialité
    this.specialtyForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      department: ['', Validators.required]
    });
    
    // Initialisation du formulaire régime
    this.regimeForm = this.fb.group({
      name: ['', Validators.required],
      description: ['']
    });
    
    // Initialisation du formulaire département
    this.departmentForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      head: ['']
    });
  }

  showModal(type: string): void {
    this.activeModal = type;
  }

  hideModal(): void {
    this.activeModal = null;
  }

  // Méthode pour afficher une notification
  showNotification(message: string, isError: boolean = false): void {
    this.snackBar.open(message, 'Fermer', {
      duration: isError ? 5000 : 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: isError ? ['error-notification'] : ['success-notification']
    });
  }

  submitForm(type: string): void {
    if (type === 'user' && this.userForm.valid) {
      const userData = { ...this.userForm.value, level: Number(this.userForm.value.level) };
      
      this.userService.addUser(userData).subscribe(
        (response) => {
          this.showNotification('Utilisateur ajouté avec succès!');
          this.userForm.reset();
          this.hideModal();
        },
        (error) => {
          this.showNotification('Erreur lors de l\'ajout de l\'utilisateur: ' + error.message, true);
        }
      );
    } else if (type === 'level' && this.levelForm.valid) {
      // Remplacer par l'appel API réel
      this.showNotification('Niveau ajouté avec succès!');
      this.levelForm.reset();
      this.hideModal();
    } else if (type === 'specialty' && this.specialtyForm.valid) {
      this.showNotification('Spécialité ajoutée avec succès!');
      this.specialtyForm.reset();
      this.hideModal();
    } else if (type === 'regime' && this.regimeForm.valid) {
      this.showNotification('Régime ajouté avec succès!');
      this.regimeForm.reset();
      this.hideModal();
    } else if (type === 'department' && this.departmentForm.valid) {
      this.showNotification('Département ajouté avec succès!');
      this.departmentForm.reset();
      this.hideModal();
    } else {
      this.showNotification('Veuillez remplir tous les champs obligatoires.', true);
    }
  }
}