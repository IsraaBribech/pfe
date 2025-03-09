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
      description: 'Département des Sciences Informatiques', 
      couleur: '#ff5e62', 
      nbProfesseurs: 18,
      directeur: 'Dr. Sophie Martin',
      nbCours: 32,
      nbEtudiants: 450,
      tauxReussite: 92
    },
    { 
      id: 2, 
      nom: 'Mathématiques', 
      description: 'Département de Mathématiques Appliquées', 
      couleur: '#2ecc71', 
      nbProfesseurs: 15,
      directeur: 'Dr. Thomas Dubois',
      nbCours: 28,
      nbEtudiants: 320,
      tauxReussite: 88
    },
    { 
      id: 3, 
      nom: 'Physique', 
      description: 'Département de Physique et Sciences Naturelles', 
      couleur: '#3498db', 
      nbProfesseurs: 16,
      directeur: 'Dr. Jean-Pierre Leclerc',
      nbCours: 30,
      nbEtudiants: 380,
      tauxReussite: 85
    },
    { 
      id: 4, 
      nom: 'Langues', 
      description: 'Département des Langues Étrangères', 
      couleur: '#9b59b6', 
      nbProfesseurs: 22,
      directeur: 'Dr. Marie Lambert',
      nbCours: 45,
      nbEtudiants: 520,
      tauxReussite: 94
    },
    { 
      id: 5, 
      nom: 'Économie', 
      description: 'Département d\'Économie et Gestion', 
      couleur: '#f39c12', 
      nbProfesseurs: 20,
      directeur: 'Dr. Michel Fournier',
      nbCours: 38,
      nbEtudiants: 490,
      tauxReussite: 90
    }
  ];

  selectedDepartement: any = null;
  showAddForm = false;
  newDepartement = { 
    nom: '', 
    description: '', 
    couleur: '#ff5e62',
    directeur: '' 
  };

  constructor() { }

  ngOnInit(): void {
  }

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
      nbProfesseurs: 0,
      directeur: this.newDepartement.directeur,
      nbCours: 0,
      nbEtudiants: 0,
      tauxReussite: 0
    });

    // Réinitialiser le formulaire
    this.newDepartement = { 
      nom: '', 
      description: '', 
      couleur: '#ff5e62',
      directeur: '' 
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