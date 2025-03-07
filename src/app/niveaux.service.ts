import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NiveauxService {
  private apiUrl = 'http://localhost:5000/api/niveaux'; // URL de ton backend Node.js

  constructor(private http: HttpClient) {}

  // Récupérer tous les niveaux
  getNiveaux(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Ajouter un niveau
  addNiveau(niveau: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add`, niveau);
  }

  // Supprimer un niveau par ID
  deleteNiveau(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${id}`);
  }
}
