import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-niveaux',
  templateUrl: './niveaux.component.html',
  styleUrls: ['./niveaux.component.css']
})
export class NiveauxComponent implements OnInit {
  // Définition des propriétés
  niveaux = [
    { id: 1, nom: 'Licence 1', description: 'Première année', couleur: '#3498db', nbEtudiants: 245 },
    { id: 2, nom: 'Licence 2', description: 'Deuxième année', couleur: '#2ecc71', nbEtudiants: 198 },
    { id: 3, nom: 'Licence 3', description: 'Troisième année', couleur: '#e74c3c', nbEtudiants: 176 },
    { id: 4, nom: 'Master 1', description: 'Première année de master', couleur: '#9b59b6', nbEtudiants: 132 },
    { id: 5, nom: 'Master 2', description: 'Deuxième année de master', couleur: '#f39c12', nbEtudiants: 104 }
  ];

  selectedNiveau: any = null;
  showAddForm = false;
  newNiveau = { nom: '', description: '', couleur: '#3498db' };

  constructor() { }

  ngOnInit(): void {
  }

  // Définition des méthodes
  selectNiveau(niveau: any): void {
    this.selectedNiveau = niveau;
  }

  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
  }

  addNiveau(): void {
    // Simuler l'ajout d'un niveau
    const newId = Math.max(...this.niveaux.map(n => n.id)) + 1;
    this.niveaux.push({
      id: newId,
      nom: this.newNiveau.nom,
      description: this.newNiveau.description,
      couleur: this.newNiveau.couleur,
      nbEtudiants: 0
    });

    // Réinitialiser le formulaire
    this.newNiveau = { nom: '', description: '', couleur: '#3498db' };
    this.showAddForm = false;
  }

  deleteNiveau(id: number): void {
    this.niveaux = this.niveaux.filter(n => n.id !== id);
    if (this.selectedNiveau && this.selectedNiveau.id === id) {
      this.selectedNiveau = null;
    }
  }
}