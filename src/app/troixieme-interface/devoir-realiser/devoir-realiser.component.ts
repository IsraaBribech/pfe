import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

interface Notification {
  id: number;
  type: "cours" | "devoir" | "quiz";
  title: string;
  message: string;
  date: Date;
  read: boolean;
}

interface Devoir {
  id: string;
  titre: string;
  description: string;
  matiere: string;
  enseignant: string;
  dateCreation: Date;
  dateLimite: Date;
  fichierConsigne: string;
  soumis: boolean;
  dateSoumission?: Date;
  fichierSoumis?: string;
  note?: number;
  commentaire?: string;
  couleur: string;
  icon: string;
  type: 'cours' | 'td' | 'tp';
}

interface Matiere {
  nom: string;
  couleur: string;
  icon: string;
  enseignants: {
    cours: string;
    td: string;
    tp: string;
  };
}

@Component({
  selector: 'app-devoir-realiser',
  templateUrl: './devoir-realiser.component.html',
  styleUrls: ['./devoir-realiser.component.css']
})
export class DevoirRealiserComponent implements OnInit {
  // Informations de l'étudiant
  etudiantName = 'Israa Bribech';
  etudiantEmail = 'israabribech2002@gmail.com';
  etudiantMatricule = 'E12345';

  // Onglet actif
  activeSemester: 'semestre1' | 'semestre2' = 'semestre1';

  // Filtres
  searchTerm = '';
  matiereFilter = '';
  typeFilter = '';

  // Tri
  sortColumn = 'dateLimite';
  sortDirection = 'asc';

  // Modal de soumission
  showSoumissionModal = false;
  selectedDevoir: Devoir | null = null;
  fichierAEnvoyer: File | null = null;
  isSubmitting = false;
  confirmationMessage = '';

  // Ajout pour les notifications
  notifications: Notification[] = [];
  showNotificationDropdown = false;

  // Matières
  matieresSemestre1: Matiere[] = [
    {
      nom: 'Programmation Web',
      couleur: '#6366f1',
      icon: 'fa-code',
      enseignants: {
        cours: 'Dr. Martin Dupont',
        td: 'Mme. Sophie Laurent',
        tp: 'M. Jean Petit'
      }
    },
    {
      nom: 'Bases de données',
      couleur: '#f59e0b',
      icon: 'fa-database',
      enseignants: {
        cours: 'Prof. Claire Dubois',
        td: 'M. Thomas Bernard',
        tp: 'Mme. Marie Leroy'
      }
    },
    {
      nom: 'Algorithmes avancés',
      couleur: '#10b981',
      icon: 'fa-sitemap',
      enseignants: {
        cours: 'Dr. Philippe Martin',
        td: 'M. Alexandre Blanc',
        tp: 'Mme. Julie Moreau'
      }
    }
  ];

  matieresSemestre2: Matiere[] = [
    {
      nom: 'Frameworks JavaScript',
      couleur: '#8b5cf6',
      icon: 'fa-js',
      enseignants: {
        cours: 'Dr. Julien Moreau',
        td: 'Mme. Claire Dubois',
        tp: 'M. Thomas Bernard'
      }
    },
    {
      nom: 'Développement Backend',
      couleur: '#10b981',
      icon: 'fa-server',
      enseignants: {
        cours: 'Prof. Lucie Girard',
        td: 'M. Philippe Martin',
        tp: 'Dr. Marc Dubois'
      }
    },
    {
      nom: 'Architecture logicielle',
      couleur: '#f59e0b',
      icon: 'fa-cubes',
      enseignants: {
        cours: 'Dr. Marc Dubois',
        td: 'Prof. Antoine Rousseau',
        tp: 'Mme. Nathalie Mercier'
      }
    }
  ];

