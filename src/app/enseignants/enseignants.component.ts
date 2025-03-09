import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-enseignants',
  templateUrl: './enseignants.component.html',
  styleUrls: ['./enseignants.component.css']
})
export class EnseignantsComponent implements OnInit {
  // Définition des propriétés
  enseignants = [
    { id: 1, nom: 'Dubois', prenom: 'Jean', specialite: 'Mathématiques', couleur: '#3498db', nbCours: 5 },
    { id: 2, nom: 'Martin', prenom: 'Sophie', specialite: 'Informatique', couleur: '#2ecc71', nbCours: 7 },
    { id: 3, nom: 'Bernard', prenom: 'Michel', specialite: 'Physique', couleur: '#e74c3c', nbCours: 4 },
    { id: 4, nom: 'Petit', prenom: 'Claire', specialite: 'Anglais', couleur: '#9b59b6', nbCours: 6 },
    { id: 5, nom: 'Leroy', prenom: 'Thomas', specialite: 'Économie', couleur: '#f39c12', nbCours: 3 }
  ];
  
  selectedEnseignant: any = null;
  showAddForm = false;
  newEnseignant = { nom: '', prenom: '', specialite: '', couleur: '#3498db' };
  
  constructor() { }
  
  ngOnInit(): void {
  }
  
  // Définition des méthodes
  selectEnseignant(enseignant: any): void {
    this.selectedEnseignant = enseignant;
  }
  
  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
  }
  
  addEnseignant(): void {
    // Simuler l'ajout d'un enseignant
    const newId = Math.max(...this.enseignants.map(e => e.id)) + 1;
    this.enseignants.push({
      id: newId,
      nom: this.newEnseignant.nom,
      prenom: this.newEnseignant.prenom,
      specialite: this.newEnseignant.specialite,
      couleur: this.newEnseignant.couleur,
      nbCours: 0
    });
    
    // Réinitialiser le formulaire
    this.newEnseignant = { nom: '', prenom: '', specialite: '', couleur: '#3498db' };
    this.showAddForm = false;
  }
  
  deleteEnseignant(id: number): void {
    this.enseignants = this.enseignants.filter(e => e.id !== id);
    if (this.selectedEnseignant && this.selectedEnseignant.id === id) {
      this.selectedEnseignant = null;
    }
  }
}