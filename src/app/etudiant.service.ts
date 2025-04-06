import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Etudiant {
  _id: string;
  name: string;
  email: string;
  matricule: string;
  departement: string;
  niveau: string;
  specialite: string;
  photo?: string;
  dateInscription: Date;
  status: 'actif' | 'inactif' | 'suspendu';
}

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {
  getEtudiantsStats(): Observable<{ total: number }>  {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'http://localhost:5000/api/etudiant';
;

  constructor(private http: HttpClient) { }

  /**
   * Récupère la liste de tous les étudiants
   */
  getStudents(): Observable<Etudiant[]> {
    return this.http.get<Etudiant[]>(this.apiUrl);
  }

  /**
   * Récupère un étudiant par son ID
   */
  getEtudiantById(id: string): Observable<Etudiant> {
    return this.http.get<Etudiant>(`${this.apiUrl}/${id}`);
  }

  /**
   * Récupère les étudiants par département, niveau et/ou spécialité
   */
  getEtudiantsByFilters(filters: {
    departement?: string;
    niveau?: string;
    specialite?: string;
  }): Observable<Etudiant[]> {
    let queryParams = '';
    
    if (filters.departement) {
      queryParams += `departement=${filters.departement}&`;
    }
    
    if (filters.niveau) {
      queryParams += `niveau=${filters.niveau}&`;
    }
    
    if (filters.specialite) {
      queryParams += `specialite=${filters.specialite}&`;
    }
    
    // Supprimer le dernier '&' si présent
    queryParams = queryParams.endsWith('&') 
      ? queryParams.slice(0, -1) 
      : queryParams;
    
    return this.http.get<Etudiant[]>(`${this.apiUrl}/filter?${queryParams}`);
  }

  /**
   * Ajoute un nouvel étudiant
   */
  addEtudiant(etudiantData: Partial<Etudiant>, photo?: File): Observable<Etudiant> {
    const formData = new FormData();
    
    // Ajouter les données de l'étudiant
    formData.append('data', JSON.stringify(etudiantData));
    
    // Ajouter la photo si présente
    if (photo) {
      formData.append('photo', photo, photo.name);
    }
    
    return this.http.post<Etudiant>(this.apiUrl, formData);
  }

  /**
   * Met à jour un étudiant existant
   */
  updateEtudiant(id: string, etudiantData: Partial<Etudiant>, photo?: File): Observable<Etudiant> {
    const formData = new FormData();
    
    // Ajouter les données de l'étudiant
    formData.append('data', JSON.stringify(etudiantData));
    
    // Ajouter la photo si présente
    if (photo) {
      formData.append('photo', photo, photo.name);
    }
    
    return this.http.put<Etudiant>(`${this.apiUrl}/${id}`, formData);
  }

  /**
   * Supprime un étudiant
   */
  deleteEtudiant(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  /**
   * Change le statut d'un étudiant (actif, inactif, suspendu)
   */
  changeEtudiantStatus(id: string, status: 'actif' | 'inactif' | 'suspendu'): Observable<Etudiant> {
    return this.http.patch<Etudiant>(`${this.apiUrl}/${id}/status`, { status });
  }

  /**
   * Récupère les cours auxquels un étudiant est inscrit
   */
  getEtudiantCours(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${id}/cours`);
  }

  /**
   * Récupère les devoirs assignés à un étudiant
   */
  getEtudiantDevoirs(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${id}/devoirs`);
  }

  /**
   * Récupère les résultats des quiz d'un étudiant
   */
  getEtudiantQuizResults(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${id}/quiz-results`);
  }
}