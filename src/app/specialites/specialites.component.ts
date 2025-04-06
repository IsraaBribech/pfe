import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SpecialitesService } from '../specialites.service';

@Component({
  selector: 'app-specialite',
  templateUrl: './specialites.component.html',
  styleUrls: ['./specialites.component.css']
})
export class SpecialitesComponent implements OnInit {
  specialites = [
    { id: 1, nom: 'Informatique', description: 'Développement logiciel et systèmes', couleur: '#3498db', nbEtudiants: 187 },
    { id: 2, nom: 'Réseaux', description: 'Infrastructure et administration', couleur: '#2ecc71', nbEtudiants: 145 },
    { id: 3, nom: 'Électronique', description: 'Circuits et systèmes embarqués', couleur: '#e74c3c', nbEtudiants: 124 },
    { id: 4, nom: 'Mécanique', description: 'Conception et fabrication', couleur: '#9b59b6', nbEtudiants: 156 },
    { id: 5, nom: 'Robotique', description: 'Automatisation et contrôle', couleur: '#f39c12', nbEtudiants: 78 }
  ];
 
    departments = [
      { id: 1, name: 'Informatique' },
      { id: 2, name: 'Mathématiques' },
      { id: 3, name: 'Physique' }
    ];
  
    // other properties and methods
  
  selectedSpecialite: any = null;
  showAddForm = false;
  newSpecialite = { nom: '', description: '', couleur: '#3498db' };

  // Définition du formulaire réactif
  specialtyForm!: FormGroup;

  activeModal: string | null = null;

  constructor(
    private specialitesService: SpecialitesService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.specialtyForm = this.fb.group({
      nom: ['', [Validators.required]],
      description: ['', [Validators.required]],
      couleur: ['#3498db']
    });
  }

  selectSpecialite(specialite: any): void {
    this.selectedSpecialite = specialite;
  }

  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
  }

  addSpecialite(): void {
    if (this.specialtyForm.valid) {
      const newSpeciality = {
        id: Math.max(...this.specialites.map(s => s.id)) + 1, // Ajoute un nouvel id
        nom: this.specialtyForm.value.nom,
        description: this.specialtyForm.value.description,
        couleur: this.specialtyForm.value.couleur,
        nbEtudiants: 0
      };

      this.specialites.push(newSpeciality);
      this.specialtyForm.reset({ couleur: '#3498db' });
      this.showAddForm = false;
      this.hideModal();
      this.showNotification('Spécialité ajoutée avec succès!');
    } else {
      this.showNotification('Veuillez remplir tous les champs obligatoires.', true);
    }
  }

  deleteSpecialite(id: number): void {
    this.specialites = this.specialites.filter(s => s.id !== id);
    if (this.selectedSpecialite && this.selectedSpecialite.id === id) {
      this.selectedSpecialite = null;
    }
  }

  toggleModal(modalType: string): void {
    this.activeModal = modalType;
  }

  hideModal(): void {
    this.activeModal = null;
  }

  submitForm(): void {
    this.addSpecialite();
  }

  private showNotification(message: string, isError: boolean = false): void {
    alert(message);
  }
}
