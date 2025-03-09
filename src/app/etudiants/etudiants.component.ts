import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-etudiants',
  templateUrl: './etudiants.component.html',
  styleUrls: ['./etudiants.component.css']
})
export class EtudiantsComponent implements OnInit {
  // Définition des propriétés
  etudiants = [
    { id: 1, nom: 'Martin', prenom: 'Lucas', formation: 'Informatique', couleur: '#3498db', nbCours: 6, moyenne: 86, projets: 4, annee: 2 },
    { id: 2, nom: 'Dupont', prenom: 'Emma', formation: 'Mathématiques', couleur: '#2ecc71', nbCours: 5, moyenne: 92, projets: 3, annee: 3 },
    { id: 3, nom: 'Robert', prenom: 'Hugo', formation: 'Physique', couleur: '#e74c3c', nbCours: 7, moyenne: 78, projets: 2, annee: 1 },
    { id: 4, nom: 'Durand', prenom: 'Léa', formation: 'Chimie', couleur: '#9b59b6', nbCours: 5, moyenne: 84, projets: 3, annee: 2 },
    { id: 5, nom: 'Lefebvre', prenom: 'Théo', formation: 'Économie', couleur: '#f39c12', nbCours: 6, moyenne: 89, projets: 5, annee: 3 }
  ];
  
  selectedEtudiant: any = null;
  showAddForm = false;
  newEtudiant = { nom: '', prenom: '', formation: '', couleur: '#3498db' };
  
  constructor() { }
  
  ngOnInit(): void {
  }
  
  // Définition des méthodes
  selectEtudiant(etudiant: any): void {
    this.selectedEtudiant = etudiant;
  }
  
  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
  }
  
  addEtudiant(): void {
    // Simuler l'ajout d'un étudiant
    const newId = Math.max(...this.etudiants.map(e => e.id)) + 1;
    this.etudiants.push({
      id: newId,
      nom: this.newEtudiant.nom,
      prenom: this.newEtudiant.prenom,
      formation: this.newEtudiant.formation,
      couleur: this.newEtudiant.couleur,
      nbCours: 0,
      moyenne: 0,
      projets: 0,
      annee: 1
    });
    
    // Réinitialiser le formulaire
    this.newEtudiant = { nom: '', prenom: '', formation: '', couleur: '#3498db' };
    this.showAddForm = false;
  }
  
  deleteEtudiant(id: number): void {
    this.etudiants = this.etudiants.filter(e => e.id !== id);
    if (this.selectedEtudiant && this.selectedEtudiant.id === id) {
      this.selectedEtudiant = null;
    }
  }
}