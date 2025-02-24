// admin.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(private fb: FormBuilder) { }

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

  submitForm(type: string): void {
    if (type === 'user' && this.userForm.valid) {
      console.log('Utilisateur soumis:', this.userForm.value);
      this.userForm.reset();
      this.hideModal();
    } else if (type === 'level' && this.levelForm.valid) {
      console.log('Niveau soumis:', this.levelForm.value);
      this.levelForm.reset();
      this.hideModal();
    } else if (type === 'specialty' && this.specialtyForm.valid) {
      console.log('Spécialité soumise:', this.specialtyForm.value);
      this.specialtyForm.reset();
      this.hideModal();
    } else if (type === 'regime' && this.regimeForm.valid) {
      console.log('Régime soumis:', this.regimeForm.value);
      this.regimeForm.reset();
      this.hideModal();
    } else if (type === 'department' && this.departmentForm.valid) {
      console.log('Département soumis:', this.departmentForm.value);
      this.departmentForm.reset();
      this.hideModal();
    }
  }
}