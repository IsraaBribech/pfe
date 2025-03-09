import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpecialitesService {
  private apiUrl = 'http://localhost:5000/api/specialites';

  constructor(private http: HttpClient) {}

  // Ajouter une nouvelle spécialité
  addSpecialite(specialiteData: any): Observable<any> {
    console.log('📤 Envoi des données:', specialiteData);
    return this.http.post(`${this.apiUrl}`, specialiteData);
  }

  // Récupérer toutes les spécialités
  getSpecialites(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  // Supprimer une spécialité par ID
  deleteSpecialite(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }

  // Modifier une spécialité par ID
  updateSpecialite(id: string, updatedData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${id}`, updatedData);
  }

  // Obtenir une spécialité par ID
  getSpecialiteById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}
