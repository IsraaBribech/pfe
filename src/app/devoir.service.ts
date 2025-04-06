import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DevoirService {
  private apiUrl = "http://localhost:5000/api/devoir"

  constructor(private http: HttpClient) { }

  /**
   * Récupère tous les devoirs
   */
  getAllDevoirs(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  /**
   * Récupère un devoir par son ID
   */
  getDevoirById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  /**
   * Récupère les devoirs d'un enseignant
   */
  getDevoirsByTeacher(teacherId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/teacher/${teacherId}`);
  }

  /**
   * Récupère les devoirs par filtres (département, niveau, spécialité)
   */
  getDevoirsByFilters(filters: {
    departement?: string;
    niveau?: string;
    specialite?: string;
    status?: string;
  }): Observable<any[]> {
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
    
    if (filters.status) {
      queryParams += `status=${filters.status}&`;
    }
    
    // Supprimer le dernier '&' si présent
    queryParams = queryParams.endsWith('&') 
      ? queryParams.slice(0, -1) 
      : queryParams;
    
    return this.http.get<any[]>(`${this.apiUrl}/filter?${queryParams}`);
  }

  /**
   * Ajoute un nouveau devoir
   */
  addDevoir(devoirData: any, file?: File): Observable<any> {
    const formData = new FormData();
    
    // Ajouter les données du devoir
    formData.append('data', JSON.stringify(devoirData));
    
    // Ajouter le fichier si présent
    if (file) {
      formData.append('file', file, file.name);
    }
    
    return this.http.post<any>(this.apiUrl, formData);
  }

  /**
   * Met à jour un devoir existant
   */
  updateDevoir(id: string, devoirData: any, file?: File): Observable<any> {
    const formData = new FormData();
    
    // Ajouter les données du devoir
    formData.append('data', JSON.stringify(devoirData));
    
    // Ajouter le fichier si présent
    if (file) {
      formData.append('file', file, file.name);
    }
    
    return this.http.put<any>(`${this.apiUrl}/${id}`, formData);
  }

  /**
   * Supprime un devoir
   */
  deleteDevoir(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  /**
   * Évalue une soumission
   */
  evaluateSubmission(evaluationData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/submissions/${evaluationData.submissionId}/evaluate`, evaluationData);
  }

  /**
   * Télécharge le fichier d'un devoir
   */
  downloadDevoirFile(devoirId: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${devoirId}/download`, {
      responseType: 'blob'
    });
  }

  /**
   * Télécharge le fichier d'une soumission
   */
  downloadSubmissionFile(submissionId: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/submissions/${submissionId}/download`, {
      responseType: 'blob'
    });
  }

  /**
   * Envoie un rappel à un étudiant
   */
  sendReminder(devoirId: string, etudiantId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${devoirId}/remind/${etudiantId}`, {});
  }

  /**
   * Récupère les statistiques des devoirs pour un enseignant
   */
  getDevoirsStats(teacherId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/stats/${teacherId}`);
  }
}