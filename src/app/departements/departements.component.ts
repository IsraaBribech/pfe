import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-departements',
  templateUrl: './departements.component.html',
  styleUrls: ['./departements.component.css']
})
export class DepartementsComponent implements OnInit {
  // Définition des propriétés
  departements = [
    {
      id: 1,
      nom: 'Informatique',
      description: 'Développement logiciel, réseaux et systèmes d\'information',
      couleur: '#3498db',
      nbEtudiants: 215
    },
    {
      id: 2,
      nom: 'Gestion',
      description: 'Management, finance et marketing',
      couleur: '#2ecc71',
      nbEtudiants: 180
    },
    {
      id: 3,
      nom: 'Economie',
      description: 'Macroéconomie, microéconomie et statistiques',
      couleur: '#e74c3c',
      nbEtudiants: 165
    }
  ];

  selectedDepartement: any = null;
  showAddForm = false;
  newDepartement = {
    nom: '',
    description: '',
    couleur: '#3498db'
  };

  constructor() { }

  ngOnInit(): void { }

  // Définition des méthodes
  selectDepartement(departement: any): void {
    this.selectedDepartement = departement;
  }

  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
  }

  addDepartement(): void {
    // Simuler l'ajout d'un département
    const newId = Math.max(...this.departements.map(d => d.id)) + 1;
    this.departements.push({
      id: newId,
      nom: this.newDepartement.nom,
      description: this.newDepartement.description,
      couleur: this.newDepartement.couleur,
      nbEtudiants: 0
    });

    // Réinitialiser le formulaire
    this.newDepartement = {
      nom: '',
      description: '',
      couleur: '#3498db'
    };
    this.showAddForm = false;
  }

  deleteDepartement(id: number): void {
    this.departements = this.departements.filter(d => d.id !== id);
    if (this.selectedDepartement && this.selectedDepartement.id === id) {
      this.selectedDepartement = null;
    }
  }
}