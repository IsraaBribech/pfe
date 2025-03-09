import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-regimes',
  templateUrl: './regimes.component.html',
  styleUrls: ['./regimes.component.css']
})
export class RegimesComponent implements OnInit {
  // Définition des propriétés
  regimes = [
    {
      id: 1,
      nom: 'Temps plein',
      description: 'Formation complète avec présence obligatoire',
      couleur: '#3498db',
      nbEtudiants: 245
    },
    {
      id: 2,
      nom: 'Temps partiel',
      description: 'Formation modulable en fonction des contraintes',
      couleur: '#2ecc71',
      nbEtudiants: 183
    },
    {
      id: 3,
      nom: 'Formation en alternance',
      description: 'Alternance entre périodes académiques et professionnelles',
      couleur: '#e74c3c',
      nbEtudiants: 124
    },
    {
      id: 4,
      nom: 'Formation à distance',
      description: 'Cours dispensés intégralement en ligne',
      couleur: '#9b59b6',
      nbEtudiants: 167
    },
    {
      id: 5,
      nom: 'Régime spécial d\'études',
      description: 'Aménagement pour étudiants à statut particulier',
      couleur: '#f39c12',
      nbEtudiants: 89
    }
  ];

  selectedRegime: any = null;
  showAddForm = false;
  newRegime = {
    nom: '',
    description: '',
    couleur: '#3498db'
  };

  constructor() { }

  ngOnInit(): void {
  }

  // Définition des méthodes
  selectRegime(regime: any): void {
    this.selectedRegime = regime;
  }

  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
  }

  addRegime(): void {
    // Simuler l'ajout d'un régime
    const newId = Math.max(...this.regimes.map(r => r.id)) + 1;
    this.regimes.push({
      id: newId,
      nom: this.newRegime.nom,
      description: this.newRegime.description,
      couleur: this.newRegime.couleur,
      nbEtudiants: 0
    });

    // Réinitialiser le formulaire
    this.newRegime = {
      nom: '',
      description: '',
      couleur: '#3498db'
    };
    this.showAddForm = false;
  }

  deleteRegime(id: number): void {
    this.regimes = this.regimes.filter(r => r.id !== id);
    if (this.selectedRegime && this.selectedRegime.id === id) {
      this.selectedRegime = null;
    }
  }
}