import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrls: ['./cours.component.css']
})
export class CoursComponent implements OnInit {
  // Définition des propriétés
  cours = [
    { id: 1, titre: 'Programmation Web', description: 'HTML, CSS et JavaScript', couleur: '#3498db', nbEtudiants: 185, niveau: 'Licence 2', enseignant: 'Dr. Martin', credits: 6 },
    { id: 2, titre: 'Algorithmique', description: 'Structures de données et algorithmes', couleur: '#2ecc71', nbEtudiants: 210, niveau: 'Licence 1', enseignant: 'Dr. Dubois', credits: 5 },
    { id: 3, titre: 'Base de données', description: 'Conception et SQL', couleur: '#e74c3c', nbEtudiants: 160, niveau: 'Licence 2', enseignant: 'Dr. Bernard', credits: 4 },
    { id: 4, titre: 'Intelligence Artificielle', description: 'Machine learning et deep learning', couleur: '#9b59b6', nbEtudiants: 95, niveau: 'Master 1', enseignant: 'Dr. Richard', credits: 6 },
    { id: 5, titre: 'Sécurité Informatique', description: 'Cryptographie et sécurité des réseaux', couleur: '#f39c12', nbEtudiants: 82, niveau: 'Master 2', enseignant: 'Dr. Laurent', credits: 5 }
  ];

  selectedCours: any = null;
  showAddForm = false;
  newCours = { titre: '', description: '', couleur: '#3498db', niveau: 'Licence 1', enseignant: '', credits: 3 };

  constructor() { }

  ngOnInit(): void {
  }

  // Définition des méthodes
  selectCours(cours: any): void {
    this.selectedCours = cours;
  }

  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
  }

  addCours(): void {
    // Simuler l'ajout d'un cours
    const newId = Math.max(...this.cours.map(c => c.id)) + 1;
    this.cours.push({
      id: newId,
      titre: this.newCours.titre,
      description: this.newCours.description,
      couleur: this.newCours.couleur,
      nbEtudiants: 0,
      niveau: this.newCours.niveau,
      enseignant: this.newCours.enseignant,
      credits: this.newCours.credits
    });

    // Réinitialiser le formulaire
    this.newCours = { titre: '', description: '', couleur: '#3498db', niveau: 'Licence 1', enseignant: '', credits: 3 };
    this.showAddForm = false;
  }

  deleteCours(id: number): void {
    this.cours = this.cours.filter(c => c.id !== id);
    if (this.selectedCours && this.selectedCours.id === id) {
      this.selectedCours = null;
    }
  }
}