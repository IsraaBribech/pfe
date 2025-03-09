import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-specialite',
  templateUrl: './specialites.component.html',
  styleUrls: ['./specialites.component.css']
})
export class SpecialiteComponent implements OnInit {
  // Définition des propriétés
  specialites = [
    { id: 1, nom: 'Informatique', description: 'Développement logiciel et systèmes', couleur: '#3498db', nbEtudiants: 187 },
    { id: 2, nom: 'Réseaux', description: 'Infrastructure et administration', couleur: '#2ecc71', nbEtudiants: 145 },
    { id: 3, nom: 'Électronique', description: 'Circuits et systèmes embarqués', couleur: '#e74c3c', nbEtudiants: 124 },
    { id: 4, nom: 'Mécanique', description: 'Conception et fabrication', couleur: '#9b59b6', nbEtudiants: 156 },
    { id: 5, nom: 'Robotique', description: 'Automatisation et contrôle', couleur: '#f39c12', nbEtudiants: 78 }
  ];

  selectedSpecialite: any = null;
  showAddForm = false;
  newSpecialite = { nom: '', description: '', couleur: '#3498db' };

  constructor() { }

  ngOnInit(): void {
  }

  // Définition des méthodes
  selectSpecialite(specialite: any): void {
    this.selectedSpecialite = specialite;
  }

  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
  }

  addSpecialite(): void {
    // Simuler l'ajout d'une spécialité
    const newId = Math.max(...this.specialites.map(s => s.id)) + 1;
    this.specialites.push({
      id: newId,
      nom: this.newSpecialite.nom,
      description: this.newSpecialite.description,
      couleur: this.newSpecialite.couleur,
      nbEtudiants: 0
    });

    // Réinitialiser le formulaire
    this.newSpecialite = { nom: '', description: '', couleur: '#3498db' };
    this.showAddForm = false;
  }

  deleteSpecialite(id: number): void {
    this.specialites = this.specialites.filter(s => s.id !== id);
    if (this.selectedSpecialite && this.selectedSpecialite.id === id) {
      this.selectedSpecialite = null;
    }
  }
}