  // Devoirs
  devoirsSemestre1: Devoir[] = [];
  devoirsSemestre2: Devoir[] = [];
  filteredDevoirs: Devoir[] = [];

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.initializeDevoirs();
    this.filterDevoirs();
    this.loadNotifications();
  }

  // Écouteur d'événement pour fermer le dropdown quand on clique ailleurs
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    // Vérifier si le clic est en dehors du dropdown
    const target = event.target as HTMLElement;
    if (!target.closest('.notification-btn') && !target.closest('.notification-dropdown')) {
      this.closeNotificationDropdown();
    }
  }

  // Méthode pour charger les notifications
  loadNotifications(): void {
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    
    // Simuler quelques notifications
    this.notifications = [
      {
        id: 1,
        type: "cours",
        title: "Nouveau chapitre disponible",
        message: 'Le chapitre "Introduction aux bases de données relationnelles" a été ajouté.',
        date: now,
        read: false
      },
      {
        id: 2,
        type: "devoir",
        title: "Nouveau devoir assigné",
        message: 'Un nouveau devoir "Implémentation d\'un algorithme de tri" a été assigné.',
        date: yesterday,
        read: false
      },
      {
        id: 3,
        type: "quiz",
        title: "Nouveau quiz disponible",
        message: 'Un nouveau quiz sur "Les réseaux de neurones" est maintenant disponible.',
        date: yesterday,
        read: false
      }
    ];
  }

  // Méthode pour afficher/masquer le dropdown de notifications
  toggleNotificationDropdown(event?: MouseEvent): void {
    if (event) {
      event.stopPropagation();
    }
    this.showNotificationDropdown = !this.showNotificationDropdown;
  }

  // Méthode pour fermer le dropdown si on clique ailleurs
  closeNotificationDropdown(): void {
    this.showNotificationDropdown = false;
  }

  // Méthode pour marquer une notification comme lue
  markAsRead(notification: Notification): void {
    notification.read = true;
  }

  // Méthode pour obtenir le nombre de notifications non lues
  getUnreadNotificationsCount(): number {
    return this.notifications.filter(n => !n.read).length;
  }

  // Méthode pour obtenir l'icône en fonction du type de notification
  getNotificationIcon(type: string): string {
    switch (type) {
      case "cours":
        return "fa-book";
      case "devoir":
        return "fa-tasks";
      case "quiz":
        return "fa-question-circle";
      default:
        return "fa-bell";
    }
  }

  // Méthode pour formater le temps écoulé
  formatTimeAgo(date: Date): string {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) {
      return "À l'instant";
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `Il y a ${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""}`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `Il y a ${diffInHours} heure${diffInHours > 1 ? "s" : ""}`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) {
      return `Il y a ${diffInDays} jour${diffInDays > 1 ? "s" : ""}`;
    }

    return this.formatDate(date);
  }

  // Méthode pour naviguer vers la page de notifications
  navigateToNotifications(): void {
    this.router.navigate(["/troixieme-interface/notification"]);
    this.closeNotificationDropdown();
  }

  // Initialiser les devoirs à partir des données
  initializeDevoirs(): void {
    // Générer les devoirs pour le semestre 1
    this.devoirsSemestre1 = [];
    this.matieresSemestre1.forEach(matiere => {
      // Devoir de cours
      this.devoirsSemestre1.push({
        id: `s1-${matiere.nom}-cours`,
        titre: `Examen de ${matiere.nom}`,
        description: `Examen théorique sur les concepts fondamentaux de ${matiere.nom}.`,
        matiere: matiere.nom,
        enseignant: matiere.enseignants.cours,
        dateCreation: new Date(2023, 8, 5),
        dateLimite: new Date(2023, 9, 15),
        fichierConsigne: `assets/devoirs/${this.slugify(matiere.nom)}/examen.pdf`,
        soumis: false,
        couleur: matiere.couleur,
        icon: matiere.icon,
        type: 'cours'
      });

      // Devoir de TD
      this.devoirsSemestre1.push({
        id: `s1-${matiere.nom}-td`,
        titre: `Exercices de TD - ${matiere.nom}`,
        description: `Série d'exercices pratiques sur ${matiere.nom}.`,
        matiere: matiere.nom,
        enseignant: matiere.enseignants.td,
        dateCreation: new Date(2023, 8, 10),
        dateLimite: new Date(2023, 9, 20),
        fichierConsigne: `assets/devoirs/${this.slugify(matiere.nom)}/td/exercices.pdf`,
        soumis: Math.random() > 0.5, // Aléatoirement soumis ou non
        dateSoumission: new Date(2023, 9, 18),
        fichierSoumis: `assets/soumissions/${this.slugify(matiere.nom)}/td/exercices.pdf`,
        note: Math.floor(Math.random() * 6) + 14, // Note entre 14 et 19
        commentaire: 'Bon travail, mais quelques points à améliorer.',
        couleur: matiere.couleur,
        icon: matiere.icon,
        type: 'td'
      });

      // Devoir de TP
      this.devoirsSemestre1.push({
        id: `s1-${matiere.nom}-tp`,
        titre: `Projet de TP - ${matiere.nom}`,
        description: `Projet pratique sur ${matiere.nom}.`,
        matiere: matiere.nom,
        enseignant: matiere.enseignants.tp,
        dateCreation: new Date(2023, 9, 1),
        dateLimite: new Date(2023, 10, 5),
        fichierConsigne: `assets/devoirs/${this.slugify(matiere.nom)}/tp/projet.pdf`,
        soumis: false,
        couleur: matiere.couleur,
        icon: matiere.icon,
        type: 'tp'
      });
    });

    // Générer les devoirs pour le semestre 2
    this.devoirsSemestre2 = [];
    this.matieresSemestre2.forEach(matiere => {
      // Devoir de cours
      this.devoirsSemestre2.push({
        id: `s2-${matiere.nom}-cours`,
        titre: `Examen de ${matiere.nom}`,
        description: `Examen théorique sur les concepts fondamentaux de ${matiere.nom}.`,
        matiere: matiere.nom,
        enseignant: matiere.enseignants.cours,
        dateCreation: new Date(2024, 1, 15),
        dateLimite: new Date(2024, 2, 15),
        fichierConsigne: `assets/devoirs/${this.slugify(matiere.nom)}/examen.pdf`,
        soumis: false,
        couleur: matiere.couleur,
        icon: matiere.icon,
        type: 'cours'
      });

      // Devoir de TD
      this.devoirsSemestre2.push({
        id: `s2-${matiere.nom}-td`,
        titre: `Exercices de TD - ${matiere.nom}`,
        description: `Série d'exercices pratiques sur ${matiere.nom}.`,
        matiere: matiere.nom,
        enseignant: matiere.enseignants.td,
        dateCreation: new Date(2024, 1, 20),
        dateLimite: new Date(2024, 2, 20),
        fichierConsigne: `assets/devoirs/${this.slugify(matiere.nom)}/td/exercices.pdf`,
        soumis: false,
        couleur: matiere.couleur,
        icon: matiere.icon,
        type: 'td'
      });

      // Devoir de TP
      this.devoirsSemestre2.push({
        id: `s2-${matiere.nom}-tp`,
        titre: `Projet de TP - ${matiere.nom}`,
        description: `Projet pratique sur ${matiere.nom}.`,
        matiere: matiere.nom,
        enseignant: matiere.enseignants.tp,
        dateCreation: new Date(2024, 1, 25),
        dateLimite: new Date(2024, 2, 25),
        fichierConsigne: `assets/devoirs/${this.slugify(matiere.nom)}/tp/projet.pdf`,
        soumis: false,
        couleur: matiere.couleur,
        icon: matiere.icon,
        type: 'tp'
      });
    });
  }

  // Convertir un nom en slug pour les chemins de fichiers
  slugify(text: string): string {
    return text
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  }

  // Changer de semestre
  changeSemester(semester: 'semestre1' | 'semestre2'): void {
    this.activeSemester = semester;
    this.filterDevoirs();
  }

  // Filtrer les devoirs
  filterDevoirs(): void {
    let devoirs = this.activeSemester === 'semestre1' ? this.devoirsSemestre1 : this.devoirsSemestre2;

    // Filtre par recherche
    if (this.searchTerm) {
      const searchLower = this.searchTerm.toLowerCase();
      devoirs = devoirs.filter(devoir => 
        devoir.titre.toLowerCase().includes(searchLower) || 
        devoir.description.toLowerCase().includes(searchLower) ||
        devoir.matiere.toLowerCase().includes(searchLower) ||
        devoir.enseignant.toLowerCase().includes(searchLower)
      );
    }

    // Filtre par matière
    if (this.matiereFilter) {
      devoirs = devoirs.filter(devoir => devoir.matiere === this.matiereFilter);
    }

    // Filtre par type
    if (this.typeFilter) {
      devoirs = devoirs.filter(devoir => devoir.type === this.typeFilter);
    }

    // Tri
    devoirs = this.sortDevoirs(devoirs);

    this.filteredDevoirs = devoirs;
  }

  // Trier les devoirs
  sortTable(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.filterDevoirs();
  }

  // Obtenir l'icône de tri
  getSortIcon(column: string): string {
    if (this.sortColumn !== column) {
      return 'fa-sort';
    }
    return this.sortDirection === 'asc' ? 'fa-sort-up' : 'fa-sort-down';
  }

  // Trier les devoirs
  sortDevoirs(devoirs: Devoir[]): Devoir[] {
    return devoirs.sort((a, b) => {
      let comparison = 0;
      
      switch (this.sortColumn) {
        case 'enseignant':
          comparison = a.enseignant.localeCompare(b.enseignant);
          break;
        case 'matiere':
          comparison = a.matiere.localeCompare(b.matiere);
          break;
        case 'type':
          comparison = a.type.localeCompare(b.type);
          break;
        case 'dateCreation':
          comparison = a.dateCreation.getTime() - b.dateCreation.getTime();
          break;
        case 'dateLimite':
          comparison = a.dateLimite.getTime() - b.dateLimite.getTime();
          break;
        default:
          comparison = a.dateLimite.getTime() - b.dateLimite.getTime();
      }
      
      return this.sortDirection === 'asc' ? comparison : -comparison;
    });
  }

  // Obtenir les matières uniques pour le semestre actif
  getUniqueMatieresForSemester(): string[] {
    const devoirs = this.activeSemester === 'semestre1' ? this.devoirsSemestre1 : this.devoirsSemestre2;
    const matieres = new Set<string>();
    devoirs.forEach(devoir => matieres.add(devoir.matiere));
    return Array.from(matieres).sort();
  }

  // Ouvrir le modal de soumission
  openSoumissionModal(devoir: Devoir): void {
    this.selectedDevoir = devoir;
    this.fichierAEnvoyer = null;
    this.confirmationMessage = '';
    this.showSoumissionModal = true;
  }

  // Fermer le modal de soumission
  closeSoumissionModal(event: Event): void {
    if (
      event.target === event.currentTarget || 
      (event.target as HTMLElement).classList.contains('modal-close') ||
      (event.target as HTMLElement).classList.contains('btn-cancel')
    ) {
      this.showSoumissionModal = false;
      this.selectedDevoir = null;
      this.fichierAEnvoyer = null;
      this.confirmationMessage = '';
    }
  }

  // Gérer le fichier sélectionné
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      // Vérifier le type de fichier (PDF ou image)
      if (file.type === 'application/pdf' || file.type.startsWith('image/')) {
        this.fichierAEnvoyer = file;
      } else {
        alert('Veuillez sélectionner un fichier PDF ou une image.');
        event.target.value = ''; // Réinitialiser l'input file
      }
    }
  }

  // Soumettre un devoir
  soumettreDevoir(): void {
    if (!this.fichierAEnvoyer || !this.selectedDevoir) {
      alert('Veuillez sélectionner un fichier à soumettre.');
      return;
    }

    this.isSubmitting = true;

    // Simuler un délai de soumission
    setTimeout(() => {
      if (this.selectedDevoir) {
        // Dans une application réelle, vous enverriez le fichier à un serveur
        console.log('Soumission du devoir:', {
          matiere: this.selectedDevoir.matiere,
          devoir: this.selectedDevoir.titre,
          fichier: this.fichierAEnvoyer,
          email: this.etudiantEmail,
          date: new Date(),
        });

        // Mettre à jour l'état du devoir
        this.selectedDevoir.soumis = true;
        this.selectedDevoir.dateSoumission = new Date();
        if (this.fichierAEnvoyer) {
          this.selectedDevoir.fichierSoumis = URL.createObjectURL(this.fichierAEnvoyer);
        }

        // Mettre à jour les devoirs filtrés
        this.filterDevoirs();

        // Afficher un message de confirmation
        this.confirmationMessage = 'Votre devoir a été soumis avec succès !';

        this.isSubmitting = false;
      }
    }, 2000);
  }

  // Formater les dates
  formatDate(date: Date): string {
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }

  // Vérifier si un devoir est en retard
  isLate(devoir: Devoir): boolean {
    const today = new Date();
    return !devoir.soumis && today > devoir.dateLimite;
  }

  // Vérifier si un devoir est proche de la date limite
  isCloseToDeadline(devoir: Devoir): boolean {
    const today = new Date();
    const diffTime = devoir.dateLimite.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return !devoir.soumis && diffDays <= 3 && diffDays > 0;
  }

  // Obtenir le nombre de jours restants
  getJoursRestants(dateLimite: Date): number {
    const today = new Date();
    const diffTime = dateLimite.getTime() - today.getTime();
    return Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  }

  // Obtenir la classe CSS pour une ligne de tableau
  getRowClass(devoir: Devoir): string {
    if (devoir.soumis) {
      return 'row-soumis';
    } else if (this.isLate(devoir)) {
      return 'row-retard';
    } else if (this.isCloseToDeadline(devoir)) {
      return 'row-proche';
    }
    return '';
  }

  // Obtenir le libellé pour un type de cours
  getTypeLabel(type: string): string {
    switch (type) {
      case 'cours':
        return 'Cours';
      case 'td':
        return 'TD';
      case 'tp':
        return 'TP';
      default:
        return type;
    }
  }
}